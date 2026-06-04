import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useOnboardingStore } from "@/store/onboarding.store";
import { StyleSheet } from "react-native";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";

const questions = [
  {
    id: "1",
    level: "1",
    question: "안녕하세요 뜻은?",
    options: ["Hello", "Goodbye", "Thank you", "Sorry"],
    answer: 0,
  },
  {
    id: "2",
    level: "1",
    question: "감사합니다 뜻은?",
    options: ["Sorry", "Thank you", "Hello", "Bye"],
    answer: 1,
  },
  {
    id: "3",
    level: "2",
    question: "저는 학생이에요. 뜻은?",
    options: [
      "I am a teacher",
      "I am a student",
      "I am a doctor",
      "I am hungry",
    ],
    answer: 1,
  },
  {
    id: "4",
    level: "2",
    question: "어디에 가요? 뜻은?",
    options: [
      "What are you doing?",
      "Where are you going?",
      "Who are you?",
      "When is it?",
    ],
    answer: 1,
  },
  {
    id: "5",
    level: "3",
    question: "밥을 먹었어요 뜻은?",
    options: ["I will eat", "I am eating", "I ate", "I cook"],
    answer: 2,
  },
  {
    id: "6",
    level: "3",
    question: "한국어를 공부해요 뜻은?",
    options: [
      "I study Korean",
      "I like Korea",
      "I speak Korean",
      "I teach Korean",
    ],
    answer: 0,
  },
  {
    id: "7",
    level: "4",
    question: "이 영화가 재미있을 것 같아요 뜻은?",
    options: [
      "This movie is fun",
      "This movie seems fun",
      "I watched this movie",
      "I like movies",
    ],
    answer: 1,
  },
  {
    id: "8",
    level: "4",
    question: "비가 올 것 같아요 뜻은?",
    options: [
      "It rained",
      "It is raining",
      "It looks like it will rain",
      "I like rain",
    ],
    answer: 2,
  },
  {
    id: "9",
    level: "5",
    question: "그 일이 생각보다 어려웠어요 뜻은?",
    options: [
      "The work was harder than expected",
      "The work was easy",
      "I thought about work",
      "Work is important",
    ],
    answer: 0,
  },
  {
    id: "10",
    level: "6",
    question: "아무리 노력해도 안 되는 일이 있어요 뜻은?",
    options: [
      "Hard work always pays off",
      "Some things cannot be done no matter how hard you try",
      "I tried hard",
      "Nothing is impossible",
    ],
    answer: 1,
  },
];

export default function LevelTestScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { setLevelTestResult } = useOnboardingStore();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);

  const q = questions[current];
  const isLast = current === questions.length - 1;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === q.answer) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongIds((prev) => [...prev, q.id]);
    }
  };

  const handleNext = () => {
    if (isLast) {
      const score = Math.round((correctCount / questions.length) * 100);
      setLevelTestResult({
        score,
        detectedLevel:
          score >= 90 ? "advanced" : score >= 60 ? "intermediate" : "beginner",
        correctAnswers: correctCount,
        wrongQuestionIds: wrongIds,
      });
      router.replace("/onboarding/result");
    } else {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const getOptionStyle = (index: number) => {
    if (!answered) return styles.option;
    if (index === q.answer) return [styles.option, styles.optionCorrect];
    if (index === selected) return [styles.option, styles.optionWrong];
    return styles.option;
  };

  const getOptionTextStyle = (index: number) => {
    if (!answered) return styles.optionText;
    if (index === q.answer)
      return [styles.optionText, styles.optionTextCorrect];
    if (index === selected) return [styles.optionText, styles.optionTextWrong];
    return styles.optionText;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AnimatedProgressBar current={current + 1} total={questions.length} />
      </View>

      <View style={styles.content}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>Level {q.level}</Text>
        </View>

        <Text style={styles.question}>{q.question}</Text>

        <View style={styles.options}>
          {q.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={getOptionStyle(index)}
              onPress={() => handleSelect(index)}
              disabled={answered}
            >
              <View style={styles.optionLabel}>
                <Text style={styles.optionLabelText}>
                  {["A", "B", "C", "D"][index]}
                </Text>
              </View>
              <Text style={getOptionTextStyle(index)}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {answered && (
        <View style={styles.footer}>
          <View
            style={[
              styles.feedbackCard,
              selected === q.answer
                ? styles.feedbackCorrect
                : styles.feedbackWrong,
            ]}
          >
            <Ionicons
              name={selected === q.answer ? "checkmark-circle" : "close-circle"}
              size={24}
              color={selected === q.answer ? "#1D9E75" : "#E24B4A"}
            />
            <Text
              style={[
                styles.feedbackText,
                selected === q.answer
                  ? styles.feedbackTextCorrect
                  : styles.feedbackTextWrong,
              ]}
            >
              {selected === q.answer ? "정답!" : "틀렸어요"}
            </Text>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {isLast ? t("onboarding.result.startLearning") : t("common.next")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      marginBottom: 20,
    },
    header: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    progressContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    progressTrack: {
      flex: 1,
      height: 28,
      backgroundColor: "rgba(119, 110, 226, 0.15)",
      borderRadius: 999,
      overflow: "visible",
      justifyContent: "center",
      position: "relative",
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.primary,
      borderRadius: 999,
    },
    progressStar: {
      position: "absolute",
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: -14,
      top: 0,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 6,
    },
    progressText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.text,
      minWidth: 36,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    levelBadge: {
      backgroundColor: theme.primary + "20",
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 4,
      alignSelf: "flex-start",
      marginBottom: 16,
    },
    levelBadgeText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.primary,
    },
    question: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 32,
      lineHeight: 32,
    },
    options: {
      gap: 12,
    },
    option: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderWidth: 2,
      borderColor: "transparent",
      shadowColor: "#1A1A2E",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    },
    optionCorrect: {
      borderColor: "#1D9E75",
      backgroundColor: "#E3F8EC",
    },
    optionWrong: {
      borderColor: "#E24B4A",
      backgroundColor: "#FFE5EC",
    },
    optionLabel: {
      width: 32,
      height: 32,
      borderRadius: 999,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    optionLabelText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    optionText: {
      fontSize: 15,
      fontWeight: "500",
      color: theme.text,
      flex: 1,
    },
    optionTextCorrect: {
      color: "#1D9E75",
    },
    optionTextWrong: {
      color: "#E24B4A",
    },
    footer: {
      padding: 24,
      paddingBottom: 40,
      gap: 12,
    },
    feedbackCard: {
      borderRadius: 14,
      padding: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    feedbackCorrect: {
      backgroundColor: "#E3F8EC",
    },
    feedbackWrong: {
      backgroundColor: "#FFE5EC",
    },
    feedbackText: {
      fontSize: 15,
      fontWeight: "600",
    },
    feedbackTextCorrect: {
      color: "#1D9E75",
    },
    feedbackTextWrong: {
      color: "#E24B4A",
    },
    nextButton: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      padding: 16,
      alignItems: "center",
    },
    nextButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
