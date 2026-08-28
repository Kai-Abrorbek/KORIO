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
import { GT_S2_NODES, GT_S2_QUESTIONS } from './data/grammar-track/section2';
import { questionXp } from '../lessons/economy.const';
import { GRAMMAR_SEED } from './data/grammar/grammar.data';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const questionModel = app.get<Model<Question>>(getModelToken(Question.name));
  const lessonModel = app.get<Model<Lesson>>(getModelToken(Lesson.name));
  const nodeModel = app.get<Model<LessonNode>>(getModelToken(LessonNode.name));

  const allNodes = [...GT_S1_NODES, ...GT_S2_NODES];
  const allQuestions = { ...GT_S1_QUESTIONS, ...GT_S2_QUESTIONS };

  // 문제 데이터는 문법을 code('topic-eun-neun')로 가리킨다. 그런데 화면
  // (GrammarBlank)은 tags[0] 을 "지금 연습 중인 문법" 라벨로 그대로 찍어서
  // 슬러그가 유저에게 보였다. 여기서 사람이 읽는 패턴('N은/는')으로 바꿔 넣는다.
  // 데이터는 code 로 연결한 채 두고 표시용 이름만 시딩할 때 붙이는 것이다.
  const patternByCode = new Map<string, string>(
    GRAMMAR_SEED.filter((g) => g?.code && g?.pattern).map((g) => [
      g.code as string,
      g.pattern as string,
    ]),
  );
  const missingPattern = new Set<string>();

  const labelTags = (tags: unknown): unknown => {
    if (!Array.isArray(tags)) return tags;
    return tags.map((t) => {
      if (typeof t !== 'string') return t;
      const pattern = patternByCode.get(t);
      if (pattern) return pattern;
      if (/^[a-z0-9-]+$/.test(t)) missingPattern.add(t);
      return t;
    });
  };

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
      // 레슨 기본 XP = 문제 xpReward 합계 (economy.const 참고)
      let lessonXp = 0;
      for (const key of qKeys) {
        if (!allQuestions[key]) {
          console.log('❌ 없는 문제 키:', key);
          continue;
        }
        const raw = allQuestions[key] as Record<string, unknown>;
        const q = await questionModel.findOneAndUpdate(
          { code: key },
          { $set: { ...raw, code: key, tags: labelTags(raw.tags) } },
          { upsert: true, returnDocument: 'after' },
        );
        questionIds.push(q._id);
        lessonXp += questionXp(q as { xpReward?: number; type?: string });
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
            xpReward: lessonXp,
            isActive: true,
          },
        },
        { upsert: true, returnDocument: 'after' },
      );

      lessonIds.push(lesson._id);
      console.log(
        `  ✅ 레슨: ${lessonInfo.title.ko} (${lessonCode}, 문제 ${questionIds.length}개, XP ${lessonXp})`,
      );
    }

    await nodeModel.findByIdAndUpdate(node._id, { lessonIds });
    console.log(
      `✅ 노드: ${nodeInfo.title.ko} (${nodeCode}, 레슨 ${lessonIds.length}개)`,
    );
  }

  if (missingPattern.size) {
    console.warn(
      `⚠️ 패턴을 못 찾은 문법 코드 ${missingPattern.size}개 — tags 에 슬러그가 그대로 남는다: ` +
        [...missingPattern].join(', '),
    );
  }

  console.log('🎉 문법 트랙 시딩 완료!');
  await app.close();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
