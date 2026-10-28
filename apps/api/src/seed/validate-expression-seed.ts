import { EXPRESSION_LANGUAGES } from '../expressions/schemas/expression-pack.schema';
import { ExpressionProficiency } from '../expressions/schemas/expression-node.schema';
import { ExpressionSpeechLevel } from '../expressions/schemas/expression.schema';
import { QuestionType } from '../lessons/schemas/question.schema';
import { parseSeedCourseScope } from './course-seed.options';
import { getExpressionCourseSeeds } from './expression-course.data';
import type { LocalizedExpressionSeedText } from './expression-seed.types';

const scope = parseSeedCourseScope();
const {
  packs: EXPRESSION_PACK_SEEDS,
  nodes: EXPRESSION_NODE_SEEDS,
  expressions: EXPRESSION_SEEDS,
} = getExpressionCourseSeeds(scope);
if (!EXPRESSION_PACK_SEEDS.length) {
  throw new Error(`No expression topics registered for ${scope.courseId}`);
}
if (scope.targetLanguage === 'en' && EXPRESSION_PACK_SEEDS.length !== 40) {
  throw new Error('English expressions need all 40 topics before seeding');
}
if (scope.targetLanguage === 'ko' && EXPRESSION_PACK_SEEDS.length !== 21) {
  throw new Error('Korean expressions need all 21 topics before seeding');
}

const codes = new Set<string>();
const packCodes = new Set(EXPRESSION_PACK_SEEDS.map((pack) => pack.code));
const nodeCodes = new Set(EXPRESSION_NODE_SEEDS.map((node) => node.code));
const nodeOrderKeys = new Set<string>();
const packOrders = new Set<number>();
const expressionOrderKeys = new Set<string>();
const expressionTextKeys = new Set<string>();
const expressionCountByNode = new Map<string, number>();
const nodeCountByPack = new Map<string, number>();
const levelCounts = new Map<string, number>();
const casualCounts = new Map<string, number>();
const politeCounts = new Map<string, number>();
const nodesByCode = new Map(
  EXPRESSION_NODE_SEEDS.map((node) => [node.code, node]),
);

function uniqueCode(code: string) {
  if (!code.trim()) throw new Error('Empty expression seed code');
  if (codes.has(code))
    throw new Error(`Duplicate expression seed code: ${code}`);
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
  if (scope.targetLanguage === 'en' && !pack.code.startsWith('en-')) {
    throw new Error(`${pack.code} needs en- prefix`);
  }
  if (
    (pack.courseId ?? 'ko-general') !== scope.courseId ||
    (pack.targetLanguage ?? 'ko') !== scope.targetLanguage
  ) {
    throw new Error(`${pack.code} has wrong course scope`);
  }
  completeI18n(pack.title, `${pack.code}.title`);
  completeI18n(pack.description, `${pack.code}.description`);
  if (packOrders.has(pack.order)) {
    throw new Error(`Duplicate expression pack order: ${pack.order}`);
  }
  packOrders.add(pack.order);
  if (pack.media?.emoji?.trim() || pack.media?.imageUrl?.trim()) {
    completeI18n(pack.media.imageAlt, `${pack.code}.media.imageAlt`);
  }
}
if (scope.targetLanguage === 'en') {
  for (let order = 1; order <= 40; order += 1) {
    if (!packOrders.has(order)) {
      throw new Error(`English expression topic order ${order} is missing`);
    }
  }
}

for (const node of EXPRESSION_NODE_SEEDS) {
  uniqueCode(node.code);
  if (scope.targetLanguage === 'en' && !node.code.startsWith('en-')) {
    throw new Error(`${node.code} needs en- prefix`);
  }
  if (!packCodes.has(node.packCode)) {
    throw new Error(`${node.code} references missing pack ${node.packCode}`);
  }
  completeI18n(node.title, `${node.code}.title`);
  completeI18n(node.description, `${node.code}.description`);
  if (!node.icon.trim()) throw new Error(`${node.code}.icon is empty`);
  if (scope.targetLanguage === 'en' || scope.targetLanguage === 'ko') {
    const expected = [
      ExpressionProficiency.BEGINNER,
      ExpressionProficiency.BEGINNER,
      ExpressionProficiency.INTERMEDIATE,
      ExpressionProficiency.INTERMEDIATE,
      ExpressionProficiency.ADVANCED,
      ExpressionProficiency.ADVANCED,
    ][node.order - 1];
    if (!expected || node.proficiency !== expected) {
      throw new Error(`${node.code} has invalid proficiency or order`);
    }
  }
  nodeCountByPack.set(
    node.packCode,
    (nodeCountByPack.get(node.packCode) ?? 0) + 1,
  );
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
  if (scope.targetLanguage === 'en' && !expression.code.startsWith('en-')) {
    throw new Error(`${expression.code} needs en- prefix`);
  }
  if (
    (expression.courseId ?? 'ko-general') !== scope.courseId ||
    (expression.targetLanguage ?? 'ko') !== scope.targetLanguage
  ) {
    throw new Error(`${expression.code} has wrong course scope`);
  }
  if (!packCodes.has(expression.packCode)) {
    throw new Error(
      `${expression.code} references missing pack ${expression.packCode}`,
    );
  }
  const text = expression.text ?? expression.korean;
  if (scope.targetLanguage === 'en' && !expression.text?.trim()) {
    throw new Error(`${expression.code} needs English text`);
  }
  if (!text?.trim()) {
    throw new Error(`${expression.code} has empty target-language text`);
  }
  if (!nodeCodes.has(expression.nodeCode)) {
    throw new Error(
      `${expression.code} references missing node ${expression.nodeCode}`,
    );
  }
  const node = nodesByCode.get(expression.nodeCode);
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
  const textKey = `${expression.packCode}:${text.trim()}`;
  if (expressionTextKeys.has(textKey)) {
    throw new Error(`${expression.packCode} has duplicate expression: ${text}`);
  }
  expressionTextKeys.add(textKey);
  expressionCountByNode.set(
    expression.nodeCode,
    (expressionCountByNode.get(expression.nodeCode) ?? 0) + 1,
  );
  if (node?.proficiency) {
    const key = `${expression.packCode}:${node.proficiency}`;
    levelCounts.set(key, (levelCounts.get(key) ?? 0) + 1);
    if (expression.speechLevel === ExpressionSpeechLevel.CASUAL) {
      casualCounts.set(key, (casualCounts.get(key) ?? 0) + 1);
    } else if (expression.speechLevel === ExpressionSpeechLevel.POLITE) {
      politeCounts.set(key, (politeCounts.get(key) ?? 0) + 1);
    }
  }
  if (!expression.placements.length) {
    throw new Error(`${expression.code} has no section/unit placement`);
  }
  completeI18n(expression.meaning, `${expression.code}.meaning`);
  completeI18n(expression.context, `${expression.code}.context`);
  completeI18n(expression.speaker, `${expression.code}.speaker`);
  completeI18n(expression.usageNote, `${expression.code}.usageNote`);
  if (
    scope.targetLanguage === 'ko' &&
    !expression.pronunciation.romanization?.trim()
  ) {
    throw new Error(`${expression.code}.pronunciation.romanization is empty`);
  }
  if (!expression.pronunciation.ttsText.trim()) {
    throw new Error(`${expression.code}.pronunciation.ttsText is empty`);
  }
  if (expression.media?.emoji?.trim() || expression.media?.imageUrl?.trim()) {
    completeI18n(
      expression.media.imageAlt,
      `${expression.code}.media.imageAlt`,
    );
  }

  for (const question of expression.practiceQuestions ?? []) {
    uniqueCode(question.code);
    if (scope.targetLanguage === 'en' && !question.code.startsWith('en-')) {
      throw new Error(`${question.code} needs en- prefix`);
    }
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
          throw new Error(
            `${question.code} options are missing answer ${answer}`,
          );
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

for (const pack of EXPRESSION_PACK_SEEDS) {
  const count = nodeCountByPack.get(pack.code) ?? 0;
  if (count < 4 || count > 6) {
    throw new Error(`${pack.code} must contain between 4 and 6 nodes`);
  }
  if (scope.targetLanguage === 'en' || scope.targetLanguage === 'ko') {
    if (count !== 6) throw new Error(`${pack.code} needs six levelled nodes`);
    for (const level of Object.values(ExpressionProficiency)) {
      const key = `${pack.code}:${level}`;
      if ((levelCounts.get(key) ?? 0) < 30) {
        throw new Error(`${key} needs at least 30 expressions`);
      }
      if ((casualCounts.get(key) ?? 0) === 0) {
        throw new Error(`${key} needs natural casual expressions`);
      }
      if ((politeCounts.get(key) ?? 0) === 0) {
        throw new Error(`${key} needs polite expressions`);
      }
      if (
        scope.targetLanguage === 'ko' &&
        (casualCounts.get(key) ?? 0) >= (politeCounts.get(key) ?? 0)
      ) {
        throw new Error(`${key} needs more polite than casual expressions`);
      }
    }
  }
}

for (const node of EXPRESSION_NODE_SEEDS) {
  const count = expressionCountByNode.get(node.code) ?? 0;
  if (count < 12 || count > 16) {
    throw new Error(`${node.code} must contain between 12 and 16 expressions`);
  }
}

console.log(
  `✅ 표현 시드: 주제 ${EXPRESSION_PACK_SEEDS.length}개 · 노드 ${EXPRESSION_NODE_SEEDS.length}개 · 표현 ${EXPRESSION_SEEDS.length}개 · code ${codes.size}개 검증 완료`,
);
