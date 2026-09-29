import { Types } from 'mongoose';
import { VoiceTutorService } from './voice-tutor.service';
import type { TutorReaction, TutorSettings } from './voice-tutor.types';

jest.mock('./memory/voice-tutor-profile.service', () => ({
  VoiceTutorProfileService: class VoiceTutorProfileService {},
}));
// 한도 서비스도 User 스키마를 불러와서 jest(isolatedModules)에서 데코레이터가 깨진다
jest.mock('./voice-tutor-quota.service', () => ({
  VoiceTutorQuotaService: class VoiceTutorQuotaService {},
}));

const userId = new Types.ObjectId().toString();
const sessionId = new Types.ObjectId().toString();
const audioId = new Types.ObjectId().toString();
const settings: TutorSettings = {
  voiceId: 'test',
  speechStyle: 'casual',
  explanationLanguage: 'en',
  koreanLevel: 'beginner',
  personality: 'chaotic_savage',
  characterId: 'female_01',
};
const plan = {
  lessonGoal: '일상 대화',
  reviewTopics: [],
  newTopics: [],
  targetVocabulary: [],
  grammarFocus: [],
  conversationScenario: '일상',
  difficulty: 'beginner',
};
const memory = {
  summary: '',
  estimatedLevel: 'beginner',
  grammarMistakes: [],
  repeatedMistakes: [],
  recurringMistakes: [],
  learnedVocabulary: [],
  weakVocabulary: [],
  strongPoints: [],
  weakPoints: [],
  notes: '',
  lessonsCompleted: 0,
};

describe('VoiceTutorService lifecycle', () => {
  const originalVoice = process.env.ELEVENLABS_DEFAULT_VOICE_ID;
  beforeEach(() => {
    process.env.ELEVENLABS_DEFAULT_VOICE_ID = 'testVoice123';
  });
  afterEach(() => {
    process.env.ELEVENLABS_DEFAULT_VOICE_ID = originalVoice;
  });

  it('starts a separate LiveKit room without synthesizing the greeting twice', async () => {
    const session = { _id: new Types.ObjectId(sessionId) };
    const sessions = {
      create: jest.fn().mockResolvedValue(session),
    };
    const messages = {
      create: jest.fn().mockImplementation((row: Record<string, unknown>) =>
        Promise.resolve({
          ...row,
          _id: new Types.ObjectId(),
          createdAt: new Date(),
        }),
      ),
    };
    const profile = {
      getSettings: jest
        .fn()
        .mockResolvedValue({ ...settings, voiceId: 'default' }),
      getMemory: jest.fn().mockResolvedValue(memory),
      latestPlan: jest.fn().mockResolvedValue(plan),
    };
    const tts = { synthesize: jest.fn() };
    const grant = {
      serverUrl: 'wss://livekit.example',
      roomName: `voice-tutor-${sessionId}`,
      participantToken: 'participant-token',
    };
    const livekit = { prepareRoom: jest.fn().mockResolvedValue(grant) };
    const quota = {
      assertCanStart: jest.fn().mockResolvedValue({ allowedSec: 1200 }),
    };
    const service = new VoiceTutorService(
      sessions as never,
      messages as never,
      profile as never,
      {} as never,
      {} as never,
      tts as never,
      {} as never,
      livekit as never,
      quota as never,
    );

    const result = await service.start(userId);
    expect(result.livekit).toEqual(grant);
    expect(result.initialMessage.audioUrl).toBeNull();
    expect(tts.synthesize).not.toHaveBeenCalled();
    expect(livekit.prepareRoom).toHaveBeenCalledWith(
      sessionId,
      'testVoice123',
      {
        displayText: result.initialMessage.displayText,
        speechText: result.initialMessage.speechText,
      },
      result.settings.explanationLanguage,
      expect.any(Array),
      1200,
    );
  });

  it('saves an agent turn once and returns the saved reply on retry without TTS', async () => {
    const session = {
      _id: new Types.ObjectId(sessionId),
      userId: new Types.ObjectId(userId),
      status: 'active',
      userTurnCount: 0,
      createdAt: new Date(),
      settings: { ...settings, voiceId: 'default' },
      plan,
    };
    const rows: Array<Record<string, unknown>> = [];
    const sessions = {
      findById: jest.fn().mockImplementation(() => ({
        then: (resolve: (value: typeof session) => unknown) =>
          Promise.resolve(session).then(resolve),
        select: () => ({
          lean: () => Promise.resolve({ endRequested: false }),
        }),
      })),
      findOneAndUpdate: jest.fn().mockResolvedValue(session),
      updateOne: jest.fn().mockResolvedValue({}),
    };
    const messages = {
      findOne: jest
        .fn()
        .mockImplementation(
          ({ role, turnId }: { role: string; turnId: string }) =>
            Promise.resolve(
              rows.find((row) => row.role === role && row.turnId === turnId) ??
                null,
            ),
        ),
      create: jest.fn().mockImplementation((row: Record<string, unknown>) => {
        const saved = {
          ...row,
          _id: new Types.ObjectId(),
          createdAt: new Date(),
        };
        rows.push(saved);
        return Promise.resolve(saved);
      }),
      find: jest.fn().mockReturnValue({
        sort: () => ({ limit: () => ({ lean: () => Promise.resolve(rows) }) }),
      }),
    };
    const profile = {
      getMemory: jest.fn().mockResolvedValue(memory),
      latestProgress: jest.fn().mockResolvedValue(null),
    };
    const reaction: TutorReaction = {
      displayText: '좋아요!',
      speechText: '좋아요!',
      language: 'ko',
      emotion: 'happy',
      delivery: 'normal',
      intensity: 0.2,
      gesture: 'none',
    };
    const agents = { lesson: jest.fn().mockResolvedValue(reaction) };
    const tts = { synthesize: jest.fn() };
    const livekit = { verifyAgentToken: jest.fn() };
    const service = new VoiceTutorService(
      sessions as never,
      messages as never,
      profile as never,
      agents as never,
      {} as never,
      tts as never,
      {} as never,
      livekit as never,
      {} as never,
    );
    const dto = { turnId: 'turn-1', transcript: '안녕하세요' };
    const first = await service.agentTurn(
      sessionId,
      'Bearer signed-token',
      dto,
    );
    const second = await service.agentTurn(
      sessionId,
      'Bearer signed-token',
      dto,
    );

    expect(first.teacherMessage.speechText).toBe('좋아요!');
    expect(second.teacherMessage.id).toBe(first.teacherMessage.id);
    expect(agents.lesson).toHaveBeenCalledTimes(1);
    expect(tts.synthesize).not.toHaveBeenCalled();
    expect(rows).toHaveLength(2);
    expect(livekit.verifyAgentToken).toHaveBeenCalledWith(
      sessionId,
      'Bearer signed-token',
    );
    await expect(
      service.agentTurn(sessionId, 'Bearer signed-token', {
        turnId: 'turn-1',
        transcript: '다른 말',
      }),
    ).rejects.toThrow('VOICE_TUTOR_TURN_ID_REUSED');
  });

  it('synthesizes replay audio only when requested and caches concurrent requests', async () => {
    const session = {
      _id: new Types.ObjectId(sessionId),
      settings: { ...settings, voiceId: 'default' },
    };
    const row = {
      _id: new Types.ObjectId(),
      role: 'teacher' as const,
      text: '안녕하세요',
      speechText: '안녕하세요',
      displayText: '안녕하세요',
      language: 'ko',
      audioId: null as Types.ObjectId | null,
      createdAt: new Date(),
    };
    const sessions = { findOne: jest.fn().mockResolvedValue(session) };
    const messages = {
      findOne: jest.fn().mockResolvedValue(row),
      updateOne: jest
        .fn()
        .mockImplementation(
          (_: unknown, update: { $set: { audioId: Types.ObjectId } }) => {
            row.audioId = update.$set.audioId;
            return Promise.resolve({});
          },
        ),
      findById: jest.fn().mockImplementation(() => Promise.resolve(row)),
    };
    const tts = {
      synthesize: jest.fn().mockResolvedValue(Buffer.from([1, 2])),
    };
    const audio = {
      store: jest.fn().mockResolvedValue(`/voice-tutor/audio/${audioId}`),
    };
    const service = new VoiceTutorService(
      sessions as never,
      messages as never,
      {} as never,
      {} as never,
      {} as never,
      tts as never,
      audio as never,
      {} as never,
      {} as never,
    );

    const [first, second] = await Promise.all([
      service.replayAudio(userId, sessionId, row._id.toString()),
      service.replayAudio(userId, sessionId, row._id.toString()),
    ]);
    expect(first.audioUrl).toBe(`/voice-tutor/audio/${audioId}`);
    expect(second.audioUrl).toBe(first.audioUrl);
    expect(tts.synthesize).toHaveBeenCalledTimes(1);
  });

  it('turn stores an independent transcript and reaction with the same voice', async () => {
    const session = {
      _id: new Types.ObjectId(sessionId),
      userTurnCount: 0,
      createdAt: new Date(),
      settings: { ...settings, voiceId: 'default' },
      plan,
    };
    const sessions = {
      findOneAndUpdate: jest.fn().mockResolvedValue(session),
      updateOne: jest.fn().mockResolvedValue({}),
      findById: jest.fn().mockReturnValue({
        select: () => ({
          lean: () => Promise.resolve({ endRequested: false }),
        }),
      }),
    };
    const messages = {
      create: jest.fn().mockImplementation((row: Record<string, unknown>) =>
        Promise.resolve({
          ...row,
          _id: new Types.ObjectId(),
          createdAt: new Date(),
        }),
      ),
      find: jest.fn().mockReturnValue({
        sort: () => ({ limit: () => ({ lean: () => Promise.resolve([]) }) }),
      }),
    };
    const profile = {
      getMemory: jest.fn().mockResolvedValue(memory),
      latestProgress: jest.fn().mockResolvedValue(null),
      recordCorrection: jest.fn().mockResolvedValue(undefined),
    };
    const reaction: TutorReaction = {
      displayText: '오이시? 한국어는 맛있어야!',
      speechText: '아니이이! 오이시? 한국어는 맛있어야!',
      language: 'ko',
      emotion: 'disbelief',
      delivery: 'shout',
      intensity: 0.9,
      gesture: 'hand_raise_3',
      correction: { wrong: '오이시', correct: '맛있어' },
    };
    const agents = { lesson: jest.fn().mockResolvedValue(reaction) };
    const stt = { transcribe: jest.fn().mockResolvedValue('おいしい?') };
    const tts = {
      synthesize: jest.fn().mockResolvedValue(Buffer.from([1, 2, 3])),
    };
    const audio = {
      store: jest.fn().mockResolvedValue(`/voice-tutor/audio/${audioId}`),
    };
    const service = new VoiceTutorService(
      sessions as never,
      messages as never,
      profile as never,
      agents as never,
      stt as never,
      tts as never,
      audio as never,
      {} as never,
      {} as never,
    );

    const result = await service.turn(
      userId,
      sessionId,
      Buffer.from([1]),
      'audio/mp4',
    );
    expect(result.userMessage.language).toBe('ja');
    expect(result.teacherMessage.displayText).toContain('맛있어');
    expect(result.teacherMessage.gesture).toBe('hand_raise_3');
    expect(tts.synthesize).toHaveBeenCalledWith(
      reaction.speechText,
      'testVoice123',
      reaction,
    );
    expect(profile.recordCorrection).toHaveBeenCalledWith(
      userId,
      '오이시',
      '맛있어',
    );
  });

  it('remembers an end request while a turn is processing', async () => {
    const prior = {
      _id: new Types.ObjectId(sessionId),
      status: 'active',
      settings,
      plan,
    };
    const sessions = {
      findOne: jest.fn().mockResolvedValue(prior),
      findOneAndUpdate: jest.fn().mockResolvedValue(null),
      updateOne: jest.fn().mockResolvedValue({}),
    };
    const profile = { latestProgress: jest.fn().mockResolvedValue(null) };
    const service = new VoiceTutorService(
      sessions as never,
      {} as never,
      profile as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
    );
    const result = await service.end(userId, sessionId);
    expect(result.status).toBe('ending');
    expect(sessions.updateOne).toHaveBeenCalledWith(
      expect.objectContaining({ _id: prior._id }),
      { $set: { endRequested: true } },
    );
  });

  it('keeps the current plan when next-lesson planning is unavailable', async () => {
    const session = {
      _id: new Types.ObjectId(sessionId),
      status: 'active',
      userTurnCount: 0,
      settings,
      plan,
    };
    const sessions = {
      findOne: jest.fn().mockResolvedValue(session),
      findOneAndUpdate: jest.fn().mockResolvedValue(session),
      updateOne: jest.fn().mockResolvedValue({}),
    };
    const profile = {
      getMemory: jest.fn().mockResolvedValue(memory),
      latestProgress: jest.fn().mockResolvedValue(null),
      savePlan: jest.fn().mockResolvedValue(undefined),
      markLessonComplete: jest.fn().mockResolvedValue(undefined),
    };
    const agents = {
      plan: jest.fn().mockRejectedValue(new Error('provider down')),
    };
    const service = new VoiceTutorService(
      sessions as never,
      {} as never,
      profile as never,
      agents as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
    );

    const result = await service.end(userId, sessionId);

    expect(result.status).toBe('ended');
    expect(result.plan).toEqual(plan);
    expect(profile.savePlan).toHaveBeenCalledWith(userId, sessionId, plan);
  });

  it('catches up missed progress in six-turn batches without skipping old turns', async () => {
    const session = {
      _id: new Types.ObjectId(sessionId),
      userTurnCount: 12,
      progressAnalyzedTurns: 0,
      settings,
    };
    const sessions = {
      findOne: jest.fn().mockResolvedValue(session),
      updateOne: jest.fn().mockResolvedValue({}),
    };
    const rows = Array.from({ length: 12 }, (_, index) => [
      { role: 'user', text: `user-${index + 1}` },
      { role: 'teacher', text: `teacher-${index + 1}` },
    ]).flat();
    const messages = {
      find: jest.fn().mockReturnValue({
        sort: () => ({ lean: () => Promise.resolve(rows) }),
      }),
    };
    const progress = {
      grammarMistakes: [],
      repeatedMistakes: [],
      learnedVocabulary: [],
      weakVocabulary: [],
      strongPoints: [],
      weakPoints: [],
      estimatedLevel: 'beginner',
      notes: '',
    };
    const profile = {
      getMemory: jest.fn().mockResolvedValue(memory),
      saveProgress: jest.fn().mockResolvedValue(undefined),
    };
    const agents = { analyzeProgress: jest.fn().mockResolvedValue(progress) };
    const service = new VoiceTutorService(
      sessions as never,
      messages as never,
      profile as never,
      agents as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
    );

    await service['runProgress'](userId, sessionId, 12);

    expect(agents.analyzeProgress).toHaveBeenCalledTimes(2);
    expect(agents.analyzeProgress).toHaveBeenNthCalledWith(
      1,
      settings,
      memory,
      expect.arrayContaining([{ role: 'user', text: 'user-1' }]),
    );
    expect(agents.analyzeProgress).toHaveBeenNthCalledWith(
      2,
      settings,
      memory,
      expect.arrayContaining([{ role: 'user', text: 'user-7' }]),
    );
    expect(profile.saveProgress).toHaveBeenNthCalledWith(
      1,
      userId,
      sessionId,
      6,
      progress,
    );
    expect(profile.saveProgress).toHaveBeenNthCalledWith(
      2,
      userId,
      sessionId,
      12,
      progress,
    );
  });
});
