import { Controller, Get } from '@nestjs/common';
import { LEARNING_COURSES } from '../common/learning-course';

@Controller('learning-courses')
export class LearningCoursesController {
  @Get()
  getCourses() {
    return { items: LEARNING_COURSES };
  }
}
