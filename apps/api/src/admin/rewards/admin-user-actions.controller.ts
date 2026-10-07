import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  IsIn,
  IsArray,
  IsMongoId,
  IsInt,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';
import { AdminGuard, type AdminRequestContext } from '../guards/admin.guard';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminUserActionsService } from './admin-user-actions.service';
import { RateLimit, RateLimitGuard } from '../../common/rate-limit';

class GrantRewardDto {
  @IsUUID() requestId: string;
  @IsIn(['gems', 'energy_refill', 'streak_freeze', 'super_days']) kind:
    | 'gems'
    | 'energy_refill'
    | 'streak_freeze'
    | 'super_days';
  @IsInt() @Min(1) @Max(10000) amount: number;
  @IsString() @MinLength(5) @MaxLength(500) reason: string;
}

class SendPersonalPushDto {
  @IsUUID() requestId: string;
  @IsString() @MinLength(1) @MaxLength(80) title: string;
  @IsString() @MinLength(1) @MaxLength(500) body: string;
  @IsString() @MinLength(5) @MaxLength(500) reason: string;
}

class SendSelectedPushDto extends SendPersonalPushDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @IsMongoId({ each: true })
  userIds: string[];
}

@Controller('admin/users/:id')
@UseGuards(AdminGuard, RateLimitGuard)
export class AdminUserActionsController {
  constructor(private readonly actions: AdminUserActionsService) {}

  @Get('rewards')
  @RequirePermission('users:read')
  history(@Param('id') id: string) {
    return this.actions.history(id);
  }

  @Post('rewards')
  @RequirePermission('operations:write')
  @RateLimit({ windowMs: 60 * 60_000, max: 30 })
  grant(
    @Param('id') id: string,
    @Body() dto: GrantRewardDto,
    @Req() req: { admin: AdminRequestContext },
  ) {
    return this.actions.grant(id, dto, req.admin);
  }

  @Post('push')
  @RequirePermission('users:write')
  @RateLimit({ windowMs: 60 * 60_000, max: 30 })
  push(
    @Param('id') id: string,
    @Body() dto: SendPersonalPushDto,
    @Req() req: { admin: AdminRequestContext },
  ) {
    return this.actions.push(id, dto, req.admin);
  }
}

@Controller('admin/users')
@UseGuards(AdminGuard, RateLimitGuard)
export class AdminSelectedPushController {
  constructor(private readonly actions: AdminUserActionsService) {}

  @Post('push/batch')
  @RequirePermission('users:write')
  @RateLimit({ windowMs: 60 * 60_000, max: 30 })
  push(
    @Body() dto: SendSelectedPushDto,
    @Req() req: { admin: AdminRequestContext },
  ) {
    return this.actions.pushSelected(dto, req.admin);
  }
}
