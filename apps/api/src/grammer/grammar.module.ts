import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Grammar, GrammarSchema } from './schemas/grammar.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { GrammarService } from './grammar.service';
import { GrammarController } from './grammar.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Grammar.name, schema: GrammarSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [GrammarController],
  providers: [GrammarService],
  exports: [GrammarService],
})
export class GrammarModule {}
