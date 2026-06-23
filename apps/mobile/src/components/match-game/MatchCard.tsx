import { Pressable, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  FadeIn,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ThemeColors } from "@/constants/theme";

export type CardStatus = "idle" | "selected" | "matched" | "wrong";

interface Props {
  text: string;
  status: CardStatus;
  onPress: () => void;
  theme: ThemeColors;
}

const GREEN_BG = "#E3F8EC";
const GREEN_BORDER = "#1CB454";
const RED_BG = "#FFE5EC";
const RED_BORDER = "#FF4B4B";

export default function MatchCard({ text, status, onPress, theme }: Props) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const tx = useSharedValue(0);

  useEffect(() => {
    if (status === "matched") {
      // 잠깐 초록 보여주고 천천히 사라짐
      opacity.value = withDelay(180, withTiming(0, { duration: 300 }));
      scale.value = withDelay(180, withTiming(0.92, { duration: 300 }));
    } else if (status === "wrong") {
      tx.value = withSequence(
        withTiming(-6, { duration: 55 }),
        withTiming(6, { duration: 55 }),
        withTiming(-4, { duration: 55 }),
        withTiming(0, { duration: 55 }),
      );
    }
  }, [status]);

  const aStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { translateX: tx.value }],
  }));

  const palette =
    status === "matched"
      ? { bg: GREEN_BG, border: GREEN_BORDER, color: GREEN_BORDER }
      : status === "wrong"
        ? { bg: RED_BG, border: RED_BORDER, color: RED_BORDER }
        : status === "selected"
          ? {
              bg: theme.primary + "14",
              border: theme.primary,
              color: theme.primary,
            }
          : { bg: theme.surface, border: theme.border, color: theme.text };

  return (
    <Animated.View
      entering={FadeIn.duration(280)}
      style={[styles.wrap, aStyle]}
    >
      <Pressable
        onPress={onPress}
        disabled={status === "matched"}
        style={[
          styles.card,
          { backgroundColor: palette.bg, borderColor: palette.border },
        ]}
      >
        <Text style={[styles.text, { color: palette.color }]} numberOfLines={1}>
          {text}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  card: {
    borderRadius: 16,
    borderWidth: 2,
    borderBottomWidth: 4, // 듀오링고 느낌의 입체 테두리
    paddingVertical: 22,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 18, fontWeight: "700" },
});
