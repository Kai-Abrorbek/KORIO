#!/usr/bin/env node
/**
 * 텔레그램 미니앱의 실제 화면을 한 프레임씩 찍는다.
 *
 * 시간은 Playwright 가짜 시계로 우리가 넘긴다 — 1/30초 넘기고 한 장, 또 넘기고 한 장.
 * 연출이 전부 rAF·타이머로 돌아서 캡처가 느려도 프레임이 빠지지 않는다. CSS 애니메이션은
 * Web Animations API 로 같은 시각에 맞춘다.
 *
 * 쓰는 법 (텔레그램 dev 서버가 3002 에 떠 있어야 한다. 무대 파일은 stage.mjs 가 깐다):
 *   node capture/capture.mjs probe <scene> [ms] [query]   # 한 장만 → frames/probe-<scene>.png
 *   node capture/capture.mjs shoot <scene> <ms> [query]   # 30fps → public/clips/<scene>.mp4 (+ .sounds.json)
 *   node capture/capture.mjs still <scene> <ms> [query]   # 한 장 → public/stills/<PROMO_NAME|scene>.png + .json
 *     PROMO_BOXES='{"card":"button.card"}' 이면 그 요소들의 자리(x,y,w,h·글자)를 .json 에 적는다 — 편집이 카드를 떼어 낸다
 */
import { chromium } from "playwright";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { USER, mocksFor } from "./mocks.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = process.env.PROMO_BASE ?? "http://localhost:3002/zz-promo";
const FPS = 30;
// 긴 화면을 한 장에 담을 때는 PROMO_HEIGHT 로 세로를 늘린다 (still)
const VIEW = { width: 390, height: Number(process.env.PROMO_HEIGHT ?? 844) };
const SCALE = Number(process.env.PROMO_SCALE ?? 2);

const [mode, scene, msArg, query = ""] = process.argv.slice(2);
if (!mode || !scene) {
  console.error("usage: capture.mjs probe|shoot <scene> [ms] [query]");
  process.exit(1);
}
const durationMs = Number(msArg ?? (mode === "probe" ? 2000 : 4000));

const browser = await chromium.launch({
  args: [
    "--autoplay-policy=no-user-gesture-required",
    "--force-color-profile=srgb",
    // 말하기 장면 — 가짜 마이크 (권한 창 없이)
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
  ],
});
/** 장면 중 누를 것: PROMO_ACTIONS='[{"at":1200,"click":"text=사과"}]' (at = 촬영 시각 ms) */
const actions = JSON.parse(process.env.PROMO_ACTIONS ?? "[]");
const context = await browser.newContext({
  viewport: VIEW,
  deviceScaleFactor: SCALE,
  locale: "uz-UZ",
  colorScheme: process.env.PROMO_DARK ? "dark" : "light",
});
// 가짜 텔레그램 · 장면 데이터 · 소리 기록 (capture/init-script.js, capture/mocks.mjs)
// PROMO_SEED 를 주면 Math.random 을 고정한다 — 문제 순서가 섞이는 화면도 매번 같게
const config = { mocks: mocksFor(scene), user: USER, seed: process.env.PROMO_SEED ? Number(process.env.PROMO_SEED) : null };
await context.addInitScript(`window.__PROMO_CONFIG = ${JSON.stringify(config)};`);
await context.addInitScript({ path: join(ROOT, "capture", "init-script.js") });
// 진짜 텔레그램 SDK 는 막는다 — 텔레그램 밖에선 빈 initData 로 우리 가짜를 덮어쓴다
await context.route("**/telegram-web-app.js*", (route) => route.fulfill({ body: "", contentType: "text/javascript" }));
const START = new Date("2026-10-22T10:00:00+05:00").getTime();
await context.clock.install({ time: START });
// 시계를 멈춰 둔다 — 그냥 두면 스크린샷 찍는 진짜 시간만큼 가짜 시계도 흘러서 연출이 몇 배 빨라진다
await context.clock.pauseAt(START + 1000);
const page = await context.newPage();
page.on("pageerror", (error) => console.error("pageerror:", error.message));

const url = `${BASE}?scene=${scene}${query ? `&${query}` : ""}`;
await page.goto(url, { waitUntil: "load" });
// Next.js 개발 표시(왼쪽 아래 N)는 영상에 안 나오게
await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
// 앱이 일어나 장면을 올릴 때까지 (무대가 window.__promoReady 를 켠다) 시계를 진짜 시간처럼 넘긴다
for (const bootStart = Date.now(); Date.now() - bootStart < 20000; ) {
  await page.clock.runFor(32);
  await page.waitForTimeout(32);
  if (await page.evaluate(() => window.__promoReady === true)) break;
}
// 장면이 데이터를 받을 짧은 틈 (가짜 응답은 진짜 시간으로 온다, 시계는 멈춘 채)
await page.waitForTimeout(300);

/** 가짜 시계를 넘기고, CSS 애니메이션도 같은 시각으로 */
let virtual = 0;
async function advance(ms) {
  await page.clock.runFor(ms);
  virtual += ms;
  await page.evaluate((t) => {
    for (const animation of document.getAnimations()) {
      const a = /** @type {Animation & { __base?: number }} */ (animation);
      if (a.__base === undefined) {
        a.pause();
        a.__base = t - Number(a.currentTime ?? 0);
      }
      a.currentTime = t - a.__base;
    }
  }, virtual);
}

/** 정해진 시각이 된 누르기를 한다. wait = 진짜 시간으로 기다리기 (가짜 마이크 녹음 등) */
const pending = [...actions].sort((a, b) => a.at - b.at);
async function runActions() {
  while (pending.length && pending[0].at <= virtual) {
    const action = pending.shift();
    try {
      await page.click(action.click, { timeout: 4000, force: true });
    } catch (error) {
      console.error("action failed:", action.click, String(error.message).split("\n")[0]);
    }
    if (action.wait) await page.waitForTimeout(action.wait);
  }
}

// 첫 장면 전에 화면이 자리 잡게 (마운트 직후 한 프레임)
await advance(16);

if (mode === "probe") {
  const step = 100;
  for (let t = 0; t < durationMs; t += step) {
    await advance(step);
    await runActions();
  }
  mkdirSync(join(ROOT, "frames"), { recursive: true });
  const out = join(ROOT, "frames", `probe-${scene}.png`);
  await page.screenshot({ path: out });
  const info = await page.evaluate(() => window.__promo);
  console.log(JSON.stringify({ out, unmocked: info?.unmocked, sounds: info?.sounds?.length }, null, 1));
} else if (mode === "still") {
  for (let t = 0; t < durationMs; t += 100) {
    await advance(100);
    await runActions();
  }
  const name = process.env.PROMO_NAME ?? scene;
  const stills = join(ROOT, "public", "stills");
  mkdirSync(stills, { recursive: true });
  await page.screenshot({ path: join(stills, `${name}.png`) });
  const selectors = JSON.parse(process.env.PROMO_BOXES ?? "{}");
  // 값이 문자열이면 CSS 선택자, { css, text, minWidth } 면 그 글자를 담은 가장 작은 요소 하나
  const boxes = await page.evaluate((selectors) => {
    const box = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height, text: (el.textContent ?? "").trim().slice(0, 60) };
    };
    const out = {};
    for (const [key, spec] of Object.entries(selectors)) {
      if (typeof spec === "string") {
        out[key] = [...document.querySelectorAll(spec)].map(box);
        continue;
      }
      const found = [...document.querySelectorAll(spec.css ?? "*")]
        .filter((el) => (el.textContent ?? "").includes(spec.text))
        .map(box)
        .filter((b) => b.w >= (spec.minWidth ?? 0) && b.x >= 0)
        .sort((a, b) => a.w * a.h - b.w * b.h);
      out[key] = found.slice(0, 1);
    }
    return out;
  }, selectors);
  writeFileSync(join(stills, `${name}.json`), JSON.stringify({ width: VIEW.width, height: VIEW.height, scale: SCALE, boxes }, null, 1));
  const info = await page.evaluate(() => window.__promo);
  console.log(JSON.stringify({ name, boxes: Object.fromEntries(Object.entries(boxes).map(([k, v]) => [k, v.length])), unmocked: info?.unmocked }));
} else {
  const dir = join(ROOT, "frames", scene);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const frames = Math.round((durationMs / 1000) * FPS);
  const start = await page.evaluate(() => performance.now() - (window.__promo?.t0 ?? 0));
  for (let i = 0; i < frames; i++) {
    await page.screenshot({ path: join(dir, `${String(i).padStart(5, "0")}.png`) });
    await advance(1000 / FPS);
    await runActions();
  }
  const info = await page.evaluate(() => window.__promo);
  const clips = join(ROOT, "public", "clips");
  mkdirSync(clips, { recursive: true });
  // 소리 시각을 이 클립의 0초 기준으로
  const sounds = (info?.sounds ?? [])
    .map((s) => ({ ...s, t: s.t - start }))
    .filter((s) => s.t >= -50 && s.t < durationMs);
  writeFileSync(join(clips, `${scene}.sounds.json`), JSON.stringify(sounds, null, 1));
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-framerate", String(FPS), "-i", join(dir, "%05d.png"),
    "-c:v", "libx264", "-preset", "slow", "-crf", "14", "-pix_fmt", "yuv420p", join(clips, `${scene}.mp4`),
  ]);
  console.log(JSON.stringify({ scene, frames, sounds: sounds.length, unmocked: info?.unmocked }, null, 1));
}

await browser.close();
