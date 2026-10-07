import {
  DAILY_QUESTS,
  QUEST_CHEST,
  QUEST_POOL,
  type QuestChestRoll,
  type QuestDef,
  type QuestKind,
  type QuestSlot,
  type QuestTier,
} from './retention.config';

/** 오늘 깔린 퀘스트 한 칸 (user.dailyQuestState.picks 에 저장) */
export interface QuestPick {
  slot: QuestSlot;
  kind: QuestKind;
  target: number;
  /** kind = category 일 때 어느 분야인가 */
  category?: string;
  promo?: boolean;
}

/** 0 = 가벼움, 1 = 보통, 2 = 많음 */
export type QuestBand = 0 | 1 | 2;

export interface PickContext {
  userId: string;
  day: string;
  band: QuestBand;
  isSuper: boolean;
  /** 아직 해소 안 된 오답 수 — 오답 퀘스트는 그만큼 있어야 낸다 */
  openMistakes: number;
  /** 카테고리 퀘스트를 낼 분야. 없으면 카테고리 퀘스트를 안 낸다 */
  category: string | null;
}

const BASE_SLOTS: QuestTier[] = ['easy', 'normal', 'hard'];

/** 문자열 → 32bit 시드 (FNV-1a) */
function seedOf(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** 같은 시드면 같은 수열 — 유저·날짜로 정해서 새로고침해도 퀘스트가 안 바뀐다 */
function rngOf(text: string): () => number {
  let a = seedOf(text);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function weighted<T extends { weight?: number }>(
  items: T[],
  rand: () => number,
): T | null {
  if (!items.length) return null;
  const total = items.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  let roll = rand() * total;
  for (const item of items) {
    roll -= item.weight ?? 1;
    if (roll <= 0) return item;
  }
  return items[items.length - 1] ?? null;
}

export function bandOf(avgXp: number): QuestBand {
  const [low, high] = DAILY_QUESTS.BAND_XP;
  if (avgXp >= high) return 2;
  if (avgXp >= low) return 1;
  return 0;
}

function eligible(def: QuestDef, ctx: PickContext, band: QuestBand): boolean {
  if (def.kind === 'mistakes') return ctx.openMistakes >= def.targets[band];
  if (def.kind === 'category') return !!ctx.category;
  return true;
}

function toPick(slot: QuestSlot, def: QuestDef, ctx: PickContext): QuestPick {
  return {
    slot,
    kind: def.kind,
    target: def.targets[ctx.band],
    ...(def.kind === 'category' && ctx.category
      ? { category: ctx.category }
      : {}),
    ...(def.promo ? { promo: true } : {}),
  };
}

/** 그 칸에 낼 수 있는 후보 — 같은 날 같은 종류는 한 번만, 홍보는 하루 상한까지 */
function candidates(
  slot: QuestSlot,
  ctx: PickContext,
  taken: QuestPick[],
  exclude: QuestKind[] = [],
): QuestDef[] {
  // bonus(SUPER) 칸은 보통 목록에서 뽑되 홍보는 빼고
  const tier: QuestTier = slot === 'bonus' ? 'normal' : slot;
  const promoUsed = taken.filter((p) => p.promo).length;
  const usedKinds = new Set<QuestKind>([
    ...taken.map((p) => p.kind),
    ...exclude,
  ]);
  return QUEST_POOL[tier].filter(
    (def) =>
      !usedKinds.has(def.kind) &&
      eligible(def, ctx, ctx.band) &&
      !(
        def.promo &&
        (slot === 'bonus' || promoUsed >= DAILY_QUESTS.MAX_PROMO_PER_DAY)
      ),
  );
}

/** 오늘의 퀘스트 — 쉬움·보통·어려움 (+ SUPER 면 bonus) */
export function pickDailyQuests(ctx: PickContext): QuestPick[] {
  const picks: QuestPick[] = [];
  const slots: QuestSlot[] = ctx.isSuper
    ? [...BASE_SLOTS, 'bonus']
    : BASE_SLOTS;
  for (const slot of slots) {
    const rand = rngOf(`${ctx.userId}:${ctx.day}:${slot}`);
    const def = weighted(candidates(slot, ctx, picks), rand);
    if (def) picks.push(toPick(slot, def, ctx));
  }
  return picks;
}

/** SUPER 가 된 날 — 이미 깔린 세 칸은 그대로 두고 bonus 만 붙인다 */
export function pickBonus(
  ctx: PickContext,
  taken: QuestPick[],
): QuestPick | null {
  const rand = rngOf(`${ctx.userId}:${ctx.day}:bonus`);
  const def = weighted(candidates('bonus', ctx, taken), rand);
  return def ? toPick('bonus', def, ctx) : null;
}

/**
 * 한 칸 바꾸기. 지금 깔린 종류와 원래 종류는 빼고 같은 난이도에서 다시 뽑는다.
 * nth = 오늘 몇 번째 바꾸기인가 (같은 칸을 또 바꿔도 다른 결과가 나오게).
 */
export function rerollPick(
  ctx: PickContext,
  picks: QuestPick[],
  slot: QuestSlot,
  nth: number,
): QuestPick | null {
  const current = picks.find((p) => p.slot === slot);
  if (!current) return null;
  const others = picks.filter((p) => p.slot !== slot);
  const rand = rngOf(`${ctx.userId}:${ctx.day}:${slot}:reroll${nth}`);
  const def = weighted(candidates(slot, ctx, others, [current.kind]), rand);
  return def ? toPick(slot, def, ctx) : null;
}

/** 상자 굴리기 — 이건 매번 진짜 랜덤 (받는 건 하루 한 번이라 시드가 필요 없다) */
export function rollQuestChest(
  rand: () => number = Math.random,
): QuestChestRoll {
  const group = weighted(QUEST_CHEST, rand) ?? QUEST_CHEST[0];
  return group.pick[Math.floor(rand() * group.pick.length)] ?? group.pick[0];
}
