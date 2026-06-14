import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

interface AnimatedProgressBarProps {
  current: number;
  total: number;
}

export default function AnimatedProgressBar({
  current,
  total,
}: AnimatedProgressBarProps) {
  const theme = useTheme();
  const progress = useSharedValue(0);
  const starScale = useSharedValue(1);

  useEffect(() => {
    progress.value = withSpring((current / total) * 100, {
      damping: 15,
      stiffness: 100,
    });
    // 스텝 바뀔때 별 튀기는 애니메이션
    starScale.value = withSequence(
      withTiming(1.4, { duration: 150 }),
      withSpring(1, { damping: 8, stiffness: 200 }),
    );
  }, [current]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  const starStyle = useAnimatedStyle(() => ({
    transform: [{ scale: starScale.value }],
    left: `${(current / total) * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            { backgroundColor: theme.primary },
            progressStyle,
          ]}
        />
        <Animated.View
          style={[
            styles.star,
            { backgroundColor: theme.primary, shadowColor: theme.primary },
            starStyle,
          ]}
        >
          <Ionicons name="star" size={16} color="#fff" />
        </Animated.View>
      </View>
      <Text style={[styles.text, { color: theme.text }]}>
        {current}/{total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  track: {
    flex: 1,
    height: 28,
    backgroundColor: "rgba(119, 110, 226, 0.15)",
    borderRadius: 999,
    overflow: "visible",
    justifyContent: "center",
    position: "relative",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
  star: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -15,
    top: -1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    fontSize: 13,
    fontWeight: "700",
    minWidth: 36,
  },
});
