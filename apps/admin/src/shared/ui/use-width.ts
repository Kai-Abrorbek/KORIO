"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 컨테이너의 실제 픽셀 너비.
 *
 * 차트를 viewBox 로 늘리지 않고 **실제 크기로 그리기 위해서** 필요하다.
 * viewBox 를 늘리면 선 굵기와 글자가 같이 늘어나서, 넓은 화면에서는 뚱뚱하고
 * 좁은 화면에서는 실처럼 얇아진다. 축 라벨 간격도 계산할 수 없다.
 */
export function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.getBoundingClientRect().width);
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      // 소수점까지 따라가면 리사이즈 중에 계속 다시 그린다
      setWidth(Math.round(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, width] as const;
}
