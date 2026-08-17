/**
 * Renders a JSON-LD structured data block.
 *
 * The payload is serialised with JSON.stringify and the `<` character is
 * escaped. Without that escape a string containing "</script>" would close the
 * tag early and inject markup into the page — the standard XSS vector for
 * inline JSON. All data here is authored in the repository rather than
 * user-supplied, but the escape costs nothing and makes the component safe to
 * reuse with any input.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
