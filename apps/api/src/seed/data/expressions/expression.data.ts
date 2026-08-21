import type {
  ExpressionNodeSeed,
  ExpressionPackSeed,
  ExpressionSeedEntry,
} from '../../expression-seed.types';
import { ASKING_FOR_CLARIFICATION_TOPIC } from './topics/asking-for-clarification';
import { GREETINGS_AND_GOODBYES_TOPIC } from './topics/greetings-and-goodbyes';
import { REQUESTS_AND_PERMISSION_TOPIC } from './topics/requests-and-permission';
import { SELF_INTRODUCTION_TOPIC } from './topics/self-introduction';
import { THANKS_AND_APOLOGIES_TOPIC } from './topics/thanks-and-apologies';

/** 이전 구조 확인용 식당 샘플은 삭제하지 않고 시딩할 때 비활성화한다. */
export const LEGACY_EXPRESSION_SAMPLE_CODES = {
  packs: ['restaurant'],
  nodes: ['restaurant-menu-and-order'],
  expressions: ['restaurant-menu-please'],
} as const;

/**
 * 표현 콘텐츠는 한 파일이 지나치게 커지지 않도록 주제별로 작성한다.
 * 이 배열의 순서가 표현 로드맵의 주제 순서다.
 */
const EXPRESSION_TOPICS = [
  GREETINGS_AND_GOODBYES_TOPIC,
  SELF_INTRODUCTION_TOPIC,
  THANKS_AND_APOLOGIES_TOPIC,
  ASKING_FOR_CLARIFICATION_TOPIC,
  REQUESTS_AND_PERMISSION_TOPIC,
] as const;

export const EXPRESSION_PACK_SEEDS: readonly ExpressionPackSeed[] =
  EXPRESSION_TOPICS.flatMap((topic) => topic.packs);

export const EXPRESSION_NODE_SEEDS: readonly ExpressionNodeSeed[] =
  EXPRESSION_TOPICS.flatMap((topic) => topic.nodes);

export const EXPRESSION_SEEDS: readonly ExpressionSeedEntry[] =
  EXPRESSION_TOPICS.flatMap((topic) => topic.expressions);
