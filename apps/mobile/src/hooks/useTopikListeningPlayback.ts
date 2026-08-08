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

export interface TopikListeningPlaybackRequest {
  key: string;
  audioUrl?: string;
  transcript: TopikAudioLine[];
  repeatCount?: number;
}

interface NativePlaybackRun {
  id: number;
  repeatIndex: number;
  repeatCount: number;
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
  const nativeRunRef = useRef<NativePlaybackRun | null>(null);
  const handledNativeFinishRef = useRef(false);

  const finishRun = useCallback(
    (runId: number, nextStatus: TopikListeningPlaybackStatus) => {
      if (runIdRef.current !== runId) return;
      nativeRunRef.current = null;
      setStatus(nextStatus);
    },
    [],
  );

  const stop = useCallback(() => {
    runIdRef.current += 1;
    nativeRunRef.current = null;
    handledNativeFinishRef.current = false;
    void Speech.stop();
    audioPlayer.pause();
    audioPlayer.replace(null);
    setActiveKey(null);
    setStatus("idle");
  }, [audioPlayer]);

  const play = useCallback(
    (request: TopikListeningPlaybackRequest) => {
      const { muted, sound } = useSettingsStore.getState();
      const repeatCount = Math.max(1, request.repeatCount ?? 1);
      const hasAudio = Boolean(request.audioUrl);
      const hasTranscript = request.transcript.length > 0;

      runIdRef.current += 1;
      const runId = runIdRef.current;
      nativeRunRef.current = null;
      handledNativeFinishRef.current = false;
      void Speech.stop();
      audioPlayer.pause();
      audioPlayer.replace(null);
      setActiveKey(request.key);

      if (muted || sound.speechVolume <= 0 || (!hasAudio && !hasTranscript)) {
        setStatus("unavailable");
        return false;
      }

      setStatus("playing");

      if (request.audioUrl) {
        try {
          audioPlayer.volume = sound.speechVolume;
          audioPlayer.playbackRate = 1;
          nativeRunRef.current = { id: runId, repeatIndex: 0, repeatCount };
          audioPlayer.replace(request.audioUrl);
          audioPlayer.play();
          return true;
        } catch {
          finishRun(runId, "error");
          return false;
        }
      }

      const speakLine = (repeatIndex: number, lineIndex: number) => {
        if (runIdRef.current !== runId) return;
        const line = request.transcript[lineIndex];

        if (!line) {
          if (repeatIndex + 1 < repeatCount) {
            speakLine(repeatIndex + 1, 0);
          } else {
            finishRun(runId, "completed");
          }
          return;
        }

        Speech.speak(line.text, {
          language: "ko-KR",
          rate: sound.speechRate,
          pitch: linePitch(line.speaker),
          volume: sound.speechVolume,
          onDone: () => speakLine(repeatIndex, lineIndex + 1),
          onError: () => finishRun(runId, "error"),
          onStopped: () => {
            if (runIdRef.current === runId) finishRun(runId, "idle");
          },
        });
      };

      void Speech.stop()
        .then(() => {
          if (runIdRef.current === runId) speakLine(0, 0);
        })
        .catch(() => finishRun(runId, "error"));
      return true;
    },
    [audioPlayer, finishRun],
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
      finishRun(nativeRun.id, "error");
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
      void audioPlayer.seekTo(0).then(() => {
        if (runIdRef.current === nativeRun.id) audioPlayer.play();
      });
      return;
    }

    finishRun(nativeRun.id, "completed");
  }, [audioPlayer, audioStatus.didJustFinish, audioStatus.error, finishRun]);

  useEffect(() => stop, [stop]);

  return {
    activeKey,
    isPlaying: status === "playing",
    play,
    status,
    stop,
  };
}
