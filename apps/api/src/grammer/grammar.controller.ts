import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('grammar')
@UseGuards(JwtAuthGuard)
export class GrammarController {
  constructor(private readonly grammarService: GrammarService) {}

  @Get()
  async list(@Query('lang') lang = 'uz') {
    return this.grammarService.listGrammar(lang);
  }

  @Get(':code')
  async getOne(@Param('code') code: string, @Query('lang') lang = 'uz') {
    return this.grammarService.getGrammar(code, lang);
  }
}
