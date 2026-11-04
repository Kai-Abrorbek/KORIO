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
    // 원본 voice ID는 미상. 사용 허가를 확인한 참고 영상의 튜터 구간으로 만든 ElevenLabs IVC.
    voiceId: 'XrPtD1684URZ3JtoyTor',
    lines: [
      // 참고: https://www.instagram.com/reel/Dd_4_eGp5n4/
      // 학습자(먼저 촬영): "How do you say eighteen in Korean? Um... 씨발?" (00:00–00:07)
      // 수업을 열면 첫 튜터 반응부터 나온다. 원본에 없는 인사나 설명은 넣지 않는다.
      // 튜터: 웃음 → 놀라서 되묻기 → 웃음 섞인 호통 (약 00:09–00:21)
      {
        speech:
          "[laughs hard] 뭐?! 뭐라고?! [laughs] [shouts] Are you crazy?! 나한테 욕했어?! It's 십팔, not 씨발! Don't you ever make that mistake again! 말해 봐!!!",
        emotion: 'shocked',
        delivery: 'shout',
        intensity: 1,
        gesture: 'both_explain_1',
      },
      // 학습자: "Sounds the same. 십팔?" (약 00:22–00:26)
      // 튜터: 웃음 → 안도하며 확인 → 웃음 (약 00:27–00:35)
      {
        speech: '[laughs] 그래, 드디어 맞았어... 아까 깜짝 놀랐어... [laughs]',
        emotion: 'laughing',
        delivery: 'laugh',
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
