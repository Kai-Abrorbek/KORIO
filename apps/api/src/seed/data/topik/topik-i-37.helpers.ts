import {
  TopikChoice,
  TopikI18nText,
  TopikSolution,
} from '../../../topik/schemas/topik-content.schema';

export type TopikAnswerKey = '1' | '2' | '3' | '4';
export type TopikChoiceTuple = [string, string, string, string];

export const topikI37Localized = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): TopikI18nText => ({ ko, uz, en, ru });

export function topikI37Choices(
  values: TopikChoiceTuple,
  imageAssetKeys?: TopikChoiceTuple,
): TopikChoice[] {
  return values.map((text, index) => ({
    key: String(index + 1),
    text,
    order: index + 1,
    imageAssetKey: imageAssetKeys?.[index] ?? '',
    imageAlt: imageAssetKeys ? text : '',
  }));
}

export function topikI37Solution(
  answer: TopikAnswerKey,
  correctChoice: string,
  explanationKo?: string,
): TopikSolution {
  const explanation = topikI37Localized(
    explanationKo ??
      `정답은 ${answer}번입니다. 문제의 핵심 내용은 ‘${correctChoice}’와 일치합니다.`,
    `To‘g‘ri javob ${answer}-variant. Savolning asosiy mazmuni “${correctChoice}” javobiga mos keladi.`,
    `The correct answer is choice ${answer}. The key information matches “${correctChoice}.”`,
    `Правильный ответ — вариант ${answer}. Ключевая информация соответствует ответу «${correctChoice}».`,
  );
  const strategy = topikI37Localized(
    '문제가 요구하는 정보와 지문 또는 대화의 핵심 표현을 먼저 찾고, 네 선택지를 차례로 비교합니다.',
    'Avval savol so‘ragan ma’lumot va matn yoki suhbatdagi kalit ifodani toping, so‘ng to‘rtta variantni solishtiring.',
    'First identify what the question asks and the key expression in the text or dialogue, then compare all four choices.',
    'Сначала определите, что спрашивается, и найдите ключевую фразу в тексте или диалоге, затем сравните четыре варианта.',
  );
  const clueLabel = topikI37Localized(
    '핵심 단서',
    'Asosiy belgi',
    'Key clue',
    'Ключевая подсказка',
  );

  return {
    explanation,
    strategy,
    keyClues: [
      {
        key: 'clue-1',
        order: 1,
        label: clueLabel,
        explanation,
        targetSegmentKeys: ['clue-1'],
      },
    ],
    steps: [
      {
        key: 'step-1',
        order: 1,
        title: topikI37Localized(
          '문제 요구 확인',
          'Savol talabini aniqlash',
          'Identify the task',
          'Определите задачу',
        ),
        explanation: strategy,
        targetSegmentKeys: [],
      },
      {
        key: 'step-2',
        order: 2,
        title: topikI37Localized(
          '핵심과 선택지 연결',
          'Kalitni javob bilan bog‘lash',
          'Match the clue to a choice',
          'Соотнесите подсказку с вариантом',
        ),
        explanation,
        targetSegmentKeys: ['clue-1'],
      },
    ],
    hints: [
      {
        key: 'hint-1',
        level: 1,
        title: topikI37Localized(
          '문제 유형 보기',
          'Savol turini ko‘ring',
          'Check the question type',
          'Определите тип вопроса',
        ),
        content: strategy,
        examples: [
          topikI37Localized(
            '주제, 세부 내용, 빈칸 중 무엇을 묻는지 먼저 확인하세요.',
            'Avval mavzu, tafsilot yoki bo‘sh joydan qaysi biri so‘ralganini aniqlang.',
            'First decide whether the question asks for a topic, detail, or blank.',
            'Сначала определите: спрашивается тема, деталь или пропуск.',
          ),
        ],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-2',
        level: 2,
        title: clueLabel,
        content: topikI37Localized(
          '시간, 장소, 인물, 연결 표현처럼 정답을 결정하는 단어를 찾으세요.',
          'Vaqt, joy, shaxs yoki bog‘lovchi kabi javobni belgilaydigan so‘zni toping.',
          'Find the word that decides the answer, such as a time, place, person, or connector.',
          'Найдите слово, определяющее ответ: время, место, лицо или связку.',
        ),
        examples: [
          topikI37Localized(
            `정답 선택지의 핵심: ${correctChoice}`,
            `To‘g‘ri variant kaliti: ${correctChoice}`,
            `Correct-choice focus: ${correctChoice}`,
            `Ключ правильного варианта: ${correctChoice}`,
          ),
        ],
        targetSegmentKeys: ['clue-1'],
      },
      {
        key: 'hint-3',
        level: 3,
        title: topikI37Localized(
          '정답 연결',
          'Javobni bog‘lash',
          'Connect the answer',
          'Свяжите ответ',
        ),
        content: explanation,
        examples: [
          topikI37Localized(
            `정답은 ${answer}번입니다.`,
            `Javob ${answer}-variant.`,
            `The answer is choice ${answer}.`,
            `Ответ — вариант ${answer}.`,
          ),
        ],
        targetSegmentKeys: ['clue-1'],
      },
    ],
    choiceNotes: ['1', '2', '3', '4'].map((choiceKey) => ({
      choiceKey,
      note:
        choiceKey === answer
          ? explanation
          : topikI37Localized(
              '지문 또는 대화의 핵심 정보와 일치하지 않는 선택지입니다.',
              'Bu variant matn yoki suhbatdagi asosiy ma’lumotga mos kelmaydi.',
              'This choice does not match the key information in the text or dialogue.',
              'Этот вариант не соответствует ключевой информации текста или диалога.',
            ),
    })),
  };
}
