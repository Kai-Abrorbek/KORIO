import { Pressable, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { ThemeColors } from "@/constants/theme";
import { useEffect, type ReactNode } from "react";

export type PairStatus = "idle" | "selected" | "wrong" | "correct" | "ghost";

const BLUE_BG = "#E3F4FF";
const BLUE_BORDER = "#1CB0F6";
const RED_BG = "#FFE5EC";
const RED_BORDER = "#FF4B4B";
const GREEN_BG = "#D7F5C0";
const GREEN_BORDER = "#58CC02";
const GREEN_TEXT = "#58A700";

interface Props {
  text?: string;
  status: PairStatus;
  onPress: () => void;
  theme: ThemeColors;
  children?: ReactNode;
}

export default function MatchPairCard({
  text,
  status,
  onPress,
  theme,
  children,
}: Props) {
  const ty = useSharedValue(0); // 팝 바운스
  const shake = useSharedValue(0); // 오답 흔들림
  const shineX = useSharedValue(-200); // 흰색 샤인 스윕
  const shineO = useSharedValue(0);
  const spark = useSharedValue(0); // 반짝이

  useEffect(() => {
    if (status === "correct") {
      // 위로 통 튀고 돌아오기
      ty.value = withSequence(
        withTiming(-12, { duration: 150, easing: Easing.out(Easing.quad) }),
        withSpring(0, { damping: 6, stiffness: 180 }),
      );
      // 샤인 스윕 (왼→오 대각선)
      shineX.value = -200;
      shineO.value = 0;
      shineX.value = withDelay(
        60,
        withTiming(220, { duration: 520, easing: Easing.inOut(Easing.ease) }),
      );
      shineO.value = withDelay(
        60,
        withSequence(
          withTiming(1, { duration: 90 }),
          withDelay(330, withTiming(0, { duration: 120 })),
        ),
      );
      // 반짝이
      spark.value = withSequence(
        withTiming(1, { duration: 200 }),
        withDelay(300, withTiming(0, { duration: 250 })),
      );
    } else if (status === "wrong") {
      shake.value = withSequence(
        withTiming(-6, { duration: 55 }),
        withTiming(6, { duration: 55 }),
        withTiming(-4, { duration: 55 }),
        withTiming(0, { duration: 55 }),
      );
    }
  }, [status]);

  const wrapStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ty.value }, { translateX: shake.value }],
  }));
  const shineStyle = useAnimatedStyle(() => ({
    opacity: shineO.value,
    transform: [{ translateX: shineX.value }, { rotate: "18deg" }],
  }));
  const sparkStyle = useAnimatedStyle(() => ({
    opacity: spark.value,
    transform: [{ scale: 0.6 + spark.value * 0.6 }],
  }));

  const isGhost = status === "ghost";
  const palette =
    status === "correct"
      ? { bg: GREEN_BG, border: GREEN_BORDER, color: GREEN_TEXT }
      : status === "wrong"
        ? { bg: RED_BG, border: RED_BORDER, color: RED_BORDER }
        : status === "selected"
          ? { bg: BLUE_BG, border: BLUE_BORDER, color: BLUE_BORDER }
          : isGhost
            ? { bg: theme.bg, border: theme.border, color: theme.textSecondary }
            : { bg: theme.surface, border: theme.border, color: theme.text };

  return (
    <Animated.View style={wrapStyle}>
      <Pressable
        onPress={onPress}
        disabled={status === "correct" || isGhost}
        style={[
          styles.card,
          {
            backgroundColor: palette.bg,
            borderColor: palette.border,
            opacity: isGhost ? 0.45 : 1,
          },
        ]}
      >
        {children ?? (
          <Text
            style={[styles.text, { color: palette.color }]}
            numberOfLines={1}
          >
            {text}
          </Text>
        )}

        {status === "correct" && (
          <>
            <Animated.View
              pointerEvents="none"
              style={[styles.shine, shineStyle]}
            />
            <Animated.Text
              pointerEvents="none"
              style={[styles.sparkTL, sparkStyle]}
            >
              ✦
            </Animated.Text>
            <Animated.Text
              pointerEvents="none"
              style={[styles.sparkBR, sparkStyle]}
            >
              ✦
            </Animated.Text>
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 2,
    borderBottomWidth: 4,
    paddingVertical: 22,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    height: 90,
  },
  text: { fontSize: 18, fontWeight: "800" },
  shine: {
    position: "absolute",
    top: -24,
    bottom: -24,
    width: 34,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  sparkTL: {
    position: "absolute",
    top: 6,
    left: 10,
    fontSize: 15,
    color: "#fff",
    textShadowColor: "rgba(88,167,0,0.5)",
    textShadowRadius: 3,
  },
  sparkBR: {
    position: "absolute",
    bottom: 6,
    right: 10,
    fontSize: 15,
    color: "#fff",
    textShadowColor: "rgba(88,167,0,0.5)",
    textShadowRadius: 3,
  },
});
