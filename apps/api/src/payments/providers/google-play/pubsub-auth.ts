import { Logger } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

/**
 * Google Play 서버 알림(RTDN)은 Pub/Sub push 로 온다.
 *
 * 이 엔드포인트는 로그인 가드가 없다 — 구글이 부르는 자리니까. 그래서
 * "정말 구글이 보낸 것인가"를 여기서 판단해야 한다. 안 그러면 아무나
 * 우리 서버에 요청을 던져서 구글 API 호출 쿼터를 태울 수 있다.
 *
 * 두 방식을 지원한다.
 *  1) 인증된 push (권장): Pub/Sub 이 Authorization: Bearer <OIDC JWT> 를 붙인다.
 *     구독 설정의 서비스 계정으로 서명돼 있어서 위조가 안 된다.
 *  2) 공유 비밀 (간이): push URL 에 ?key=... 를 박아두고 대조한다.
 *     OIDC 를 설정 못 하는 환경용. URL 이 로그에 남을 수 있어 차선책이다.
 *
 * 둘 다 설정 안 하면 프로덕션에서는 전부 거절한다. 조용히 열어두지 않는다.
 */
const logger = new Logger('PubSubAuth');
let client: OAuth2Client | null = null;

export interface PubSubAuthResult {
  ok: boolean;
  reason?: string;
}

export async function verifyPubSubRequest(
  headers: Record<string, string | string[] | undefined>,
  query: Record<string, unknown>,
): Promise<PubSubAuthResult> {
  const secret = process.env.GOOGLE_PUBSUB_PUSH_SECRET?.trim();
  const audience = process.env.GOOGLE_PUBSUB_AUDIENCE?.trim();
  const senderEmail = process.env.GOOGLE_PUBSUB_SERVICE_ACCOUNT?.trim();

  // 1) 공유 비밀
  if (secret) {
    const given = String(query?.key ?? '');
    // 길이가 달라도 조기 반환하지 않도록 고정 길이로 비교
    if (given.length === secret.length && timingSafeEq(given, secret)) {
      return { ok: true };
    }
    // 비밀이 설정돼 있는데 안 맞으면, OIDC 도 없으면 거절
    if (!audience) return { ok: false, reason: 'BAD_PUSH_KEY' };
  }

  // 2) 인증된 push (OIDC)
  if (audience) {
    const raw = headers['authorization'] ?? headers['Authorization'];
    const header = Array.isArray(raw) ? raw[0] : raw;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return { ok: false, reason: 'NO_OIDC_TOKEN' };

    try {
      client ??= new OAuth2Client();
      const ticket = await client.verifyIdToken({ idToken: token, audience });
      const payload = ticket.getPayload();
      if (!payload) return { ok: false, reason: 'EMPTY_OIDC_PAYLOAD' };
      // 서비스 계정까지 못 박아두면, 아무 구글 계정이나 우리 audience 로
      // 토큰을 만들어 보낼 수 있다
      if (senderEmail && payload.email !== senderEmail) {
        return { ok: false, reason: 'UNEXPECTED_SENDER' };
      }
      if (senderEmail && payload.email_verified === false) {
        return { ok: false, reason: 'UNVERIFIED_SENDER' };
      }
      return { ok: true };
    } catch (e) {
      logger.warn(`OIDC 검증 실패: ${(e as Error).message}`);
      return { ok: false, reason: 'BAD_OIDC_TOKEN' };
    }
  }

  // 아무것도 설정 안 됨
  if (process.env.NODE_ENV === 'production') {
    logger.error(
      'RTDN 웹훅 인증이 설정되지 않았다. GOOGLE_PUBSUB_AUDIENCE 또는 ' +
        'GOOGLE_PUBSUB_PUSH_SECRET 을 넣어라. 그때까지 알림을 전부 거절한다.',
    );
    return { ok: false, reason: 'WEBHOOK_AUTH_NOT_CONFIGURED' };
  }
  // 개발 환경에서는 통과시키되 시끄럽게 알린다
  logger.warn('⚠️ RTDN 웹훅 인증 미설정 — 개발 환경이라 통과시킨다');
  return { ok: true };
}

/** 길이가 같은 문자열끼리 상수 시간 비교 */
function timingSafeEq(a: string, b: string): boolean {
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
