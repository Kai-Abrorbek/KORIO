/**
 * 펫 그림 굽기 — SVG(pets.ts) → WebP 320×320 (투명), 펫 4종 × 자라는 3단계 = 12장, 두 앱에 같이 넣는다.
 *
 *   루트에서:  npx tsx tools/pet-art/render.ts
 *
 * 나오는 곳: apps/telegram-app/public/pets/<id>_<단계>.webp, apps/mobile/assets/images/pets/<id>_<단계>.webp
 * 미리보기: tools/pet-art/out/sheet.png (커밋 안 함)
 *
 * 그림을 고치면 두 앱 다 다시 배포해야 한다 (텔레그램 = 서버 배포, 모바일 = OTA).
 */
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { PETS, petSvg, type PetId, type PetStage } from './pets';

const ROOT = join(__dirname, '..', '..');
const TARGETS = [join(ROOT, 'apps/telegram-app/public/pets'), join(ROOT, 'apps/mobile/assets/images/pets')];
const OUT = join(__dirname, 'out');
const SIZE = 320;

async function main() {
  for (const dir of [...TARGETS, OUT]) mkdirSync(dir, { recursive: true });
  const ids = Object.keys(PETS) as PetId[];
  const tiles: { input: Buffer; left: number; top: number }[] = [];
  for (const [row, id] of ids.entries()) {
    for (const stage of [0, 1, 2] as PetStage[]) {
      const svg = petSvg(id, stage, SIZE);
      const webp = await sharp(Buffer.from(svg)).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toBuffer();
      for (const dir of TARGETS) writeFileSync(join(dir, `${id}_${stage}.webp`), webp);
      console.log(`${id}_${stage}`, webp.length, 'bytes');
      tiles.push({ input: await sharp(Buffer.from(svg)).png().toBuffer(), left: stage * (SIZE + 10), top: row * (SIZE + 10) });
    }
  }
  await sharp({ create: { width: 3 * (SIZE + 10) - 10, height: ids.length * (SIZE + 10) - 10, channels: 4, background: '#E4DEFF' } })
    .composite(tiles)
    .png()
    .toFile(join(OUT, 'sheet.png'));
}
void main();
