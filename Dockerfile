# ── Build stage ──────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
# Reproducible install from the lockfile (fails fast if out of sync)
RUN npm ci --no-audit --no-fund

COPY . .
# The build tolerates a missing PAYLOAD_SECRET (NEXT_PHASE guard in
# payload.config.ts); the real secret is required at runtime.
RUN npm run build
# Strip devDependencies from the final node_modules
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

# Run as unprivileged user (host volumes must be owned by UID 1000, see RUNBOOK)
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

# Apply pending DB migrations, then start the server
CMD ["sh", "-c", "npx payload migrate && npx next start"]
