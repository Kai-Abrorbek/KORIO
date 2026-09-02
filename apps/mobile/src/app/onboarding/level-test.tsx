import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { useSpeech } from "@/hooks/useSpeech";
import { ThemeColors } from "@/constants/theme";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useAuthStore } from "@/store/auth.store";
import { LessonService } from "@/services/lesson.service";
import { UserService } from "@/services/user.service";
import { onboardingService } from "@/services/onboarding.service";
import { AnswerState, LessonQuestion } from "@/types/lesson";
import { gradeAnswer } from "@/utils/answer-check";
import AnimatedProgressBar from "@/components/home/AnimatedProgressBar";
import SentenceBuilder from "@/components/lesson/questions/SentenceBuilder";
import TranslateBuilder from "@/components/lesson/questions/TranslateBuilder";
import WordArrange from "@/components/lesson/questions/WordArrange";
import Speaking from "@/components/lesson/questions/Speaking";
import ImageChoice from "@/components/lesson/questions/ImageChoice";
import DialogComplete from "@/components/lesson/questions/DialogComplete";
import TypeAnswer from "@/components/lesson/questions/TypeAnswer";
import WordMatching from "@/components/lesson/questions/WordMatching";
import {
  normalizeOnboardingPlacement,
  resolveOnboardingPlacement,
} from "@/utils/onboarding-placement";

const detectLevel = (score: number) =>
  score >= 90 ? "advanced" : score >= 60 ? "intermediate" : "beginner";

export default function LevelTestScreen() {
  const theme = useTheme();
  const levelTestSpeech = useSpeech();
  const prewarmSpeech = levelTestSpeech.prewarm;
  const s = getStyles(theme);

  const { setLevelTestResult, sessionId, selfReportedLevel } =
    useOnboardingStore();
  const isLoggedIn = useAuthStore((st) => st.isLoggedIn);
  const updateUser = useAuthStore((st) => st.updateUser);

  const [questions, setQuestions] = useState<LessonQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const locked = useRef(false);

  const correctCount = useRef(0);
  const wrongIds = useRef<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data =
          await LessonService.getLevelTestQuestions(selfReportedLevel);
        setQuestions(data);
      } catch (e) {
        console.error("레벨테스트 문제 로드 실패:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const q = questions[current];
  const isLast = current === questions.length - 1;

  useEffect(() => {
    const upcoming = questions
      .slice(current, current + 4)
      .map((question) => {
        if (question.type === "sentence_builder") {
          return question.audioText || question.answer;
        }
        if (question.type === "word_arrange") return question.answer;
        return "";
      })
      .filter(Boolean);
    if (upcoming.length > 0) prewarmSpeech(upcoming, "ko-KR");
  }, [current, prewarmSpeech, questions]);

  const goNext = () => {
    locked.current = false;
    if (isLast) finish();
    else setCurrent((i) => i + 1);
  };

  const handleAnswer = (answer: string) => {
    if (!q || locked.current) return;
    locked.current = true;

    const isCorrect = gradeAnswer(answer, q);

    if (isCorrect) correctCount.current += 1;
    else wrongIds.current.push(q.id);

    // 정답 공개 없이 살짝 텀만 주고 다음 (탭 피드백 정도)
    setTimeout(goNext, 280);
  };

  const handleSkip = () => {
    if (!q || locked.current) return;
    locked.current = true;
    wrongIds.current.push(q.id); // 스킵은 오답 처리
    setTimeout(goNext, 50);
  };

  const finish = async () => {
    const total = questions.length || 1;
    const correct = correctCount.current;
    const score = Math.round((correct / total) * 100);
    const detectedLevel = detectLevel(score);
    const wrongQuestionIds = wrongIds.current;
    let placement = resolveOnboardingPlacement(selfReportedLevel, score);

    try {
      setSubmitting(true);
      if (isLoggedIn) {
        const saved = await UserService.saveLevelTest({
          correctAnswers: correct,
          totalQuestions: total,
          score,
          wrongQuestionIds,
        });
        placement = normalizeOnboardingPlacement(saved, placement);
        updateUser({
          level: detectedLevel as any,
          isOnboardingCompleted: true,
          languageLevel: placement.placementLevel,
          hasPickedLevel: true,
        });
      } else {
        const saved = await onboardingService.saveLevelTest({
          sessionId,
          correctAnswers: correct,
          totalQuestions: total,
          score,
          wrongQuestionIds,
        });
        if (saved) {
          placement = normalizeOnboardingPlacement(saved, placement);
        }
      }
    } catch (e) {
      console.error("레벨테스트 저장 실패:", e);
      // 저장 실패해도 결과는 보여줌 (store 기반)
    } finally {
      setLevelTestResult({
        score,
        detectedLevel,
        correctAnswers: correct,
        totalQuestions: total,
        wrongQuestionIds,
        ...placement,
      });
      setSubmitting(false);
      router.replace("/onboarding/result");
    }
  };

  const renderQuestion = () => {
    if (!q) return null;
    const props = {
      question: q,
      answerState: "idle" as AnswerState,
      onAnswer: handleAnswer,
      theme,
      combo: 0,
    };
    switch (q.type) {
      case "sentence_builder":
        return <SentenceBuilder {...props} speech={levelTestSpeech} />;
      case "translate_builder":
        return <TranslateBuilder {...props} speech={levelTestSpeech} />;
      case "word_arrange":
        return <WordArrange {...props} speech={levelTestSpeech} />;
      case "speaking":
        return <Speaking {...props} onSkip={handleSkip} />;
      case "image_choice":
        return <ImageChoice {...props} />;
      case "dialog_complete":
        return <DialogComplete {...props} />;
      case "type_answer":
        return <TypeAnswer {...props} />;
      case "word_matching":
        return <WordMatching {...props} />;
      default:
        return <SentenceBuilder {...props} speech={levelTestSpeech} />;
    }
  };

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!q) {
    return (
      <View style={s.center}>
        <Text style={{ color: theme.text }}>문제를 불러올 수 없어요</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={12}
          style={s.closeBtn}
        >
          <Ionicons name="close" size={26} color={theme.textSecondary} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <AnimatedProgressBar current={current + 1} total={questions.length} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View key={current}>{renderQuestion()}</View>
      </ScrollView>

      {submitting && (
        <View style={s.submitOverlay}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      )}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    center: {
      flex: 1,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    closeBtn: { padding: 2 },
    submitOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0,0,0,0.15)",
      alignItems: "center",
      justifyContent: "center",
    },
  });
