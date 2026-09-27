import { Types } from 'mongoose';
import { VoiceTutorService } from './voice-tutor.service';
import type { TutorReaction, TutorSettings } from './voice-tutor.types';

jest.mock('./memory/voice-tutor-profile.service', () => ({
  VoiceTutorProfileService: class VoiceTutorProfileService {},
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
