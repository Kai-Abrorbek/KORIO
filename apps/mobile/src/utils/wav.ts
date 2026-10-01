/**
 * 마이크에서 받은 PCM 청크를 Azure 가 받는 WAV 로 만든다.
 * Azure short-audio REST 는 16kHz / 모노 / 16bit PCM 만 받는다.
 */

export const TARGET_SAMPLE_RATE = 16000;

/** 스테레오 인터리브([L,R,L,R…])를 모노로 접는다 */
export function foldToMono(samples: Int16Array): Int16Array {
  const out = new Int16Array(samples.length >> 1);
  for (let i = 0; i < out.length; i++) {
    out[i] = (samples[i * 2] + samples[i * 2 + 1]) >> 1;
  }
  return out;
}

/**
 * 선형 보간 리샘플. 하드웨어가 16kHz 를 못 주고 48kHz 로 줄 때 여기서 맞춘다.
 * 음성 대역엔 이 정도면 충분하고, 안 맞으면 Azure 가 통째로 거절한다.
 */
export function resampleInt16(
  input: Int16Array,
  fromRate: number,
  toRate: number,
): Int16Array {
  if (fromRate === toRate || input.length === 0) return input;

  const ratio = fromRate / toRate;
  const outLength = Math.max(1, Math.floor(input.length / ratio));
  const out = new Int16Array(outLength);

  for (let i = 0; i < outLength; i++) {
    const pos = i * ratio;
    const idx = Math.floor(pos);
    const frac = pos - idx;
    const a = input[idx];
    const b = idx + 1 < input.length ? input[idx + 1] : a;
    out[i] = Math.round(a + (b - a) * frac);
  }
  return out;
}

/** 청크 여러 개를 하나로 잇는다 */
export function concatInt16(chunks: Int16Array[]): Int16Array {
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const out = new Int16Array(total);
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.length;
  }
  return out;
}

/** 16bit 모노 PCM → RIFF/WAVE 바이트 (헤더 44바이트 + 데이터) */
export function encodeWav(
  samples: Int16Array,
  sampleRate = TARGET_SAMPLE_RATE,
): ArrayBuffer {
  const channels = 1;
  const bytesPerSample = 2;
  const dataSize = samples.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const ascii = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) {
      view.setUint8(offset + i, text.charCodeAt(i));
    }
  };

  ascii(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  ascii(8, "WAVE");
  ascii(12, "fmt ");
  view.setUint32(16, 16, true); // fmt 청크 크기
  view.setUint16(20, 1, true); // 1 = PCM
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * channels * bytesPerSample, true); // byte rate
  view.setUint16(32, channels * bytesPerSample, true); // block align
  view.setUint16(34, bytesPerSample * 8, true); // bit depth
  ascii(36, "data");
  view.setUint32(40, dataSize, true);

  new Int16Array(buffer, 44).set(samples);
  return buffer;
}

/**
 * 앞뒤 무음을 잘라낸다 (말한 구간 ± 여유).
 *
 * 마이크를 누르고 말을 시작하기까지, 말을 끝내고 정지를 누르기까지의 무음이
 * 녹음의 절반을 넘는 일이 흔하다. 그대로 보내면 업로드도 Azure 처리도 그만큼
 * 길어진다 — 채점 대기 시간이 늘고 과금도 오디오 길이로 된다.
 *
 * 보수적으로 자른다: 기준은 "가장 큰 소리의 12%" 와 절대 하한 중 큰 값이고,
 * 말한 구간 앞뒤로 350ms 를 남긴다. 받침·어미 끝소리가 약해도 여유 안에 들어온다.
 * 말소리를 못 찾으면 자르지 않는다 (서버가 '못 들음' 으로 판단하게 둔다).
 */
export function trimSilence(
  samples: Int16Array,
  sampleRate = TARGET_SAMPLE_RATE,
  { frameMs = 20, padMs = 350, floor = 350, relative = 0.12 } = {},
): Int16Array {
  const frame = Math.max(1, Math.round((sampleRate * frameMs) / 1000));
  const frames = Math.floor(samples.length / frame);
  if (frames < 3) return samples;

  const levels = new Float32Array(frames);
  let peak = 0;
  for (let f = 0; f < frames; f++) {
    let sum = 0;
    const base = f * frame;
    for (let i = 0; i < frame; i++) {
      const v = samples[base + i];
      sum += v * v;
    }
    const level = Math.sqrt(sum / frame);
    levels[f] = level;
    if (level > peak) peak = level;
  }

  const threshold = Math.max(floor, peak * relative);
  let first = -1;
  let last = -1;
  for (let f = 0; f < frames; f++) {
    if (levels[f] >= threshold) {
      if (first < 0) first = f;
      last = f;
    }
  }
  if (first < 0) return samples;

  const pad = Math.round((sampleRate * padMs) / 1000);
  const start = Math.max(0, first * frame - pad);
  const end = Math.min(samples.length, (last + 1) * frame + pad);
  return samples.slice(start, end);
}
