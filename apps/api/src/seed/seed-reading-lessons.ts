import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import {
  ReadingLesson,
  ReadingLessonDocument,
} from '../reading-lessons/schemas/reading-lesson.schema';
import { READING_LEVEL1_SEEDS } from './data/reading/reading-level1.data';

async function seedReadingLessons() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const lessonModel = app.get<Model<ReadingLessonDocument>>(
    getModelToken(ReadingLesson.name),
  );

  try {
    const codes = READING_LEVEL1_SEEDS.map((lesson) => lesson.code);

    await lessonModel.updateMany(
      {
        level: 1,
        'source.bookCode': 'culture-korean-reading-1',
        code: { $nin: codes },
        isActive: true,
      },
      { $set: { isActive: false } },
    );

    for (const lesson of READING_LEVEL1_SEEDS) {
      await lessonModel.findOneAndUpdate(
        { code: lesson.code },
        { $set: lesson },
        { upsert: true, returnDocument: 'after', runValidators: true },
      );
    }

    console.log(
      `🎉 문화가 있는 한국어 읽기 1 · ${READING_LEVEL1_SEEDS.length}개 단원 시딩 완료!`,
    );
    console.log('ℹ️ 사용자 학습 데이터와 다른 교재 데이터는 삭제하지 않았습니다.');
  } finally {
    await app.close();
  }
}

seedReadingLessons().catch((error) => {
  console.error('❌ 읽기 레슨 시딩 실패:', error);
  process.exit(1);
});

