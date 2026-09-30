import { Module } from '@nestjs/common';
import { AppReleaseController } from './app-release.controller';
import { PlayVersionService } from './play-version.service';

@Module({ controllers: [AppReleaseController], providers: [PlayVersionService] })
export class AppReleaseModule {}
