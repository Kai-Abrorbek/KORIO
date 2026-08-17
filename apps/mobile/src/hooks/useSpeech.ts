/* eslint-disable react-hooks/immutability -- expo-audio exposes an imperative player API. */
/* eslint-disable react-hooks/set-state-in-effect -- playback status is external state. */
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  prepareAzureSpeechSource,
  type SpeechGender,
} from "@/services/speech.service";
import { useSettingsStore } from "@/store/settings.store";

/** 느리게 듣기는 설정 속도에서 한 단계 더 내린다 */
const SLOW_FACTOR = 0.55;

export interface SpeechPlaybackOptions {
  gender?: SpeechGender;
  rate?: number;
  volume?: number;
  respectSoundSettings?: boolean;
  onDone?: () => void;
  onError?: () => void;
  onStopped?: () => void;
}

interface ActiveSpeech {
  options?: SpeechPlaybackOptions;
  runId: number;
}

export function useSpeech() {
  const player = useAudioPlayer(null, { updateInterval: 100 });
  const playerStatus = useAudioPlayerStatus(player);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const runIdRef = useRef(0);
  const activeRef = useRef<ActiveSpeech | null>(null);
  const handledFinishRef = useRef(false);

  const stopCurrent = useCallback(
    (notify: boolean, updateState = true) => {
      runIdRef.current += 1;
      const active = activeRef.current;
      activeRef.current = null;
      handledFinishRef.current = false;
      try {
        player.pause();
      } catch {
        // 화면이 닫히는 중이면 네이티브 플레이어가 먼저 해제될 수 있다.
      }
      if (updateState) setIsSpeaking(false);
      if (notify && active) active.options?.onStopped?.();
    },
    [player],
  );

  const run = useCallback(
    async (
      text: string,
      lang: string,
      slow: boolean,
      options?: SpeechPlaybackOptions,
    ) => {
      const normalizedText = text?.trim();
      if (!normalizedText) {
        if (__DEV__) console.warn("[useSpeech] 읽을 텍스트가 비어 있다");
        return;
      }

      const { sound, muted } = useSettingsStore.getState();
      const respectsSettings = options?.respectSoundSettings ?? true;
      const volume = options?.volume ?? sound.speechVolume;
      if ((respectsSettings && muted) || volume <= 0) return;

      stopCurrent(true);
      const runId = runIdRef.current;
      const active = { options, runId };
      activeRef.current = active;
      setIsSpeaking(true);

      try {
        const source = await prepareAzureSpeechSource({
          text: normalizedText,
          // 현재 Korio 학습 음성은 한국어다. 지원하지 않는 값은 한국어로 안전하게 통일한다.
          language: lang === "ko-KR" ? lang : "ko-KR",
          rate: Math.min(
            2,
            Math.max(
              0.25,
              options?.rate ??
                (slow ? sound.speechRate * SLOW_FACTOR : sound.speechRate),
            ),
          ),
          gender: options?.gender ?? "female",
        });
        if (runIdRef.current !== runId || activeRef.current !== active) return;

        handledFinishRef.current = false;
        player.replace(source);
        player.volume = Math.min(1, Math.max(0, volume));
        player.playbackRate = 1;
        player.play();
      } catch {
        if (runIdRef.current !== runId || activeRef.current !== active) return;
        activeRef.current = null;
        setIsSpeaking(false);
        options?.onError?.();
      }
    },
    [player, stopCurrent],
  );

  const speak = useCallback(
    (text: string, lang: string = "ko-KR", options?: SpeechPlaybackOptions) => {
      void run(text, lang, false, options);
    },
    [run],
  );

  const speakSlow = useCallback(
    (text: string, lang: string = "ko-KR", options?: SpeechPlaybackOptions) => {
      void run(text, lang, true, options);
    },
    [run],
  );

  /** 설정에서 자동 재생을 끄면 아무것도 하지 않는다. */
  const speakAuto = useCallback(
    (text: string, lang: string = "ko-KR", options?: SpeechPlaybackOptions) => {
      if (!useSettingsStore.getState().sound.autoPlay) return;
      void run(text, lang, false, options);
    },
    [run],
  );

  const stop = useCallback(() => stopCurrent(true), [stopCurrent]);

  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: "doNotMix",
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    const active = activeRef.current;
    if (!active || active.runId !== runIdRef.current) return;

    if (playerStatus.error) {
      activeRef.current = null;
      setIsSpeaking(false);
      active.options?.onError?.();
      return;
    }

    if (!playerStatus.didJustFinish) {
      handledFinishRef.current = false;
      return;
    }
    if (handledFinishRef.current) return;
    handledFinishRef.current = true;
    activeRef.current = null;
    setIsSpeaking(false);
    active.options?.onDone?.();
  }, [playerStatus.didJustFinish, playerStatus.error]);

  useEffect(
    () => () => {
      stopCurrent(false, false);
    },
    [stopCurrent],
  );

  return { speak, speakSlow, speakAuto, stop, isSpeaking };
}
