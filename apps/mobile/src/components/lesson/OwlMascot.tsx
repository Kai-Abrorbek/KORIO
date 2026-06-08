import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
  withRepeat,
  cancelAnimation,
} from "react-native-reanimated";

export type OwlState =
  | "idle"
  | "correct"
  | "combo"
  | "wrong"
  | "angry"
  | "complete"
  | "hint";

const OWL_EMOJI: Record<OwlState, string> = {
  idle: "🦉",
  correct: "🥳",
  combo: "😎",
  wrong: "😢",
  angry: "😡",
  complete: "🎉",
  hint: "🤔",
};

interface Props {
  state?: OwlState;
  size?: number;
}

export default function OwlMascot({ state = "idle", size = 120 }: Props) {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(scale);
    cancelAnimation(rotate);
    cancelAnimation(translateY);

    if (state === "idle") {
      // 위아래 둥둥
      translateY.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 900 }),
          withTiming(0, { duration: 900 }),
        ),
        -1,
        true,
      );
    }

    if (state === "correct" || state === "complete") {
      // 통통 튀기기
      scale.value = withSequence(
        withSpring(1.3, { damping: 4, stiffness: 300 }),
        withSpring(0.9, { damping: 5 }),
        withSpring(1.15, { damping: 5 }),
        withSpring(1, { damping: 8 }),
      );
      translateY.value = withSequence(
        withTiming(-20, { duration: 200 }),
        withSpring(0, { damping: 5, stiffness: 200 }),
      );
    }

    if (state === "combo") {
      // 빠르게 2번 점프
      scale.value = withSequence(
        withSpring(1.4, { damping: 3, stiffness: 400 }),
        withSpring(1, { damping: 6 }),
        withSpring(1.3, { damping: 3, stiffness: 400 }),
        withSpring(1, { damping: 8 }),
      );
    }

    if (state === "wrong") {
      // 좌우 흔들기
      rotate.value = withSequence(
        withTiming(-15, { duration: 80 }),
        withTiming(15, { duration: 80 }),
        withTiming(-12, { duration: 80 }),
        withTiming(12, { duration: 80 }),
        withTiming(-8, { duration: 80 }),
        withTiming(0, { duration: 80 }),
      );
      scale.value = withSequence(
        withTiming(0.85, { duration: 100 }),
        withSpring(1, { damping: 6 }),
      );
    }

    if (state === "angry") {
      // 부들부들
      rotate.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 60 }),
          withTiming(8, { duration: 60 }),
        ),
        6,
        true,
      );
    }

    if (state === "hint") {
      // 살짝 기울기
      rotate.value = withSequence(
        withTiming(15, { duration: 300 }),
        withTiming(15, { duration: 800 }),
        withTiming(0, { duration: 300 }),
      );
    }

    return () => {
      cancelAnimation(scale);
      cancelAnimation(rotate);
      cancelAnimation(translateY);
    };
  }, [state]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[styles.wrapper, { width: size, height: size }, animStyle]}
    >
      <Text style={{ fontSize: size * 0.75 }}>{OWL_EMOJI[state]}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
