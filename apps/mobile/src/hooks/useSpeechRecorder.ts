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
  | "no_voice"
  | "unsupported";

const MIN_SAMPLES = TARGET_SAMPLE_RATE * 0.4; // 0.4초 미만은 서버가 어차피 거절

/**
 * ⚠️ 목소리 판정을 **고정값으로 하면 안 된다.**
 *
 * 예전에는 RMS 650 이상이면 목소리로 봤다. Int16 풀스케일(32768) 기준 2% 다.
 * 그 하나 때문에 두 가지가 동시에 깨졌다.
 *
 *  · 입력이 작은 기기(또는 폰을 손에 들고 말하는 보통 자세)에서는 650 을 한 번도
 *    못 넘긴다 → voiceStarted 가 영원히 false → 침묵 감지가 시작조차 안 돼서
 *    maxSeconds 까지 그냥 앉아 있는다. 글자도 안 따라오고 파형도 안 움직인다.
 *    사용자 눈에는 "말해도 아무 반응이 없다" 로 보인다. 이게 그 증상이었다.
 *
 *  · 반대로 선풍기·에어컨·길거리 소음만 있어도 650 을 계속 넘겨서 lastVoiceAt
 *    이 매 버퍼마다 갱신된다 → 침묵이 영원히 오지 않는다. 결과는 똑같다.
 *
 * 그래서 배경 소음 바닥을 실시간으로 재고, **그 위로 얼마나 튀는지**로 본다.
 * 조용한 방에서는 기준이 낮게, 시끄러운 데서는 높게 알아서 잡힌다.
 */
/** 이 아래는 어떤 기기에서도 목소리로 보지 않는다 (풀스케일의 0.5%) */
const ABSOLUTE_FLOOR = 170;
/** 소음 바닥의 이 배수를 넘으면 목소리로 본다 */
const VOICE_OVER_NOISE = 2.2;
/** 마이크를 열고 이만큼은 소음 바닥만 재고 목소리 판정을 미룬다 */
const CALIBRATION_MS = 260;
/** 파형 정규화의 하한. 입력이 작아도 말하면 눈에 보이게 움직이도록 */
const METER_FLOOR = 900;

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

/** 녹음 전체에서 가장 큰 절댓값. "정말 무음인가" 만 판정한다 */
function peakOf(chunks: Int16Array[]): number {
  let peak = 0;
  for (const chunk of chunks) {
    for (let index = 0; index < chunk.length; index += 8) {
      const value = chunk[index] < 0 ? -chunk[index] : chunk[index];
      if (value > peak) peak = value;
    }
  }
  return peak;
}

export interface SpeechLevelInfo {
  /** 0~1 로 정규화한 입력 세기. 파형에 그대로 먹이면 된다 */
  level: number;
  /** 지금 이 버퍼가 목소리로 판정됐는지 */
  voiced: boolean;
  /** 이번 녹음에서 목소리가 한 번이라도 잡혔는지 */
  everVoiced: boolean;
  /** 현재 목소리 판정 기준 (화면 디버깅용) */
  gate: number;
  /** 측정된 배경 소음 바닥 (화면 디버깅용) */
  floor: number;
}

interface Options {
  /** 이 시간이 지나면 자동으로 멈추고 결과를 넘긴다 */
  maxSeconds?: number;
  /** 말이 시작된 뒤 이만큼 조용하면 현재 구간을 자동 제출한다 */
  silenceStopMs?: number;
  /** 버퍼가 들어올 때마다 입력 세기와 목소리 판정을 알려준다 */
  onLevel?: (rms: number, info: SpeechLevelInfo) => void;
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
  onLevel,
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
  // 적응형 목소리 판정에 필요한 상태
  const startedAt = useRef(0);
  const noiseFloor = useRef(0);
  const meterPeak = useRef(METER_FLOOR);

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
      if (!active.current) return;
      sourceRate.current = buffer.sampleRate || TARGET_SAMPLE_RATE;

      // 네이티브 버퍼가 재사용될 수 있으니 복사해서 들고 있는다
      const pcm = new Int16Array(buffer.data.slice(0));
      const mono = buffer.channels === 2 ? foldToMono(pcm) : pcm;
      chunks.current.push(mono);

      const rms = rmsLevel(mono);
      const now = Date.now();
      const elapsed = now - startedAt.current;

      // 소음 바닥: 조용해지면 빨리 내려가고, 시끄러워지면 아주 천천히 올라간다.
      // 반대로 하면 사용자 목소리가 바닥을 끌어올려 자기 목소리를 못 듣게 된다.
      noiseFloor.current =
        noiseFloor.current === 0
          ? rms
          : rms < noiseFloor.current
            ? noiseFloor.current * 0.6 + rms * 0.4
            : noiseFloor.current * 0.995 + rms * 0.005;

      const gate = Math.max(ABSOLUTE_FLOOR, noiseFloor.current * VOICE_OVER_NOISE);
      const voiced = elapsed >= CALIBRATION_MS && rms >= gate;
      if (voiced) {
        voiceStarted.current = true;
        lastVoiceAt.current = now;
      }

      // 파형은 실제로 들어온 최대치에 맞춰 정규화한다. 그래야 입력이 작은
      // 기기에서도 말하는 만큼 움직인다 — 안 움직이면 사용자는 죽은 줄 안다.
      meterPeak.current = Math.max(rms, meterPeak.current * 0.985, METER_FLOOR);
      onLevelRef.current?.(rms, {
        level: Math.min(1, rms / meterPeak.current),
        voiced,
        everVoiced: voiceStarted.current,
        gate: Math.round(gate),
        floor: Math.round(noiseFloor.current),
      });

      const silenceMs = silenceStopMsRef.current;
      if (!silenceMs || silenceFinishQueued.current) return;
      // 목소리가 잡히기 전에는 침묵을 세지 않는다 (생각하는 시간을 끊으면 안 된다)
      if (!voiceStarted.current) return;
      if (!voiced && now - lastVoiceAt.current >= silenceMs) {
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
    const peak = peakOf(chunks.current);
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
    // 정말 무음이면 올리지 않는다. Azure 는 오디오 길이로 과금하고 서버는
    // 어차피 no_speech 를 돌려준다 — 그 왕복을 기다리게 할 이유가 없다.
    // 기준은 넉넉하게 둔다: 웅얼거린 건 올려서 채점받아야 한다.
    if (peak < ABSOLUTE_FLOOR * 2) {
      onErrorRef.current?.("no_voice");
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
    noiseFloor.current = 0;
    meterPeak.current = METER_FLOOR;

    try {
      await activateRecordingAudio();
      active.current = true;
      startedAt.current = Date.now();
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
    noiseFloor.current = 0;
    meterPeak.current = METER_FLOOR;
    try {
      stream?.stop();
    } catch {
      // 무시
    }
  }, [stream]);

  useEffect(() => cancel, [cancel]);

  return { isRecording, start, stop: finish, cancel };
}
