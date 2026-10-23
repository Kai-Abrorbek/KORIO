import { DEFAULT_COURSE_ID, type CourseScope } from '../common/learning-course';
import {
  EXPRESSION_NODE_SEEDS,
  EXPRESSION_PACK_SEEDS,
  EXPRESSION_SEEDS,
} from './data/expressions/expression.data';
import {
  ENGLISH_EXPRESSION_NODE_SEEDS,
  ENGLISH_EXPRESSION_PACK_SEEDS,
  ENGLISH_EXPRESSION_SEEDS,
} from './data/english-expressions/expression.data';
import type {
  ExpressionNodeSeed,
  ExpressionPackSeed,
  ExpressionSeedEntry,
} from './expression-seed.types';

export interface ExpressionCourseSeeds {
  packs: readonly ExpressionPackSeed[];
  nodes: readonly ExpressionNodeSeed[];
  expressions: readonly ExpressionSeedEntry[];
}

/** Keep source registration explicit. The legacy command selects Korean. */
export function getExpressionCourseSeeds(
  scope: CourseScope,
): ExpressionCourseSeeds {
  if (scope.courseId === DEFAULT_COURSE_ID) {
    return {
      packs: EXPRESSION_PACK_SEEDS,
      nodes: EXPRESSION_NODE_SEEDS,
      expressions: EXPRESSION_SEEDS,
    };
  }
  if (scope.courseId === 'en-general') {
    return {
      packs: ENGLISH_EXPRESSION_PACK_SEEDS,
      nodes: ENGLISH_EXPRESSION_NODE_SEEDS,
      expressions: ENGLISH_EXPRESSION_SEEDS,
    };
  }
  throw new Error(`No expression seed registry for ${scope.courseId}`);
}
