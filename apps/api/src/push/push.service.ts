import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { dayKey, resolveTimezone } from '../common/date.util';
import {
  DeviceToken,
  DeviceTokenDocument,
} from './schemas/device-token.schema';
import { PushLog, PushLogDocument } from './schemas/push-log.schema';
import {
  ExpoPushClient,
  isDeadTokenError,
  isExpoToken,
  type ExpoPushRequest,
} from './expo-push.client';
import { buildCopy, type PushCopy } from './push-copy';
import {
  DEFAULT_PUSH_LANG,
  ENGAGEMENT_DAILY_MAX,
  PREF_KEY_OF,
  PushType,
  isEngagement,
  resolvePushLang,
  type PushLang,
} from './push.types';

/** 이만큼 안 보인 토큰은 죽은 걸로 본다. 앱을 열면 매번 갱신된다 */
const STALE_TOKEN_DAYS = 120;

/** 테스트 발송에서 알림을 눌렀을 때 갈 곳 */
const LINK_OF: Partial<Record<PushType, string>> = {
  [PushType.FOLLOW]: '/friends',
  [PushType.TRIAL_ENDING]: '/premium',
  [PushType.GUIDED_IDLE]: '/study-path',
  [PushType.LEAGUE_PROMOTED]: '/(tabs)/league',
  [PushType.LEAGUE_DEMOTED]: '/(tabs)/league',
  [PushType.LEAGUE_RESULT]: '/(tabs)/league',
};

export interface SendOptions {
  /** 문구에 끼워 넣을 값 */
  params?: Record<string, any>;
  /** 눌렀을 때 갈 앱 내 경로 */
  link?: string;
  /**
   * 중복 판정 키. 같은 값으로 두 번 부르면 두 번째는 안 나간다.
   * 안 넘기면 매번 새로 보낸다 (팔로우처럼 여러 번 와야 정상인 것).
   */
  dedupKey?: string;
  /** 문구 변형 선택값. 같은 날 같은 문장이 반복되지 않게 날짜에서 만든다 */
  rotation?: number;
  /** 표에 없는 문구를 직접 넘길 때 (테스트 발송) */
  copy?: PushCopy;
  /**
   * 언어별 문구 (어드민 공지).
   * 유저 언어를 안 뒤에 고른다 — 없는 언어는 기본 언어로 떨어진다.
   */
  copyByLang?: Record<string, PushCopy>;
  /** 안드로이드 알림 채널 강제 */
  channelId?: string;
}

@Injectable()
export class PushService {
  private readonly logger = new Logger(PushService.name);
  private readonly expo = new ExpoPushClient();

  constructor(
    @InjectModel(DeviceToken.name)
    private readonly tokenModel: Model<DeviceTokenDocument>,
    @InjectModel(PushLog.name)
    private readonly logModel: Model<PushLogDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // ─────────────────────────── 토큰 관리 ───────────────────────────

  /**
   * 기기 토큰 등록.
   *
   * 유일 키가 token 이라 upsert 다. 같은 폰에 다른 계정이 로그인하면
   * 주인이 바뀐다 — 안 그러면 앞사람 알림이 뒷사람 폰으로 간다.
   */
  async register(
    userId: string,
    dto: {
      token: string;
      platform?: string;
      deviceName?: string;
      appVersion?: string;
    },
  ) {
    const token = dto.token?.trim();
    // 모양이 틀린 토큰을 저장하면 발송할 때마다 조용히 실패한다. 여기서 막는다.
    if (!token || !isExpoToken(token)) return { success: false };

    await this.tokenModel.updateOne(
      { token },
      {
        $set: {
          userId: new Types.ObjectId(userId),
          platform: dto.platform || 'android',
          deviceName: dto.deviceName || '',
          appVersion: dto.appVersion || '',
          lastSeenAt: new Date(),
          invalidAt: null,
        },
      },
      { upsert: true },
    );
    return { success: true };
  }

  /** 로그아웃·알림 끄기. 토큰을 지운다 */
  async unregister(userId: string, token: string) {
    await this.tokenModel.deleteOne({
      token: token?.trim(),
      userId: new Types.ObjectId(userId),
    });
    return { success: true };
  }

  /** 이 유저에게 지금 보낼 수 있는 토큰들 */
  private async liveTokens(userId: Types.ObjectId): Promise<string[]> {
    const stale = new Date(Date.now() - STALE_TOKEN_DAYS * 86400_000);
    const rows = await this.tokenModel
      .find({ userId, invalidAt: null, lastSeenAt: { $gte: stale } })
      .select('token')
      .lean();
    return rows.map((r) => r.token);
  }

  /** 어떤 유저들이 푸시를 받을 수 있는지 (스케줄러가 대상 좁힐 때) */
  async userIdsWithTokens(): Promise<Types.ObjectId[]> {
    const stale = new Date(Date.now() - STALE_TOKEN_DAYS * 86400_000);
    return this.tokenModel.distinct('userId', {
      invalidAt: null,
      lastSeenAt: { $gte: stale },
    });
  }

  // ─────────────────────────── 발송 ───────────────────────────

  /**
   * 한 유저에게 한 건.
   *
   * 순서가 중요하다: **장부(PushLog)를 먼저 쓰고** 나서 보낸다.
   * 반대로 하면 blue/green 배포로 컨테이너가 겹치는 순간 같은 크론이 양쪽에서
   * 돌아 알림이 두 번 간다. 유니크 인덱스가 잠금 역할을 하고, 못 잡으면
   * 남이 이미 보낸 것이니 조용히 물러난다.
   *
   * 대가로 전송이 실패해도 그날치 슬롯은 소모된다. 알림을 두 번 보내는 것보다
   * 한 번 거르는 쪽이 낫다.
   *
   * @returns 실제로 발송을 시도했으면 true
   */
  async send(
    userId: string | Types.ObjectId,
    type: PushType,
    opts: SendOptions = {},
  ): Promise<boolean> {
    const uid = new Types.ObjectId(userId);

    const user = await this.userModel
      .findById(uid)
      .select('appLanguage timezone pushPrefs')
      .lean();
    if (!user) return false;

    if (!this.allowed(user as any, type)) return false;

    const tz = resolveTimezone((user as any).timezone);
    const today = dayKey(new Date(), tz);
    const counted = isEngagement(type);

    if (counted) {
      const used = await this.logModel.countDocuments({
        userId: uid,
        dayKey: today,
        counted: true,
      });
      if (used >= ENGAGEMENT_DAILY_MAX) return false;
    }

    // 장부 선점. 여기서 걸리면 이미 나간 것이다.
    const dedupKey = opts.dedupKey ?? `${type}:${Date.now()}:${Math.random()}`;
    try {
      await this.logModel.create({
        userId: uid,
        dedupKey,
        type,
        counted,
        dayKey: today,
        delivered: false,
      });
    } catch (e: any) {
      if (e?.code === 11000) return false; // 중복 — 이미 보냈다
      throw e;
    }

    const lang: PushLang = resolvePushLang((user as any).appLanguage);
    const copy =
      opts.copy ??
      opts.copyByLang?.[lang] ??
      opts.copyByLang?.[DEFAULT_PUSH_LANG] ??
      buildCopy(type, lang, opts.params ?? {}, opts.rotation ?? 0);
    if (!copy) return false;

    const delivered = await this.deliver(uid, copy, {
      type,
      link: opts.link,
      params: opts.params,
      channelId: opts.channelId ?? (counted ? 'study' : 'default'),
    });

    if (delivered) {
      await this.logModel
        .updateOne({ userId: uid, dedupKey }, { $set: { delivered: true } })
        .catch(() => {});
    }
    return delivered;
  }

  /** 실제 전송. 설정·한도·중복 판단이 끝난 뒤에만 부른다 */
  private async deliver(
    uid: Types.ObjectId,
    copy: PushCopy,
    meta: {
      type: string;
      link?: string;
      params?: Record<string, any>;
      channelId?: string;
    },
  ): Promise<boolean> {
    const tokens = await this.liveTokens(uid);
    if (!tokens.length) return false;

    const messages: ExpoPushRequest[] = tokens.map((to) => ({
      to,
      title: copy.title,
      body: copy.body,
      channelId: meta.channelId ?? 'default',
      data: {
        type: meta.type,
        link: meta.link ?? '',
        ...(meta.params ?? {}),
      },
    }));

    const outcomes = await this.expo.send(messages);
    await this.retireDeadTokens(outcomes);
    return outcomes.some((o) => o.ok);
  }

  // ─────────────────────────── 설정 ───────────────────────────

  /**
   * 알림 스위치·시간·언어.
   *
   * 스위치는 기기가 아니라 계정에 붙어야 한다 — 발송을 결정하는 건 서버 크론이라
   * 앱 로컬에만 저장하면 꺼도 계속 온다.
   */
  async updateSettings(
    userId: string,
    dto: {
      master?: boolean;
      daily?: boolean;
      streak?: boolean;
      league?: boolean;
      friends?: boolean;
      events?: boolean;
      dailyHour?: number;
      appLanguage?: string;
    },
  ) {
    const set: Record<string, any> = {};
    for (const key of [
      'master',
      'daily',
      'streak',
      'league',
      'friends',
      'events',
    ] as const) {
      if (typeof dto[key] === 'boolean') set[`pushPrefs.${key}`] = dto[key];
    }
    if (typeof dto.dailyHour === 'number') {
      set.reminderHour = dto.dailyHour;
      set.reminderEnabled = dto.daily !== false;
    }
    if (dto.appLanguage) set.appLanguage = dto.appLanguage;

    if (Object.keys(set).length) {
      await this.userModel.updateOne(
        { _id: new Types.ObjectId(userId) },
        { $set: set },
      );
    }
    return { success: true };
  }

  /**
   * 내 폰으로 테스트 한 방.
   *
   * 설정 스위치·하루 한도·중복 판정을 전부 건너뛴다 — 테스트인데 "오늘 이미
   * 2건 나갔다" 로 막히면 확인할 방법이 없다. 그래서 자기 자신에게만 쓴다.
   */
  async sendTest(
    userId: string,
    type: PushType = PushType.ENGAGE,
    params: Record<string, any> = {},
    rotation?: number,
  ) {
    const uid = new Types.ObjectId(userId);
    const user = await this.userModel
      .findById(uid)
      .select('appLanguage nickname')
      .lean();
    const lang = resolvePushLang((user as any)?.appLanguage);

    // 문구에 필요한 값을 안 넘겨도 빈칸이 안 보이게 그럴듯한 기본값을 채운다
    const filled = {
      nickname: (user as any)?.nickname ?? 'KORIO',
      days: 3,
      streak: 7,
      rank: 2,
      gems: 50,
      ...params,
    };

    const copy = buildCopy(
      type,
      lang,
      filled,
      rotation ?? Math.floor(Date.now() / 1000),
    );
    if (!copy) return { delivered: false, reason: 'NO_COPY_FOR_TYPE' };

    const tokens = await this.liveTokens(uid);
    if (!tokens.length) return { delivered: false, reason: 'NO_DEVICE_TOKEN' };

    const delivered = await this.deliver(uid, copy, {
      type,
      link: LINK_OF[type] ?? '/(tabs)',
      channelId: 'default',
    });
    return { delivered, lang, sentCopy: copy, devices: tokens.length };
  }

  /** 이 유저의 기기 등록 상태 — 푸시가 왜 안 오는지 볼 때 첫 번째로 보는 것 */
  async deviceStatus(userId: string) {
    const uid = new Types.ObjectId(userId);
    const rows = await this.tokenModel
      .find({ userId: uid })
      .select('platform deviceName appVersion lastSeenAt invalidAt')
      .lean();
    const user = await this.userModel
      .findById(uid)
      .select('appLanguage timezone reminderHour pushPrefs')
      .lean();
    return {
      devices: rows.map((r: any) => ({
        platform: r.platform,
        deviceName: r.deviceName,
        appVersion: r.appVersion,
        lastSeenAt: r.lastSeenAt,
        alive: !r.invalidAt,
      })),
      appLanguage: (user as any)?.appLanguage || '(미설정 → uz)',
      timezone: (user as any)?.timezone || '(미설정 → Asia/Tashkent)',
      reminderHour: (user as any)?.reminderHour ?? 20,
      pushPrefs: (user as any)?.pushPrefs ?? {},
    };
  }

  /**
   * 전체 공지.
   *
   * 유저마다 언어가 달라 한 명씩 돈다. 지금 규모에서는 충분하지만, 유저가
   * 수만 명이 되면 언어별로 묶어서 Expo 청크(100건)로 한 번에 밀어야 한다.
   */
  async announce(dto: {
    key: string;
    title: Record<string, string>;
    body: Record<string, string>;
    link?: string;
  }) {
    const copyByLang: Record<string, PushCopy> = {};
    for (const lang of Object.keys(dto.title)) {
      const title = dto.title[lang];
      const body = dto.body?.[lang];
      if (title && body) copyByLang[lang] = { title, body };
    }
    if (!Object.keys(copyByLang).length) {
      return { sent: 0, reason: 'NO_COPY' };
    }

    const ids = await this.userIdsWithTokens();
    const sent = await this.sendMany(ids, PushType.ANNOUNCEMENT, {
      link: dto.link,
      copyByLang,
      dedupKey: `announce:${dto.key}`,
      channelId: 'default',
    });
    return { sent, targets: ids.length };
  }

  /**
   * 여러 명에게 같은 문구 (어드민 공지).
   * 유저마다 언어가 달라서 문구를 각자 만들어야 하므로 순차로 돈다.
   */
  async sendMany(
    userIds: (string | Types.ObjectId)[],
    type: PushType,
    opts: SendOptions = {},
  ): Promise<number> {
    let sent = 0;
    for (const id of userIds) {
      try {
        if (await this.send(id, type, opts)) sent++;
      } catch (e) {
        this.logger.warn(`푸시 실패 (${String(id)}): ${(e as Error).message}`);
      }
    }
    return sent;
  }

  /** 설정 스위치를 본다. 매핑이 없는 타입은 master 만 본다 */
  private allowed(
    user: { pushPrefs?: Record<string, boolean> },
    type: PushType,
  ): boolean {
    const prefs = user.pushPrefs ?? {};
    if (prefs.master === false) return false;
    const key = PREF_KEY_OF[type];
    if (!key) return true;
    return prefs[key] !== false;
  }

  /** Expo 가 죽었다고 한 토큰에 표시. 안 하면 매번 같은 토큰에 헛발송한다 */
  private async retireDeadTokens(
    outcomes: { token: string; ok: boolean; error?: string }[],
  ) {
    const dead = outcomes
      .filter((o) => !o.ok && isDeadTokenError(o.error))
      .map((o) => o.token);
    if (!dead.length) return;
    await this.tokenModel
      .updateMany(
        { token: { $in: dead } },
        { $set: { invalidAt: new Date() } },
      )
      .catch(() => {});
  }
}
