/**
 * 자모 슬롯 게임 데이터.
 *
 * 목표 글자를 제시하면 유저가 릴을 하나씩 세워서 그 글자를 조립한다.
 * 한글은 유니코드로 정확히 조합되므로 글자를 하드코딩하지 않고 계산한다.
 *   코드 = 0xAC00 + (초성 * 21 + 중성) * 28 + 종성
 */

export interface JamoTarget {
  syllable: string; // 완성 글자 (가, 녹 …)
  roman: string;
  cho: string; // 초성 낱자
  jung: string; // 중성 낱자
  jong: string; // 종성 낱자 ("" 면 받침 없음)
  reels: 2 | 3;
}

// 유니코드 조합 순서 그대로 (인덱스가 곧 조합 값)
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

// 초보자에게 낼 범위 — 쌍자음·복잡한 모음/겹받침은 뺀다
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

/** 낱자 3개를 완성 글자로 조합 */
export function composeSyllable(cho: string, jung: string, jong = ""): string {
  const ci = CHO.indexOf(cho);
  const ji = JUNG.indexOf(jung);
  const ki = JONG.indexOf(jong);
  if (ci < 0 || ji < 0 || ki < 0) return "";
  return String.fromCharCode(0xac00 + (ci * 21 + ji) * 28 + ki);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** 정답을 포함해 릴에 얹을 낱자 후보를 섞어서 반환 */
export function buildReel(
  answer: string,
  pool: string[],
  size: number,
): string[] {
  const others = pool.filter((c) => c !== answer);
  const reel: string[] = [answer];
  while (reel.length < size && others.length) {
    const idx = Math.floor(Math.random() * others.length);
    reel.push(others.splice(idx, 1)[0]);
  }
  // 셔플
  for (let i = reel.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [reel[i], reel[j]] = [reel[j], reel[i]];
  }
  return reel;
}

/** 라운드가 올라가면 받침이 붙는다 */
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
    syllable: composeSyllable(cho, jung, jong),
    roman: roman || "-",
    cho,
    jung,
    jong,
    reels: withJong ? 3 : 2,
  };
}

export const REEL_POOLS = {
  cho: BASIC_CHO,
  jung: BASIC_JUNG,
  jong: BASIC_JONG,
};

/**
 * 한 칸이 지나가는 시간(ms). 클수록 느리다.
 * 처음엔 넉넉히 보고 맞출 수 있게 느리고, 라운드마다 조금씩 조여든다.
 * 초반 몇 판은 거의 안 빨라지도록 제곱근 곡선을 썼다.
 */
export function reelSpeed(round: number): number {
  const START = 520; // 1라운드
  const FLOOR = 190; // 아무리 빨라져도 이 밑으로는 안 감
  const RAMP = 24; // 이 라운드쯤에서 바닥에 닿음
  const p = Math.min(1, (round - 1) / RAMP);
  return Math.round(START - (START - FLOOR) * Math.pow(p, 1.6));
}

/** 콤보 배수 */
export function comboMultiplier(combo: number): number {
  if (combo >= 10) return 3;
  if (combo >= 6) return 2;
  if (combo >= 3) return 1.5;
  return 1;
}
