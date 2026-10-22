#!/usr/bin/env node
/**
 * 레벨업 연출(한글 로켓) 소리를 ElevenLabs 로 만든다.
 *
 *   목소리 (한국어) : 셋! · 둘! · 하나! · 출발! · 도착! 축하해요!
 *   목소리 (영어)   : Three! · Two! · One! · Liftoff! · We made it! (*-en.mp3, 영어 코스)
 *   효과음          : 엔진 굉음(rumble) · 발사 휙(launch)
 *
 * 만든 mp3 는 두 앱에 똑같이 들어간다 —
 *   apps/mobile/assets/sounds/levelup/*.mp3
 *   apps/telegram-app/public/sounds/levelup/*.mp3
 * (처음엔 목소리 자리에 무음, 효과음 자리에 임시 합성음이 들어 있다)
 *
 * 쓰는 법 (레포 루트에서, Git Bash):
 *   node tools/levelup-audio/generate.mjs              # 목소리 + 효과음 전부
 *   node tools/levelup-audio/generate.mjs --voice-only # 목소리만 (효과음은 임시 합성음 유지)
 *   node tools/levelup-audio/generate.mjs --lang=en    # 영어 목소리만
 *
 * 키·목소리는 환경 변수 → 없으면 apps/api/.env · apps/tutor-agent/.env 에서 읽는다 (화면에 안 찍는다).
 *   ELEVENLABS_API_KEY            필수
 *   LEVELUP_VOICE_ID              없으면 ELEVENLABS_DEFAULT_VOICE_ID → VOICE_TUTOR_VOICES_JSON 첫 목소리
 *   LEVELUP_TTS_MODEL             기본 eleven_v3 (감정 태그 [excited] 를 알아듣는다)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT_DIRS = [
  join(ROOT, "apps/mobile/assets/sounds/levelup"),
  join(ROOT, "apps/telegram-app/public/sounds/levelup"),
];

/** 목소리 — eleven_v3 는 [excited] 같은 태그로 말투를 정한다 */
const VOICE_LINES = [
  { file: "vo-3.mp3", text: "[excited] 셋!" },
  { file: "vo-2.mp3", text: "[excited] 둘!" },
  { file: "vo-1.mp3", text: "[excited] 하나!" },
  { file: "vo-go.mp3", text: "[shouting] [excited] 출발!" },
  { file: "vo-arrive.mp3", text: "[cheerfully] 도착! 축하해요!" },
  // 영어 코스 — 같은 목소리가 영어로 센다
  { file: "vo-3-en.mp3", text: "[excited] Three!", lang: "en" },
  { file: "vo-2-en.mp3", text: "[excited] Two!", lang: "en" },
  { file: "vo-1-en.mp3", text: "[excited] One!", lang: "en" },
  { file: "vo-go-en.mp3", text: "[shouting] [excited] Liftoff!", lang: "en" },
  { file: "vo-arrive-en.mp3", text: "[cheerfully] We made it! Congratulations!", lang: "en" },
];

/** 효과음 — 길이는 연출 시간표(level-up-cinematic CINEMA_SOUND_CUES)에 맞춘다 */
const SFX = [
  {
    file: "rumble.mp3",
    text: "Cartoon rocket engine igniting: a low rumble builds for one second, then roars loudly for two seconds and fades out. No music, no voice.",
    duration: 3.6,
  },
  {
    file: "launch.mp3",
    text: "Cartoon rocket launch whoosh, a bright rising swoosh with a soft boom at the start. No music, no voice.",
    duration: 1.7,
  },
];

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    let value = match[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[match[1]] = value;
  }
  return out;
}

const fileEnv = {
  ...readEnvFile(join(ROOT, "apps/tutor-agent/.env")),
  ...readEnvFile(join(ROOT, "apps/api/.env")),
};
const env = (name) => process.env[name]?.trim() || fileEnv[name]?.trim() || "";

const apiKey = env("ELEVENLABS_API_KEY");
if (!apiKey) {
  console.error("ELEVENLABS_API_KEY 가 없다 — 환경 변수로 주거나 apps/api/.env 에 넣어라.");
  process.exit(1);
}

function pickVoice() {
  const direct = env("LEVELUP_VOICE_ID") || env("ELEVENLABS_DEFAULT_VOICE_ID");
  if (direct) return direct;
  try {
    const voices = JSON.parse(env("VOICE_TUTOR_VOICES_JSON") || "[]");
    const first = Array.isArray(voices) ? voices.find((v) => v && v.enabled !== false && v.providerVoiceId) : null;
    if (first) return first.providerVoiceId;
  } catch {
    // 아래에서 안내
  }
  return "";
}

const voiceId = pickVoice();
if (!voiceId) {
  console.error("목소리 ID 가 없다 — LEVELUP_VOICE_ID 를 주어라 (ElevenLabs 목소리 ID).");
  process.exit(1);
}
const model = env("LEVELUP_TTS_MODEL") || "eleven_v3";

async function post(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`${response.status} ${detail.slice(0, 300)}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

function save(file, data) {
  for (const dir of OUT_DIRS) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, file), data);
  }
  console.log(`✓ ${file}  (${Math.round(data.length / 1024)} KB)`);
}

const voiceOnly = process.argv.includes("--voice-only");
// --lang=en → 그 언어 목소리만 (효과음은 건드리지 않는다)
const langOnly = process.argv.find((a) => a.startsWith("--lang="))?.split("=")[1] ?? "";

for (const line of VOICE_LINES) {
  if (langOnly && (line.lang ?? "ko") !== langOnly) continue;
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;
  const body = {
    text: line.text,
    model_id: model,
    voice_settings: { stability: 0.4, similarity_boost: 0.8, style: 0.6, use_speaker_boost: true },
  };
  let audio;
  try {
    // 그 언어로 읽게 못 박는다 — 모델이 language_code 를 모르면 빼고 다시
    audio = await post(url, { ...body, language_code: line.lang ?? "ko" });
  } catch (error) {
    if (!/language/i.test(String(error))) throw error;
    audio = await post(url, body);
  }
  save(line.file, audio);
}

if (!voiceOnly && !langOnly) {
  for (const sfx of SFX) {
    const audio = await post("https://api.elevenlabs.io/v1/sound-generation", {
      text: sfx.text,
      duration_seconds: sfx.duration,
      prompt_influence: 0.5,
    });
    save(sfx.file, audio);
  }
}

console.log("\n끝. 두 앱 폴더에 들어갔다 — 커밋하고 텔레그램은 배포, 모바일은 OTA.");
