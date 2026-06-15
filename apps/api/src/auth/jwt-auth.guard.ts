import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // canActivate(context: ExecutionContext) {
  //   const req = context.switchToHttp().getRequest();
  //   console.log('🔐 [JWT Guard] 요청 들어옴:', req.method, req.url);
  //   console.log(
  //     '🔐 [JWT Guard] Auth 헤더:',
  //     req.headers.authorization?.slice(0, 30) + '...',
  //   );
  //   return super.canActivate(context);
  // }
  // handleRequest(err: any, user: any, info: any) {
  //   console.log('🔐 [JWT Guard] 전체 user 객체:', JSON.stringify(user));
  //   console.log('🔐 [JWT Guard] info:', info?.message);
  //   if (err || !user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}
