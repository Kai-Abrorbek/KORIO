import { Types } from 'mongoose';
import { buildCopy } from './push-copy';
import {
  decideEngagement,
  engagementState,
  type EngagementInput,
} from './push-engagement';
import { PushType } from './push.types';

/** 학습 시간 미설정 → 슬롯 12시(재미 유도) · 20시(학습 시간) */
const base: Omit<EngagementInput, 'hour' | 'idleDays'> = {
  streak: 0,
  nickname: '카이',
};

const at = (hour: number, input: Partial<EngagementInput>) =>
  decideEngagement({ ...base, idleDays: 1, ...input, hour });

/** 그날 나가는 것 (12시, 20시) */
const day = (input: Partial<EngagementInput>) =>
  [12, 20].map((h) => at(h, input)?.type ?? null);

describe('decideEngagement', () => {
  it('오늘 공부했거나 조용한 시간이면 안 보낸다', () => {
    expect(at(20, { idleDays: 0 })).toBeNull();
    expect(at(7, { idleDays: 3, reminderHour: 7 })).toBeNull();
    expect(at(13, { idleDays: 1 })).toBeNull();
  });

  it('6일째까지 하루 2번, 7~13일째 하루 1번(본인 시각), 14일째부터 주 1번', () => {
    expect(day({ idleDays: 1 })).toEqual([
      PushType.ENGAGE,
      PushType.DAILY_REMINDER,
    ]);
    expect(day({ idleDays: 6 })).toEqual([
      PushType.ENGAGE,
      PushType.DAILY_REMINDER,
    ]);
    for (let idle = 7; idle <= 13; idle++) {
      expect(day({ idleDays: idle })).toEqual([null, PushType.DAILY_REMINDER]);
    }
    const weekly = Array.from({ length: 30 }, (_, i) => i + 14).filter(
      (idle) => at(20, { idleDays: idle }) !== null,
    );
    expect(weekly).toEqual([14, 21, 28, 35, 42]);
  });

  it('7일째 알림은 "하루 한 번만" 이라고 말하고, 그날부터 정말 하루 1번이다', () => {
    const d = at(20, { idleDays: 7 })!;
    const copy = buildCopy(d.type, 'ko', d.params, d.rotation)!;
    expect(copy.title).toBe('🔇 학습 알림이 효과가 없는 것 같군요');
    const stop = at(20, { idleDays: 14 })!;
    expect(buildCopy(stop.type, 'ko', stop.params, stop.rotation)!.title).toBe(
      '그만 할게요!!!',
    );
  });

  it('복구펜 없음: 2일째 저녁에 연속 위험, 3일째 첫 슬롯에 끊김', () => {
    expect(day({ idleDays: 2, streak: 5 })).toEqual([
      PushType.ENGAGE,
      PushType.STREAK_RISK,
    ]);
    expect(day({ idleDays: 3, streak: 5 })).toEqual([
      PushType.STREAK_LOST,
      PushType.DAILY_REMINDER,
    ]);
    expect(at(12, { idleDays: 3, streak: 5 })!.params).toEqual({ streak: 5 });
  });

  it('복구펜 1개: 하루씩 밀린다 (펜이 메워 주는 날엔 겁주지 않는다)', () => {
    const pens = { streak: 5, streakFreeze: 1 };
    expect(day({ idleDays: 2, ...pens })).toEqual([
      PushType.ENGAGE,
      PushType.DAILY_REMINDER,
    ]);
    expect(day({ idleDays: 3, ...pens })).toEqual([
      PushType.ENGAGE,
      PushType.STREAK_RISK,
    ]);
    expect(day({ idleDays: 4, ...pens })[0]).toBe(PushType.STREAK_LOST);
  });

  it('펜으로 메운 날이 있으면 연속은 그날부터 센다', () => {
    // 공부는 3일 전, 앱을 열어 펜 1개로 하루를 메웠다 → 연속 기준으론 2일째
    expect(
      at(20, { idleDays: 3, streakIdleDays: 2, streak: 5, streakFreeze: 0 })!
        .type,
    ).toBe(PushType.STREAK_RISK);
  });

  it('연속 1일은 연속 문구를 안 쓴다', () => {
    expect(day({ idleDays: 2, streak: 1 })).toEqual([
      PushType.ENGAGE,
      PushType.DAILY_REMINDER,
    ]);
    expect(day({ idleDays: 3, streak: 1 })[0]).toBe(PushType.ENGAGE);
  });

  it('학습 로드 중이면 2일째부터 로드로 데려간다', () => {
    const d = at(12, { idleDays: 2, studyMode: 'guided' })!;
    expect(d.type).toBe(PushType.GUIDED_IDLE);
    expect(d.link).toBe('/study-path');
  });

  it('한 번도 안 한 사람은 가입일부터 세서 같이 줄어든다', () => {
    expect(day({ idleDays: null, signupDays: 0 })).toEqual([
      PushType.ENGAGE,
      PushType.DAILY_REMINDER,
    ]);
    expect(day({ idleDays: null, signupDays: 9 })).toEqual([
      null,
      PushType.DAILY_REMINDER,
    ]);
    expect(day({ idleDays: null, signupDays: 16 })).toEqual([null, null]);
    // 연속 문구는 공부한 적 있는 사람에게만
    expect(day({ idleDays: null, signupDays: 3, streak: 4 })[0]).toBe(
      PushType.ENGAGE,
    );
  });

  it('학습 시각이 아침이면 그게 첫 슬롯이다', () => {
    const morning = at(9, { idleDays: 1, reminderHour: 9 })!;
    const evening = at(20, { idleDays: 1, reminderHour: 9 })!;
    expect(morning.type).toBe(PushType.DAILY_REMINDER);
    expect(evening.type).toBe(PushType.ENGAGE);
    expect(morning.rotation).toBe(0);
    expect(evening.rotation).toBe(1);
  });
});

describe('engagementState', () => {
  const tz = 'Asia/Tashkent';
  const today = new Date('2026-10-20T00:00:00+05:00');
  const user = { _id: new Types.ObjectId(), streak: 6, streakFreeze: 1 };

  it('공부한 날과 메운 날 중 늦은 쪽부터 연속을 센다', () => {
    const s = engagementState(
      { ...user, streakFrozenDays: [new Date('2026-10-18T12:00:00+05:00')] },
      new Date('2026-10-16T10:00:00+05:00'),
      tz,
      today,
    );
    expect(s.idleDays).toBe(4);
    expect(s.streakIdleDays).toBe(2);
  });

  it('공부 기록이 없으면 가입일로 센다', () => {
    const s = engagementState(
      { ...user, createdAt: new Date('2026-10-11T09:00:00+05:00') },
      undefined,
      tz,
      today,
    );
    expect(s.idleDays).toBeNull();
    expect(s.signupDays).toBe(9);
  });
});
