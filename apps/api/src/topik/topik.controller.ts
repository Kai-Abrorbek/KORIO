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
import { TopikService } from './topik.service';

@Controller('topik')
export class TopikController {
  constructor(private readonly topikService: TopikService) {}

  @Get('exams')
  getExams() {
    return this.topikService.getExams();
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
  @Get('attempts/:attemptId')
  getAttempt(@Request() request, @Param('attemptId') attemptId: string) {
    return this.topikService.getAttempt(
      request.user._id.toString(),
      attemptId,
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
  getAttemptResult(
    @Request() request,
    @Param('attemptId') attemptId: string,
  ) {
    return this.topikService.getAttemptResult(
      request.user._id.toString(),
      attemptId,
    );
  }
}
