import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TopikAttempt,
  TopikAttemptSchema,
} from './schemas/topik-attempt.schema';
import { TopikExam, TopikExamSchema } from './schemas/topik-exam.schema';
import {
  TopikQuestionGroup,
  TopikQuestionGroupSchema,
} from './schemas/topik-question-group.schema';
import {
  TopikQuestion,
  TopikQuestionSchema,
} from './schemas/topik-question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TopikExam.name, schema: TopikExamSchema },
      { name: TopikQuestionGroup.name, schema: TopikQuestionGroupSchema },
      { name: TopikQuestion.name, schema: TopikQuestionSchema },
      { name: TopikAttempt.name, schema: TopikAttemptSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class TopikModule {}
