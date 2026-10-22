#!/usr/bin/env node
/**
 * 편집 재료를 public/ 에 모은다 (저장소의 원본을 복사만 한다 — 커밋하지 않는다):
 *   public/brand  마스코트 그림 (apps/mobile/assets)
 *   public/fonts  Ionicons 글꼴 (텔레그램 앱과 같은 아이콘)
 *   public/sfx    앱 효과음 (촬영 때 기록한 clips/*.sounds.json 이 가리키는 것)
 *   src/cues.generated.json  장면별 효과음 시각
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = import.meta.dirname;
const REPO = join(ROOT, "..", "..");
const PUBLIC = join(ROOT, "public");

const BRAND = ["hangulmon_celebrating", "hangulmon_level_up", "hangulmon_cheering", "hangulmon_default_float", "hangulmon_great"];
mkdirSync(join(PUBLIC, "brand"), { recursive: true });
for (const name of BRAND) {
  cpSync(join(REPO, "apps/mobile/assets/images/characters", `${name}.png`), join(PUBLIC, "brand", `${name}.png`));
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
console.log("✓ public/brand · public/fonts · public/sfx · src/cues.generated.json");
