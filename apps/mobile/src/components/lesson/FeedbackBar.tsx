import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { AnswerState } from "@/types/lesson";

interface Props {
  state: AnswerState;
  explanation?: string;
  onNext: () => void;
  theme: ThemeColors;
}

export default function FeedbackBar({
  state,
  explanation,
  onNext,
  theme,
}: Props) {
  const { t } = useTranslation();
  if (state === "idle") return null;

  const isCorrect = state === "correct";
  const bg = isCorrect ? "#D7F5E3" : "#FFEBEB";
  const accent = isCorrect ? "#1CB454" : "#FF4B4B";
  const label = isCorrect ? t("lesson.correct") : t("lesson.wrong");

  return (
    <Animated.View
      entering={FadeInDown.duration(300).springify()}
      exiting={FadeOutDown.duration(200)}
      style={[s.container, { backgroundColor: bg }]}
    >
      <View style={s.top}>
        <View style={s.labelRow}>
          <Ionicons
            name={isCorrect ? "checkmark-circle" : "close-circle"}
            size={24}
            color={accent}
          />
          <Text style={[s.label, { color: accent }]}>{label}</Text>
        </View>
        {!isCorrect && explanation && (
          <View style={s.answerRow}>
            <Text style={s.answerLabel}>{t("lesson.correctAnswer")}:</Text>
            <Text style={s.answerText}>{explanation}</Text>
          </View>
        )}
        {isCorrect && explanation && (
          <View style={s.answerRow}>
            <Text style={[s.answerLabel, { color: "#1CB454" }]}>
              {t("lesson.meaning")}:
            </Text>
            <Text style={[s.answerText, { color: "#1CB454" }]}>
              {explanation}
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={[s.btn, { backgroundColor: accent }]}
        onPress={onNext}
        activeOpacity={0.85}
      >
        <Text style={s.btnText}>{t("lesson.next")}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 44,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: 16,
  },
  top: { gap: 8 },
  labelRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  label: { fontSize: 20, fontWeight: "800" },
  answerRow: { gap: 2 },
  answerLabel: { fontSize: 13, fontWeight: "700", color: "#888" },
  answerText: { fontSize: 16, fontWeight: "600", color: "#333" },
  btn: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
});
