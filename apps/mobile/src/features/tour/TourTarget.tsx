import { useCallback, useEffect, useRef } from "react";
import { View, type ViewProps, type LayoutChangeEvent } from "react-native";
import { useTourStore } from "./tour.store";

interface Props extends ViewProps {
  /** 투어 단계에서 가리킬 이름 */
  tourId: string;
  /**
   * 잰 사각형을 줄일 값 (좌우, 상하).
   *
   * 래퍼는 자식의 **바깥 여백까지 포함해서** 잰다. 카드처럼
   * marginHorizontal 을 가진 자식을 감싸면 구멍이 그만큼 넓게 뚫린다.
   * 자식의 마진을 여기 적어주면 정확히 카드만 남는다.
   */
  inset?: { x?: number; y?: number };
  children: React.ReactNode;
}

/**
 * 투어가 가리킬 대상을 감싼다.
 *
 * onLayout 만으로는 부모 기준 좌표라 화면 좌표를 모른다. 스포트라이트는
 * 화면 전체를 덮는 오버레이 위에 뚫는 구멍이라 window 좌표가 필요해서
 * measureInWindow 를 쓴다.
 *
 * 홈은 ScrollView 라 스크롤하면 좌표가 바뀐다. 그래서 오버레이가 뜰 때
 * 다시 재는 게 아니라, 투어가 그 단계로 갈 때 대상을 화면 안으로
 * 스크롤시키고(화면 쪽 책임) 여기서는 레이아웃이 바뀔 때마다 갱신한다.
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

  const measure = useCallback(() => {
    // 다음 프레임에 재야 애니메이션(FadeInDown) 이 끝난 위치가 잡힌다
    requestAnimationFrame(() => {
      ref.current?.measureInWindow((x, y, width, height) => {
        if (!width || !height) return;
        const ix = inset?.x ?? 0;
        const iy = inset?.y ?? 0;
        setRect(tourId, {
          x: x + ix,
          y: y + iy,
          width: Math.max(1, width - ix * 2),
          height: Math.max(1, height - iy * 2),
        });
      });
    });
  }, [tourId, setRect, inset?.x, inset?.y]);

  // 스크롤 뒤에는 onLayout 이 안 뜬다. 투어가 신호를 주면 다시 잰다
  useEffect(() => {
    if (measureNonce > 0) measure();
  }, [measureNonce, measure]);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      rest.onLayout?.(e);
      measure();
    },
    [measure, rest.onLayout],
  );

  return (
    <View ref={ref} collapsable={false} {...rest} onLayout={onLayout}>
      {children}
    </View>
  );
}
