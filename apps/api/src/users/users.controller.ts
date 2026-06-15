import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Request() req) {
    return this.usersService.getMe(req.user.userId);
  }

  @Patch('me')
  async updateMe(@Request() req, @Body() dto: any) {
    return this.usersService.updateMe(req.user.userId, dto);
  }

  @Get('me/following')
  async getFollowing(@Request() req) {
    return this.usersService.getFollowing(req.user.userId);
  }

  @Get('me/followers')
  async getFollowers(@Request() req) {
    return this.usersService.getFollowers(req.user.userId);
  }

  @Post('follow/:id')
  async follow(@Request() req, @Param('id') targetId: string) {
    return this.usersService.follow(req.user.userId, targetId);
  }

  @Delete('follow/:id')
  async unfollow(@Request() req, @Param('id') targetId: string) {
    return this.usersService.unfollow(req.user.userId, targetId);
  }

  @Get(':id')
  async getUserById(@Request() req, @Param('id') id: string) {
    return this.usersService.getUserById(id, req.user.userId);
  }

  @Get('me/calendar')
  async getCalendar(
    @Request() req,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    return this.usersService.getCalendar(req.user.userId, y, m);
  }

  @Get('me/stats/weekly')
  async getWeekly(@Request() req, @Query('date') date?: string) {
    return this.usersService.getWeeklyStats(req.user.userId, date);
  }
}
