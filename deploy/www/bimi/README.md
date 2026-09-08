# 메일에 브랜드 로고 띄우기 (BIMI)

받는 사람 메일함에서 KORIO 아이콘이 보이게 하는 규격이다.

## 지금 상태

- `logo.svg` — SVG Tiny PS 규격으로 준비 완료. `https://korio.online/bimi/logo.svg`
- **Gmail 에는 아직 안 뜬다.** VMC 가 없기 때문이다 (아래 참고).

## 넣어야 할 DNS 레코드 (Hostinger)

### 1) DMARC — 이게 먼저다

BIMI 의 전제 조건이고, **BIMI 와 무관하게 메일 도달률에 직접 도움이 된다.**
남이 korio.online 을 사칭해 메일 보내는 것도 막는다.

처음에는 관찰만 하는 `p=none` 으로 며칠 두고, 정상 메일이 다 통과하는 걸
확인한 뒤 `quarantine` 으로 올린다. 바로 quarantine 으로 가면 설정이 하나만
틀려도 우리 메일이 통째로 스팸함에 간다.

| Type | Name | Content |
|---|---|---|
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:abror0dev@gmail.com; adkim=r; aspf=r` |

며칠 뒤 리포트를 보고 문제 없으면 Content 를 이걸로 교체:

```
v=DMARC1; p=quarantine; pct=100; rua=mailto:abror0dev@gmail.com; adkim=s; aspf=s
```

⚠️ BIMI 는 `p=quarantine` 이상 + `pct=100` 이어야 인정된다. `p=none` 이면
로고는 절대 안 뜬다.

### 2) BIMI

| Type | Name | Content |
|---|---|---|
| TXT | `default._bimi` | `v=BIMI1; l=https://korio.online/bimi/logo.svg; a=` |

`a=` 는 VMC 자리다. 지금은 비워둔다.

## Gmail 에 뜨게 하려면 — 유료다

Gmail·Yahoo·Apple Mail 은 전부 **VMC(Verified Mark Certificate)** 를 요구한다.

- 발급처: DigiCert, Entrust
- 비용: **연 $1,000 이상**
- 조건: **등록된 상표**여야 한다 (출원 중은 안 됨). 한국이면 특허청 상표등록.

즉 상표 등록 → VMC 구매 → `a=` 에 pem 주소 추가, 이 순서다.
출시 초기에 쓸 돈은 아니다. DNS 만 미리 맞춰두고 나중에 붙이면 된다.

## 그때까지 메일함에서 할 수 있는 것

로고는 못 띄워도 이건 된다:

- **발신자 이름을 제대로 보이게** — 이미 `MAIL_FROM=KORIO <no-reply@korio.online>`
  이라 "KORIO" 로 뜬다 (스크린샷에서도 그렇게 나온다)
- **DMARC 로 도달률 올리기** — 위 1번. 이게 실질적으로 제일 값어치 있다
- 받는 사람이 발신 주소를 주소록에 추가하면 그 사람이 지정한 사진이 뜬다
