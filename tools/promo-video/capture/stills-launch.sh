#!/usr/bin/env bash
# 런치 영상(KorioLaunchUz) 재료 — 긴 화면 한 장 + 카드 자리 → public/stills/<name>.png/.json
# 텔레그램 dev 서버(3002)와 무대(node capture/stage.mjs up)가 있어야 한다.
set -euo pipefail
cd "$(dirname "$0")/.."
# 카드를 크게 떼어 내도 선명하게 3배로
export PROMO_SCALE=3

still() {
  local name=$1 scene=$2 height=$3 query=$4 boxes=$5
  echo "▶ $name"
  PROMO_NAME="$name" PROMO_HEIGHT="$height" PROMO_BOXES="$boxes" node capture/capture.mjs still "$scene" 2500 "$query"
}

still home home 1760 "" '{
  "lang": { "css": "button, a, [role=button]", "text": "Koreys tili" },
  "streak": { "css": "div, section", "text": "30 kun ketma-ket", "minWidth": 330 },
  "hero": { "css": "section", "text": "So'"'"'z o'"'"'rganish" },
  "tasks": { "css": "section", "text": "Bugungi vazifalar" },
  "info": { "css": "section", "text": "O'"'"'quv ma'"'"'lumoti" }
}'
still courses courses 844 "" '{ "card": "section button" }'
still modes-ko categories 1160 "lang=ko" '{ "card": "section button" }'
still modes-en categories 1160 "lang=en" '{ "card": "section button" }'
still stats stats 2800 "" '{ "card": "section" }'
echo "✓ stills"
