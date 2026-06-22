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
import { SaveLevelTestMeDto } from './dto/save-level-test-me.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Request() req) {
    return this.usersService.getMe(req.user._id.toString());
  }

  @Patch('me')
  async updateMe(@Request() req, @Body() dto: any) {
    return this.usersService.updateMe(req.user._id.toString(), dto);
  }

  @Post('me/level-test')
  async saveLevelTest(@Request() req, @Body() dto: SaveLevelTestMeDto) {
    return this.usersService.saveLevelTest(req.user._id.toString(), dto);
  }

  @Get('me/following')
  async getFollowing(@Request() req) {
    return this.usersService.getFollowing(req.user._id.toString());
  }

  @Get('me/followers')
  async getFollowers(@Request() req) {
    return this.usersService.getFollowers(req.user._id.toString());
  }

  @Get('me/calendar')
  async getCalendar(
    @Request() req,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    return this.usersService.getCalendar(req.user._id.toString(), y, m);
  }

  @Get('me/stats/weekly')
  async getWeekly(@Request() req, @Query('date') date?: string) {
    return this.usersService.getWeeklyStats(req.user._id.toString(), date);
  }

  @Get('me/stats/period')
  async getPeriodStats(
    @Request() req,
    @Query('range') range: 'week' | 'month' | 'year' | 'all' = 'week',
    @Query('endDate') endDate?: string,
    @Query('lang') lang: string = 'uz',
  ) {
    return this.usersService.getPeriodStats(
      req.user._id.toString(),
      range,
      endDate,
      lang,
    );
  }

  @Get('me/stats/category')
  async getCategoryStats(
    @Request() req,
    @Query('category') category: string,
    @Query('range') range: 'week' | 'month' | 'year' | 'all' = 'week',
    @Query('endDate') endDate?: string,
    @Query('lang') lang: string = 'uz',
  ) {
    return this.usersService.getCategoryStats(
      req.user._id.toString(),
      category,
      range,
      endDate,
      lang,
    );
  }

  @Post('follow/:id')
  async follow(@Request() req, @Param('id') targetId: string) {
    return this.usersService.follow(req.user._id.toString(), targetId);
  }

  @Delete('follow/:id')
  async unfollow(@Request() req, @Param('id') targetId: string) {
    return this.usersService.unfollow(req.user._id.toString(), targetId);
  }

  @Get(':id')
  async getUserById(@Request() req, @Param('id') id: string) {
    return this.usersService.getUserById(id, req.user._id.toString());
  }
}
