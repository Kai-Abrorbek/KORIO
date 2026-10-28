import { Controller, Get, Header, HttpCode, Post, Query } from '@nestjs/common';
import { PushMailService } from './push-mail.service';

const PAGE: Record<'ok' | 'bad', string> = {
  ok: 'KORIO 알림 메일을 더 이상 보내지 않아요.<br>Bunday xatlar endi yuborilmaydi.<br>Мы больше не будем присылать такие письма.<br>You won’t get these emails anymore.',
  bad: '링크가 올바르지 않아요.<br>Havola noto‘g‘ri.<br>Ссылка недействительна.<br>This link is not valid.',
};

const page = (kind: 'ok' | 'bad') => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>KORIO</title></head>
<body style="margin:0;background:#F4F4F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<div style="max-width:420px;margin:60px auto;background:#fff;border-radius:20px;padding:32px;text-align:center;">
<div style="font-size:22px;font-weight:800;color:#776ee2;margin-bottom:18px;">KORIO</div>
<div style="font-size:15px;line-height:1.7;color:#1B1B22;">${PAGE[kind]}</div>
</div></body></html>`;

/**
 * 알림 메일의 "수신 거부" 링크. 로그인 없이 연다 — 링크에 서명이 들어 있다.
 * POST 는 메일 앱의 원클릭 수신 거부(List-Unsubscribe-Post)용.
 */
@Controller('mail/unsubscribe')
export class MailUnsubscribeController {
  constructor(private readonly mail: PushMailService) {}

  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  async page(@Query('u') userId?: string, @Query('t') token?: string) {
    const ok = await this.mail.unsubscribe(userId ?? '', token ?? '');
    return page(ok ? 'ok' : 'bad');
  }

  @Post()
  @HttpCode(200)
  async oneClick(@Query('u') userId?: string, @Query('t') token?: string) {
    return { ok: await this.mail.unsubscribe(userId ?? '', token ?? '') };
  }
}
