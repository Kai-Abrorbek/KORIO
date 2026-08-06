/**
 * 문법 문제 풀이 트랙 시딩.
 *
 * 어휘 시드(seed.ts)와 같은 구조지만 노드/레슨에 category='grammar' 가 붙어서
 * getRoadmap(category='grammar') 이 이것만 골라 간다. 어휘 로드맵은 영향 없음.
 *
 *   pnpm --filter api seed:grammar-track
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../lessons/schemas/question.schema';
import { Lesson } from '../lessons/schemas/lesson.schema';
import { LessonNode } from '../lessons/schemas/node.schema';
import { GT_S1_NODES, GT_S1_QUESTIONS } from './data/grammar-track/section1';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const questionModel = app.get<Model<Question>>(getModelToken(Question.name));
  const lessonModel = app.get<Model<Lesson>>(getModelToken(Lesson.name));
  const nodeModel = app.get<Model<LessonNode>>(getModelToken(LessonNode.name));

  const allNodes = GT_S1_NODES;
  const allQuestions = GT_S1_QUESTIONS;

  console.log(`📚 문법 트랙 시딩 시작 (노드 ${allNodes.length}개)`);

  for (const nodeData of allNodes) {
    const { lessons, ...nodeInfo } = nodeData;

    // 어휘 트랙과 code 가 겹치지 않게 gt_ 접두사를 붙인다
    const nodeCode = `gt_s${nodeInfo.section}_u${nodeInfo.unit}_o${nodeInfo.order}`;

    const node = await nodeModel.findOneAndUpdate(
      { code: nodeCode },
      { $set: { ...nodeInfo, code: nodeCode } },
      { upsert: true, returnDocument: 'after' },
    );

    const lessonIds: any[] = [];

    for (let li = 0; li < lessons.length; li++) {
      const lessonData = lessons[li];
      const { questions: qKeys, ...lessonInfo } = lessonData;

      const questionIds: any[] = [];
      for (const key of qKeys) {
        if (!allQuestions[key]) {
          console.log('❌ 없는 문제 키:', key);
          continue;
        }
        const q = await questionModel.findOneAndUpdate(
          { code: key },
          { $set: { ...allQuestions[key], code: key } },
          { upsert: true, returnDocument: 'after' },
        );
        questionIds.push(q._id);
      }

      const lessonCode = `${nodeCode}_l${li + 1}`;
      const lesson = await lessonModel.findOneAndUpdate(
        { code: lessonCode },
        {
          $set: {
            ...lessonInfo,
            code: lessonCode,
            nodeId: node._id,
            section: nodeInfo.section,
            unit: nodeInfo.unit,
            questionIds,
            xpReward: qKeys.length * 2,
            isActive: true,
          },
        },
        { upsert: true, returnDocument: 'after' },
      );

      lessonIds.push(lesson._id);
      console.log(
        `  ✅ 레슨: ${lessonInfo.title.ko} (${lessonCode}, 문제 ${questionIds.length}개)`,
      );
    }

    await nodeModel.findByIdAndUpdate(node._id, { lessonIds });
    console.log(
      `✅ 노드: ${nodeInfo.title.ko} (${nodeCode}, 레슨 ${lessonIds.length}개)`,
    );
  }

  console.log('🎉 문법 트랙 시딩 완료!');
  await app.close();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
