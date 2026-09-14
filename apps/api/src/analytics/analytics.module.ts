import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LessonAttempt,
  LessonAttemptSchema,
} from './schemas/lesson-attempt.schema';
import {
  QuestionAttempt,
  QuestionAttemptSchema,
} from './schemas/question-attempt.schema';
import {
  SubscriptionEvent,
  SubscriptionEventSchema,
} from './schemas/subscription-event.schema';
import { LearningEventsService } from './learning-events.service';
import { SubscriptionEventsService } from './subscription-events.service';

/**
 * 학습 계측.
 *
 * **아무것도 import 하지 않는 잎 모듈이다.** LessonsModule 이 이걸 가져다 쓰고,
 * 반대 방향은 없다 — 계측이 도메인을 알면 순환이 생기고, 무엇보다 계측을
 * 떼어내기 어려워진다.
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LessonAttempt.name, schema: LessonAttemptSchema },
      { name: QuestionAttempt.name, schema: QuestionAttemptSchema },
      { name: SubscriptionEvent.name, schema: SubscriptionEventSchema },
    ]),
  ],
  providers: [LearningEventsService, SubscriptionEventsService],
  exports: [LearningEventsService, SubscriptionEventsService, MongooseModule],
})
export class AnalyticsModule {}
