import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { jwtSecret } from '../config/secrets';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret(),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: { sub: string; email: string }) {
    // req.user 는 컨트롤러 어디서든 그대로 응답에 실릴 수 있다.
    // 비밀번호 해시가 거기 얹혀 다니지 않게 여기서 자른다.
    const user = await this.userModel.findById(payload.sub).select('-password');
    if (!user) throw new UnauthorizedException('USER_NOT_FOUND');
    return user;
  }
}
