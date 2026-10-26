#!/usr/bin/env node
/**
 * 음성 파일의 실제 파형을 막대 높이로 뽑는다 — 영상에서 두 소리를 나란히 그릴 때 쓴다.
 *   node ai/waveform.mjs <결과.json> <이름>=<파일.mp3> ...
 * 말소리 구간(앞뒤 무음 제외)만 잘라 BARS 개 막대로, 높이는 모든 파일의 최댓값 기준 0..1.
 */
import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const BARS = 40;
const RATE = 8000;
const [outFile, ...pairs] = process.argv.slice(2);

const raw = Object.fromEntries(
  pairs.map((pair) => {
    const [name, file] = pair.split("=");
    const pcm = execFileSync("ffmpeg", ["-loglevel", "error", "-i", file, "-ac", "1", "-ar", String(RATE), "-f", "s16le", "-"], { maxBuffer: 1 << 26 });
    const samples = new Int16Array(pcm.buffer, pcm.byteOffset, pcm.length / 2);
    const loud = (i) => Math.abs(samples[i]) > 1200;
    let start = 0;
    while (start < samples.length && !loud(start)) start++;
    let end = samples.length - 1;
    while (end > start && !loud(end)) end--;
    const size = Math.max(1, Math.floor((end - start) / BARS));
    const bars = Array.from({ length: BARS }, (_, b) => {
      let peak = 0;
      for (let i = start + b * size; i < start + (b + 1) * size && i < samples.length; i++) peak = Math.max(peak, Math.abs(samples[i]));
      return peak;
    });
    return [name, bars];
  }),
);
const max = Math.max(...Object.values(raw).flat());
const json = Object.fromEntries(Object.entries(raw).map(([name, bars]) => [name, bars.map((v) => +(v / max).toFixed(3))]));
writeFileSync(outFile, `${JSON.stringify(json)}\n`);
console.log(outFile, Object.keys(json).join(", "));
