/* eslint-disable react-hooks/immutability -- expo-audio exposes an imperative player API. */
/* eslint-disable react-hooks/set-state-in-effect -- playback status is external state. */
import {
  clearPreloadedSource,
  preload,
  useAudioPlayer,
  useAudioPlayerStatus,
  type AudioSource,
} from "expo-audio";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import {
  TtsService,
  type SpeechGender,
  type SpeechLanguage,
} from "@/services/tts.service";
import { DEFAULT_SPEECH_VOICE, useSettingsStore } from "@/store/settings.store";
import { activatePlaybackAudio } from "@/utils/audio-session";

/** 느리게 듣기는 설정 속도에서 한 단계 더 내린다 */
const SLOW_FACTOR = 0.55;

function toSpeechLanguage(language: string): SpeechLanguage {
  const base = language.trim().toLowerCase().split("-")[0];
  if (base === "uz") return "uz-UZ";
  if (base === "en") return "en-US";
  if (base === "ru") return "ru-RU";
  return "ko-KR";
}

export interface SpeechPlaybackOptions {
  gender?: SpeechGender;
  voice?: string;
  rate?: number;
  volume?: number;
  respectSoundSettings?: boolean;
  onDone?: () => void;
  onError?: () => void;
  onStopped?: () => void;
}

interface ActiveSpeech {
  options?: SpeechPlaybackOptions;
  phase: "preparing" | "loading" | "playing";
  runId: number;
  source?: AudioSource;
  volume: number;
}

function releasePreloadedSource(source?: AudioSource) {
  if (Platform.OS === "web" || !source) return;
  void clearPreloadedSource(source).catch(() => undefined);
}

export function useSpeech() {
  const player = useAudioPlayer(null, {
    updateInterval: 100,
    keepAudioSessionActive: true,
  });
  const playerStatus = useAudioPlayerStatus(player);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const runIdRef = useRef(0);
  const activeRef = useRef<ActiveSpeech | null>(null);
  const handledFinishRef = useRef(false);
  /**
   * 미리 받아 둔 음성. key → 재생용 소스.
   *
   * speak() 한 번에 왕복이 두 번 든다 — /tts/speech 로 audioId 를 받고, 그
   * URL 을 다시 받아 디코딩한다. 탭하고 나서 이게 돌면 소리가 한 박자 늦는다.
   * 문장을 미리 알 수 있는 화면(단어 짝맞추기 등)은 prewarm() 으로 화면 뜰 때
   * 받아 두고, speak() 는 캐시가 있으면 바로 재생한다.
   */
  const warmRef = useRef(new Map<string, AudioSource>());

  /** 같은 문장이라도 언어·목소리·속도가 다르면 다른 음원이다 — 키에 다 넣는다 */
  const buildRequest = useCallback(
    (text: string, lang: string, slow: boolean, options?: SpeechPlaybackOptions) => {
      const { sound } = useSettingsStore.getState();
      const language = toSpeechLanguage(lang);
      const voice =
        options?.voice?.trim() ||
        (language === "ko-KR"
          ? sound.speechVoice || DEFAULT_SPEECH_VOICE
          : undefined);
      const rate = Math.min(
        2,
        Math.max(
          0.25,
          options?.rate ??
            (slow ? sound.speechRate * SLOW_FACTOR : sound.speechRate),
        ),
      );
      const gender = options?.gender ?? "female";
      return {
        key: `${language}|${gender}|${voice ?? ""}|${rate}|${text}`,
        request: { text, language, rate, gender, voice },
      };
    },
    [],
  );

  const stopCurrent = useCallback(
    (notify: boolean, updateState = true) => {
      runIdRef.current += 1;
      const active = activeRef.current;
      activeRef.current = null;
      releasePreloadedSource(active?.source);
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
      const active: ActiveSpeech = {
        options,
        phase: "preparing",
        runId,
        volume: Math.min(1, Math.max(0, volume)),
      };
      activeRef.current = active;
      setIsSpeaking(true);

      try {
        const { key, request } = buildRequest(
          normalizedText,
          lang,
          slow,
          options,
        );

        // prewarm 해 둔 게 있으면 왕복 두 번을 통째로 건너뛴다.
        // 캐시 소스는 warmRef 가 소유하므로 active.source 에 넣지 않는다 —
        // 넣으면 재생이 끝날 때 해제돼서 두 번째부터 다시 느려진다.
        const warmed = warmRef.current.get(key);
        const source = warmed ?? (await TtsService.prepareSource(request));
        if (runIdRef.current !== runId || activeRef.current !== active) return;

        // 짧은 원격 음성은 네이티브 준비 중 세션 전환과 겹치면 첫 프레임이
        // 유실될 수 있어 미리 받아둔다. 다만 이건 최적화일 뿐이라 실패해도
        // 안 된다 — 예전엔 여기서 throw 되면 아래 catch 가 삼켜서 아무 소리도
        // 안 나고 조용히 끝났다. 실패하면 ExoPlayer 가 URL 을 직접 받게 둔다.
        if (!warmed && Platform.OS !== "web") {
          const preloaded = await preload(source).then(
            () => true,
            (error: unknown) => {
              if (__DEV__) {
                console.warn("[useSpeech] preload 실패 → URL 직접 재생", error);
              }
              return false;
            },
          );
          if (runIdRef.current !== runId || activeRef.current !== active) {
            if (preloaded) releasePreloadedSource(source);
            return;
          }
          if (preloaded) active.source = source;
        }

        await activatePlaybackAudio("doNotMix").catch(() => undefined);
        if (runIdRef.current !== runId || activeRef.current !== active) return;

        handledFinishRef.current = false;
        active.phase = "loading";
        player.replace(source);
        player.muted = false;
        player.volume = active.volume;
        // expo-audio 56 의 Android AudioPlayer 는 playbackRate 프로퍼티에
        // setter 가 없다(Property 에 .set{} 미구현). 대입하면
        // "Cannot assign to property 'playbackRate'" 로 던져서 재생이 통째로
        // 죽는다. setPlaybackRate() 를 써야 한다.
        player.setPlaybackRate(1);

        // replace() 직후엔 아직 로드 전이라 이 play() 가 무시될 수 있다.
        // 그 경우 아래 상태 effect 가 isLoaded 시점에 한 번 더 건다.
        player.play();
      } catch (error) {
        if (__DEV__) {
          console.warn(`[useSpeech] 재생 실패 (phase=${active.phase})`, error);
        }
        if (runIdRef.current !== runId || activeRef.current !== active) return;
        activeRef.current = null;
        releasePreloadedSource(active.source);
        setIsSpeaking(false);
        options?.onError?.();
      }
    },
    [player, stopCurrent, buildRequest],
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

  /**
   * 곧 재생할 문장들을 화면 뜰 때 미리 받아 둔다.
   *
   * 실패는 조용히 넘긴다 — 어차피 재생 시점에 정상 경로로 다시 받는다.
   * 하나씩 순서대로 받는다. 한꺼번에 던지면 TTS 엔드포인트만 몰린다.
   */
  const prewarm = useCallback(
    (
      texts: readonly string[],
      lang: string = "ko-KR",
      options?: SpeechPlaybackOptions,
    ) => {
      if ((options?.respectSoundSettings ?? true) && useSettingsStore.getState().muted) {
        return;
      }
      void (async () => {
        for (const raw of texts) {
          const text = raw?.trim();
          if (!text) continue;
          const { key, request } = buildRequest(text, lang, false, options);
          if (warmRef.current.has(key)) continue;
          try {
            const source = await TtsService.prepareSource(request);
            if (Platform.OS !== "web") {
              await preload(source).catch(() => undefined);
            }
            warmRef.current.set(key, source);
          } catch {
            // 미리 받기는 최적화일 뿐이다
          }
        }
      })();
    },
    [buildRequest],
  );

  const stop = useCallback(() => stopCurrent(true), [stopCurrent]);

  useEffect(() => {
    void activatePlaybackAudio("doNotMix").catch(() => undefined);
  }, []);

  useEffect(() => {
    const active = activeRef.current;
    if (!active || active.runId !== runIdRef.current) return;

    if (playerStatus.error) {
      activeRef.current = null;
      releasePreloadedSource(active.source);
      setIsSpeaking(false);
      active.options?.onError?.();
      return;
    }

    // 로드가 끝났는데 아직 안 울리면 여기서 재생을 건다.
    // (replace() 직후의 play() 는 소스가 준비되기 전이라 무시될 수 있다)
    if (active.phase === "loading") {
      if (!playerStatus.isLoaded) return;
      active.phase = "playing";
      if (!playerStatus.playing) player.play();
      return;
    }

    if (!playerStatus.didJustFinish) {
      handledFinishRef.current = false;
      return;
    }
    if (handledFinishRef.current) return;
    handledFinishRef.current = true;
    activeRef.current = null;
    releasePreloadedSource(active.source);
    setIsSpeaking(false);
    active.options?.onDone?.();
  }, [
    playerStatus.didJustFinish,
    playerStatus.error,
    playerStatus.isLoaded,
    playerStatus.playing,
    player,
  ]);

  useEffect(() => {
    const warm = warmRef.current;
    return () => {
      stopCurrent(false, false);
      for (const source of warm.values()) releasePreloadedSource(source);
      warm.clear();
    };
  }, [stopCurrent]);

  const duration = Number.isFinite(playerStatus.duration)
    ? Math.max(0, playerStatus.duration)
    : 0;
  const currentTime = Number.isFinite(playerStatus.currentTime)
    ? Math.max(0, playerStatus.currentTime)
    : 0;
  const isSpeechPlaying =
    activeRef.current?.phase === "playing" && playerStatus.playing;
  const speechProgress =
    isSpeechPlaying && duration > 0
      ? Math.min(1, Math.max(0, currentTime / duration))
      : 0;

  return {
    speak,
    speakSlow,
    speakAuto,
    prewarm,
    stop,
    isSpeaking,
    isSpeechPlaying,
    speechProgress,
  };
}
