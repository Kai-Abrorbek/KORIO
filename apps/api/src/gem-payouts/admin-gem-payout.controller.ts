import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequirePermission } from '../admin/decorators/require-permission.decorator';
import {
  AdminGuard,
  type AdminRequestContext,
} from '../admin/guards/admin.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { SetGemPayoutStatusDto } from './gem-payout.dto';
import { GemPayoutService } from './gem-payout.service';

/** 어드민 "출금 요청" — 운영자가 직접 송금하고 상태를 바꾼다 */
@Controller('admin/gem-payouts')
@UseGuards(AdminGuard, RateLimitGuard)
@RequirePermission('payouts:read')
export class AdminGemPayoutController {
  constructor(private readonly payouts: GemPayoutService) {}

  @Get()
  list(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.payouts.adminList({ status, page, pageSize });
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.payouts.adminDetail(id);
  }

  @Post(':id/status')
  @RequirePermission('payouts:write')
  @RateLimit({ windowMs: 60 * 60_000, max: 300 })
  setStatus(
    @Param('id') id: string,
    @Body() body: SetGemPayoutStatusDto,
    @Req()
    req: {
      admin: AdminRequestContext;
      ip?: string;
      headers?: Record<string, string>;
    },
  ) {
    return this.payouts.adminSetStatus(
      id,
      body,
      req.admin,
      req.ip,
      req.headers?.['user-agent'],
    );
  }
}
