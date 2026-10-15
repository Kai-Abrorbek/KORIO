import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LearnProgressQueryDto } from './dto/learn-progress-query.dto';
import { LearnProgressService } from './learn-progress.service';

interface AuthenticatedRequest {
  user: { _id: { toString(): string } };
}

@Controller('learn-progress')
@UseGuards(JwtAuthGuard)
export class LearnProgressController {
  constructor(private readonly learnProgressService: LearnProgressService) {}

  /** 홈 카드 — 지금 코스·모드의 진행도. 셀 게 없으면 progress: null */
  @Get()
  async get(
    @Request() req: AuthenticatedRequest,
    @Query() query: LearnProgressQueryDto,
  ) {
    const progress = await this.learnProgressService.get(
      req.user._id.toString(),
      query,
    );
    return { progress };
  }
}
