import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { adminJwtSecret } from '../config/secrets';
import {
  ADMIN_ROLES,
  ADMIN_TOKEN_SCOPE,
  ADMIN_TOKEN_TTL,
  type AdminRole,
  permissionsFor,
} from './admin.const';

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
  ) {}

  async login(email: string, password: string, ip?: string) {
    const secret = adminJwtSecret();
    if (!secret) {
      // 환경변수를 안 넣었으면 어드민은 아예 안 열린다. 기본값이 안전한 쪽
      throw new ServiceUnavailableException('ADMIN_NOT_CONFIGURED');
    }

    const user = await this.userModel
      .findOne({ email: email.trim().toLowerCase() })
      .select('+adminPassword email adminRole tokenVersion nickname');

    /**
     * 실패 이유를 나누지 않는다.
     *
     * "비밀번호가 틀렸다" 와 "어드민이 아니다" 와 "어드민 비밀번호가 아직
     * 설정 안 됐다" 를 구분해 주면, 아무 계정이나 넣어보는 것만으로
     * **누가 어드민인지 목록을 만들 수 있다.**
     */
    const ok =
      !!user?.adminPassword &&
      (await bcrypt.compare(password, user.adminPassword));
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

    await this.userModel
      .updateOne({ _id: user!._id }, { $set: { adminLastLoginAt: new Date() } })
      .catch(() => undefined);

    const token = await this.jwt.signAsync(
      {
        sub: user!._id.toString(),
        scope: ADMIN_TOKEN_SCOPE,
        // 앱에서 전체 로그아웃하면 어드민 토큰도 같이 죽는다
        tv: user!.tokenVersion ?? 0,
      },
      { secret, expiresIn: ADMIN_TOKEN_TTL },
    );

    this.logger.log(`어드민 로그인: ${email} (${role}) ip=${ip ?? '?'}`);
    return {
      accessToken: token,
      expiresIn: ADMIN_TOKEN_TTL,
      admin: {
        // ⚠️ `/admin/auth/me` 와 **같은 모양이어야 한다.** 로그인 직후와
        //    새로고침 뒤에 화면이 쥐는 객체가 달라지면, 새로고침해야만 터지는
        //    버그가 생긴다 (그 종류가 제일 늦게 발견된다)
        userId: user!._id.toString(),
        email: user!.email,
        nickname: user!.nickname ?? '',
        role,
        // 화면이 메뉴를 그릴 때 쓴다. 서버가 다시 검사하므로 이건 표시용일 뿐이다
        permissions: permissionsFor(role),
      },
    };
  }
}
