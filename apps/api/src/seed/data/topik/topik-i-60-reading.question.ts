import {
  TopikChoiceLayout,
  TopikQuestionType,
  TopikStimulus,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { presentation, textBlocks } from './topik-seed.helpers';
import { TopikSeedQuestion } from './topik-seed.types';
import {
  TopikAnswerKey,
  TopikChoiceTuple,
  topikI37Choices,
  topikI37Solution,
} from './topik-i-37.helpers';

interface TopikI60ReadingQuestionInput {
  number: number;
  groupCode: string;
  type: TopikQuestionType;
  points: number;
  prompt: string;
  choices: TopikChoiceTuple;
  answer: TopikAnswerKey;
  stimulus?: TopikStimulus;
  template?: TopikVisualTemplate;
  choiceLayout?: TopikChoiceLayout;
  explanationKo?: string;
}

function sourcePageFor(number: number) {
  const pageEnds = [
    33, 37, 40, 42, 45, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70,
  ];
  return pageEnds.findIndex((end) => number <= end) + 13;
}

export function topikI60ReadingQuestion(
  input: TopikI60ReadingQuestionInput,
): TopikSeedQuestion {
  const choices = topikI37Choices(input.choices);
  const pdfPage = sourcePageFor(input.number);

  return {
    code: `topik-i-reading-60-q${String(input.number).padStart(2, '0')}`,
    groupCode: input.groupCode,
    number: input.number,
    order: input.number,
    type: input.type,
    points: input.points,
    prompt: textBlocks(input.prompt),
    stimulus: input.stimulus,
    choices,
    correctChoiceKey: input.answer,
    solution: topikI37Solution(
      input.answer,
      choices[Number(input.answer) - 1].text,
      input.explanationKo,
    ),
    presentation: presentation(
      input.template ?? TopikVisualTemplate.EXAM_PASSAGE,
      input.choiceLayout ?? TopikChoiceLayout.ONE_COLUMN,
    ),
    tags: ['topik-i', 'round-60', 'reading'],
    difficulty: input.number <= 48 ? 1 : input.number <= 62 ? 2 : 3,
    source: {
      pdfPage,
      bookPage: pdfPage - 4,
      reference: '제60회 한국어능력시험 I B-홀수형 (듣기, 읽기)',
    },
    version: 1,
    isActive: true,
  };
}
