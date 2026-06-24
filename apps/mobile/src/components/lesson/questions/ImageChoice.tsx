import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState, ImageChoiceOption } from "@/types/lesson";
import { useState } from "react";
import { useSpeech } from "@/hooks/useSpeech";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const s = getStyles(theme);
  const [selected, setSelected] = useState<string | null>(null);
  const { speak } = useSpeech();
  const insets = useSafeAreaInsets();

  const choices: ImageChoiceOption[] = question.choices?.length
    ? question.choices
    : (question.options?.map((opt) => ({
        text: opt,
        label: opt,
        emoji: "❓",
      })) ?? []);

  const handleSelect = (text: string) => {
    if (answerState !== "idle") return;
    setSelected(text);
    speak(text);
  };

  const handleCheck = () => {
    if (!selected || answerState !== "idle") return;
    onAnswer(selected);
  };

  const getCardStyle = (text: string) => {
    if (answerState !== "idle") {
      if (text === question.answer) return [s.card, s.cardCorrect];
      if (text === selected) return [s.card, s.cardWrong];
      return [s.card, s.cardDim];
    }
    return selected === text ? [s.card, s.cardSelected] : [s.card];
  };

  const getLabelStyle = (text: string) => {
    if (answerState !== "idle") {
      if (text === question.answer) return [s.label, { color: "#1CB454" }];
      if (text === selected) return [s.label, { color: "#FF4B4B" }];
      return [s.label, { color: theme.textSecondary }];
    }
    return selected === text ? [s.label, { color: theme.primary }] : [s.label];
  };

  return (
    <Animated.View entering={FadeInDown.duration(350)} style={s.container}>
      {/* NEW WORD 뱃지 */}
      <View style={s.badge}>
        <Ionicons name="star" size={13} color={theme.primary} />
        <Text style={s.badgeText}>{t("lesson.newWord")}</Text>
      </View>

      {/* 지시문 */}
      <Text style={s.title}>{t("lesson.selectCorrectImage")}</Text>

      {/* TTS + 단어 */}
      <View style={s.wordRow}>
        <TouchableOpacity
          style={s.ttsBtn}
          onPress={() => speak(question.answer)}
          activeOpacity={0.8}
        >
          <Ionicons name="volume-high" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={s.wordText}>{question.answer}</Text>
      </View>

      {/* 2×2 이미지 그리드 */}
      <View style={s.grid}>
        {choices.map((choice, i) => (
          <Animated.View
            key={choice.text}
            entering={ZoomIn.delay(i * 60).duration(280)}
            style={s.cardWrap}
          >
            <TouchableOpacity
              style={getCardStyle(choice.text)}
              onPress={() => handleSelect(choice.text)}
              activeOpacity={0.85}
            >
              {/* 정답 체크 표시 */}
              {answerState !== "idle" && choice.text === question.answer && (
                <View style={s.checkMark}>
                  <Ionicons name="checkmark-circle" size={22} color="#1CB454" />
                </View>
              )}
              {/* 오답 X 표시 */}
              {answerState !== "idle" &&
                choice.text === selected &&
                choice.text !== question.answer && (
                  <View style={s.checkMark}>
                    <Ionicons name="close-circle" size={22} color="#FF4B4B" />
                  </View>
                )}

              {/* 이모지 or 이미지 */}
              <Text style={s.emoji}>{choice.emoji ?? "🖼️"}</Text>

              {/* 라벨 */}
              <Text style={getLabelStyle(choice.text)}>{choice.label}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <View style={{ flex: 1 }} />
      {/* 확인 버튼 */}
      <View>
        <TouchableOpacity
          style={[
            s.checkBtn,
            (!selected || answerState !== "idle") && s.checkBtnDisabled,
          ]}
          onPress={handleCheck}
          disabled={!selected || answerState !== "idle"}
          activeOpacity={0.85}
        >
          <Text
            style={[
              s.checkBtnText,
              (!selected || answerState !== "idle") && s.checkBtnTextDisabled,
            ]}
          >
            {t("lesson.check")}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      marginBottom: 40,
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginBottom: 12,
    },
    badgeText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.primary,
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 20,
    },
    wordRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 28,
    },
    ttsBtn: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    wordText: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.text,
      textDecorationLine: "underline",
      textDecorationStyle: "dotted",
      textDecorationColor: theme.primary,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    cardWrap: {
      width: "47.5%",
    },
    card: {
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 16,
      paddingVertical: 20,
      paddingHorizontal: 12,
      alignItems: "center",
      backgroundColor: theme.surface,
      gap: 10,
      position: "relative",
    },
    cardSelected: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "15",
    },
    cardCorrect: {
      borderColor: "#1CB454",
      backgroundColor: "#D7F5E3",
    },
    cardWrong: {
      borderColor: "#FF4B4B",
      backgroundColor: "#FFEBEB",
    },
    cardDim: {
      opacity: 0.45,
    },
    checkMark: {
      position: "absolute",
      top: 8,
      right: 8,
    },
    emoji: {
      fontSize: 52,
    },
    label: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.text,
      textAlign: "center",
    },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      borderBottomWidth: 4,
      borderColor: theme.primary + "99",
      paddingVertical: 16,
      alignItems: "center",
    },
    checkBtnDisabled: {
      backgroundColor: theme.border,
      borderColor: theme.border,
    },
    checkBtnText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
    checkBtnTextDisabled: {
      color: theme.textSecondary,
    },
  });
