import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { RoadmapNode, RoadmapUnit } from "@/types/roadmap";
import { darken } from "@/utils/color";

interface Props {
  node: RoadmapNode;
  unit: RoadmapUnit;
  triangleOffsetX?: number;
  onStart?: () => void;
}

export default function NodePopover({
  node,
  unit,
  triangleOffsetX = 0,
  onStart,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const isLocked = node.status === "locked";
  const isChest = node.type === "chest";

  // 상자 (잠금) - 설명만 있음
  if (isChest && isLocked) {
    return (
      <Pressable onPress={() => {}}>
        <View style={[styles.bubble, styles.bubbleLocked]}>
          <View
            style={[
              styles.arrow,
              styles.arrowLocked,
              { marginLeft: -10 + triangleOffsetX },
            ]}
          />
          <Text style={styles.lockedDescription}>
            {t("roadmap.chestLocked", {
              count: node.chestLessonsRemaining ?? 0,
            })}
          </Text>
        </View>
      </Pressable>
    );
  }

  // 잠금 노드
  if (isLocked) {
    return (
      <Pressable onPress={() => {}}>
        <View style={[styles.bubble, styles.bubbleLocked]}>
          <View
            style={[
              styles.arrow,
              styles.arrowLocked,
              { marginLeft: -10 + triangleOffsetX },
            ]}
          />
          <Text style={styles.lockedTitle}>{unit.title}</Text>
          <Text style={styles.lockedDescription}>
            {t("roadmap.lockedDescription")}
          </Text>
          <View style={styles.lockedBtn}>
            <Text style={styles.lockedBtnText}>{t("roadmap.locked")}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  // 활성 (현재/오픈된) 노드
  return (
    <View
      style={[
        styles.bubble,
        { backgroundColor: unit.color, shadowColor: darken(unit.color, 60) },
      ]}
    >
      <View
        style={[
          styles.arrow,
          { borderBottomColor: unit.color },
          { marginLeft: -10 + triangleOffsetX },
        ]}
      />
      <Text style={styles.activeTitle}>{unit.title}</Text>
      <Text style={styles.activeSubtitle}>
        {t("roadmap.lessonProgress", {
          current: node.currentLesson ?? 1,
          total: node.totalLessons ?? 1,
        })}
      </Text>
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={onStart}
        activeOpacity={0.85}
      >
        <Text style={[styles.continueText, { color: unit.color }]}>
          {t("roadmap.continue")}
        </Text>
        <View style={styles.xpRow}>
          <Ionicons name="flash" size={16} color={unit.color} />
          <Text style={[styles.xpText, { color: unit.color }]}>
            {node.xpReward ?? 0} XP
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    bubble: {
      marginHorizontal: 20,
      borderRadius: 18,
      paddingVertical: 16,
      paddingHorizontal: 18,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 8,
    },
    bubbleLocked: {
      backgroundColor: theme.border,
      shadowColor: "#000",
      shadowOpacity: 0.1,
    },
    arrow: {
      position: "absolute",
      top: -10,
      left: "50%",
      width: 0,
      height: 0,
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderBottomWidth: 10,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
    },
    arrowLocked: {
      borderBottomColor: theme.border,
    },
    // 활성
    activeTitle: {
      fontSize: 19,
      fontWeight: "800",
      color: "#fff",
      marginBottom: 4,
    },
    activeSubtitle: {
      fontSize: 14,
      fontWeight: "600",
      color: "rgba(255,255,255,0.85)",
      marginBottom: 14,
    },
    continueBtn: {
      backgroundColor: "#fff",
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    continueText: {
      fontSize: 16,
      fontWeight: "800",
    },
    xpRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    xpText: {
      fontSize: 15,
      fontWeight: "800",
    },
    // 잠금
    lockedTitle: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 4,
    },
    lockedDescription: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.textSecondary,
      lineHeight: 22,
      marginBottom: 14,
      textAlign: "center",
    },
    lockedBtn: {
      backgroundColor: theme.bg,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
    },
    lockedBtnText: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.textSecondary,
    },
  });
