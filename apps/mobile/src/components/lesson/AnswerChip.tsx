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
      scale.value = withSpring(1, { damping: 10 });
      zIndex.value = 1;

      const movedFar =
        Math.abs(e.translationX) > 5 || Math.abs(e.translationY) > 5;
      if (!movedFar) {
        translateX.value = withSpring(0, { damping: 14 });
        translateY.value = withSpring(0, { damping: 14 });
        return;
      }

      // 1) placed → placed swap 검사 (다른 placed chip 위에 떨어졌나)
      if (isPlaced && onSwap && getPlacedChipLayouts) {
        const layouts = getPlacedChipLayouts();
        const myLayout = layouts.get(item.id);
        if (myLayout) {
          const dropX = myLayout.x + myLayout.width / 2 + e.translationX;
          const dropY = myLayout.y + myLayout.height / 2 + e.translationY;

          let targetId: string | null = null;
          for (const [id, layout] of layouts) {
            if (id === item.id) continue;
            if (
              dropX >= layout.x &&
              dropX <= layout.x + layout.width &&
              dropY >= layout.y &&
              dropY <= layout.y + layout.height
            ) {
              targetId = id;
              break;
            }
          }

          if (targetId) {
            runOnJS(onSwap)(item.id, targetId);
            translateX.value = withSpring(0, { damping: 14 });
            translateY.value = withSpring(0, { damping: 14 });
            return;
          }
        }
      }

      // 2) bank ↔ placed 전환 (기존 로직)
      translateX.value = withSpring(0, { damping: 14 });
      translateY.value = withSpring(0, { damping: 14 });
      if (isPlaced && e.translationY > 50) {
        runOnJS(onDragToZone)(item.id, "bank");
      } else if (!isPlaced && e.translationY < -50) {
        runOnJS(onDragToZone)(item.id, "placed");
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
        style={[chipStyles.chip, containerStyle]}
      >
        <Animated.Text style={[chipStyles.text, textStyle]}>
          {item.word}
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
}

export function GhostChip({
  word,
  theme,
}: {
  word: string;
  theme: ThemeColors;
}) {
  return (
    <View
      style={[
        chipStyles.chip,
        {
          backgroundColor: theme.border + "60",
          borderColor: "transparent",
          opacity: 0.5,
        },
      ]}
    >
      <Text style={[chipStyles.text, { color: "transparent" }]}>{word}</Text>
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
  text: { fontSize: 15, fontWeight: "700" },
});

export default AnswerChip;
