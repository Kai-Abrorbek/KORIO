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
import { PaymentsModule } from './payments/payments.module';
import { LeagueModule } from './league/league.module';
import { EnergyModule } from './energy/energy.module';
import { AiModule } from './ai/ai.module';
import { GrammarModule } from './grammer/grammar.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from './notifications/notifications.module';
import { TopikModule } from './topik/topik.module';
import { HangulModule } from './hangul/hangul.module';
import { SpeechModule } from './speech/speech.module';
import { TtsModule } from './tts/tts.module';
import { WordsModule } from './words/words.module';
import { ExpressionsModule } from './expressions/expressions.module';
import { StudyPathModule } from './study-path/study-path.module';
import { ReadingLessonsModule } from './reading-lessons/reading-lessons.module';

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
    PaymentsModule,
    LeagueModule,
    EnergyModule,
    AiModule,
    GrammarModule,
    TopikModule,
    HangulModule,
    TtsModule,
    SpeechModule,
    NotificationsModule,
    WordsModule,
    ExpressionsModule,
    StudyPathModule,
    ReadingLessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
