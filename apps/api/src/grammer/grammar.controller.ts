import { Controller, Get, Param, Query } from '@nestjs/common';
import { GrammarService } from './grammar.service';

@Controller('grammar')
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
