import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  Onboarding,
  OnboardingDocument,
} from '../onboarding/schemas/onboarding.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SocialLoginDto } from './dto/social-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Onboarding.name)
    private onboardingModel: Model<OnboardingDocument>,
    private jwtService: JwtService,
  ) {}

  // 회원가입
  async register(dto: RegisterDto) {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) throw new ConflictException('EMAIL_ALREADY_EXISTS');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      email: dto.email,
      password: hashedPassword,
      nickname: dto.nickname,
      provider: 'local',
    });

    // 온보딩 데이터 연결
    if (dto.sessionId) {
      const onboarding = await this.onboardingModel.findOne({
        sessionId: dto.sessionId,
      });
      if (onboarding) {
        await this.onboardingModel.findOneAndUpdate(
          { sessionId: dto.sessionId },
          { userId: user._id },
        );
        await this.userModel.findByIdAndUpdate(user._id, {
          level: onboarding.detectedLevel,
          targetLanguage: onboarding.targetLanguage,
          learningGoals: onboarding.learningGoals,
          dailyGoalMinutes: onboarding.dailyGoalMinutes,
          isOnboardingCompleted: true,
        });
      }
    }

    return this.generateToken(user);
  }

  // 로그인
  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('INVALID_CREDENTIALS');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('INVALID_CREDENTIALS');

    return this.generateToken(user);
  }

  // 소셜 로그인
  async socialLogin(dto: SocialLoginDto) {
    let user = await this.userModel.findOne({
      provider: dto.provider,
      providerId: dto.providerId,
    });

    if (!user) {
      user = await this.userModel.create({
        email: dto.email,
        nickname: dto.nickname,
        profileImage: dto.profileImage,
        provider: dto.provider,
        providerId: dto.providerId,
      });
    }

    // 온보딩 데이터 연결
    if (dto.sessionId) {
      const onboarding = await this.onboardingModel.findOne({
        sessionId: dto.sessionId,
      });
      if (onboarding) {
        await this.onboardingModel.findOneAndUpdate(
          { sessionId: dto.sessionId },
          { userId: user._id },
        );
        await this.userModel.findByIdAndUpdate(user._id, {
          level: onboarding.detectedLevel,
          targetLanguage: onboarding.targetLanguage,
          learningGoals: onboarding.learningGoals,
          dailyGoalMinutes: onboarding.dailyGoalMinutes,
          isOnboardingCompleted: true,
        });
      }
    }

    return this.generateToken(user);
  }

  // JWT 토큰 생성
  private generateToken(user: UserDocument) {
    const payload = { sub: user._id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        nickname: user.nickname,
        level: user.level,
        totalXP: user.totalXP,
        streak: user.streak,
      },
    };
  }
}
