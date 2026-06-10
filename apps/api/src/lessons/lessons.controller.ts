import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompleteLessonDto } from './dto/complete-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // 로드맵용 레슨 목록
  @UseGuards(JwtAuthGuard)
  @Get()
  async getLessons(@Request() req) {
    return this.lessonsService.getLessons(req.user.userId);
  }

  // 레벨 테스트 문제
  @Get('level-test')
  async getLevelTestQuestions(@Query('lang') lang: string = 'uz') {
    return this.lessonsService.getLevelTestQuestions(lang);
  }

  @UseGuards(JwtAuthGuard)
  @Get('roadmap')
  async getRoadmap(@Request() req, @Query('lang') lang: string = 'uz') {
    return this.lessonsService.getRoadmap(req.user.userId, lang);
  }

  // 레슨 완료 저장
  @UseGuards(JwtAuthGuard)
  @Post(':id/complete')
  async completeLesson(
    @Param('id') id: string,
    @Body() dto: CompleteLessonDto,
    @Request() req,
  ) {
    return this.lessonsService.completeLesson(id, req.user.userId, dto);
  }

  // 레슨 상세 + 문제들
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getLessonById(
    @Param('id') id: string,
    @Query('lang') lang: string = 'uz',
  ) {
    return this.lessonsService.getLessonById(id, lang);
  }
}
