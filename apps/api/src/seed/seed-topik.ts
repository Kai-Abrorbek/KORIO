import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopikExam } from '../topik/schemas/topik-exam.schema';
import { TopikQuestionGroup } from '../topik/schemas/topik-question-group.schema';
import { TopikQuestion } from '../topik/schemas/topik-question.schema';
import { TopikResponseType } from '../topik/schemas/topik-content.schema';
import { TopikModule } from '../topik/topik.module';
import {
  TOPIK_LISTENING_MOCK_1_SEED,
  TOPIK_LISTENING_MOCK_2_SEED,
  TOPIK_I_37_LISTENING_SEED,
  TOPIK_I_37_READING_SEED,
  TOPIK_READING_MOCK_1_SEED,
  TOPIK_READING_MOCK_2_SEED,
  TOPIK_WRITING_MOCK_1_SEED,
  TOPIK_WRITING_MOCK_2_SEED,
  TopikExamSeed,
} from './data/topik';
import {
  validateTopikListeningSeed,
  validateTopikIReadingSeed,
  validateTopikReadingSeed,
  validateTopikWritingSeed,
} from './validate-topik-seed';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGODB_URI'),
      }),
    }),
    TopikModule,
  ],
})
class TopikSeedModule {}

async function seedTopik() {
  const app = await NestFactory.createApplicationContext(TopikSeedModule);

  try {
    const examModel = app.get<Model<TopikExam>>(getModelToken(TopikExam.name));
    const groupModel = app.get<Model<TopikQuestionGroup>>(
      getModelToken(TopikQuestionGroup.name),
    );
    const questionModel = app.get<Model<TopikQuestion>>(
      getModelToken(TopikQuestion.name),
    );
    const seeds: Array<{
      data: TopikExamSeed;
      validation: ReturnType<typeof validateTopikReadingSeed>;
    }> = [
      {
        data: TOPIK_I_37_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_37_READING_SEED),
      },
      {
        data: TOPIK_I_37_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_37_LISTENING_SEED),
      },
      {
        data: TOPIK_READING_MOCK_1_SEED,
        validation: validateTopikReadingSeed(TOPIK_READING_MOCK_1_SEED),
      },
      {
        data: TOPIK_READING_MOCK_2_SEED,
        validation: validateTopikReadingSeed(TOPIK_READING_MOCK_2_SEED),
      },
      {
        data: TOPIK_LISTENING_MOCK_1_SEED,
        validation: validateTopikListeningSeed(TOPIK_LISTENING_MOCK_1_SEED),
      },
      {
        data: TOPIK_LISTENING_MOCK_2_SEED,
        validation: validateTopikListeningSeed(TOPIK_LISTENING_MOCK_2_SEED),
      },
      {
        data: TOPIK_WRITING_MOCK_1_SEED,
        validation: validateTopikWritingSeed(TOPIK_WRITING_MOCK_1_SEED),
      },
      {
        data: TOPIK_WRITING_MOCK_2_SEED,
        validation: validateTopikWritingSeed(TOPIK_WRITING_MOCK_2_SEED),
      },
    ];

    for (const { data, validation } of seeds) {
      const { exam: examData, groups, questions } = data;
      const exam = await examModel.findOneAndUpdate(
        { code: examData.code },
        { $set: examData },
        { upsert: true, returnDocument: 'after', runValidators: true },
      );
      const groupIdByCode = new Map<string, unknown>();

      for (const groupData of groups) {
        const group = await groupModel.findOneAndUpdate(
          { examId: exam._id, code: groupData.code },
          { $set: { ...groupData, examId: exam._id } },
          { upsert: true, returnDocument: 'after', runValidators: true },
        );
        groupIdByCode.set(group.code, group._id);
      }

      for (const questionData of questions) {
        const { groupCode, ...content } = questionData;
        const groupId = groupIdByCode.get(groupCode);

        if (!groupId) {
          throw new Error(`Missing seeded group: ${groupCode}`);
        }

        await questionModel.findOneAndUpdate(
          { code: questionData.code },
          {
            $set: {
              ...content,
              responseType:
                questionData.responseType ?? TopikResponseType.MULTIPLE_CHOICE,
              examId: exam._id,
              groupId,
            },
          },
          { upsert: true, returnDocument: 'after', runValidators: true },
        );
      }

      await groupModel.updateMany(
        {
          examId: exam._id,
          code: { $nin: groups.map((group) => group.code) },
        },
        { $set: { isActive: false } },
      );
      await questionModel.updateMany(
        {
          examId: exam._id,
          code: { $nin: questions.map((question) => question.code) },
        },
        { $set: { isActive: false } },
      );

      console.log(
        `TOPIK seed complete (${examData.code}): ${validation.groupCount} groups, ${validation.questionCount} questions, ${validation.totalPoints} points`,
      );
    }
  } finally {
    await app.close();
  }
}

seedTopik().catch((error) => {
  console.error('TOPIK seed failed:', error);
  process.exit(1);
});
