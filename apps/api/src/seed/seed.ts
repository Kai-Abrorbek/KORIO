import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../lessons/schemas/question.schema';
import { Lesson, LessonCategory } from '../lessons/schemas/lesson.schema';
import { UNIT1_QUESTIONS, UNIT1_LESSONS } from './data/unit1';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const questionModel = app.get<Model<Question>>(getModelToken(Question.name));
  const lessonModel = app.get<Model<Lesson>>(getModelToken(Lesson.name));

  console.log('🌱 시딩 시작...');

  await questionModel.deleteMany({});
  await lessonModel.deleteMany({});
  console.log('🗑️  기존 데이터 삭제 완료');

  // 전체 문제 맵
  const allQuestions = { ...UNIT1_QUESTIONS };
  // 나중에 2과, 3과 추가 시: ...UNIT2_QUESTIONS, ...UNIT3_QUESTIONS
  const allLessons = [...UNIT1_LESSONS];

  for (const lessonData of allLessons) {
    const { questions: qKeys, ...lesson } = lessonData;

    const createdQuestions = await questionModel.insertMany(
      qKeys.map((key) => allQuestions[key]),
    );

    const questionIds = createdQuestions.map((q) => q._id);

    await lessonModel.create({
      title: lesson.title,
      description: lesson.description,
      category: lesson.category as LessonCategory,
      level: lesson.level,
      section: lesson.section,
      unit: lesson.unit,
      order: lesson.order,
      isActive: lesson.isActive,
      questionIds,
      xpReward: qKeys.length * 15,
    });

    console.log(`✅ 레슨 생성: ${lesson.title.ko} (문제 ${qKeys.length}개)`);
  }

  console.log('🎉 시딩 완료!');
  await app.close();
}

seed().catch((err) => {
  console.error('❌ 시딩 실패:', err);
  process.exit(1);
});
