/**
 * 연출(시네마) 공용 바탕 — 시계 하나(ms)와 키프레임으로 장면을 돌린다.
 *
 * 레벨업 로켓(components/level-up/levelUpCinematic)과 같은 방식이다: 장면마다
 * 그림·시간표 파일은 순수 데이터와 "worklet" 함수만 갖고, 화면이 시계 하나로 부위마다
 * 자기 자리를 계산한다. 그래서 텔레그램(requestAnimationFrame)으로 옮길 때 이 파일과
 * 장면 파일을 그대로 가져가면 된다 — react-native 를 import 하지 않는다.
 *
 * cinemaAt 은 로켓 파일의 것과 같은 계산이다 (로켓은 두 앱이 같은 파일을 쓰고 있어 건드리지 않는다).
 */

export type CinemaEase = "in" | "out" | "inOut" | "linear" | "back";

export interface CinemaKey {
  t: number;
  v: number;
  /** 앞 키에서 이 키로 가는 곡선. back = 살짝 넘쳤다 돌아온다 */
  e?: CinemaEase;
}

/** 키프레임 → t 시점 값 (마지막 키 뒤로는 마지막 값) */
export function cinemaAt(keys: readonly CinemaKey[], t: number): number {
  "worklet";
  const n = keys.length;
  if (n === 0) return 0;
  const first = keys[0] as CinemaKey;
  if (t <= first.t) return first.v;
  for (let i = 1; i < n; i++) {
    const a = keys[i - 1] as CinemaKey;
    const b = keys[i] as CinemaKey;
    if (t <= b.t) {
      const span = b.t - a.t;
      const p = span <= 0 ? 1 : (t - a.t) / span;
      let k = p;
      if (b.e === "out") k = 1 - (1 - p) * (1 - p) * (1 - p);
      else if (b.e === "in") k = p * p * p;
      else if (b.e === "inOut") k = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      else if (b.e === "back") {
        const c = 1.70158;
        k = 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2);
      }
      return a.v + (b.v - a.v) * k;
    }
  }
  return (keys[n - 1] as CinemaKey).v;
}

/** from~to 사이 진행 0~1 */
export function progress(t: number, from: number, to: number): number {
  "worklet";
  if (to <= from) return t >= to ? 1 : 0;
  return Math.min(1, Math.max(0, (t - from) / (to - from)));
}

export function easeOut(p: number): number {
  "worklet";
  return 1 - (1 - p) * (1 - p) * (1 - p);
}

/**
 * 충격 흔들림 — start 에서 amp(px) 로 시작해 dur 동안 잦아든다.
 * 축마다 다른 주기를 줘서 대각선으로 덜덜 떨린다.
 */
export function shakeAt(t: number, start: number, dur: number, amp: number): { x: number; y: number } {
  "worklet";
  const age = t - start;
  if (age < 0 || age > dur) return { x: 0, y: 0 };
  const fall = 1 - age / dur;
  const a = amp * fall * fall;
  return { x: a * Math.sin(age / 11), y: a * 0.7 * Math.cos(age / 15) };
}

/** 정해진 씨앗으로 섞는다 — 매번 같은 연출 */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 소리 큐 — 연출 시계의 이 시각에 이 소리 */
export interface CinemaCue<S extends string> {
  t: number;
  sound: S;
}

/* ───────── 그림 ─────────
 * 로켓과 같은 도형 목록 (각 앱의 WearShapes 로 그린다).
 */
export type CinemaShape =
  | { k: "path"; d: string; f?: string; s?: string; w?: number; o?: number; round?: boolean }
  | { k: "rect"; x: number; y: number; width: number; height: number; rx?: number; f?: string; s?: string; w?: number; o?: number }
  | { k: "circle"; cx: number; cy: number; r: number; f?: string; s?: string; w?: number; o?: number }
  | { k: "ellipse"; cx: number; cy: number; rx: number; ry: number; f?: string; s?: string; w?: number; o?: number }
  | { k: "g"; transform: string; children: CinemaShape[] };

/** 꽃잎 테두리(물결 원) — 도장 테두리처럼 */
export function scallopPath(cx: number, cy: number, r: number, bumps: number, depth: number): string {
  const steps = bumps * 8;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2 - Math.PI / 2;
    const rr = r - depth * (0.5 - 0.5 * Math.cos(a * bumps));
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return `${d}Z`;
}

/** 별 (꼭짓점 n, 바깥·안 반지름) */
export function starPath(cx: number, cy: number, outer: number, inner: number, points = 5): string {
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(cx + Math.cos(a) * r).toFixed(2)} ${(cy + Math.sin(a) * r).toFixed(2)} `;
  }
  return `${d}Z`;
}

/** 번개 모양 (캔버스 100×100) — 아이콘 대신 그린다 */
export const BOLT_PATH = "M58 4 L18 56 L46 56 L38 96 L82 38 L54 38 L64 4 Z";

/* ───────── 분수 → 카운터 ─────────
 * 상자 보석·잭팟 동전처럼 한 점에서 부채꼴로 솟아 둥실 떠 있다가, 하나씩 카운터로 빨려 든다.
 */
export interface FountainItem {
  /** 둥실 뜬 자리 (나온 곳 기준 px) */
  hx: number;
  hy: number;
  /** 솟기 시작 */
  t0: number;
  size: number;
  spin: number;
  /** 카운터로 출발 */
  t1: number;
}

export function fountainItems(
  count: number,
  spread: number,
  opts: { start: number; collect: number; gap: number; seed: number; minSize: number; sizeRange: number },
): FountainItem[] {
  const rand = seeded(opts.seed + count);
  return Array.from({ length: count }, (_, i) => {
    const u = count === 1 ? 0.5 : i / (count - 1);
    const angle = (-90 + (u - 0.5) * 150 + (rand() - 0.5) * 14) * (Math.PI / 180);
    const r = spread * (0.55 + rand() * 0.45);
    return {
      hx: Math.cos(angle) * r,
      hy: Math.sin(angle) * r * 0.9 - spread * 0.15,
      t0: opts.start + i * 22,
      size: opts.minSize + rand() * opts.sizeRange,
      spin: (rand() - 0.5) * 720,
      t1: opts.collect + i * opts.gap,
    };
  });
}

/**
 * 하나의 t 시점 자리. from = 나온 곳, to = 카운터 (같은 좌표계 px).
 * 솟을 땐 뛰어올랐다 내려앉듯, 떠 있을 땐 살랑, 날아갈 땐 빨려 들듯 (가속).
 */
export function fountainAt(
  g: FountainItem,
  t: number,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  fly = 420,
) {
  "worklet";
  if (t < g.t0) return { x: fromX, y: fromY, scale: 0, opacity: 0, rotate: 0 };
  const hoverX = fromX + g.hx;
  const hoverY = fromY + g.hy;
  if (t < g.t1) {
    const p = Math.min(1, (t - g.t0) / 520);
    const e = 1 - (1 - p) * (1 - p) * (1 - p);
    const lift = Math.sin(p * Math.PI) * 26;
    const bob = p >= 1 ? Math.sin((t - g.t0) / 160 + g.hx) * 3 : 0;
    return {
      x: fromX + (hoverX - fromX) * e,
      y: fromY + (hoverY - fromY) * e - lift + bob,
      scale: 0.3 + 0.7 * e,
      opacity: 1,
      rotate: g.spin * e * 0.25,
    };
  }
  const p = Math.min(1, (t - g.t1) / fly);
  const e = p * p * p;
  // 살짝 옆으로 휘어서 날아간다
  const curve = Math.sin(p * Math.PI) * -40;
  return {
    x: hoverX + (toX - hoverX) * e + curve,
    y: hoverY + (toY - hoverY) * e,
    scale: 1 - 0.55 * e,
    opacity: p >= 1 ? 0 : 1,
    rotate: g.spin * 0.25 + g.spin * e,
  };
}
