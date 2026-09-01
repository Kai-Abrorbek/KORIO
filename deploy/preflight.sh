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
  MONGODB_URI="$(grep -E '^MONGODB_URI=' api.env | head -1 | cut -d= -f2- )"
  JWT_SECRET="$(grep -E '^JWT_SECRET=' api.env | head -1 | cut -d= -f2- )"
  ALLOW_UNVER="$(grep -E '^ALLOW_UNVERIFIED_SUBSCRIBE=' api.env | head -1 | cut -d= -f2- )"
  [[ -n "$MONGODB_URI" ]] && ok "MONGODB_URI 채워짐" || bad "MONGODB_URI 가 비어 있다"
  if [[ -z "$JWT_SECRET" ]]; then
    bad "JWT_SECRET 이 비어 있다 — openssl rand -base64 48  으로 만들어라"
  elif (( ${#JWT_SECRET} < 32 )); then
    bad "JWT_SECRET 이 ${#JWT_SECRET}자다. 32자 이상 써라 (토큰 위조 방어)"
  else ok "JWT_SECRET 충분히 김 (${#JWT_SECRET}자)"; fi
  [[ "$ALLOW_UNVER" == "true" ]] && bad "🔴 ALLOW_UNVERIFIED_SUBSCRIBE=true — 결제 검증 없이 구독이 열린다" \
                                 || ok "ALLOW_UNVERIFIED_SUBSCRIBE 안전"
else bad "api.env 없음 — cp api.env.example api.env"; fi

head_ "2. DNS  (틀리면 Let's Encrypt 가 한 시간 잠긴다)"
MYIP="$(curl -s --max-time 8 ifconfig.me || true)"
[[ -n "$MYIP" ]] && ok "이 서버 공인 IP: $MYIP" || warn "공인 IP 를 못 읽었다"
if [[ -z "${API_DOMAIN:-}" ]]; then
  bad "API_DOMAIN 이 .env 에 없다"
else
  if need dig; then RESOLVED="$(dig +short "$API_DOMAIN" A | tail -1)"
  else RESOLVED="$(getent hosts "$API_DOMAIN" | awk '{print $1}' | tail -1)"; fi
  if [[ -z "$RESOLVED" ]]; then
    bad "$API_DOMAIN 이 아직 안 풀린다 — A 레코드를 만들고 전파를 기다려라"
  elif [[ "$RESOLVED" == "$MYIP" ]]; then
    ok "$API_DOMAIN → $RESOLVED (이 서버와 일치)"
  else
    bad "$API_DOMAIN → $RESOLVED 인데 이 서버는 $MYIP 다. A 레코드를 고쳐라"
  fi
fi

head_ "3. 포트 80 / 443"
for p in 80 443; do
  holder="$(ss -tlnp 2>/dev/null | awk -v P=":$p" '$4 ~ P":"$0 ~ P {print $NF}' | head -1)"
  inuse="$(ss -tln 2>/dev/null | awk -v P=":$p\$" '$4 ~ P' | head -1)"
  if [[ -n "$inuse" ]]; then
    if docker ps --format '{{.Names}}' 2>/dev/null | grep -q korio_caddy; then
      ok "$p 은 우리 Caddy 가 쓰고 있다"
    else
      bad "$p 을 다른 게 쓰고 있다 ($holder). apache2/nginx 가 깔려 있으면 꺼라"
    fi
  else ok "$p 비어 있음"; fi
done

head_ "4. MongoDB Atlas 접근  (화이트리스트 안 하면 /ready 가 계속 503)"
if [[ -z "${MONGODB_URI:-}" ]]; then
  warn "MONGODB_URI 가 없어 건너뜀"
else
  # mongodb+srv://user:pass@cluster.xxx.mongodb.net/db 에서 호스트만 뽑는다
  # 콤마로 나눈 **뒤에** 포트를 뗀다. 순서를 바꾸면 다중 호스트 형식
  # (host1:27017,host2:27017) 에서 첫 호스트의 포트가 안 잘린다
  SRVHOST="$(sed -E 's#^mongodb(\+srv)?://##; s#^[^@]*@##; s#[/?].*$##' <<<"$MONGODB_URI" | cut -d, -f1 | sed -E 's#:[0-9]+$##')"
  ok "클러스터 호스트: $SRVHOST"
  if need dig; then
    mapfile -t SHARDS < <(dig +short "_mongodb._tcp.$SRVHOST" SRV | awk '{print $4}' | sed 's/\.$//')
  else SHARDS=(); warn "dig 이 없어 SRV 조회를 못 한다 — apt install -y dnsutils"; fi
  if (( ${#SHARDS[@]} == 0 )); then
    warn "SRV 레코드를 못 찾았다 (mongodb:// 형식이면 정상)"
    SHARDS=("$SRVHOST")
  fi
  reach=0
  for h in "${SHARDS[@]}"; do
    if timeout 6 bash -c "exec 3<>/dev/tcp/$h/27017" 2>/dev/null; then
      ok "$h:27017 연결됨"; reach=$((reach+1))
    else
      bad "$h:27017 연결 안 됨 — Atlas > Network Access 에 $MYIP 를 넣었나?"
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
