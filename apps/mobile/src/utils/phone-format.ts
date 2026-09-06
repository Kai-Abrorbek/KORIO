import { countryOf, PHONE_COUNTRIES } from "../constants/phone-countries";

/**
 * 순수 번호 포맷팅.
 *
 * expo-crypto 를 안 물린다 — 이 로직이 제일 틀리기 쉬운 부분인데, 네이티브
 * 모듈이 섞여 있으면 node 로 테스트를 못 돌린다. 해시는 phone.ts 쪽에 있다.
 */
/**
 * 전화번호를 E.164 (+998901234567) 로.
 *
 * 왜 libphonenumber-js 를 안 쓰나: 번들에 150KB 를 더하는데, 우리가 다루는
 * 나라는 손에 꼽고 규칙도 단순하다. 대신 **애매하면 포기한다** — 잘못 만든
 * 번호는 매칭이 안 될 뿐이지만, 다른 사람의 번호로 잘못 만들면 엉뚱한 사람이
 * 친구 추천에 뜬다. 확실하지 않으면 null 을 돌려주는 쪽이 낫다.
 *
 * @param defaultIso 국가를 알 수 없는 국내 표기 번호에 적용할 나라
 */
export function toE164(raw: string, defaultIso: string): string | null {
  if (!raw) return null;
  // 괄호·하이픈·공백 제거. 00 은 국제전화 접두라 + 로 바꾼다
  let v = raw.replace(/[^\d+]/g, "");
  if (v.startsWith("00")) v = "+" + v.slice(2);

  if (v.startsWith("+")) {
    const digits = v.slice(1);
    return /^[1-9]\d{7,14}$/.test(digits) ? "+" + digits : null;
  }

  const c = countryOf(defaultIso);
  let nsn = v;
  for (const t of c.trunk) {
    if (nsn.startsWith(t)) {
      nsn = nsn.slice(t.length);
      break;
    }
  }

  // 국가번호를 이미 달고 있는 국내 표기 ("998901234567")
  if (nsn.startsWith(c.dial) && c.nsnLength.includes(nsn.length - c.dial.length)) {
    nsn = nsn.slice(c.dial.length);
  }

  if (!c.nsnLength.includes(nsn.length)) return null;
  if (nsn.startsWith("0")) return null; // trunk 를 못 떼어낸 것 — 포기
  return `+${c.dial}${nsn}`;
}

/** 나라를 모를 때 쓸 기본값 추정 — 유저 프로필의 country 를 우선한다 */
export function guessIso(country?: string | null): string {
  const up = (country ?? "").toUpperCase();
  return PHONE_COUNTRIES.some((c) => c.iso === up) ? up : "UZ";
}
