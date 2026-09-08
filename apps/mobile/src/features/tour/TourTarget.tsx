import { useCallback, useEffect, useRef } from "react";
import { View, type ViewProps, type LayoutChangeEvent } from "react-native";
import { useTourStore } from "./tour.store";
import { TOURS } from "./tours";

/** 활성 단계일 때 위치를 다시 재는 주기 */
const POLL_MS = 80;

interface Props extends ViewProps {
  /** 투어 단계에서 가리킬 이름 */
  tourId: string;
  /**
   * 잰 사각형에서 각 변을 깎을 값.
   *
   * 래퍼는 자식의 **바깥 여백까지 포함해서** 잰다. 카드처럼
   * marginHorizontal: 16, marginBottom: 12 를 가진 자식을 감싸면
   * 구멍이 그만큼 넓게 뚫린다. 네 변을 따로 받는 이유는 마진이 상하
   * 대칭이 아닌 경우가 흔해서다 (위 0, 아래 12).
   */
  inset?: { top?: number; bottom?: number; left?: number; right?: number };
  children: React.ReactNode;
}

/**
 * 투어가 가리킬 대상을 감싼다.
 *
 * ⚠️ **onLayout 하나만 믿으면 안 된다.**
 * onLayout 은 뷰가 *자기 부모 안에서* 위치·크기가 바뀔 때만 뜬다. 홈은
 * getMe·주간통계가 늦게 도착해서 **위쪽 내용이 나중에 늘어나는데**, 그러면
 * 대상은 화면에서 아래로 밀리지만 자기 부모 기준 위치는 그대로다 →
 * onLayout 이 안 뜨고, 잰 좌표는 옛날 자리에 머문다. 그래서 구멍이 실제
 * 버튼보다 위에 뚫렸다.
 *
 * 그래서 **지금 설명 중인 대상은 계속 다시 잰다.** 한 번에 뷰 하나뿐이고
 * 초당 8번이라 비용은 없다시피 하고, 데이터가 늦게 오든 스크롤을 하든
 * 애니메이션이 남아 있든 알아서 따라간다.
 */
export default function TourTarget({
  tourId,
  inset,
  children,
  ...rest
}: Props) {
  const ref = useRef<View>(null);
  const setRect = useTourStore((s) => s.setRect);
  const measureNonce = useTourStore((s) => s.measureNonce);

  // 지금 이 대상을 설명 중인가
  const isActive = useTourStore((s) => {
    if (!s.activeTour) return false;
    return TOURS[s.activeTour]?.steps[s.step]?.target === tourId;
  });

  const measure = useCallback(() => {
    ref.current?.measureInWindow((x, y, width, height) => {
      if (!width || !height) return;
      const top = inset?.top ?? 0;
      const bottom = inset?.bottom ?? 0;
      const left = inset?.left ?? 0;
      const right = inset?.right ?? 0;
      setRect(tourId, {
        x: x + left,
        y: y + top,
        width: Math.max(1, width - left - right),
        height: Math.max(1, height - top - bottom),
      });
    });
  }, [
    tourId,
    setRect,
    inset?.top,
    inset?.bottom,
    inset?.left,
    inset?.right,
  ]);

  // 활성 단계인 동안 계속 따라간다
  useEffect(() => {
    if (!isActive) return;
    measure();
    const id = setInterval(measure, POLL_MS);
    return () => clearInterval(id);
  }, [isActive, measure]);

  // 투어가 명시적으로 요청할 때 (스크롤 직후 등)
  useEffect(() => {
    if (measureNonce > 0) measure();
  }, [measureNonce, measure]);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      rest.onLayout?.(e);
      // 애니메이션이 끝난 위치를 잡으려면 다음 프레임에
      requestAnimationFrame(measure);
    },
    [measure, rest.onLayout],
  );

  return (
    <View ref={ref} collapsable={false} {...rest} onLayout={onLayout}>
      {children}
    </View>
  );
}
