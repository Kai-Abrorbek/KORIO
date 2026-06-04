import { Controller, Get } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // 레벨 테스트 문제 10개 가져오기
  @Get('level-test')
  async getLevelTestQuestions() {
    return this.lessonsService.getLevelTestQuestions();
  }
}
