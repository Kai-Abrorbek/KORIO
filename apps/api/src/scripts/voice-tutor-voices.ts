/**
 * Voice Tutor 목소리 고르기.
 *
 * ElevenLabs Voice Library 에서 후보를 찾고 → 실제 튜터 대사(폭발·축하·놀림)로
 * 들어 보고 → 고른 걸 My Voices 에 넣는다. 들어 볼 것은 apps/api/tmp/voices/ 의
 * HTML 로 열린다 (tmp/ 는 git 에 안 들어간다).
 *
 *   pnpm --filter api tutor:voices                         지금 앱에 뜨는 목소리
 *   pnpm --filter api tutor:voices search                  웃긴 목소리 후보 (한국어 검증 먼저)
 *   pnpm --filter api tutor:voices search cartoon          검색어를 직접
 *   pnpm --filter api tutor:voices try <voiceId> [...]     튜터 대사로 샘플 (수업 언어 uz)
 *   pnpm --filter api tutor:voices try <voiceId> --teach ru
 *   pnpm --filter api tutor:voices add <ownerId> <voiceId> [이름]
 *
 * search 는 크레딧을 안 쓴다. try 는 목소리당 대사 약 300자만큼 쓴다.
 * Library 목소리는 try 전에 add 로 My Voices 에 넣어야 할 수 있다.
 * ELEVENLABS_API_KEY 는 셸 환경변수나 apps/api/.env 에서 읽는다.
 */
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { elevenLabsPerformance } from '../voice-tutor/personality/speech-performance';
import {
  voiceTutorModels,
  voiceTutorVoices,
  type ExplanationLanguage,
} from '../voice-tutor/voice-tutor.config';
import { VoiceTutorVoiceCatalogService } from '../voice-tutor/voices/voice-tutor-voice-catalog.service';

const API = 'https://api.elevenlabs.io';
const OUT = join(process.cwd(), 'tmp', 'voices');
const DEFAULT_SEARCHES = [
  'funny',
  'comedic',
  'cartoon',
  'goofy',
  'energetic',
  'playful',
];
/** 웃긴 목소리로 자동 표시되는 말 — voice-tutor.config 의 FUN_VOICE 와 같은 뜻 */
const FUN_WORDS =
  /funny|comic|comedy|goofy|quirky|playful|silly|cartoon|cheeky|zany|wacky|hyper/i;

/**
 * 독설 튜터가 실제로 하는 말 — 리액션이 이 목소리에 어울리는지 듣는 게 목적이다.
 * 한국어를 배우는 수업, 수업 언어별. 실제 점검(tutor:eval)에서 나온 대사를 다듬었다.
 */
const TRY_LINES: Record<ExplanationLanguage, string[]> = {
  uz: [
    '[excited] Salom! Bugun koreyscha gaplashamiz. 한국어 좀 해?',
    '[gasps] 아아악!!! OISHII?! Bu yaponcha-ku, ey sushi josusi! Koreyscha — 맛있어요! Qani, ayt!',
    '[laughs] 그래애애! 맛있어요, zo‘r! Endi aytchi, achchiq ovqatni yoqtirasanmi?',
    '[sighs] 나 없이 공부하라고? [shouts] Hoziroq qaytib kel, dangasa!',
  ],
  ru: [
    '[excited] Привет! Сегодня болтаем по-корейски. 한국어 좀 해?',
    '[gasps] 아아악!!! OISHII?! Это же японский, шпион суши! По-корейски — 맛있어요! Ну, скажи!',
    '[laughs] 그래애애! 맛있어요, отлично! А острую еду любишь?',
    '[sighs] 나 없이 공부하라고? [shouts] А ну вернись, лентяй!',
  ],
  en: [
    "[excited] Hey! Let's talk in Korean today. 한국어 좀 해?",
    "[gasps] 아아악!!! OISHII?! That's Japanese, you sushi spy! In Korean it's 맛있어요! Say it!",
    '[laughs] 그래애애! 맛있어요, perfect! Now — do you like spicy food?',
    '[sighs] 나 없이 공부하라고? [shouts] Get back here, you lazy bum!',
  ],
  ko: [
    '[excited] 안녕! 오늘 한국어로 수다 떨어 보자. 한국어 좀 해?',
    '[gasps] 아아악!!! 오이시?! 그거 일본어잖아, 이 초밥 스파이야! 한국어로는 맛있어요! 다시 말해 봐!',
    '[laughs] 그래애애! 맛있어요, 완벽해! 그럼 매운 음식 좋아해?',
    '[sighs] 나 없이 공부하라고? [shouts] 당장 일로 안 와, 이 잠꾸러기야!',
  ],
};

interface LibraryVoice {
  ownerId: string;
  voiceId: string;
  name: string;
  gender?: string;
  age?: string;
  traits: string[];
  languages: string[];
  korean: boolean;
  previewUrl?: string;
  usage: number;
}

function loadEnv() {
  try {
    process.loadEnvFile('.env');
  } catch {
    // 셸에서 넘긴 환경변수만 쓴다
  }
}

function apiKey(): string {
  const key = process.env.ELEVENLABS_API_KEY?.trim();
  if (!key)
    throw new Error('ELEVENLABS_API_KEY 가 없다 (셸 또는 apps/api/.env)');
  return key;
}

/** 실패하면 상태와 응답 앞부분만 — 키는 요청 헤더에만 있고 찍지 않는다 */
async function call(path: string, init: RequestInit = {}): Promise<Response> {
  const response = await fetch(new URL(path, API), {
    ...init,
    headers: {
      'xi-api-key': apiKey(),
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    const permission = /missing the permission (\w+)/.exec(body)?.[1];
    if (permission) throw new MissingPermission(permission);
    throw new Error(
      `ElevenLabs ${path.split('?')[0]} → HTTP ${response.status} ${body.slice(0, 200)}`,
    );
  }
  return response;
}

/**
 * 제한 키(TTS 만 켠 키)로 돌리면 모든 요청이 같은 이유로 막힌다 — 한 번만,
 * 어디서 켜는지와 함께 알린다.
 */
class MissingPermission extends Error {
  constructor(readonly permission: string) {
    const label: Record<string, string> = {
      voices_read: 'Voices → Read',
      voices_write: 'Voices → Write',
      text_to_speech: 'Text to Speech',
    };
    super(
      `ElevenLabs 키에 ${permission} 권한이 없다.\n` +
        `  ElevenLabs → Developers → API Keys 에서 이 키(또는 새 키)의 권한에 "${label[permission] ?? permission}" 을 켤 것.\n` +
        '  search·list 는 Voices Read, add 는 Voices Write, try 는 Text to Speech 가 필요하다.\n' +
        '  서버(api.env)의 키도 Voices Read 가 있어야 목소리 이름·웃긴 목소리 표시를 가져온다.',
    );
  }
}

const text = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;

const html = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ] ?? char,
  );

function page(title: string, body: string): string {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${html(title)}</title>
<style>body{font:15px/1.5 system-ui,sans-serif;margin:24px;max-width:960px;background:#fafafa;color:#222}
.card{background:#fff;border:1px solid #ddd;border-radius:12px;padding:14px 16px;margin:12px 0}
.card h2{margin:0 0 4px;font-size:17px}.meta{color:#666;font-size:13px}.ko{color:#0a7d33;font-weight:700}
.fun{color:#c2410c;font-weight:700}code{background:#f1f1f1;padding:2px 6px;border-radius:6px;font-size:12px;user-select:all}
audio{width:100%;margin-top:8px}</style></head><body><h1>${html(title)}</h1>${body}</body></html>`;
}

function parseLibraryVoice(item: unknown): LibraryVoice | null {
  if (!item || typeof item !== 'object') return null;
  const voice = item as Record<string, unknown>;
  const voiceId = text(voice.voice_id);
  const ownerId = text(voice.public_owner_id);
  const name = text(voice.name);
  if (!voiceId || !ownerId || !name) return null;
  const verified = Array.isArray(voice.verified_languages)
    ? (voice.verified_languages as Record<string, unknown>[])
    : [];
  const koreanEntry = verified.find((entry) => entry.language === 'ko');
  const languages = [
    ...new Set(
      [
        text(voice.language),
        ...verified.map((entry) => text(entry.language)),
      ].filter((value): value is string => Boolean(value)),
    ),
  ];
  return {
    ownerId,
    voiceId,
    name,
    gender: text(voice.gender),
    age: text(voice.age),
    traits: [text(voice.descriptive), text(voice.use_case), text(voice.accent)]
      .filter((value): value is string => Boolean(value))
      .map((value) => value.replace(/_/g, ' ')),
    languages,
    korean: languages.includes('ko'),
    // 한국어로 검증된 목소리는 한국어 샘플이 따로 있다
    previewUrl: text(koreanEntry?.preview_url) ?? text(voice.preview_url),
    usage:
      typeof voice.usage_character_count_1y === 'number'
        ? voice.usage_character_count_1y
        : 0,
  };
}

async function list() {
  await new VoiceTutorVoiceCatalogService().refresh();
  const voices = voiceTutorVoices();
  if (!voices.length) {
    console.log(
      '앱에 뜨는 목소리가 없다. VOICE_TUTOR_VOICES_JSON 이나 ELEVENLABS_DEFAULT_VOICE_ID, VOICE_TUTOR_VOICES_FROM_ELEVENLABS=true 를 확인할 것.',
    );
    return;
  }
  console.log(
    `\n지금 앱에 뜨는 목소리 ${voices.length}개 (TTS 모델 ${voiceTutorModels().tts})\n`,
  );
  for (const voice of voices)
    console.log(
      `  ${voice.fun ? '[웃긴 목소리] ' : ''}${voice.name} · ${voice.gender ?? '-'} · ${(voice.tags ?? []).join(', ') || '-'}\n    id ${voice.id}  providerVoiceId ${voice.providerVoiceId}`,
    );
  console.log('');
}

async function search(queries: string[]) {
  const found = new Map<string, LibraryVoice>();
  for (const query of queries)
    for (const korean of [true, false]) {
      const params = new URLSearchParams({ page_size: '30', search: query });
      if (korean) params.set('language', 'ko');
      try {
        const body = (await (
          await call(`/v1/shared-voices?${params}`)
        ).json()) as {
          voices?: unknown[];
        };
        for (const voice of (body.voices ?? []).flatMap(
          (item) => parseLibraryVoice(item) ?? [],
        ))
          // 한국어 검색이 먼저다 — 같은 목소리가 다시 나와도 한국어 샘플을 지킨다
          if (!found.has(voice.voiceId)) found.set(voice.voiceId, voice);
      } catch (error) {
        if (error instanceof MissingPermission) throw error;
        console.warn(
          `  "${query}"${korean ? ' (한국어)' : ''} 검색 실패: ${(error as Error).message}`,
        );
      }
    }
  const ranked = [...found.values()]
    .sort((a, b) => Number(b.korean) - Number(a.korean) || b.usage - a.usage)
    .slice(0, 30);
  if (!ranked.length) {
    console.log(
      '후보를 못 찾았다. 다른 검색어로: pnpm --filter api tutor:voices search <검색어>',
    );
    return;
  }
  const cards = ranked
    .map(
      (
        voice,
      ) => `<div class="card"><h2>${html(voice.name)} ${voice.korean ? '<span class="ko">한국어 검증</span>' : ''} ${FUN_WORDS.test([voice.name, ...voice.traits].join(' ')) ? '<span class="fun">웃긴 목소리로 표시됨</span>' : ''}</h2>
<div class="meta">${html([voice.gender, voice.age, ...voice.traits].filter(Boolean).join(' · '))} · 언어 ${html(voice.languages.join(', ') || '-')} · 1년 사용 ${voice.usage.toLocaleString()}자</div>
${voice.previewUrl ? `<audio controls preload="none" src="${html(voice.previewUrl)}"></audio>` : ''}
<p class="meta">My Voices 에 넣기: <code>pnpm --filter api tutor:voices add ${html(voice.ownerId)} ${html(voice.voiceId)}</code><br>
튜터 대사로 듣기: <code>pnpm --filter api tutor:voices try ${html(voice.voiceId)}</code></p></div>`,
    )
    .join('\n');
  mkdirSync(OUT, { recursive: true });
  const file = join(OUT, 'search.html');
  writeFileSync(
    file,
    page(
      `웃긴 목소리 후보 ${ranked.length}개 — 검색어: ${queries.join(', ')}`,
      '<p class="meta">샘플은 ElevenLabs 것이다 (한국어 검증 목소리는 한국어 샘플). 튜터 대사로 들어 보려면 try 를 쓸 것.</p>' +
        cards,
    ),
  );
  for (const voice of ranked.slice(0, 12))
    console.log(
      `  ${voice.korean ? '[ko] ' : '     '}${voice.name} · ${[voice.gender, voice.age, ...voice.traits].filter(Boolean).join(' · ')}\n       add ${voice.ownerId} ${voice.voiceId}`,
    );
  console.log(
    `\n${ranked.length}개 후보, 브라우저로 열어서 들어 볼 것: ${file}\n`,
  );
}

async function tryVoices(voiceIds: string[], teach: ExplanationLanguage) {
  if (!voiceIds.length)
    throw new Error('목소리 ID 를 적을 것: tutor:voices try <voiceId>');
  const model = voiceTutorModels().tts;
  const script = TRY_LINES[teach].join(' ... ');
  mkdirSync(OUT, { recursive: true });
  for (const voiceId of voiceIds) {
    if (!/^[\w-]{8,100}$/.test(voiceId)) {
      console.warn(`  ${voiceId}: 목소리 ID 모양이 아니다`);
      continue;
    }
    try {
      const response = await call(
        `/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...elevenLabsPerformance(script, model),
            model_id: model,
          }),
        },
      );
      const file = join(OUT, `try-${voiceId}-${teach}.mp3`);
      writeFileSync(file, Buffer.from(await response.arrayBuffer()));
      console.log(`  ${voiceId}: ${file}`);
    } catch (error) {
      console.warn(
        `  ${voiceId}: ${(error as Error).message}\n    Library 목소리면 먼저 add 로 My Voices 에 넣을 것.`,
      );
    }
  }
  const clips = readdirSync(OUT)
    .filter((name) => /^try-.+\.mp3$/.test(name))
    .sort();
  const file = join(OUT, 'try.html');
  writeFileSync(
    file,
    page(
      '튜터 대사로 들어 보기',
      `<p class="meta">대사: ${html(script)}<br>TTS 모델 ${html(model)}. [gasps]·[laughs]·[shouts] 가 소리로 나는지, 한국어 발음이 자연스러운지 들어 볼 것.</p>` +
        clips
          .map(
            (clip) =>
              `<div class="card"><h2>${html(clip.replace(/^try-|\.mp3$/g, ''))}</h2><audio controls preload="none" src="${html(clip)}"></audio>
<p class="meta">앱에 넣기 (VOICE_TUTOR_VOICES_JSON 항목): <code>{"providerVoiceId":"${html(clip.replace(/^try-|-(uz|ru|en|ko)\.mp3$/g, ''))}","fun":true}</code></p></div>`,
          )
          .join('\n'),
    ),
  );
  console.log(`\n브라우저로 열어서 비교할 것: ${file}\n`);
}

async function add(ownerId?: string, voiceId?: string, name?: string) {
  if (!ownerId || !voiceId)
    throw new Error(
      'tutor:voices add <ownerId> <voiceId> [이름] — search 결과에 있다',
    );
  const response = await call(
    `/v1/voices/add/${encodeURIComponent(ownerId)}/${encodeURIComponent(voiceId)}`,
    {
      method: 'POST',
      body: JSON.stringify({
        new_name: name ?? `KORIO ${voiceId.slice(0, 6)}`,
      }),
    },
  );
  const body = (await response.json()) as { voice_id?: unknown };
  const added = text(body.voice_id) ?? voiceId;
  console.log(`\nMy Voices 에 넣었다: ${added}`);
  console.log('앱에 띄우려면 둘 중 하나:');
  console.log('  VOICE_TUTOR_VOICES_FROM_ELEVENLABS=true  (My Voices 전부)');
  console.log(
    `  VOICE_TUTOR_VOICES_JSON 에 {"providerVoiceId":"${added}","fun":true} 추가\n`,
  );
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  const [command = 'list', ...rest] = args;
  const teachAt = rest.indexOf('--teach');
  const teachArg = teachAt >= 0 ? rest[teachAt + 1] : 'uz';
  const teach: ExplanationLanguage = ['uz', 'ru', 'en', 'ko'].includes(teachArg)
    ? (teachArg as ExplanationLanguage)
    : 'uz';
  const plain = rest.filter(
    (_, index) => teachAt < 0 || (index !== teachAt && index !== teachAt + 1),
  );
  if (command === 'list') return list();
  if (command === 'search')
    return search(plain.length ? [plain.join(' ')] : DEFAULT_SEARCHES);
  if (command === 'try') return tryVoices(plain, teach);
  if (command === 'add')
    return add(plain[0], plain[1], plain.slice(2).join(' ') || undefined);
  throw new Error(`모르는 명령: ${command} (list | search | try | add)`);
}

main().catch((error: Error) => {
  console.error(`실패: ${error.message}`);
  process.exit(1);
});
