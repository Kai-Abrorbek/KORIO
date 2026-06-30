import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useSpeech } from "@/hooks/useSpeech";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
}

export default function FillInBlank({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const { speak } = useSpeech();
  const [selected, setSelected] = useState<string | null>(null);
  const locked = answerState !== "idle";

  const options = question.options ?? [];
  const prefix = question.sentencePrefix ?? "";
  const suffix = question.sentenceSuffix ?? "";

  const blankColor =
    answerState === "correct"
      ? "#1CB454"
      : answerState === "wrong"
        ? "#FF4B4B"
        : theme.primary;

  const check = () => {
    if (!selected || locked) return;
    onAnswer(selected);
  };

  return (
    <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
      <Text style={s.title}>{t("lesson.fillBlank")}</Text>

      {/* 문장 + 빈칸 */}
      <View style={s.sentenceBox}>
        <View style={s.sentenceRow}>
          {prefix ? <Text style={s.sentence}>{prefix} </Text> : null}
          <View style={[s.blank, { borderColor: blankColor }]}>
            <Text
              style={[
                s.blankText,
                { color: selected ? theme.text : "transparent" },
              ]}
            >
              {selected ?? "____"}
            </Text>
          </View>
          {suffix ? <Text style={s.sentence}> {suffix}</Text> : null}
        </View>
        {question.answer ? (
          <TouchableOpacity
            onPress={() => speak(question.answer)}
            hitSlop={10}
            style={s.speak}
          >
            <Ionicons name="volume-medium" size={22} color="#4A90D9" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* 선택지 */}
      <View style={s.optionsRow}>
        {options.map((opt) => {
          const isSel = selected === opt;
          return (
            <TouchableOpacity
              key={opt}
              disabled={locked}
              onPress={() => setSelected(isSel ? null : opt)}
              style={[
                s.option,
                isSel && {
                  borderColor: theme.primary,
                  backgroundColor: theme.primary + "14",
                },
              ]}
            >
              <Text style={[s.optionText, isSel && { color: theme.primary }]}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[s.checkBtn, (!selected || locked) && s.checkBtnDisabled]}
        onPress={check}
        disabled={!selected || locked}
      >
        <Text style={s.checkBtnText}>{t("lesson.check")}</Text>
      </TouchableOpacity>
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
      marginBottom: 28,
    },
    sentenceBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderRadius: 16,
      padding: 20,
      marginBottom: 36,
    },
    sentenceRow: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
    sentence: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.text,
      lineHeight: 36,
    },
    blank: {
      minWidth: 80,
      borderBottomWidth: 3,
      alignItems: "center",
      paddingHorizontal: 8,
      paddingBottom: 2,
    },
    blankText: { fontSize: 22, fontWeight: "800" },
    speak: { padding: 4 },
    optionsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 24,
    },
    option: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 20,
    },
    optionText: { fontSize: 18, fontWeight: "800", color: theme.text },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: "auto",
    },
    checkBtnDisabled: { backgroundColor: theme.border },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
