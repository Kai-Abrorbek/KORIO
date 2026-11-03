import { HttpException, type ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { RateLimitGuard, type RateLimitOptions } from './rate-limit';

class ChatController {}
function sendMessage() {}

function guardWith(options: RateLimitOptions) {
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
});
