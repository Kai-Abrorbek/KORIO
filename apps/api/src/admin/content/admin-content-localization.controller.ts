import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminGuard } from '../guards/admin.guard';
import { AdminContentLocalizationService } from './admin-content-localization.service';

@Controller('admin/content/localization')
@UseGuards(AdminGuard)
@RequirePermission('content:read')
export class AdminContentLocalizationController {
  constructor(private readonly localization: AdminContentLocalizationService) {}

  @Get()
  list(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('entity') entity?: string,
    @Query('language') language?: string,
    @Query('status') status?: string,
  ) {
    return this.localization.list({ page, pageSize, entity, language, status });
  }
}
