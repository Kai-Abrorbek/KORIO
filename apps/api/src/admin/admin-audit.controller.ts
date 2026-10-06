import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from './guards/admin.guard';
import { RequirePermission } from './decorators/require-permission.decorator';
import { AdminAuditService } from './admin-audit.service';

@Controller('admin/audit')
@UseGuards(AdminGuard)
@RequirePermission('audit:read')
export class AdminAuditController {
  constructor(private readonly audit: AdminAuditService) {}

  @Get()
  list(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
    @Query('action') action?: string,
  ) {
    return this.audit.list({ page, pageSize, search, action });
  }
}
