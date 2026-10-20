/**
 * 마이크 열기·닫기 순서 — React·네이티브 모듈과 떨어진 작은 컨트롤러 (useSpeechRecorder 가 쓴다).
 *
 * 2026-10-20 "말하기 연습에서 마이크를 눌러도 아무 반응이 없다" 의 원인:
 *   예전 start() 는 "시작 중" 깃발과 요청 번호로 겹친 호출을 조용히 false 로 돌려보냈다.
 *   - 자동으로 열리는 마이크와 사용자의 탭이 겹치면 두 시도가 서로를 무르고 둘 다 false.
 *   - 권한·오디오 세션·스트림 중 하나라도 응답이 없으면 "시작 중" 이 영영 안 풀려,
 *     그 뒤 모든 탭이 화면 변화 없이 무시됐다 (빨리 false → 화면이 그리기 전에 idle).
 *
 * 그래서 여기서는:
 *   - 진행 중인 시작이 있으면 같은 결과를 기다린다 (합류). 실패로 돌려보내지 않는다.
 *   - 시도는 하나씩만 돈다. 취소된 옛 시도가 늦게 끝나도 새 녹음을 멈추지 않는다.
 *   - 기다리는 단계마다 시간 제한이 있다. 오디오 세션은 늦어도 마이크를 연다.
 *   - 조용한 실패는 "누가 일부러 취소했다" 하나뿐이다. 나머지는 이유를 돌려준다.
 */

export type CaptureFailure = "permission" | "mic" | "cancelled";
export type CaptureStartResult = { ok: true } | { ok: false; reason: CaptureFailure };

export interface SpeechCaptureDeps {
  requestPermission: () => Promise<{ granted: boolean }>;
  /** 녹음용 오디오 세션 — 늦거나 실패해도 마이크는 연다 */
  activateAudio: () => Promise<void>;
  startStream: () => Promise<void>;
  stopStream: () => void;
  /** UI 효과음을 막아 두고, 푸는 함수를 돌려준다 */
  holdCapture: () => () => void;
  timeouts?: {
    /** 권한 대화상자에 답할 시간까지 */
    permission?: number;
    audio?: number;
    stream?: number;
  };
}

const CANCELLED: CaptureStartResult = { ok: false, reason: "cancelled" };
const OK: CaptureStartResult = { ok: true };

const TIMED_OUT = Symbol("timed-out");

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | typeof TIMED_OUT> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<typeof TIMED_OUT>((resolve) => {
    timer = setTimeout(() => resolve(TIMED_OUT), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export function createSpeechCapture(deps: SpeechCaptureDeps) {
  const limits = {
    permission: deps.timeouts?.permission ?? 30000,
    audio: deps.timeouts?.audio ?? 1500,
    stream: deps.timeouts?.stream ?? 4000,
  };
  /** 취소·끝내기마다 올라간다. 시도는 자기 번호가 아직 최신일 때만 마이크를 쥔다 */
  let generation = 0;
  let active = false;
  let release: (() => void) | null = null;
  /** 진행 중인 시도가 쥔 효과음 잠금 — 멈추면 시도가 끝나기를 기다리지 않고 바로 푼다 */
  let pending: (() => void) | null = null;
  /** 지금 세대의 시작 (합류용) */
  let inflight: { generation: number; promise: Promise<CaptureStartResult> } | null = null;
  /** 마지막 시도가 끝날 때까지 — 다음 시도는 이걸 기다렸다가 시작한다 */
  let tail: Promise<unknown> = Promise.resolve();

  const stopQuietly = () => {
    try {
      deps.stopStream();
    } catch {
      // 이미 멈춘 경우
    }
  };

  async function attempt(mine: number): Promise<CaptureStartResult> {
    const current = () => mine === generation;
    let permission: { granted: boolean } | typeof TIMED_OUT;
    try {
      permission = await withTimeout(deps.requestPermission(), limits.permission);
    } catch {
      return current() ? { ok: false, reason: "mic" } : CANCELLED;
    }
    if (!current()) return CANCELLED;
    if (permission === TIMED_OUT) return { ok: false, reason: "mic" };
    if (!permission.granted) return { ok: false, reason: "permission" };

    const held = deps.holdCapture();
    pending = held;
    const mineRelease = () => {
      if (pending === held) pending = null;
      held();
    };
    // 세션 설정이 밀려 있어도 기다리다 굳지 않는다 — 시간이 지나면 그냥 연다
    await withTimeout(deps.activateAudio().catch(() => undefined), limits.audio);
    if (!current()) {
      mineRelease();
      return CANCELLED;
    }

    let started: boolean | typeof TIMED_OUT;
    try {
      started = await withTimeout(deps.startStream().then(() => true), limits.stream);
    } catch {
      started = false;
    }
    if (started !== true) {
      stopQuietly();
      mineRelease();
      return current() ? { ok: false, reason: "mic" } : CANCELLED;
    }
    if (!current()) {
      // 이 시도가 도는 동안 취소됐다. 다음 시도는 이게 끝난 뒤에 시작하므로 여기서 멈춰도 안전하다
      stopQuietly();
      mineRelease();
      return CANCELLED;
    }
    if (pending === held) pending = null;
    active = true;
    release = held;
    return OK;
  }

  const letGo = () => {
    release?.();
    release = null;
    pending?.();
    pending = null;
  };

  return {
    get active() {
      return active;
    },

    start(): Promise<CaptureStartResult> {
      if (active) return Promise.resolve(OK);
      if (inflight && inflight.generation === generation) return inflight.promise;
      const mine = ++generation;
      const promise = tail.then(() => (mine === generation ? attempt(mine) : CANCELLED));
      tail = promise.catch(() => undefined);
      inflight = { generation: mine, promise };
      void promise.finally(() => {
        if (inflight?.promise === promise) inflight = null;
      });
      return promise;
    },

    /** 녹음을 끝낸다. 실제로 녹음 중이었으면 true (결과를 만들 차례) */
    finish(): boolean {
      generation += 1;
      inflight = null;
      if (!active) {
        letGo();
        return false;
      }
      active = false;
      stopQuietly();
      letGo();
      return true;
    },

    /** 결과를 버리고 멈춘다 (화면 이탈 등). 진행 중인 시작도 무른다 */
    cancel(): void {
      generation += 1;
      inflight = null;
      if (active) {
        active = false;
        stopQuietly();
      }
      letGo();
    },
  };
}

export type SpeechCapture = ReturnType<typeof createSpeechCapture>;
