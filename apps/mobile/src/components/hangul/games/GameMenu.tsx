import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const GAMES = [
  { id: "memory", icon: "albums" as const, route: "/hangul-game" },
  { id: "drawing", icon: "create" as const, route: "/hangul-drawing" },
  { id: "slot", icon: "dice" as const, route: "/jamo-slot" },
  { id: "speed", icon: "flash" as const, route: "/speed-round" },
];

export default function GameMenu() {
  const { t } = useTranslation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rotation = useSharedValue(0);
  const expand = useSharedValue(0);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    rotation.value = withSpring(next ? 45 : 0, { damping: 14 });
    expand.value = withTiming(next ? 1 : 0, { duration: 220 });
  };

  const fabStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.wrap} pointerEvents="box-none">
      {GAMES.map((g, idx) => {
        const itemStyle = useAnimatedStyle(() => ({
          opacity: expand.value,
          transform: [
            {
              translateY: -(idx + 1) * 68 * expand.value,
            },
            { scale: 0.7 + 0.3 * expand.value },
          ],
        }));
        return (
          <Animated.View
            key={g.id}
            style={[styles.item, itemStyle]}
            pointerEvents={open ? "auto" : "none"}
          >
            <TouchableOpacity
              style={styles.itemBtn}
              activeOpacity={0.85}
              onPress={() => {
                toggle();
                router.push(g.route as any);
              }}
            >
              <Ionicons name={g.icon} size={20} color="#fff" />
              <Text style={styles.itemLabel}>{t(`hangul.games.${g.id}`)}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={toggle}
      >
        <Animated.View style={fabStyle}>
          <Ionicons name="game-controller" size={22} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    bottom: 24,
    right: 16,
    alignItems: "flex-end",
  },
  item: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  itemBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#776ee2",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderBottomWidth: 3,
    borderColor: "#5448E0",
  },
  itemLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
  },
  fab: {
    backgroundColor: "#776ee2",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 4,
    borderColor: "#5448E0",
    shadowColor: "#776ee2",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
});
