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
import { AdminAuditController } from './admin-audit.controller';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';
import { AdminSubscriptionsController } from './admin-subscriptions.controller';
import { AdminSubscriptionsService } from './admin-subscriptions.service';
import { AdminGuard } from './guards/admin.guard';
import { AdminAnalyticsController } from './analytics/admin-analytics.controller';
import { AdminAnalyticsService } from './analytics/admin-analytics.service';
import { AdminLearningDetailService } from './analytics/admin-learning-detail.service';
import { UserStats, UserStatsSchema } from '../users/schemas/user-stats.schema';
import {
  UserProgress,
  UserProgressSchema,
} from '../users/schemas/user-progress.schema';
import {
  Subscription,
  SubscriptionSchema,
} from '../payments/subscriptions/subscription.schema';
import { AnalyticsModule } from '../analytics/analytics.module';
import { AdminRevenueController } from './revenue/admin-revenue.controller';
import { AdminRevenueService } from './revenue/admin-revenue.service';
import { PlayReportSyncService } from './revenue/play-report.sync.service';
import {
  PlayReportFile,
  PlayReportFileSchema,
  PlayReportRow,
  PlayReportRowSchema,
  PlayReportSyncState,
  PlayReportSyncStateSchema,
} from './revenue/play-report.schema';
import { Question, QuestionSchema } from '../lessons/schemas/question.schema';
import { Lesson, LessonSchema } from '../lessons/schemas/lesson.schema';
import { LessonNode, LessonNodeSchema } from '../lessons/schemas/node.schema';
import { AdminContentController } from './content/admin-content.controller';
import { AdminContentService } from './content/admin-content.service';
import { AdminContentPathController } from './content/admin-content-path.controller';
import { AdminContentPathService } from './content/admin-content-path.service';
import { Grammar, GrammarSchema } from '../grammer/schemas/grammar.schema';
import {
  Expression,
  ExpressionSchema,
} from '../expressions/schemas/expression.schema';
import {
  ExpressionPack,
  ExpressionPackSchema,
} from '../expressions/schemas/expression-pack.schema';
import {
  ExpressionNode,
  ExpressionNodeSchema,
} from '../expressions/schemas/expression-node.schema';
import { AdminContentLibraryController } from './content/admin-content-library.controller';
import { AdminContentLibraryService } from './content/admin-content-library.service';
import { AdminContentLocalizationController } from './content/admin-content-localization.controller';
import { AdminContentLocalizationService } from './content/admin-content-localization.service';
import {
  LeagueRoom,
  LeagueRoomSchema,
} from '../league/schemas/league-room.schema';
import { AdminGamificationController } from './gamification/admin-gamification.controller';
import { AdminGamificationService } from './gamification/admin-gamification.service';

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
      { name: UserStats.name, schema: UserStatsSchema },
      { name: LeagueRoom.name, schema: LeagueRoomSchema },
      { name: UserProgress.name, schema: UserProgressSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: PlayReportFile.name, schema: PlayReportFileSchema },
      { name: PlayReportRow.name, schema: PlayReportRowSchema },
      { name: PlayReportSyncState.name, schema: PlayReportSyncStateSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: LessonNode.name, schema: LessonNodeSchema },
      { name: Grammar.name, schema: GrammarSchema },
      { name: Expression.name, schema: ExpressionSchema },
      { name: ExpressionPack.name, schema: ExpressionPackSchema },
      { name: ExpressionNode.name, schema: ExpressionNodeSchema },
    ]),
    // 계측 컬렉션(LessonAttempt·QuestionAttempt·SubscriptionEvent)의 모델을
    // 빌려 쓴다. AnalyticsModule 이 MongooseModule 을 re-export 한다
    AnalyticsModule,
  ],
  controllers: [
    AdminAuthController,
    AdminAnalyticsController,
    AdminAuditController,
    AdminUsersController,
    AdminSubscriptionsController,
    AdminRevenueController,
    AdminContentController,
    AdminContentPathController,
    AdminContentLibraryController,
    AdminContentLocalizationController,
    AdminGamificationController,
  ],
  providers: [
    AdminAuthService,
    AdminAuditService,
    AdminUsersService,
    AdminSubscriptionsService,
    AdminRevenueService,
    PlayReportSyncService,
    AdminAnalyticsService,
    AdminLearningDetailService,
    AdminContentService,
    AdminContentPathService,
    AdminContentLibraryService,
    AdminContentLocalizationService,
    AdminGamificationService,
    AdminGuard,
    RateLimitGuard,
  ],
  exports: [AdminAuditService, AdminGuard],
})
export class AdminModule {}
