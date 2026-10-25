#!/usr/bin/env node
/**
 * Zernio(https://docs.zernio.com) 로 만든 영상을 인스타그램 릴스로 올린다.
 * 키는 apps/api/.env 의 ZERNIO_KEY 에서 읽는다 (화면에 찍지 않는다).
 *
 *   node social/zernio.mjs accounts
 *       연결된 SNS 계정 목록 (읽기만)
 *   node social/zernio.mjs post <영상.mp4> <캡션.txt> [--cover <표지.png>] [--story] [--account <id>] [--at <ISO 시각> --tz Asia/Tashkent] [--yes]
 *       --yes 가 없으면 무엇을 올릴지 보여 주기만 한다. --at 이 없으면 바로 게시한다.
 *       --story 면 릴스 대신 스토리 (영상 60초 · 100MB 까지, 캡션·표지는 쓰이지 않는다)
 *   node social/zernio.mjs carousel <이미지 폴더> <캡션.txt> [--account <id>] [--yes]
 *       폴더의 01.png ~ 10.png (또는 jpg)를 번호 순서대로 인스타그램 캐러셀로 게시한다.
 *       --yes 가 없으면 계정, 이미지 순서, 캡션만 보여 준다.
 *   node social/zernio.mjs get <경로>
 *       읽기 전용 조회 (예: get "/analytics?platform=instagram")
 *   node social/zernio.mjs status <postId>
 *       게시 상태 (draft · scheduled · published · failed)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import { randomUUID } from "node:crypto";

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

async function api(method, path, body, extraHeaders = {}) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${key}`, ...(body ? { "Content-Type": "application/json" } : {}), ...extraHeaders },
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

/** 파일을 Zernio 저장소에 올리고 공개 주소를 받는다 (docs.zernio.com/guides/media-uploads) */
async function upload(file, contentType) {
  const { json: presign } = await api("POST", "/media/presign", { filename: basename(file), contentType, size: statSync(file).size });
  const put = await fetch(presign.uploadUrl, { method: "PUT", headers: { "Content-Type": contentType }, body: readFileSync(file) });
  if (!put.ok) throw new Error(`업로드 실패 ${basename(file)} ${put.status}`);
  return presign.publicUrl;
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
} else if (command === "carousel") {
  const [directory, captionFile] = args;
  if (!directory || !captionFile) throw new Error("carousel <이미지 폴더> <캡션.txt> 를 지정한다");
  const files = readdirSync(directory)
    .filter((file) => /^(?:0?[1-9]|10)\.(?:png|jpe?g)$/i.test(file))
    .sort((a, b) => Number(a.split(".")[0]) - Number(b.split(".")[0]));
  if (files.length < 2 || files.length > 10) throw new Error("캐러셀에는 2~10장의 번호 매긴 이미지가 필요하다");
  if (files.some((file, index) => Number(file.split(".")[0]) !== index + 1)) {
    throw new Error("이미지 번호는 01부터 빠짐없이 이어져야 한다");
  }
  for (const file of files) {
    if (statSync(join(directory, file)).size > 8 * 1024 * 1024) throw new Error(`${file}: 인스타그램 이미지 크기 8MB 초과`);
  }
  const caption = readFileSync(captionFile, "utf8").trim();
  if (!caption || caption.length > 2200) throw new Error("캡션은 1~2200자여야 한다");
  const instagram = (await accounts()).filter((a) => a.platform === "instagram" && a.active !== false);
  const account = flag("--account") ? instagram.find((a) => a.id === flag("--account")) : instagram[0];
  if (!account) throw new Error("연결된 인스타그램 계정이 없다");
  if (instagram.length > 1 && !flag("--account")) throw new Error(`인스타그램 계정이 여러 개다 — --account 로 고른다: ${instagram.map((a) => `${a.username}=${a.id}`).join(", ")}`);
  console.log(JSON.stringify({ account: `@${account.username} (${account.id})`, as: "캐러셀", images: files, when: "지금 바로", captionChars: caption.length, caption }, null, 1));
  if (!process.argv.includes("--yes")) {
    console.log("\n(--yes 가 없어 올리지 않았다)");
    process.exit(0);
  }
  const mediaItems = [];
  for (const file of files) {
    const type = /\.png$/i.test(file) ? "image/png" : "image/jpeg";
    mediaItems.push({ type: "image", url: await upload(join(directory, file), type) });
  }
  const { status, json } = await api("POST", "/posts", {
    content: caption,
    mediaItems,
    platforms: [{ platform: "instagram", accountId: account.id }],
    publishNow: true,
  }, { "x-request-id": randomUUID() });
  const post = json.post ?? json;
  console.log(JSON.stringify({ http: status, postId: post._id ?? post.id ?? json.postId, status: post.status, platforms: post.platforms?.map((p) => ({ platform: p.platform, status: p.status, url: p.platformPostUrl ?? p.url, error: p.errorMessage ?? p.error })) }, null, 1));
  if (post.status === "failed" || status === 207) process.exitCode = 1;
} else if (command === "post") {
  const [video, captionFile] = args;
  const caption = readFileSync(captionFile, "utf8").trim();
  const size = statSync(video).size;
  const instagram = (await accounts()).filter((a) => a.platform === "instagram" && a.active !== false);
  const account = flag("--account") ? instagram.find((a) => a.id === flag("--account")) : instagram[0];
  if (!account) throw new Error("연결된 인스타그램 계정이 없다 (Zernio 대시보드에서 연결)");
  if (instagram.length > 1 && !flag("--account")) throw new Error(`인스타그램 계정이 여러 개다 — --account 로 고른다: ${instagram.map((a) => `${a.username}=${a.id}`).join(", ")}`);
  const at = flag("--at");
  const story = process.argv.includes("--story");
  const cover = story ? undefined : flag("--cover");
  const plan = {
    account: `@${account.username} (${account.id})`,
    as: story ? "스토리" : "릴스",
    video: `${basename(video)} (${(size / 1048576).toFixed(1)} MB)`,
    cover: cover ? basename(cover) : "영상 첫 장면",
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
  const videoUrl = await upload(video, "video/mp4");
  // 표지 (social/covers/*.png) — 없으면 영상 첫 장면
  const coverUrl = cover ? await upload(cover, cover.endsWith(".png") ? "image/png" : "image/jpeg") : null;
  const { status, json } = await api("POST", "/posts", {
    content: caption,
    mediaItems: [{ type: "video", url: videoUrl }],
    // contentType 을 빼면 릴스 (docs.zernio.com/platforms/instagram/fields)
    platforms: [
      {
        platform: "instagram",
        accountId: account.id,
        platformSpecificData: story
          ? { contentType: "story" }
          : { shareToFeed: true, ...(coverUrl ? { instagramThumbnail: coverUrl } : { thumbOffset: 0 }) },
      },
    ],
    ...(at ? { scheduledFor: at, timezone: flag("--tz") ?? "UTC" } : { publishNow: true }),
  });
  const post = json.post ?? json;
  console.log(JSON.stringify({ http: status, postId: post._id ?? post.id ?? json.postId, status: post.status }, null, 1));
} else {
  console.error("usage: zernio.mjs accounts | carousel <image-dir> <caption.txt> [--account id] [--yes] | post <video> <caption.txt> [--cover png] [--story] [--account id] [--at ISO --tz zone] [--yes] | status <postId>");
  process.exit(1);
}
