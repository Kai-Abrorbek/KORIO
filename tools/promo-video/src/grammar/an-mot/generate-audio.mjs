#!/usr/bin/env node
/** Generate ElevenLabs narration for the 안/못 reel, then write frame durations. */
import { execFile } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = join(import.meta.dirname, "..", "..", "..");
const lines = JSON.parse(readFileSync(join(import.meta.dirname, "lines.json"), "utf8"));
const output = join(root, "public", "grammar-an-mot");
mkdirSync(output, { recursive: true });
const clips = [...new Map(lines.chapters.flatMap((chapter) => chapter.clips).map((clip) => [clip.id, clip])).values()];
const durations = {};

async function create(clip) {
  const voice = lines.voices[clip.voice];
  if (!voice) throw new Error(`Unknown voice: ${clip.voice}`);
  const file = join(output, `${clip.id}.mp3`);
  if (process.argv.includes("--force") || !existsSync(file)) {
    await run(process.execPath, [join(root, "ai", "voice.mjs"), "eleven", voice.id, clip.text, file,
      "--lang", voice.language, "--model", voice.model, "--speed", String(voice.speed)],
      { cwd: root, maxBuffer: 1024 * 1024 });
  }
  const { stdout } = await run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]);
  const seconds = Number(stdout.trim());
  if (!Number.isFinite(seconds) || seconds <= 0) throw new Error(`Invalid duration: ${file}`);
  durations[clip.id] = Math.ceil(seconds * 30);
  console.log(`${clip.id}: ${seconds.toFixed(2)}s`);
}

for (let i = 0; i < clips.length; i += 2) await Promise.all(clips.slice(i, i + 2).map(create));
writeFileSync(join(import.meta.dirname, "timing.json"), `${JSON.stringify(Object.fromEntries(clips.map((clip) => [clip.id, durations[clip.id]])), null, 2)}\n`);
