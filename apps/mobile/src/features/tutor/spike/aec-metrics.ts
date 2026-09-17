/**
 * AEC 스파이크 — 측정 계산.
 *
 * 순수 함수만 둔다. 오디오를 안 만지니 폰 없이도 돌려볼 수 있다.
 *
 * ── 무엇을 재는가 ──
 *
 * 기준은 "스피커 소리가 마이크에 **1도** 안 들어오냐" 가 아니다. 그건 물리적으로
 * 불가능하고 그렇게 재면 무조건 실패한다. 우리가 알아야 하는 건 하나다:
 *
 *   **남은 울림이 '사람 말' 로 인식될 만큼인가.**
 *
 * 그만큼 남으면 Gemini 의 turn 감지가 그걸 학습자 발화로 보고 튜터가 자기 말을
 * 끊는다. -50dB 로 남아 있어도 그게 무음 수준이면 아무 일도 안 일어난다.
 *
 * 그래서 두 가지를 본다:
 *   1) ERLE — AEC 를 껐을 때 대비 몇 dB 를 지웠나. 0 에 가까우면 **AEC 가 아예
 *      안 걸린 것**이다 (제일 무서운 실패: 조용히 아무 일도 안 일어난다)
 *   2) 말처럼 들리는 프레임 비율 — 재생 중 마이크 입력 중 몇 %가 VAD 를
 *      깨울 만한가
 */

/** 20ms 프레임 (16kHz 기준 320 샘플) */
export const FRAME_MS = 20;

export interface FrameStat {
  /** dBFS. 무음은 -Infinity 대신 FLOOR_DB */
  db: number;
  /** 영교차율 0~1. 사람 말은 대략 0.02~0.25 에 몰린다 */
  zcr: number;
}

export const FLOOR_DB = -100;

export function frameStat(samples: Float32Array): FrameStat {
  let sum = 0;
  let crossings = 0;
  let prev = samples[0] ?? 0;
  for (let i = 0; i < samples.length; i++) {
    const v = samples[i]!;
    sum += v * v;
    if ((v >= 0) !== (prev >= 0)) crossings++;
    prev = v;
  }
  const rms = Math.sqrt(sum / Math.max(1, samples.length));
  return {
    db: rms > 0 ? Math.max(FLOOR_DB, 20 * Math.log10(rms)) : FLOOR_DB,
    zcr: crossings / Math.max(1, samples.length),
  };
}

/** 프레임을 나눠 담을 때 쓴다. 중앙값이 평균보다 낫다 — 한 번의 쿵 소리에 안 흔들린다 */
export function median(xs: number[]): number {
  if (!xs.length) return FLOOR_DB;
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
}

/**
 * 이 프레임이 "사람 말" 로 보이나.
 *
 * 진짜 VAD 를 흉내 내려는 게 아니다. **VAD 를 깨울 만한 에너지와 결** 인지만
 * 본다. 기준을 노이즈 플로어 기준으로 잡는 이유: 조용한 방과 시끄러운 카페의
 * 절대값이 다르기 때문이다.
 */
export function looksLikeSpeech(f: FrameStat, noiseFloorDb: number): boolean {
  // 바닥보다 12dB 이상 솟았고, 결이 말과 비슷한 대역에 있을 때.
  // 12dB 는 대략 "확실히 뭔가 들린다" 선이다 (에너지 16배)
  return f.db > noiseFloorDb + 12 && f.zcr > 0.015 && f.zcr < 0.35;
}

export interface Run {
  /** 아무것도 안 틀고 잰 구간 */
  silenceDb: number[];
  /** 내 목소리를 스피커로 틀면서 잰 구간 */
  playbackFrames: FrameStat[];
}

export interface AecVerdict {
  noiseFloorDb: number;
  /** AEC 켠 상태에서 재생 중 마이크에 남은 소리 */
  echoOnDb: number;
  /** AEC 끈 상태 (비교군) */
  echoOffDb: number;
  /** 몇 dB 를 지웠나 */
  erleDb: number;
  /** 재생 중 "말처럼 들린" 프레임 비율 (%) — 이게 진짜 기준이다 */
  speechLikePct: number;
  verdict: 'PASS' | 'MARGINAL' | 'FAIL' | 'AEC_NOT_APPLIED';
  reason: string;
}

/**
 * ── 합격선을 이렇게 잡은 이유 ──
 *
 * ERLE 6dB 미만 = AEC 가 **안 걸린 것**. 하드웨어 AEC 는 최소 20dB 는 지운다.
 *   그보다 낮으면 라이브러리가 그 플랫폼에서 AEC 경로를 안 타고 있다는 뜻이고,
 *   이건 "성능이 아쉽다" 가 아니라 "기능이 없다" 다.
 *
 * 말처럼 들린 프레임 5% 미만 = 통과. 10분 대화에서 재생 시간의 5% 면 몇 초인데,
 *   그게 흩어져 있으면 VAD 가 안 깨어난다.
 *
 * 15% 넘으면 실패. 튜터가 한 문장 말할 때마다 한 번씩 자기 말을 끊는다는 뜻이고,
 *   그건 쓸 수 없는 물건이다.
 */
export function judge(on: Run, off: Run): AecVerdict {
  const noiseFloorDb = median(on.silenceDb);
  const echoOnDb = median(on.playbackFrames.map((f) => f.db));
  const echoOffDb = median(off.playbackFrames.map((f) => f.db));
  const erleDb = Math.round((echoOffDb - echoOnDb) * 10) / 10;

  const speechLike = on.playbackFrames.filter((f) =>
    looksLikeSpeech(f, noiseFloorDb),
  ).length;
  const speechLikePct =
    Math.round((speechLike / Math.max(1, on.playbackFrames.length)) * 1000) / 10;

  const base = { noiseFloorDb, echoOnDb, echoOffDb, erleDb, speechLikePct };

  if (erleDb < 6) {
    return {
      ...base,
      verdict: 'AEC_NOT_APPLIED',
      reason:
        `AEC 를 켜나 끄나 차이가 ${erleDb}dB 뿐이다. 하드웨어 AEC 는 최소 20dB 는 ` +
        `지운다 — 이 라이브러리가 이 플랫폼에서 AEC 경로를 안 타고 있다는 뜻이다. ` +
        `Option A 로 가면 튜터가 계속 자기 말을 끊는다.`,
    };
  }
  if (speechLikePct < 5) {
    return {
      ...base,
      verdict: 'PASS',
      reason:
        `재생 중 마이크에 남은 소리가 말로 인식될 만한 프레임이 ${speechLikePct}% 뿐이다. ` +
        `${erleDb}dB 지웠다. Option A(직접 WebSocket)로 진행해도 된다.`,
    };
  }
  if (speechLikePct < 15) {
    return {
      ...base,
      verdict: 'MARGINAL',
      reason:
        `말로 인식될 만한 프레임이 ${speechLikePct}% 다. 조용한 방에서는 되겠지만 ` +
        `볼륨을 올리거나 시끄러운 곳에서는 끊길 수 있다. 다른 기기·볼륨으로 다시 재보고 ` +
        `판단해라.`,
    };
  }
  return {
    ...base,
    verdict: 'FAIL',
    reason:
      `재생 중 ${speechLikePct}% 가 말로 인식될 수준이다. 튜터가 자기 말을 계속 끊는다. ` +
      `Option A 를 포기하고 LiveKit(B)으로 가라 — WebRTC 가 AEC 를 들고 있다.`,
  };
}
