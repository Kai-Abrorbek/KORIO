// The profile service only needs the schema class names; the real User schema
// cannot be compiled in isolation (enum-typed props).
jest.mock('../users/schemas/user.schema', () => ({ User: { name: 'User' } }));
jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual<object>('@nestjs/mongoose'),
  InjectModel: () => () => undefined,
}));

import { Types } from 'mongoose';
import { VoiceTutorProfileService } from './memory/voice-tutor-profile.service';
import {
  lessonAgentInstructions,
  LESSON_AGENT_INSTRUCTIONS,
  LESSON_AGENT_STREAM_INSTRUCTIONS,
} from './prompts/lesson-agent.prompt';
import { CHAOTIC_SAVAGE_STYLE_EN } from './prompts/chaotic-savage.prompt';
import { planningAgentInstructions } from './prompts/planning-agent.prompt';
import { progressAgentInstructions } from './prompts/progress-agent.prompt';
import { personalityInstructions } from './personality/personality-instructions';
import { voiceTutorGreeting } from './personality/greeting';
import {
  VOICE_TUTOR_TOPIC_IDS,
  VOICE_TUTOR_TOPICS_BY_LANGUAGE,
  voiceTutorTopic,
} from './topics/voice-tutor-topics';
import { planForTopic, sttKeywordsFromPlan } from './voice-tutor-turn-helpers';
import type { TutorPlan, TutorSettings } from './voice-tutor.types';

const emptyPlan: TutorPlan = {
  lessonGoal: '',
  reviewTopics: [],
  newTopics: [],
  targetVocabulary: [],
  grammarFocus: [],
  conversationScenario: '',
  difficulty: '',
};

describe('English voice tutor', () => {
  it('teaches English with the same teacher, leaving the Korean prompts as they were', () => {
    expect(lessonAgentInstructions('json', 'ko')).toBe(
      LESSON_AGENT_INSTRUCTIONS,
    );
    expect(lessonAgentInstructions('stream', 'ko')).toBe(
      LESSON_AGENT_STREAM_INSTRUCTIONS,
    );
    for (const format of ['json', 'stream'] as const) {
      const english = lessonAgentInstructions(format, 'en');
      expect(english).toContain("You are the learner's English tutor");
      expect(english).toContain('English is what you teach');
      expect(english).toContain('THE RHYTHM');
      // The Praktika reference exchange, taught as English
      expect(english).toContain('Say: "Yes, I can."');
      expect(english).toContain('englishLevel');
      expect(english).not.toContain('Keep Korean in Hangul');
      expect(english).not.toContain('편의점');
    }
    expect(LESSON_AGENT_INSTRUCTIONS).not.toContain('Yes, I can');
    expect(planningAgentInstructions('en')).toContain(
      'ONLY a English lesson planner',
    );
    expect(progressAgentInstructions('en')).toContain(
      "a English learner's voice lesson",
    );
  });

  it('gives each personality English slang and swearing, never Korean examples', () => {
    expect(personalityInstructions('chaotic_savage', 'stream', 'en')).toContain(
      CHAOTIC_SAVAGE_STYLE_EN,
    );
    expect(CHAOTIC_SAVAGE_STYLE_EN).not.toContain('맛있어요');
    expect(personalityInstructions('savage', 'json', 'en')).toContain(
      'what the fuck',
    );
    expect(personalityInstructions('friendly', 'json', 'en')).toContain(
      'No swearing',
    );
    expect(personalityInstructions('close_friend', 'stream', 'en')).toContain(
      'great at English',
    );
  });

  it('has its own topics, with situations abroad instead of life in Korea', () => {
    const english = VOICE_TUTOR_TOPICS_BY_LANGUAGE.en;
    expect(new Set(english.map((topic) => topic.id)).size).toBe(english.length);
    expect(english.some((topic) => topic.category === 'korea')).toBe(false);
    expect(english.some((topic) => topic.category === 'abroad')).toBe(true);
    for (const topic of english) {
      expect(topic.targetExpressions.length).toBeGreaterThanOrEqual(4);
      for (const text of [topic.title, topic.blurb])
        expect(Object.values(text).every(Boolean)).toBe(true);
    }
    expect(VOICE_TUTOR_TOPIC_IDS).toEqual(
      expect.arrayContaining(['airport', 'housing']),
    );
    expect(voiceTutorTopic('ko', 'airport')).toBeUndefined();
  });

  it('plans a topic lesson in English and listens for its English words', () => {
    const plan = planForTopic(emptyPlan, voiceTutorTopic('en', 'cafe')!, 'en');
    expect(plan.lessonGoal).toBe(
      'Ordering coffee — Ordering a drink and paying',
    );
    expect(plan.topic).toBe('Ordering coffee');
    expect(sttKeywordsFromPlan(plan, [], 'en')).toEqual(
      expect.arrayContaining(['For here or to go', 'Can I pay by card']),
    );
    expect(sttKeywordsFromPlan(plan, [], 'ko')).toEqual([]);
  });

  it('falls back to an English-tutor greeting in the teaching language', () => {
    const settings: TutorSettings = {
      voiceId: 'v',
      speechStyle: 'casual',
      explanationLanguage: 'uz',
      koreanLevel: 'beginner',
      personality: 'friendly',
      characterId: 'female_01',
      targetLanguage: 'en',
    };
    const uz = voiceTutorGreeting(settings, emptyPlan, 'Kafeda buyurtma');
    expect(uz).toContain('ingliz tilini');
    expect(uz).toContain('Bugungi mavzu: Kafeda buyurtma.');
    expect(
      voiceTutorGreeting({ ...settings, explanationLanguage: 'ko' }, emptyPlan),
    ).toContain('영어로');
  });
});

describe('English tutor storage', () => {
  const userId = new Types.ObjectId().toString();

  function setup(stored: {
    settings?: Record<string, unknown> | null;
    memory?: Record<string, unknown> | null;
  }) {
    const lean = (value: unknown) => ({ lean: () => Promise.resolve(value) });
    const models = {
      users: {
        findById: jest.fn(() => ({
          select: () =>
            lean({ appLanguage: 'ru', selfReportedLevel: 'intermediate' }),
        })),
      },
      settings: {
        findOne: jest.fn(() => lean(stored.settings ?? null)),
        findOneAndUpdate: jest.fn(() => Promise.resolve(null)),
      },
      memories: {
        findOne: jest.fn(() => lean(stored.memory ?? null)),
        findOneAndUpdate: jest.fn(() => Promise.resolve(null)),
      },
      plans: {
        findOne: jest.fn(() => ({ sort: () => lean(null) })),
        create: jest.fn(() => Promise.resolve(null)),
      },
      progress: { create: jest.fn(() => Promise.resolve(null)) },
    };
    const service = new VoiceTutorProfileService(
      models.users as never,
      models.settings as never,
      models.memories as never,
      models.plans as never,
      models.progress as never,
    );
    return { models, service };
  }

  it('keeps one voice and personality but a separate teaching language and level', async () => {
    const { models, service } = setup({
      settings: {
        voiceId: 'missing-voice',
        speechStyle: 'casual',
        explanationLanguage: 'uz',
        koreanLevel: 'advanced',
        personality: 'savage',
        characterId: 'male_01',
      },
    });
    const english = await service.getSettings(userId, 'en');
    expect(english).toMatchObject({
      speechStyle: 'casual',
      personality: 'savage',
      characterId: 'male_01',
      // Never stored for English yet: the app language, starting fresh.
      explanationLanguage: 'ru',
      koreanLevel: 'beginner',
      targetLanguage: 'en',
    });
    await service.updateSettings(
      userId,
      { explanationLanguage: 'ko', koreanLevel: 'intermediate' },
      'en',
    );
    const [, update] = models.settings.findOneAndUpdate.mock
      .calls[0] as unknown as [unknown, { $set: Record<string, unknown> }];
    expect(update.$set).toMatchObject({
      'courses.en.explanationLanguage': 'ko',
      'courses.en.koreanLevel': 'intermediate',
      personality: 'savage',
    });
    expect(update.$set).not.toHaveProperty('explanationLanguage');
    expect(update.$set).not.toHaveProperty('koreanLevel');
    expect(update.$set).not.toHaveProperty('targetLanguage');
  });

  it('reads and writes English memory under courses.en, leaving Korean memory alone', async () => {
    const { models, service } = setup({
      memory: {
        summary: 'Korean summary',
        learnedVocabulary: ['배고파'],
        lessonsCompleted: 7,
        courses: {
          en: { learnedVocabulary: ['receipt'], lessonsCompleted: 1 },
        },
      },
    });
    expect((await service.getMemory(userId, 'ko')).learnedVocabulary).toEqual([
      '배고파',
    ]);
    const english = await service.getMemory(userId, 'en');
    expect(english).toMatchObject({
      summary: '',
      learnedVocabulary: ['receipt'],
      lessonsCompleted: 1,
    });
    await service.recordCorrection(userId, 'I goed', 'I went', 'en');
    await service.markLessonComplete(userId, 'en');
    const [[, correction], [, done]] = models.memories.findOneAndUpdate.mock
      .calls as unknown as [unknown, Record<string, Record<string, unknown>>][];
    expect(Object.keys(correction.$set)).toEqual([
      'courses.en.recurringMistakes',
    ]);
    expect(done.$inc).toEqual({ 'courses.en.lessonsCompleted': 1 });
  });

  it('keeps plans per language, treating plans without one as Korean', async () => {
    const { models, service } = setup({});
    await service.latestPlan(userId, 'ko');
    await service.latestPlan(userId, 'en');
    await service.savePlan(userId, null, emptyPlan, 'en');
    const filters = models.plans.findOne.mock.calls.map(
      (call) => (call as unknown as [Record<string, unknown>])[0],
    );
    expect(filters[0].targetLanguage).toEqual({ $in: [null, 'ko'] });
    expect(filters[1].targetLanguage).toBe('en');
    expect(models.plans.create).toHaveBeenCalledWith(
      expect.objectContaining({ targetLanguage: 'en' }),
    );
  });
});
