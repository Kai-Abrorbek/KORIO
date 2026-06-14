import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import BoriMascot from "@/components/BoriMascot";
import { CelebrationStyle } from "@/types/lesson-complete";

interface Props {
  style?: CelebrationStyle; // 안 주면 랜덤
  size?: number;
}

function pickRandomStyle(): CelebrationStyle {
  const styles: CelebrationStyle[] = ["jump", "spin", "wiggle", "bounce"];
  return styles[Math.floor(Math.random() * styles.length)];
}

export default function CelebrationMascot({
  style: forcedStyle,
  size = 180,
}: Props) {
  const [style] = useState<CelebrationStyle>(
    () => forcedStyle ?? pickRandomStyle(),
  );

  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scaleX = useSharedValue(1);
  const scaleY = useSharedValue(1);

  useEffect(() => {
    switch (style) {
      case "jump":
        // 통통 점프 + squash & stretch
        translateY.value = withRepeat(
          withSequence(
            withTiming(-55, {
              duration: 380,
              easing: Easing.out(Easing.cubic),
            }),
            withTiming(0, {
              duration: 260,
              easing: Easing.bounce,
            }),
            withTiming(0, { duration: 250 }),
          ),
          -1,
          false,
        );
        scaleY.value = withRepeat(
          withSequence(
            withTiming(1.12, { duration: 200 }), // 점프할 때 위로 늘어남
            withTiming(0.85, { duration: 200 }), // 착지할 때 납작
            withTiming(1, { duration: 200 }),
            withTiming(1, { duration: 290 }),
          ),
          -1,
          false,
        );
        scaleX.value = withRepeat(
          withSequence(
            withTiming(0.92, { duration: 200 }),
            withTiming(1.15, { duration: 200 }),
            withTiming(1, { duration: 200 }),
            withTiming(1, { duration: 290 }),
          ),
          -1,
          false,
        );
        break;

      case "spin":
        // 빙글빙글 + 살짝 떠있는 느낌
        rotate.value = withRepeat(
          withSequence(
            withTiming(360, {
              duration: 800,
              easing: Easing.out(Easing.cubic),
            }),
            withTiming(360, { duration: 1200 }),
          ),
          -1,
          false,
        );
        translateY.value = withRepeat(
          withSequence(
            withTiming(-18, {
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(0, {
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
            }),
          ),
          -1,
          true,
        );
        break;

      case "wiggle":
        // 깐족깐족 댄스
        rotate.value = withRepeat(
          withSequence(
            withTiming(-12, { duration: 280 }),
            withTiming(12, { duration: 280 }),
          ),
          -1,
          true,
        );
        translateY.value = withRepeat(
          withSequence(
            withTiming(-12, { duration: 560 }),
            withTiming(0, { duration: 560 }),
          ),
          -1,
          true,
        );
        break;

      case "bounce":
        // 신난 바운스 + 스케일 펄스
        translateY.value = withRepeat(
          withSpring(-35, { damping: 5, stiffness: 220 }),
          -1,
          true,
        );
        scaleX.value = withRepeat(
          withSpring(1.06, { damping: 6, stiffness: 250 }),
          -1,
          true,
        );
        scaleY.value = withRepeat(
          withSpring(0.94, { damping: 6, stiffness: 250 }),
          -1,
          true,
        );
        break;
    }
  }, [style, translateY, rotate, scaleX, scaleY]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
      { scaleX: scaleX.value },
      { scaleY: scaleY.value },
    ],
  }));

  return (
    <Animated.View
      style={[styles.wrap, animStyle, { width: size, height: size }]}
    >
      <BoriMascot size={size} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});
