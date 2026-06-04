import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Onboarding, OnboardingSchema } from './schemas/onboarding.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Onboarding.name, schema: OnboardingSchema },
    ]),
  ],
  providers: [OnboardingService],
  controllers: [OnboardingController],
  exports: [OnboardingService],
})
export class OnboardingModule {}
