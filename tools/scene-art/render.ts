/**
 * 배경 장면 그림 굽기 — SVG(scenes.ts) → WebP 1200×1000, 두 앱에 같이 넣는다.
 *
 *   루트에서:  npx tsx tools/scene-art/render.ts            (전부)
 *             npx tsx tools/scene-art/render.ts scene_jeju (하나만)
 *
 * 나오는 곳: apps/telegram-app/public/scenes/<id>.webp, apps/mobile/assets/images/scenes/<id>.webp
 * 미리보기: tools/scene-art/out/sheet.png (캐릭터를 얹은 6장 — 커밋 안 함)
 *
 * 그림을 고치면 두 앱 다 다시 배포해야 한다 (텔레그램 = 서버 배포, 모바일 = OTA).
 */
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { avatarSvg } from '../../apps/api/src/stickers/art/sticker-avatar';
import { SCENES, sceneSvg, type SceneId } from './scenes';

const ROOT = join(__dirname, '..', '..');
const TARGETS = [join(ROOT, 'apps/telegram-app/public/scenes'), join(ROOT, 'apps/mobile/assets/images/scenes')];
const OUT = join(__dirname, 'out');

const ids = (process.argv[2] ? process.argv[2].split(',') : Object.keys(SCENES)) as SceneId[];

async function main() {
  for (const dir of [...TARGETS, OUT]) mkdirSync(dir, { recursive: true });
  const tiles: { input: Buffer; left: number; top: number }[] = [];
  for (const [i, id] of ids.entries()) {
    const raw = sceneSvg(id);
    const webp = await sharp(Buffer.from(raw)).webp({ quality: 84, effort: 5 }).toBuffer();
    for (const dir of TARGETS) writeFileSync(join(dir, `${id}.webp`), webp);
    // 캐릭터를 얹은 미리보기 (프로필 히어로 비율) — 발이 그림의 땅(y≈900)에 닿는지 본다
    const avatar = avatarSvg({ hairstyle: 'hair_wave', outfit: 'outfit_hoodie' }, { face: 'thanks', arms: 'down' });
    const withAvatar = raw.replace('</svg>', `<g transform="translate(298 218) scale(1.888)">${avatar}</g></svg>`);
    const png = await sharp(Buffer.from(withAvatar)).resize(600, 500).png().toBuffer();
    console.log(id, webp.length, 'bytes');
    tiles.push({ input: png, left: (i % 3) * 610, top: Math.floor(i / 3) * 510 });
  }
  const rows = Math.ceil(ids.length / 3);
  await sharp({
    create: { width: Math.min(ids.length, 3) * 610 - 10, height: rows * 510 - 10, channels: 4, background: '#ffffff' },
  })
    .composite(tiles)
    .png()
    .toFile(join(OUT, 'sheet.png'));
}
void main();
