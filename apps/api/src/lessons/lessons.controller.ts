import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { ChestService } from './chest.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompleteLessonDto } from './dto/complete-lesson.dto';
import { CompletePracticeDto } from './dto/complete-practice.dto';
import { SelfReportedLevel } from '../common/enums/self-level.enum';
import { GradeAnswerDto } from './dto/grade-answer.dto';
import { AnswerGradingService } from './answer-grading.service';
import { isStudyQuizKind } from '../study-path/study-path.types';
import {
  CompleteUnitJumpDto,
  ResolveMistakesDto,
} from './dto/jump-complete.dto';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly answerGradingService: AnswerGradingService,
    private readonly chestService: ChestService,
  ) {}

  // 로드맵용 레슨 목록
  @UseGuards(JwtAuthGuard)
  @Get()
  async getLessons(@Request() req) {
    return this.lessonsService.getLessons(req.user._id.toString());
  }

  // 레벨 테스트 문제
  @Get('level-test')
  async getLevelTestQuestions(
    @Query('self') self: SelfReportedLevel,
    @Query('lang') lang: string = 'uz',
  ) {
    return this.lessonsService.getLevelTestQuestions(self, lang);
  }

  @UseGuards(JwtAuthGuard)
  @Get('roadmap')
  async getRoadmap(
    @Request() req,
    @Query('lang') lang: string = 'uz',
    @Query('category') category?: string,
    @Query('viewSection') viewSection?: string,
  ) {
    // 클라가 보낸 섹션 번호는 그대로 안 믿는다 — 서비스가 "현재 섹션 이하" 인지
    // 다시 본다. 여기선 숫자 모양만 거른다
    const parsed = Number(viewSection);
    return this.lessonsService.getRoadmap(
      req.user._id.toString(),
      lang,
      category,
      false,
      Number.isInteger(parsed) && parsed > 0 ? parsed : undefined,
    );
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
    @Body() dto: ResolveMistakesDto,
  ) {
    return this.lessonsService.resolveMistakes(
      req.user._id.toString(),
      dto.correctIds ?? [],
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
  // 학습 로드 모드 — 하루(=유닛) 노드용 문제.
  // kind: review | vocabQuiz | recap | grammarQuiz | final
  // group: 같은 종류가 여럿일 때 몇 번째 노드인지, lesson: 그 안의 몇 번째 링인지
  @Get('unit-practice')
  async getUnitPractice(
    @Request() req,
    @Query('section') section: string,
    @Query('unit') unit: string,
    @Query('kind') kind?: string,
    @Query('lang') lang?: string,
    @Query('group') group?: string,
    @Query('lesson') lesson?: string,
  ) {
    const s = Number(section);
    const u = Number(unit);
    if (!Number.isInteger(s) || s < 1 || !Number.isInteger(u) || u < 1) {
      throw new BadRequestException('INVALID_UNIT_SCOPE');
    }
    if (!isStudyQuizKind(kind)) {
      throw new BadRequestException('INVALID_STUDY_KIND');
    }

    return this.lessonsService.getUnitPractice(
      req.user._id.toString(),
      s,
      u,
      kind,
      lang ?? 'uz',
      Math.max(1, Number(group) || 1),
      Math.max(1, Number(lesson) || 1),
    );
  }

  /** 안 받은 상자 수. 화면이 상자를 빛나게 할지 정한다 */
  @UseGuards(JwtAuthGuard)
  @Get('chests')
  async getChests(@Request() req) {
    return {
      count: await this.chestService.pendingCount(req.user._id.toString()),
    };
  }

  /**
   * 안 받은 상자를 전부 받는다.
   *
   * 화면의 상자는 3노드마다 놓인 이정표라 벌어들인 상자와 1:1 이 아니다.
   * 하나씩 짝지으면 짝 없는 상자가 영영 안 받아진 채 남는다.
   */
  @UseGuards(JwtAuthGuard)
  @Post('chests/claim')
  async claimChests(@Request() req) {
    return this.chestService.claimAll(req.user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Get('score')
  async getScore(@Request() req, @Query('lang') lang?: string) {
    return this.lessonsService.getScore(req.user._id.toString(), lang || 'uz');
  }

  @UseGuards(JwtAuthGuard)
  @Post('practice-complete')
  async completePractice(@Request() req, @Body() dto: CompletePracticeDto) {
    return this.lessonsService.completePractice(req.user._id.toString(), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('jump-test')
  async getUnitJumpTest(
    @Request() req,
    @Query('section') section: string,
    @Query('unit') unit: string,
    @Query('lang') lang = 'uz',
    @Query('category') category?: string,
  ) {
    return this.lessonsService.getUnitJumpTest(
      req.user._id.toString(),
      Number(section),
      Number(unit),
      lang,
      category,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('jump-complete')
  async completeUnitJump(
    @Request() req,
    @Body() dto: CompleteUnitJumpDto,
  ) {
    return this.lessonsService.completeUnitJump(
      req.user._id.toString(),
      dto.attemptId,
      dto.wrongQuestionIds ?? [],
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('nodes/:nodeId/legend-complete')
  async completeLegend(@Request() req, @Param('nodeId') nodeId: string) {
    return this.lessonsService.completeLegend(req.user._id.toString(), nodeId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('questions/:questionId/grade')
  async gradeTypedAnswer(
    @Param('questionId') questionId: string,
    @Body() dto: GradeAnswerDto,
  ) {
    return this.answerGradingService.grade(questionId, dto.answer, dto.lang);
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
