import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";
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
import BoriMascot from "@/components/home/BoriMascot";
import SentenceBuilder from "@/components/lesson/questions/SentenceBuilder";
import WordArrange from "@/components/lesson/questions/WordArrange";
import Speaking from "@/components/lesson/questions/Speaking";
import ImageChoice from "@/components/lesson/questions/ImageChoice";
import DialogComplete from "@/components/lesson/questions/DialogComplete";
import TypeAnswer from "@/components/lesson/questions/TypeAnswer";
import WordMatching from "@/components/lesson/questions/WordMatching";
import TranslateBuilder from "@/components/lesson/questions/TranslateBuilder";
import { useAuthStore } from "@/store/auth.store";
import { useOnboardingStore } from "@/store/onboarding.store";
import { UserService } from "@/services/user.service";
import { onboardingService } from "@/services/onboarding.service";
import Listening from "@/components/lesson/questions/Listening";
import ListenType from "@/components/lesson/questions/ListenType";
import FillInBlank from "@/components/lesson/questions/FillInBlank";
import TranslateType from "@/components/lesson/questions/TranslateType";
import AudioMatch from "@/components/lesson/questions/AudioMatch";
import ListenFill from "@/components/lesson/questions/ListenFill";
import { useEnergyStore } from "@/store/energy.store";
import { EnergyService } from "@/services/energy.service";
import QuitLessonModal from "@/components/lesson/QuitLessonModal";
import LegendHeader from "@/components/lesson/LegendHeader";

type Phase = "main" | "reviewIntro" | "review";
const LEGEND_SEGMENTS = [5, 7, 10];
const LEGEND_TOTAL = LEGEND_SEGMENTS.reduce((a, b) => a + b, 0); // 22
const LEGEND_DURATION = 120; // 2분
const LEGEND_XP = 40;

export default function LessonScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lessonId, mode, nodeId, section, unit } = useLocalSearchParams<{
    lessonId?: string;
    mode?: string;
    nodeId?: string;
    section?: string;
    unit?: string;
  }>();
  const isLevelTest = mode === "levelTest";
  const isWordPractice = mode === "wordPractice";
  const isReview = mode === "review";
  const isNodeReview = mode === "nodeReview";
  const isJumpTest = mode === "jumpTest";
  const isLegend = mode === "legend";
  const { setLevelTestResult, sessionId } = useOnboardingStore();
  const isLoggedIn = useAuthStore((st) => st.isLoggedIn);
  const updateUser = useAuthStore((st) => st.updateUser);
  const locked = useRef(false);
  const [lesson, setLesson] = useState<LessonSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const userEnergy = useAuthStore((st) => st.user?.energy ?? 25);
  const [energy, setEnergy] = useState(userEnergy);
  const openEnergyModal = useEnergyStore((s) => s.openEnergyModal);
  const [combo, setCombo] = useState(0);
  const [phase, setPhase] = useState<Phase>("main");
  const [showCombo, setShowCombo] = useState<boolean>(false);
  const reviewTotal = useRef(0);
  const reviewCorrectIds = useRef<Set<string>>(new Set());
  const questionQueue = useRef<LessonQuestion[]>([]); // 현재 푸는 큐 (main → review)
  const reviewQueue = useRef<LessonQuestion[]>([]); // 1단계서 틀린 문제 모음
  const finalWrongIds = useRef<Set<string>>(new Set()); // 최종 못 맞춘 ID (서버 저장용)
  const uniqueCorrect = useRef<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  const startTime = useRef(Date.now());
  const correctCount = useRef(0);
  const totalCount = useRef(0);
  const wrongIds = useRef<string[]>([]);
  const [showQuit, setShowQuit] = useState(false);
  const isSuper = useAuthStore((st) => st.user?.isSuper ?? false);
  const [hearts, setHearts] = useState(5);

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  // 복습 모드: 화면 벗어날 때(중간 이탈 포함) 그때까지 맞춘 문제를 오답에서 제거
  useEffect(() => {
    if (!isReview) return;
    return () => {
      const correctIds = [...reviewCorrectIds.current].filter(
        (id) => !finalWrongIds.current.has(id),
      );
      if (correctIds.length > 0) {
        LessonService.resolveMistakes(correctIds).catch(() => {});
      }
    };
  }, [isReview]);

  const loadLesson = async () => {
    try {
      setLoading(true);
      if (isLevelTest) {
        const questions = await LessonService.getLevelTestQuestions();
        const session = {
          lessonId: "level-test",
          lessonTitle: "Level Test",
          category: "",
          totalXp: 0,
          questions,
        };
        setLesson(session as any);
        questionQueue.current = [...questions];
        return;
      }

      if (isJumpTest) {
        const { questions } = await LessonService.getJumpTest(
          Number(section),
          Number(unit),
        );
        setLesson({
          lessonId: "jump-test",
          lessonTitle: "Jump Test",
          category: "",
          totalXp: 0,
          questions,
        } as any);
        questionQueue.current = [...questions];
        return;
      }

      if (isWordPractice) {
        const { questions } = await LessonService.getWordPractice();
        const session = {
          lessonId: "word-practice",
          lessonTitle: "Word Practice",
          category: "",
          totalXp: 10,
          questions,
        };
        setLesson(session as any);
        questionQueue.current = [...questions];
        return;
      }

      if (isReview) {
        const { questions } = await LessonService.getMistakeQuestions();
        setLesson({
          lessonId: "review",
          lessonTitle: "Review",
          category: "",
          totalXp: 16,
          questions,
        } as any);
        questionQueue.current = [...questions];
        return;
      }

      if (isLegend && nodeId) {
        const { questions } = await LessonService.getNodeReview(
          nodeId,
          LEGEND_TOTAL,
        );
        setLesson({
          lessonId: "legend",
          lessonTitle: "Legend",
          category: "",
          totalXp: LEGEND_XP,
          questions,
        } as any);
        questionQueue.current = [...questions];
        return;
      }

      if (isNodeReview && nodeId) {
        const { questions } = await LessonService.getNodeReview(nodeId);
        setLesson({
          lessonId: "node-review",
          lessonTitle: "Review",
          category: "",
          totalXp: 5,
          questions,
        } as any);
        questionQueue.current = [...questions];
        return;
      }

      const data = lessonId
        ? await LessonService.getLessonById(lessonId)
        : MOCK_LESSON;
      setLesson(data);
      questionQueue.current = [...data.questions];
    } catch (err) {
      console.error("레슨 로드 실패:", err);
      if (!isLevelTest) {
        setLesson(MOCK_LESSON);
        questionQueue.current = [...MOCK_LESSON.questions];
      }
    } finally {
      setLoading(false);
    }
  };

  const goNextLevelTest = () => {
    locked.current = false;
    const [, ...rest] = questionQueue.current;
    questionQueue.current = rest;

    if (questionQueue.current.length === 0) {
      if (isJumpTest) finishJumpTest();
      else finishLevelTest();
      return;
    }
    setCurrentIdx((i) => i + 1);
  };

  const finishJumpTest = async (heartsOut = false) => {
    const wrongCount = wrongIds.current.length;
    const passed = !heartsOut && wrongCount < 5;

    if (passed) {
      try {
        await LessonService.completeJump(Number(section), Number(unit));
      } catch (e) {
        console.log("jump complete fail:", e);
      }
      router.replace({
        pathname: "/jump-result",
        params: { passed: "1", unit: String(unit) },
      });
    } else {
      router.replace({
        pathname: "/jump-result",
        params: { passed: "0", wrong: String(wrongCount) },
      });
    }
  };

  const finishLevelTest = async () => {
    const total = lesson?.questions.length ?? 1;
    const correct = correctCount.current;
    const score = Math.round((correct / total) * 100);
    const detectedLevel =
      score >= 90 ? "advanced" : score >= 60 ? "intermediate" : "beginner";
    const wrongQuestionIds = wrongIds.current;

    // result 화면이 store를 읽으므로 항상 세팅
    setLevelTestResult({
      score,
      detectedLevel,
      correctAnswers: correct,
      wrongQuestionIds,
    });

    try {
      if (isLoggedIn) {
        await UserService.saveLevelTest({
          correctAnswers: correct,
          totalQuestions: total,
          score,
          wrongQuestionIds,
        });
        updateUser({
          level: detectedLevel as any,
          isOnboardingCompleted: true,
        });
      } else {
        await onboardingService.saveLevelTest({
          sessionId,
          correctAnswers: correct,
          totalQuestions: total,
          score,
          wrongQuestionIds,
        });
      }
    } catch (e) {
      console.error("레벨테스트 저장 실패:", e);
    } finally {
      router.replace("/onboarding/result");
    }
  };

  const currentQ = questionQueue.current[0];

  const goHome = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const checkCorrect = (answer: string, q: LessonQuestion) => {
    if (q.type === "word_matching" || q.type === "audio_match") {
      return answer === "all_correct";
    }
    if (q.type === "speaking") return true;
    return answer.trim().toLowerCase() === q.answer.trim().toLowerCase();
  };

  const handleAnswer = (answer: string) => {
    if (!currentQ) return;
    const isCorrect = checkCorrect(answer, currentQ);

    if (isLevelTest) {
      if (locked.current) return;
      locked.current = true;
      totalCount.current += 1;
      if (isCorrect) correctCount.current += 1;
      else wrongIds.current.push(currentQ.id);
      setProgress(totalCount.current / (lesson?.questions.length ?? 1));
      setTimeout(goNextLevelTest, 280);
      return;
    }

    totalCount.current += 1;

    if (isCorrect) {
      setShowCombo(true);
      correctCount.current += 1;
      if (isReview) reviewCorrectIds.current.add(currentQ.id);
      if (phase === "review") finalWrongIds.current.delete(currentQ.id);
      setCombo((c) => c + 1);

      // 슈퍼가 아닐 때만 에너지 소모
      if (!isSuper && !isJumpTest) {
        const nextEnergy = Math.max(0, energy - 1);
        setEnergy(nextEnergy);
        if (nextEnergy <= 0) openEnergyModal();
        EnergyService.consume()
          .then((res) =>
            updateUser({ energy: res.energy, gems: res.gems } as any),
          )
          .catch(() => {});
      }

      if (!uniqueCorrect.current.has(currentQ.id)) {
        uniqueCorrect.current.add(currentQ.id);
      }
    } else {
      setCombo(0);
      if (isJumpTest) {
        wrongIds.current.push(currentQ.id);
        setHearts((h) => Math.max(0, h - 1));
      } else if (phase === "main") {
        if (!reviewQueue.current.some((q) => q.id === currentQ.id)) {
          reviewQueue.current.push(currentQ);
        }
      } else {
        finalWrongIds.current.add(currentQ.id);
      }
    }

    // 진행도: main 단계에서만 갱신
    if (phase === "main") {
      setProgress(uniqueCorrect.current.size / (lesson?.questions.length ?? 1));
    }

    setAnswerState(isCorrect ? "correct" : "wrong");
  };

  const finishLesson = async () => {
    const wrongArr = [...finalWrongIds.current];

    // XP 계산: 기본 20 + 콤보 보너스
    const baseXp = isLegend ? LEGEND_XP : isNodeReview ? 5 : 20;
    const comboBonus = isLegend || isNodeReview ? 0 : Math.max(0, combo);
    const earnedXp = baseXp + comboBonus;

    // 정답률 / 시간
    const total = totalCount.current || 1;
    const accuracy = Math.round((correctCount.current / total) * 100);
    const seconds = Math.round((Date.now() - startTime.current) / 1000);
    const mm = Math.floor(seconds / 60);
    const ss = String(seconds % 60).padStart(2, "0");
    const timeStr = `${mm}:${ss}`;

    if (isReview) {
      // 복습은 unmount에서 resolveMistakes 처리
      LessonService.addXp(earnedXp)
        .then((r) => {
          updateUser({ totalXP: r.totalXP } as any);
        })
        .catch(() => {});
    } else if (isNodeReview || isLegend) {
      // 노드 복습: XP만 저장
      LessonService.addXp(earnedXp)
        .then((r) => {
          updateUser({ totalXP: r.totalXP } as any);
        })
        .catch(() => {});
    } else if (
      !isLevelTest &&
      !isWordPractice &&
      !isNodeReview &&
      !isLegend &&
      lessonId
    ) {
      try {
        await LessonService.completeLesson(lessonId, {
          correctAnswers: correctCount.current,
          totalAnswers: totalCount.current,
          xpEarned: earnedXp,
          combo,
          speedSeconds: seconds,
          wrongQuestionIds: wrongArr,
          isCompleted: true,
        });
        updateUser({
          totalXP: (useAuthStore.getState().user?.totalXP ?? 0) + earnedXp,
        } as any);
      } catch (err) {
        console.error("❌ 레슨 완료 저장 실패:", err);
      }
    }

    // 레벨테스트는 자체 결과 화면, 나머지는 완료 화면으로
    if (isLevelTest) {
      goHome();
      return;
    }

    router.replace({
      pathname: "/lesson-complete",
      params: {
        xp: String(earnedXp),
        accuracy: String(accuracy),
        time: timeStr,
      },
    });
  };

  const handleNext = async () => {
    if (isLevelTest) {
      if (locked.current) return;
      locked.current = true;
      if (currentQ) wrongIds.current.push(currentQ.id);
      totalCount.current += 1;
      goNextLevelTest();
      return;
    }

    if (!lesson) return;
    setShowCombo(false);

    if (isJumpTest && hearts <= 0) {
      finishJumpTest(true);
      return;
    }
    // 현재 문제 큐에서 제거
    const [, ...remaining] = questionQueue.current;
    questionQueue.current = remaining;

    // 복습 진행바: (전체 - 남은) / 전체
    if (phase === "review" && reviewTotal.current > 0) {
      setProgress(
        (reviewTotal.current - questionQueue.current.length) /
          reviewTotal.current,
      );
    }

    if (questionQueue.current.length === 0) {
      if (isJumpTest) {
        finishJumpTest(false);
        return;
      }

      if (phase === "main") {
        // 1단계 끝 → 복습할 게 있으면 안내, 없으면 종료
        if (reviewQueue.current.length > 0) {
          setPhase("reviewIntro");
          setAnswerState("idle");
          return;
        }
        await finishLesson();
        return;
      }
      // 2단계 끝 → 종료 (반복 없음)
      await finishLesson();
      return;
    }

    setCurrentIdx((i) => i + 1);
    setAnswerState("idle");
  };

  // 복습 안내 → 계속
  const startReview = () => {
    reviewTotal.current = reviewQueue.current.length;
    questionQueue.current = [...reviewQueue.current];
    setPhase("review");
    setCombo(0);
    setProgress(0); // 복습 진행바 0부터
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
      case "listening":
        return <Listening {...props} />;
      case "listen_type":
        return <ListenType {...props} />;
      case "fill_in_blank":
        return <FillInBlank {...props} />;
      case "translate_type":
        return <TranslateType {...props} />;
      case "listen_fill":
        return <ListenFill {...props} onSkip={handleNext} />;
      case "audio_match":
        return <AudioMatch {...props} onSkip={handleNext} />;
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

  if (!lesson) {
    return (
      <View style={s.loadingContainer}>
        <Text style={{ color: theme.text }}>레슨을 불러올 수 없어요</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      {isLegend ? (
        <LegendHeader
          segments={LEGEND_SEGMENTS}
          currentIndex={currentIdx}
          durationSec={LEGEND_DURATION}
          onTimeout={goHome}
          onClose={() => setShowQuit(true)}
          theme={theme}
        />
      ) : (
        <LessonHeader
          isSuper={isSuper}
          progress={progress}
          combo={combo}
          energy={energy}
          hearts={hearts}
          showHearts={isJumpTest}
          answerState={answerState}
          onClose={() =>
            isJumpTest || isLevelTest ? goHome() : setShowQuit(true)
          }
          theme={theme}
          showCombo={showCombo}
        />
      )}

      {/* 복습 안내 오버레이 */}
      {phase === "reviewIntro" ? (
        <Animated.View
          entering={FadeIn.duration(300)}
          style={[s.reviewIntro, { paddingBottom: insets.bottom + 16 }]}
        >
          <View style={s.reviewCenter}>
            <BoriMascot size={150} />
            <View style={s.bubble}>
              <Text style={s.bubbleText}>{t("lesson.reviewIntro")}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={s.continueBtn}
            onPress={startReview}
            activeOpacity={0.9}
          >
            <Text style={s.continueText}>{t("lesson.continue")}</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : currentQ ? (
        <>
          <View
            key={
              isLevelTest
                ? `lt-${currentIdx}`
                : `q-${currentQ.id}-${currentIdx}`
            }
            style={[s.questionArea, { paddingBottom: insets.bottom }]}
          >
            {renderQuestion()}
          </View>

          {!isLevelTest && (
            <FeedbackBar
              state={answerState}
              explanation={currentQ.explanation}
              onNext={handleNext}
              theme={theme}
              combo={combo}
            />
          )}

          {!isLevelTest && !isJumpTest && <ComboPopup combo={combo} />}
        </>
      ) : null}

      <QuitLessonModal
        visible={showQuit}
        onContinue={() => setShowQuit(false)}
        onQuit={() => {
          setShowQuit(false);
          goHome();
        }}
      />
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
    },
    // 복습 안내
    reviewIntro: { flex: 1, paddingHorizontal: 20, marginBottom: 40 },
    reviewCenter: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },
    bubble: {
      flex: 1,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 20,
      padding: 20,
    },
    bubbleText: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
      lineHeight: 30,
    },
    continueBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: "center",
    },
    continueText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
