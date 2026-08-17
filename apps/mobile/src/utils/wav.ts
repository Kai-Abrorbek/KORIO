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
