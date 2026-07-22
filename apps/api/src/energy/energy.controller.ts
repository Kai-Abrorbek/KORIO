import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('energy')
@UseGuards(JwtAuthGuard)
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getState(@Request() req) {
    return this.energyService.getState(req.user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Post('refill')
  refill(@Request() req) {
    return this.energyService.refill(req.user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Post('free')
  claimFree(@Request() req) {
    return this.energyService.claimFree(req.user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Post('consume')
  consume(@Request() req) {
    return this.energyService.consume(req.user._id.toString(), 1);
  }

  @UseGuards(JwtAuthGuard)
  @Post('combo-bonus')
  async comboBonus(@Request() req) {
    console.log(req);
    return this.energyService.grantComboBonus(req.user._id.toString());
  }
}
