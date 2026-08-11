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

export interface ReadingMock2QuestionInput {
  number: number;
  groupCode: string;
  type: TopikQuestionType;
  prompt: string;
  choices: [string, string, string, string];
  answer: '1' | '2' | '3' | '4';
  explanation: string;
  clue: string;
  strategy?: string;
  clueTargetKeys?: string[];
  stimulus?: TopikStimulus;
  template?: TopikVisualTemplate;
  choiceLayout?: TopikChoiceLayout;
  tags?: string[];
  difficulty?: number;
}

const answerSymbols = {
  '1': '①',
  '2': '②',
  '3': '③',
  '4': '④',
} as const;

const localized = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): TopikI18nText => ({ ko, uz, en, ru });

const choiceItems = (values: [string, string, string, string]): TopikChoice[] =>
  values.map((text, index) => ({
    key: String(index + 1),
    text,
    order: index + 1,
    imageAssetKey: '',
    imageAlt: '',
  }));

const createSolution = (
  input: ReadingMock2QuestionInput,
  choices: TopikChoice[],
): TopikSolution => {
  const symbol = answerSymbols[input.answer];
  const correctChoice = choices[Number(input.answer) - 1].text;
  const explanation = localized(
    input.explanation,
    'To‘g‘ri javob ' +
      symbol +
      '. Matndagi “' +
      input.clue +
      '” dalili “' +
      correctChoice +
      '” javobini ko‘rsatadi.',
    'The correct answer is ' +
      symbol +
      '. The clue “' +
      input.clue +
      '” supports the choice “' +
      correctChoice +
      '.”',
    'Правильный ответ — ' +
      symbol +
      '. Подсказка «' +
      input.clue +
      '» подтверждает вариант «' +
      correctChoice +
      '».',
  );
  const clue = localized(
    input.clue,
    'Asosiy dalil: ' + input.clue,
    'Key clue: ' + input.clue,
    'Ключевая подсказка: ' + input.clue,
  );
  const strategy = localized(
    input.strategy ??
      '문제가 요구하는 정보를 확인한 뒤 지문의 핵심 표현과 각 보기를 비교합니다.',
    'Avval savol nimani so‘rayotganini aniqlang, keyin matndagi asosiy ifodani javoblar bilan solishtiring.',
    'Identify what the question asks, then compare the key expression in the passage with each choice.',
    'Определите, что требуется в вопросе, затем сопоставьте ключевую фразу текста с вариантами.',
  );

  return {
    explanation,
    strategy,
    keyClues: [
      {
        key: 'clue-1',
        order: 1,
        label: localized(
          '핵심 단서',
          'Asosiy belgi',
          'Key clue',
          'Ключевая подсказка',
        ),
        explanation: clue,
        targetSegmentKeys: input.clueTargetKeys ?? [],
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
          '단서와 보기 연결',
          'Dalil va javobni bog‘lash',
          'Connect clue and choice',
          'Свяжите подсказку и вариант',
        ),
        explanation,
        targetSegmentKeys: input.clueTargetKeys ?? [],
      },
    ],
    hints: [
      {
        key: 'hint-1',
        level: 1,
        title: localized(
          '문제 유형 확인',
          'Savol turini tekshiring',
          'Check the question type',
          'Проверьте тип вопроса',
        ),
        content: strategy,
        examples: [],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-2',
        level: 2,
        title: localized(
          '핵심 단서 찾기',
          'Asosiy dalilni toping',
          'Find the key clue',
          'Найдите ключевую подсказку',
        ),
        content: clue,
        examples: [],
        targetSegmentKeys: input.clueTargetKeys ?? [],
      },
      {
        key: 'hint-3',
        level: 3,
        title: localized(
          '정답과 연결하기',
          'Javob bilan bog‘lang',
          'Connect to the answer',
          'Свяжите с ответом',
        ),
        content: explanation,
        examples: [],
        targetSegmentKeys: input.clueTargetKeys ?? [],
      },
    ],
    choiceNotes: choices.map((choice) => ({
      choiceKey: choice.key,
      note:
        choice.key === input.answer
          ? explanation
          : localized(
              '지문의 핵심 단서 또는 문법적 연결과 맞지 않는 선택지입니다.',
              'Bu variant matndagi asosiy dalil yoki grammatik bog‘lanishga mos kelmaydi.',
              'This choice does not match the key clue or grammatical connection in the passage.',
              'Этот вариант не соответствует ключевой подсказке или грамматической связи в тексте.',
            ),
    })),
  };
};

const pdfPageForQuestion = (number: number) => {
  const pageEnds = [
    4, 8, 10, 12, 14, 16, 18, 20, 22, 24, 27, 29, 31, 33, 35, 37, 38, 40, 41,
    43, 45, 47, 50,
  ];
  return pageEnds.findIndex((end) => number <= end) + 1;
};

export const readingMock2Question = (
  input: ReadingMock2QuestionInput,
): TopikSeedQuestion => {
  const choices = choiceItems(input.choices);
  const pdfPage = pdfPageForQuestion(input.number);

  return {
    code: 'topik-ii-reading-mock-2-q' + String(input.number).padStart(2, '0'),
    groupCode: input.groupCode,
    number: input.number,
    order: input.number,
    type: input.type,
    points: 2,
    prompt: textBlocks(input.prompt),
    stimulus: input.stimulus,
    choices,
    correctChoiceKey: input.answer,
    solution: createSolution(input, choices),
    presentation: presentation(
      input.template ?? TopikVisualTemplate.EXAM_PASSAGE,
      input.choiceLayout ?? TopikChoiceLayout.ONE_COLUMN,
    ),
    tags: ['topik-ii', 'reading', 'mock-2', ...(input.tags ?? [])],
    difficulty: input.difficulty ?? 3,
    source: {
      pdfPage,
      bookPage: pdfPage + 63,
      reference: '실전모의고사 제2회 읽기 (2025)',
    },
    version: 1,
    isActive: true,
  };
};
