import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useEffect, useState } from "react";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
}

type MatchResult = { ko: string; native: string; correct: boolean };

export default function WordMatching({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const pairs = question.pairs ?? [];
  const [selectedKo, setSelectedKo] = useState<string | null>(null);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [matched, setMatched] = useState<MatchResult[]>([]);
  const [shuffledNative] = useState(() =>
    [...pairs].map((p) => p.native).sort(() => Math.random() - 0.5),
  );

  useEffect(() => {
    if (!selectedKo || !selectedEn) return;
    const pair = pairs.find((p) => p.korean === selectedKo);
    const correct = pair?.native === selectedEn;
    const newMatched = [
      ...matched,
      { ko: selectedKo, native: selectedEn, correct },
    ];
    setMatched(newMatched);
    setSelectedKo(null);
    setSelectedEn(null);

    if (newMatched.length === pairs.length) {
      const allCorrect = newMatched.every((m) => m.correct);
      onAnswer(allCorrect ? "all_correct" : "some_wrong");
    }
  }, [selectedKo, selectedEn]);

  const getKoStyle = (ko: string) => {
    const m = matched.find((m) => m.ko === ko);
    if (m) return m.correct ? [s.chip, s.chipCorrect] : [s.chip, s.chipWrong];
    if (selectedKo === ko) return [s.chip, s.chipSelected];
    return [s.chip];
  };
  const getEnStyle = (en: string) => {
    const m = matched.find((m) => m.native === en);
    if (m) return m.correct ? [s.chip, s.chipCorrect] : [s.chip, s.chipWrong];
    if (selectedEn === en) return [s.chip, s.chipSelected];
    return [s.chip];
  };

  const isKoMatched = (ko: string) => matched.some((m) => m.ko === ko);
  const isEnMatched = (en: string) => matched.some((m) => m.native === en);

  return (
    <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
      <Text style={s.title}>{question.question}</Text>
      <Text style={s.sub}>{t("lesson.matchPairs")}</Text>

      <View style={s.grid}>
        <View style={s.col}>
          {pairs.map((p) => (
            <TouchableOpacity
              key={p.korean}
              style={getKoStyle(p.korean)}
              onPress={() =>
                !isKoMatched(p.korean) &&
                setSelectedKo((prev) => (prev === p.korean ? null : p.korean))
              }
            >
              <Text style={s.chipText}>{p.korean}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.col}>
          {shuffledNative.map((en) => (
            <TouchableOpacity
              key={en}
              style={getEnStyle(en)}
              onPress={() =>
                !isEnMatched(en) &&
                setSelectedEn((prev) => (prev === en ? null : en))
              }
            >
              <Text style={s.chipText}>{en}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={s.progress}>
        {matched.filter((m) => m.correct).length}/{pairs.length}{" "}
        {t("lesson.matched")}
      </Text>
    </Animated.View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 4,
    },
    sub: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 28,
      fontWeight: "500",
    },
    grid: { flexDirection: "row", gap: 12 },
    col: { flex: 1, gap: 12 },
    chip: {
      padding: 16,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 56,
    },
    chipSelected: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "20",
    },
    chipCorrect: { borderColor: "#1CB454", backgroundColor: "#D7F5E3" },
    chipWrong: { borderColor: "#FF4B4B", backgroundColor: "#FFEBEB" },
    chipText: { fontSize: 16, fontWeight: "700", color: "#333" },
    progress: {
      marginTop: 24,
      textAlign: "center",
      color: theme.textSecondary,
      fontWeight: "600",
      fontSize: 14,
    },
  });
