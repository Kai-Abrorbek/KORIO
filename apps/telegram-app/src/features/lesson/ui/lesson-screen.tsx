"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { HomeIcon } from "../../home/ui/home-icon";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  completeJumpTest,
  completeLesson,
  completePractice,
  completeStudyNode,
  getJumpTest,
  getLesson,
  getNodeReview,
  getUnitPractice,
  gradeTypedAnswer,
  reportLessonProgress,
} from "../api/lesson";
import { completeLevelExam, getLevelExam } from "../api/study-lesson";
import {
  completeOnboardingLevelTest,
  getOnboardingLevelTest,
} from "../../onboarding/api/onboarding";
import {
  backToLearning,
  isAnswerCorrect,
  type AnswerGradeResult,
  type LessonPhase,
  type LessonQuestion,
  type LessonQueueItem,
  type LessonSession,
  type ReportedAnswer,
} from "../model/lesson";
import { QuestionCard } from "./question-card";
import styles from "./lesson.module.css";

const SMART_TYPES = new Set(["type_answer", "translate_type", "listen_type", "listen_fill"]);
const GRAMMAR_TYPES = new Set(["grammar_blank", "grammar_build"]);
const PRACTICE_MODE: Record<string, "unitReview" | "unitRecap" | "unitVocab" | "unitGrammar" | "unitFinal"> = {
  final: "unitFinal",
  grammarQuiz: "unitGrammar",
  recap: "unitRecap",
  review: "unitReview",
  vocabQuiz: "unitVocab",
};

function makeQueue(questions: LessonQuestion[], prefix: string, retry = false): LessonQueueItem[] {
  return questions.map((question, index) => ({
    instanceId: `${prefix}:${question.id}:${index}`,
    question,
    retry,
  }));
}

export function LessonScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request, updateUser, user } = useTelegramAuth();
  const mode = params.get("mode") ?? "lesson";
  const lessonId = params.get("lessonId");
  const nodeId = params.get("nodeId");
  const category = params.get("category");
  const from = params.get("from");
  const target = params.get("target");
  const kind = params.get("kind") ?? "review";
  const section = Math.max(1, Number(params.get("section")) || 1);
  const unit = Math.max(1, Number(params.get("unit")) || 1);
  const group = Math.max(1, Number(params.get("group")) || 1);
  const lessonNumber = Math.max(1, Number(params.get("lesson")) || 1);
  const isJump = mode === "jumpTest";
  const isLevelExam = mode === "levelExam";
  const isOnboardingLevelTest = mode === "levelTest";
  const selfReportedLevel = params.get("self") ?? "basic_greetings";

  const [session, setSession] = useState<LessonSession | null>(null);
  const [queue, setQueue] = useState<LessonQueueItem[]>([]);
  const [cursor, setCursor] = useState(0);
  const [phase, setPhase] = useState<LessonPhase>("main");
  const [answerState, setAnswerState] = useState<"idle" | "correct" | "wrong">("idle");
  const [gradeFeedback, setGradeFeedback] = useState<AnswerGradeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [hearts, setHearts] = useState(target === "section" || section >= 2 ? 3 : 5);
  const [heartLimit, setHeartLimit] = useState(target === "section" || section >= 2 ? 3 : 5);
  const [combo, setCombo] = useState(0);
  const [showQuit, setShowQuit] = useState(false);
  const [rendererEpoch, setRendererEpoch] = useState(0);

  const startTime = useRef(Date.now());
  const shownAt = useRef(Date.now());
  const attemptId = useRef<string | null>(null);
  const jumpAttemptId = useRef<string | null>(null);
  const correctCount = useRef(0);
  const totalCount = useRef(0);
  const answerIndex = useRef(0);
  const pendingAnswers = useRef<ReportedAnswer[]>([]);
  const answeredInstances = useRef(new Set<string>());
  const firstWrongInstances = useRef(new Set<string>());
  const finalWrongIds = useRef(new Set<string>());
  const allWrongIds = useRef(new Set<string>());
  const reviewQuestions = useRef(new Map<string, LessonQuestion>());
  const nextRef = useRef<() => Promise<void>>(async () => undefined);

  const resetRun = useCallback(() => {
    startTime.current = Date.now();
    shownAt.current = Date.now();
    attemptId.current = null;
    jumpAttemptId.current = null;
    correctCount.current = 0;
    totalCount.current = 0;
    answerIndex.current = 0;
    pendingAnswers.current = [];
    answeredInstances.current.clear();
    firstWrongInstances.current.clear();
    finalWrongIds.current.clear();
    allWrongIds.current.clear();
    reviewQuestions.current.clear();
    setCursor(0);
    setPhase("main");
    setAnswerState("idle");
    setGradeFeedback(null);
    setCombo(0);
    setRendererEpoch(0);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadFailed(false);
    resetRun();
    try {
      let next: LessonSession;
      if (isOnboardingLevelTest) {
        const questions = await getOnboardingLevelTest(
          request,
          selfReportedLevel,
        );
        next = {
          category: "",
          lessonId: "level-test",
          lessonTitle: "Daraja testi",
          questions,
          totalXp: 0,
        };
      } else if (isJump) {
        const result = await getJumpTest(request, section, unit, category ?? undefined);
        jumpAttemptId.current = result.attemptId;
        const limit = result.heartLimit ?? (target === "section" || section >= 2 ? 3 : 5);
        setHeartLimit(limit);
        setHearts(limit);
        next = {
          category: category ?? "vocabulary",
          lessonId: "jump-test",
          lessonTitle: "Jump Test",
          questions: result.questions,
          totalXp: 0,
        };
      } else if (mode === "nodeReview") {
        if (!nodeId) throw new Error("NODE_ID_REQUIRED");
        const result = await getNodeReview(request, nodeId);
        next = {
          category: category ?? "",
          lessonId: "node-review",
          lessonTitle: "Takrorlash",
          questions: result.questions,
          totalXp: 5,
        };
      } else if (mode === "unitPractice") {
        const result = await getUnitPractice(request, {
          group,
          kind,
          lesson: lessonNumber,
          section,
          unit,
        });
        next = {
          category: "",
          lessonId: `unit-${kind}`,
          lessonTitle: "Mashq",
          questions: result.questions,
          totalXp: 0,
        };
      } else if (isLevelExam) {
        const result = await getLevelExam(request);
        next = {
          category: "",
          lessonId: "level-exam",
          lessonTitle: `${result.level}-daraja imtihoni`,
          questions: result.questions,
          totalXp: 0,
        };
      } else {
        if (!lessonId) throw new Error("LESSON_ID_REQUIRED");
        next = await getLesson(request, lessonId);
        attemptId.current = next.attemptId ?? null;
      }
      if (!next.questions.length) throw new Error("EMPTY_LESSON");
      setSession(next);
      setQueue(makeQueue(next.questions, "main"));
    } catch {
      setSession(null);
      setQueue([]);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [category, group, isJump, isLevelExam, isOnboardingLevelTest, kind, lessonId, lessonNumber, mode, nodeId, request, resetRun, section, selfReportedLevel, target, unit]);

  useEffect(() => {
    void load();
  }, [load]);

  const current = queue[cursor];
  useEffect(() => {
    shownAt.current = Date.now();
  }, [current?.instanceId]);

  const progress = useMemo(() => {
    if (!queue.length) return 0;
    return Math.min(100, Math.round((cursor / queue.length) * 100));
  }, [cursor, queue.length]);

  const close = () => {
    if (isOnboardingLevelTest) {
      router.replace("/onboarding");
      return;
    }
    if (isJump) {
      router.replace(backToLearning(category, from));
      return;
    }
    setShowQuit(true);
  };

  const recordAnswer = (question: LessonQuestion, correct: boolean) => {
    const id = attemptId.current;
    if (!id) return;
    pendingAnswers.current.push({
      durationMs: Math.max(0, Date.now() - shownAt.current),
      index: answerIndex.current++,
      isCorrect: correct,
      questionId: question.id,
      questionType: question.type,
    });
    if (pendingAnswers.current.length < 4) return;
    const batch = pendingAnswers.current;
    pendingAnswers.current = [];
    void reportLessonProgress(request, id, answerIndex.current, batch).catch(() => undefined);
  };

  const commitGrade = (correct: boolean, serverGrade: AnswerGradeResult | null = null) => {
    if (!current || answerState !== "idle") return;
    const firstAttempt = !answeredInstances.current.has(current.instanceId);
    if (firstAttempt) {
      answeredInstances.current.add(current.instanceId);
      totalCount.current += 1;
      recordAnswer(current.question, correct);
      if (correct) {
        correctCount.current += 1;
        if (current.retry || phase === "review") finalWrongIds.current.delete(current.question.id);
      } else {
        firstWrongInstances.current.add(current.instanceId);
        allWrongIds.current.add(current.question.id);
        finalWrongIds.current.add(current.question.id);
        if (
          !isJump &&
          !isOnboardingLevelTest &&
          !GRAMMAR_TYPES.has(current.question.type) &&
          phase === "main"
        ) {
          reviewQuestions.current.set(current.question.id, current.question);
        }
      }
    } else if (correct && (current.retry || phase === "review")) {
      finalWrongIds.current.delete(current.question.id);
    }

    if (correct) {
      setCombo((value) => value + 1);
      setAnswerState("correct");
    } else {
      setCombo(0);
      if (isJump && firstAttempt) setHearts((value) => Math.max(0, value - 1));
      setAnswerState("wrong");
    }
    setGradeFeedback(serverGrade);
  };

  const submitAnswer = async (answer: string) => {
    if (!current || answerState !== "idle" || checking) return;
    const locallyCorrect = isAnswerCorrect(answer, current.question);
    const useSmart =
      current.question.smartGradingEnabled === true &&
      SMART_TYPES.has(current.question.type) &&
      !locallyCorrect;
    if (!useSmart) {
      commitGrade(locallyCorrect);
      return;
    }
    setChecking(true);
    try {
      const result = await gradeTypedAnswer(request, current.question.id, answer);
      commitGrade(result.isCorrect, result);
    } catch {
      commitGrade(locallyCorrect);
    } finally {
      setChecking(false);
    }
  };

  const skipQuestion = () => {
    if (!current || answerState !== "idle") return;
    commitGrade(false);
  };

  const routeComplete = (values: Record<string, string | number | undefined>) => {
    const query = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== "") query.set(key, String(value));
    });
    router.replace(`/lesson-complete?${query.toString()}`);
  };

  const finish = async () => {
    if (!session || finishing) return;
    setFinishing(true);
    const elapsed = Math.max(1, Math.round((Date.now() - startTime.current) / 1000));
    const total = Math.max(1, totalCount.current);
    const accuracy = Math.round((correctCount.current / total) * 100);
    const wrong = [...finalWrongIds.current];
    const questionIds = session.questions.map((question) => question.id);
    try {
      if (isJump) {
        if (!jumpAttemptId.current) throw new Error("JUMP_ATTEMPT_REQUIRED");
        const result = await completeJumpTest(request, jumpAttemptId.current, [...allWrongIds.current]);
        const query = new URLSearchParams({
          category: category ?? "",
          lessons: String(result.completed ?? 0),
          passed: result.passed ? "1" : "0",
          section: String(result.section ?? section),
          target: target ?? "",
          unit: String(result.unit ?? unit),
          wrong: String(result.wrongCount),
        });
        router.replace(`/jump-result?${query.toString()}`);
        return;
      }

      if (isOnboardingLevelTest) {
        const score = Math.round((correctCount.current / total) * 100);
        const result = await completeOnboardingLevelTest(request, {
          correctAnswers: correctCount.current,
          score,
          totalQuestions: total,
          wrongQuestionIds: [...allWrongIds.current],
        });
        updateUser({
          hasPickedLevel: true,
          isOnboardingCompleted: true,
          languageLevel: result.placementLevel,
          level: result.detectedLevel,
        });
        const query = new URLSearchParams({
          correct: String(result.correctAnswers),
          placement: String(result.placementLevel),
          score: String(result.score),
          section: String(result.recommendedSection),
          self: selfReportedLevel,
          total: String(result.totalQuestions),
        });
        router.replace(`/onboarding-result?${query.toString()}`);
        return;
      }

      if (isLevelExam) {
        const result = await completeLevelExam(request, {
          questionIds,
          speedSeconds: elapsed,
          wrongQuestionIds: wrong,
        });
        updateUser({ totalXP: result.totalXP });
        routeComplete({
          accuracy: Math.round((result.correct / Math.max(1, result.total)) * 100),
          correct: result.correct,
          exam: "1",
          gems: result.gemsEarned,
          level: result.level,
          nextLevel: result.nextLevel,
          passed: result.passed ? "1" : "0",
          time: elapsed,
          total: result.total,
          weak: result.weakAreas.join(","),
          xp: result.xpEarned,
        });
        return;
      }

      if (mode === "unitPractice") {
        const practiceMode = PRACTICE_MODE[kind] ?? "unitReview";
        const result = await completePractice(request, {
          combo,
          mode: practiceMode,
          questionIds,
          speedSeconds: elapsed,
          wrongQuestionIds: wrong,
        });
        updateUser({ totalXP: result.totalXP });
        // 보상 저장이 끝난 뒤 노드 완료만 실패한 경우, 같은 연습을 다시 제출해
        // 보상이 중복될 수 없도록 완료 화면은 그대로 보여준다.
        await completeStudyNode(request, {
          group,
          kind,
          lesson: lessonNumber,
          section,
          unit,
        }).catch(() => undefined);
        routeComplete({ accuracy, from: from ?? undefined, time: elapsed, xp: result.xpEarned });
        return;
      }

      if (mode === "nodeReview" || mode === "lessonReview") {
        const result = await completePractice(request, {
          combo,
          mode: "nodeReview",
          questionIds,
          speedSeconds: elapsed,
          wrongQuestionIds: wrong,
        });
        updateUser({ totalXP: result.totalXP });
        routeComplete({ accuracy, category: category ?? undefined, time: elapsed, xp: result.xpEarned });
        return;
      }

      if (!lessonId) throw new Error("LESSON_ID_REQUIRED");
      const result = await completeLesson(request, lessonId, {
        answers: pendingAnswers.current,
        attemptId: attemptId.current,
        combo,
        correctAnswers: correctCount.current,
        isCompleted: true,
        speedSeconds: elapsed,
        totalAnswers: totalCount.current,
        wrongQuestionIds: wrong,
        xpEarned: 0,
      });
      pendingAnswers.current = [];
      updateUser({ energy: result.energy, gems: result.gems, totalXP: result.totalXP });
      routeComplete({
        accuracy,
        category: category ?? undefined,
        chestGems: result.chest?.gems,
        from: from ?? undefined,
        time: elapsed,
        xp: result.xpEarned,
      });
    } catch {
      setLoadFailed(true);
    } finally {
      setFinishing(false);
    }
  };

  const retryCurrent = () => {
    setAnswerState("idle");
    setGradeFeedback(null);
    setRendererEpoch((value) => value + 1);
  };

  const next = async () => {
    if (!current || answerState === "idle") return;
    if (
      !isOnboardingLevelTest &&
      answerState === "wrong" &&
      GRAMMAR_TYPES.has(current.question.type)
    ) {
      retryCurrent();
      return;
    }
    if (isJump && hearts <= 0) {
      await finish();
      return;
    }
    let nextQueue = queue;
    if (
      !isJump &&
      !isOnboardingLevelTest &&
      GRAMMAR_TYPES.has(current.question.type) &&
      firstWrongInstances.current.has(current.instanceId) &&
      !current.retry
    ) {
      const retryItem: LessonQueueItem = {
        instanceId: `grammar-retry:${current.question.id}:${Date.now()}`,
        question: current.question,
        retry: true,
      };
      nextQueue = [...queue];
      nextQueue.splice(Math.min(queue.length, cursor + 3), 0, retryItem);
      setQueue(nextQueue);
    }
    const nextIndex = cursor + 1;
    if (nextIndex < nextQueue.length) {
      setCursor(nextIndex);
      setAnswerState("idle");
      setGradeFeedback(null);
      setRendererEpoch(0);
      return;
    }
    if (
      phase === "main" &&
      reviewQuestions.current.size > 0 &&
      !isJump &&
      !isOnboardingLevelTest
    ) {
      setPhase("review");
      setQueue(makeQueue([...reviewQuestions.current.values()], "review", true));
      setCursor(0);
      setAnswerState("idle");
      setGradeFeedback(null);
      setRendererEpoch(0);
      return;
    }
    await finish();
  };

  nextRef.current = next;

  useEffect(() => {
    if (!isOnboardingLevelTest || answerState === "idle") return;
    const timer = window.setTimeout(() => {
      void nextRef.current();
    }, 320);
    return () => window.clearTimeout(timer);
  }, [answerState, current?.instanceId, isOnboardingLevelTest]);

  if (loading) {
    return (
      <main className={`${styles.lessonPage} ${styles.centered}`}>
        <span className={styles.lessonLoader} />
        <strong>Dars tayyorlanmoqda...</strong>
      </main>
    );
  }

  if (loadFailed || !session || !current) {
    return (
      <main className={`${styles.lessonPage} ${styles.centered}`}>
        <div className={styles.loadErrorIcon}>!</div>
        <h1>Darsni yuklab bo&apos;lmadi</h1>
        <p>Aloqani tekshirib, yana bir marta urinib ko&apos;ring.</p>
        <button className={styles.primaryAction} onClick={() => void load()} type="button">Qayta urinish</button>
        <button className={styles.textAction} onClick={() => router.replace(isOnboardingLevelTest ? "/onboarding" : backToLearning(category, from))} type="button">Orqaga</button>
      </main>
    );
  }

  const needsGrammarRetry =
    !isOnboardingLevelTest &&
    answerState === "wrong" &&
    GRAMMAR_TYPES.has(current.question.type);
  return (
    <main className={styles.lessonPage}>
      <header className={styles.lessonHeader}>
        <button aria-label="Yopish" onClick={close} type="button"><MobileIcon name="close" size={28} /></button>
        <div className={styles.progressTrack}><span style={{ width: `${Math.max(3, progress)}%` }} /></div>
        {isJump ? (
          <div className={styles.hearts} aria-label={`${hearts} imkoniyat`}>
            <HomeIcon name="heart" size={22} /><b>{hearts}</b><small>/ {heartLimit}</small>
          </div>
        ) : (
          <div className={styles.energy}>
            {isOnboardingLevelTest ? (
              <><MobileIcon name="school" size={21} /><b>Sinov</b></>
            ) : (
              <><MobileIcon family="material-community" name="lightning-bolt" size={23} /><b>{user?.isSuper ? "∞" : (user?.energy ?? 0)}</b></>
            )}
          </div>
        )}
      </header>

      {phase === "review" ? <div className={styles.reviewRibbon}><HomeIcon name="refresh" size={15} /> Oldingi xatolarni mustahkamlaymiz</div> : null}
      {combo >= 3 ? <div className={styles.comboPill}>⚡ {combo} combo</div> : null}

      <section className={styles.questionStage} key={`${current.instanceId}:${rendererEpoch}`}>
        <QuestionCard
          answerState={answerState}
          combo={combo}
          instanceKey={`${current.instanceId}:${rendererEpoch}`}
          isChecking={checking}
          onAnswer={(answer) => void submitAnswer(answer)}
          onSkip={skipQuestion}
          question={current.question}
        />
      </section>

      {checking ? <div className={styles.checkingToast}>Javob tekshirilmoqda...</div> : null}
      {answerState !== "idle" && !isOnboardingLevelTest ? (
        <aside className={`${styles.feedbackBar} ${answerState === "correct" ? styles.feedbackCorrect : styles.feedbackWrong}`}>
          <div className={styles.feedbackIcon}>
            {answerState === "correct" ? <HomeIcon name="check" size={24} /> : <HomeIcon name="close" size={24} />}
          </div>
          <div className={styles.feedbackCopy}>
            <strong>{gradeFeedback?.title || (answerState === "correct" ? "Juda zo'r!" : "Noto'g'ri")}</strong>
            {gradeFeedback?.feedback ? <p>{gradeFeedback.feedback}</p> : null}
            {answerState === "wrong" ? (
              <p><b>To&apos;g&apos;ri javob:</b> {current.question.answer}</p>
            ) : current.question.answerTranslation ? <p>{current.question.answerTranslation}</p> : null}
            {current.question.explanation ? <small>{current.question.explanation}</small> : null}
          </div>
          <button disabled={finishing} onClick={() => void next()} type="button">
            {finishing ? "Saqlanmoqda..." : needsGrammarRetry ? "Qayta urinish" : "Davom etish"}
          </button>
        </aside>
      ) : null}

      {showQuit ? (
        <div className={styles.modalLayer} role="dialog" aria-modal="true">
          <div className={styles.quitModal}>
            <Image alt="" height={105} src="/characters/hangulmon_default.png" unoptimized width={105} />
            <h2>Darsni to&apos;xtatasizmi?</h2>
            <p>Hozirgi savoldagi jarayon saqlanmaydi.</p>
            <button className={styles.primaryAction} onClick={() => setShowQuit(false)} type="button">Davom ettirish</button>
            <button className={styles.dangerAction} onClick={() => router.replace(isOnboardingLevelTest ? "/onboarding" : backToLearning(category, from))} type="button">To&apos;xtatish</button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
