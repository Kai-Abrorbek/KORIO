import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CollectionPositionDto,
  CollectionWordsQueryDto,
  WordCollectionsQueryDto,
} from './dto/word-collections.dto';
import { WordCollectionsService } from './word-collections.service';

interface LearnerRequest {
  user: { _id: string | { toString(): string } };
}

@Controller('word-collections')
@UseGuards(JwtAuthGuard)
export class WordCollectionsController {
  constructor(private readonly collections: WordCollectionsService) {}

  @Get()
  list(
    @Request() req: LearnerRequest,
    @Query() query: WordCollectionsQueryDto,
  ) {
    return this.collections.list(String(req.user._id), query);
  }

  @Get(':id')
  detail(
    @Request() req: LearnerRequest,
    @Param('id') id: string,
    @Query() query: WordCollectionsQueryDto,
  ) {
    return this.collections.detail(String(req.user._id), id, query);
  }

  @Get(':id/words')
  words(
    @Request() req: LearnerRequest,
    @Param('id') id: string,
    @Query() query: CollectionWordsQueryDto,
  ) {
    return this.collections.collectionWords(String(req.user._id), id, query);
  }

  @Post(':id/save')
  save(
    @Request() req: LearnerRequest,
    @Param('id') id: string,
    @Query() query: WordCollectionsQueryDto,
  ) {
    return this.collections.save(String(req.user._id), id, query, true);
  }

  @Delete(':id/save')
  remove(
    @Request() req: LearnerRequest,
    @Param('id') id: string,
    @Query() query: WordCollectionsQueryDto,
  ) {
    return this.collections.save(String(req.user._id), id, query, false);
  }

  @Patch(':id/position')
  position(
    @Request() req: LearnerRequest,
    @Param('id') id: string,
    @Body() body: CollectionPositionDto,
    @Query() query: WordCollectionsQueryDto,
  ) {
    return this.collections.setPosition(String(req.user._id), id, body, query);
  }
}
