#!/usr/bin/env node
/** Creates this episode's ElevenLabs clips and timing from voice-lines.json. */
import { execFile } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = join(import.meta.dirname, "..", "..");
const lines = JSON.parse(readFileSync(join(import.meta.dirname, "voice-lines.json"), "utf8"));
const output = join(root, "public", "grammar");
mkdirSync(output, { recursive: true });

const uniqueClips = [...new Map(lines.chapters.flatMap((chapter) => chapter.clips).map((clip) => [clip.id, clip])).values()];
const force = process.argv.includes("--force");
const durations = {};

async function create(clip) {
  const voice = lines.voices[clip.voice];
  if (!voice) throw new Error(`Unknown voice: ${clip.voice}`);
  const file = join(output, `${clip.id}.mp3`);
  if (force || !existsSync(file)) {
    await run(process.execPath, [
      join(root, "ai", "voice.mjs"), "eleven", voice.id, clip.text, file,
      "--lang", voice.language, "--model", voice.model, "--speed", String(voice.speed),
    ], { cwd: root, maxBuffer: 1024 * 1024 });
  }
  const { stdout } = await run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]);
  const seconds = Number(stdout.trim());
  if (!Number.isFinite(seconds) || seconds <= 0) throw new Error(`Invalid duration: ${file}`);
  durations[clip.id] = Math.ceil(seconds * 30);
  console.log(`${clip.id}: ${seconds.toFixed(2)}s`);
}

// Two at a time keeps the API responsive without exhausting concurrent requests.
for (let i = 0; i < uniqueClips.length; i += 2) {
  await Promise.all(uniqueClips.slice(i, i + 2).map(create));
}

const timingFile = join(import.meta.dirname, "voice-timing.json");
writeFileSync(timingFile, `${JSON.stringify(Object.fromEntries(uniqueClips.map((clip) => [clip.id, durations[clip.id]])), null, 2)}\n`);
console.log(`Wrote ${timingFile}`);
