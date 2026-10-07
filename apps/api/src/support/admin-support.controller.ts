import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequirePermission } from '../admin/decorators/require-permission.decorator';
import {
  AdminGuard,
  type AdminRequestContext,
} from '../admin/guards/admin.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { ReplySupportTicketDto } from './dto/support.dto';
import { SupportService } from './support.service';

@Controller('admin/support/tickets')
@UseGuards(AdminGuard, RateLimitGuard)
@RequirePermission('users:write')
export class AdminSupportController {
  constructor(private readonly support: SupportService) {}

  @Get()
  list(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('status') status?: string,
  ) {
    return this.support.listForAdmin({ page, pageSize, status });
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.support.getForAdmin(id);
  }

  @Post(':id/reply')
  @RateLimit({ windowMs: 60 * 60_000, max: 30 })
  reply(
    @Param('id') id: string,
    @Body() body: ReplySupportTicketDto,
    @Req()
    req: {
      admin: AdminRequestContext;
      ip?: string;
      headers?: Record<string, string>;
    },
  ) {
    return this.support.reply(
      id,
      body.message,
      req.admin,
      req.ip,
      req.headers?.['user-agent'],
    );
  }
}
