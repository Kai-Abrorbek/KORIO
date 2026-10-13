import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useWindowDimensions } from "react-native";
import { Gesture, type NativeGesture } from "react-native-gesture-handler";
import {
  Easing,
  cancelAnimation,
  runOnJS,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import * as Haptics from "@/utils/haptics";

/** 화면 너비의 이만큼 넘게 밀면 다음 탭으로 넘어간다 */
const SWITCH_RATIO = 0.22;
/** 빠르게 튕기면 짧게 밀어도 넘어간다 (px/s) */
const SWITCH_VELOCITY = 500;
/** 첫·마지막 탭에서 바깥으로 밀면 이만큼만 따라온다 (고무줄) */
const EDGE_RESISTANCE = 0.3;
export const SWIPE_SETTLE = { duration: 320, easing: Easing.bezier(0.22, 1, 0.36, 1) };

type RegisterBlocker = (gesture: NativeGesture) => () => void;
export const SwipeBlockerContext = createContext<RegisterBlocker | null>(null);

/**
 * 스와이프 영역 안의 가로 ScrollView(칩 줄 등)에 쓴다 — 그 위에서 시작한 가로 밀기는 탭을 넘기지 않고
 * 그 ScrollView 가 가져간다. 돌려받은 제스처로 ScrollView 를 GestureDetector 에 감싸면 된다.
 * (안드로이드는 이걸 안 하면 바깥 제스처가 칩 스크롤을 가로챈다.) 스와이프 영역 밖이면 null.
 */
export function useSwipePagerBlocker() {
  const register = useContext(SwipeBlockerContext);
  const gesture = useMemo(() => Gesture.Native(), []);
  useEffect(() => register?.(gesture), [register, gesture]);
  return register ? gesture : null;
}

interface Options {
  index: number;
  count: number;
  onIndexChange: (index: number) => void;
  /**
   * 지금 보이는 자리 (0 ~ count - 1, 소수. 끝 탭에서 바깥으로 끌면 고무줄만큼 살짝 밖).
   * 부모가 useSharedValue(처음 index) 로 만들어 넘기고, 화면·탭 밑줄·선택 배경이 이걸 따라 움직인다.
   */
  progress: SharedValue<number>;
  /** 결제 중처럼 바꾸면 안 될 때 */
  disabled?: boolean;
  /** 끌기 시작할 때 (옆 탭을 미리 그리는 등) */
  onDragStart?: () => void;
}

/**
 * 옆으로 밀어서 탭을 넘기는 제스처 (텔레그램 미니앱 shared/ui/use-swipe-tabs 와 같은 동작).
 * 화면을 어떻게 움직일지는 progress 를 읽는 쪽이 정한다 — 화면 통째(SwipePager), 일부만(SwipeSlides),
 * 세그먼트 선택 배경(useSegmentThumb).
 *
 * - 가로로 12px 먼저 움직여야 잡고, 세로로 먼저 움직이면 평소 스크롤 (activeOffsetX / failOffsetY).
 * - 놓을 때 화면 폭의 22% 를 넘었거나 빠르게 튕겼으면 넘어가고, 아니면 제자리.
 * - 돌려받은 gesture 로 영역을 GestureDetector 에 감싸고, 안쪽을 SwipeBlockerContext 로 감싼다.
 */
export function useSwipeTabs({
  count,
  disabled = false,
  index,
  onDragStart,
  onIndexChange,
  progress,
}: Options) {
  const { width } = useWindowDimensions();
  const widthSV = useSharedValue(width);
  const indexSV = useSharedValue(index);
  const disabledSV = useSharedValue(disabled ? 1 : 0);
  const start = useSharedValue(0);
  const [blockers, setBlockers] = useState<NativeGesture[]>([]);
  /** 스와이프로 바꾼 탭 — 이미 그 자리로 가고 있으니 effect 에서 다시 애니를 걸지 않는다 */
  const swipedToRef = useRef<number | null>(null);
  const indexRef = useRef(index);
  const firstRef = useRef(true);
  const changeRef = useRef(onIndexChange);
  const dragStartRef = useRef(onDragStart);

  useEffect(() => {
    changeRef.current = onIndexChange;
    dragStartRef.current = onDragStart;
  }, [onDragStart, onIndexChange]);

  useEffect(() => {
    widthSV.value = width;
  }, [width, widthSV]);

  useEffect(() => {
    disabledSV.value = disabled ? 1 : 0;
  }, [disabled, disabledSV]);

  // 탭 버튼으로 바꾸면 그 자리로 미끄러진다. 처음엔 애니 없이
  useEffect(() => {
    indexRef.current = index;
    indexSV.value = index;
    if (firstRef.current) {
      firstRef.current = false;
      progress.value = index;
      return;
    }
    if (swipedToRef.current === index) {
      swipedToRef.current = null;
      return;
    }
    progress.value = withTiming(index, SWIPE_SETTLE);
  }, [index, indexSV, progress]);

  const register = useCallback<RegisterBlocker>((gesture) => {
    setBlockers((list) => [...list, gesture]);
    return () => setBlockers((list) => list.filter((item) => item !== gesture));
  }, []);

  const commit = useCallback(
    (from: number, target: number) => {
      swipedToRef.current = target;
      void Haptics.selectionAsync();
      changeRef.current(target);
      // 부모가 탭을 안 바꿨으면 제자리로
      setTimeout(() => {
        if (indexRef.current !== from || swipedToRef.current !== target) return;
        swipedToRef.current = null;
        indexSV.value = from;
        progress.value = withTiming(from, SWIPE_SETTLE);
      }, 120);
    },
    [indexSV, progress],
  );

  const dragStarted = useCallback(() => dragStartRef.current?.(), []);

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-12, 12])
        .failOffsetY([-14, 14])
        .requireExternalGestureToFail(...blockers)
        .onStart(() => {
          if (disabledSV.value) return;
          // 넘어가는 애니 도중에 다시 잡으면 지금 보이는 자리에서 이어 끈다
          cancelAnimation(progress);
          start.value = progress.value;
          runOnJS(dragStarted)();
        })
        .onUpdate((event) => {
          if (disabledSV.value) return;
          const last = count - 1;
          let next = start.value - event.translationX / widthSV.value;
          if (next < 0) next *= EDGE_RESISTANCE;
          else if (next > last) next = last + (next - last) * EDGE_RESISTANCE;
          progress.value = next;
        })
        .onEnd((event) => {
          const from = indexSV.value;
          if (disabledSV.value) {
            progress.value = withTiming(from, SWIPE_SETTLE);
            return;
          }
          const w = widthSV.value;
          // 지금 보이는 자리가 원래 탭에서 얼마나 밀려 있나 (오른쪽으로 끌었으면 +)
          const offset = (from - progress.value) * w;
          let target = from;
          if (offset < -w * SWITCH_RATIO || (event.velocityX < -SWITCH_VELOCITY && offset < -20)) {
            target = from + 1;
          } else if (offset > w * SWITCH_RATIO || (event.velocityX > SWITCH_VELOCITY && offset > 20)) {
            target = from - 1;
          }
          target = Math.max(0, Math.min(count - 1, target));
          progress.value = withTiming(target, SWIPE_SETTLE);
          if (target !== from) {
            indexSV.value = target;
            runOnJS(commit)(from, target);
          }
        }),
    [blockers, commit, count, disabledSV, dragStarted, indexSV, progress, start, widthSV],
  );

  return { gesture, registerBlocker: register };
}
