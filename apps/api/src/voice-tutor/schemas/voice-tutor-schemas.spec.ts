import { VoiceTutorAudioSchema } from './voice-tutor-audio.schema';
import { VoiceTutorMemorySchema } from './voice-tutor-memory.schema';
import { VoiceTutorMessageSchema } from './voice-tutor-message.schema';
import { VoiceTutorPlanSchema } from './voice-tutor-plan.schema';
import { VoiceTutorProgressSchema } from './voice-tutor-progress.schema';
import { VoiceTutorSessionSchema } from './voice-tutor-session.schema';
import { VoiceTutorSettingsSchema } from './voice-tutor-settings.schema';

describe('Voice Tutor isolated MongoDB schemas', () => {
  it('constructs every schema and keeps a TTL for temporary MP3s', () => {
    expect(VoiceTutorSettingsSchema.path('personality')).toBeDefined();
    expect(VoiceTutorSettingsSchema.path('characterId')).toBeDefined();
    expect(VoiceTutorSessionSchema.path('endRequested')).toBeDefined();
    expect(VoiceTutorMessageSchema.path('gesture')).toBeDefined();
    expect(VoiceTutorMessageSchema.path('turnId')).toBeDefined();
    expect(VoiceTutorMessageSchema.indexes()).toEqual(
      expect.arrayContaining([
        [
          { sessionId: 1, turnId: 1, role: 1 },
          {
            unique: true,
            partialFilterExpression: { turnId: { $type: 'string' } },
          },
        ],
      ]),
    );
    expect(VoiceTutorMemorySchema.path('recurringMistakes')).toBeDefined();
    expect(VoiceTutorPlanSchema.path('plan')).toBeDefined();
    expect(VoiceTutorProgressSchema.path('progress')).toBeDefined();
    expect(VoiceTutorAudioSchema.indexes()).toEqual(
      expect.arrayContaining([[{ expiresAt: 1 }, { expireAfterSeconds: 0 }]]),
    );
  });
});
