"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useWebSpeechRecorder } from "../../lesson/model/use-web-speech-recorder";
import { isAutoPlayEnabled, useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import {
  assessExpression,
  getPackExpressions,
  getSpeakingProgress,
  saveSpeakingProgress,
  setExpressionSaved,
} from "../api/speaking";
import { speakingMaskFor, type AssessResult, type ExpressionListResponse } from "./speaking";

export type SpeakingPhase = "assessing" | "idle" | "recording" | "starting";
export type SpeakingError = "assessError" | "audioError" | "micError" | "noSpeech" | "permission" | "saveFailed" | "tooShort" | "unsupported";

const errors = {
  mic: "micError",
  permission: "permission",
  too_short: "tooShort",
  unsupported: "unsupported",
} as const;

function cursorKey(packCode: string) { return `speaking-cursor:${packCode}`; }



export function useSpeakingPractice(packCode: string) {
  const { request } = useTelegramAuth();
  const [data, setData] = useState<ExpressionListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [revision, setRevision] = useState(0);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Record<string, AssessResult>>({});
  const [phase, setPhase] = useState<SpeakingPhase>("idle");
  const [error, setError] = useState<SpeakingError | null>(null);
  const [saving, setSaving] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [saveNotice, setSaveNotice] = useState(false);
  const [retryIds, setRetryIds] = useState<string[] | null>(null);
  const [level, setLevel] = useState(0);
  const [passFlash, setPassFlash] = useState(false);
  /** 처음부터/틀린 것만 다시 하면 같은 카드도 다시 읽어 준다 */
  const [autoEpoch, setAutoEpoch] = useState(0);
  const {
    prewarm,
    speak,
    speaking,
    stop: stopSpeech,
  } = useKoreanSpeech(request);
  const advanceTimer = useRef<number | undefined>(undefined);
  const retryTimer = useRef<number | undefined>(undefined);
  const autoRetry = useRef(0);
  const targetId = useRef<string | null>(null);
  const recordRef = useRef<(automatic?: boolean) => Promise<void>>(async () => undefined);
  const liveRef = useRef(true);

  const queue = useMemo(
    () => retryIds ? (data?.items ?? []).filter((item) => retryIds.includes(item.id)) : data?.items ?? [],
    [data?.items, retryIds],
  );
  const current = queue[index];
  const completed = !loading && !loadFailed && queue.length > 0 && index >= queue.length;
  const result = current ? results[current.id] ?? null : null;
  const mask = current ? speakingMaskFor(index, current.korean, current.id) : { mode: "none" as const, hidden: [], hideMeaning: false };

  const clearTimers = useCallback(() => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    if (retryTimer.current) window.clearTimeout(retryTimer.current);
    advanceTimer.current = undefined;
    retryTimer.current = undefined;
  }, []);

  const {
    cancel,
    recording,
    start,
    stop: stopRecording,
  } = useWebSpeechRecorder({
    onError: (code) => {
      setPhase("idle");
      setError(errors[code]);
      setLevel(0);
    },
    onLevel: (value) => setLevel(Math.max(0, Math.min(1, value / 0.08))),
    onResult: async (wav) => {
      const expressionId = targetId.current;
      if (!expressionId) return;
      setPhase("assessing");
      setLevel(0);
      try {
        const assessed = await assessExpression(request, expressionId, wav);
        if (!liveRef.current) return;
        if (assessed.status !== "success") {
          setError(assessed.status === "no_speech" ? "noSpeech" : "assessError");
          setPhase("idle");
          if (assessed.status === "no_speech" && autoRetry.current < 3) {
            autoRetry.current += 1;
            retryTimer.current = window.setTimeout(() => void recordRef.current(true), 700);
          }
          return;
        }
        setResults((previous) => ({ ...previous, [expressionId]: assessed }));
        setError(null);
        setPhase("idle");
        if (assessed.passed) {
          autoRetry.current = 0;
          setPassFlash(true);
          window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
          advanceTimer.current = window.setTimeout(() => {
            setPassFlash(false);
            setIndex((value) => value + 1);
          }, 1600);
        } else {
          window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("warning");
          if (autoRetry.current < 3) {
            autoRetry.current += 1;
            retryTimer.current = window.setTimeout(() => void recordRef.current(true), 1100);
          }
        }
      } catch {
        if (liveRef.current) {
          setError("assessError");
          setPhase("idle");
        }
      }
    },
  });

  const stopAll = useCallback(() => {
    clearTimers();
    cancel();
    stopSpeech();
    setPhase("idle");
    setLevel(0);
    setPassFlash(false);
  }, [cancel, clearTimers, stopSpeech]);

  const record = useCallback(async (automatic = false) => {
    if (!current || phase === "assessing") return;
    if (!automatic) autoRetry.current = 0;
    if (recording) {
      stopRecording();
      return;
    }
    clearTimers();
    stopSpeech();
    setError(null);
    setSaveNotice(false);
    setPhase("starting");
    targetId.current = current.id;
    try {
      const started = await start();
      if (started && liveRef.current) {
        setPhase("recording");
        window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
      }
    } catch {
      if (liveRef.current) {
        setError("micError");
        setPhase("idle");
      }
    }
  }, [clearTimers, current, phase, recording, start, stopRecording, stopSpeech]);
  recordRef.current = record;

  useEffect(() => {
    liveRef.current = true;
    return () => { liveRef.current = false; };
  }, []);

  useEffect(() => {
    let active = true;
    stopAll();
    setLoading(true);
    setLoadFailed(false);
    setData(null);
    setIndex(0);
    setResults({});
    setRetryIds(null);
    if (!packCode) {
      setLoadFailed(true);
      setLoading(false);
      return;
    }
    void Promise.all([
      getPackExpressions(request, packCode),
      getSpeakingProgress(request, packCode).catch(() => null),
    ]).then(([response, progress]) => {
      if (!active) return;
      const items = response.items.filter((item) => item.korean.trim());
      setData({ ...response, items });
      const local = Number(window.localStorage.getItem(cursorKey(packCode)) ?? 0);
      const cursor = progress?.index ?? (Number.isFinite(local) ? local : 0);
      setIndex(items.length ? Math.min(Math.max(0, cursor), items.length - 1) : 0);
    }).catch(() => { if (active) setLoadFailed(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [packCode, request, revision, stopAll]);

  useEffect(() => {
    if (loading || loadFailed || retryIds || !data?.items.length) return;
    window.localStorage.setItem(cursorKey(packCode), index >= data.items.length ? "0" : String(index));
    void saveSpeakingProgress(request, packCode, index, data.items.length).catch(() => undefined);
  }, [data?.items.length, index, loadFailed, loading, packCode, request, retryIds]);

  useEffect(() => {
    if (loading || completed) return;
    prewarm(queue.slice(index, index + 3).map((item) => item.korean));
  }, [completed, index, loading, prewarm, queue]);

  // 카드가 뜨면 먼저 들려주고, 다 읽자마자 마이크를 연다 (앱 useSpeakingPractice).
  // - 카드 객체가 아니라 epoch:index:id 로 한 번만 — 북마크로 items 가 바뀌어도 다시 읽고 마이크를 열지 않는다
  // - 이미 채점한 카드로 돌아오면 다시 읽지 않는다
  // - 설정의 "Avtomatik o‘qish" 를 끄면 읽지도, 마이크를 열지도 않는다 (마이크 버튼으로 직접)
  // - 따라 말하기의 기준 소리라 음소거·볼륨 설정과 상관없이 들린다 (앱 respectSoundSettings:false)
  const currentId = current?.id;
  const currentKorean = current?.korean;
  const resultsRef = useRef(results);
  resultsRef.current = results;
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const autoKey = useRef<string | null>(null);
  useEffect(() => {
    if (loading || completed || !currentId || !currentKorean) return;
    const key = `${autoEpoch}:${index}:${currentId}`;
    if (autoKey.current === key) return;
    const timer = window.setTimeout(() => {
      autoKey.current = key;
      if (resultsRef.current[currentId] || phaseRef.current !== "idle" || !isAutoPlayEnabled()) return;
      speak(currentKorean, {
        onEnd: () => window.setTimeout(() => { if (phaseRef.current === "idle") void recordRef.current(true); }, 150),
        respectSoundSettings: false,
        volume: 1,
      });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [autoEpoch, completed, currentId, currentKorean, index, loading, speak]);

  useEffect(() => {
    const onVisibility = () => { if (document.hidden) stopAll(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopAll();
    };
  }, [stopAll]);

  const next = () => {
    if (!current || phase !== "idle" || saving) return;
    clearTimers();
    stopSpeech();
    autoRetry.current = 0;
    setError(null);
    setSaveNotice(false);
    setPassFlash(false);
    setIndex((value) => value + 1);
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
  };

  const listen = (slow = false, word?: string) => {
    if (!current || phase !== "idle") return;
    setError(null);
    if (speaking && !word) { stopSpeech(); return; }
    try { speak(word || current.korean, { rate: slow ? 0.76 : 1 }); }
    catch { setError("audioError"); }
  };

  const toggleSaved = async () => {
    if (!current || saving) return;
    const saved = !current.progress.isSaved;
    setSaving(true);
    setError(null);
    try {
      const response = await setExpressionSaved(request, current.id, saved);
      setData((previous) => previous ? { ...previous, items: previous.items.map((item) => item.id === current.id ? { ...item, progress: response.progress } : item) } : previous);
      setSaveNotice(saved);
    } catch { setError("saveFailed"); }
    finally { setSaving(false); }
  };

  const difficultIds = Object.entries(results).filter(([, value]) => value.status === "success" && !value.passed).map(([id]) => id);
  const assessed = Object.values(results).filter((value) => value.status === "success");
  const summary = {
    average: assessed.length ? Math.round(assessed.reduce((sum, value) => sum + value.scores.pron, 0) / assessed.length) : null,
    retryIds: difficultIds,
    spoken: assessed.length,
  };
  const restart = (difficult = false) => {
    stopAll();
    setRetryIds(difficult && difficultIds.length ? difficultIds : null);
    setIndex(0);
    setResults({});
    setAutoEpoch((value) => value + 1);
    setError(null);
    setHidden(false);
  };

  return {
    completed, current, data, error, hidden, index, level, listen, loadFailed, loading, mask,
    next, passFlash, phase, queue, record, reload: () => setRevision((value) => value + 1),
    restart, result, saveNotice, saving, speech: { prewarm, speak, speaking, stop: stopSpeech }, stopAll, summary,
    toggleHidden: () => setHidden((value) => !value), toggleSaved,
  };
}
