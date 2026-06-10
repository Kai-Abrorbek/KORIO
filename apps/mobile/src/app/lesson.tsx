import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useState, useEffect, useRef } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AnswerState, LessonSession } from "@/types/lesson";
import { LessonService } from "@/services/lesson.service";
import { MOCK_LESSON } from "@/mocks/lesson.mock";
import LessonHeader from "@/components/lesson/LessonHeader";
import FeedbackBar from "@/components/lesson/FeedbackBar";
import ComboPopup from "@/components/lesson/ComboPopup";
import SentenceBuilder from "@/components/lesson/questions/SentenceBuilder";
import WordArrange from "@/components/lesson/questions/WordArrange";
import Speaking from "@/components/lesson/questions/Speaking";
import ImageChoice from "@/components/lesson/questions/ImageChoice";
import DialogComplete from "@/components/lesson/questions/DialogComplete";
import TypeAnswer from "@/components/lesson/questions/TypeAnswer";
import WordMatching from "@/components/lesson/questions/WordMatching";
import TranslateBuilder from "@/components/lesson/questions/TranslateBuilder";

export default function LessonScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const router = useRouter();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<LessonSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [hearts, setHearts] = useState(3);
  const [combo, setCombo] = useState(0);
  const startTime = useRef(Date.now());
  const wrongIds = useRef<string[]>([]);
  const correctCount = useRef(0);
  const totalCount = useRef(0);

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  const loadLesson = async () => {
    try {
      setLoading(true);
      if (lessonId) {
        // 실제 API
        const data = await LessonService.getLessonById(lessonId);
        setLesson(data);
      } else {
        // lessonId 없으면 mock (개발용)
        setLesson(MOCK_LESSON);
      }
    } catch (err) {
      console.error("레슨 로드 실패:", err);
      // API 실패 시 mock으로 fallback
      setLesson(MOCK_LESSON);
    } finally {
      setLoading(false);
    }
  };

  const currentQ = lesson?.questions[currentIdx];

  const handleAnswer = (answer: string) => {
    if (!currentQ) return;
    let isCorrect = false;

    if (currentQ.type === "word_matching") {
      isCorrect = answer === "all_correct";
    } else if (currentQ.type === "speaking") {
      isCorrect = true;
    } else {
      isCorrect =
        answer.trim().toLowerCase() === currentQ.answer.trim().toLowerCase();
    }

    totalCount.current += 1;
    if (isCorrect) {
      correctCount.current += 1;
      setCombo((c) => c + 1);
    } else {
      setCombo(0);
      setHearts((h) => Math.max(0, h - 1));
      wrongIds.current.push(currentQ.id);
    }

    setAnswerState(isCorrect ? "correct" : "wrong");
  };

  const handleNext = async () => {
    if (!lesson) return;

    if (currentIdx + 1 >= lesson.questions.length) {
      // 레슨 완료 → 백엔드에 저장
      if (lessonId) {
        try {
          await LessonService.completeLesson(lessonId, {
            correctAnswers: correctCount.current,
            totalAnswers: totalCount.current,
            xpEarned: correctCount.current * 15,
            combo,
            speedSeconds: Math.round((Date.now() - startTime.current) / 1000),
            wrongQuestionIds: wrongIds.current,
            isCompleted: hearts > 0,
          });
        } catch (err) {
          console.error("레슨 완료 저장 실패:", err);
        }
      }
      router.back();
      return;
    }

    setCurrentIdx((i) => i + 1);
    setAnswerState("idle");
  };

  const renderQuestion = () => {
    if (!currentQ) return null;
    const props = {
      question: currentQ,
      answerState,
      onAnswer: handleAnswer,
      theme,
    };
    switch (currentQ.type) {
      case "sentence_builder":
        return <SentenceBuilder {...props} />;
      case "translate_builder":
        return <TranslateBuilder {...props} />;
      case "word_arrange":
        return <WordArrange {...props} />;
      case "speaking":
        return <Speaking {...props} onSkip={handleNext} />;
      case "image_choice":
        return <ImageChoice {...props} />;
      case "dialog_complete":
        return <DialogComplete {...props} />;
      case "type_answer":
        return <TypeAnswer {...props} />;
      case "word_matching":
        return <WordMatching {...props} />;
      default:
        return <SentenceBuilder {...props} />;
    }
  };

  if (loading) {
    return (
      <View style={s.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!lesson || !currentQ) {
    return (
      <View style={s.loadingContainer}>
        <Text style={{ color: theme.text }}>레슨을 불러올 수 없어요</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <LessonHeader
        current={currentIdx + 1}
        total={lesson.questions.length}
        hearts={hearts}
        combo={combo}
        onClose={() => router.back()}
        theme={theme}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: answerState !== "idle" ? 180 : 40,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderQuestion()}
      </ScrollView>

      <FeedbackBar
        state={answerState}
        explanation={currentQ.explanation}
        onNext={handleNext}
        theme={theme}
      />

      <ComboPopup combo={combo} />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    loadingContainer: {
      flex: 1,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 30,
    },
  });
