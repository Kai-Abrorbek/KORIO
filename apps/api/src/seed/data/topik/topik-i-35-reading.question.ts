import {
  TopikChoice,
  TopikChoiceLayout,
  TopikI18nText,
  TopikQuestionType,
  TopikSolution,
  TopikStimulus,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { presentation, textBlocks } from './topik-seed.helpers';
import { TopikSeedQuestion } from './topik-seed.types';

type AnswerKey = '1' | '2' | '3' | '4';
type ChoiceTuple = [string, string, string, string];

export interface TopikI35ReadingQuestionInput {
  number: number;
  groupCode: string;
  type: TopikQuestionType;
  points: number;
  prompt: string;
  choices: ChoiceTuple;
  answer: AnswerKey;
  stimulus?: TopikStimulus;
  template?: TopikVisualTemplate;
  choiceLayout?: TopikChoiceLayout;
  explanationKo?: string;
  difficulty?: number;
}

const localized = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): TopikI18nText => ({ ko, uz, en, ru });

const sourcePageFor = (number: number) => {
  const pageEnds = [
    33, 37, 40, 42, 45, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70,
  ];
  return pageEnds.findIndex((end) => number <= end) + 11;
};

function solution(
  answer: AnswerKey,
  correctChoice: string,
  explanationKo?: string,
): TopikSolution {
  const explanation = localized(
    explanationKo ??
      `정답은 ${answer}번입니다. 지문의 핵심 정보는 ‘${correctChoice}’와 일치합니다.`,
    `To‘g‘ri javob ${answer}-variant. Matndagi asosiy ma’lumotni “${correctChoice}” bilan solishtiring.`,
    `The correct answer is choice ${answer}. Compare the key information in the text with “${correctChoice}.”`,
    `Правильный ответ — вариант ${answer}. Сравните главную информацию текста с «${correctChoice}».`,
  );
  const strategy = localized(
    '질문이 요구하는 정보와 지문의 핵심 표현을 먼저 찾은 뒤 네 선택지를 비교합니다.',
    'Avval savol talab qilgan ma’lumot va matndagi kalit iborani toping, so‘ng to‘rtta variantni solishtiring.',
    'Find the requested information and key phrase in the text, then compare all four choices.',
    'Найдите нужную информацию и ключевую фразу в тексте, затем сравните четыре варианта.',
  );
  const clueLabel = localized(
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
        targetSegmentKeys: [],
      },
    ],
    steps: [
      {
        key: 'step-1',
        order: 1,
        title: localized(
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
        title: localized(
          '정답 근거 확인',
          'Javob asosini tekshirish',
          'Check the evidence',
          'Проверьте обоснование ответа',
        ),
        explanation,
        targetSegmentKeys: [],
      },
    ],
    hints: [
      {
        key: 'hint-1',
        level: 1,
        title: localized(
          '문제 유형 보기',
          'Savol turini ko‘ring',
          'Check the question type',
          'Определите тип вопроса',
        ),
        content: strategy,
        examples: [
          localized(
            '주제, 세부 내용, 빈칸 중 무엇을 묻는지 먼저 확인하세요.',
            'Avval mavzu, tafsilot yoki bo‘sh joy so‘ralganini aniqlang.',
            'First check whether the task asks for a topic, detail, or blank.',
            'Сначала выясните, что требуется: тема, деталь или пропуск.',
          ),
        ],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-2',
        level: 2,
        title: clueLabel,
        content: localized(
          '시간, 장소, 인물, 연결 표현처럼 정답을 결정하는 말을 찾으세요.',
          'Vaqt, joy, shaxs yoki bog‘lovchi kabi javobni belgilaydigan iborani toping.',
          'Find the time, place, person, or connector that determines the answer.',
          'Найдите время, место, лицо или связку, определяющие ответ.',
        ),
        examples: [
          localized(
            `정답 선택지의 핵심: ${correctChoice}`,
            `To‘g‘ri variantdagi asosiy ifoda: ${correctChoice}`,
            `Key phrase in the correct choice: ${correctChoice}`,
            `Ключевая фраза верного варианта: ${correctChoice}`,
          ),
        ],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-3',
        level: 3,
        title: localized('정답 확인', 'Javobni tekshirish', 'Check the answer', 'Проверьте ответ'),
        content: explanation,
        examples: [
          localized(
            `정답은 ${answer}번입니다.`,
            `Javob ${answer}-variant.`,
            `The answer is choice ${answer}.`,
            `Ответ — вариант ${answer}.`,
          ),
        ],
        targetSegmentKeys: [],
      },
    ],
    choiceNotes: ['1', '2', '3', '4'].map((choiceKey) => ({
      choiceKey,
      note:
        choiceKey === answer
          ? explanation
          : localized(
              '지문의 핵심 내용과 일치하지 않습니다.',
              'Bu variant matndagi asosiy ma’lumotga mos kelmaydi.',
              'This choice does not match the key information in the text.',
              'Этот вариант не соответствует главной информации текста.',
            ),
    })),
  };
}

export function topikI35ReadingQuestion(
  input: TopikI35ReadingQuestionInput,
): TopikSeedQuestion {
  const choices: TopikChoice[] = input.choices.map((text, index) => ({
    key: String(index + 1),
    text,
    order: index + 1,
    imageAssetKey: '',
    imageAlt: '',
  }));
  const pdfPage = sourcePageFor(input.number);

  return {
    code: `topik-i-reading-35-q${String(input.number).padStart(2, '0')}`,
    groupCode: input.groupCode,
    number: input.number,
    order: input.number,
    type: input.type,
    points: input.points,
    prompt: textBlocks(input.prompt),
    stimulus: input.stimulus,
    choices,
    correctChoiceKey: input.answer,
    solution: solution(
      input.answer,
      choices[Number(input.answer) - 1].text,
      input.explanationKo,
    ),
    presentation: presentation(
      input.template ?? TopikVisualTemplate.EXAM_PASSAGE,
      input.choiceLayout ?? TopikChoiceLayout.ONE_COLUMN,
    ),
    tags: ['topik-i', 'round-35', 'reading', `question-${input.number}`],
    difficulty:
      input.difficulty ?? (input.number <= 48 ? 1 : input.number <= 62 ? 2 : 3),
    source: {
      pdfPage,
      bookPage: pdfPage - 2,
      reference: '제35회 한국어능력시험 I B형 (듣기, 읽기)',
    },
    version: 1,
    isActive: true,
  };
}
