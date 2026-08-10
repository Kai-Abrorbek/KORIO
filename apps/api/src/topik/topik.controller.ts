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

interface AuthenticatedTopikRequest {
  user: { _id: { toString(): string } };
}

@Controller('topik')
export class TopikController {
  constructor(
    private readonly topikService: TopikService,
    private readonly topikStatsService: TopikStatsService,
  ) {}

  @Get('exams')
  getExams() {
    return this.topikService.getExams();
  }

  @UseGuards(JwtAuthGuard)
  @Get('exams/completed')
  getCompletedExams(@Request() request: AuthenticatedTopikRequest) {
    return this.topikService.getCompletedExamIds(request.user._id.toString());
  }

  @Get('exams/:code/session')
  getExamSession(
    @Param('code') code: string,
    @Query() query: TopikSessionQueryDto,
  ) {
    return this.topikService.getExamSession(code, query.from, query.to);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('stats/summary')
  getStatsSummary(@Request() request) {
    return this.topikStatsService.getSummary(request.user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/question-types')
  getQuestionTypeStats(@Request() request) {
    return this.topikStatsService.getQuestionTypes(request.user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/weak-questions')
  getWeakQuestions(@Request() request, @Query() query: TopikStatsQueryDto) {
    return this.topikStatsService.getWeakQuestions(
      request.user._id.toString(),
      query.limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/mastered-questions')
  getMasteredQuestions(@Request() request, @Query() query: TopikStatsQueryDto) {
    return this.topikStatsService.getMasteredQuestions(
      request.user._id.toString(),
      query.limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/review-queue')
  getReviewQueue(@Request() request, @Query() query: TopikStatsQueryDto) {
    return this.topikStatsService.getReviewQueue(
      request.user._id.toString(),
      query.limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/history')
  getStatsHistory(@Request() request, @Query() query: TopikStatsQueryDto) {
    return this.topikStatsService.getHistory(
      request.user._id.toString(),
      query.limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('attempts/:attemptId')
  getAttempt(@Request() request, @Param('attemptId') attemptId: string) {
    return this.topikService.getAttempt(request.user._id.toString(), attemptId);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post('attempts/:attemptId/submit')
  submitAttempt(@Request() request, @Param('attemptId') attemptId: string) {
    return this.topikService.submitAttempt(
      request.user._id.toString(),
      attemptId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('attempts/:attemptId/result')
  getAttemptResult(@Request() request, @Param('attemptId') attemptId: string) {
    return this.topikService.getAttemptResult(
      request.user._id.toString(),
      attemptId,
    );
  }
}
