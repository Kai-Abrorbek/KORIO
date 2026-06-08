import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { NodeType, NodeStatus } from "@/types/roadmap";
import { darken } from "@/utils/color";
import AnimatedNodeRing, { RING_SIZE } from "./AnimatedNodeRing";

interface Props {
  type: NodeType;
  status: NodeStatus;
  unitColor: string;
  onPress?: () => void;
}

const ICON_MAP: Record<NodeType, keyof typeof Ionicons.glyphMap> = {
  star: "star",
  headphone: "headset",
  speech: "flag",
  chest: "gift",
  review: "refresh",
  boss: "trophy",
};

const NODE_SIZE = 72;

export default function LessonNode({
  type,
  status,
  unitColor,
  onPress,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isLocked = status === "locked";

  let mainColor: string;
  let darkColor: string;
  let iconColor: string;

  if (isLocked) {
    mainColor = theme.border;
    darkColor = darken(theme.border, 20);
    iconColor = theme.textSecondary;
  } else {
    mainColor = unitColor;
    darkColor = darken(unitColor, 40);
    iconColor = "#fff";
  }

  const iconName = ICON_MAP[type];
  const iconSize = type === "chest" || type === "boss" ? 34 : 30;

  return (
    <View style={styles.wrap}>
      {/* 현재 노드 펄스 링 */}
      {isCurrent && (
        <View style={styles.ringWrap} pointerEvents="none">
          <AnimatedNodeRing color={unitColor} />
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.touchable}
      >
        {/* 3D 입체감 - 아래 그림자 레이어 */}
        <View style={[styles.depth, { backgroundColor: darkColor }]} />
        {/* 윗면 */}
        <View style={[styles.face, { backgroundColor: mainColor }]}>
          <Ionicons name={iconName} size={iconSize} color={iconColor} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      width: NODE_SIZE,
      height: NODE_SIZE + 8,
      alignItems: "center",
      justifyContent: "center",
    },
    ringWrap: {
      position: "absolute",
      width: RING_SIZE,
      height: RING_SIZE,
      top: (NODE_SIZE + 8 - RING_SIZE) / 2,
      left: (NODE_SIZE - RING_SIZE) / 2,
      alignItems: "center",
      justifyContent: "center",
    },
    touchable: {
      width: NODE_SIZE,
      height: NODE_SIZE + 8,
      alignItems: "center",
      justifyContent: "center",
    },
    depth: {
      position: "absolute",
      width: NODE_SIZE,
      height: NODE_SIZE,
      borderRadius: NODE_SIZE / 2,
      top: 6,
    },
    face: {
      width: NODE_SIZE,
      height: NODE_SIZE,
      borderRadius: NODE_SIZE / 2,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
    },
  });
