import { EXPRESSION_LANGUAGES } from '../expressions/schemas/expression-pack.schema';
import { QuestionType } from '../lessons/schemas/question.schema';
import {
  EXPRESSION_PACK_SEEDS,
  EXPRESSION_NODE_SEEDS,
  EXPRESSION_SEEDS,
} from './data/expressions/expression.data';
import type { LocalizedExpressionSeedText } from './expression-seed.types';

const codes = new Set<string>();
const packCodes = new Set(EXPRESSION_PACK_SEEDS.map((pack) => pack.code));
const nodeCodes = new Set(EXPRESSION_NODE_SEEDS.map((node) => node.code));
const nodeOrderKeys = new Set<string>();
const expressionOrderKeys = new Set<string>();
const expressionCountByNode = new Map<string, number>();

function uniqueCode(code: string) {
  if (!code.trim()) throw new Error('Empty expression seed code');
  if (codes.has(code)) throw new Error(`Duplicate expression seed code: ${code}`);
  codes.add(code);
}

function completeI18n(value: LocalizedExpressionSeedText, label: string) {
  for (const language of EXPRESSION_LANGUAGES) {
    if (!value[language]?.trim()) {
      throw new Error(`${label} is missing ${language}`);
    }
  }
}

for (const pack of EXPRESSION_PACK_SEEDS) {
  uniqueCode(pack.code);
  completeI18n(pack.title, `${pack.code}.title`);
  completeI18n(pack.description, `${pack.code}.description`);
  completeI18n(pack.media.imageAlt, `${pack.code}.media.imageAlt`);
}

for (const node of EXPRESSION_NODE_SEEDS) {
  uniqueCode(node.code);
  if (!packCodes.has(node.packCode)) {
    throw new Error(`${node.code} references missing pack ${node.packCode}`);
  }
  completeI18n(node.title, `${node.code}.title`);
  completeI18n(node.description, `${node.code}.description`);
  if (!node.icon.trim()) throw new Error(`${node.code}.icon is empty`);
  const requiredExposures = node.requiredExposures ?? 3;
  if (requiredExposures < 1 || requiredExposures > 5) {
    throw new Error(`${node.code}.requiredExposures must be between 1 and 5`);
  }
  const orderKey = `${node.packCode}:${node.order}`;
  if (nodeOrderKeys.has(orderKey)) {
    throw new Error(`${node.packCode} has duplicate node order ${node.order}`);
  }
  nodeOrderKeys.add(orderKey);
}

for (const expression of EXPRESSION_SEEDS) {
  uniqueCode(expression.code);
  if (!packCodes.has(expression.packCode)) {
    throw new Error(`${expression.code} references missing pack ${expression.packCode}`);
  }
  if (!expression.korean.trim()) {
    throw new Error(`${expression.code} has empty Korean text`);
  }
  if (!nodeCodes.has(expression.nodeCode)) {
    throw new Error(
      `${expression.code} references missing node ${expression.nodeCode}`,
    );
  }
  const node = EXPRESSION_NODE_SEEDS.find(
    (item) => item.code === expression.nodeCode,
  );
  if (node?.packCode !== expression.packCode) {
    throw new Error(`${expression.code} node belongs to another pack`);
  }
  const orderKey = `${expression.packCode}:${expression.order}`;
  if (expressionOrderKeys.has(orderKey)) {
    throw new Error(
      `${expression.packCode} has duplicate expression order ${expression.order}`,
    );
  }
  expressionOrderKeys.add(orderKey);
  expressionCountByNode.set(
    expression.nodeCode,
    (expressionCountByNode.get(expression.nodeCode) ?? 0) + 1,
  );
  if (!expression.placements.length) {
    throw new Error(`${expression.code} has no section/unit placement`);
  }
  completeI18n(expression.meaning, `${expression.code}.meaning`);
  completeI18n(expression.context, `${expression.code}.context`);
  completeI18n(expression.speaker, `${expression.code}.speaker`);
  completeI18n(expression.usageNote, `${expression.code}.usageNote`);
  completeI18n(expression.media.imageAlt, `${expression.code}.media.imageAlt`);

  for (const question of expression.practiceQuestions ?? []) {
    uniqueCode(question.code);
    completeI18n(question.instruction, `${question.code}.instruction`);
    completeI18n(
      question.answerTranslation,
      `${question.code}.answerTranslation`,
    );
    completeI18n(question.hint, `${question.code}.hint`);
    if (question.explanation) {
      completeI18n(question.explanation, `${question.code}.explanation`);
    }

    if (question.type === QuestionType.FILL_IN_BLANK) {
      const blankCount = question.sentenceTemplate.match(/_{3,}/g)?.length ?? 0;
      if (blankCount !== question.blankAnswers.length || blankCount === 0) {
        throw new Error(`${question.code} blank count does not match answers`);
      }
      for (const answer of question.blankAnswers) {
        if (!question.options.includes(answer)) {
          throw new Error(`${question.code} options are missing answer ${answer}`);
        }
      }
    }

    if (question.type === QuestionType.TRANSLATE_TYPE) {
      if (!question.grading.expectedMeaning.trim()) {
        throw new Error(`${question.code} is missing grading.expectedMeaning`);
      }
      if (
        question.grading.mode === 'targetExpression' &&
        !question.grading.targetExpressions?.length
      ) {
        throw new Error(`${question.code} is missing targetExpressions`);
      }
    }
  }
}

for (const node of EXPRESSION_NODE_SEEDS) {
  if (!expressionCountByNode.get(node.code)) {
    throw new Error(`${node.code} has no expressions`);
  }
}

console.log(
  `✅ 표현 시드: 주제 ${EXPRESSION_PACK_SEEDS.length}개 · 노드 ${EXPRESSION_NODE_SEEDS.length}개 · 표현 ${EXPRESSION_SEEDS.length}개 · code ${codes.size}개 검증 완료`,
);
