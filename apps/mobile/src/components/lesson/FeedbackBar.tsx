import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { ThemeColors } from "@/constants/theme";
import { AnswerState } from "@/types/lesson";
import OwlMascot, { OwlState } from "@/components/lesson/OwlMascot";

interface Props {
  state: AnswerState;
  explanation?: string;
  onNext: () => void;
  theme: ThemeColors;
  combo?: number;
}

export default function FeedbackBar({
  state,
  explanation,
  onNext,
  theme,
  combo = 0,
}: Props) {
  const { t } = useTranslation();
  const owlScale = useSharedValue(0);
  const owlRotate = useSharedValue(-20);

  const isCorrect = state === "correct";

  // 올빼미 상태 계산
  const owlState: OwlState =
    isCorrect && combo >= 3
      ? "combo"
      : isCorrect
        ? "correct"
        : state === "wrong"
          ? "wrong"
          : "idle";

  useEffect(() => {
    if (state !== "idle") {
      // 바 등장 후 살짝 딜레이 두고 owl이 통! 등장
      owlScale.value = withDelay(
        180,
        withSpring(1, { damping: 7, stiffness: 220 }),
      );
      owlRotate.value = withDelay(
        180,
        withSpring(0, { damping: 9, stiffness: 200 }),
      );
    } else {
      owlScale.value = 0;
      owlRotate.value = -20;
    }
  }, [state]);

  const owlAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: owlScale.value }, { rotate: `${owlRotate.value}deg` }],
  }));

  if (state === "idle") return null;

  const bg = isCorrect ? "#D7F5E3" : "#FFEBEB";
  const accent = isCorrect ? "#1CB454" : "#FF4B4B";
  const label = isCorrect ? t("lesson.correct") : t("lesson.wrong");

  return (
    <Animated.View
      entering={FadeInDown.duration(300).springify()}
      exiting={FadeOutDown.duration(200)}
      style={[s.container, { backgroundColor: bg }]}
    >
      <View style={s.contentRow}>
        <Animated.View style={[s.owlWrap, owlAnimStyle]}>
          <OwlMascot state={owlState} size={72} />
        </Animated.View>

        <View style={s.textArea}>
          <View style={s.labelRow}>
            <Ionicons
              name={isCorrect ? "checkmark-circle" : "close-circle"}
              size={22}
              color={accent}
            />
            <Text style={[s.label, { color: accent }]}>{label}</Text>
          </View>
          {!!explanation && (
            <View style={s.answerRow}>
              <Text
                style={[
                  s.answerLabel,
                  { color: isCorrect ? "#1CB454" : "#888" },
                ]}
              >
                {isCorrect ? t("lesson.meaning") : t("lesson.correctAnswer")}
              </Text>
              <Text
                style={[
                  s.answerText,
                  { color: isCorrect ? "#1CB454" : "#333" },
                ]}
              >
                {explanation}
              </Text>
            </View>
          )}
        </View>
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
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  owlWrap: {
    width: 72,
    height: 72,
  },
  textArea: {
    flex: 1,
    gap: 6,
  },
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
