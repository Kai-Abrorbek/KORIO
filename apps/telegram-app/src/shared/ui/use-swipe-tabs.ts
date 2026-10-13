"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

/** 화면 너비의 이만큼 넘게 밀면 다음 탭으로 넘어간다 */
const SWITCH_RATIO = 0.22;
/** 빠르게 튕기면 짧게 밀어도 넘어간다 (px/ms) */
const SWITCH_VELOCITY = 0.35;
/** 손가락이 이만큼 움직여야 가로/세로를 정한다 (px) */
const LOCK_DISTANCE = 8;
/** 첫·마지막 탭에서 바깥으로 밀면 이만큼만 따라온다 (고무줄) */
const EDGE_RESISTANCE = 0.3;
export const SWIPE_SETTLE_MS = 320;
export const SWIPE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export interface SwipeTabsOptions {
  index: number;
  count: number;
  onIndexChange: (index: number) => void;
  /**
   * 지금 보이는 자리 (0 ~ count - 1, 소수. 끝 탭에서 바깥으로 끌면 고무줄만큼 살짝 밖).
   * 끄는 동안 매 프레임 불리니 setState 말고 style 을 직접 바꿔라.
   * immediate 면 손가락을 바로 따라가고(끄는 중·첫 배치), 아니면 같은 곡선(SWIPE_EASE)으로 붙는다.
   */
  onProgress: (progress: number, immediate: boolean) => void;
  /** 끌기 시작할 때 (옆 탭을 미리 그리는 등) */
  onDragStart?: () => void;
  /** 저장 중처럼 바꾸면 안 될 때 */
  disabled?: boolean;
}

/** 가로로 스크롤되는 요소(칩 줄 등)나 입력칸 안에서 시작한 터치는 그쪽에 양보한다 */
function startsInHorizontalScroller(target: EventTarget | null, root: HTMLElement) {
  let node = target instanceof Element ? target : null;
  while (node && node !== root) {
    if (node instanceof HTMLElement) {
      if (node.matches("input, textarea, select, [contenteditable='true'], [data-no-swipe]")) return true;
      if (node.scrollWidth > node.clientWidth + 1) {
        const overflowX = window.getComputedStyle(node).overflowX;
        if (overflowX === "auto" || overflowX === "scroll") return true;
      }
    }
    node = node.parentElement;
  }
  return false;
}

/**
 * root 위에서 옆으로 밀면 탭을 넘긴다 — 화면을 어떻게 움직일지는 onProgress 를 받는 쪽이 정한다
 * (통계처럼 화면 통째 = SwipePager, 프리미엄처럼 일부만 = SwipeSlides, 탭 밑줄·선택 배경 등).
 *
 * - 처음 몇 px 로 가로/세로를 정한다 — 세로면 평소 스크롤, 가로면 그때부터 세로 스크롤을 막는다.
 * - 놓을 때 화면 폭의 22% 를 넘었거나 빠르게 튕겼으면 넘어가고, 아니면 제자리.
 * - React 의 touchmove 는 passive 라 preventDefault 가 안 먹어서 직접 붙인다 (use-swipe-to-close 와 같다).
 *
 * onProgress 의 첫 호출(마운트 때)은 root 의 layout effect 시점이다 — root 안쪽 요소의 ref 는 붙어
 * 있지만 root 를 감싼 바깥 요소의 ref 는 아직 null 일 수 있다. 값은 root 안쪽에 써라.
 */
export function useSwipeTabs(rootRef: RefObject<HTMLElement | null>, options: SwipeTabsOptions) {
  const { index } = options;
  const optionsRef = useRef(options);
  const indexRef = useRef(index);
  const firstRef = useRef(true);

  // 아래 layout effect 보다 먼저 — 탭이 바뀐 그 렌더의 콜백을 쓰게
  useLayoutEffect(() => {
    optionsRef.current = options;
  });

  // 탭이 바뀌면(버튼이든 스와이프든) 그 자리로. 처음엔 애니 없이
  useLayoutEffect(() => {
    indexRef.current = index;
    optionsRef.current.onProgress(index, firstRef.current);
    firstRef.current = false;
  }, [index]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let mode: "idle" | "pending" | "drag" | "ignore" = "idle";
    let startX = 0;
    let startY = 0;
    let width = 1;
    let offset = 0;
    let lastX = 0;
    let lastTime = 0;
    let prevX = 0;
    let prevTime = 0;

    const onStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      const { count, disabled } = optionsRef.current;
      if (event.touches.length !== 1 || !touch || count < 2 || disabled) {
        mode = "idle";
        return;
      }
      if (startsInHorizontalScroller(event.target, root)) {
        mode = "ignore";
        return;
      }
      mode = "pending";
      startX = lastX = prevX = touch.clientX;
      startY = touch.clientY;
      lastTime = prevTime = event.timeStamp;
    };

    const onMove = (event: TouchEvent) => {
      if (mode !== "pending" && mode !== "drag") return;
      const touch = event.touches[0];
      if (!touch) return;
      if (mode === "pending") {
        const dx = Math.abs(touch.clientX - startX);
        const dy = Math.abs(touch.clientY - startY);
        if (dx < LOCK_DISTANCE && dy < LOCK_DISTANCE) return;
        if (dx <= dy) {
          mode = "ignore";
          return;
        }
        mode = "drag";
        width = root.clientWidth || 1;
        // 잡은 자리부터 따라가게 — 방향을 정하느라 움직인 몇 px 만큼 튀지 않는다
        startX = touch.clientX;
        optionsRef.current.onDragStart?.();
      }
      if (event.cancelable) event.preventDefault();
      prevX = lastX;
      prevTime = lastTime;
      lastX = touch.clientX;
      lastTime = event.timeStamp;
      offset = touch.clientX - startX;
      const last = optionsRef.current.count - 1;
      let progress = indexRef.current - offset / width;
      if (progress < 0) progress *= EDGE_RESISTANCE;
      else if (progress > last) progress = last + (progress - last) * EDGE_RESISTANCE;
      optionsRef.current.onProgress(progress, true);
    };

    const onEnd = (event: TouchEvent) => {
      if (mode !== "drag") {
        mode = "idle";
        return;
      }
      mode = "idle";
      const from = indexRef.current;
      const elapsed = lastTime - prevTime;
      // 놓기 직전에 멈춰 있었으면 튕긴 게 아니다
      const velocity = elapsed > 0 && event.timeStamp - lastTime < 90 ? (lastX - prevX) / elapsed : 0;
      let target = from;
      if (offset < -width * SWITCH_RATIO || (velocity < -SWITCH_VELOCITY && offset < -20)) target = from + 1;
      else if (offset > width * SWITCH_RATIO || (velocity > SWITCH_VELOCITY && offset > 20)) target = from - 1;
      target = Math.max(0, Math.min(optionsRef.current.count - 1, target));
      if (target === from) {
        optionsRef.current.onProgress(from, false);
        return;
      }
      window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
      optionsRef.current.onIndexChange(target);
      // 부모가 탭을 안 바꿨으면(저장 중 등) 제자리로
      window.requestAnimationFrame(() => {
        if (indexRef.current === from) optionsRef.current.onProgress(from, false);
      });
    };

    root.addEventListener("touchstart", onStart, { passive: true });
    root.addEventListener("touchmove", onMove, { passive: false });
    root.addEventListener("touchend", onEnd);
    root.addEventListener("touchcancel", onEnd);
    return () => {
      root.removeEventListener("touchstart", onStart);
      root.removeEventListener("touchmove", onMove);
      root.removeEventListener("touchend", onEnd);
      root.removeEventListener("touchcancel", onEnd);
    };
  }, [rootRef]);
}

/**
 * 진행 값을 CSS 변수로 element 에 쓴다 (SwipeSlides·탭 선택 배경이 이걸 읽는다).
 * immediate 면 data-swiping 을 달아 transition 을 끈다.
 */
export function writeSwipeProgress(
  element: HTMLElement | null,
  progress: number,
  immediate: boolean,
  variable = "--swipe-progress",
) {
  if (!element) return;
  element.style.setProperty(variable, String(progress));
  element.toggleAttribute("data-swiping", immediate);
}
