#!/usr/bin/env node
/**
 * 편집 재료를 public/ 에 모은다 (저장소의 원본을 복사만 한다 — 커밋하지 않는다):
 *   public/brand  마스코트 그림 (apps/mobile/assets) — 프로필 그림이 쓴다
 *   public/fonts  Ionicons 글꼴 (텔레그램 앱과 같은 아이콘)
 *   public/sfx    앱 효과음 (촬영 때 기록한 clips/*.sounds.json 이 가리키는 것)
 */
import { cpSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = import.meta.dirname;
const REPO = join(ROOT, "..", "..");
const PUBLIC = join(ROOT, "public");

const BRAND = ["hangulmon_celebrating", "hangulmon_level_up", "hangulmon_cheering", "hangulmon_default_float", "hangulmon_great", "hangulmon_default"];
mkdirSync(join(PUBLIC, "brand"), { recursive: true });
for (const name of BRAND) {
  cpSync(join(REPO, "apps/mobile/assets/images/characters", `${name}.png`), join(PUBLIC, "brand", `${name}.png`));
}
mkdirSync(join(PUBLIC, "fonts"), { recursive: true });
cpSync(join(REPO, "apps/telegram-app/public/fonts/Ionicons.ttf"), join(PUBLIC, "fonts", "Ionicons.ttf"));
cpSync(join(REPO, "apps/telegram-app/public/sounds"), join(PUBLIC, "sfx"), { recursive: true });
console.log("✓ public/brand · public/fonts · public/sfx");
