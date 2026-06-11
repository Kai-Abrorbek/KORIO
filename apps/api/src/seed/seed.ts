import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../lessons/schemas/question.schema';
import { Lesson, LessonCategory } from '../lessons/schemas/lesson.schema';
import { LessonNode } from '../lessons/schemas/node.schema';
import { UNIT1_QUESTIONS, UNIT1_NODES } from './data/unit1';
// import { UNIT2_QUESTIONS, UNIT2_NODES } from './data/unit2';
// import { UNIT3_QUESTIONS, UNIT3_NODES } from './data/unit3';
// import { UNIT4_QUESTIONS, UNIT4_NODES } from './data/unit4';
// import { UNIT5_QUESTIONS, UNIT5_NODES } from './data/unit5';
// import { UNIT6_QUESTIONS, UNIT6_NODES } from './data/unit6';
// import { UNIT7_QUESTIONS, UNIT7_NODES } from './data/unit7';
// import { UNIT8_QUESTIONS, UNIT8_NODES } from './data/unit8';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const questionModel = app.get<Model<Question>>(getModelToken(Question.name));
  const lessonModel = app.get<Model<Lesson>>(getModelToken(Lesson.name));
  const nodeModel = app.get<Model<LessonNode>>(getModelToken(LessonNode.name));

  console.log('🌱 시딩 시작...');

  await questionModel.deleteMany({});
  await lessonModel.deleteMany({});
  await nodeModel.deleteMany({});
  console.log('🗑️  기존 데이터 삭제 완료');

  const allQuestions = {
    ...UNIT1_QUESTIONS,
    // ...UNIT2_QUESTIONS,
    // ...UNIT3_QUESTIONS,
    // ...UNIT4_QUESTIONS,
    // ...UNIT5_QUESTIONS,
    // ...UNIT6_QUESTIONS,
    // ...UNIT7_QUESTIONS,
    // ...UNIT8_QUESTIONS,
  };

  const allNodes = [
    ...UNIT1_NODES,
    // ...UNIT2_NODES,
    // ...UNIT3_NODES,
    // ...UNIT4_NODES,
    // ...UNIT5_NODES,
    // ...UNIT6_NODES,
    // ...UNIT7_NODES,
    // ...UNIT8_NODES,
  ];

  for (const nodeData of allNodes) {
    const { lessons, ...nodeInfo } = nodeData;

    // 1. 노드 먼저 생성 (lessonIds 빈 배열로)
    const node = await nodeModel.create({
      ...nodeInfo,
      lessonIds: [],
    });

    const lessonIds: any[] = [];

    for (const lessonData of lessons) {
      const { questions: qKeys, ...lessonInfo } = lessonData;

      const createdQuestions = await questionModel.insertMany(
        qKeys.map((key) => allQuestions[key]),
      );
      const questionIds = createdQuestions.map((q) => q._id);

      // 2. 레슨 생성할 때 nodeId 바로 넣기
      const lesson = await lessonModel.create({
        ...lessonInfo,
        nodeId: node._id, // ← 바로 넣기
        section: nodeInfo.section,
        unit: nodeInfo.unit,
        questionIds,
        xpReward: qKeys.length * 15,
        isActive: true,
      });

      lessonIds.push(lesson._id);
      console.log(`  ✅ 레슨: ${lessonInfo.title.ko}`);
    }

    // 3. 노드에 lessonIds 업데이트
    await nodeModel.findByIdAndUpdate(node._id, { lessonIds });

    console.log(`✅ 노드: ${nodeInfo.title.ko} (레슨 ${lessonIds.length}개)`);
  }

  console.log('🎉 시딩 완료!');
  await app.close();
}

seed().catch((err) => {
  console.error('❌ 시딩 실패:', err);
  process.exit(1);
});
