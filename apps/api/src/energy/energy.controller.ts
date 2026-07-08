import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('energy')
@UseGuards(JwtAuthGuard)
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @Get()
  getState(@Request() req) {
    return this.energyService.getState(req.user._id.toString());
  }

  @Post('refill')
  refill(@Request() req) {
    return this.energyService.refill(req.user._id.toString());
  }

  @Post('free')
  claimFree(@Request() req) {
    return this.energyService.claimFree(req.user._id.toString());
  }

  @Post('consume')
  consume(@Request() req) {
    return this.energyService.consume(req.user._id.toString(), 1);
  }
}
