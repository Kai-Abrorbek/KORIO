import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AppModule } from '../app.module';
import {
  ExpressionPack,
  ExpressionPackDocument,
} from '../expressions/schemas/expression-pack.schema';
import {
  ExpressionNode,
  ExpressionNodeDocument,
} from '../expressions/schemas/expression-node.schema';
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
  EXPRESSION_NODE_SEEDS,
  EXPRESSION_SEEDS,
  LEGACY_EXPRESSION_SAMPLE_CODES,
} from './data/expressions/expression.data';

const ACTIVE_ORDER_INDEX_NAME = 'packId_1_order_1';

async function ensureActiveOrderIndex<T>(model: Model<T>, label: string) {
  const indexes = await model.collection.indexes();
  const orderIndexes = indexes.filter((index) => {
    const key = index.key as Record<string, unknown>;
    return (
      Object.keys(key).length === 2 && key.packId === 1 && key.order === 1
    );
  });
  const isExpectedIndex = (index: (typeof indexes)[number]) => {
    const partialFilter = index.partialFilterExpression as
      | Record<string, unknown>
      | undefined;
    return index.unique === true && partialFilter?.isActive === true;
  };
  const expectedIndex = orderIndexes.find(isExpectedIndex);
  const legacyIndexes = orderIndexes.filter(
    (index) => !isExpectedIndex(index),
  );

  if (expectedIndex && legacyIndexes.length === 0) return;

  const activeDuplicate = await model.collection
    .aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: { packId: '$packId', order: '$order' },
          count: { $sum: 1 },
        },
      },
      { $match: { count: { $gt: 1 } } },
      { $limit: 1 },
    ])
    .next();
  if (activeDuplicate) {
    throw new Error(
      `${label}에 같은 팩/order의 활성 문서가 중복되어 인덱스를 수정할 수 없습니다.`,
    );
  }

  for (const index of legacyIndexes) {
    if (!index.name) {
      throw new Error(`${label}의 레거시 order 인덱스 이름을 찾을 수 없습니다.`);
    }
    await model.collection.dropIndex(index.name);
  }

  if (!expectedIndex) {
    await model.collection.createIndex(
      { packId: 1, order: 1 },
      {
        name: ACTIVE_ORDER_INDEX_NAME,
        unique: true,
        partialFilterExpression: { isActive: true },
      },
    );
  }

  console.log(`♻️ ${label} 활성 order 인덱스 정리 완료`);
}

async function seedExpressions() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const packModel = app.get<Model<ExpressionPackDocument>>(
    getModelToken(ExpressionPack.name),
  );
  const expressionModel = app.get<Model<ExpressionDocument>>(
    getModelToken(Expression.name),
  );
  const nodeModel = app.get<Model<ExpressionNodeDocument>>(
    getModelToken(ExpressionNode.name),
  );
  const questionModel = app.get<Model<QuestionDocument>>(
    getModelToken(Question.name),
  );

  await Promise.all([
    ensureActiveOrderIndex(nodeModel, '표현 노드'),
    ensureActiveOrderIndex(expressionModel, '표현'),
  ]);

  console.log('🌱 표현 시딩 시작 (code 기준 upsert)...');
  const packs = new Map<string, ExpressionPackDocument>();
  const nodes = new Map<string, ExpressionNodeDocument>();

  await Promise.all([
    packModel.updateMany(
      { code: { $in: [...LEGACY_EXPRESSION_SAMPLE_CODES.packs] } },
      { $set: { isActive: false } },
    ),
    nodeModel.updateMany(
      { code: { $in: [...LEGACY_EXPRESSION_SAMPLE_CODES.nodes] } },
      { $set: { isActive: false } },
    ),
    expressionModel.updateMany(
      { code: { $in: [...LEGACY_EXPRESSION_SAMPLE_CODES.expressions] } },
      { $set: { isActive: false } },
    ),
  ]);

  for (const seed of EXPRESSION_PACK_SEEDS) {
    const pack = await packModel.findOneAndUpdate(
      { code: seed.code },
      { $set: { ...seed, isActive: seed.isActive ?? true } },
      { upsert: true, returnDocument: 'after' },
    );
    if (!pack) throw new Error(`표현 팩 upsert 실패: ${seed.code}`);
    packs.set(seed.code, pack);
  }

  const seededPackIds = [...packs.values()].map(
    (pack) => pack._id as Types.ObjectId,
  );
  await Promise.all([
    nodeModel.updateMany(
      { packId: { $in: seededPackIds }, isActive: true },
      { $set: { isActive: false } },
    ),
    expressionModel.updateMany(
      { packId: { $in: seededPackIds }, isActive: true },
      { $set: { isActive: false } },
    ),
  ]);

  for (const seed of EXPRESSION_NODE_SEEDS) {
    const { packCode, ...nodeData } = seed;
    const pack = packs.get(packCode);
    if (!pack) throw new Error(`없는 표현 주제: ${packCode}`);

    const node = await nodeModel.findOneAndUpdate(
      { code: seed.code },
      {
        $set: {
          ...nodeData,
          packId: pack._id,
          isActive: seed.isActive ?? true,
        },
      },
      { upsert: true, returnDocument: 'after' },
    );
    if (!node) throw new Error(`표현 노드 upsert 실패: ${seed.code}`);
    nodes.set(seed.code, node);
  }

  for (const seed of EXPRESSION_SEEDS) {
    const { packCode, nodeCode, practiceQuestions = [], ...expressionData } =
      seed;
    const pack = packs.get(packCode);
    if (!pack) throw new Error(`없는 표현 팩: ${packCode}`);
    const node = nodes.get(nodeCode);
    if (!node) throw new Error(`없는 표현 노드: ${nodeCode}`);
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
          nodeId: node._id,
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
    `🎉 표현 주제 ${EXPRESSION_PACK_SEEDS.length}개 · 노드 ${EXPRESSION_NODE_SEEDS.length}개 · 표현 ${EXPRESSION_SEEDS.length}개 시딩 완료!`,
  );
  console.log('ℹ️ 기존 표현과 사용자 진행도는 자동 삭제하지 않았습니다.');
  await app.close();
}

seedExpressions().catch((error) => {
  console.error('❌ 표현 시딩 실패:', error);
  process.exit(1);
});
