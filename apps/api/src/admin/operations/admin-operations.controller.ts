import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IsObject, IsString, MaxLength } from 'class-validator';
import { AdminGuard, type AdminRequestContext } from '../guards/admin.guard';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminOperationsService } from './admin-operations.service';

class SendAnnouncementDto {
  @IsString() @MaxLength(80) key: string;
  @IsObject() title: Record<string, string>;
  @IsObject() body: Record<string, string>;
  @IsString() @MaxLength(500) reason: string;
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
