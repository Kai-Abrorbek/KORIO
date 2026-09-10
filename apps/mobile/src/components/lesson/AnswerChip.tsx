import { useEffect } from "react";
import { StyleSheet, LayoutChangeEvent, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
  interpolateColor,
  Easing,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ThemeColors } from "@/constants/theme";
import { AnswerState } from "@/types/lesson";

export interface ChipLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AnswerChipItem {
  id: string;
  word: string;
  zone: "bank" | "placed";
  placedIndex: number;
}

interface Props {
  item: AnswerChipItem;
  orderIndex?: number; // placed 영역에서의 순서 (stagger 효과용)
  onTap: (id: string) => void;
  onDragToZone: (id: string, toZone: "bank" | "placed") => void;
  onSwap?: (draggedId: string, targetId: string) => void;
  onLayoutMeasured?: (
    id: string,
    layout: ChipLayout,
    zone: "bank" | "placed",
  ) => void;
  getPlacedChipLayouts?: () => Map<string, ChipLayout>;
  theme: ThemeColors;
  answerState: AnswerState;
  /** 사진형 번역 문제에서 쓰는 조금 더 큰 칩 */
  large?: boolean;
}

const CORRECT_BG = "#D7F5E3";
const CORRECT_BORDER = "#58CC02";
const CORRECT_TEXT = "#1CB454";
const WRONG_BG = "#FFEBEB";
const WRONG_BORDER = "#FF4B4B";
const WRONG_TEXT = "#FF4B4B";

function AnswerChip({
  item,
  orderIndex = 0,
  onTap,
  onDragToZone,
  onSwap,
  onLayoutMeasured,
  getPlacedChipLayouts,
  theme,
  answerState,
  large = false,
}: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const zIndex = useSharedValue(1);
  const correctP = useSharedValue(0);
  const wrongP = useSharedValue(0);

  const isPlaced = item.zone === "placed";

  // 정답/오답 시 색상 전환 + 효과
  useEffect(() => {
    if (!isPlaced) {
      correctP.value = withTiming(0, { duration: 200 });
      wrongP.value = withTiming(0, { duration: 200 });
      return;
    }

    if (answerState === "correct") {
      const stagger = orderIndex * 80; // 왼쪽부터 차례로
      correctP.value = withDelay(
        stagger,
        withTiming(1, {
          duration: 320,
          easing: Easing.out(Easing.cubic),
        }),
      );
      // 살짝 통통 튀는 pop
      scale.value = withDelay(
        stagger,
        withSequence(
          withTiming(1.18, {
            duration: 180,
            easing: Easing.out(Easing.cubic),
          }),
          withSpring(1, { damping: 7, stiffness: 220 }),
        ),
      );
    } else if (answerState === "wrong") {
      const stagger = orderIndex * 40;
      wrongP.value = withDelay(stagger, withTiming(1, { duration: 250 }));
      // 좌우 흔들기
      translateX.value = withDelay(
        stagger,
        withSequence(
          withTiming(-10, { duration: 70 }),
          withTiming(10, { duration: 70 }),
          withTiming(-7, { duration: 70 }),
          withTiming(5, { duration: 70 }),
          withTiming(0, { duration: 70 }),
        ),
      );
    } else {
      correctP.value = withTiming(0, { duration: 200 });
      wrongP.value = withTiming(0, { duration: 200 });
    }
  }, [answerState, isPlaced, orderIndex]);

  // 드롭 판정은 전부 JS 스레드에서 한다.
  //
  // 예전엔 onEnd(워클릿, UI 스레드) 안에서 getPlacedChipLayouts() 를 그냥
  // 불렀다. 그건 워클릿이 아닌 평범한 JS 함수라, UI 스레드에서 동기 호출하는
  // 순간 앱이 죽는다. Map 은 애초에 워클릿으로 넘어가지도 않는다.
  // onTap·onDragToZone·onSwap 은 runOnJS 로 감쌌는데 이것만 빠져 있었다.
  //
  // isPlaced && onSwap && getPlacedChipLayouts 가 전부 참일 때만 타는
  // 경로라, **놓인 칩을 끌 때만** 죽었다. 뱅크에서 끄는 건 멀쩡했다.
  const handleDrop = (dx: number, dy: number) => {
    // 1) placed → placed 자리 바꾸기
    if (isPlaced && onSwap && getPlacedChipLayouts) {
      const layouts = getPlacedChipLayouts();
      const myLayout = layouts.get(item.id);
      if (myLayout) {
        const dropX = myLayout.x + myLayout.width / 2 + dx;
        const dropY = myLayout.y + myLayout.height / 2 + dy;
        for (const [id, layout] of layouts) {
          if (id === item.id) continue;
          if (
            dropX >= layout.x &&
            dropX <= layout.x + layout.width &&
            dropY >= layout.y &&
            dropY <= layout.y + layout.height
          ) {
            onSwap(item.id, id);
            return;
          }
        }
      }
    }

    // 2) bank ↔ placed 전환
    if (isPlaced && dy > 50) onDragToZone(item.id, "bank");
    else if (!isPlaced && dy < -50) onDragToZone(item.id, "placed");
  };

  const pan = Gesture.Pan()
    .enabled(answerState === "idle")
    .onStart(() => {
      scale.value = withSpring(1.12, { damping: 8 });
      zIndex.value = 999;
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      // 워클릿에서 하는 일은 셰어드값 되돌리기뿐. 판정은 JS 로 넘긴다
      scale.value = withSpring(1, { damping: 10 });
      zIndex.value = 1;
      translateX.value = withSpring(0, { damping: 14 });
      translateY.value = withSpring(0, { damping: 14 });

      if (Math.abs(e.translationX) > 5 || Math.abs(e.translationY) > 5) {
        runOnJS(handleDrop)(e.translationX, e.translationY);
      }
    });

  const tap = Gesture.Tap()
    .enabled(answerState === "idle")
    .onEnd(() => runOnJS(onTap)(item.id));

  const composed = Gesture.Simultaneous(tap, pan);

  const handleLayout = (e: LayoutChangeEvent) => {
    if (onLayoutMeasured) {
      const { x, y, width, height } = e.nativeEvent.layout;
      onLayoutMeasured(item.id, { x, y, width, height }, item.zone);
    }
  };

  const containerStyle = useAnimatedStyle(() => {
    const idleBg = theme.surface;
    const idleBorder = theme.border;

    let bg: string | number = idleBg;
    let border: string | number = idleBorder;

    if (correctP.value > 0) {
      bg = interpolateColor(correctP.value, [0, 1], [idleBg, CORRECT_BG]);
      border = interpolateColor(
        correctP.value,
        [0, 1],
        [idleBorder, CORRECT_BORDER],
      );
    } else if (wrongP.value > 0) {
      bg = interpolateColor(wrongP.value, [0, 1], [idleBg, WRONG_BG]);
      border = interpolateColor(
        wrongP.value,
        [0, 1],
        [idleBorder, WRONG_BORDER],
      );
    }

    return {
      backgroundColor: bg,
      borderColor: border,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      zIndex: zIndex.value,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const idleColor = theme.text;
    let color: string | number = idleColor;
    if (correctP.value > 0) {
      color = interpolateColor(
        correctP.value,
        [0, 1],
        [idleColor, CORRECT_TEXT],
      );
    } else if (wrongP.value > 0) {
      color = interpolateColor(wrongP.value, [0, 1], [idleColor, WRONG_TEXT]);
    }
    return { color };
  });

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={handleLayout}
        style={[chipStyles.chip, large && chipStyles.chipLarge, containerStyle]}
      >
        <Animated.Text
          style={[chipStyles.text, large && chipStyles.textLarge, textStyle]}
        >
          {item.word}
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
}

export function GhostChip({
  word,
  theme,
  large = false,
}: {
  word: string;
  theme: ThemeColors;
  large?: boolean;
}) {
  return (
    <View
      style={[
        chipStyles.chip,
        large && chipStyles.chipLarge,
        {
          backgroundColor: theme.border + "60",
          borderColor: "transparent",
          opacity: 0.5,
        },
      ]}
    >
      <Text
        style={[
          chipStyles.text,
          large && chipStyles.textLarge,
          { color: "transparent" },
        ]}
      >
        {word}
      </Text>
    </View>
  );
}

export const chipStyles = StyleSheet.create({
  chip: {
    borderWidth: 1.5,
    borderBottomWidth: 3,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipLarge: {
    borderRadius: 15,
    paddingHorizontal: 17,
    paddingVertical: 12,
  },
  text: { fontSize: 15, fontWeight: "700" },
  textLarge: { fontSize: 17, fontWeight: "700" },
});

export default AnswerChip;
