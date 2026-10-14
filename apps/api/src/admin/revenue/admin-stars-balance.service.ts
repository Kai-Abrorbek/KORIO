import { Injectable } from '@nestjs/common';
import { TelegramBotApi } from '../../payments/providers/telegram-stars/telegram-bot.api';

interface StarAmount {
  amount: number;
  nanostar_amount?: number;
}

/** Bot API 잔액만 보여준다. Stars를 원화/달러 매출로 환산하지 않는다. */
@Injectable()
export class AdminStarsBalanceService {
  constructor(private readonly bot: TelegramBotApi) {}

  async get() {
    const empty = {
      amount: null,
      nanostarAmount: null,
      fetchedAt: null,
    };
    if (!this.bot.enabled) return { status: 'unconfigured' as const, ...empty };
    try {
      const result = await this.bot.call<StarAmount>('getMyStarBalance', {});
      if (
        !Number.isSafeInteger(result?.amount) ||
        !Number.isSafeInteger(result?.nanostar_amount ?? 0)
      )
        return { status: 'unavailable' as const, ...empty };
      return {
        status: 'ready' as const,
        amount: result.amount,
        nanostarAmount: result.nanostar_amount ?? 0,
        fetchedAt: new Date().toISOString(),
      };
    } catch {
      // TelegramBotApi deliberately does not expose the token in errors.
      return { status: 'unavailable' as const, ...empty };
    }
  }
}
