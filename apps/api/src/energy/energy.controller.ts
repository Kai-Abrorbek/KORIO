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

  /** 레슨 도중 맞힐 때마다 — 그 자리에서 깎는다 (session = 이번 판 id) */
  @UseGuards(JwtAuthGuard)
  @Post('spend')
  spend(@Request() req, @Body() body: { session?: string; amount?: number }) {
    return this.energyService.spend(
      req.user._id.toString(),
      String(body?.session ?? ''),
      Number(body?.amount) || 1,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('combo-bonus')
  async comboBonus(@Request() req, @Body() body: { spent?: number }) {
    // spent = 이번 레슨에서 화면상 썼지만 **아직 서버에서 안 깎인** 양
    // (spend 가 실패했거나 아직 안 끝난 몫. 보통 0~1)
    return this.energyService.grantComboBonus(
      req.user._id.toString(),
      Number(body?.spent) || 0,
    );
  }
}
