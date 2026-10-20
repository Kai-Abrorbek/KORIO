import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { requestRecordingPermissionsAsync, useAudioStream } from "expo-audio";
import { activateRecordingAudio } from "@/utils/audio-session";
import { holdUiSoundsForCapture } from "@/utils/ui-sound-capture";
import { createSpeechCapture } from "@/utils/speech-capture";
import {
  TARGET_SAMPLE_RATE,
  concatInt16,
  encodeWav,
  foldToMono,
  resampleInt16,
  trimSilence,
} from "@/utils/wav";

export type SpeechRecorderError =
  | "permission"
  | "mic"
  | "too_short"
  | "unsupported";

const MIN_SAMPLES = TARGET_SAMPLE_RATE * 0.4; // 0.4초 미만은 서버가 어차피 거절

function rmsLevel(samples: Int16Array): number {
  if (!samples.length) return 0;
  let sumSquares = 0;
  let count = 0;
  for (let index = 0; index < samples.length; index += 4) {
    const value = samples[index];
    sumSquares += value * value;
    count++;
  }
  return count ? Math.sqrt(sumSquares / count) : 0;
}

interface Options {
  /** 이 시간이 지나면 자동으로 멈추고 결과를 넘긴다 */
  maxSeconds?: number;
  /** 말이 시작된 뒤 이만큼 조용하면 현재 구간을 자동 제출한다 */
  silenceStopMs?: number;
  /** 자동 제출용 음성 감지 RMS 기준 */
  voiceRmsThreshold?: number;
  /** 버퍼가 들어올 때마다 현재 입력 세기(RMS)를 알려준다. 화면에서 말하는 걸 따라가는 용도 */
  onLevel?: (rms: number) => void;
  /** 녹음이 끝나면 완성된 WAV 바이트를 받는다 */
  onResult: (wav: ArrayBuffer) => void;
  onError?: (error: SpeechRecorderError) => void;
}

/**
 * expo-audio 의 PCM 스트림으로 녹음해서 16kHz 모노 WAV 를 만든다.
 * m4a/aac 로 녹음한 뒤 서버에서 변환하는 방식은 Azure 가 그 포맷을 안 받아서 못 쓴다.
 */
export function useSpeechRecorder({
  maxSeconds = 15,
  silenceStopMs,
  voiceRmsThreshold = 650,
  onLevel,
  onResult,
  onError,
}: Options) {
  const [isRecording, setIsRecording] = useState(false);

  const chunks = useRef<Int16Array[]>([]);
  const sourceRate = useRef(TARGET_SAMPLE_RATE);
  const autoStop = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRevision = useRef(0);
  const voiceStarted = useRef(false);
  const lastVoiceAt = useRef(0);
  const silenceFinishQueued = useRef(false);
  const finishRef = useRef<() => void>(() => undefined);
  const silenceStopMsRef = useRef(silenceStopMs);
  silenceStopMsRef.current = silenceStopMs;
  const voiceRmsThresholdRef = useRef(voiceRmsThreshold);
  voiceRmsThresholdRef.current = voiceRmsThreshold;

  // 콜백이 바뀌어도 스트림을 다시 만들지 않도록 ref 로 잡아둔다
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const onLevelRef = useRef(onLevel);
  onLevelRef.current = onLevel;

  // 웹에서는 expo-audio 의 useAudioStream 이 stub 이라 stream 이 null 로 온다.
  // (node_modules/expo-audio/build/AudioStream.web.js) 타입은 non-null 이라 런타임에서 직접 확인한다.
  const { stream } = useAudioStream({
    sampleRate: TARGET_SAMPLE_RATE,
    channels: 1,
    encoding: "int16",
    onBuffer: (buffer) => {
      if (!capture.active) return;
      sourceRate.current = buffer.sampleRate || TARGET_SAMPLE_RATE;

      // 네이티브 버퍼가 재사용될 수 있으니 복사해서 들고 있는다
      const pcm = new Int16Array(buffer.data.slice(0));
      const mono = buffer.channels === 2 ? foldToMono(pcm) : pcm;
      chunks.current.push(mono);

      const level = rmsLevel(mono);
      onLevelRef.current?.(level);

      const silenceMs = silenceStopMsRef.current;
      if (!silenceMs || silenceFinishQueued.current) return;

      const now = Date.now();
      if (level >= voiceRmsThresholdRef.current) {
        voiceStarted.current = true;
        lastVoiceAt.current = now;
        return;
      }

      if (voiceStarted.current && now - lastVoiceAt.current >= silenceMs) {
        silenceFinishQueued.current = true;
        setTimeout(() => finishRef.current(), 0);
      }
    },
  });

  /**
   * 마이크 열기·닫기 순서는 utils/speech-capture 가 맡는다. 겹친 시작은 합류하고,
   * 기다리는 단계마다 시간 제한이 있어 "시작 중" 에 영영 갇히지 않는다.
   */
  const streamRef = useRef(stream);
  streamRef.current = stream;
  const capture = useMemo(
    () =>
      createSpeechCapture({
        requestPermission: () => requestRecordingPermissionsAsync(),
        activateAudio: () => activateRecordingAudio(),
        startStream: async () => {
          await streamRef.current?.start();
        },
        stopStream: () => streamRef.current?.stop(),
        holdCapture: holdUiSoundsForCapture,
      }),
    [],
  );

  const clearTimer = () => {
    if (autoStop.current) {
      clearTimeout(autoStop.current);
      autoStop.current = null;
    }
  };

  const finish = useCallback(() => {
    requestRevision.current += 1;
    clearTimer();
    // 실제로 녹음 중이 아니었으면 할 일이 없다 (진행 중인 시작은 물러진다)
    if (!capture.finish()) return;
    setIsRecording(false);
    silenceFinishQueued.current = false;

    const merged = concatInt16(chunks.current);
    chunks.current = [];
    const resampled = resampleInt16(
      merged,
      sourceRate.current,
      TARGET_SAMPLE_RATE,
    );

    if (resampled.length < MIN_SAMPLES) {
      onErrorRef.current?.("too_short");
      return;
    }
    // 앞뒤 무음을 덜어내면 업로드·채점이 그만큼 빨라진다.
    // 잘라서 서버 최소 길이보다 짧아지면 원본을 그대로 보낸다
    const trimmed = trimSilence(resampled, TARGET_SAMPLE_RATE);
    const payload = trimmed.length >= MIN_SAMPLES ? trimmed : resampled;
    onResultRef.current(encodeWav(payload, TARGET_SAMPLE_RATE));
  }, [capture]);
  finishRef.current = finish;

  /**
   * 마이크를 연다. true = 녹음 시작 (또는 이미 녹음 중).
   * false 는 둘 중 하나다 — 이유를 onError 로 알렸거나, 누군가 일부러 취소했다.
   * 이유 없이 조용히 false 가 나오는 길은 없다.
   */
  const start = useCallback(async () => {
    if (!stream) {
      onErrorRef.current?.("unsupported");
      return false;
    }
    const wasActive = capture.active;
    const revision = requestRevision.current;
    if (!wasActive) {
      chunks.current = [];
      sourceRate.current = TARGET_SAMPLE_RATE;
      voiceStarted.current = false;
      lastVoiceAt.current = 0;
      silenceFinishQueued.current = false;
    }
    const result = await capture.start();
    // cancel/finish may run after the bridge resolved but before this continuation.
    // Do not restore isRecording or report an old error into a newer recording.
    if (revision !== requestRevision.current) return false;
    if (!result.ok) {
      if (result.reason !== "cancelled") {
        onErrorRef.current?.(result.reason === "permission" ? "permission" : "mic");
      }
      return false;
    }
    if (!wasActive) {
      setIsRecording(true);
      clearTimer();
      autoStop.current = setTimeout(() => finishRef.current(), maxSeconds * 1000);
    }
    return true;
  }, [capture, maxSeconds, stream]);

  /** 결과를 버리고 즉시 중단 (화면 이탈 등) — 진행 중인 시작도 무른다 */
  const cancel = useCallback(() => {
    requestRevision.current += 1;
    const wasActive = capture.active;
    capture.cancel();
    clearTimer();
    if (!wasActive) return;
    setIsRecording(false);
    chunks.current = [];
    voiceStarted.current = false;
    lastVoiceAt.current = 0;
    silenceFinishQueued.current = false;
  }, [capture]);

  useEffect(() => cancel, [cancel]);

  return { isRecording, start, stop: finish, cancel };
}
