import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from './guards/admin.guard';
import { RequirePermission } from './decorators/require-permission.decorator';
import { AdminUsersService } from './admin-users.service';

@Controller('admin/users')
@UseGuards(AdminGuard)
@RequirePermission('users:read')
export class AdminUsersController {
  constructor(private readonly users: AdminUsersService) {}

  @Get()
  list(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
    @Query('country') country?: string,
    @Query('sort') sort?: string,
  ) {
    return this.users.list({ page, pageSize, search, country, sort });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.users.get(id);
  }
}
