import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { Word, WordDocument } from '../words/schemas/word.schema';
import { buildWordSeedData } from './word-seed.data';

async function seedWords() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const wordModel = app.get<Model<WordDocument>>(getModelToken(Word.name));
  const words = buildWordSeedData();

  console.log('🌱 단어 시딩 시작 (code 기준 upsert)...');
  for (const word of words) {
    await wordModel.findOneAndUpdate(
      { code: word.code },
      { $set: word },
      { upsert: true, returnDocument: 'after' },
    );
  }

  console.log(`🎉 단어 ${words.length}개 시딩 완료!`);
  console.log('ℹ️ 기존 단어와 학습 진행도는 자동 삭제하지 않았습니다.');
  await app.close();
}

seedWords().catch((error) => {
  console.error('❌ 단어 시딩 실패:', error);
  process.exit(1);
});
