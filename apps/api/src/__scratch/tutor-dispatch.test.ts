/**
 * Agent dispatch 계약.
 *
 * ⚠️ 여기서 지키는 건 하나다: **앱이 못 건드리는 값들이 서버에서 제대로
 *    채워지는가.** instructions / model / voiceName 이 비면 Agent 는 아무
 *    지시 없이 말하기 시작하거나 엉뚱한 목소리로 말한다. 그건 조용히
 *    잘못 도는 실패라 제일 늦게 발견된다.
 *
 * 실행: node --experimental-strip-types --test src/__scratch/tutor-dispatch.test.ts
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  decodeDispatchMetadata,
  encodeDispatchMetadata,
  type TutorDispatchMetadata,
} from '../tutor/livekit/dispatch-metadata';
import {
  isLiveKitConfigured,
  learnerIdentity,
  liveKitEnv,
  tutorRoomName,
} from '../tutor/livekit/livekit.const';
import { geminiLiveModel } from '../tutor/gemini/live.const';
import { TEACHER_VOICE, voiceForTeacher } from '../tutor/gemini/voices';
import { TUTOR_TEACHERS } from '../tutor/teachers/tutor-teachers';

const base = (): TutorDispatchMetadata => ({
  sessionId: '65f1c2d3e4b5a60718293a4b',
  instructions: '너는 한국어 선생님이다.',
  model: geminiLiveModel(),
  voiceName: 'Achernar',
  teacherId: 'seoyeon',
  mode: 'freeTalk',
  teachingLanguage: 'uz',
  addressStyle: 'polite',
  maxDurationSec: 600,
});

test('모델은 3.8 Live GA', () => {
  assert.equal(geminiLiveModel(), 'gemini-3.8-live');
  assert.ok(!geminiLiveModel().includes('preview'), 'GA 모델이라 suffix 가 없다');
});

/**
 * ⚠️ 이 테스트가 존재하는 이유.
 *
 * 예전엔 `export const LIVEKIT_URL = process.env.LIVEKIT_URL` 처럼 모듈
 * 최상단에서 읽었다. NestJS 의 ConfigModule 은 import 가 **다 끝난 뒤에**
 * dotenv 를 로드해서, .env 에 값이 멀쩡히 있는데도 빈 문자열로 굳었다.
 * 증상은 "LIVEKIT_* 가 없다 — AI 튜터 통화가 비활성이다" 였다.
 */
test('설정은 모듈 로드 시점이 아니라 호출 시점에 읽는다', () => {
  const before = process.env.LIVEKIT_URL;
  const beforeModel = process.env.GEMINI_LIVE_MODEL;
  try {
    delete process.env.LIVEKIT_URL;
    delete process.env.LIVEKIT_API_KEY;
    delete process.env.LIVEKIT_API_SECRET;
    assert.equal(isLiveKitConfigured(), false, '비어 있으면 false 여야 한다');

    // dotenv 가 나중에 채워 넣는 상황을 흉내 낸다
    process.env.LIVEKIT_URL = 'wss://x.livekit.cloud';
    process.env.LIVEKIT_API_KEY = 'APIkey';
    process.env.LIVEKIT_API_SECRET = 'secret';
    assert.equal(isLiveKitConfigured(), true, '나중에 채워도 읽혀야 한다');
    assert.equal(liveKitEnv().url, 'wss://x.livekit.cloud');

    process.env.GEMINI_LIVE_MODEL = 'gemini-experimental';
    assert.equal(geminiLiveModel(), 'gemini-experimental', '.env 오버라이드가 먹어야 한다');
  } finally {
    if (before === undefined) delete process.env.LIVEKIT_URL;
    else process.env.LIVEKIT_URL = before;
    if (beforeModel === undefined) delete process.env.GEMINI_LIVE_MODEL;
    else process.env.GEMINI_LIVE_MODEL = beforeModel;
    delete process.env.LIVEKIT_API_KEY;
    delete process.env.LIVEKIT_API_SECRET;
  }
});

test('방 이름과 identity 는 세션마다 다르다', () => {
  const a = '65f1c2d3e4b5a60718293a4b';
  const b = '65f1c2d3e4b5a60718293a4c';
  assert.equal(tutorRoomName(a), 'tutor-65f1c2d3e4b5a60718293a4b');
  assert.notEqual(tutorRoomName(a), tutorRoomName(b));
  // identity 에 유저 id 가 섞이면 같은 방의 다른 참가자에게 그대로 보인다
  assert.ok(learnerIdentity(a).includes(a));
  assert.notEqual(learnerIdentity(a), learnerIdentity(b));
});

test('metadata 왕복', () => {
  const m = base();
  assert.deepEqual(decodeDispatchMetadata(encodeDispatchMetadata(m)), m);
});

test('필수 값이 비면 조용히 넘어가지 않고 죽는다', () => {
  for (const k of [
    'instructions',
    'model',
    'voiceName',
    'addressStyle',
    'teachingLanguage',
  ] as const) {
    const m: any = base();
    delete m[k];
    assert.throws(
      () => decodeDispatchMetadata(JSON.stringify(m)),
      new RegExp(k),
      `${k} 가 없는데 통과했다`,
    );
  }
});

test('선생님마다 목소리가 다르다', () => {
  // 목소리는 성격의 절반이다. 둘이 같은 소리로 말하면 카드에서 고르는 의미가 없다
  const ids = TUTOR_TEACHERS.map((t) => t.id);
  const voices = ids.map(voiceForTeacher);
  assert.equal(new Set(voices).size, voices.length, `겹친다: ${voices.join()}`);
  for (const id of ids) {
    assert.ok(TEACHER_VOICE[id], `${id} 매핑 없음 — 기본 목소리로 떨어진다`);
  }
});

test('말투는 성격에서 끌어내지 않는다', () => {
  // "놀리는데 존댓말" 도 "차분한데 반말" 도 고를 수 있어야 한다
  const teasing = TUTOR_TEACHERS.find((t) => t.personality === 'teasing');
  assert.ok(teasing, 'teasing 선생님이 사라졌다');
  const m = { ...base(), teacherId: teasing.id, addressStyle: 'polite' as const };
  assert.equal(decodeDispatchMetadata(encodeDispatchMetadata(m)).addressStyle, 'polite');
});
