import type { TutorReaction, TutorSettings } from '../voice-tutor.types';

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

/** Provider-independent performance layer: validates model hints and preserves a teachable reply. */
export function performTutorReaction(
  reply: SemanticLessonReply,
  settings: TutorSettings,
): TutorReaction {
  const displayText = (reply.displayText?.trim() || reply.text).slice(0, 1500);
  const speechText = (reply.speechText?.trim() || displayText).slice(0, 1500);
  const personality = settings.personality ?? 'friendly';
  const defaultIntensity = reply.correction ? 0.4 : 0.25;
  const requested = reply.intensity ?? defaultIntensity;
  const maxIntensity =
    personality === 'friendly'
      ? 0.4
      : personality === 'close_friend'
        ? 0.65
        : 1;
  const intensity = Math.min(maxIntensity, Math.max(0, requested));
  const emotion =
    reply.emotion ?? (reply.correction ? 'explaining' : 'neutral');
  const delivery =
    personality === 'friendly' && reply.delivery === 'shout'
      ? 'normal'
      : (reply.delivery ?? 'normal');
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
