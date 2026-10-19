#!/usr/bin/env node
/**
 * 연출(시네마) 소리를 ElevenLabs 로 만든다 — 레슨 결과 도장 · 상자 · 에너지 보너스.
 * (레벨업 로켓 소리는 tools/levelup-audio 가 따로 만든다)
 *
 * 만든 mp3 는 두 앱에 똑같이 들어간다 —
 *   apps/mobile/assets/sounds/<세트>/*.mp3
 *   apps/telegram-app/public/sounds/<세트>/*.mp3
 *
 * 쓰는 법 (레포 루트에서, Git Bash):
 *   node tools/cinema-audio/generate.mjs                  # 없는 파일만 전부
 *   node tools/cinema-audio/generate.mjs --set=chest      # 한 세트만 (쉼표로 여러 개)
 *   node tools/cinema-audio/generate.mjs --only=burst.mp3 # 파일 하나만
 *   node tools/cinema-audio/generate.mjs --force          # 있는 파일도 다시
 *
 * 키·목소리는 환경 변수 → 없으면 apps/api/.env · apps/tutor-agent/.env 에서 읽는다 (화면에 안 찍는다).
 *   ELEVENLABS_API_KEY   필수
 *   CINEMA_VOICE_ID      없으면 LEVELUP_VOICE_ID → ELEVENLABS_DEFAULT_VOICE_ID → VOICE_TUTOR_VOICES_JSON 첫 목소리
 *   CINEMA_TTS_MODEL     기본 eleven_v3 (감정 태그 [excited] 를 알아듣는다)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const outDirs = (set) => [
  join(ROOT, "apps/mobile/assets/sounds", set),
  join(ROOT, "apps/telegram-app/public/sounds", set),
];

const NO_VOICE = "No music, no voice.";

/**
 * 세트별 소리. voice 는 한국어 목소리, sfx 는 효과음 (duration = 초).
 * 길이는 각 연출 시간표(*Cinematic.ts 의 *_SOUND_CUES)에 맞춘다.
 */
const CATALOG = {
  lesson: [
    { file: "stamp-whoosh.mp3", sfx: `Quick cartoon whoosh of a big rubber stamp swinging down through the air. ${NO_VOICE}`, duration: 0.6 },
    { file: "stamp-thump.mp3", sfx: `A heavy rubber stamp slamming onto paper on a wooden desk: one deep, punchy, satisfying thump with a tiny paper slap. Cartoonish. ${NO_VOICE}`, duration: 0.8 },
    { file: "sparkle.mp3", sfx: "Magical golden sparkle shimmer, bright ascending chimes for a perfect score in a cheerful mobile game. No voice.", duration: 1.6 },
    { file: "stat-pop.mp3", sfx: `Short bubbly pop as a score card appears in a mobile game, soft and satisfying. ${NO_VOICE}`, duration: 0.5 },
    { file: "vo-perfect.mp3", voice: "[excited] 참 잘했어요!" },
    { file: "vo-great.mp3", voice: "[cheerfully] 잘했어요!" },
    { file: "vo-good.mp3", voice: "[warmly] 수고했어요!" },
  ],
  chest: [
    { file: "rattle.mp3", sfx: `A small wooden treasure chest being shaken: knocking wood and coins jingling inside, short. ${NO_VOICE}`, duration: 0.7 },
    { file: "burst.mp3", sfx: "A treasure chest bursting open in a mobile game: a big magical whoosh-boom, shimmering sparkles and a bright choir-like swell. No words.", duration: 2.2 },
    { file: "gem-ding.mp3", sfx: "One bright crystal gem clink, a short high glassy ding for collecting a gem in a mobile game. No music.", duration: 0.5 },
    { file: "vo-wow.mp3", voice: "[excited] 우와!" },
    { file: "vo-daebak.mp3", voice: "[shouting] [excited] 대박!" },
  ],
  energy: [
    { file: "thunder.mp3", sfx: `A sharp cartoon lightning strike: an electric crack followed by a short crackling zap. Playful, not scary. ${NO_VOICE}`, duration: 1.2 },
    { file: "charge.mp3", sfx: `A battery charging up in a game: a rising electronic hum that climbs in pitch for about a second and ends with a bright ping. ${NO_VOICE}`, duration: 1.4 },
    { file: "collect.mp3", sfx: `A quick magical swoosh ending in a soft satisfying pop, an item flying into the inventory in a mobile game. ${NO_VOICE}`, duration: 0.6 },
    { file: "gather.mp3", sfx: `Glowing particles swirling and being sucked into one point: a rising vacuum whoosh with sparkles, building tension. ${NO_VOICE}`, duration: 0.9 },
    { file: "core-pop.mp3", sfx: `A glowing energy orb bursting into existence: a deep punchy boom with a bright shimmering ring. Game sound effect. ${NO_VOICE}`, duration: 1.2 },
    { file: "slot-lever.mp3", sfx: `A slot machine lever pulled down: a mechanical clunk with a ratchet. ${NO_VOICE}`, duration: 0.6 },
    { file: "slot-spin.mp3", sfx: `Slot machine reels spinning fast: a rapid mechanical clicking whirr for about two seconds. ${NO_VOICE}`, duration: 2.0 },
    { file: "slot-stop.mp3", sfx: `One slot machine reel stopping: a firm mechanical clunk with a tiny bell tick. ${NO_VOICE}`, duration: 0.5 },
    { file: "jackpot.mp3", sfx: "A slot machine jackpot win in a cheerful arcade: ringing bells, cascading coins and a short triumphant fanfare. No voice.", duration: 2.5 },
    { file: "vo-jackpot.mp3", voice: "[shouting] [excited] 잭팟!" },
  ],
};

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

const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1] ?? "";
const force = process.argv.includes("--force");
const sets = arg("set") ? arg("set").split(",") : Object.keys(CATALOG);
const only = arg("only") ? arg("only").split(",") : null;

for (const set of sets) {
  if (!CATALOG[set]) {
    console.error(`모르는 세트: ${set} (있는 것: ${Object.keys(CATALOG).join(", ")})`);
    process.exit(1);
  }
}

const apiKey = env("ELEVENLABS_API_KEY");
if (!apiKey) {
  console.error("ELEVENLABS_API_KEY 가 없다 — 환경 변수로 주거나 apps/api/.env 에 넣어라.");
  process.exit(1);
}

function pickVoice() {
  const direct = env("CINEMA_VOICE_ID") || env("LEVELUP_VOICE_ID") || env("ELEVENLABS_DEFAULT_VOICE_ID");
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

const model = env("CINEMA_TTS_MODEL") || "eleven_v3";

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

async function speak(text, voiceId) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;
  const body = {
    text,
    model_id: model,
    voice_settings: { stability: 0.4, similarity_boost: 0.8, style: 0.6, use_speaker_boost: true },
  };
  try {
    // 한국어로 읽게 못 박는다 — 모델이 language_code 를 모르면 빼고 다시
    return await post(url, { ...body, language_code: "ko" });
  } catch (error) {
    if (!/language/i.test(String(error))) throw error;
    return await post(url, body);
  }
}

function sound(text, duration) {
  return post("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", {
    text,
    duration_seconds: duration,
    prompt_influence: 0.55,
  });
}

let voiceId = "";
let made = 0;
let failed = 0;
for (const set of sets) {
  for (const item of CATALOG[set]) {
    if (only && !only.includes(item.file)) continue;
    const dirs = outDirs(set);
    if (!force && dirs.every((dir) => existsSync(join(dir, item.file)))) {
      console.log(`· ${set}/${item.file} 있음 (다시 만들려면 --force)`);
      continue;
    }
    try {
      let audio;
      if (item.voice) {
        voiceId ||= pickVoice();
        if (!voiceId) throw new Error("목소리 ID 가 없다 — CINEMA_VOICE_ID 를 주어라");
        audio = await speak(item.voice, voiceId);
      } else {
        audio = await sound(item.sfx, item.duration);
      }
      for (const dir of dirs) {
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, item.file), audio);
      }
      made += 1;
      console.log(`✓ ${set}/${item.file}  (${Math.round(audio.length / 1024)} KB)`);
    } catch (error) {
      failed += 1;
      console.error(`✗ ${set}/${item.file}: ${error.message}`);
    }
  }
}

console.log(`\n만듦 ${made} · 실패 ${failed}. 두 앱 폴더에 들어갔다 — 커밋하고 텔레그램은 배포, 모바일은 OTA.`);
if (failed) process.exit(1);
