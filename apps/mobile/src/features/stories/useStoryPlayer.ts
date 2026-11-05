import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAudioPlayer } from "expo-audio";
import {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { activatePlaybackAudio } from "@/utils/audio-session";
import { storyAudioSource } from "./storyAudio";
import { locateInStory, type PlayerPosition } from "./storyTiming";
import type { StoryDetail } from "./stories.types";

/**
 * 이야기 재생 엔진.
 *
 * 앱에 넣어 둔 낭독 mp3 만 튼다 — 음성 합성 API 는 부르지 않는다. 단어 타이밍으로
 * 지금 단어를 찾는다. 낭독 파일이 없는 이야기는 화면이 잠가서 여기까지 오지 않고,
 * 오더라도 모든 조작이 아무것도 하지 않는다 (ready=false).
 *
 * 화면이 초당 10번 다시 그려지지 않게, 재생 위치는 이벤트로 받아 "문장·단어가
 * 바뀔 때만" state 를 바꾼다. 해(진행)는 shared value 라 다시 그리지 않고 움직인다.
 */

export type PlayerStatus = "idle" | "playing" | "paused" | "ended";
export type { PlayerPosition };

const SEEK_LEAD_MS = 120;
const IDLE: PlayerPosition = { sentence: -1, word: -1 };

export function useStoryPlayer(
  story: StoryDetail | null,
  { onEnded }: { onEnded: () => void },
) {
  const source = storyAudioSource(story?.audio.key);
  const ready = source !== null;
  const player = useAudioPlayer(source, { updateInterval: 60 });

  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [position, setPosition] = useState<PlayerPosition>(IDLE);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [rate, setRateState] = useState(1);
  const progress = useSharedValue(0);

  const statusRef = useRef<PlayerStatus>("idle");
  statusRef.current = status;
  const positionRef = useRef(position);
  positionRef.current = position;
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;
  /** 한 문장만 들려줄 때 멈출 지점과 그때 부를 함수 (따라 읽기) */
  const stopAtRef = useRef<{ ms: number; index: number; done: () => void } | null>(null);
  /** 마지막으로 받은 재생 위치 (단어 시트를 닫고 제자리로 돌아올 때) */
  const lastMsRef = useRef(0);

  const sentences = useMemo(() => story?.sentences ?? [], [story]);
  const durationMs =
    story?.audio.durationMs ||
    (sentences.length ? sentences[sentences.length - 1].endMs : 0);

  const setProgress = useCallback(
    (value: number, animate = true) => {
      const clamped = Math.min(1, Math.max(0, value));
      progress.value = animate
        ? withTiming(clamped, { duration: 120, easing: Easing.linear })
        : clamped;
    },
    [progress],
  );

  const moveTo = useCallback((next: PlayerPosition) => {
    setPosition((prev) =>
      prev.sentence === next.sentence && prev.word === next.word ? prev : next,
    );
  }, []);

  useEffect(() => {
    if (!ready) return;
    const subscription = player.addListener("playbackStatusUpdate", (s) => {
      const ms = (s.currentTime ?? 0) * 1000;
      lastMsRef.current = ms;
      if (statusRef.current !== "idle") {
        moveTo(locateInStory(sentences, ms));
        setProgress(durationMs ? ms / durationMs : 0);
        setElapsedMs((prev) =>
          Math.floor(prev / 1000) === Math.floor(ms / 1000) ? prev : ms,
        );
      }
      const stopAt = stopAtRef.current;
      if (stopAt && ms >= stopAt.ms) {
        stopAtRef.current = null;
        player.pause();
        setStatus("paused");
        moveTo({ sentence: stopAt.index, word: Number.MAX_SAFE_INTEGER });
        stopAt.done();
        return;
      }
      if (s.didJustFinish && statusRef.current === "playing") {
        setStatus("ended");
        setProgress(1);
        moveTo({
          sentence: sentences.length - 1,
          word: Number.MAX_SAFE_INTEGER,
        });
        onEndedRef.current();
      }
    });
    return () => subscription.remove();
  }, [durationMs, moveTo, player, ready, sentences, setProgress]);

  /* ── 조작 ── */

  const play = useCallback(() => {
    if (!story || !ready) return;
    void activatePlaybackAudio("doNotMix");
    const restart = statusRef.current === "ended";
    setStatus("playing");
    if (restart) {
      void player.seekTo(0);
      moveTo({ sentence: 0, word: -1 });
      setProgress(0, false);
    } else if (positionRef.current.sentence < 0) {
      moveTo({ sentence: 0, word: -1 });
    }
    player.play();
  }, [moveTo, player, ready, setProgress, story]);

  const pause = useCallback(() => {
    stopAtRef.current = null;
    if (ready) player.pause();
    if (statusRef.current === "playing") setStatus("paused");
  }, [player, ready]);

  const toggle = useCallback(() => {
    if (statusRef.current === "playing") pause();
    else play();
  }, [pause, play]);

  /** 이 문장부터. play=false 면 자리만 옮긴다 */
  const seekToSentence = useCallback(
    (index: number, autoplay = true) => {
      const sentence = sentences[index];
      if (!sentence || !ready) return;
      stopAtRef.current = null;
      const ms = Math.max(0, sentence.startMs - SEEK_LEAD_MS);
      void player.seekTo(ms / 1000);
      moveTo({ sentence: index, word: -1 });
      setProgress(durationMs ? ms / durationMs : 0, false);
      if (autoplay) {
        void activatePlaybackAudio("doNotMix");
        setStatus("playing");
        player.play();
      }
    },
    [durationMs, moveTo, player, ready, sentences, setProgress],
  );

  const next = useCallback(() => {
    const current = Math.max(0, positionRef.current.sentence);
    seekToSentence(Math.min(sentences.length - 1, current + 1));
  }, [seekToSentence, sentences.length]);

  const prev = useCallback(() => {
    const current = Math.max(0, positionRef.current.sentence);
    // 문장 앞부분이면 이전 문장으로, 한참 들었으면 이 문장 처음으로 (음악 앱과 같다)
    const intoSentence = positionRef.current.word > 1;
    seekToSentence(intoSentence ? current : Math.max(0, current - 1));
  }, [seekToSentence]);

  /** 막대를 눌러 옮긴다 (0~1) */
  const seekToFraction = useCallback(
    (fraction: number) => {
      if (!ready) return;
      const ms = Math.min(1, Math.max(0, fraction)) * durationMs;
      stopAtRef.current = null;
      void player.seekTo(ms / 1000);
      if (statusRef.current === "idle" || statusRef.current === "ended") {
        setStatus("paused");
      }
      moveTo(locateInStory(sentences, ms));
      setProgress(fraction, false);
      setElapsedMs(ms);
    },
    [durationMs, moveTo, player, ready, sentences, setProgress],
  );

  /** 한 문장만 들려주고 멈춘다. 끝나면 done (따라 읽기) */
  const playSentenceOnly = useCallback(
    (index: number, done: () => void) => {
      const sentence = sentences[index];
      if (!sentence || !ready) return;
      void activatePlaybackAudio("doNotMix");
      setStatus("playing");
      const ms = Math.max(0, sentence.startMs - SEEK_LEAD_MS);
      void player.seekTo(ms / 1000);
      moveTo({ sentence: index, word: -1 });
      setProgress(durationMs ? ms / durationMs : 0, false);
      stopAtRef.current = { ms: sentence.endMs + 140, index, done };
      player.play();
    },
    [durationMs, moveTo, player, ready, sentences, setProgress],
  );

  const setRate = useCallback(
    (next: number) => {
      setRateState(next);
      if (!ready) return;
      player.shouldCorrectPitch = true;
      player.setPlaybackRate(next, "high");
    },
    [player, ready],
  );

  /** 단어 하나만 낭독 파일에서 잘라 들려준다 (단어 시트) */
  const playWord = useCallback(
    (sentenceIndex: number, wordIndex: number) => {
      const word = sentences[sentenceIndex]?.words[wordIndex];
      if (!ready || !word) return;
      void activatePlaybackAudio("doNotMix");
      void player.seekTo(Math.max(0, word.startMs - 40) / 1000);
      stopAtRef.current = {
        ms: word.endMs + 80,
        index: sentenceIndex,
        done: () => undefined,
      };
      setStatus("playing");
      player.play();
    },
    [player, ready, sentences],
  );

  /** 단어 시트를 열기 전 자리 */
  const getMs = useCallback(() => lastMsRef.current, []);

  /** 그 자리로 돌아간다 (재생은 하지 않는다) */
  const restoreMs = useCallback(
    (ms: number) => {
      if (!ready) return;
      stopAtRef.current = null;
      void player.seekTo(ms / 1000);
      moveTo(locateInStory(sentences, ms));
      setProgress(durationMs ? ms / durationMs : 0, false);
    },
    [durationMs, moveTo, player, ready, sentences, setProgress],
  );

  /** 따라 읽기가 끝나고 이야기 끝을 알릴 때 */
  const markEnded = useCallback(() => {
    stopAtRef.current = null;
    setStatus("ended");
    setProgress(1);
  }, [setProgress]);

  return {
    ready,
    status,
    position,
    elapsedMs,
    durationMs,
    rate,
    progress,
    play,
    pause,
    toggle,
    next,
    prev,
    seekToSentence,
    seekToFraction,
    playSentenceOnly,
    playWord,
    getMs,
    restoreMs,
    setRate,
    markEnded,
  };
}

export type StoryPlayer = ReturnType<typeof useStoryPlayer>;
