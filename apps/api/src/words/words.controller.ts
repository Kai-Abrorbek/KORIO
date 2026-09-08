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
import { ChainTurnDto, GamePoolQueryDto } from './dto/game-words.dto';
import { MarkSeenWordsDto } from './dto/mark-seen.dto';
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

  /**
   * 미니게임용 단어 묶음.
   *
   * 하드코딩된 목록 대신 실제 사전에서 뽑는다. 유저가 이미 만난 단어를
   * 먼저 쓰기 때문에 난이도를 따로 고를 필요가 없다 — 진도가 곧 난이도다.
   */
  @Get('game-pool')
  async getGamePool(@Request() req, @Query() query: GamePoolQueryDto) {
    return this.wordsService.getGamePool(req.user._id.toString(), query);
  }

  /** 끝말잇기 힌트. 서버 사전에서 뽑아야 힌트대로 쳤을 때 통과한다 */
  @Get('chain/hints')
  async chainHints(
    @Query('start') start = '',
    @Query('exclude') exclude = '',
  ) {
    return this.wordsService.chainHints(
      start,
      exclude ? exclude.split(',').slice(0, 200) : [],
    );
  }

  /** 끝말잇기 첫 단어 */
  @Get('chain/start')
  async chainStart() {
    return this.wordsService.chainStart();
  }

  /**
   * 끝말잇기 한 수. 유저 단어를 사전에서 확인하고 우리 차례까지 돌려준다.
   *
   * 예전엔 앱이 들고 있는 목록 안에서만 답이 인정돼서, 멀쩡한 한국어를 내도
   * 틀렸다고 나왔다.
   */
  @Post('chain/turn')
  async chainTurn(@Request() req, @Body() dto: ChainTurnDto) {
    return this.wordsService.chainTurn(req.user._id.toString(), dto);
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

  /** 카드로 넘겨 본 단어들. 여러 장을 모아서 한 번에 보낸다 */
  @Post('seen')
  async markSeen(@Request() req, @Body() dto: MarkSeenWordsDto) {
    return this.wordsService.markSeen(req.user._id.toString(), dto.ids);
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
