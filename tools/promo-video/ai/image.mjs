#!/usr/bin/env node
/**
 * 영상에 쓸 실사 장면 사진을 만든다 (OpenAI gpt-image · Google Gemini 이미지).
 * 키는 apps/api/.env 의 OPENAI_API_KEY · GOOGLE_API_KEY 에서 읽는다 (화면에 찍지 않는다).
 * 결과는 public/ai/ 아래에 둔다 — 다시 만들려면 돈이 드니 지우지 않는다 (git 에는 안 올린다).
 *
 *   node ai/image.mjs <프롬프트.txt> <결과.png> [--model gpt-image-2 | gemini-3-pro-image] [--ref <참고.png> ...] [--transparent] [--size 1024x1024]
 *       --ref 를 주면 같은 인물 · 같은 장소를 이어 가도록 참고 사진으로 넘긴다.
 *       --transparent 는 배경 없는 스티커 (gpt-image 만)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const REPO = join(import.meta.dirname, "..", "..", "..");
const env = Object.fromEntries(
  readFileSync(join(REPO, "apps/api/.env"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]),
);

const [promptFile, outFile] = process.argv.slice(2);
if (!promptFile || !outFile) {
  console.error("usage: image.mjs <prompt.txt> <out.png> [--model gpt-image-2|gemini-3-pro-image] [--ref img.png ...]");
  process.exit(1);
}
const flag = (name) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const refs = process.argv.flatMap((arg, i) => (arg === "--ref" ? [process.argv[i + 1]] : []));
const model = flag("--model") ?? "gpt-image-2";
const size = flag("--size") ?? "1024x1536";
const background = process.argv.includes("--transparent") ? "transparent" : undefined;
// 같은 장면을 이어 붙일 공통 설명 (prompts/_style.txt) + 장면별 설명
const style = readFileSync(join(dirname(promptFile), "_style.txt"), "utf8").trim();
const prompt = `${style}\n\n${readFileSync(promptFile, "utf8").trim()}`;

async function openai() {
  let response;
  if (refs.length) {
    const form = new FormData();
    form.set("model", model);
    form.set("prompt", prompt);
    form.set("size", size);
    form.set("quality", "high");
    if (background) form.set("background", background);
    for (const ref of refs) form.append("image[]", new Blob([readFileSync(ref)], { type: "image/png" }), basename(ref));
    response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}` },
      body: form,
    });
  } else {
    response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, size, quality: "high", n: 1, ...(background ? { background, output_format: "png" } : {}) }),
    });
  }
  const json = await response.json();
  if (!response.ok) throw new Error(`${model} → ${response.status} ${JSON.stringify(json.error ?? json).slice(0, 400)}`);
  return Buffer.from(json.data[0].b64_json, "base64");
}

async function gemini() {
  const parts = [
    { text: prompt },
    ...refs.map((ref) => ({ inline_data: { mime_type: "image/png", data: readFileSync(ref).toString("base64") } })),
  ];
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "x-goog-api-key": env.GOOGLE_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "9:16", imageSize: "2K" } },
    }),
  });
  const json = await response.json();
  if (!response.ok) throw new Error(`${model} → ${response.status} ${JSON.stringify(json.error ?? json).slice(0, 400)}`);
  const image = json.candidates?.[0]?.content?.parts?.find((part) => part.inlineData ?? part.inline_data);
  if (!image) throw new Error(`${model}: 사진이 오지 않았다 (${json.candidates?.[0]?.finishReason ?? "이유 없음"})`);
  return Buffer.from((image.inlineData ?? image.inline_data).data, "base64");
}

const started = Date.now();
const png = model.startsWith("gemini") ? await gemini() : await openai();
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, png);
console.log(`${outFile} (${model}, ${(png.length / 1048576).toFixed(1)} MB, ${Math.round((Date.now() - started) / 1000)}s)`);
