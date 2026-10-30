#!/usr/bin/env node
/**
 * "O'zbekcha = koreyscha?" 편 — 내레이션 단어마다 시각을 뽑아 ozbek.words.json 으로 (화면 글자가 말하는 단어를 따라 켜진다).
 *
 *   node src/ozbek/make-timing.mjs
 *
 * ElevenLabs 받아쓰기(scribe)로 단어 시각을 받고, 단어 수가 대사와 같으면 그 시각을, 다르면 글자 수 비율로 나눈다.
 * 한국어 문장(k-*)은 앞뒤 무음을 잘라 둔다. 키는 apps/api/.env 에서 읽는다 (화면에 찍지 않는다).
 */
import { readFileSync, writeFileSync } from "node:fs";
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
const { id, lines, app } = JSON.parse(readFileSync(join(import.meta.dirname, "ozbek.lines.json"), "utf8"));
const OUT = join(ROOT, "public", "ai", "tutorial", id);
const duration = (file) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" }));
// 영상이 58초 안에 들게 — 안내 목소리 1.06배, 세 단어 한국어(k03)는 1.1배
const SPEED = 1.06;
const APP_SPEED = { k03: 1.1 };

// 한국어 문장 — 앞뒤 무음 자르기
for (const name of Object.keys(app)) {
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-i", join(OUT, `${name}.mp3`),
    "-af", `silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse,atempo=${APP_SPEED[name] ?? 1}`,
    "-b:a", "160k", join(OUT, `t-${name}.mp3`),
  ]);
}
// 안내 목소리 — 빠르게 한 판 (s-*)
for (const name of Object.keys(lines)) {
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", join(OUT, `v-${name}.mp3`), "-af", `atempo=${SPEED}`, "-b:a", "160k", join(OUT, `s-${name}.mp3`)]);
}

const result = { voice: {}, app: {} };
for (const name of Object.keys(app)) result.app[name] = Number(duration(join(OUT, `t-${name}.mp3`)).toFixed(2));

for (const [name, text] of Object.entries(lines)) {
  const file = join(OUT, `s-${name}.mp3`);
  const fd = new FormData();
  fd.append("model_id", "scribe_v1");
  fd.append("language_code", "uzb");
  fd.append("file", new Blob([readFileSync(file)], { type: "audio/mpeg" }), `${name}.mp3`);
  const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", { method: "POST", headers: { "xi-api-key": env.ELEVENLABS_API_KEY }, body: fd });
  if (!response.ok) throw new Error(`scribe ${name} → ${response.status} ${(await response.text()).slice(0, 200)}`);
  const heard = (await response.json()).words.filter((w) => w.type === "word");
  const words = text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  const len = duration(file);
  let times;
  if (heard.length === words.length) {
    times = heard.map((w) => [w.start, w.end]);
  } else {
    // 글자 수 비율로 — 들은 첫 단어 ~ 마지막 단어 사이를 나눈다
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
  result.voice[name] = {
    len: Number(len.toFixed(2)),
    heard: heard.map((w) => w.text).join(" "),
    words: words.map((w, i) => ({ w, s: Number(times[i][0].toFixed(2)), e: Number(times[i][1].toFixed(2)) })),
  };
  console.log(`${name} ${heard.length === words.length ? "scribe" : `ratio (${heard.length}≠${words.length})`} | ${result.voice[name].heard}`);
}
writeFileSync(join(import.meta.dirname, "ozbek.words.json"), `${JSON.stringify(result, null, 1)}\n`);
console.log("app", JSON.stringify(result.app));
