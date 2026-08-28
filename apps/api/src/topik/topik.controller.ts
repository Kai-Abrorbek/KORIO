import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SaveTopikAnswersDto } from './dto/save-topik-answers.dto';
import { StartTopikAttemptDto } from './dto/start-topik-attempt.dto';
import { TopikSessionQueryDto } from './dto/topik-session-query.dto';
import { TopikStatsQueryDto } from './dto/topik-stats-query.dto';
import { TopikService } from './topik.service';
import { TopikStatsService } from './topik-stats.service';
import { TopikRecipeService } from './topik-recipe.service';

interface AuthenticatedTopikRequest {
  user: { _id: { toString(): string } };
}

@Controller('topik')
// 유료 콘텐츠다. 예전엔 recipes / exams 계열이 가드 없이 열려 있어서
// API 주소만 알면 전부 긁어갈 수 있었다. 컨트롤러 전체를 로그인 뒤로 옮긴다.
@UseGuards(JwtAuthGuard)
export class TopikController {
  constructor(
    private readonly topikService: TopikService,
    private readonly topikStatsService: TopikStatsService,
    private readonly topikRecipeService: TopikRecipeService,
  ) {}

  // ── 유형별 학습 (합격 레시피) ──
  @Get('recipes')
  listRecipes(@Query('section') section?: string) {
    return this.topikRecipeService.list(section);
  }

  @Get('recipes/:groupCode')
  getRecipe(@Param('groupCode') groupCode: string) {
    return this.topikRecipeService.detail(groupCode);
  }

  @Get('recipes/:groupCode/practice')
  getRecipePractice(@Param('groupCode') groupCode: string) {
    return this.topikRecipeService.practice(groupCode);
  }

  @Get('recipes/:groupCode/practice/solutions')
  getRecipePracticeSolutions(@Param('groupCode') groupCode: string) {
    return this.topikRecipeService.practiceSolutions(groupCode);
  }

  @Get('exams')
  getExams() {
    return this.topikService.getExams();
  }

  @Get('exams/completed')
  getCompletedExams(@Request() request: AuthenticatedTopikRequest) {
    return this.topikService.getCompletedExams(request.user._id.toString());
  }

  @Get('exams/:code/session')
  getExamSession(
    @Param('code') code: string,
    @Query() query: TopikSessionQueryDto,
  ) {
    return this.topikService.getExamSession(code, query.from, query.to);
  }

  @Post('exams/:code/attempts')
  startAttempt(
    @Request() request,
    @Param('code') code: string,
    @Body() dto: StartTopikAttemptDto,
  ) {
    return this.topikService.startAttempt(
      request.user._id.toString(),
      code,
      dto,
    );
  }

  @Get('stats/summary')
  getStatsSummary(@Request() request, @Query() query: TopikStatsQueryDto) {
    return this.topikStatsService.getSummary(
      request.user._id.toString(),
      query.examType,
      query.section,
    );
  }

  @Get('stats/question-types')
  getQuestionTypeStats(@Request() request, @Query() query: TopikStatsQueryDto) {
    return this.topikStatsService.getQuestionTypes(
      request.user._id.toString(),
      query.examType,
      query.section,
    );
  }

  @Get('stats/weak-questions')
  getWeakQuestions(@Request() request, @Query() query: TopikStatsQueryDto) {
    return this.topikStatsService.getWeakQuestions(
      request.user._id.toString(),
      query.limit,
      query.examType,
      query.section,
    );
  }

  @Get('stats/mastered-questions')
  getMasteredQuestions(@Request() request, @Query() query: TopikStatsQueryDto) {
    return this.topikStatsService.getMasteredQuestions(
      request.user._id.toString(),
      query.limit,
      query.examType,
      query.section,
    );
  }

  @Get('stats/review-queue')
  getReviewQueue(@Request() request, @Query() query: TopikStatsQueryDto) {
    return this.topikStatsService.getReviewQueue(
      request.user._id.toString(),
      query.limit,
      query.examType,
      query.section,
    );
  }

  @Get('stats/history')
  getStatsHistory(@Request() request, @Query() query: TopikStatsQueryDto) {
    return this.topikStatsService.getHistory(
      request.user._id.toString(),
      query.limit,
      query.examType,
      query.section,
    );
  }

  @Get('attempts/:attemptId')
  getAttempt(@Request() request, @Param('attemptId') attemptId: string) {
    return this.topikService.getAttempt(request.user._id.toString(), attemptId);
  }

  @Get('attempts/:attemptId/questions/:questionId/learning-support')
  getLearningSupport(
    @Request() request,
    @Param('attemptId') attemptId: string,
    @Param('questionId') questionId: string,
  ) {
    return this.topikService.getLearningSupport(
      request.user._id.toString(),
      attemptId,
      questionId,
    );
  }

  @Post('attempts/:attemptId/questions/:questionId/hints/:hintKey/reveal')
  revealHint(
    @Request() request,
    @Param('attemptId') attemptId: string,
    @Param('questionId') questionId: string,
    @Param('hintKey') hintKey: string,
  ) {
    return this.topikService.revealHint(
      request.user._id.toString(),
      attemptId,
      questionId,
      hintKey,
    );
  }

  @Post('attempts/:attemptId/questions/:questionId/solution/reveal')
  revealSolution(
    @Request() request,
    @Param('attemptId') attemptId: string,
    @Param('questionId') questionId: string,
  ) {
    return this.topikService.revealSolution(
      request.user._id.toString(),
      attemptId,
      questionId,
    );
  }

  @Patch('attempts/:attemptId/answers')
  saveAnswers(
    @Request() request,
    @Param('attemptId') attemptId: string,
    @Body() dto: SaveTopikAnswersDto,
  ) {
    return this.topikService.saveAnswers(
      request.user._id.toString(),
      attemptId,
      dto,
    );
  }

  @Post('attempts/:attemptId/submit')
  submitAttempt(@Request() request, @Param('attemptId') attemptId: string) {
    return this.topikService.submitAttempt(
      request.user._id.toString(),
      attemptId,
    );
  }

  @Get('attempts/:attemptId/result')
  getAttemptResult(@Request() request, @Param('attemptId') attemptId: string) {
    return this.topikService.getAttemptResult(
      request.user._id.toString(),
      attemptId,
    );
  }
}
