import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminGuard, type AdminRequestContext } from './guards/admin.guard';
import { permissionsFor } from './admin.const';

@Controller('admin/auth')
@UseGuards(RateLimitGuard)
export class AdminAuthController {
  constructor(private readonly service: AdminAuthService) {}

  /**
   * ⚠️ 여기가 운영 도구 전체의 입구다. 앱 로그인보다 훨씬 빡빡하게 막는다 —
   *    어드민 계정은 수가 적어서 정상 트래픽이 거의 없고, 그래서 시도가 많다는
   *    건 그 자체로 신호다.
   */
  @Post('login')
  @RateLimit({ windowMs: 15 * 60_000, max: 10, keyBody: 'email' })
  login(@Body() dto: AdminLoginDto, @Req() req: any) {
    return this.service.login(dto.email, dto.password, req.ip);
  }

  /** 새로고침할 때 화면이 "나 누구지" 를 다시 묻는 자리 */
  @Get('me')
  @UseGuards(AdminGuard)
  me(@Req() req: any) {
    const admin: AdminRequestContext = req.admin;
    // 로그인 응답의 `admin` 과 같은 모양으로 맞춘다 (userId/email/role/permissions)
    return { ...admin, permissions: permissionsFor(admin.role) };
  }
}
