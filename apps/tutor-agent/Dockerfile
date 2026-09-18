# syntax=docker/dockerfile:1.7
#
# KORIO Tutor Agent 이미지. 빌드 컨텍스트는 **레포 루트**다 (pnpm 워크스페이스라
# 루트의 lockfile·워크스페이스 정의가 필요하다).
#
#   docker build -f apps/tutor-agent/Dockerfile -t korio-tutor-agent:TAG .
#
# ⚠️ API 와 달리 **HTTP 서비스가 아니다.** 인바운드 트래픽이 없고 Caddy 뒤에도
#    안 붙는다. LiveKit 에 스스로 등록해서 job 을 기다리는 outbound worker 다.
#    그래서 blue/green 도 안 쓴다 — 두 색이 같은 agentName 으로 동시에 등록되면
#    dispatch 가 둘 중 아무 데나 간다.
#
# alpine 이 아니라 debian slim 을 쓴다. @livekit/rtc-node 와 @livekit/local-inference
# 가 glibc 네이티브 바이너리라 musl 에선 아예 안 돈다.

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN corepack enable
WORKDIR /repo

# ── 의존성만 따로 (소스가 바뀌어도 이 레이어는 캐시된다) ──
FROM base AS deps
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
# patchedDependencies 가 가리키는 파일. 없으면 install 이 죽는다
# (expo-linear-gradient 패치는 이 앱과 무관해서 적용 안 된다는 경고만 뜬다)
COPY patches ./patches
# 워크스페이스 멤버의 package.json 만 먼저 — 소스는 아직 필요 없다.
# ⚠️ api/mobile 것은 **일부러 안 가져온다.** 락파일에 그 importer 들이 있어도
#    pnpm 은 --frozen-lockfile 로 그냥 넘어간다 (확인함).
COPY apps/tutor-agent/package.json ./apps/tutor-agent/
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter tutor-agent...

# ── 컴파일 ──
FROM deps AS build
COPY apps/tutor-agent ./apps/tutor-agent
RUN pnpm --filter tutor-agent run build \
    # dist 가 안 나왔는데 조용히 넘어가면 실행 이미지가 빈 채로 만들어진다
    && test -f apps/tutor-agent/dist/agent.js

# ── 실행 이미지에 넣을 프로덕션 의존성만 ──
FROM deps AS prod-deps
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod --filter tutor-agent...
# .npmrc 가 node-linker=hoisted 라 의존성이 전부 **루트** node_modules 에 펴진다.
# apps/tutor-agent/node_modules 는 안 생기는 게 정상이고, 그대로 COPY 하면
# "not found" 로 빌드가 죽는다. 없으면 빈 디렉터리를 만들어 둔다.
RUN mkdir -p /repo/apps/tutor-agent/node_modules

# ── 실행 ──
FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /repo/apps/tutor-agent

# tini 로 PID 1 을 잡아야 SIGTERM 이 node 까지 제대로 전달된다.
# 안 그러면 배포할 때 통화 중인 세션이 드레인 없이 끊긴다.
RUN apt-get update && apt-get install -y --no-install-recommends tini \
    && rm -rf /var/lib/apt/lists/*

# 런타임 모듈 해석: WORKDIR 이 /repo/apps/tutor-agent 라 node 가 위로 올라가며
# /repo/apps/tutor-agent/node_modules → /repo/node_modules 순서로 찾는다.
COPY --from=prod-deps /repo/node_modules                     /repo/node_modules
COPY --from=prod-deps /repo/apps/tutor-agent/node_modules    /repo/apps/tutor-agent/node_modules
COPY --from=build     /repo/apps/tutor-agent/dist            /repo/apps/tutor-agent/dist
# "type": "module" 이 여기 있어야 dist/*.js 가 ESM 으로 로드된다
COPY --from=build     /repo/apps/tutor-agent/package.json    /repo/apps/tutor-agent/package.json

# root 로 돌리지 않는다
USER node

# ⚠️ 서비스 포트가 아니라 **헬스체크 전용**이다. 밖으로 안 연다.
#    GET / 는 LiveKit WebSocket 이 실제로 붙어 있을 때만 200 을 준다 —
#    프로세스가 살아 있는 것과 worker 가 등록된 것은 다르다.
EXPOSE 8081

ENTRYPOINT ["/usr/bin/tini", "--"]
# start = production 모드 (헬스 서버 8081, idle 프로세스 프리워밍)
CMD ["node", "dist/agent.js", "start"]
