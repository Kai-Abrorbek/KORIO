import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('subscription')
@UseGuards(JwtAuthGuard)
export class SubscriptionController {
  constructor(private readonly service: SubscriptionService) {}

  @Get('plans')
  getPlans() {
    return this.service.getPlans();
  }

  @Get('me')
  getMySubscription(@Request() req) {
    return this.service.getMySubscription(req.user._id.toString());
  }

  @Post('subscribe')
  subscribe(@Request() req, @Body() body: { planId: string }) {
    return this.service.subscribe(req.user._id.toString(), body.planId);
  }

  @Post('cancel')
  cancel(@Request() req) {
    return this.service.cancel(req.user._id.toString());
  }
}
