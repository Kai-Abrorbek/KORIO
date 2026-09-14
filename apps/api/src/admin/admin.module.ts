import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { RateLimitGuard } from '../common/rate-limit';
import {
  AdminAuditLog,
  AdminAuditLogSchema,
} from './schemas/admin-audit-log.schema';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuditService } from './admin-audit.service';
import { AdminGuard } from './guards/admin.guard';

/**
 * 운영 도구.
 *
 * 앱용 엔드포인트와 **섞지 않는다.** 전부 `/admin/*` 아래에 있고, 전부
 * AdminGuard 를 지난다. 권한 구조가 다르고 감사 로그가 붙는 자리라,
 * 하나라도 일반 경로에 새면 그 구멍이 제일 약한 고리가 된다.
 *
 * JwtModule 을 옵션 없이 등록하는 이유: 서명·검증 때마다 시크릿을 명시적으로
 * 넘긴다(ADMIN_JWT_SECRET). 모듈 기본 시크릿을 두면 실수로 앱 시크릿이
 * 딸려 들어올 여지가 생긴다.
 */
@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: AdminAuditLog.name, schema: AdminAuditLogSchema },
    ]),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, AdminAuditService, AdminGuard, RateLimitGuard],
  exports: [AdminAuditService, AdminGuard],
})
export class AdminModule {}
