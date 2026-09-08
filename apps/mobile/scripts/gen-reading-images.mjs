#!/usr/bin/env node
/**
 * 읽기 레슨 이미지 맵을 폴더에서 그대로 만든다.
 *
 *   node scripts/gen-reading-images.mjs        (= pnpm --filter mobile gen:reading-images)
 *
 * ── 사진 추가하는 법 ──
 * 1. assets/images/reading-listening/lessons/ 에 `<레슨 code>.webp` 를 넣는다
 *    (code 는 서버 시드가 정한다: culture-reading-1-07, culture-reading-3-02 …)
 * 2. 이 스크립트를 돌린다
 * 3. 끝. 시드도 서버 배포도 필요 없다
 *
 * 왜 스크립트가 필요한가: Metro 는 `require()` 안에 변수를 못 넣는다.
 * 번들에 들어가려면 경로가 코드에 글자로 박혀 있어야 해서, 폴더를 훑어
 * 그 목록을 파일로 적어 준다.
 */
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const imageDir = join(root, 'assets/images/reading-listening/lessons');
const outFile = join(root, 'src/features/reading-listening/reading-listening.assets.ts');

const ALLOWED = new Set(['.webp', '.png', '.jpg', '.jpeg']);
/** 시드가 만드는 code 모양. 여기서 안 맞으면 서버가 절대 못 찾는다 */
const CODE_SHAPE = /^culture-reading-[1-6]-\d{2}$/;

if (!existsSync(imageDir)) {
  console.error(`❌ 폴더가 없다: ${imageDir}`);
  process.exit(1);
}

const entries = [];
const skipped = [];

for (const file of readdirSync(imageDir).sort()) {
  const ext = extname(file).toLowerCase();
  if (file.startsWith('.') || !ALLOWED.has(ext)) continue;

  const code = basename(file, extname(file));
  if (!CODE_SHAPE.test(code)) {
    skipped.push(file);
    continue;
  }
  entries.push([code, file]);
}

// 같은 code 로 확장자만 다른 파일이 둘 있으면 하나만 써야 한다
const seen = new Map();
const duplicates = [];
for (const [code, file] of entries) {
  if (seen.has(code)) duplicates.push(`${seen.get(code)} ↔ ${file}`);
  else seen.set(code, file);
}

const lines = [...seen.entries()].map(
  ([code, file]) =>
    `  "${code}": require("../../../assets/images/reading-listening/lessons/${file}"),`,
);

const body = `/**
 * ⚠️ 자동 생성 파일. 직접 고치지 마라 — 다음 생성 때 통째로 덮인다.
 *
 * 만든이: apps/mobile/scripts/gen-reading-images.mjs
 * 다시 만들기: pnpm --filter mobile gen:reading-images
 *
 * 사진 추가: assets/images/reading-listening/lessons/ 에 <레슨 code>.webp 를
 * 넣고 위 명령을 돌린다. 여기 없는 레슨은 화면이 주제별 플레이스홀더를 그린다.
 */
export const READING_LESSON_IMAGES: Record<string, number> = {
${lines.join('\n')}${lines.length ? '\n' : ''}};

/** 지금 사진이 들어 있는 레슨 수 */
export const READING_LESSON_IMAGE_COUNT = ${seen.size};
`;

writeFileSync(outFile, body, 'utf8');

console.log(`✅ 레슨 이미지 ${seen.size}개 → src/features/reading-listening/reading-listening.assets.ts`);
if (skipped.length) {
  console.log(
    `⚠️ 이름이 레슨 code 모양이 아니라 건너뛴 파일 ${skipped.length}개: ${skipped.join(', ')}`,
  );
  console.log('   (culture-reading-<급>-<두자리>.webp 이어야 한다)');
}
if (duplicates.length) {
  console.log(`⚠️ 같은 레슨에 파일이 둘: ${duplicates.join(', ')} — 앞의 것만 쓴다`);
}
