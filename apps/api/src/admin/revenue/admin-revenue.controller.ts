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
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { AdminGuard } from '../guards/admin.guard';
import type { AdminRequestContext } from '../guards/admin.guard';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminRevenueService } from './admin-revenue.service';
import { PlayReportSyncService } from './play-report.sync.service';
import { AdminManualRevenueService } from './admin-manual-revenue.service';
import { AdminCardTransfersService } from './admin-card-transfers.service';
import { AdminStarsBalanceService } from './admin-stars-balance.service';
import { AdminStarsSalesService } from './admin-stars-sales.service';
import { RateLimit, RateLimitGuard } from '../../common/rate-limit';
import type { ManualRevenueKind } from './manual-revenue-entry.schema';

class ManualRevenueDto {
  @IsUUID() requestId: string;
  @IsIn(['expense', 'telegram_card_revenue']) kind: ManualRevenueKind;
  @IsString() @MinLength(10) @MaxLength(10) date: string;
  @IsString() @MinLength(3) @MaxLength(3) currency: string;
  @IsInt() @Min(1) @Max(1_000_000_000_000) amountMinor: number;
  @IsString() @MinLength(1) @MaxLength(80) category: string;
  @IsOptional() @IsString() @MaxLength(120) reference?: string;
  @IsOptional() @IsString() @MaxLength(500) note?: string;
  @IsString() @MinLength(5) @MaxLength(500) reason: string;
}

class VoidManualRevenueDto {
  @IsString() @MinLength(5) @MaxLength(500) reason: string;
}

@Controller('admin/revenue')
@UseGuards(AdminGuard, RateLimitGuard)
export class AdminRevenueController {
  constructor(
    private readonly revenue: AdminRevenueService,
    private readonly syncService: PlayReportSyncService,
    private readonly manual: AdminManualRevenueService,
    private readonly cards: AdminCardTransfersService,
    private readonly stars: AdminStarsBalanceService,
    private readonly starSales: AdminStarsSalesService,
  ) {}

  @Get('summary')
  @RequirePermission('subscription:read')
  summary(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('currency') currency?: string,
  ) {
    return this.revenue.summary({ from, to, currency });
  }

  @Get('transactions')
  @RequirePermission('subscription:read')
  transactions(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('currency') currency?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.revenue.transactions({ from, to, currency, page, pageSize });
  }

  @Get('manual')
  @RequirePermission('subscription:read')
  manualEntries(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('currency') currency?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.manual.list({ from, to, currency, page, pageSize });
  }

  @Post('manual')
  @RequirePermission('admin:manage')
  @RateLimit({ windowMs: 60 * 60_000, max: 60 })
  createManualEntry(
    @Body() body: ManualRevenueDto,
    @Req() req: { admin: AdminRequestContext },
  ) {
    return this.manual.create(body, req.admin);
  }

  @Post('manual/:id/void')
  @RequirePermission('admin:manage')
  @RateLimit({ windowMs: 60 * 60_000, max: 60 })
  voidManualEntry(
    @Param('id') id: string,
    @Body() body: VoidManualRevenueDto,
    @Req() req: { admin: AdminRequestContext },
  ) {
    return this.manual.void(id, body.reason, req.admin);
  }

  @Get('card-transfers')
  @RequirePermission('subscription:read')
  cardTransfers(@Query('from') from?: string, @Query('to') to?: string) {
    return this.cards.summary(from, to);
  }

  @Get('stars-balance')
  @RequirePermission('subscription:read')
  @RateLimit({ windowMs: 60_000, max: 30 })
  starsBalance() {
    return this.stars.get();
  }

  @Get('stars-sales')
  @RequirePermission('subscription:read')
  starsSales(@Query('from') from?: string, @Query('to') to?: string) {
    return this.starSales.summary(from, to);
  }

  /** Operators can force a check without changing or deleting any Play source data. */
  @Post('sync')
  @RequirePermission('admin:manage')
  sync() {
    return this.syncService.sync();
  }
}
