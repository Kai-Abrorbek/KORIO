/**
 * 선생님 목소리 미리듣기 에셋 생성기.
 *
 *   pnpm --filter tutor-agent preview:generate
 *
 * ── 왜 필요한가 ──
 *
 * 선생님 고르는 화면의 미리듣기가 **실제 통화 목소리와 같아야** 한다.
 * 예전엔 Azure ko-KR 로 들려줬는데 통화는 Gemini native audio 라, 고를 때
 * 들은 사람과 수업에서 만나는 사람이 아예 달랐다.
 *
 * ── 왜 Gemini TTS 로 미리 만드나 ──
 *
 * Gemini TTS 의 prebuilt voice 목록은 Gemini Live 와 **같은 30개**다
 * (@livekit/agents-plugin-google 의 GeminiVoices == Live 의 Voice).
 * 그래서 같은 voiceName 으로 합성하면 통화에서 나올 목소리가 그대로 나온다.
 *
 * 선생님 5 × 언어 4 = 20개뿐이라 누를 때마다 합성할 이유가 없다. 한 번 만들어
 * 커밋하고 API 가 파일만 흘려보낸다.
 *
 * ⚠️ gemini/voices.ts 의 매핑을 바꾸면 **이 스크립트를 다시 돌려라.**
 *    안 돌리면 미리듣기와 통화가 또 갈라진다.
 *
 * ⚠️ 매핑을 여기에 복사해두지 않는다. 아래에서 voices.ts 를 **직접 읽는다** —
 *    source of truth 가 두 벌이 되는 순간 이 문제가 다시 생긴다.
 *
 * ── 속도 제한 ──
 *
 * Gemini **무료 티어는 TTS 가 분당 3요청**이다 (429
 * generate_content_free_tier_requests). 그래서 요청 사이를 강제로 띄운다.
 * 결제를 붙였으면 `TTS_RATE_MS=1000` 처럼 줄여서 빨리 돌려라.
 *
 * 이미 만들어진 mp3 는 건너뛴다 — 중간에 끊겨도 다시 돌리면 이어서 한다.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeLogger } from '@livekit/agents';
import * as google from '@livekit/agents-plugin-google';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..', '..', '..');
const VOICES_TS = join(REPO, 'apps/api/src/tutor/gemini/voices.ts');
const OUT_DIR = join(REPO, 'apps/api/assets/tutor-previews');

/** 24kHz 16-bit mono PCM — Gemini TTS 출력 그대로 */
const SAMPLE_RATE = 24_000;

/**
 * 요청 사이 간격(ms).
 *
 * 무료 티어가 분당 3요청이라 21초를 기본으로 둔다. 결제를 붙였으면
 * TTS_RATE_MS 로 줄여라 (1000 정도면 충분히 안전하다).
 */
const RATE_MS = Number(process.env.TTS_RATE_MS) || 21_000;

/** 한 요청당 재시도 횟수. 429 가 오면 서버가 알려준 시간만큼 기다린다 */
const MAX_TRIES = 5;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 429 응답 본문에서 "Please retry in 43.3s" / retryDelay 를 뽑는다 */
function retryAfterMs(err: unknown): number | null {
  const text = err instanceof Error ? err.message : String(err);
  const m =
    /retryDelay\\?"?:\\?"?(\d+)s/.exec(text) ??
    /retry in ([\d.]+)s/.exec(text);
  return m ? Math.ceil(Number(m[1]) * 1000) + 1000 : null;
}

type Lang = 'uz' | 'ru' | 'en' | 'ko';
const LANGS: Lang[] = ['uz', 'ru', 'en', 'ko'];

/**
 * 미리듣기 대본.
 *
 * ⚠️ 한 문장 안에서 언어를 섞지 않는다. 설명 언어로 한 마디, **끊고**,
 *    한국어로 한 마디. 마스터 프롬프트 §29 의 규칙과 같은 모양이라야
 *    미리듣기가 실제 수업의 소리를 보여준다.
 *
 * ⚠️ 한국어 한 마디는 uz/ru/en 에서 **똑같다.** 선생님당 한 번만 합성해서
 *    셋이 나눠 쓴다 — 무료 티어가 분당 3요청이라 요청 하나가 비싸다.
 *    (40요청 → 25요청)
 */
const KOREAN_LINE = '안녕하세요. 오늘부터 저랑 같이 한국어 연습해 봐요.';

const INTRO: Record<Exclude<Lang, 'ko'>, (name: string) => string> = {
  uz: (n) => `Salom, men ${n} ustozman. Bugun birga koreyscha mashq qilamiz.`,
  ru: (n) => `Привет, я ${n}. Сегодня будем вместе практиковать корейский.`,
  en: (n) => `Hi, I'm ${n}. We'll practise Korean together from today.`,
};

/** 받침이 있으면 "이에요", 없으면 "예요" */
function copula(name: string): string {
  const code = name.charCodeAt(name.length - 1);
  if (code < 0xac00 || code > 0xd7a3) return '이에요';
  return (code - 0xac00) % 28 === 0 ? '예요' : '이에요';
}

/**
 * 설명 언어가 한국어면 언어 경계가 없다 — 한 덩어리로 말한다.
 * 굳이 끊으면 어색하고, 요청도 하나 더 든다.
 */
const KO_ONLY = (n: string) =>
  `안녕하세요, ${n}${copula(n)}. 오늘부터 저랑 같이 한국어 연습해 봐요.`;

/** voices.ts 를 읽어 `id → voiceName` 을 뽑는다. 매핑의 주인은 그 파일이다 */
function readVoiceMap(): Record<string, string> {
  const src = readFileSync(VOICES_TS, 'utf8');
  const body = src.slice(src.indexOf('TEACHER_VOICE'));
  const out: Record<string, string> = {};
  for (const m of body.matchAll(
    /(\w+)\s*:\s*\{\s*voiceName\s*:\s*['"]([^'"]+)['"]/g,
  )) {
    out[m[1]] = m[2];
  }
  if (!Object.keys(out).length) {
    throw new Error(`voices.ts 에서 매핑을 못 읽었다: ${VOICES_TS}`);
  }
  return out;
}

/** 선생님 이름(해당 언어). tutor-teachers.ts 에서 한국어 이름만 간단히 뽑는다 */
function readTeacherNames(): Record<string, string> {
  const src = readFileSync(
    join(REPO, 'apps/api/src/tutor/teachers/tutor-teachers.ts'),
    'utf8',
  );
  const out: Record<string, string> = {};
  for (const m of src.matchAll(
    /id:\s*'(\w+)'[\s\S]{0,400}?name:\s*\{[\s\S]{0,200}?ko:\s*'([^']+)'/g,
  )) {
    out[m[1]] = m[2].replace(/\s*선생님$/, '');
  }
  return out;
}

/** PCM 조각들을 모아 WAV 헤더를 붙인다 (ffmpeg 입력용) */
function toWav(pcm: Buffer): Buffer {
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

/** 문장 사이 정적. 언어 경계에서 한 박자 쉬어야 발음이 섞이지 않는다 */
function silence(ms: number): Buffer {
  return Buffer.alloc(Math.round((SAMPLE_RATE * 2 * ms) / 1000));
}

async function synthOnce(voiceName: string, text: string): Promise<Buffer> {
  const tts = new google.beta.TTS({ voiceName });
  /**
   * ⚠️ 'error' 리스너가 **반드시** 있어야 한다.
   *
   *    TTS 는 EventEmitter 인데, 리스너 없이 error 를 emit 하면 Node 가
   *    ERR_UNHANDLED_ERROR 로 **프로세스를 통째로 죽인다.** 429 한 번에
   *    스크립트 전체가 날아가고, 그때까지 만든 파일 목록도 안 보인다.
   */
  let failure: Error | undefined;
  tts.on('error', (e) => {
    failure = e.error;
  });

  const chunks: Buffer[] = [];
  try {
    for await (const ev of tts.synthesize(text)) {
      // AudioFrame.data 는 Int16Array 다. 바이트로 그대로 옮긴다
      const d = ev.frame.data;
      chunks.push(Buffer.from(d.buffer, d.byteOffset, d.byteLength));
    }
  } catch (e) {
    failure = e as Error;
  } finally {
    await tts.close().catch(() => undefined);
  }

  if (failure) throw failure;
  // ⚠️ 에러가 이벤트로만 오고 스트림은 조용히 끝나는 경우가 있다.
  //    빈 오디오를 그대로 파일로 쓰면 "무음 미리듣기" 가 되는데, 그건
  //    에러보다 나쁘다 — 아무도 안 알아챈다.
  if (!chunks.length) throw new Error('오디오가 비어 있다 (조용한 실패)');
  return Buffer.concat(chunks);
}

/** 속도 제한을 지키며 합성한다. 429 면 서버가 알려준 만큼 기다렸다 다시 */
async function synth(voiceName: string, text: string): Promise<Buffer> {
  for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    try {
      const audio = await synthOnce(voiceName, text);
      await sleep(RATE_MS);
      return audio;
    } catch (e) {
      const wait = retryAfterMs(e) ?? attempt * 20_000;
      if (attempt === MAX_TRIES) throw e;
      console.log(
        `    · 실패 (${attempt}/${MAX_TRIES}) — ${Math.round(wait / 1000)}초 뒤 재시도`,
      );
      await sleep(wait);
    }
  }
  throw new Error('unreachable');
}

async function main() {
  initializeLogger({ pretty: true, level: 'error' });
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error('GOOGLE_API_KEY 가 없다 (apps/tutor-agent/.env)');
  }

  const voices = readVoiceMap();
  const names = readTeacherNames();
  mkdirSync(OUT_DIR, { recursive: true });

  const todo = Object.entries(voices).flatMap(([id]) =>
    LANGS.filter((l) => !existsSync(join(OUT_DIR, `${id}-${l}.mp3`))).map(
      (l) => `${id}-${l}`,
    ),
  );
  console.log(`목소리 매핑: ${JSON.stringify(voices)}`);
  console.log(
    `남은 파일 ${todo.length}개 · 요청 간격 ${RATE_MS / 1000}초 ` +
      `(무료 티어는 분당 3요청. 결제했으면 TTS_RATE_MS=1000)`,
  );
  if (!todo.length) {
    console.log('이미 전부 있다. 지우고 다시 돌리면 새로 만든다.');
    return;
  }

  for (const [id, voiceName] of Object.entries(voices)) {
    const name = names[id] ?? id;
    /** uz/ru/en 이 나눠 쓰는 한국어 한 마디. 필요할 때 한 번만 만든다 */
    let sharedKo: Buffer | null = null;

    for (const lang of LANGS) {
      const mp3 = join(OUT_DIR, `${id}-${lang}.mp3`);
      if (existsSync(mp3)) {
        console.log(`  · ${id}-${lang}.mp3 있음 — 건너뜀`);
        continue;
      }

      let audio: Buffer;
      if (lang === 'ko') {
        audio = await synth(voiceName, KO_ONLY(name));
      } else {
        const intro = await synth(voiceName, INTRO[lang](name));
        if (!sharedKo) sharedKo = await synth(voiceName, KOREAN_LINE);
        // 언어 경계에서 한 박자 쉰다 — 발음이 섞이지 않게
        audio = Buffer.concat([intro, silence(600), sharedKo]);
      }

      const wav = join(OUT_DIR, `${id}-${lang}.wav`);
      writeFileSync(wav, toWav(audio));
      // 앱이 받아가는 건 mp3 다. WAV 로 두면 20개가 10MB 가까이 된다
      execFileSync('ffmpeg', [
        '-y', '-loglevel', 'error',
        '-i', wav,
        '-codec:a', 'libmp3lame', '-b:a', '64k', '-ac', '1',
        mp3,
      ]);
      rmSync(wav, { force: true });
      console.log(`  ✔ ${id}-${lang}.mp3  (${voiceName})`);
    }
  }

  console.log(`\n완료 → ${OUT_DIR}`);
  console.log('생성된 mp3 를 커밋해야 서버가 서빙한다.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
