import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminGamificationService } from './admin-gamification.service';

@Controller('admin/gamification')
@UseGuards(AdminGuard)
@RequirePermission('analytics:read')
export class AdminGamificationController {
  constructor(private readonly gamification: AdminGamificationService) {}

  @Get('overview')
  overview(@Query('from') from?: string, @Query('to') to?: string) {
    return this.gamification.overview(from, to);
  }

  @Get('settings')
  settings() {
    return this.gamification.settings();
  }
}
