#!/usr/bin/env bash
#
# KORIO API 무중단 배포.
#
#   ./deploy.sh              레포 현재 커밋으로 빌드 → 배포
#   ./deploy.sh --tag v1.2.3 태그 지정
#   ./deploy.sh --rollback   직전 색으로 되돌린다 (이미지는 그대로 남아 있다)
#   ./deploy.sh --status     지금 어느 색이 트래픽을 받는지
#
# 흐름:
#   1) 새 이미지를 빌드한다 (실패하면 여기서 멈춘다 — 서비스는 안 건드림)
#   2) 지금 안 쓰는 색으로 새 컨테이너를 띄운다
#   3) /ready 가 통과할 때까지 기다린다 (DB 연결까지 확인)
#   4) Caddy 가 알아서 새 색으로 보낸다 (lb_policy first + 헬스체크)
#   5) 옛 색을 내린다 — SIGTERM → 드레인 → 종료
#
# 어느 단계에서 실패해도 **옛 컨테이너는 계속 떠 있다.** 그래서 안전하다.

set -Eeuo pipefail
cd "$(dirname "$0")"

RED=$'\033[31m'; GRN=$'\033[32m'; YEL=$'\033[33m'; DIM=$'\033[2m'; RST=$'\033[0m'
log()  { printf '%s▸%s %s\n' "$GRN" "$RST" "$*"; }
warn() { printf '%s!%s %s\n' "$YEL" "$RST" "$*"; }
die()  { printf '%s✖%s %s\n' "$RED" "$RST" "$*" >&2; exit 1; }

command -v docker >/dev/null 2>&1 || die "도커가 없다. sudo bash server-setup.sh"
docker compose version >/dev/null 2>&1 \
  || die "docker compose(v2) 가 없다. sudo apt-get install -y docker-compose-plugin"
docker buildx version >/dev/null 2>&1 \
  || die "docker buildx 가 없다. sudo apt-get install -y docker-buildx-plugin"

[[ -f .env ]]     || die ".env 가 없다. .env.example 을 복사해서 채워라."
[[ -f api.env ]]  || die "api.env 가 없다. cp api.env.example api.env 하고 채워라."
# Agent 는 GOOGLE_API_KEY 를 따로 쓴다. api.env 에 섞지 않는다
[[ -f agent.env ]] || die "agent.env 가 없다. cp agent.env.example agent.env 하고 채워라."
set -a; source .env; set +a

REPO_ROOT="$(cd .. && pwd)"
COMPOSE=(docker compose -f docker-compose.yml --env-file .env)
IMAGE="${IMAGE:-korio-api}"
TELEGRAM_IMAGE="${TELEGRAM_IMAGE:-korio-telegram}"
ADMIN_IMAGE="${ADMIN_IMAGE:-korio-admin}"
AGENT_IMAGE="${AGENT_IMAGE:-korio-tutor-agent}"
READY_TIMEOUT="${READY_TIMEOUT:-120}"

# ── 지금 트래픽을 받는 색 ──
# Caddyfile 의 lb_policy first 는 blue 를 먼저 본다. 즉 blue 가 떠 있으면 blue 가,
# 아니면 green 이 받는다. 그래서 "실행 중인 색" 이 곧 "현재 색" 이다.
current_color() {
  if docker ps --filter name=korio_api_blue --filter status=running -q | grep -q .; then
    echo blue
  elif docker ps --filter name=korio_api_green --filter status=running -q | grep -q .; then
    echo green
  else
    echo none
  fi
}
other_color() { [[ "$1" == blue ]] && echo green || echo blue; }

# ⚠️ **서비스를 추가하면 여기 두 줄만 고친다.**
#    예전엔 색 쌍이 6군데에 하드코딩돼 있었다. 하나를 빠뜨리면 배포는 성공한
#    것처럼 보이는데 그 서비스만 옛 버전으로 남는다 — 아무도 에러를 안 봐서
#    한참 뒤에야 발견된다.
color_services()   { local c="$1"; echo "api_$c telegram_$c admin_$c"; }
color_containers() { local c="$1"; echo "korio_api_$c korio_telegram_$c korio_admin_$c"; }

# ⚠️ 튜터 Agent 는 위 목록에 **일부러 없다.**
#    인바운드 트래픽이 없어서 무중단의 대상이 아니고, 무엇보다 두 색이 동시에
#    뜨면 둘 다 같은 agentName 으로 LiveKit 에 등록돼서 dispatch 가 갈린다.
#    (배포 직후 절반의 통화가 옛 프롬프트로 도는, 아무도 못 알아채는 고장)
#    그래서 단일 컨테이너를 그 자리에서 갈아끼운다.
AGENT_SERVICE="tutor_agent"
AGENT_CONTAINER="korio_tutor_agent"

# ── 디스크 ──
#
# 빌드는 pnpm store 캐시 + 이미지 레이어로 몇 GB 를 쓴다. 모자라면 빌드가
# 40초쯤 돌다가 ENOSPC 로 죽는다 — 에러가 pnpm 안쪽에서 나와서 원인이
# 디스크라는 걸 알아채기 어렵다. 그래서 **빌드 전에** 확인하고, 모자라면
# 먼저 치워본다.
MIN_FREE_GB="${MIN_FREE_GB:-6}"

free_gb() { df -P / | awk 'NR==2 {print int($4/1024/1024)}'; }

# 배포할 때마다 이미지 4개가 :<sha> 로 새로 생긴다. 안 지우면 쌓이기만 한다.
#
# 태그 이름으로 지운다 (ID 아님): 같은 이미지에 :latest 가 같이 붙어 있으면
# ID 로 지우는 건 거부되고, 태그로 지우면 그냥 태그만 떨어진다.
# 컨테이너가 쓰는 이미지는 docker 가 거부한다 — 옛 색 컨테이너는 stop 만 하고
# 남겨두므로 **롤백용 이미지는 안 지워진다.**
KEEP_IMAGES="${KEEP_IMAGES:-3}"

prune_images() {
  local repo
  for repo in "$IMAGE" "$TELEGRAM_IMAGE" "$ADMIN_IMAGE" "$AGENT_IMAGE"; do
    docker images "$repo" --format '{{.Repository}}:{{.Tag}}' 2>/dev/null \
      | grep -v ':latest$' | awk "NR>${KEEP_IMAGES}" \
      | xargs -r docker rmi >/dev/null 2>&1 || true
  done
  # 빌드 캐시도 상한을 둔다. 최근 것은 남겨야 다음 빌드가 pnpm store 를 재사용한다
  docker builder prune -f --filter "until=${BUILD_CACHE_KEEP_HOURS:-168}h" >/dev/null 2>&1 || true
  docker image prune -f >/dev/null 2>&1 || true
}

ensure_disk() {
  local free; free="$(free_gb)"
  (( free >= MIN_FREE_GB )) && return 0
  warn "디스크 여유 ${free}GB (${MIN_FREE_GB}GB 필요) — 먼저 정리한다"
  prune_images
  free="$(free_gb)"
  (( free >= MIN_FREE_GB )) && { log "정리 후 ${free}GB 확보"; return 0; }
  die "디스크 여유 ${free}GB. 빌드가 중간에 죽는다. 손으로 더 치워라:
    docker builder prune -f
    docker image prune -a -f --filter until=72h
    sudo truncate -s 0 /var/lib/docker/containers/*/*-json.log"
}

# 한 색의 모든 컨테이너가 healthy 가 될 때까지. 하나라도 실패하면 1
wait_color_healthy() {
  local name
  for name in $(color_containers "$1"); do
    wait_healthy "$name" || return 1
  done
}

# ── 컨테이너가 healthy 가 될 때까지 ──
wait_healthy() {
  local name="$1" waited=0
  log "$name 이 준비될 때까지 기다린다 (최대 ${READY_TIMEOUT}초)"
  while (( waited < READY_TIMEOUT )); do
    local state
    state="$(docker inspect -f '{{.State.Health.Status}}' "$name" 2>/dev/null || echo missing)"
    case "$state" in
      healthy) log "$name ${GRN}healthy${RST} (${waited}초)"; return 0 ;;
      unhealthy)
        warn "$name 이 unhealthy 다. 최근 로그:"
        docker logs --tail 40 "$name" || true
        return 1 ;;
      missing) warn "$name 컨테이너가 없다"; return 1 ;;
    esac
    sleep 2; waited=$((waited+2))
    printf '%s  ... %ss (%s)%s\n' "$DIM" "$waited" "$state" "$RST"
  done
  warn "$name 이 ${READY_TIMEOUT}초 안에 준비되지 않았다. 최근 로그:"
  docker logs --tail 40 "$name" || true
  return 1
}

cmd_status() {
  local cur; cur="$(current_color)"
  printf '현재 트래픽: %s%s%s\n\n' "$GRN" "$cur" "$RST"
  docker ps --filter name=korio_ --format 'table {{.Names}}\t{{.Status}}\t{{.Image}}'
}

cmd_rollback() {
  local cur other; cur="$(current_color)"; other="$(other_color "$cur")"
  [[ "$cur" == none ]] && die "지금 떠 있는 게 없다. 롤백할 대상이 없다."
  log "롤백: $cur → $other (이전 이미지로 뜬 컨테이너를 다시 올린다)"
  # shellcheck disable=SC2046  # 서비스 이름을 인자로 쪼개는 게 의도다
  "${COMPOSE[@]}" up -d --no-build $(color_services "$other")
  if ! wait_color_healthy "$other"; then
    warn "롤백 대상이 완전히 준비되지 않았다. 새로 띄운 후보를 다시 내린다."
    "${COMPOSE[@]}" stop $(color_services "$other") || true
    die "롤백 중단. 현재 ${cur} 서비스는 그대로 유지된다."
  fi
  sleep 5
  log "$cur 내린다"
  "${COMPOSE[@]}" stop $(color_services "$cur")
  log "롤백 완료 → $other"
  # Agent 는 색이 없어서 이 롤백에 안 딸려 온다. 프롬프트 계약이 바뀐
  # 배포를 되돌리는 거라면 Agent 도 같이 내려야 한다
  warn "튜터 Agent 는 롤백 대상이 아니다 (색이 없는 단일 컨테이너)."
  warn "  프롬프트/metadata 계약이 바뀐 배포였다면:  ./deploy.sh --tag <이전태그>"
}

cmd_deploy() {
  local tag="${1:-}"
  if [[ -z "$tag" ]]; then
    tag="$(git -C "$REPO_ROOT" rev-parse --short HEAD 2>/dev/null || date +%Y%m%d%H%M%S)"
  fi
  export TAG="$tag"

  # 빌드는 서버에서 돈다. 그동안 옛 컨테이너가 계속 서비스 중이라
  # 빌드가 CPU 를 다 먹으면 끊기진 않아도 **응답이 느려진다**.
  # 코어가 하나뿐인 서버(Hostinger KVM 1 등)에서 특히 티가 난다.
  # BUILD_CPUS 로 빌드에 줄 코어를 제한한다. 0 이면 제한 없음.
  local cpus="${BUILD_CPUS:-}"
  if [[ -z "$cpus" ]]; then
    local total; total="$(nproc 2>/dev/null || echo 1)"
    # 코어 1개면 절반만, 2개 이상이면 하나는 서비스용으로 남긴다
    if (( total <= 1 )); then cpus="0.5"; else cpus="$((total - 1))"; fi
  fi
  if [[ "$cpus" != "0" ]]; then
    log "빌드에 CPU ${cpus}개만 준다 (서비스 응답을 지키려고). BUILD_CPUS=0 이면 해제"
  fi

  # Caddy 를 먼저 띄운다. 앱 이미지와 무관하고, 인증서 발급이 빌드와 병렬로
  # 돌아 시간이 준다. 무엇보다 빌드가 5~10분 도는 동안 `docker logs -f
  # korio_caddy` 로 인증서 진행을 볼 수 있다 — 예전엔 빌드 뒤에 떠서
  # 그때까지 컨테이너가 아예 없었다.
  # (아직 api 가 없어 502 를 내지만, 첫 배포엔 트래픽이 없고 두 번째부터는
  #  이미 떠 있어서 no-op 다)
  ensure_disk

  log "Caddy 기동 (인증서 발급이 빌드와 함께 돈다)"
  "${COMPOSE[@]}" up -d caddy

  # ⚠️ Caddyfile 은 **바인드 마운트**라 파일만 바꾸면 compose 는 "변경 없음" 으로
  # 보고 컨테이너를 다시 만들지 않는다. 이미 떠 있는 Caddy 는 옛 설정을 메모리에
  # 들고 계속 돈다 — 새 도메인 블록을 추가해도 반영이 안 된다.
  # (실제로 korio.online 을 추가했는데 인증서를 못 받는 상태로 한참 헤맸다)
  # 무중단으로 설정만 다시 읽힌다. 실패해도 배포는 계속한다.
  if docker exec korio_caddy caddy reload --config /etc/caddy/Caddyfile \
       --adapter caddyfile >/dev/null 2>&1; then
    log "Caddy 설정 리로드됨"
  else
    warn "Caddy 리로드 실패 — 설정 문법을 확인해라: docker exec korio_caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile"
  fi

  log "이미지 빌드: ${IMAGE}:${tag}"
  log "  진행 보기:  docker logs -f korio_caddy   (다른 터미널)"
  # docker build 는 --cpus 를 안 받는다. buildx 컨테이너가 아니라 데몬이 돌리기
  # 때문이다. 그래서 systemd-run 이 있으면 그걸로 감싸고, 없으면 그냥 돈다.
  local runner=()
  if [[ "$cpus" != "0" ]] && command -v systemd-run >/dev/null 2>&1; then
    runner=(systemd-run --scope -q -p "CPUQuota=$(awk -v c="$cpus" 'BEGIN{printf "%d", c*100}')%")
  fi
  "${runner[@]}" docker build \
    -f "$REPO_ROOT/apps/api/Dockerfile" \
    -t "${IMAGE}:${tag}" \
    -t "${IMAGE}:latest" \
    "$REPO_ROOT" \
    || die "빌드 실패. 서비스는 아무것도 안 건드렸다." 

  log "Telegram Mini App 이미지 빌드: ${TELEGRAM_IMAGE}:${tag}"
  "${runner[@]}" docker build \
    -f "$REPO_ROOT/apps/telegram-app/Dockerfile" \
    -t "${TELEGRAM_IMAGE}:${tag}" \
    -t "${TELEGRAM_IMAGE}:latest" \
    "$REPO_ROOT" \
    || die "Telegram Mini App 빌드 실패. 서비스는 아무것도 안 건드렸다."

  log "운영 콘솔 이미지 빌드: ${ADMIN_IMAGE}:${tag}"
  # ⚠️ 여기서 "lockfile is not up to date" 로 멈추면, apps/admin 이
  #    pnpm-lock.yaml 에 아직 없다는 뜻이다. 레포 루트에서 `pnpm install` 한 번
  #    돌리고 락파일을 커밋해라.
  "${runner[@]}" docker build \
    -f "$REPO_ROOT/apps/admin/Dockerfile" \
    -t "${ADMIN_IMAGE}:${tag}" \
    -t "${ADMIN_IMAGE}:latest" \
    "$REPO_ROOT" \
    || die "운영 콘솔 빌드 실패. 서비스는 아무것도 안 건드렸다."

  log "튜터 Agent 이미지 빌드: ${AGENT_IMAGE}:${tag}"
  # ⚠️ "lockfile is not up to date" 로 멈추면 apps/tutor-agent 가
  #    pnpm-lock.yaml 에 아직 없다는 뜻이다. 레포 루트에서 `pnpm install` 한 번
  #    돌리고 락파일을 커밋해라.
  "${runner[@]}" docker build \
    -f "$REPO_ROOT/apps/tutor-agent/Dockerfile" \
    -t "${AGENT_IMAGE}:${tag}" \
    -t "${AGENT_IMAGE}:latest" \
    "$REPO_ROOT" \
    || die "튜터 Agent 빌드 실패. 서비스는 아무것도 안 건드렸다."

  local cur next; cur="$(current_color)"; next="$(other_color "$cur")"
  [[ "$cur" == none ]] && next=blue
  log "현재: ${cur} → 새로 띄울 색: ${GRN}${next}${RST} (태그 ${tag})"

  # 새 색을 강제로 다시 만든다 (이미지 태그가 같아도 새 이미지를 쓰게)
  "${COMPOSE[@]}" up -d --force-recreate --no-deps $(color_services "$next")

  if ! wait_color_healthy "$next"; then
    warn "새 컨테이너가 안 뜬다. 되돌린다 — ${cur} 는 계속 서비스 중이다."
    "${COMPOSE[@]}" stop $(color_services "$next") || true
    die "배포 중단. 유저 영향 없음."
  fi

  # Caddy 의 health_interval 이 3초다. 새 색을 인지할 시간을 준다.
  log "Caddy 가 새 색을 인지하도록 대기 (5초)"
  sleep 5

  if [[ "$cur" != none ]]; then
    log "옛 색 ${cur} 내린다 (SIGTERM → 드레인 → 종료)"
    "${COMPOSE[@]}" stop $(color_services "$cur")
  fi

  # ── 튜터 Agent ──
  #
  # blue/green 이 끝난 **뒤에** 한다. Agent 가 만드는 프롬프트는 API 가 주는
  # 것이라, API 가 새 버전이 된 다음에 Agent 를 올려야 계약이 안 어긋난다.
  #
  # 여기서 실패해도 **API 배포는 이미 끝났다.** 그래서 die 하지 않고 경고만
  # 남긴다 — 튜터 통화만 죽고 나머지 앱은 멀쩡하다.
  deploy_agent || warn "튜터 Agent 가 안 떴다. 통화만 죽은 상태다 — 나머지는 정상."

  # 성공했을 때만 치운다. 실패한 배포 뒤엔 되돌릴 이미지가 더 필요하다
  log "옛 이미지 정리 (종류별 최근 ${KEEP_IMAGES}개는 남긴다)"
  prune_images

  log "배포 완료 → ${GRN}${next}${RST} (${IMAGE}:${tag}) · 디스크 여유 $(free_gb)GB"
  cmd_status
}

# 단일 컨테이너를 그 자리에서 갈아끼운다.
# 이 몇 초 동안 **새로 시작하는 통화만** 실패한다 (기존 통화는 드레인된다).
deploy_agent() {
  log "튜터 Agent 교체: ${AGENT_IMAGE}:${TAG}"
  "${COMPOSE[@]}" up -d --force-recreate --no-deps "$AGENT_SERVICE" || return 1
  # healthy = 프로세스가 산 게 아니라 **LiveKit 에 등록됐다**는 뜻이다.
  # 이게 통과해야 dispatch 가 실제로 이 컨테이너로 온다
  if ! wait_healthy "$AGENT_CONTAINER"; then
    warn "Agent 가 LiveKit 에 등록되지 않았다. 흔한 원인:"
    warn "  · agent.env 의 LIVEKIT_URL / API_KEY / API_SECRET 오타"
    warn "  · GOOGLE_API_KEY 누락 (첫 세션에서만 터지니 로그를 봐라)"
    warn "  · agent.env 와 api.env 의 LIVEKIT_TUTOR_AGENT_NAME 불일치"
    return 1
  fi
  # 이름이 어긋나면 dispatch 가 조용히 아무 데도 안 간다. 실제 등록된 이름을 찍어준다
  local registered
  # ⚠️ `|| true` 가 꼭 있어야 한다. set -Eeuo pipefail 이라 docker exec 가
  #    실패하면 대입문에서 스크립트가 통째로 죽는다 — 배포가 다 끝난 뒤에
  #    이름 확인 하나 때문에 죽는 건 말이 안 된다
  registered="$(docker exec "$AGENT_CONTAINER" node -e \
    "fetch('http://127.0.0.1:8081/worker').then(r=>r.json()).then(j=>console.log(j.agent_name)).catch(()=>{})" \
    2>/dev/null | tr -d '\r\n' || true)"
  local expected
  # 마찬가지로 grep 이 못 찾으면(=값이 아직 없으면) pipefail 이 1 을 돌려준다
  expected="$(grep -E '^LIVEKIT_TUTOR_AGENT_NAME=' api.env | head -1 | cut -d= -f2- | tr -d ' "'"'"'' || true)"
  expected="${expected:-korio-tutor}"
  if [[ -n "$registered" && "$registered" != "$expected" ]]; then
    warn "Agent 등록 이름이 '${registered}' 인데 api.env 는 '${expected}' 를 부른다 — dispatch 가 아무 데도 안 간다"
    return 1
  fi
  log "튜터 Agent ${GRN}등록됨${RST} (agentName=${registered:-$expected})"
}

case "${1:-}" in
  --status)   cmd_status ;;
  --rollback) cmd_rollback ;;
  --tag)      [[ -n "${2:-}" ]] || die "--tag 뒤에 태그를 줘라"; cmd_deploy "$2" ;;
  "")         cmd_deploy ;;
  *)          die "모르는 옵션: $1  (--status / --rollback / --tag <이름>)" ;;
esac
