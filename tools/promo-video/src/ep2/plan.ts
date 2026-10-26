/**
 * "Telefon lugʻati" 시간표 — 대사 길이(voice.generated.json)로 대사마다 시작 프레임을 정한다.
 * 화면 사건은 대사 안의 비율(w)로 건다: 내레이션이 그 낱말을 말할 즈음.
 */
import voice from "./voice.generated.json";

export const FPS = 30;
export type Line = keyof typeof voice;

/** [대사, 앞에 두는 틈(프레임)] — 말하는 순서 */
const ORDER: [Line, number][] = [
  ["n01", 10], ["n02", 8], ["n03", 8], // 1 비교 칸
  ["n04", 10], // 2 사전
  ["n05", 12], ["a01", 4], ["a02", 2], // 3 밤 11시
  ["n06", 10], ["n07", 6], ["n08", 4], ["n09", 4], ["n10", 4], ["n11", 4], ["n12", 4], // 4 화면 속
  ["n13", 14], ["n14", 2], ["k01", 2], ["a03", 4], ["n15", 8], // 5 1년 뒤
  ["n16", 18], ["n18", 10], // 6 반전
  ["n19", 12], ["a04", 2], ["n20", 4], // 7 그 이웃
  ["n21", 14], ["n22", 10], // 8 댓글 · KORIO
];

export const AT = {} as Record<Line, { from: number; dur: number; end: number }>;
let cursor = 0;
for (const [line, gap] of ORDER) {
  const from = cursor + gap;
  const dur = Math.round(voice[line] * FPS);
  AT[line] = { from, dur, end: from + dur };
  cursor = from + dur;
}
export const TOTAL = cursor + 50;

/** 대사 line 의 p 지점 (0..1) */
export const w = (line: Line, p: number) => AT[line].from + Math.round(AT[line].dur * p);

/** 장면 경계 — 다음 장면 첫 대사 조금 앞에서 자른다 */
export const SCENES = {
  compare: [0, AT.n04.from - 6],
  dictionary: [AT.n04.from - 6, AT.n05.from - 8],
  night: [AT.n05.from - 8, AT.n06.from - 4],
  screen: [AT.n06.from - 4, AT.n13.from - 10],
  later: [AT.n13.from - 10, AT.n15.from - 4],
  same: [AT.n15.from - 4, AT.n16.from - 14],
  freeze: [AT.n16.from - 14, AT.n16.from - 2],
  why: [AT.n16.from - 2, AT.n18.from - 6],
  blue: [AT.n18.from - 6, AT.n19.from - 8],
  payoff: [AT.n19.from - 8, AT.n21.from - 10],
  cta: [AT.n21.from - 10, TOTAL],
} as const;
