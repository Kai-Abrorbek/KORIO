import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question } from '../lessons/schemas/question.schema';
import { Lesson, LessonCategory } from '../lessons/schemas/lesson.schema';
import { LessonNode } from '../lessons/schemas/node.schema';
import { Expression } from '../expressions/schemas/expression.schema';
import { questionXp } from '../lessons/economy.const';
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
  S2_UNIT7_QUESTIONS,
  S2_UNIT7_NODES,
  S2_UNIT8_QUESTIONS,
  S2_UNIT8_NODES,
  S3_UNIT1_QUESTIONS,
  S3_UNIT1_NODES,
  S3_UNIT2_QUESTIONS,
  S3_UNIT2_NODES,
  S3_UNIT3_QUESTIONS,
  S3_UNIT3_NODES,
  S3_UNIT4_QUESTIONS,
  S3_UNIT4_NODES,
  S3_UNIT5_QUESTIONS,
  S3_UNIT5_NODES,
  S3_UNIT6_QUESTIONS,
  S3_UNIT6_NODES,
  S3_UNIT7_QUESTIONS,
  S3_UNIT7_NODES,
  S3_UNIT8_QUESTIONS,
  S3_UNIT8_NODES,
} from './data/vocabulary';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const questionModel = app.get<Model<Question>>(getModelToken(Question.name));
  const lessonModel = app.get<Model<Lesson>>(getModelToken(Lesson.name));
  const nodeModel = app.get<Model<LessonNode>>(getModelToken(LessonNode.name));
  const expressionModel = app.get<Model<Expression>>(
    getModelToken(Expression.name),
  );

  console.log('🌱 시딩 시작 (upsert 방식 — 진행도 유지)...');

  // 이번 실행이 실제로 써낸 것들. 끝나고 여기 없는 옛 문서를 걷어내는 데 쓴다.
  const writtenNodeIds: Types.ObjectId[] = [];
  const writtenLessonIds: Types.ObjectId[] = [];

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
    ...S2_UNIT7_QUESTIONS,
    ...S2_UNIT8_QUESTIONS,

    ...S3_UNIT1_QUESTIONS,
    ...S3_UNIT2_QUESTIONS,
    ...S3_UNIT3_QUESTIONS,
    ...S3_UNIT4_QUESTIONS,
    ...S3_UNIT5_QUESTIONS,
    ...S3_UNIT6_QUESTIONS,
    ...S3_UNIT7_QUESTIONS,
    ...S3_UNIT8_QUESTIONS,
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
    ...S2_UNIT7_NODES,
    ...S2_UNIT8_NODES,

    ...S3_UNIT1_NODES,
    ...S3_UNIT2_NODES,
    ...S3_UNIT3_NODES,
    ...S3_UNIT4_NODES,
    ...S3_UNIT5_NODES,
    ...S3_UNIT6_NODES,
    ...S3_UNIT7_NODES,
    ...S3_UNIT8_NODES,
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
      // 레슨의 기본 XP 는 그 레슨이 들고 있는 문제들의 xpReward 합계다.
      // 예전엔 `문항수 × 2` 라는 자리표시자를 썼는데, 그러면 문제마다 박아둔
      // xpReward(10~25) 가 통째로 버려져서 난이도가 보상에 안 실린다.
      let lessonXp = 0;
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
        lessonXp += questionXp(q as { xpReward?: number; type?: string });
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
            xpReward: lessonXp,
            isActive: true,
          },
        },
        { upsert: true, returnDocument: 'after' },
      );

      lessonIds.push(lesson._id);
      writtenLessonIds.push(lesson._id as Types.ObjectId);
      console.log(
        `  ✅ 레슨: ${lessonInfo.title.ko} (${lessonCode}, 문제 ${questionIds.length}개, XP ${lessonXp})`,
      );
    }

    await nodeModel.findByIdAndUpdate(node._id, { lessonIds });
    writtenNodeIds.push(node._id as Types.ObjectId);
    console.log(
      `✅ 노드: ${nodeInfo.title.ko} (${nodeCode}, 레슨 ${lessonIds.length}개)`,
    );
  }

  // ── 옛 문서 정리 ──
  // upsert 는 code 가 같은 것만 갱신한다. 구성을 바꿔서 사라진 노드·레슨·문항은
  // 그대로 DB 에 남고, getRoadmap 이 isActive 로만 노드를 긁어오기 때문에
  // 없어진 노드가 로드맵에 계속 뜬다. 이번에 쓴 것 말고는 걷어낸다.
  //
  // 범위는 section 이 아니라 code 모양으로 잡는다. 문법 트랙 노드도 section 1 을
  // 쓰기 때문에 section 으로 지우면 남의 트랙까지 날아간다. 어휘 시드가 만드는
  // code 는 s1_u2_o3 / s1_u2_o3_l4 꼴이고, 문법 트랙은 gt_ 로 시작한다.
  const VOCAB_NODE_CODE = /^s\d+_u\d+_o\d+$/;
  const VOCAB_LESSON_CODE = /^s\d+_u\d+_o\d+_l\d+$/;

  const staleNodes = await nodeModel.deleteMany({
    code: { $regex: VOCAB_NODE_CODE },
    _id: { $nin: writtenNodeIds },
  });
  const staleLessons = await lessonModel.deleteMany({
    code: { $regex: VOCAB_LESSON_CODE },
    _id: { $nin: writtenLessonIds },
  });

  // 문항은 section 을 안 들고 있어서 레슨 또는 표현 카드가 참조하지 않는 것을
  // 고아로 본다. 표현 연습문제도 기존 Question 컬렉션과 채점기를 재사용한다.
  const lessonQuestionIds = await lessonModel.distinct('questionIds');
  const expressionQuestionIds = await expressionModel.distinct(
    'practiceQuestionIds',
  );
  const referenced = [...lessonQuestionIds, ...expressionQuestionIds];
  const staleQuestions = await questionModel.deleteMany({
    _id: { $nin: referenced },
  });

  console.log(
    `🗑️  정리: 노드 ${staleNodes.deletedCount} · 레슨 ${staleLessons.deletedCount} · 문항 ${staleQuestions.deletedCount}`,
  );

  console.log('🎉 시딩 완료! (진행도 유지됨)');
  await app.close();
}

seed().catch((err) => {
  console.error('❌ 시딩 실패:', err);
  process.exit(1);
});
