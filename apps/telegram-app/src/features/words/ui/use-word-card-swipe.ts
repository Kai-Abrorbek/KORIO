"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

export const WORD_CARD_SWIPE_THRESHOLD = 88;
const SWIPE_VELOCITY = 720; // px/s, same as the mobile word cards
const ACTIVATE_X = 12;
const FAIL_Y = 20;

interface SwipeOptions {
  disabled: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onOffset: (offset: number) => void;
  onCommit: (direction: -1 | 1) => void;
  onReset: () => void;
}

interface Point {
  x: number;
  y: number;
  time: number;
}

interface Drag {
  kind: "touch" | "pointer";
  id: number;
  start: Point;
  previous: Point;
  last: Point;
  axis: "pending" | "horizontal" | "vertical";
}

/** Native touchmove must be non-passive in Telegram WebViews, like useSwipeTabs. */
export function attachWordCardSwipe(
  root: HTMLElement,
  options: () => SwipeOptions,
) {
  let drag: Drag | null = null;

  const begin = (
    kind: Drag["kind"],
    id: number,
    point: Point,
    target: EventTarget | null,
  ) => {
    if (drag || options().disabled) return;
    if (
      target instanceof Element &&
      target.closest(
        'button, input, textarea, select, a, label, [contenteditable="true"], [role="button"], [data-no-swipe]',
      )
    )
      return;
    drag = {
      kind,
      id,
      start: point,
      previous: point,
      last: point,
      axis: "pending",
    };
  };

  const releaseCapture = (current: Drag) => {
    if (current.kind === "pointer" && root.hasPointerCapture(current.id)) {
      root.releasePointerCapture(current.id);
    }
  };

  const cancel = () => {
    const current = drag;
    drag = null;
    if (!current) return;
    releaseCapture(current);
    if (current.axis === "horizontal") options().onReset();
  };

  const move = (point: Point, event: Event) => {
    const current = drag;
    if (!current) return;
    if (options().disabled) {
      cancel();
      return;
    }
    const dx = point.x - current.start.x;
    const dy = point.y - current.start.y;
    if (current.axis === "pending") {
      if (
        Math.abs(dy) > FAIL_Y ||
        (Math.abs(dy) > ACTIVATE_X && Math.abs(dy) >= Math.abs(dx))
      ) {
        current.axis = "vertical";
      } else if (Math.abs(dx) > ACTIVATE_X && Math.abs(dx) > Math.abs(dy)) {
        current.axis = "horizontal";
      }
    }
    if (current.axis !== "horizontal") return;
    if (event.cancelable) event.preventDefault();
    if (point.x !== current.last.x) {
      current.previous = current.last;
      current.last = point;
    }
    const canMove = dx < 0 ? options().canGoNext : options().canGoPrevious;
    options().onOffset(canMove ? dx : dx * 0.18);
  };

  const end = (point: Point, event: Event) => {
    const current = drag;
    drag = null;
    if (!current) return;
    releaseCapture(current);
    if (current.axis !== "horizontal") return;
    if (options().disabled) {
      options().onReset();
      return;
    }
    if (event.cancelable) event.preventDefault();
    const dx = point.x - current.start.x;
    const latest = point.x !== current.last.x ? point : current.last;
    const previous =
      point.x !== current.last.x ? current.last : current.previous;
    const elapsed = latest.time - previous.time;
    const velocity =
      elapsed > 0 && point.time - latest.time < 90
        ? ((latest.x - previous.x) / elapsed) * 1000
        : 0;
    const direction = dx < 0 ? 1 : -1;
    const canMove =
      direction > 0 ? options().canGoNext : options().canGoPrevious;
    if (
      canMove &&
      (Math.abs(dx) >= WORD_CARD_SWIPE_THRESHOLD ||
        (Math.abs(dx) > ACTIVATE_X && Math.abs(velocity) >= SWIPE_VELOCITY))
    ) {
      options().onCommit(direction);
    } else {
      options().onReset();
    }
  };

  const touchPoint = (touch: Touch, event: TouchEvent): Point => ({
    x: touch.clientX,
    y: touch.clientY,
    time: event.timeStamp,
  });
  const onTouchStart = (event: TouchEvent) => {
    if (event.touches.length !== 1) {
      cancel();
      return;
    }
    const touch = event.touches[0];
    if (touch)
      begin("touch", touch.identifier, touchPoint(touch, event), event.target);
  };
  const onTouchMove = (event: TouchEvent) => {
    if (drag?.kind !== "touch") return;
    if (event.touches.length !== 1) {
      cancel();
      return;
    }
    const touch = event.touches[0];
    if (touch?.identifier === drag.id) move(touchPoint(touch, event), event);
  };
  const onTouchEnd = (event: TouchEvent) => {
    if (drag?.kind !== "touch") return;
    const touch = Array.from(event.changedTouches).find(
      (item) => item.identifier === drag?.id,
    );
    if (touch) end(touchPoint(touch, event), event);
  };
  const onTouchCancel = () => {
    if (drag?.kind === "touch") cancel();
  };

  const pointerPoint = (event: PointerEvent): Point => ({
    x: event.clientX,
    y: event.clientY,
    time: event.timeStamp,
  });
  const onPointerDown = (event: PointerEvent) => {
    // A touch also emits pointer events. Handle it only through the native touch path.
    if (event.pointerType === "touch" || event.button !== 0 || !event.isPrimary)
      return;
    begin("pointer", event.pointerId, pointerPoint(event), event.target);
    if (drag?.kind === "pointer" && drag.id === event.pointerId)
      root.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent) => {
    if (drag?.kind === "pointer" && drag.id === event.pointerId)
      move(pointerPoint(event), event);
  };
  const onPointerUp = (event: PointerEvent) => {
    if (drag?.kind === "pointer" && drag.id === event.pointerId)
      end(pointerPoint(event), event);
  };
  const onPointerCancel = (event: PointerEvent) => {
    if (drag?.kind === "pointer" && drag.id === event.pointerId) cancel();
  };

  root.addEventListener("touchstart", onTouchStart, { passive: true });
  root.addEventListener("touchmove", onTouchMove, { passive: false });
  root.addEventListener("touchend", onTouchEnd, { passive: false });
  root.addEventListener("touchcancel", onTouchCancel);
  root.addEventListener("pointerdown", onPointerDown);
  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerup", onPointerUp);
  root.addEventListener("pointercancel", onPointerCancel);
  root.addEventListener("lostpointercapture", onPointerCancel);
  return () => {
    root.removeEventListener("touchstart", onTouchStart);
    root.removeEventListener("touchmove", onTouchMove);
    root.removeEventListener("touchend", onTouchEnd);
    root.removeEventListener("touchcancel", onTouchCancel);
    root.removeEventListener("pointerdown", onPointerDown);
    root.removeEventListener("pointermove", onPointerMove);
    root.removeEventListener("pointerup", onPointerUp);
    root.removeEventListener("pointercancel", onPointerCancel);
    root.removeEventListener("lostpointercapture", onPointerCancel);
    const current = drag;
    drag = null;
    if (current) releaseCapture(current);
  };
}

export function useWordCardSwipe(options: SwipeOptions) {
  const optionsRef = useRef(options);
  useLayoutEffect(() => {
    optionsRef.current = options;
  });
  // The deck mounts after asynchronous loading. A callback ref attaches then,
  // unlike a mount-only effect which would see null and never attach a listener.
  return useCallback((element: HTMLDivElement | null) => {
    if (!element) return;
    return attachWordCardSwipe(element, () => optionsRef.current);
  }, []);
}
