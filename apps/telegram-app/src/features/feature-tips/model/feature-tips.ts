/**
 * 잘 안 보이는 기능 안내 (친구 초대 · 텔레그램 스티커팩 · 보석 출금) — 앱 featureTips.store 와 같은 규칙.
 *
 *  - 처음 본 날(이 기기)에는 안 띄운다
 *  - 세 가지를 합쳐 하루에 하나
 *  - 기능마다 최대 MAX_SHOWS 번, "다시 보지 않기" 면 끝
 *  - 의미 있는 순간에만 (pending 트리거 · 보석 개수)
 *
 * 기록은 이 기기(localStorage)에만. 막혀 있거나 비어도 화면은 그대로 돈다 — 그땐 안 띄운다.
 */
export const FEATURE_TIPS = ["payout", "invite", "stickers"] as const;
export type FeatureTipId = (typeof FEATURE_TIPS)[number];

export const MAX_SHOWS = 2;
/** 보석이 이만큼 모이면 출금을 알린다 */
export const PAYOUT_TIP_GEMS = 10000;

const KEY = "korio-feature-tips";

export interface FeatureTipsState {
  firstSeenDay: string | null;
  lastShownDay: string | null;
  shown: Partial<Record<FeatureTipId, number>>;
  done: Partial<Record<FeatureTipId, boolean>>;
  pending: Partial<Record<FeatureTipId, boolean>>;
}

const EMPTY: FeatureTipsState = {
  done: {},
  firstSeenDay: null,
  lastShownDay: null,
  pending: {},
  shown: {},
};

/** 기기 시간대 기준 YYYY-MM-DD */
export function localDay(at = new Date()) {
  return `${at.getFullYear()}-${String(at.getMonth() + 1).padStart(2, "0")}-${String(at.getDate()).padStart(2, "0")}`;
}

export function readTips(): FeatureTipsState | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<FeatureTipsState>) } : { ...EMPTY };
  } catch {
    return null;
  }
}

function writeTips(update: (state: FeatureTipsState) => FeatureTipsState) {
  try {
    const current = readTips();
    if (!current) return;
    window.localStorage.setItem(KEY, JSON.stringify(update(current)));
  } catch {
    // 저장이 막혀 있으면 기록 없이 지나간다
  }
}

export function touchFirstSeen() {
  writeTips((s) => (s.firstSeenDay ? s : { ...s, firstSeenDay: localDay() }));
}

/** 상자 화면·아바타 편집기에서 — "다음에 홈에 가면 알릴 순간" */
export function triggerFeatureTip(id: FeatureTipId) {
  writeTips((s) => (s.done[id] ? s : { ...s, pending: { ...s.pending, [id]: true } }));
}

export function recordTipShown(id: FeatureTipId) {
  writeTips((s) => ({
    ...s,
    lastShownDay: localDay(),
    pending: { ...s.pending, [id]: false },
    shown: { ...s.shown, [id]: (s.shown[id] ?? 0) + 1 },
  }));
}

/** "다시 보지 않기" 또는 이미 쓰고 있어서 알릴 필요가 없어졌다 */
export function finishTip(id: FeatureTipId) {
  writeTips((s) => ({
    ...s,
    done: { ...s.done, [id]: true },
    pending: { ...s.pending, [id]: false },
  }));
}
