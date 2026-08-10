import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type {
  TopikLearningSupport,
  TopikRevealedSolution,
} from "@/types/topik";
import { toTopikLanguage, topikText } from "@/types/topik";
import { type TopikPalette, useTopikTheme } from "./topikTheme";

interface TopikHintPanelProps {
  support?: TopikLearningSupport;
  solution?: TopikRevealedSolution;
  selected: boolean;
  busy?: boolean;
  onRevealHint: () => void;
  onRevealSolution: () => void;
}

export function TopikHintPanel({
  support,
  solution,
  selected,
  busy,
  onRevealHint,
  onRevealSolution,
}: TopikHintPanelProps) {
  const { t, i18n } = useTranslation();
  const language = toTopikLanguage(i18n.resolvedLanguage ?? i18n.language);
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>{t("topik.modes.guided").toUpperCase()}</Text>
          <Text style={styles.title}>{t("topik.hint.title")}</Text>
        </View>
        {support && (
          <Text style={styles.count}>
            {support.revealedHints.length}/{support.hintCount}
          </Text>
        )}
      </View>

      {support?.revealedHints.map((hint) => (
        <View key={hint.key} style={styles.hintCard}>
          <Text style={styles.hintLevel}>
            {t("topik.hint.level", { level: hint.level })}
          </Text>
          <Text style={styles.hintTitle}>{topikText(hint.title, language)}</Text>
          <Text style={styles.hintContent}>{topikText(hint.content, language)}</Text>
          {hint.examples.map((example, index) => (
            <View key={`${hint.key}-${index}`} style={styles.example}>
              <Text style={styles.exampleLabel}>{t("topik.hint.example")}</Text>
              <Text style={styles.exampleText}>{topikText(example, language)}</Text>
            </View>
          ))}
        </View>
      ))}

      {solution && (
        <View style={styles.solutionCard}>
          <Text style={styles.solutionResult}>
            {solution.isCorrect
              ? t("topik.hint.correct")
              : t("topik.hint.tryAgain")}
          </Text>
          <Text style={styles.solutionAnswer}>
            {t("topik.hint.correctAnswer", {
              answer: t("topik.common.answerNumber", {
                number: solution.correctChoiceKey,
              }),
            })}
          </Text>
          <Text style={styles.solutionHeading}>{t("topik.hint.strategy")}</Text>
          <Text style={styles.solutionText}>
            {topikText(solution.solution.strategy, language)}
          </Text>
          {solution.solution.keyClues.map((clue) => (
            <View key={clue.key} style={styles.clue}>
              <Text style={styles.clueLabel}>{t("topik.hint.clue")}</Text>
              <Text style={styles.solutionText}>
                {topikText(clue.explanation, language)}
              </Text>
            </View>
          ))}
          <Text style={styles.solutionHeading}>{t("topik.hint.explanation")}</Text>
          <Text style={styles.solutionText}>
            {topikText(solution.solution.explanation, language)}
          </Text>
        </View>
      )}

      {!solution && support?.nextHint && (
        <Pressable
          disabled={busy}
          onPress={onRevealHint}
          style={({ pressed }) => [
            styles.hintButton,
            pressed && styles.pressed,
            busy && styles.disabled,
          ]}
        >
          <Text style={styles.hintButtonText}>
            {t("topik.hint.openNext", {
              level: support.nextHint.level,
              title: topikText(support.nextHint.title, language),
            })}
          </Text>
        </Pressable>
      )}

      {!solution && selected && (
        <Pressable
          disabled={busy}
          onPress={onRevealSolution}
          style={({ pressed }) => [
            styles.solutionButton,
            pressed && styles.pressed,
            busy && styles.disabled,
          ]}
        >
          <Text style={styles.solutionButtonText}>
            {t("topik.hint.revealSolution")}
          </Text>
        </Pressable>
      )}
      {!solution && !selected && (
        <Text style={styles.guideText}>{t("topik.hint.selectAnswerFirst")}</Text>
      )}
    </View>
  );
}

const getStyles = (palette: TopikPalette) => StyleSheet.create({
  panel: {
    gap: 13,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 16,
    backgroundColor: palette.surface,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eyebrow: {
    color: palette.primary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  title: { color: palette.text, fontSize: 14, fontWeight: "900", marginTop: 3 },
  count: { color: palette.primary, fontSize: 11, fontWeight: "800" },
  hintCard: {
    gap: 6,
    borderLeftWidth: 4,
    borderLeftColor: palette.warning,
    borderRadius: 10,
    backgroundColor: palette.surfaceElevated,
    padding: 14,
  },
  hintLevel: { color: palette.warning, fontSize: 11, fontWeight: "900" },
  hintTitle: { color: palette.text, fontSize: 14, fontWeight: "900" },
  hintContent: { color: palette.textSecondary, fontSize: 13, lineHeight: 20 },
  example: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: palette.warningSoft,
    borderRadius: 8,
    padding: 10,
  },
  exampleLabel: { color: palette.warning, fontSize: 11, fontWeight: "900" },
  exampleText: { flex: 1, color: palette.warningText, fontSize: 12, lineHeight: 18 },
  solutionCard: {
    gap: 8,
    borderRadius: 12,
    backgroundColor: palette.successSoft,
    padding: 15,
  },
  solutionResult: { color: palette.successText, fontSize: 16, fontWeight: "900" },
  solutionAnswer: { color: palette.successText, fontSize: 13, fontWeight: "800" },
  solutionHeading: {
    color: palette.successText,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 5,
  },
  solutionText: { color: palette.textSecondary, fontSize: 13, lineHeight: 20 },
  clue: { gap: 4, borderRadius: 8, backgroundColor: palette.warningSoft, padding: 11 },
  clueLabel: { color: palette.warningText, fontSize: 11, fontWeight: "900" },
  hintButton: { borderRadius: 11, backgroundColor: palette.primarySoft, padding: 14 },
  hintButtonText: {
    color: palette.primaryText,
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },
  solutionButton: { borderRadius: 11, backgroundColor: palette.primaryStrong, padding: 14 },
  solutionButtonText: {
    color: palette.white,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },
  guideText: { color: palette.textMuted, fontSize: 11, textAlign: "center" },
  pressed: { opacity: 0.76 },
  disabled: { opacity: 0.5 },
});
