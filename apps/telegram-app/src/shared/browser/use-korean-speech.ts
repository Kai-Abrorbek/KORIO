"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { apiBaseUrl } from "../config/env";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

interface PreparedSpeechResponse {
  audioId: string;
}

interface PreparedSpeech {
  buffer: AudioBuffer;
  url: string;
}

const DEFAULT_KOREAN_VOICE = "ko-KR-SunHiNeural";
const MAX_CACHED_SPEECH = 32;

export type SpeechLanguage = "ko-KR" | "uz-UZ" | "en-US" | "ru-RU";

/** 앱 utils/speech-language 와 같다 — 뜻 문장은 그 언어 음성으로 읽어야 발음이 산다 */
export function speechLanguageOf(language?: string): SpeechLanguage {
  const base = language?.toLowerCase().split("-")[0];
  if (base === "uz") return "uz-UZ";
  if (base === "en") return "en-US";
  if (base === "ru") return "ru-RU";
  return "ko-KR";
}

export interface KoreanSpeechOptions {
  gender?: "female" | "male";
  /** 기본 ko-KR. 다른 언어면 목소리 설정은 무시한다(한국어 목소리 전용) */
  language?: SpeechLanguage;
  onEnd?: () => void;
  rate?: number;
  respectSoundSettings?: boolean;
  voice?: string;
  volume?: number;
}

interface SavedSoundPreferences {
  speechRate?: number;
  speechVoice?: string;
  speechVolume?: number;
  startMuted?: boolean;
}

/** 설정의 "Avtomatik o‘qish" — 끄면 화면이 뜰 때 저절로 읽지 않는다 (앱 speakAuto) */
export function isAutoPlayEnabled() {
  try {
    return (JSON.parse(window.localStorage.getItem("korio-sound-settings") ?? "{}") as { autoPlay?: boolean }).autoPlay !== false;
  } catch {
    return true;
  }
}

function savedSoundPreferences(): SavedSoundPreferences {
  try {
    return JSON.parse(
      window.localStorage.getItem("korio-sound-settings") ?? "{}",
    ) as SavedSoundPreferences;
  } catch {
    return {};
  }
}

function browserSpeech(
  text: string,
  rate: number,
  volume: number,
  onEnd: () => void,
  language: SpeechLanguage = "ko-KR",
) {
  if (!("speechSynthesis" in window)) {
    onEnd();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = rate;
  utterance.volume = volume;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
}

/**
 * 모바일 앱과 같은 서버 TTS 음원을 재생한다.
 *
 * Telegram iOS WebView에서는 Web Speech API가 없거나 무음으로 끝나는 경우가
 * 있어서, 인증된 prepare 요청으로 받은 WAV를 Web Audio로 재생한다. request를
 * 넘기지 않는 기존 화면은 브라우저 음성을 안전한 대체 경로로 계속 사용한다.
 */
export function useKoreanSpeech(request?: AuthenticatedRequest) {
  const [speaking, setSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const runIdRef = useRef(0);
  const progressFrameRef = useRef<number | null>(null);
  const preparedRef = useRef(new Map<string, PreparedSpeech>());
  const preparingRef = useRef(new Map<string, Promise<PreparedSpeech>>());

  const getAudioContext = useCallback(() => {
    if (contextRef.current) return contextRef.current;
    const AudioContextConstructor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextConstructor) return null;
    const context = new AudioContextConstructor();
    contextRef.current = context;
    return context;
  }, []);

  const prepare = useCallback(
    async (
      text: string,
      rate = 1,
      gender: "female" | "male" = "female",
      voice = DEFAULT_KOREAN_VOICE,
      language: SpeechLanguage = "ko-KR",
    ): Promise<PreparedSpeech> => {
      const korean = language === "ko-KR";
      const cacheKey = korean ? `${voice}:${rate}:${text}` : `${language}:${gender}:${rate}:${text}`;
      const ready = preparedRef.current.get(cacheKey);
      if (ready) {
        preparedRef.current.delete(cacheKey);
        preparedRef.current.set(cacheKey, ready);
        return ready;
      }

      const pending = preparingRef.current.get(cacheKey);
      if (pending) return pending;
      if (!request) throw new Error("SERVER_TTS_UNAVAILABLE");

      const preparation = (async () => {
        const { audioId } = await request<PreparedSpeechResponse>("/tts/speech", {
          body: JSON.stringify({
            gender,
            language,
            rate,
            text,
            voice: korean ? voice : undefined,
          }),
          method: "POST",
        });
        const url =
          apiBaseUrl() + "/tts/speech/" + encodeURIComponent(audioId);
        const response = await fetch(url, { cache: "force-cache" });
        if (!response.ok) {
          throw new Error("TTS_AUDIO_" + String(response.status));
        }
        const context = getAudioContext();
        if (!context) throw new Error("WEB_AUDIO_UNAVAILABLE");
        const buffer = await context.decodeAudioData(await response.arrayBuffer());
        const prepared = { buffer, url };
        preparedRef.current.set(cacheKey, prepared);

        while (preparedRef.current.size > MAX_CACHED_SPEECH) {
          const oldest = preparedRef.current.keys().next().value as
            | string
            | undefined;
          if (!oldest) break;
          preparedRef.current.delete(oldest);
        }
        return prepared;
      })();

      preparingRef.current.set(cacheKey, preparation);
      try {
        return await preparation;
      } finally {
        if (preparingRef.current.get(cacheKey) === preparation) {
          preparingRef.current.delete(cacheKey);
        }
      }
    },
    [getAudioContext, request],
  );

  const stop = useCallback(() => {
    runIdRef.current += 1;
    if (progressFrameRef.current !== null) cancelAnimationFrame(progressFrameRef.current);
    progressFrameRef.current = null;
    try {
      sourceRef.current?.stop();
    } catch {
      // 이미 끝난 Web Audio 소스는 다시 stop할 수 없다.
    }
    sourceRef.current?.disconnect();
    sourceRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
    setProgress(0);
  }, []);

  const speak = useCallback(
    (rawText: string, options?: KoreanSpeechOptions) => {
      const text = rawText.trim();
      if (!text || typeof window === "undefined") return;
      const respectSettings = options?.respectSoundSettings !== false;
      const saved = respectSettings ? savedSoundPreferences() : {};
      const rate = options?.rate ?? saved.speechRate ?? 1;
      const language = options?.language ?? "ko-KR";
      const voice = options?.voice ?? saved.speechVoice;
      const volume = Math.min(
        1,
        Math.max(0, options?.volume ?? saved.speechVolume ?? 1),
      );
      const sessionMuted = window.sessionStorage.getItem("korio-muted");
      const muted =
        respectSettings &&
        (sessionMuted === null
          ? Boolean(saved.startMuted)
          : sessionMuted === "true");
      if (muted || volume === 0) {
        options?.onEnd?.();
        return;
      }
      const finish = () => {
        if (runIdRef.current !== runId) return;
        if (progressFrameRef.current !== null) cancelAnimationFrame(progressFrameRef.current);
        progressFrameRef.current = null;
        setProgress(1);
        setSpeaking(false);
        options?.onEnd?.();
      };

      stop();
      const runId = runIdRef.current;
      setSpeaking(true);
      setProgress(0);

      if (!request) {
        browserSpeech(text, rate, volume, finish, language);
        return;
      }

      const context = getAudioContext();
      const resume = context?.resume().catch(() => undefined);
      void (async () => {
        try {
          const prepared = await prepare(
            text,
            rate,
            options?.gender,
            voice,
            language,
          );
          await resume;
          if (runIdRef.current !== runId) return;

          if (context?.state === "running") {
            const source = context.createBufferSource();
            const gain = context.createGain();
            source.buffer = prepared.buffer;
            gain.gain.value = volume;
            source.connect(gain);
            gain.connect(context.destination);
            source.onended = () => {
              if (sourceRef.current === source) sourceRef.current = null;
              gain.disconnect();
              finish();
            };
            sourceRef.current = source;
            source.start();
            const startedAt = context.currentTime;
            const tick = () => {
              if (runIdRef.current !== runId || sourceRef.current !== source) return;
              setProgress(Math.min(1, (context.currentTime - startedAt) / Math.max(0.01, prepared.buffer.duration)));
              progressFrameRef.current = requestAnimationFrame(tick);
            };
            progressFrameRef.current = requestAnimationFrame(tick);
            return;
          }

          const audio = new Audio(prepared.url);
          audio.preload = "auto";
          audio.volume = volume;
          audio.onended = () => {
            if (audioRef.current === audio) audioRef.current = null;
            finish();
          };
          audioRef.current = audio;
          audio.ontimeupdate = () => {
            if (runIdRef.current === runId && Number.isFinite(audio.duration) && audio.duration > 0) {
              setProgress(Math.min(1, audio.currentTime / audio.duration));
            }
          };
          await audio.play();
        } catch {
          if (runIdRef.current !== runId) return;
          browserSpeech(text, rate, volume, finish, language);
        }
      })();
    },
    [getAudioContext, prepare, request, stop],
  );

  const prewarm = useCallback(
    (texts: readonly string[]) => {
      if (!request || typeof window === "undefined") return;
      // speak() 와 같은 목소리·속도로 받아 둔다. 기본값으로 받으면 설정에서 목소리를
      // 바꾼 사람은 캐시가 한 번도 안 맞고 TTS 호출만 두 배가 된다
      const saved = savedSoundPreferences();
      const rate = saved.speechRate ?? 1;
      const voice = saved.speechVoice || DEFAULT_KOREAN_VOICE;
      const unique = [...new Set(texts.map((text) => text.trim()).filter(Boolean))];
      void Promise.all(
        unique.map((text) =>
          preparedRef.current.has(`${voice}:${rate}:${text}`)
            ? Promise.resolve()
            : prepare(text, rate, undefined, voice).then(() => undefined).catch(() => undefined),
        ),
      );
    },
    [prepare, request],
  );

  useEffect(() => {
    const unlock = () => {
      void contextRef.current?.resume().catch(() => undefined);
    };
    window.addEventListener("pointerdown", unlock, { passive: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  useEffect(
    () => () => {
      runIdRef.current += 1;
      try {
        sourceRef.current?.stop();
      } catch {
        // 이미 끝난 소스는 무시한다.
      }
      audioRef.current?.pause();
      window.speechSynthesis?.cancel();
      if (progressFrameRef.current !== null) cancelAnimationFrame(progressFrameRef.current);
      void contextRef.current?.close().catch(() => undefined);
    },
    [],
  );

  return { prewarm, progress, speak, speaking, stop };
}
