import { Logger } from '@nestjs/common';

const EXPO_SEND_URL = 'https://exp.host/--/api/v2/push/send';
const EXPO_RECEIPTS_URL = 'https://exp.host/--/api/v2/push/getReceipts';
/** 영수증 조회 한 번에 넣을 수 있는 최대 id 수 */
const RECEIPT_CHUNK = 1000;
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
  /** ok 티켓의 id — 나중에 영수증을 물어볼 때 쓴다 */
  ticketId?: string;
}

export interface ExpoReceipt {
  status: 'ok' | 'error';
  message?: string;
  details?: { error?: string };
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
 * 티켓(즉시 응답)은 "Expo 가 받았다" 는 뜻일 뿐이다. 실제 전달 실패 —
 * 특히 재설치로 죽은 토큰(DeviceNotRegistered) — 는 몇 초~몇 분 뒤
 * **영수증**으로 온다. 그래서 ok 티켓의 id 를 돌려주고, push.service 가
 * 저장해 뒀다가 크론으로 영수증을 확인한다 (checkReceipts).
 */
export class ExpoPushClient {
  private readonly logger = new Logger(ExpoPushClient.name);

  private get accessToken(): string | undefined {
    // Expo 계정에서 "enhanced security" 를 켠 경우에만 필요하다.
    return process.env.EXPO_ACCESS_TOKEN || undefined;
  }

  /**
   * 영수증 조회. 아직 준비 안 된 id 는 결과에 없다 (나중에 다시 물어본다).
   * 요청 자체가 실패하면 빈 객체 — 다음 주기에 다시 하면 된다.
   */
  async getReceipts(ids: string[]): Promise<Record<string, ExpoReceipt>> {
    const out: Record<string, ExpoReceipt> = {};
    for (let i = 0; i < ids.length; i += RECEIPT_CHUNK) {
      const chunk = ids.slice(i, i + RECEIPT_CHUNK);
      try {
        const res = await fetch(EXPO_RECEIPTS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(this.accessToken
              ? { Authorization: `Bearer ${this.accessToken}` }
              : {}),
          },
          body: JSON.stringify({ ids: chunk }),
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        const json: any = await res.json().catch(() => null);
        if (!res.ok || !json?.data) {
          this.logger.warn(
            `Expo 영수증 조회 거절 (${res.status}) — ${JSON.stringify(json)?.slice(0, 300)}`,
          );
          continue;
        }
        Object.assign(out, json.data);
      } catch (e) {
        this.logger.warn(`Expo 영수증 조회 실패: ${(e as Error).message}`);
      }
    }
    return out;
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
        if (ticket?.status === 'ok') {
          return { token: m.to, ok: true, ticketId: ticket.id };
        }
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

/**
 * 죽은 토큰인지 — 그 토큰에 다시 보내면 안 되는 에러인지.
 *
 * InvalidCredentials · MismatchSenderId 는 넣지 않는다. 그건 **우리 FCM 키**
 * 문제라 모든 토큰에서 똑같이 난다 — 토큰 탓으로 돌리면 키를 고친 뒤에도
 * 전 유저 토큰이 죽은 걸로 남는다.
 */
export function isDeadTokenError(error?: string): boolean {
  return error === 'DeviceNotRegistered';
}

/** 우리 쪽 자격증명(EAS 에 올린 FCM 키) 문제 — 토큰을 건드리지 말고 크게 알린다 */
export function isCredentialError(error?: string): boolean {
  return error === 'InvalidCredentials' || error === 'MismatchSenderId';
}

/** Expo 토큰 모양인지. 아무 문자열이나 저장하면 발송할 때마다 실패한다 */
export function isExpoToken(token: string): boolean {
  return /^Expo(nent)?PushToken\[[^\]]+\]$/.test(token.trim());
}
