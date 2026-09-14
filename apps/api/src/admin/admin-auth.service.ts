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
 * 앱 로그인과 **같은 계정·같은 비밀번호**를 쓰되 토큰만 분리한다. 계정을 따로
 * 만들면 비밀번호가 두 벌이 되고, 퇴사자 계정을 두 군데서 지워야 한다 —
 * 그러다 한 쪽이 남는다. 문은 하나로 두고 **권한(adminRole)과 토큰**을 나눈다.
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
      .select('+password email adminRole tokenVersion nickname');

    /**
     * 실패 이유를 나누지 않는다.
     *
     * "비밀번호가 틀렸다" 와 "어드민이 아니다" 를 구분해 주면, 아무 계정이나
     * 넣어보는 것만으로 **누가 어드민인지 목록을 만들 수 있다.**
     */
    const ok =
      !!user?.password && (await bcrypt.compare(password, user.password));
    const role = user?.adminRole as AdminRole | null | undefined;
    if (!ok || !role || !ADMIN_ROLES.includes(role)) {
      this.logger.warn(`어드민 로그인 실패: ${email} ip=${ip ?? '?'}`);
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
