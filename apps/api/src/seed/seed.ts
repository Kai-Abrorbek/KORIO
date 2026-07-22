import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../lessons/schemas/question.schema';
import { Lesson, LessonCategory } from '../lessons/schemas/lesson.schema';
import { LessonNode } from '../lessons/schemas/node.schema';
import {
  UNIT1_QUESTIONS,
  UNIT1_NODES,
  UNIT2_QUESTIONS,
  UNIT2_NODES,
  UNIT3_QUESTIONS,
  UNIT3_NODES,
  UNIT4_QUESTIONS,
  UNIT4_NODES,
  UNIT5_QUESTIONS,
  UNIT5_NODES,
  UNIT6_QUESTIONS,
  UNIT6_NODES,
  UNIT7_QUESTIONS,
  UNIT7_NODES,
  UNIT8_QUESTIONS,
  UNIT8_NODES,
  S2_UNIT1_QUESTIONS,
  S2_UNIT1_NODES,
  S2_UNIT2_QUESTIONS,
  S2_UNIT2_NODES,
  S2_UNIT3_QUESTIONS,
  S2_UNIT3_NODES,
  S2_UNIT4_QUESTIONS,
  S2_UNIT4_NODES,
  S2_UNIT5_QUESTIONS,
  S2_UNIT5_NODES,
  S2_UNIT6_QUESTIONS,
  S2_UNIT6_NODES,
} from './data';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const questionModel = app.get<Model<Question>>(getModelToken(Question.name));
  const lessonModel = app.get<Model<Lesson>>(getModelToken(Lesson.name));
  const nodeModel = app.get<Model<LessonNode>>(getModelToken(LessonNode.name));

  console.log('🌱 시딩 시작 (upsert 방식 — 진행도 유지)...');

  console.log('🗑️  기존 데이터 삭제 완료');

  const allQuestions = {
    ...UNIT1_QUESTIONS,
    ...UNIT2_QUESTIONS,
    ...UNIT3_QUESTIONS,
    ...UNIT4_QUESTIONS,
    ...UNIT5_QUESTIONS,
    ...UNIT6_QUESTIONS,
    ...UNIT7_QUESTIONS,
    ...UNIT8_QUESTIONS,

    ...S2_UNIT1_QUESTIONS,
    ...S2_UNIT2_QUESTIONS,
    ...S2_UNIT3_QUESTIONS,
    ...S2_UNIT4_QUESTIONS,
    ...S2_UNIT5_QUESTIONS,
    ...S2_UNIT6_QUESTIONS,
  };

  const allNodes = [
    ...UNIT1_NODES,
    ...UNIT2_NODES,
    ...UNIT3_NODES,
    ...UNIT4_NODES,
    ...UNIT5_NODES,
    ...UNIT6_NODES,
    ...UNIT7_NODES,
    ...UNIT8_NODES,

    ...S2_UNIT1_NODES,
    ...S2_UNIT2_NODES,
    ...S2_UNIT3_NODES,
    ...S2_UNIT4_NODES,
    ...S2_UNIT5_NODES,
    ...S2_UNIT6_NODES,
  ];

  for (const nodeData of allNodes) {
    const { lessons, ...nodeInfo } = nodeData;

    // 노드 code: section-unit-order 조합 (고유)
    const nodeCode = `s${nodeInfo.section}_u${nodeInfo.unit}_o${nodeInfo.order}`;

    // 노드 upsert (code로 찾아서 내용 갱신, 없으면 생성)
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
          console.log('❌ 없는 키:', key);
          continue;
        }
        // question code = allQuestions의 key (안정적!)
        const q = await questionModel.findOneAndUpdate(
          { code: key },
          { $set: { ...allQuestions[key], code: key } },
          { upsert: true, returnDocument: 'after' },
        );
        questionIds.push(q._id);
      }

      // 레슨 code: 노드 code + 레슨 순서
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
      console.log(`  ✅ 레슨: ${lessonInfo.title.ko} (${lessonCode})`);
    }

    await nodeModel.findByIdAndUpdate(node._id, { lessonIds });
    console.log(
      `✅ 노드: ${nodeInfo.title.ko} (${nodeCode}, 레슨 ${lessonIds.length}개)`,
    );
  }

  console.log('🎉 시딩 완료! (진행도 유지됨)');
  await app.close();
}

seed().catch((err) => {
  console.error('❌ 시딩 실패:', err);
  process.exit(1);
});
