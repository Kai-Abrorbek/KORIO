import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 토큰이 있으면 붙여 주고, 없으면 **그냥 통과**시키는 가드.
 *
 * 로그인 전후가 같은 화면을 쓰는 곳에 쓴다 (온보딩의 음성 재생 — 설문·레벨
 * 테스트는 가입 전에 돈다). 컨트롤러가 `req.user` 유무로 회원/게스트를
 * 갈라서 게스트 쪽에만 상한을 건다.
 *
 * ⚠️ 만료·폐기된 토큰도 "게스트" 로 떨어진다. 그러니 이 가드를 **보호가
 *    필요한 라우트에 쓰면 안 된다.** 가드가 막아 주는 게 없다.
 */
@Injectable()
export class JwtOptionalGuard extends AuthGuard('jwt') {
  handleRequest<TUser>(_err: unknown, user: TUser | false): TUser | null {
    return user || null;
  }
}
