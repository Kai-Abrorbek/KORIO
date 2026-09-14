# syntax=docker/dockerfile:1.7
#
# 어드민 운영 콘솔 — 정적 export 를 nginx 가 서빙한다 (telegram-app 과 같은 방식).
#
# 서버 렌더링을 안 쓰는 대가가 없다: 어드민의 모든 데이터는 로그인한 뒤
# 토큰으로 가져오므로 어차피 브라우저에서 부른다. `/api/*` 는 Caddy 가 같은
# 오리진으로 API 에 넘긴다.

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /repo

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY patches ./patches
COPY apps/admin/package.json ./apps/admin/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
# ⚠️ --frozen-lockfile 은 pnpm-lock.yaml 에 apps/admin 이 들어 있어야 통과한다.
#    워크스페이스를 새로 만든 뒤 루트에서 `pnpm install` 을 한 번 돌리고
#    락파일을 커밋해라. 안 그러면 여기서 멈춘다 (그게 맞다 — 락파일 없이
#    배포하면 로컬과 서버가 다른 버전을 쓰게 된다).
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter admin...

FROM deps AS build
COPY apps/admin ./apps/admin
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config
ENV ADMIN_STATIC_EXPORT=true
RUN pnpm --filter admin build \
    && test -f apps/admin/out/index.html

FROM nginx:1.28-alpine AS runtime
COPY apps/admin/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/admin/out /usr/share/nginx/html

EXPOSE 8080
HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null || exit 1
