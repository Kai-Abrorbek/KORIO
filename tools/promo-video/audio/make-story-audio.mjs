#!/usr/bin/env node
/**
 * 스토리 영상(KorioStoryUz) 소리 — public/audio/story-*.mp3, public/sfx/story-*.mp3
 *   배경음악은 장면마다 다른 결 (시계 → 긴장 → 쌓임 → 풀림), 효과음은 글리치·해독·부서짐 같은 것.
 *   이 키에는 음악 생성 권한이 없어서 효과음 생성(최대 22초)으로 만든다.
 *
 *   node audio/make-story-audio.mjs            # 없는 것만
 *   node audio/make-story-audio.mjs --force    # 다시
 *
 * 키는 apps/api/.env 에서 읽는다 (화면에 찍지 않는다).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = join(import.meta.dirname, "..");
const REPO = join(ROOT, "..", "..");
const env = Object.fromEntries(
  readFileSync(join(REPO, "apps/api/.env"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]),
);
const key = env.ELEVENLABS_API_KEY;
const force = process.argv.includes("--force");

const SOUNDS = [
  // ── 배경음악 (장면마다 잘라 쓴다)
  {
    file: "audio/story-tick.mp3",
    seconds: 12,
    text: "Close-up mechanical wall clock ticking, steady two ticks per second, dry and intimate, faint low drone underneath, tense and minimal, no music",
  },
  {
    file: "audio/story-pulse.mp3",
    seconds: 22,
    text: "Dark minimal electronic tension underscore, deep sub bass pulse on every beat, ticking hi-hats, cinematic trailer suspense, 110 BPM, no vocals, steady",
  },
  {
    file: "audio/story-build.mp3",
    seconds: 22,
    text: "Driving cinematic electronic build, rising pulsing synth arpeggio, energetic tight drums, inspiring modern tech commercial, 110 BPM, no vocals, gets bigger",
  },
  {
    file: "audio/story-lift.mp3",
    seconds: 22,
    text: "Uplifting emotional cinematic electronic music, warm piano chords, airy wide synth pads, gentle driving beat, hopeful and triumphant, 110 BPM, no vocals, satisfying ending",
  },
  {
    file: "audio/story-finale.mp3",
    seconds: 22,
    text: "Triumphant uplifting cinematic electronic finale, big warm synth chords, confident driving beat, bright and hopeful, 110 BPM, no vocals, ends with a final satisfying hit",
  },
  // ── 효과음
  { file: "sfx/story-glitch.mp3", seconds: 1.2, text: "short harsh digital glitch burst, video signal corruption stutter, electronic" },
  { file: "sfx/story-riser.mp3", seconds: 2.5, text: "fast cinematic whoosh riser building up quickly, airy and tense" },
  { file: "sfx/story-impact.mp3", seconds: 2, text: "deep cinematic boom impact hit with a short tail, punchy sub bass" },
  { file: "sfx/story-scramble.mp3", seconds: 1.2, text: "fast digital text decoding beeps, sci-fi data scramble resolving into a clean chime" },
  { file: "sfx/story-swipe.mp3", seconds: 0.6, text: "single quick soft swipe whoosh, phone screen scroll" },
  { file: "sfx/story-crumble.mp3", seconds: 2, text: "digital disintegration, glittering particles dissolving and blowing away, shimmering" },
  { file: "sfx/story-pop.mp3", seconds: 0.5, text: "soft bubbly UI pop, friendly chat message bubble appearing" },
  { file: "sfx/story-tick-big.mp3", seconds: 0.8, text: "single loud clock tick, crisp mechanical click with a tiny echo" },
];

/**
 * 내레이션 — 화면 자막을 읽는다. eleven_v4(정식) + language_code uz + Alice.
 * 받아쓰기로 견줘 보니 이 조합이 가장 우즈벡어로 들렸다 (turbo·다른 목소리는 튀르키예어로 판별되곤 했다).
 *   - o‘ g‘ 는 공식 글자 ʻ(U+02BB), 끊는 소리는 ʼ(U+02BC) 로 넣는다 — ‘ 는 따옴표로 읽혀 o 가 뭉개진다
 *   - 숫자는 글자로 (yetti yuz oʻttiz), KORIO 는 "Korio", reels 는 들리는 대로 "rils"
 *   - 훅의 "N soniya" 는 영상 전체 길이로 — node audio/make-story-audio.mjs --hook=NN
 * 서울 장면의 한국어: 하라 = Jessica, B(배우는 나) = Liam — 둘 다 받아쓰기에서 한국어 100%.
 */
const ALICE = "Xb7hH8MSUJpSbSDYk0k2";
const JESSICA = "cgSgspJ2msm6clMCkdW9";
const LIAM = "TX3LPaxmHKxFdv7VOQHJ";
const hookArg = process.argv.find((a) => a.startsWith("--hook="));
const HOOK_WORDS = {
  55: "ellik besh", 56: "ellik olti", 57: "ellik yetti", 58: "ellik sakkiz", 59: "ellik toʻqqiz",
  60: "oltmish", 61: "oltmish bir", 62: "oltmish ikki", 63: "oltmish uch", 64: "oltmish toʻrt",
  65: "oltmish besh", 66: "oltmish olti", 67: "oltmish yetti", 68: "oltmish sakkiz", 69: "oltmish toʻqqiz",
  70: "yetmish", 71: "yetmish bir", 72: "yetmish ikki", 73: "yetmish uch", 74: "yetmish toʻrt", 75: "yetmish besh",
  76: "yetmish olti", 77: "yetmish yetti", 78: "yetmish sakkiz", 79: "yetmish toʻqqiz", 80: "sakson",
  81: "sakson bir", 82: "sakson ikki", 83: "sakson uch", 84: "sakson toʻrt", 85: "sakson besh", 86: "sakson olti",
  87: "sakson yetti", 88: "sakson sakkiz", 89: "sakson toʻqqiz", 90: "toʻqson",
};
const NARRATION = {
  ...(hookArg ? { hook: `Bu video ${HOOK_WORDS[Number(hookArg.split("=")[1])]} soniya davom etadi. Keling, sanab koʻramiz.` } : {}),
  "feed-a": "Kuniga ikki soat rils koʻrsangiz…",
  "feed-b": "bir oyda — oltmish soat.",
  "feed-c": "Bir yilda — yetti yuz oʻttiz soat!",
  "feed-q": "Shulardan nechtasi esingizda qolgan?",
  "split-a": "Endi tasavvur qiling.",
  "split-b": "Bir xil odam. Bir xil telefon.",
  "split-c": "Biri — faqat rils. Ikkinchisi — kuniga oʻn daqiqa Korioda.",
  "day-1": "Birinchi kun. Hangulni oʻqiy boshladingiz.",
  "day-7": "Yettinchi kun. Koʻchadagi yozuvlarni tushunasiz.",
  "day-30": "Oʻttizinchi kun. Savollarga javob bera olasiz.",
  "day-90": "Toʻqsoninchi kun. Sunʼiy intellekt ustoz bilan erkin suhbatlashasiz.",
  "meet-a": "Bir kuni, Seulda…",
  "meet-hara": { text: "안녕하세요! 한국어 할 줄 알아요?", voice: JESSICA, lang: "ko", speed: 1 },
  "meet-b": { text: "네! 조금 할 줄 알아요!", voice: LIAM, lang: "ko", speed: 1 },
  "meet-c": "Vaqt bir xil edi.",
  "meet-d": "Farqi — kuniga atigi oʻn daqiqa.",
  "gains-a": "Korioda sizni nima kutadi?",
  "gains-1": "Koreys alifbosi — noldan.",
  "gains-2": "Qisqa kunlik darslar.",
  "gains-3": "Sunʼiy intellekt ustoz bilan jonli suhbat.",
  "gains-4": "TOPIK va ingliz tili.",
  "end-a": "Bu video tugayapti.",
  "end-b": "Keyingi ellik soniyangiz — Korioda oʻtsin.",
  "end-c": "Yuklab olish — bepul.",
};
for (const [name, line] of Object.entries(NARRATION)) {
  const out = join(ROOT, "public", "audio", `story-v-${name}.mp3`);
  if (!force && existsSync(out) && name !== "hook") continue;
  const { text, voice = ALICE, lang = "uz", speed = 1.04 } = typeof line === "string" ? { text: line } : line;
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: "eleven_v4",
      language_code: lang,
      voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true, speed },
    }),
  });
  if (!response.ok) {
    console.error(`✗ story-v-${name}: ${response.status} ${(await response.text()).slice(0, 200)}`);
    continue;
  }
  const audio = Buffer.from(await response.arrayBuffer());
  writeFileSync(out, audio);
  console.log(`✓ story-v-${name}.mp3 (${Math.round(audio.length / 1024)} KB)`);
}

// 내레이션 길이(프레임) — 구성표가 장면 길이를 맞춘다
const lengths = {};
for (const name of Object.keys(NARRATION).concat(hookArg ? [] : ["hook"])) {
  const file = join(ROOT, "public", "audio", `story-v-${name}.mp3`);
  if (!existsSync(file)) continue;
  const probe = spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" });
  lengths[name] = Math.ceil(Number(probe.stdout.trim()) * 30);
}
writeFileSync(join(ROOT, "src", "story", "voice.generated.json"), JSON.stringify(lengths, null, 1) + "\n");
console.log("✓ src/story/voice.generated.json");

for (const sound of SOUNDS) {
  const out = join(ROOT, "public", sound.file);
  if (!force && existsSync(out)) continue;
  mkdirSync(join(out, ".."), { recursive: true });
  const response = await fetch("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text: sound.text, duration_seconds: sound.seconds, prompt_influence: 0.6 }),
  });
  if (!response.ok) {
    console.error(`✗ ${sound.file}: ${response.status} ${(await response.text()).slice(0, 200)}`);
    continue;
  }
  const audio = Buffer.from(await response.arrayBuffer());
  writeFileSync(out, audio);
  console.log(`✓ ${sound.file} (${Math.round(audio.length / 1024)} KB)`);
}
