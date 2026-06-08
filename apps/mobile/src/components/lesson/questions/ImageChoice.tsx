import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useState } from "react";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
}

export default function ImageChoice({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const [selected, setSelected] = useState<string | null>(null);

  const handleCheck = () => {
    if (!selected || answerState !== "idle") return;
    onAnswer(selected);
  };

  const getChipStyle = (opt: string) => {
    if (answerState !== "idle") {
      if (opt === question.answer) return [s.chip, s.chipCorrect];
      if (opt === selected) return [s.chip, s.chipWrong];
      return [s.chip];
    }
    return selected === opt ? [s.chip, s.chipSelected] : [s.chip];
  };

  const getTextStyle = (opt: string) => {
    if (answerState !== "idle") {
      if (opt === question.answer) return [s.chipText, { color: "#1CB454" }];
      if (opt === selected) return [s.chipText, { color: "#FF4B4B" }];
    }
    return [s.chipText];
  };

  return (
    <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
      <Text style={s.title}>{question.question}</Text>

      {question.imageUrl && (
        <View style={s.imageCard}>
          <Image
            source={{ uri: question.imageUrl }}
            style={s.image}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={s.sentenceRow}>
        <Text style={s.sentenceText}>
          {question.sentencePrefix}{" "}
          <Text
            style={[
              s.blank,
              answerState === "correct" && { color: "#1CB454" },
              answerState === "wrong" && { color: "#FF4B4B" },
            ]}
          >
            {selected ?? "_______"}
          </Text>
          {question.sentenceSuffix}
        </Text>
      </View>

      <View style={s.options}>
        {question.options?.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={getChipStyle(opt)}
            onPress={() => answerState === "idle" && setSelected(opt)}
          >
            <Text style={getTextStyle(opt)}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 확인 버튼 */}
      <TouchableOpacity
        style={[
          s.checkBtn,
          (!selected || answerState !== "idle") && s.checkBtnDisabled,
        ]}
        onPress={handleCheck}
        disabled={!selected || answerState !== "idle"}
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
      marginBottom: 20,
    },
    imageCard: {
      alignSelf: "center",
      width: 220,
      height: 180,
      borderRadius: 20,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      overflow: "hidden",
      marginBottom: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    image: { width: "100%", height: "100%" },
    sentenceRow: {
      marginBottom: 28,
      paddingBottom: 12,
      borderBottomWidth: 2,
      borderBottomColor: theme.border,
    },
    sentenceText: { fontSize: 20, color: theme.text, fontWeight: "500" },
    blank: {
      color: theme.primary,
      fontWeight: "800",
      textDecorationLine: "underline",
    },
    options: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 24,
    },
    chip: {
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 3,
      borderRadius: 12,
      paddingHorizontal: 18,
      paddingVertical: 12,
      backgroundColor: theme.surface,
    },
    chipSelected: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "20",
    },
    chipCorrect: { borderColor: "#1CB454", backgroundColor: "#D7F5E3" },
    chipWrong: { borderColor: "#FF4B4B", backgroundColor: "#FFEBEB" },
    chipText: { fontSize: 16, fontWeight: "700", color: theme.text },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
    },
    checkBtnDisabled: { backgroundColor: theme.border },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
