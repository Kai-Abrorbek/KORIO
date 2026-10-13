import { useEffect, useState, type ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, type SharedValue } from "react-native-reanimated";
import { SwipeBlockerContext, useSwipeTabs } from "./useSwipeTabs";

export { useSwipePagerBlocker } from "./useSwipeTabs";

interface Props {
  index: number;
  onIndexChange: (index: number) => void;
  /** 리렌더 때마다 새로 만들지 말고 useMemo 로 고정해서 넘겨라 (미는 동안 화면이 다시 그려지지 않게) */
  pages: ReactNode[];
  /**
   * 현재 위치 (0 ~ pages.length - 1, 소수) — 부모가 useSharedValue(처음 index) 로 만들어 넘긴다.
   * 상단 탭 밑줄·글자색이 이걸 따라온다 (끝 탭 고무줄 때는 살짝 밖으로 나가니 쓰는 쪽에서 clamp).
   */
  progress: SharedValue<number>;
  /** 탭 하나(세로 ScrollView)의 contentContainerStyle */
  contentContainerStyle?: StyleProp<ViewStyle>;
}

/**
 * 탭 화면을 통째로 옆으로 밀어서 넘기는 페이저 (통계처럼 탭마다 화면이 전부 다를 때).
 * 화면 일부만 넘길 땐 useSwipeTabs + SwipeSlides. 텔레그램 미니앱 shared/ui/swipe-pager 와 같다.
 *
 * - 탭마다 세로 ScrollView 가 따로라 스크롤 위치가 유지된다. 옆 탭은 잠깐 뒤에 미리 그려 둔다.
 */
export default function SwipePager({
  contentContainerStyle,
  index,
  onIndexChange,
  pages,
  progress,
}: Props) {
  const screen = useWindowDimensions();
  const [width, setWidth] = useState(screen.width);
  const [warm, setWarm] = useState(false);
  const count = pages.length;

  // 옆 탭은 첫 화면이 다 그려진 뒤에 미리 붙여 둔다
  useEffect(() => {
    const timer = setTimeout(() => setWarm(true), 700);
    return () => clearTimeout(timer);
  }, []);

  const { gesture, registerBlocker } = useSwipeTabs({
    count,
    index,
    onDragStart: () => setWarm(true),
    onIndexChange,
    progress,
  });

  const trackStyle = useAnimatedStyle(
    () => ({ transform: [{ translateX: -progress.value * width }] }),
    [width],
  );

  const onLayout = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.width);
    if (next > 0 && next !== width) setWidth(next);
  };

  return (
    <SwipeBlockerContext.Provider value={registerBlocker}>
      <GestureDetector gesture={gesture}>
        <View style={styles.pager} onLayout={onLayout}>
          <Animated.View style={[styles.track, { width: width * count }, trackStyle]}>
            {pages.map((page, i) => (
              <View
                accessibilityElementsHidden={i !== index}
                importantForAccessibility={i === index ? "auto" : "no-hide-descendants"}
                key={i}
                style={{ width }}
              >
                <ScrollView
                  contentContainerStyle={contentContainerStyle}
                  showsVerticalScrollIndicator={false}
                  style={styles.pane}
                >
                  {warm || i === index ? page : null}
                </ScrollView>
              </View>
            ))}
          </Animated.View>
        </View>
      </GestureDetector>
    </SwipeBlockerContext.Provider>
  );
}

const styles = StyleSheet.create({
  pager: { flex: 1, overflow: "hidden" },
  track: { flex: 1, flexDirection: "row" },
  pane: { flex: 1 },
});
