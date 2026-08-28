import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SocialLoginDto } from './dto/social-login.dto';
import { Get, Param, Query, Res, BadRequestException } from '@nestjs/common';
import type { Response } from 'express';
import {
  OAUTH,
  callbackUrl,
  type OAuthProviderKey,
} from './oauth.providers';
import { packState, unpackState, safeRedirect } from './oauth-state';

@Controller('auth')
@UseGuards(RateLimitGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 한 IP 가 계정을 대량으로 찍어내지 못하게
  @RateLimit({ windowMs: 60 * 60 * 1000, max: 10 })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // 무차별 대입 방지. ip + email 조합이라 한 IP 뒤의 다른 사람이나
  // 남의 계정을 대신 잠그는 일은 안 생긴다.
  @RateLimit({ windowMs: 60 * 1000, max: 5, keyBody: 'email' })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @RateLimit({ windowMs: 60 * 1000, max: 20 })
  @Post('social')
  async socialLogin(@Body() dto: SocialLoginDto) {
    return this.authService.socialLogin(dto);
  }

  @Get('telegram/widget')
  telegramWidget(
    @Query('redirect') redirect: string,
    @Query('session') session: string,
    @Res() res: Response,
  ) {
    const botUser = process.env.TELEGRAM_BOT_USERNAME;
    const base = process.env.PUBLIC_API_URL || '';
    const target = safeRedirect(redirect);
    const authUrl =
      `${base}/auth/telegram/callback?redirect=${encodeURIComponent(target)}` +
      (session ? `&session=${encodeURIComponent(session)}` : '');

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
      const { accessToken } = await this.authService.telegramLogin(q);
      return res.redirect(`${target}?token=${encodeURIComponent(accessToken)}`);
    } catch {
      // 앱은 token 이 없으면 실패로 처리한다
      return res.redirect(`${target}?error=SOCIAL_LOGIN_FAILED`);
    }
  }

  /** 카카오·네이버 로그인 시작 — 제공자 로그인 화면으로 보낸다 */
  @Get(':provider/start')
  start(
    @Param('provider') provider: string,
    @Query('redirect') redirect: string,
    @Query('session') session: string,
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
      state: packState({ redirect: safeRedirect(redirect), session }),
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
      const { accessToken } = await this.authService.oauthLogin(
        key,
        code,
        state.session,
      );
      return res.redirect(`${target}?token=${encodeURIComponent(accessToken)}`);
    } catch {
      // 내부 예외 메시지(제공자 응답, 스택, 키 일부)가 리다이렉트 URL 을 타고
      // 브라우저 히스토리·로그에 남지 않게 고정 코드만 내보낸다.
      return res.redirect(`${target}?error=SOCIAL_LOGIN_FAILED`);
    }
  }
}
