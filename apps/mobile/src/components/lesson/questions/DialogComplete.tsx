import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSpeech } from "@/hooks/useSpeech";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
}

export default function DialogComplete({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const [selected, setSelected] = useState<string | null>(null);
  const { speak, isSpeaking } = useSpeech();

  const handleCheck = () => {
    if (!selected || answerState !== "idle") return;
    onAnswer(selected);
  };

  return (
    <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
      <Text style={s.title}>{question.question}</Text>

      {question.dialogLines?.map((line, i) => (
        <Animated.View
          key={i}
          entering={FadeInRight.delay(i * 100).duration(400)}
          style={s.npcRow}
        >
          <View style={s.avatar}>
            <Text style={{ fontSize: 28 }}>👨</Text>
          </View>
          <View style={s.npcBubble}>
            <TouchableOpacity onPress={() => speak(line.text)}>
              <Ionicons
                name="volume-high"
                size={18}
                color={isSpeaking ? theme.primary : "#58CC02"}
              />
            </TouchableOpacity>
            <Text style={s.npcText}>{line.text}</Text>
          </View>
        </Animated.View>
      ))}

      {/* 유저 응답 말풍선 */}
      <View style={s.userRow}>
        <View style={[s.userBubble, !selected && s.emptyBubble]}>
          <Text style={selected ? s.userText : s.emptyText}>
            {selected ?? "— — —"}
          </Text>
        </View>
        <View style={s.avatar}>
          <Text style={{ fontSize: 28 }}>👩</Text>
        </View>
      </View>

      {/* 선택지 */}
      <View style={s.options}>
        {question.options?.map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = answerState !== "idle" && opt === question.answer;
          const isWrong =
            answerState !== "idle" &&
            opt === selected &&
            opt !== question.answer;
          return (
            <TouchableOpacity
              key={opt}
              style={[
                s.option,
                isSelected && s.optionSelected,
                isCorrect && s.optionCorrect,
                isWrong && s.optionWrong,
              ]}
              onPress={() => answerState === "idle" && setSelected(opt)}
            >
              <Text
                style={[
                  s.optionText,
                  isCorrect && { color: "#1CB454" },
                  isWrong && { color: "#FF4B4B" },
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
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
      marginBottom: 24,
    },
    npcRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 10,
      marginBottom: 16,
    },
    userRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 10,
      marginBottom: 20,
      justifyContent: "flex-end",
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    npcBubble: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderTopLeftRadius: 4,
      padding: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
      maxWidth: "75%",
    },
    userBubble: {
      backgroundColor: theme.primary + "20",
      borderRadius: 16,
      borderTopRightRadius: 4,
      padding: 14,
      borderWidth: 1.5,
      borderColor: theme.primary + "40",
      maxWidth: "75%",
    },
    emptyBubble: { minWidth: 100, minHeight: 48, justifyContent: "center" },
    npcText: {
      fontSize: 15,
      color: theme.text,
      fontWeight: "500",
      lineHeight: 22,
    },
    userText: { fontSize: 15, color: theme.primary, fontWeight: "600" },
    emptyText: { fontSize: 15, color: theme.textSecondary },
    options: { gap: 12, marginBottom: 24 },
    option: {
      borderWidth: 1.5,
      borderColor: theme.border,
      borderRadius: 14,
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: theme.surface,
    },
    optionSelected: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "12",
    },
    optionCorrect: { borderColor: "#1CB454", backgroundColor: "#D7F5E3" },
    optionWrong: { borderColor: "#FF4B4B", backgroundColor: "#FFEBEB" },
    optionText: { fontSize: 16, fontWeight: "600", color: theme.text },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
    },
    checkBtnDisabled: { backgroundColor: theme.border },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
