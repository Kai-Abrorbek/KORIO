import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from './guards/admin.guard';
import { RequirePermission } from './decorators/require-permission.decorator';
import { AdminSubscriptionsService } from './admin-subscriptions.service';

@Controller('admin/subscriptions')
@UseGuards(AdminGuard)
@RequirePermission('subscription:read')
export class AdminSubscriptionsController {
  constructor(private readonly subscriptions: AdminSubscriptionsService) {}

  @Get()
  list(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('tier') tier?: string,
    @Query('provider') provider?: string,
  ) {
    return this.subscriptions.list({
      page,
      pageSize,
      search,
      status,
      tier,
      provider,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.subscriptions.get(id);
  }
}
