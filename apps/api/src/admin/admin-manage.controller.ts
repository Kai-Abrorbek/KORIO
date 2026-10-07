import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IsIn, IsString, MaxLength, MinLength } from 'class-validator';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { RequirePermission } from './decorators/require-permission.decorator';
import { AdminGuard, type AdminRequestContext } from './guards/admin.guard';
import { AdminManageService } from './admin-manage.service';

class ChangeRoleDto {
  @IsIn(['content_admin', 'support', 'analyst', 'none'])
  role: string;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  reason: string;
}

@Controller('admin/administrators')
@UseGuards(AdminGuard, RateLimitGuard)
@RequirePermission('admin:manage')
export class AdminManageController {
  constructor(private readonly manage: AdminManageService) {}

  @Get()
  overview() {
    return this.manage.overview();
  }

  @Patch(':id/role')
  @RateLimit({ windowMs: 15 * 60_000, max: 5 })
  changeRole(
    @Param('id') id: string,
    @Body() body: ChangeRoleDto,
    @Req()
    req: {
      admin: AdminRequestContext;
      ip?: string;
      headers?: Record<string, string>;
    },
  ) {
    return this.manage.changeRole(
      id,
      body,
      req.admin,
      req.ip,
      req.headers?.['user-agent'],
    );
  }
}
