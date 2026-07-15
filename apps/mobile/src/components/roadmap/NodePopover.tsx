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
  onReview?: () => void;
  onLegend?: () => void;
  canJump?: boolean; // 점프 가능한 잠금노드인가
  onJumpTest?: () => void; // 테스트 시작
  onClose?: () => void;
}

export default function NodePopover({
  node,
  unit,
  triangleOffsetX = 0,
  onReview,
  onLegend,
  onStart,
  canJump = false,
  onJumpTest,
  onClose,
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
            {canJump
              ? t("roadmap.jumpDescription")
              : t("roadmap.lockedDescription")}
          </Text>
          {canJump ? (
            <TouchableOpacity
              style={styles.jumpTestBtn}
              onPress={onJumpTest}
              activeOpacity={0.9}
            >
              <Text style={styles.jumpTestText}>{t("roadmap.jumpStart")}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.lockedBtn}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Text style={styles.lockedBtnText}>{t("roadmap.locked")}</Text>
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    );
  }

  // 활성 (현재/오픈된) 노드
  // 완료 노드 - 복습 + 레전드
  if (node.status === "completed") {
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
        <Text style={styles.activeSubtitle}>{t("roadmap.legendSubtitle")}</Text>

        {/* 복습 (흰 버튼) */}
        <TouchableOpacity
          style={styles.reviewBtn}
          onPress={onReview}
          activeOpacity={0.85}
        >
          <Text style={[styles.reviewText, { color: unit.color }]}>
            {t("roadmap.review")}
          </Text>
          <View style={styles.xpRow}>
            <Ionicons name="flash" size={15} color={unit.color} />
            <Text style={[styles.xpText, { color: unit.color }]}>5 XP</Text>
          </View>
        </TouchableOpacity>

        {/* 레전드 (노란 버튼) */}
        <TouchableOpacity
          style={styles.legendBtn}
          onPress={onLegend}
          activeOpacity={0.9}
        >
          <Text style={styles.legendText}>{t("roadmap.legend")}</Text>
          <View style={styles.xpRow}>
            <Ionicons name="flash" size={15} color="#8A6D00" />
            <Text style={styles.legendXpText}>40 XP</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

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
          current: node.completedLessons ?? 0,
          total: node.totalLessons ?? 4,
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
    jumpTestBtn: {
      backgroundColor: "#1CB0F6",
      borderRadius: 12,
      paddingVertical: 13,
      alignItems: "center",
      borderBottomWidth: 4,
      borderColor: "#1899D6",
    },
    jumpTestText: { color: "#fff", fontSize: 15, fontWeight: "900" },
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
    reviewBtn: {
      backgroundColor: "#fff",
      borderRadius: 12,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginBottom: 10,
      borderBottomWidth: 4,
      borderColor: "rgba(0,0,0,0.12)",
    },
    reviewText: { fontSize: 16, fontWeight: "800" },
    legendBtn: {
      backgroundColor: "#FFD900",
      borderRadius: 12,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      borderBottomWidth: 4,
      borderColor: "#E5AE00",
    },
    legendText: { fontSize: 16, fontWeight: "900", color: "#8A6D00" },
    legendXpText: { fontSize: 15, fontWeight: "900", color: "#8A6D00" },
  });
