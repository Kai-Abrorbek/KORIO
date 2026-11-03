import { HttpException, type ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { RateLimitGuard, type RateLimitOptions } from './rate-limit';

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

describe('RateLimitGuard', () => {
  it('counts each signed-in user separately behind one IP when perUser', () => {
    const guard = guardWith({ windowMs: 60_000, max: 2, perUser: true });
    const alice = contextFor({ ip: sharedWifi, user: { _id: 'alice' } });
    const bob = contextFor({ ip: sharedWifi, user: { _id: 'bob' } });

    expect(guard.canActivate(alice)).toBe(true);
    expect(guard.canActivate(alice)).toBe(true);
    expect(() => guard.canActivate(alice)).toThrow(HttpException);
    // Alice spending her budget does not lock out Bob on the same Wi-Fi.
    expect(guard.canActivate(bob)).toBe(true);
  });

  it('falls back to the IP when there is no signed-in user', () => {
    const guard = guardWith({ windowMs: 60_000, max: 1, perUser: true });
    expect(guard.canActivate(contextFor({ ip: sharedWifi }))).toBe(true);
    expect(() => guard.canActivate(contextFor({ ip: sharedWifi }))).toThrow(
      HttpException,
    );
  });

  it('keeps counting by IP when perUser is not set', () => {
    const guard = guardWith({ windowMs: 60_000, max: 1 });
    expect(
      guard.canActivate(contextFor({ ip: sharedWifi, user: { _id: 'alice' } })),
    ).toBe(true);
    expect(() =>
      guard.canActivate(contextFor({ ip: sharedWifi, user: { _id: 'bob' } })),
    ).toThrow(HttpException);
  });

  const victim = 'victim@korio.app';
  const login = (ip: string, email: unknown) =>
    contextFor({ ip, body: { email } });

  it('caps one account across every IP when ignoreIp is set', () => {
    const guard = guardWith(
      { windowMs: 60_000, max: 5, keyBody: 'email' },
      { windowMs: 60_000, max: 3, keyBody: 'email', ignoreIp: true },
    );
    // A botnet: every request from a fresh IP.
    expect(guard.canActivate(login('198.51.100.1', victim))).toBe(true);
    expect(guard.canActivate(login('198.51.100.2', victim))).toBe(true);
    expect(guard.canActivate(login('198.51.100.3', victim))).toBe(true);
    expect(() => guard.canActivate(login('198.51.100.4', victim))).toThrow(
      HttpException,
    );
    // Other accounts are untouched.
    expect(guard.canActivate(login('198.51.100.4', 'other@korio.app'))).toBe(
      true,
    );
  });

  it('counts an email the same however its spacing, case or wrapping', () => {
    const guard = guardWith({
      windowMs: 60_000,
      max: 2,
      keyBody: 'email',
      ignoreIp: true,
    });
    // The DTO trims and lowercases these into the same account, so the limit must too.
    expect(guard.canActivate(login('198.51.100.1', ` ${victim}`))).toBe(true);
    expect(guard.canActivate(login('198.51.100.2', 'VICTIM@korio.app\t'))).toBe(
      true,
    );
    expect(() => guard.canActivate(login('198.51.100.3', [victim]))).toThrow(
      HttpException,
    );
  });

  it('does not charge the other limits for a request it refused', () => {
    const guard = guardWith(
      { windowMs: 60_000, max: 1, keyBody: 'email' },
      { windowMs: 60_000, max: 2, keyBody: 'email', ignoreIp: true },
    );
    expect(guard.canActivate(login(sharedWifi, victim))).toBe(true);
    // Refused by the per-IP limit; must not eat the account-wide budget.
    expect(() => guard.canActivate(login(sharedWifi, victim))).toThrow(
      HttpException,
    );
    expect(() => guard.canActivate(login(sharedWifi, victim))).toThrow(
      HttpException,
    );
    expect(guard.canActivate(login('198.51.100.9', victim))).toBe(true);
  });

  it("keeps one route's long window intact when another route sweeps", () => {
    jest.useFakeTimers({ now: new Date('2026-11-03T00:00:00Z') });
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

      expect(guard.canActivate(call(verifyCode, victim))).toBe(true);
      // Grow the map past the sweep threshold through the short-window route.
      for (let i = 0; i < 5_000; i++)
        guard.canActivate(call(ping, `u${i}@korio.app`));
      // An hour later the short route sweeps with its own one-minute window...
      jest.advanceTimersByTime(60 * 60_000);
      guard.canActivate(call(ping, 'trigger@korio.app'));
      // ...which must not reset the victim's daily budget on the other route.
      expect(() => guard.canActivate(call(verifyCode, victim))).toThrow(
        HttpException,
      );
    } finally {
      jest.useRealTimers();
    }
  });
});
