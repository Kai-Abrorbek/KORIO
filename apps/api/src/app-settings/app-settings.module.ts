import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '../admin/admin.module';
import { RateLimitGuard } from '../common/rate-limit';
import { AppSetting, AppSettingSchema } from './app-setting.schema';
import { AdminSettingsController } from './admin-settings.controller';
import { AppSettingsService } from './app-settings.service';

@Module({
  imports: [
    AdminModule,
    MongooseModule.forFeature([
      { name: AppSetting.name, schema: AppSettingSchema },
    ]),
  ],
  controllers: [AdminSettingsController],
  providers: [AppSettingsService, RateLimitGuard],
})
export class AppSettingsModule {}
