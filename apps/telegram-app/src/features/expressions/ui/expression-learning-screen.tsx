"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useWebSpeechRecorder } from "../../lesson/model/use-web-speech-recorder";
import { normalizeAnswer } from "../../lesson/model/lesson";
import { assessExpression } from "../../speaking/api/speaking";
import { wordToneOf, type AssessResult } from "../../speaking/model/speaking";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { getExpressionNode, recordExpressionView } from "../api/expressions";
import {
  buildLearningQueue,
  buildRecallQueue,
  buildTypingPlan,
  expressionPackTheme,
  type ExpressionLearningQueueItem,
  type ExpressionNodeLearningResponse,
} from "../model/expressions";
import styles from "./expression-learning-screen.module.css";

type VoicePhase = "idle" | "recording" | "analyzing" | "done";
type TypeState = "idle" | "wrong" | "correct";

const SPEECH_LEVEL = { polite: "Hurmat shakli", casual: "Norasmiy", formal: "Rasmiy" } as const;
const STAGE_LABEL = { learn: "1-bosqich · O'rganish", guided: "2-bosqich · Takrorlash", recall: "3-bosqich · Eslash" } as const;
const STAGE_PROMPT = {
  learn: "Tinglang va o'zingiz aytib ko'ring",
  guided: "Iboraga qarab tabiiy aytib ko'ring",
  recall: "Ma'nosiga qarab koreyscha ayting",
} as const;

export function ExpressionLearningScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const nodeCode = params.get("node") ?? "";
  const { request, user } = useTelegramAuth();
  const premium = Boolean(
    user?.isSuper &&
      (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()),
  );
  const {
    prewarm,
    progress: speechProgress,
    speak,
    speaking,
    stop: stopSpeech,
  } = useKoreanSpeech(request);
  const [session, setSession] = useState<ExpressionNodeLearningResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [index, setIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [recallStarted, setRecallStarted] = useState(false);
  const [retryItems, setRetryItems] = useState<ExpressionLearningQueueItem[]>([]);
  const [offerOpen, setOfferOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [typingActive, setTypingActive] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [typeState, setTypeState] = useState<TypeState>("idle");
  const [hintVisible, setHintVisible] = useState(false);
  const [practiceReady, setPracticeReady] = useState(true);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voicePhase, setVoicePhase] = useState<VoicePhase>("idle");
  const [voiceResult, setVoiceResult] = useState<AssessResult | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recordedKeys = useRef(new Set<string>());
  const retriedIds = useRef(new Set<string>());
  const offerShown = useRef(false);
  const recallResumeIndex = useRef<number | null>(null);
  const targetExpressionId = useRef<string | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const advanceRef = useRef<(force?: boolean) => Promise<void>>(async () => undefined);

  const load = useCallback(async () => {
    if (!premium) { setLoading(false); return; }
    if (!nodeCode) { setLoadFailed(true); setLoading(false); return; }
    setLoading(true);
    setLoadFailed(false);
    setSession(null);
    setCompleted(false);
    setRecallStarted(false);
    setRetryItems([]);
    setIndex(0);
    offerShown.current = false;
    recordedKeys.current.clear();
    retriedIds.current.clear();
    recallResumeIndex.current = null;
    try { setSession(await getExpressionNode(request, nodeCode)); }
    catch { setLoadFailed(true); }
    finally { setLoading(false); }
  }, [nodeCode, premium, request]);

  useEffect(() => { void load(); }, [load]);
  const learningQueue = useMemo(() => session ? buildLearningQueue(session.items, session.node.requiredExposures) : [], [session]);
  const recallQueue = useMemo(() => session ? buildRecallQueue(session.items, session.node.requiredExposures, learningQueue.at(-1)?.expression.id) : [], [learningQueue, session]);
  const queue = useMemo(() => recallStarted ? [...learningQueue, ...recallQueue, ...retryItems] : learningQueue, [learningQueue, recallQueue, recallStarted, retryItems]);
  const current = queue[index] ?? null;
  const requiresAnswer = current?.kind === "quiz" || current?.kind === "retry";
  const readyForRecall = !recallStarted && learningQueue.length > 0 && index >= learningQueue.length - 1;
  const progress = queue.length ? (index + 1) / queue.length : 0;
  const theme = expressionPackTheme(session?.topic.code);
  const typingPlan = useMemo(() => current ? buildTypingPlan(current.expression.korean, current.expression.id, current.stage, current.exposure) : null, [current]);

  const scheduleRetry = useCallback(() => {
    if (!current || current.kind === "retry" || retriedIds.current.has(current.expression.id)) return;
    retriedIds.current.add(current.expression.id);
    setRetryItems((items) => [...items, {
      key: `${current.expression.id}-retry-${Date.now()}`,
      expression: current.expression,
      stage: "recall",
      exposure: Math.max(current.exposure + 1, session?.node.requiredExposures ?? 3),
      kind: "retry",
      recordsView: false,
    }]);
  }, [current, session?.node.requiredExposures]);

  const {
    cancel: cancelRecording,
    start: startRecording,
    stop: stopRecording,
  } = useWebSpeechRecorder({
    onError: (code) => {
      setVoicePhase("idle");
      setVoiceError(code === "permission" ? "Mikrofon ruxsati kerak. Sozlamalardan yoqing" : code === "too_short" ? "Juda qisqa. Gapni oxirigacha ayting" : code === "unsupported" ? "Bu muhitda mikrofon ishlamaydi. Ilovadan foydalaning" : "Mikrofonni ochib bo'lmadi");
    },
    onResult: async (wav) => {
      const id = targetExpressionId.current;
      if (!id) return;
      setVoicePhase("analyzing");
      setVoiceError(null);
      try {
        const result = await assessExpression(request, id, wav);
        if (result.status !== "success") { setVoiceError("Ovoz eshitilmadi. Yana bir marta gapirasizmi?"); setVoicePhase("idle"); return; }
        setVoiceResult(result);
        setVoicePhase("done");
        setPracticeReady(true);
        if (result.passed) {
          window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
          window.setTimeout(() => { setVoiceOpen(false); void advanceRef.current(true); }, 380);
        } else {
          scheduleRetry();
          window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("warning");
        }
      } catch { setVoiceError("Hozir tekshirib bo'lmadi. Birozdan so'ng urinib ko'ring"); setVoicePhase("idle"); }
    },
  });

  useEffect(() => {
    setDetailsOpen(false);
    setTypingActive(false);
    setTypedAnswer("");
    setTypeState("idle");
    setHintVisible(false);
    setPracticeReady(!requiresAnswer);
    setVoiceOpen(false);
    setVoicePhase("idle");
    setVoiceResult(null);
    setVoiceError(null);
    cancelRecording();
  }, [cancelRecording, current?.key, requiresAnswer]);

  const autoSpeechText = current && current.stage !== "recall"
    ? current.expression.pronunciation.ttsText || current.expression.korean
    : "";
  useEffect(() => {
    if (!autoSpeechText) return;
    const timer = window.setTimeout(() => speak(autoSpeechText), 80);
    return () => { window.clearTimeout(timer); stopSpeech(); };
  }, [autoSpeechText, current?.key, speak, stopSpeech]);

  useEffect(() => {
    const upcoming = queue.slice(index + 1, index + 4).filter((item) => item.stage !== "recall").map((item) => item.expression.pronunciation.ttsText || item.expression.korean);
    if (upcoming.length) prewarm(upcoming);
  }, [index, prewarm, queue]);

  useEffect(() => {
    if (!readyForRecall || saving || offerShown.current) return;
    const timer = window.setTimeout(() => { offerShown.current = true; stopSpeech(); setOfferOpen(true); window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success"); }, 550);
    return () => window.clearTimeout(timer);
  }, [readyForRecall, saving, stopSpeech]);

  useEffect(() => () => { cancelRecording(); stopSpeech(); }, [cancelRecording, stopSpeech]);

  const recordView = useCallback(async () => {
    if (!current || saving) return false;
    if (!current.recordsView || recordedKeys.current.has(current.key)) return true;
    setSaving(true);
    setSaveFailed(false);
    try { await recordExpressionView(request, current.expression.id); recordedKeys.current.add(current.key); return true; }
    catch { setSaveFailed(true); return false; }
    finally { setSaving(false); }
  }, [current, request, saving]);

  const advance = useCallback(async (force = false) => {
    if (!current || saving || (!practiceReady && !force)) return;
    stopSpeech();
    if (readyForRecall) { offerShown.current = true; setOfferOpen(true); return; }
    if (!(await recordView())) return;
    const resume = recallResumeIndex.current;
    if (recallStarted && current.kind === "exposure" && index === learningQueue.length - 1 && resume !== null) {
      recallResumeIndex.current = null;
      setIndex(Math.min(resume, queue.length - 1));
    } else if (index >= queue.length - 1) setCompleted(true);
    else setIndex((value) => value + 1);
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
  }, [current, index, learningQueue.length, practiceReady, queue.length, readyForRecall, recallStarted, recordView, saving, stopSpeech]);
  advanceRef.current = advance;

  const retreat = () => {
    if (saving || index <= 0) return;
    stopSpeech();
    if (current?.kind !== "exposure") { recallResumeIndex.current = index; setIndex(Math.max(0, learningQueue.length - 1)); }
    else setIndex((value) => Math.max(0, value - 1));
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
  };

  const beginRecall = async () => {
    if (!(await recordView())) return;
    setOfferOpen(false);
    if (!recallQueue.length) { setCompleted(true); return; }
    setRecallStarted(true);
    setIndex(learningQueue.length);
  };

  const skipRecall = async () => {
    if (!(await recordView())) return;
    setOfferOpen(false);
    setCompleted(true);
  };

  const checkAnswer = () => {
    if (!typingPlan || normalizeAnswer(typedAnswer) !== normalizeAnswer(typingPlan.answer)) {
      setTypeState("wrong"); scheduleRetry(); window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error"); return;
    }
    setTypeState("correct"); setPracticeReady(true); window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
  };

  const startVoice = async () => {
    if (!current) return;
    stopSpeech();
    targetExpressionId.current = current.expression.id;
    setVoiceResult(null);
    setVoiceError(null);
    const started = await startRecording();
    if (started) { setVoicePhase("recording"); window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light"); }
  };

  const openVoice = () => {
    setTypingActive(false);
    setVoiceOpen(true);
    setVoicePhase("idle");
    void startVoice();
  };

  const closeVoice = () => { cancelRecording(); setVoiceOpen(false); setVoicePhase("idle"); };
  const goBack = () => window.history.length > 1 ? router.back() : router.replace("/expressions");

  if (!premium) return (
    <main className={`${styles.screen} ${styles.stateScreen}`}>
      <button className={styles.headerButton} aria-label="Orqaga" onClick={() => router.replace("/course-categories")} type="button"><MobileIcon name="chevron-back" size={25} /></button>
      <section className={styles.state}><MobileIcon name="lock-closed" size={42} /><h1>Bu mashq KORIO Premium bilan ochiladi</h1><button onClick={() => router.replace("/premium")} type="button">KORIO Premium</button></section>
    </main>
  );

  if (loading || loadFailed || !session || !current) return (
    <main className={`${styles.screen} ${styles.stateScreen}`}>
      <button className={styles.headerButton} aria-label="Orqaga" onClick={goBack} type="button"><MobileIcon name="chevron-back" size={25} /></button>
      <section className={styles.state}>{loading ? <span className={styles.spinner} /> : <><MobileIcon name="alert-circle" size={42} /><h1>Ibora darsini yuklab bo&apos;lmadi</h1><button onClick={() => void load()} type="button">Qayta urinish</button></>}</section>
    </main>
  );

  if (completed) return (
    <main className={`${styles.screen} ${styles.completeScreen}`} style={{ "--pack-bg": theme.background, "--pack-accent": theme.accent, "--pack-dark": theme.accentDark } as CSSProperties}>
      <div className={styles.completeOrbOne} /><div className={styles.completeOrbTwo} />
      <section className={styles.completeBody}>
        <span className={styles.topicChip}><MobileIcon name="chatbubble-ellipses-outline" size={16} />{session.topic.title}</span>
        <div className={styles.medal}><i /><i /><span><MobileIcon name="checkmark" size={51} /></span><MobileIcon className={styles.sparkOne} name="sparkles" size={22} /><MobileIcon className={styles.sparkTwo} name="star" size={16} /></div>
        <h1>Ibora tuguni tugallandi!</h1>
        <p>‘{session.node.title}’ bo&apos;yicha {session.items.length} ta iborani ko&apos;rib chiqdingiz.</p>
        <article className={styles.completeSummary}><span><MobileIcon name="chatbubble-ellipses" size={25} /></span><div><small>{session.topic.title}</small><strong>{session.node.title}</strong></div><b>{session.items.length} ta ibora</b></article>
      </section>
      <footer className={styles.completeFooter}><button onClick={() => { window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success"); goBack(); }} type="button">Yo&apos;lga qaytish<span><MobileIcon name="arrow-forward" size={18} /></span></button></footer>
    </main>
  );

  const expression = current.expression;
  const referenceVisible = !typingActive && (current.stage !== "recall" || hintVisible || practiceReady);
  const voiceTone = voiceResult?.passed ? "good" : voiceResult && voiceResult.scores.pron >= 60 ? "warn" : "bad";

  return (
    <main className={styles.screen} onTouchStart={(event) => { const touch = event.touches[0]; if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY }; }} onTouchEnd={(event) => { const start = touchStart.current; const touch = event.changedTouches[0]; touchStart.current = null; if (!start || !touch || typingActive || voiceOpen) return; const dx = touch.clientX - start.x; const dy = touch.clientY - start.y; if (Math.abs(dx) < 78 || Math.abs(dy) > 50) return; if (dx < 0) void advance(); else retreat(); }}>
      <header className={styles.headerWrap}>
        <div className={styles.header}><button className={styles.headerButton} aria-label="Yopish" onClick={goBack} type="button"><MobileIcon name="close" size={24} /></button><div><small>{session.topic.title}</small><strong>{session.node.title}</strong></div><span>{index + 1}/{queue.length}</span></div>
        <i className={styles.progress}><b style={{ width: `${progress * 100}%` }} /></i>
      </header>

      <section className={styles.cardScroll}>
        <article className={styles.card} key={current.key}>
          <span className={styles.speechChip}><MobileIcon name="chatbubble-ellipses-outline" size={15} />{SPEECH_LEVEL[expression.speechLevel]}</span>
          <div className={styles.sentenceArea}>
            {typingActive && typingPlan ? (
              <div className={styles.typingArea}>
                <small>IBORA MA&apos;NOSI</small><p>{expression.meaning}</p><strong><MobileIcon family="material-community" name="keyboard" size={18} />Koreyscha iborani to&apos;ldiring</strong>
                <div className={`${styles.typingField} ${typeState === "correct" ? styles.correctField : typeState === "wrong" ? styles.wrongField : ""}`}>
                  {typingPlan.kind === "full" ? <input autoFocus disabled={typeState === "correct"} onChange={(event) => { setTypedAnswer(event.target.value); setTypeState("idle"); }} onKeyDown={(event) => { if (event.key === "Enter") checkAnswer(); }} placeholder="Koreyscha yozing" value={typedAnswer} /> : <div className={styles.cloze}>{typingPlan.tokens.map((token, tokenIndex) => tokenIndex === typingPlan.blankStart ? <input autoFocus disabled={typeState === "correct"} key="blank" onChange={(event) => { setTypedAnswer(event.target.value); setTypeState("idle"); }} onKeyDown={(event) => { if (event.key === "Enter") checkAnswer(); }} style={{ width: `${Math.min(190, Math.max(82, typingPlan.answer.length * 17))}px` }} value={typedAnswer} /> : tokenIndex > typingPlan.blankStart && tokenIndex < typingPlan.blankStart + typingPlan.blankCount ? null : <span key={`${token}:${tokenIndex}`}>{token}</span>)}</div>}
                </div>
                {hintVisible ? <div className={styles.hint}><MobileIcon name="bulb-outline" size={16} />{typingPlan.answer}</div> : null}
                <div className={styles.typeActions}><em className={typeState === "correct" ? styles.correctText : typeState === "wrong" ? styles.wrongText : ""}>{typeState === "correct" ? "To'g'ri!" : typeState === "wrong" ? "Biroz farq qiladi. Tekshirib, qayta yozing" : ""}</em>{!hintVisible && typeState !== "correct" ? <button aria-label="Yordam" onClick={() => { setHintVisible(true); scheduleRetry(); }} type="button"><MobileIcon name="bulb-outline" size={17} /></button> : null}<button aria-label="Javobni tekshirish" disabled={!typedAnswer.trim() || typeState === "correct"} onClick={checkAnswer} type="button"><MobileIcon name={typeState === "correct" ? "checkmark" : "arrow-forward"} size={20} /></button></div>
                {requiresAnswer && !practiceReady ? <button className={styles.later} onClick={() => { scheduleRetry(); setPracticeReady(true); setHintVisible(true); }} type="button">Keyinroq yana mashq qilish</button> : null}
              </div>
            ) : referenceVisible ? <><h1 className={speaking ? styles.spoken : ""} style={{ "--speech-progress": `${speechProgress * 100}%` } as CSSProperties}>{expression.korean}</h1>{expression.pronunciation.romanization ? <p className={styles.romanization}>{expression.pronunciation.romanization}</p> : null}</> : <div className={styles.recallPrompt}><span><MobileIcon name="chatbubble-ellipses-outline" size={21} /></span><p>Ma&apos;nosidan koreyscha iborani eslang</p></div>}
            <div className={styles.practiceActions}>{referenceVisible ? <button aria-label="Iborani qayta tinglash" className={speaking ? styles.activeAudio : ""} onClick={() => speaking ? stopSpeech() : speak(expression.pronunciation.ttsText || expression.korean)} type="button"><MobileIcon name={speaking ? "volume-high" : "volume-medium-outline"} size={23} /></button> : null}<div><button className={voiceOpen ? styles.activeMode : ""} onClick={openVoice} type="button"><MobileIcon name="mic-outline" size={22} /></button><i /><button className={typingActive ? styles.activeMode : ""} onClick={() => { stopSpeech(); setTypingActive(true); }} type="button"><MobileIcon family="material-community" name="keyboard" size={24} /></button></div></div>
          </div>
          {!typingActive ? <div className={styles.meaning}><small>IBORA MA&apos;NOSI</small><p>{expression.meaning}</p></div> : null}
          {detailsOpen ? <div className={styles.details}><div><section><strong><MobileIcon name="person-outline" size={16} />Odatda kim aytadi</strong><p>{expression.speaker || "Hamma"}</p></section><section><strong><MobileIcon name="locate-outline" size={16} />Ishlatiladigan vaziyat</strong><p>{expression.context}</p></section></div>{expression.usageNote ? <aside><MobileIcon name="sparkles-outline" size={18} /><div><strong>Tabiiy aytish usuli</strong><p>{expression.usageNote}</p></div></aside> : null}</div> : null}
          <button className={styles.detailsButton} onClick={() => setDetailsOpen((value) => !value)} type="button">{detailsOpen ? "Yopish" : "Batafsil ko'rish"}<MobileIcon name={detailsOpen ? "chevron-up" : "chevron-down"} size={17} /></button>
        </article>
      </section>

      <footer className={styles.footer}>{saveFailed ? <p>Jarayon saqlanmadi. Yana bir marta bosing.</p> : null}<div><span><button disabled={index <= 0 || saving} onClick={retreat} type="button"><MobileIcon name="arrow-back" size={22} /></button><small>Orqaga</small></span><p><MobileIcon name="swap-horizontal" size={17} />{practiceReady ? "Har bir iborani ko'rish uchun chap yoki o'ngga suring" : "Mashq qiling yoki keyinroq takrorlashni tanlang"}</p><span><button disabled={saving || !practiceReady} onClick={() => void advance()} type="button">{saving ? <i className={styles.buttonSpinner} /> : <MobileIcon name={readyForRecall ? "school-outline" : index >= queue.length - 1 ? "checkmark" : "arrow-forward"} size={21} />}</button><small>{readyForRecall ? "Ibora mashqini boshlash" : index >= queue.length - 1 ? "Tugunni tugatish" : "Keyingi ibora"}</small></span></div></footer>

      {offerOpen ? <div className={styles.modalBackdrop} onClick={() => !saving && setOfferOpen(false)} role="presentation"><section className={styles.offer} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true"><span style={{ background: theme.background, color: theme.accentDark }}><MobileIcon name="chatbubbles-outline" size={29} /></span><small style={{ color: theme.accentDark }}>BARCHA IBORALARNI KO&apos;RIB CHIQDINGIZ</small><h2>Endi ularni eslab ko&apos;ramizmi?</h2><p>Hozirgina mashq qilgan {session.items.length} ta iborani ma&apos;nosiga qarab ayting yoki yozing.</p>{saveFailed ? <em>Jarayon saqlanmadi. Yana bir marta bosing.</em> : null}<button disabled={saving} onClick={() => void beginRecall()} style={{ background: theme.accent }} type="button"><MobileIcon name="school-outline" size={20} />Ibora mashqini boshlash</button><button disabled={saving} onClick={() => void skipRecall()} type="button">Keyinroq</button></section></div> : null}

      {voiceOpen ? <div className={styles.voiceBackdrop} role="presentation" onClick={closeVoice}><section className={styles.voiceSheet} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true"><i /><header><div><small>{STAGE_LABEL[current.stage]}</small><h2>{STAGE_PROMPT[current.stage]}</h2></div><button aria-label="Yopish" onClick={closeVoice} type="button"><MobileIcon name="chevron-down" size={20} /></button></header>{voiceResult ? <article className={`${styles.voiceResult} ${styles[voiceTone]}`}><div><b>{voiceResult.scores.pron}</b><span><strong>{voiceResult.passed ? "Juda tabiiy aytdingiz!" : "Bu iborani yana bir marta mashq qilamiz"}</strong><small>Talaffuz bahosi</small></span></div><p>{voiceResult.words.map((word, wordIndex) => <span className={styles[wordToneOf(word)]} key={`${word.word}:${wordIndex}`}>{word.word}</span>)}</p>{voiceResult.transcript ? <em>Men shunday eshitdim · {voiceResult.transcript}</em> : null}</article> : null}<div className={styles.micStage}><span className={voicePhase === "recording" ? styles.recordingHalo : ""}><button disabled={voicePhase === "analyzing"} onClick={() => voicePhase === "recording" ? stopRecording() : void startVoice()} type="button">{voicePhase === "analyzing" ? <i className={styles.buttonSpinner} /> : voicePhase === "recording" ? <span className={styles.wave}>{[16,27,21,34,25,18].map((height, waveIndex) => <i key={waveIndex} style={{ height }} />)}</span> : <MobileIcon name="mic" size={31} />}</button></span><p className={voiceError ? styles.voiceError : voicePhase === "recording" ? styles.recordingText : ""}>{voiceError || (voicePhase === "recording" ? "Eshityapman…" : voicePhase === "analyzing" ? "Talaffuz tekshirilmoqda…" : voicePhase === "idle" ? "Bosing va gapiring" : "")}</p></div>{requiresAnswer && !practiceReady ? <button className={styles.later} onClick={() => { scheduleRetry(); setPracticeReady(true); }} type="button">Keyinroq yana mashq qilish</button> : null}</section></div> : null}
    </main>
  );
}
