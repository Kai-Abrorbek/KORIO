import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  message: string;
}

export default function CourseSpeechBubble({ message }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const scale = useSharedValue(0.85);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      150,
      withSpring(1, { damping: 12, stiffness: 180 }),
    );
    opacity.value = withDelay(150, withTiming(1, { duration: 350 }));
  }, [scale, opacity]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.wrap, animStyle]}>
      {/* 꼬리 - 외곽 (border) */}
      <View style={styles.tailOuter} />
      {/* 꼬리 - 내부 (fill) */}
      <View style={styles.tailInner} />

      <View style={styles.bubble}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      flex: 1,
      position: "relative",
    },
    bubble: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: theme.border,
      paddingVertical: 18,
      paddingHorizontal: 18,
    },
    text: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.text,
      lineHeight: 22,
    },
    tailOuter: {
      position: "absolute",
      left: -12,
      top: 26,
      width: 0,
      height: 0,
      borderTopWidth: 9,
      borderBottomWidth: 9,
      borderRightWidth: 12,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: theme.border,
      zIndex: 1,
    },
    tailInner: {
      position: "absolute",
      left: -9,
      top: 28,
      width: 0,
      height: 0,
      borderTopWidth: 7,
      borderBottomWidth: 7,
      borderRightWidth: 10,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: theme.surface,
      zIndex: 2,
    },
  });
