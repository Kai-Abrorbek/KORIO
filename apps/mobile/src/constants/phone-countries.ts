/**
 * 전화번호 국가 코드.
 *
 * 전 세계 목록을 넣지 않는다 — 고르는 화면이 스크롤 지옥이 되고, 우리 유저의
 * 99% 는 아래 몇 개 안에 있다. 목록에 없는 나라는 직접 +코드를 입력하면 된다.
 *
 * trunk: 국내 번호 앞에 붙는 0/8 같은 국번. E.164 로 바꿀 때 떼어낸다.
 *   우즈벡 90 123 45 67 → +998901234567  (trunk 없음)
 *   한국   010-1234-5678 → +821012345678 (앞의 0 제거)
 *   러시아 8 912 345 67 89 → +79123456789 (앞의 8 제거)
 */
export interface PhoneCountry {
  iso: string;
  dial: string;
  flag: string;
  /** 국내 표기에서 떼어낼 접두 숫자들 */
  trunk: string[];
  /** 국가번호를 뺀 순수 가입자 번호 자릿수 (검증용) */
  nsnLength: number[];
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso: 'UZ', dial: '998', flag: '🇺🇿', trunk: [], nsnLength: [9] },
  { iso: 'KR', dial: '82', flag: '🇰🇷', trunk: ['0'], nsnLength: [9, 10] },
  { iso: 'RU', dial: '7', flag: '🇷🇺', trunk: ['8'], nsnLength: [10] },
  { iso: 'KZ', dial: '7', flag: '🇰🇿', trunk: ['8'], nsnLength: [10] },
  { iso: 'KG', dial: '996', flag: '🇰🇬', trunk: ['0'], nsnLength: [9] },
  { iso: 'TJ', dial: '992', flag: '🇹🇯', trunk: ['0'], nsnLength: [9] },
  { iso: 'TR', dial: '90', flag: '🇹🇷', trunk: ['0'], nsnLength: [10] },
  { iso: 'US', dial: '1', flag: '🇺🇸', trunk: ['1'], nsnLength: [10] },
];

export const DEFAULT_PHONE_ISO = 'UZ';

export function countryOf(iso: string): PhoneCountry {
  return (
    PHONE_COUNTRIES.find((c) => c.iso === iso) ??
    PHONE_COUNTRIES.find((c) => c.iso === DEFAULT_PHONE_ISO)!
  );
}
