import { HttpException, type ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { RateLimitGuard, type RateLimitOptions } from './rate-limit';
import { redis, resetRedisForTests } from './redis';

class ChatController {}
function sendMessage() {}

function guardWith(...options: RateLimitOptions[]) {
  // @RateLimit(...) 이 남기는 것과 같은 모양 (배열)
  const reflector = { get: () => options } as unknown as Reflector;
  return new RateLimitGuard(reflector);
}

function contextFor(req: Record<string, unknown>): ExecutionContext {
  return {
    getHandler: () => sendMessage,
    getClass: () => ChatController,
    switchToHttp: () => ({ getRequest: () => req }),
  } as unknown as ExecutionContext;
}

const sharedWifi = '203.0.113.7';
const victim = 'victim@korio.app';
const login = (ip: string, email: unknown) =>
  contextFor({ ip, body: { email } });

const pass = (guard: RateLimitGuard, context: ExecutionContext) =>
  expect(guard.canActivate(context)).resolves.toBe(true);
const block = (guard: RateLimitGuard, context: ExecutionContext) =>
  expect(guard.canActivate(context)).rejects.toThrow(HttpException);

/**
 * The same rules must hold whether counts live in Redis or, when Redis is not
 * configured or down, in process memory. Set TEST_REDIS_URL to also run them
 * against a real Redis (the Lua script is only exercised there).
 */
const stores: [string, string | undefined][] = [['memory', undefined]];
if (process.env.TEST_REDIS_URL)
  stores.push(['redis', process.env.TEST_REDIS_URL]);

describe.each(stores)('RateLimitGuard (%s)', (_store, redisUrl) => {
  const previous = process.env.REDIS_URL;

  beforeEach(async () => {
    await resetRedisForTests();
    if (redisUrl) {
      process.env.REDIS_URL = redisUrl;
      const client = redis()!;
      if (client.status !== 'ready')
        await new Promise((resolve) => client.once('ready', resolve));
      await client.flushdb();
    } else {
      delete process.env.REDIS_URL;
    }
  });

  afterAll(async () => {
    await resetRedisForTests();
    if (previous === undefined) delete process.env.REDIS_URL;
    else process.env.REDIS_URL = previous;
  });

  it('counts each signed-in user separately behind one IP when perUser', async () => {
    const guard = guardWith({ windowMs: 60_000, max: 2, perUser: true });
    const alice = contextFor({ ip: sharedWifi, user: { _id: 'alice' } });
    const bob = contextFor({ ip: sharedWifi, user: { _id: 'bob' } });

    await pass(guard, alice);
    await pass(guard, alice);
    await block(guard, alice);
    // Alice spending her budget does not lock out Bob on the same Wi-Fi.
    await pass(guard, bob);
  });

  it('falls back to the IP when there is no signed-in user', async () => {
    const guard = guardWith({ windowMs: 60_000, max: 1, perUser: true });
    await pass(guard, contextFor({ ip: sharedWifi }));
    await block(guard, contextFor({ ip: sharedWifi }));
  });

  it('keeps counting by IP when perUser is not set', async () => {
    const guard = guardWith({ windowMs: 60_000, max: 1 });
    await pass(guard, contextFor({ ip: sharedWifi, user: { _id: 'alice' } }));
    await block(guard, contextFor({ ip: sharedWifi, user: { _id: 'bob' } }));
  });

  it('caps one account across every IP when ignoreIp is set', async () => {
    const guard = guardWith(
      { windowMs: 60_000, max: 5, keyBody: 'email' },
      { windowMs: 60_000, max: 3, keyBody: 'email', ignoreIp: true },
    );
    // A botnet: every request from a fresh IP.
    await pass(guard, login('198.51.100.1', victim));
    await pass(guard, login('198.51.100.2', victim));
    await pass(guard, login('198.51.100.3', victim));
    await block(guard, login('198.51.100.4', victim));
    // Other accounts are untouched.
    await pass(guard, login('198.51.100.4', 'other@korio.app'));
  });

  it('counts an email the same however its spacing, case or wrapping', async () => {
    const guard = guardWith({
      windowMs: 60_000,
      max: 2,
      keyBody: 'email',
      ignoreIp: true,
    });
    // The DTO trims and lowercases these into the same account, so the limit must too.
    await pass(guard, login('198.51.100.1', ` ${victim}`));
    await pass(guard, login('198.51.100.2', 'VICTIM@korio.app\t'));
    await block(guard, login('198.51.100.3', [victim]));
  });

  it('does not charge the other limits for a request it refused', async () => {
    const guard = guardWith(
      { windowMs: 60_000, max: 1, keyBody: 'email' },
      { windowMs: 60_000, max: 2, keyBody: 'email', ignoreIp: true },
    );
    await pass(guard, login(sharedWifi, victim));
    // Refused by the per-IP limit; must not eat the account-wide budget.
    await block(guard, login(sharedWifi, victim));
    await block(guard, login(sharedWifi, victim));
    await pass(guard, login('198.51.100.9', victim));
  });

  it('shares one count between server instances', async () => {
    const options = { windowMs: 60_000, max: 2, keyBody: 'email' };
    const blue = guardWith(options);
    const green = guardWith(options);
    await pass(blue, login(sharedWifi, victim));
    await pass(green, login(sharedWifi, victim));
    // With Redis both colours see the same two attempts; in memory each
    // instance only knows its own (the reason the counts moved to Redis).
    if (redisUrl) await block(blue, login(sharedWifi, victim));
    else await pass(blue, login(sharedWifi, victim));
  });
});

describe('RateLimitGuard memory fallback', () => {
  beforeEach(async () => {
    await resetRedisForTests();
    delete process.env.REDIS_URL;
  });

  it('still limits when Redis is configured but unreachable', async () => {
    process.env.REDIS_URL = 'redis://127.0.0.1:1';
    try {
      const guard = guardWith({ windowMs: 60_000, max: 1 });
      await pass(guard, contextFor({ ip: sharedWifi }));
      await block(guard, contextFor({ ip: sharedWifi }));
    } finally {
      await resetRedisForTests();
      delete process.env.REDIS_URL;
    }
  });

  it("keeps one route's long window intact when another route sweeps", async () => {
    jest.useFakeTimers({
      now: new Date('2026-11-03T00:00:00Z'),
      doNotFake: ['nextTick', 'setImmediate'],
    });
    try {
      function verifyCode() {}
      function ping() {}
      const byHandler = new Map<unknown, RateLimitOptions[]>([
        [
          verifyCode,
          [
            {
              windowMs: 24 * 60 * 60_000,
              max: 1,
              keyBody: 'email',
              ignoreIp: true,
            },
          ],
        ],
        [ping, [{ windowMs: 60_000, max: 1, keyBody: 'email' }]],
      ]);
      const reflector = {
        get: (_key: string, handler: unknown) => byHandler.get(handler),
      } as unknown as Reflector;
      const guard = new RateLimitGuard(reflector);
      const call = (handler: () => void, email: string) =>
        ({
          getHandler: () => handler,
          getClass: () => ChatController,
          switchToHttp: () => ({
            getRequest: () => ({ ip: sharedWifi, body: { email } }),
          }),
        }) as unknown as ExecutionContext;

      await pass(guard, call(verifyCode, victim));
      // Grow the map past the sweep threshold through the short-window route.
      for (let i = 0; i < 5_000; i++)
        await guard.canActivate(call(ping, `u${i}@korio.app`));
      // An hour later the short route sweeps with its own one-minute window...
      jest.advanceTimersByTime(60 * 60_000);
      await guard.canActivate(call(ping, 'trigger@korio.app'));
      // ...which must not reset the victim's daily budget on the other route.
      await block(guard, call(verifyCode, victim));
    } finally {
      jest.useRealTimers();
    }
  });
});
