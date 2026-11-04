import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class GrokPromoAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      user?: { adminRole?: string | null };
    }>();
    if (request.user?.adminRole !== 'super_admin') {
      throw new ForbiddenException('GROK_PROMO_ADMIN_ONLY');
    }
    return true;
  }
}
