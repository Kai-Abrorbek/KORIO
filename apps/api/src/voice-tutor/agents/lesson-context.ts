import { VOICE_TUTOR_RECENT_MESSAGES } from '../voice-tutor.config';
import type { TutorMessage } from '../voice-tutor.types';
import {
  buildLessonContext,
  type LessonPromptContext,
} from '../prompts/lesson-agent.prompt';

/** Sends a short conversation window plus compact memory, never the whole lesson. */
export function buildLessonInput(
  context: LessonPromptContext,
  recentMessages: Pick<TutorMessage, 'role' | 'text'>[],
): string {
  const recent = recentMessages
    .slice(-VOICE_TUTOR_RECENT_MESSAGES)
    .map(({ role, text }) => ({ role, text: text.slice(0, 1500) }));
  return JSON.stringify({
    student: JSON.parse(buildLessonContext(context)) as Record<string, unknown>,
    recent,
  });
}
