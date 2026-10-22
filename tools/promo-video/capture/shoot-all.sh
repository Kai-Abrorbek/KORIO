#!/usr/bin/env bash
# 영상에 들어가는 장면을 전부 찍는다 → public/clips/<scene>.mp4 (+ .sounds.json)
# 텔레그램 dev 서버(3002)가 떠 있고 무대가 깔려 있어야 한다 (node capture/stage.mjs up).
#   bash capture/shoot-all.sh            # 전부
#   bash capture/shoot-all.sh tutor topik  # 몇 개만
set -euo pipefail
cd "$(dirname "$0")/.."

shoot() {
  local scene=$1 ms=$2 query=${3:-} actions=${4:-[]}
  if [ ${#ONLY[@]} -gt 0 ] && [[ ! " ${ONLY[*]} " =~ " $scene " ]]; then return; fi
  echo "▶ $scene ($ms ms)"
  PROMO_ACTIONS="$actions" node capture/capture.mjs shoot "$scene" "$ms" "$query"
}
ONLY=("$@")

# 질문만 떠 있는 4.5초 + 대화 10초 + 마지막 내레이션 동안 3초
shoot tutor 17500
shoot lesson 3600 "lessonId=promo&category=vocabulary" '[{"at":800,"click":"button:has-text(\"사과\")"},{"at":1500,"click":"button:has-text(\"Tekshirish\")"}]'
shoot speaking 4800 "lessonId=promo&category=vocabulary" '[{"at":700,"click":"button[aria-label=\"Gapirish\"]","wait":1800},{"at":1900,"click":"button[aria-label=\"Gapirish\"]","wait":600}]'
shoot stamp 4500 "xp=45&accuracy=96&time=154"
shoot hangul 3200
shoot topik 3600 "groupCode=r40" '[{"at":900,"click":"button:has-text(\"월요일에도\")"},{"at":1900,"click":"button:has-text(\"Tekshirish\")","wait":300}]'
# 이번 주 월~목 공부, 목요일이 오늘 — 30일째
shoot streak 4500 "streak=30&week=%5B%7B%22date%22%3A%222026-10-19%22%2C%22studied%22%3Atrue%2C%22isToday%22%3Afalse%7D%2C%7B%22date%22%3A%222026-10-20%22%2C%22studied%22%3Atrue%2C%22isToday%22%3Afalse%7D%2C%7B%22date%22%3A%222026-10-21%22%2C%22studied%22%3Atrue%2C%22isToday%22%3Afalse%7D%2C%7B%22date%22%3A%222026-10-22%22%2C%22studied%22%3Atrue%2C%22isToday%22%3Atrue%7D%2C%7B%22date%22%3A%222026-10-23%22%2C%22studied%22%3Afalse%2C%22isToday%22%3Afalse%7D%2C%7B%22date%22%3A%222026-10-24%22%2C%22studied%22%3Afalse%2C%22isToday%22%3Afalse%7D%2C%7B%22date%22%3A%222026-10-25%22%2C%22studied%22%3Afalse%2C%22isToday%22%3Afalse%7D%5D"
shoot league 3600
shoot leagueResult 4500
shoot jackpot 4500
shoot rocket 5000
shoot avatar 4200 "" '[{"at":500,"click":"button[data-i18n=\"avatarEditor.categories.outfit\"]"},{"at":1200,"click":"button[aria-label=\"outfit_varsity\"]"},{"at":2300,"click":"button[aria-label=\"outfit_hanbok\"]"}]'
shoot stickers 4000
shoot courses 5000
echo "✓ done"
