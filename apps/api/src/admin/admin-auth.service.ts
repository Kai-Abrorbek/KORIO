import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { adminJwtSecret } from '../config/secrets';
import { ADMIN_TIMING_DUMMY_HASH } from '../common/timing-dummy-hash';
import {
  ADMIN_PASSWORD_MIN_LENGTH,
  ADMIN_ROLES,
  ADMIN_TOKEN_SCOPE,
  ADMIN_TOKEN_TTL,
  type AdminRole,
  permissionsFor,
} from './admin.const';
import { AdminAuditService } from './admin-audit.service';
import type { AdminRequestContext } from './guards/admin.guard';
import {
  generateTotpSecret,
  openTotpSecret,
  otpauthUrl,
  sealTotpSecret,
  verifyTotp,
} from './totp';

/** 비밀번호·2단계 확인에 필요한 필드 (전부 select: false 라 꼭 집어서 읽는다) */
const SECURITY_FIELDS =
  '+adminPassword +adminTotpSecret +adminTotpPending +adminTotpLastStep +adminTokenVersion email adminRole tokenVersion nickname';

/**
 * 어드민 로그인.
 *
 * **같은 계정, 다른 비밀번호.** 계정을 따로 만들면 퇴사자를 두 군데서 지워야
 * 하고 그러다 한 쪽이 남는다. 그래서 계정(=이메일)은 하나로 두되,
 * 비밀번호·권한·토큰을 전부 분리한다.
 *
 * 비밀번호를 분리한 이유:
 *   · 소셜로 가입한 계정은 `password` 가 아예 없다. 운영자를 위해 앱
 *     비밀번호를 만들어 주면 앱 로그인 경로를 하나 더 여는 셈이 된다.
 *   · 앱 비밀번호가 새도 운영 도구는 안 열린다. 그 반대도 마찬가지다.
 *   · `adminPassword` 는 `admin:password` 스크립트로만 설정된다.
 *
 * 토큰이 다른 지점:
 *   · 다른 시크릿(ADMIN_JWT_SECRET) — 앱 토큰으로 어드민에 못 들어온다
 *   · 8시간 (앱은 7일) — 운영 도구 토큰이 노트북에 일주일씩 살아 있으면 안 된다
 *   · scope 표식 — 시크릿을 합치는 실수에 대한 두 번째 방어선
 */
@Injectable()
export class AdminAuthService {
  private readonly logger = new Logger(AdminAuthService.name);

  constructor(
    private readonly jwt: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly audit: AdminAuditService,
  ) {}

  async login(email: string, password: string, ip?: string, otp?: string) {
    const secret = adminJwtSecret();
    if (!secret) {
      // 환경변수를 안 넣었으면 어드민은 아예 안 열린다. 기본값이 안전한 쪽
      throw new ServiceUnavailableException('ADMIN_NOT_CONFIGURED');
    }

    const user = await this.userModel
      .findOne({ email: email.trim().toLowerCase() })
      .select(SECURITY_FIELDS);

    /**
     * 실패 이유를 나누지 않는다.
     *
     * "비밀번호가 틀렸다" 와 "어드민이 아니다" 와 "어드민 비밀번호가 아직
     * 설정 안 됐다" 를 구분해 주면, 아무 계정이나 넣어보는 것만으로
     * **누가 어드민인지 목록을 만들 수 있다.**
     */
    // 비밀번호가 없는 계정도 bcrypt 를 한 번 돌린다. 안 그러면 "어드민 아님" 은
    // 바로 답하고 "비번 틀림" 만 ~70ms 늦어서, 응답 시간만 재도 누가 어드민인지 나온다
    const hash = user?.adminPassword || ADMIN_TIMING_DUMMY_HASH;
    const matches = await bcrypt.compare(password, hash);
    const ok = !!user?.adminPassword && matches;
    const role = user?.adminRole as AdminRole | null | undefined;
    if (!ok || !role || !ADMIN_ROLES.includes(role)) {
      // 응답은 하나지만 **로그에는 이유를 남긴다.** 로그는 공격자가 못 본다.
      // 이게 없으면 "비번이 틀렸나 권한이 없나 비번을 아직 안 넣었나" 를
      // 서버에서도 알 수 없어서, 멀쩡한 설정 문제를 며칠 헤매게 된다.
      const why = !user
        ? '그런 계정 없음'
        : !role
          ? '어드민 아님 (adminRole 없음)'
          : !ADMIN_ROLES.includes(role)
            ? `모르는 adminRole: ${String(role)}`
            : !user.adminPassword
              ? '어드민 비밀번호 미설정 — pnpm --filter api admin:password <email>'
              : '비밀번호 불일치';
      this.logger.warn(`어드민 로그인 실패: ${email} ip=${ip ?? '?'} — ${why}`);
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    // 2단계가 켜져 있으면 비밀번호만으로는 안 된다.
    // 코드가 없으면 OTP_REQUIRED — 화면이 6자리 칸을 띄우고 다시 보낸다.
    // (비밀번호가 맞았다는 게 드러나지만, 그 다음 문이 폰이라 의미가 적고
    //  요청 한도가 이메일 전체로 걸려 있다)
    if (user!.adminTotpSecret) {
      if (!otp?.trim()) throw new UnauthorizedException('OTP_REQUIRED');
      if (!(await this.consumeTotp(user!, otp, secret))) {
        this.logger.warn(`어드민 2단계 코드 틀림: ${email} ip=${ip ?? '?'}`);
        throw new UnauthorizedException('INVALID_OTP');
      }
    }

    await this.userModel
      .updateOne({ _id: user!._id }, { $set: { adminLastLoginAt: new Date() } })
      .catch(() => undefined);

    this.logger.log(`어드민 로그인: ${email} (${role}) ip=${ip ?? '?'}`);
    return this.session(user!, role, secret);
  }

  /** 운영 콘솔이 "내 보안" 화면을 그릴 때 */
  async twoFactorEnabled(userId: string): Promise<boolean> {
    const user = await this.userModel
      .findById(userId)
      .select('+adminTotpSecret')
      .lean();
    return !!user?.adminTotpSecret;
  }

  /**
   * 2단계 등록 1단계 — 비밀을 만들어 보여준다. 아직 켜지지 않는다.
   * 지금 비밀번호를 다시 받는다: 잠깐 자리를 비운 노트북에서 남이 켜 버리면
   * 진짜 주인이 못 들어오게 된다.
   */
  async beginTwoFactor(admin: AdminRequestContext, password: string) {
    const secret = this.requireSecret();
    const user = await this.loadForSecurity(admin.userId);
    await this.requirePassword(user, password);
    if (user.adminTotpSecret)
      throw new ConflictException('TWO_FACTOR_ALREADY_ON');

    const totp = generateTotpSecret();
    await this.userModel.updateOne(
      { _id: user._id },
      { $set: { adminTotpPending: sealTotpSecret(totp, secret) } },
    );
    return { secret: totp, otpauthUrl: otpauthUrl(totp, user.email ?? '') };
  }

  /** 2단계 등록 2단계 — 앱이 만든 코드가 맞으면 켠다. 다른 어드민 세션은 끊는다 */
  async enableTwoFactor(admin: AdminRequestContext, otp: string, ip?: string) {
    const secret = this.requireSecret();
    const user = await this.loadForSecurity(admin.userId);
    if (user.adminTotpSecret)
      throw new ConflictException('TWO_FACTOR_ALREADY_ON');
    const pending = openTotpSecret(user.adminTotpPending, secret);
    if (!pending) throw new BadRequestException('TWO_FACTOR_SETUP_EXPIRED');
    const step = verifyTotp(pending, otp);
    if (step === null) throw new BadRequestException('INVALID_OTP');

    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: {
          adminTotpSecret: user.adminTotpPending,
          adminTotpPending: null,
          adminTotpLastStep: step,
          adminTotpEnabledAt: new Date(),
        },
        $inc: { adminTokenVersion: 1 },
      },
    );
    await this.audit.record({ admin, action: 'admin.2fa.enable', ip });
    return this.freshSession(admin.userId, secret);
  }

  /** 2단계 끄기 — 비밀번호와 지금 코드를 둘 다 받는다 */
  async disableTwoFactor(
    admin: AdminRequestContext,
    password: string,
    otp: string,
    ip?: string,
  ) {
    const secret = this.requireSecret();
    const user = await this.loadForSecurity(admin.userId);
    await this.requirePassword(user, password);
    if (!user.adminTotpSecret)
      throw new ConflictException('TWO_FACTOR_ALREADY_OFF');
    if (!(await this.consumeTotp(user, otp, secret)))
      throw new BadRequestException('INVALID_OTP');

    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: {
          adminTotpSecret: null,
          adminTotpPending: null,
          adminTotpLastStep: null,
          adminTotpEnabledAt: null,
        },
        $inc: { adminTokenVersion: 1 },
      },
    );
    await this.audit.record({ admin, action: 'admin.2fa.disable', ip });
    return this.freshSession(admin.userId, secret);
  }

  /**
   * 어드민 비밀번호 변경. 지금 비밀번호(+2단계가 켜져 있으면 코드)를 받는다.
   * 바꾸면 다른 어드민 세션은 전부 끊기고, 지금 화면은 새 토큰으로 이어진다.
   * 앱 비밀번호·앱 로그인은 건드리지 않는다.
   */
  async changePassword(
    admin: AdminRequestContext,
    input: { currentPassword: string; newPassword: string; otp?: string },
    ip?: string,
  ) {
    const secret = this.requireSecret();
    const user = await this.loadForSecurity(admin.userId);
    await this.requirePassword(user, input.currentPassword);
    if (user.adminTotpSecret) {
      if (!input.otp?.trim()) throw new BadRequestException('OTP_REQUIRED');
      if (!(await this.consumeTotp(user, input.otp, secret)))
        throw new BadRequestException('INVALID_OTP');
    }
    if (input.newPassword.length < ADMIN_PASSWORD_MIN_LENGTH)
      throw new BadRequestException('PASSWORD_TOO_SHORT');
    if (input.newPassword === input.currentPassword)
      throw new BadRequestException('SAME_PASSWORD');

    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: { adminPassword: await bcrypt.hash(input.newPassword, 12) },
        $inc: { adminTokenVersion: 1 },
      },
    );
    await this.audit.record({ admin, action: 'admin.password.change', ip });
    this.logger.log(`어드민 비밀번호 변경: ${admin.email} ip=${ip ?? '?'}`);
    return this.freshSession(admin.userId, secret);
  }

  // ───────────────────────────── 도구 ─────────────────────────────

  private requireSecret(): string {
    const secret = adminJwtSecret();
    if (!secret) throw new ServiceUnavailableException('ADMIN_NOT_CONFIGURED');
    return secret;
  }

  private async loadForSecurity(userId: string): Promise<UserDocument> {
    const user = Types.ObjectId.isValid(userId)
      ? await this.userModel.findById(userId).select(SECURITY_FIELDS)
      : null;
    if (!user) throw new UnauthorizedException('USER_NOT_FOUND');
    return user;
  }

  /**
   * ⚠️ 틀리면 400 이다, 401 이 아니다. 운영 콘솔은 401 을 받으면 "세션이
   *    죽었다" 로 보고 바로 로그아웃시킨다 — 비밀번호 한 글자 틀렸다고
   *    쫓겨나면 안 된다.
   */
  private async requirePassword(user: UserDocument, password: string) {
    const ok = await bcrypt.compare(
      String(password ?? ''),
      user.adminPassword || ADMIN_TIMING_DUMMY_HASH,
    );
    if (!user.adminPassword || !ok)
      throw new BadRequestException('WRONG_PASSWORD');
  }

  /**
   * 코드를 확인하고 그 시간 칸을 "썼다" 로 표시한다. 두 요청이 같은 코드로
   * 동시에 들어와도 하나만 통과한다 (조건부 업데이트).
   */
  private async consumeTotp(
    user: UserDocument,
    otp: string,
    adminSecret: string,
  ): Promise<boolean> {
    const totp = openTotpSecret(user.adminTotpSecret, adminSecret);
    if (!totp) {
      this.logger.error(
        `어드민 2단계 비밀을 못 읽는다 (${user.email}) — ADMIN_JWT_SECRET 을 바꿨으면 ` +
          `pnpm --filter api admin:2fa-reset ${user.email} 으로 끄고 다시 등록해라`,
      );
      return false;
    }
    const step = verifyTotp(totp, otp, {
      notAfterStep: user.adminTotpLastStep,
    });
    if (step === null) return false;
    const claimed = await this.userModel.updateOne(
      {
        _id: user._id,
        $or: [
          { adminTotpLastStep: null },
          { adminTotpLastStep: { $exists: false } },
          { adminTotpLastStep: { $lt: step } },
        ],
      },
      { $set: { adminTotpLastStep: step } },
    );
    return claimed.modifiedCount === 1;
  }

  /** 보안 설정을 바꾼 뒤 지금 화면이 쓸 새 토큰 (옛 토큰은 adminTokenVersion 으로 죽었다) */
  private async freshSession(userId: string, secret: string) {
    const user = await this.loadForSecurity(userId);
    const role = user.adminRole as AdminRole;
    return this.session(user, role, secret);
  }

  private async session(user: UserDocument, role: AdminRole, secret: string) {
    const token = await this.jwt.signAsync(
      {
        sub: user._id.toString(),
        scope: ADMIN_TOKEN_SCOPE,
        // 앱에서 전체 로그아웃하면 어드민 토큰도 같이 죽는다
        tv: user.tokenVersion ?? 0,
        // 어드민 비밀번호 변경·2단계 변경 때 어드민 토큰만 죽인다
        atv: user.adminTokenVersion ?? 0,
      },
      { secret, expiresIn: ADMIN_TOKEN_TTL },
    );

    return {
      accessToken: token,
      expiresIn: ADMIN_TOKEN_TTL,
      admin: {
        // ⚠️ `/admin/auth/me` 와 **같은 모양이어야 한다.** 로그인 직후와
        //    새로고침 뒤에 화면이 쥐는 객체가 달라지면, 새로고침해야만 터지는
        //    버그가 생긴다 (그 종류가 제일 늦게 발견된다)
        userId: user._id.toString(),
        email: user.email,
        nickname: user.nickname ?? '',
        role,
        // 화면이 메뉴를 그릴 때 쓴다. 서버가 다시 검사하므로 이건 표시용일 뿐이다
        permissions: permissionsFor(role),
      },
    };
  }
}
