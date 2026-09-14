import { SetMetadata } from '@nestjs/common';
import type { AdminPermission } from '../admin.const';

export const ADMIN_PERMISSION_KEY = 'adminPermission';

/**
 * 이 핸들러에 필요한 권한.
 *
 * ⚠️ 붙이지 않으면 **로그인한 어드민 누구나** 지나간다. AdminGuard 가 그렇게
 *    동작하는 게 아니라 — 안 붙은 핸들러는 권한 검사를 못 하기 때문이다.
 *    새 엔드포인트를 만들면 이걸 먼저 붙여라. 읽기 전용이라도 붙여라.
 */
export const RequirePermission = (permission: AdminPermission) =>
  SetMetadata(ADMIN_PERMISSION_KEY, permission);
