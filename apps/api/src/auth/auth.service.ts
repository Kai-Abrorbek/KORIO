import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
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
import { AuthProvider } from '../common/enums/provider.enum';
import { OAuth2Client } from 'google-auth-library';
import * as crypto from 'crypto';
import { trialFields } from '../users/super.util';

@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client();

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
      provider: AuthProvider.LOCAL,
      ...trialFields(),
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
    let providerId = dto.providerId;
    let email = dto.email;
    let nickname = dto.nickname;
    let profileImage = dto.profileImage;

    // 🔐 구글: id_token 서버 검증 (신뢰 가능한 값만 사용)
    if (dto.provider === AuthProvider.GOOGLE) {
      if (!dto.idToken)
        throw new BadRequestException('idToken required for Google');
      const ticket = await this.googleClient.verifyIdToken({
        idToken: dto.idToken,
        audience: [
          process.env.GOOGLE_WEB_CLIENT_ID,
          process.env.GOOGLE_ANDROID_CLIENT_ID,
        ].filter(Boolean) as string[],
      });
      const payload = ticket.getPayload();
      if (!payload?.sub)
        throw new UnauthorizedException('Invalid Google token');
      providerId = payload.sub;
      email = payload.email;
      nickname = nickname || payload.name;
      profileImage = profileImage || payload.picture;
    }

    if (!providerId)
      throw new BadRequestException('providerId or idToken required');

    let user = await this.userModel.findOne({
      provider: dto.provider,
      providerId,
    });

    if (!user && email) {
      user = await this.userModel.findOne({ email });
      if (user) {
        // 기존 계정에 소셜 정보 연결
        user.provider = dto.provider;
        user.providerId = providerId;
        if (!user.profileImage && profileImage)
          user.profileImage = profileImage;
        await user.save();
      }
    }

    if (!user) {
      user = await this.userModel.create({
        email,
        nickname,
        profileImage,
        provider: dto.provider,
        providerId,
        ...trialFields(),
      });
    }

    // 온보딩 데이터 연결 (기존 로직 그대로)
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

  private verifyTelegram(data: Record<string, string>): boolean {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) return false;
    const { hash, ...rest } = data;
    const checkString = Object.keys(rest)
      .sort()
      .map((k) => `${k}=${rest[k]}`)
      .join('\n');
    const secret = crypto.createHash('sha256').update(token).digest();
    const hmac = crypto
      .createHmac('sha256', secret)
      .update(checkString)
      .digest('hex');
    if (hmac !== hash) return false;
    // 재사용 방지: 24시간 지난 auth_date 거부
    const authDate = Number(data.auth_date);
    return !!authDate && Date.now() / 1000 - authDate < 86400;
  }

  // 텔레그램 콜백 → 유저 생성/조회 → JWT
  async telegramLogin(q: any) {
    // 텔레그램이 실제 서명한 필드만 추출 (우리 커스텀 param 제외)
    const fields = [
      'id',
      'first_name',
      'last_name',
      'username',
      'photo_url',
      'auth_date',
      'hash',
    ];
    const data: Record<string, string> = {};
    for (const k of fields) if (q[k] != null) data[k] = String(q[k]);

    if (!this.verifyTelegram(data)) {
      throw new UnauthorizedException('Invalid Telegram signature');
    }

    const providerId = data.id;
    const nickname =
      data.username ||
      [data.first_name, data.last_name].filter(Boolean).join(' ') ||
      `tg_${providerId}`;
    const profileImage = data.photo_url || '';

    let user = await this.userModel.findOne({
      provider: AuthProvider.TELEGRAM,
      providerId,
    });

    if (!user) {
      user = await this.userModel.create({
        provider: AuthProvider.TELEGRAM,
        providerId,
        nickname,
        profileImage,
        ...trialFields(),
      });
    }

    // 온보딩 연결 (socialLogin과 동일)
    if (q.session) {
      const onboarding = await this.onboardingModel.findOne({
        sessionId: q.session,
      });
      if (onboarding) {
        await this.onboardingModel.findOneAndUpdate(
          { sessionId: q.session },
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

    return this.generateToken(user); // { accessToken, user }
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
        isOnboardingCompleted: user.isOnboardingCompleted,
      },
    };
  }
}
