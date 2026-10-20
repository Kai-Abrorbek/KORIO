import { COURSE_QUEST_KINDS, QUEST_POOL } from './retention.config';
import {
  bandOf,
  pickBonus,
  pickDailyQuests,
  questFor,
  rerollPick,
  rollQuestChest,
  type PickContext,
  type QuestPick,
} from './quest-picker';

const KO = 'ko-general';
const EN = 'en-general';

const base: PickContext = {
  userId: '65f000000000000000000001',
  day: '2026-10-07',
  band: 1,
  isSuper: false,
  course: KO,
  courses: {
    [KO]: { openMistakes: 0, category: null },
    [EN]: { openMistakes: 0, category: null },
  },
};

/** 한국어는 오답·약한 분야가 넉넉하고, 영어는 막 시작해서 아무것도 없다 */
const koRich: PickContext = {
  ...base,
  courses: {
    [KO]: { openMistakes: 50, category: 'grammar' },
    [EN]: { openMistakes: 0, category: null },
  },
};

describe('quest-picker', () => {
  it('같은 유저·날짜면 같은 퀘스트 (새로고침해도 안 바뀐다)', () => {
    expect(pickDailyQuests(base)).toEqual(pickDailyQuests(base));
  });

  it('쉬움·보통·어려움 세 칸, 종류는 겹치지 않는다', () => {
    for (let d = 1; d <= 60; d += 1) {
      const picks = pickDailyQuests({ ...base, day: `2026-10-${d}` });
      expect(picks.map((p) => p.slot)).toEqual(['easy', 'normal', 'hard']);
      expect(new Set(picks.map((p) => p.kind)).size).toBe(3);
    }
  });

  it('날짜마다 다르게 나온다 (랜덤)', () => {
    const kinds = new Set<string>();
    for (let d = 1; d <= 30; d += 1) {
      const picks = pickDailyQuests({ ...base, day: `2026-11-${d}` });
      kinds.add(picks.map((p) => p.kind).join(','));
    }
    expect(kinds.size).toBeGreaterThan(5);
  });

  it('홍보 퀘스트는 하루 하나까지', () => {
    for (let u = 0; u < 200; u += 1) {
      const picks = pickDailyQuests({ ...base, userId: `user${u}` });
      expect(picks.filter((p) => p.promo).length).toBeLessThanOrEqual(1);
    }
  });

  it('오답이 모자라거나 분야가 없으면 그 퀘스트는 안 나온다', () => {
    for (let u = 0; u < 200; u += 1) {
      const picks = pickDailyQuests({ ...base, userId: `u${u}` });
      expect(picks.some((p) => p.kind === 'mistakes')).toBe(false);
      expect(picks.some((p) => p.kind === 'category')).toBe(false);
    }
  });

  it('목표치는 활동량 칸을 따른다', () => {
    const picks = pickDailyQuests({ ...base, band: 2 });
    for (const pick of picks) {
      const def = QUEST_POOL[pick.slot === 'bonus' ? 'normal' : pick.slot].find(
        (q) => q.kind === pick.kind,
      );
      expect(pick.target).toBe(def?.targets[2]);
    }
  });

  it('SUPER 는 bonus 칸이 붙고, bonus 에는 홍보가 없다', () => {
    const picks = pickDailyQuests({ ...base, isSuper: true });
    expect(picks.map((p) => p.slot)).toContain('bonus');
    expect(picks.find((p) => p.slot === 'bonus')?.promo).toBeFalsy();
    const plain = pickDailyQuests(base);
    const bonus = pickBonus({ ...base, isSuper: true }, plain);
    expect(bonus?.slot).toBe('bonus');
    expect(plain.map((p) => p.kind)).not.toContain(bonus?.kind);
  });

  it('바꾸기는 같은 난이도의 다른 종류로', () => {
    const picks = pickDailyQuests(base);
    const next = rerollPick(base, picks, 'hard', 1);
    const old = picks.find((p) => p.slot === 'hard');
    expect(next?.slot).toBe('hard');
    expect(next?.kind).not.toBe(old?.kind);
    expect(
      picks.filter((p) => p.slot !== 'hard').map((p) => p.kind),
    ).not.toContain(next?.kind);
  });

  it('문제 퀘스트만 코스별 모양을 갖고, 공통 퀘스트는 어디서나 같다', () => {
    for (let u = 0; u < 200; u += 1) {
      const picks = pickDailyQuests({ ...koRich, userId: `c${u}` });
      for (const pick of picks) {
        if (COURSE_QUEST_KINDS.has(pick.kind)) {
          expect(Object.keys(pick.courses ?? {}).sort()).toEqual([EN, KO]);
          // 대표 모양은 지금 코스(한국어) 것이다
          expect(questFor(pick, KO)).toEqual({
            kind: pick.kind,
            target: pick.target,
            ...(pick.category ? { category: pick.category } : {}),
          });
        } else {
          expect(pick.courses).toBeUndefined();
          expect(questFor(pick, EN)).toEqual(questFor(pick, KO));
        }
      }
    }
  });

  it('그 언어에서 못 내는 문제 퀘스트는 늘 낼 수 있는 문제 퀘스트로 바뀐다 (한 화면에 같은 종류 두 번 없이)', () => {
    let sawSubstitute = false;
    for (let u = 0; u < 300; u += 1) {
      const picks = pickDailyQuests({ ...koRich, userId: `s${u}` });
      const enKinds = picks.map((p) => questFor(p, EN).kind);
      expect(new Set(enKinds).size).toBe(enKinds.length);
      for (const pick of picks) {
        const en = questFor(pick, EN);
        // 영어엔 오답도 약한 분야도 없다 — 그런 퀘스트가 영어 화면에 나오면 안 된다
        expect(en.kind).not.toBe('mistakes');
        expect(en.kind).not.toBe('category');
        if (pick.kind === 'mistakes' || pick.kind === 'category') {
          sawSubstitute = true;
          expect(COURSE_QUEST_KINDS.has(en.kind)).toBe(true);
          const tier = pick.slot === 'bonus' ? 'normal' : pick.slot;
          const def = QUEST_POOL[tier].find((d) => d.kind === en.kind);
          expect(en.target).toBe(def?.targets[koRich.band]);
        }
      }
    }
    expect(sawSubstitute).toBe(true);
  });

  it('지금 코스가 영어면 영어 재료로 고른다', () => {
    const enView: PickContext = { ...koRich, course: EN };
    for (let u = 0; u < 200; u += 1) {
      const picks = pickDailyQuests({ ...enView, userId: `e${u}` });
      expect(picks.some((p) => p.kind === 'mistakes')).toBe(false);
      expect(picks.some((p) => p.kind === 'category')).toBe(false);
    }
  });

  it('코스별 모양이 없는 옛 기록은 대표 모양을 그대로 쓴다', () => {
    const legacy: QuestPick = { slot: 'easy', kind: 'correct', target: 25 };
    expect(questFor(legacy, EN)).toEqual({ kind: 'correct', target: 25 });
  });

  it('활동량 칸', () => {
    expect(bandOf(0)).toBe(0);
    expect(bandOf(200)).toBe(1);
    expect(bandOf(500)).toBe(2);
  });

  it('상자는 보석·부스트·복구펜 중 하나', () => {
    for (let i = 0; i < 100; i += 1) {
      const roll = rollQuestChest();
      expect(['gems', 'xpBoost', 'freeze']).toContain(roll.type);
    }
  });
});
