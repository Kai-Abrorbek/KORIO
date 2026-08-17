import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HangulService } from './hangul.service';
import { SubmitHangulResultsDto } from './dto/submit-hangul-results.dto';

@Controller('hangul')
@UseGuards(JwtAuthGuard)
export class HangulController {
  constructor(private readonly hangulService: HangulService) {}

  @Get('progress')
  getProgress(@Request() req) {
    return this.hangulService.getProgress(req.user._id.toString());
  }

  @Post('results')
  submitResults(@Request() req, @Body() dto: SubmitHangulResultsDto) {
    return this.hangulService.submitResults(req.user._id.toString(), dto.results);
  }
}
