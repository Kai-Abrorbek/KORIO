#!/usr/bin/env node
/**
 * 한글 사용법 영상 소리 — public/ai/tutorial/v-*.mp3 (안내 목소리) · app-*.mp3 (앱이 읽어 주는 소리)
 *   · sfx-*.mp3 · music.mp3, src/tutorial/voice.generated.json (대사 길이)
 *   안내: ElevenLabs "Sarah" (젊은 여자, 또렷하고 밝게) — 우즈벡어 v4 turbo + uz, 쉼 줄이고 1.15배
 *   앱 소리: Azure ko-KR-SunHiNeural (앱의 기본 한국어 목소리와 같다)
 *   소리 나는 대로: KORIO → "Korio", 숫자는 글자로, oʻ/gʻ 는 ʻ(U+02BB)
 *
 *   node audio/make-hangul-guide-audio.mjs [--force]
 * 키는 apps/api/.env 에서 읽는다 (화면에 찍지 않는다).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const REPO = join(ROOT, "..", "..");
const OUT = join(ROOT, "public", "ai", "tutorial");
const env = Object.fromEntries(
  readFileSync(join(REPO, "apps/api/.env"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]),
);
const force = process.argv.includes("--force");
mkdirSync(OUT, { recursive: true });

const GUIDE = "EXAVITQu4vr4xnSDxMaL"; // Sarah

/** 이름은 src/tutorial/HangulGuide.tsx 의 장면이 그대로 쓴다 */
const LINES = {
  g01: "Koreys harflarini noldan oʻrganmoqchimisiz? Unda Koriodagi «Hangul» boʻlimi aynan siz uchun.",
  g02: "Topish oson: bosh sahifada «Yoʻnalish» tugmasini bosing, keyin «Hangul» kartasini tanlang.",
  g03: "Bu — «Hangul ustasi». Tepada qancha harf oʻrganganingiz koʻrinib turadi.",
  g04: "Ikki boʻlim bor: oʻn toʻqqizta undosh va yigirma bitta unli.",
  g05: "Harfni bosing — nomi, oʻqilishi va talaffuzi chiqadi.",
  g06: "Misol soʻzlarni ham bosib, eshitib koʻring.",
  g07: "Keyin «Oʻyin orqali mashq» — harfni oʻyinda mustahkamlaysiz.",
  g08: "Pastdagi oʻyin tugmasida beshta oʻyin bor:",
  g09: "xotira, chizish, slot, tezlik va boʻgʻin yozish.",
  g10: "Maslahat: kuniga beshta harf oʻrganing — sakkiz kunda qirqtasi ham sizniki.",
  g11: "Korioni App Store, Google Play yoki Telegramdan yuklab oling. Videoni saqlab qoʻying — kerak boʻladi!",
};

/** 앱이 읽어 주는 소리 (Tinglash · 예시 단어) */
const APP = { "app-giyeok": "기역", "app-gajok": "가족" };

const SFX = {
  "sfx-marker": [0.9, "A thick felt-tip marker quickly drawing a circle on paper, squeaky marker stroke, close mic"],
  "sfx-slap": [0.6, "A paper sticky note slapped flat onto a desk with the palm, short soft slap"],
  "sfx-whoosh": [0.7, "Fast clean whoosh swipe transition, airy, short"],
  "sfx-tape": [0.8, "Masking tape torn off a roll and pressed down, short rip"],
  music: [22, "Light playful upbeat background music for a friendly app tutorial, plucked ukulele and glockenspiel, soft claps, bouncy, 112 BPM, seamless loop, no vocals"],
};

async function post(url, headers, body) {
  const response = await fetch(url, { method: "POST", headers, body });
  if (!response.ok) throw new Error(`${url.split("?")[0]} → ${response.status} ${(await response.text()).slice(0, 300)}`);
  return Buffer.from(await response.arrayBuffer());
}

for (const [name, text] of Object.entries(LINES)) {
  const raw = join(OUT, `raw-${name}.mp3`);
  if (force || !existsSync(raw)) {
    writeFileSync(
      raw,
      await post(
        `https://api.elevenlabs.io/v1/text-to-speech/${GUIDE}?output_format=mp3_44100_128`,
        { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
        JSON.stringify({
          text,
          model_id: "eleven_v4_turbo",
          language_code: "uz",
          voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.55, use_speaker_boost: true, speed: 1.08 },
        }),
      ),
    );
    console.log(`✓ raw-${name}.mp3`);
  }
  // 문장부호마다 생기는 긴 쉼을 0.1초로, 조금 빠르게
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-i", raw,
    // 첫소리가 잘리지 않게 앞은 -50dB 에 0.08초 남긴다
    "-af", "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.08:stop_periods=-1:stop_duration=0.14:stop_threshold=-40dB:stop_silence=0.12,atempo=1.12",
    "-b:a", "160k", join(OUT, `v-${name}.mp3`),
  ]);
}

for (const [name, text] of Object.entries(APP)) {
  const out = join(OUT, `${name}.mp3`);
  if (!force && existsSync(out)) continue;
  const ssml = `<speak version="1.0" xml:lang="ko-KR"><voice name="ko-KR-SunHiNeural">${text}</voice></speak>`;
  writeFileSync(
    out,
    await post(
      `https://${env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
      { "Ocp-Apim-Subscription-Key": env.AZURE_SPEECH_KEY, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-48khz-192kbitrate-mono-mp3" },
      ssml,
    ),
  );
  console.log(`✓ ${name}.mp3`);
}

for (const [name, [seconds, text]] of Object.entries(SFX)) {
  const out = join(OUT, `${name}.mp3`);
  if (!force && existsSync(out)) continue;
  writeFileSync(
    out,
    await post(
      "https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128",
      { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
      JSON.stringify({ text, duration_seconds: seconds, prompt_influence: 0.5 }),
    ),
  );
  console.log(`✓ ${name}.mp3`);
}

const lengths = {};
for (const name of Object.keys(LINES)) {
  const file = join(OUT, `v-${name}.mp3`);
  lengths[name] = Number(Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" })).toFixed(2));
}
writeFileSync(join(ROOT, "src", "tutorial", "voice.generated.json"), `${JSON.stringify(lengths, null, 1)}\n`);
console.log("voice.generated.json", JSON.stringify(lengths));
