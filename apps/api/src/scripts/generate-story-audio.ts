/**
 * 듣기 이야기 내레이션을 ElevenLabs 로 만든다 — 오디오 + 단어별 타이밍 (모든 코스).
 *
 *   pnpm --filter api story:audio                       없거나 낡은 것만
 *   pnpm --filter api story:audio --only=en-story-a1-01 한 편만 (쉼표로 여러 편)
 *   pnpm --filter api story:audio --force               전부 다시
 *   pnpm --filter api story:audio --prune               API 안 부르고 정리만 (낡은 표·고아 mp3 제거)
 *
 * 문장마다 따로 만들고(앞뒤 문장을 previous_text/next_text 로 넘겨 억양을 잇는다)
 * 사이에 쉼을 넣어 한 파일로 붙인다. 문장 단위로 만들어야 쉼 길이를 우리가 정하고,
 * 각 단어가 몇 ms 에 나오는지(with-timestamps)를 정확히 안다.
 *
 * 결과:
 *   apps/mobile/assets/audio/stories/<code>-<해시>.mp3        앱 번들 (모노 48kbps)
 *   apps/mobile/src/features/stories/storyAudio.generated.ts   앱이 키로 파일을 찾는 표
 *   apps/api/src/seed/data/stories/story-audio.generated.ts    문장·단어 타이밍
 * 그다음 seed:validate-stories → seed:stories → 앱은 OTA.
 *
 * 언어·말 빠르기는 코스 표(stories/story-courses.ts), 목소리는 seed/data/stories/narrators.ts.
 *
 * 필요: ffmpeg (PATH), ELEVENLABS_API_KEY (환경 변수 또는 apps/api/.env — 화면에 안 찍는다).
 */
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import {
  STORY_AUDIO,
  STORY_NARRATORS,
  STORY_SEED_SETS,
} from '../seed/data/stories';
import {
  storyCourseOf,
  type StoryCourseConfig,
} from '../stories/story-courses';
import {
  isGeneratedAudioFresh,
  storyAudioKey,
  storyTextHash,
  tokenizeStoryText,
  type GeneratedStoryAudio,
  type GeneratedStoryAudioMap,
  type StorySeed,
} from '../stories/story-content.util';

const ROOT = resolve(__dirname, '../../../..');
const MOBILE_AUDIO_DIR = join(ROOT, 'apps/mobile/assets/audio/stories');
const MOBILE_REGISTRY = join(
  ROOT,
  'apps/mobile/src/features/stories/storyAudio.generated.ts',
);
const API_TIMINGS = join(
  ROOT,
  'apps/api/src/seed/data/stories/story-audio.generated.ts',
);

/** 모든 코스의 이야기를 한 줄로 (코스 정보와 함께) */
const ALL_STORIES = STORY_SEED_SETS.flatMap((set) => {
  const course = storyCourseOf(set.courseId);
  if (!course)
    throw new Error(`story-courses.ts 에 없는 코스: ${set.courseId}`);
  return set.stories.map((seed) => ({ course, seed }));
});
/** 문장 사이 쉼 */
const SENTENCE_GAP_MS = 650;
const MODEL_ID = 'eleven_multilingual_v2';
const SAMPLE_RATE = 44100;

function readEnvFile(file: string): Record<string, string> {
  if (!existsSync(file)) return {};
  const out: Record<string, string> = {};
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    out[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
  return out;
}

const fileEnv = readEnvFile(join(ROOT, 'apps/api/.env'));
const env = (name: string) =>
  process.env[name]?.trim() || fileEnv[name]?.trim() || '';
const arg = (name: string) =>
  process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=')[1] ?? '';

interface Alignment {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
}

async function speakSentence(
  apiKey: string,
  voiceId: string,
  text: string,
  previousText: string | undefined,
  nextText: string | undefined,
  speed: number,
  languageCode: string,
): Promise<{ mp3: Buffer; alignment: Alignment }> {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      language_code: languageCode,
      previous_text: previousText,
      next_text: nextText,
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.8,
        style: 0.25,
        use_speaker_boost: true,
        speed,
      },
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`ElevenLabs ${response.status} ${detail.slice(0, 300)}`);
  }
  const json = (await response.json()) as {
    audio_base64: string;
    alignment: Alignment | null;
  };
  if (!json.alignment) throw new Error('타이밍(alignment)이 안 왔다');
  return {
    mp3: Buffer.from(json.audio_base64, 'base64'),
    alignment: json.alignment,
  };
}

/** mp3 → 16bit 모노 PCM (샘플 수로 길이를 정확히 알려고 디코드한다) */
function decodeToPcm(mp3: Buffer, workDir: string, name: string): Buffer {
  const input = join(workDir, `${name}.mp3`);
  const output = join(workDir, `${name}.pcm`);
  writeFileSync(input, mp3);
  execFileSync('ffmpeg', [
    '-v',
    'error',
    '-y',
    '-i',
    input,
    '-f',
    's16le',
    '-ac',
    '1',
    '-ar',
    String(SAMPLE_RATE),
    output,
  ]);
  return readFileSync(output);
}

function encodeMp3(pcm: Buffer, workDir: string, outFile: string) {
  const input = join(workDir, 'story.pcm');
  writeFileSync(input, pcm);
  execFileSync('ffmpeg', [
    '-v',
    'error',
    '-y',
    '-f',
    's16le',
    '-ac',
    '1',
    '-ar',
    String(SAMPLE_RATE),
    '-i',
    input,
    '-codec:a',
    'libmp3lame',
    '-b:a',
    '48k',
    outFile,
  ]);
}

/** 문장 안 각 단어(tokenizeStoryText 와 같은 쪼개기)의 시작·끝 ms */
function wordTimings(text: string, alignment: Alignment, offsetMs: number) {
  const spoken = alignment.characters.join('');
  if (spoken !== text) {
    throw new Error(
      `타이밍 글자가 본문과 다르다\n  본문: ${text}\n  타이밍: ${spoken}`,
    );
  }
  const words = tokenizeStoryText(text);
  let cursor = 0;
  return words.map((word) => {
    const start = text.indexOf(word, cursor);
    const end = start + word.length - 1;
    cursor = end + 1;
    // 따옴표·문장부호는 0초짜리일 때가 있어 단어 안의 글자 범위에서 최소·최대를 잡는다
    let startSec = Infinity;
    let endSec = 0;
    for (let i = start; i <= end; i += 1) {
      startSec = Math.min(startSec, alignment.character_start_times_seconds[i]);
      endSec = Math.max(endSec, alignment.character_end_times_seconds[i]);
    }
    return {
      text: word,
      startMs: Math.round(offsetMs + startSec * 1000),
      endMs: Math.round(offsetMs + endSec * 1000),
    };
  });
}

async function generateStory(
  apiKey: string,
  course: StoryCourseConfig,
  seed: StorySeed,
): Promise<GeneratedStoryAudio> {
  const narrator = STORY_NARRATORS[seed.narrator.id];
  if (!narrator) throw new Error(`목소리가 없는 주인공: ${seed.narrator.id}`);
  const textHash = storyTextHash(seed);
  const key = storyAudioKey(seed.code, textHash);
  const workDir = join(tmpdir(), `korio-story-${process.pid}-${key}`);
  mkdirSync(workDir, { recursive: true });

  const speed =
    course.levels.find((level) => level.key === seed.level)?.narrationSpeed ??
    1;
  const gap = Buffer.alloc(
    Math.round((SENTENCE_GAP_MS / 1000) * SAMPLE_RATE) * 2,
  );
  const chunks: Buffer[] = [];
  const sentences: GeneratedStoryAudio['sentences'] = [];
  let offsetSamples = 0;

  try {
    for (const [index, sentence] of seed.sentences.entries()) {
      const { mp3, alignment } = await speakSentence(
        apiKey,
        narrator.voiceId,
        sentence.text,
        seed.sentences[index - 1]?.text,
        seed.sentences[index + 1]?.text,
        speed,
        course.targetLanguage,
      );
      const pcm = decodeToPcm(mp3, workDir, sentence.id);
      const offsetMs = (offsetSamples / SAMPLE_RATE) * 1000;
      const words = wordTimings(sentence.text, alignment, offsetMs);
      sentences.push({
        id: sentence.id,
        startMs: words[0]?.startMs ?? Math.round(offsetMs),
        endMs: words[words.length - 1]?.endMs ?? Math.round(offsetMs),
        words,
      });
      chunks.push(pcm);
      offsetSamples += pcm.length / 2;
      if (index < seed.sentences.length - 1) {
        chunks.push(gap);
        offsetSamples += gap.length / 2;
      }
      process.stdout.write('.');
    }

    mkdirSync(MOBILE_AUDIO_DIR, { recursive: true });
    // 이 이야기의 옛 파일(다른 해시)은 지운다 — 앱 번들에 쓰레기가 쌓이지 않게
    for (const file of readdirSync(MOBILE_AUDIO_DIR)) {
      if (file.startsWith(`${seed.code}-`) && file !== `${key}.mp3`) {
        rmSync(join(MOBILE_AUDIO_DIR, file));
      }
    }
    encodeMp3(
      Buffer.concat(chunks),
      workDir,
      join(MOBILE_AUDIO_DIR, `${key}.mp3`),
    );
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }

  return {
    key,
    textHash,
    durationMs: Math.round((offsetSamples / SAMPLE_RATE) * 1000),
    sentences,
  };
}

/**
 * 결과 표 쓰기. 윈도우에서 다른 프로그램(편집기·백신)이 파일을 잠깐 잡고 있으면
 * open 이 UNKNOWN 으로 실패할 때가 있어 조금 쉬었다가 다시 쓴다.
 */
function writeWithRetry(file: string, content: string) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      writeFileSync(file, content);
      return;
    } catch (error) {
      if (attempt >= 5) throw error;
      Atomics.wait(
        new Int32Array(new SharedArrayBuffer(4)),
        0,
        0,
        300 * attempt,
      );
    }
  }
}

/** API 린트(prettier)가 나중에 다시 고치지 않게 처음부터 그 모양으로 쓴다 */
function formatWithPrettier(file: string) {
  execFileSync(
    process.execPath,
    [
      require.resolve('prettier/bin/prettier.cjs'),
      '--write',
      '--log-level',
      'warn',
      file,
    ],
    { cwd: join(ROOT, 'apps/api') },
  );
}

function writeApiTimings(map: GeneratedStoryAudioMap) {
  const ordered = Object.fromEntries(
    ALL_STORIES.filter(({ seed }) => map[seed.code]).map(({ seed }) => [
      seed.code,
      map[seed.code],
    ]),
  );
  writeWithRetry(
    API_TIMINGS,
    [
      '// 자동 생성 파일 — 손으로 고치지 않는다.',
      '// pnpm --filter api story:audio 가 ElevenLabs 내레이션을 만들고 이 파일을 다시 쓴다.',
      "import type { GeneratedStoryAudioMap } from '../../../stories/story-content.util';",
      '',
      `export const STORY_AUDIO_GENERATED: GeneratedStoryAudioMap = ${JSON.stringify(ordered, null, 2)};`,
      '',
    ].join('\n'),
  );
  formatWithPrettier(API_TIMINGS);
}

function writeMobileRegistry(map: GeneratedStoryAudioMap) {
  const keys = ALL_STORIES.map(({ seed }) => map[seed.code]?.key).filter(
    (key): key is string =>
      !!key && existsSync(join(MOBILE_AUDIO_DIR, `${key}.mp3`)),
  );
  mkdirSync(dirname(MOBILE_REGISTRY), { recursive: true });
  writeWithRetry(
    MOBILE_REGISTRY,
    [
      '// 자동 생성 파일 — 손으로 고치지 않는다.',
      '// pnpm --filter api story:audio 가 내레이션 mp3 를 만들고 이 표를 다시 쓴다.',
      '// 서버가 주는 audio.key 가 여기 없으면 그 이야기는 잠긴다 (storyAudio.ts).',
      '',
      'export const STORY_AUDIO_FILES: Record<string, number> = {',
      ...keys.map(
        (key) =>
          `  "${key}": require("../../../assets/audio/stories/${key}.mp3"),`,
      ),
      '};',
      '',
    ].join('\n'),
  );
}

/**
 * 한 번에 하나만 돌린다. 두 개가 겹치면 결과 표를 서로 덮어써서 만든 오디오가
 * 표에서 빠진다 (실제로 있었다). 끝나면 지운다 — 강제 종료로 남았으면 손으로 지운다.
 */
const LOCK_FILE = join(MOBILE_AUDIO_DIR, '.generating.lock');

function acquireLock() {
  mkdirSync(MOBILE_AUDIO_DIR, { recursive: true });
  try {
    writeFileSync(LOCK_FILE, String(process.pid), { flag: 'wx' });
  } catch {
    console.error(
      `이미 다른 생성기가 돌고 있다 (${LOCK_FILE}). 그게 끝난 뒤 다시 돌린다 — 아무것도 안 돌고 있으면 이 파일을 지운다.`,
    );
    process.exit(1);
  }
  const release = () => rmSync(LOCK_FILE, { force: true });
  process.on('exit', release);
  process.on('SIGINT', () => process.exit(130));
}

/**
 * 표와 파일을 맞춘다: 본문이 바뀌어 낡은 항목·시드에서 빠진 항목은 표에서 빼고
 * (앱은 그 이야기를 TTS 로 읽는다), 표가 가리키지 않는 mp3 는 지운다.
 * 크레딧이 떨어져 일부만 만들어졌을 때도 커밋할 수 있는 상태로 만든다.
 */
function prune(map: GeneratedStoryAudioMap): GeneratedStoryAudioMap {
  const kept: GeneratedStoryAudioMap = {};
  for (const { seed } of ALL_STORIES) {
    const entry = map[seed.code];
    if (!entry) continue;
    const fileThere = existsSync(join(MOBILE_AUDIO_DIR, `${entry.key}.mp3`));
    if (isGeneratedAudioFresh(seed, entry) && fileThere) {
      kept[seed.code] = entry;
    } else {
      console.log(`− ${seed.code} 표에서 뺌 (본문이 바뀌었거나 파일이 없다)`);
    }
  }
  const keys = new Set(Object.values(kept).map((entry) => `${entry.key}.mp3`));
  for (const file of readdirSync(MOBILE_AUDIO_DIR)) {
    if (file.endsWith('.mp3') && !keys.has(file)) {
      rmSync(join(MOBILE_AUDIO_DIR, file));
      console.log(`− ${file} 지움 (표에 없다)`);
    }
  }
  return kept;
}

async function main() {
  acquireLock();
  if (process.argv.includes('--prune')) {
    const kept = prune({ ...STORY_AUDIO });
    writeApiTimings(kept);
    writeMobileRegistry(kept);
    console.log(`정리 끝 — 오디오 있음 ${Object.keys(kept).length}편.`);
    return;
  }
  const apiKey = env('ELEVENLABS_API_KEY');
  if (!apiKey) {
    console.error(
      'ELEVENLABS_API_KEY 가 없다 — 환경 변수로 주거나 apps/api/.env 에 넣어라.',
    );
    process.exit(1);
  }
  const force = process.argv.includes('--force');
  const only = arg('only') ? arg('only').split(',') : null;
  const map: GeneratedStoryAudioMap = { ...STORY_AUDIO };

  let made = 0;
  let failed = 0;
  for (const { course, seed } of ALL_STORIES) {
    if (only && !only.includes(seed.code)) continue;
    const current = map[seed.code];
    const fileThere =
      !!current && existsSync(join(MOBILE_AUDIO_DIR, `${current.key}.mp3`));
    if (!force && isGeneratedAudioFresh(seed, current) && fileThere) {
      console.log(`· ${seed.code} 있음 (다시 만들려면 --force)`);
      continue;
    }
    process.stdout.write(
      `🎙 ${seed.code} (${STORY_NARRATORS[seed.narrator.id]?.label}) `,
    );
    try {
      map[seed.code] = await generateStory(apiKey, course, seed);
      made += 1;
      console.log(` ✓ ${(map[seed.code].durationMs / 1000).toFixed(1)}s`);
      // 한 편 끝날 때마다 쓴다 — 중간에 끊겨도 만든 것은 남는다
      writeApiTimings(map);
      writeMobileRegistry(map);
    } catch (error) {
      failed += 1;
      console.log(` ✗ ${(error as Error).message}`);
    }
  }

  const kept = prune(map);
  writeApiTimings(kept);
  writeMobileRegistry(kept);
  console.log(
    `\n만듦 ${made} · 실패 ${failed}. 다음: seed:validate-stories → seed:stories, 앱은 OTA.`,
  );
  if (failed > 0) process.exit(1);
}

void main();
