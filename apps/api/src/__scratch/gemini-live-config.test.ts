/**
 * Gemini Live 세션 설정.
 *
 * ⚠️ 여기서 제일 중요한 건 **넣으면 안 되는 걸 안 넣었는지**다.
 *    3.8 Live 는 thinkingConfig 를 거절하고, proactiveAudio 를 끄면 예전
 *    모델에서 겪던 "생각하는 중에 끼어들기" 가 그대로 돌아온다.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  buildGeminiLiveConfig,
  liveConnectConstraints,
} from '../tutor/gemini/live-config';
import {
  AUDIO_CHUNK_BYTES,
  AUDIO_IN,
  AUDIO_OUT,
  GEMINI_LIVE_MODEL,
  GEMINI_LIVE_MODEL_PATH,
} from '../tutor/gemini/live.const';
import { TUTOR_TEACHERS, resolveTeacher } from '../tutor/teachers/tutor-teachers';
import type { LearnerContext } from '../tutor/prompt/build-instructions';

const learner: LearnerContext = {
  koreanLevel: 'beginner',
  nativeLanguage: 'uz',
  weakPoints: [],
  recentVocabulary: [],
  interests: [],
};

const cfg = (voiceName = 'VOICE') =>
  buildGeminiLiveConfig({
    learner,
    mode: 'freeTalk',
    teacher: resolveTeacher(),
    voiceName,
  });

test('모델 ID — SDK 용과 WebSocket 용이 다르다', () => {
  assert.equal(GEMINI_LIVE_MODEL, 'gemini-3.8-live');
  assert.equal(GEMINI_LIVE_MODEL_PATH, 'models/gemini-3.8-live');
  assert.ok(!GEMINI_LIVE_MODEL.includes('preview'), 'GA 모델이라 suffix 가 없다');
});

test('오디오 규격 — 입력 16k / 출력 24k', () => {
  assert.equal(AUDIO_IN.sampleRate, 16_000);
  assert.equal(AUDIO_IN.mimeType, 'audio/pcm;rate=16000');
  assert.equal(AUDIO_OUT.sampleRate, 24_000);
  // 40ms = 16000 × 2바이트 × 0.04
  assert.equal(AUDIO_CHUNK_BYTES, 1280);
  assert.ok(AUDIO_CHUNK_BYTES % 2 === 0, '16bit 샘플이 반쪽 나면 잡음이 된다');
});

test('출력은 오디오 하나뿐이고 자막은 양쪽 다 켠다', () => {
  const c = cfg();
  assert.deepEqual(c.responseModalities, ['AUDIO']);
  assert.deepEqual(c.inputAudioTranscription, {});
  assert.deepEqual(c.outputAudioTranscription, {});
});

test('긴 대화·재연결 대비가 켜져 있다', () => {
  const c = cfg();
  assert.deepEqual(c.contextWindowCompression, { slidingWindow: {} });
  assert.deepEqual(c.sessionResumption, {});
});

test('넣으면 안 되는 것이 안 들어갔다', () => {
  const c = cfg() as unknown as Record<string, unknown>;
  for (const banned of [
    'thinkingConfig',
    'thinkingLevel',
    'enableAffectiveDialog',
    'proactivity',
    'tools',
  ]) {
    assert.ok(!(banned in c), `${banned} 가 들어 있다`);
  }
});

test('languageCode 를 고정하지 않는다 — 한 문장 안에서 언어가 바뀐다', () => {
  assert.equal(cfg().speechConfig.languageCode, undefined);
});

test('목소리는 선생님이 정한다', () => {
  assert.equal(
    cfg('Zephyr').speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName,
    'Zephyr',
  );
});

test('선생님마다 지시문이 실제로 다르다', () => {
  const seen = new Set(
    TUTOR_TEACHERS.map(
      (t) =>
        buildGeminiLiveConfig({
          learner,
          mode: 'freeTalk',
          teacher: t,
          voiceName: 'V',
        }).systemInstruction,
    ),
  );
  assert.equal(seen.size, TUTOR_TEACHERS.length);
});

test('토큰 제약에 모델 경로가 박힌다', () => {
  const k = liveConnectConstraints(cfg());
  assert.equal(k.model, 'models/gemini-3.8-live');
  assert.ok(k.config.systemInstruction.includes('KORIO LIVE TUTOR'));
});
