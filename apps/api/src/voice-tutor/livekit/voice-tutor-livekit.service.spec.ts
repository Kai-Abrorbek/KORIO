import { UnauthorizedException } from '@nestjs/common';
import { VoiceTutorLiveKitService } from './voice-tutor-livekit.service';

describe('Voice Tutor agent callback token', () => {
  const originalSecret = process.env.LIVEKIT_API_SECRET;
  const sessionId = '68d000000000000000000001';
  const service = new VoiceTutorLiveKitService();

  beforeEach(() => {
    process.env.LIVEKIT_API_SECRET = 'unit-test-only-livekit-secret';
  });

  afterAll(() => {
    if (originalSecret === undefined) delete process.env.LIVEKIT_API_SECRET;
    else process.env.LIVEKIT_API_SECRET = originalSecret;
  });

  it('accepts only a signed token scoped to its session', () => {
    const token = service['mintAgentToken'](
      sessionId,
      'unit-test-only-livekit-secret',
    );
    expect(() =>
      service.verifyAgentToken(sessionId, `Bearer ${token}`),
    ).not.toThrow();
    expect(() =>
      service.verifyAgentToken('68d000000000000000000002', `Bearer ${token}`),
    ).toThrow(UnauthorizedException);
    expect(() =>
      service.verifyAgentToken(sessionId, `Bearer ${token}x`),
    ).toThrow(UnauthorizedException);
    expect(() => service.verifyAgentToken(sessionId, undefined)).toThrow(
      UnauthorizedException,
    );
  });
});
