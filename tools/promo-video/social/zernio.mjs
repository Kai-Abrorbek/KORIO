#!/usr/bin/env node
/**
 * Zernio(https://docs.zernio.com) 로 만든 영상을 인스타그램 릴스로 올린다.
 * 키는 apps/api/.env 의 ZERNIO_KEY 에서 읽는다 (화면에 찍지 않는다).
 *
 *   node social/zernio.mjs accounts
 *       연결된 SNS 계정 목록 (읽기만)
 *   node social/zernio.mjs post <영상.mp4> <캡션.txt> [--account <id>] [--at <ISO 시각> --tz Asia/Tashkent] [--yes]
 *       --yes 가 없으면 무엇을 올릴지 보여 주기만 한다. --at 이 없으면 바로 게시한다.
 *   node social/zernio.mjs get <경로>
 *       읽기 전용 조회 (예: get "/analytics?platform=instagram")
 *   node social/zernio.mjs status <postId>
 *       게시 상태 (draft · scheduled · published · failed)
 */
import { readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";

const REPO = join(import.meta.dirname, "..", "..", "..");
const API = "https://zernio.com/api/v1";

const env = Object.fromEntries(
  readFileSync(join(REPO, "apps/api/.env"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]),
);
const key = env.ZERNIO_KEY;
if (!key) {
  console.error("apps/api/.env 에 ZERNIO_KEY 가 없다");
  process.exit(1);
}

async function api(method, path, body) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${key}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 500) };
  }
  if (!response.ok && response.status !== 207) {
    throw new Error(`${method} ${path} → ${response.status} ${JSON.stringify(json).slice(0, 500)}`);
  }
  return { status: response.status, json };
}

const flag = (name) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};

async function accounts() {
  const { json } = await api("GET", "/accounts");
  return (json.accounts ?? []).map((a) => ({
    id: a._id ?? a.accountId ?? a.id,
    platform: a.platform,
    username: a.username,
    name: a.displayName,
    profileId: typeof a.profileId === "object" ? a.profileId?._id : a.profileId,
    active: a.isActive,
  }));
}

const [command, ...args] = process.argv.slice(2);

if (command === "accounts") {
  console.table(await accounts());
} else if (command === "get") {
  // 읽기 전용 조회 (예: get "/analytics?platform=instagram")
  const { json } = await api("GET", args[0]);
  console.log(JSON.stringify(json, null, 1));
} else if (command === "status") {
  const { json } = await api("GET", `/posts/${args[0]}`);
  const post = json.post ?? json;
  console.log(JSON.stringify({ status: post.status, scheduledFor: post.scheduledFor, platforms: post.platforms?.map((p) => ({ platform: p.platform, status: p.status, url: p.platformPostUrl ?? p.url, error: p.errorMessage ?? p.error })) }, null, 1));
} else if (command === "post") {
  const [video, captionFile] = args;
  const caption = readFileSync(captionFile, "utf8").trim();
  const size = statSync(video).size;
  const instagram = (await accounts()).filter((a) => a.platform === "instagram" && a.active !== false);
  const account = flag("--account") ? instagram.find((a) => a.id === flag("--account")) : instagram[0];
  if (!account) throw new Error("연결된 인스타그램 계정이 없다 (Zernio 대시보드에서 연결)");
  if (instagram.length > 1 && !flag("--account")) throw new Error(`인스타그램 계정이 여러 개다 — --account 로 고른다: ${instagram.map((a) => `${a.username}=${a.id}`).join(", ")}`);
  const at = flag("--at");
  const plan = {
    account: `@${account.username} (${account.id})`,
    video: `${basename(video)} (${(size / 1048576).toFixed(1)} MB)`,
    when: at ? `${at} ${flag("--tz") ?? "UTC"}` : "지금 바로",
    captionChars: caption.length,
    caption,
  };
  console.log(JSON.stringify(plan, null, 1));
  if (!process.argv.includes("--yes")) {
    console.log("\n(--yes 가 없어 올리지 않았다)");
    process.exit(0);
  }
  // 1) 업로드 주소 받기 → 2) 파일 올리기 → 3) 릴스 게시 (docs.zernio.com/guides/media-uploads)
  const { json: presign } = await api("POST", "/media/presign", { filename: basename(video), contentType: "video/mp4", size });
  const put = await fetch(presign.uploadUrl, { method: "PUT", headers: { "Content-Type": "video/mp4" }, body: readFileSync(video) });
  if (!put.ok) throw new Error(`업로드 실패 ${put.status}`);
  const { status, json } = await api("POST", "/posts", {
    content: caption,
    mediaItems: [{ type: "video", url: presign.publicUrl }],
    // contentType 을 빼면 릴스 (docs.zernio.com/platforms/instagram/fields)
    platforms: [{ platform: "instagram", accountId: account.id, platformSpecificData: { shareToFeed: true, thumbOffset: 0 } }],
    ...(at ? { scheduledFor: at, timezone: flag("--tz") ?? "UTC" } : { publishNow: true }),
  });
  const post = json.post ?? json;
  console.log(JSON.stringify({ http: status, postId: post._id ?? post.id ?? json.postId, status: post.status }, null, 1));
} else {
  console.error("usage: zernio.mjs accounts | post <video> <caption.txt> [--account id] [--at ISO --tz zone] [--yes] | status <postId>");
  process.exit(1);
}
