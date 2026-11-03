import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

/**
 * 데코레이터 하나로 거는 요청 제한.
 *
 * @nestjs/throttler 를 안 쓴 이유: 지금 필요한 건 로그인·가입 몇 곳뿐이고,
 * speech.service 가 이미 같은 방식(메모리 슬라이딩 윈도우)으로 Azure 호출을
 * 막고 있어서 패턴을 맞췄다.
 *
 * ⚠️ 상태가 프로세스 메모리에 있다. 서버를 여러 대로 늘리면 대당 한도가 되므로
 * 그때는 Redis 로 옮겨야 한다. 한 대로 시작하는 지금은 이걸로 충분하다.
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

@Injectable()
export class RateLimitGuard implements CanActivate {
  /** key → 그 한도의 창 길이와 창 안에 든 요청 시각들 */
  private readonly hits = new Map<
    string,
    { windowMs: number; times: number[] }
  >();

  private lastSweep = 0;

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const raw = this.reflector.get<
      RateLimitOptions | RateLimitOptions[] | undefined
    >(RATE_LIMIT_KEY, context.getHandler());
    const limits = raw ? [raw].flat() : [];
    if (!limits.length) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const now = Date.now();
    // 전부 먼저 검사하고 나서 기록한다 — 막힌 요청은 어느 한도에도 안 쌓인다.
    // 그래야 막힌 동안 두드린 것 때문에 풀릴 때가 계속 밀리지 않고, 막힌
    // 요청이 새 키를 만들어 맵을 키우지도 않는다
    const checked = limits.map((options, index) => {
      const key = this.buildKey(context, req, options, index);
      const since = now - options.windowMs;
      const times = (this.hits.get(key)?.times ?? []).filter((t) => t > since);
      return { key, times, options };
    });

    if (checked.some(({ times, options }) => times.length >= options.max)) {
      throw new HttpException(
        'TOO_MANY_REQUESTS',
        HttpStatus.TOO_MANY_REQUESTS,
      );
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
