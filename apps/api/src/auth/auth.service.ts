import {
  Injectable,
  Logger,
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
import {
  OAUTH,
  callbackUrl,
  type OAuthProviderKey,
} from './oauth.providers';
import { AuthProvider } from '../common/enums/provider.enum';
import {
  normalizeEmail,
  normalizeEmailOptional,
} from '../common/normalize-email';
import { findUserByEmail } from '../users/find-by-email';
import { OAuth2Client } from 'google-auth-library';
import * as crypto from 'crypto';
import { trialFields, isSuperActive } from '../users/super.util';
import { DEFAULT_AVATAR_CONFIG } from '../users/avatar/avatar.constants';
import type { TelegramMiniAppLoginDto } from './dto/telegram-mini-app-login.dto';
import {
  TelegramInitDataError,
  type TelegramMiniAppAuthData,
  type TelegramMiniAppUser,
  validateTelegramMiniAppInitData,
} from './telegram-mini-app-auth';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
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
    // DTO 에서도 맞추지만 DB 를 만지는 층에서 한 번 더 확정한다.
    // 조회와 저장이 서로 다른 형태면 "가입은 됐는데 로그인이 안 되는" 계정이 생긴다
    const email = normalizeEmail(dto.email);
    // 대소문자만 다른 옛 문서가 있으면 그것도 같은 사람이다.
    // 정확히만 보면 'Kai@x.com' 유저가 'kai@x.com' 으로 계정을 하나 더 만든다
    const existing = await findUserByEmail(this.userModel, email);
    if (existing) throw new ConflictException('EMAIL_ALREADY_EXISTS');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      nickname: dto.nickname,
      provider: AuthProvider.LOCAL,
      ...trialFields(),
    });

    await this.attachOnboarding(user._id, dto.sessionId);

    return this.generateToken(user);
  }

  // 로그인
  async login(dto: LoginDto) {
    const user = await findUserByEmail(this.userModel, dto.email, '+password');
    // 소셜로만 가입한 계정은 password 가 비어 있다. bcrypt.compare 에 undefined 를
    // 넘기면 던지므로(500) 여기서 먼저 걸러 낸다.
    if (!user?.password) throw new UnauthorizedException('INVALID_CREDENTIALS');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('INVALID_CREDENTIALS');

    await this.attachOnboarding(user._id, dto.sessionId);
    return this.generateToken(user);
  }

  // 소셜 로그인
  async socialLogin(dto: SocialLoginDto) {
    let providerId = dto.providerId;
    let email = normalizeEmailOptional(dto.email);
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
      // 구글이 준 값도 대소문자가 섞여 올 수 있다. 여기서 안 맞추면 같은 사람이
      // 이메일 계정과 소셜 계정으로 갈라진다
      email = normalizeEmailOptional(payload.email);
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
      user = await findUserByEmail(this.userModel, email);
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

    await this.attachOnboarding(user._id, dto.sessionId);

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
  async telegramLogin(q: Record<string, unknown>) {
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

    const sessionId = typeof q.session === 'string' ? q.session : undefined;
    return this.completeTelegramLogin(
      {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        username: data.username,
        photoUrl: data.photo_url,
      },
      sessionId,
    );
  }

  /** Telegram Mini App initData 검증 → 기존 Telegram 계정/JWT 재사용. */
  async telegramMiniAppLogin(dto: TelegramMiniAppLoginDto) {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();

    /**
     * ⚠️ 이 두 실패는 **원인이 완전히 다른데 예전엔 둘 다 조용히 401 이었다.**
     *    로그도 안 남아서, 앱에 "연결 실패" 만 뜨고 서버에서는 아무것도 볼 수
     *    없었다. 설정 문제(토큰 없음)와 데이터 문제(해시 불일치)는 고치는
     *    방법이 정반대라 반드시 구분돼야 한다.
     *
     * 에러 메시지는 이 레포의 관례대로 대문자 코드로 바꿨다 — 앱이 그걸
     * 보고 사람이 읽을 안내를 고른다 (문장을 그대로 띄우면 번역도 안 된다).
     */
    if (!token) {
      // 설정 사고다. 유저가 할 수 있는 게 없으니 서버가 시끄럽게 알려야 한다.
      // env_file 은 컨테이너를 **만들 때** 읽힌다 — 파일에 넣고 restart 만
      // 하면 컨테이너 안에는 여전히 없다 (force-recreate 해야 한다)
      this.logger.error(
        '[telegram] TELEGRAM_BOT_TOKEN 이 이 프로세스에 없다. Mini App 로그인이 전부 막힌다.',
      );
      throw new UnauthorizedException('TELEGRAM_NOT_CONFIGURED');
    }

    let telegramData: TelegramMiniAppAuthData;
    try {
      telegramData = validateTelegramMiniAppInitData(dto.initData, token);
    } catch (e) {
      /**
       * 왜 실패했는지를 구체적으로 남긴다. 이 여덟 가지는 **고치는 방법이
       * 전부 다르다** — 시계가 틀린 것과 봇 토큰이 다른 것은 완전히 다른 일이다.
       *
       * ⚠️ initData 자체는 절대 안 남긴다 (유저 정보 + 서명이 들어 있다).
       *    키 이름·길이·시간 차이처럼 **모양만** 남긴다.
       * ⚠️ 밖으로 나가는 코드는 하나로 뭉뚱그린다. 어느 검사에서 걸렸는지
       *    응답으로 알려주면 공격자에게 지도를 주는 꼴이다.
       */
      const failure =
        e instanceof TelegramInitDataError ? e.failure : 'UNKNOWN';
      const hint =
        e instanceof TelegramInitDataError ? JSON.stringify(e.hint) : '';
      this.logger.warn(
        `[telegram] initData 검증 실패: ${failure} ${hint} ` +
          `(length=${dto.initData?.length ?? 0})`,
      );
      if (failure === 'AUTH_DATE_FUTURE') {
        this.logger.error(
          '[telegram] 서버 시계가 텔레그램보다 앞서 있다. NTP 를 확인해라 — ' +
            '토큰이 맞아도 Mini App 로그인이 전부 막힌다.',
        );
      }
      if (failure === 'HASH_MISMATCH') {
        this.logger.error(
          '[telegram] 서명 불일치. TELEGRAM_BOT_TOKEN 이 Mini App 을 연 봇의 ' +
            '토큰이 맞는지, BotFather 에서 재발급한 적은 없는지 확인해라.',
        );
      }
      throw new UnauthorizedException('TELEGRAM_INIT_DATA_INVALID');
    }

    return this.completeTelegramLogin(telegramData.user, dto.sessionId);
  }

  private async completeTelegramLogin(
    telegramUser: TelegramMiniAppUser,
    sessionId?: string,
  ) {
    const providerId = telegramUser.id;
    const nickname =
      telegramUser.username ||
      [telegramUser.firstName, telegramUser.lastName]
        .filter(Boolean)
        .join(' ') ||
      `tg_${providerId}`;
    const profileImage = telegramUser.photoUrl || '';

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
        appLanguage: telegramUser.languageCode || '',
        ...trialFields(),
      });
    }

    await this.attachOnboarding(user._id, sessionId);

    return this.generateToken(user); // { accessToken, user }
  }

  /**
   * 온보딩(가입 전에 푼 설문·레벨테스트)을 유저에 붙인다.
   * socialLogin·telegramLogin·OAuth 가 전부 같은 일을 해서 한 곳으로 뺐다.
   */
  private async attachOnboarding(userId: any, sessionId?: string) {
    if (!sessionId) return;
    const onboarding = await this.onboardingModel.findOne({ sessionId });
    if (!onboarding) return;

    await this.onboardingModel.findOneAndUpdate({ sessionId }, { userId });
    await this.userModel.findByIdAndUpdate(userId, {
      level: onboarding.detectedLevel,
      targetLanguage: onboarding.targetLanguage,
      learningGoals: onboarding.learningGoals,
      dailyGoalMinutes: onboarding.dailyGoalMinutes,
      isOnboardingCompleted: true,
      placementLevel: onboarding.placementLevel,
      placementLevelSetAt: new Date(),
      hangulLevel: onboarding.hangulLevel,
      interests: onboarding.interests,
      selfReportedLevel: onboarding.selfReportedLevel,
      reminderHour: onboarding.reminderHour,
      reminderEnabled: onboarding.reminderEnabled,
    });
  }

  /**
   * 소셜 프로필 → 유저 생성/조회 → JWT.
   *
   * 이메일이 같으면 기존 계정에 붙인다. 안 그러면 구글로 가입한 사람이
   * 카카오로 들어왔을 때 계정이 두 개로 갈라진다.
   * (카카오는 이메일 동의를 안 하면 이메일이 없다 — 그 경우는 새 계정)
   */
  async upsertSocialUser(
    provider: AuthProvider,
    profile: {
      providerId: string;
      email?: string;
      nickname?: string;
      profileImage?: string;
    },
    sessionId?: string,
  ) {
    const { providerId, profileImage } = profile;
    const email = normalizeEmailOptional(profile.email);
    if (!providerId) throw new BadRequestException('providerId required');

    let user = await this.userModel.findOne({ provider, providerId });

    if (!user && email) {
      user = await findUserByEmail(this.userModel, email);
      if (user) {
        user.provider = provider;
        user.providerId = providerId;
        if (!user.profileImage && profileImage)
          user.profileImage = profileImage;
        await user.save();
      }
    }

    if (!user) {
      user = await this.userModel.create({
        provider,
        providerId,
        email,
        nickname: profile.nickname || `${provider}_${providerId.slice(0, 6)}`,
        profileImage: profileImage || '',
        ...trialFields(),
      });
    }

    await this.attachOnboarding(user._id, sessionId);
    return this.generateToken(user);
  }

  /**
   * OAuth 코드 → 액세스 토큰 → 프로필.
   * 제공자마다 응답 모양만 다르고 절차는 같아서 설정 테이블로 처리한다.
   */
  async oauthLogin(
    key: OAuthProviderKey,
    code: string,
    sessionId?: string,
  ) {
    const cfg = OAUTH[key];
    const clientId = cfg.clientId();
    if (!clientId) {
      throw new BadRequestException(`${key.toUpperCase()}_NOT_CONFIGURED`);
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: callbackUrl(key),
      code,
    });
    const secret = cfg.clientSecret();
    if (secret) body.set('client_secret', secret);

    const tokenRes = await fetch(cfg.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    const tokenJson: any = await tokenRes.json().catch(() => null);
    const accessToken = tokenJson?.access_token;
    if (!accessToken) {
      // 제공자 에러 메시지를 그대로 흘리면 디버깅이 훨씬 빠르다
      throw new UnauthorizedException(
        `OAUTH_TOKEN_FAILED: ${tokenJson?.error_description ?? tokenJson?.error ?? 'unknown'}`,
      );
    }

    const profRes = await fetch(cfg.profileUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const profJson: any = await profRes.json().catch(() => null);
    const profile = cfg.parseProfile(profJson);
    if (!profile.providerId) {
      throw new UnauthorizedException('OAUTH_PROFILE_FAILED');
    }

    const provider =
      key === 'kakao' ? AuthProvider.KAKAO : AuthProvider.NAVER;
    return this.upsertSocialUser(provider, profile, sessionId);
  }

  // JWT 토큰 생성
  // 비밀번호 재설정에서도 쓴다 (PasswordResetService) — private 이면 안 된다
  async generateToken(user: UserDocument) {
    // 온보딩 연결 직후에도 갱신 전 문서가 응답으로 나가지 않게 DB 값을 다시 읽는다.
    const freshUser = (await this.userModel.findById(user._id)) ?? user;
    // tv = tokenVersion. 유저가 이 값을 올리면 이 토큰은 그 즉시 무효가 된다.
    const payload = {
      sub: freshUser._id,
      email: freshUser.email,
      tv: freshUser.tokenVersion ?? 0,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: freshUser._id,
        email: freshUser.email,
        nickname: freshUser.nickname,
        avatar: freshUser.avatar || {
          ...DEFAULT_AVATAR_CONFIG,
        },
        level: freshUser.level,
        totalXP: freshUser.totalXP,
        streak: freshUser.streak,
        isOnboardingCompleted: freshUser.isOnboardingCompleted,
        languageLevel: freshUser.placementLevel || 1,
        hasPickedLevel: !!freshUser.placementLevelSetAt,
        // 가입 직후 체험이 켜진 걸 앱이 곧바로 알아야 한다.
        // getMe 를 기다리면 첫 화면이 잠깐 무료 유저로 그려진다.
        isSuper: isSuperActive(freshUser),
        superPlan: freshUser.superPlan ?? null,
        superExpiresAt: freshUser.superExpiresAt ?? null,
      },
    };
  }
}
