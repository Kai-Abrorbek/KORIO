import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AdminRewardGrant,
  AdminRewardGrantSchema,
} from '../admin/rewards/admin-reward-grant.schema';
import { RewardInboxController } from './reward-inbox.controller';
import { RewardInboxService } from './reward-inbox.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminRewardGrant.name, schema: AdminRewardGrantSchema },
    ]),
  ],
  controllers: [RewardInboxController],
  providers: [RewardInboxService],
})
export class RewardInboxModule {}
