import { ExpressionProficiency } from '../../../expressions/schemas/expression-node.schema';
import { ExpressionSpeechLevel } from '../../../expressions/schemas/expression.schema';
import type { LocalizedExpressionSeedText } from '../../expression-seed.types';
import {
  defineExpressionTopic,
  type BuiltExpressionTopic,
} from '../expressions/expression-topic.helpers';

type Register = 'polite' | 'casual' | 'formal';

export type EnglishExpressionRow = readonly [
  code: string,
  text: string,
  ko: string,
  uz: string,
  ru: string,
  register: Register,
];

interface EnglishNodeDraft {
  code: string;
  title: LocalizedExpressionSeedText;
  description: LocalizedExpressionSeedText;
  icon: string;
  proficiency: ExpressionProficiency;
  context: LocalizedExpressionSeedText;
  speaker: LocalizedExpressionSeedText;
  expressions: readonly EnglishExpressionRow[];
}

interface EnglishTopicDraft {
  code: string;
  order: number;
  title: LocalizedExpressionSeedText;
  description: LocalizedExpressionSeedText;
  nodes: readonly EnglishNodeDraft[];
}

const REGISTER_NOTES: Record<Register, LocalizedExpressionSeedText> = {
  polite: {
    ko: '처음 만난 사람이나 일상 대화에서 자연스럽게 쓰는 공손한 표현이에요.',
    uz: 'Notanish odam bilan yoki kundalik suhbatda muloyim ishlatiladi.',
    en: 'A polite expression for everyday conversation.',
    ru: 'Вежливая фраза для повседневного общения.',
  },
  casual: {
    ko: '친한 사람 사이에서 자연스럽게 쓰는 편한 표현이에요.',
    uz: 'Yaqin odamlar bilan norasmiy suhbatda ishlatiladi.',
    en: 'A casual expression for people you know well.',
    ru: 'Разговорная фраза для общения с близкими.',
  },
  formal: {
    ko: '공식적인 자리나 업무 상황에서 쓰는 격식 있는 표현이에요.',
    uz: 'Rasmiy yoki ish vaziyatida ishlatiladi.',
    en: 'A formal expression for professional situations.',
    ru: 'Официальная фраза для делового общения.',
  },
};

/** Six small lessons keep every proficiency level at 30 expressions per topic. */
export function defineEnglishTopic(
  draft: EnglishTopicDraft,
): BuiltExpressionTopic {
  const expected = [
    ExpressionProficiency.BEGINNER,
    ExpressionProficiency.BEGINNER,
    ExpressionProficiency.INTERMEDIATE,
    ExpressionProficiency.INTERMEDIATE,
    ExpressionProficiency.ADVANCED,
    ExpressionProficiency.ADVANCED,
  ];
  if (draft.nodes.length !== expected.length) {
    throw new Error(`${draft.code} needs two nodes for each proficiency`);
  }
  draft.nodes.forEach((node, index) => {
    if (node.proficiency !== expected[index]) {
      throw new Error(
        `${draft.code}-${node.code} has invalid proficiency order`,
      );
    }
    if (node.expressions.length < 15 || node.expressions.length > 16) {
      throw new Error(`${draft.code}-${node.code} needs 15-16 expressions`);
    }
  });

  return defineExpressionTopic({
    code: draft.code,
    courseId: 'en-general',
    targetLanguage: 'en',
    title: draft.title,
    description: draft.description,
    order: draft.order,
    placement: {
      section: Math.ceil(draft.order / 10),
      unit: ((draft.order - 1) % 10) + 1,
    },
    nodes: draft.nodes.map((node) => ({
      code: node.code,
      title: node.title,
      description: node.description,
      icon: node.icon,
      proficiency: node.proficiency,
      expressions: node.expressions.map(
        ([code, text, ko, uz, ru, register]) => ({
          code,
          text,
          meaning: { ko, uz, en: text, ru },
          context: node.context,
          speaker: node.speaker,
          usageNote: REGISTER_NOTES[register],
          speechLevel:
            ExpressionSpeechLevel[
              register.toUpperCase() as Uppercase<Register>
            ],
          difficulty:
            node.proficiency === ExpressionProficiency.BEGINNER
              ? 1
              : node.proficiency === ExpressionProficiency.INTERMEDIATE
                ? 3
                : 5,
        }),
      ),
    })),
  });
}
