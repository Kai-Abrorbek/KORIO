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
}

export const RateLimit = (options: RateLimitOptions) =>
  SetMetadata(RATE_LIMIT_KEY, options);

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly hits = new Map<string, number[]>();

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const options = this.reflector.get<RateLimitOptions | undefined>(
      RATE_LIMIT_KEY,
      context.getHandler(),
    );
    if (!options) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const key = this.buildKey(context, req, options);

    const now = Date.now();
    const since = now - options.windowMs;
    const recent = (this.hits.get(key) ?? []).filter((t) => t > since);

    if (recent.length >= options.max) {
      throw new HttpException(
        'TOO_MANY_REQUESTS',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    recent.push(now);
    this.hits.set(key, recent);
    this.sweep(since);
    return true;
  }

  private buildKey(
    context: ExecutionContext,
    req: Request,
    options: RateLimitOptions,
  ): string {
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';
    const handler = `${context.getClass().name}.${context.getHandler().name}`;
    if (!options.keyBody) return `${handler}:${ip}`;

    const raw = (req.body as Record<string, unknown> | undefined)?.[
      options.keyBody
    ];
    // 문자열이 아니면(주입 시도 포함) 값 자체는 키에 안 쓴다
    const extra = typeof raw === 'string' ? raw.toLowerCase().slice(0, 200) : '';
    return `${handler}:${ip}:${extra}`;
  }

  /** 오래된 항목 정리 — 맵이 무한히 커지지 않게 */
  private sweep(since: number) {
    if (this.hits.size < 5000) return;
    for (const [key, times] of this.hits) {
      const alive = times.filter((t) => t > since);
      if (alive.length) this.hits.set(key, alive);
      else this.hits.delete(key);
    }
  }
}
