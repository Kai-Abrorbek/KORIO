#!/usr/bin/env node
/**
 * "Oʻzbek ona = koreys ona" 편 소리 — 안내 · 우즈벡 엄마 · 한국 엄마 · 한국어 한마디, 그리고 안내 단어 시각.
 *
 *   node src/ona/make-ona-audio.mjs [--force]
 *
 *   안내(narrator)  ElevenLabs "Sarah" — 우즈벡어 v4 turbo + uz, 쉼 줄이고 1.12 × 1.06배 (사용법 시리즈와 같은 목소리)
 *   우즈벡 엄마(uzMom) ElevenLabs "Matilda" — 우즈벡어 v4 turbo + uz, 1.04배
 *   한국 엄마(koMom)  Azure ko-KR-SoonBokNeural (나이 든 여자 목소리)
 *   한국어(ko)        Azure ko-KR-SunHiNeural (앱이 읽어 주는 목소리)
 *   → public/ai/tutorial/ona/<key>.mp3 (앞뒤 무음 자름) · src/ona/ona.words.json (길이, 안내 단어 시각)
 * 안내 단어 시각은 ElevenLabs 받아쓰기(scribe)로 — 단어 수가 대사와 같으면 그 시각, 다르면 글자 수 비율로 나눈다.
 * 키는 apps/api/.env 에서 읽는다 (화면에 찍지 않는다).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
const env = Object.fromEntries(
  readFileSync(join(ROOT, "..", "..", "apps/api/.env"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]),
);
const force = process.argv.includes("--force");
const { id, narrator, uzMom, koMom, ko } = JSON.parse(readFileSync(join(import.meta.dirname, "ona.lines.json"), "utf8"));
const OUT = join(ROOT, "public", "ai", "tutorial", id);
mkdirSync(OUT, { recursive: true });
const duration = (file) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" }));

async function post(url, headers, body) {
  const response = await fetch(url, { method: "POST", headers, body });
  if (!response.ok) throw new Error(`${url.split("?")[0]} → ${response.status} ${(await response.text()).slice(0, 300)}`);
  return Buffer.from(await response.arrayBuffer());
}
const eleven = (voice, text, speed) =>
  post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`,
    { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
    JSON.stringify({ text, model_id: "eleven_v4_turbo", language_code: "uz", voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.55, use_speaker_boost: true, speed } }),
  );
const azure = (voice, text) =>
  post(
    `https://${env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
    { "Ocp-Apim-Subscription-Key": env.AZURE_SPEECH_KEY, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-48khz-192kbitrate-mono-mp3" },
    `<speak version="1.0" xml:lang="ko-KR"><voice name="${voice}">${text}</voice></speak>`,
  );

/** 원본(raw-*)이 없을 때만 만들고, 앞뒤 무음을 자르고(쉼도 줄이고) 빠르기를 맞춘 <key>.mp3 를 쓴다 */
async function make(key, text, synth, tempo, squeeze) {
  const raw = join(OUT, `raw-${key}.mp3`);
  if (force || !existsSync(raw)) {
    writeFileSync(raw, await synth(text));
    console.log(`✓ raw-${key}.mp3`);
  }
  const trim = squeeze
    ? "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.06:stop_periods=-1:stop_duration=0.14:stop_threshold=-40dB:stop_silence=0.12"
    : "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse";
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", raw, "-af", `${trim},atempo=${tempo}`, "-b:a", "160k", join(OUT, `${key}.mp3`)]);
}

for (const [key, text] of Object.entries(narrator)) await make(key, text, (t) => eleven("EXAVITQu4vr4xnSDxMaL", t, 1.08), 1.12 * 1.06, true);
for (const [key, text] of Object.entries(uzMom)) await make(key, text, (t) => eleven("XrExE9yKIg1WjnnlVkGX", t, 1.0), 1.04, false);
for (const [key, text] of Object.entries(koMom)) await make(key, text, (t) => azure("ko-KR-SoonBokNeural", t), 1.0, false);
for (const [key, text] of Object.entries(ko)) await make(key, text, (t) => azure("ko-KR-SunHiNeural", t), 1.0, false);

const result = { voice: {}, clips: {} };
for (const key of [...Object.keys(uzMom), ...Object.keys(koMom), ...Object.keys(ko)]) result.clips[key] = Number(duration(join(OUT, `${key}.mp3`)).toFixed(2));

for (const [key, text] of Object.entries(narrator)) {
  const file = join(OUT, `${key}.mp3`);
  const fd = new FormData();
  fd.append("model_id", "scribe_v1");
  fd.append("language_code", "uzb");
  fd.append("file", new Blob([readFileSync(file)], { type: "audio/mpeg" }), `${key}.mp3`);
  const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", { method: "POST", headers: { "xi-api-key": env.ELEVENLABS_API_KEY }, body: fd });
  if (!response.ok) throw new Error(`scribe ${key} → ${response.status} ${(await response.text()).slice(0, 200)}`);
  const heard = (await response.json()).words.filter((w) => w.type === "word");
  const words = text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  const len = duration(file);
  let times;
  if (heard.length === words.length) times = heard.map((w) => [w.start, w.end]);
  else {
    const a = heard[0]?.start ?? 0;
    const b = heard.at(-1)?.end ?? len;
    const total = words.reduce((s, w) => s + w.length + 1, 0);
    let t = a;
    times = words.map((w) => {
      const d = ((w.length + 1) / total) * (b - a);
      const span = [t, t + d];
      t += d;
      return span;
    });
  }
  result.voice[key] = {
    len: Number(len.toFixed(2)),
    heard: heard.map((w) => w.text).join(" "),
    words: words.map((w, i) => ({ w, s: Number(times[i][0].toFixed(2)), e: Number(times[i][1].toFixed(2)) })),
  };
  console.log(`${key} ${heard.length === words.length ? "scribe" : `ratio (${heard.length}≠${words.length})`} | ${result.voice[key].heard}`);
}
writeFileSync(join(import.meta.dirname, "ona.words.json"), `${JSON.stringify(result, null, 1)}\n`);
console.log("clips", JSON.stringify(result.clips));
