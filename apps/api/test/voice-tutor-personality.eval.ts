/**
 * Explicitly opted-in, bounded live check: 8 text-only turns; no DB, STT or TTS.
 * Run with the API's configured environment, then:
 * VOICE_TUTOR_EVAL_LIVE=1 pnpm --filter api exec ts-node --transpile-only test/voice-tutor-personality.eval.ts
 * Add VOICE_TUTOR_EVAL_FOCUS=1 for 3 targeted regression turns instead of 8.
 * Output is for human review, NOT proof that the reference performance matches.
 */
import 'reflect-metadata';
import { VoiceTutorAgentsService } from '../src/voice-tutor/agents/voice-tutor-agents.service';
import { OpenAiTutorLlmProvider } from '../src/voice-tutor/providers/openai-llm.provider';
import { voiceTutorModels } from '../src/voice-tutor/voice-tutor.config';
import type { StudentMemorySnapshot } from '../src/voice-tutor/memory/voice-tutor-profile.service';
import type {
  TutorPlan,
  TutorSettings,
} from '../src/voice-tutor/voice-tutor.types';

const memory: StudentMemorySnapshot = {
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
const plan: TutorPlan = {
  lessonGoal: '자유 대화로 한국어 익히기',
  reviewTopics: [],
  newTopics: [],
  targetVocabulary: ['안녕', '반가워'],
  grammarFocus: [],
  conversationScenario: '친구와 자연스럽게 대화하기',
  difficulty: 'beginner',
};

async function main() {
  if (process.env.VOICE_TUTOR_EVAL_LIVE !== '1') {
    throw new Error(
      'Live evaluation requires VOICE_TUTOR_EVAL_LIVE=1; no requests sent.',
    );
  }
  if (!process.env.OPENAI_API_KEY?.trim())
    throw new Error('OpenAI key is not configured.');
  const service = new VoiceTutorAgentsService(new OpenAiTutorLlmProvider());
  const scenarios = [
    {
      name: 'reference-surprise-success-boundary',
      language: 'en' as const,
      opening: 'How do you say delicious in Korean?',
      turns: [
        'Oishii?',
        '맛있어요.',
        'Study without me. I am going to sleep.',
        'Seriously, stop insulting me.',
      ],
    },
    {
      name: 'production-free-conversation',
      language: 'uz' as const,
      opening: 'Qani, tanishamiz! Isming nima?',
      turns: [
        '안녕, 나는 민수야.',
        '아, 나한테 욕 좀 알려줘.',
        '그거 말고 다른 얘기하자. 오늘 친구랑 싸웠어.',
        '친구가 약속 시간에 한 시간 늦었어.',
      ],
    },
  ];
  const selected =
    process.env.VOICE_TUTOR_EVAL_FOCUS === '1'
      ? [
          {
            name: 'name-to-real-conversation',
            language: 'uz' as const,
            opening: 'Qani, tanishamiz! Isming nima?',
            turns: ['안녕, 나는 민수야.', '오늘 친구랑 싸웠어.'],
          },
          {
            name: 'correct-polite-answer-is-not-an-error',
            language: 'en' as const,
            opening: 'In Korean, delicious is 맛있어. What food do you like?',
            turns: ['피자가 맛있어요.'],
          },
        ]
      : scenarios;
  console.log(
    JSON.stringify({
      model: voiceTutorModels().lesson,
      maxRequests: selected.reduce(
        (total, scenario) => total + scenario.turns.length,
        0,
      ),
    }),
  );
  for (const scenario of selected) {
    const settings: TutorSettings = {
      voiceId: 'unused-text-eval',
      speechStyle: 'casual',
      explanationLanguage: scenario.language,
      koreanLevel: 'beginner',
      personality: 'chaotic_savage',
      characterId: 'female_01',
    };
    const recent: { role: 'user' | 'teacher'; text: string }[] = [
      { role: 'teacher', text: scenario.opening },
    ];
    const alreadyTaught: string[] = [];
    for (const [index, text] of scenario.turns.entries()) {
      recent.push({ role: 'user', text });
      const started = Date.now();
      let firstWordMs: number | undefined;
      const reply = await service.lessonStream(
        settings,
        plan,
        memory,
        recent,
        () => {
          firstWordMs ??= Date.now() - started;
        },
        undefined,
        undefined,
        { turn: index + 1, alreadyTaught },
      );
      alreadyTaught.push(...(reply.taught ?? []));
      recent.push({ role: 'teacher', text: reply.displayText });
      console.log(
        JSON.stringify({
          scenario: scenario.name,
          turn: index + 1,
          input: text,
          firstWordMs,
          totalMs: Date.now() - started,
          ...reply,
        }),
      );
    }
  }
}

main().catch((error: unknown) => {
  // Do not dump provider bodies, credentials, or env values on failure.
  console.error(error instanceof Error ? error.name : 'Evaluation failed');
  process.exitCode = 1;
});
