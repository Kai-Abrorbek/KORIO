import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { adminJwtSecret } from '../../config/secrets';
import {
  ADMIN_ROLES,
  ADMIN_TOKEN_SCOPE,
  type AdminRole,
  hasPermission,
} from '../admin.const';
import { ADMIN_PERMISSION_KEY } from '../decorators/require-permission.decorator';

export interface AdminRequestContext {
  userId: string;
  email: string;
  role: AdminRole;
}

/**
 * 어드민 엔드포인트의 유일한 문.
 *
 * 앱의 JwtAuthGuard 와 **완전히 분리돼 있다**:
 *   · 다른 시크릿(ADMIN_JWT_SECRET)으로 서명을 검증한다 → 앱 토큰은 여기서 떨어진다
 *   · scope 표식을 한 번 더 본다 → 언젠가 시크릿을 합치는 실수를 해도 걸린다
 *   · DB 의 adminRole 을 매 요청 다시 읽는다 → 권한을 뺏으면 **즉시** 막힌다
 *     (토큰 만료를 기다리지 않는다. 운영 도구에서 이건 타협할 부분이 아니다)
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const secret = adminJwtSecret();
    if (!secret) throw new UnauthorizedException('ADMIN_NOT_CONFIGURED');

    const req = ctx.switchToHttp().getRequest();
    const raw = String(req.headers?.authorization ?? '');
    const token = raw.startsWith('Bearer ') ? raw.slice(7).trim() : '';
    if (!token) throw new UnauthorizedException('NO_TOKEN');

    let payload: { sub?: string; scope?: string; tv?: number };
    try {
      payload = await this.jwt.verifyAsync(token, { secret });
    } catch {
      throw new UnauthorizedException('INVALID_TOKEN');
    }
    if (payload.scope !== ADMIN_TOKEN_SCOPE) {
      throw new UnauthorizedException('INVALID_TOKEN');
    }

    // 권한은 토큰이 아니라 **DB 를 믿는다.** 토큰에 박아두면 권한을 뺏어도
    // 남은 유효기간 동안 그대로 통한다
    const user = await this.userModel
      .findById(payload.sub)
      .select('email adminRole tokenVersion')
      .lean();
    if (!user) throw new UnauthorizedException('USER_NOT_FOUND');

    // 비밀번호를 바꾸거나 전체 로그아웃하면 어드민 토큰도 같이 죽는다
    if ((payload.tv ?? 0) !== (user.tokenVersion ?? 0)) {
      throw new UnauthorizedException('TOKEN_REVOKED');
    }

    const role = user.adminRole as AdminRole | null;
    if (!role || !ADMIN_ROLES.includes(role)) {
      throw new ForbiddenException('NOT_AN_ADMIN');
    }

    const needed = this.reflector.getAllAndOverride(ADMIN_PERMISSION_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (needed && !hasPermission(role, needed)) {
      // 어떤 권한이 없는지 알려준다 — 어드민이 직접 쓰는 화면이라
      // "권한 없음" 만 뜨면 누구한테 뭘 달라고 해야 할지 모른다
      throw new ForbiddenException(`MISSING_PERMISSION:${needed}`);
    }

    req.admin = {
      userId: String(user._id),
      email: user.email ?? '',
      role,
    } satisfies AdminRequestContext;
    return true;
  }
}
