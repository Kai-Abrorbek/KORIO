import { Module } from '@nestjs/common';
import { LearningCoursesController } from './learning-courses.controller';

@Module({ controllers: [LearningCoursesController] })
export class LearningCoursesModule {}
