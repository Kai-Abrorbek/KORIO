import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grammar } from '../grammer/schemas/grammar.schema';
import { parseSeedCourseScope } from './course-seed.options';
import { getGrammarSeed } from './grammar-course.data';

async function seedGrammar() {
  const scope = parseSeedCourseScope();
  const grammarSeed = getGrammarSeed(scope);
  const app = await NestFactory.createApplicationContext(AppModule);
  const grammarModel = app.get<Model<Grammar>>(getModelToken(Grammar.name));

  console.log(`🌱 ${scope.courseId} 문법 시딩 시작 (code 기준 upsert)...`);
  for (const g of grammarSeed) {
    await grammarModel.findOneAndUpdate(
      { code: g.code },
      { $set: { ...g, ...scope } },
      { upsert: true, returnDocument: 'after' },
    );
    console.log(`  ✅ ${g.pattern} (${g.code})`);
  }
  console.log(`🎉 문법 ${grammarSeed.length}개 시딩 완료!`);
  await app.close();
}

seedGrammar().catch((err) => {
  console.error('❌ 문법 시딩 실패:', err);
  process.exit(1);
});
