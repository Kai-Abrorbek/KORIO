"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import styles from "./swipe-pager.module.css";
import { SWIPE_EASE, SWIPE_SETTLE_MS, useSwipeTabs } from "./use-swipe-tabs";

export { SWIPE_EASE, SWIPE_SETTLE_MS } from "./use-swipe-tabs";

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

/**
 * 탭 화면을 통째로 옆으로 밀어서 넘기는 페이저 (통계처럼 탭마다 화면이 전부 다를 때).
 * 화면 일부만 넘길 땐 use-swipe-tabs + SwipeSlides.
 *
 * - 탭마다 세로 스크롤이 따로라 위치가 유지된다. 옆 탭은 잠깐 뒤에 미리 그려 둔다(밀 때 빈 화면 방지).
 */
export function SwipePager({ index, onIndexChange, onProgress, pages, paneClassName = "" }: SwipePagerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [warm, setWarm] = useState(false);
  const last = pages.length - 1;

  // 옆 탭은 첫 화면이 다 그려진 뒤에 미리 붙여 둔다
  useEffect(() => {
    const timer = window.setTimeout(() => setWarm(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useSwipeTabs(rootRef, {
    count: pages.length,
    index,
    onDragStart: () => setWarm(true),
    onIndexChange,
    onProgress: (progress, immediate) => {
      const track = trackRef.current;
      if (track) {
        track.style.transition = immediate ? "none" : `transform ${SWIPE_SETTLE_MS}ms ${SWIPE_EASE}`;
        track.style.transform = `translate3d(${-progress * 100}%, 0, 0)`;
      }
      // 고무줄로 바깥까지 끌려도 탭 밑줄은 끝 탭에서 멈춘다
      onProgress?.(Math.max(0, Math.min(last, progress)), immediate);
    },
  });

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
