import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { darken } from "@/utils/color";

const SIZE = 54;
const DEPTH = 6;

interface Props {
  /** 지금 할 곳이 위면 "up", 아래면 "down", 지난 섹션을 보는 중이면 "back"(되돌아가기) */
  direction: "up" | "down" | "back";
  color: string;
  /** 안전 영역 위로 띄울 높이 */
  bottom?: number;
  onPress: () => void;
}

/**
 * 지금 할 곳으로 되돌아가는 버튼 — 로드맵·학습 로드 공용.
 * 로드맵은 위아래로 길어서 둘러보다 보면 오늘 위치를 잃는다.
 *
 * 노드와 같은 입체 원판(유닛 색 윗면 + 진한 두께 + 광택 + 흰 테두리)으로,
 * 화살표가 가야 할 쪽으로 가끔 살짝 움직여 눈에 띈다. 누르면 두께만큼 내려앉는다.
 */
export default function JumpToCurrentButton({
  direction,
  color,
  bottom = 72,
  onPress,
}: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(theme);
  const nudge = useSharedValue(0);

  useEffect(() => {
    if (direction === "back") {
      nudge.value = 0;
      return;
    }
    const sign = direction === "up" ? -1 : 1;
    nudge.value = withRepeat(
      withDelay(
        1100,
        withSequence(
          withTiming(sign * 3, {
            duration: 260,
            easing: Easing.out(Easing.quad),
          }),
          withTiming(-sign * 1, {
            duration: 200,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(0, { duration: 180, easing: Easing.out(Easing.quad) }),
        ),
      ),
      -1,
      false,
    );
  }, [direction, nudge]);

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: nudge.value }],
  }));

  return (
    <Pressable
      style={[styles.wrap, { bottom: insets.bottom + bottom }]}
      onPress={onPress}
      hitSlop={6}
    >
      {({ pressed }) => (
        <>
          <View style={[styles.glow, { backgroundColor: color }]} />
          <View
            style={[styles.depth, { backgroundColor: darken(color, 45) }]}
          />
          <View
            style={[
              styles.face,
              { backgroundColor: color },
              pressed && styles.facePressed,
            ]}
          >
            {/* 윗면 광택 */}
            <View style={styles.gloss} pointerEvents="none" />
            <Animated.View style={arrowStyle}>
              <Ionicons
                name={
                  direction === "back"
                    ? "arrow-undo"
                    : direction === "up"
                      ? "arrow-up"
                      : "arrow-down"
                }
                size={26}
                color="#FFFFFF"
              />
            </Animated.View>
          </View>
        </>
      )}
    </Pressable>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      position: "absolute",
      right: 16,
      width: SIZE + 8,
      height: SIZE + DEPTH + 6,
      alignItems: "center",
    },
    glow: {
      position: "absolute",
      top: -4,
      width: SIZE + 12,
      height: SIZE + 12,
      borderRadius: 999,
      opacity: 0.2,
    },
    depth: {
      position: "absolute",
      top: DEPTH,
      width: SIZE,
      height: SIZE,
      borderRadius: 999,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 12,
      elevation: 8,
    },
    face: {
      position: "absolute",
      top: 0,
      width: SIZE,
      height: SIZE,
      borderRadius: 999,
      borderWidth: 3,
      borderColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      elevation: 9,
    },
    facePressed: { transform: [{ translateY: DEPTH - 1 }] },
    gloss: {
      position: "absolute",
      top: 3,
      left: 13,
      right: 13,
      height: 9,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.32)",
    },
  });
