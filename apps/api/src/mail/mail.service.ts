import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MailMessage, MailTransport } from './mail.types';

/** 메일 API 가 안 죽고 늘어질 때 요청까지 같이 붙잡히지 않게 */
const SEND_TIMEOUT_MS = 10_000;

/**
 * 한 통씩 이 간격을 두고 보낸다. Resend 는 기본이 초당 2건이라, 알림 메일을 한꺼번에
 * 몰아 보내면(전체 공지 · 매시 미접속 알림) 429 로 떨어진다.
 */
const SEND_GAP_MS = 550;

/**
 * Resend HTTP API.
 *
 * SMTP(nodemailer) 대신 이걸 쓴 이유: 의존성이 하나도 안 늘어난다.
 * 노드 20 의 fetch 만으로 끝나서 lockfile 을 안 건드리고, 배포 파이프라인이
 * 흔들릴 일이 없다. 다른 업체로 갈아탈 때는 MailTransport 를 하나 더
 * 구현해서 pickTransport 에 끼우면 된다.
 */
class ResendTransport implements MailTransport {
  readonly name = 'resend';

  constructor(
    private readonly apiKey: string,
    private readonly from: string,
  ) {}

  async send(msg: MailMessage): Promise<void> {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), SEND_TIMEOUT_MS);
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.from,
          to: [msg.to],
          subject: msg.subject,
          html: msg.html,
          text: msg.text,
          ...(msg.headers ? { headers: msg.headers } : {}),
        }),
        signal: ac.signal,
      });
      if (!res.ok) {
        // 본문에 키가 실릴 일은 없지만, 그래도 길이를 잘라서 로그를 짧게 유지한다
        const body = await res.text().catch(() => '');
        throw new Error(`resend ${res.status}: ${body.slice(0, 200)}`);
      }
    } finally {
      clearTimeout(timer);
    }
  }
}

/**
 * 발송 설정이 없을 때 쓰는 대체 transport.
 * 개발 중에 메일 계정 없이도 코드 흐름을 끝까지 볼 수 있게 한다.
 */
class LogTransport implements MailTransport {
  readonly name = 'log';
  private readonly logger = new Logger('MailService');

  send(msg: MailMessage): Promise<void> {
    this.logger.warn(
      `메일 미설정 — 발송 안 함\n  to: ${msg.to}\n  subject: ${msg.subject}\n  ${msg.text.replace(/\n/g, '\n  ')}`,
    );
    return Promise.resolve();
  }
}

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private readonly transport: MailTransport;
  /** 보내기 줄 — 앞 메일이 끝나고 SEND_GAP_MS 가 지나야 다음이 나간다 */
  private queue: Promise<unknown> = Promise.resolve();

  constructor() {
    this.transport = MailService.pickTransport();
  }

  /** LogTransport는 개발용이며 실제로 메일을 전달하지 않는다. */
  isDeliveryConfigured(): boolean {
    return this.transport.name !== 'log';
  }

  private static pickTransport(): MailTransport {
    const key = process.env.RESEND_API_KEY?.trim();
    const from =
      process.env.MAIL_FROM?.trim() || 'KORIO <no-reply@korio.online>';
    return key ? new ResendTransport(key, from) : new LogTransport();
  }

  onModuleInit() {
    if (this.transport.name === 'log') {
      // 부팅을 막지는 않는다. 메일이 없다고 앱 전체가 못 뜰 이유는 없고,
      // 대신 배포된 서버에서 조용히 안 나가는 상황만은 눈에 띄어야 한다.
      const where = process.env.NODE_ENV === 'production' ? '⚠️ 운영' : '개발';
      this.logger.warn(
        `${where} 서버에 RESEND_API_KEY 가 없다. 비밀번호 재설정 메일이 발송되지 않고 로그로만 남는다.`,
      );
    } else {
      this.logger.log(`메일 발송: ${this.transport.name}`);
    }
  }

  /**
   * 한 통 보낸다.
   *
   * 던지지 않는다 — 부르는 쪽(비밀번호 찾기)은 메일이 실패해도 응답을 바꾸면
   * 안 된다. "이 주소로는 메일이 안 갔다" 가 곧 "그 계정이 있다/없다" 를
   * 알려주는 신호가 되기 때문이다. 실패는 로그로만 남긴다.
   */
  async send(msg: MailMessage): Promise<boolean> {
    const turn = this.queue.then(() => this.sendNow(msg));
    // 다음 메일은 이 메일이 끝나고(성공·실패 상관없이) 간격을 둔 뒤에
    this.queue = turn.then(
      () => new Promise((resolve) => setTimeout(resolve, SEND_GAP_MS)),
    );
    return turn;
  }

  private async sendNow(msg: MailMessage): Promise<boolean> {
    try {
      await this.transport.send(msg);
      return true;
    } catch (e) {
      this.logger.error(
        `메일 발송 실패 (${msg.to.replace(/(.).*(@.*)/, '$1***$2')}): ${(e as Error).message}`,
      );
      return false;
    }
  }
}
