import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
} from "react-native-reanimated";

interface Props {
  label: string;
  value: string;
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
  index: number;
}

export default function StatCard({
  label,
  value,
  iconName,
  color,
  index,
}: Props) {
  const scale = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    scale.value = withDelay(
      400 + index * 120,
      withSpring(1, { damping: 9, stiffness: 220 }),
    );
    translateY.value = withDelay(
      400 + index * 120,
      withSpring(0, { damping: 12, stiffness: 180 }),
    );
  }, [scale, translateY, index]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: scale.value,
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.wrap, animStyle]}>
      <View style={[styles.card, { borderColor: color }]}>
        <View style={[styles.top, { backgroundColor: color }]}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.bottom}>
          <Ionicons name={iconName} size={22} color={color} />
          <Text style={[styles.value, { color }]}>{value}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  card: {
    borderWidth: 2,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  top: {
    paddingVertical: 6,
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "800",
    color: "#fff",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 6,
  },
  value: {
    fontSize: 22,
    fontWeight: "900",
  },
});
