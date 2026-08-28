import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User, UserSchema } from '../users/schemas/user.schema';
import {
  Onboarding,
  OnboardingSchema,
} from '../onboarding/schemas/onboarding.schema';
import { jwtSecret } from '../config/secrets';
import { RateLimitGuard } from '../common/rate-limit';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Onboarding.name, schema: OnboardingSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      // 시크릿이 없으면 여기서 던져서 서버가 아예 안 뜬다.
      useFactory: async () => ({
        secret: jwtSecret(),
        signOptions: { expiresIn: '7d', algorithm: 'HS256' as const },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RateLimitGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
