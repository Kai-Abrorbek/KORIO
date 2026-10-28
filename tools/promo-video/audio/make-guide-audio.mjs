#!/usr/bin/env node
/**
 * 사용법 시리즈 소리 — 편마다 대사 파일 하나만 바꾼다 (시리즈 도구라 게시 후에도 남긴다).
 *
 *   node audio/make-guide-audio.mjs src/tutorial/<편>.lines.json [--force]
 *
 * 대사 파일: { "id": "<편 이름>", "lines": { "v01": "우즈벡어 대사", ... }, "app": { "app-x": "한국어" } }
 *   → public/ai/tutorial/<id>/v-*.mp3 (안내 목소리) · app-*.mp3 (앱이 읽어 주는 한국어)
 *   → 같은 폴더의 <편>.voice.json (대사 길이, 초)
 *   공용 효과음 · 음악은 public/ai/tutorial/ 에 없을 때만 만든다 (sfx-marker · sfx-slap · sfx-whoosh · sfx-tape · music)
 *
 * 안내: ElevenLabs "Sarah" (젊은 여자, 또렷하고 밝게) — 우즈벡어 v4 turbo + uz, 쉼 줄이고 1.12배
 * 소리 나는 대로 적는다: KORIO → "Korio", AI → "Ey-Ay", 숫자는 글자로, oʻ/gʻ 는 ʻ(U+02BB)
 * 키는 apps/api/.env 에서 읽는다 (화면에 찍지 않는다).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const REPO = join(ROOT, "..", "..");
const env = Object.fromEntries(
  readFileSync(join(REPO, "apps/api/.env"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]),
);
const linesFile = resolve(process.argv[2] ?? "");
if (!existsSync(linesFile)) {
  console.error("usage: make-guide-audio.mjs <편>.lines.json [--force]");
  process.exit(1);
}
const force = process.argv.includes("--force");
const { id, lines, app = {} } = JSON.parse(readFileSync(linesFile, "utf8"));
const SHARED = join(ROOT, "public", "ai", "tutorial");
const OUT = join(SHARED, id);
mkdirSync(OUT, { recursive: true });

const GUIDE = "EXAVITQu4vr4xnSDxMaL"; // Sarah
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

for (const [name, text] of Object.entries(lines)) {
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
    console.log(`✓ ${id}/raw-${name}.mp3`);
  }
  // 첫소리는 살리고(-50dB, 0.08초), 문장부호마다 생기는 긴 쉼을 0.12초로, 조금 빠르게
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-i", raw,
    "-af", "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.08:stop_periods=-1:stop_duration=0.14:stop_threshold=-40dB:stop_silence=0.12,atempo=1.12",
    "-b:a", "160k", join(OUT, `v-${name}.mp3`),
  ]);
}

for (const [name, text] of Object.entries(app)) {
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
  console.log(`✓ ${id}/${name}.mp3`);
}

for (const [name, [seconds, text]] of Object.entries(SFX)) {
  const out = join(SHARED, `${name}.mp3`);
  if (existsSync(out)) continue;
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
for (const name of Object.keys(lines)) {
  const file = join(OUT, `v-${name}.mp3`);
  lengths[name] = Number(Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" })).toFixed(2));
}
const voiceFile = linesFile.replace(/\.lines\.json$/, ".voice.json");
writeFileSync(voiceFile, `${JSON.stringify(lengths, null, 1)}\n`);
console.log(`${voiceFile.slice(dirname(ROOT).length)}`, JSON.stringify(lengths));
