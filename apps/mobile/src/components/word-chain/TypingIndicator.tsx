import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  SlideInLeft,
} from "react-native-reanimated";
import OwlMascot from "@/components/lesson/OwlMascot";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

function Dot({ delay }: { delay: number }) {
  const y = useSharedValue(0);
  useEffect(() => {
    y.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-6, { duration: 350 }),
          withTiming(0, { duration: 350 }),
        ),
        -1,
        false,
      ),
    );
  }, [delay]);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
  }));
  return <Animated.View style={[dotStyles.dot, style]} />;
}

const dotStyles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#999",
  },
});

export default function TypingIndicator() {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Animated.View entering={SlideInLeft.springify()} style={styles.row}>
      <View style={styles.avatar}>
        <OwlMascot state="hint" size={36} />
      </View>
      <View style={styles.bubble}>
        <Dot delay={0} />
        <Dot delay={150} />
        <Dot delay={300} />
      </View>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      marginVertical: 6,
      paddingHorizontal: 12,
      alignItems: "flex-end",
    },
    avatar: { marginRight: 6 },
    bubble: {
      flexDirection: "row",
      gap: 6,
      paddingHorizontal: 18,
      paddingVertical: 14,
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderBottomLeftRadius: 4,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
  });
