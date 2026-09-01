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

[[ -f .env ]]     || die ".env 가 없다. .env.example 을 복사해서 채워라."
[[ -f api.env ]]  || die "api.env 가 없다. ../apps/api/.env.example 을 참고해서 만들어라."
set -a; source .env; set +a

REPO_ROOT="$(cd .. && pwd)"
COMPOSE=(docker compose -f docker-compose.yml --env-file .env)
IMAGE="${IMAGE:-korio-api}"
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
  "${COMPOSE[@]}" up -d --no-build "api_$other"
  wait_healthy "korio_api_$other" || die "롤백 대상이 안 뜬다. $cur 는 그대로 두고 멈춘다."
  sleep 5
  log "$cur 내린다"
  "${COMPOSE[@]}" stop "api_$cur"
  log "롤백 완료 → $other"
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

  log "이미지 빌드: ${IMAGE}:${tag}"
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

  # Caddy 는 항상 떠 있어야 한다 (인증서·라우팅). 이미 떠 있으면 no-op
  "${COMPOSE[@]}" up -d caddy

  local cur next; cur="$(current_color)"; next="$(other_color "$cur")"
  [[ "$cur" == none ]] && next=blue
  log "현재: ${cur} → 새로 띄울 색: ${GRN}${next}${RST} (태그 ${tag})"

  # 새 색을 강제로 다시 만든다 (이미지 태그가 같아도 새 이미지를 쓰게)
  "${COMPOSE[@]}" up -d --force-recreate --no-deps "api_$next"

  if ! wait_healthy "korio_api_$next"; then
    warn "새 컨테이너가 안 뜬다. 되돌린다 — ${cur} 는 계속 서비스 중이다."
    "${COMPOSE[@]}" stop "api_$next" || true
    die "배포 중단. 유저 영향 없음."
  fi

  # Caddy 의 health_interval 이 3초다. 새 색을 인지할 시간을 준다.
  log "Caddy 가 새 색을 인지하도록 대기 (5초)"
  sleep 5

  if [[ "$cur" != none ]]; then
    log "옛 색 ${cur} 내린다 (SIGTERM → 드레인 → 종료)"
    "${COMPOSE[@]}" stop "api_$cur"
  fi

  log "배포 완료 → ${GRN}${next}${RST} (${IMAGE}:${tag})"
  cmd_status
}

case "${1:-}" in
  --status)   cmd_status ;;
  --rollback) cmd_rollback ;;
  --tag)      [[ -n "${2:-}" ]] || die "--tag 뒤에 태그를 줘라"; cmd_deploy "$2" ;;
  "")         cmd_deploy ;;
  *)          die "모르는 옵션: $1  (--status / --rollback / --tag <이름>)" ;;
esac
