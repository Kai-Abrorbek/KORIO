import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  KeyboardState,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { useSpeech } from "@/hooks/useSpeech";
import { ThemeColors } from "@/constants/theme";
import { useState, useEffect, useRef } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  AnswerGradeResult,
  AnswerState,
  LessonQuestion,
  LessonSession,
} from "@/types/lesson";
import { LessonService } from "@/services/lesson.service";
import { ExpressionService } from "@/services/expression.service";
import { StudyPathService } from "@/services/study-path.service";
import type { PracticeMode } from "@/services/lesson.service";
import { STUDY_QUIZ_KINDS, type StudyQuizKind } from "@/types/study-path";
import { MOCK_LESSON } from "@/mocks/lesson.mock";
import LessonHeader from "@/components/lesson/LessonHeader";
import QuestionRenderer from "@/components/lesson/QuestionRenderer";
import FeedbackBar from "@/components/lesson/FeedbackBar";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import { useAuthStore } from "@/store/auth.store";
import { useOnboardingStore } from "@/store/onboarding.store";
import { UserService } from "@/services/user.service";
import { onboardingService } from "@/services/onboarding.service";
import { useEnergyStore } from "@/store/energy.store";
import { EnergyService } from "@/services/energy.service";
import QuitLessonModal from "@/components/lesson/QuitLessonModal";
import LegendHeader from "@/components/lesson/LegendHeader";
import EnergyBonusPopup from "@/components/lesson/EnergyBonusPopup";
import LightningStrike from "@/components/lesson/LightningStrike";
import { gradeAnswer, gradeTypedAnswerExactly } from "@/utils/answer-check";
import { shuffleGrammarQuestions } from "@/utils/shuffle";
import {
  normalizeOnboardingPlacement,
  resolveOnboardingPlacement,
} from "@/utils/onboarding-placement";
import {
  answersOf,
  fillTemplate,
  parseBlanks,
  templateOf,
} from "@/utils/blank-sentence";

type Phase = "main" | "reviewIntro" | "review";
/** 카드 안에서 결과를 보여주는 유형 — 아래 피드백 바를 띄우지 않는다 */
const HIDES_FEEDBACK_BAR = new Set(["grammar_blank", "grammar_build"]);
const LEGEND_SEGMENTS = [5, 7, 10];
const LEGEND_TOTAL = LEGEND_SEGMENTS.reduce((a, b) => a + b, 0); // 22
const LEGEND_DURATION = 120; // 2분
/** 서버 XP 표(PRACTICE_BASE_XP)의 키. 노드 종류마다 보상이 다르다 */
const UNIT_PRACTICE_MODE: Record<StudyQuizKind, PracticeMode> = {
  review: "unitReview",
  recap: "unitRecap",
  vocabQuiz: "unitVocab",
  grammarQuiz: "unitGrammar",
  final: "unitFinal",
};

const LEGEND_XP = 300; // 서버 lessons.service.ts 와 같은 값
const SMART_GRADING_TYPES = new Set([
  "type_answer",
  "translate_type",
  "listen_type",
  "listen_fill",
]);

interface AutomaticSpeech {
  language: string;
  text: string;
}

/** 실제 문제 컴포넌트가 진입 시 자동으로 읽는 문장을 그대로 반환한다. */
function automaticSpeechOf(
  question: LessonQuestion,
  learnerLanguage: string,
): AutomaticSpeech | null {
  let text = "";
  let language = "ko-KR";

  switch (question.type) {
    case "sentence_builder":
      text = question.audioText || question.answer;
      break;
    case "word_arrange":
    case "listening":
    case "listen_type":
      text = question.answer;
      break;
    case "listen_fill":
      text = fillTemplate(
        parseBlanks(templateOf(question)),
        answersOf(question),
      );
      break;
    case "translate_builder":
      text = (question.sourceText ?? "") || question.question;
      language = learnerLanguage;
      break;
    case "reply_builder":
      text = question.npcText ?? "";
      break;
    default:
      return null;
  }

  const normalizedText = text.trim();
  return normalizedText ? { text: normalizedText, language } : null;
}

export default function LessonScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const lessonSpeech = useSpeech();
  const prewarmSpeech = lessonSpeech.prewarm;
  const s = getStyles(theme);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const keyboard = useAnimatedKeyboard();
  const questionAreaStyle = useAnimatedStyle(() => ({
    paddingBottom:
      keyboard.state.value === KeyboardState.OPEN ||
      keyboard.state.value === KeyboardState.OPENING
        ? Math.max(keyboard.height.value, insets.bottom)
        : insets.bottom,
  }));
  const {
    lessonId,
    mode,
    nodeId,
    section,
    unit,
    target,
    category,
    pack,
    kind,
    from,
    group,
    lesson: lessonNo,
  } = useLocalSearchParams<{
    lessonId?: string;
    mode?: string;
    nodeId?: string;
    section?: string;
    unit?: string;
    target?: string;
    /** 어느 로드맵에서 들어왔는지. 완료 후 제자리로 돌아가려면 필요 */
    category?: string;
    /** 표현 카드 학습에서 연습할 표현 팩 코드 */
    pack?: string;
    /** 학습 로드 모드 노드 종류: review | vocabQuiz | recap | grammarQuiz | final */
    kind?: string;
    /** 같은 종류가 여럿일 때 몇 번째 노드인지 (1-based) */
    group?: string;
    /** 학습 로드 모드에서 들어왔으면 "studyPath". 끝나고 거기로 돌아간다 */
    from?: string;
    /** 학습 로드 모드: 노드 안의 몇 번째 레슨인지 (1-based) */
    lesson?: string;
  }>();
  const isLevelTest = mode === "levelTest";
  const isWordPractice = mode === "wordPractice";
  const isReview = mode === "review";
  const isLessonReview = mode === "lessonReview";
  const isNodeReview = mode === "nodeReview";
  const isJumpTest = mode === "jumpTest";
  const isLegend = mode === "legend";
  const isExpressionPractice = mode === "expressionPractice";
  // 학습 로드 모드 — 그 하루(=유닛) 범위로 좁힌 실전/복습/마무리
  const isUnitPractice = mode === "unitPractice";
  // 급수 졸업 시험 — 하트 제한이 있고 결과를 전용 화면에서 본다
  const isLevelExam = mode === "levelExam";
  const unitKind: StudyQuizKind = STUDY_QUIZ_KINDS.includes(
    kind as StudyQuizKind,
  )
    ? (kind as StudyQuizKind)
    : "vocabQuiz";
  const fromStudyPath = from === "studyPath";
  const unitLesson = Math.max(1, Number(lessonNo) || 1);
  const unitGroup = Math.max(1, Number(group) || 1);
  // 서버가 응시를 발급할 때 합격 기준을 같이 준다. 이건 첫 렌더용 폴백일 뿐이고,
  // 실제 판정은 서버가 한다 (클라가 기준을 낮춰도 통과되지 않는다).
  const fallbackHeartLimit =
    target === "section" || Number(section) >= 2 ? 3 : 5;
  const { setLevelTestResult, sessionId, selfReportedLevel } =
    useOnboardingStore();
  const isLoggedIn = useAuthStore((st) => st.isLoggedIn);
  const updateUser = useAuthStore((st) => st.updateUser);
  const locked = useRef(false);
  const [lesson, setLesson] = useState<LessonSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [gradingFeedback, setGradingFeedback] =
    useState<AnswerGradeResult | null>(null);
  const answerSubmissionLocked = useRef(false);
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
  const jumpAttemptId = useRef<string | null>(null);
  const [jumpHeartLimit, setJumpHeartLimit] = useState(fallbackHeartLimit);
  const [showQuit, setShowQuit] = useState(false);
  const isSuper = useAuthStore((st) => st.user?.isSuper ?? false);
  const [hearts, setHearts] = useState(jumpHeartLimit);
  const [showBonus, setShowBonus] = useState(false);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [showLightning, setShowLightning] = useState(false);
  const bonusGiven = useRef(false); // 레슨당 보너스 1회 제한

  useEffect(() => {
    void loadLesson();
  }, [category, lessonId, mode, nodeId, pack, section, unit]);

  useEffect(() => {
    setEnergy(userEnergy);
  }, [userEnergy]);

  useEffect(() => {
    if (isJumpTest) setHearts(jumpHeartLimit);
  }, [isJumpTest, jumpHeartLimit]);

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
      answerSubmissionLocked.current = false;
      setIsCheckingAnswer(false);
      setGradingFeedback(null);
      setAnswerState("idle");
      if (isLevelTest) {
        const questions =
          await LessonService.getLevelTestQuestions(selfReportedLevel);
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
        const res = await LessonService.getJumpTest(
          Number(section),
          Number(unit),
          category,
        );
        const questions = res.questions;
        jumpAttemptId.current = res.attemptId;
        if (res.heartLimit) setJumpHeartLimit(res.heartLimit);
        setLesson({
          lessonId: "jump-test",
          lessonTitle: "Jump Test",
          category: category ?? "",
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

      if (isExpressionPractice) {
        if (!pack) throw new Error("표현 팩 코드가 없습니다");
        const session = await ExpressionService.getPractice(
          pack,
          Number(section) || 1,
          Number(unit) || 1,
        );
        setLesson(session);
        questionQueue.current = [...session.questions];
        return;
      }

      if (isLevelExam) {
        const { questions } = await StudyPathService.getLevelExam();
        setLesson({
          lessonId: "level-exam",
          lessonTitle: "Level Exam",
          category: "",
          totalXp: 0,
          questions,
        } as any);
        questionQueue.current = [...questions];
        return;
      }

      if (isUnitPractice) {
        const { questions } = await LessonService.getUnitPractice(
          Number(section),
          Number(unit),
          unitKind,
          unitGroup,
          unitLesson,
        );
        setLesson({
          lessonId: `unit-${unitKind}`,
          lessonTitle: "Unit Practice",
          category: "",
          totalXp: 0,
          questions,
        } as any);
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
      // 문법 레슨은 시드 순서가 늘 같다. 유형은 번갈아 두고 안쪽만 섞는다.
      questionQueue.current =
        data.category === "grammar"
          ? shuffleGrammarQuestions(data.questions)
          : [...data.questions];
    } catch (err) {
      console.error("레슨 로드 실패:", err);
      if (!isLevelTest && !isExpressionPractice) {
        setLesson(MOCK_LESSON);
        questionQueue.current = [...MOCK_LESSON.questions];
      } else if (isExpressionPractice) {
        setLesson(null);
        questionQueue.current = [];
      }
    } finally {
      setLoading(false);
    }
  };

  const goNextLevelTest = () => {
    locked.current = false;
    answerSubmissionLocked.current = false;
    setGradingFeedback(null);
    setIsCheckingAnswer(false);
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
    const attemptId = jumpAttemptId.current;

    // 합격 판정은 서버가 한다. 여기서 미리 계산하는 건 서버를 못 부를 때
    // (응시 발급 실패 / 네트워크) 화면을 어떻게 보여줄지 정하는 용도뿐이다.
    let passed = !heartsOut && wrongCount < jumpHeartLimit;
    // 무엇이 열렸는지는 서버가 안다. 화면이 추측하면 "유닛 1 열림" 같은
    // 엉뚱한 안내가 나간다 (섹션을 통째로 건너뛴 경우가 그랬다)
    let openedSection: number | null = null;
    let openedLessons = 0;

    if (attemptId) {
      try {
        const res = await LessonService.completeJump(
          attemptId,
          wrongIds.current,
        );
        passed = res.passed;
        openedSection = res.section ?? null;
        openedLessons = res.completed ?? 0;
      } catch (e) {
        console.log("jump complete fail:", e);
        passed = false; // 서버가 인정 안 한 진급은 통과로 치지 않는다
      }
    } else {
      passed = false;
    }

    router.replace({
      pathname: "/jump-result",
      params: passed
        ? {
            passed: "1",
            unit: String(unit),
            section: String(openedSection ?? section ?? ""),
            target: String(target ?? ""),
            lessons: String(openedLessons),
            category: String(category ?? ""),
          }
        : {
            passed: "0",
            wrong: String(wrongCount),
            category: String(category ?? ""),
          },
    });
  };

  const finishLevelTest = async () => {
    const total = lesson?.questions.length ?? 1;
    const correct = correctCount.current;
    const score = Math.round((correct / total) * 100);
    const detectedLevel =
      score >= 90 ? "advanced" : score >= 60 ? "intermediate" : "beginner";
    const wrongQuestionIds = wrongIds.current;
    let placement = resolveOnboardingPlacement(selfReportedLevel, score);

    try {
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
    } finally {
      setLevelTestResult({
        score,
        detectedLevel,
        correctAnswers: correct,
        totalQuestions: total,
        wrongQuestionIds,
        ...placement,
      });
      router.replace("/onboarding/result");
    }
  };

  const currentQ = questionQueue.current[0];
  const learnerLanguage = i18n.resolvedLanguage ?? i18n.language;

  useEffect(() => {
    if (!lesson || questionQueue.current.length === 0) return;

    const grouped = new Map<string, string[]>();
    // 현재 문제와 다음 세 문제를 준비한다. 현재 문제를 푸는 시간이 다음 음성의
    // Azure 생성·다운로드 시간이 되어, 다음 카드에서는 곧바로 재생된다.
    for (const question of questionQueue.current.slice(0, 4)) {
      const speech = automaticSpeechOf(question, learnerLanguage);
      if (!speech) continue;
      const texts = grouped.get(speech.language) ?? [];
      if (!texts.includes(speech.text)) texts.push(speech.text);
      grouped.set(speech.language, texts);
    }

    for (const [language, texts] of grouped) {
      prewarmSpeech(texts, language);
    }
  }, [currentIdx, learnerLanguage, lesson, phase, prewarmSpeech]);

  const goHome = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const commitAnswer = (
    question: LessonQuestion,
    isCorrect: boolean,
    feedback: AnswerGradeResult | null = null,
  ) => {
    setGradingFeedback(feedback);

    if (isLevelTest) {
      if (locked.current) return;
      locked.current = true;
      totalCount.current += 1;
      if (isCorrect) correctCount.current += 1;
      else wrongIds.current.push(question.id);
      setProgress(totalCount.current / (lesson?.questions.length ?? 1));
      setTimeout(goNextLevelTest, 280);
      return;
    }

    totalCount.current += 1;

    if (isCorrect) {
      setShowCombo(true);
      correctCount.current += 1;
      if (isReview) reviewCorrectIds.current.add(question.id);
      if (phase === "review") finalWrongIds.current.delete(question.id);

      const nextCombo = combo + 1;
      setCombo(nextCombo);
      // 슈퍼가 아닐 때만 에너지 소모
      if (!isSuper && !isJumpTest && !isLevelExam) {
        (async () => {
          try {
            // 1) 소모 먼저
            const consumeRes = await EnergyService.consume();
            updateUser({
              energy: consumeRes.energy,
              gems: consumeRes.gems,
            } as any);
            if (consumeRes.energy <= 0) openEnergyModal();

            // 2) 4연속이면 소모 반영된 뒤 보너스
            if (nextCombo % 4 === 0 && !bonusGiven.current) {
              const bonusRes = await EnergyService.comboBonus();
              if (bonusRes.bonusGranted > 0) {
                bonusGiven.current = true; // 이 레슨에선 다시 안 줌
                updateUser({
                  energy: bonusRes.energy,
                  gems: bonusRes.gems,
                } as any);
                setBonusAmount(bonusRes.bonusGranted);
                setShowLightning(true);
                setShowBonus(true);
              }
            }
          } catch {}
        })();
      }

      if (!uniqueCorrect.current.has(question.id)) {
        uniqueCorrect.current.add(question.id);
      }
    } else {
      setCombo(0);
      if (isJumpTest) {
        wrongIds.current.push(question.id);
        setHearts((h) => Math.max(0, h - 1));
      } else if (phase === "main") {
        if (!reviewQueue.current.some((q) => q.id === question.id)) {
          reviewQueue.current.push(question);
        }
      } else {
        finalWrongIds.current.add(question.id);
      }
    }

    // 진행도: main 단계에서만 갱신
    if (phase === "main") {
      setProgress(uniqueCorrect.current.size / (lesson?.questions.length ?? 1));
    }

    setAnswerState(isCorrect ? "correct" : "wrong");
  };

  const handleAnswer = async (answer: string) => {
    const question = questionQueue.current[0];
    if (!question || answerSubmissionLocked.current) return;
    answerSubmissionLocked.current = true;

    const useSmartGrading =
      isLoggedIn &&
      question.smartGradingEnabled === true &&
      SMART_GRADING_TYPES.has(question.type);
    const localResult = useSmartGrading
      ? gradeTypedAnswerExactly(answer, question)
      : gradeAnswer(answer, question);

    if (!useSmartGrading || localResult) {
      commitAnswer(question, localResult);
      return;
    }

    setIsCheckingAnswer(true);
    try {
      const result = await LessonService.gradeTypedAnswer(question.id, answer);
      // 판정 도중 화면이 바뀌거나 세션이 교체되면 늦게 온 응답을 버린다.
      if (questionQueue.current[0]?.id !== question.id) return;
      commitAnswer(question, result.isCorrect, result);
    } catch {
      // 네트워크/서버 오류가 기존 채점보다 더 나쁜 결과를 만들지 않도록 폴백한다.
      if (questionQueue.current[0]?.id === question.id) {
        commitAnswer(question, gradeAnswer(answer, question));
      }
    } finally {
      setIsCheckingAnswer(false);
    }
  };

  const finishLesson = async () => {
    const wrongArr = [...finalWrongIds.current];

    // 정답률 / 시간
    const total = totalCount.current || 1;
    const accuracy = Math.round((correctCount.current / total) * 100);
    const seconds = Math.round((Date.now() - startTime.current) / 1000);
    const mm = Math.floor(seconds / 60);
    const ss = String(seconds % 60).padStart(2, "0");
    const timeStr = `${mm}:${ss}`;

    // 이번 세션에서 실제로 푼 문제들 (통계 카테고리 집계의 근거)
    const practicedIds = (lesson?.questions ?? [])
      .map((q: any) => q.id)
      .filter(Boolean);

    // 완료 화면에 띄울 XP — 서버가 확정한 값으로 채운다
    let earnedXp = 0;

    if (isExpressionPractice && pack) {
      try {
        const r = await ExpressionService.completePractice(pack, {
          questionIds: practicedIds,
          wrongQuestionIds: wrongArr,
          speedSeconds: seconds,
          combo,
        });
        earnedXp = r.xpEarned;
        updateUser({ totalXP: r.totalXP } as any);
      } catch (err) {
        console.error("표현 연습 완료 저장 실패:", err);
      }
    } else if (isLevelExam) {
      try {
        const res = await StudyPathService.completeLevelExam({
          questionIds: practicedIds,
          wrongQuestionIds: wrongArr,
          speedSeconds: seconds,
        });
        updateUser({ totalXP: res.totalXP } as any);
        router.replace({
          pathname: "/level-exam-result",
          params: {
            passed: res.passed ? "1" : "0",
            correct: String(res.correct),
            total: String(res.total),
            level: String(res.level),
            nextLevel: res.nextLevel ? String(res.nextLevel) : "",
            weak: res.weakAreas.join(","),
            gems: String(res.gemsEarned),
            xp: String(res.xpEarned),
          },
        });
        return;
      } catch (err) {
        console.error("졸업 시험 저장 실패:", err);
        router.replace("/study-path");
        return;
      }
    } else if (isUnitPractice) {
      try {
        const r = await LessonService.completePractice({
          mode: UNIT_PRACTICE_MODE[unitKind],
          questionIds: practicedIds,
          wrongQuestionIds: wrongArr,
          speedSeconds: seconds,
          combo,
        });
        earnedXp = r.xpEarned;
        updateUser({ totalXP: r.totalXP } as any);
        // 노드 완료는 XP 저장과 별개다 — 하나가 실패해도 다른 하나는 남는다
        await StudyPathService.completeNode(
          Number(section),
          Number(unit),
          unitKind,
          unitGroup,
          unitLesson,
        );
      } catch (err) {
        console.error("하루 연습 완료 저장 실패:", err);
      }
    } else if (isReview || isWordPractice || isLessonReview) {
      // 전체 오답 복습만 unmount에서 오답 해제를 처리한다. 개별 문법 복습은
      // 같은 문제를 다시 풀되 진도 완료 API 대신 연습 보상 규칙을 사용한다.
      try {
        const r = await LessonService.completePractice({
          mode: isWordPractice
            ? "wordPractice"
            : isLessonReview
              ? "nodeReview"
              : "review",
          questionIds: practicedIds,
          wrongQuestionIds: wrongArr,
          speedSeconds: seconds,
          combo,
        });
        earnedXp = r.xpEarned;
        updateUser({ totalXP: r.totalXP } as any);
      } catch (err) {
        console.error("연습 완료 저장 실패:", err);
      }
    } else if (isNodeReview || isLegend) {
      if (isLegend && nodeId) {
        try {
          const r = await LessonService.completeLegend(nodeId);
          earnedXp = r.xpEarned;
          updateUser({ totalXP: r.totalXP } as any);
        } catch (err) {
          console.error("레전드 완료 저장 실패:", err);
        }
      } else {
        try {
          const r = await LessonService.completePractice({
            mode: "nodeReview",
            questionIds: practicedIds,
            wrongQuestionIds: wrongArr,
            speedSeconds: seconds,
            combo,
          });
          earnedXp = r.xpEarned;
          updateUser({ totalXP: r.totalXP } as any);
        } catch (err) {
          console.error("노드 복습 완료 저장 실패:", err);
        }
      }
    } else if (!isLevelTest && lessonId) {
      try {
        const res = await LessonService.completeLesson(lessonId, {
          correctAnswers: correctCount.current,
          totalAnswers: totalCount.current,
          xpEarned: 0, // 서버가 계산 (클라 값 무시)
          combo,
          speedSeconds: seconds,
          wrongQuestionIds: wrongArr,
          isCompleted: true,
        });
        updateUser({
          totalXP: res.totalXP,
          gems: res.gems,
          energy: res.energy,
        } as any);

        const gemsBefore = res.chest ? res.gems - res.chest.gems : res.gems;

        router.replace({
          pathname: "/lesson-complete",
          params: {
            xp: String(res.xpEarned),
            accuracy: String(accuracy),
            time: timeStr,
            chestGrade: res.chest?.grade ?? "",
            chestGems: res.chest ? String(res.chest.gems) : "",
            // 유닛을 통째로 끝냈으면 스코어가 오른 순간이다. 완료 화면이
            // 이어서 축하 화면으로 넘긴다
            scoreUp: res.unitCompleted ? String(res.unitCompleted.score) : "",
            scoreUpUnit: res.unitCompleted
              ? String(res.unitCompleted.unit)
              : "",
            gemTotal: String(gemsBefore),
            category: category ?? "",
            from: fromStudyPath ? "studyPath" : "",
          },
        });
        return;
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
        category: category ?? "",
        pack: isExpressionPractice ? (pack ?? "") : "",
        section: isExpressionPractice ? (section ?? "1") : "",
        unit: isExpressionPractice ? (unit ?? "1") : "",
        from: fromStudyPath ? "studyPath" : "",
      },
    });
  };

  const handleNext = async () => {
    if (isLevelTest) {
      if (locked.current) return;
      locked.current = true;
      if (currentQ) wrongIds.current.push(currentQ.id);
      totalCount.current += 1;
      setProgress(totalCount.current / (lesson?.questions.length ?? 1));
      goNextLevelTest();
      return;
    }

    if (!lesson) return;
    answerSubmissionLocked.current = false;
    setGradingFeedback(null);
    setIsCheckingAnswer(false);
    setShowCombo(false);

    if (isJumpTest && hearts <= 0) {
      finishJumpTest(true);
      return;
    }
    // 현재 문제 큐에서 제거
    const [, ...remaining] = questionQueue.current;
    questionQueue.current = remaining;

    // 메인 진행바는 정답 여부가 아니라 큐에서 완료된 문제 수를 기준으로 한다.
    // 따라서 답을 제출하지 않고 스킵한 문제도 한 문제를 마친 것으로 반영된다.
    if (phase === "main") {
      const mainTotal = lesson.questions.length || 1;
      setProgress((mainTotal - questionQueue.current.length) / mainTotal);
    } else if (phase === "review" && reviewTotal.current > 0) {
      // 복습 진행바: (전체 - 남은) / 전체
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
          maxHearts={jumpHeartLimit}
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
            <HaneulmonMascot size={150} mood="review" />
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
          <Animated.View
            key={
              isLevelTest
                ? `lt-${currentIdx}`
                : `q-${currentQ.id}-${currentIdx}`
            }
            style={[s.questionArea, questionAreaStyle]}
          >
            <QuestionRenderer
              question={currentQ}
              answerState={answerState}
              onAnswer={handleAnswer}
              onSkip={handleNext}
              onNext={handleNext}
              theme={theme}
              combo={combo}
              isChecking={isCheckingAnswer}
              speech={lessonSpeech}
            />
          </Animated.View>

          {/* 문법 문제는 결과·힌트를 카드 안에서 보여주고 스스로 다음으로
              넘어간다. 아래 피드백 바까지 뜨면 같은 말을 두 번 하게 된다. */}
          {!isLevelTest && !HIDES_FEEDBACK_BAR.has(currentQ.type) && (
            <FeedbackBar
              state={answerState}
              answer={currentQ.answer}
              answerTranslation={currentQ.answerTranslation}
              explanation={currentQ.explanation}
              gradingFeedback={gradingFeedback}
              onNext={handleNext}
              theme={theme}
              combo={combo}
            />
          )}

          {/* {!isLevelTest && !isJumpTest && (
            <>
              <LightningStrike
                visible={showLightning}
                onDone={() => {
                  setShowBonus(true); // 번개 끝 → 배터리
                  setShowLightning(false);
                }}
              />
              <EnergyBonusPopup
                visible={showBonus}
                amount={bonusAmount}
                onDone={() => setShowBonus(false)}
              />
            </>
          )} */}
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

      <LightningStrike visible={showLightning} />
      <EnergyBonusPopup
        visible={showBonus}
        amount={bonusAmount}
        onDone={() => {
          setShowBonus(false);
          setShowLightning(false); // 배터리 끝날 때 번개도 같이 정리
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
