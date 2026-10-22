#!/usr/bin/env node
/**
 * 영상 소리를 ElevenLabs 로 만든다 — public/audio/*.mp3
 *   튜터 대사 2줄 (실제 AI 튜터와 같은 목소리) · 60초 배경음악
 *
 *   node audio/make-audio.mjs            # 없는 것만
 *   node audio/make-audio.mjs --force    # 다시
 *
 * 키·목소리는 apps/api/.env 에서 읽는다 (화면에 찍지 않는다).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const REPO = join(ROOT, "..", "..");
const OUT = join(ROOT, "public", "audio");
mkdirSync(OUT, { recursive: true });

const env = Object.fromEntries(
  readFileSync(join(REPO, "apps/api/.env"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]),
);
const key = env.ELEVENLABS_API_KEY;
// 연출 목소리(tools/cinema-audio)와 같은 순서 — 앱의 선생님 목소리
const voices = JSON.parse(env.VOICE_TUTOR_VOICES_JSON || "[]");
const voiceId =
  env.CINEMA_VOICE_ID ||
  env.LEVELUP_VOICE_ID ||
  env.ELEVENLABS_DEFAULT_VOICE_ID ||
  voices.find((v) => v?.enabled !== false && v.providerVoiceId)?.providerVoiceId;
const force = process.argv.includes("--force");

async function post(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`${response.status} ${(await response.text()).slice(0, 300)}`);
  return Buffer.from(await response.arrayBuffer());
}

/**
 * 튜터 대사 — 촬영 각본(promo-stage TUTOR_SCRIPT)과 같은 말.
 * 첫 줄은 우즈벡어 발음이 v3 보다 또렷한 v4 turbo + language_code uz (v3 는 uz 를 안 받는다)
 */
const LINES = [
  { file: "tutor-1.mp3", model: "eleven_v4_turbo", lang: "uz", text: "[gasps] OISHII?! Bu yaponcha-ku! Koreyschada — 맛있어요!" },
  { file: "tutor-2.mp3", model: "eleven_v3", text: "[laughs] Ana! Zo‘r!" },
];

for (const line of LINES) {
  const out = join(OUT, line.file);
  if (!force && existsSync(out)) continue;
  const audio = await post(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    text: line.text,
    model_id: line.model,
    voice_settings: { stability: 0.35, similarity_boost: 0.8, style: 0.7, use_speaker_boost: true },
    ...(line.lang ? { language_code: line.lang } : {}),
  });
  writeFileSync(out, audio);
  console.log(`✓ ${line.file} (${Math.round(audio.length / 1024)} KB)`);
}

/**
 * 내레이션 — 화면 자막을 그대로 읽는다 (src/timeline 의 voice 이름과 같다).
 * 튜터와 다른 목소리: ElevenLabs 기본 목소리 "Liam". 우즈벡어는 v4 turbo + uz.
 * 소리 나는 대로 적은 곳: AI → "Ey-Ay", 20 → "yigirma", oʻ/gʻ 는 우즈벡 글자 ʻ(U+02BB).
 */
const NARRATOR = "TX3LPaxmHKxFdv7VOQHJ";
const NARRATION = {
  // 첫 문장은 또박또박 (빠르면 "Koreys" 가 "Ko'rish" 로 들린다)
  hook: { text: "Koreys tilini — oʻyin kabi oʻrganing!", speed: 1 },
  "tutor-1": "Jonli Ey-Ay ustoz! Ovozli suhbat, oʻzbekcha tushuntiradi.",
  "tutor-2": "Xato qilsangiz — hazil bilan tuzatadi!",
  lesson: "Qisqa va qiziqarli darslar — rasm, ovoz va oʻyinlar bilan.",
  speaking: "Talaffuzingizni Ey-Ay baholaydi. Gapiring — darhol ball oling!",
  stamp: "Har bir dars — kichik gʻalaba!",
  hangul: "Hangul alifbosini noldan — harfma-harf, oson.",
  topik: "TOPIK imtihoniga tayyorgarlik — haqiqiy imtihon uslubidagi savollar.",
  streak: "Har kuni oʻrganing, olovni oʻchirmang!",
  league: "Haftalik liga — yigirma kishi bilan bellashing!",
  leagueResult: "Yuqori ligaga koʻtariling!",
  jackpot: "Sovgʻalar va kutilmagan bonuslar!",
  avatar: "Oʻz qahramoningizni yarating — kiyim, soch, uy hayvoni...",
  stickers: "...va undan Telegram stikerlari! Koreyscha soʻzlar bilan, faqat sizniki.",
  rocket: "Darajangiz oʻsib boradi!",
  "telegram-1": "Telegramda ham ishlaydi — hech narsa yuklamasdan!",
  "telegram-2": "Koreys va ingliz tili — bitta ilovada.",
  cta: "Korio! Hoziroq yuklab oling — App Store, Google Play yoki Telegramda!",
};
for (const [name, line] of Object.entries(NARRATION)) {
  const { text, speed = 1.08 } = typeof line === "string" ? { text: line } : line;
  const out = join(OUT, `narr-${name}.mp3`);
  if (!force && existsSync(out)) continue;
  const audio = await post(`https://api.elevenlabs.io/v1/text-to-speech/${NARRATOR}?output_format=mp3_44100_128`, {
    text,
    model_id: "eleven_v4_turbo",
    language_code: "uz",
    voice_settings: { stability: 0.4, similarity_boost: 0.8, style: 0.6, use_speaker_boost: true, speed },
  });
  writeFileSync(out, audio);
  console.log(`✓ narr-${name}.mp3 (${Math.round(audio.length / 1024)} KB)`);
}

/**
 * 배경음악 — 이 키에는 음악 생성 권한이 없어서 효과음 생성(최대 22초)으로 루프를 만든다.
 * 편집에서 이어 붙인다 (src 의 MusicBed).
 */
const LOOPS = [
  {
    file: "music-loop-a.mp3",
    text:
      "Seamless looping upbeat arcade pop instrumental music, 120 BPM, bright plucky synth melody, marimba, " +
      "punchy kick and claps, cheerful bouncy mobile game background music, no vocals",
  },
  {
    file: "music-loop-b.mp3",
    text:
      "Seamless looping cheerful chiptune pop instrumental, 120 BPM, bouncy bass, sparkling synth arpeggios, " +
      "handclaps, happy energetic mobile game menu music, no vocals",
  },
];
for (const loop of LOOPS) {
  const out = join(OUT, loop.file);
  if (!force && existsSync(out)) continue;
  const audio = await post("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", {
    text: loop.text,
    duration_seconds: 22,
    prompt_influence: 0.6,
  });
  writeFileSync(out, audio);
  console.log(`✓ ${loop.file} (${Math.round(audio.length / 1024)} KB)`);
}

/**
 * 런치 영상(KorioLaunchUz) — 짧은 내레이션 + 게임 느낌 없는 세련된 배경음악.
 * 내레이션은 같은 목소리(Liam), 파일 이름 launch-<장면>.mp3 (src/launch/timeline 의 voice).
 */
const LAUNCH_NARRATION = {
  hook: { text: "Nimani oʻrganmoqchisiz?", speed: 1 },
  home: "Hammasi — bitta ilovada.",
  langs: "Koreys va ingliz tili.",
  "modes-ko": { text: "Har bir koʻnikma uchun — alohida mashgʻulot.", speed: 1 },
  "modes-en": "Ingliz tilida ham.",
  // "Oʻsishingizni" 는 받아쓰기마다 뭉개져서 또렷한 말로
  stats: { text: "Natijalaringizni kuzating.", speed: 1 },
  // "Ey-Ay" 는 "ey-ey" 로 들린다 — 우즈벡어 그대로
  tutor: { text: "Sunʼiy intellekt ustoz bilan jonli suhbat.", speed: 1.05 },
  speaking: "Talaffuzingiz darhol baholanadi.",
  topik: "TOPIK imtihoniga tayyorgarlik.",
  punch: { text: "Bugun boshlang.", speed: 1 },
  end: "Korio. Hoziroq yuklab oling.",
};
for (const [name, line] of Object.entries(LAUNCH_NARRATION)) {
  const out = join(OUT, `launch-${name}.mp3`);
  if (!force && existsSync(out)) continue;
  const { text, speed = 1.05 } = typeof line === "string" ? { text: line } : line;
  const audio = await post(`https://api.elevenlabs.io/v1/text-to-speech/${NARRATOR}?output_format=mp3_44100_128`, {
    text,
    model_id: "eleven_v4_turbo",
    language_code: "uz",
    voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.5, use_speaker_boost: true, speed },
  });
  writeFileSync(out, audio);
  console.log(`✓ launch-${name}.mp3 (${Math.round(audio.length / 1024)} KB)`);
}

const LAUNCH_LOOPS = [
  {
    file: "launch-music-a.mp3",
    text:
      "Modern minimal electronic product launch music, warm analog synth chords, tight punchy kick, crisp claps, " +
      "subtle plucks, confident and inspiring, 115 BPM, no vocals, polished tech commercial, seamless loop",
  },
  {
    file: "launch-music-b.mp3",
    text:
      "Uplifting modern electronic tech commercial music, bright synth piano stabs, driving four-on-the-floor beat, " +
      "airy pads, inspiring and premium, 115 BPM, no vocals, seamless loop",
  },
];
for (const loop of LAUNCH_LOOPS) {
  const out = join(OUT, loop.file);
  if (!force && existsSync(out)) continue;
  const audio = await post("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", {
    text: loop.text,
    duration_seconds: 22,
    prompt_influence: 0.6,
  });
  writeFileSync(out, audio);
  console.log(`✓ ${loop.file} (${Math.round(audio.length / 1024)} KB)`);
}
