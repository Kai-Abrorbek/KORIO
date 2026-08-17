import { HANGUL_CHARACTERS } from "@/constants/hangul";

/**
 * 낱자("ㄱ", "ㅏ") → 자모 id("c-giyeok", "v-a").
 * 게임마다 들고 있는 데이터 모양이 달라서(획 데이터, 슬롯 릴, 음절 등)
 * 진행도로 보낼 때 이 표를 거쳐 id 로 통일한다.
 */
export const CHARACTER_ID_BY_JAMO: Record<string, string> = Object.fromEntries(
  HANGUL_CHARACTERS.map((c) => [c.char, c.id]),
);

export function jamoToCharacterId(jamo?: string | null): string | null {
  if (!jamo) return null;
  return CHARACTER_ID_BY_JAMO[jamo] ?? null;
}

// 유니코드 조합 순서 그대로 (인덱스가 곧 조합 값)
const CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".split("");
const JUNG = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ".split("");
const JONG = [
  "", ...("ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ".split("")),
];

/**
 * 완성형 음절("가", "녹") → 기록할 자모 id 배열.
 * 겹받침(ㄳ, ㄺ …)처럼 자모 40자 목록에 없는 낱자는 버린다.
 */
export function syllableToCharacterIds(syllable?: string): string[] {
  const code = syllable?.charCodeAt(0);
  if (!code || code < 0xac00 || code > 0xd7a3) return [];

  const offset = code - 0xac00;
  const jong = offset % 28;
  const jung = Math.floor(offset / 28) % 21;
  const cho = Math.floor(offset / 28 / 21);

  return [CHO[cho], JUNG[jung], JONG[jong]]
    .map(jamoToCharacterId)
    .filter((id): id is string => !!id);
}
