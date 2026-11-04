import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { GrokPromoAdminGuard } from './grok-promo-admin.guard';
import { GrokPromoTutorService } from './grok-promo-tutor.service';

interface OwnerRequest {
  user: { _id: { toString(): string } };
}

@Controller('grok-promo-tutor')
@UseGuards(JwtAuthGuard, GrokPromoAdminGuard, RateLimitGuard)
export class GrokPromoTutorController {
  constructor(private readonly tutor: GrokPromoTutorService) {}

  @Get('options')
  @Header('Cache-Control', 'private, no-store')
  options() {
    return this.tutor.options();
  }

  @Post('sessions')
  @RateLimit({ windowMs: 60_000, max: 3, perUser: true })
  start(@Request() request: OwnerRequest) {
    return this.tutor.start(request.user._id.toString());
  }

  @Post('sessions/:id/end')
  @RateLimit({ windowMs: 60_000, max: 12, perUser: true })
  end(@Request() request: OwnerRequest, @Param('id') id: string) {
    return this.tutor.end(id, request.user._id.toString());
  }
}
