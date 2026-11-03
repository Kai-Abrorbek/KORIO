import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { AiService } from './ai.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('chat')
  async getHistory(@Request() req) {
    return this.aiService.getHistory(req.user._id.toString());
  }

  // 메시지마다 모델을 부르고 기록이 쌓인다. 사람이 채팅하는 속도면 넉넉하다
  @Post('chat')
  @UseGuards(RateLimitGuard)
  @RateLimit({ windowMs: 60_000, max: 12, perUser: true })
  async sendMessage(@Request() req, @Body() dto: SendMessageDto) {
    return this.aiService.sendMessage(
      req.user._id.toString(),
      dto.text,
      dto.lang ?? 'uz',
    );
  }

  @Delete('chat')
  async reset(@Request() req) {
    return this.aiService.reset(req.user._id.toString());
  }
}
