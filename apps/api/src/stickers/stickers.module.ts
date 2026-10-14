import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RateLimitGuard } from '../common/rate-limit';
import { TelegramBotApi } from '../payments/providers/telegram-stars/telegram-bot.api';
import { User, UserSchema } from '../users/schemas/user.schema';
import { StickerRenderer } from './sticker-renderer';
import { STICKER_START_HANDLER } from './sticker-start';
import { StickersController } from './stickers.controller';
import { StickersService } from './stickers.service';

/**
 * 내 캐릭터 텔레그램 스티커팩. 봇 웹훅(/start stk_…)이 STICKER_START_HANDLER 로
 * 부르므로 export 한다 — PaymentsModule 이 이 모듈을 가져다 쓴다 (반대 방향 import 는 없다).
 */
@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [StickersController],
  providers: [
    StickersService,
    StickerRenderer,
    TelegramBotApi,
    RateLimitGuard,
    { provide: STICKER_START_HANDLER, useExisting: StickersService },
  ],
  exports: [StickersService, STICKER_START_HANDLER],
})
export class StickersModule {}
