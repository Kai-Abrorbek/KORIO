import type {
  ExpressionNodeSeed,
  ExpressionPackSeed,
  ExpressionSeedEntry,
} from '../../expression-seed.types';
import type { BuiltExpressionTopic } from '../expressions/expression-topic.helpers';
import { greetingsAndGoodbyes } from './topics/greetings-and-goodbyes';
import { introductionsAndPersonalDetails } from './topics/introductions-and-personal-details';
import { clarifyingAndCheckingUnderstanding } from './topics/clarifying-and-checking-understanding';
import { thanksAndApologies } from './topics/thanks-and-apologies';
import { requestsAndOffers } from './topics/requests-and-offers';
import { timeAndSchedulingTopic } from './topics/time-and-scheduling';
import { familyAndRelationshipsTopic } from './topics/family-and-relationships';
import { dailyRoutinesTopic } from './topics/daily-routines';
import { hobbiesAndFreeTimeTopic } from './topics/hobbies-and-free-time';
import { smallTalkTopic } from './topics/small-talk';
import { emergenciesAndSafety } from './topics/emergencies-and-safety';
import { restaurantsAndCafes } from './topics/restaurants-and-cafes';
import { groceries } from './topics/groceries';
import { shopping } from './topics/shopping';
import { paymentsAndReturns } from './topics/payments-and-returns';
import { directionsAndPublicTransit } from './topics/directions-and-public-transit';
import { airportsAndTickets } from './topics/airports-and-tickets';
import { lodging } from './topics/lodging';
import { appointments } from './topics/appointments';
import { phoneCalls } from './topics/phone-calls';
import { healthAndMedicalVisitsTopic } from './topics/health-and-medical-visits';
import { housingAndRepairsTopic } from './topics/housing-and-repairs';
import { bankingAndPublicServicesTopic } from './topics/banking-and-public-services';
import { onlineOrdersAndDeliveryTopic } from './topics/online-orders-and-delivery';
import { schoolAndLearningTopic } from './topics/school-and-learning';
import { socialInvitations } from './topics/social-invitations';
import { travelPlans } from './topics/travel-plans';
import { workplaceBasics } from './topics/workplace-basics';
import { customerService } from './topics/customer-service';
import { jobInterviews } from './topics/job-interviews';
import { meetings } from './topics/meetings';
import { workCallsEmailsAndPresentations } from './topics/work-calls-emails-and-presentations';
import { experiencesAndStorytelling } from './topics/experiences-and-storytelling';
import { newsAndFeelings } from './topics/news-and-feelings';
import { givingAndReceivingAdviceTopic } from './topics/giving-and-receiving-advice';
import { agreementAndDisagreementTopic } from './topics/agreement-and-disagreement';
import { problemSolvingTopic } from './topics/problem-solving';
import { persuasionAndNegotiation } from './topics/persuasion-and-negotiation';
import { cultureMediaAndSports } from './topics/culture-media-and-sports';
import { socialIssues } from './topics/social-issues';

/** Register complete English topics explicitly in learner order. */
const ENGLISH_EXPRESSION_TOPICS: readonly BuiltExpressionTopic[] = [
  greetingsAndGoodbyes,
  introductionsAndPersonalDetails,
  clarifyingAndCheckingUnderstanding,
  thanksAndApologies,
  requestsAndOffers,
  timeAndSchedulingTopic,
  familyAndRelationshipsTopic,
  dailyRoutinesTopic,
  hobbiesAndFreeTimeTopic,
  smallTalkTopic,
  emergenciesAndSafety,
  restaurantsAndCafes,
  groceries,
  shopping,
  paymentsAndReturns,
  directionsAndPublicTransit,
  airportsAndTickets,
  lodging,
  appointments,
  phoneCalls,
  healthAndMedicalVisitsTopic,
  housingAndRepairsTopic,
  bankingAndPublicServicesTopic,
  onlineOrdersAndDeliveryTopic,
  schoolAndLearningTopic,
  socialInvitations,
  travelPlans,
  workplaceBasics,
  customerService,
  jobInterviews,
  meetings,
  workCallsEmailsAndPresentations,
  experiencesAndStorytelling,
  newsAndFeelings,
  givingAndReceivingAdviceTopic,
  agreementAndDisagreementTopic,
  problemSolvingTopic,
  persuasionAndNegotiation,
  cultureMediaAndSports,
  socialIssues,
];

export const ENGLISH_EXPRESSION_PACK_SEEDS: readonly ExpressionPackSeed[] =
  ENGLISH_EXPRESSION_TOPICS.flatMap((topic) => topic.packs);
export const ENGLISH_EXPRESSION_NODE_SEEDS: readonly ExpressionNodeSeed[] =
  ENGLISH_EXPRESSION_TOPICS.flatMap((topic) => topic.nodes);
export const ENGLISH_EXPRESSION_SEEDS: readonly ExpressionSeedEntry[] =
  ENGLISH_EXPRESSION_TOPICS.flatMap((topic) => topic.expressions);
