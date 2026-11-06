import { ACCOUNT_RECENTLY_DELETED } from '../users/schemas/deleted-identity.schema';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  ResendSignupDto,
  VerifySignupDto,
} from './dto/register.dto';
import { SignupVerificationService } from './signup-verification.service';
import { LoginDto } from './dto/login.dto';
import { SocialLoginDto } from './dto/social-login.dto';
import { PasswordResetService } from './password-reset.service';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyResetCodeDto,
} from './dto/password-reset.dto';
import { Get, Param, Query, Res, BadRequestException } from '@nestjs/common';
import type { Response } from 'express';
import { OAUTH, callbackUrl, type OAuthProviderKey } from './oauth.providers';
import { packState, unpackState, safeRedirect } from './oauth-state';
import { TelegramMiniAppLoginDto } from './dto/telegram-mini-app-login.dto';
import { ExchangeLoginCodeDto } from './dto/exchange-login-code.dto';
import {
  isCodeChallenge,
  issueLoginCode,
  legacyTokenRedirectAllowed,
  redeemLoginCode,
} from './login-code';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * IP 를 빼고 "이 이메일 전체" 로 세는 한도. IP+이메일 한도만 있으면 봇넷이
 * IP 를 돌려 가며 한 계정을 무한히 두드린다. 정상 사용자는 절대 안 닿을
 * 만큼 넉넉하게 — 대신 공격받는 동안엔 그 이메일이 잠시 막힌다 (털리는 것보다 낫다).
 */
const perEmail = (windowMs: number, max: number) => ({
  windowMs,
  max,
  keyBody: 'email',
  ignoreIp: true,
});

@Controller('auth')
@UseGuards(RateLimitGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordReset: PasswordResetService,
    private readonly signup: SignupVerificationService,
  ) {}

  /**
   * 옛 가입 — 이메일 인증 없이 계정을 만들던 곳. 이제 EMAIL_VERIFICATION_REQUIRED 로 막는다.
   * 가입은 register/start → register/verify 두 단계다.
   */
  @RateLimit({ windowMs: 60 * 60 * 1000, max: 10 })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // 한 IP 가 인증 메일을 대량으로 뿌리지 못하게 (가입 1건 = 메일 1통).
  // 이메일 전체 한도: 남의 주소로 메일 폭탄 + 코드 새로 받아 가며 대입하기 차단
  @RateLimit({ windowMs: HOUR, max: 10 }, perEmail(HOUR, 5))
  @Post('register/start')
  async registerStart(@Body() dto: RegisterDto) {
    return this.signup.start(dto);
  }

  // 메일 폭탄 방지 — 비밀번호 찾기와 같은 한도
  @RateLimit(
    { windowMs: 15 * MINUTE, max: 3, keyBody: 'email' },
    perEmail(HOUR, 6),
  )
  @Post('register/resend')
  async registerResend(@Body() dto: ResendSignupDto) {
    return this.signup.resend(dto);
  }

  // 6자리 무차별 대입 방지. 건당 5회 제한과 별개로 엔드포인트에도 한도.
  // 코드를 새로 받으면 건당 횟수가 0 으로 돌아가므로 이메일 전체 한도가 진짜 상한이다
  @RateLimit(
    { windowMs: 10 * MINUTE, max: 10, keyBody: 'email' },
    perEmail(HOUR, 10),
    perEmail(DAY, 30),
  )
  @Post('register/verify')
  async registerVerify(@Body() dto: VerifySignupDto) {
    return this.signup.verify(dto);
  }

  // 무차별 대입 방지, 세 겹:
  //  · IP+이메일 1분 5회 — 한 IP 뒤의 다른 사람은 안 막힌다
  //  · IP 하나 15분 100회 — 한 IP 가 이메일만 바꿔 가며 유출 비번 목록을
  //    대입하는 것(credential stuffing). 로그인은 토큰이 7일이라 드물다
  //  · 이메일 전체 15분 20회 — IP 를 돌려 가며 한 계정을 노리는 것
  @RateLimit(
    { windowMs: MINUTE, max: 5, keyBody: 'email' },
    { windowMs: 15 * MINUTE, max: 100 },
    perEmail(15 * MINUTE, 20),
  )
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @RateLimit({ windowMs: 60 * 1000, max: 20 })
  @Post('social')
  async socialLogin(@Body() dto: SocialLoginDto) {
    return this.authService.socialLogin(dto);
  }

  @RateLimit({ windowMs: 60 * 1000, max: 30 })
  @Post('telegram/mini-app')
  async telegramMiniAppLogin(@Body() dto: TelegramMiniAppLoginDto) {
    return this.authService.telegramMiniAppLogin(dto);
  }

  // ───────────────────── 비밀번호 찾기 ─────────────────────

  // 메일 폭탄 방지. 남의 주소를 넣고 계속 눌러대는 것도 여기서 막힌다.
  // ip+email 조합이라 한 IP 뒤의 다른 사람까지 같이 막히지는 않는다.
  // 이메일 전체 한도: 새 코드 = 건당 횟수 초기화라, 이게 없으면 봇넷이 코드를
  // 계속 새로 받아 가며 6자리를 대입할 수 있다
  @RateLimit(
    { windowMs: 15 * MINUTE, max: 3, keyBody: 'email' },
    perEmail(HOUR, 5),
    perEmail(DAY, 10),
  )
  @Post('password/forgot')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.passwordReset.forgot(dto);
  }

  // 6자리는 100만 가지뿐이다. 건당 5회 제한이 있지만, 코드를 계속 새로
  // 받아가며 두드리는 걸 막으려면 엔드포인트 쪽에도 한도가 있어야 한다.
  // 이메일 전체로 하루 30회면 1년 내내 두드려도 맞힐 확률이 약 1% 다
  // (그동안 피해자 메일함엔 재설정 메일이 쌓인다)
  @RateLimit(
    { windowMs: 10 * MINUTE, max: 10, keyBody: 'email' },
    perEmail(HOUR, 10),
    perEmail(DAY, 30),
  )
  @Post('password/verify')
  async verifyResetCode(@Body() dto: VerifyResetCodeDto) {
    return this.passwordReset.verify(dto);
  }

  // 토큰은 32바이트라 무차별 대입이 의미 없지만, 한도를 두는 비용도 0 이다
  @RateLimit({ windowMs: 10 * 60 * 1000, max: 10 })
  @Post('password/reset')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.passwordReset.reset(dto);
  }

  /**
   * 소셜 로그인으로 받은 일회용 코드를 토큰으로 바꾼다 (PKCE, login-code.ts).
   * 로그인을 시작한 앱만 verifier 를 알아서, 주소를 가로챈 앱은 못 바꾼다.
   */
  @RateLimit({ windowMs: MINUTE, max: 20 })
  @Post('oauth/exchange')
  async exchangeLoginCode(@Body() dto: ExchangeLoginCodeDto) {
    const userId = await redeemLoginCode(dto.loginCode, dto.codeVerifier);
    if (!userId) throw new BadRequestException('INVALID_LOGIN_CODE');
    return this.authService.tokenForUser(userId);
  }

  @Get('telegram/widget')
  telegramWidget(
    @Query('redirect') redirect: string,
    @Query('session') session: string,
    @Query('code_challenge') challenge: string,
    @Res() res: Response,
  ) {
    const botUser = process.env.TELEGRAM_BOT_USERNAME;
    const base = process.env.PUBLIC_API_URL || '';
    const target = safeRedirect(redirect);
    const authUrl =
      `${base}/auth/telegram/callback?redirect=${encodeURIComponent(target)}` +
      (session ? `&session=${encodeURIComponent(session)}` : '') +
      (isCodeChallenge(challenge) ? `&code_challenge=${challenge}` : '');

    const html = `<!DOCTYPE html><html><head>
        <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
        <title>KORIO · Telegram</title>
        <style>html,body{height:100%;margin:0;display:flex;align-items:center;justify-content:center;
        background:#faf9ff;font-family:-apple-system,sans-serif}</style></head>
        <body>
        <script async src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-login="${botUser}"
          data-size="large"
          data-userpic="true"
          data-request-access="write"
          data-auth-url="${authUrl}"></script>
        </body></html>`;
    res.type('html').send(html);
  }

  /**
   * 텔레그램 위젯이 서명과 함께 되돌려 보내는 곳.
   * 라우트가 없어서 위젯을 통과해도 로그인이 끝나지 않았다.
   */
  @Get('telegram/callback')
  async telegramCallback(@Query() q: any, @Res() res: Response) {
    const target = safeRedirect(q.redirect);
    try {
      const login = await this.authService.telegramLogin(q);
      const challenge: unknown = (q as Record<string, unknown>).code_challenge;
      return res.redirect(appReturnUrl(target, login, challenge));
    } catch (e) {
      // 앱은 token 이 없으면 실패로 처리한다
      return res.redirect(`${target}?error=${loginErrorCode(e)}`);
    }
  }

  /** 카카오·네이버 로그인 시작 — 제공자 로그인 화면으로 보낸다 */
  @Get(':provider/start')
  start(
    @Param('provider') provider: string,
    @Query('redirect') redirect: string,
    @Query('session') session: string,
    @Query('code_challenge') challenge: string,
    @Res() res: Response,
  ) {
    const key = provider as OAuthProviderKey;
    const cfg = OAUTH[key];
    if (!cfg) throw new BadRequestException('UNSUPPORTED_PROVIDER');

    const clientId = cfg.clientId();
    if (!clientId) {
      return res.redirect(
        `${safeRedirect(redirect)}?error=${provider.toUpperCase()}_NOT_CONFIGURED`,
      );
    }

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: callbackUrl(provider),
      state: packState({
        redirect: safeRedirect(redirect),
        session,
        cc: isCodeChallenge(challenge) ? challenge : undefined,
      }),
      ...(cfg.extraAuthParams ?? {}),
    });
    return res.redirect(`${cfg.authorizeUrl}?${params.toString()}`);
  }

  /** 제공자가 코드를 들고 돌아오는 곳 → 토큰 교환 후 앱으로 */
  @Get(':provider/callback')
  async oauthCallback(
    @Param('provider') provider: string,
    @Query('code') code: string,
    @Query('state') rawState: string,
    @Res() res: Response,
  ) {
    const key = provider as OAuthProviderKey;
    if (!OAUTH[key]) throw new BadRequestException('UNSUPPORTED_PROVIDER');

    // state 가 깨졌으면 우리가 시작한 흐름이 아니다. 어디로도 토큰을 주지 않는다
    const state = unpackState(rawState);
    if (!state) return res.status(400).send('Invalid state');

    const target = safeRedirect(state.redirect);
    if (!code) return res.redirect(`${target}?error=SOCIAL_LOGIN_CANCELLED`);

    try {
      const login = await this.authService.oauthLogin(key, code, state.session);
      return res.redirect(appReturnUrl(target, login, state.cc));
    } catch (e) {
      // 내부 예외 메시지(제공자 응답, 스택, 키 일부)가 리다이렉트 URL 을 타고
      // 브라우저 히스토리·로그에 남지 않게 고정 코드만 내보낸다.
      return res.redirect(`${target}?error=${loginErrorCode(e)}`);
    }
  }
}

/**
 * 리다이렉트에 실을 오류 코드. 유저에게 알려줘야 하는 고정 코드만 통과시키고
 * 나머지는 전부 SOCIAL_LOGIN_FAILED 로 덮는다.
 */
function loginErrorCode(e: unknown): string {
  return e instanceof Error && e.message === ACCOUNT_RECENTLY_DELETED
    ? ACCOUNT_RECENTLY_DELETED
    : 'SOCIAL_LOGIN_FAILED';
}

/**
 * 로그인을 끝낸 앱으로 돌아갈 주소.
 *
 * 앱이 challenge 를 보냈으면 토큰 대신 그 challenge 에 묶인 2분짜리 일회용
 * 코드를 싣는다 — 주소를 가로챈 앱은 verifier 가 없어 쓸 수 없다.
 * 옛 앱(challenge 없음)은 OAUTH_LEGACY_TOKEN_REDIRECT 가 켜져 있는 동안만
 * 예전처럼 토큰을 받는다.
 */
function appReturnUrl(
  target: string,
  login: { accessToken: string; user: { id: unknown } },
  challenge: unknown,
): string {
  if (isCodeChallenge(challenge)) {
    const code = issueLoginCode(String(login.user.id), challenge);
    return `${target}?login_code=${encodeURIComponent(code)}`;
  }
  if (!legacyTokenRedirectAllowed()) {
    return `${target}?error=APP_UPDATE_REQUIRED`;
  }
  return `${target}?token=${encodeURIComponent(login.accessToken)}`;
}
