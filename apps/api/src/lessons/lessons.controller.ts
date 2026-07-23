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
import { CompletePracticeDto } from './dto/complete-practice.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('node-review/:nodeId')
  async getNodeReview(
    @Param('nodeId') nodeId: string,
    @Query('lang') lang: string = 'uz',
    @Query('limit') limit?: string,
  ) {
    return this.lessonsService.getNodeReview(
      nodeId,
      lang,
      limit ? Number(limit) : 20,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('score')
  async getScore(@Request() req) {
    return this.lessonsService.getScore(req.user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Post('practice-complete')
  async completePractice(@Request() req, @Body() dto: CompletePracticeDto) {
    return this.lessonsService.completePractice(req.user._id.toString(), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-xp')
  async addXp(@Request() req, @Body() body: { amount: number }) {
    return this.lessonsService.addXp(req.user._id.toString(), body.amount ?? 0);
  }

  @UseGuards(JwtAuthGuard)
  @Get('jump-test')
  async getUnitJumpTest(
    @Request() req,
    @Query('section') section: string,
    @Query('unit') unit: string,
    @Query('lang') lang = 'uz',
  ) {
    return this.lessonsService.getUnitJumpTest(
      req.user._id.toString(),
      Number(section),
      Number(unit),
      lang,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('jump-complete')
  async completeUnitJump(
    @Request() req,
    @Body() body: { section: number; unit: number },
  ) {
    return this.lessonsService.completeUnitJump(
      req.user._id.toString(),
      body.section,
      body.unit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('nodes/:nodeId/legend-complete')
  async completeLegend(@Request() req, @Param('nodeId') nodeId: string) {
    return this.lessonsService.completeLegend(req.user._id.toString(), nodeId);
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
