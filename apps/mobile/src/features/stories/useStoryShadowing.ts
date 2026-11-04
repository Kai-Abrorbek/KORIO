import { useCallback, useEffect, useRef, useState } from "react";
import * as Haptics from "@/utils/haptics";
import { useSpeechRecorder } from "@/hooks/useSpeechRecorder";
import { SttService, type AssessResult } from "@/services/stt.service";
import type { StoryPlayer } from "./useStoryPlayer";
import type { StoryDetail } from "./stories.types";

/**
 * 따라 읽기: 한 문장을 들려주고 → 마이크가 열리고 → 말이 끝나면(침묵) 채점 →
 * 통과하면 잠깐 뒤 다음 문장으로 저절로 넘어간다. 손을 거의 안 대도 이어진다.
 * 못 통과하면 멈춰서 "다시 / 다음" 을 고르게 한다.
 */
export type ShadowPhase =
  | "off"
  | "listening" // 원문을 듣는 중
  | "recording"
  | "scoring"
  | "result"
  | "error";

const END_SILENCE_MS = 900;
const RECORD_DELAY_MS = 220;
const ADVANCE_AFTER_PASS_MS = 1300;

export function useStoryShadowing(
  story: StoryDetail | null,
  player: StoryPlayer,
  { onFinished }: { onFinished: () => void },
) {
  const [phase, setPhase] = useState<ShadowPhase>("off");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [results, setResults] = useState<Record<string, AssessResult>>({});
  const [errorKind, setErrorKind] = useState<"denied" | "failed" | null>(null);
  const [level, setLevel] = useState(0);
  const runRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);
  indexRef.current = sentenceIndex;
  const onFinishedRef = useRef(onFinished);
  onFinishedRef.current = onFinished;

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const handleWav = useCallback(
    async (wav: ArrayBuffer) => {
      const run = runRef.current;
      const sentence = story?.sentences[indexRef.current];
      if (!story || !sentence) return;
      setPhase("scoring");
      setLevel(0);
      try {
        const result = await SttService.assessStory(story.code, sentence.id, wav);
        if (run !== runRef.current) return;
        setResults((prev) => ({ ...prev, [sentence.id]: result }));
        setPhase("result");
        if (result.passed) {
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          timerRef.current = setTimeout(() => advanceRef.current(), ADVANCE_AFTER_PASS_MS);
        } else {
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
      } catch {
        if (run !== runRef.current) return;
        setErrorKind("failed");
        setPhase("error");
      }
    },
    [story],
  );

  // 입력 세기는 버퍼마다 온다 — 눈에 보일 만큼 바뀔 때만 다시 그린다
  const levelRef = useRef(0);
  const { start, stop, cancel } = useSpeechRecorder({
    maxSeconds: 14,
    silenceStopMs: END_SILENCE_MS,
    onLevel: (rms) => {
      const next = Math.min(1, rms / 4000);
      if (Math.abs(next - levelRef.current) < 0.08) return;
      levelRef.current = next;
      setLevel(next);
    },
    onResult: (wav) => void handleWav(wav),
    onError: (code) => {
      setErrorKind(code === "permission" ? "denied" : "failed");
      setPhase("error");
    },
  });

  const record = useCallback(async () => {
    const run = runRef.current;
    setErrorKind(null);
    const started = await start();
    if (run !== runRef.current) {
      if (started) cancel();
      return;
    }
    if (started) setPhase("recording");
  }, [cancel, start]);

  /** index 문장을 듣고 → 녹음 */
  const listenThenRecord = useCallback(
    (index: number) => {
      const run = ++runRef.current;
      clearTimer();
      cancel();
      setSentenceIndex(index);
      setPhase("listening");
      player.playSentenceOnly(index, () => {
        if (run !== runRef.current) return;
        timerRef.current = setTimeout(() => void record(), RECORD_DELAY_MS);
      });
    },
    [cancel, player, record],
  );

  const advance = useCallback(() => {
    if (!story) return;
    const nextIndex = indexRef.current + 1;
    if (nextIndex >= story.sentences.length) {
      runRef.current += 1;
      clearTimer();
      setPhase("off");
      player.markEnded();
      onFinishedRef.current();
      return;
    }
    listenThenRecord(nextIndex);
  }, [listenThenRecord, player, story]);
  const advanceRef = useRef(advance);
  advanceRef.current = advance;

  const startShadowing = useCallback(
    (fromIndex: number) => {
      player.pause();
      listenThenRecord(Math.max(0, fromIndex));
    },
    [listenThenRecord, player],
  );

  const stopShadowing = useCallback(() => {
    runRef.current += 1;
    clearTimer();
    cancel();
    setPhase("off");
    setLevel(0);
  }, [cancel]);

  /** 녹음 중 마이크를 누르면 바로 제출 */
  const finishRecording = useCallback(() => stop(), [stop]);
  const retry = useCallback(
    () => listenThenRecord(indexRef.current),
    [listenThenRecord],
  );

  useEffect(
    () => () => {
      runRef.current += 1;
      clearTimer();
      cancel();
    },
    [cancel],
  );

  return {
    phase,
    active: phase !== "off",
    sentenceIndex,
    results,
    errorKind,
    level,
    startShadowing,
    stopShadowing,
    finishRecording,
    retry,
    skip: advance,
  };
}

export type StoryShadowing = ReturnType<typeof useStoryShadowing>;
