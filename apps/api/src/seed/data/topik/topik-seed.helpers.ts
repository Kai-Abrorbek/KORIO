import {
  TopikChoice,
  TopikChoiceLayout,
  TopikI18nText,
  TopikPresentation,
  TopikQuestionType,
  TopikSolution,
  TopikStimulus,
  TopikStimulusKind,
  TopikTextBlock,
  TopikTextBlockType,
  TopikTextSegment,
  TopikTextSegmentType,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { TopikSeedQuestion } from './topik-seed.types';

interface QuestionInput {
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

const TOKEN_PATTERN =
  /\[\[(blank|underline|emphasis|marker):([^|\]]+)(?:\|([^\]]*))?\]\]/g;

export function i18n(ko: string): TopikI18nText {
  return { ko, uz: '', en: '', ru: '' };
}

export function textBlock(text: string): TopikTextBlock {
  const segments: TopikTextSegment[] = [];
  let cursor = 0;

  for (const match of text.matchAll(TOKEN_PATTERN)) {
    if (match.index > cursor) {
      segments.push({
        type: TopikTextSegmentType.TEXT,
        text: text.slice(cursor, match.index),
        key: '',
        label: '',
      });
    }

    const type = {
      blank: TopikTextSegmentType.BLANK,
      underline: TopikTextSegmentType.UNDERLINE,
      emphasis: TopikTextSegmentType.EMPHASIS,
      marker: TopikTextSegmentType.INSERTION_MARKER,
    }[match[1]]!;
    segments.push({
      type,
      key: match[2],
      text: match[3] ?? '',
      label: match[3] ?? '',
    });
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    segments.push({
      type: TopikTextSegmentType.TEXT,
      text: text.slice(cursor),
      key: '',
      label: '',
    });
  }

  return {
    type: TopikTextBlockType.PARAGRAPH,
    segments,
  };
}

export function textBlocks(...paragraphs: string[]): TopikTextBlock[] {
  return paragraphs.map(textBlock);
}

export function presentation(
  template: TopikVisualTemplate,
  choiceLayout = TopikChoiceLayout.ONE_COLUMN,
): TopikPresentation {
  return {
    template,
    choiceLayout,
    visualVariant: 'official-blue',
    showBorder: true,
    preserveChoiceOrder: true,
  };
}

export function passage(...paragraphs: string[]): TopikStimulus {
  return {
    kind: TopikStimulusKind.PASSAGE,
    title: '',
    subtitle: '',
    blocks: textBlocks(...paragraphs),
    bulletItems: [],
    infoItems: [],
    labeledSentences: [],
    givenText: [],
    imageUrl: '',
    imageAlt: '',
    visualVariant: 'official-passage',
  };
}

export function headline(title: string): TopikStimulus {
  return {
    ...passage(),
    kind: TopikStimulusKind.HEADLINE,
    title,
    visualVariant: 'official-headline',
  };
}

export function advertisement(title: string, subtitle: string): TopikStimulus {
  return {
    ...passage(),
    kind: TopikStimulusKind.ADVERTISEMENT,
    title,
    subtitle,
    visualVariant: 'official-advertisement',
  };
}

export function notice(...bulletItems: string[]): TopikStimulus {
  return {
    ...passage(),
    kind: TopikStimulusKind.NOTICE,
    bulletItems,
    visualVariant: 'official-notice',
  };
}

export function sentenceSet(
  sentences: Array<[string, string]>,
): TopikStimulus {
  return {
    ...passage(),
    kind: TopikStimulusKind.SENTENCE_SET,
    labeledSentences: sentences.map(([label, text]) => ({
      label,
      blocks: textBlocks(text),
    })),
    visualVariant: 'official-sentence-set',
  };
}

export function insertionPassage(
  body: string,
  givenSentence: string,
): TopikStimulus {
  return {
    ...passage(body),
    givenText: textBlocks(givenSentence),
    visualVariant: 'official-insertion',
  };
}

function choiceItems(values: [string, string, string, string]): TopikChoice[] {
  return values.map((text, index) => ({
    key: String(index + 1),
    text,
    order: index + 1,
  }));
}

function createSolution(
  input: QuestionInput,
  choices: TopikChoice[],
): TopikSolution {
  const strategy =
    input.strategy ??
    '문제가 요구하는 정보를 확인한 뒤 지문의 핵심 표현과 각 보기를 비교합니다.';
  const correctText = choices.find((choice) => choice.key === input.answer)!.text;

  return {
    explanation: i18n(input.explanation),
    strategy: i18n(strategy),
    keyClues: [
      {
        key: 'clue-1',
        order: 1,
        label: i18n('핵심 단서'),
        explanation: i18n(input.clue),
        targetSegmentKeys: input.clueTargetKeys ?? [],
      },
    ],
    steps: [
      {
        key: 'step-1',
        order: 1,
        title: i18n('문제 요구 확인'),
        explanation: i18n(strategy),
        targetSegmentKeys: [],
      },
      {
        key: 'step-2',
        order: 2,
        title: i18n('단서와 보기 연결'),
        explanation: i18n(input.explanation),
        targetSegmentKeys: input.clueTargetKeys ?? [],
      },
    ],
    hints: [
      {
        key: 'hint-1',
        level: 1,
        title: i18n('문제 유형 확인'),
        content: i18n(strategy),
        examples: [
          i18n('예: 주제, 세부 내용, 빈칸 중 무엇을 묻는지 먼저 확인합니다.'),
        ],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-2',
        level: 2,
        title: i18n('핵심 단서 찾기'),
        content: i18n(input.clue),
        examples: [i18n(`예: "${input.clue}" 부분을 중심으로 읽습니다.`)],
        targetSegmentKeys: input.clueTargetKeys ?? [],
      },
      {
        key: 'hint-3',
        level: 3,
        title: i18n('보기 좁히기'),
        content: i18n(input.explanation),
        examples: [i18n(`예: "${correctText}"가 단서와 어떻게 연결되는지 봅니다.`)],
        targetSegmentKeys: input.clueTargetKeys ?? [],
      },
    ],
    choiceNotes: choices.map((choice) => ({
      choiceKey: choice.key,
      note: i18n(
        choice.key === input.answer
          ? input.explanation
          : '지문의 핵심 단서나 문법적 연결과 맞지 않는 선택지입니다.',
      ),
    })),
  };
}

function pdfPageForQuestion(number: number) {
  const pageEnds = [4, 8, 10, 12, 14, 16, 18, 20, 22, 24, 27, 29, 31, 33, 35, 37, 38, 40, 41, 43, 45, 47, 50];
  return pageEnds.findIndex((end) => number <= end) + 1;
}

export function question(input: QuestionInput): TopikSeedQuestion {
  const choices = choiceItems(input.choices);
  const pdfPage = pdfPageForQuestion(input.number);

  return {
    code: `topik-ii-reading-mock-1-q${String(input.number).padStart(2, '0')}`,
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
    tags: input.tags ?? [],
    difficulty: input.difficulty ?? 3,
    source: {
      pdfPage,
      bookPage: pdfPage + 21,
      reference: '실전모의고사 제1회 읽기 (2025)',
    },
    version: 1,
    isActive: true,
  };
}
