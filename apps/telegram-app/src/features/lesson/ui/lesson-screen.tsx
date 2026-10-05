"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  completeJumpTest,
  completeLegend,
  completeLesson,
  completePractice,
  completeStudyNode,
  getJumpTest,
  getLesson,
  getNodeReview,
  claimComboBonus,
  spendEnergy as spendServerEnergy,
  getMistakeQuestions,
  getUnitPractice,
  getWordPractice,
  gradeTypedAnswer,
  reportLessonProgress,
  resolveMistakes,
} from "../api/lesson";
import { openEnergyModal } from "../../energy/energy-gate";
import { EnergySurge } from "../../energy/energy-surge";
import { energySpendsSettled, trackEnergySpend } from "../../energy/energy-sync";
import { rt } from "../../retention/model/retention";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
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
import { FeedbackBar, LessonHeader, QuitLessonModal, ReviewIntro } from "./lesson-chrome";
import { LessonSpeechProvider } from "./questions/shared";
import styles from "./lesson.module.css";
import { playSfx } from "../../../shared/browser/sfx";

const SMART_TYPES = new Set(["type_answer", "translate_type", "listen_type", "listen_fill"]);
const GRAMMAR_TYPES = new Set(["grammar_blank", "grammar_build"]);
const LEGEND_SEGMENTS = [5, 7, 10] as const;
const LEGEND_TOTAL = 22;
const LEGEND_DURATION = 180;
const LEGEND_XP = 100;
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

/** 문법 트랙 오답은 맞힐 때까지 최대 이만큼 다시 낸다 (앱 GRAMMAR_RETRY_LIMIT) */
const GRAMMAR_RETRY_LIMIT = 2;
/** "복습으로 에너지 벌기" 한 판의 문제 수 (벌 수 있는 양은 서버가 정한다) */
const EARN_SESSION_QUESTIONS = 8;

function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let index = out.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [out[index], out[random]] = [out[random]!, out[index]!];
  }
  return out;
}

/** 문법 레슨은 시드 순서가 늘 같다 — 유형은 번갈아 두고 안쪽만 섞는다 (앱 shuffleGrammarQuestions) */
function shuffleGrammarQuestions(questions: readonly LessonQuestion[]): LessonQuestion[] {
  const blank = shuffle(questions.filter((question) => question.type === "grammar_blank"));
  const build = shuffle(questions.filter((question) => question.type === "grammar_build"));
  const rest = questions.filter((question) => question.type !== "grammar_blank" && question.type !== "grammar_build");
  if (!blank.length || !build.length) return shuffle(questions);
  const out: LessonQuestion[] = [];
  for (let index = 0; index < Math.max(blank.length, build.length); index += 1) {
    if (blank[index]) out.push(blank[index]!);
    if (build[index]) out.push(build[index]!);
  }
  return [...out, ...shuffle(rest)];
}

function LegendLessonHeader({
  currentIndex,
  onClose,
  onTimeout,
}: {
  currentIndex: number;
  onClose: () => void;
  onTimeout: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(LEGEND_DURATION);
  const timeoutCallback = useRef(onTimeout);
  timeoutCallback.current = onTimeout;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          timeoutCallback.current();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  let cumulative = 0;
  const checkpoints = LEGEND_SEGMENTS.map((segment) => {
    cumulative += segment;
    return { at: cumulative, label: segment };
  });
  const fill = Math.min(100, (currentIndex / LEGEND_TOTAL) * 100);
  const time = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;

  return (
    <header className={styles.legendHeader}>
      <button aria-label="Yopish" onClick={onClose} type="button"><MobileIcon name="close" size={30} /></button>
      <div className={styles.legendBarWrap}>
        <div className={styles.legendTrack}>
          <span className={styles.legendFill} style={{ width: `${fill}%` }} />
          {checkpoints.map((checkpoint) => {
            const cleared = currentIndex >= checkpoint.at;
            return (
              <i
                className={cleared ? styles.legendDotCleared : styles.legendDot}
                key={checkpoint.at}
                style={{ left: `${(checkpoint.at / LEGEND_TOTAL) * 100}%` }}
              >
                {checkpoint.label}
              </i>
            );
          })}
        </div>
      </div>
      <div aria-label={`${time} qoldi`} className={styles.legendTimer}>
        <span><MobileIcon name="lock-closed" size={15} /></span><b>{time}</b>
      </div>
    </header>
  );
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
  // 급수 시험: 어느 급의 시험인지. 없으면 지금 급 (잠긴 급을 열 때 그 아래 급)
  const examLevel = Number(params.get("examLevel")) || undefined;
  const isJump = mode === "jumpTest";
  const isLegend = mode === "legend";
  const isLevelExam = mode === "levelExam";
  const isOnboardingLevelTest = mode === "levelTest";
  const isReview = mode === "review";
  // 에너지가 바닥나서 들어온 "복습으로 에너지 벌기" 판 — 짧게 끝내고 원래 자리로 (앱과 같다)
  const isEarnEnergy = isReview && params.get("earn") === "1";
  const isWordPractice = mode === "wordPractice";
  const isGrammarTrack = category === "grammar" && !isJump;
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
  const [legendCurrentIndex, setLegendCurrentIndex] = useState(0);
  /** 본편이 끝나고 복습 전에 한 번 보여 주는 안내 (앱의 reviewIntro 단계) */
  const [reviewIntro, setReviewIntro] = useState(false);

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
  const grammarRetryCounts = useRef(new Map<string, number>());
  const reviewCorrectIds = useRef(new Set<string>());
  /** 이번 판에 쓴 에너지 (본풀이 문제 수 — 맞든 틀리든 문제당 1). 완료 정산에 쓴다 */
  const localSpent = useRef(0);
  /** 이번 판에 이미 에너지를 낸 문제 id — 같은 문제를 다시 물을 때 두 번 안 받는다 */
  const energyChargedIds = useRef(new Set<string>());
  // 에너지 세션 — 이번 판 id 와 서버가 이미 깎은 양 (앱 lesson.tsx 와 같다).
  // 맞힐 때마다 서버가 바로 깎고, 완료 때는 이미 깎은 만큼을 빼고 정산한다
  const energySession = useRef(`${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);
  const energyCharged = useRef(0);
  /** 서버에 못 닿은 차감 수 — 끝내지 않고 나갈 때 다시 보낸다 */
  const energyFailed = useRef(0);
  /** 완료 정산을 보냈다 — 그 뒤엔 재전송하면 두 번 깎인다 */
  const energySettled = useRef(false);
  const bonusGiven = useRef(false);
  const [bonusAmount, setBonusAmount] = useState<number | null>(null);
  /** 콤보 보상 연출 — 번개(배터리) / 에너지 코어 중 매번 랜덤 */
  const [bonusVariant, setBonusVariant] = useState<"battery" | "surge">("battery");
  /** 에너지 벌기 판 — 연출이 끝나면 레슨을 나간다 */
  const leaveAfterBonus = useRef(false);

  // 끝내지 않고 나갈 때 — 서버에 못 닿은 차감을 다시 보낸다 (앱 retryFailedSpends 와 같다).
  // 안 그러면 실패한 만큼은 영영 안 깎여서, 나갔다 오면 그만큼 "다시 차" 있다
  const requestRef = useRef(request);
  requestRef.current = request;
  useEffect(
    () => () => {
      if (energySettled.current) return;
      let left = energyFailed.current;
      energyFailed.current = 0;
      while (left > 0) {
        const amount = Math.min(5, left);
        left -= amount;
        void trackEnergySpend(
          spendServerEnergy(requestRef.current, energySession.current, amount),
        ).catch(() => undefined);
      }
    },
    [],
  );

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
    grammarRetryCounts.current.clear();
    reviewCorrectIds.current.clear();
    localSpent.current = 0;
    energyChargedIds.current.clear();
    bonusGiven.current = false;
    setBonusAmount(null);
    setCursor(0);
    setPhase("main");
    setAnswerState("idle");
    setGradeFeedback(null);
    setCombo(0);
    setLegendCurrentIndex(0);
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
      } else if (isLegend) {
        if (!nodeId) throw new Error("NODE_ID_REQUIRED");
        const result = await getNodeReview(request, nodeId, LEGEND_TOTAL);
        next = {
          category: category ?? "",
          lessonId: "legend",
          lessonTitle: "Legend",
          questions: result.questions,
          totalXp: LEGEND_XP,
        };
      } else if (isReview) {
        const result = await getMistakeQuestions(request);
        next = {
          category: "",
          lessonId: "review",
          lessonTitle: "Takrorlash",
          // 에너지 벌기 판은 짧게 — 한 판에 벌 수 있는 양이 정해져 있다
          questions: isEarnEnergy
            ? result.questions.slice(0, EARN_SESSION_QUESTIONS)
            : result.questions,
          totalXp: 16,
        };
      } else if (isWordPractice) {
        const result = await getWordPractice(request);
        next = {
          category: "",
          lessonId: "word-practice",
          lessonTitle: "So'z mashqi",
          questions: result.questions,
          totalXp: 10,
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
        const result = await getLevelExam(request, examLevel);
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
        if (next.category === "grammar") {
          next = { ...next, questions: shuffleGrammarQuestions(next.questions) };
        }
      }
      if (!next.questions.length) throw new Error("EMPTY_LESSON");
      setSession(next);
      setQueue(makeQueue(next.questions, "main"));
    } catch (error) {
      // 에너지 0 — 서버가 시작을 막았다. 화면 숫자를 0 으로 맞추고 에너지 모달 후 돌아간다 (앱과 같음)
      if ((error as { code?: string })?.code === "ENERGY_EMPTY") {
        updateUser({ energy: 0 });
        openEnergyModal();
        if (window.history.length > 1) router.back(); else router.replace("/home");
        return;
      }
      setSession(null);
      setQueue([]);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [category, examLevel, group, isEarnEnergy, isJump, isLegend, isLevelExam, isOnboardingLevelTest, isReview, isWordPractice, kind, lessonId, lessonNumber, mode, nodeId, request, resetRun, router, section, selfReportedLevel, target, unit, updateUser]);

  // 오답 복습: 화면을 벗어날 때(중간 이탈 포함) 그때까지 맞힌 문제를 오답에서 뺀다
  useEffect(() => {
    if (!isReview) return;
    const correct = reviewCorrectIds.current;
    const finalWrong = finalWrongIds.current;
    return () => {
      const ids = [...correct].filter((id) => !finalWrong.has(id));
      if (ids.length > 0) void resolveMistakes(request, ids).catch(() => undefined);
    };
  }, [isReview, request]);

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

  // 텔레그램 뒤로가기도 X 버튼과 같게 (그만둘지 먼저 묻는다)
  useTelegramBackOverride(() => close());

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
        if (isReview) reviewCorrectIds.current.add(current.question.id);
        if (current.retry || phase === "review") finalWrongIds.current.delete(current.question.id);
      } else {
        firstWrongInstances.current.add(current.instanceId);
        allWrongIds.current.add(current.question.id);
        finalWrongIds.current.add(current.question.id);
        // 앱과 같은 규칙: 문법 트랙은 몇 문제 뒤에 다시 내고(next 에서),
        // 그 밖의 학습은 틀린 문제를 모아 마지막에 복습한다
        if (!isJump && !isOnboardingLevelTest && !isGrammarTrack && phase === "main") {
          reviewQuestions.current.set(current.question.id, current.question);
        }
      }
    } else if (correct && (current.retry || phase === "review")) {
      finalWrongIds.current.delete(current.question.id);
    }

    if (correct) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setAnswerState("correct");
      spendEnergy(current.question.id, nextCombo);
    } else {
      setCombo(0);
      // 틀려도 문제당 1 (앱과 같다)
      spendEnergy(current.question.id, null);
      if (isJump && firstAttempt) setHearts((value) => Math.max(0, value - 1));
      setAnswerState("wrong");
    }
    setGradeFeedback(serverGrade);
  };

  /**
   * 본풀이 문제는 **맞든 틀리든** 한 문제당 1 (앱 lesson.tsx 와 같다).
   * 같은 문제를 다시 묻는 건 공짜 — 오답 복습 라운드, 문법 즉석 재도전.
   * 서버에서 바로 깎고, 완료 때는 이미 깎은 만큼 빼고 정산한다.
   * nextCombo 는 맞혔을 때만 넘긴다 (4연속 보너스 판정용).
   */
  const spendEnergy = (questionId: string, nextCombo: number | null) => {
    const superActive = Boolean(
      user?.isSuper && (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()),
    );
    // 서버가 실제로 깎는 모드와 같아야 한다 — 일반 레슨·학습 로드 문제 레슨만.
    // 오답 복습·연습·레전드 등은 안 쓰고, 틀린 문제 다시 풀기(복습 라운드)도 무료다 (앱과 같음)
    const consumes = mode === "lesson" || mode === "unitPractice";
    if (superActive || !consumes || phase === "review") return;

    let spending: Promise<void> = Promise.resolve();
    if (!energyChargedIds.current.has(questionId)) {
      energyChargedIds.current.add(questionId);
      localSpent.current += 1;
      const nextEnergy = Math.max(0, (user?.energy ?? 0) - 1);
      updateUser({ energy: nextEnergy });
      // 레슨 도중에 바닥났다 — 다음 문제로 못 넘어간다 (next 가 막는다)
      if (nextEnergy <= 0) openEnergyModal(true);

      // 서버에서 바로 깎는다 — 몇 문제 풀다 나가도 깎인 채로 남는다 (실패해도 완료 때 정산).
      // 다른 화면의 에너지 조회가 이 차감이 끝나길 기다린다 (trackEnergySpend)
      spending = trackEnergySpend(spendServerEnergy(request, energySession.current))
        .then(() => {
          energyCharged.current += 1;
        })
        .catch(() => {
          energyFailed.current += 1;
        });
    }

    // 4연속 정답 보너스 — 레슨당 한 번. 횟수·간격은 서버가 막는다.
    // 방금 차감이 서버에 반영된 뒤에 묻는다
    if (nextCombo !== null && nextCombo % 4 === 0 && !bonusGiven.current) {
      let spentSoFar = 0;
      void spending
        .then(() => {
          spentSoFar = Math.max(0, localSpent.current - energyCharged.current);
          return claimComboBonus(request, spentSoFar);
        })
        .then((bonus) => {
          if (bonus.bonusGranted <= 0) return;
          bonusGiven.current = true;
          // 서버 값에서 아직 안 깎인 몫만 빼서 보여준다
          updateUser({ energy: Math.max(0, bonus.energy - spentSoFar), gems: bonus.gems });
          // 같은 연출만 반복되면 금방 질린다 — 둘 중 하나를 랜덤으로 (앱과 같다)
          const variant = Math.random() < 0.5 ? "battery" : "surge";
          setBonusVariant(variant);
          setBonusAmount(bonus.bonusGranted);
          if (variant === "battery") {
            window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
            window.setTimeout(() => setBonusAmount(null), 2200);
          }
        })
        .catch(() => undefined);
    }
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

  /**
   * 건너뛰기 — 앱 lesson.tsx handleSkip 과 같은 규칙.
   *   일반 학습: 조용히 다음 문제로 (오답 기록·복습 큐 없음, 콤보 유지)
   *   레벨 테스트: 맞힌 걸로 안 친다 (점수만 낮아진다)
   *   점프 테스트: 오답(하트 -1) — 서버 합격 기준이 wrongCount 라서 조용히 넘기면
   *                듣기·말하기를 다 건너뛰고 통과할 수 있다
   */
  const skipQuestion = () => {
    if (!current || answerState !== "idle" || checking) return;
    if (isJump) {
      commitGrade(false);
      return;
    }
    if (isOnboardingLevelTest && !answeredInstances.current.has(current.instanceId)) {
      answeredInstances.current.add(current.instanceId);
      totalCount.current += 1;
    }
    void advance(queue);
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
    // 정산 전에 날아가 있는 차감이 서버에 닿게 한다 — 안 그러면 정산이 그 몫을 한 번 더 깎는다
    energySettled.current = true;
    await energySpendsSettled();
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
          level: examLevel,
          questionIds,
          speedSeconds: elapsed,
          wrongQuestionIds: wrong,
        });
        // 보석도 같이 갈아 끼운다 — 결과 화면은 "+보석" 을 보여 주는데 헤더는 옛 값이면 안 된다
        updateUser({
          totalXP: result.totalXP,
          ...(result.gems != null ? { gems: result.gems } : {}),
        });
        // 앱처럼 졸업 시험 전용 결과 화면으로
        const query = new URLSearchParams({
          correct: String(result.correct),
          gems: String(result.gemsEarned),
          level: String(result.level),
          nextLevel: result.nextLevel ? String(result.nextLevel) : "",
          passed: result.passed ? "1" : "0",
          total: String(result.total),
          weak: result.weakAreas.join(","),
          xp: String(result.xpEarned),
          // 다시 도전할 때 같은 급 시험을 다시 보게
          examLevel: examLevel ? String(examLevel) : "",
        });
        router.replace(`/level-exam-result?${query.toString()}`);
        return;
      }

      if (isLegend) {
        if (!nodeId) throw new Error("NODE_ID_REQUIRED");
        const result = await completeLegend(request, nodeId);
        updateUser({ totalXP: result.totalXP });
        routeComplete({
          accuracy,
          category: category ?? undefined,
          time: elapsed,
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
          energySpent: localSpent.current,
          energySession: energySession.current,
        });
        // 서버가 깎은 진짜 에너지로 덮는다 (화면은 미리 줄여 보였을 뿐)
        // 로드 문제 노드도 학습 완료 — 도장·연속 상자를 완료 화면이 이어 띄운다 (앱과 동일)
        const celebration = result.celebration ?? null;
        updateUser({
          totalXP: result.totalXP,
          ...(typeof result.energy === "number" ? { energy: result.energy } : {}),
          ...(celebration?.streakChest ? { gems: celebration.gems } : {}),
        });
        // 보상 저장이 끝난 뒤 노드 완료만 실패한 경우, 같은 연습을 다시 제출해
        // 보상이 중복될 수 없도록 완료 화면은 그대로 보여준다.
        await completeStudyNode(request, {
          group,
          kind,
          lesson: lessonNumber,
          section,
          unit,
        }).catch(() => undefined);
        routeComplete({
          accuracy,
          dailyStreak: celebration?.dailyStreak ? celebration.dailyStreak.streak : undefined,
          from: from ?? undefined,
          gemTotal: celebration ? celebration.gems - (celebration.streakChest?.gems ?? 0) : undefined,
          streakChestDays: celebration?.streakChest ? celebration.streakChest.streak : undefined,
          streakChestGems: celebration?.streakChest ? celebration.streakChest.gems : undefined,
          streakWeek: celebration?.dailyStreak ? JSON.stringify(celebration.dailyStreak.week) : undefined,
          time: elapsed,
          xp: result.xpEarned,
        });
        return;
      }

      if (isReview || isWordPractice) {
        const result = await completePractice(request, {
          combo,
          mode: isWordPractice ? "wordPractice" : "review",
          questionIds,
          speedSeconds: elapsed,
          wrongQuestionIds: wrong,
          ...(isEarnEnergy ? { earnEnergy: true } : {}),
        });
        updateUser({
          totalXP: result.totalXP,
          ...(isEarnEnergy && typeof result.energy === "number" ? { energy: result.energy } : {}),
        });
        // 에너지 벌기 판 — 번 만큼 연출하고 바닥났던 레슨으로 돌아간다
        if (isEarnEnergy) {
          const got = result.energyEarned ?? 0;
          if (got > 0) {
            leaveAfterBonus.current = true;
            setBonusVariant("surge");
            setBonusAmount(got);
          } else if (window.history.length > 1) router.back();
          else router.replace("/home");
          return;
        }
        routeComplete({ accuracy, time: elapsed, xp: result.xpEarned });
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
        energySpent: localSpent.current,
          energySession: energySession.current,
      });
      pendingAnswers.current = [];
      updateUser({ energy: result.energy, gems: result.gems, totalXP: result.totalXP });
      // 완료 화면이 이어서 띄울 축하들 (앱과 같은 파라미터):
      //   오늘의 첫 레슨 → 연속 학습 / 유닛 완료 → 스코어 상승 / 상자 → 상자 열기
      // "오늘 처음인가"·"유닛을 끝냈나" 판정은 서버가 한다 (클라가 세면 또 축하한다)
      const gemsBefore = result.gems - (result.chest?.gems ?? 0) - (result.streakChest?.gems ?? 0);
      routeComplete({
        accuracy,
        category: category ?? undefined,
        chestGems: result.chest ? result.chest.gems : undefined,
        chestGrade: result.chest?.grade,
        dailyStreak: result.dailyStreak ? result.dailyStreak.streak : undefined,
        from: from ?? undefined,
        gemTotal: gemsBefore,
        scoreUp: result.unitCompleted ? result.unitCompleted.score : undefined,
        scoreUpUnit: result.unitCompleted ? result.unitCompleted.unit : undefined,
        streakWeek: result.dailyStreak ? JSON.stringify(result.dailyStreak.week) : undefined,
        // 연속 3·6·9…일째 보상 상자 — 도장 화면 바로 뒤에 연다
        streakChestDays: result.streakChest ? result.streakChest.streak : undefined,
        streakChestGems: result.streakChest ? result.streakChest.gems : undefined,
        time: elapsed,
        xp: result.xpEarned,
      });
    } catch {
      setLoadFailed(true);
    } finally {
      setFinishing(false);
    }
  };

  const next = async () => {
    if (!current || answerState === "idle") return;
    // ── 에너지 0 ── 다음 본풀이 문제는 에너지가 있어야 푼다 (앱과 같다).
    // 이미 낸 문제(문법 재도전)·복습 라운드·끝(복습 안내/완료)은 막지 않는다
    const superNow = Boolean(
      user?.isSuper && (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()),
    );
    if (
      !superNow &&
      (mode === "lesson" || mode === "unitPractice") &&
      phase === "main"
    ) {
      const upcoming = queue[cursor + 1];
      const needsEnergy =
        !!upcoming && !energyChargedIds.current.has(upcoming.question.id);
      if (needsEnergy && (user?.energy ?? 0) <= 0) {
        openEnergyModal(true);
        return;
      }
    }
    if (isJump && hearts <= 0) {
      await finish();
      return;
    }
    let nextQueue = queue;
    // 문법 트랙: 틀린 문제를 2~4문제 뒤에 다시 낸다, 문제당 최대 GRAMMAR_RETRY_LIMIT 번
    if (
      isGrammarTrack &&
      phase === "main" &&
      firstWrongInstances.current.has(current.instanceId)
    ) {
      const previous = grammarRetryCounts.current.get(current.question.id) ?? 0;
      if (previous < GRAMMAR_RETRY_LIMIT) {
        const retryNumber = previous + 1;
        grammarRetryCounts.current.set(current.question.id, retryNumber);
        const retryItem: LessonQueueItem = {
          instanceId: `grammar-retry:${current.question.id}:${retryNumber}`,
          question: current.question,
          retry: true,
        };
        const gap = 2 + ((cursor + retryNumber) % 3);
        nextQueue = [...queue];
        nextQueue.splice(Math.min(queue.length, cursor + gap + 1), 0, retryItem);
        setQueue(nextQueue);
      }
    }
    await advance(nextQueue);
  };

  /** 다음 문제로. 단계(본편 → 복습)가 끝나면 완료로 */
  const advance = async (nextQueue: LessonQueueItem[]) => {
    const nextIndex = cursor + 1;
    if (nextIndex < nextQueue.length) {
      if (isLegend) setLegendCurrentIndex((value) => value + 1);
      setCursor(nextIndex);
      setAnswerState("idle");
      setGradeFeedback(null);
      return;
    }
    if (
      phase === "main" &&
      reviewQuestions.current.size > 0 &&
      !isJump &&
      !isOnboardingLevelTest
    ) {
      if (isLegend) setLegendCurrentIndex((value) => value + 1);
      setAnswerState("idle");
      setGradeFeedback(null);
      setReviewIntro(true);
      return;
    }
    await finish();
  };

  /** "Endi xato qilgan savollarni ishlaymizmi?" → 복습 시작 */
  const startReview = () => {
    setReviewIntro(false);
    setPhase("review");
    setCombo(0);
    setQueue(makeQueue([...reviewQuestions.current.values()], "review", true));
    setCursor(0);
    setAnswerState("idle");
    setGradeFeedback(null);
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
        <button className={styles.primaryAction} onClick={() => { playSfx("click"); void load(); }} type="button">Qayta urinish</button>
        <button className={styles.textAction} onClick={() => router.replace(isOnboardingLevelTest ? "/onboarding" : backToLearning(category, from))} type="button">Orqaga</button>
      </main>
    );
  }

  // 문법 문제는 결과·힌트를 카드 안에서 보여 주고 스스로 다음으로 넘긴다 (앱 HIDES_FEEDBACK_BAR).
  // 아래 피드백 바까지 뜨면 같은 말을 두 번 하게 된다.
  const hidesFeedbackBar = GRAMMAR_TYPES.has(current.question.type);
  return (
    <LessonSpeechProvider>
    <main className={styles.lessonPage}>
      {isLegend ? (
        <LegendLessonHeader
          currentIndex={legendCurrentIndex}
          onClose={() => setShowQuit(true)}
          onTimeout={() => router.replace(backToLearning(category, from))}
        />
      ) : (
        <LessonHeader
          answerState={answerState}
          badge={isOnboardingLevelTest ? <><MobileIcon name="school" size={21} /><b>Sinov</b></> : undefined}
          combo={combo}
          energy={user?.energy ?? 0}
          hearts={hearts}
          isSuper={Boolean(user?.isSuper && (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()))}
          maxHearts={heartLimit}
          onClose={close}
          progress={progress / 100}
          showCombo={answerState === "correct"}
          showHearts={isJump}
        />
      )}

      {reviewIntro ? <ReviewIntro onContinue={startReview} /> : (
      <>
      <section className={styles.questionStage} key={current.instanceId}>
        <QuestionCard
          answerState={answerState}
          combo={combo}
          instanceKey={current.instanceId}
          isChecking={checking}
          onAnswer={(answer) => void submitAnswer(answer)}
          onNext={() => void next()}
          onSkip={skipQuestion}
          question={current.question}
        />
      </section>

      {checking ? <div className={styles.checkingToast}>Javob tekshirilmoqda...</div> : null}
      {/* 4연속 정답 보너스 — 앱 EnergyBonusPopup (배터리 + 파티클) */}
      {bonusAmount && bonusVariant === "surge" ? (
        <EnergySurge
          amount={bonusAmount}
          onDone={() => {
            setBonusAmount(null);
            if (leaveAfterBonus.current) {
              if (window.history.length > 1) router.back();
              else router.replace("/home");
            }
          }}
          subtitle={isEarnEnergy ? rt("earn.surgeSub") : undefined}
        />
      ) : null}
      {bonusAmount && bonusVariant === "battery" ? (
        <div aria-live="polite" className={styles.energyBonus}>
          {Array.from({ length: 10 }, (_, index) => {
            const angle = (index / 10) * Math.PI * 2;
            const distance = 90 + (index % 3) * 22;
            return (
              <i
                key={index}
                style={{
                  "--bonus-rot": `${(index % 2 === 0 ? 1 : -1) * (20 + index * 8)}deg`,
                  "--bonus-size": `${14 + (index % 3) * 8}px`,
                  "--bonus-x": `${Math.cos(angle) * distance}px`,
                  "--bonus-y": `${Math.sin(angle) * distance}px`,
                  background: index % 2 === 0 ? "#FFE88A" : "#FFD93B",
                } as CSSProperties}
              />
            );
          })}
          <span className={styles.bonusBattery}><em /><b data-no-translate>+{bonusAmount}</b></span>
          <span className={styles.bonusCap} />
        </div>
      ) : null}
      {answerState !== "idle" && !isOnboardingLevelTest && !hidesFeedbackBar ? (
        <FeedbackBar
          answer={current.question.answer}
          answerTranslation={current.question.answerTranslation}
          busy={finishing}
          explanation={current.question.explanation}
          gradingFeedback={gradeFeedback}
          onNext={() => void next()}
          state={answerState}
        />
      ) : null}
      </>
      )}

      <QuitLessonModal
        onContinue={() => setShowQuit(false)}
        onQuit={() => router.replace(isOnboardingLevelTest ? "/onboarding" : backToLearning(category, from))}
        visible={showQuit}
      />
    </main>
    </LessonSpeechProvider>
  );
}
