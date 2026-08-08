import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import * as Speech from "expo-speech";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSettingsStore } from "@/store/settings.store";
import type { TopikAudioLine } from "@/types/topik";

export type TopikListeningPlaybackStatus =
  | "idle"
  | "playing"
  | "completed"
  | "unavailable"
  | "error";

export interface TopikListeningSpeechSegment {
  transcript: TopikAudioLine[];
  pauseAfterMs?: number;
}

export interface TopikListeningPlaybackRequest {
  key: string;
  audioUrl?: string;
  transcript: TopikAudioLine[];
  speechSegments?: TopikListeningSpeechSegment[];
  repeatCount?: number;
  repeatPauseMs?: number;
  speechRate?: number;
  volume?: number;
  respectSoundSettings?: boolean;
  fallbackToSpeech?: boolean;
}

interface ResolvedPlaybackRun {
  id: number;
  key: string;
  audioUrl: string;
  speechSegments: TopikListeningSpeechSegment[];
  repeatCount: number;
  repeatPauseMs: number;
  speechRate: number;
  volume: number;
  fallbackToSpeech: boolean;
}

interface NativePlaybackRun {
  id: number;
  repeatIndex: number;
  repeatCount: number;
  fallbackAttempted: boolean;
}

function linePitch(speaker: string) {
  return speaker.includes("여자") || speaker.includes("여성") ? 1.08 : 0.94;
}

export function useTopikListeningPlayback() {
  const audioPlayer = useAudioPlayer(null, { updateInterval: 250 });
  const audioStatus = useAudioPlayerStatus(audioPlayer);
  const [status, setStatus] = useState<TopikListeningPlaybackStatus>("idle");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const runIdRef = useRef(0);
  const activeRunRef = useRef<ResolvedPlaybackRun | null>(null);
  const nativeRunRef = useRef<NativePlaybackRun | null>(null);
  const speechActiveRef = useRef(false);
  const speechReadyPromiseRef = useRef<Promise<void> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handledNativeFinishRef = useRef(false);

  const clearPauseTimer = useCallback(() => {
    if (!pauseTimerRef.current) return;
    clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = null;
  }, []);

  const ensureSpeechReady = useCallback(() => {
    if (!speechReadyPromiseRef.current) {
      speechReadyPromiseRef.current = Speech.getAvailableVoicesAsync()
        .then(() => undefined)
        .catch((error: unknown) => {
          speechReadyPromiseRef.current = null;
          throw error;
        });
    }
    return speechReadyPromiseRef.current;
  }, []);

  const finishRun = useCallback(
    (runId: number, nextStatus: TopikListeningPlaybackStatus) => {
      if (runIdRef.current !== runId) return;
      clearPauseTimer();
      activeRunRef.current = null;
      nativeRunRef.current = null;
      speechActiveRef.current = false;
      setStatus(nextStatus);
    },
    [clearPauseTimer],
  );

  const invalidateCurrentRun = useCallback(() => {
    runIdRef.current += 1;
    clearPauseTimer();
    activeRunRef.current = null;
    nativeRunRef.current = null;
    speechActiveRef.current = false;
    handledNativeFinishRef.current = false;
  }, [clearPauseTimer]);

  const cancelPendingPlayback = useCallback(() => {
    const hasActiveSpeech = speechActiveRef.current;
    invalidateCurrentRun();
    if (hasActiveSpeech) void Speech.stop().catch(() => undefined);
  }, [invalidateCurrentRun]);

  const stop = useCallback(() => {
    const hasActiveNativeAudio = nativeRunRef.current !== null;
    cancelPendingPlayback();
    if (hasActiveNativeAudio) {
      try {
        audioPlayer.pause();
      } catch {
        // The player can already be released while the screen is closing.
      }
    }
    setActiveKey(null);
    setStatus("idle");
  }, [audioPlayer, cancelPendingPlayback]);

  const startSpeech = useCallback(
    (run: ResolvedPlaybackRun) => {
      nativeRunRef.current = null;
      handledNativeFinishRef.current = false;
      setStatus("playing");

      const speakLine = (
        repeatIndex: number,
        segmentIndex: number,
        lineIndex: number,
      ) => {
        if (runIdRef.current !== run.id) return;
        const segment = run.speechSegments[segmentIndex];

        if (!segment) {
          if (repeatIndex + 1 < run.repeatCount) {
            speakLine(repeatIndex + 1, 0, 0);
          } else {
            finishRun(run.id, "completed");
          }
          return;
        }

        const line = segment.transcript[lineIndex];
        if (line) {
          speechActiveRef.current = true;
          Speech.speak(line.text, {
            language: "ko-KR",
            rate: run.speechRate,
            pitch: linePitch(line.speaker),
            volume: run.volume,
            onDone: () => speakLine(repeatIndex, segmentIndex, lineIndex + 1),
            onError: () => finishRun(run.id, "error"),
            onStopped: () => {
              if (runIdRef.current === run.id) finishRun(run.id, "idle");
            },
          });
          return;
        }

        const isLastSegment = segmentIndex === run.speechSegments.length - 1;
        const isLastRepeat = repeatIndex === run.repeatCount - 1;
        if (isLastSegment && isLastRepeat) {
          finishRun(run.id, "completed");
          return;
        }

        const continuePlayback = () => {
          pauseTimerRef.current = null;
          if (runIdRef.current !== run.id) return;
          if (isLastSegment) {
            speakLine(repeatIndex + 1, 0, 0);
          } else {
            speakLine(repeatIndex, segmentIndex + 1, 0);
          }
        };
        const repeatPauseMs = isLastSegment ? run.repeatPauseMs : 0;
        const pauseAfterMs = Math.max(
          0,
          segment.pauseAfterMs ?? 0,
          repeatPauseMs,
        );
        if (pauseAfterMs > 0) {
          pauseTimerRef.current = setTimeout(continuePlayback, pauseAfterMs);
        } else {
          continuePlayback();
        }
      };

      void ensureSpeechReady()
        .then(() => {
          if (runIdRef.current === run.id) speakLine(0, 0, 0);
        })
        .catch(() => finishRun(run.id, "error"));
    },
    [ensureSpeechReady, finishRun],
  );

  const fallbackToSpeechOrFail = useCallback(
    (nativeRun: NativePlaybackRun) => {
      const activeRun = activeRunRef.current;
      if (
        activeRun &&
        activeRun.id === nativeRun.id &&
        activeRun.fallbackToSpeech &&
        !nativeRun.fallbackAttempted &&
        activeRun.speechSegments.length > 0
      ) {
        nativeRun.fallbackAttempted = true;
        try {
          audioPlayer.pause();
        } catch {
          // A failed native source may already have released its playback handle.
        }
        startSpeech(activeRun);
        return;
      }

      finishRun(nativeRun.id, "error");
    },
    [audioPlayer, finishRun, startSpeech],
  );

  const play = useCallback(
    (request: TopikListeningPlaybackRequest) => {
      const { muted, sound } = useSettingsStore.getState();
      const respectsSettings = request.respectSoundSettings ?? true;
      const volume = Math.min(
        1,
        Math.max(
          0,
          request.volume ?? (respectsSettings ? sound.speechVolume : 1),
        ),
      );
      const speechSegments =
        request.speechSegments?.filter(
          (segment) => segment.transcript.length > 0,
        ) ??
        (request.transcript.length > 0
          ? [{ transcript: request.transcript }]
          : []);
      const hasAudio = Boolean(request.audioUrl);
      const hasSpeech = speechSegments.length > 0;

      const hasActiveNativeAudio = nativeRunRef.current !== null;
      const hasActiveSpeech = speechActiveRef.current;
      invalidateCurrentRun();
      const runId = runIdRef.current;
      if (hasActiveNativeAudio) {
        try {
          audioPlayer.pause();
        } catch {
          // A stale native handle must not prevent the next TTS run from starting.
        }
      }
      setActiveKey(request.key);

      if (
        (respectsSettings && muted) ||
        volume <= 0 ||
        (!hasAudio && !hasSpeech)
      ) {
        if (hasActiveSpeech) void Speech.stop().catch(() => undefined);
        setStatus("unavailable");
        return false;
      }

      const run: ResolvedPlaybackRun = {
        id: runId,
        key: request.key,
        audioUrl: request.audioUrl ?? "",
        speechSegments,
        repeatCount: Math.max(1, request.repeatCount ?? 1),
        repeatPauseMs: Math.max(0, request.repeatPauseMs ?? 0),
        speechRate: request.speechRate ?? sound.speechRate,
        volume,
        fallbackToSpeech: request.fallbackToSpeech ?? false,
      };
      activeRunRef.current = run;
      setStatus("playing");

      if (!run.audioUrl) {
        if (hasActiveSpeech) {
          void Speech.stop()
            .catch(() => undefined)
            .then(() => startSpeech(run));
        } else {
          startSpeech(run);
        }
        return true;
      }

      const nativeRun: NativePlaybackRun = {
        id: run.id,
        repeatIndex: 0,
        repeatCount: run.repeatCount,
        fallbackAttempted: false,
      };
      nativeRunRef.current = nativeRun;

      const startNativePlayback = () => {
        if (runIdRef.current !== run.id) return;
        try {
          audioPlayer.volume = run.volume;
          audioPlayer.playbackRate = 1;
          audioPlayer.replace(run.audioUrl);
          audioPlayer.play();
        } catch {
          fallbackToSpeechOrFail(nativeRun);
        }
      };
      if (hasActiveSpeech) {
        void Speech.stop()
          .catch(() => undefined)
          .then(startNativePlayback);
      } else {
        startNativePlayback();
      }
      return true;
    },
    [audioPlayer, fallbackToSpeechOrFail, invalidateCurrentRun, startSpeech],
  );

  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: "doNotMix",
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    const nativeRun = nativeRunRef.current;
    if (!nativeRun) return;

    if (audioStatus.error) {
      fallbackToSpeechOrFail(nativeRun);
      return;
    }

    if (!audioStatus.didJustFinish) {
      handledNativeFinishRef.current = false;
      return;
    }

    if (handledNativeFinishRef.current) return;
    handledNativeFinishRef.current = true;

    if (nativeRun.repeatIndex + 1 < nativeRun.repeatCount) {
      nativeRun.repeatIndex += 1;
      const replay = () => {
        pauseTimerRef.current = null;
        if (runIdRef.current !== nativeRun.id) return;
        void audioPlayer
          .seekTo(0)
          .then(() => {
            if (runIdRef.current === nativeRun.id) audioPlayer.play();
          })
          .catch(() => fallbackToSpeechOrFail(nativeRun));
      };
      const activeRun = activeRunRef.current;
      const repeatPauseMs =
        activeRun?.id === nativeRun.id ? activeRun.repeatPauseMs : 0;
      if (repeatPauseMs > 0) {
        pauseTimerRef.current = setTimeout(replay, repeatPauseMs);
      } else {
        replay();
      }
      return;
    }

    finishRun(nativeRun.id, "completed");
  }, [
    audioPlayer,
    audioStatus.didJustFinish,
    audioStatus.error,
    fallbackToSpeechOrFail,
    finishRun,
  ]);

  useEffect(
    () => () => {
      // useAudioPlayer owns the native object's lifecycle and releases it on
      // unmount. Cleanup must not call pause() after that release.
      cancelPendingPlayback();
    },
    [cancelPendingPlayback],
  );

  return {
    activeKey,
    isPlaying: status === "playing",
    play,
    status,
    stop,
  };
}
