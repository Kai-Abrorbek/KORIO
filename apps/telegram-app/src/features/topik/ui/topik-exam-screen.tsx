"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  getTopikAttempt,
  getTopikLearningSupport,
  getTopikResult,
  getTopikSession,
  revealTopikHint,
  revealTopikSolution,
  saveTopikAnswers,
  startTopikAttempt,
  submitTopikAttempt,
} from "../api/topik";
import {
  type TopikPlaybackRequest,
  type TopikSpeechSegment,
  useTopikListeningPlayback,
} from "../browser/use-topik-listening-playback";
import {
  flattenTopikQuestions,
  type TopikAttempt,
  type TopikAttemptMode,
  type TopikExamSession,
  type TopikLearningSupport,
  type TopikQuestionWithGroup,
  type TopikRevealedSolution,
  type TopikSaveAnswer,
} from "../model/topik";
import {
  HintPanel,
  ListeningQuestionCard,
  QuestionCard,
  SheetModal,
} from "./topik-exam-parts";
import styles from "./topik-exam-screen.module.css";

const ANSWER_TIME_PER_QUESTION_MS = 10_000;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function answersFromAttempt(attempt: TopikAttempt) {
  return Object.fromEntries(
    attempt.answers.map((answer) => [
      answer.questionId,
      {
        ...answer,
        solutionViewedAt: answer.solutionViewedAt ?? undefined,
      },
    ]),
  ) as Record<string, TopikSaveAnswer>;
}

export function TopikExamScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request, user } = useTelegramAuth();
  const examCode = params.get("examCode") ?? "";
  const reviewAttemptId = params.get("reviewAttemptId") ?? "";
  const reviewQuestionNumber = Math.max(1, Number(params.get("questionNumber")) || 1);
  const isReview = Boolean(reviewAttemptId);
  const rawMode = params.get("mode");
  const mode: TopikAttemptMode = isReview
    ? "guided"
    : rawMode === "mock_exam"
      ? "mock_exam"
      : "guided";
  const premium = Boolean(
    user?.isSuper &&
      (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()),
  );

  const {
    activeKey: activeAudioKey,
    play: playAudio,
    status: playbackStatus,
    stop: stopAudio,
  } = useTopikListeningPlayback(request);
  const [session, setSession] = useState<TopikExamSession | null>(null);
  const [attempt, setAttempt] = useState<TopikAttempt | null>(null);
  const [answers, setAnswers] = useState<Record<string, TopikSaveAnswer>>({});
  const [supports, setSupports] = useState<Record<string, TopikLearningSupport>>({});
  const [solutions, setSolutions] = useState<Record<string, TopikRevealedSolution>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [questionStartedAt, setQuestionStartedAt] = useState(Date.now());
  const [now, setNow] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [actionError, setActionError] = useState<"exit" | "submit" | "support" | null>(null);
  const [playCounts, setPlayCounts] = useState<Record<string, number>>({});
  const playCountsRef = useRef<Record<string, number>>({});
  const autoPlayedRef = useRef(new Set<string>());
  const contentRef = useRef<HTMLDivElement>(null);

  const questions = useMemo(() => flattenTopikQuestions(session), [session]);
  const question = questions[currentIndex];
  const isListening = session?.exam.section === "listening";
  const activeQuestions = useMemo(() => {
    if (!question) return [];
    if (!isListening) return [question];
    return question.group.questions.map((item) => ({ ...item, group: question.group }));
  }, [isListening, question]);
  const activeAudio = activeQuestions[0]?.audio ?? activeQuestions[0]?.group.sharedAudio ?? null;
  const activeRepeatCount = activeAudio
    ? activeAudio.guidedAutoRepeatCount ?? ((activeQuestions[0]?.number ?? 0) >= 21 ? 2 : 1)
    : 1;

  const stepStartIndices = useMemo(() => {
    if (!isListening) return questions.map((_, index) => index);
    return questions.reduce<number[]>((indices, item, index) => {
      if (index === 0 || item.group.code !== questions[index - 1]?.group.code) indices.push(index);
      return indices;
    }, []);
  }, [isListening, questions]);
  const activeStepIndex = Math.max(
    0,
    stepStartIndices.findIndex((start, index) => {
      const end = stepStartIndices[index + 1] ?? questions.length;
      return currentIndex >= start && currentIndex < end;
    }),
  );

  const load = useCallback(async () => {
    if (!premium || !examCode) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadFailed(false);
    stopAudio();
    autoPlayedRef.current.clear();
    playCountsRef.current = {};
    setPlayCounts({});
    try {
      if (reviewAttemptId) {
        const [nextSession, nextAttempt, result] = await Promise.all([
          getTopikSession(request, examCode),
          getTopikAttempt(request, reviewAttemptId),
          getTopikResult(request, reviewAttemptId),
        ]);
        if (nextAttempt.mode !== "guided" || nextAttempt.status !== "submitted" || result.examCode !== examCode) {
          throw new Error("TOPIK_GUIDED_REVIEW_REQUIRED");
        }
        const nextQuestions = flattenTopikQuestions(nextSession);
        const requestedIndex = nextQuestions.findIndex((item) => item.number === reviewQuestionNumber);
        setSession(nextSession);
        setAttempt(nextAttempt);
        setAnswers(answersFromAttempt(nextAttempt));
        setSolutions(Object.fromEntries(result.questions.map((item) => [item.questionId, {
          questionId: item.questionId,
          selectedChoiceKey: item.selectedChoiceKey ?? "",
          correctChoiceKey: item.correctChoiceKey,
          isCorrect: item.isCorrect,
          solution: item.solution,
          viewedAt: result.submittedAt,
        }])));
        setCurrentIndex(requestedIndex >= 0 ? requestedIndex : 0);
        setStartedAt(null);
      } else {
        const [nextSession, nextAttempt] = await Promise.all([
          getTopikSession(request, examCode),
          startTopikAttempt(request, examCode, mode, mode !== "mock_exam"),
        ]);
        const nextQuestions = flattenTopikQuestions(nextSession);
        const savedIndex = nextQuestions.findIndex((item) => item.number === nextAttempt.currentQuestionNumber);
        setSession(nextSession);
        setAttempt(nextAttempt);
        setAnswers(answersFromAttempt(nextAttempt));
        setSupports({});
        setSolutions({});
        setCurrentIndex(savedIndex >= 0 ? savedIndex : Math.min(Math.max(0, nextAttempt.currentQuestionNumber - 1), Math.max(0, nextQuestions.length - 1)));
        setStartedAt(mode === "mock_exam" ? Date.now() - nextAttempt.elapsedSeconds * 1000 : null);
      }
      setQuestionStartedAt(Date.now());
    } catch {
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [examCode, mode, premium, request, reviewAttemptId, reviewQuestionNumber, stopAudio]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    if (mode !== "mock_exam" || isReview) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [isReview, mode]);
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [currentIndex]);

  const mockPlayback = useMemo<TopikPlaybackRequest | null>(() => {
    if (!session || session.exam.section !== "listening") return null;
    const speechSegments = session.groups.flatMap<TopikSpeechSegment>((group) => {
      const groupAudios = group.sharedAudio
        ? [group.sharedAudio]
        : group.questions.flatMap((item) => item.audio ? [item.audio] : []);
      const unique = groupAudios.filter((audio, index) => groupAudios.findIndex((item) => item.key === audio.key) === index);
      return unique.flatMap((audio, audioIndex) => {
        const shared = Boolean(group.sharedAudio);
        const startNumber = shared ? group.startNumber : (group.questions[audioIndex]?.number ?? group.startNumber);
        const endNumber = shared ? group.endNumber : startNumber;
        const repeat = Math.max(1, audio.guidedAutoRepeatCount ?? (startNumber >= 21 ? 2 : 1));
        return Array.from({ length: repeat }, (_, repeatIndex) => ({
          questionNumber: startNumber,
          transcript: [
            ...(repeatIndex === 0 ? [{ speaker: "안내", text: startNumber === endNumber ? `${startNumber}번 문제입니다.` : `${startNumber}번과 ${endNumber}번 문제입니다.` }] : []),
            ...audio.transcript,
          ],
          pauseAfterMs: repeatIndex === repeat - 1 ? (endNumber - startNumber + 1) * ANSWER_TIME_PER_QUESTION_MS : 900,
        }));
      });
    });
    return {
      key: `topik-exam-${session.exam.id}`,
      audioUrl: session.exam.listeningAudioUrl,
      transcript: speechSegments.flatMap((item) => item.transcript),
      speechSegments,
      repeatCount: 1,
      fallbackToSpeech: true,
    };
  }, [session]);

  const playGuided = useCallback(() => {
    if (!activeAudio || !activeQuestions[0]) return;
    const count = playCountsRef.current[activeAudio.key] ?? 0;
    if (count >= activeAudio.guidedPlaybackLimit) return;
    const started = playAudio({
      key: activeAudio.key,
      audioUrl: activeAudio.audioUrl,
      transcript: activeAudio.transcript,
      questionNumber: activeQuestions[0].number,
      repeatCount: activeRepeatCount,
      repeatPauseMs: activeRepeatCount > 1 ? 900 : 0,
      fallbackToSpeech: activeAudio.speechFallback,
    });
    if (!started) return;
    const next = { ...playCountsRef.current, [activeAudio.key]: count + 1 };
    playCountsRef.current = next;
    setPlayCounts(next);
  }, [activeAudio, activeQuestions, activeRepeatCount, playAudio]);

  useEffect(() => {
    if (!attempt || !session || !isListening || loading) return;
    if (attempt.mode === "mock_exam" && mockPlayback) {
      const key = `${attempt.id}:mock`;
      if (autoPlayedRef.current.has(key)) return;
      autoPlayedRef.current.add(key);
      playAudio(mockPlayback);
      return;
    }
    if (!activeAudio) return;
    const key = `${attempt.id}:${isReview ? "review" : "guided"}:${activeAudio.key}`;
    if (autoPlayedRef.current.has(key)) return;
    autoPlayedRef.current.add(key);
    playGuided();
  }, [activeAudio, attempt, isListening, isReview, loading, mockPlayback, playAudio, playGuided, session]);

  useEffect(() => {
    if (isReview || attempt?.mode !== "guided") return;
    activeQuestions.forEach((item) => {
      if (supports[item.id]) return;
      void getTopikLearningSupport(request, attempt.id, item.id)
        .then((support) => setSupports((current) => ({ ...current, [item.id]: support })))
        .catch(() => undefined);
    });
  }, [activeQuestions, attempt, isReview, request, supports]);

  const selectAnswer = (item: TopikQuestionWithGroup, choiceKey: string) => {
    if (solutions[item.id]) return;
    const timestamp = Date.now();
    setAnswers((current) => {
      const existing = current[item.id];
      return { ...current, [item.id]: {
        questionId: item.id,
        selectedChoiceKey: choiceKey,
        durationMs: (existing?.durationMs ?? 0) + Math.max(0, timestamp - questionStartedAt),
        answeredAt: new Date(timestamp).toISOString(),
        usedHintKeys: existing?.usedHintKeys ?? [],
        hintViewCount: existing?.hintViewCount ?? 0,
        solutionViewedAt: existing?.solutionViewedAt,
      }};
    });
    setQuestionStartedAt(timestamp);
  };

  const elapsedSeconds = startedAt ? Math.max(0, Math.floor((now - startedAt) / 1000)) : 0;
  const remainingSeconds = Math.max(0, (session?.exam.durationMinutes ?? 70) * 60 - elapsedSeconds);
  const saveProgress = useCallback(async () => {
    if (!attempt || attempt.status !== "in_progress" || attempt.mode === "mock_exam" || Object.keys(answers).length === 0) return;
    const currentNumber = questions[currentIndex]?.number ?? currentIndex + 1;
    await saveTopikAnswers(request, attempt.id, Object.values(answers), currentNumber, 0);
  }, [answers, attempt, currentIndex, questions, request]);

  const moveBy = async (direction: -1 | 1) => {
    setBusy(true);
    try {
      await saveProgress();
      const step = Math.min(Math.max(activeStepIndex + direction, 0), stepStartIndices.length - 1);
      setCurrentIndex(stepStartIndices[step] ?? 0);
      setQuestionStartedAt(Date.now());
    } finally {
      setBusy(false);
    }
  };

  const revealHint = async (item: TopikQuestionWithGroup) => {
    const support = supports[item.id];
    if (!attempt || !support?.nextHint) return;
    setBusy(true);
    try {
      const revealed = await revealTopikHint(request, attempt.id, item.id, support.nextHint.key);
      const refreshed = await getTopikLearningSupport(request, attempt.id, item.id);
      setSupports((current) => ({ ...current, [item.id]: refreshed }));
      setAnswers((current) => {
        const existing = current[item.id];
        return existing
          ? { ...current, [item.id]: { ...existing, usedHintKeys: revealed.revealedHintKeys, hintViewCount: revealed.hintViewCount } }
          : current;
      });
    } finally {
      setBusy(false);
    }
  };

  const revealSolution = async (item: TopikQuestionWithGroup) => {
    if (!attempt) return;
    setBusy(true);
    setActionError(null);
    try {
      await saveProgress();
      const solution = await revealTopikSolution(request, attempt.id, item.id);
      const support = await getTopikLearningSupport(request, attempt.id, item.id);
      setSolutions((current) => ({ ...current, [item.id]: solution }));
      setSupports((current) => ({ ...current, [item.id]: support }));
      setAnswers((current) => {
        const existing = current[item.id];
        return existing
          ? { ...current, [item.id]: { ...existing, solutionViewedAt: solution.viewedAt } }
          : current;
      });
    } catch {
      setActionError("support");
    } finally {
      setBusy(false);
    }
  };

  const leave = async () => {
    setBusy(true);
    setActionError(null);
    try {
      await saveProgress();
      stopAudio();
      router.back();
    } catch {
      setActionError("exit");
    } finally {
      setBusy(false);
    }
  };

  const submit = async () => {
    if (!attempt) return;
    setBusy(true);
    setActionError(null);
    try {
      if (attempt.mode === "mock_exam" && Object.keys(answers).length) {
        await saveTopikAnswers(request, attempt.id, Object.values(answers), question?.number ?? currentIndex + 1, elapsedSeconds);
      } else {
        await saveProgress();
      }
      await submitTopikAttempt(request, attempt.id);
      const result = await getTopikResult(request, attempt.id);
      stopAudio();
      router.replace(`/topik-result?attemptId=${encodeURIComponent(result.attemptId)}`);
    } catch {
      setActionError("submit");
    } finally {
      setBusy(false);
    }
  };

  if (!premium) return <main className={styles.centered}><MobileIcon name="lock-closed" size={36} /><h1>TOPIK tayyorgarligi — Premium</h1><button onClick={() => router.replace("/premium")} type="button">Premiumni ko‘rish</button></main>;
  if (!examCode) return <main className={styles.centered}><h1>Imtihon ma’lumoti topilmadi.</h1><button onClick={() => router.replace("/topik")} type="button">Imtihon tanloviga qaytish</button></main>;
  if (loading || !question || !attempt) return <main className={styles.centered}>{loadFailed ? <><MobileIcon name="alert-circle-outline" size={34} /><h1>Imtihonni boshlab bo‘lmadi.</h1><button onClick={() => void load()} type="button">Qayta urinish</button></> : <><i className={styles.spinner} /><p>Imtihon tayyorlanmoqda…</p></>}</main>;

  const allActiveAnswered = activeQuestions.every((item) => Boolean(answers[item.id]));
  const showTranscript = isReview || (allActiveAnswered && activeQuestions.some((item) => Boolean(solutions[item.id])));
  const highlightedKeys = new Set([
    ...(supports[question.id]?.revealedHints.flatMap((hint) => hint.targetSegmentKeys) ?? []),
    ...(solutions[question.id]?.solution.keyClues.flatMap((clue) => clue.targetSegmentKeys) ?? []),
  ]);
  const progressEnd = activeQuestions.at(-1)?.number ?? currentIndex + 1;
  const finalNumber = questions.at(-1)?.number ?? questions.length;
  const progressPosition = Math.min(questions.length, currentIndex + Math.max(1, activeQuestions.length));
  const progressLabel = activeQuestions.length > 1 ? `${activeQuestions[0]?.number ?? progressEnd}–${progressEnd} / ${finalNumber}` : `${progressEnd} / ${finalNumber}`;
  const lastStep = activeStepIndex === stepStartIndices.length - 1;
  const answeredCount = Object.keys(answers).length;

  const supportFor = (item: TopikQuestionWithGroup) => <HintPanel busy={busy} onRevealHint={() => void revealHint(item)} onRevealSolution={() => void revealSolution(item)} selected={Boolean(answers[item.id])} solution={solutions[item.id]} support={supports[item.id]} />;

  return <main className={styles.screen}>
    <header className={styles.examHeader}>
      <button aria-label="Yopish" onClick={() => isReview ? router.back() : setExitOpen(true)} type="button"><MobileIcon name="close" size={25} /></button>
      <div className={styles.progressArea}><span><i style={{ width: `${(progressPosition / questions.length) * 100}%` }} /></span><small>{progressLabel}</small></div>
      <div className={styles.timer}><MobileIcon name={mode === "mock_exam" && !isReview ? "time-outline" : "book-outline"} size={16} /><b>{mode === "mock_exam" && !isReview ? formatTime(remainingSeconds) : isReview ? "Izohli takrorlash" : "Izohli o‘rganish"}</b></div>
    </header>
    <div className={styles.scrollContent} ref={contentRef}>
      <div className={styles.statusRow}><b>{isReview ? "Izohli takrorlash" : mode === "guided" ? "Izohli o‘rganish" : "Sinov imtihoni"}</b><span>Javoblar {answeredCount}/{questions.length}</span></div>
      {isListening ? <ListeningQuestionCard activeAudioKey={activeAudioKey} answers={Object.fromEntries(activeQuestions.map((item) => [item.id, answers[item.id]?.selectedChoiceKey]))} mode={attempt.mode} onPlayAudio={playGuided} onSelect={(id, key) => { const item = activeQuestions.find((candidate) => candidate.id === id); if (item) selectAnswer(item, key); }} onStopAudio={stopAudio} playCount={activeAudio ? playCounts[activeAudio.key] ?? 0 : 0} playbackStatus={playbackStatus} questions={activeQuestions} renderSupport={(item) => attempt.mode === "guided" ? supportFor(item) : null} showTranscript={showTranscript} solutions={solutions} /> : <><QuestionCard correctChoiceKey={solutions[question.id]?.correctChoiceKey} disabled={Boolean(solutions[question.id])} highlightedKeys={highlightedKeys} onSelect={(key) => selectAnswer(question, key)} question={question} selectedChoiceKey={answers[question.id]?.selectedChoiceKey} />{attempt.mode === "guided" ? supportFor(question) : null}</>}
    </div>
    <footer className={styles.examFooter}>
      <button disabled={activeStepIndex === 0 || busy} onClick={() => void moveBy(-1)} type="button"><MobileIcon name="chevron-back" size={21} />Oldingi</button>
      {lastStep ? <button className={styles.primaryButton} disabled={busy} onClick={() => isReview ? router.back() : setSubmitOpen(true)} type="button">{isReview ? "Natijaga qaytish" : "Javoblarni yuborish"}</button> : <button className={styles.primaryButton} disabled={busy} onClick={() => void moveBy(1)} type="button">Keyingi<MobileIcon name="chevron-forward" size={21} /></button>}
    </footer>

    <SheetModal onClose={() => !busy && setExitOpen(false)} visible={exitOpen}>
      <div className={styles.modalIcon}><MobileIcon name="document-text-outline" size={28} /><i><MobileIcon name="checkmark" size={13} /></i></div><button aria-label="Davom etish" className={styles.modalClose} onClick={() => setExitOpen(false)} type="button"><MobileIcon name="close" size={21} /></button>
      <h2>Hozircha shu yerda to‘xtaysizmi?</h2><p>Hozirgacha tanlagan javoblaringizni xavfsiz saqlaymiz.</p><ProgressCard answered={answeredCount} total={questions.length} saveNotice />
      {actionError === "exit" ? <ErrorBox message="Internet aloqasini tekshirib, qayta urinib ko‘ring." title="Javoblarni saqlab bo‘lmadi" /> : null}
      <button className={styles.modalPrimary} disabled={busy} onClick={() => setExitOpen(false)} type="button">Davom etish<MobileIcon name="arrow-forward" size={19} /></button><button className={styles.modalSecondaryDanger} disabled={busy} onClick={() => void leave()} type="button"><MobileIcon name="exit-outline" size={18} />Saqlash va chiqish</button>
    </SheetModal>

    <SheetModal onClose={() => !busy && setSubmitOpen(false)} visible={submitOpen}>
      <div className={styles.submitHeading}><span><MobileIcon name="send" size={25} /></span><div><small>YAKUNIY TEKSHIRUV</small><h2>Javoblarni yuborasizmi?</h2></div></div><button aria-label="Bekor qilish" className={styles.modalClose} onClick={() => setSubmitOpen(false)} type="button"><MobileIcon name="close" size={21} /></button>
      <p>Yuborilgandan keyin javoblarni o‘zgartirib bo‘lmaydi.</p><ProgressCard answered={answeredCount} total={questions.length} />
      {actionError === "submit" ? <ErrorBox message="Birozdan keyin qayta urinib ko‘ring." title="Yuborilmadi" /> : null}
      <button className={styles.modalPrimary} disabled={busy} onClick={() => void submit()} type="button"><MobileIcon name="send" size={18} />Yuborish</button><button className={styles.modalSecondary} disabled={busy} onClick={() => setSubmitOpen(false)} type="button">Bekor qilish</button>
    </SheetModal>

    <SheetModal onClose={() => setActionError(null)} visible={actionError === "support"}>
      <div className={`${styles.modalIcon} ${styles.errorIcon}`}><MobileIcon name="bulb-outline" size={30} /></div><h2>Yechimni ochib bo‘lmadi.</h2><p>Javobni saqlab, qayta urinib ko‘ring.</p><button className={styles.modalPrimary} onClick={() => { setActionError(null); void revealSolution(question); }} type="button"><MobileIcon name="refresh" size={18} />Qayta urinish</button><button className={styles.modalSecondary} onClick={() => setActionError(null)} type="button">Bekor qilish</button>
    </SheetModal>
  </main>;
}

function ProgressCard({ answered, total, saveNotice = false }: { answered: number; total: number; saveNotice?: boolean }) {
  const percent = total ? Math.min(100, Math.round(answered / total * 100)) : 0;
  const unanswered = Math.max(0, total - answered);
  return <section className={styles.modalProgress}><header><b>Javoblar {answered}/{total}</b><span>{percent}%</span></header><div><i style={{ width: `${percent}%` }} /></div>{saveNotice ? <p><MobileIcon name="cloud-done-outline" size={17} />Istalgan vaqtda qaytib, saqlangan javoblardan davom eting.</p> : <p className={unanswered ? styles.warningNotice : styles.completeNotice}><MobileIcon name={unanswered ? "warning-outline" : "checkmark-circle"} size={17} />{unanswered ? `Hali ${unanswered} ta savol javobsiz qolgan.` : "Yuborilgandan keyin javoblarni o‘zgartirib bo‘lmaydi."}</p>}</section>;
}

function ErrorBox({ title, message }: { title: string; message: string }) {
  return <div className={styles.errorBox}><MobileIcon name="warning-outline" size={20} /><span><b>{title}</b><p>{message}</p></span></div>;
}
