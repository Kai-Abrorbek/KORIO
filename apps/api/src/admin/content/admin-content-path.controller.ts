import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminContentPathService } from './admin-content-path.service';

@Controller('admin/content/path')
@UseGuards(AdminGuard)
@RequirePermission('content:read')
export class AdminContentPathController {
  constructor(private readonly path: AdminContentPathService) {}

  @Get()
  overview() {
    return this.path.overview();
  }

  @Get('units')
  unit(
    @Query('section') section?: string,
    @Query('unit') unit?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('orphanPage') orphanPage?: string,
  ) {
    return this.path.unit({ section, unit, page, pageSize, orphanPage });
  }
}
