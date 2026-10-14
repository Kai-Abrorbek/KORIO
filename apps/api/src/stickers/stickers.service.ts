import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  Optional,
  ServiceUnavailableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { Model, Types } from 'mongoose';
import { AuthProvider } from '../common/enums/provider.enum';
import { GemLedgerService } from '../gem-ledger/gem-ledger.service';
import {
  TelegramApiError,
  TelegramBotApi,
} from '../payments/providers/telegram-stars/telegram-bot.api';
import {
  botLang,
  type BotLang,
} from '../payments/providers/telegram-stars/telegram-stars.texts';
import type { TgUser } from '../payments/providers/telegram-stars/telegram.types';
import { User, UserDocument } from '../users/schemas/user.schema';
import { STICKER_DESIGNS } from './art/sticker-designs';
import {
  StickerRenderer,
  stickerAvatarKey,
  stickerAvatarOf,
} from './sticker-renderer';
import {
  STICKER_ART_VERSION,
  STICKER_BUSY_MS,
  STICKER_LINK_TTL_MS,
  STICKER_PACK,
} from './stickers.const';
import {
  STICKER_START_PREFIX,
  type StickerStartHandler,
} from './sticker-start';
import { stickerText } from './stickers.texts';

/** user.stickerPack 에 남기는 것 */
export interface StickerPackRecord {
  /** t.me/addstickers/<name> */
  name: string;
  /** 세트 주인 텔레그램 id — 다시 만들 때(replaceStickerInSet) 이 사람 이름으로 고친다 */
  ownerId: string;
  /** 만들 때 캐릭터 지문 — 지금 캐릭터와 다르면 "다시 만들기" */
  avatarKey: string;
  /** 세트 이름 판 (지워진 세트를 새로 만들 때 올라간다) */
  version: number;
  artVersion: number;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

type Plan =
  | { kind: 'new'; cost: number }
  | { kind: 'refresh'; cost: number; fromKey: string };

type StickerUser = {
  _id: Types.ObjectId;
  gems?: number;
  avatar?: unknown;
  nickname?: string;
  provider?: AuthProvider;
  providerId?: string;
  appLanguage?: string;
  telegramLink?: { id: string; username?: string } | null;
  stickerPack?: StickerPackRecord | null;
  stickerBusyUntil?: Date | null;
  stickerLink?: { token: string; expiresAt: Date } | null;
};

const USER_FIELDS =
  'gems avatar nickname provider providerId appLanguage telegramLink stickerPack stickerBusyUntil stickerLink';

/** 아직 봇과 대화한 적이 없는 사람 — 봇으로 보내 START 를 누르게 한다 */
export class StickerStartRequired extends Error {
  constructor() {
    super('STICKER_START_REQUIRED');
  }
}

const tgError = (error: unknown, pattern: RegExp) =>
  error instanceof TelegramApiError && pattern.test(error.description);

/** 이 유저 이름으로 세트를 만들 수 없다 = 봇을 시작하지 않았다 */
export const needsStart = (error: unknown) =>
  tgError(
    error,
    /PEER_ID_INVALID|USER_ID_INVALID|user not found|chat not found|bot was blocked|can't initiate|initiate conversation|invalid user_id/i,
  );
const setGone = (error: unknown) =>
  tgError(error, /STICKERSET_INVALID|sticker set not found|not found/i);
const nameTaken = (error: unknown) => tgError(error, /occupied/i);

/** 텔레그램 세트 이름 — 영문·숫자·_ , 글자로 시작, 64자 이내, _by_<봇> 으로 끝 */
export function stickerSetName(userId: string, version: number, bot: string) {
  return `k${userId}${version > 1 ? `_v${version}` : ''}_by_${bot}`;
}

export const stickerSetUrl = (name: string) =>
  `https://t.me/addstickers/${name}`;

/** 세트를 만들 텔레그램 id — 텔레그램 가입자는 자기 id, 아니면 이어 둔 계정 */
export function telegramOwnerOf(user: StickerUser): string | null {
  if (user.provider === AuthProvider.TELEGRAM && user.providerId)
    return user.providerId;
  return user.telegramLink?.id ?? null;
}

/**
 * 내 캐릭터 텔레그램 스티커팩.
 *
 *   앱 ─ GET  /stickers          가격·내 세트·최신인지
 *   앱 ─ GET  /stickers/preview  내 캐릭터로 그린 8장 (WebP data URL)
 *   앱 ─ POST /stickers/make     텔레그램 id 가 있으면 바로 만든다
 *                                 없으면(또는 봇을 시작 안 했으면) 봇 링크를 준다
 *   봇 ─ /start stk_<표>          표 주인의 텔레그램을 잇고 그 자리에서 만든다
 *
 * 보석은 **만들기 직전**에 잠금과 함께 뺀다(조건부 업데이트 한 번). 텔레그램이 실패하면
 * 돌려준다. 그래서 두 번 눌러도 한 번, 실패하면 0 이다.
 */
@Injectable()
export class StickersService implements StickerStartHandler {
  private readonly logger = new Logger(StickersService.name);
  private botName?: Promise<string | null>;

  constructor(
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    private readonly bot: TelegramBotApi,
    private readonly renderer: StickerRenderer,
    @Optional() private readonly gemLedger?: GemLedgerService,
  ) {}

  /** 봇 아이디(@ 없이) — 세트 이름 끝과 t.me 링크에 쓴다 */
  botUsername(): Promise<string | null> {
    const env = (process.env.TELEGRAM_BOT_USERNAME ?? '')
      .trim()
      .replace(/^@/, '');
    if (env) return Promise.resolve(env);
    if (!this.bot.enabled) return Promise.resolve(null);
    this.botName ??= this.bot
      .call<{ username?: string }>('getMe', {})
      .then((me) => me.username ?? null)
      .catch(() => {
        this.botName = undefined; // 다음에 다시 묻는다
        return null;
      });
    return this.botName;
  }

  private async enabled(): Promise<boolean> {
    if (!this.bot.enabled) return false;
    const [bot, renderer] = await Promise.all([
      this.botUsername(),
      this.renderer.available(),
    ]);
    return Boolean(bot) && renderer;
  }

  private async load(userId: string | Types.ObjectId): Promise<StickerUser> {
    const user = await this.users
      .findById(new Types.ObjectId(String(userId)))
      .select(USER_FIELDS)
      .lean<StickerUser>();
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    return user;
  }

  /** 지금 캐릭터로 무엇을 할 수 있나 — 새로 만들기 / 다시 만들기 / 이미 최신 */
  private plan(user: StickerUser): Plan | null {
    const pack = user.stickerPack;
    if (!pack) return { kind: 'new', cost: STICKER_PACK.price };
    const key = stickerAvatarKey(stickerAvatarOf(user.avatar));
    if (pack.avatarKey === key) return null;
    return {
      kind: 'refresh',
      cost: STICKER_PACK.refreshPrice,
      fromKey: pack.avatarKey,
    };
  }

  async state(userId: string) {
    const user = await this.load(userId);
    const pack = user.stickerPack ?? null;
    const owner = pack?.ownerId ?? telegramOwnerOf(user);
    return {
      enabled: await this.enabled(),
      price: STICKER_PACK.price,
      refreshPrice: STICKER_PACK.refreshPrice,
      gems: user.gems ?? 0,
      telegram: {
        linked: Boolean(owner),
        username: user.telegramLink?.username ?? null,
      },
      busy: Boolean(
        user.stickerBusyUntil && user.stickerBusyUntil.getTime() > Date.now(),
      ),
      pack: pack
        ? {
            name: pack.name,
            url: stickerSetUrl(pack.name),
            count: pack.count,
            outdated: this.plan(user) !== null,
            updatedAt: pack.updatedAt,
          }
        : null,
      stickers: STICKER_DESIGNS.map((d) => ({ id: d.id, text: d.text })),
    };
  }

  async preview(userId: string) {
    const user = await this.load(userId);
    if (!(await this.renderer.available()))
      throw new ServiceUnavailableException('STICKERS_UNAVAILABLE');
    const avatar = stickerAvatarOf(user.avatar);
    const images = await this.renderer.preview(avatar);
    return {
      avatarKey: stickerAvatarKey(avatar),
      stickers: STICKER_DESIGNS.map((d, i) => ({
        id: d.id,
        text: d.text,
        image: images[i],
      })),
    };
  }

  /**
   * 만들기 / 다시 만들기.
   * - ready: 다 됐다 (pack.url 로 텔레그램에서 추가)
   * - link:  텔레그램으로 가서 START 를 누르면 봇이 이어서 만든다 (보석은 그때 빠진다)
   */
  async make(userId: string) {
    if (!(await this.enabled()))
      throw new ServiceUnavailableException('STICKERS_UNAVAILABLE');
    const user = await this.load(userId);
    const plan = this.plan(user);
    if (!plan) throw new ConflictException('STICKERS_UP_TO_DATE');
    if ((user.gems ?? 0) < plan.cost)
      throw new BadRequestException('NOT_ENOUGH_GEMS');

    const owner = user.stickerPack?.ownerId ?? telegramOwnerOf(user);
    if (!owner)
      return { status: 'link' as const, link: await this.issueLink(user) };

    try {
      const built = await this.build(user, owner, plan);
      // 텔레그램 채팅에도 "다 됐어요" + 첫 스티커 (미니앱 밖에서도 보이게). 실패해도 그만
      void this.announce(owner, built.pack.name, plan.kind, this.langOf(user));
      return {
        status: 'ready' as const,
        gems: built.gems,
        pack: {
          name: built.pack.name,
          url: stickerSetUrl(built.pack.name),
          count: built.pack.count,
          outdated: false,
          updatedAt: built.pack.updatedAt,
        },
      };
    } catch (error) {
      if (error instanceof StickerStartRequired)
        return { status: 'link' as const, link: await this.issueLink(user) };
      throw error;
    }
  }

  /** 봇으로 넘어가는 일회용 표 — 아직 넉넉히 살아 있으면 같은 표를 다시 준다 */
  private async issueLink(user: StickerUser): Promise<string> {
    const bot = await this.botUsername();
    if (!bot) throw new ServiceUnavailableException('STICKERS_UNAVAILABLE');
    const live = user.stickerLink;
    if (
      live?.token &&
      new Date(live.expiresAt).getTime() - Date.now() > 5 * 60_000
    )
      return `https://t.me/${bot}?start=${STICKER_START_PREFIX}${live.token}`;
    const token = randomBytes(18).toString('base64url');
    await this.users.updateOne(
      { _id: user._id },
      {
        $set: {
          stickerLink: {
            token,
            expiresAt: new Date(Date.now() + STICKER_LINK_TTL_MS),
          },
        },
      },
    );
    return `https://t.me/${bot}?start=${STICKER_START_PREFIX}${token}`;
  }

  /**
   * 잠그고 보석을 빼고 → 그리고 → 텔레그램에 올린다. 실패하면 보석을 돌려준다.
   */
  private async build(
    user: StickerUser,
    owner: string,
    plan: Plan,
  ): Promise<{ pack: StickerPackRecord; gems: number }> {
    const now = new Date();
    const locked = await this.users
      .findOneAndUpdate(
        {
          _id: user._id,
          gems: { $gte: plan.cost },
          stickerBusyUntil: { $not: { $gt: now } },
          // 계획을 세운 뒤 다른 요청이 세트를 바꿨으면 손대지 않는다
          ...(plan.kind === 'new'
            ? { stickerPack: null }
            : { 'stickerPack.avatarKey': plan.fromKey }),
        },
        {
          $inc: { gems: -plan.cost },
          $set: { stickerBusyUntil: new Date(now.getTime() + STICKER_BUSY_MS) },
        },
        { returnDocument: 'after' },
      )
      .select(USER_FIELDS)
      .lean<StickerUser>();

    if (!locked) {
      const fresh = await this.load(user._id);
      if (fresh.stickerBusyUntil && fresh.stickerBusyUntil > now)
        throw new ConflictException('STICKERS_BUSY');
      if ((fresh.gems ?? 0) < plan.cost)
        throw new BadRequestException('NOT_ENOUGH_GEMS');
      throw new ConflictException('STICKERS_CHANGED');
    }

    try {
      const avatar = stickerAvatarOf(locked.avatar);
      const images = await this.renderer.renderPack(avatar);
      const prev = locked.stickerPack ?? null;
      const set = await this.publish(
        prev?.ownerId ?? owner,
        String(user._id),
        images,
        prev,
        this.titleOf(locked),
      );
      const record: StickerPackRecord = {
        name: set.name,
        ownerId: prev?.ownerId ?? owner,
        avatarKey: stickerAvatarKey(avatar),
        version: set.version,
        artVersion: STICKER_ART_VERSION,
        count: images.length,
        createdAt: prev?.createdAt ?? now,
        updatedAt: new Date(),
      };
      const saved = await this.users
        .findOneAndUpdate(
          { _id: user._id },
          { $set: { stickerPack: record, stickerBusyUntil: null } },
          { returnDocument: 'after' },
        )
        .select('gems')
        .lean<{ gems?: number }>();
      if (plan.cost > 0)
        await this.gemLedger?.record(user._id, -plan.cost, 'sticker_pack', {
          kind: plan.kind,
        });
      this.logger.log(
        `스티커팩 ${plan.kind}: user=${String(user._id)} ${set.name} -${plan.cost}보석`,
      );
      return { pack: record, gems: saved?.gems ?? 0 };
    } catch (error) {
      await this.users
        .updateOne(
          { _id: user._id },
          { $inc: { gems: plan.cost }, $set: { stickerBusyUntil: null } },
        )
        .catch((e: unknown) =>
          this.logger.error(
            `스티커 보석 환불 실패 user=${String(user._id)} +${plan.cost}: ${String(e)}`,
          ),
        );
      if (needsStart(error)) throw new StickerStartRequired();
      this.logger.warn(
        `스티커팩 실패 user=${String(user._id)}: ${error instanceof Error ? error.message : String(error)}`,
      );
      // 5xx 로 주면 앱이 "서버 오류" 전역 모달을 띄운다 — 화면 안에서 보여줄 실패라 422
      throw new UnprocessableEntityException('STICKERS_FAILED');
    }
  }

  /**
   * 텔레그램에 올린다. 같은 세트가 살아 있으면 칸마다 바꿔 끼우고(추가해 둔 사람에게도
   * 새 그림), 없으면 새 세트를 만든다.
   */
  private async publish(
    owner: string,
    userId: string,
    images: Buffer[],
    prev: StickerPackRecord | null,
    title: string,
  ): Promise<{ name: string; version: number }> {
    const bot = await this.botUsername();
    if (!bot) throw new Error('NO_BOT_USERNAME');
    const userIdNum = Number(owner);

    const files: string[] = [];
    for (const png of images) {
      const file = await this.bot.upload<{ file_id: string }>(
        'uploadStickerFile',
        { user_id: userIdNum, sticker_format: 'static' },
        {
          field: 'sticker',
          buffer: png,
          filename: 'sticker.png',
          mime: 'image/png',
        },
      );
      files.push(file.file_id);
    }
    const inputs = STICKER_DESIGNS.map((design, i) => ({
      sticker: files[i],
      format: 'static',
      emoji_list: design.emoji,
      keywords: design.keywords,
    }));

    if (prev) {
      const current = await this.bot
        .call<{ stickers?: { file_id: string }[] }>('getStickerSet', {
          name: prev.name,
        })
        .catch((error: unknown) => {
          if (setGone(error)) return null;
          throw error;
        });
      if (current) {
        const old = current.stickers ?? [];
        for (const [i, sticker] of inputs.entries()) {
          if (old[i])
            await this.bot.call(
              'replaceStickerInSet',
              {
                user_id: userIdNum,
                name: prev.name,
                old_sticker: old[i].file_id,
                sticker,
              },
              15_000,
            );
          else
            await this.bot.call(
              'addStickerToSet',
              { user_id: userIdNum, name: prev.name, sticker },
              15_000,
            );
        }
        await this.bot
          .call('setStickerSetTitle', { name: prev.name, title })
          .catch(() => undefined);
        return { name: prev.name, version: prev.version ?? 1 };
      }
    }

    // 새 세트 — 이름이 이미 있으면(지워졌다 다시 만든 경우 등) 판을 올린다
    let version = prev ? (prev.version ?? 1) + 1 : 1;
    for (let attempt = 0; attempt < 4; attempt += 1, version += 1) {
      const name = stickerSetName(userId, version, bot);
      try {
        await this.bot.call(
          'createNewStickerSet',
          {
            user_id: userIdNum,
            name,
            title,
            stickers: inputs,
            sticker_type: 'regular',
          },
          25_000,
        );
        return { name, version };
      } catch (error) {
        if (nameTaken(error)) continue;
        throw error;
      }
    }
    throw new Error('STICKER_SET_NAME_TAKEN');
  }

  /** 세트 제목 — "닉네임 · KORIO" */
  private titleOf(user: StickerUser): string {
    const nick = (user.nickname ?? '').replace(/\s+/g, ' ').trim().slice(0, 40);
    return nick ? `${nick} · KORIO` : stickerText(this.langOf(user), 'title');
  }

  private langOf(user: StickerUser, from?: TgUser): BotLang {
    return botLang(user.appLanguage, from?.language_code);
  }

  /** 다 된 세트를 채팅에 — 첫 스티커 + "추가하기" 버튼 */
  private async announce(
    chatId: string | number,
    name: string,
    kind: 'new' | 'refresh',
    lang: BotLang,
  ): Promise<void> {
    try {
      const set = await this.bot
        .call<{ stickers?: { file_id: string }[] }>('getStickerSet', { name })
        .catch(() => null);
      const first = set?.stickers?.[0]?.file_id;
      if (first)
        await this.bot
          .call('sendSticker', { chat_id: chatId, sticker: first })
          .catch(() => undefined);
      await this.bot.call('sendMessage', {
        chat_id: chatId,
        text: stickerText(lang, kind === 'new' ? 'ready' : 'updated'),
        reply_markup: {
          inline_keyboard: [
            [{ text: stickerText(lang, 'add'), url: stickerSetUrl(name) }],
          ],
        },
      });
    } catch {
      // 봇 메시지는 덤이다 — 앱이 이미 결과를 보여줬다
    }
  }

  /**
   * 봇 /start stk_<표> — 앱에서 "텔레그램에서 마저 하기" 를 누르고 온 사람.
   * 웹훅을 붙잡지 않게 부르는 쪽이 기다리지 않는다(void). 여기서 전부 삼킨다.
   */
  async handleStart(
    from: TgUser,
    token: string,
    chatId: number,
  ): Promise<void> {
    const fallbackLang = botLang(from.language_code);
    const say = (
      lang: BotLang,
      key: Parameters<typeof stickerText>[1],
      vars = {},
    ) =>
      this.bot
        .call('sendMessage', {
          chat_id: chatId,
          text: stickerText(lang, key, vars),
        })
        .catch(() => undefined);
    try {
      if (!/^[\w-]{8,64}$/.test(token)) {
        await say(fallbackLang, 'expired');
        return;
      }
      const user = await this.users
        .findOne({
          'stickerLink.token': token,
          'stickerLink.expiresAt': { $gt: new Date() },
        })
        .select(USER_FIELDS)
        .lean<StickerUser>();
      if (!user) {
        await say(fallbackLang, 'expired');
        return;
      }
      const lang = this.langOf(user, from);
      const tgId = String(from.id);
      if (user.provider === AuthProvider.TELEGRAM && user.providerId !== tgId) {
        await say(lang, 'wrongAccount');
        return;
      }

      // 표는 한 번만 쓴다. 텔레그램으로 가입하지 않은 유저는 이 계정을 잇는다
      await this.users.updateOne(
        { _id: user._id },
        {
          $set: {
            stickerLink: null,
            ...(user.provider === AuthProvider.TELEGRAM
              ? {}
              : {
                  telegramLink: {
                    id: tgId,
                    username: from.username ?? null,
                    linkedAt: new Date(),
                  },
                }),
          },
        },
      );

      const plan = this.plan(user);
      if (!plan) {
        if (user.stickerPack)
          await this.announce(chatId, user.stickerPack.name, 'new', lang);
        else await say(lang, 'upToDate');
        return;
      }
      if ((user.gems ?? 0) < plan.cost) {
        await say(lang, 'notEnough', { need: plan.cost, have: user.gems ?? 0 });
        return;
      }

      await say(lang, 'making');
      try {
        const built = await this.build(
          user,
          user.stickerPack?.ownerId ?? tgId,
          plan,
        );
        await this.announce(chatId, built.pack.name, plan.kind, lang);
      } catch (error) {
        const code = (error as { message?: string })?.message;
        if (code === 'STICKERS_BUSY') await say(lang, 'busy');
        else if (code === 'NOT_ENOUGH_GEMS')
          await say(lang, 'notEnough', {
            need: plan.cost,
            have: user.gems ?? 0,
          });
        else await say(lang, 'failed');
      }
    } catch (error) {
      this.logger.warn(`스티커 /start 처리 실패: ${String(error)}`);
      await say(fallbackLang, 'failed');
    }
  }
}
