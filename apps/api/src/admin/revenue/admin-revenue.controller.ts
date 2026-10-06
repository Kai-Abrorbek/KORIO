import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminRevenueService } from './admin-revenue.service';
import { PlayReportSyncService } from './play-report.sync.service';

@Controller('admin/revenue')
@UseGuards(AdminGuard)
export class AdminRevenueController {
  constructor(
    private readonly revenue: AdminRevenueService,
    private readonly syncService: PlayReportSyncService,
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

  /** Operators can force a check without changing or deleting any Play source data. */
  @Post('sync')
  @RequirePermission('admin:manage')
  sync() {
    return this.syncService.sync();
  }
}
