import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { CreateAppReviewDto, DismissAppReviewDto } from './dto/app-review.dto';
import { AppReviewService } from './app-review.service';

type AuthedRequest = { user: { _id: { toString(): string } } };

@Controller('app-reviews')
@UseGuards(JwtAuthGuard, RateLimitGuard)
export class AppReviewController {
  constructor(private readonly reviews: AppReviewService) {}

  @Get('prompt')
  prompt(@Req() req: AuthedRequest) {
    return this.reviews.promptFor(req.user._id.toString());
  }

  @Post('prompt/dismiss')
  @RateLimit({ windowMs: 60 * 60_000, max: 30 })
  dismiss(@Req() req: AuthedRequest, @Body() dto: DismissAppReviewDto) {
    return this.reviews.dismiss(req.user._id.toString(), dto.mode);
  }

  @Post()
  @RateLimit({ windowMs: 60 * 60_000, max: 10 })
  create(@Req() req: AuthedRequest, @Body() dto: CreateAppReviewDto) {
    return this.reviews.submit(req.user._id.toString(), dto);
  }
}
