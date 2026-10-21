import type { TutorReaction } from '../voice-tutor.types';
import { stripAudioTags } from './speech-performance';

export interface SemanticLessonReply {
  text: string;
  displayText?: string;
  speechText?: string;
  language: string;
  correction: { original: string; corrected: string } | null;
  emotion?: TutorReaction['emotion'];
  delivery?: TutorReaction['delivery'];
  intensity?: number;
  gesture?: TutorReaction['gesture'];
}

/**
 * Provider-independent performance layer: validates model hints and preserves a
 * teachable reply. The size and kind of a reaction are the teacher's own call —
 * the personality prompt shapes it; no per-personality ceiling clips it here.
 */
export function performTutorReaction(
  reply: SemanticLessonReply,
): TutorReaction {
  const written = reply.displayText?.trim() || reply.text;
  // Inline audio tags are acting for the voice, never subtitle text.
  const displayText = (stripAudioTags(written) || written).slice(0, 1500);
  const speechText = (reply.speechText?.trim() || written).slice(0, 1500);
  const defaultIntensity = reply.correction ? 0.4 : 0.25;
  const intensity = Math.min(
    1,
    Math.max(0, reply.intensity ?? defaultIntensity),
  );
  const emotion =
    reply.emotion ?? (reply.correction ? 'explaining' : 'neutral');
  const delivery = reply.delivery ?? 'normal';
  const gesture =
    reply.gesture ?? (reply.correction ? 'both_explain_1' : 'none');
  return {
    displayText,
    speechText,
    language: reply.language,
    emotion,
    delivery,
    intensity,
    gesture,
    correction: reply.correction
      ? {
          wrong: reply.correction.original,
          correct: reply.correction.corrected,
        }
      : undefined,
  };
}
