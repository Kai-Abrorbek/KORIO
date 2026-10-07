import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '../admin/admin.module';
import { RateLimitGuard } from '../common/rate-limit';
import { User, UserSchema } from '../users/schemas/user.schema';
import { AppSetting, AppSettingSchema } from './app-setting.schema';
import { AdminSettingsController } from './admin-settings.controller';
import { AppSettingsService } from './app-settings.service';

@Module({
  imports: [
    AdminModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: AppSetting.name, schema: AppSettingSchema },
    ]),
  ],
  controllers: [AdminSettingsController],
  providers: [AppSettingsService, RateLimitGuard],
})
export class AppSettingsModule {}
