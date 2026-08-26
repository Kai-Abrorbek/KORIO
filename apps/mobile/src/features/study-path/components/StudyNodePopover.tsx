import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { StudyNode } from "@/types/study-path";
import { darken } from "@/utils/color";

interface Props {
  node: StudyNode;
  /** 오늘 몇 번째 순서인지 — "학원 시간표" 느낌을 주는 값 */
  step: number;
  stepCount: number;
  color: string;
  triangleOffsetX: number;
  onStart: () => void;
}

const ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  review: "refresh",
  words: "albums",
  grammar: "book",
  vocabQuiz: "create",
  recap: "refresh",
  grammarQuiz: "construct",
  final: "flag",
};

/** 노드가 다루는 것의 단위. "단어 12개" / "문제 20개" 로 보여준다 */
const COUNT_LABEL: Record<string, string> = {
  review: "studyPath.countQuestions",
  words: "studyPath.countWords",
  grammar: "studyPath.countGrammar",
  vocabQuiz: "studyPath.countQuestions",
  recap: "studyPath.countQuestions",
  grammarQuiz: "studyPath.countQuestions",
  final: "studyPath.countQuestions",
};

export default function StudyNodePopover({
  node,
  step,
  stepCount,
  color,
  triangleOffsetX,
  onStart,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const completed = node.status === "completed";
  const base = t(`studyPath.node.${node.kind}`);
  const title =
    node.groupCount > 1
      ? t("studyPath.nodeGroup", {
          name: base,
          n: node.group,
          total: node.groupCount,
        })
      : base;

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
          { borderBottomColor: color, marginLeft: -10 + triangleOffsetX },
        ]}
      />

      <View style={styles.titleRow}>
        <View style={styles.titleIcon}>
          <Ionicons
            name={completed ? "checkmark" : (ICON[node.kind] ?? "star")}
            size={19}
            color="#FFFFFF"
          />
        </View>
        <View style={styles.titleTexts}>
          <Text style={styles.step}>
            {t("studyPath.step", { step, total: stepCount })}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{t(`studyPath.desc.${node.kind}`)}</Text>

      <View style={styles.metaRow}>
        {node.count > 0 ? (
          <View style={styles.metaChip}>
            <Ionicons name="layers-outline" size={15} color="#FFFFFF" />
            <Text style={styles.metaText}>
              {t(COUNT_LABEL[node.kind] ?? "studyPath.countQuestions", {
                count: node.count,
              })}
            </Text>
          </View>
        ) : null}
        {node.lessonCount > 1 ? (
          <View style={styles.metaChip}>
            <Ionicons name="albums-outline" size={15} color="#FFFFFF" />
            <Text style={styles.metaText}>
              {t("studyPath.lessonProgress", {
                done: node.lessonsDone,
                total: node.lessonCount,
              })}
            </Text>
          </View>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={onStart}
        activeOpacity={0.85}
      >
        <Text style={[styles.startText, { color }]}>
          {t(
            completed
              ? "studyPath.again"
              : node.lessonsDone > 0
                ? "studyPath.continueLesson"
                : "studyPath.start",
            { n: node.nextLesson },
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
    titleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    titleIcon: {
      width: 34,
      height: 34,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.18)",
    },
    titleTexts: { flex: 1 },
    step: {
      color: "rgba(255,255,255,0.75)",
      fontSize: 10.5,
      fontWeight: "900",
      letterSpacing: 0.6,
    },
    title: { color: "#FFFFFF", fontSize: 18.5, fontWeight: "900" },
    description: {
      marginTop: 9,
      color: "rgba(255,255,255,0.86)",
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
    },
    metaRow: {
      marginTop: 12,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    metaChip: {
      minHeight: 30,
      borderRadius: 10,
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: "rgba(255,255,255,0.15)",
    },
    metaText: { color: "#FFFFFF", fontSize: 11.5, fontWeight: "800" },
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
