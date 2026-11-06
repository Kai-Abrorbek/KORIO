import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopikExam, TopikExamSchema } from '../topik/schemas/topik-exam.schema';
import {
  TopikQuestionGroup,
  TopikQuestionGroupSchema,
} from '../topik/schemas/topik-question-group.schema';
import {
  TopikQuestion,
  TopikQuestionSchema,
} from '../topik/schemas/topik-question.schema';
import { TopikResponseType } from '../topik/schemas/topik-content.schema';
import {
  TOPIK_LISTENING_MOCK_1_SEED,
  TOPIK_LISTENING_MOCK_2_SEED,
  TOPIK_I_35_LISTENING_SEED,
  TOPIK_I_35_READING_SEED,
  TOPIK_I_36_LISTENING_SEED,
  TOPIK_I_36_READING_SEED,
  TOPIK_II_35_LISTENING_SEED,
  TOPIK_II_35_READING_SEED,
  TOPIK_II_35_WRITING_SEED,
  TOPIK_II_36_LISTENING_SEED,
  TOPIK_II_36_READING_SEED,
  TOPIK_II_36_WRITING_SEED,
  TOPIK_II_37_LISTENING_SEED,
  TOPIK_II_37_READING_SEED,
  TOPIK_II_37_WRITING_SEED,
  TOPIK_II_41_LISTENING_SEED,
  TOPIK_II_41_READING_SEED,
  TOPIK_II_41_WRITING_SEED,
  TOPIK_II_47_LISTENING_SEED,
  TOPIK_II_47_READING_SEED,
  TOPIK_II_47_WRITING_SEED,
  TOPIK_II_52_LISTENING_SEED,
  TOPIK_II_52_READING_SEED,
  TOPIK_II_52_WRITING_SEED,
  TOPIK_II_60_LISTENING_SEED,
  TOPIK_II_60_READING_SEED,
  TOPIK_II_60_WRITING_SEED,
  TOPIK_II_64_LISTENING_SEED,
  TOPIK_II_64_READING_SEED,
  TOPIK_II_64_WRITING_SEED,
  TOPIK_II_83_LISTENING_SEED,
  TOPIK_II_83_READING_SEED,
  TOPIK_II_83_WRITING_SEED,
  TOPIK_II_91_LISTENING_SEED,
  TOPIK_II_91_READING_SEED,
  TOPIK_II_91_WRITING_SEED,
  TOPIK_II_96_LISTENING_SEED,
  TOPIK_II_96_READING_SEED,
  TOPIK_II_96_WRITING_SEED,
  TOPIK_II_102_LISTENING_SEED,
  TOPIK_II_102_READING_SEED,
  TOPIK_II_102_WRITING_SEED,
  TOPIK_I_37_LISTENING_SEED,
  TOPIK_I_37_READING_SEED,
  TOPIK_I_41_LISTENING_SEED,
  TOPIK_I_41_READING_SEED,
  TOPIK_I_47_LISTENING_SEED,
  TOPIK_I_47_READING_SEED,
  TOPIK_I_52_LISTENING_SEED,
  TOPIK_I_52_READING_SEED,
  TOPIK_I_60_LISTENING_SEED,
  TOPIK_I_60_READING_SEED,
  TOPIK_I_64_LISTENING_SEED,
  TOPIK_I_64_READING_SEED,
  TOPIK_I_91_LISTENING_SEED,
  TOPIK_I_91_READING_SEED,
  TOPIK_I_96_LISTENING_SEED,
  TOPIK_I_96_READING_SEED,
  TOPIK_I_102_LISTENING_SEED,
  TOPIK_I_102_READING_SEED,
  TOPIK_READING_MOCK_1_SEED,
  TOPIK_READING_MOCK_2_SEED,
  TOPIK_WRITING_MOCK_1_SEED,
  TOPIK_WRITING_MOCK_2_SEED,
  TopikExamSeed,
} from './data/topik';
import { withTopikListeningRates } from './data/topik/topik-listening-rates';
import {
  reachableTopikMediaBase,
  topikExamAudioUrl,
  withTopikListeningMedia,
} from './data/topik/topik-listening-media';
import {
  validateTopikII35ReadingSeed,
  validateTopikII83ReadingSeed,
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
    // 시드는 모델 세 개만 쓴다. TopikModule 을 통째로 띄우면 LessonsModule → PushModule 이
    // 전역 MailModule 을 요구해서 시드가 시작도 못 한다
    MongooseModule.forFeature([
      { name: TopikExam.name, schema: TopikExamSchema },
      { name: TopikQuestionGroup.name, schema: TopikQuestionGroupSchema },
      { name: TopikQuestion.name, schema: TopikQuestionSchema },
    ]),
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
        data: TOPIK_II_35_READING_SEED,
        validation: validateTopikII35ReadingSeed(TOPIK_II_35_READING_SEED),
      },
      {
        data: TOPIK_II_35_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_35_LISTENING_SEED),
      },
      {
        data: TOPIK_II_35_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_35_WRITING_SEED),
      },
      {
        data: TOPIK_II_36_READING_SEED,
        validation: validateTopikII35ReadingSeed(TOPIK_II_36_READING_SEED),
      },
      {
        data: TOPIK_II_36_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_36_LISTENING_SEED),
      },
      {
        data: TOPIK_II_36_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_36_WRITING_SEED),
      },
      {
        data: TOPIK_II_37_READING_SEED,
        validation: validateTopikII35ReadingSeed(TOPIK_II_37_READING_SEED),
      },
      {
        data: TOPIK_II_37_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_37_LISTENING_SEED),
      },
      {
        data: TOPIK_II_37_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_37_WRITING_SEED),
      },
      {
        data: TOPIK_II_41_READING_SEED,
        validation: validateTopikII35ReadingSeed(TOPIK_II_41_READING_SEED),
      },
      {
        data: TOPIK_II_41_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_41_LISTENING_SEED),
      },
      {
        data: TOPIK_II_41_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_41_WRITING_SEED),
      },
      {
        data: TOPIK_II_47_READING_SEED,
        validation: validateTopikII35ReadingSeed(TOPIK_II_47_READING_SEED),
      },
      {
        data: TOPIK_II_47_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_47_LISTENING_SEED),
      },
      {
        data: TOPIK_II_47_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_47_WRITING_SEED),
      },
      {
        data: TOPIK_II_52_READING_SEED,
        validation: validateTopikII35ReadingSeed(TOPIK_II_52_READING_SEED),
      },
      {
        data: TOPIK_II_52_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_52_LISTENING_SEED),
      },
      {
        data: TOPIK_II_52_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_52_WRITING_SEED),
      },
      {
        data: TOPIK_II_60_READING_SEED,
        validation: validateTopikII35ReadingSeed(TOPIK_II_60_READING_SEED),
      },
      {
        data: TOPIK_II_60_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_60_LISTENING_SEED),
      },
      {
        data: TOPIK_II_60_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_60_WRITING_SEED),
      },
      {
        data: TOPIK_II_64_READING_SEED,
        validation: validateTopikII35ReadingSeed(TOPIK_II_64_READING_SEED),
      },
      {
        data: TOPIK_II_64_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_64_LISTENING_SEED),
      },
      {
        data: TOPIK_II_64_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_64_WRITING_SEED),
      },
      {
        data: TOPIK_II_83_READING_SEED,
        validation: validateTopikII83ReadingSeed(TOPIK_II_83_READING_SEED),
      },
      {
        data: TOPIK_II_83_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_83_LISTENING_SEED),
      },
      {
        data: TOPIK_II_83_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_83_WRITING_SEED),
      },
      {
        data: TOPIK_II_91_READING_SEED,
        validation: validateTopikII83ReadingSeed(TOPIK_II_91_READING_SEED),
      },
      {
        data: TOPIK_II_91_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_91_LISTENING_SEED),
      },
      {
        data: TOPIK_II_91_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_91_WRITING_SEED),
      },
      {
        data: TOPIK_II_96_READING_SEED,
        validation: validateTopikII83ReadingSeed(TOPIK_II_96_READING_SEED),
      },
      {
        data: TOPIK_II_96_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_96_LISTENING_SEED),
      },
      {
        data: TOPIK_II_96_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_96_WRITING_SEED),
      },
      {
        data: TOPIK_II_102_READING_SEED,
        validation: validateTopikII83ReadingSeed(TOPIK_II_102_READING_SEED),
      },
      {
        data: TOPIK_II_102_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_II_102_LISTENING_SEED),
      },
      {
        data: TOPIK_II_102_WRITING_SEED,
        validation: validateTopikWritingSeed(TOPIK_II_102_WRITING_SEED),
      },
      {
        data: TOPIK_I_35_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_35_READING_SEED),
      },
      {
        data: TOPIK_I_35_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_35_LISTENING_SEED),
      },
      {
        data: TOPIK_I_36_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_36_READING_SEED),
      },
      {
        data: TOPIK_I_36_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_36_LISTENING_SEED),
      },
      {
        data: TOPIK_I_37_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_37_READING_SEED),
      },
      {
        data: TOPIK_I_37_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_37_LISTENING_SEED),
      },
      {
        data: TOPIK_I_41_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_41_READING_SEED),
      },
      {
        data: TOPIK_I_41_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_41_LISTENING_SEED),
      },
      {
        data: TOPIK_I_47_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_47_READING_SEED),
      },
      {
        data: TOPIK_I_47_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_47_LISTENING_SEED),
      },
      {
        data: TOPIK_I_52_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_52_READING_SEED),
      },
      {
        data: TOPIK_I_52_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_52_LISTENING_SEED),
      },
      {
        data: TOPIK_I_60_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_60_READING_SEED),
      },
      {
        data: TOPIK_I_60_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_60_LISTENING_SEED),
      },
      {
        data: TOPIK_I_64_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_64_READING_SEED),
      },
      {
        data: TOPIK_I_64_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_64_LISTENING_SEED),
      },
      {
        data: TOPIK_I_91_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_91_READING_SEED),
      },
      {
        data: TOPIK_I_91_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_91_LISTENING_SEED),
      },
      {
        data: TOPIK_I_96_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_96_READING_SEED),
      },
      {
        data: TOPIK_I_96_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_96_LISTENING_SEED),
      },
      {
        data: TOPIK_I_102_READING_SEED,
        validation: validateTopikIReadingSeed(TOPIK_I_102_READING_SEED),
      },
      {
        data: TOPIK_I_102_LISTENING_SEED,
        validation: validateTopikListeningSeed(TOPIK_I_102_LISTENING_SEED),
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

    // 서버에 원본 음원이 올라가 있을 때만 링크한다 (없으면 대본 TTS 그대로)
    const mediaBase = await reachableTopikMediaBase();
    console.log(
      mediaBase
        ? `TOPIK 원본 음원 연결: ${mediaBase}`
        : 'TOPIK 원본 음원 연결 안 함',
    );

    for (const { data, validation } of seeds) {
      const { exam: examData, groups, questions } = data;
      const examAudioUrl = topikExamAudioUrl(examData.code, mediaBase);
      const exam = await examModel.findOneAndUpdate(
        { code: examData.code },
        {
          $set: examAudioUrl
            ? { ...examData, listeningAudioUrl: examAudioUrl }
            : examData,
        },
        { upsert: true, returnDocument: 'after', runValidators: true },
      );
      const groupIdByCode = new Map<string, unknown>();

      for (const groupData of groups) {
        const group = await groupModel.findOneAndUpdate(
          { examId: exam._id, code: groupData.code },
          {
            $set: {
              ...withTopikListeningMedia(
                withTopikListeningRates(groupData, examData.examType),
                mediaBase,
              ),
              examId: exam._id,
            },
          },
          { upsert: true, returnDocument: 'after', runValidators: true },
        );
        groupIdByCode.set(group.code, group._id);
      }

      for (const questionData of questions) {
        const { groupCode, ...content } = withTopikListeningMedia(
          withTopikListeningRates(questionData, examData.examType),
          mediaBase,
        );
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
