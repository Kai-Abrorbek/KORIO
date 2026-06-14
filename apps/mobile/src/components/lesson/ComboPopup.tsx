import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  cancelAnimation,
} from "react-native-reanimated";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { useSound } from "@/hooks/useSound";

interface Props {
  combo: number;
}

const COMBO_CONFIG: Record<
  number,
  { icon: string; iconLib: "mci" | "ion"; label: string; color: string }
> = {
  3: { icon: "sunglasses", iconLib: "mci", label: "콤보 x3", color: "#FF9500" },
  5: { icon: "fire", iconLib: "mci", label: "콤보 x5", color: "#FF4B4B" },
  7: {
    icon: "lightning-bolt",
    iconLib: "mci",
    label: "콤보 x7",
    color: "#776ee2",
  },
  10: { icon: "trophy", iconLib: "ion", label: "콤보 x10", color: "#FFD700" },
};

const getComboConfig = (combo: number) => {
  const keys = Object.keys(COMBO_CONFIG)
    .map(Number)
    .sort((a, b) => b - a);
  for (const k of keys) {
    if (combo >= k) return COMBO_CONFIG[k];
  }
  return COMBO_CONFIG[3];
};

export default function ComboPopup({ combo }: Props) {
  const translateY = useSharedValue(400);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.7);
  const prevCombo = useRef(0);
  const { play } = useSound();

  useEffect(() => {
    if (combo > prevCombo.current && [3, 5, 7, 10].includes(combo)) {
      play("combo");
      // 기존 애니메이션 캔슬
      cancelAnimation(translateY);
      cancelAnimation(opacity);
      cancelAnimation(scale);

      // 시작 상태로 리셋
      translateY.value = 400;
      opacity.value = 0;
      scale.value = 0.7;

      // 다음 프레임에 실행
      setTimeout(() => {
        translateY.value = withSequence(
          withSpring(0, { damping: 12, stiffness: 180 }),
          withDelay(2500, withTiming(400, { duration: 400 })),
        );

        opacity.value = withSequence(
          withTiming(1, { duration: 200 }),
          withDelay(2500, withTiming(0, { duration: 400 })),
        );

        scale.value = withSpring(1, { damping: 8, stiffness: 280 });
      }, 0);
    }

    prevCombo.current = combo;
  }, [combo, translateY, opacity, scale]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  const config = getComboConfig(combo || 3);

  return (
    <Animated.View pointerEvents="none" style={[s.container, animStyle]}>
      <View style={[s.iconWrap, { backgroundColor: config.color + "25" }]}>
        {config.iconLib === "mci" ? (
          <MaterialCommunityIcons
            name={config.icon as any}
            size={64}
            color={config.color}
          />
        ) : (
          <Ionicons name={config.icon as any} size={64} color={config.color} />
        )}
      </View>
      <View style={[s.badge, { backgroundColor: config.color }]}>
        <Text style={s.badgeText}>{config.label}</Text>
      </View>
      <Text style={[s.sub, { color: config.color }]}>대단해요!</Text>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  container: {
    position: "absolute",
    top: "35%",
    left: 20,
    right: 20,
    alignItems: "center",
    backgroundColor: "transparent",
    gap: 12,
    zIndex: 99999,
    elevation: 99999,
  },
  iconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    borderRadius: 99,
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  badgeText: { color: "#fff", fontSize: 18, fontWeight: "800" },
  sub: { fontSize: 15, fontWeight: "700" },
});
