import { buildCopy, comebackStep } from './push-copy';
import { PUSH_LANGS, PushType } from './push.types';

const COMEBACK = [
  PushType.DAILY_REMINDER,
  PushType.ENGAGE,
  PushType.GUIDED_IDLE,
];

/** 같은 사람에게 n일 동안 나갈 복귀 문구를 순서대로 */
function sequence(days: number, params: Record<string, unknown> = {}) {
  const out: { idle: number; title: string }[] = [];
  for (let idle = 1; idle <= days; idle++) {
    const perDay = idle >= 7 ? 1 : 2;
    if (idle >= 14 && (idle - 14) % 7 !== 0) continue;
    for (let slot = 0; slot < perDay; slot++) {
      const copy = buildCopy(
        PushType.ENGAGE,
        'ko',
        { idleDays: idle, studiedBefore: true, ...params },
        comebackStep(idle, slot as 0 | 1),
      );
      out.push({ idle, title: copy!.title });
    }
  }
  return out;
}

describe('복귀 알림 문구', () => {
  it('모든 줄이 4개 언어로 빈칸 없이 나온다', () => {
    for (const type of COMEBACK) {
      for (const lang of PUSH_LANGS) {
        for (let r = 0; r < 20; r++) {
          const copy = buildCopy(type, lang, { nickname: 'Kai' }, r);
          expect(copy).not.toBeNull();
          expect(copy!.title.length).toBeGreaterThan(0);
          expect(copy!.body.length).toBeGreaterThan(0);
          expect(`${copy!.title} ${copy!.body}`).not.toMatch(/\{\{|\}\}|‎/);
        }
      }
    }
  });

  it('쉰 날짜에 맞는 단계 문구가 나온다', () => {
    const at = (idle: number, slot: 0 | 1 = 0) =>
      buildCopy(
        PushType.ENGAGE,
        'ko',
        { idleDays: idle, studiedBefore: true, nickname: '카이' },
        comebackStep(idle, slot),
      )!.title;
    expect(at(1)).toContain('다시 시작하세요');
    expect(at(7)).toBe('🔇 학습 알림이 효과가 없는 것 같군요');
    expect(at(14)).toBe('그만 할게요!!!');
    expect(at(21)).toBe('이대로 안녕은 아니지만… 😔');
  });

  it('같은 문장이 연달아 나오지 않는다 (60일)', () => {
    for (const nickname of ['카이', undefined]) {
      const seq = sequence(60, { nickname });
      for (let i = 1; i < seq.length; i++) {
        expect(seq[i].title).not.toBe(seq[i - 1].title);
      }
    }
  });

  it('닉네임이 없으면 이름 부르는 줄은 건너뛴다', () => {
    const titles = sequence(60).map((s) => s.title);
    expect(titles.join('\n')).not.toMatch(/, 님|부탁이에요, 님/);
    const named = sequence(60, { nickname: '카이' }).map((s) => s.title);
    expect(named).toContain('제발 부탁이에요, 카이님 🙏');
  });

  it('한 번도 공부 안 한 사람에게 "다시 시작" 은 안 보낸다', () => {
    for (let idle = 0; idle <= 30; idle++) {
      for (const slot of [0, 1] as const) {
        const copy = buildCopy(
          PushType.ENGAGE,
          'ko',
          { idleDays: idle, studiedBefore: false },
          comebackStep(idle, slot),
        );
        expect(copy!.title).not.toContain('다시 시작');
      }
    }
  });

  it('배우는 말을 코스에 맞게 부른다', () => {
    const hi = (lang: 'ko' | 'ru' | 'uz' | 'en', targetLanguage: string) =>
      buildCopy(
        PushType.ENGAGE,
        lang,
        { idleDays: 5, studiedBefore: true, targetLanguage },
        comebackStep(5, 0),
      )!.body;
    expect(hi('ko', 'korean')).toBe('아직도 한국어를 배우고 싶으신가요? 🥺');
    expect(hi('ko', 'english')).toBe('아직도 영어를 배우고 싶으신가요? 🥺');
    expect(hi('ru', 'english')).toBe(
      'Вы всё ещё хотите выучить английский? 🥺',
    );
    expect(hi('uz', 'korean')).toBe(
      "Hali ham koreys tilini o'rganmoqchimisiz? 🥺",
    );
    const restart = buildCopy(
      PushType.ENGAGE,
      'ru',
      { idleDays: 1, studiedBefore: true, targetLanguage: 'korean' },
      0,
    )!.title;
    expect(restart).toContain('к корейскому');
  });
});

describe('연속 학습 문구', () => {
  it('러시아어는 수에 맞는 꼴을 쓴다', () => {
    const title = (streak: number) =>
      buildCopy(PushType.STREAK_RISK, 'ru', { streak })!.title;
    expect(title(1)).toContain('серию в 1 день!');
    expect(title(3)).toContain('серию в 3 дня!');
    expect(title(5)).toContain('серию в 5 дней!');
    expect(title(11)).toContain('серию в 11 дней!');
    expect(title(22)).toContain('серию в 22 дня!');
    expect(buildCopy(PushType.STREAK_LOST, 'ru', { streak: 21 })!.title).toBe(
      'Вчера ваша серия в 21 день приостановилась',
    );
  });

  it('끊긴 다음 날 문구', () => {
    expect(buildCopy(PushType.STREAK_LOST, 'ko', { streak: 12 })).toEqual({
      title: '어제 12일 연속 학습이 잠시 멈췄습니다',
      body: '오늘은 잊지 말고 연습을 이어가세요! 🔥',
    });
    expect(buildCopy(PushType.STREAK_RISK, 'en', { streak: 4 })!.title).toBe(
      "🔥 Don't lose your 4-day streak!",
    );
  });
});
