import type {
  ExpressionNodeSeed,
  ExpressionPackSeed,
  ExpressionSeedEntry,
} from '../../expression-seed.types';
import type { BuiltExpressionTopic } from '../expressions/expression-topic.helpers';

/** Register complete English topics explicitly when their content is ready. */
const ENGLISH_EXPRESSION_TOPICS: readonly BuiltExpressionTopic[] = [];

export const ENGLISH_EXPRESSION_PACK_SEEDS: readonly ExpressionPackSeed[] =
  ENGLISH_EXPRESSION_TOPICS.flatMap((topic) => topic.packs);
export const ENGLISH_EXPRESSION_NODE_SEEDS: readonly ExpressionNodeSeed[] =
  ENGLISH_EXPRESSION_TOPICS.flatMap((topic) => topic.nodes);
export const ENGLISH_EXPRESSION_SEEDS: readonly ExpressionSeedEntry[] =
  ENGLISH_EXPRESSION_TOPICS.flatMap((topic) => topic.expressions);
