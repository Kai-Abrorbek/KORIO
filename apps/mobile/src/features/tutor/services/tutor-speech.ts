import { createAudioPlayer, type AudioPlayer } from "expo-audio";
import { TutorApi } from "./tutor.api";

/**
 * 선생님 목소리 재생 큐.
 *
 * Realtime 이 텍스트만 만들고, 여기가 그걸 소리로 바꿔 순서대로 튼다.
 *
 * 지켜야 할 것 세 가지:
 *  1) **순서.** 2번 문장 오디오가 1번보다 먼저 도착해도 1번부터 튼다.
 *  2) **취소.** 유저가 끼어들면 만들던 것·틀던 것·줄 서 있는 것 전부 버린다.
 *     하나라도 살아남으면 유저 말 위로 선생님 목소리가 겹친다.
 *  3) **늦게 온 것 무시.** 취소 뒤에 도착한 응답이 다음 대화에 끼어들지
 *     않도록, 세대 번호가 다른 건 버린다.
 */

export interface TutorSpeechCallbacks {
  /** 실제로 소리가 나기 시작했을 때. 화면 상태를 speaking 으로 바꾼다 */
  onPlaybackStart?: (text: string) => void;
  /** 큐가 비고 재생도 끝났을 때 */
  onIdle?: () => void;
  /** 합성이 실패했을 때. 대화는 자막으로 계속한다 */
  onError?: (code: string) => void;
  /** 개발용 지연 측정 */
  onTiming?: (t: { requestedAt: number; audioAt: number; playedAt: number }) => void;
}

interface QueueItem {
  generation: number;
  text: string;
  requestedAt: number;
  /** 합성 결과. 도착 순서가 뒤바뀌어도 순서대로 기다렸다 튼다 */
  promise: Promise<{ uri: string; audioAt: number } | null>;
}

export class TutorSpeechQueue {
  private generation = 0;
  private queue: QueueItem[] = [];
  private draining = false;
  private player: AudioPlayer | null = null;
  private teacherId?: string;
  private sessionId?: string;
  private aborts = new Set<AbortController>();

  constructor(private readonly cb: TutorSpeechCallbacks = {}) {}

  configure(opts: { teacherId?: string; sessionId?: string }) {
    this.teacherId = opts.teacherId;
    this.sessionId = opts.sessionId;
  }

  /** 지금 세대. 늦게 온 응답을 거를 때 쓴다 */
  get currentGeneration() {
    return this.generation;
  }

  /**
   * 문장 하나를 큐에 넣는다.
   *
   * 합성은 **바로** 시작한다 (앞 문장이 재생 중이어도). 그래야 1번을 듣는
   * 동안 2번이 준비돼서 사이가 안 벌어진다. 재생 순서만 큐가 지킨다.
   */
  enqueue(text: string) {
    const clean = text.trim();
    if (!clean) return;
    const generation = this.generation;
    const requestedAt = Date.now();

    const promise = this.synth(clean, generation)
      .then((uri) => (uri ? { uri, audioAt: Date.now() } : null))
      .catch(() => null);

    this.queue.push({ generation, text: clean, requestedAt, promise });
    void this.drain();
  }

  /**
   * 지금까지의 모든 것을 버린다 — 유저가 끼어들었을 때.
   *
   * 세 가지를 **다** 멈춰야 한다. 하나라도 남으면 유저가 말하는 동안
   * 선생님 목소리가 겹쳐 나오고, 그 소리를 마이크가 다시 주워서 대화가
   * 엉킨다.
   */
  cancelAll() {
    this.generation++; // 이 뒤에 도착하는 건 전부 옛 세대
    this.queue = [];
    for (const ac of this.aborts) {
      try {
        ac.abort();
      } catch {}
    }
    this.aborts.clear();
    this.stopPlayer();
  }

  /** 화면을 떠날 때 */
  dispose() {
    this.cancelAll();
    try {
      this.player?.remove();
    } catch {}
    this.player = null;
  }

  private stopPlayer() {
    const p = this.player;
    if (!p) return;
    try {
      p.pause();
      p.seekTo(0);
    } catch {}
  }

  private async synth(text: string, generation: number): Promise<string | null> {
    const ac = new AbortController();
    this.aborts.add(ac);
    try {
      const res = await TutorApi.tts({
        text,
        teacherId: this.teacherId,
        sessionId: this.sessionId,
      });
      // 요청이 도는 사이에 유저가 끼어들었으면 버린다
      if (generation !== this.generation) return null;
      return TutorApi.ttsAudioUrl(res.audioId);
    } catch (e: any) {
      if (generation === this.generation) {
        this.cb.onError?.(e?.message ?? "TTS_FAILED");
      }
      return null;
    } finally {
      this.aborts.delete(ac);
    }
  }

  /** 큐를 앞에서부터 하나씩. 동시에 두 번 돌지 않게 플래그로 막는다 */
  private async drain() {
    if (this.draining) return;
    this.draining = true;
    try {
      while (this.queue.length) {
        const item = this.queue[0];
        // 취소된 세대는 재생하지 않고 버린다
        if (item.generation !== this.generation) {
          this.queue.shift();
          continue;
        }
        const got = await item.promise;
        // 기다리는 동안 취소됐을 수도 있다 — 다시 확인한다
        if (item.generation !== this.generation) {
          this.queue.shift();
          continue;
        }
        this.queue.shift();
        if (!got) continue;

        await this.play(got.uri, item);
      }
      if (this.queue.length === 0) this.cb.onIdle?.();
    } finally {
      this.draining = false;
    }
  }

  private play(uri: string, item: QueueItem): Promise<void> {
    return new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        sub?.remove();
        resolve();
      };

      let sub: { remove: () => void } | undefined;
      try {
        // 플레이어를 매번 새로 만들지 않고 소스만 갈아끼운다.
        // 문장마다 새로 만들면 안드로이드에서 첫 소리가 눈에 띄게 늦다
        if (!this.player) this.player = createAudioPlayer({ uri });
        else this.player.replace({ uri });

        const p = this.player;
        sub = p.addListener("playbackStatusUpdate", (st: any) => {
          if (item.generation !== this.generation) {
            this.stopPlayer();
            finish();
            return;
          }
          if (st?.didJustFinish) finish();
        });

        p.play();
        const playedAt = Date.now();
        this.cb.onPlaybackStart?.(item.text);
        void item.promise.then((got) => {
          if (got) {
            this.cb.onTiming?.({
              requestedAt: item.requestedAt,
              audioAt: got.audioAt,
              playedAt,
            });
          }
        });

        // 상태 콜백이 안 오는 경우가 있어서 안전망을 둔다.
        // 여기가 없으면 큐가 그 자리에서 영원히 멈춘다
        setTimeout(finish, 20000);
      } catch {
        finish();
      }
    });
  }
}
