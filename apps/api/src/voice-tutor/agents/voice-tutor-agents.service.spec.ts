import type { StudentMemorySnapshot } from '../memory/voice-tutor-profile.service';
import type { OpenAiTutorLlmProvider } from '../providers/openai-llm.provider';
import type {
  TutorMessage,
  TutorPlan,
  TutorSettings,
} from '../voice-tutor.types';
import { VoiceTutorAgentsService } from './voice-tutor-agents.service';

const settings: TutorSettings = {
  voiceId: 'test-voice',
  speechStyle: 'polite',
  explanationLanguage: 'en',
  koreanLevel: 'beginner',
  personality: 'friendly',
  characterId: 'female_01',
};
const plan: TutorPlan = {
  lessonGoal: '카페에서 원하는 음료 주문하기',
  reviewTopics: ['~주세요'],
  newTopics: ['카페'],
  targetVocabulary: ['포장해 주세요'],
  grammarFocus: ['~로 할게요'],
  conversationScenario: 'Ordering at a cafe',
  difficulty: 'intermediate',
  curriculum: ['Legacy stage: repeat every seed expression four times'],
};
const memory: StudentMemorySnapshot = {
  summary: '음료 이름을 알고 포장 주문을 연습하고 싶어 함',
  estimatedLevel: 'intermediate',
  grammarMistakes: [],
  repeatedMistakes: ['조사 누락'],
  recurringMistakes: [
    { wrong: '커피 주세요요', correct: '커피 주세요', count: 2 },
  ],
  learnedVocabulary: ['맛있어요', '아메리카노'],
  weakVocabulary: [],
  strongPoints: ['음료 이름'],
  weakPoints: ['주문 문장'],
  notes: '',
  lessonsCompleted: 2,
};
const recent: Pick<TutorMessage, 'role' | 'text'>[] = [
  { role: 'teacher', text: '포장할까요, 여기서 마실까요?' },
  { role: 'user', text: '집에서 마실 거예요.' },
];
const lessonProgress = { turn: 12, alreadyTaught: ['한 잔 주세요'] };

async function* modelStream(
  chunks: string[],
  error?: Error,
): AsyncGenerator<string> {
  for (const chunk of chunks) yield await Promise.resolve(chunk);
  if (error) throw error;
}

function setup() {
  const llm: jest.Mocked<
    Pick<OpenAiTutorLlmProvider, 'completeJson' | 'streamText'>
  > = {
    completeJson: jest.fn(),
    streamText: jest.fn(),
  };
  return { llm, service: new VoiceTutorAgentsService(llm) };
}

describe('VoiceTutorAgentsService lesson paths', () => {
  it('passes the same student context and normalizes taught items in JSON and streaming replies', async () => {
    const { llm, service } = setup();
    const metadata = {
      language: 'ko',
      emotion: 'happy',
      delivery: 'normal',
      intensity: 0.3,
      gesture: 'none',
      correction: null,
      taught: [
        '  포장해 주세요  ',
        '포장해 주세요',
        '',
        7,
        null,
        '가'.repeat(61),
        `${'가'.repeat(60)}나`,
        '계산할게요',
        '따뜻한',
        '차가운',
        '한 잔',
        '제외할 항목',
      ],
    };
    llm.completeJson.mockResolvedValue({ ...metadata, text: '포장해 주세요.' });
    llm.streamText.mockReturnValue(
      modelStream([`@meta ${JSON.stringify(metadata)}\n`, '포장해 주세요.']),
    );

    const jsonReply = await service.lesson(
      settings,
      plan,
      memory,
      recent,
      lessonProgress,
    );
    const streamedReply = await service.lessonStream(
      settings,
      plan,
      memory,
      recent,
      jest.fn(),
      undefined,
      undefined,
      lessonProgress,
    );

    const jsonInput = JSON.parse(llm.completeJson.mock.calls[0][2]) as Record<
      string,
      unknown
    >;
    const streamedInput = JSON.parse(llm.streamText.mock.calls[0][2]) as Record<
      string,
      unknown
    >;
    expect(streamedInput).toEqual(jsonInput);
    expect(jsonInput.student).not.toHaveProperty('curriculum');
    expect(jsonInput).toMatchObject({
      student: {
        lessonProgress,
        koreanLevel: 'beginner',
        estimatedLevel: 'intermediate',
        learnedVocabulary: memory.learnedVocabulary,
        difficulty: 'intermediate',
        grammarFocus: plan.grammarFocus,
      },
      recent,
      recentTeacherOpenings: [recent[0].text],
    });
    expect(jsonReply.taught).toEqual([
      '포장해 주세요',
      '가'.repeat(60),
      '계산할게요',
      '따뜻한',
      '차가운',
      '한 잔',
    ]);
    expect(streamedReply.taught).toEqual(jsonReply.taught);
  });

  it('uses the short opening deadline with an empty learner history', async () => {
    const { llm, service } = setup();
    llm.completeJson.mockResolvedValue({
      text: 'What would you like to drink?',
    });

    await service.lesson(settings, plan, memory, [], {
      turn: 0,
      alreadyTaught: [],
    });

    expect(llm.completeJson.mock.calls[0][4]).toBe(8_000);
    const input = JSON.parse(llm.completeJson.mock.calls[0][2]) as Record<
      string,
      unknown
    >;
    expect(input).toMatchObject({
      student: { lessonProgress: { turn: 0, alreadyTaught: [] } },
      recent: [],
      recentTeacherOpenings: [],
    });
  });

  it('leaves the normal JSON turn deadline with the provider', async () => {
    const { llm, service } = setup();
    llm.completeJson.mockResolvedValue({ text: '포장해 주세요.' });

    await service.lesson(settings, plan, memory, recent, lessonProgress);
    await service.lesson(settings, plan, memory, recent);

    expect(llm.completeJson.mock.calls).toHaveLength(2);
    expect(llm.completeJson.mock.calls[0][4]).toBeUndefined();
    expect(llm.completeJson.mock.calls[1][4]).toBeUndefined();
  });

  it('emits clamped metadata once before the first speech and preserves spoken text', async () => {
    const { llm, service } = setup();
    const controller = new AbortController();
    const events: string[] = [];
    const onMeta = jest.fn(() => events.push('meta'));
    const onSpeech = jest.fn((text: string) => events.push(text));
    llm.streamText.mockReturnValue(
      modelStream([
        '@me',
        'ta {"emotion":"excited","delivery":"shout","intensity":0.95,"gesture":"both_explain_1","language":"ko"}',
        '\n맛있어요! ',
        '다시 골라 볼까요?',
      ]),
    );

    const result = await service.lessonStream(
      settings,
      plan,
      memory,
      recent,
      onSpeech,
      controller.signal,
      onMeta,
      lessonProgress,
    );

    const expectedMeta = {
      emotion: 'excited',
      delivery: 'normal',
      intensity: 0.4,
      gesture: 'both_explain_1',
    };
    expect(onMeta).toHaveBeenCalledTimes(1);
    expect(onMeta).toHaveBeenCalledWith(expectedMeta);
    expect(events).toEqual(['meta', '맛있어요! ', '다시 골라 볼까요?']);
    expect(result).toMatchObject({
      ...expectedMeta,
      displayText: '맛있어요! 다시 골라 볼까요?',
      speechText: '맛있어요! 다시 골라 볼까요?',
      taught: [],
    });
    expect(llm.streamText.mock.calls[0][4]).toBe(controller.signal);
  });

  it('propagates a provider error before any speech even if a header arrived', async () => {
    const { llm, service } = setup();
    const error = new Error('stream failed before speech');
    const onSpeech = jest.fn();
    llm.streamText.mockReturnValue(
      modelStream(['@meta {"language":"ko"}\n'], error),
    );

    await expect(
      service.lessonStream(settings, plan, memory, recent, onSpeech),
    ).rejects.toBe(error);
    expect(onSpeech).not.toHaveBeenCalled();
  });

  it('retains already spoken words when an uncancelled stream fails partway through', async () => {
    const { llm, service } = setup();
    const error = new Error('stream interrupted');
    const onSpeech = jest.fn();
    llm.streamText.mockReturnValue(
      modelStream(
        ['@meta {"language":"ko","taught":["포장"]}\n', '포장은'],
        error,
      ),
    );

    const result = await service.lessonStream(
      settings,
      plan,
      memory,
      recent,
      onSpeech,
    );

    expect(onSpeech).toHaveBeenCalledTimes(1);
    expect(onSpeech).toHaveBeenCalledWith('포장은');
    expect(result).toMatchObject({
      displayText: '포장은',
      speechText: '포장은',
      taught: ['포장'],
    });
  });

  it('rejects a cancelled draft instead of returning a partial reaction', async () => {
    const { llm, service } = setup();
    const controller = new AbortController();
    const error = new Error('draft aborted');
    const onSpeech = jest.fn(() => controller.abort());
    llm.streamText.mockReturnValue(
      modelStream(['@meta {"language":"ko"}\n', '포장은'], error),
    );

    await expect(
      service.lessonStream(
        settings,
        plan,
        memory,
        recent,
        onSpeech,
        controller.signal,
      ),
    ).rejects.toBe(error);
    expect(onSpeech).toHaveBeenCalledWith('포장은');
    expect(controller.signal.aborted).toBe(true);
    expect(llm.streamText.mock.calls[0][4]).toBe(controller.signal);
  });
});
