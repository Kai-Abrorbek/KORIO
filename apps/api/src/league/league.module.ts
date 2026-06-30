import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UserStats, UserStatsSchema } from '../users/schemas/user-stats.schema';
import { LeagueRoom, LeagueRoomSchema } from './schemas/league-room.schema';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserStats.name, schema: UserStatsSchema },
      { name: LeagueRoom.name, schema: LeagueRoomSchema },
    ]),
  ],
  controllers: [LeagueController],
  providers: [LeagueService],
  exports: [LeagueService],
})
export class LeagueModule {}
