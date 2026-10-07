import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import {
  AdminGuard,
  type AdminRequestContext,
} from '../admin/guards/admin.guard';
import { RequirePermission } from '../admin/decorators/require-permission.decorator';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { AppSettingsService } from './app-settings.service';

class UpdateSettingDto {
  @IsNumber() value: number;
  @IsString() @MinLength(5) @MaxLength(500) reason: string;
}

@Controller('admin/settings')
@UseGuards(AdminGuard, RateLimitGuard)
export class AdminSettingsController {
  constructor(private readonly settings: AppSettingsService) {}

  @Get()
  @RequirePermission('analytics:read')
  list() {
    return this.settings.list();
  }

  @Patch(':key')
  @RequirePermission('operations:write')
  @RateLimit({ windowMs: 60 * 60_000, max: 30 })
  update(
    @Param('key') key: string,
    @Body() body: UpdateSettingDto,
    @Req() req: { admin: AdminRequestContext },
  ) {
    return this.settings.update(key, body.value, body.reason, req.admin);
  }
}
