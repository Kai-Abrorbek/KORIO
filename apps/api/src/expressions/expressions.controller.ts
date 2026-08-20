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
import { ToggleExpressionSavedDto } from './dto/toggle-expression-saved.dto';
import { ExpressionsService } from './expressions.service';
import { ExpressionLearningService } from './learning/expression-learning.service';
import { ExpressionRoadmapService } from './roadmap/expression-roadmap.service';

@UseGuards(JwtAuthGuard)
@Controller('expressions')
export class ExpressionsController {
  constructor(
    private readonly expressionsService: ExpressionsService,
    private readonly expressionRoadmapService: ExpressionRoadmapService,
    private readonly expressionLearningService: ExpressionLearningService,
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
