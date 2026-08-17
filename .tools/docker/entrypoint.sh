#!/bin/sh
# =============================================================================
# Container entrypoint.
#
# Creates the writable directories nginx needs before handing over to it.
# This runs at startup rather than at build time because /tmp is a tmpfs mount
# in production, which shadows anything baked into the image at that path.
# =============================================================================
set -eu

mkdir -p /tmp/nginx/client_temp \
         /tmp/nginx/proxy_temp \
         /tmp/nginx/fastcgi_temp \
         /tmp/nginx/uwsgi_temp \
         /tmp/nginx/scgi_temp

# `exec` replaces the shell, so nginx becomes PID 1 and receives SIGTERM
# directly. Without it the shell would hold PID 1 and swallow the signal,
# leaving the container to be killed on timeout at every shutdown.
exec nginx -g 'daemon off;'
