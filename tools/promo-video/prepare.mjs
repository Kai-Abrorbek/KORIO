#!/usr/bin/env node
/**
 * 편집 재료를 public/ 에 모은다 (저장소의 원본을 복사만 한다 — 커밋하지 않는다):
 *   public/brand  마스코트 그림 (apps/mobile/assets)
 *   public/story  스토리 영상 그림 (서울 장면 · 하라 · 앱 아이콘)
 *   public/fonts  Ionicons 글꼴 (텔레그램 앱과 같은 아이콘)
 *   public/sfx    앱 효과음 (촬영 때 기록한 clips/*.sounds.json 이 가리키는 것)
 *   src/cues.generated.json  장면별 효과음 시각
 *   src/media.generated.json 내레이션·클립 길이
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = import.meta.dirname;
const REPO = join(ROOT, "..", "..");
const PUBLIC = join(ROOT, "public");

const BRAND = ["hangulmon_celebrating", "hangulmon_level_up", "hangulmon_cheering", "hangulmon_default_float", "hangulmon_great", "hangulmon_default"];
mkdirSync(join(PUBLIC, "brand"), { recursive: true });
for (const name of BRAND) {
  cpSync(join(REPO, "apps/mobile/assets/images/characters", `${name}.png`), join(PUBLIC, "brand", `${name}.png`));
}
// 스토리 영상(KorioStoryUz) — 서울 장면 그림 · 하라 · 앱 아이콘 · 불꽃
const STORY = [
  "scenes/scene_cvs.webp",
  "scenes/scene_hangang.webp",
  "scenes/scene_namsan.webp",
  "scenes/scene_gyeongbokgung.webp",
  "characters/hara_love.png",
  "characters/hara_cheer.png",
  "korio-icon.png",
  "streak-flame.svg",
];
mkdirSync(join(PUBLIC, "story"), { recursive: true });
for (const file of STORY) {
  cpSync(join(REPO, "apps/mobile/assets/images", file), join(PUBLIC, "story", file.split("/").pop()));
}
cpSync(join(REPO, "apps/telegram-app/public/fonts/Ionicons.ttf"), join(PUBLIC, "fonts", "Ionicons.ttf"));
cpSync(join(REPO, "apps/telegram-app/public/sounds"), join(PUBLIC, "sfx"), { recursive: true });

// 촬영 때 앱이 낸 소리 → 편집이 같은 시각에 다시 깐다 ({ 장면: [{ ms, file, rate }] })
const cues = {};
const clips = join(PUBLIC, "clips");
for (const name of existsSync(clips) ? readdirSync(clips) : []) {
  if (!name.endsWith(".sounds.json")) continue;
  const sounds = JSON.parse(readFileSync(join(clips, name), "utf8"));
  cues[name.replace(".sounds.json", "")] = sounds
    .map((s) => ({ ms: Math.round(s.t), file: new URL(s.src, "http://x").pathname, rate: s.rate ?? 1 }))
    .filter((s) => s.file.startsWith("/sounds/"))
    .map((s) => ({ ...s, file: `sfx/${s.file.slice("/sounds/".length)}` }));
}
writeFileSync(join(ROOT, "src", "cues.generated.json"), JSON.stringify(cues, null, 1));

// 길이 — 내레이션은 말이 끝나는 곳(뒤 무음 뺌, 초), 클립은 프레임 수. 구성표가 이걸로 장면 길이를 잡는다
function speechEnd(file) {
  const log = spawnSync("ffmpeg", ["-hide_banner", "-i", file, "-af", "silencedetect=noise=-40dB:d=0.15", "-f", "null", "-"], {
    encoding: "utf8",
  }).stderr;
  const [, h, m, s] = log.match(/Duration: (\d+):(\d+):([\d.]+)/);
  const duration = Number(h) * 3600 + Number(m) * 60 + Number(s);
  const events = [...log.matchAll(/silence_(start|end): ([\d.]+)/g)].map(([, kind, t]) => ({ kind, t: Number(t) }));
  const last = events.at(-1);
  if (last?.kind === "start") return last.t;
  if (last?.kind === "end" && duration - last.t < 0.05) return events.at(-2)?.t ?? duration;
  return duration;
}
const audio = join(PUBLIC, "audio");
const voices = Object.fromEntries(
  readdirSync(audio)
    // 소개 영상 내레이션 narr-<이름>, 런치 영상 내레이션 launch-<이름> (음악 제외)
    .filter((name) => /^(narr|launch)-/.test(name) && !name.includes("music") && name.endsWith(".mp3"))
    .map((name) => [name.replace(/^narr-/, "").slice(0, -".mp3".length), Number(speechEnd(join(audio, name)).toFixed(3))]),
);
const clipFrames = Object.fromEntries(
  (existsSync(clips) ? readdirSync(clips) : [])
    .filter((name) => name.endsWith(".mp4"))
    .map((name) => [
      name.slice(0, -".mp4".length),
      Number(
        spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-count_packets", "-show_entries", "stream=nb_read_packets", "-of", "csv=p=0", join(clips, name)], {
          encoding: "utf8",
        }).stdout.trim(),
      ),
    ]),
);
// 런치 영상 화면 사진의 크기·카드 자리 (capture/stills-launch.sh)
const stillsDir = join(PUBLIC, "stills");
const stills = Object.fromEntries(
  (existsSync(stillsDir) ? readdirSync(stillsDir) : [])
    .filter((name) => name.endsWith(".json"))
    .map((name) => [name.slice(0, -".json".length), JSON.parse(readFileSync(join(stillsDir, name), "utf8"))]),
);
writeFileSync(join(ROOT, "src", "media.generated.json"), JSON.stringify({ voices, clips: clipFrames, stills }, null, 1));
console.log("✓ public/brand · public/fonts · public/sfx · src/cues.generated.json · src/media.generated.json");
