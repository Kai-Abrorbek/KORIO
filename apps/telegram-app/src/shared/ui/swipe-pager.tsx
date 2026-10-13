"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import styles from "./swipe-pager.module.css";

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

interface SwipePagerProps {
  index: number;
  onIndexChange: (index: number) => void;
  pages: ReactNode[];
  /**
   * 손가락을 따라 바뀌는 현재 위치 (0 ~ pages.length - 1, 소수). 탭 밑줄을 따라 움직일 때 쓴다.
   * 끄는 동안 매 프레임 불리니 setState 말고 style 을 직접 바꿔라. dragging 이 false 면 놓은 뒤라
   * 같은 시간(SWIPE_SETTLE_MS)·곡선(SWIPE_EASE)으로 따라가면 된다.
   */
  onProgress?: (progress: number, dragging: boolean) => void;
  /** 탭 하나(세로 스크롤 영역)에 붙일 클래스 — 여백 등 */
  paneClassName?: string;
}

/** 가로로 스크롤되는 요소(칩 줄 등) 안에서 시작한 터치는 그 요소에 양보한다 */
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
 * 탭 화면을 옆으로 밀어서 넘기는 페이저 (앱의 상단 탭 + 스와이프와 같은 느낌).
 *
 * - 손가락을 따라 움직이고, 놓으면 넘어가거나 제자리로 부드럽게 돌아온다.
 * - 처음 몇 px 로 가로/세로를 정한다 — 세로면 평소 스크롤, 가로면 그때부터 세로 스크롤을 막는다.
 * - 탭마다 세로 스크롤이 따로라 위치가 유지된다. 옆 탭은 잠깐 뒤에 미리 그려 둔다(밀 때 빈 화면 방지).
 * - React 의 touchmove 는 passive 라 preventDefault 가 안 먹어서 직접 붙인다 (use-swipe-to-close 와 같다).
 */
export function SwipePager({ index, onIndexChange, onProgress, pages, paneClassName = "" }: SwipePagerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(index);
  const countRef = useRef(pages.length);
  const changeRef = useRef(onIndexChange);
  const progressRef = useRef(onProgress);
  const firstRef = useRef(true);
  const [warm, setWarm] = useState(false);

  useEffect(() => {
    changeRef.current = onIndexChange;
    progressRef.current = onProgress;
    countRef.current = pages.length;
  });

  // 옆 탭은 첫 화면이 다 그려진 뒤에 미리 붙여 둔다
  useEffect(() => {
    const timer = window.setTimeout(() => setWarm(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  // 탭이 바뀌면(탭 버튼이든 스와이프든) 그 자리로 이동한다. 처음엔 애니 없이
  useLayoutEffect(() => {
    indexRef.current = index;
    const track = trackRef.current;
    if (!track) return;
    const animate = !firstRef.current;
    firstRef.current = false;
    track.style.transition = animate ? `transform ${SWIPE_SETTLE_MS}ms ${SWIPE_EASE}` : "none";
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
    progressRef.current?.(index, false);
  }, [index]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    let mode: "idle" | "pending" | "drag" | "ignore" = "idle";
    let startX = 0;
    let startY = 0;
    let base = 0;
    let width = 1;
    let offset = 0;
    let lastX = 0;
    let lastTime = 0;
    let prevX = 0;
    let prevTime = 0;

    const resist = (raw: number) => {
      const atFirst = indexRef.current === 0 && raw > 0;
      const atLast = indexRef.current === countRef.current - 1 && raw < 0;
      return atFirst || atLast ? raw * EDGE_RESISTANCE : raw;
    };

    const place = (next: number) => {
      offset = next;
      track.style.transition = "none";
      track.style.transform = `translate3d(${-indexRef.current * width + next}px, 0, 0)`;
      // 고무줄로 바깥까지 끌려도 탭 밑줄은 끝 탭에서 멈춘다
      const progress = indexRef.current - next / width;
      progressRef.current?.(Math.max(0, Math.min(countRef.current - 1, progress)), true);
    };

    const settle = (target: number) => {
      track.style.transition = `transform ${SWIPE_SETTLE_MS}ms ${SWIPE_EASE}`;
      track.style.transform = `translate3d(${-target * 100}%, 0, 0)`;
      progressRef.current?.(target, false);
    };

    const onStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (event.touches.length !== 1 || !touch || countRef.current < 2) {
        mode = "idle";
        return;
      }
      if (startsInHorizontalScroller(event.target, root)) {
        mode = "ignore";
        return;
      }
      setWarm(true);
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
        // 넘어가는 애니 도중에 다시 잡으면 지금 보이는 자리에서 이어 끈다
        const current = new DOMMatrixReadOnly(window.getComputedStyle(track).transform).m41;
        base = current + indexRef.current * width;
        startX = touch.clientX;
      }
      if (event.cancelable) event.preventDefault();
      prevX = lastX;
      prevTime = lastTime;
      lastX = touch.clientX;
      lastTime = event.timeStamp;
      place(resist(base + touch.clientX - startX));
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
      target = Math.max(0, Math.min(countRef.current - 1, target));
      if (target === from) {
        settle(from);
        return;
      }
      window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
      changeRef.current(target);
      // 부모가 탭을 안 바꿨으면 제자리로
      window.requestAnimationFrame(() => {
        if (indexRef.current === from) settle(from);
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
  }, []);

  return (
    <div className={styles.pager} ref={rootRef}>
      <div className={styles.track} ref={trackRef}>
        {pages.map((page, i) => (
          <div
            aria-hidden={i !== index}
            className={styles.pane + (paneClassName ? " " + paneClassName : "")}
            inert={i !== index}
            key={i}
          >
            {warm || i === index ? page : null}
          </div>
        ))}
      </div>
    </div>
  );
}
