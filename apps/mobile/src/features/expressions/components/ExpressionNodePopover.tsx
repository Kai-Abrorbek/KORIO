import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { ExpressionRoadmapNode } from "@/types/expression";
import { darken } from "@/utils/color";

interface Props {
  node: ExpressionRoadmapNode;
  color: string;
  triangleOffsetX: number;
  onStart: () => void;
}

export default function ExpressionNodePopover({
  node,
  color,
  triangleOffsetX,
  onStart,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const completed = node.status === "completed";

  return (
    <View
      style={[
        styles.bubble,
        { backgroundColor: color, shadowColor: darken(color, 60) },
      ]}
    >
      <View
        style={[
          styles.arrow,
          {
            borderBottomColor: color,
            marginLeft: -10 + triangleOffsetX,
          },
        ]}
      />

      <View style={styles.titleRow}>
        <View style={styles.titleIcon}>
          <Ionicons
            name={completed ? "checkmark" : "chatbubble-ellipses"}
            size={19}
            color="#FFFFFF"
          />
        </View>
        <Text style={styles.title}>{node.title}</Text>
      </View>
      <Text style={styles.description}>{node.description}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaChip}>
          <Ionicons name="albums-outline" size={15} color="#FFFFFF" />
          <Text style={styles.metaText}>
            {t("expressionRoadmap.nodeExpressions", {
              count: node.expressionCount,
            })}
          </Text>
        </View>
        <View style={styles.metaChip}>
          <Ionicons name="repeat-outline" size={16} color="#FFFFFF" />
          <Text style={styles.metaText}>
            {t("expressionRoadmap.nodeRepetitions", {
              count: node.requiredExposures,
            })}
          </Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(1, node.progress) * 100}%` },
          ]}
        />
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={onStart}
        activeOpacity={0.85}
      >
        <Text style={[styles.startText, { color }]}>
          {t(
            completed
              ? "expressionRoadmap.reviewNode"
              : "expressionRoadmap.startNode",
          )}
        </Text>
        <Ionicons name="arrow-forward" size={19} color={color} />
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (_theme: ThemeColors) =>
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
    titleRow: { flexDirection: "row", alignItems: "center", gap: 9 },
    titleIcon: {
      width: 32,
      height: 32,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.18)",
    },
    title: { flex: 1, color: "#FFFFFF", fontSize: 19, fontWeight: "900" },
    description: {
      marginTop: 8,
      color: "rgba(255,255,255,0.86)",
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
    },
    metaRow: {
      marginTop: 13,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    metaChip: {
      minHeight: 30,
      borderRadius: 10,
      paddingHorizontal: 9,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: "rgba(255,255,255,0.15)",
    },
    metaText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
    progressTrack: {
      marginTop: 13,
      height: 6,
      borderRadius: 99,
      overflow: "hidden",
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    progressFill: {
      height: "100%",
      borderRadius: 99,
      backgroundColor: "#FFFFFF",
    },
    startButton: {
      marginTop: 14,
      minHeight: 50,
      borderRadius: 13,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: "#FFFFFF",
    },
    startText: { fontSize: 15.5, fontWeight: "900" },
  });
