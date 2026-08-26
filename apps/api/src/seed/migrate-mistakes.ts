import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AppModule } from '../app.module';
import { UserProgress } from '../users/schemas/user-progress.schema';
import { UserMistake } from '../users/schemas/user-mistake.schema';

/**
 * 예전 오답(UserProgress.wrongQuestionIds)을 오답 장부(UserMistake)로 옮긴다.
 *
 * 장부가 생기기 전에 쌓인 오답은 새 구조에 없어서 오답 노트와 복습 노드가
 * 비어 보인다. 한 번만 돌리면 된다. 이미 옮긴 항목은 건너뛴다.
 */
async function migrateMistakes() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const progressModel = app.get<Model<UserProgress>>(
    getModelToken(UserProgress.name),
  );
  const mistakeModel = app.get<Model<UserMistake>>(
    getModelToken(UserMistake.name),
  );

  console.log('🔁 오답 장부 이관 시작...');

  const rows = await progressModel
    .find({ wrongQuestionIds: { $ne: [] } })
    .select('userId wrongQuestionIds completedAt updatedAt')
    .lean();

  // 같은 유저·문제가 여러 레슨에 흩어져 있으면 가장 최근 것만 남긴다
  const latest = new Map<string, { at: Date; user: Types.ObjectId }>();
  for (const row of rows as any[]) {
    const at: Date = row.completedAt ?? row.updatedAt ?? new Date(0);
    for (const questionId of row.wrongQuestionIds ?? []) {
      if (!Types.ObjectId.isValid(questionId)) continue;
      const key = `${row.userId}:${questionId}`;
      const seen = latest.get(key);
      if (!seen || seen.at < at) latest.set(key, { at, user: row.userId });
    }
  }

  if (!latest.size) {
    console.log('  옮길 오답이 없습니다.');
    await app.close();
    return;
  }

  const ops = [...latest.entries()].map(([key, value]) => {
    const questionId = key.split(':')[1];
    return {
      updateOne: {
        filter: {
          userId: value.user,
          questionId: new Types.ObjectId(questionId),
        },
        update: {
          $setOnInsert: {
            userId: value.user,
            questionId: new Types.ObjectId(questionId),
            wrongCount: 1,
            streak: 0,
            lastWrongAt: value.at,
            resolvedAt: null,
          },
        },
        upsert: true,
      },
    };
  });

  const result = await mistakeModel.bulkWrite(ops as any, { ordered: false });
  console.log(
    `🎉 이관 완료 — 대상 ${latest.size}건, 새로 만든 기록 ${result.upsertedCount ?? 0}건`,
  );

  await app.close();
}

migrateMistakes().catch((err) => {
  console.error('❌ 오답 장부 이관 실패:', err);
  process.exit(1);
});
