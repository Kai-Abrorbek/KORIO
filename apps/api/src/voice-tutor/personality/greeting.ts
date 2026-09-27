import type { TutorPlan, TutorSettings } from '../voice-tutor.types';

export function voiceTutorGreeting(
  settings: TutorSettings,
  plan: TutorPlan,
): string {
  const goal = plan.lessonGoal.slice(0, 120);
  if (settings.speechStyle === 'polite') {
    switch (settings.personality) {
      case 'close_friend':
        return `오셨어요! 오늘은 ${goal} 연습해 볼게요. 먼저 편하게 한마디 해 보실래요?`;
      case 'savage':
        return `오셨네요. 오늘은 ${goal} 연습이에요. 지난번보다 자연스럽게 말할 수 있는지 볼까요?`;
      case 'chaotic_savage':
        return `드디어 오셨네요! 오늘은 ${goal} 연습이에요. 자, 첫 문장부터 저를 놀라게 해 보세요!`;
      default:
        return `안녕하세요! 오늘은 ${goal} 연습해 볼게요. 먼저 편하게 한마디 해 보시겠어요?`;
    }
  }
  switch (settings.personality) {
    case 'close_friend':
      return `왔네! 오늘은 ${goal} 연습하자. 먼저 편하게 한마디 해 봐.`;
    case 'savage':
      return `왔냐? 오늘은 ${goal} 연습이다. 지난번보다 나아졌는지 첫 문장부터 보여줘.`;
    case 'chaotic_savage':
      return `야아아 드디어 왔네! 오늘은 ${goal} 연습이야. 자, 첫 문장부터 나를 놀라게 해 봐!`;
    default:
      return `안녕! 오늘은 ${goal} 연습해 보자. 먼저 편하게 한마디 해 볼래?`;
  }
}
