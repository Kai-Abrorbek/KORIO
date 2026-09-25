/**
 * 가입 전 음성 요청에 거는 상한.
 *
 * 온보딩 TTS 는 토큰 없이 부를 수 있는 문이라, 막아두지 않으면 남의 공짜
 * TTS 서버가 된다 (Azure 는 글자 수로 돈이 나간다). 같은 문장은 tts.service
 * 가 캐시하므로 정상적인 온보딩 한 번은 몇 십 요청이면 끝난다 — 상한은
 * 그보다 넉넉하되, 퍼가는 짓은 몇 분 만에 막히는 수준으로 잡는다.
 *
 * ⚠️ 프로세스 메모리에 산다. API 를 여러 대로 늘리면 대수만큼 상한이
 *    늘어난다 — 그때는 Redis 로 옮겨라. 지금은 한 대라 이걸로 충분하다.
 */
export class RequestQuota {
  private readonly hits = new Map<string, { count: number; resetAt: number }>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  /** 한 번 쓰고 남았으면 true. 넘었으면 false */
  hit(key: string): boolean {
    const now = Date.now();
    // 창이 지난 기록은 버린다. 맵이 무한정 커지면 그게 또 다른 누수다
    if (this.hits.size > 5000) {
      for (const [k, v] of this.hits) if (v.resetAt <= now) this.hits.delete(k);
    }

    const found = this.hits.get(key);
    if (!found || found.resetAt <= now) {
      this.hits.set(key, { count: 1, resetAt: now + this.windowMs });
      return true;
    }
    if (found.count >= this.limit) return false;
    found.count += 1;
    return true;
  }
}
