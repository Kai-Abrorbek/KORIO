import { useCallback, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/auth.store";
import { useSpeech } from "@/hooks/useSpeech";
import { useSpeechRecorder, type SpeechRecorderError } from "@/hooks/useSpeechRecorder";
import { ExpressionService } from "@/services/expression.service";
import { SttService } from "@/services/stt.service";
import type { ExpressionListResponse } from "@/types/expression";
import * as Haptics from "@/utils/haptics";
import { summarizeSpeaking, type SpeakingResults } from "./session";

export type SpeakingPhase = "idle" | "starting" | "recording" | "assessing";
export type SpeakingError = "noSpeech" | "permission" | "unsupported" | "tooShort" | "micError" | "assessError" | "audioError" | "saveFailed";

const recorderErrors: Record<SpeechRecorderError, SpeakingError> = {
  permission: "permission", unsupported: "unsupported", too_short: "tooShort", mic: "micError",
};

export function useSpeakingPractice(packCode: string) {
  const { i18n } = useTranslation();
  const userId = useAuthStore((s) => s.user?.id);
  const loggedIn = useAuthStore((s) => s.isLoggedIn);
  const language = i18n.resolvedLanguage || i18n.language;
  const identity = `${userId ?? ""}|${language}|${packCode}`;
  const [data, setData] = useState<ExpressionListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [revision, setRevision] = useState(0);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<SpeakingResults>({});
  const [phase, setPhase] = useState<SpeakingPhase>("idle");
  const [error, setError] = useState<SpeakingError | null>(null);
  const [saving, setSaving] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [saveNotice, setSaveNotice] = useState(false);
  const [retryIds, setRetryIds] = useState<string[] | null>(null);
  const [autoEpoch, setAutoEpoch] = useState(0);
  const phaseRef = useRef<SpeakingPhase>("idle");
  const autoKeyRef = useRef<string | null>(null);
  const autoRecordRef = useRef<() => Promise<void>>(async () => undefined);
  const resultsRef = useRef(results);
  const runRef = useRef(0);
  const recordingRef = useRef<{ run: number; id: string } | null>(null);
  const focusedRef = useRef(false);
  const savingRef = useRef(false);
  const sessionRef = useRef(identity);
  sessionRef.current = identity;

  const { speak, speakSlow, speakAuto, stop: stopSpeech, isSpeaking } = useSpeech();
  const queue = retryIds ? (data?.items ?? []).filter((item) => retryIds.includes(item.id)) : data?.items ?? [];
  const current = queue[index];
  const completed = !loading && !loadFailed && queue.length > 0 && index >= queue.length;
  const result = current ? results[current.id] ?? null : null;

  const changePhase = useCallback((next: SpeakingPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const { start, stop: stopRecording, cancel } = useSpeechRecorder({
    maxSeconds: 20,
    // 말이 끝나면 알아서 제출한다. 이게 없으면 사용자가 stop 을 누르거나
    // maxSeconds 가 다 지날 때까지 화면이 멈춰 있는 것처럼 보인다.
    silenceStopMs: 1200,
    onResult: async (wav) => {
      const recording = recordingRef.current;
      if (!recording || recording.run !== runRef.current || !focusedRef.current) return;
      changePhase("assessing");
      try {
        const assessed = await SttService.assessExpression(recording.id, wav);
        if (recording.run !== runRef.current || !focusedRef.current) return;
        if (assessed.status !== "success") {
          setError(assessed.status === "no_speech" ? "noSpeech" : "assessError");
          return;
        }
        setResults((previous) => ({ ...previous, [recording.id]: assessed }));
        if (assessed.passed) void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {
        if (recording.run === runRef.current && focusedRef.current) setError("assessError");
      } finally {
        if (recording.run === runRef.current && focusedRef.current) {
          recordingRef.current = null;
          changePhase("idle");
        }
      }
    },
    onError: (code) => {
      if (!focusedRef.current) return;
      recordingRef.current = null;
      changePhase("idle");
      setError(recorderErrors[code]);
    },
  });

  const stopAll = useCallback(() => {
    runRef.current += 1;
    recordingRef.current = null;
    cancel();
    stopSpeech();
    changePhase("idle");
  }, [cancel, stopSpeech, changePhase]);

  useFocusEffect(useCallback(() => {
    focusedRef.current = true;
    return () => {
      focusedRef.current = false;
      stopAll();
    };
  }, [stopAll]));

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active") stopAll();
    });
    return () => subscription.remove();
  }, [stopAll]);

  useEffect(() => {
    let active = true;
    stopAll();
    setLoading(true);
    setLoadFailed(false);
    setData(null);
    setIndex(0);
    setResults({});
    setRetryIds(null);
    setHidden(false);
    setError(null);
    setSaveNotice(false);
    setSaving(false);
    savingRef.current = false;
    autoKeyRef.current = null;
    if (!packCode || !userId || !loggedIn) {
      setLoadFailed(true);
      setLoading(false);
      return () => { active = false; };
    }
    void ExpressionService.getPackExpressions(packCode).then((response) => {
      if (active) setData({ ...response, items: response.items.filter((item) => item.korean.trim()) });
    }).catch(() => {
      if (active) setLoadFailed(true);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [identity, packCode, userId, loggedIn, revision, stopAll]);

  const listen = (slow = false, word?: string) => {
    if (!current || phaseRef.current !== "idle") return;
    if (isSpeaking && !word) { stopSpeech(); return; }
    setError(null);
    const run = runRef.current;
    const options = {
      respectSoundSettings: false,
      volume: 1,
      onError: () => { if (run === runRef.current && focusedRef.current) setError("audioError"); },
    };
    (slow ? speakSlow : speak)(word || current.korean, "ko-KR", options);
  };

  const record = async () => {
    if (phaseRef.current === "recording") { stopRecording(); return; }
    if (!current || phaseRef.current !== "idle" || !focusedRef.current) return;
    stopSpeech();
    setError(null);
    setSaveNotice(false);
    changePhase("starting");
    const run = ++runRef.current;
    recordingRef.current = { run, id: current.id };
    try {
      const started = await start();
      if (run !== runRef.current || !focusedRef.current) { cancel(); return; }
      if (started) {
        changePhase("recording");
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else changePhase("idle");
    } catch {
      if (run === runRef.current && focusedRef.current) {
        setError("micError");
        changePhase("idle");
      }
    }
  };

  // 카드가 뜨면 먼저 들려주고, 다 읽자마자 마이크를 연다 — 바로 따라 말할 수 있게.
  // 자동 재생을 꺼 둔 사용자는 speakAuto 가 조용히 지나가므로 마이크도 열리지
  // 않는다. 그건 의도한 것이고, 그 경우엔 마이크 버튼으로 직접 시작하면 된다.
  useEffect(() => {
    autoRecordRef.current = record;
    resultsRef.current = results;
  });

  const currentId = current?.id;
  const currentKorean = current?.korean;
  useEffect(() => {
    if (loading || completed || !currentId || !currentKorean) return;
    const key = `${autoEpoch}:${index}:${currentId}`;
    if (autoKeyRef.current === key) return;
    autoKeyRef.current = key;
    // 이미 채점한 카드로 되돌아온 거라면 다시 읽어주지 않는다
    if (resultsRef.current[currentId]) return;
    const run = runRef.current;
    const ready = () =>
      focusedRef.current && runRef.current === run && phaseRef.current === "idle";
    // 화면 전환 애니메이션이 끝난 뒤에 말하게 한다
    const timer = setTimeout(() => {
      if (!ready()) return;
      setError(null);
      speakAuto(currentKorean, "ko-KR", {
        respectSoundSettings: false,
        volume: 1,
        onDone: () => {
          if (ready()) void autoRecordRef.current();
        },
      });
    }, 450);
    return () => clearTimeout(timer);
  }, [autoEpoch, index, currentId, currentKorean, loading, completed, speakAuto]);

  const next = () => {
    if (phaseRef.current !== "idle" || !current || savingRef.current) return;
    stopAll();
    setError(null);
    setSaveNotice(false);
    setIndex((previous) => previous + 1);
    void Haptics.selectionAsync();
  };

  const toggleSaved = async () => {
    if (!current || savingRef.current) return;
    const requestIdentity = sessionRef.current;
    const expressionId = current.id;
    const saved = !current.progress.isSaved;
    savingRef.current = true;
    setSaving(true);
    setError(null);
    setSaveNotice(false);
    try {
      const response = await ExpressionService.setSaved(expressionId, saved);
      if (sessionRef.current !== requestIdentity || !focusedRef.current) return;
      setData((previous) => previous ? {
        ...previous,
        items: previous.items.map((item) => item.id === expressionId ? { ...item, progress: response.progress } : item),
      } : previous);
      setSaveNotice(saved);
      void Haptics.selectionAsync();
    } catch {
      if (sessionRef.current === requestIdentity && focusedRef.current) setError("saveFailed");
    } finally {
      if (sessionRef.current === requestIdentity) {
        savingRef.current = false;
        setSaving(false);
      }
    }
  };

  const restart = (onlyDifficult = false) => {
    stopAll();
    autoKeyRef.current = null;
    setAutoEpoch((value) => value + 1);
    const difficult = summarizeSpeaking(results).retryIds;
    setRetryIds(onlyDifficult && difficult.length ? difficult : null);
    setIndex(0);
    setResults({});
    setError(null);
    setHidden(false);
    setSaveNotice(false);
  };

  return {
    data, queue, current, index, result, phase, error, loading, loadFailed,
    completed, saving, hidden, saveNotice, isSpeaking,
    summary: summarizeSpeaking(results),
    reload: () => setRevision((value) => value + 1),
    toggleHidden: () => setHidden((value) => !value),
    listen, record, next, toggleSaved, restart, stopAll,
  };
}
