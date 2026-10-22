#!/usr/bin/env node
/**
 * 촬영 무대를 텔레그램 앱에 깔고 걷는다 — 앱에 커밋하지 않는다.
 *   node capture/stage.mjs up     # apps/telegram-app/app/zz-promo/page.tsx 생성
 *   node capture/stage.mjs down   # 지우고 next dev 가 고친 next-env.d.ts 되돌리기
 */
import { copyFileSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const REPO = join(import.meta.dirname, "..", "..", "..");
const stageDir = join(REPO, "apps/telegram-app/app/zz-promo");

if (process.argv[2] === "up") {
  mkdirSync(stageDir, { recursive: true });
  copyFileSync(join(import.meta.dirname, "promo-stage.tsx"), join(stageDir, "page.tsx"));
  console.log("stage up:", stageDir);
} else if (process.argv[2] === "down") {
  rmSync(stageDir, { recursive: true, force: true });
  try {
    execFileSync("git", ["checkout", "--", "apps/telegram-app/next-env.d.ts"], { cwd: REPO, stdio: "ignore" });
  } catch {
    // 바뀐 게 없으면 그만
  }
  console.log("stage down");
} else {
  console.error("usage: stage.mjs up|down");
  process.exit(1);
}
