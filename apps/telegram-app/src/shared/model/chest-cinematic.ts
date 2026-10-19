/**
 * 상자 연출 — 여는 순간부터 보석이 카운터로 빨려 들어갈 때까지.
 *
 * 탭 1·2 : 상자가 덜컹 (소리가 점점 높아진다), 뚜껑 틈으로 빛이 새어 나온다
 * 탭 3 (시계 0 부터, ms):
 *   0     꾹 눌렸다가
 *   230   뚜껑이 날아가고 빛기둥이 솟는다 · 화면이 등급 색으로 번쩍 (burst)
 *   300   보석이 분수처럼 솟아 상자 위에 둥실 뜬다
 *   450   은: "우와!" · 금: "대박!" + 꽃가루
 *   1250  보석이 하나씩 위쪽 보석 카운터로 날아간다 — 닿을 때마다 딩, 숫자가 오른다
 *   끝    "보석 +N개" 화면
 *
 * 좌표는 px (화면이 상자 가운데와 카운터 자리를 재서 넘긴다).
 * 이 파일은 react-native 를 쓰지 않는다 — 텔레그램으로 그대로 옮길 수 있다.
 */
import {
  fountainAt,
  fountainItems,
  type CinemaCue,
  type CinemaKey,
  type FountainItem,
} from "./cinema";

export type ChestGrade = "wood" | "silver" | "gold";

export const CHEST_CINEMA = {
  lid: 230,
  fountain: 300,
  collect: 1250,
  /** 보석 하나가 카운터까지 가는 시간 */
  fly: 420,
  /** 보석끼리 출발 간격 */
  gap: 85,
} as const;

/** 날아가는 보석 수 — 받은 개수와 상관없이 화면이 넘치지 않게 */
export function flyingGemCount(amount: number) {
  return Math.max(4, Math.min(12, amount));
}

/** 마지막 보석이 카운터에 닿는 때 = 연출 끝 */
export function chestEnd(count: number) {
  return CHEST_CINEMA.collect + (count - 1) * CHEST_CINEMA.gap + CHEST_CINEMA.fly;
}

/** i 번째 보석이 카운터에 닿는 때 */
export function gemArrival(i: number) {
  return CHEST_CINEMA.collect + i * CHEST_CINEMA.gap + CHEST_CINEMA.fly;
}

export type ChestSound = "rattle" | "burst" | "gemDing" | "voWow" | "voDaebak";

/** 시간표 소리 — 딩은 보석이 닿을 때 화면이 높이를 올려 가며 직접 튼다 */
export function chestSoundCues(grade: ChestGrade): CinemaCue<ChestSound>[] {
  const cues: CinemaCue<ChestSound>[] = [{ t: CHEST_CINEMA.lid - 30, sound: "burst" }];
  if (grade === "gold") cues.push({ t: 450, sound: "voDaebak" });
  if (grade === "silver") cues.push({ t: 450, sound: "voWow" });
  return cues;
}

/** 등급별 빛 — 기둥·번쩍·보석 빛 */
export const GRADE_LIGHT: Record<ChestGrade, { pillar: string; flash: string; flashOpacity: number }> = {
  wood: { pillar: "#FFD98A", flash: "#FFF4D6", flashOpacity: 0.45 },
  silver: { pillar: "#CFE3FF", flash: "#EEF5FF", flashOpacity: 0.6 },
  gold: { pillar: "#FFE066", flash: "#FFF6C2", flashOpacity: 0.8 },
};

export const CHEST_TRACK = {
  /** 빛기둥 */
  pillar: [
    { t: 0, v: 0 },
    { t: 230, v: 0 },
    { t: 380, v: 1, e: "out" },
    { t: 1000, v: 0.75 },
    { t: 1700, v: 0, e: "inOut" },
  ],
  /** 화면 번쩍 */
  flash: [
    { t: 0, v: 0 },
    { t: 230, v: 0 },
    { t: 290, v: 1, e: "out" },
    { t: 700, v: 0, e: "out" },
  ],
} as const satisfies Record<string, readonly CinemaKey[]>;

export type FlyingGem = FountainItem;

/** 보석 분수 — 위쪽으로 부채꼴, 정해진 씨앗이라 매번 같은 모양 */
export function flyingGems(count: number, spread: number): FlyingGem[] {
  return fountainItems(count, spread, {
    start: CHEST_CINEMA.fountain,
    collect: CHEST_CINEMA.collect,
    gap: CHEST_CINEMA.gap,
    seed: 777,
    minSize: 26,
    sizeRange: 12,
  });
}

/** 보석 하나의 t 시점 자리 (cinema fountainAt) */
export const gemAt = fountainAt;

/** 탭마다 덜컹 소리를 이만큼 높인다 (긴장감) */
export const RATTLE_RATE = [1, 1.14, 1.3] as const;
