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

@UseGuards(JwtAuthGuard)
@Controller('expressions')
export class ExpressionsController {
  constructor(
    private readonly expressionsService: ExpressionsService,
    private readonly expressionRoadmapService: ExpressionRoadmapService,
    private readonly expressionLearningService: ExpressionLearningService,
    private readonly speakingProgressService: SpeakingProgressService,
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
    return this.expressionsService.completePractice(
      req.user._id.toString(),
      packCode,
      dto,
    );
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
    return this.speakingProgressService.save(
      req.user._id.toString(),
      packCode,
      dto.index,
      dto.total,
    );
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
