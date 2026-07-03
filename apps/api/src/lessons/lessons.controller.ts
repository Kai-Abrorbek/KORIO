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
    return this.lessonsService.getLessons(req.user._id.toString());
  }

  // 레벨 테스트 문제
  @Get('level-test')
  async getLevelTestQuestions(@Query('lang') lang: string = 'uz') {
    return this.lessonsService.getLevelTestQuestions(lang);
  }

  @UseGuards(JwtAuthGuard)
  @Get('roadmap')
  async getRoadmap(@Request() req, @Query('lang') lang: string = 'uz') {
    return this.lessonsService.getRoadmap(req.user._id.toString(), lang);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mistakes')
  async getMistakes(@Request() req) {
    return this.lessonsService.getMistakes(req.user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Get('learned-words')
  async getLearnedWords(@Request() req) {
    return this.lessonsService.getLearnedWords(req.user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Get('word-practice')
  async getWordPractice(@Request() req) {
    return this.lessonsService.getWordPracticeQuestions(
      req.user._id.toString(),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('mistake-questions')
  async getMistakeQuestions(
    @Request() req,
    @Query('lang') lang: string = 'uz',
  ) {
    return this.lessonsService.getMistakeQuestions(
      req.user._id.toString(),
      lang,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('mistakes/resolve')
  async resolveMistakes(
    @Request() req,
    @Body() body: { correctIds: string[] },
  ) {
    return this.lessonsService.resolveMistakes(
      req.user._id.toString(),
      body.correctIds ?? [],
    );
  }

  // 레슨 완료 저장
  @UseGuards(JwtAuthGuard)
  @Post(':id/complete')
  async completeLesson(
    @Param('id') id: string,
    @Body() dto: CompleteLessonDto,
    @Request() req,
  ) {
    return this.lessonsService.completeLesson(id, req.user._id.toString(), dto);
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
