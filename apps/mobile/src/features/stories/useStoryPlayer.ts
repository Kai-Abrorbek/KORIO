import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAudioPlayer } from "expo-audio";
import {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSpeech } from "@/hooks/useSpeech";
import { activatePlaybackAudio } from "@/utils/audio-session";
import { storySpeechLocale } from "@/services/stories.service";
import { STORY_AUDIO_FILES } from "./storyAudio.generated";
import { locateInStory, type PlayerPosition } from "./storyTiming";
import type { StoryDetail } from "./stories.types";

/**
 * 이야기 재생 엔진.
 *
 * 번들 오디오가 있으면(보통) 그 파일을 틀고 단어 타이밍으로 지금 단어를 찾는다.
 * 없으면(새 이야기인데 앱이 옛 버전) 문장마다 기기 TTS 로 읽고 문장 단위로만 켠다.
 *
 * 화면이 초당 10번 다시 그려지지 않게, 재생 위치는 이벤트로 받아 "문장·단어가
 * 바뀔 때만" state 를 바꾼다. 해(진행)는 shared value 라 다시 그리지 않고 움직인다.
 */

export type PlayerStatus = "idle" | "playing" | "paused" | "ended";
export type { PlayerPosition };

const SEEK_LEAD_MS = 120;
const TTS_GAP_MS = 450;
const IDLE: PlayerPosition = { sentence: -1, word: -1 };

export function useStoryPlayer(
  story: StoryDetail | null,
  { onEnded }: { onEnded: () => void },
) {
  const source = story ? (STORY_AUDIO_FILES[story.audio.key] ?? null) : null;
  const mode: "audio" | "tts" = source ? "audio" : "tts";
  const player = useAudioPlayer(source, { updateInterval: 60 });
  const { speak, stop: stopSpeech } = useSpeech();
  /** 번들 오디오가 없을 때 기기 TTS 가 쓸 말 (이야기 언어) */
  const locale = storySpeechLocale(story?.targetLanguage);

  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [position, setPosition] = useState<PlayerPosition>(IDLE);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [rate, setRateState] = useState(1);
  const progress = useSharedValue(0);

  const statusRef = useRef<PlayerStatus>("idle");
  statusRef.current = status;
  const positionRef = useRef(position);
  positionRef.current = position;
  const rateRef = useRef(rate);
  rateRef.current = rate;
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;
  /** 한 문장만 들려줄 때 멈출 지점과 그때 부를 함수 (따라 읽기) */
  const stopAtRef = useRef<{ ms: number; index: number; done: () => void } | null>(null);
  const ttsRunRef = useRef(0);
  const ttsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  /* ── 번들 오디오 ── */

  useEffect(() => {
    if (mode !== "audio") return;
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
  }, [durationMs, mode, moveTo, player, sentences, setProgress]);

  /* ── 기기 TTS (오디오가 없을 때) ── */

  const clearTtsTimer = () => {
    if (ttsTimerRef.current) clearTimeout(ttsTimerRef.current);
    ttsTimerRef.current = null;
  };

  const speakFrom = useCallback(
    (index: number, onlyThis?: () => void) => {
      const run = ++ttsRunRef.current;
      clearTtsTimer();
      const sentence = sentences[index];
      if (!sentence) return;
      moveTo({ sentence: index, word: Number.MAX_SAFE_INTEGER });
      setProgress((index + 0.5) / Math.max(1, sentences.length));
      speak(sentence.text, locale, {
        rate: rateRef.current,
        respectSoundSettings: false,
        onDone: () => {
          if (run !== ttsRunRef.current) return;
          if (onlyThis) {
            setStatus("paused");
            onlyThis();
            return;
          }
          if (index + 1 >= sentences.length) {
            setStatus("ended");
            setProgress(1);
            onEndedRef.current();
            return;
          }
          ttsTimerRef.current = setTimeout(
            () => speakFrom(index + 1),
            TTS_GAP_MS,
          );
        },
        onError: () => {
          if (run === ttsRunRef.current) setStatus("paused");
        },
      });
    },
    [locale, moveTo, sentences, setProgress, speak],
  );

  /* ── 조작 ── */

  const play = useCallback(() => {
    if (!story) return;
    void activatePlaybackAudio("doNotMix");
    const restart = statusRef.current === "ended";
    setStatus("playing");
    if (mode === "audio") {
      if (restart) {
        void player.seekTo(0);
        moveTo({ sentence: 0, word: -1 });
        setProgress(0, false);
      } else if (positionRef.current.sentence < 0) {
        moveTo({ sentence: 0, word: -1 });
      }
      player.play();
    } else {
      const from = restart ? 0 : Math.max(0, positionRef.current.sentence);
      speakFrom(from);
    }
  }, [mode, moveTo, player, setProgress, speakFrom, story]);

  const pause = useCallback(() => {
    stopAtRef.current = null;
    if (mode === "audio") player.pause();
    else {
      ttsRunRef.current += 1;
      clearTtsTimer();
      stopSpeech();
    }
    if (statusRef.current === "playing") setStatus("paused");
  }, [mode, player, stopSpeech]);

  const toggle = useCallback(() => {
    if (statusRef.current === "playing") pause();
    else play();
  }, [pause, play]);

  /** 이 문장부터. play=false 면 자리만 옮긴다 */
  const seekToSentence = useCallback(
    (index: number, autoplay = true) => {
      const sentence = sentences[index];
      if (!sentence) return;
      stopAtRef.current = null;
      if (mode === "audio") {
        const ms = Math.max(0, sentence.startMs - SEEK_LEAD_MS);
        void player.seekTo(ms / 1000);
        moveTo({ sentence: index, word: -1 });
        setProgress(durationMs ? ms / durationMs : 0, false);
        if (autoplay) {
          void activatePlaybackAudio("doNotMix");
          setStatus("playing");
          player.play();
        }
      } else {
        moveTo({ sentence: index, word: Number.MAX_SAFE_INTEGER });
        if (autoplay) {
          setStatus("playing");
          speakFrom(index);
        } else {
          ttsRunRef.current += 1;
          stopSpeech();
        }
      }
    },
    [durationMs, mode, moveTo, player, sentences, setProgress, speakFrom, stopSpeech],
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
      if (mode !== "audio") {
        seekToSentence(
          Math.min(
            sentences.length - 1,
            Math.floor(fraction * sentences.length),
          ),
          statusRef.current === "playing",
        );
        return;
      }
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
    [durationMs, mode, moveTo, player, seekToSentence, sentences, setProgress],
  );

  /** 한 문장만 들려주고 멈춘다. 끝나면 done (따라 읽기) */
  const playSentenceOnly = useCallback(
    (index: number, done: () => void) => {
      const sentence = sentences[index];
      if (!sentence) return;
      void activatePlaybackAudio("doNotMix");
      setStatus("playing");
      if (mode === "audio") {
        const ms = Math.max(0, sentence.startMs - SEEK_LEAD_MS);
        void player.seekTo(ms / 1000);
        moveTo({ sentence: index, word: -1 });
        setProgress(durationMs ? ms / durationMs : 0, false);
        stopAtRef.current = { ms: sentence.endMs + 140, index, done };
        player.play();
      } else {
        speakFrom(index, done);
      }
    },
    [durationMs, mode, moveTo, player, sentences, setProgress, speakFrom],
  );

  const setRate = useCallback(
    (next: number) => {
      setRateState(next);
      if (mode === "audio") {
        player.shouldCorrectPitch = true;
        player.setPlaybackRate(next, "high");
      }
    },
    [mode, player],
  );

  /** 단어 하나만 그 목소리로 (단어 시트). 오디오가 없으면 기기 TTS */
  const playWord = useCallback(
    (sentenceIndex: number, wordIndex: number, fallbackText: string) => {
      const word = sentences[sentenceIndex]?.words[wordIndex];
      if (mode !== "audio" || !word) {
        speak(fallbackText, locale, { respectSoundSettings: false });
        return;
      }
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
    [locale, mode, player, sentences, speak],
  );

  /** 단어 시트를 열기 전 자리 */
  const getMs = useCallback(() => lastMsRef.current, []);

  /** 그 자리로 돌아간다 (재생은 하지 않는다) */
  const restoreMs = useCallback(
    (ms: number) => {
      if (mode !== "audio") return;
      stopAtRef.current = null;
      void player.seekTo(ms / 1000);
      moveTo(locateInStory(sentences, ms));
      setProgress(durationMs ? ms / durationMs : 0, false);
    },
    [durationMs, mode, moveTo, player, sentences, setProgress],
  );

  /** 따라 읽기가 끝나고 이야기 끝을 알릴 때 */
  const markEnded = useCallback(() => {
    stopAtRef.current = null;
    setStatus("ended");
    setProgress(1);
  }, [setProgress]);

  useEffect(
    () => () => {
      ttsRunRef.current += 1;
      clearTtsTimer();
      stopSpeech();
    },
    [stopSpeech],
  );

  return {
    mode,
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
