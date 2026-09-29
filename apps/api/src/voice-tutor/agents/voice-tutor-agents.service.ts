import { Injectable } from '@nestjs/common';
import { buildLessonInput } from './lesson-context';
import { parseLessonReply, parsePlan, parseProgress } from './agent-output';
import type { StudentMemorySnapshot } from '../memory/voice-tutor-profile.service';
import {
  LESSON_AGENT_INSTRUCTIONS,
  LESSON_AGENT_STREAM_INSTRUCTIONS,
} from '../prompts/lesson-agent.prompt';
import { LessonStreamParser } from './lesson-stream';
import type { LessonPromptContext } from '../prompts/lesson-agent.prompt';
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
export type TutorReactionMeta = Pick<
  TutorReaction,
  'emotion' | 'delivery' | 'intensity' | 'gesture'
>;

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

  /**
   * Live turn. Speech is handed to `onSpeech` as the model writes it; the
   * finished reaction (for saving, memory and the character) is returned at the
   * end. Throws only if nothing was spoken — a stream that dies half-way keeps
   * what the learner already heard instead of speaking a second, fallback reply.
   */
  async lessonStream(
    settings: TutorSettings,
    plan: TutorPlan,
    memory: StudentMemorySnapshot,
    recent: TextTurn[],
    onSpeech: (delta: string) => void,
    signal?: AbortSignal,
    onMeta?: (meta: TutorReactionMeta) => void,
    lessonProgress?: LessonPromptContext['lessonProgress'],
  ): Promise<TutorReaction> {
    const parser = new LessonStreamParser();
    let metaSent = false;
    // The TTS adapter needs delivery/intensity before the first word, and the
    // character wants its emotion early. Values go through the same
    // personality clamps as the saved reaction (friendly never shouts).
    const sendMeta = () => {
      if (metaSent || !parser.headerSettled) return;
      metaSent = true;
      const hint = parseLessonReply({ ...parser.metadata, text: '-' });
      if (!hint || !onMeta) return;
      const { emotion, delivery, intensity, gesture } = performTutorReaction(
        hint,
        settings,
      );
      onMeta({ emotion, delivery, intensity, gesture });
    };
    try {
      for await (const delta of this.llm.streamText(
        voiceTutorModels().lesson,
        `${LESSON_AGENT_STREAM_INSTRUCTIONS}\n${personalityInstructions(settings.personality, 'stream')}`,
        buildLessonInput(
          {
            settings,
            plan,
            memorySummary: memory.summary,
            strongPoints: memory.strongPoints,
            weakPoints: memory.weakPoints,
            repeatedMistakes: memory.repeatedMistakes,
            recurringMistakes: memory.recurringMistakes,
            lessonProgress,
          },
          recent,
        ),
        // A chaotic rant (reference anchor A) runs ~15s of speech.
        settings.personality === 'chaotic_savage' ? 900 : 500,
        signal,
      )) {
        const speech = parser.push(delta);
        sendMeta();
        if (speech) onSpeech(speech);
      }
    } catch (error) {
      // Cancelled = nobody heard it (preemptive draft discarded). Never save it.
      if (signal?.aborted || !parser.text) throw error;
    }
    const tail = parser.finish();
    sendMeta();
    if (tail) onSpeech(tail);
    const text = parser.text;
    if (!text) throw new VoiceTutorProviderError('INVALID_RESPONSE', 'LLM');
    const result = parseLessonReply({
      ...parser.metadata,
      text,
      displayText: text,
      speechText: text,
    });
    if (!result) throw new VoiceTutorProviderError('INVALID_RESPONSE', 'LLM');
    const taught = parser.metadata.taught;
    return {
      ...performTutorReaction(result, settings),
      taught: Array.isArray(taught)
        ? taught
            .filter((item): item is string => typeof item === 'string')
            .map((item) => item.trim().slice(0, 60))
            .filter(Boolean)
            .slice(0, 6)
        : [],
    };
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
