import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grammar } from '../grammer/schemas/grammar.schema';
import { GRAMMAR_SEED } from './data/grammar/grammar.data';

async function seedGrammar() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const grammarModel = app.get<Model<Grammar>>(getModelToken(Grammar.name));

  console.log('🌱 문법 시딩 시작 (code 기준 upsert)...');
  for (const g of GRAMMAR_SEED) {
    await grammarModel.findOneAndUpdate(
      { code: g.code },
      { $set: g },
      { upsert: true, returnDocument: 'after' },
    );
    console.log(`  ✅ ${g.pattern} (${g.code})`);
  }
  console.log(`🎉 문법 ${GRAMMAR_SEED.length}개 시딩 완료!`);
  await app.close();
}

seedGrammar().catch((err) => {
  console.error('❌ 문법 시딩 실패:', err);
  process.exit(1);
});
