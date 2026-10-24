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
