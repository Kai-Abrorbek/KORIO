import { useEffect, useRef } from "react";
import { Dimensions, type ScrollView } from "react-native";
import { useTourStore } from "./tour.store";
import { scrollDeltaFor } from "./tour-geometry";
import { TOURS } from "./tours";

/**
 * 투어 단계가 바뀔 때 대상을 화면 안으로 스크롤한다.
 *
 * 오버레이는 루트에 있어서 화면의 ScrollView 를 모른다. 그래서 스크롤은
 * 화면이 이 훅으로 직접 한다.
 *
 * 순서가 중요하다: 스크롤 → (애니메이션이 끝날 때까지 기다림) → 재측정.
 * 스크롤은 레이아웃을 바꾸지 않아서 onLayout 이 안 뜬다. 재측정을 안 하면
 * 구멍이 스크롤 전 위치에 그대로 뚫린다.
 */
export function useTourScroll(
  tourId: string,
  scrollRef: React.RefObject<ScrollView | null>,
  /** 스크롤과 무관하게 늘 보이는 대상 (플로팅 버튼 등) */
  fixedTargets: string[] = [],
) {
  const activeTour = useTourStore((s) => s.activeTour);
  const step = useTourStore((s) => s.step);
  const scrollY = useRef(0);

  useEffect(() => {
    if (activeTour !== tourId) return;
    const target = TOURS[tourId]?.steps[step]?.target;
    if (!target || fixedTargets.includes(target)) return;

    // 오버레이가 방금 재측정을 걸었다. 그 결과가 반영된 뒤에 계산해야 한다
    const id = setTimeout(() => {
      const r = useTourStore.getState().rects[target];
      if (!r) return;
      const dy = scrollDeltaFor(r, Dimensions.get("window").height);
      if (dy === 0) return;
      scrollRef.current?.scrollTo({
        y: Math.max(0, scrollY.current + dy),
        animated: true,
      });
      // 스크롤이 끝난 뒤 다시 재야 구멍이 새 위치에 뚫린다
      setTimeout(() => useTourStore.getState().remeasure(), 400);
    }, 80);

    return () => clearTimeout(id);
  }, [activeTour, step, tourId]);

  /** ScrollView 의 onScroll 에 그대로 물리면 된다 */
  const onScroll = (e: { nativeEvent: { contentOffset: { y: number } } }) => {
    scrollY.current = e.nativeEvent.contentOffset.y;
  };

  return { onScroll };
}
