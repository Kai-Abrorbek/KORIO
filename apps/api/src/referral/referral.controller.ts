import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReferralService } from './referral.service';
import { ClaimReferralDto } from './dto/referral.dto';

@Controller('referrals')
@UseGuards(JwtAuthGuard)
export class ReferralController {
  constructor(private readonly service: ReferralService) {}

  /** 내 코드·링크·초대 현황·마일스톤 (초대 화면이 쓰는 유일한 조회) */
  @Get('me')
  me(@Request() req) {
    return this.service.getMyInvite(req.user._id.toString());
  }

  /** 초대 코드 사용. 링크로 들어왔든 손으로 쳤든 여기로 온다 */
  @Post('claim')
  claim(@Request() req, @Body() dto: ClaimReferralDto) {
    return this.service.claim(
      req.user._id.toString(),
      dto.code,
      dto.source ?? 'code',
    );
  }
}
