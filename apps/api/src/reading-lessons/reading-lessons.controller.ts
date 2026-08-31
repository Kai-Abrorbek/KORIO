import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompleteReadingLessonDto } from './dto/complete-reading-lesson.dto';
import { ListReadingLessonsQueryDto } from './dto/list-reading-lessons-query.dto';
import { ReadingLessonsService } from './reading-lessons.service';

@UseGuards(JwtAuthGuard)
@Controller('reading-lessons')
export class ReadingLessonsController {
  constructor(private readonly readingLessonsService: ReadingLessonsService) {}

  @Get()
  list(@Request() req, @Query() query: ListReadingLessonsQueryDto) {
    return this.readingLessonsService.list(query, req.user._id.toString());
  }

  @Get(':code')
  getByCode(@Request() req, @Param('code') code: string) {
    return this.readingLessonsService.getByCode(
      code,
      req.user._id.toString(),
    );
  }

  /**
   * 완료 보고. 고른 답과 쓴 글만 받고 채점·XP 는 서버가 한다.
   * 낭독 완료는 여기로 안 온다 — 발음 평가 중에 서버가 직접 찍는다.
   */
  @Post(':code/complete')
  complete(
    @Request() req,
    @Param('code') code: string,
    @Body() dto: CompleteReadingLessonDto,
  ) {
    return this.readingLessonsService.complete(
      req.user._id.toString(),
      code,
      dto,
    );
  }
}
