import type { TutorPlan, TutorSettings } from '../voice-tutor.types';

type Style = TutorSettings['speechStyle'];
type Personality = TutorSettings['personality'];

/**
 * First line when the tutor teaches IN English / Russian / Uzbek. The lesson
 * goal is written in Korean by the planner, so it is not pasted here — the
 * lesson agent introduces the topic in the teaching language on its first turn.
 * Speech style only changes Korean (and ты/вы, sen/siz); English has no split.
 */
const FOREIGN_GREETINGS: Record<
  'en' | 'ru' | 'uz',
  Record<Personality, Record<Style, string>>
> = {
  en: {
    friendly: {
      polite:
        '안녕하세요! Hi! Let’s practice some Korean today. To warm up, tell me how your day is going — in Korean if you can!',
      casual:
        '안녕! Hi! Let’s practice some Korean today. To warm up, tell me how your day is going — in Korean if you can!',
    },
    close_friend: {
      polite:
        'Hey, you made it! Ready for some Korean? Tell me one thing about your day — try it in Korean!',
      casual:
        'Hey, you made it! Ready for some Korean? Tell me one thing about your day — try it in Korean!',
    },
    savage: {
      polite:
        'Oh, you actually showed up. Let’s see if your Korean got any better since last time. First sentence — go.',
      casual:
        'Oh, you actually showed up. Let’s see if your Korean got any better since last time. First sentence — go.',
    },
    chaotic_savage: {
      polite:
        '야아아아! FINALLY! You showed up! Okay, Korean time. Hit me with your first sentence and TRY to impress me!',
      casual:
        '야아아아! FINALLY! You showed up! Okay, Korean time. Hit me with your first sentence and TRY to impress me!',
    },
  },
  ru: {
    friendly: {
      polite:
        'Здравствуйте! Сегодня потренируем корейский. Для начала расскажите, как проходит ваш день — по-корейски, если получится!',
      casual:
        'Привет! Сегодня потренируем корейский. Для начала расскажи, как проходит твой день — по-корейски, если получится!',
    },
    close_friend: {
      polite:
        'О, вы тут! Здравствуйте! Корейский ждёт. Скажите одну фразу про свой день — попробуйте по-корейски!',
      casual:
        'О, ты тут! Привет! Корейский ждёт. Скажи одну фразу про свой день — попробуй по-корейски!',
    },
    savage: {
      polite:
        'О, вы всё-таки здесь. Посмотрим, стал ли ваш корейский лучше. Первая фраза — прошу.',
      casual:
        'О, ты всё-таки здесь. Посмотрим, стал ли твой корейский лучше. Первая фраза — давай.',
    },
    chaotic_savage: {
      polite:
        'ЯААААА, НАКОНЕЦ-ТО! Всё, время корейского! Давайте первую фразу — и попробуйте меня удивить!',
      casual:
        'ЯААААА, НАКОНЕЦ-ТО! Всё, время корейского! Давай первую фразу — и попробуй меня удивить!',
    },
  },
  uz: {
    friendly: {
      polite:
        'Assalomu alaykum! Bugun birga koreys tilini mashq qilamiz. Boshlash uchun kuningiz qanday o‘tayotganini aytib bering — iloji bo‘lsa, koreyscha!',
      casual:
        'Salom! Bugun birga koreys tilini mashq qilamiz. Boshlash uchun kuning qanday o‘tayotganini aytib ber — iloji bo‘lsa, koreyscha!',
    },
    close_friend: {
      polite:
        'Keldingizmi! Salom! Koreyschaga tayyormisiz? Bugungi kuningiz haqida bitta gap ayting — koreyscha urinib ko‘ring!',
      casual:
        'Keldingmi! Salom! Koreyschaga tayyormisan? Bugungi kuning haqida bitta gap ayt — koreyscha urinib ko‘r!',
    },
    savage: {
      polite:
        'Oho, keldingizmi. Koreyschangiz o‘tgan safardan yaxshilanganmi, ko‘ramiz. Birinchi gap — qani.',
      casual:
        'Oho, keldingmi. Koreyschang o‘tgan safardan yaxshilanganmi, ko‘ramiz. Birinchi gap — qani.',
    },
    chaotic_savage: {
      polite:
        'Yaaaaa, NIHOYAT keldingiz! Bo‘ldi, koreys tili vaqti! Birinchi gapingizni ayting — meni hayron qoldirishga urinib ko‘ring!',
      casual:
        'Yaaaaa, NIHOYAT kelding! Bo‘ldi, koreys tili vaqti! Birinchi gapingni ayt — meni hayron qoldirishga urinib ko‘r!',
    },
  },
};

const TOPIC_LINE: Record<'en' | 'ru' | 'uz', (title: string) => string> = {
  en: (title) => `Today’s topic: ${title}.`,
  ru: (title) => `Тема сегодня: ${title}.`,
  uz: (title) => `Bugungi mavzu: ${title}.`,
};

/** Puts the topic line right after the greeting's first sentence. */
function withTopic(greeting: string, line: string): string {
  const cut = greeting.search(/[.!?](\s|$)/);
  if (cut < 0) return `${line} ${greeting}`;
  return `${greeting.slice(0, cut + 1)} ${line}${greeting.slice(cut + 1)}`;
}

export function voiceTutorGreeting(
  settings: TutorSettings,
  plan: TutorPlan,
  /** 고른 회화 주제 제목 (수업 언어). ko 수업은 plan.lessonGoal 에 이미 들어 있다 */
  topicTitle?: string,
): string {
  const language = settings.explanationLanguage;
  if (language !== 'ko') {
    const byPersonality =
      FOREIGN_GREETINGS[language][settings.personality] ??
      FOREIGN_GREETINGS[language].friendly;
    const greeting = byPersonality[settings.speechStyle] ?? byPersonality.polite;
    return topicTitle
      ? withTopic(greeting, TOPIC_LINE[language](topicTitle))
      : greeting;
  }
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
