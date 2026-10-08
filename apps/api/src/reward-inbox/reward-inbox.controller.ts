import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RewardInboxService } from './reward-inbox.service';

@Controller('reward-inbox')
@UseGuards(JwtAuthGuard)
export class RewardInboxController {
  constructor(private readonly rewards: RewardInboxService) {}

  @Get()
  pending(@Request() req: { user: { _id: { toString(): string } } }) {
    return this.rewards.pending(req.user._id.toString());
  }

  @Post(':id/acknowledge')
  acknowledge(
    @Request() req: { user: { _id: { toString(): string } } },
    @Param('id') id: string,
  ) {
    return this.rewards.acknowledge(req.user._id.toString(), id);
  }
}
