import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HangulController } from './hangul.controller';
import { HangulService } from './hangul.service';
import {
  HangulProgress,
  HangulProgressSchema,
} from './schemas/hangul-progress.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HangulProgress.name, schema: HangulProgressSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [HangulController],
  providers: [HangulService],
  exports: [HangulService],
})
export class HangulModule {}
