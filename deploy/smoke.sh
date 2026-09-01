#!/usr/bin/env bash
#
# 무중단 증명. 배포하는 동안 계속 요청을 때려서 **하나라도 실패하면 실패**로 친다.
#
#   ./smoke.sh                    → 부하를 걸면서 ./deploy.sh 를 돌린다
#   ./smoke.sh --url https://...  → 대상 주소 지정 (기본: .env 의 API_DOMAIN)
#   ./smoke.sh --only-load 60     → 배포 없이 60초 동안 부하만 (기준선 측정)
#
# 첫 배포 때 반드시 한 번 돌려라. 여기서 실패가 0 이 아니면 무중단이 아니다.

set -Eeuo pipefail
cd "$(dirname "$0")"
[[ -f .env ]] && { set -a; source .env; set +a; }

URL="https://${API_DOMAIN:-localhost}/lessons/roadmap"
ONLY_LOAD=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --url) URL="$2"; shift 2 ;;
    --only-load) ONLY_LOAD="${2:-30}"; shift 2 ;;
    *) echo "모르는 옵션: $1"; exit 1 ;;
  esac
done

# 인증이 필요한 경로라 401 이 온다. 그건 "서버가 살아서 응답했다" 는 뜻이라 성공으로 친다.
# 진짜 실패는 연결 자체가 끊기거나(000) 5xx 가 뜨는 것이다.
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
STOP="$TMP/stop"

load() {
  local n=0 ok=0 bad=0
  while [[ ! -f "$STOP" ]]; do
    local code
    code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$URL" || echo 000)"
    n=$((n+1))
    if [[ "$code" == "000" || "$code" =~ ^5 ]]; then
      bad=$((bad+1)); echo "$(date +%T) ✖ $code" >> "$TMP/fail.log"
    else
      ok=$((ok+1))
    fi
    sleep 0.05
  done
  echo "$n $ok $bad" > "$TMP/result"
}

echo "▸ 대상: $URL"
echo "▸ 부하 시작 (초당 ~20회)"
load & LOAD_PID=$!
sleep 3

if [[ -n "$ONLY_LOAD" ]]; then
  echo "▸ 배포 없이 ${ONLY_LOAD}초 부하만 (기준선)"
  sleep "$ONLY_LOAD"
else
  echo "▸ 배포 실행 — 이 동안 요청이 끊기면 안 된다"
  echo "─────────────────────────────────────────────"
  ./deploy.sh || echo "  (배포가 실패해도 부하 결과는 본다)"
  echo "─────────────────────────────────────────────"
  echo "▸ 배포 후 10초 더 관찰"
  sleep 10
fi

touch "$STOP"; wait "$LOAD_PID" 2>/dev/null || true
read -r TOTAL OK BAD < "$TMP/result"

echo
echo "══════════ 결과 ══════════"
printf '  총 요청 %s / 성공 %s / 실패 %s\n' "$TOTAL" "$OK" "$BAD"
if [[ "$BAD" -eq 0 ]]; then
  printf '  \033[32m무중단 확인 ✅\033[0m\n'
  exit 0
fi
printf '  \033[31m끊김 발생 ✖\033[0m — 실패한 시각:\n'
head -20 "$TMP/fail.log" | sed 's/^/    /'
echo
echo "  점검할 것:"
echo "   1) deploy/api.env 의 SHUTDOWN_DRAIN_MS 가 Caddy health_interval(3s)보다 큰가"
echo "   2) docker compose 의 stop_grace_period 가 드레인 시간보다 긴가"
echo "   3) docker logs korio_caddy 에 업스트림 오류가 있나"
exit 1
