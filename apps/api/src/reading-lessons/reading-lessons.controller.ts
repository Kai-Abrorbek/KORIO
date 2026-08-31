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
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { CompleteReadingLessonDto } from './dto/complete-reading-lesson.dto';
import { GlossWordDto } from './dto/gloss-word.dto';
import { GLOSS_RATE_LIMIT } from './reading-gloss.const';
import { ListReadingLessonsQueryDto } from './dto/list-reading-lessons-query.dto';
import { ReadingLessonsService } from './reading-lessons.service';

@UseGuards(JwtAuthGuard, RateLimitGuard)
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

  /**
   * 단어 하나 뜻보기.
   *
   * 정상 경로는 아니다 — 뜻은 레슨을 받을 때 통째로 같이 온다. 여기는 시드에
   * 빠진 단어를 한 번 채우는 자리라, 시드가 채워질수록 호출이 줄어든다.
   * 모델을 부르는 경로라서 횟수를 묶어둔다.
   */
  @RateLimit(GLOSS_RATE_LIMIT)
  @Post(':code/gloss')
  gloss(@Param('code') code: string, @Body() dto: GlossWordDto) {
    return this.readingLessonsService.glossWord(code, dto.word);
  }
}
