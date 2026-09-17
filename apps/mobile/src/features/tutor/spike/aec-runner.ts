import {
  AudioBuffer,
  AudioContext,
  AudioManager,
  AudioRecorder,
} from "react-native-audio-api";
import { Platform } from "react-native";
import { FRAME_MS, frameStat, type FrameStat, type Run } from "./aec-metrics";

/**
 * AEC 스파이크 — 실제 측정.
 *
 * ── 왜 내 목소리를 녹음해서 다시 트나 ──
 *
 * 합성음(사인파·노이즈)으로 재면 안 된다. AEC 엔진은 **사람 말에 맞춰 튜닝돼**
 * 있어서 합성음에는 과하게 잘 듣는다. 통과했다고 믿고 갔다가 실전에서 깨진다.
 * 그렇다고 오디오 파일을 에셋으로 넣으면 그 파일의 녹음 환경이 섞인다.
 *
 * 같은 기기·같은 스피커·같은 방에서 방금 녹음한 **내 목소리**가 가장 정확한
 * 시험 신호다. 에셋도, 서버도 필요 없다.
 */

/** 16kHz — Gemini 입력 native. 실전과 같은 조건으로 재야 의미가 있다 */
const SAMPLE_RATE = 16_000;
const BUFFER_LENGTH = (SAMPLE_RATE * FRAME_MS) / 1000; // 320

export type Phase =
  | "idle"
  | "permission"
  | "recordVoice"
  | "measureOn"
  | "measureOff"
  | "done"
  | "error";

export interface Progress {
  phase: Phase;
  /** 화면에 그대로 띄울 한 줄 */
  message: string;
  /** 0~1 */
  ratio?: number;
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * 이 기기에서 AEC 를 JS 로 켜고 끌 수 있나.
 *
 * ⚠️ react-native-audio-api 0.13.4 의 AudioRecorder 는 **생성자 인자를 받지
 * 않는다.** (0.12 까지 있던 androidInputPreset / iosVoiceProcessing 이 사라졌다.)
 * 그래서 AEC 손잡이는 오디오 세션 하나뿐이고, 그건 iOS 전용이다.
 *
 * iOS: `iosMode: 'voiceChat'` 가 Voice-Processing I/O(= 애플 AEC)를 켠다. 가능.
 * Android: audioSource(VOICE_COMMUNICATION) 도 AcousticEchoCanceler 도 JS 로
 *   노출되지 않는다 — 내부 miniaudio 기본 inputPreset 으로 열린다.
 *   → Android 에서 이 스파이크가 재는 건 "AEC 가 얼마나 지우나"가 아니라
 *     "아무 처리 없이 스피커 소리가 마이크에 얼마나 새나" 다. 그 수치가 FAIL 이면
 *     Option A 는 Android 에서 그대로는 못 간다 (네이티브 패치가 필요하다).
 */
export const AEC_TOGGLE_SUPPORTED = Platform.OS === "ios";

/**
 * 오디오 세션.
 *
 * ⚠️ **이 설정이 스파이크의 전부다.**
 *
 * iOS: category `playAndRecord` + mode `voiceChat` 가 Voice-Processing I/O 를
 *   켠다 — 그게 애플의 하드웨어 AEC 다. `defaultToSpeaker` 를 같이 줘야
 *   수화기가 아니라 **스피커폰**으로 나간다. 수화기로 재면 소리가 작아서
 *   무조건 통과하는데, 실제 유저는 스피커로 쓴다.
 *
 * Android: 이 라이브러리에는 audioSource(VOICE_COMMUNICATION)나
 *   AcousticEchoCanceler 를 직접 켜는 공개 옵션이 **없다.** 내부적으로 걸어
 *   주는지는 문서로 확인이 안 된다 — 그래서 이 스파이크가 필요하다.
 *   ERLE 가 6dB 미만으로 나오면 안 걸린 것이고, 그게 Option A 의 사망 선고다.
 */
function setSession(aec: boolean) {
  AudioManager.setAudioSessionOptions({
    iosCategory: "playAndRecord",
    iosMode: aec ? "voiceChat" : "default",
    // 스피커폰으로 강제. 이어폰을 꽂고 재면 시험 자체가 무의미하다
    iosOptions: ["defaultToSpeaker", "allowBluetoothHFP"],
  });
}

/** 녹음하면서 프레임 통계를 모은다 */
function collect(recorder: AudioRecorder, into: FrameStat[]) {
  recorder.onAudioReady(
    { sampleRate: SAMPLE_RATE, bufferLength: BUFFER_LENGTH, channelCount: 1 },
    (e) => {
      const ch = e.buffer.getChannelData(0);
      into.push(frameStat(ch));
    },
  );
}

/** 녹음하면서 원본 샘플까지 모은다 (내 목소리를 다시 틀어야 하므로) */
function collectRaw(recorder: AudioRecorder, into: Float32Array[]) {
  recorder.onAudioReady(
    { sampleRate: SAMPLE_RATE, bufferLength: BUFFER_LENGTH, channelCount: 1 },
    (e) => {
      // 콜백이 넘겨준 버퍼는 재사용될 수 있다. 복사해 둔다
      into.push(Float32Array.from(e.buffer.getChannelData(0)));
    },
  );
}

function toAudioBuffer(ctx: AudioContext, chunks: Float32Array[]): AudioBuffer {
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const buf = ctx.createBuffer(1, Math.max(1, total), SAMPLE_RATE);
  const out = buf.getChannelData(0);
  let at = 0;
  for (const c of chunks) {
    out.set(c, at);
    at += c.length;
  }
  return buf;
}

/** 한 번의 측정: 무음 2초 → 내 목소리 재생하며 녹음 */
async function measure(
  aec: boolean,
  voice: Float32Array[],
  ctx: AudioContext,
  report: (p: Progress) => void,
  label: string,
): Promise<Run> {
  setSession(aec);
  await AudioManager.setAudioSessionActivity(true);

  const recorder = new AudioRecorder();
  const silence: FrameStat[] = [];
  const playback: FrameStat[] = [];

  // ── 1) 노이즈 플로어 ──
  collect(recorder, silence);
  await recorder.start();
  report({
    phase: aec ? "measureOn" : "measureOff",
    message: `${label} · 조용히 2초...`,
  });
  await sleep(2000);
  recorder.clearOnAudioReady();

  // ── 2) 재생하면서 ──
  collect(recorder, playback);
  const src = ctx.createBufferSource();
  src.buffer = toAudioBuffer(ctx, voice);
  const gain = ctx.createGain();
  // 실제 통화 볼륨쯤. 1.0 으로 밀면 클리핑이 나서 AEC 가 불리해진다
  gain.gain.value = 0.85;
  src.connect(gain);
  gain.connect(ctx.destination);

  const durSec = voice.reduce((n, c) => n + c.length, 0) / SAMPLE_RATE;
  report({
    phase: aec ? "measureOn" : "measureOff",
    message: `${label} · 재생 중 (${durSec.toFixed(1)}초) — 아무 말도 하지 마세요`,
  });
  src.start(ctx.currentTime);
  await sleep(durSec * 1000 + 300);
  try {
    src.stop();
  } catch {
    /* 이미 끝났으면 그만 */
  }

  recorder.clearOnAudioReady();
  await recorder.stop();
  return { silenceDb: silence.map((f) => f.db), playbackFrames: playback };
}

export interface SpikeResult {
  on: Run;
  off: Run;
  platform: string;
  voiceSec: number;
  /** false 면 ON/OFF 두 측정이 같은 조건이다 (Android). 결과 해석이 달라진다 */
  aecToggleSupported: boolean;
}

export async function runAecSpike(
  report: (p: Progress) => void,
): Promise<SpikeResult> {
  report({ phase: "permission", message: "마이크 권한 확인 중..." });
  const perm = await AudioManager.requestRecordingPermissions();
  if (perm !== "Granted") throw new Error("MIC_PERMISSION_DENIED");

  const ctx = new AudioContext({ sampleRate: SAMPLE_RATE });

  // ── 시험 신호: 내 목소리 ──
  setSession(true);
  await AudioManager.setAudioSessionActivity(true);
  const voice: Float32Array[] = [];
  const rec = new AudioRecorder();
  collectRaw(rec, voice);
  await rec.start();
  for (let i = 4; i > 0; i--) {
    report({
      phase: "recordVoice",
      message: `아무 말이나 계속 하세요 — ${i}초`,
      ratio: (4 - i) / 4,
    });
    await sleep(1000);
  }
  rec.clearOnAudioReady();
  await rec.stop();

  const voiceSec = voice.reduce((n, c) => n + c.length, 0) / SAMPLE_RATE;
  if (voiceSec < 1) throw new Error("NO_AUDIO_CAPTURED");

  // ── 본 측정. 순서를 ON 먼저로 두는 이유: OFF 에서 하울링이 나면
  //    거기서 멈춰도 ON 결과는 이미 손에 있다 ──
  const on = await measure(true, voice, ctx, report, "AEC 켜고");
  await sleep(600);
  const off = await measure(false, voice, ctx, report, "AEC 끄고 (비교군)");

  await AudioManager.setAudioSessionActivity(false);
  await ctx.close();

  return {
    on,
    off,
    platform: `${Platform.OS} ${Platform.Version}`,
    voiceSec,
    aecToggleSupported: AEC_TOGGLE_SUPPORTED,
  };
}
