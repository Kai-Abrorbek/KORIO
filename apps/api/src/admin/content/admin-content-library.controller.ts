import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminGuard } from '../guards/admin.guard';
import { AdminContentLibraryService } from './admin-content-library.service';

@Controller('admin/content/library')
@UseGuards(AdminGuard)
@RequirePermission('content:read')
export class AdminContentLibraryController {
  constructor(private readonly library: AdminContentLibraryService) {}

  @Get()
  list(
    @Query('kind') kind?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
    @Query('section') section?: string,
    @Query('unit') unit?: string,
    @Query('active') active?: string,
  ) {
    return this.library.list({
      kind,
      page,
      pageSize,
      search,
      section,
      unit,
      active,
    });
  }

  @Get(':kind/:id')
  get(@Param('kind') kind: string, @Param('id') id: string) {
    return this.library.get(kind, id);
  }
}
