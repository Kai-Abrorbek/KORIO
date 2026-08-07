import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  list(@Request() req, @Query('limit') limit?: string) {
    return this.service.list(
      req.user._id.toString(),
      limit ? Number(limit) : undefined,
    );
  }

  /** 배지용 — 목록 없이 개수만 */
  @Get('unread-count')
  unreadCount(@Request() req) {
    return this.service.unreadCount(req.user._id.toString());
  }

  @Post('read-all')
  markAllRead(@Request() req) {
    return this.service.markAllRead(req.user._id.toString());
  }

  @Post(':id/read')
  markRead(@Request() req, @Param('id') id: string) {
    return this.service.markRead(req.user._id.toString(), id);
  }

  @Delete('all')
  clearAll(@Request() req) {
    return this.service.clearAll(req.user._id.toString());
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.service.remove(req.user._id.toString(), id);
  }
}
