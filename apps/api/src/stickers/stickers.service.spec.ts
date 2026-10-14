import { Types } from 'mongoose';
jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../gem-ledger/gem-ledger.service', () => ({
  GemLedgerService: class GemLedgerService {},
}));

import { replaceRuntimeValues } from '../app-settings/runtime-values';
import { AuthProvider } from '../common/enums/provider.enum';
import { TelegramApiError } from '../payments/providers/telegram-stars/telegram-bot.api';
import { STICKER_DESIGNS, stickerSvg } from './art/sticker-designs';
import { stickerAvatarKey } from './sticker-renderer';
import { STICKER_PACK } from './stickers.const';
import {
  StickersService,
  stickerSetName,
  telegramOwnerOf,
} from './stickers.service';

type Doc = Record<string, unknown>;
type Params = Record<string, unknown>;

const isObj = (v: unknown): v is Record<string, unknown> =>
  Boolean(v) && typeof v === 'object' && !(v instanceof Date);
const asDate = (v: unknown) => new Date(v as string | Date);

/** 한 유저 문서만 가진 가짜 모델 — 서비스가 쓰는 조건·연산만 흉내 낸다 */
function fakeUsers(initial: Doc) {
  const state = { doc: initial };
  const clone = (): Doc =>
    JSON.parse(JSON.stringify(state.doc), reviveDates) as Doc;
  const get = (path: string): unknown =>
    path
      .split('.')
      .reduce<unknown>((v, k) => (isObj(v) ? v[k] : undefined), state.doc);
  const matches = (filter: Doc) =>
    Object.entries(filter).every(([key, cond]) => {
      if (key === '_id') return String(state.doc._id) === String(cond);
      const value = get(key);
      if (cond === null) return value == null;
      if (isObj(cond)) {
        if ('$gte' in cond)
          return ((value as number) ?? 0) >= (cond.$gte as number);
        if ('$gt' in cond)
          return value != null && asDate(value) > asDate(cond.$gt);
        if ('$not' in cond && isObj(cond.$not))
          return !(value != null && asDate(value) > asDate(cond.$not.$gt));
      }
      return value === cond;
    });
  const apply = (update: Doc) => {
    const inc = isObj(update.$inc) ? update.$inc : {};
    const set = isObj(update.$set) ? update.$set : {};
    for (const [k, v] of Object.entries(inc))
      state.doc[k] = ((state.doc[k] as number) ?? 0) + (v as number);
    for (const [k, v] of Object.entries(set)) state.doc[k] = v;
  };
  const chain = (fn: () => unknown) => ({
    select: () => ({ lean: () => Promise.resolve(fn()) }),
  });
  return {
    state,
    findById: jest.fn((id: unknown) =>
      chain(() => (String(id) === String(state.doc._id) ? clone() : null)),
    ),
    findOne: jest.fn((filter: Doc) =>
      chain(() => (matches(filter) ? clone() : null)),
    ),
    findOneAndUpdate: jest.fn((filter: Doc, update: Doc) =>
      chain(() => {
        if (!matches(filter)) return null;
        apply(update);
        return clone();
      }),
    ),
    updateOne: jest.fn((filter: Doc, update: Doc) => {
      if (matches(filter)) apply(update);
      return Promise.resolve({});
    }),
  };
}
function reviveDates(_key: string, value: unknown) {
  return typeof value === 'string' && /^\d{4}-\d\d-\d\dT/.test(value)
    ? new Date(value)
    : value;
}

const AVATAR = {
  skinTone: 'skin_05',
  hairstyle: 'hair_bob',
  outfit: 'outfit_sport',
};

function setup(
  user: Doc,
  botImpl?: (method: string, params: Params) => unknown,
) {
  const users = fakeUsers({
    _id: new Types.ObjectId(),
    gems: 10000,
    avatar: AVATAR,
    nickname: 'Kai',
    ...user,
  });
  let n = 0;
  const bot = {
    enabled: true,
    // 진짜 bot.call 처럼 던지면 거절된 Promise 가 된다
    call: jest.fn(
      (method: string, params: Params) =>
        new Promise((resolve) =>
          resolve(
            botImpl
              ? botImpl(method, params)
              : method === 'getStickerSet'
                ? { stickers: [] }
                : true,
          ),
        ),
    ),
    upload: jest.fn(() => Promise.resolve({ file_id: `file${(n += 1)}` })),
  };
  const renderer = {
    available: jest.fn(() => Promise.resolve(true)),
    renderPack: jest.fn(() =>
      Promise.resolve(STICKER_DESIGNS.map(() => Buffer.from('png'))),
    ),
    preview: jest.fn(() =>
      Promise.resolve(STICKER_DESIGNS.map(() => 'data:x')),
    ),
  };
  const ledger = { record: jest.fn(() => Promise.resolve()) };
  const service = new StickersService(
    users as never,
    bot as never,
    renderer as never,
    ledger as never,
  );
  const doc = <T = unknown>(key: string) => users.state.doc[key] as T;
  return {
    service,
    users,
    bot,
    renderer,
    ledger,
    doc,
    uid: String(users.state.doc._id),
  };
}

/** 그 메서드로 부른 params 들 */
const called = (
  bot: { call: jest.Mock<Promise<unknown>, [string, Params]> },
  method: string,
): Params[] =>
  bot.call.mock.calls.filter(([m]) => m === method).map(([, p]) => p);
const linkOf = (res: unknown) => (res as { link: string }).link;

beforeAll(() => {
  process.env.TELEGRAM_BOT_USERNAME = 'korio_bot';
});
// 지금은 무료(0)다. 보석 경로는 어드민이 가격을 올린 것처럼 값을 넣고 본다
beforeEach(() =>
  replaceRuntimeValues(
    new Map([
      ['STICKER_PACK.price', 4000],
      ['STICKER_PACK.refreshPrice', 500],
    ]),
  ),
);
afterEach(() => replaceRuntimeValues(new Map()));

describe('스티커 그림', () => {
  it('8장 모두 글자가 있고 SVG 가 만들어진다 (모르는 캐릭터 값은 기본값)', () => {
    for (const design of STICKER_DESIGNS) {
      const svg = stickerSvg(
        { skinTone: '"><script>', outfit: 'nope' },
        design,
        512,
      );
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg).not.toContain('<script>');
      expect(design.emoji.length).toBeGreaterThan(0);
      expect(design.keywords.join('').length).toBeLessThanOrEqual(64);
    }
  });

  it('캐릭터 지문은 오라·배경이 달라도 같다', () => {
    expect(
      stickerAvatarKey({
        ...AVATAR,
        aura: 'aura_flame',
        background: 'x',
      } as never),
    ).toBe(stickerAvatarKey(AVATAR));
    expect(stickerAvatarKey({ ...AVATAR, outfit: 'outfit_hanbok' })).not.toBe(
      stickerAvatarKey(AVATAR),
    );
  });

  it('세트 이름은 64자 안, 글자로 시작, _by_<봇> 으로 끝', () => {
    const name = stickerSetName('65f0c0ffee0000000000abcd', 2, 'a'.repeat(32));
    expect(name.length).toBeLessThanOrEqual(64);
    expect(name).toMatch(/^[a-z][a-z0-9_]*_by_a+$/);
    expect(name).not.toMatch(/__/);
  });
});

describe('StickersService', () => {
  it('텔레그램 id: 텔레그램 가입자는 자기 id, 아니면 이어 둔 계정', () => {
    expect(
      telegramOwnerOf({
        provider: AuthProvider.TELEGRAM,
        providerId: '42',
      } as never),
    ).toBe('42');
    expect(
      telegramOwnerOf({
        provider: AuthProvider.GOOGLE,
        telegramLink: { id: '7' },
      } as never),
    ).toBe('7');
    expect(
      telegramOwnerOf({ provider: AuthProvider.GOOGLE } as never),
    ).toBeNull();
  });

  it('텔레그램이 없는 앱 유저 → 봇 링크만 주고 보석은 그대로', async () => {
    const { service, bot, doc, uid } = setup({ provider: AuthProvider.GOOGLE });
    const res = await service.make(uid);
    expect(res.status).toBe('link');
    expect(linkOf(res)).toMatch(
      /^https:\/\/t\.me\/korio_bot\?start=stk_[\w-]{24}$/,
    );
    expect(doc('gems')).toBe(10000);
    expect(doc<{ token: string }>('stickerLink').token).toBeTruthy();
    expect(bot.upload).not.toHaveBeenCalled();

    // 다시 눌러도 같은 표
    const again = await service.make(uid);
    expect((again as { link: string }).link).toBe(linkOf(res));
  });

  it('텔레그램 유저 → 8장 올려 새 세트를 만들고 보석을 뺀다', async () => {
    const { service, bot, ledger, doc, uid } = setup({
      provider: AuthProvider.TELEGRAM,
      providerId: '555',
    });
    const res = await service.make(uid);
    expect(res.status).toBe('ready');
    expect(bot.upload).toHaveBeenCalledTimes(STICKER_DESIGNS.length);
    const [create] = called(bot, 'createNewStickerSet');
    expect(create).toMatchObject({
      user_id: 555,
      name: `k${uid}_by_korio_bot`,
      title: 'Kai · KORIO',
      sticker_type: 'regular',
    });
    const inputs = create.stickers as Params[];
    expect(inputs).toHaveLength(STICKER_DESIGNS.length);
    expect(inputs[0]).toMatchObject({
      sticker: 'file1',
      format: 'static',
    });
    expect(doc('gems')).toBe(10000 - STICKER_PACK.price);
    expect(doc('stickerPack')).toMatchObject({
      ownerId: '555',
      version: 1,
      avatarKey: stickerAvatarKey(AVATAR),
    });
    expect(doc('stickerBusyUntil')).toBeNull();
    expect(ledger.record).toHaveBeenCalledWith(
      expect.anything(),
      -STICKER_PACK.price,
      'sticker_pack',
      { kind: 'new' },
    );

    // 캐릭터가 그대로면 다시 못 만든다
    await expect(service.make(uid)).rejects.toThrow('STICKERS_UP_TO_DATE');
  });

  it('봇을 시작 안 했으면 → 보석을 돌려주고 링크', async () => {
    const { service, bot, ledger, doc, uid } = setup({
      provider: AuthProvider.TELEGRAM,
      providerId: '9',
    });
    bot.upload.mockImplementationOnce(() =>
      Promise.reject(
        new TelegramApiError(
          'uploadStickerFile',
          400,
          'Bad Request: PEER_ID_INVALID',
        ),
      ),
    );
    const res = await service.make(uid);
    expect(res.status).toBe('link');
    expect(doc('gems')).toBe(10000);
    expect(doc('stickerBusyUntil')).toBeNull();
    expect(ledger.record).not.toHaveBeenCalled();
  });

  it('텔레그램이 다른 이유로 실패 → 보석 환불 + 503', async () => {
    const { service, doc, uid } = setup(
      { provider: AuthProvider.TELEGRAM, providerId: '9' },
      (method) => {
        if (method === 'createNewStickerSet')
          throw new TelegramApiError(method, 500, 'Internal');
        return true;
      },
    );
    await expect(service.make(uid)).rejects.toThrow('STICKERS_FAILED');
    expect(doc('gems')).toBe(10000);
    expect(doc('stickerPack') ?? null).toBeNull();
  });

  it('보석이 모자라면 400, 아무것도 안 올린다', async () => {
    const { service, bot, uid } = setup({
      provider: AuthProvider.TELEGRAM,
      providerId: '9',
      gems: 10,
    });
    await expect(service.make(uid)).rejects.toThrow('NOT_ENOUGH_GEMS');
    expect(bot.upload).not.toHaveBeenCalled();
  });

  it('만드는 중이면 두 번째는 409 (보석 한 번만)', async () => {
    const { service, doc, uid } = setup({
      provider: AuthProvider.TELEGRAM,
      providerId: '9',
      stickerBusyUntil: new Date(Date.now() + 60_000),
    });
    await expect(service.make(uid)).rejects.toThrow('STICKERS_BUSY');
    expect(doc('gems')).toBe(10000);
  });

  it('캐릭터를 바꾸면 → 싼 값으로 같은 세트 칸마다 바꿔 끼운다', async () => {
    const old = Array.from({ length: STICKER_DESIGNS.length }, (_, i) => ({
      file_id: `old${i}`,
    }));
    const { service, bot, ledger, doc, uid } = setup(
      {
        provider: AuthProvider.GOOGLE,
        stickerPack: {
          name: 'kset_by_korio_bot',
          ownerId: '77',
          avatarKey: 'before',
          version: 1,
          count: 8,
          createdAt: new Date(0),
        },
      },
      (method) => (method === 'getStickerSet' ? { stickers: old } : true),
    );
    const res = await service.make(uid);
    expect(res.status).toBe('ready');
    const replaces = called(bot, 'replaceStickerInSet');
    expect(replaces).toHaveLength(STICKER_DESIGNS.length);
    expect(replaces[3]).toMatchObject({
      user_id: 77,
      name: 'kset_by_korio_bot',
      old_sticker: 'old3',
    });
    expect(called(bot, 'createNewStickerSet')).toHaveLength(0);
    expect(doc('gems')).toBe(10000 - STICKER_PACK.refreshPrice);
    expect(doc('stickerPack')).toMatchObject({
      name: 'kset_by_korio_bot',
      avatarKey: stickerAvatarKey(AVATAR),
    });
    expect(ledger.record).toHaveBeenCalledWith(
      expect.anything(),
      -STICKER_PACK.refreshPrice,
      'sticker_pack',
      { kind: 'refresh' },
    );
  });

  it('세트가 지워졌으면 판을 올려 새로 만든다 (이름이 차 있으면 하나 더)', async () => {
    const { service, bot, doc, uid } = setup(
      {
        provider: AuthProvider.TELEGRAM,
        providerId: '5',
        stickerPack: {
          name: 'gone_by_korio_bot',
          ownerId: '5',
          avatarKey: 'before',
          version: 1,
          count: 8,
          createdAt: new Date(0),
        },
      },
      (method, params) => {
        if (method === 'getStickerSet')
          throw new TelegramApiError(
            method,
            400,
            'Bad Request: STICKERSET_INVALID',
          );
        if (
          method === 'createNewStickerSet' &&
          String(params.name).includes('_v2_')
        )
          throw new TelegramApiError(
            method,
            400,
            'Bad Request: sticker set name is already occupied',
          );
        return true;
      },
    );
    await service.make(uid);
    const names = called(bot, 'createNewStickerSet').map((p) => p.name);
    expect(names).toEqual([
      `k${uid}_v2_by_korio_bot`,
      `k${uid}_v3_by_korio_bot`,
    ]);
    expect(doc('stickerPack')).toMatchObject({ version: 3 });
  });

  it('봇 /start: 표가 맞으면 텔레그램을 잇고 그 자리에서 만들어 보낸다', async () => {
    const { service, bot, doc, uid } = setup(
      { provider: AuthProvider.GOOGLE, appLanguage: 'ko' },
      (method) =>
        method === 'getStickerSet' ? { stickers: [{ file_id: 'st0' }] } : true,
    );
    const res = await service.make(uid);
    const token = linkOf(res).split('stk_')[1];

    await service.handleStart({ id: 31337, username: 'kai' }, token, 31337);

    expect(doc('telegramLink')).toMatchObject({
      id: '31337',
      username: 'kai',
    });
    expect(doc('stickerLink')).toBeNull();
    expect(doc('stickerPack')).toMatchObject({ ownerId: '31337' });
    expect(doc('gems')).toBe(10000 - STICKER_PACK.price);
    expect(called(bot, 'sendSticker')[0]).toMatchObject({
      chat_id: 31337,
      sticker: 'st0',
    });
    const last = called(bot, 'sendMessage').at(-1) as {
      text: string;
      reply_markup: { inline_keyboard: { url: string }[][] };
    };
    expect(last.text).toContain('완성');
    expect(last.reply_markup.inline_keyboard[0][0].url).toBe(
      `https://t.me/addstickers/k${uid}_by_korio_bot`,
    );

    // 같은 표로 또 오면 만료
    await service.handleStart({ id: 31337 }, token, 31337);
    expect(called(bot, 'sendMessage').at(-1)?.text).toMatch(
      /expired|eskirgan|만료|устарела/i,
    );
  });

  it('봇 /start: 보석이 모자라면 만들지 않고 알려준다', async () => {
    const { service, users, bot, uid } = setup({
      provider: AuthProvider.GOOGLE,
      gems: 4000,
      appLanguage: 'en',
    });
    const res = await service.make(uid);
    const token = linkOf(res).split('stk_')[1];
    users.state.doc.gems = 100; // 그 사이 다른 데 썼다
    await service.handleStart({ id: 1 }, token, 1);
    expect(bot.upload).not.toHaveBeenCalled();
    expect(called(bot, 'sendMessage').at(-1)?.text).toContain(
      'Not enough gems',
    );
  });
});

describe('StickersService — 무료(가격 0)', () => {
  it('보석이 0 이어도 만들고, 보석·장부는 그대로', async () => {
    replaceRuntimeValues(new Map());
    const { service, doc, ledger, uid } = setup({
      provider: AuthProvider.TELEGRAM,
      providerId: '42',
      gems: 0,
    });
    const state = await service.state(uid);
    expect(state).toMatchObject({ price: 0, refreshPrice: 0 });
    const res = await service.make(uid);
    expect(res.status).toBe('ready');
    expect(doc('gems')).toBe(0);
    expect(ledger.record).not.toHaveBeenCalled();
  });
});
