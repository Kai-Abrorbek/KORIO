import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminAnalyticsService } from './admin-analytics.service';

/**
 * 어드민 분석 API.
 *
 * 전부 읽기 전용이고 `analytics:read` 하나로 묶인다 — 분석 화면을 잘게 쪼개
 * 권한을 나누면 관리 비용만 늘고 막아지는 건 없다. 진짜로 나눠야 하는 건
 * **쓰는 행동**(유저 정지·구독 변경)이고 그건 따로 있다.
 */
@Controller('admin/analytics')
@UseGuards(AdminGuard)
@RequirePermission('analytics:read')
export class AdminAnalyticsController {
  constructor(private readonly service: AdminAnalyticsService) {}

  /** 대시보드 첫 화면 KPI. 계산 못 하는 지표는 unavailable 로 같이 내려간다 */
  @Get('overview')
  overview(@Query('from') from?: string, @Query('to') to?: string) {
    return this.service.overview(from, to);
  }

  /** DAU/WAU/MAU 추이. 정의는 "그날 실제로 학습한 사람" */
  @Get('active-users')
  activeUsers(@Query('from') from?: string, @Query('to') to?: string) {
    return this.service.activeUsers(from, to);
  }

  /** 가입 → 프리미엄 학습 퍼널 */
  @Get('funnel')
  funnel() {
    return this.service.learningFunnel();
  }

  /** 구독 현황 + 신규/이탈 추이 */
  @Get('subscriptions')
  subscriptions(@Query('from') from?: string, @Query('to') to?: string) {
    return this.service.subscriptions(from, to);
  }

  /** 가입 주차별 코호트 리텐션 (D1/D7/D30) */
  @Get('retention')
  retention(@Query('weeks') weeks?: string) {
    const n = Math.max(1, Math.min(26, Number(weeks) || 8));
    return this.service.retention(n);
  }
}
