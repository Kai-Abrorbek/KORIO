import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { LessonsService } from '../lessons/lessons.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('grammar')
@UseGuards(JwtAuthGuard)
export class GrammarController {
  constructor(
    private readonly grammarService: GrammarService,
    private readonly lessonsService: LessonsService,
  ) {}

  // section·unit 을 같이 주면 그 하루치 문법만 (학습 로드 모드). 없으면 전체 목록.
  @Get()
  async list(
    @Request() req,
    @Query('lang') lang = 'uz',
    @Query('section') section?: string,
    @Query('unit') unit?: string,
  ) {
    const s = Number(section);
    const u = Number(unit);
    const scope =
      Number.isInteger(s) && s > 0 && Number.isInteger(u) && u > 0
        ? { section: s, unit: u }
        : undefined;

    return this.grammarService.listGrammar(
      req.user._id.toString(),
      lang,
      scope,
    );
  }

  @Post(':code/complete')
  async complete(@Request() req, @Param('code') code: string) {
    const userId = req.user._id.toString();
    const result = await this.grammarService.completeGrammar(userId, code);
    // 문법 공부도 "학습 모드 완료" — 그날 첫 완료면 도장, 3·6·9…일째면 상자
    const celebration = await this.lessonsService
      .celebrateStudyDay(userId)
      .catch(() => null);
    return { ...result, celebration };
  }

  // scoped=1 이면 "다음 문법" 을 그 문법이 속한 유닛 안에서만 찾는다
  @Get(':code')
  async getOne(
    @Param('code') code: string,
    @Query('lang') lang = 'uz',
    @Query('scoped') scoped?: string,
  ) {
    return this.grammarService.getGrammar(code, lang, scoped === '1');
  }
}
