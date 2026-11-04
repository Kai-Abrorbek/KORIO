import { stripAudioTags } from '../personality/speech-performance';
import type { TutorReaction } from '../voice-tutor.types';

/**
 * 촬영용 대본 — "촬영 대본" 성격(scripted)으로 연 수업에서만 쓴다 (super_admin 계정만 보인다).
 *
 * - 모델을 부르지 않는다. 수업을 열면 lines[0], 학습자가 한 번 말할 때마다 다음 줄을 그대로 말한다.
 *   학습자가 무슨 말을 했는지는 보지 않는다 — 찍을 때 대본 순서대로 말하면 된다.
 * - [laughs] [shouts] [gasps] 같은 대괄호 태그는 목소리가 연기하고 자막에는 안 나온다.
 * - emotion · gesture 는 튜터 캐릭터의 표정·손동작이다.
 * - 대본이 끝나면 마지막 줄을 다시 말한다. 처음부터 다시 찍으려면 수업을 새로 연다.
 * - 줄이 하나 밀리면(잡음이 말로 잡힌 경우) 수업을 끝내고 다시 연다.
 * - voiceId 에 ElevenLabs 목소리 id 를 넣으면 이 대본 수업만 그 목소리로 말한다 (비우면 설정에서 고른 목소리).
 */
export interface FilmingScriptLine {
  speech: string;
  emotion?: TutorReaction['emotion'];
  delivery?: TutorReaction['delivery'];
  intensity?: number;
  gesture?: TutorReaction['gesture'];
}

export const FILMING_SCRIPT: { voiceId?: string; lines: FilmingScriptLine[] } =
  {
    voiceId: undefined,
    lines: [
      // 수업을 열 때
      {
        speech: '안녕! 오늘은 뭐가 궁금해? Ask me anything!',
        emotion: 'happy',
      },
      // 학습자: "How do you say eighteen in Korean?"
      {
        speech: '[thinking] Hmm... eighteen? 십팔. 십-팔. Now you try!',
        emotion: 'explaining',
        gesture: 'hand_raise_1',
      },
      // 학습자: (틀리게) "씨발?"
      {
        speech:
          '[gasps] [laughs hard] 잠깐, 잠깐!!! 뭐라고 했어?! Did you just swear at me?! [shouts] 그건 욕이야!!! Eighteen is 십팔, not 씨발! 십! 팔! Again!',
        emotion: 'shocked',
        intensity: 1,
        gesture: 'both_explain_1',
      },
      // 학습자: "십팔?"
      {
        speech:
          '[sighs] 그래!!! 드디어!!! That is eighteen. [laughs] And please, never say the other one to a Korean grandma.',
        emotion: 'laughing',
        intensity: 0.8,
        gesture: 'hand_raise_2',
      },
    ],
  };

/** Line `turn` of the script (0 = opening); past the end it repeats the last line. */
export function filmingScriptReply(
  turn: number,
  language: TutorReaction['language'],
): TutorReaction {
  const { lines } = FILMING_SCRIPT;
  const line = lines[Math.max(0, Math.min(turn, lines.length - 1))];
  const speechText = line.speech.trim();
  return {
    displayText: stripAudioTags(speechText) || speechText,
    speechText,
    language,
    emotion: line.emotion ?? 'neutral',
    delivery: line.delivery ?? 'normal',
    intensity: line.intensity ?? 0.5,
    gesture: line.gesture ?? 'none',
  };
}
