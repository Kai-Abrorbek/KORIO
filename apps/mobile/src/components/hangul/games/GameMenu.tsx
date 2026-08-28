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
  type SharedValue,
} from "react-native-reanimated";

const GAMES = [
  { id: "memory", icon: "albums" as const, route: "/hangul-game" },
  { id: "drawing", icon: "create" as const, route: "/hangul-drawing" },
  { id: "slot", icon: "dice" as const, route: "/jamo-slot" },
  { id: "speed", icon: "flash" as const, route: "/speed-round" },
  { id: "syllable", icon: "brush" as const, route: "/syllable-drawing" },
];

/** 버튼 하나 사이의 세로 간격 */
const STEP = 64;

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
      {GAMES.map((g, idx) => (
        <MenuItem
          key={g.id}
          index={idx}
          icon={g.icon}
          label={t(`hangul.games.${g.id}`)}
          expand={expand}
          open={open}
          onPress={() => {
            toggle();
            router.push(g.route as any);
          }}
        />
      ))}

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

/**
 * 항목 하나. 예전에는 map 안에서 useAnimatedStyle 을 불렀는데,
 * 게임이 늘거나 줄면 훅 개수가 바뀌어 터진다. 컴포넌트로 뺀다.
 */
function MenuItem({
  index,
  icon,
  label,
  expand,
  open,
  onPress,
}: {
  index: number;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  expand: SharedValue<number>;
  open: boolean;
  onPress: () => void;
}) {
  const style = useAnimatedStyle(() => ({
    opacity: expand.value,
    transform: [
      { translateY: -(index + 1) * STEP * expand.value },
      { scale: 0.75 + 0.25 * expand.value },
    ],
  }));

  return (
    <Animated.View
      style={[styles.item, style]}
      pointerEvents={open ? "auto" : "none"}
    >
      <TouchableOpacity
        style={styles.itemBtn}
        activeOpacity={0.85}
        onPress={onPress}
      >
        <Ionicons name={icon} size={19} color="#fff" />
        <Text style={styles.itemLabel} numberOfLines={1}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    bottom: 24,
    // left 를 같이 잡아야 폭이 생긴다. 오른쪽만 고정하면 이 View 의 폭이
    // FAB 크기(56)로 잡히고, 그 안의 절대배치 버튼들이 56px 기준으로
    // 측정돼서 글자가 줄바꿈되거나 잘렸다.
    left: 16,
    right: 16,
    alignItems: "flex-end",
  },
  item: {
    position: "absolute",
    bottom: 0,
    right: 0,
    // 스케일 애니메이션이 가운데를 기준으로 도니까, 오른쪽 끝을 축으로 잡아야
    // 열릴 때 버튼이 화면 밖으로 삐져나가지 않는다
    transformOrigin: "right center",
  },
  itemBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#776ee2",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 24,
    borderBottomWidth: 3,
    borderColor: "#5448E0",
  },
  itemLabel: {
    color: "#fff",
    fontSize: 13.5,
    fontWeight: "900",
    flexShrink: 1,
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
