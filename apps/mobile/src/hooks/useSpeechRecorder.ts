import { useCallback, useEffect, useRef, useState } from "react";
import { requestRecordingPermissionsAsync, useAudioStream } from "expo-audio";
import { activateRecordingAudio } from "@/utils/audio-session";
import {
  TARGET_SAMPLE_RATE,
  concatInt16,
  encodeWav,
  foldToMono,
  resampleInt16,
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
  onResult,
  onError,
}: Options) {
  const [isRecording, setIsRecording] = useState(false);

  const chunks = useRef<Int16Array[]>([]);
  const sourceRate = useRef(TARGET_SAMPLE_RATE);
  const autoStop = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = useRef(false);
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

  // 웹에서는 expo-audio 의 useAudioStream 이 stub 이라 stream 이 null 로 온다.
  // (node_modules/expo-audio/build/AudioStream.web.js) 타입은 non-null 이라 런타임에서 직접 확인한다.
  const { stream } = useAudioStream({
    sampleRate: TARGET_SAMPLE_RATE,
    channels: 1,
    encoding: "int16",
    onBuffer: (buffer) => {
      if (!active.current) return;
      sourceRate.current = buffer.sampleRate || TARGET_SAMPLE_RATE;

      // 네이티브 버퍼가 재사용될 수 있으니 복사해서 들고 있는다
      const pcm = new Int16Array(buffer.data.slice(0));
      const mono = buffer.channels === 2 ? foldToMono(pcm) : pcm;
      chunks.current.push(mono);

      const silenceMs = silenceStopMsRef.current;
      if (!silenceMs || silenceFinishQueued.current) return;

      const now = Date.now();
      if (rmsLevel(mono) >= voiceRmsThresholdRef.current) {
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

  const clearTimer = () => {
    if (autoStop.current) {
      clearTimeout(autoStop.current);
      autoStop.current = null;
    }
  };

  const finish = useCallback(() => {
    if (!active.current) return;
    active.current = false;
    clearTimer();
    setIsRecording(false);
    silenceFinishQueued.current = false;
    try {
      stream?.stop();
    } catch {
      // 이미 멈춘 경우
    }

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
    onResultRef.current(encodeWav(resampled, TARGET_SAMPLE_RATE));
  }, [stream]);
  finishRef.current = finish;

  const start = useCallback(async () => {
    if (active.current) return false;

    if (!stream) {
      onErrorRef.current?.("unsupported");
      return false;
    }

    const permission = await requestRecordingPermissionsAsync();
    if (!permission.granted) {
      onErrorRef.current?.("permission");
      return false;
    }

    chunks.current = [];
    sourceRate.current = TARGET_SAMPLE_RATE;
    voiceStarted.current = false;
    lastVoiceAt.current = 0;
    silenceFinishQueued.current = false;

    try {
      await activateRecordingAudio();
      active.current = true;
      await stream.start();
    } catch {
      active.current = false;
      onErrorRef.current?.("mic");
      return false;
    }

    setIsRecording(true);
    autoStop.current = setTimeout(finish, maxSeconds * 1000);
    return true;
  }, [finish, maxSeconds, stream]);

  /** 결과를 버리고 즉시 중단 (화면 이탈 등) */
  const cancel = useCallback(() => {
    if (!active.current) return;
    active.current = false;
    clearTimer();
    setIsRecording(false);
    chunks.current = [];
    voiceStarted.current = false;
    lastVoiceAt.current = 0;
    silenceFinishQueued.current = false;
    try {
      stream?.stop();
    } catch {
      // 무시
    }
  }, [stream]);

  useEffect(() => cancel, [cancel]);

  return { isRecording, start, stop: finish, cancel };
}
