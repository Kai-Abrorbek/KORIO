/**
 * 프롬프트가 실제로 어떻게 조립되는지 + 얼마나 큰지.
 *
 * ⚠️ 시스템 지시문은 **매 세션 통째로** 올라간다. 놀리는 예시 4개 언어를 전부
 *    넣으면 대화 한 줄 하기도 전에 수천 토큰을 태운다. 그래서 필요한 것만
 *    골라 넣는데, 그게 실제로 동작하는지 눈으로 볼 수 있어야 한다.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildTutorInstructions, type LearnerContext } from '../tutor/prompt/build-instructions';
import { TUTOR_TEACHERS, resolveTeacher } from '../tutor/teachers/tutor-teachers';
import { TOPIC_BY_ID } from '../tutor/topics/tutor-topics';

const learner = (lang = 'uz'): LearnerContext => ({
  koreanLevel: 'beginner',
  nativeLanguage: lang,
  weakPoints: ['조사 은/는'],
  recentVocabulary: ['공항', '주문'],
  interests: ['여행'],
  nickname: 'Abror',
  spokenMistakes: [{ corrected: '만났어요', type: 'ending' }],
  mistakeHabits: ['particle'],
  topicProgress: 35,
});

const approxTokens = (s: string) => Math.round(s.length / 3.3);

test('선생님마다 프롬프트가 실제로 갈린다', () => {
  const seen = new Set<string>();
  for (const t of TUTOR_TEACHERS) {
    const p = buildTutorInstructions(learner(), 'freeTalk', undefined, undefined, t);
    assert.ok(p.includes(t.name.ko!.replace(/\s*선생님$/, '')), `${t.id}: 이름 없음`);
    seen.add(p);
  }
  assert.equal(seen.size, TUTOR_TEACHERS.length, '두 선생님의 프롬프트가 똑같다');
});

test('놀리는 예시는 놀리는 선생님에게만 간다', () => {
  for (const t of TUTOR_TEACHERS) {
    const p = buildTutorInstructions(learner(), 'freeTalk', undefined, undefined, t);
    const hasRoast = p.includes('TEASING / ROAST PERSONALITY');
    assert.equal(hasRoast, t.personality === 'teasing', `${t.id} (${t.personality})`);
  }
});

test('안 쓰는 언어의 예시는 안 들어간다', () => {
  const teaser = TUTOR_TEACHERS.find((t) => t.personality === 'teasing')!;
  const uz = buildTutorInstructions(learner('uz'), 'freeTalk', undefined, undefined, teaser);
  assert.ok(uz.includes('TEASING EXAMPLES — UZBEK'));
  assert.ok(uz.includes('TEASING EXAMPLES — KOREAN'), '한국어 예시는 항상 필요하다');
  assert.ok(!uz.includes('TEASING EXAMPLES — RUSSIAN'));
  assert.ok(!uz.includes('TEASING EXAMPLES — ENGLISH'));

  const ru = buildTutorInstructions(learner('ru'), 'freeTalk', undefined, undefined, teaser);
  assert.ok(ru.includes('TEASING EXAMPLES — RUSSIAN'));
  assert.ok(!ru.includes('TEASING EXAMPLES — UZBEK'));
  assert.ok(ru.includes('Ну ё-моё'), '러시아어 말투 블록이 없다');
});

test('주제를 고르면 진행도와 목표 표현이 들어간다', () => {
  const topic = [...TOPIC_BY_ID.values()][0]!;
  const p = buildTutorInstructions(learner(), 'lesson', undefined, topic, resolveTeacher());
  assert.ok(p.includes('35 / 100'), '진행도 없음');
  assert.ok(p.includes(topic.targetExpressions[0]!), '목표 표현 없음');
  assert.ok(!p.includes('{{'), '안 채워진 자리표시자가 남았다');
});

test('크기 — 매 세션 올라가는 값이다', () => {
  const calm = TUTOR_TEACHERS.find((t) => t.personality !== 'teasing')!;
  const teaser = TUTOR_TEACHERS.find((t) => t.personality === 'teasing')!;
  const a = buildTutorInstructions(learner(), 'freeTalk', undefined, undefined, calm);
  const b = buildTutorInstructions(learner(), 'freeTalk', undefined, undefined, teaser);
  console.log(`   차분한 선생님: ${a.length}자 ≈ ${approxTokens(a)} 토큰`);
  console.log(`   놀리는 선생님: ${b.length}자 ≈ ${approxTokens(b)} 토큰`);
  console.log(`   놀림 블록이 더하는 몫: +${approxTokens(b) - approxTokens(a)} 토큰`);
  // 네 언어를 다 넣던 원본(약 9천 토큰)보다는 확실히 작아야 한다
  assert.ok(approxTokens(b) < 8000, `너무 크다: ${approxTokens(b)}`);
});

test('말투는 성격과 독립이다 — 유저가 고른 값만 따른다', () => {
  const teaser = TUTOR_TEACHERS.find((t) => t.personality === 'teasing')!;
  const calm = TUTOR_TEACHERS.find((t) => t.personality !== 'teasing')!;

  const line = (p: string) =>
    p.split('\n')[
      p.split('\n').findIndex((l) =>
        l.includes("Tutor's Korean speaking style toward the learner"),
      ) + 1
    ];

  // 놀리는 선생님 + 존댓말을 고를 수 있어야 한다
  assert.equal(
    line(buildTutorInstructions(learner(), 'freeTalk', undefined, undefined, teaser, 'polite')),
    'polite',
  );
  // 차분한 선생님 + 반말도 고를 수 있어야 한다
  assert.equal(
    line(buildTutorInstructions(learner(), 'freeTalk', undefined, undefined, calm, 'casual')),
    'casual',
  );
  // 안 고르면 존댓말 (외국인이 한국에서 쓰기 안전한 쪽)
  assert.equal(
    line(buildTutorInstructions(learner(), 'freeTalk', undefined, undefined, teaser)),
    'polite',
  );
});

test('말투를 바꿔도 가르치는 한국어 격식 규칙은 그대로다', () => {
  const t = TUTOR_TEACHERS[0]!;
  for (const style of ['polite', 'casual'] as const) {
    const p = buildTutorInstructions(learner(), 'lesson', undefined, undefined, t, style);
    assert.ok(
      p.includes('TUTOR SPEAKING STYLE ≠ KOREAN LESSON REGISTER'),
      `${style}: §5 가 빠졌다`,
    );
    assert.ok(p.includes('아이스 아메리카노 한 잔 주세요'), `${style}: 존댓말 예시가 빠졌다`);
  }
});
