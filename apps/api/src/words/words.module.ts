import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserWordProgress,
  UserWordProgressSchema,
} from './schemas/user-word-progress.schema';
import { Word, WordSchema } from './schemas/word.schema';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Word.name, schema: WordSchema },
      { name: UserWordProgress.name, schema: UserWordProgressSchema },
    ]),
  ],
  controllers: [WordsController],
  providers: [WordsService],
  exports: [WordsService],
})
export class WordsModule {}
