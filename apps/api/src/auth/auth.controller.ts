import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SocialLoginDto } from './dto/social-login.dto';
import { Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

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
    const safeRedirect = (redirect || '').startsWith('mobile://')
      ? redirect
      : 'mobile://telegram-auth';
    const authUrl =
      `${base}/auth/telegram/callback?redirect=${encodeURIComponent(safeRedirect)}` +
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
}
