#!/usr/bin/env bash
#
# 배포 전 점검. .env / api.env 의 **실제 값**을 읽어서 검사한다.
#
#   ./preflight.sh
#
# 여기서 통과 못 하면 ./deploy.sh 는 어차피 실패한다. 특히 두 가지가
# 조용히 아프다 —
#   DNS 가 안 맞으면 Let's Encrypt 실패가 쌓여 한 시간 잠긴다
#   Atlas 화이트리스트가 없으면 /ready 가 계속 503 이라 배포가 중단된다

set -uo pipefail
cd "$(dirname "$0")"

GRN=$'\033[32m'; RED=$'\033[31m'; YEL=$'\033[33m'; RST=$'\033[0m'
FAIL=0
ok()   { printf '  %s✔%s %s\n' "$GRN" "$RST" "$*"; }
bad()  { printf '  %s✖%s %s\n' "$RED" "$RST" "$*"; FAIL=1; }
warn() { printf '  %s!%s %s\n' "$YEL" "$RST" "$*"; }
head_() { printf '\n%s\n' "$*"; }
need() { command -v "$1" >/dev/null 2>&1; }

head_ "1. 설정 파일"
if [[ -f .env ]]; then ok ".env 있음"; set -a; source .env; set +a
else bad ".env 없음 — cp .env.example .env"; fi
if [[ -f api.env ]]; then
  ok "api.env 있음"
  perm="$(stat -c '%a' api.env 2>/dev/null || echo '?')"
  [[ "$perm" == "600" ]] && ok "api.env 권한 600" || warn "api.env 권한이 $perm 다 — chmod 600 api.env"
  # 값만 뽑는다. 화면에 찍지 않는다
  MONGODB_URI="$(grep -E '^MONGODB_URI=' api.env | head -1 | cut -d= -f2-)"
  JWT_SECRET="$(grep -E '^JWT_SECRET=' api.env | head -1 | cut -d= -f2-)"
  ALLOW_UNVER="$(grep -E '^ALLOW_UNVERIFIED_SUBSCRIBE=' api.env | head -1 | cut -d= -f2-)"
  [[ -n "$MONGODB_URI" ]] && ok "MONGODB_URI 채워짐" || bad "MONGODB_URI 가 비어 있다"
  if [[ -z "$JWT_SECRET" ]]; then
    bad "JWT_SECRET 이 비어 있다 — openssl rand -base64 48  으로 만들어라"
  elif (( ${#JWT_SECRET} < 32 )); then
    bad "JWT_SECRET 이 ${#JWT_SECRET}자다. 32자 이상 써라 (토큰 위조 방어)"
  else ok "JWT_SECRET 충분히 김 (${#JWT_SECRET}자)"; fi
  [[ "$ALLOW_UNVER" == "true" ]] && bad "ALLOW_UNVERIFIED_SUBSCRIBE=true — 결제 검증 없이 구독이 열린다" \
                                 || ok "ALLOW_UNVERIFIED_SUBSCRIBE 안전"
  # 없어도 서버는 뜬다. 다만 비밀번호 찾기가 조용히 죽어 있는 상태가 되므로
  # 배포 전에 눈에 띄어야 한다
  RESEND_KEY="$(grep -E '^RESEND_API_KEY=' api.env | head -1 | cut -d= -f2-)"
  [[ -n "$RESEND_KEY" ]] && ok "RESEND_API_KEY 채워짐 (비밀번호 재설정 메일)" \
                         || warn "RESEND_API_KEY 가 비어 있다 — 비밀번호 찾기 코드가 발송되지 않고 로그에만 남는다"
  TELEGRAM_TOKEN="$(grep -E '^TELEGRAM_BOT_TOKEN=' api.env | head -1 | cut -d= -f2-)"
  TELEGRAM_USERNAME="$(grep -E '^TELEGRAM_BOT_USERNAME=' api.env | head -1 | cut -d= -f2-)"
  [[ -n "$TELEGRAM_TOKEN" ]] && ok "TELEGRAM_BOT_TOKEN 채워짐" \
                               || bad "TELEGRAM_BOT_TOKEN 이 비어 있다 — Mini App 로그인이 동작하지 않는다"
  [[ -n "$TELEGRAM_USERNAME" ]] && ok "TELEGRAM_BOT_USERNAME 채워짐" \
                                  || bad "TELEGRAM_BOT_USERNAME 이 비어 있다"

  # ── 어드민 ──
  ADMIN_SECRET="$(grep -E '^ADMIN_JWT_SECRET=' api.env | head -1 | cut -d= -f2-)"
  if [[ -z "$ADMIN_SECRET" ]]; then
    warn "ADMIN_JWT_SECRET 이 비어 있다 — 운영 콘솔 로그인이 503 으로 막힌다 (나머지는 정상)"
  elif (( ${#ADMIN_SECRET} < 32 )); then
    bad "ADMIN_JWT_SECRET 이 ${#ADMIN_SECRET}자다. 32자 이상 써라"
  elif [[ "$ADMIN_SECRET" == "$JWT_SECRET" ]]; then
    bad "ADMIN_JWT_SECRET 이 JWT_SECRET 과 같다 — 분리하는 의미가 없다. 부팅도 막힌다"
  else ok "ADMIN_JWT_SECRET 충분히 김 (${#ADMIN_SECRET}자), JWT_SECRET 과 다름"; fi

  # ⚠️ 이게 이 스크립트에서 제일 값어치 있는 검사일 수 있다.
  #    브라우저에서 도는 우리 화면이 ALLOWED_ORIGINS 에 빠지면 **POST 만**
  #    막힌다. GET 과 curl 은 Origin 을 안 보내서 전부 정상으로 보이고,
  #    사람이 로그인 버튼을 누를 때만 터진다. Telegram Mini App 을 정확히
  #    이것 때문에 며칠 헤맸다.
  # 공백과 따옴표, 끝 슬래시를 걷어낸다 — 사람이 손으로 쓰는 값이라 섞인다
  ORIGINS="$(grep -E '^ALLOWED_ORIGINS=' api.env | head -1 | cut -d= -f2- | tr -d ' \"'"'"'' | sed 's#/\+,#,#g; s#/\+$##')"
  for d in "${TELEGRAM_DOMAIN:-}" "${ADMIN_DOMAIN:-}"; do
    [[ -z "$d" ]] && continue
    if [[ ",$ORIGINS," == *",https://$d,"* ]]; then
      ok "ALLOWED_ORIGINS 에 https://$d 있음"
    else
      bad "ALLOWED_ORIGINS 에 https://$d 가 없다 — 그 화면의 POST 가 전부 403 이 된다"
      warn "     (GET 과 curl 은 Origin 을 안 보내서 확인해도 정상으로 보인다)"
    fi
  done
else bad "api.env 없음 — cp api.env.example api.env"; fi

head_ "2. DNS  (틀리면 Let's Encrypt 가 한 시간 잠긴다)"
# IPv4 와 IPv6 를 따로 읽는다. 그냥 curl 하면 IPv6 가 있는 서버는 IPv6 주소를
# 돌려주는데, 그걸 A 레코드(IPv4)와 비교하면 무조건 불일치로 보인다.
ip_of() {
  local v
  v="$(curl "$1" -s --max-time 8 ifconfig.me 2>/dev/null | tr -d '[:space:]')"
  # 실패하면 에러 문구나 HTML 이 올 수 있다. IP 모양일 때만 받는다
  if [[ "$1" == "-4" ]]; then
    [[ "$v" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]] && echo "$v"
  else
    [[ "$v" == *:* && "$v" =~ ^[0-9a-fA-F:]+$ ]] && echo "$v"
  fi
}
MYIP4="$(ip_of -4)"
MYIP6="$(ip_of -6)"
[[ -z "$MYIP4" ]] && MYIP4="$(ip -4 route get 1.1.1.1 2>/dev/null | sed -n 's/.*src \([0-9.]*\).*/\1/p')"
[[ -n "$MYIP4" ]] && ok "이 서버 IPv4: $MYIP4" || warn "IPv4 를 못 읽었다"
[[ -n "$MYIP6" ]] && ok "이 서버 IPv6: $MYIP6" || ok "IPv6 없음 (문제 아님)"

# ACME 연락처 메일.
#
# .env.example 의 you@example.com 을 그대로 두면 Let's Encrypt 가
#   invalidContact - contact email has forbidden domain "example.com"
# 으로 거절한다. Caddy 는 조용히 ZeroSSL 로 넘어가고, 거기서도 실패하면
# 인증서 없이 뜬다 — 증상은 "TLS internal error" 라 원인이 안 보인다.
# 실제로 korio.online 이 이것 때문에 안 열렸다.
if [[ -z "${ACME_EMAIL:-}" ]]; then
  bad "ACME_EMAIL 이 .env 에 없다"
elif [[ "$ACME_EMAIL" == *"@example.com" || "$ACME_EMAIL" == *"@example.org" ]]; then
  bad "ACME_EMAIL 이 $ACME_EMAIL 다 — Let's Encrypt 가 example.com 을 거부한다. 진짜 메일로 바꿔라"
elif [[ "$ACME_EMAIL" != *"@"*"."* ]]; then
  bad "ACME_EMAIL 이 메일 주소 모양이 아니다: $ACME_EMAIL"
else
  ok "ACME_EMAIL 정상 ($ACME_EMAIL)"
fi

if [[ -z "${API_DOMAIN:-}" ]]; then
  bad "API_DOMAIN 이 .env 에 없다"
elif ! need dig; then
  warn "dig 이 없어 DNS 확인 불가 — apt install -y dnsutils"
else
  A_REC="$(dig +short "$API_DOMAIN" A | grep -E '^[0-9.]+$' | tail -1)"
  AAAA_REC="$(dig +short "$API_DOMAIN" AAAA | grep -E '^[0-9a-fA-F:]+$' | tail -1)"

  if [[ -z "$A_REC" && -z "$AAAA_REC" ]]; then
    bad "$API_DOMAIN 이 아직 안 풀린다 — A 레코드를 만들고 전파를 기다려라"
  fi
  if [[ -n "$A_REC" ]]; then
    if [[ "$A_REC" == "$MYIP4" ]]; then
      ok "A    $API_DOMAIN → $A_REC  (이 서버)"
    else
      bad "A    $API_DOMAIN → $A_REC  인데 이 서버 IPv4 는 ${MYIP4:-알수없음} 다"
    fi
  else
    warn "A 레코드가 없다 — IPv4 로만 오는 클라이언트가 못 붙는다"
  fi
  # AAAA 가 틀리게 있으면 치명적이다. Let's Encrypt 는 IPv6 를 먼저 시도해서
  # 거기서 실패하면 A 가 맞아도 인증서를 못 받는다
  if [[ -n "$AAAA_REC" ]]; then
    if [[ "$AAAA_REC" == "$MYIP6" ]]; then
      ok "AAAA $API_DOMAIN → $AAAA_REC  (이 서버)"
    else
      bad "AAAA $API_DOMAIN → $AAAA_REC  가 이 서버(${MYIP6:-IPv6없음})가 아니다."
      warn "     Let's Encrypt 는 IPv6 를 먼저 쓴다. A 가 맞아도 실패한다 — AAAA 를 고치거나 지워라"
    fi
  elif [[ -n "$MYIP6" ]]; then
    ok "AAAA 레코드 없음 — IPv4 로 발급된다 (문제 아님)"
  fi
fi

if [[ -z "${TELEGRAM_DOMAIN:-}" ]]; then
  bad "TELEGRAM_DOMAIN 이 .env 에 없다"
elif need dig; then
  TELEGRAM_A="$(dig +short "$TELEGRAM_DOMAIN" A | grep -E '^[0-9.]+$' | tail -1)"
  TELEGRAM_AAAA="$(dig +short "$TELEGRAM_DOMAIN" AAAA | grep -E '^[0-9a-fA-F:]+$' | tail -1)"

  if [[ -z "$TELEGRAM_A" ]]; then
    bad "$TELEGRAM_DOMAIN A 레코드가 아직 안 풀린다"
  elif [[ -n "$MYIP4" && "$TELEGRAM_A" == "$MYIP4" ]]; then
    ok "A    $TELEGRAM_DOMAIN → $TELEGRAM_A  (이 서버)"
  else
    bad "A    $TELEGRAM_DOMAIN → $TELEGRAM_A 인데 이 서버는 ${MYIP4:-알수없음} 다"
  fi

  if [[ -n "$TELEGRAM_AAAA" ]]; then
    if [[ "$TELEGRAM_AAAA" == "$MYIP6" ]]; then
      ok "AAAA $TELEGRAM_DOMAIN → $TELEGRAM_AAAA  (이 서버)"
    else
      bad "AAAA $TELEGRAM_DOMAIN → $TELEGRAM_AAAA 가 이 서버(${MYIP6:-IPv6없음})가 아니다"
      warn "     Let's Encrypt 실패를 막으려면 잘못된 AAAA 레코드를 지워라"
    fi
  fi
fi

if [[ -z "${ADMIN_DOMAIN:-}" ]]; then
  bad "ADMIN_DOMAIN 이 .env 에 없다"
elif need dig; then
  ADMIN_A="$(dig +short "$ADMIN_DOMAIN" A | grep -E '^[0-9.]+$' | tail -1)"
  ADMIN_AAAA="$(dig +short "$ADMIN_DOMAIN" AAAA | grep -E '^[0-9a-fA-F:]+$' | tail -1)"

  if [[ -z "$ADMIN_A" ]]; then
    bad "$ADMIN_DOMAIN A 레코드가 아직 안 풀린다"
  elif [[ -n "$MYIP4" && "$ADMIN_A" == "$MYIP4" ]]; then
    ok "A    $ADMIN_DOMAIN → $ADMIN_A  (이 서버)"
  else
    bad "A    $ADMIN_DOMAIN → $ADMIN_A 인데 이 서버는 ${MYIP4:-알수없음} 다"
  fi

  if [[ -n "$ADMIN_AAAA" ]]; then
    if [[ "$ADMIN_AAAA" == "$MYIP6" ]]; then
      ok "AAAA $ADMIN_DOMAIN → $ADMIN_AAAA  (이 서버)"
    else
      bad "AAAA $ADMIN_DOMAIN → $ADMIN_AAAA 가 이 서버(${MYIP6:-IPv6없음})가 아니다"
      warn "     Let's Encrypt 실패를 막으려면 잘못된 AAAA 레코드를 지워라"
    fi
  fi
fi

head_ "3. 포트 80 / 443"
if ! need ss; then
  warn "ss 가 없어 포트 확인 불가 — apt install -y iproute2"
else
  ours=0
  docker ps --format '{{.Names}}' 2>/dev/null | grep -q korio_caddy && ours=1
  for p in 80 443; do
    line="$(ss -tlnp 2>/dev/null | awk -v P=":$p\$" 'NR>1 && $4 ~ P' | head -1)"
    if [[ -z "$line" ]]; then ok "$p 비어 있음"; continue; fi
    if (( ours == 1 )) && grep -qE 'docker|caddy' <<<"$line"; then
      ok "$p 은 우리 Caddy 가 쓰고 있다"
    else
      bad "$p 사용 중 → $(sed -E 's/^ +//; s/  +/ /g' <<<"$line")"
      warn "   흔한 범인: apache2 / nginx / 다른 도커 컨테이너"
    fi
  done
fi

head_ "4. MongoDB Atlas 접근  (화이트리스트 안 하면 /ready 가 계속 503)"
if [[ -z "${MONGODB_URI:-}" ]]; then
  warn "MONGODB_URI 가 없어 건너뜀"
else
  # 콤마로 나눈 뒤에 포트를 뗀다. 순서를 바꾸면 다중 호스트 형식
  # (host1:27017,host2:27017) 에서 첫 호스트의 포트가 안 잘린다
  SRVHOST="$(sed -E 's#^mongodb(\+srv)?://##; s#^[^@]*@##; s#[/?].*$##' <<<"$MONGODB_URI" | cut -d, -f1 | sed -E 's#:[0-9]+$##')"
  ok "클러스터 호스트: $SRVHOST"
  SHARDS=()
  if need dig; then
    mapfile -t SHARDS < <(dig +short "_mongodb._tcp.$SRVHOST" SRV | awk '{print $4}' | sed 's/\.$//')
  else
    warn "dig 이 없어 SRV 조회를 못 한다 — apt install -y dnsutils"
  fi
  if (( ${#SHARDS[@]} == 0 )); then
    warn "SRV 레코드 없음 (mongodb:// 형식이면 정상)"
    SHARDS=("$SRVHOST")
  fi
  reach=0
  for h in "${SHARDS[@]}"; do
    if timeout 6 bash -c "exec 3<>/dev/tcp/$h/27017" 2>/dev/null; then
      ok "$h:27017 연결됨"; reach=$((reach+1))
    else
      bad "$h:27017 연결 안 됨 — Atlas > Network Access 에 ${MYIP4:-이 서버 IP} 를 넣었나?"
    fi
  done
  (( reach > 0 )) && ok "샤드 ${reach}/${#SHARDS[@]} 접근 가능"
fi

head_ "5. 도커"
if need docker && docker info >/dev/null 2>&1; then
  ok "도커 동작 중 ($(docker --version | cut -d, -f1))"
  # 배포 스크립트는 전부 `docker compose`(v2, 공백) 를 쓴다. 하이픈 v1 만
  # 있으면 한 줄도 안 돈다. 미리 깔려 온 도커에는 플러그인이 빠져 있곤 한다
  if docker compose version >/dev/null 2>&1; then
    ok "docker compose v2 있음 ($(docker compose version --short 2>/dev/null))"
  else
    bad "docker compose(v2) 가 없다 — sudo apt-get install -y docker-compose-plugin"
    command -v docker-compose >/dev/null 2>&1 && warn "   하이픈 docker-compose(v1) 만 있다. 스크립트는 v2 를 쓴다"
  fi
  # Dockerfile 이 syntax 지시자와 --mount=type=cache 를 쓴다 (BuildKit 필요)
  if docker buildx version >/dev/null 2>&1; then
    ok "buildx 있음"
  else
    bad "buildx 가 없다 — sudo apt-get install -y docker-buildx-plugin"
  fi
  grep -q "max-size" /etc/docker/daemon.json 2>/dev/null \
    && ok "로그 로테이션 설정됨" \
    || warn "로그 로테이션이 없다 — 로그가 디스크를 채운다. server-setup.sh 를 돌려라"
  free_gb="$(df -BG --output=avail / | tail -1 | tr -dc '0-9')"
  (( free_gb >= 10 )) && ok "디스크 여유 ${free_gb}G" || bad "디스크 여유 ${free_gb}G — 이미지 빌드에 부족할 수 있다"
  mem_mb="$(free -m | awk '/^Mem:/{print $2}')"
  swap_mb="$(free -m | awk '/^Swap:/{print $2}')"
  (( mem_mb + swap_mb >= 3000 )) && ok "메모리 ${mem_mb}M + 스왑 ${swap_mb}M" \
    || warn "메모리 ${mem_mb}M + 스왑 ${swap_mb}M — 빌드 중 OOM 이 날 수 있다"
else bad "도커가 안 돈다 — sudo bash server-setup.sh"; fi

# ── 워크스페이스 오염 ────────────────────────────────────────────────
# 도커 빌드의 `pnpm install --frozen-lockfile` 은 package.json 과
# pnpm-lock.yaml 이 어긋나면 실패한다. 그걸 10분짜리 빌드가 다 돌고 나서
# 알게 되면 아깝다.
#
# 실제로 두 번 당한 원인이 하나다: 레포 루트나 apps/api 에서 실수로
# `expo prebuild` / `expo install` 이 돌면 그 package.json 에 expo·react·
# react-native 가 끼워 넣어진다. NestJS 서버에 리액트 네이티브가 붙는 것이라
# 언제나 잘못된 상태다.
#
# ⚠️ 이건 그 한 가지 패턴만 잡는다. 락파일 전체 정합성은 결국
# `pnpm install --frozen-lockfile` 만이 안다 — 푸시 전에 로컬에서 돌려라.
# 초대·팔로우 링크가 열리는 도메인. 여기도 이 서버를 가리켜야 한다
if [[ -n "${WEB_DOMAIN:-}" ]] && need dig; then
  WEB_A="$(dig +short "$WEB_DOMAIN" A | grep -E '^[0-9.]+$' | tail -1)"
  if [[ -z "$WEB_A" ]]; then
    bad "$WEB_DOMAIN 이 아직 안 풀린다"
  elif [[ -n "$MYIP4" && "$WEB_A" == "$MYIP4" ]]; then
    ok "A    $WEB_DOMAIN → $WEB_A  (이 서버)"
  else
    bad "A    $WEB_DOMAIN → $WEB_A  인데 이 서버는 ${MYIP4:-알수없음} 다 — 도메인 등록업체의 파킹 IP 일 수 있다"
  fi
fi

head_ "6. AI 튜터 통화  (LiveKit + Gemini)"
#
#   앱 ──WebRTC──▶ LiveKit ──▶ Tutor Agent ──Gemini Live──▶ gemini-3.8-live
#
# ⚠️ 이 구간의 고장은 전부 **조용하다.** 컨테이너는 다 healthy 인데 통화만
#    안 된다. 그래서 값 대조를 여기서 미리 한다.
val() { grep -E "^$2=" "$1" 2>/dev/null | head -1 | cut -d= -f2- | tr -d ' "'"'"'' ; }

if [[ -f agent.env ]]; then
  ok "agent.env 있음"
  aperm="$(stat -c '%a' agent.env 2>/dev/null || echo '?')"
  [[ "$aperm" == "600" ]] && ok "agent.env 권한 600" || warn "agent.env 권한이 $aperm 다 — chmod 600 agent.env"

  A_URL="$(val agent.env LIVEKIT_URL)";       P_URL="$(val api.env LIVEKIT_URL)"
  A_KEY="$(val agent.env LIVEKIT_API_KEY)";   P_KEY="$(val api.env LIVEKIT_API_KEY)"
  A_SEC="$(val agent.env LIVEKIT_API_SECRET)";P_SEC="$(val api.env LIVEKIT_API_SECRET)"
  A_NAME="$(val agent.env LIVEKIT_TUTOR_AGENT_NAME)"
  P_NAME="$(val api.env LIVEKIT_TUTOR_AGENT_NAME)"
  GKEY="$(val agent.env GOOGLE_API_KEY)"
  API_GKEY="$(val api.env GOOGLE_API_KEY)"

  for pair in "api.env:$P_URL:LIVEKIT_URL" "api.env:$P_KEY:LIVEKIT_API_KEY" \
              "api.env:$P_SEC:LIVEKIT_API_SECRET" "agent.env:$A_URL:LIVEKIT_URL" \
              "agent.env:$A_KEY:LIVEKIT_API_KEY" "agent.env:$A_SEC:LIVEKIT_API_SECRET"; do
    f="${pair%%:*}"; rest="${pair#*:}"; v="${rest%:*}"; k="${rest##*:}"
    [[ -n "$v" ]] && ok "$f 의 $k 채워짐" || bad "$f 의 $k 가 비어 있다 — 튜터 통화가 비활성이 된다"
  done

  # 앱은 이 주소로 WebRTC 를 건다. http:// 면 앱이 못 붙는다
  if [[ -n "$P_URL" && "$P_URL" != wss://* && "$P_URL" != ws://* ]]; then
    bad "LIVEKIT_URL 이 '$P_URL' 다 — wss:// 로 시작해야 한다 (앱이 붙는 주소다)"
  elif [[ -n "$P_URL" ]]; then
    ok "LIVEKIT_URL 스킴 정상 ($P_URL)"
  fi

  # ⚠️ 여기가 이 섹션에서 제일 값어치 있는 두 검사다.
  #    둘 다 어긋나도 배포는 성공하고 컨테이너는 healthy 다. 앱만 "연결은
  #    됐는데 선생님이 아무 말도 안 하는" 화면을 본다.
  if [[ "$A_URL" != "$P_URL" ]]; then
    bad "LIVEKIT_URL 이 api.env 와 agent.env 에서 다르다 — API 가 만든 방에 Agent 가 영영 안 들어온다"
  else ok "LIVEKIT_URL 이 api.env == agent.env"; fi

  AN="${A_NAME:-korio-tutor}"; PN="${P_NAME:-korio-tutor}"
  if [[ "$AN" != "$PN" ]]; then
    bad "LIVEKIT_TUTOR_AGENT_NAME 불일치: api.env='$PN' vs agent.env='$AN'"
    warn "     dispatch 는 성공하고 아무도 방에 안 들어온다. 제일 진단하기 어려운 실패다"
  else ok "LIVEKIT_TUTOR_AGENT_NAME 일치 ($AN)"; fi

  [[ "$A_KEY" == "$P_KEY" ]] && ok "LIVEKIT_API_KEY 가 두 파일에서 같음" \
    || bad "LIVEKIT_API_KEY 가 api.env 와 agent.env 에서 다르다 — 다른 프로젝트를 보고 있다"

  # Gemini 키는 Agent 에만 있어야 한다
  [[ -n "$GKEY" ]] && ok "agent.env 에 GOOGLE_API_KEY 있음" \
    || bad "agent.env 의 GOOGLE_API_KEY 가 비어 있다 — 통화가 첫 마디부터 실패한다"
  [[ -z "$API_GKEY" ]] && ok "api.env 에는 GOOGLE_API_KEY 없음 (의도된 것)" \
    || warn "api.env 에도 GOOGLE_API_KEY 가 있다 — API 컨테이너는 Gemini 에 안 붙는다. 지워도 된다"
else
  bad "agent.env 없음 — cp agent.env.example agent.env && chmod 600 agent.env"
  warn "     없으면 ./deploy.sh 가 시작도 못 한다"
fi

echo
echo "── 워크스페이스 ──"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
dirty=0
for f in "$ROOT_DIR/package.json" "$ROOT_DIR/apps/api/package.json"; do
  [[ -f "$f" ]] || continue
  if grep -qE '"(expo|react-native)"[[:space:]]*:' "$f"; then
    bad "$(basename "$(dirname "$f")")/package.json 에 expo/react-native 가 있다 — 루트에서 expo 명령을 돌린 흔적. 지우고 pnpm install 을 다시 해라"
    dirty=1
  fi
done
(( dirty == 0 )) && ok "루트·apps/api package.json 깨끗 (모바일 의존성 안 섞임)"

echo
if (( FAIL == 0 )); then
  printf '%s모두 통과 — ./deploy.sh 해도 된다%s\n' "$GRN" "$RST"; exit 0
fi
printf '%s위의 ✖ 를 먼저 고쳐라. 이 상태로 배포하면 실패한다%s\n' "$RED" "$RST"; exit 1
