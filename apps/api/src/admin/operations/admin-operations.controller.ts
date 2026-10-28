import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { AdminGuard, type AdminRequestContext } from '../guards/admin.guard';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminOperationsService } from './admin-operations.service';

class SendAnnouncementDto {
  @IsString() @MaxLength(80) key: string;
  @IsObject() title: Record<string, string>;
  @IsObject() body: Record<string, string>;
  @IsString() @MaxLength(500) reason: string;
  /** 푸시가 닿지 않는 사람(토큰 없음)에게 메일로도 */
  @IsOptional() @IsBoolean() email?: boolean;
}

@Controller('admin/operations')
@UseGuards(AdminGuard)
@RequirePermission('operations:write')
export class AdminOperationsController {
  constructor(private readonly operations: AdminOperationsService) {}

  @Get('status')
  status() {
    return this.operations.status();
  }

  @Post('announcements/send')
  announce(
    @Req() req: { admin: AdminRequestContext },
    @Body() dto: SendAnnouncementDto,
  ) {
    return this.operations.announce(dto, req.admin);
  }
}
