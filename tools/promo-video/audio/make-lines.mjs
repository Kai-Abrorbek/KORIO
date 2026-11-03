#!/usr/bin/env node
/**
 * 편 대사 녹음 — 줄마다 목소리 · 언어를 정해 ElevenLabs 로 만들고, 우즈벡어 줄은 단어 시각까지 뽑는다 (시리즈 도구라 게시 후에도 남긴다).
 *
 *   node audio/make-lines.mjs src/<편>/<편>.lines.json [--force]
 *
 * 대사 파일:
 *   { "id": "<편>",
 *     "voices": { "<이름>": { "id": "<ElevenLabs voiceId>", "speed": 1.0, "tempo": 1.04 } },
 *     "lines": [ { "key": "n01", "voice": "<이름>", "lang": "uz" | "ko" | ..., "text": "…" } ] }
 *   → public/ai/<id>/<key>.mp3 (앞뒤 무음을 자르고 tempo 배) · src/<편>/<편>.words.json (줄 길이, uz 줄의 단어 시각)
 *
 * 원본(raw-<key>.mp3)이 있으면 다시 만들지 않는다 — 대사를 고치면 그 raw 를 지우고 다시 돌린다.
 * 단어 시각은 ElevenLabs 받아쓰기(scribe): 단어 수가 대사와 같으면 그 시각, 다르면 글자 수 비율로 나눈다.
 * 소리 나는 대로 적는다: KORIO → "Korio", oʻ/gʻ 는 ʻ(U+02BB). 키는 apps/api/.env 에서 읽는다 (화면에 찍지 않는다).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const env = Object.fromEntries(
  readFileSync(join(ROOT, "..", "..", "apps/api/.env"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]),
);
const linesFile = resolve(process.argv[2] ?? "");
if (!existsSync(linesFile)) {
  console.error("usage: make-lines.mjs src/<편>/<편>.lines.json [--force]");
  process.exit(1);
}
const force = process.argv.includes("--force");
const { id, voices, lines } = JSON.parse(readFileSync(linesFile, "utf8"));
const OUT = join(ROOT, "public", "ai", id);
mkdirSync(OUT, { recursive: true });
const duration = (file) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" }));

async function tts(voice, lang, text) {
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice.id}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ text, model_id: "eleven_v4_turbo", language_code: lang, voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.45, use_speaker_boost: true, speed: voice.speed ?? 1 } }),
  });
  if (!response.ok) throw new Error(`tts ${voice.id} → ${response.status} ${(await response.text()).slice(0, 300)}`);
  return Buffer.from(await response.arrayBuffer());
}

async function scribe(file) {
  const fd = new FormData();
  fd.append("model_id", "scribe_v1");
  fd.append("language_code", "uzb");
  fd.append("file", new Blob([readFileSync(file)], { type: "audio/mpeg" }), "line.mp3");
  const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", { method: "POST", headers: { "xi-api-key": env.ELEVENLABS_API_KEY }, body: fd });
  if (!response.ok) throw new Error(`scribe → ${response.status} ${(await response.text()).slice(0, 200)}`);
  return (await response.json()).words.filter((w) => w.type === "word");
}

const result = { lines: {} };
for (const line of lines) {
  const voice = voices[line.voice];
  const raw = join(OUT, `raw-${line.key}.mp3`);
  if (force || !existsSync(raw)) {
    writeFileSync(raw, await tts(voice, line.lang, line.text));
    console.log(`✓ raw-${line.key}.mp3`);
  }
  const file = join(OUT, `${line.key}.mp3`);
  // 앞뒤 무음만 자르고(문장 사이 쉼은 감정을 위해 남긴다), 목소리마다 정한 빠르기로.
  // pitch(예: 0.944 = 반음 낮게)를 주면 빠르기는 그대로 두고 음높이만 바꾼다
  const pitch = voice.pitch ?? 1;
  const shift = pitch === 1 ? "" : `asetrate=44100*${pitch},aresample=44100,`;
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-i", raw,
    "-af", `silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.04,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.1,areverse,${shift}atempo=${((voice.tempo ?? 1) / pitch).toFixed(4)}`,
    "-b:a", "160k", file,
  ]);
  const len = duration(file);
  const entry = { len: Number(len.toFixed(2)), voice: line.voice, lang: line.lang, text: line.text };
  if (line.lang === "uz") {
    const heard = await scribe(file);
    const words = line.text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
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
    entry.heard = heard.map((w) => w.text).join(" ");
    entry.words = words.map((w, i) => ({ w, s: Number(times[i][0].toFixed(2)), e: Number(times[i][1].toFixed(2)) }));
    console.log(`${line.key} ${heard.length === words.length ? "scribe" : `ratio (${heard.length}≠${words.length})`} | ${entry.heard}`);
  }
  result.lines[line.key] = entry;
}
const wordsFile = linesFile.replace(/\.lines\.json$/, ".words.json");
writeFileSync(wordsFile, `${JSON.stringify(result, null, 1)}\n`);
const total = Object.values(result.lines).reduce((s, l) => s + l.len, 0);
console.log(`speech total ${total.toFixed(1)}s →`, wordsFile.slice(ROOT.length));
