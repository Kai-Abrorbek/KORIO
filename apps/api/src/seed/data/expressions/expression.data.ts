import type {
  ExpressionNodeSeed,
  ExpressionPackSeed,
  ExpressionSeedEntry,
} from '../../expression-seed.types';
import { ASKING_FOR_AND_UNDERSTANDING_DIRECTIONS_TOPIC } from './topics/asking-for-and-understanding-directions';
import { ASKING_FOR_CLARIFICATION_TOPIC } from './topics/asking-for-clarification';
import { CALLING_AND_LEAVING_MESSAGES_TOPIC } from './topics/calling-and-leaving-messages';
import { CHECKING_TIME_AND_DATE_TOPIC } from './topics/checking-time-and-date';
import { GREETINGS_AND_GOODBYES_TOPIC } from './topics/greetings-and-goodbyes';
import { MAKING_AND_CHANGING_APPOINTMENTS_TOPIC } from './topics/making-and-changing-appointments';
import { MAKING_SMALL_TALK_ABOUT_WEATHER_AND_LIFE_TOPIC } from './topics/making-small-talk-about-weather-and-life';
import { ORDERING_AT_RESTAURANTS_AND_CAFES_TOPIC } from './topics/ordering-at-restaurants-and-cafes';
import { PAYING_AT_CONVENIENCE_STORES_TOPIC } from './topics/paying-at-convenience-stores';
import { REQUESTING_EMERGENCY_HELP_TOPIC } from './topics/requesting-emergency-help';
import { REQUESTS_AND_PERMISSION_TOPIC } from './topics/requests-and-permission';
import { SELF_INTRODUCTION_TOPIC } from './topics/self-introduction';
import { SHOPPING_AT_SUPERMARKETS_AND_CLOTHING_STORES_TOPIC } from './topics/shopping-at-supermarkets-and-clothing-stores';
import { SPEAKING_AT_HOSPITALS_AND_PHARMACIES_TOPIC } from './topics/speaking-at-hospitals-and-pharmacies';
import { THANKS_AND_APOLOGIES_TOPIC } from './topics/thanks-and-apologies';
import { USING_BUSES_SUBWAYS_AND_TAXIS_TOPIC } from './topics/using-buses-subways-and-taxis';

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
  ORDERING_AT_RESTAURANTS_AND_CAFES_TOPIC,
  PAYING_AT_CONVENIENCE_STORES_TOPIC,
  ASKING_FOR_AND_UNDERSTANDING_DIRECTIONS_TOPIC,
  USING_BUSES_SUBWAYS_AND_TAXIS_TOPIC,
  MAKING_AND_CHANGING_APPOINTMENTS_TOPIC,
  SPEAKING_AT_HOSPITALS_AND_PHARMACIES_TOPIC,
  REQUESTING_EMERGENCY_HELP_TOPIC,
  MAKING_SMALL_TALK_ABOUT_WEATHER_AND_LIFE_TOPIC,
  CHECKING_TIME_AND_DATE_TOPIC,
  CALLING_AND_LEAVING_MESSAGES_TOPIC,
  SHOPPING_AT_SUPERMARKETS_AND_CLOTHING_STORES_TOPIC,
] as const;

export const EXPRESSION_PACK_SEEDS: readonly ExpressionPackSeed[] =
  EXPRESSION_TOPICS.flatMap((topic) => topic.packs);

export const EXPRESSION_NODE_SEEDS: readonly ExpressionNodeSeed[] =
  EXPRESSION_TOPICS.flatMap((topic) => topic.nodes);

export const EXPRESSION_SEEDS: readonly ExpressionSeedEntry[] =
  EXPRESSION_TOPICS.flatMap((topic) => topic.expressions);
