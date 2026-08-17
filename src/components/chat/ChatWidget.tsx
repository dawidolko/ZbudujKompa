'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChatIcon, CloseIcon, SendIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';
import {
  answerLocally,
  answerRemotely,
  remoteChatEnabled,
  type ChatAnswer,
  type ChatTurn,
} from '@/lib/chat/provider';
import { suggestedQuestions } from '@/lib/chat/knowledge-base';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  links?: { href: string; label: string }[];
};

/**
 * Build assistant, docked in the bottom-right corner.
 *
 * Accessibility decisions, which drive most of the structure here:
 *   - The panel is a labelled dialog. Focus moves into the input when it
 *     opens and returns to the launcher when it closes, so keyboard users are
 *     never left with focus on a hidden element.
 *   - Focus is trapped inside the panel while it is open, because a dialog
 *     that lets focus wander behind it is disorienting for anyone who cannot
 *     see which layer they are on.
 *   - The transcript is an aria-live region, so new answers are announced
 *     without stealing focus from the input the visitor is still typing in.
 *   - Escape closes the panel, matching every other dialog on the web.
 */
export function ChatWidget({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const panelId = useId();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', text: dict.chat.greeting },
  ]);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const abortRef = useRef<AbortController | null>(null);

  /* Mirrors `messages` so `ask` can read the latest transcript without taking
     it as a dependency, which would otherwise capture a stale copy. Synced in
     an effect rather than during render, because writing a ref while
     rendering is not safe under concurrent rendering. */
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  /* Move focus into the panel when it opens. */
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /* Escape closes, and Tab is cycled inside the panel while it is open. */
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, a[href], textarea, select',
      );
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      /* Wrap in both directions so focus cannot escape behind the panel. */
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  /* Keep the newest message in view as the transcript grows. */
  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight });
  }, [messages, pending]);

  /* Abandon an in-flight request if the component goes away. */
  useEffect(() => () => abortRef.current?.abort(), []);

  const ask = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || pending) return;

      setInput('');
      setMessages((current) => [...current, { id: nextId.current++, role: 'user', text: trimmed }]);
      setPending(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      /* History is read from a ref rather than from `messages`, so `ask` does
         not need the transcript in its dependency list — closing over the
         state would send a stale history on every turn after the first.

         The greeting is dropped: it is UI copy the assistant never said, and
         feeding it back as an assistant turn would have the model treat its
         own greeting as prior context. */
      const history: ChatTurn[] = messagesRef.current
        .filter((message) => message.id !== 0)
        .map((message) => ({
          role: message.role,
          content: message.text,
        }));

      /* The remote path already falls back to the local answer internally, so
         a single call covers both configurations. */
      let answer: ChatAnswer;
      if (remoteChatEnabled) {
        answer = await answerRemotely(
          trimmed,
          locale,
          dict.chat.noAnswer,
          controller.signal,
          history,
        );
      } else {
        answer = answerLocally(trimmed, locale, dict.chat.noAnswer);
      }

      if (controller.signal.aborted) return;

      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: 'assistant',
          text: answer.text,
          links: answer.links,
        },
      ]);
      setPending(false);
    },
    [dict.chat.noAnswer, locale, pending],
  );

  return (
    <>
      {/* ---- Launcher ---- */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={dict.chat.open}
        hidden={open}
        className={cn(
          'fixed right-4 bottom-4 z-50 inline-flex size-14 items-center justify-center',
          'rounded-full bg-accent text-text-on-brand shadow-lg transition-transform',
          'hover:scale-105 focus-ring md:right-6 md:bottom-6',
        )}
      >
        <ChatIcon className="size-6" />
      </button>

      {/* ---- Panel ---- */}
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-label={dict.chat.title}
        hidden={!open}
        className={cn(
          'fixed right-0 bottom-0 z-50 flex h-[min(32rem,100dvh)] w-full flex-col',
          'border border-border-default bg-surface-raised shadow-lg',
          'md:right-6 md:bottom-6 md:h-[32rem] md:w-96 md:rounded-lg',
        )}
      >
        <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
          <h2 className="font-display text-sm font-bold text-text-primary">{dict.chat.title}</h2>
          <div className="flex items-center gap-1">
            {/* Only offered once there is something to clear. */}
            {messages.length > 1 ? (
              <button
                type="button"
                onClick={() => {
                  abortRef.current?.abort();
                  setPending(false);
                  setMessages([{ id: 0, role: 'assistant', text: dict.chat.greeting }]);
                  inputRef.current?.focus();
                }}
                className="rounded-sm px-2 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring"
              >
                {dict.chat.reset}
              </button>
            ) : null}
            <button
              type="button"
              onClick={close}
              aria-label={dict.chat.close}
              className="inline-flex size-9 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={transcriptRef}
          /* Polite rather than assertive: a new answer should be announced,
             but it must not interrupt someone mid-sentence in the input. */
          aria-live="polite"
          aria-label={dict.chat.conversation}
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        >
          {messages.map((message) => (
            <div key={message.id}>
              <p className="sr-only">
                {message.role === 'user' ? dict.chat.youLabel : dict.chat.botLabel}:
              </p>
              <div
                className={cn(
                  'max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed',
                  message.role === 'user'
                    ? 'ml-auto bg-accent text-text-on-brand'
                    : 'bg-bg-muted text-text-secondary',
                )}
              >
                {message.text}
              </div>

              {message.links && message.links.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {message.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localePath(locale, link.href)}
                        onClick={close}
                        className="inline-flex rounded-xs border border-border-default px-2 py-1 text-xs font-medium text-text-brand transition-colors hover:border-border-brand focus-ring"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {pending ? <p className="text-sm text-text-muted italic">{dict.chat.thinking}</p> : null}

          {messages.length === 1 ? (
            <div className="pt-2">
              <p className="mb-2 text-xs font-semibold tracking-wide text-text-muted uppercase">
                {dict.chat.suggestions}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {suggestedQuestions[locale].map((question) => (
                  <li key={question}>
                    <button
                      type="button"
                      onClick={() => void ask(question)}
                      className="rounded-xs border border-border-default px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring"
                    >
                      {question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void ask(input);
          }}
          className="border-t border-border-subtle p-3"
        >
          <div className="flex items-center gap-2">
            <label htmlFor={`${panelId}-input`} className="sr-only">
              {dict.chat.placeholder}
            </label>
            <input
              ref={inputRef}
              id={`${panelId}-input`}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={dict.chat.placeholder}
              autoComplete="off"
              className="h-10 min-w-0 flex-1 rounded-sm border border-border-default bg-bg-base px-3 text-sm text-text-primary placeholder:text-text-muted focus-ring"
            />
            <button
              type="submit"
              disabled={!input.trim() || pending}
              aria-label={dict.chat.send}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-sm bg-accent text-text-on-brand transition-colors hover:bg-accent-hover focus-ring disabled:opacity-40"
            >
              <SendIcon className="size-4" />
            </button>
          </div>

          {!remoteChatEnabled ? (
            <p className="mt-2 text-[0.6875rem] leading-snug text-text-muted">
              {dict.chat.offlineNote}
            </p>
          ) : null}
        </form>
      </div>
    </>
  );
}
