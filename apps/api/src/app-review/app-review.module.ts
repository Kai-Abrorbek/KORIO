import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '../admin/admin.module';
import { RateLimitGuard } from '../common/rate-limit';
import { User, UserSchema } from '../users/schemas/user.schema';
import { AdminAppReviewController } from './admin-app-review.controller';
import { AppReviewController } from './app-review.controller';
import { AppReviewService } from './app-review.service';
import {
  AppReview,
  AppReviewSchema,
  AppReviewState,
  AppReviewStateSchema,
} from './schemas/app-review.schema';

@Module({
  imports: [
    AdminModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: AppReview.name, schema: AppReviewSchema },
      { name: AppReviewState.name, schema: AppReviewStateSchema },
    ]),
  ],
  controllers: [AppReviewController, AdminAppReviewController],
  providers: [AppReviewService, RateLimitGuard],
})
export class AppReviewModule {}
