import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ListReadingLessonsQueryDto } from './dto/list-reading-lessons-query.dto';
import { ReadingLessonsService } from './reading-lessons.service';

@UseGuards(JwtAuthGuard)
@Controller('reading-lessons')
export class ReadingLessonsController {
  constructor(private readonly readingLessonsService: ReadingLessonsService) {}

  @Get()
  list(@Query() query: ListReadingLessonsQueryDto) {
    return this.readingLessonsService.list(query);
  }

  @Get(':code')
  getByCode(@Param('code') code: string) {
    return this.readingLessonsService.getByCode(code);
  }
}
