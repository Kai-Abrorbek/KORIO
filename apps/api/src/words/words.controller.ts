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
import { ListWordsQueryDto } from './dto/list-words-query.dto';
import { ReviewQueueQueryDto } from './dto/review-queue-query.dto';
import { ReviewWordDto } from './dto/review-word.dto';
import { WordLanguageQueryDto } from './dto/word-language-query.dto';
import { WordsService } from './words.service';

@UseGuards(JwtAuthGuard)
@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  async getWords(@Request() req, @Query() query: ListWordsQueryDto) {
    return this.wordsService.getWords(req.user._id.toString(), query);
  }

  @Get('sections/:section/summary')
  async getSectionSummary(
    @Request() req,
    @Param('section') section: string,
  ) {
    return this.wordsService.getSectionSummary(
      req.user._id.toString(),
      Number(section),
    );
  }

  @Get('review')
  async getReviewQueue(
    @Request() req,
    @Query() query: ReviewQueueQueryDto,
  ) {
    return this.wordsService.getReviewQueue(req.user._id.toString(), query);
  }

  @Get(':id')
  async getWord(
    @Request() req,
    @Param('id') id: string,
    @Query() query: WordLanguageQueryDto,
  ) {
    return this.wordsService.getWord(
      req.user._id.toString(),
      id,
      query.lang,
    );
  }

  @Post(':id/reviews')
  async reviewWord(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: ReviewWordDto,
  ) {
    return this.wordsService.reviewWord(
      req.user._id.toString(),
      id,
      dto.result,
    );
  }

  @Post(':id/master')
  async masterWord(@Request() req, @Param('id') id: string) {
    return this.wordsService.masterWord(req.user._id.toString(), id);
  }
}
