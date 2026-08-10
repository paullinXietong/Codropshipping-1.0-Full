FROM node:22.13-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --no-cache sqlite \
    && npm ci --omit=dev

COPY src ./src
COPY scripts ./scripts

ENV NODE_ENV=production \
    PORT=8789 \
    LISTING_DB_PATH=/app/data/listings.sqlite

RUN addgroup -S nodejs \
    && adduser -S appuser -G nodejs \
    && mkdir -p /app/data /app/backups \
    && chown -R appuser:nodejs /app

USER appuser
EXPOSE 8789

HEALTHCHECK --interval=20s --timeout=5s --start-period=15s --retries=5 \
  CMD wget -qO- http://127.0.0.1:8789/health >/dev/null || exit 1

CMD ["node", "src/server.js"]
