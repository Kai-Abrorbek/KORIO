"use client";

/**
 * 연출 시계 — 0 에서 end(ms) 까지 한 번 곧게 흐른다 (앱 components/cinema/useCinema 의 useCinemaClock).
 * React 는 뼈대만 한 번 그리고, requestAnimationFrame 이 매 프레임 onFrame(t) 을 부른다 —
 * 부위마다 cinemaAt 으로 자기 자리를 계산해 style 을 직접 바꾼다 (레벨업 로켓과 같은 방식).
 * from 으로 아무 시각부터, 건너뛰기는 seek(뒤 시각).
 */
export function runCinemaClock(end: number, onFrame: (t: number) => void, from = 0) {
  let start = performance.now() - from;
  let frame = 0;
  let stopped = false;

  const tick = (now: number) => {
    const t = Math.min(end, Math.max(0, now - start));
    onFrame(t);
    if (t < end && !stopped) frame = requestAnimationFrame(tick);
  };

  onFrame(Math.min(end, from));
  frame = requestAnimationFrame(tick);

  return {
    /** 지금 시계 (ms) */
    now: () => Math.min(end, Math.max(0, performance.now() - start)),
    seek(t: number) {
      if (stopped) return;
      start = performance.now() - t;
      cancelAnimationFrame(frame);
      onFrame(Math.min(end, t));
      frame = requestAnimationFrame(tick);
    },
    stop() {
      stopped = true;
      cancelAnimationFrame(frame);
    },
  };
}

export type CinemaClock = ReturnType<typeof runCinemaClock>;

/** 동작 줄이기 — 켜져 있으면 연출은 결과부터 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/** 텔레그램 진동 (없으면 조용히 넘어간다) */
export function cinemaHaptic(kind: "light" | "medium" | "heavy" | "success" | "warning") {
  const haptic = typeof window === "undefined" ? undefined : window.Telegram?.WebApp.HapticFeedback;
  if (!haptic) return;
  if (kind === "success" || kind === "warning") haptic.notificationOccurred(kind);
  else haptic.impactOccurred(kind);
}
