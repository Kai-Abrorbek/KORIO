"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

/** 팝오버 위로 노드까지 보이게 남길 높이 (.nodePopover / .roadmapPopover 의 top: 94px) */
const NODE_ABOVE = 94;
/** 스크롤 영역 가장자리와 띄울 여백 */
const MARGIN = 16;
/** 부드러운 스크롤이 끝날 때까지 "자동 스크롤 중" 으로 본다 */
const AUTO_SCROLL_MS = 800;

/**
 * 노드를 눌렀을 때 팝오버가 화면 아래로 잘리면, "시작/이어서" 버튼까지 보이게
 * 스크롤을 올린다 (앱 components/roadmap/useRevealPopover 와 같은 규칙).
 *
 * 팝오버는 노드 아래에 absolute 로 붙어 있어서, 그려진 뒤 실제 화면 좌표로
 * 스크롤 영역과 팝오버를 재고 넘친 만큼만 올린다. 이미 다 보이면 안 움직인다.
 *
 * 사용: 팝오버 루트에 `data-node-popover` 를 달고, 열린 노드 id 를 넘긴다.
 * 반환값 isAutoScrolling — "보이는 구간이 바뀌면 팝오버 닫기" 처리가 이 스크롤에
 * 반응하면 방금 연 팝오버가 바로 닫히니, 그동안은 건너뛴다.
 */
export function useRevealPopover(
  scrollRef: RefObject<HTMLElement | null>,
  openId: string | null,
) {
  const autoScrollUntil = useRef(0);

  useEffect(() => {
    if (!openId) return;
    // 팝오버가 DOM 에 붙고 레이아웃이 잡힌 다음 프레임에 잰다
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        const root = scrollRef.current;
        const popover = root?.querySelector<HTMLElement>("[data-node-popover]");
        if (!root || !popover) return;
        const list = root.getBoundingClientRect();
        const pop = popover.getBoundingClientRect();
        if (!list.height || !pop.height) return;

        const overflow = pop.bottom - (list.bottom - MARGIN);
        if (overflow <= 0) return; // 이미 다 보인다

        // 되도록 노드까지 같이 보이게. 팝오버가 너무 길면 버튼이 먼저다
        // (단, 팝오버 윗부분이 화면 위로 사라질 만큼은 안 올린다)
        const keepNode = pop.top - NODE_ABOVE - (list.top + MARGIN);
        const keepPopoverTop = pop.top - (list.top + MARGIN);
        const shift =
          overflow <= keepNode ? overflow : Math.min(overflow, keepPopoverTop);
        if (shift <= 0) return;

        autoScrollUntil.current = Date.now() + AUTO_SCROLL_MS;
        root.scrollBy({ behavior: "smooth", top: shift });
      });
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [openId, scrollRef]);

  return useCallback(() => Date.now() < autoScrollUntil.current, []);
}
