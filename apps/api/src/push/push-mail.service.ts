import { createHmac, timingSafeEqual } from 'node:crypto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { dayKey, resolveTimezone } from '../common/date.util';
import { jwtSecret } from '../config/secrets';
import { MailService } from '../mail/mail.service';
import { notificationMail } from '../mail/mail.templates';
import { resolveMailLang } from '../mail/mail.types';
import { User, UserDocument } from '../users/schemas/user.schema';
import { buildCopy, type PushCopy } from './push-copy';
import { PushLog, PushLogDocument } from './schemas/push-log.schema';
import {
  DEFAULT_PUSH_LANG,
  PREF_KEY_OF,
  PushType,
  isEngagement,
  resolvePushLang,
} from './push.types';

/** 알림 메일은 하루 한 통까지 (미접속 알림). 운영 공지는 세지 않는다 */
export const MAIL_ENGAGEMENT_DAILY_MAX = 1;

/** 장부(PushLog)에서 메일 줄을 푸시 줄과 가르는 접두사 */
const MAIL_PREFIX = 'mail:';

const SITE_URL = 'https://korio.online';

export interface MailNoticeOptions {
  /** 중복 판정 키 — 같은 값이면 한 번만 (푸시와 같은 키를 써도 메일 줄은 따로 센다) */
  dedupKey: string;
  params?: Record<string, any>;
  rotation?: number;
  /** 운영 공지처럼 문구가 정해져 있으면 */
  copy?: PushCopy;
  copyByLang?: Record<string, PushCopy>;
}

/**
 * 알림 메일 — 푸시가 닿지 않는 사람에게 같은 알림을 메일로 보낸다.
 *
 *  - 이메일이 없는 계정(텔레그램 가입 등)은 건너뛴다 (다른 대책은 나중에)
 *  - 메일 아래 "수신 거부" 를 누른 사람(emailNotifications=false)에게는 안 보낸다
 *  - 미접속 알림은 앱 알림 설정(전체 · 매일 알림)을 끈 사람에게도 안 보낸다 — 스스로 끈 것이다
 *  - 장부를 먼저 쓰고 보낸다 (PushService.send 와 같은 이유: blue/green 이 겹쳐도 한 번만)
 */
@Injectable()
export class PushMailService {
  private readonly logger = new Logger(PushMailService.name);

  constructor(
    private readonly mail: MailService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(PushLog.name)
    private readonly logModel: Model<PushLogDocument>,
  ) {}

  /** @returns 실제로 메일을 보냈으면 true */
  async send(
    userId: string | Types.ObjectId,
    type: PushType,
    opts: MailNoticeOptions,
  ): Promise<boolean> {
    const uid = new Types.ObjectId(userId);
    const user = await this.userModel
      .findById(uid)
      .select('email appLanguage timezone pushPrefs emailNotifications isBot')
      .lean<{
        email?: string;
        appLanguage?: string;
        timezone?: string;
        pushPrefs?: Record<string, boolean>;
        emailNotifications?: boolean;
        isBot?: boolean;
      }>();
    const email = user?.email?.trim();
    if (!user || !email || !email.includes('@') || user.isBot) return false;
    if (user.emailNotifications === false) return false;

    const counted = isEngagement(type);
    if (counted && !this.reminderAllowed(user.pushPrefs, type)) return false;

    const today = dayKey(new Date(), resolveTimezone(user.timezone));
    if (counted) {
      const used = await this.logModel.countDocuments({
        userId: uid,
        dayKey: today,
        counted: true,
        dedupKey: { $regex: `^${MAIL_PREFIX}` },
      });
      if (used >= MAIL_ENGAGEMENT_DAILY_MAX) return false;
    }

    const lang = resolvePushLang(user.appLanguage);
    const copy =
      opts.copy ??
      opts.copyByLang?.[lang] ??
      opts.copyByLang?.[DEFAULT_PUSH_LANG] ??
      buildCopy(type, lang, opts.params ?? {}, opts.rotation ?? 0);
    if (!copy) return false;

    const dedupKey = `${MAIL_PREFIX}${opts.dedupKey}`;
    try {
      await this.logModel.create({
        userId: uid,
        dedupKey,
        type,
        counted,
        dayKey: today,
        delivered: false,
      });
    } catch (e: unknown) {
      if ((e as { code?: number })?.code === 11000) return false;
      throw e;
    }

    const sent = await this.mail.send(
      notificationMail(email, resolveMailLang(lang), {
        title: copy.title,
        body: copy.body,
        openUrl: SITE_URL,
        unsubscribeUrl: this.unsubscribeUrl(uid.toString()),
      }),
    );
    if (sent) {
      await this.logModel
        .updateOne({ userId: uid, dedupKey }, { $set: { delivered: true } })
        .catch(() => undefined);
    }
    return sent;
  }

  // ─────────────────────────── 수신 거부 ───────────────────────────

  /** 링크 서명 — 남의 id 를 넣어 다른 사람을 수신 거부시키지 못하게 */
  private sign(userId: string): string {
    return createHmac('sha256', jwtSecret())
      .update(`mail-unsubscribe:${userId}`)
      .digest('base64url')
      .slice(0, 32);
  }

  unsubscribeUrl(userId: string): string {
    const base = (process.env.PUBLIC_API_URL || '').replace(/\/$/, '');
    return `${base}/mail/unsubscribe?u=${userId}&t=${this.sign(userId)}`;
  }

  /** 링크가 맞으면 알림 메일을 끈다. 이미 꺼져 있어도 성공 */
  async unsubscribe(userId: string, token: string): Promise<boolean> {
    if (!isValidObjectId(userId) || !token) return false;
    const expected = Buffer.from(this.sign(userId));
    const given = Buffer.from(token);
    if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
      return false;
    }
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { emailNotifications: false } },
    );
    this.logger.log(`알림 메일 수신 거부: user=${userId}`);
    return true;
  }

  /** 앱 알림 설정 — 미접속 알림은 스스로 끈 사람에게 메일로도 안 보낸다 */
  private reminderAllowed(
    prefs: Record<string, boolean> | undefined,
    type: PushType,
  ): boolean {
    if (prefs?.master === false) return false;
    const key = PREF_KEY_OF[type];
    return !key || prefs?.[key] !== false;
  }
}
