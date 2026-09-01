# syntax=docker/dockerfile:1.7
#
# KORIO API 이미지. 빌드 컨텍스트는 **레포 루트**다 (pnpm 워크스페이스라
# 루트의 lockfile·워크스페이스 정의가 필요하다).
#
#   docker build -f apps/api/Dockerfile -t korio-api:TAG .
#
# alpine 이 아니라 debian slim 을 쓴다. bcrypt 가 네이티브 모듈이라 musl 에선
# 미리 빌드된 바이너리가 없어 매번 컴파일하고, 그러다 실패하면 배포가 멈춘다.

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN corepack enable
WORKDIR /repo

# ── 의존성만 따로 (소스가 바뀌어도 이 레이어는 캐시된다) ──
FROM base AS deps
# 네이티브 모듈이 미리 빌드된 바이너리를 못 받을 때를 대비한 컴파일 도구.
# 빌드 스테이지에만 있고 실행 이미지엔 안 들어간다.
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
# patchedDependencies 가 가리키는 파일. 없으면 install 이 죽는다
COPY patches ./patches
# 워크스페이스 멤버의 package.json 만 먼저 — 소스는 아직 필요 없다
COPY apps/api/package.json ./apps/api/
COPY apps/mobile/package.json ./apps/mobile/
# --filter api... = api 와 그 의존 워크스페이스만. 모바일 RN 의존성(수 GB)은 건너뛴다
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter api...

# ── 컴파일 ──
FROM deps AS build
COPY apps/api ./apps/api
RUN pnpm --filter api run build

# ── 실행 이미지에 넣을 프로덕션 의존성만 ──
FROM deps AS prod-deps
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod --filter api...

# ── 실행 ──
FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /repo/apps/api

# 헬스체크가 컨테이너 안에서 도니 curl 이 필요 없다 — node 로 찌른다.
# tini 로 PID 1 을 잡아야 SIGTERM 이 node 까지 제대로 전달된다.
RUN apt-get update && apt-get install -y --no-install-recommends tini \
    && rm -rf /var/lib/apt/lists/*

COPY --from=prod-deps /repo/node_modules /repo/node_modules
COPY --from=prod-deps /repo/apps/api/node_modules /repo/apps/api/node_modules
COPY --from=build     /repo/apps/api/dist         /repo/apps/api/dist
COPY --from=build     /repo/apps/api/package.json /repo/apps/api/package.json

# root 로 돌리지 않는다
USER node

EXPOSE 3000
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "dist/main"]
