import { Injectable } from '@nestjs/common';

/** 운영자 텔레그램 id (TELEGRAM_ADMIN_IDS, 쉼표) — /refund · 카드 입금 승인 */
export function telegramAdminIds(): string[] {
  return [
    ...new Set(
      (process.env.TELEGRAM_ADMIN_IDS ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter((s) => /^-?\d+$/.test(s)),
    ),
  ];
}

/** 텔레그램이 ok:false 로 답했을 때. 메시지에 토큰이 섞이지 않는다 */
export class TelegramApiError extends Error {
  constructor(
    readonly method: string,
    readonly code: number,
    readonly description: string,
  ) {
    super(`Telegram ${method} 실패 (${code}): ${description}`);
  }
}

/**
 * Bot API 를 부르는 얇은 클라이언트. 결제(Stars)·봇 답장에만 쓴다.
 *
 * 토큰은 TELEGRAM_BOT_TOKEN (미니앱 initData 검증과 같은 봇). URL 에 토큰이
 * 들어가므로 에러·로그에는 메서드 이름만 남긴다.
 */
@Injectable()
export class TelegramBotApi {
  private token(): string {
    return (process.env.TELEGRAM_BOT_TOKEN ?? '').trim();
  }

  get enabled(): boolean {
    return this.token().length > 0;
  }

  async call<T>(
    method: string,
    params: Record<string, unknown>,
    timeoutMs = 8000,
  ): Promise<T> {
    const token = this.token();
    if (!token)
      throw new TelegramApiError(method, 0, 'TELEGRAM_BOT_TOKEN_MISSING');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(
        `https://api.telegram.org/bot${token}/${method}`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(params),
          signal: controller.signal,
        },
      );
      const body = (await res.json().catch(() => null)) as {
        ok?: boolean;
        result?: T;
        error_code?: number;
        description?: string;
      } | null;
      if (!body?.ok) {
        throw new TelegramApiError(
          method,
          body?.error_code ?? res.status,
          body?.description ?? 'NO_BODY',
        );
      }
      return body.result as T;
    } catch (error) {
      if (error instanceof TelegramApiError) throw error;
      const aborted = (error as { name?: string })?.name === 'AbortError';
      throw new TelegramApiError(method, 0, aborted ? 'TIMEOUT' : 'NETWORK');
    } finally {
      clearTimeout(timer);
    }
  }
  /**
   * 파일을 같이 올리는 호출 (sendPhoto 등). 객체 값은 JSON 문자열로 보낸다
   * (reply_markup 처럼 multipart 안에서는 문자열이어야 하는 필드).
   */
  async upload<T>(
    method: string,
    fields: Record<string, string | number | object>,
    file: { field: string; buffer: Buffer; filename: string; mime: string },
    timeoutMs = 20_000,
  ): Promise<T> {
    const token = this.token();
    if (!token)
      throw new TelegramApiError(method, 0, 'TELEGRAM_BOT_TOKEN_MISSING');

    const form = new FormData();
    for (const [key, value] of Object.entries(fields)) {
      form.append(
        key,
        typeof value === 'object' ? JSON.stringify(value) : String(value),
      );
    }
    form.append(
      file.field,
      new Blob([new Uint8Array(file.buffer)], { type: file.mime }),
      file.filename,
    );

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(
        `https://api.telegram.org/bot${token}/${method}`,
        {
          method: 'POST',
          body: form,
          signal: controller.signal,
        },
      );
      const body = (await res.json().catch(() => null)) as {
        ok?: boolean;
        result?: T;
        error_code?: number;
        description?: string;
      } | null;
      if (!body?.ok) {
        throw new TelegramApiError(
          method,
          body?.error_code ?? res.status,
          body?.description ?? 'NO_BODY',
        );
      }
      return body.result as T;
    } catch (error) {
      if (error instanceof TelegramApiError) throw error;
      const aborted = (error as { name?: string })?.name === 'AbortError';
      throw new TelegramApiError(method, 0, aborted ? 'TIMEOUT' : 'NETWORK');
    } finally {
      clearTimeout(timer);
    }
  }
}
