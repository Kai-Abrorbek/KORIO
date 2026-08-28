import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListReadingLessonsQueryDto } from './dto/list-reading-lessons-query.dto';
import {
  ReadingLesson,
  ReadingLessonDocument,
} from './schemas/reading-lesson.schema';

@Injectable()
export class ReadingLessonsService {
  constructor(
    @InjectModel(ReadingLesson.name)
    private readonly readingLessonModel: Model<ReadingLessonDocument>,
  ) {}

  async list(query: ListReadingLessonsQueryDto) {
    const items = await this.readingLessonModel
      .find({ level: query.level, isActive: true })
      .select({
        code: 1,
        level: 1,
        unit: 1,
        order: 1,
        title: 1,
        topic: 1,
        estimatedMinutes: 1,
        media: 1,
      })
      .sort({ order: 1, unit: 1 })
      .lean();

    return {
      level: query.level,
      total: items.length,
      items: items.map((item) => ({
        id: item._id.toString(),
        code: item.code,
        level: item.level,
        unit: item.unit,
        order: item.order,
        title: item.title,
        topic: item.topic,
        estimatedMinutes: item.estimatedMinutes,
        media: item.media,
      })),
    };
  }

  async getByCode(code: string) {
    const lesson = await this.readingLessonModel
      .findOne({ code, isActive: true })
      .lean();

    if (!lesson) {
      throw new NotFoundException('READING_LESSON_NOT_FOUND');
    }

    return {
      ...lesson,
      id: lesson._id.toString(),
      _id: undefined,
      __v: undefined,
    };
  }
}
