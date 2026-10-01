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
import { CompleteExpressionPracticeDto } from './dto/complete-expression-practice.dto';
import { ExpressionLanguageQueryDto } from './dto/expression-language-query.dto';
import { ExpressionScopeQueryDto } from './dto/expression-scope-query.dto';
import { ListExpressionsQueryDto } from './dto/list-expressions-query.dto';
import { ReviewExpressionDto } from './dto/review-expression.dto';
import { SaveSpeakingProgressDto } from './dto/save-speaking-progress.dto';
import { ToggleExpressionSavedDto } from './dto/toggle-expression-saved.dto';
import { ExpressionsService } from './expressions.service';
import { ExpressionLearningService } from './learning/expression-learning.service';
import { ExpressionRoadmapService } from './roadmap/expression-roadmap.service';
import { SpeakingProgressService } from './speaking/speaking-progress.service';
import { LessonsService } from '../lessons/lessons.service';
import { StudyCategory } from '../users/utils/study-category.util';

@UseGuards(JwtAuthGuard)
@Controller('expressions')
export class ExpressionsController {
  constructor(
    private readonly expressionsService: ExpressionsService,
    private readonly expressionRoadmapService: ExpressionRoadmapService,
    private readonly expressionLearningService: ExpressionLearningService,
    private readonly speakingProgressService: SpeakingProgressService,
    private readonly lessonsService: LessonsService,
  ) {}

  @Get('roadmap')
  async getRoadmap(
    @Request() req,
    @Query() query: ExpressionLanguageQueryDto,
  ) {
    return this.expressionRoadmapService.getRoadmap(
      req.user._id.toString(),
      query.lang,
    );
  }

  @Get('nodes/:nodeCode/learning')
  async getNodeLearning(
    @Request() req,
    @Param('nodeCode') nodeCode: string,
    @Query() query: ExpressionLanguageQueryDto,
  ) {
    return this.expressionLearningService.getNodeLearning(
      req.user._id.toString(),
      nodeCode,
      query.lang,
    );
  }

  /**
   * 표현 카드 학습(노드) 완료.
   *
   * 카드 학습은 본 표현만 기록(views)하고 학습 통계에는 안 남아서, 표현만 공부한
   * 날은 연속 학습일로 안 쳐졌다. 여기서 하루 학습으로 남기고(1건, XP 없음)
   * 그날 첫 완료면 도장, 3·6·9…일째면 상자를 준다. 잠긴·없는 노드는 404/403.
   */
  @Post('nodes/:nodeCode/complete')
  async completeNodeLearning(
    @Request() req,
    @Param('nodeCode') nodeCode: string,
  ) {
    const userId = req.user._id.toString();
    await this.expressionLearningService.getNodeLearning(userId, nodeCode, 'uz');
    await this.lessonsService.recordStudy(userId, {
      questionCount: 1,
      overrideCategory: StudyCategory.EXPRESSION,
      xpEarned: 0,
    });
    const celebration = await this.lessonsService
      .celebrateStudyDay(userId)
      .catch(() => null);
    return { success: true, celebration };
  }

  @Get('overview')
  async getOverview(
    @Request() req,
    @Query() query: ExpressionScopeQueryDto,
  ) {
    return this.expressionsService.getOverview(
      req.user._id.toString(),
      query,
    );
  }

  @Get('saved')
  async getSaved(
    @Request() req,
    @Query() query: ExpressionScopeQueryDto,
  ) {
    return this.expressionsService.getSaved(req.user._id.toString(), query);
  }

  @Get('review')
  async getReviewQueue(
    @Request() req,
    @Query() query: ExpressionScopeQueryDto,
  ) {
    return this.expressionsService.getReviewQueue(
      req.user._id.toString(),
      query,
    );
  }

  @Get('packs/:packCode/practice')
  async getPractice(
    @Param('packCode') packCode: string,
    @Query() query: ExpressionScopeQueryDto,
  ) {
    return this.expressionsService.getPractice(packCode, query);
  }

  @Post('packs/:packCode/practice-complete')
  async completePractice(
    @Request() req,
    @Param('packCode') packCode: string,
    @Body() dto: CompleteExpressionPracticeDto,
  ) {
    const userId = req.user._id.toString();
    const result = await this.expressionsService.completePractice(
      userId,
      packCode,
      dto,
    );
    // 표현 연습도 "학습 모드 완료" — 그날 첫 완료면 도장, 3·6·9…일째면 상자
    const celebration = await this.lessonsService
      .celebrateStudyDay(userId)
      .catch(() => null);
    return { ...result, celebration };
  }

  /** 말하기 연습 — 이 주제를 몇 번째 문장까지 했나 */
  @Get('packs/:packCode/speaking-progress')
  async getSpeakingProgress(
    @Request() req,
    @Param('packCode') packCode: string,
  ) {
    return this.speakingProgressService.get(req.user._id.toString(), packCode);
  }

  /**
   * 말하기 커서 저장. index 가 total 에 닿으면 서버가 0 으로 되돌리고
   * completedCount 를 올린다 — "끝냈다" 판정을 클라가 주장하게 두지 않는다.
   *
   * ⚠️ PUT 이 아니라 PATCH 다. main.ts 의 CORS methods 에 PUT 이 없어서
   * 웹에서 PUT 으로 부르면 프리플라이트에서 막힌다.
   */
  @Patch('packs/:packCode/speaking-progress')
  async saveSpeakingProgress(
    @Request() req,
    @Param('packCode') packCode: string,
    @Body() dto: SaveSpeakingProgressDto,
  ) {
    const userId = req.user._id.toString();
    const progress = await this.speakingProgressService.save(
      userId,
      packCode,
      dto.index,
      dto.total,
    );
    // 말하기 주제를 끝까지 말한 순간이 "완료" — 그날 첫 완료면 도장, 3·6·9…일째면 상자.
    // 문장별 학습 기록은 채점(assess-expression) 때 이미 남아 있다
    const celebration = progress.justCompleted
      ? await this.lessonsService.celebrateStudyDay(userId).catch(() => null)
      : null;
    return { ...progress, celebration };
  }

  @Get()
  async getExpressions(
    @Request() req,
    @Query() query: ListExpressionsQueryDto,
  ) {
    return this.expressionsService.getExpressions(
      req.user._id.toString(),
      query,
    );
  }

  @Get(':id')
  async getExpression(
    @Request() req,
    @Param('id') id: string,
    @Query() query: ExpressionLanguageQueryDto,
  ) {
    return this.expressionsService.getExpression(
      req.user._id.toString(),
      id,
      query,
    );
  }

  @Post(':id/views')
  async recordView(@Request() req, @Param('id') id: string) {
    return this.expressionsService.recordView(req.user._id.toString(), id);
  }

  @Patch(':id/saved')
  async setSaved(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: ToggleExpressionSavedDto,
  ) {
    return this.expressionsService.setSaved(
      req.user._id.toString(),
      id,
      dto.isSaved,
    );
  }

  @Post(':id/reviews')
  async reviewExpression(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: ReviewExpressionDto,
  ) {
    return this.expressionsService.reviewExpression(
      req.user._id.toString(),
      id,
      dto.result,
    );
  }
}
