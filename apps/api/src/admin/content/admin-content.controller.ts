import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminContentService } from './admin-content.service';

@Controller('admin/content/questions')
@UseGuards(AdminGuard)
@RequirePermission('content:read')
export class AdminContentController {
  constructor(private readonly content: AdminContentService) {}

  @Get()
  list(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
    @Query('section') section?: string,
    @Query('unit') unit?: string,
    @Query('type') type?: string,
    @Query('active') active?: string,
    @Query('onlyIssues') onlyIssues?: string,
  ) {
    return this.content.list({
      page,
      pageSize,
      search,
      section,
      unit,
      type,
      active,
      onlyIssues,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.content.get(id);
  }
}
