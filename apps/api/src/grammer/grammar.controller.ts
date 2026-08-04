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

  @Get()
  async list(@Request() req, @Query('lang') lang = 'uz') {
    return this.grammarService.listGrammar(req.user._id.toString(), lang);
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
