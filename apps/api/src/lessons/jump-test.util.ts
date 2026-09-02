import type { QueryFilter, Types } from 'mongoose';
import type { LessonCategory } from './schemas/lesson.schema';
import type { LessonNodeDocument } from './schemas/node.schema';
import type { QuestionDocument, QuestionType } from './schemas/question.schema';

export type JumpTestCategory = 'vocabulary' | 'grammar';

const VOCABULARY: JumpTestCategory = 'vocabulary';
const GRAMMAR: JumpTestCategory = 'grammar';
const GRAMMAR_QUESTION_TYPES = ['grammar_blank', 'grammar_build'] as const;

/**
 * 점프 테스트는 현재 어휘·문법 로드맵에서만 제공한다.
 * category가 없던 기존 앱 요청은 어휘로 유지한다.
 */
export function normalizeJumpTestCategory(
  value?: string,
): JumpTestCategory | null {
  const normalized = value?.trim().toLowerCase();
  if (!normalized || normalized === VOCABULARY) return VOCABULARY;
  if (normalized === GRAMMAR) return GRAMMAR;
  return null;
}

/**
 * 목표 지점에 도착하기 전까지의 같은 트랙 노드만 고른다.
 * 예: 2섹션 3유닛 점프라면 이전 섹션 전체와 2섹션 1~2유닛이 범위다.
 */
export function buildJumpNodeFilter(
  section: number,
  unit: number,
  category: JumpTestCategory,
): QueryFilter<LessonNodeDocument> {
  const beforeTarget = {
    $or: [{ section: { $lt: section } }, { section, unit: { $lt: unit } }],
  };

  if (category === GRAMMAR) {
    return {
      isActive: true,
      category: GRAMMAR as LessonCategory,
      $and: [beforeTarget],
    };
  }

  // category가 없던 구형 어휘 노드도 계속 포함한다.
  return {
    isActive: true,
    $or: [
      { category: { $exists: false } },
      { category: null },
      { category: VOCABULARY as LessonCategory },
    ],
    $and: [beforeTarget],
  };
}

/** 선택한 트랙에 속하는 문제 유형만 통과시킨다. */
export function buildJumpQuestionFilter(
  questionIds: Types.ObjectId[],
  category: JumpTestCategory,
): QueryFilter<QuestionDocument> {
  const common = {
    _id: { $in: questionIds },
    isActive: true,
  };

  if (category === GRAMMAR) {
    return {
      ...common,
      type: { $in: [...GRAMMAR_QUESTION_TYPES] as QuestionType[] },
      lessonCategory: GRAMMAR as LessonCategory,
    };
  }

  return {
    ...common,
    type: { $nin: [...GRAMMAR_QUESTION_TYPES] as QuestionType[] },
    lessonCategory: { $ne: GRAMMAR as LessonCategory },
  };
}
