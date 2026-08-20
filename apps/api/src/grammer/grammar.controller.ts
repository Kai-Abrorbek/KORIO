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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('grammar')
@UseGuards(JwtAuthGuard)
export class GrammarController {
  constructor(private readonly grammarService: GrammarService) {}

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
    return this.grammarService.completeGrammar(req.user._id.toString(), code);
  }

  @Get(':code')
  async getOne(@Param('code') code: string, @Query('lang') lang = 'uz') {
    return this.grammarService.getGrammar(code, lang);
  }
}
