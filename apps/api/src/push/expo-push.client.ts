import { Logger } from '@nestjs/common';

const EXPO_SEND_URL = 'https://exp.host/--/api/v2/push/send';
/** Expo 가 한 요청에 받는 최대 개수 */
const CHUNK = 100;
const TIMEOUT_MS = 10_000;

export interface ExpoPushRequest {
  to: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  /** 안드로이드 알림 채널. 앱에서 만든 채널 id 와 같아야 소리·중요도가 먹는다 */
  channelId?: string;
}

export interface ExpoPushOutcome {
  token: string;
  ok: boolean;
  /** 'DeviceNotRegistered' 면 이 토큰은 죽었다 — 다시 보내면 안 된다 */
  error?: string;
}

/**
 * Expo Push 서비스로 보내는 얇은 클라이언트.
 *
 * 왜 firebase-admin 이 아니라 Expo 인가:
 *  - 이 앱은 이미 EAS 로 빌드된다 (app.json 에 projectId, expo-updates 사용).
 *    FCM 자격증명은 EAS 에 한 번 올려두면 되고, 서버는 서비스 계정 JSON 을
 *    들고 있을 필요가 없다. 서버에 비밀 하나를 덜 둘수록 좋다.
 *  - iOS 를 붙일 때 APNs 인증서 관리가 통째로 사라진다.
 *
 * ⚠️ 여기서는 티켓(즉시 응답)의 에러만 처리한다. Expo 는 일부 실패를
 * 나중에 영수증(receipt)으로 알려주므로, 죽은 토큰이 조금 늦게 걸리는
 * 경우가 있다. 그래서 오래 안 보인 토큰은 발송 대상에서 빼는 규칙을
 * push.service 쪽에 같이 뒀다.
 */
export class ExpoPushClient {
  private readonly logger = new Logger(ExpoPushClient.name);

  private get accessToken(): string | undefined {
    // Expo 계정에서 "enhanced security" 를 켠 경우에만 필요하다.
    return process.env.EXPO_ACCESS_TOKEN || undefined;
  }

  async send(messages: ExpoPushRequest[]): Promise<ExpoPushOutcome[]> {
    const out: ExpoPushOutcome[] = [];
    for (let i = 0; i < messages.length; i += CHUNK) {
      const chunk = messages.slice(i, i + CHUNK);
      out.push(...(await this.sendChunk(chunk)));
    }
    return out;
  }

  private async sendChunk(
    chunk: ExpoPushRequest[],
  ): Promise<ExpoPushOutcome[]> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    };
    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    try {
      const res = await fetch(EXPO_SEND_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(
          chunk.map((m) => ({
            to: m.to,
            title: m.title,
            body: m.body,
            data: m.data ?? {},
            sound: 'default',
            priority: 'high',
            channelId: m.channelId ?? 'default',
          })),
        ),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      const json: any = await res.json().catch(() => null);

      if (!res.ok || !json) {
        // Expo 가 통째로 거절했다. 토큰 탓이 아니므로 죽었다고 표시하지 않는다.
        this.logger.warn(
          `Expo push 거절 (${res.status}) — ${JSON.stringify(json)?.slice(0, 300)}`,
        );
        return chunk.map((m) => ({ token: m.to, ok: false }));
      }

      const tickets: any[] = Array.isArray(json.data) ? json.data : [];
      return chunk.map((m, idx) => {
        const ticket = tickets[idx];
        if (ticket?.status === 'ok') return { token: m.to, ok: true };
        return {
          token: m.to,
          ok: false,
          error: ticket?.details?.error ?? ticket?.message ?? 'UNKNOWN',
        };
      });
    } catch (e) {
      // 네트워크 실패는 토큰 문제가 아니다. 다음 주기에 다시 보내면 된다.
      this.logger.warn(`Expo push 전송 실패: ${(e as Error).message}`);
      return chunk.map((m) => ({ token: m.to, ok: false }));
    }
  }
}

/** 죽은 토큰인지 — 다시 보내면 안 되는 에러인지 */
export function isDeadTokenError(error?: string): boolean {
  return error === 'DeviceNotRegistered' || error === 'InvalidCredentials';
}

/** Expo 토큰 모양인지. 아무 문자열이나 저장하면 발송할 때마다 실패한다 */
export function isExpoToken(token: string): boolean {
  return /^Expo(nent)?PushToken\[[^\]]+\]$/.test(token.trim());
}
