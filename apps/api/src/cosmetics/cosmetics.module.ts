import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RateLimitGuard } from '../common/rate-limit';
import { User, UserSchema } from '../users/schemas/user.schema';
import { CosmeticsController } from './cosmetics.controller';
import { CosmeticsService } from './cosmetics.service';

/** 캐릭터 꾸미기 아이템 (오라) */
@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [CosmeticsController],
  providers: [CosmeticsService, RateLimitGuard],
})
export class CosmeticsModule {}
