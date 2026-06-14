import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface Props {
  total: number;
  tapCount: number; // 0 ~ total
}

type DotState = "used" | "active" | "pending";

function getDotState(index: number, tapCount: number): DotState {
  if (index < tapCount) return "used";
  if (index === tapCount) return "active";
  return "pending";
}

function Dot({ state }: { state: DotState }) {
  const scale = useSharedValue(state === "active" ? 1.2 : 1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (state === "active") {
      scale.value = withSpring(1.15, { damping: 8, stiffness: 220 });
      translateY.value = withSpring(-3, { damping: 6 });
    } else {
      scale.value = withSpring(1, { damping: 10 });
      translateY.value = withSpring(0, { damping: 10 });
    }
  }, [state, scale, translateY]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const bg =
    state === "active" ? "#D87520" : state === "used" ? "#F4D9B0" : "#F8E4C5";
  const showArrow = state !== "used";
  const iconColor = state === "active" ? "#fff" : "#E8C58E";

  return (
    <Animated.View style={[styles.dotWrap, animStyle]}>
      <View style={[styles.dot, { backgroundColor: bg }]}>
        {showArrow && <Ionicons name="arrow-up" size={18} color={iconColor} />}
      </View>
      {state === "active" && <View style={styles.dotShadow} />}
    </Animated.View>
  );
}

export default function TapDots({ total, tapCount }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} state={getDotState(i, tapCount)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dotWrap: {
    alignItems: "center",
    gap: 4,
  },
  dot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  dotShadow: {
    width: 28,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E8E8EE",
    opacity: 0.6,
  },
});
