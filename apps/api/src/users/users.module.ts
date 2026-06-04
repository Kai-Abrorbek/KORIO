import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import {
  UserProgress,
  UserProgressSchema,
} from './schemas/user-progress.schema';
import { UserStats, UserStatsSchema } from './schemas/user-stats.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserProgress.name, schema: UserProgressSchema },
      { name: UserStats.name, schema: UserStatsSchema },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
