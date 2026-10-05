import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
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
  async comboBonus(@Request() req, @Body() body: { spent?: number }) {
    // spent = 이번 레슨에서 지금까지 쓴 에너지 (서버는 완료 때 차감하므로)
    return this.energyService.grantComboBonus(
      req.user._id.toString(),
      Number(body?.spent) || 0,
    );
  }
}
