# syntax=docker/dockerfile:1.7

# =============================================================================
# ZbudujKompa — production image
#
# Three stages, so the published image contains only static files and a web
# server: no Node.js, no node_modules, no source. The result is a few megabytes
# rather than several hundred, and its attack surface is a static file server.
# =============================================================================

# ---- Stage 1: dependencies ---------------------------------------------------
# Isolated from the build stage so that a source change does not invalidate the
# dependency layer — `npm ci` is by far the slowest step, and this is what keeps
# it cached across ordinary edits.
FROM node:22-alpine AS deps

WORKDIR /app

# Only the manifests, deliberately: copying the whole source here would defeat
# the layer caching this stage exists to provide.
COPY package.json package-lock.json ./

# `npm ci` installs exactly what the lockfile pins, and fails if the manifest
# and lockfile disagree — the property that makes a build reproducible.
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# ---- Stage 2: build ----------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time configuration. These are compiled into the output, so anything
# passed here is publicly readable in the published bundle.
ARG NEXT_PUBLIC_SITE_URL=https://zbudujkompa.dawidolko.pl
ARG NEXT_PUBLIC_BASE_PATH=""
ARG NEXT_PUBLIC_CHAT_API_URL=""
ARG NEXT_PUBLIC_CHAT_API_KEY=""
ARG NEXT_PUBLIC_CHAT_MODEL=""

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH \
    NEXT_PUBLIC_CHAT_API_URL=$NEXT_PUBLIC_CHAT_API_URL \
    NEXT_PUBLIC_CHAT_API_KEY=$NEXT_PUBLIC_CHAT_API_KEY \
    NEXT_PUBLIC_CHAT_MODEL=$NEXT_PUBLIC_CHAT_MODEL \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- Stage 3: runtime --------------------------------------------------------
FROM nginx:1.27-alpine AS runner

# nginx runs unprivileged. The default image runs its worker processes as root,
# which a static file server has no need for.
RUN addgroup -g 1001 -S web && adduser -u 1001 -S web -G web

COPY --from=builder /app/out /usr/share/nginx/html
COPY .tools/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY .tools/docker/security-headers.conf /etc/nginx/snippets/security-headers.conf

# nginx writes its pid and temporary upload buffers at runtime. Those paths are
# moved under a single directory owned by the unprivileged user, so the image
# runs with a read-only root filesystem and one tmpfs mount rather than needing
# root-owned tmpfs mounts scattered across /var.
RUN chown -R web:web /usr/share/nginx/html \
    # The stock nginx.conf sets `user nginx` and writes its pid to /var/run,
    # both of which fail for a non-root process. Rewrite them to the paths the
    # `web` user actually owns.
    && sed -i \
        -e '/^user /d' \
        -e 's#^pid .*#pid /tmp/nginx/nginx.pid;#' \
        /etc/nginx/nginx.conf \
    && sed -i '/^http {/a \    client_body_temp_path /tmp/nginx/client_temp;\n    proxy_temp_path /tmp/nginx/proxy_temp;\n    fastcgi_temp_path /tmp/nginx/fastcgi_temp;\n    uwsgi_temp_path /tmp/nginx/uwsgi_temp;\n    scgi_temp_path /tmp/nginx/scgi_temp;' \
        /etc/nginx/nginx.conf

USER web

# The temp directories are created at startup rather than at build time,
# because /tmp is a tmpfs mount at runtime and would shadow anything baked into
# the image at that path.
COPY --chmod=755 .tools/docker/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8080

# A container that cannot serve its own home page is unhealthy, whatever the
# process table says — so the check requests the page rather than the port.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

