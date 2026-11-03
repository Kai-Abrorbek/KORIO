import { Logger } from '@nestjs/common';
import Redis from 'ioredis';

/**
 * 서버끼리 나눠 써야 하는 짧은 상태(요청 한도, 일회용 로그인 코드)를 두는 곳.
 *
 * 왜 메모리가 아니라 Redis 인가:
 *   · 배포하면 메모리가 비워진다 → 공격자가 배포 직후마다 한도를 새로 받는다
 *   · blue/green 이 겹치는 동안이나 서버를 늘리면 대수만큼 한도가 늘어난다
 *
 * REDIS_URL 이 없으면 null — 부르는 쪽이 메모리로 대신한다 (로컬 개발, 첫 배포).
 *
 * ⚠️ 끊겼을 때 요청을 쌓아 두지 않는다 (enableOfflineQueue: false). 쌓아 두면
 *    Redis 가 죽은 동안 로그인 요청이 전부 매달려서 서비스 전체가 멈춘다.
 *    바로 실패시키고 부르는 쪽이 메모리로 넘어간다.
 */
let client: Redis | null | undefined;
const logger = new Logger('Redis');

export function redis(): Redis | null {
  if (client !== undefined) return client;
  const url = process.env.REDIS_URL?.trim();
  if (!url) {
    client = null;
    return client;
  }
  client = new Redis(url, {
    enableOfflineQueue: false,
    maxRetriesPerRequest: 1,
    connectTimeout: 2_000,
    // 끊기면 최대 2초 간격으로 계속 다시 붙는다
    retryStrategy: (times) => Math.min(times * 200, 2_000),
  });
  let warned = false;
  client.on('error', (error: Error) => {
    // 끊긴 동안 매 재시도마다 찍으면 로그가 그걸로 덮인다 — 끊길 때 한 번만
    if (warned) return;
    warned = true;
    logger.error(
      `Redis 연결 실패 (${error.message}) — 다시 붙을 때까지 서버 메모리로 대신한다`,
    );
  });
  client.on('ready', () => {
    if (warned) logger.log('Redis 다시 연결됨');
    warned = false;
  });
  return client;
}

/** 테스트용 — 연결을 닫고 다음 호출이 REDIS_URL 을 다시 읽게 한다 */
export async function resetRedisForTests(): Promise<void> {
  const current = client;
  client = undefined;
  if (current) await current.quit().catch(() => current.disconnect());
}
