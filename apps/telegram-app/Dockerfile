# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /repo

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY patches ./patches
COPY apps/telegram-app/package.json ./apps/telegram-app/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter telegram-app...

FROM deps AS build
COPY apps/telegram-app ./apps/telegram-app
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config
ENV TELEGRAM_STATIC_EXPORT=true
RUN pnpm --filter telegram-app build \
    && test -f apps/telegram-app/out/index.html

FROM nginx:1.28-alpine AS runtime
COPY apps/telegram-app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/telegram-app/out /usr/share/nginx/html

EXPOSE 8080
HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null || exit 1
