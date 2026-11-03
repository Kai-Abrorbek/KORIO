import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as crypto from 'crypto';
import type { Request } from 'express';
import type Redis from 'ioredis';
import { redis } from './redis';

/**
 * 데코레이터 하나로 거는 요청 제한 (슬라이딩 윈도우).
 *
 * 기록은 Redis 에 둔다 (REDIS_URL). 그래야 배포해도 한도가 안 풀리고,
 * blue/green 이 겹치거나 서버를 늘려도 모든 서버가 같은 숫자를 센다.
 * REDIS_URL 이 없거나 Redis 가 잠깐 죽으면 서버 메모리로 센다 — 막는 걸
 * 멈추는 것보다 서버별로라도 막는 게 낫다.
 */
export const RATE_LIMIT_KEY = 'korio:rate-limit';

export interface RateLimitOptions {
  windowMs: number;
  max: number;
  /**
   * IP 말고 body 의 이 필드도 키에 섞는다.
   *
   * 로그인은 IP 만으로 묶으면 한 IP 뒤의 여러 사람이 서로를 막고, 계정만으로
   * 묶으면 남의 계정을 일부러 잠글 수 있다. 둘을 합쳐야 "이 IP 가 이 계정을
   * 두드리는 것"만 정확히 막힌다.
   */
  keyBody?: string;
  /**
   * 로그인한 유저 단위로 센다 (JwtAuthGuard 뒤에 둘 것 — req.user 가 있어야 한다).
   * AI·TTS 처럼 돈이 나가는 곳은 IP 로 세면 학교·회사 와이파이 하나 뒤의 여러 명이
   * 서로를 막는다. 토큰이 없는 요청은 IP 로 센다.
   */
  perUser?: boolean;
  /**
   * IP 를 빼고 keyBody 값 하나로만 센다 — "어디서 오든 이 계정은 이만큼까지".
   *
   * IP+계정 한도만 있으면 봇넷이 IP 를 돌려가며 한 계정을 무한히 두드린다
   * (6자리 코드는 100만 가지뿐이다). 대신 남이 이 계정을 일부러 잠글 수 있으니
   * 정상 사용자가 절대 안 닿을 만큼 넉넉하게 잡고, IP+계정 한도와 같이 건다.
   */
  ignoreIp?: boolean;
}

/** 한도를 여러 개 겹쳐 걸 수 있다 (예: IP+계정 10분 10회 + 계정 전체 1시간 10회). */
export const RateLimit = (...options: RateLimitOptions[]) =>
  SetMetadata(RATE_LIMIT_KEY, options);

/**
 * 여러 한도를 **한 번에** 검사하고, 전부 통과할 때만 기록한다 (원자적).
 * 막힌 요청은 어디에도 안 쌓인다 — 메모리 쪽과 같은 규칙.
 *
 * KEYS = 한도별 키, ARGV = [지금(ms), 이번 요청 id, 창1, 최대1, 창2, 최대2, …]
 */
const SLIDING_WINDOW_LUA = `
local now = tonumber(ARGV[1])
for i, key in ipairs(KEYS) do
  local window = tonumber(ARGV[1 + i * 2])
  local max = tonumber(ARGV[2 + i * 2])
  redis.call('ZREMRANGEBYSCORE', key, '-inf', now - window)
  if redis.call('ZCARD', key) >= max then return 0 end
end
for i, key in ipairs(KEYS) do
  redis.call('ZADD', key, now, ARGV[2])
  redis.call('PEXPIRE', key, tonumber(ARGV[1 + i * 2]))
end
return 1
`;

type RedisWithRateLimit = Redis & {
  korioRateLimit(
    numKeys: number,
    ...args: (string | number)[]
  ): Promise<number>;
};

@Injectable()
export class RateLimitGuard implements CanActivate {
  /** key → 그 한도의 창 길이와 창 안에 든 요청 시각들 (Redis 를 못 쓸 때만) */
  private readonly hits = new Map<
    string,
    { windowMs: number; times: number[] }
  >();

  private lastSweep = 0;

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const raw = this.reflector.get<
      RateLimitOptions | RateLimitOptions[] | undefined
    >(RATE_LIMIT_KEY, context.getHandler());
    const limits = raw ? [raw].flat() : [];
    if (!limits.length) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const checks = limits.map((options, index) => ({
      key: this.buildKey(context, req, options, index),
      options,
    }));

    const allowed =
      (await this.takeFromRedis(checks)) ?? this.takeFromMemory(checks);
    if (!allowed) {
      throw new HttpException(
        'TOO_MANY_REQUESTS',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    return true;
  }

  /** 통과면 true, 막히면 false, Redis 를 못 쓰면 null (메모리로 넘긴다) */
  private async takeFromRedis(
    checks: { key: string; options: RateLimitOptions }[],
  ): Promise<boolean | null> {
    const client = redis();
    if (!client || client.status !== 'ready') return null;
    const scripted = client as RedisWithRateLimit;
    if (typeof scripted.korioRateLimit !== 'function') {
      client.defineCommand('korioRateLimit', { lua: SLIDING_WINDOW_LUA });
    }
    try {
      const now = Date.now();
      const result = await scripted.korioRateLimit(
        checks.length,
        // 이메일이 Redis 에 그대로 남지 않게 키는 해시한다
        ...checks.map(({ key }) => `rl:${hashKey(key)}`),
        now,
        `${now}:${crypto.randomBytes(6).toString('hex')}`,
        ...checks.flatMap(({ options }) => [options.windowMs, options.max]),
      );
      return result === 1;
    } catch {
      return null;
    }
  }

  private takeFromMemory(
    checks: { key: string; options: RateLimitOptions }[],
  ): boolean {
    const now = Date.now();
    // 전부 먼저 검사하고 나서 기록한다 — 막힌 요청은 어느 한도에도 안 쌓인다.
    // 그래야 막힌 동안 두드린 것 때문에 풀릴 때가 계속 밀리지 않고, 막힌
    // 요청이 새 키를 만들어 맵을 키우지도 않는다
    const checked = checks.map(({ key, options }) => {
      const since = now - options.windowMs;
      const times = (this.hits.get(key)?.times ?? []).filter((t) => t > since);
      return { key, times, options };
    });

    if (checked.some(({ times, options }) => times.length >= options.max)) {
      return false;
    }

    for (const { key, times, options } of checked) {
      times.push(now);
      this.hits.set(key, { windowMs: options.windowMs, times });
    }
    this.sweep(now);
    return true;
  }
  private buildKey(
    context: ExecutionContext,
    req: Request,
    options: RateLimitOptions,
    index = 0,
  ): string {
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';
    const handler = `${context.getClass().name}.${context.getHandler().name}#${index}`;
    const userId = options.perUser
      ? (
          req as Request & { user?: { _id?: { toString(): string } } }
        ).user?._id?.toString()
      : undefined;
    if (userId) return `${handler}:user:${userId}`;
    if (!options.keyBody) return `${handler}:${ip}`;

    const raw = (req.body as Record<string, unknown> | undefined)?.[
      options.keyBody
    ];
    // ⚠️ DTO 의 normalizeEmail 과 **똑같이** 맞춘다 (String → trim → 소문자).
    //    가드는 파이프보다 먼저 돌아서 body 가 원문이다. 안 맞추면
    //    " kai@x.com" 이나 ["kai@x.com"] 처럼 모양만 바꿔 보내도 서비스에는
    //    같은 계정으로 닿는데 한도는 매번 새로 시작한다.
    const extra =
      raw === undefined || raw === null
        ? ''
        : String(raw as string)
            .trim()
            .toLowerCase()
            .slice(0, 200);
    if (options.ignoreIp) return `${handler}:any:${extra}`;
    return `${handler}:${ip}:${extra}`;
  }

  /**
   * 오래된 항목 정리 — 맵이 무한히 커지지 않게.
   * 키마다 **자기 창 길이로** 자른다. 지금 요청의 창(예: 1분)으로 다 자르면
   * 맵이 클 때마다 남의 1시간·하루 한도가 통째로 초기화된다.
   */
  private sweep(now: number) {
    // 크면 매 요청마다 맵 전체를 도는 꼴이 된다 — 1분에 한 번만
    if (this.hits.size < 5000 || now - this.lastSweep < 60_000) return;
    this.lastSweep = now;
    for (const [key, entry] of this.hits) {
      const since = now - entry.windowMs;
      const alive = entry.times.filter((t) => t > since);
      if (alive.length) entry.times = alive;
      else this.hits.delete(key);
    }
  }
}

function hashKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('base64url');
}
