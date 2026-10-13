import { useState, type ReactNode } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";

interface Props {
  /** useSwipeTabs 의 progress (0 = 첫 장, 1 = 둘째 장) */
  progress: SharedValue<number>;
  /** 지금 탭 — 안 보이는 쪽은 눌리지 않는다 */
  index: number;
  /** 탭별 내용 2장. 칸 높이를 두 장 사이에서 미는 만큼 보간한다 */
  slides: [ReactNode, ReactNode];
  /** 부모의 좌우 padding 만큼 화면 끝까지 밀려 나가게 한다 — 안 주면 padding 안쪽에서 잘려 보인다 */
  bleed?: number;
}

/**
 * 화면의 **일부**만 탭에 따라 옆으로 넘기는 칸 (프리미엄 SUPER↔MAX, 학습 방식 로드↔자율).
 * 텔레그램 미니앱 shared/ui/swipe-slides 와 같다.
 *
 * 두 장의 높이가 달라서 칸 높이도 미는 만큼 바뀐다 — 아래 내용이 덜컥 튀지 않고 같이 미끄러진다.
 */
export default function SwipeSlides({ bleed = 0, index, progress, slides }: Props) {
  const screen = useWindowDimensions();
  const [width, setWidth] = useState(screen.width);
  const heights = useSharedValue([0, 0]);

  const boxStyle = useAnimatedStyle(() => {
    const [h0 = 0, h1 = 0] = heights.value;
    // 두 장 다 재기 전엔 그냥 둔다 (더 긴 쪽 높이)
    if (!h0 || !h1) return {};
    const p = Math.min(1, Math.max(0, progress.value));
    return { height: h0 + (h1 - h0) * p };
  });

  // 고무줄로 끝에서 살짝 밖까지 끌리게 clamp 안 한 값
  const trackStyle = useAnimatedStyle(
    () => ({ transform: [{ translateX: -progress.value * width }] }),
    [width],
  );

  return (
    <Animated.View
      onLayout={(event) => {
        const next = Math.round(event.nativeEvent.layout.width);
        if (next > 0 && next !== width) setWidth(next);
      }}
      style={[styles.box, { marginHorizontal: -bleed }, boxStyle]}
    >
      <Animated.View style={[styles.track, { width: width * 2 }, trackStyle]}>
        {slides.map((slide, i) => (
          <View
            accessibilityElementsHidden={i !== index}
            importantForAccessibility={i === index ? "auto" : "no-hide-descendants"}
            key={i}
            onLayout={(event) => {
              const next = [...heights.value];
              next[i] = event.nativeEvent.layout.height;
              heights.value = next;
            }}
            pointerEvents={i === index ? "auto" : "none"}
            style={{ width, paddingHorizontal: bleed }}
          >
            {slide}
          </View>
        ))}
      </Animated.View>
    </Animated.View>
  );
}

/**
 * 세그먼트의 선택 배경 — 칸 하나 크기로, 밀고 있는 만큼 옆 칸으로 미끄러진다.
 * 바(bar) 의 onLayout 에 onLayout 을, 바 안 맨 앞의 Animated.View 에 thumbStyle 을 준다.
 * (바의 border·padding·gap 을 그대로 넘겨야 칸에 딱 맞는다)
 */
export function useSegmentThumb(
  progress: SharedValue<number>,
  { border, count = 2, gap, inset }: { border: number; count?: number; gap: number; inset: number },
) {
  const barWidth = useSharedValue(0);
  const thumbStyle = useAnimatedStyle(() => {
    const inner = barWidth.value - border * 2 - inset * 2;
    const cell = Math.max(0, (inner - gap * (count - 1)) / count);
    const p = Math.min(count - 1, Math.max(0, progress.value));
    return {
      opacity: barWidth.value ? 1 : 0,
      transform: [{ translateX: p * (cell + gap) }],
      width: cell,
    };
  });
  const thumbBase = { position: "absolute" as const, top: inset, bottom: inset, left: inset };
  return {
    onLayout: (event: { nativeEvent: { layout: { width: number } } }) => {
      barWidth.value = event.nativeEvent.layout.width;
    },
    thumbStyle: [thumbBase, thumbStyle],
  };
}

/** 세그먼트 칸 i 가 얼마나 선택돼 있나(0~1)에 따라 글자색을 옮긴다 */
export function useSegmentTextColor(
  progress: SharedValue<number>,
  slot: number,
  off: string,
  on: string,
) {
  return useAnimatedStyle(
    () => {
      const amount = Math.max(0, 1 - Math.abs(progress.value - slot));
      return { color: interpolateColor(amount, [0, 1], [off, on]) };
    },
    [off, on, slot],
  );
}

/** 아이콘처럼 색을 애니로 못 바꾸는 건 두 벌을 겹쳐 두고 선택된 쪽을 비춘다 */
export function useSegmentOnOpacity(progress: SharedValue<number>, slot: number) {
  return useAnimatedStyle(
    () => ({ opacity: Math.max(0, 1 - Math.abs(progress.value - slot)) }),
    [slot],
  );
}

const styles = StyleSheet.create({
  box: { overflow: "hidden" },
  track: { flexDirection: "row", alignItems: "flex-start" },
});
