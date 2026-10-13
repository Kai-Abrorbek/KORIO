"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

import styles from "./swipe-slides.module.css";

interface SwipeSlidesProps {
  /** 지금 탭 — 안 보이는 쪽은 inert (밀고 있을 땐 보이지만 누를 수는 없다) */
  index: number;
  /** 탭별 내용 2장. 높이를 두 장 사이에서 미는 만큼 보간한다 */
  slides: [ReactNode, ReactNode];
  /** 부모의 좌우 padding(px) 만큼 화면 끝까지 밀려 나가게 한다 — 안 주면 padding 안쪽에서 잘려 보인다 */
  bleed?: number;
}

/**
 * 화면의 **일부**만 탭에 따라 옆으로 넘기는 칸 (프리미엄 SUPER↔MAX, 학습 방식 로드↔자율).
 * 위치는 조상 요소의 CSS 변수 --swipe-progress 를 읽는다 — use-swipe-tabs + writeSwipeProgress 로 쓴다.
 * 조상에 data-swiping 이 붙어 있으면 손가락을 바로 따라가고(애니 없음), 떼면 같은 곡선으로 붙는다.
 *
 * 두 장의 높이가 달라서 칸 높이도 미는 만큼 바뀐다 — 아래 내용이 덜컥 튀지 않고 같이 미끄러진다.
 */
export function SwipeSlides({ bleed = 0, index, slides }: SwipeSlidesProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      slideRefs.current.forEach((slide, i) => {
        if (slide) root.style.setProperty(`--slide-h${i}`, slide.offsetHeight + "px");
      });
      root.dataset.measured = "";
    };
    measure();
    const observer = new ResizeObserver(measure);
    slideRefs.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={styles.slides}
      ref={rootRef}
      style={{ "--slides-bleed": bleed + "px" } as CSSProperties}
    >
      <div className={styles.track}>
        {slides.map((slide, i) => (
          <div
            aria-hidden={i !== index}
            className={styles.slide}
            inert={i !== index}
            key={i}
            ref={(node) => {
              slideRefs.current[i] = node;
            }}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}
