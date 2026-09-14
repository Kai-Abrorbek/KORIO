/**
 * 어드민 권한 모델.
 *
 * 기존 `UserRole`(user/admin/guest/teacher)과 **따로 둔다.** 그건 앱 안에서의
 * 신분이고, 이건 운영 도구에 대한 권한이다. 둘을 합치면 "선생님인데 구독을
 * 강제로 바꿀 수 있나" 같은 질문에 답이 안 나온다.
 *
 * 어드민인지 아닌지는 `user.adminRole` 이 있느냐로만 판단한다. 없으면 어드민
 * 로그인 자체가 안 된다.
 */
export const ADMIN_ROLES = [
  'super_admin',
  'content_admin',
  'support',
  'analyst',
] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

/**
 * 권한 한 조각.
 *
 * 화면이 아니라 **행동** 단위로 쪼갰다. 화면 단위로 쪼개면 화면이 늘어날
 * 때마다 권한표를 고쳐야 하고, 같은 행동이 여러 화면에 있으면 구멍이 난다.
 */
export const ADMIN_PERMISSIONS = [
  'analytics:read',
  'users:read',
  /** 정지·정지해제·진행도 초기화 */
  'users:write',
  'content:read',
  'content:write',
  'subscription:read',
  /** 구독 상태를 손으로 바꾸는 것. 돈이 걸린 행동이라 따로 뗐다 */
  'subscription:override',
  /** 점검 모드·기능 플래그·공지 */
  'operations:write',
  /** 어드민 추가·제거 */
  'admin:manage',
  'audit:read',
] as const;
export type AdminPermission = (typeof ADMIN_PERMISSIONS)[number];

/**
 * 역할이 가진 권한.
 *
 * ⚠️ `subscription:override` 는 super_admin 만 가진다. 스펙에서 따로 못 박은
 *    부분이고, 실수로든 고의로든 남이 프리미엄을 켤 수 있으면 안 된다.
 */
export const ROLE_PERMISSIONS: Record<AdminRole, readonly AdminPermission[]> = {
  super_admin: ADMIN_PERMISSIONS,
  content_admin: [
    'analytics:read',
    'content:read',
    'content:write',
    'users:read',
  ],
  support: [
    'analytics:read',
    'users:read',
    'users:write',
    'subscription:read',
  ],
  // 분석가는 **아무것도 못 바꾼다.** 읽기만 한다
  analyst: ['analytics:read', 'users:read', 'content:read', 'subscription:read'],
};

export function permissionsFor(role: AdminRole): readonly AdminPermission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function hasPermission(
  role: AdminRole | null | undefined,
  permission: AdminPermission,
): boolean {
  if (!role) return false;
  return permissionsFor(role).includes(permission);
}

/**
 * 어드민 토큰 유효기간.
 *
 * 앱 토큰은 7일인데 어드민은 훨씬 짧게 간다. 운영 도구 토큰이 노트북에
 * 일주일씩 살아 있으면 안 된다. 8시간이면 하루 일과를 덮는다.
 */
export const ADMIN_TOKEN_TTL = '8h';

/**
 * 토큰 종류 표식.
 *
 * 앱 토큰과 어드민 토큰은 **시크릿부터 다르다**(ADMIN_JWT_SECRET). 그래서
 * 서로의 토큰은 서명 검증 단계에서 이미 떨어진다. 이 값은 그 위에 한 겹 더
 * 두는 확인이다 — 언젠가 시크릿을 합치는 실수를 해도 여기서 걸린다.
 */
export const ADMIN_TOKEN_SCOPE = 'korio-admin';

/**
 * 위험한 행동. 반드시 사유를 받는다.
 *
 * 사유를 강제하는 이유는 기록 때문만이 아니다. 한 줄 쓰게 만들면 실수로
 * 누르는 일이 확 준다.
 */
export const REASON_REQUIRED_ACTIONS = [
  'user.ban',
  'user.progress_reset',
  'subscription.override',
  'content.delete',
  'operations.maintenance_on',
] as const;
