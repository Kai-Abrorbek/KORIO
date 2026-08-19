import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AppModule } from '../app.module';
import {
  ExpressionPack,
  ExpressionPackDocument,
} from '../expressions/schemas/expression-pack.schema';
import {
  Expression,
  ExpressionDocument,
} from '../expressions/schemas/expression.schema';
import { LessonCategory } from '../lessons/schemas/lesson.schema';
import {
  Question,
  QuestionDocument,
} from '../lessons/schemas/question.schema';
import {
  EXPRESSION_PACK_SEEDS,
  EXPRESSION_SEEDS,
} from './data/expressions/expression.data';

async function seedExpressions() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const packModel = app.get<Model<ExpressionPackDocument>>(
    getModelToken(ExpressionPack.name),
  );
  const expressionModel = app.get<Model<ExpressionDocument>>(
    getModelToken(Expression.name),
  );
  const questionModel = app.get<Model<QuestionDocument>>(
    getModelToken(Question.name),
  );

  console.log('🌱 표현 시딩 시작 (code 기준 upsert)...');
  const packs = new Map<string, ExpressionPackDocument>();

  for (const seed of EXPRESSION_PACK_SEEDS) {
    const pack = await packModel.findOneAndUpdate(
      { code: seed.code },
      { $set: { ...seed, isActive: seed.isActive ?? true } },
      { upsert: true, returnDocument: 'after' },
    );
    if (!pack) throw new Error(`표현 팩 upsert 실패: ${seed.code}`);
    packs.set(seed.code, pack);
  }

  for (const seed of EXPRESSION_SEEDS) {
    const { packCode, practiceQuestions, ...expressionData } = seed;
    const pack = packs.get(packCode);
    if (!pack) throw new Error(`없는 표현 팩: ${packCode}`);
    const practiceQuestionIds: Types.ObjectId[] = [];

    for (const questionSeed of practiceQuestions) {
      const question = await questionModel.findOneAndUpdate(
        { code: questionSeed.code },
        {
          $set: {
            ...questionSeed,
            lessonCategory: LessonCategory.EXPRESSION,
            isActive: questionSeed.isActive ?? true,
          },
        },
        { upsert: true, returnDocument: 'after' },
      );
      if (!question) {
        throw new Error(`표현 연습문제 upsert 실패: ${questionSeed.code}`);
      }
      practiceQuestionIds.push(question._id as Types.ObjectId);
    }

    const expression = await expressionModel.findOneAndUpdate(
      { code: seed.code },
      {
        $set: {
          ...expressionData,
          packId: pack._id,
          targetLanguage: 'ko',
          practiceQuestionIds,
          isActive: seed.isActive ?? true,
        },
      },
      { upsert: true, returnDocument: 'after' },
    );
    if (!expression) throw new Error(`표현 upsert 실패: ${seed.code}`);
  }

  console.log(
    `🎉 표현 팩 ${EXPRESSION_PACK_SEEDS.length}개 · 표현 ${EXPRESSION_SEEDS.length}개 시딩 완료!`,
  );
  console.log('ℹ️ 기존 표현과 사용자 진행도는 자동 삭제하지 않았습니다.');
  await app.close();
}

seedExpressions().catch((error) => {
  console.error('❌ 표현 시딩 실패:', error);
  process.exit(1);
});
