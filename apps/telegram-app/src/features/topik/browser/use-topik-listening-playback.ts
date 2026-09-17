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
}

export interface TopikPlaybackRequest {
  key: string;
  audioUrl?: string;
  transcript: TopikAudioLine[];
  speechSegments?: TopikSpeechSegment[];
  questionNumber?: number;
  repeatCount?: number;
  repeatPauseMs?: number;
  fallbackToSpeech?: boolean;
}

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
      const runId = runRef.current;
      const repeatCount = Math.max(1, playback.repeatCount ?? 1);
      const segments = playback.speechSegments?.length
        ? playback.speechSegments
        : [{
            questionNumber: playback.questionNumber,
            transcript: playback.transcript,
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
              onEnd: () => speakLine(repeatIndex, segmentIndex, lineIndex + 1),
              rate: listeningRate(
                segment.questionNumber ?? playback.questionNumber,
              ),
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

        speakLine(0, 0, 0);
      };

      if (!playback.audioUrl) {
        playSpeech();
        return true;
      }

      let repeatIndex = 0;
      const audio = new Audio(audioSource(playback.audioUrl));
      audio.preload = "auto";
      audio.playbackRate = listeningRate(playback.questionNumber);
      audioRef.current = audio;
      audio.onended = () => {
        if (runRef.current !== runId) return;
        if (repeatIndex + 1 >= repeatCount) {
          audioRef.current = null;
          finish("completed");
          return;
        }
        repeatIndex += 1;
        const replay = () => {
          timerRef.current = null;
          audio.currentTime = 0;
          void audio.play().catch(() => {
            if (playback.fallbackToSpeech) playSpeech();
            else finish("error");
          });
        };
        const pause = playback.repeatPauseMs ?? 0;
        if (pause > 0) timerRef.current = window.setTimeout(replay, pause);
        else replay();
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
