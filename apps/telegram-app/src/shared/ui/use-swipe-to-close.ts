"use client";

import { useEffect, useRef, type RefObject } from "react";

/** 이만큼 내리면 닫는다 (px) */
const CLOSE_DISTANCE = 110;
/** 빠르게 튕겨 내리면 짧아도 닫는다 (px/ms) */
const CLOSE_VELOCITY = 0.55;
const SETTLE_MS = 220;

/**
 * 아래에서 올라온 시트를 손가락으로 끌어내려 닫는다 (앱 바텀시트의 pan 제스처와 같은 느낌).
 *
 * 시트 안이 스크롤될 수 있어서, **맨 위까지 올라가 있을 때 아래로 끄는 것만** 시트를 끈다.
 * 그 외엔 평소처럼 안쪽이 스크롤된다. React 의 touchmove 는 passive 라 preventDefault 가
 * 안 먹어서 직접 붙인다 (passive: false).
 */
export function useSwipeToClose(sheetRef: RefObject<HTMLElement | null>, onClose: () => void) {
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    let startY = 0;
    let startTime = 0;
    let lastY = 0;
    let lastTime = 0;
    let dragging = false;
    let tracking = false;
    let closing = false;

    const setOffset = (offset: number, animate: boolean) => {
      sheet.style.transition = animate ? `transform ${SETTLE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none";
      sheet.style.transform = offset > 0 ? `translateY(${offset}px)` : "";
    };

    const onStart = (event: TouchEvent) => {
      if (closing || event.touches.length !== 1) return;
      const touch = event.touches[0];
      if (!touch) return;
      startY = lastY = touch.clientY;
      startTime = lastTime = event.timeStamp;
      dragging = false;
      tracking = true;
    };

    const onMove = (event: TouchEvent) => {
      if (!tracking) return;
      const touch = event.touches[0];
      if (!touch) return;
      const delta = touch.clientY - startY;
      if (!dragging) {
        // 안쪽이 스크롤된 상태거나 위로 끌면 평소 스크롤
        if (delta <= 4 || sheet.scrollTop > 0) {
          if (delta < -4) tracking = false;
          return;
        }
        dragging = true;
      }
      event.preventDefault();
      lastY = touch.clientY;
      lastTime = event.timeStamp;
      setOffset(Math.max(0, delta), false);
    };

    const onEnd = () => {
      if (!tracking) return;
      tracking = false;
      if (!dragging) return;
      dragging = false;
      const delta = lastY - startY;
      const elapsed = Math.max(1, lastTime - startTime);
      const velocity = delta / elapsed;
      if (delta > CLOSE_DISTANCE || (velocity > CLOSE_VELOCITY && delta > 30)) {
        closing = true;
        setOffset(sheet.getBoundingClientRect().height + 40, true);
        window.setTimeout(() => closeRef.current(), SETTLE_MS);
        return;
      }
      setOffset(0, true);
    };

    sheet.addEventListener("touchstart", onStart, { passive: true });
    sheet.addEventListener("touchmove", onMove, { passive: false });
    sheet.addEventListener("touchend", onEnd);
    sheet.addEventListener("touchcancel", onEnd);
    return () => {
      sheet.removeEventListener("touchstart", onStart);
      sheet.removeEventListener("touchmove", onMove);
      sheet.removeEventListener("touchend", onEnd);
      sheet.removeEventListener("touchcancel", onEnd);
    };
  }, [sheetRef]);
}
