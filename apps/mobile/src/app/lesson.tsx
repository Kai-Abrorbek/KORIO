import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useState, useEffect, useRef } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AnswerState, LessonQuestion, LessonSession } from "@/types/lesson";
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
import TranslateType from "@/components/lesson/questions/TranslateType";
import ListenType from "@/components/lesson/questions/ListenType";

export default function LessonScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<LessonSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [hearts, setHearts] = useState(3);
  const [combo, setCombo] = useState(0);
  const questionQueue = useRef<LessonQuestion[]>([]);
  const retryCount = useRef<Record<string, number>>({});
  const uniqueCorrect = useRef<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
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
      const data = lessonId
        ? await LessonService.getLessonById(lessonId)
        : MOCK_LESSON;
      setLesson(data);
      questionQueue.current = [...data.questions]; // 큐 초기화
    } catch (err) {
      console.error("레슨 로드 실패:", err);
      setLesson(MOCK_LESSON);
      questionQueue.current = [...MOCK_LESSON.questions];
    } finally {
      setLoading(false);
    }
  };

  const currentQ = questionQueue.current[0];

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
      if (!uniqueCorrect.current.has(currentQ.id)) {
        uniqueCorrect.current.add(currentQ.id);
        setProgress(
          uniqueCorrect.current.size / (lesson?.questions.length ?? 1),
        );
      }
      correctCount.current += 1;
      setCombo((c) => c + 1);
    } else {
      setCombo(0);

      const id = currentQ.id;
      retryCount.current[id] = (retryCount.current[id] ?? 0) + 1;

      if (retryCount.current[id] >= 3) {
        // 3번 틀리면 포기 → wrongIds에만 넣고 큐에 안 넣음
        if (!wrongIds.current.includes(id)) {
          wrongIds.current.push(id);
        }
      } else {
        // 큐 맨 끝에 추가
        questionQueue.current = [...questionQueue.current, currentQ];
      }
    }

    setAnswerState(isCorrect ? "correct" : "wrong");
  };

  const handleNext = async () => {
    if (!lesson) return;

    // 큐에서 현재 문제 제거
    const [, ...remaining] = questionQueue.current;
    questionQueue.current = remaining;

    if (questionQueue.current.length === 0) {
      // 큐 비었으면 종료 조건 체크
      const isCompleted = wrongIds.current.length <= 3;

      if (lessonId) {
        try {
          await LessonService.completeLesson(lessonId, {
            correctAnswers: correctCount.current,
            totalAnswers: totalCount.current,
            xpEarned: correctCount.current * 15,
            combo,
            speedSeconds: Math.round((Date.now() - startTime.current) / 1000),
            wrongQuestionIds: wrongIds.current,
            isCompleted,
          });
        } catch (err) {
          console.error("❌ 레슨 완료 저장 실패:", err);
        }
      }
      router.back();
      return;
    }

    // 다음 문제로
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
      combo,
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
      case "listen_type":
        return <ListenType {...props} onSkip={handleNext} />;
      case "translate_type":
        return <TranslateType {...props} />;
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
        progress={progress}
        total={lesson.questions.length}
        hearts={hearts}
        combo={combo}
        answerState={answerState}
        onClose={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        }}
        theme={theme}
      />

      {/* ScrollView 제거 → flex:1 View. 컴포넌트들의 바닥 고정이 살아남 */}
      <View style={[s.questionArea, { paddingBottom: insets.bottom }]}>
        {renderQuestion()}
      </View>

      <FeedbackBar
        state={answerState}
        explanation={currentQ.explanation}
        onNext={handleNext}
        theme={theme}
        combo={combo}
      />

      <ComboPopup combo={combo} />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    questionArea: { flex: 1 },
    loadingContainer: {
      flex: 1,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 30,
    },
  });
