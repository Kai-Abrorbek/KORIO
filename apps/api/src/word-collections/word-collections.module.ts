import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from '../words/schemas/word.schema';
import {
  UserWordProgress,
  UserWordProgressSchema,
} from '../words/schemas/user-word-progress.schema';
import { WordsModule } from '../words/words.module';
import {
  WordCollection,
  WordCollectionSchema,
} from './schemas/word-collection.schema';
import {
  UserWordCollection,
  UserWordCollectionSchema,
} from './schemas/user-word-collection.schema';
import { WordCollectionsController } from './word-collections.controller';
import { WordCollectionsService } from './word-collections.service';

@Module({
  imports: [
    WordsModule,
    MongooseModule.forFeature([
      { name: Word.name, schema: WordSchema },
      { name: UserWordProgress.name, schema: UserWordProgressSchema },
      { name: WordCollection.name, schema: WordCollectionSchema },
      { name: UserWordCollection.name, schema: UserWordCollectionSchema },
    ]),
  ],
  controllers: [WordCollectionsController],
  providers: [WordCollectionsService],
  exports: [WordCollectionsService],
})
export class WordCollectionsModule {}
