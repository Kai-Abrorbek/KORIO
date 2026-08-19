import { EXPRESSION_LANGUAGES } from '../expressions/schemas/expression-pack.schema';
import { QuestionType } from '../lessons/schemas/question.schema';
import {
  EXPRESSION_PACK_SEEDS,
  EXPRESSION_SEEDS,
} from './data/expressions/expression.data';
import type { LocalizedExpressionSeedText } from './expression-seed.types';

const codes = new Set<string>();
const packCodes = new Set(EXPRESSION_PACK_SEEDS.map((pack) => pack.code));

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

for (const expression of EXPRESSION_SEEDS) {
  uniqueCode(expression.code);
  if (!packCodes.has(expression.packCode)) {
    throw new Error(`${expression.code} references missing pack ${expression.packCode}`);
  }
  if (!expression.korean.trim()) {
    throw new Error(`${expression.code} has empty Korean text`);
  }
  if (!expression.placements.length) {
    throw new Error(`${expression.code} has no section/unit placement`);
  }
  completeI18n(expression.meaning, `${expression.code}.meaning`);
  completeI18n(expression.context, `${expression.code}.context`);
  completeI18n(expression.usageNote, `${expression.code}.usageNote`);
  completeI18n(expression.media.imageAlt, `${expression.code}.media.imageAlt`);

  const typeCounts = new Map<QuestionType, number>();
  for (const question of expression.practiceQuestions) {
    uniqueCode(question.code);
    typeCounts.set(question.type, (typeCounts.get(question.type) ?? 0) + 1);
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

  if ((typeCounts.get(QuestionType.FILL_IN_BLANK) ?? 0) < 1) {
    throw new Error(`${expression.code} needs a fill_in_blank practice question`);
  }
  if ((typeCounts.get(QuestionType.TRANSLATE_TYPE) ?? 0) < 1) {
    throw new Error(`${expression.code} needs a translate_type practice question`);
  }
}

console.log(
  `✅ 표현 시드: 팩 ${EXPRESSION_PACK_SEEDS.length}개 · 표현 ${EXPRESSION_SEEDS.length}개 · code ${codes.size}개 검증 완료`,
);
