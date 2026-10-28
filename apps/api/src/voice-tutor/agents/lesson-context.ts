import {
  VOICE_TUTOR_RECENT_MESSAGES,
  tutorTargetLanguage,
  type TutorTargetLanguage,
} from '../voice-tutor.config';
import type { TutorMessage } from '../voice-tutor.types';
import {
  buildLessonContext,
  type LessonPromptContext,
} from '../prompts/lesson-agent.prompt';

/** "말해 봐" is the request, not the line being requested. */
const KOREAN_CUE = /^(다시\s*)?(따라\s*)?(말해|해)\s*봐$/;

/**
 * The last phrase in the language being learned — usually what the turn asks
 * the learner to say. Korean: the last run of Hangul ("네, 매워요" is one
 * run); English: the last
 * double- or curly-quoted phrase.
 */
export function lastTargetPhrase(
  text: string,
  learn: TutorTargetLanguage,
): string {
  const found =
    learn === 'ko'
      ? (text.match(/[가-힣][가-힣\s,~]*[가-힣]|[가-힣]/g) ?? []).filter(
          (run) => !KOREAN_CUE.test(run),
        )
      : [...text.matchAll(/["“‘]([^"”’]{2,})["”’]/g)].map(([, inner]) => inner);
  return found.at(-1)?.trim() ?? '';
}

/**
 * The line the teacher asked for in both of its last two turns. "One retry,
 * then move on" was in the prompt, yet the model asked for "네, 매워요" four
 * turns running: it cannot count its own asks, so the server counts for it.
 */
export function repeatedAsk(
  recent: Pick<TutorMessage, 'role' | 'text'>[],
  learn: TutorTargetLanguage,
): string | undefined {
  const asks = recent
    .filter(({ role }) => role === 'teacher')
    .slice(-2)
    .map(({ text }) => lastTargetPhrase(text, learn));
  if (asks.length < 2) return undefined;
  const [before, last] = asks.map((ask) => ask.replace(/\s+/g, ''));
  return before && before === last ? asks[1] : undefined;
}

/** Sends a short conversation window plus compact memory, never the whole lesson. */
export function buildLessonInput(
  context: LessonPromptContext,
  recentMessages: Pick<TutorMessage, 'role' | 'text'>[],
): string {
  const recent = recentMessages
    .slice(-VOICE_TUTOR_RECENT_MESSAGES)
    .map(({ role, text }) => ({ role, text: text.slice(0, 1500) }));
  const stuck = repeatedAsk(
    recent,
    tutorTargetLanguage(context.settings.targetLanguage),
  );
  return JSON.stringify({
    student: JSON.parse(buildLessonContext(context)) as Record<string, unknown>,
    recent,
    ...(stuck ? { repeatedAsk: stuck } : {}),
    // Highlight actual recent openings without prescribing a replacement bank.
    recentTeacherOpenings: recent
      .filter(({ role }) => role === 'teacher')
      .slice(-4)
      .map(({ text }) => text.slice(0, 100)),
  });
}
