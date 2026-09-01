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

echo
if (( FAIL == 0 )); then
  printf '%s모두 통과 — ./deploy.sh 해도 된다%s\n' "$GRN" "$RST"; exit 0
fi
printf '%s위의 ✖ 를 먼저 고쳐라. 이 상태로 배포하면 실패한다%s\n' "$RED" "$RST"; exit 1
