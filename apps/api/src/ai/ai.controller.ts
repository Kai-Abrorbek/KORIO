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

  @Post('chat')
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
