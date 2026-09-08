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
 * 스크롤 뒤 재측정은 여기서 안 한다 — TourTarget 이 활성 단계 동안 계속
 * 자기를 다시 재고 있어서 알아서 따라온다.
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

    // 단계가 바뀌면 좌표를 비우므로(store 주석 참고) 다시 잡힐 때까지 기다린다.
    // TourTarget 이 80ms 마다 재니 보통 첫 시도에 잡히고, 못 잡으면 몇 번 더.
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;

    const attempt = () => {
      const r = useTourStore.getState().rects[target];
      if (!r) {
        if (++tries < 8) timer = setTimeout(attempt, 100);
        return;
      }
      const dy = scrollDeltaFor(r, Dimensions.get("window").height);
      if (dy === 0) return;
      scrollRef.current?.scrollTo({
        y: Math.max(0, scrollY.current + dy),
        animated: true,
      });
    };

    timer = setTimeout(attempt, 120);
    return () => clearTimeout(timer);
  }, [activeTour, step, tourId]);

  /** ScrollView 의 onScroll 에 그대로 물리면 된다 */
  const onScroll = (e: { nativeEvent: { contentOffset: { y: number } } }) => {
    scrollY.current = e.nativeEvent.contentOffset.y;
  };

  return { onScroll };
}
