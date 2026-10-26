#!/usr/bin/env node
/**
 * 인물 대사 · 효과음을 만든다. 키는 apps/api/.env 에서 읽는다 (화면에 찍지 않는다).
 *
 *   node ai/voice.mjs eleven <voiceId> "<대사>" <결과.mp3>
 *       ElevenLabs v3 — [laughs] 같은 연기 지시를 넣을 수 있다. 외국인 손님처럼 살짝 억양이 있는 한국어에 맞다.
 *   node ai/voice.mjs azure <ko-KR-...Neural> "<대사>" <결과.mp3> [--rate -10%] [--pitch +0%]
 *       Azure 한국인 목소리 — 사장님처럼 토박이 발음이 필요할 때.
 *   node ai/voice.mjs sfx "<소리 설명 (영어)>" <초> <결과.mp3>
 *       ElevenLabs 효과음 (식당 소음 같은 배경음)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const REPO = join(import.meta.dirname, "..", "..", "..");
const env = Object.fromEntries(
  readFileSync(join(REPO, "apps/api/.env"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]),
);
const flag = (name) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const escapeXml = (text) => text.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]);

async function post(url, headers, body) {
  const response = await fetch(url, { method: "POST", headers, body });
  if (!response.ok) throw new Error(`${url.split("?")[0]} → ${response.status} ${(await response.text()).slice(0, 300)}`);
  return Buffer.from(await response.arrayBuffer());
}

const [provider, ...args] = process.argv.slice(2);
let audio;
let outFile;
if (provider === "eleven") {
  const [voiceId, text, out] = args;
  outFile = out;
  audio = await post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
    JSON.stringify({ text, model_id: "eleven_v3", language_code: "ko", voice_settings: { stability: 0.5, similarity_boost: 0.8 } }),
  );
} else if (provider === "azure") {
  const [voice, text, out] = args;
  outFile = out;
  const ssml = `<speak version="1.0" xml:lang="ko-KR"><voice name="${voice}"><prosody rate="${flag("--rate") ?? "0%"}" pitch="${flag("--pitch") ?? "0%"}">${escapeXml(text)}</prosody></voice></speak>`;
  audio = await post(
    `https://${env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
    {
      "Ocp-Apim-Subscription-Key": env.AZURE_SPEECH_KEY,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-48khz-192kbitrate-mono-mp3",
    },
    ssml,
  );
} else if (provider === "sfx") {
  const [text, seconds, out] = args;
  outFile = out;
  audio = await post(
    "https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128",
    { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
    JSON.stringify({ text, duration_seconds: Number(seconds), prompt_influence: 0.5 }),
  );
} else {
  console.error('usage: voice.mjs eleven <voiceId> "<text>" <out.mp3> | azure <voice> "<text>" <out.mp3> [--rate -10%] | sfx "<description>" <seconds> <out.mp3>');
  process.exit(1);
}
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, audio);
console.log(`${outFile} (${(audio.length / 1024).toFixed(0)} KB)`);
