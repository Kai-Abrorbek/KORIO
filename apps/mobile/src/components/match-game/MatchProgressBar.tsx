import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ThemeColors } from "@/constants/theme";
import { progressWidth, MARKERS } from "@/mocks/match-game.mock";

export default function MatchProgressBar({
  matched,
  theme,
}: {
  matched: number;
  theme: ThemeColors;
}) {
  const w = useSharedValue(0);
  useEffect(() => {
    w.value = withSpring(progressWidth(matched), {
      damping: 16,
      stiffness: 120,
      mass: 0.7,
    });
  }, [matched]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${w.value * 100}%` as any,
  }));

  return (
    <View style={styles.track}>
      <Animated.View
        style={[styles.fill, { backgroundColor: theme.primary }, fillStyle]}
      />
      {MARKERS.map((m) => {
        const reached = matched >= m.label;
        return (
          <View
            key={m.label}
            style={[
              styles.marker,
              {
                left: `${m.pos * 100}%` as any,
                backgroundColor: reached ? theme.primary : "#D9D6EC",
              },
            ]}
          >
            <Text
              style={[
                styles.markerText,
                { color: reached ? "#fff" : theme.textSecondary },
              ]}
            >
              {m.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flex: 1,
    height: 22,
    backgroundColor: "#E9E7F3",
    borderRadius: 99,
    justifyContent: "center",
    position: "relative",
    overflow: "visible",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 99,
  },
  marker: {
    position: "absolute",
    minWidth: 34,
    height: 22,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    transform: [{ translateX: -17 }],
  },
  markerText: { fontSize: 12, fontWeight: "800" },
});
