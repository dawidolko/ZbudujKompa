import { Callout } from '@/components/ui/Callout';
import { PhotoFigure } from '@/components/ui/Photo';
import type { Locale } from '@/i18n/config';
import type { ArticleBlock } from '@/lib/blog';
import { t } from '@/lib/utils';

/**
 * Renders an article body from its structured blocks.
 *
 * Articles are stored as typed blocks rather than as HTML strings, which buys
 * three things: the content is translatable field by field, a heading can be
 * collected into a table of contents without parsing, and there is no path by
 * which markup from the content could reach the page unescaped.
 */
export function ArticleBody({ blocks, locale }: { blocks: ArticleBlock[]; locale: Locale }) {
  return (
    <div className="prose-guide max-w-[46rem]">
      {blocks.map((block, index) => (
        <Block key={index} block={block} locale={locale} />
      ))}
    </div>
  );
}

function Block({ block, locale }: { block: ArticleBlock; locale: Locale }) {
  switch (block.type) {
    case 'paragraph':
      return <p>{t(block.text, locale)}</p>;

    case 'heading':
      return (
        <h2 id={block.id} className="scroll-mt-24">
          {t(block.text, locale)}
        </h2>
      );

    case 'list': {
      const items = t(block.items, locale);
      return block.ordered ? (
        <ol>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }

    case 'quote':
      return (
        <figure className="my-6 border-l-2 border-border-brand pl-5">
          <blockquote className="text-lg leading-relaxed text-text-primary italic">
            {t(block.text, locale)}
          </blockquote>
          {block.attribution ? (
            <figcaption className="mt-2 text-sm text-text-muted">
              {block.attribution}
              {block.source ? ` — ${block.source}` : null}
            </figcaption>
          ) : null}
        </figure>
      );

    case 'callout':
      return (
        <div className="my-6">
          <Callout tone={block.tone} label={t(block.label, locale)}>
            {t(block.text, locale)}
          </Callout>
        </div>
      );

    case 'table': {
      const headers = t(block.headers, locale);
      return (
        /* The table scrolls inside its own container so the article body never
           scrolls sideways on a narrow screen. */
        <div className="my-6 overflow-x-auto rounded-lg border border-border-subtle">
          <table className="w-full min-w-[32rem] border-collapse text-sm">
            <caption className="sr-only">{t(block.caption, locale)}</caption>
            <thead>
              <tr className="border-b border-border-subtle bg-bg-muted text-left">
                {headers.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-4 py-2.5 font-semibold text-text-primary"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-border-subtle last:border-0 even:bg-bg-subtle"
                >
                  {t(row, locale).map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th
                        key={cellIndex}
                        scope="row"
                        className="px-4 py-2.5 text-left font-medium text-text-primary"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td key={cellIndex} className="px-4 py-2.5 text-text-secondary">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case 'photo':
      return (
        <div className="my-6">
          <PhotoFigure
            slug={block.slug}
            locale={locale}
            ratio="16/9"
            sizes="(min-width: 768px) 46rem, 100vw"
            caption={block.caption ? t(block.caption, locale) : undefined}
          />
        </div>
      );

    case 'keyFigure':
      /* A pulled-out statistic. The label carries the meaning, so the figure
         is never left to speak for itself. */
      return (
        <aside className="my-6 rounded-lg border border-border-brand bg-accent-subtle p-5">
          <p className="font-display text-4xl font-extrabold text-accent-fg">{block.value}</p>
          <p className="mt-1 font-semibold text-text-primary">{t(block.label, locale)}</p>
          {block.note ? (
            <p className="mt-1 text-sm text-text-secondary">{t(block.note, locale)}</p>
          ) : null}
        </aside>
      );
  }
}
