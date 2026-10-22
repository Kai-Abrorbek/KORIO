import { Config } from "@remotion/cli/config";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// 촬영에 쓴 Playwright 의 헤드리스 크롬을 같이 쓴다 (Remotion 이 따로 받지 않게)
const playwrightShell = join(
  homedir(),
  "AppData/Local/ms-playwright/chromium_headless_shell-1194/chrome-win/headless_shell.exe",
);
const browser = process.env.REMOTION_BROWSER ?? (existsSync(playwrightShell) ? playwrightShell : null);
if (browser) Config.setBrowserExecutable(browser);

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setCodec("h264");
Config.setCrf(16);
Config.setPixelFormat("yuv420p");
