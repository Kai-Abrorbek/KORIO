import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>,
  ) {}

  // 레벨 테스트용 문제 10개 랜덤으로 가져오기 (1급~6급 골고루)
  async getLevelTestQuestions(): Promise<Question[]> {
    const questions: Question[] = [];

    // 1~3급 쉬운 문제 6개, 4~6급 어려운 문제 4개
    const easyQuestions = await this.questionModel.aggregate([
      { $match: { level: { $in: ['1', '2', '3'] } } },
      { $sample: { size: 6 } },
    ]);

    const hardQuestions = await this.questionModel.aggregate([
      { $match: { level: { $in: ['4', '5', '6'] } } },
      { $sample: { size: 4 } },
    ]);

    questions.push(...easyQuestions, ...hardQuestions);

    // 섞기
    return questions.sort(() => Math.random() - 0.5);
  }
}
