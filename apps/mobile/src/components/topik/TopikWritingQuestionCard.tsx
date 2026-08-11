import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputContentSizeChangeEventData,
} from "react-native";
import { useTranslation } from "react-i18next";
import type {
  TopikLanguage,
  TopikQuestionWithGroup,
  TopikSolution,
} from "@/types/topik";
import { topikText } from "@/types/topik";
import { TopikStimulusCard } from "./TopikStimulusCard";
import { TopikTextBlocks } from "./TopikTextBlocks";
import { type TopikPalette, useTopikTheme } from "./topikTheme";

interface TopikWritingQuestionCardProps {
  question: TopikQuestionWithGroup;
  responses: Record<string, string>;
  language: TopikLanguage;
  readOnly?: boolean;
  solution?: TopikSolution;
  onChange: (fieldKey: string, text: string) => void;
}

export function TopikWritingQuestionCard({
  question,
  responses,
  language,
  readOnly = false,
  solution,
  onChange,
}: TopikWritingQuestionCardProps) {
  const { t } = useTranslation();
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const [inputHeights, setInputHeights] = useState<Record<string, number>>({});
  const fields = question.writingConfig?.fields ?? [];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.numberWrap}>
          <Text style={styles.number}>{question.number}</Text>
        </View>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>{t("topik.writingExam.eyebrow")}</Text>
          <Text style={styles.typeLabel}>
            {t(`topik.questionTypes.${question.type}`)}
          </Text>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{question.points}P</Text>
        </View>
      </View>

      <View style={styles.instructionCard}>
        <TopikTextBlocks blocks={question.group.instruction} />
      </View>

      {question.stimulus && (
        <View style={styles.stimulusWrap}>
          <TopikStimulusCard stimulus={question.stimulus} />
        </View>
      )}

      {question.writingConfig && (
        <View style={styles.guideCard}>
          <View style={styles.guideIcon}>
            <Ionicons name="sparkles" size={17} color={palette.purple} />
          </View>
          <View style={styles.guideCopy}>
            <View style={styles.guideHeader}>
              <Text style={styles.guideTitle}>
                {t("topik.writingExam.guide")}
              </Text>
              <Text style={styles.guideTime}>
                {t("topik.writingExam.recommendedTime", {
                  minutes: question.writingConfig.recommendedMinutes,
                })}
              </Text>
            </View>
            <Text style={styles.guideText}>
              {topikText(question.writingConfig.guide, language)}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.responseStack}>
        {fields.map((field) => {
          const value = responses[field.key] ?? "";
          const remaining = Math.max(0, field.minCharacters - value.length);
          const isEssay = field.multiline && field.maxCharacters > 150;

          return (
            <View key={field.key} style={styles.responseField}>
              <View style={styles.responseHeader}>
                <Text style={styles.responseLabel}>
                  {t("topik.writingExam.answerLabel", { label: field.label })}
                </Text>
                <Text
                  style={[
                    styles.characterCount,
                    remaining === 0 && styles.characterCountComplete,
                  ]}
                >
                  {t("topik.writingExam.characters", {
                    count: value.length,
                    max: field.maxCharacters,
                  })}
                </Text>
              </View>
              <TextInput
                accessibilityLabel={t("topik.writingExam.answerLabel", {
                  label: field.label,
                })}
                editable={!readOnly}
                keyboardAppearance={palette.isDark ? "dark" : "light"}
                maxLength={field.maxCharacters}
                multiline={field.multiline}
                onChangeText={(text) => onChange(field.key, text)}
                onContentSizeChange={(
                  event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
                ) =>
                  setInputHeights((current) => ({
                    ...current,
                    [field.key]: Math.max(
                      isEssay ? 220 : 54,
                      Math.min(420, event.nativeEvent.contentSize.height + 28),
                    ),
                  }))
                }
                placeholder={t(
                  isEssay
                    ? "topik.writingExam.essayPlaceholder"
                    : "topik.writingExam.shortPlaceholder",
                )}
                placeholderTextColor={palette.textSubtle}
                scrollEnabled={isEssay}
                style={[
                  styles.input,
                  field.multiline && styles.multilineInput,
                  isEssay && { height: inputHeights[field.key] ?? 220 },
                  readOnly && styles.readOnlyInput,
                ]}
                textAlignVertical={field.multiline ? "top" : "center"}
                value={value}
              />
              {!readOnly && remaining > 0 && (
                <View style={styles.minimumNotice}>
                  <Ionicons
                    name="information-circle-outline"
                    size={14}
                    color={palette.textMuted}
                  />
                  <Text style={styles.minimumText}>
                    {t("topik.writingExam.minimumRemaining", {
                      count: remaining,
                    })}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {solution && (
        <View style={styles.reviewStack}>
          <View style={styles.reviewHeader}>
            <View style={styles.reviewIcon}>
              <Ionicons name="checkmark-done" size={19} color={palette.white} />
            </View>
            <View>
              <Text style={styles.reviewEyebrow}>
                {t("topik.writingExam.reviewEyebrow")}
              </Text>
              <Text style={styles.reviewTitle}>
                {t("topik.writingExam.sampleAnswer")}
              </Text>
            </View>
          </View>
          <Text style={styles.sampleAnswer}>
            {solution.sampleAnswer || t("topik.writingExam.emptyAnswer")}
          </Text>

          {!!solution.rubric?.length && (
            <View style={styles.rubricCard}>
              <Text style={styles.rubricTitle}>
                {t("topik.writingExam.rubric")}
              </Text>
              {solution.rubric.map((item, index) => (
                <View
                  key={`${question.id}-rubric-${index}`}
                  style={styles.rubricRow}
                >
                  <View style={styles.rubricNumber}>
                    <Text style={styles.rubricNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.rubricText}>
                    {topikText(item, language)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    card: {
      gap: 18,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 24,
      backgroundColor: palette.paper,
      padding: 18,
      shadowColor: palette.shadow,
      shadowOpacity: palette.isDark ? 0.22 : 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 7 },
      elevation: 3,
    },
    header: { flexDirection: "row", alignItems: "center", gap: 12 },
    numberWrap: {
      width: 54,
      height: 54,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 18,
      backgroundColor: palette.purple,
    },
    number: { color: palette.white, fontSize: 22, fontWeight: "900" },
    headerCopy: { flex: 1, gap: 2 },
    eyebrow: {
      color: palette.purple,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    typeLabel: { color: palette.text, fontSize: 17, fontWeight: "900" },
    pointsBadge: {
      borderRadius: 999,
      backgroundColor: palette.purpleSoft,
      paddingHorizontal: 11,
      paddingVertical: 7,
    },
    pointsText: { color: palette.purple, fontSize: 12, fontWeight: "900" },
    instructionCard: {
      borderLeftWidth: 3,
      borderLeftColor: palette.purple,
      borderRadius: 14,
      backgroundColor: palette.surfaceMuted,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    stimulusWrap: { borderRadius: 18, overflow: "hidden" },
    guideCard: {
      flexDirection: "row",
      gap: 11,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 17,
      backgroundColor: palette.purpleSoft,
      padding: 13,
    },
    guideIcon: {
      width: 34,
      height: 34,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 11,
      backgroundColor: palette.surfaceElevated,
    },
    guideCopy: { flex: 1, gap: 5 },
    guideHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    guideTitle: { color: palette.purple, fontSize: 12, fontWeight: "900" },
    guideTime: { color: palette.textMuted, fontSize: 10, fontWeight: "700" },
    guideText: { color: palette.textSecondary, fontSize: 12, lineHeight: 19 },
    responseStack: { gap: 16 },
    responseField: { gap: 8 },
    responseHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    responseLabel: { color: palette.text, fontSize: 13, fontWeight: "900" },
    characterCount: {
      color: palette.textMuted,
      fontSize: 10,
      fontWeight: "700",
    },
    characterCountComplete: { color: palette.success },
    input: {
      minHeight: 54,
      borderWidth: 1.5,
      borderColor: palette.borderStrong,
      borderRadius: 16,
      backgroundColor: palette.surfaceElevated,
      color: palette.text,
      fontSize: 14,
      lineHeight: 24,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    multilineInput: { minHeight: 110 },
    readOnlyInput: { backgroundColor: palette.surfaceMuted },
    minimumNotice: { flexDirection: "row", alignItems: "center", gap: 5 },
    minimumText: { color: palette.textMuted, fontSize: 10 },
    reviewStack: {
      gap: 14,
      borderTopWidth: 1,
      borderTopColor: palette.divider,
      paddingTop: 18,
    },
    reviewHeader: { flexDirection: "row", alignItems: "center", gap: 11 },
    reviewIcon: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 13,
      backgroundColor: palette.success,
    },
    reviewEyebrow: {
      color: palette.success,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    reviewTitle: { color: palette.text, fontSize: 16, fontWeight: "900" },
    sampleAnswer: {
      borderRadius: 16,
      backgroundColor: palette.successSoft,
      color: palette.text,
      fontSize: 13,
      lineHeight: 23,
      padding: 15,
    },
    rubricCard: {
      gap: 10,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 16,
      backgroundColor: palette.surfaceMuted,
      padding: 14,
    },
    rubricTitle: { color: palette.text, fontSize: 13, fontWeight: "900" },
    rubricRow: { flexDirection: "row", alignItems: "flex-start", gap: 9 },
    rubricNumber: {
      width: 22,
      height: 22,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 7,
      backgroundColor: palette.purpleSoft,
    },
    rubricNumberText: {
      color: palette.purple,
      fontSize: 10,
      fontWeight: "900",
    },
    rubricText: {
      flex: 1,
      color: palette.textSecondary,
      fontSize: 12,
      lineHeight: 19,
    },
  });
