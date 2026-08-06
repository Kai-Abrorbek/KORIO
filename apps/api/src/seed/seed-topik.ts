import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  getModelToken,
  MongooseModule,
} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopikExam } from '../topik/schemas/topik-exam.schema';
import { TopikQuestionGroup } from '../topik/schemas/topik-question-group.schema';
import { TopikQuestion } from '../topik/schemas/topik-question.schema';
import { TopikModule } from '../topik/topik.module';
import { TOPIK_READING_MOCK_1_SEED } from './data/topik';
import { validateTopikReadingSeed } from './validate-topik-seed';

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
  const validation = validateTopikReadingSeed(TOPIK_READING_MOCK_1_SEED);
  const app = await NestFactory.createApplicationContext(TopikSeedModule);

  try {
    const examModel = app.get<Model<TopikExam>>(getModelToken(TopikExam.name));
    const groupModel = app.get<Model<TopikQuestionGroup>>(
      getModelToken(TopikQuestionGroup.name),
    );
    const questionModel = app.get<Model<TopikQuestion>>(
      getModelToken(TopikQuestion.name),
    );
    const { exam: examData, groups, questions } =
      TOPIK_READING_MOCK_1_SEED;
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
      `TOPIK seed complete: ${validation.groupCount} groups, ${validation.questionCount} questions, ${validation.totalPoints} points`,
    );
  } finally {
    await app.close();
  }
}

seedTopik().catch((error) => {
  console.error('TOPIK seed failed:', error);
  process.exit(1);
});
