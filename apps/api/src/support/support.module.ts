import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '../admin/admin.module';
import { RateLimitGuard } from '../common/rate-limit';
import { TelegramBotApi } from '../payments/providers/telegram-stars/telegram-bot.api';
import { PushModule } from '../push/push.module';
import { User, UserSchema } from '../users/schemas/user.schema';
import {
  SupportTicket,
  SupportTicketSchema,
} from './schemas/support-ticket.schema';
import { SupportController } from './support.controller';
import { AdminSupportController } from './admin-support.controller';
import { SupportService } from './support.service';

@Module({
  imports: [
    AdminModule,
    JwtModule.register({}),
    PushModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: SupportTicket.name, schema: SupportTicketSchema },
    ]),
  ],
  controllers: [SupportController, AdminSupportController],
  providers: [SupportService, TelegramBotApi, RateLimitGuard],
})
export class SupportModule {}
