export interface JamoTarget {
  cho: string;
  jong: string;
  jung: string;
  reels: 2 | 3;
  roman: string;
  syllable: string;
}

const CHO = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const JUNG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

const JONG = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const BASIC_CHO = [
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
const BASIC_JUNG = ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ"];
const BASIC_JONG = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅇ"];

const CHO_ROMAN: Record<string, string> = {
  ㄱ: "g",
  ㄴ: "n",
  ㄷ: "d",
  ㄹ: "r",
  ㅁ: "m",
  ㅂ: "b",
  ㅅ: "s",
  ㅇ: "",
  ㅈ: "j",
  ㅊ: "ch",
  ㅋ: "k",
  ㅌ: "t",
  ㅍ: "p",
  ㅎ: "h",
};

const JUNG_ROMAN: Record<string, string> = {
  ㅏ: "a",
  ㅑ: "ya",
  ㅓ: "eo",
  ㅕ: "yeo",
  ㅗ: "o",
  ㅛ: "yo",
  ㅜ: "u",
  ㅠ: "yu",
  ㅡ: "eu",
  ㅣ: "i",
};

const JONG_ROMAN: Record<string, string> = {
  ㄱ: "k",
  ㄴ: "n",
  ㄷ: "t",
  ㄹ: "l",
  ㅁ: "m",
  ㅂ: "p",
  ㅇ: "ng",
};

export function composeSyllable(cho: string, jung: string, jong = ""): string {
  const choIndex = CHO.indexOf(cho);
  const jungIndex = JUNG.indexOf(jung);
  const jongIndex = JONG.indexOf(jong);
  if (choIndex < 0 || jungIndex < 0 || jongIndex < 0) return "";
  return String.fromCharCode(
    0xac00 + (choIndex * 21 + jungIndex) * 28 + jongIndex,
  );
}

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

export function buildReel(
  answer: string,
  pool: string[],
  size: number,
): string[] {
  const others = pool.filter((character) => character !== answer);
  const reel = [answer];
  while (reel.length < size && others.length) {
    const index = Math.floor(Math.random() * others.length);
    reel.push(others.splice(index, 1)[0]!);
  }
  for (let index = reel.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [reel[index], reel[swapIndex]] = [reel[swapIndex]!, reel[index]!];
  }
  return reel;
}

export function generateTarget(round: number): JamoTarget {
  const withJong = round >= 5 && Math.random() < 0.55;
  const cho = pick(BASIC_CHO);
  const jung = pick(BASIC_JUNG);
  const jong = withJong ? pick(BASIC_JONG) : "";
  const roman =
    (CHO_ROMAN[cho] ?? "") +
    (JUNG_ROMAN[jung] ?? "") +
    (jong ? (JONG_ROMAN[jong] ?? "") : "");

  return {
    cho,
    jong,
    jung,
    reels: withJong ? 3 : 2,
    roman: roman || "-",
    syllable: composeSyllable(cho, jung, jong),
  };
}

export const REEL_POOLS = {
  cho: BASIC_CHO,
  jong: BASIC_JONG,
  jung: BASIC_JUNG,
};

export function reelSpeed(round: number): number {
  const start = 520;
  const floor = 190;
  const ramp = 24;
  const progress = Math.min(1, (round - 1) / ramp);
  return Math.round(
    start - (start - floor) * Math.pow(progress, 1.6),
  );
}

export function comboMultiplier(combo: number): number {
  if (combo >= 10) return 3;
  if (combo >= 6) return 2;
  if (combo >= 3) return 1.5;
  return 1;
}
