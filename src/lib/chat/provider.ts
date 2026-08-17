import type { Locale } from '@/i18n/config';
import { findAnswer, knowledgeBase } from './knowledge-base';

/**
 * Chat answer provider.
 *
 * Two modes, and the local one is always the fallback:
 *
 *   local  — matches the question against the built-in knowledge base. Works
 *            offline, costs nothing, and is the default.
 *   remote — forwards the question to an OpenAI-compatible endpoint, grounded
 *            with the same knowledge base as context.
 *
 * On why remote mode is opt-in and off by default: this site is a static
 * export served by GitHub Pages. There is no server to hold a secret, so any
 * key compiled in through NEXT_PUBLIC_* is readable by anyone who opens the
 * bundle. That is acceptable only for a free-tier key you are willing to treat
 * as public and can rotate; it is not acceptable for a paid key. If in doubt,
 * leave remote mode off — the local assistant answers the common questions
 * without it.
 *
 * To enable it, set both variables at build time (see .env.example):
 *   NEXT_PUBLIC_CHAT_API_URL   e.g. https://api.groq.com/openai/v1/chat/completions
 *   NEXT_PUBLIC_CHAT_API_KEY   a free-tier key you accept as public
 *   NEXT_PUBLIC_CHAT_MODEL     optional model id
 */

const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL ?? '';
const API_KEY = process.env.NEXT_PUBLIC_CHAT_API_KEY ?? '';
const MODEL = process.env.NEXT_PUBLIC_CHAT_MODEL ?? 'llama-3.3-70b-versatile';

export const remoteChatEnabled = Boolean(API_URL && API_KEY);

/** How long to wait before giving up and answering locally instead. */
const REQUEST_TIMEOUT_MS = 15_000;

/** How many prior turns to send as context. */
const HISTORY_TURNS = 6;

/** One prior turn of the conversation, in the shape the API expects. */
export type ChatTurn = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatAnswer = {
  text: string;
  links: { href: string; label: string }[];
  /** Which path produced this answer, surfaced to the reader in the UI. */
  source: 'local' | 'remote';
};

/** Answers from the built-in knowledge base. Never throws, never blocks. */
export function answerLocally(question: string, locale: Locale, fallback: string): ChatAnswer {
  const entry = findAnswer(question, locale);

  if (!entry) {
    return { text: fallback, links: [], source: 'local' };
  }

  return {
    text: entry.answer[locale],
    links: (entry.links ?? []).map((link) => ({
      href: link.href,
      label: link.label[locale],
    })),
    source: 'local',
  };
}

/**
 * Builds the grounding context handed to the remote model.
 *
 * The whole knowledge base is small enough to send in full, which keeps the
 * model answering from this site's content rather than from its own priors —
 * the failure mode that would otherwise produce confident, wrong hardware
 * advice under our name.
 */
function buildSystemPrompt(locale: Locale): string {
  const facts = knowledgeBase.map((entry) => `- ${entry.answer[locale]}`).join('\n');

  const language = locale === 'pl' ? 'Polish' : 'English';

  return [
    `You are the build assistant for ZbudujKompa, a PC building guide site.`,
    `Answer in ${language}, in at most four sentences, in a plain and factual tone.`,
    `Base your answer on the reference material below. If it does not cover the question,`,
    `say plainly that you do not know and suggest the guides section. Never invent`,
    `specifications, prices or compatibility claims.`,
    ``,
    `Reference material:`,
    facts,
  ].join('\n');
}

/**
 * Asks the configured remote endpoint.
 *
 * Any failure — misconfiguration, rate limit, network error, malformed
 * response — falls back to the local answer rather than surfacing an error,
 * because a working answer from the knowledge base is more useful to the
 * reader than a message about an API they did not know existed.
 */
export async function answerRemotely(
  question: string,
  locale: Locale,
  fallback: string,
  signal?: AbortSignal,
  /** Prior turns, oldest first, so follow-up questions keep their context. */
  history: ChatTurn[] = [],
): Promise<ChatAnswer> {
  if (!remoteChatEnabled) {
    return answerLocally(question, locale, fallback);
  }

  /* A request that never settles would leave the assistant showing its
     "thinking" state forever. The timeout is combined with the caller's own
     signal, so either can end the request. */
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), REQUEST_TIMEOUT_MS);
  const combined = signal ? AbortSignal.any([signal, timeout.signal]) : timeout.signal;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      signal: combined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 400,
        messages: [
          { role: 'system', content: buildSystemPrompt(locale) },
          /* Only the last few turns are sent. The whole transcript would grow
             without bound and push the grounding material out of context. */
          ...history.slice(-HISTORY_TURNS),
          { role: 'user', content: question },
        ],
      }),
    });

    if (!response.ok) return answerLocally(question, locale, fallback);

    const payload: unknown = await response.json();
    const text = extractMessage(payload);
    if (!text) return answerLocally(question, locale, fallback);

    /* Even on the remote path the local match still supplies the links, so the
       answer keeps pointing at real pages on this site rather than at URLs the
       model might invent. */
    const local = findAnswer(question, locale);

    return {
      text,
      links: (local?.links ?? []).map((link) => ({
        href: link.href,
        label: link.label[locale],
      })),
      source: 'remote',
    };
  } catch {
    return answerLocally(question, locale, fallback);
  } finally {
    clearTimeout(timer);
  }
}

/** Narrows the OpenAI-compatible response shape without trusting it. */
function extractMessage(payload: unknown): string | null {
  if (typeof payload !== 'object' || payload === null) return null;
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) return null;

  const message = (choices[0] as { message?: unknown }).message;
  if (typeof message !== 'object' || message === null) return null;

  const content = (message as { content?: unknown }).content;
  return typeof content === 'string' && content.trim() ? content.trim() : null;
}
