import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import BoriMascot from "@/components/home/BoriMascot";
import CourseSpeechBubble from "./CourseSpeechBubble";

interface Props {
  message: string;
}

export default function CourseHeader({ message }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const scale = useSharedValue(0.7);
  const bob = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 160 });
    // 살짝 위아래로 둥둥
    bob.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(3, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [scale, bob]);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: bob.value }],
  }));

  return (
    <View style={styles.row}>
      <Animated.View style={[styles.mascotWrap, mascotStyle]}>
        <BoriMascot size={110} />
      </Animated.View>
      <CourseSpeechBubble message={message} />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      gap: 14,
    },
    mascotWrap: {
      width: 110,
      height: 110,
      alignItems: "center",
      justifyContent: "center",
    },
  });
