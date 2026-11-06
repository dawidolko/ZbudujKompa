const chatOrigin = process.env.NEXT_PUBLIC_CHAT_API_URL
  ? new URL(process.env.NEXT_PUBLIC_CHAT_API_URL).origin
  : '';

/*
 * Delivered as a meta tag because GitHub Pages cannot set response headers.
 * Inline scripts stay allowed since the static export inlines its hydration
 * payload. The optional chat provider is the only allowed outside address.
 */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' ${chatOrigin}`.trim(),
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');
