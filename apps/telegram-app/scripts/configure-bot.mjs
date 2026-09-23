/* eslint-disable turbo/no-undeclared-env-vars -- one-off local bot administration */
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import process from "node:process";

const apiEnvPath = fileURLToPath(new URL("../../api/.env", import.meta.url));
if (!process.env.TELEGRAM_BOT_TOKEN && existsSync(apiEnvPath)) {
  process.loadEnvFile(apiEnvPath);
}

const args = process.argv.slice(2);

function option(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

const dryRun = args.includes("--dry-run");
const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
const url = (option("--url") ?? process.env.TELEGRAM_MINI_APP_URL)?.trim();
const text = (
  option("--text") ??
  process.env.TELEGRAM_MENU_BUTTON_TEXT ??
  "App"
).trim();

if (!url) {
  throw new Error("TELEGRAM_MINI_APP_URL 또는 --url이 필요합니다.");
}

const miniAppUrl = new URL(url);
if (miniAppUrl.protocol !== "https:") {
  throw new Error("Telegram Mini App URL은 HTTPS여야 합니다.");
}

if (!text || text.length > 64) {
  throw new Error("메뉴 버튼 문구는 1~64자여야 합니다.");
}

const menuButton = {
  type: "web_app",
  text,
  web_app: { url: miniAppUrl.toString() },
};

if (dryRun) {
  console.log(JSON.stringify({ menu_button: menuButton }, null, 2));
  process.exit(0);
}

if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN이 필요합니다.");
}

if (!/^\d+:[A-Za-z0-9_-]{30,}$/.test(token)) {
  throw new Error("TELEGRAM_BOT_TOKEN 형식이 올바르지 않습니다.");
}

let response;
try {
  response = await fetch(
    `https://api.telegram.org/bot${token}/setChatMenuButton`,
    {
      body: JSON.stringify({ menu_button: menuButton }),
      headers: { "content-type": "application/json" },
      method: "POST",
    },
  );
} catch {
  throw new Error("Telegram Bot API에 연결하지 못했습니다.");
}
const result = await response.json();

if (!response.ok || !result.ok) {
  throw new Error(
    result.description ?? `Telegram Bot API 오류 (${response.status})`,
  );
}

console.log(`Telegram 메뉴 버튼을 '${text}'로 설정했습니다: ${miniAppUrl}`);
