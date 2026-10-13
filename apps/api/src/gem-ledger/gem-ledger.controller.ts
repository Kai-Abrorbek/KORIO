import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GemLedgerService } from './gem-ledger.service';

type AuthedRequest = { user: { _id: { toString(): string } } };

/** 상점 → "보석 내역" */
@Controller('gems')
@UseGuards(JwtAuthGuard)
export class GemLedgerController {
  constructor(private readonly ledger: GemLedgerService) {}

  @Get('summary')
  summary(@Request() req: AuthedRequest) {
    return this.ledger.summary(req.user._id.toString());
  }

  /** ?type=all|in|out&before=<id>&limit=40 */
  @Get('history')
  history(
    @Request() req: AuthedRequest,
    @Query('type') type?: string,
    @Query('before') before?: string,
    @Query('limit') limit?: string,
  ) {
    return this.ledger.history(req.user._id.toString(), {
      type,
      before,
      limit,
    });
  }
}
