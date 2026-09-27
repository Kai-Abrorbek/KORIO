import { Injectable } from '@nestjs/common';
import { buildLessonInput } from './lesson-context';
import { parseLessonReply, parsePlan, parseProgress } from './agent-output';
import type { StudentMemorySnapshot } from '../memory/voice-tutor-profile.service';
import { LESSON_AGENT_INSTRUCTIONS } from '../prompts/lesson-agent.prompt';
import { PLANNING_AGENT_INSTRUCTIONS } from '../prompts/planning-agent.prompt';
import { PROGRESS_AGENT_INSTRUCTIONS } from '../prompts/progress-agent.prompt';
import { OpenAiTutorLlmProvider } from '../providers/openai-llm.provider';
import { personalityInstructions } from '../personality/personality-instructions';
import { performTutorReaction } from '../personality/reaction-engine';
import { VoiceTutorProviderError } from '../providers/provider-error';
import { voiceTutorModels } from '../voice-tutor.config';
import type {
  TutorMessage,
  TutorPlan,
  TutorProgress,
  TutorReaction,
  TutorSettings,
} from '../voice-tutor.types';

type TextTurn = Pick<TutorMessage, 'role' | 'text'>;

@Injectable()
export class VoiceTutorAgentsService {
  constructor(private readonly llm: OpenAiTutorLlmProvider) {}

  async lesson(
    settings: TutorSettings,
    plan: TutorPlan,
    memory: StudentMemorySnapshot,
    recent: TextTurn[],
  ): Promise<TutorReaction> {
    const raw = await this.llm.completeJson(
      voiceTutorModels().lesson,
      `${LESSON_AGENT_INSTRUCTIONS}\n${personalityInstructions(settings.personality)}`,
      buildLessonInput(
        {
          settings,
          plan,
          memorySummary: memory.summary,
          strongPoints: memory.strongPoints,
          weakPoints: memory.weakPoints,
          repeatedMistakes: memory.repeatedMistakes,
          recurringMistakes: memory.recurringMistakes,
        },
        recent,
      ),
      settings.personality === 'chaotic_savage' ? 600 : 450,
    );
    const result = parseLessonReply(raw);
    if (!result) throw new VoiceTutorProviderError('INVALID_RESPONSE', 'LLM');
    return performTutorReaction(result, settings);
  }

  async analyzeProgress(
    settings: TutorSettings,
    previous: StudentMemorySnapshot,
    batch: TextTurn[],
  ): Promise<TutorProgress> {
    const raw = await this.llm.completeJson(
      voiceTutorModels().progress,
      PROGRESS_AGENT_INSTRUCTIONS,
      JSON.stringify({
        explanationLanguage: settings.explanationLanguage,
        previousLevel: previous.estimatedLevel,
        previousMistakes: previous.repeatedMistakes.slice(-8),
        transcript: batch
          .slice(-20)
          .map(({ role, text }) => ({ role, text: text.slice(0, 1500) })),
      }),
      550,
    );
    return parseProgress(raw);
  }

  async plan(
    settings: TutorSettings,
    memory: StudentMemorySnapshot,
    progress: TutorProgress | null,
    previousPlan: TutorPlan | null,
  ): Promise<TutorPlan> {
    const raw = await this.llm.completeJson(
      voiceTutorModels().planning,
      PLANNING_AGENT_INSTRUCTIONS,
      JSON.stringify({
        koreanLevel: settings.koreanLevel,
        previousPlan,
        memory: {
          summary: memory.summary.slice(-1000),
          estimatedLevel: memory.estimatedLevel,
          weakPoints: memory.weakPoints.slice(-8),
          learnedVocabulary: memory.learnedVocabulary.slice(-12),
          repeatedMistakes: memory.repeatedMistakes.slice(-8),
        },
        progress,
      }),
      450,
    );
    const plan = parsePlan(raw);
    if (!plan) throw new VoiceTutorProviderError('INVALID_RESPONSE', 'LLM');
    return plan;
  }
}

export function defaultVoiceTutorPlan(
  memory: StudentMemorySnapshot,
): TutorPlan {
  const review = memory.weakPoints.slice(-2);
  return {
    lessonGoal: review.length
      ? `${review[0]} 표현을 대화에서 자연스럽게 사용하기`
      : '일상 인사와 자기소개를 자연스럽게 말하기',
    reviewTopics: review,
    newTopics: ['일상 대화'],
    targetVocabulary: [],
    grammarFocus: [],
    conversationScenario: '가벼운 일상 대화',
    difficulty: memory.estimatedLevel || 'beginner',
  };
}
