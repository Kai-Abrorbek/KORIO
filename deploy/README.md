# KORIO API 배포

blue/green 무중단. 서버에 도커만 있으면 된다. MongoDB 는 Atlas(외부)를 쓰므로
DB 컨테이너도 볼륨도 없다.

## 어떻게 무중단이 되나

```
        인터넷
          │  :443 (Let's Encrypt 자동)
      ┌───▼────┐
      │ Caddy  │  /ready 를 3초마다 찔러서 건강한 쪽으로만 보낸다
      └─┬────┬─┘  lb_policy first → blue 가 살아 있으면 blue
        │    │
   api_blue  api_green   ← 배포 때 번갈아 뜬다. 항상 한쪽만 실행
```

배포 = **새 색을 띄우고 → 건강해지면 → 옛 색을 내린다.**
Caddy 설정을 다시 읽지 않는다. 헬스체크만으로 전환된다.

내려가는 쪽은 SIGTERM 을 받으면
`/ready` 를 즉시 503 으로 바꾸고(`main.ts`) → Caddy 가 새 요청을 끊고 →
처리 중인 요청만 끝내고 종료한다. 그래서 끊기는 요청이 없다.

**어느 단계에서 실패해도 옛 컨테이너는 계속 떠 있다.** 새 컨테이너가
healthy 가 안 되면 배포를 중단하고 그대로 둔다 — 유저 영향 0.

## 어디서 돌리나

**전부 서버에서 돈다.** 윈도우/맥 로컬이 아니다.

```
[개발 PC]  git push
              ↓
[Hostinger VPS]  ssh → git pull → ./deploy.sh
                       └ 서버가 이미지를 빌드하고 blue/green 을 교체한다
```

이미지를 서버에서 직접 빌드한다. 레지스트리도 CI 도 필요 없다.
빌드에 RAM 1.5~2GB 를 쓰는데 Hostinger KVM 1 도 4GB 라 충분하다.
코어가 하나뿐인 플랜(KVM 1)에서는 빌드가 CPU 를 다 먹으면 서비스 중인
응답이 느려지므로, `deploy.sh` 가 빌드에 주는 CPU 를 자동으로 줄인다
(`BUILD_CPUS=0` 이면 제한 해제).

나중에 레지스트리로 옮기고 싶으면 `.env` 의 `IMAGE` 를
`ghcr.io/…` 로 바꾸고 `deploy.sh` 의 build 를 pull 로 바꾸면 된다 —
compose 는 이미 변수로 받는다.

## 처음 한 번 (서버에서)

**레포 위치는 아무 데나 된다.** 스크립트가 전부 자기 위치 기준으로 돌기 때문에
`/root/korio` 든 `/srv/korio` 든 `/opt/korio` 든 똑같이 동작한다.
Hostinger 는 root 로 로그인하니 `~/korio`(= `/root/korio`)가 제일 편하다 —
`/root` 는 권한이 0700 이라 `api.env` 같은 시크릿이 오히려 더 안전하다.
(나중에 배포용 일반 계정이나 CI 에이전트를 붙일 생각이면 그때 `/srv` 로 옮기면 된다)

```bash
# 1) 레포 + 서버 준비 (도커·방화벽·로그로테이션·스왑·보안업데이트)
git clone <repo> ~/korio
sudo bash ~/korio/deploy/server-setup.sh

# 2) 설정
cd ~/korio/deploy
cp .env.example .env          # API_DOMAIN, ACME_EMAIL
cp api.env.example api.env    # MONGODB_URI, JWT_SECRET, API 키들
chmod 600 api.env             # 시크릿이다

# 3) DNS (Hostinger hPanel > 도메인 > DNS 관리)
#    타입 A / 이름 api / 값 <서버 IP> / TTL 기본
#    → api.korio.online 이 서버를 가리키게 된다
#    dig +short api.korio.online  이 서버 IP 를 뱉어야 인증서가 나온다.
#    ⚠️ DNS 가 안 맞은 채로 deploy 하면 Let's Encrypt 실패가 쌓여
#       한 시간 잠긴다. 반드시 먼저 확인할 것

# 4) 🔴 MongoDB Atlas > Network Access 에 서버 IP 추가
#    안 하면 컨테이너가 떠도 /ready 가 계속 503 이라 배포가 실패한다
#    curl -s ifconfig.me  로 IP 확인

# 5) hPanel > VPS > 방화벽 에서 80/443 허용 확인
#    Hostinger 는 패널 방화벽이 따로 있어서 ufw 만 열면 막힐 수 있다

# 6) 사전 점검 — 여기서 통과 못 하면 배포는 어차피 실패한다
./preflight.sh

# 7) 첫 배포
./deploy.sh
./smoke.sh    # 무중단 증명 — 반드시
```

## 평소

```bash
./deploy.sh              # 현재 커밋으로 빌드 → 무중단 교체
./deploy.sh --tag v1.3   # 태그 지정
./deploy.sh --status     # 지금 어느 색이 받는지
./deploy.sh --rollback   # 직전 색으로 되돌린다 (재빌드 없음, 몇 초)
./smoke.sh               # 부하 걸면서 배포 → 끊김이 0 인지 증명
```

**첫 배포 뒤에는 반드시 `./smoke.sh` 를 한 번 돌려라.** 무중단이 진짜인지
숫자로 확인하는 유일한 방법이다.

## 도메인

- `api.korio.online` → **이 API 서버**
- `korio.online` (apex) → 비워 둔다. 나중에 랜딩·개인정보처리방침이 여기 들어간다.
  **구글 플레이는 개인정보처리방침 URL 을 필수로 요구한다.** API 를 apex 에
  올려 버리면 그 자리를 잃는다.
- 텔레그램 로그인을 켜려면 BotFather 에 `api.korio.online` 을 등록해야 한다
  (`/setdomain`). 위젯 페이지가 이 서버에서 뜨기 때문이다.

## 첫 배포 때 뭐가 보이나

```
▸ Caddy 기동 (인증서 발급이 빌드와 함께 돈다)
▸ 이미지 빌드: korio-api:abc1234      ← 첫 빌드 5~10분. 이후엔 캐시로 1~2분
▸ 현재: none → 새로 띄울 색: blue      ← 첫 배포는 내릴 옛 색이 없다
▸ korio_api_blue 이 준비될 때까지 기다린다
▸ korio_api_blue healthy (12초)
▸ 배포 완료 → blue
```

빌드 도는 동안 다른 터미널에서 인증서 진행을 볼 수 있다:

```bash
docker logs -f korio_caddy      # certificate obtained successfully 가 나오면 성공
```

끝나면:

```bash
curl -sI https://api.korio.online/lessons/roadmap | head -3
#   401 이 정상이다 (인증이 필요한 경로). 401 이든 200 이든 서버가 응답한 것.
#   000 / 502 면 문제
```

## 시크릿

`deploy/api.env` 와 `deploy/.env` 는 `.gitignore` 에 있다. 서버에만 둔다.
API 키(OpenAI/Anthropic/Azure/Google/카카오/네이버/텔레그램)는 전부 여기 있고
앱에는 들어가지 않는다.

`ALLOW_UNVERIFIED_SUBSCRIBE` 는 **반드시 false 나 빈 값**이다. true 면 결제
검증 없이 구독이 열린다.

## 알아둘 것

- **TTS 캐시는 컨테이너 메모리다.** 배포하면 비워진다. 서버 TTL 6시간 안에
  다시 채워지니 문제는 없지만, 배포 직후 첫 재생이 조금 느리다.
- **크론이 두 번 돌 수 있는 구간이 있다.** 배포 중 두 색이 20~40초 겹친다.
  리그 정산은 방을 원자적으로 집도록 고쳐서 안전하다(`league.service.ts`).
  구독 갱신(`매시 12분`)은 재실행해도 같은 결과라 그냥 둔다.
  **매시 :12 와 월요일 00:05(타슈켄트) 직전에는 배포를 피하는 게 좋다.**
- 이미지는 서버에서 직접 빌드한다. 레지스트리를 쓰려면 `.env` 의 `IMAGE` 를
  `ghcr.io/…` 로 바꾸고 `deploy.sh` 에 push/pull 을 넣으면 된다.
- 옛 이미지는 롤백용으로 남는다. 쌓이면 `docker image prune -a --filter until=720h`.

## 초대 링크 / 앱링크 (korio.online)

초대 링크 `https://korio.online/i/<코드>` 가 **브라우저를 안 거치고 곧장 앱으로**
열리려면 안드로이드가 도메인 소유를 확인해야 한다. 그 확인 파일이
`www/.well-known/assetlinks.json` 이다.

### 준비

1. **DNS** — `korio.online` A 레코드가 이 서버를 가리켜야 한다
   (`api.korio.online` 과 같은 IP). 안 되어 있으면 Caddy 가 인증서를 못 받는다
2. **`deploy/.env`** 에 `WEB_DOMAIN=korio.online` 추가
3. `./deploy.sh` 로 배포 (Caddy 가 새 도메인 인증서를 자동 발급한다)

### 지문(fingerprint)

`assetlinks.json` 에는 **앱을 서명한 키의 SHA-256** 이 들어간다. 지금 들어 있는
값은 안드로이드 **디버그 키**라 `npx expo run:android` 로 만든 개발 빌드만
검증된다. 스토어에 올릴 빌드는 서명 키가 달라서 **반드시 하나 더 넣어야 한다.**

```bash
cd apps/mobile
eas credentials          # Android → production → Keystore → SHA-256 확인
```

Play App Signing 을 쓰면 **구글이 다시 서명**하므로 Play Console 쪽 지문도 필요하다:
Play Console → 앱 → 설정 → 앱 무결성 → 앱 서명 키 인증서 SHA-256.

세 개를 다 `sha256_cert_fingerprints` 배열에 넣으면 된다 (디버그 / EAS 업로드 키 /
Play 앱 서명 키). 하나라도 맞으면 검증된다.

### 확인

```bash
curl -sI https://korio.online/.well-known/assetlinks.json   # 200, application/json, 리다이렉트 없어야 함
```

구글 검증기:
`https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://korio.online&relation=delegate_permission/common.handle_all_urls`

폰에서 (앱 설치 후):
```bash
adb shell pm get-app-links com.kai_dev.mobile        # verified 여야 한다
adb shell pm verify-app-links --re-verify com.kai_dev.mobile   # 다시 검증
```

⚠️ 검증은 **앱 설치 시점에** 한 번 돈다. assetlinks 를 나중에 올렸다면 앱을
지웠다 다시 깔거나 위 `--re-verify` 를 돌려야 반영된다.
