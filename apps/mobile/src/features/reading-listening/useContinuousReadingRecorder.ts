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

export type ReadingRecorderError = "permission" | "mic" | "unsupported";

/** 한 구간을 채점하고 나서, 오디오를 어디까지 버릴지 알려준다 */
export interface SegmentVerdict {
  /** 채점이 끝난 지점(ms). 여기까지만 버린다 */
  consumedMs: number;
  /** 남은 오디오까지 통째로 버릴지. 틀려서 다시 읽어야 할 때 true */
  dropAll: boolean;
}

interface Options {
  /**
   * 구간이 준비되면 부른다.
   * 이 함수가 끝나기 전에는 다음 구간을 보내지 않는다 — 순서가 어긋나면
   * 참조 단어 위치가 밀린다.
   */
  onSegment: (wav: ArrayBuffer) => Promise<SegmentVerdict>;
  onError?: (error: ReadingRecorderError) => void;
}

/** 말이 끊긴 걸로 보는 침묵 길이 */
const SILENCE_MS = 420;
/** 쉬지 않고 읽어도 이만큼 모이면 한 번 보낸다 */
const MAX_SEGMENT_MS = 4000;
/** 이보다 짧으면 보내봐야 서버가 거절한다 (서버 하한 400ms) */
const MIN_SEGMENT_MS = 700;
/**
 * 채점 요청 사이의 최소 간격.
 *
 * 없으면 어절마다 쉬는 느린 학습자에게서 **단어 하나당 요청 하나** 가 나간다.
 * 서버 rate limit(10분 80회)에 금방 걸리고 Azure 요청 수도 그만큼 는다.
 * 이 간격이 사실상의 호출 상한이다 — 지문 한 편에 대략 30~45회.
 */
const MIN_FLUSH_INTERVAL_MS = 1800;
/**
 * 진행이 없는데 계속 쌓이는 걸 막는 상한.
 * 같은 오디오를 반복해서 채점하면 Azure 호출료가 그냥 새어 나간다.
 */
const HARD_MAX_MS = 12000;
const VOICE_RMS = 600;
/**
 * 보내기 전에 앞쪽 무음을 잘라낸다.
 *
 * 왜 필요한가: 채점이 끝난 지점(consumedMs)까지만 버리는데, 마지막 단어 뒤의
 * 침묵은 버퍼에 남아 다음 구간의 **앞쪽 침묵**이 된다. 그게 매번 쌓이면
 * 실제로 보내는 오디오의 20~30% 가 아무 소리도 없는 구간이 된다.
 * Azure 발음 평가는 오디오 길이로 과금하니 그만큼 그냥 돈이다.
 *
 * 첫 소리보다 이만큼 앞은 남겨둔다 — 딱 붙여 자르면 첫 음절 앞부분이 깎인다.
 */
const LEAD_KEEP_MS = 160;
/** 이보다 짧은 앞 침묵은 굳이 자르지 않는다 */
const LEAD_TRIM_MIN_MS = 300;
/** 무음 탐색 창 */
const SCAN_WINDOW_MS = 20;

/**
 * ⚠️ 버퍼에 쌓이는 샘플은 **기기가 실제로 주는 레이트**다. 16kHz 를 요청해도
 * 안드로이드는 44.1/48kHz 로 주는 일이 흔하고(그래서 보낼 때 resample 한다),
 * 여기서 16kHz 로 가정하고 계산하면 버릴 길이가 3배씩 틀어진다.
 */
const msToSamples = (ms: number, rate: number) => Math.round((ms * rate) / 1000);
const samplesToMs = (n: number, rate: number) => Math.round((n * 1000) / rate);

function rmsLevel(samples: Int16Array): number {
  if (!samples.length) return 0;
  let sum = 0;
  let count = 0;
  for (let i = 0; i < samples.length; i += 4) {
    sum += samples[i] * samples[i];
    count++;
  }
  return count ? Math.sqrt(sum / count) : 0;
}

/**
 * 읽기 연습 전용 녹음기.
 *
 * 기존 useSpeechRecorder 와 결정적으로 다른 점: **채점하는 동안 마이크를 끄지
 * 않는다.**
 *
 * 예전 방식은 [녹음 → 정지 → 업로드 → Azure → 재시작] 을 반복했다. 그 사이
 * 2~3초 동안 마이크가 꺼져 있어서, 자연스럽게 이어 읽으면 그 구간이 통째로
 * 사라지고 "건너뛰고 읽었다" 로 채점됐다. 그래서 유저는 한 덩어리 읽고 멈춰서
 * 기다려야 했다 — 읽기 연습인데 읽기를 방해한 셈이다.
 *
 * 여기서는 소리를 계속 받아 버퍼에 쌓고, 구간이 준비되면 **녹음을 유지한 채로**
 * 보낸다. 서버는 채점이 끝난 지점(consumedMs)을 돌려주고, 딱 거기까지만 버린다.
 * 그래서 한 호흡에 참조보다 많이 읽어도 남은 오디오가 다음 구간으로 이어진다.
 */
export function useContinuousReadingRecorder({ onSegment, onError }: Options) {
  const [isRecording, setIsRecording] = useState(false);

  const active = useRef(false);
  /** 아직 채점되지 않은 소리 */
  const buffer = useRef<Int16Array[]>([]);
  const bufferSamples = useRef(0);
  const sourceRate = useRef(TARGET_SAMPLE_RATE);
  const inFlight = useRef(false);
  const lastFlushAt = useRef(0);
  const voiceStarted = useRef(false);
  const lastVoiceAt = useRef(0);
  const flushRef = useRef<() => void>(() => undefined);

  const onSegmentRef = useRef(onSegment);
  onSegmentRef.current = onSegment;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const reset = useCallback(() => {
    buffer.current = [];
    bufferSamples.current = 0;
    voiceStarted.current = false;
    lastVoiceAt.current = 0;
  }, []);

  /** 앞에서부터 ms 만큼 버린다 */
  const dropFront = useCallback((ms: number) => {
    let remaining = msToSamples(ms, sourceRate.current);
    while (remaining > 0 && buffer.current.length) {
      const head = buffer.current[0];
      if (head.length <= remaining) {
        remaining -= head.length;
        bufferSamples.current -= head.length;
        buffer.current.shift();
      } else {
        buffer.current[0] = head.subarray(remaining);
        bufferSamples.current -= remaining;
        remaining = 0;
      }
    }
    if (bufferSamples.current < 0) bufferSamples.current = 0;
  }, []);

  const { stream } = useAudioStream({
    sampleRate: TARGET_SAMPLE_RATE,
    channels: 1,
    encoding: "int16",
    onBuffer: (chunk) => {
      if (!active.current) return;
      sourceRate.current = chunk.sampleRate || TARGET_SAMPLE_RATE;

      // 네이티브 버퍼는 재사용되므로 복사해서 들고 있는다
      const pcm = new Int16Array(chunk.data.slice(0));
      const mono = chunk.channels === 2 ? foldToMono(pcm) : pcm;
      buffer.current.push(mono);
      bufferSamples.current += mono.length;

      const now = Date.now();
      if (rmsLevel(mono) >= VOICE_RMS) {
        voiceStarted.current = true;
        lastVoiceAt.current = now;
      }

      const pendingMs = samplesToMs(bufferSamples.current, sourceRate.current);
      const silent =
        voiceStarted.current && now - lastVoiceAt.current >= SILENCE_MS;

      // 쉬었거나, 쉬지 않고 계속 읽어서 충분히 모였으면 보낸다.
      // 어느 쪽이든 마이크는 켜둔 채다.
      const sinceLastFlush = now - lastFlushAt.current;
      if (
        voiceStarted.current &&
        pendingMs >= MIN_SEGMENT_MS &&
        sinceLastFlush >= MIN_FLUSH_INTERVAL_MS &&
        (silent || pendingMs >= MAX_SEGMENT_MS)
      ) {
        flushRef.current();
      }
    },
  });

  /**
   * 버퍼 앞쪽의 무음 길이(ms). 소리가 하나도 없으면 -1.
   * 실제 버리는 건 호출부가 한다 — 버퍼에서 직접 버려야 consumedMs 의 기준점이
   * 어긋나지 않는다.
   */
  const leadingSilenceMs = useCallback((pcm: Int16Array, rate: number) => {
    const window = msToSamples(SCAN_WINDOW_MS, rate);
    for (let i = 0; i + window <= pcm.length; i += window) {
      if (rmsLevel(pcm.subarray(i, i + window)) >= VOICE_RMS) {
        return samplesToMs(i, rate);
      }
    }
    return -1;
  }, []);

  const flush = useCallback(() => {
    // 앞 구간의 채점이 아직 안 끝났으면 그냥 더 쌓는다. 순서가 어긋나면
    // 참조 단어 위치가 밀려서 멀쩡히 읽은 단어가 오답이 된다.
    if (!active.current || inFlight.current) return;
    if (!buffer.current.length) return;

    // 앞쪽 무음 정리. 버퍼에서 직접 버려야 consumedMs 기준이 안 어긋난다.
    const lead = leadingSilenceMs(
      concatInt16(buffer.current),
      sourceRate.current,
    );
    if (lead < 0) {
      // 통째로 무음이다. 보내봐야 no_speech 만 받고 호출료만 나간다
      reset();
      return;
    }
    if (lead > LEAD_TRIM_MIN_MS) dropFront(lead - LEAD_KEEP_MS);
    if (samplesToMs(bufferSamples.current, sourceRate.current) < MIN_SEGMENT_MS) {
      return;
    }

    inFlight.current = true;
    lastFlushAt.current = Date.now();
    const merged = concatInt16(buffer.current);
    const pcm = resampleInt16(merged, sourceRate.current, TARGET_SAMPLE_RATE);
    const wav = encodeWav(pcm, TARGET_SAMPLE_RATE);
    // 보낸 시점의 길이를 기억해둔다. 채점하는 동안 뒤에 더 쌓이는데,
    // 그건 이번 채점 대상이 아니다.
    // (pcm 은 리샘플 뒤라 16kHz 기준으로 잰다)
    const sentMs = samplesToMs(pcm.length, TARGET_SAMPLE_RATE);

    void (async () => {
      try {
        const verdict = await onSegmentRef.current(wav);
        if (!active.current) return;
        if (verdict.dropAll) {
          reset();
        } else if (verdict.consumedMs > 0) {
          dropFront(Math.min(verdict.consumedMs, sentMs));
        }
      } catch {
        // 실패한 오디오를 계속 붙잡고 있으면 같은 걸 반복해서 채점한다
        reset();
      } finally {
        inFlight.current = false;
        voiceStarted.current = false;

        // 진행이 없는데 계속 쌓이면 오래된 쪽을 버린다.
        // 안 그러면 요청 본문이 커지고 같은 소리를 반복해서 채점한다.
        const pendingMs = samplesToMs(bufferSamples.current, sourceRate.current);
        if (pendingMs > HARD_MAX_MS) dropFront(pendingMs - HARD_MAX_MS / 2);
      }
    })();
  }, [dropFront, leadingSilenceMs, reset]);
  flushRef.current = flush;

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

    reset();
    inFlight.current = false;
    lastFlushAt.current = 0;
    sourceRate.current = TARGET_SAMPLE_RATE;

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
    return true;
  }, [reset, stream]);

  const stop = useCallback(() => {
    if (!active.current) return;
    active.current = false;
    inFlight.current = false;
    reset();
    setIsRecording(false);
    try {
      stream?.stop();
    } catch {
      // 이미 멈춤
    }
  }, [reset, stream]);

  /** 틀린 단어를 다시 읽게 할 때. 지금까지 쌓인 소리는 쓸모가 없다 */
  const discardPending = useCallback(() => reset(), [reset]);

  useEffect(() => stop, [stop]);

  return { isRecording, start, stop, discardPending };
}
