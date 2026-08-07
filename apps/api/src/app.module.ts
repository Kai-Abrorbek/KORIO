import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { LessonsModule } from './lessons/lessons.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { LeagueModule } from './league/league.module';
import { EnergyModule } from './energy/energy.module';
import { AiModule } from './ai/ai.module';
import { GrammarModule } from './grammer/grammar.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from './notifications/notifications.module';
import { TopikModule } from './topik/topik.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    OnboardingModule,
    LessonsModule,
    SubscriptionModule,
    LeagueModule,
    EnergyModule,
    AiModule,
    GrammarModule,
    TopikModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
