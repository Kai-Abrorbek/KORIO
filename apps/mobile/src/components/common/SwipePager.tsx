import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import * as Haptics from "expo-haptics";
import {
  Gesture,
  GestureDetector,
  type NativeGesture,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

/** 화면 너비의 이만큼 넘게 밀면 다음 탭으로 넘어간다 */
const SWITCH_RATIO = 0.22;
/** 빠르게 튕기면 짧게 밀어도 넘어간다 (px/s) */
const SWITCH_VELOCITY = 500;
/** 첫·마지막 탭에서 바깥으로 밀면 이만큼만 따라온다 (고무줄) */
const EDGE_RESISTANCE = 0.3;
const SETTLE = { duration: 320, easing: Easing.bezier(0.22, 1, 0.36, 1) };

type RegisterBlocker = (gesture: NativeGesture) => () => void;
const BlockerContext = createContext<RegisterBlocker | null>(null);

/**
 * 페이저 안의 가로 ScrollView(칩 줄 등)에 쓴다 — 그 위에서 시작한 가로 밀기는 탭을 넘기지 않고
 * 그 ScrollView 가 가져간다. 돌려받은 제스처로 ScrollView 를 GestureDetector 에 감싸면 된다.
 * 페이저 밖이면 null.
 */
export function useSwipePagerBlocker() {
  const register = useContext(BlockerContext);
  const gesture = useMemo(() => Gesture.Native(), []);
  useEffect(() => register?.(gesture), [register, gesture]);
  return register ? gesture : null;
}

interface Props {
  index: number;
  onIndexChange: (index: number) => void;
  /** 리렌더 때마다 새로 만들지 말고 useMemo 로 고정해서 넘겨라 (미는 동안 화면이 다시 그려지지 않게) */
  pages: ReactNode[];
  /** 손가락을 따라 바뀌는 현재 위치 (0 ~ pages.length - 1, 소수). 상단 탭 밑줄·글자색이 따라온다 */
  progress: SharedValue<number>;
  /** 탭 하나(세로 ScrollView)의 contentContainerStyle */
  contentContainerStyle?: StyleProp<ViewStyle>;
}

/**
 * 탭 화면을 옆으로 밀어서 넘기는 페이저 (텔레그램 미니앱 shared/ui/swipe-pager 와 같은 동작).
 *
 * - 손가락을 따라 움직이고, 놓으면 넘어가거나 제자리로 부드럽게 돌아온다. 빠른 튕김도 넘어간다.
 * - 가로로 12px 먼저 움직여야 잡고, 세로로 먼저 움직이면 평소 스크롤 (activeOffsetX / failOffsetY).
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
  const count = pages.length;
  const translate = useSharedValue(-index * width);
  const widthSV = useSharedValue(width);
  const indexSV = useSharedValue(index);
  const start = useSharedValue(0);
  const [warm, setWarm] = useState(false);
  const [blockers, setBlockers] = useState<NativeGesture[]>([]);
  /** 스와이프로 바꾼 탭 — 이미 그 자리로 가고 있으니 effect 에서 다시 애니를 걸지 않는다 */
  const swipedToRef = useRef<number | null>(null);
  const changeRef = useRef(onIndexChange);
  useEffect(() => {
    changeRef.current = onIndexChange;
  }, [onIndexChange]);

  const register = useCallback<RegisterBlocker>((gesture) => {
    setBlockers((list) => [...list, gesture]);
    return () => setBlockers((list) => list.filter((item) => item !== gesture));
  }, []);

  // 옆 탭은 첫 화면이 다 그려진 뒤에 미리 붙여 둔다
  useEffect(() => {
    const timer = setTimeout(() => setWarm(true), 700);
    return () => clearTimeout(timer);
  }, []);

  // 화면 폭이 바뀌면(회전 등) 애니 없이 제자리
  useEffect(() => {
    widthSV.value = width;
    translate.value = -indexSV.value * width;
  }, [indexSV, translate, width, widthSV]);

  // 탭 버튼으로 바꾸면 그 자리로 미끄러진다
  useEffect(() => {
    indexSV.value = index;
    if (swipedToRef.current === index) {
      swipedToRef.current = null;
      return;
    }
    translate.value = withTiming(-index * widthSV.value, SETTLE);
  }, [index, indexSV, translate, widthSV]);

  useAnimatedReaction(
    () => translate.value,
    (value) => {
      const next = -value / widthSV.value;
      // 고무줄로 바깥까지 끌려도 탭 밑줄은 끝 탭에서 멈춘다
      progress.value = Math.max(0, Math.min(count - 1, next));
    },
    [count],
  );

  const commit = useCallback((target: number) => {
    swipedToRef.current = target;
    void Haptics.selectionAsync();
    changeRef.current(target);
  }, []);

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-12, 12])
        .failOffsetY([-14, 14])
        .requireExternalGestureToFail(...blockers)
        .onStart(() => {
          // 넘어가는 애니 도중에 다시 잡으면 지금 보이는 자리에서 이어 끈다
          cancelAnimation(translate);
          start.value = translate.value;
          runOnJS(setWarm)(true);
        })
        .onUpdate((event) => {
          const min = -(count - 1) * widthSV.value;
          let next = start.value + event.translationX;
          if (next > 0) next *= EDGE_RESISTANCE;
          else if (next < min) next = min + (next - min) * EDGE_RESISTANCE;
          translate.value = next;
        })
        .onEnd((event) => {
          const from = indexSV.value;
          const w = widthSV.value;
          const offset = translate.value + from * w;
          let target = from;
          if (offset < -w * SWITCH_RATIO || (event.velocityX < -SWITCH_VELOCITY && offset < -20)) {
            target = from + 1;
          } else if (offset > w * SWITCH_RATIO || (event.velocityX > SWITCH_VELOCITY && offset > 20)) {
            target = from - 1;
          }
          target = Math.max(0, Math.min(count - 1, target));
          translate.value = withTiming(-target * w, SETTLE);
          if (target !== from) {
            indexSV.value = target;
            runOnJS(commit)(target);
          }
        }),
    [blockers, commit, count, indexSV, start, translate, widthSV],
  );

  const trackStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value }],
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.width);
    if (next > 0 && next !== width) setWidth(next);
  };

  return (
    <BlockerContext.Provider value={register}>
      <GestureDetector gesture={pan}>
        <View style={styles.pager} onLayout={onLayout}>
          <Animated.View
            style={[styles.track, { width: width * count }, trackStyle]}
          >
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
    </BlockerContext.Provider>
  );
}

const styles = StyleSheet.create({
  pager: { flex: 1, overflow: "hidden" },
  track: { flex: 1, flexDirection: "row" },
  pane: { flex: 1 },
});
