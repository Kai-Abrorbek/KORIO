import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import {
  AdminChangePasswordDto,
  AdminDisableTwoFactorDto,
  AdminOtpDto,
  AdminPasswordConfirmDto,
} from './dto/admin-security.dto';
import { AdminGuard, type AdminRequestContext } from './guards/admin.guard';
import { permissionsFor } from './admin.const';

/** AdminGuard 가 통과시킨 요청엔 req.admin 이 붙어 있다 (로그인은 없다) */
type AdminRequest = Request & { admin: AdminRequestContext };

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
  @RateLimit(
    { windowMs: 15 * 60_000, max: 10, keyBody: 'email' },
    // 한 IP 가 어드민 이메일을 바꿔 가며 찔러보는 것
    { windowMs: 15 * 60_000, max: 30 },
    // IP 를 돌려 가며 어드민 한 명을 노리는 것
    { windowMs: 60 * 60_000, max: 20, keyBody: 'email', ignoreIp: true },
  )
  login(@Body() dto: AdminLoginDto, @Req() req: AdminRequest) {
    return this.service.login(dto.email, dto.password, req.ip, dto.otp);
  }

  /** 새로고침할 때 화면이 "나 누구지" 를 다시 묻는 자리 */
  @Get('me')
  @UseGuards(AdminGuard)
  async me(@Req() req: AdminRequest) {
    const admin = req.admin;
    // 로그인 응답의 `admin` 과 같은 모양으로 맞춘다 (userId/email/role/permissions)
    return {
      ...admin,
      permissions: permissionsFor(admin.role),
      twoFactorEnabled: await this.service.twoFactorEnabled(admin.userId),
    };
  }

  // ─────────────── 내 보안 (2단계 인증 · 비밀번호) ───────────────
  //
  // 전부 지금 로그인한 어드민 **자기 계정**만 바꾼다. 권한(role) 검사가 없는
  // 이유다 — 분석 담당도 자기 비밀번호는 바꿀 수 있어야 한다.
  // 바꾸면 응답에 새 토큰이 온다 (다른 어드민 세션은 전부 끊긴다).

  @Post('2fa/setup')
  @UseGuards(AdminGuard)
  @RateLimit({ windowMs: 15 * 60_000, max: 10 })
  setupTwoFactor(
    @Body() dto: AdminPasswordConfirmDto,
    @Req() req: AdminRequest,
  ) {
    return this.service.beginTwoFactor(req.admin, dto.password);
  }

  @Post('2fa/enable')
  @UseGuards(AdminGuard)
  @RateLimit({ windowMs: 15 * 60_000, max: 10 })
  enableTwoFactor(@Body() dto: AdminOtpDto, @Req() req: AdminRequest) {
    return this.service.enableTwoFactor(req.admin, dto.otp, req.ip);
  }

  @Post('2fa/disable')
  @UseGuards(AdminGuard)
  @RateLimit({ windowMs: 15 * 60_000, max: 10 })
  disableTwoFactor(
    @Body() dto: AdminDisableTwoFactorDto,
    @Req() req: AdminRequest,
  ) {
    return this.service.disableTwoFactor(
      req.admin,
      dto.password,
      dto.otp,
      req.ip,
    );
  }

  @Post('password')
  @UseGuards(AdminGuard)
  @RateLimit({ windowMs: 15 * 60_000, max: 10 })
  changePassword(
    @Body() dto: AdminChangePasswordDto,
    @Req() req: AdminRequest,
  ) {
    return this.service.changePassword(req.admin, dto, req.ip);
  }
}
