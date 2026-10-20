import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question } from '../lessons/schemas/question.schema';
import { Lesson } from '../lessons/schemas/lesson.schema';
import { LessonNode } from '../lessons/schemas/node.schema';
import { questionXp } from '../lessons/economy.const';
import { parseSeedCourseScope } from './course-seed.options';
import { buildVocabularyCourseSeed } from './vocabulary-course.data';

async function seed() {
  // Build every reference before opening a database connection or writing anything.
  const { scope, questions, nodes } = buildVocabularyCourseSeed(
    parseSeedCourseScope(),
  );
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const questionModel = app.get<Model<Question>>(
      getModelToken(Question.name),
    );
    const lessonModel = app.get<Model<Lesson>>(getModelToken(Lesson.name));
    const nodeModel = app.get<Model<LessonNode>>(
      getModelToken(LessonNode.name),
    );

    console.log(
      `🌱 ${scope.courseId} 시딩 시작 (upsert — 기존 ID·진행도 유지)...`,
    );
    for (const nodeData of nodes) {
      const { lessons, ...nodeInfo } = nodeData;
      const node = await nodeModel.findOneAndUpdate(
        { code: nodeInfo.code },
        { $set: nodeInfo },
        { upsert: true, returnDocument: 'after', runValidators: true },
      );
      const lessonIds: Types.ObjectId[] = [];
      for (const lessonData of lessons) {
        const { questions: questionCodes, ...lessonInfo } = lessonData;
        const questionIds: Types.ObjectId[] = [];
        let xpReward = 0;
        for (const code of questionCodes) {
          const question = await questionModel.findOneAndUpdate(
            { code },
            { $set: questions[code] },
            { upsert: true, returnDocument: 'after', runValidators: true },
          );
          questionIds.push(question._id);
          xpReward += questionXp(question);
        }
        const lesson = await lessonModel.findOneAndUpdate(
          { code: lessonInfo.code },
          {
            $set: {
              ...lessonInfo,
              nodeId: node._id,
              section: nodeInfo.section,
              unit: nodeInfo.unit,
              questionIds,
              xpReward,
              isActive: true,
            },
          },
          { upsert: true, returnDocument: 'after', runValidators: true },
        );
        lessonIds.push(lesson._id);
        console.log(
          `  ✅ 레슨: ${lessonInfo.title.ko} (${lessonInfo.code}, 문제 ${questionIds.length}개)`,
        );
      }
      await nodeModel.findByIdAndUpdate(node._id, { lessonIds });
    }
    // Never perform global orphan cleanup here: another language, course or
    // expression track can share these collections. Retirement is a separate,
    // explicitly reviewed operation, not a side effect of reseeding one course.
    console.log(
      `🎉 ${scope.courseId} 시딩 완료! 기존 문서·진행도를 삭제하지 않았습니다.`,
    );
  } finally {
    await app.close();
  }
}

seed().catch((error) => {
  console.error('❌ 시딩 실패:', error);
  process.exit(1);
});
