import { createHmac } from 'node:crypto';
import { ForbiddenException, type ExecutionContext } from '@nestjs/common';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GrokPromoAdminGuard } from './grok-promo-admin.guard';
import {
  GrokPromoLiveKitService,
  type GrokPromoMetadata,
} from './grok-promo-livekit.service';
import { GrokPromoTutorController } from './grok-promo-tutor.controller';
import { GrokPromoTutorService } from './grok-promo-tutor.service';

const roomApi = {
  createRoom: jest.fn().mockResolvedValue({}),
  listRooms: jest.fn().mockResolvedValue([]),
  deleteRoom: jest.fn().mockResolvedValue(undefined),
};
const createDispatch = jest.fn().mockResolvedValue({});
const addGrant = jest.fn();
jest.mock('livekit-server-sdk', () => ({
  RoomServiceClient: class {
    constructor() {
      return roomApi;
    }
  },
  AgentDispatchClient: class {
    createDispatch = createDispatch;
  },
  AccessToken: class {
    addGrant = addGrant;
    toJwt() {
      return Promise.resolve('test-participant-token');
    }
  },
  TrackSource: { MICROPHONE: 2 },
}));

const sessionId = 'f51854ce-edcd-4f52-98ed-f203068067c8';
const ownerId = 'admin-owner';
const envKeys = [
  'LIVEKIT_URL',
  'LIVEKIT_API_KEY',
  'LIVEKIT_API_SECRET',
  'GROK_PROMO_TUTOR_ENABLED',
  'GROK_PROMO_LIVEKIT_AGENT_NAME',
] as const;
const savedEnv = Object.fromEntries(
  envKeys.map((key) => [key, process.env[key]]),
);

beforeEach(() => {
  jest.clearAllMocks();
  process.env.LIVEKIT_URL = 'wss://test.livekit.cloud';
  process.env.LIVEKIT_API_KEY = 'test-key';
  process.env.LIVEKIT_API_SECRET = 'test-secret';
  process.env.GROK_PROMO_TUTOR_ENABLED = 'true';
  delete process.env.GROK_PROMO_LIVEKIT_AGENT_NAME;
  roomApi.createRoom.mockResolvedValue({});
  roomApi.listRooms.mockResolvedValue([]);
  roomApi.deleteRoom.mockResolvedValue(undefined);
  createDispatch.mockResolvedValue({});
});
afterAll(() => {
  for (const key of envKeys) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
});

describe('private Grok tutor access', () => {
  it('requires both JWT authentication and the server-side super admin guard', () => {
    const guards = Reflect.getMetadata(
      GUARDS_METADATA,
      GrokPromoTutorController,
    ) as unknown[];
    expect(guards).toEqual(
      expect.arrayContaining([JwtAuthGuard, GrokPromoAdminGuard]),
    );
  });

  it.each([undefined, null, 'support', 'content_admin', 'analyst', 'admin'])(
    'rejects role %s',
    (role) => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({ user: { adminRole: role } }),
        }),
      } as unknown as ExecutionContext;
      expect(() => new GrokPromoAdminGuard().canActivate(context)).toThrow(
        ForbiddenException,
      );
    },
  );

  it('allows a super admin confirmed by the JWT strategy', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { adminRole: 'super_admin' } }),
      }),
    } as unknown as ExecutionContext;
    expect(new GrokPromoAdminGuard().canActivate(context)).toBe(true);
  });
});

describe('isolated Grok promo room lifecycle', () => {
  it('stays unavailable until explicitly enabled and never dispatches when disabled', async () => {
    delete process.env.GROK_PROMO_TUTOR_ENABLED;
    const service = new GrokPromoTutorService(new GrokPromoLiveKitService());
    expect(service.options()).toMatchObject({
      available: false,
      reason: 'NOT_CONFIGURED',
    });
    await expect(service.start(ownerId)).rejects.toThrow(
      'GROK_PROMO_NOT_CONFIGURED',
    );
    expect(createDispatch).not.toHaveBeenCalled();
  });

  it('stays unavailable without LiveKit credentials', () => {
    delete process.env.LIVEKIT_API_SECRET;
    expect(
      new GrokPromoTutorService(new GrokPromoLiveKitService()).options()
        .available,
    ).toBe(false);
  });

  it('dispatches a signed, bounded native Grok persona with no predetermined dialogue', async () => {
    const service = new GrokPromoTutorService(new GrokPromoLiveKitService());
    const result = await service.start(ownerId);
    expect(result).toMatchObject({ status: 'active', maxDurationSec: 600 });
    const [roomName, agentName, options] = createDispatch.mock.calls[0] as [
      string,
      string,
      { metadata: string },
    ];
    expect(roomName).toBe(`grok-promo-${result.sessionId}`);
    expect(agentName).toBe('korio-grok-promo');
    const data = JSON.parse(options.metadata) as GrokPromoMetadata;
    expect(data).toMatchObject({
      kind: 'admin-promo-grok',
      ownerId,
      voice: 'eve',
      maxDurationSec: 600,
    });
    expect(data).not.toHaveProperty('greeting');
    expect(data).not.toHaveProperty('lines');
    expect(data).not.toHaveProperty('voiceId');
    const expected = createHmac('sha256', 'test-secret')
      .update(
        JSON.stringify([
          data.sessionId,
          data.ownerId,
          data.voice,
          data.maxDurationSec,
          data.expiresAt,
          data.instructions,
        ]),
      )
      .digest('base64url');
    expect(data.signature).toBe(expected);
    expect(addGrant).toHaveBeenCalledWith(
      expect.objectContaining({
        room: roomName,
        roomJoin: true,
        canUpdateOwnMetadata: false,
        canPublishSources: [2],
      }),
    );
    expect(roomApi.createRoom).toHaveBeenCalledWith(
      expect.objectContaining({ maxParticipants: 2, emptyTimeout: 60 }),
    );
  });

  it('removes a created room if agent dispatch fails', async () => {
    createDispatch.mockRejectedValueOnce(new Error('network failure'));
    await expect(
      new GrokPromoLiveKitService().prepare(sessionId, ownerId, 'persona'),
    ).rejects.toThrow('GROK_PROMO_SESSION_FAILED');
    expect(roomApi.deleteRoom).toHaveBeenCalledWith(`grok-promo-${sessionId}`);
  });

  it('ends an owned room using server room metadata, without process-local state', async () => {
    roomApi.listRooms.mockResolvedValueOnce([
      {
        metadata: JSON.stringify({
          kind: 'admin-promo-grok',
          ownerId,
          sessionId,
        }),
      },
    ]);
    await expect(
      new GrokPromoTutorService(new GrokPromoLiveKitService()).end(
        sessionId,
        ownerId,
      ),
    ).resolves.toEqual({ sessionId, status: 'ended' });
    expect(roomApi.deleteRoom).toHaveBeenCalledWith(`grok-promo-${sessionId}`);
  });

  it.each([
    JSON.stringify({
      kind: 'admin-promo-grok',
      ownerId: 'someone-else',
      sessionId,
    }),
    JSON.stringify({ kind: 'voice-tutor', ownerId, sessionId }),
    JSON.stringify({
      kind: 'admin-promo-grok',
      ownerId,
      sessionId: 'another-session',
    }),
    'null',
    'malformed',
  ])('does not close foreign or unverifiable rooms', async (metadata) => {
    roomApi.listRooms.mockResolvedValueOnce([{ metadata }]);
    await expect(
      new GrokPromoLiveKitService().end(sessionId, ownerId),
    ).rejects.toThrow(ForbiddenException);
    expect(roomApi.deleteRoom).not.toHaveBeenCalled();
  });

  it('allows an already-closed session to end again', async () => {
    await expect(
      new GrokPromoLiveKitService().end(sessionId, ownerId),
    ).resolves.toBeUndefined();
    expect(roomApi.deleteRoom).not.toHaveBeenCalled();
  });

  it('rejects malformed IDs before contacting LiveKit', async () => {
    await expect(
      new GrokPromoLiveKitService().end('../voice-tutor-existing', ownerId),
    ).rejects.toThrow('GROK_PROMO_INVALID_SESSION');
    expect(roomApi.listRooms).not.toHaveBeenCalled();
  });
});
