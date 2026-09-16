import { HANGUL_CHARACTERS } from "./hangul";

const CHARACTER_ID_BY_JAMO: Record<string, string> = Object.fromEntries(
  HANGUL_CHARACTERS.map((character) => [character.char, character.id]),
);

export function jamoToCharacterId(jamo?: string | null): string | null {
  if (!jamo) return null;
  return CHARACTER_ID_BY_JAMO[jamo] ?? null;
}

const CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".split("");
const JUNG = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ".split("");
const JONG = [
  "",
  ..."ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ".split(""),
];

export function syllableToCharacterIds(syllable?: string): string[] {
  const code = syllable?.charCodeAt(0);
  if (!code || code < 0xac00 || code > 0xd7a3) return [];

  const offset = code - 0xac00;
  const jong = offset % 28;
  const jung = Math.floor(offset / 28) % 21;
  const cho = Math.floor(offset / 28 / 21);

  return [CHO[cho], JUNG[jung], JONG[jong]]
    .map(jamoToCharacterId)
    .filter((id): id is string => Boolean(id));
}
