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
import { resolveCourseScope } from '../common/learning-course';
import { LessonsService } from '../lessons/lessons.service';
import {
  CompleteStoryDto,
  ListStoriesQueryDto,
  StoryLangQueryDto,
} from './dto/story-query.dto';
import { StoriesService } from './stories.service';

interface AuthenticatedRequest {
  user: { _id: { toString(): string } };
}

@UseGuards(JwtAuthGuard)
@Controller('stories')
export class StoriesController {
  constructor(
    private readonly storiesService: StoriesService,
    private readonly lessonsService: LessonsService,
  ) {}

  @Get()
  list(
    @Request() req: AuthenticatedRequest,
    @Query() query: ListStoriesQueryDto,
  ) {
    return this.storiesService.list(
      resolveCourseScope(query),
      query.lang,
      req.user._id.toString(),
    );
  }

  @Get(':code')
  getByCode(
    @Request() req: AuthenticatedRequest,
    @Param('code') code: string,
    @Query() query: StoryLangQueryDto,
  ) {
    return this.storiesService.getByCode(
      code,
      query.lang,
      req.user._id.toString(),
    );
  }

  @Post(':code/complete')
  async complete(
    @Request() req: AuthenticatedRequest,
    @Param('code') code: string,
    @Body() dto: CompleteStoryDto,
  ) {
    const userId = req.user._id.toString();
    const result = await this.storiesService.complete(userId, code, dto);
    // 듣기도 "학습 모드 완료" — 그날 첫 완료면 도장, 3·6·9…일째면 상자
    const celebration = await this.lessonsService
      .celebrateStudyDay(userId)
      .catch(() => null);
    return { ...result, celebration };
  }
}
