import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { Word, WordDocument } from '../words/schemas/word.schema';
import { targetLanguageFilter } from '../common/learning-course';
import { buildWordSeedData } from './word-seed.data';
import { parseSeedCourseScope } from './course-seed.options';
import {
  wordSeedUpdate,
  wordSeedUpdatePipeline,
} from './word-seed.persistence';

async function seedWords() {
  const scope = parseSeedCourseScope();
  const words = buildWordSeedData(scope);
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const wordModel = app.get<Model<WordDocument>>(getModelToken(Word.name));

    console.log(`🌱 ${scope.courseId} 단어 시딩 시작 (code 기준 upsert)...`);
    for (const word of words) {
      const existing = await wordModel.findOne({ code: word.code }).lean();
      wordSeedUpdate(word, existing); // Refuse a published code's identity change.
      await wordModel.findOneAndUpdate(
        {
          code: word.code,
          headword: word.headword,
          senseKey: word.senseKey,
          ...targetLanguageFilter(word.targetLanguage),
        },
        wordSeedUpdatePipeline(word),
        { upsert: true, returnDocument: 'after', updatePipeline: true },
      );
    }

    console.log(`🎉 단어 ${words.length}개 시딩 완료!`);
    console.log('ℹ️ 기존 단어와 학습 진행도는 자동 삭제하지 않았습니다.');
  } finally {
    await app.close();
  }
}

seedWords().catch((error) => {
  console.error('❌ 단어 시딩 실패:', error);
  process.exit(1);
});
