/**
 * 선생님 프로필과 프롬프트.
 *
 * 여기가 틀리면 유저는 "서연 선생님" 카드를 고르고 들어가서 "저는 보리쌤이에요"
 * 라는 인사를 듣는다 — 선생님을 고른 의미가 그 자리에서 사라진다.
 *
 * 실행: npx ts-node src/__scratch/tutor-teacher.test.ts   (-T 붙이지 말 것)
 */
import {
  DEFAULT_TEACHER_ID,
  TUTOR_TEACHERS,
  resolveTeacher,
  toTeacherCard,
} from '../tutor/teachers/tutor-teachers';
import {
  buildTutorInstructions,
  type LearnerContext,
} from '../tutor/prompt/build-instructions';

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${msg}`);
};

const LANGS = ['ko', 'uz', 'en', 'ru'];

// ── 프로필 ────────────────────────────────────────────────────
say(TUTOR_TEACHERS.length >= 4, `선생님 ${TUTOR_TEACHERS.length}명`);
say(
  new Set(TUTOR_TEACHERS.map((t) => t.id)).size === TUTOR_TEACHERS.length,
  'id 가 겹치지 않는다',
);
for (const t of TUTOR_TEACHERS) {
  say(
    LANGS.every((l) => !!t.name[l] && !!t.description[l]),
    `[${t.id}] 이름·설명이 4개 언어 다 있다`,
  );
  say(!!t.tts.provider && !!t.tts.voiceId, `[${t.id}] 목소리가 지정돼 있다`);
  // 우즈벡어로 답할 때 쓸 목소리. 없으면 한국어 음성이 라틴 문자를 읽어서
  // 알아들을 수 없는 소리가 난다
  say(
    !!t.ttsUz?.provider && !!t.ttsUz?.voiceId,
    `[${t.id}] 우즈벡어 목소리가 지정돼 있다`,
  );
  say(
    t.ttsUz.voiceId.startsWith('uz-'),
    `[${t.id}] 우즈벡어 목소리가 실제로 우즈벡어 음성이다`,
  );
  say(
    t.speechRate >= 0.7 && t.speechRate <= 1.3,
    `[${t.id}] 말속도가 상식적인 범위`,
  );
  say(t.promptStyle.length > 40, `[${t.id}] 성격 지시문이 비어 있지 않다`);
}
// 목소리가 겹치면 카드만 다르고 소리는 같아서 고른 의미가 없다
say(
  new Set(TUTOR_TEACHERS.map((t) => t.tts.voiceId)).size ===
    TUTOR_TEACHERS.length,
  '선생님마다 목소리가 다르다',
);
say(
  TUTOR_TEACHERS.some((t) => t.recommendedModes.includes('pronunciation')),
  '발음 모드를 맡는 선생님이 있다',
);

// ── 해석 ──────────────────────────────────────────────────────
say(resolveTeacher('seoyeon').id === 'seoyeon', '아는 id 는 그대로');
say(
  resolveTeacher('없는선생').id === DEFAULT_TEACHER_ID,
  '모르는 id 는 기본 선생님으로 (세션을 실패시키지 않는다)',
);
say(resolveTeacher(undefined).id === DEFAULT_TEACHER_ID, 'id 가 없어도 안전');
say(resolveTeacher(null).id === DEFAULT_TEACHER_ID, 'null 도 안전');

const card = toTeacherCard(TUTOR_TEACHERS[0], 'uz');
say(card.name === TUTOR_TEACHERS[0].name.uz, '카드가 요청한 언어로 나온다');
say(
  toTeacherCard(TUTOR_TEACHERS[0], 'de').name === TUTOR_TEACHERS[0].name.en,
  '모르는 언어는 영어로 떨어진다',
);
say(!('promptStyle' in card), '프롬프트는 앱으로 안 내려간다');

// ── 프롬프트 ──────────────────────────────────────────────────
const learner: LearnerContext = {
  koreanLevel: 'beginner',
  nativeLanguage: 'uz',
  weakPoints: [],
  recentVocabulary: [],
  interests: [],
};

for (const t of TUTOR_TEACHERS) {
  const p = buildTutorInstructions(learner, 'freeTalk', undefined, undefined, t);
  const bare = t.name.ko.replace(/\s*선생님$/, '');
  say(p.includes(`You are ${bare}`), `[${t.id}] 프롬프트가 제 이름을 쓴다`);
  say(p.includes(t.promptStyle), `[${t.id}] 성격 지시문이 들어간다`);
  say(!p.includes('보리쌤'), `[${t.id}] 옛 이름이 안 남아 있다`);
}

const p = buildTutorInstructions(
  learner,
  'freeTalk',
  undefined,
  undefined,
  TUTOR_TEACHERS[0],
);
// 하이브리드 전환의 핵심 두 가지
say(/YOU UNDERSTAND UZBEK/.test(p), '우즈벡어를 알아들으라는 지시가 있다');
say(/NEVER pretend you did not/.test(p), '"못 알아들은 척 하지 마라" 가 명시돼 있다');
say(/YOUR FIRST MESSAGE/.test(p), '먼저 인사하라는 지시가 있다');
say(/You speak first/.test(p), '유저보다 먼저 말한다');

// ── 프롬프트 v2 의 핵심 ───────────────────────────────────────
// 길이가 제일 중요한 규칙이다. 이게 빠지면 튜터가 문단으로 답한다
say(/ONE short sentence is your normal reply/.test(p), '한 문장 원칙이 있다');
say(/BANNED/.test(p) && /그렇군요/.test(p), '기계 같은 문구 금지 목록이 있다');
say(/Ask about ONE thing/.test(p), '질문을 쌓지 말라는 지시가 있다');

// v2 에서 뒤집힌 규칙. 예전엔 "단 한 단어도 우즈벡어 금지" 였다 —
// 유저가 우즈벡어로 설명해달라는데 한국어로 버티는 건 도움이 아니라 짜증이다
say(
  !/YOUR SPOKEN REPLY IS ALWAYS KOREAN/.test(p),
  '"무조건 한국어" 규칙이 걷혔다',
);
say(/UZBEK WHEN THEY ASK/.test(p), '요청하면 우즈벡어로 답하라는 지시가 있다');
say(/Do NOT refuse/.test(p), '언어 전환을 거부하지 말라고 못 박았다');

// 목소리는 문장 단위로 언어를 판정해 고른다. 한 문장 안에 섞이면
// 다수쪽 음성이 소수쪽을 엉터리로 읽는다 — 아키텍처 제약이다
say(
  /NEVER mix the two inside ONE sentence/.test(p),
  '한 문장에 두 언어를 섞지 말라는 지시가 있다',
);
say(/READ ALOUD/i.test(p), '모든 글자가 소리로 나간다는 걸 알려준다');

// ── 놀리기는 그 성격일 때만 ───────────────────────────────────
// 차분한 선생님을 고른 유저가 놀림받으면 그건 성격 설정이 샌 버그다
for (const t of TUTOR_TEACHERS) {
  const pr = buildTutorInstructions(learner, 'freeTalk', undefined, undefined, t);
  const teasing = t.personality === 'teasing';
  say(
    /TEASING — THIS IS YOUR CHARACTER/.test(pr) === teasing,
    `[${t.id}] 놀리기 블록이 ${teasing ? '있다' : '없다'}`,
  );
}
say(
  TUTOR_TEACHERS.some((t) => t.personality === 'teasing'),
  '놀리는 선생님이 한 명은 있다',
);

// ── freeTalk 은 주제로 되돌리지 않는다 ────────────────────────
// 예전엔 "새면 한 턴 따라가고 다시 끌고 온다" 였다. 그게 자유 대화를
// 면접으로 만들었다
say(
  /do NOT steer back/.test(p),
  'freeTalk 은 주제로 끌고 오지 않는다',
);

// 선생님 없이도 예전처럼 동작해야 한다 (다른 호출부가 깨지지 않게)
const legacy = buildTutorInstructions(learner, 'freeTalk');
say(legacy.length > 500, '선생님 없이도 프롬프트가 만들어진다');
say(!legacy.includes('WHO YOU ARE'), '선생님 없으면 성격 블록도 없다');

console.log(fail ? `\n❌ ${fail}건 실패` : '\n🎉 전부 통과');
process.exit(fail ? 1 : 0);
