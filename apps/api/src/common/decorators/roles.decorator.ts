import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/role.enum';

export const ROLES_KEY = 'roles';

/** 핸들러/컨트롤러에 허용 역할을 지정한다. RolesGuard 와 함께 사용. */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
