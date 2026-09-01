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

## 처음 한 번 (서버에서)

```bash
# 1) 도커
curl -fsSL https://get.docker.com | sh

# 2) 레포
git clone <repo> /srv/korio && cd /srv/korio/deploy

# 3) 설정
cp .env.example .env          # API_DOMAIN, ACME_EMAIL
cp api.env.example api.env    # MONGODB_URI, JWT_SECRET, API 키들
chmod 600 api.env             # 시크릿이다

# 4) DNS: API_DOMAIN 의 A 레코드 → 이 서버 IP
#    (인증서 발급에 필요. 안 되어 있으면 Caddy 가 계속 재시도한다)

# 5) 첫 배포
./deploy.sh
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
