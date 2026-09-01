#!/usr/bin/env bash
#
# Hostinger VPS (Ubuntu) 최초 1회 준비. root 로 실행한다.
#
#   curl -fsSL <이 파일 raw 주소> | bash
#   또는  git clone 후  sudo bash deploy/server-setup.sh
#
# 도커 설치 + 방화벽 + 로그 로테이션 + 스왑 + 자동 보안 업데이트.

set -Eeuo pipefail
[[ $EUID -eq 0 ]] || { echo "root 로 실행해라 (sudo bash $0)"; exit 1; }

GRN=$'\033[32m'; RST=$'\033[0m'
log() { printf '%s▸%s %s\n' "$GRN" "$RST" "$*"; }

log "패키지 갱신"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
# dnsutils = dig. preflight.sh 가 DNS·Atlas SRV 확인에 쓴다
apt-get install -y -qq ca-certificates curl git ufw dnsutils

# ── 도커 ──
if command -v docker >/dev/null 2>&1; then
  log "도커 이미 있음 ($(docker --version))"
else
  log "도커 설치"
  curl -fsSL https://get.docker.com | sh
fi

# ── 도커 로그 로테이션 ──
# 이게 없으면 json-file 로그가 무제한으로 쌓여서 50GB 디스크를 채운다.
# 실제로 소규모 서버가 죽는 흔한 원인이다. 컨테이너당 최대 30MB 로 묶는다.
log "도커 로그 로테이션 설정"
mkdir -p /etc/docker
if [[ -f /etc/docker/daemon.json ]] && grep -q "log-opts" /etc/docker/daemon.json; then
  log "  이미 설정돼 있음 — 건너뜀"
else
  cat > /etc/docker/daemon.json <<'JSON'
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" },
  "live-restore": true
}
JSON
  systemctl restart docker
fi

# ── 스왑 ──
# RAM 4GB 면 충분하지만, 빌드가 순간적으로 튈 때 OOM 킬러가 서비스 중인
# 컨테이너를 잡는 사고를 막는 보험이다.
if swapon --show | grep -q .; then
  log "스왑 이미 있음"
else
  log "스왑 2G 생성"
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap -q /swapfile && swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  sysctl -qw vm.swappiness=10
  grep -q 'vm.swappiness' /etc/sysctl.conf || echo 'vm.swappiness=10' >> /etc/sysctl.conf
fi

# ── 방화벽 ──
# 주의: 도커는 iptables 를 직접 만져서 ufw 를 우회한다. 컨테이너가 publish 한
# 포트(80/443)는 ufw 규칙과 무관하게 열린다. 그래도 ufw 를 켜 두는 건
# **호스트에서 직접 도는 것들**(ssh 등)을 위해서다.
log "방화벽: 22 / 80 / 443"
ufw allow 22/tcp   >/dev/null
ufw allow 80/tcp   >/dev/null
ufw allow 443/tcp  >/dev/null
ufw allow 443/udp  >/dev/null   # HTTP/3
ufw --force enable >/dev/null
ufw status numbered | head -12

# ── 자동 보안 업데이트 ──
log "보안 업데이트 자동화"
apt-get install -y -qq unattended-upgrades
dpkg-reconfigure -f noninteractive unattended-upgrades >/dev/null 2>&1 || true

echo
# 안내에 진짜 경로를 쓴다. 레포를 어디에 두든 상관없다 —
# deploy.sh 는 자기 위치를 기준으로 도니까 /root/korio 든 /srv/korio 든 똑같다.
DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log "준비 완료. 다음:"
cat <<NEXT

  1) hPanel > VPS > 방화벽 에서도 80/443 이 허용인지 확인해라.
     Hostinger 는 패널 방화벽이 따로 있어서, 여기 ufw 만 열어도 막힐 수 있다.

  2) 도메인 DNS: A 레코드( api.korio.app 등 ) → 이 서버 IP
     dig +short <도메인>  이 서버 IP 를 뱉어야 인증서가 나온다.

  3) cd $DEPLOY_DIR
     cp .env.example .env        # API_DOMAIN, ACME_EMAIL
     cp api.env.example api.env  # MONGODB_URI, JWT_SECRET, API 키
     chmod 600 api.env
     ./deploy.sh
     ./smoke.sh                  # 무중단 증명

  4) MongoDB Atlas 의 Network Access 에 이 서버 IP 를 추가해라.
     안 하면 컨테이너가 떠도 /ready 가 계속 503 이라 배포가 실패한다.
     curl -s ifconfig.me   로 IP 확인.

NEXT
