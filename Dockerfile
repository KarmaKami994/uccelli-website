# ── Build stage ──────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build
RUN npm prune --omit=dev

# ── Runtime stage ────────────────────────────────────────
FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app ./
RUN mkdir -p /app/data /app/media && chown -R node:node /app/data /app/media

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

# Schema migrations run first. The versioned content sync then imports the
# validated legacy copy exactly once and preserves later CMS edits.
CMD ["sh", "-c", "npx payload migrate && npm run content:sync && npx next start"]
