"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { apiBaseUrl } from "../../../shared/config/env";
import type { TopikAudioLine } from "../model/topik";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export type TopikPlaybackStatus =
  | "idle"
  | "playing"
  | "completed"
  | "unavailable"
  | "error";

export interface TopikSpeechSegment {
  transcript: TopikAudioLine[];
  questionNumber?: number;
  pauseAfterMs?: number;
  /** 대본 TTS 속도 (audio.speechRate). 없으면 문항 번호 기본값 */
  speechRate?: number;
}

export interface TopikPlaybackRequest {
  key: string;
  audioUrl?: string;
  transcript: TopikAudioLine[];
  speechSegments?: TopikSpeechSegment[];
  questionNumber?: number;
  /** 대본 TTS 속도 (audio.speechRate). 녹음 파일 재생 속도에는 쓰지 않는다 */
  speechRate?: number;
  repeatCount?: number;
  repeatPauseMs?: number;
  fallbackToSpeech?: boolean;
  /**
   * 모의고사처럼 소리가 곧 시험 진행인 곳은 음소거·볼륨 설정을 무시한다 (앱 respectSoundSettings:false).
   * 기본은 설정을 따른다 — 음소거면 재생하지 않고 false 를 돌려 재생 횟수도 쓰지 않는다
   */
  respectSoundSettings?: boolean;
  volume?: number;
  /**
   * 저장하고 나갔던 실전 시험을 이어서 들을 때: 원본 음원은 이 시각(초)부터,
   * 대본 TTS 는 이 문항이 든 묶음부터 시작한다 (앱과 같음)
   */
  startAtSeconds?: number;
  startAtQuestionNumber?: number;
}

/** 이 문항이 든 묶음의 첫 TTS 구간 (실전 이어서 듣기) */
function segmentIndexFor(segments: TopikSpeechSegment[], questionNumber: number | undefined) {
  if (!questionNumber) return 0;
  let groupStart: number | undefined;
  for (const segment of segments) {
    const n = segment.questionNumber;
    if (n !== undefined && n <= questionNumber && (groupStart === undefined || n > groupStart)) groupStart = n;
  }
  return Math.max(0, segments.findIndex((segment) => segment.questionNumber === groupStart));
}

/** use-korean-speech 와 같은 음소거 판정 */
function soundBlocked() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("korio-sound-settings") ?? "{}") as { speechVolume?: number; startMuted?: boolean };
    const session = window.sessionStorage.getItem("korio-muted");
    const muted = session === null ? Boolean(saved.startMuted) : session === "true";
    return muted || saved.speechVolume === 0;
  } catch {
    return false;
  }
}

/** 예비 속도 — 서버가 문항 음성마다 주는 speechRate(원본 기출 빠르기)가 없을 때만 (앱과 같음) */
function listeningRate(questionNumber?: number) {
  if (!questionNumber) return 1;
  if (questionNumber <= 20) return 0.82;
  if (questionNumber <= 30) return 0.9;
  if (questionNumber <= 40) return 1;
  return 1.03;
}

function speakerVoice(speaker: string) {
  const male = speaker.includes("남자") || speaker.includes("남성");
  return male
    ? { gender: "male" as const, voice: "ko-KR-InJoonNeural" }
    : { gender: "female" as const, voice: "ko-KR-SunHiNeural" };
}

function audioSource(url: string) {
  if (/^(https?:|blob:|data:)/.test(url)) return url;
  return `${apiBaseUrl()}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function useTopikListeningPlayback(request: AuthenticatedRequest) {
  const { speak: speakKorean, stop: stopKorean } = useKoreanSpeech(request);
  const [status, setStatus] = useState<TopikPlaybackStatus>("idle");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const runRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const stop = useCallback(() => {
    runRef.current += 1;
    clearTimer();
    stopKorean();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setActiveKey(null);
    setStatus("idle");
  }, [clearTimer, stopKorean]);

  const play = useCallback(
    (playback: TopikPlaybackRequest) => {
      stop();
      const respectSettings = playback.respectSoundSettings !== false;
      if (respectSettings && soundBlocked()) {
        // 음소거 — 소리 없이 "재생 완료" 로 흘려보내지 않는다 (앱은 unavailable 을 돌려준다)
        setStatus("unavailable");
        return false;
      }
      const runId = runRef.current;
      const repeatCount = Math.max(1, playback.repeatCount ?? 1);
      const segments = playback.speechSegments?.length
        ? playback.speechSegments
        : [{
            questionNumber: playback.questionNumber,
            transcript: playback.transcript,
            speechRate: playback.speechRate,
          }];
      setActiveKey(playback.key);
      setStatus("playing");

      const finish = (next: TopikPlaybackStatus) => {
        if (runRef.current !== runId) return;
        setStatus(next);
      };

      const playSpeech = () => {
        if (segments.every((segment) => segment.transcript.length === 0)) {
          finish("unavailable");
          return;
        }

        const speakLine = (
          repeatIndex: number,
          segmentIndex: number,
          lineIndex: number,
        ) => {
          if (runRef.current !== runId) return;
          const segment = segments[segmentIndex];
          if (!segment) {
            if (repeatIndex + 1 < repeatCount) {
              speakLine(repeatIndex + 1, 0, 0);
            } else {
              finish("completed");
            }
            return;
          }
          const line = segment.transcript[lineIndex];
          if (line) {
            const voice = speakerVoice(line.speaker);
            speakKorean(line.text, {
              ...voice,
              respectSoundSettings: respectSettings,
              volume: playback.volume,
              onEnd: () => speakLine(repeatIndex, segmentIndex, lineIndex + 1),
              rate:
                segment.speechRate ??
                listeningRate(segment.questionNumber ?? playback.questionNumber),
            });
            return;
          }

          const lastSegment = segmentIndex === segments.length - 1;
          const lastRepeat = repeatIndex === repeatCount - 1;
          if (lastSegment && lastRepeat) {
            finish("completed");
            return;
          }
          const continuePlayback = () => {
            timerRef.current = null;
            if (lastSegment) speakLine(repeatIndex + 1, 0, 0);
            else speakLine(repeatIndex, segmentIndex + 1, 0);
          };
          const pause = Math.max(
            segment.pauseAfterMs ?? 0,
            lastSegment ? (playback.repeatPauseMs ?? 0) : 0,
          );
          if (pause > 0) timerRef.current = window.setTimeout(continuePlayback, pause);
          else continuePlayback();
        };

        // 이어서 듣기면 그 문항이 든 묶음부터
        speakLine(0, Math.min(segmentIndexFor(segments, playback.startAtQuestionNumber), Math.max(0, segments.length - 1)), 0);
      };

      if (!playback.audioUrl) {
        playSpeech();
        return true;
      }

      // 원본 기출 음원: 시험에서 나오는 그대로("N번"·두 번 읽기·쉼이 파일 안에 있다).
      // 속도는 언제나 1.0배, 앱이 따로 반복하지 않는다 (반복은 대본 TTS 로 읽을 때만)
      const audio = new Audio(audioSource(playback.audioUrl));
      audio.preload = "auto";
      audio.playbackRate = 1;
      // 이어서 듣기: 원격 원본은 길이를 안 뒤에야 넘길 수 있다
      const startAt = playback.startAtSeconds ?? 0;
      if (startAt > 0) {
        audio.addEventListener("loadedmetadata", () => {
          const end = Number.isFinite(audio.duration) ? audio.duration - 1 : startAt;
          audio.currentTime = Math.max(0, Math.min(startAt, end));
        }, { once: true });
      }
      if (playback.volume !== undefined) audio.volume = Math.max(0, Math.min(1, playback.volume));
      audioRef.current = audio;
      audio.onended = () => {
        if (runRef.current !== runId) return;
        audioRef.current = null;
        finish("completed");
      };
      audio.onerror = () => {
        audioRef.current = null;
        if (playback.fallbackToSpeech) playSpeech();
        else finish("error");
      };
      void audio.play().catch(() => {
        audioRef.current = null;
        if (playback.fallbackToSpeech) playSpeech();
        else finish("error");
      });
      return true;
    },
    [speakKorean, stop],
  );

  useEffect(() => stop, [stop]);

  return { activeKey, play, status, stop };
}
