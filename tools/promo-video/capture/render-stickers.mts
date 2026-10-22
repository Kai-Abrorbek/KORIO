/**
 * 스티커 장면 데이터 — 서버와 같은 그리기 엔진(api stickers/art)으로 Aziz 캐릭터 스티커 8장을 그린다.
 * 촬영 때 /stickers/preview 가짜 응답으로 쓴다 (frames/sticker-preview.json, 커밋하지 않는다).
 *
 *   pnpm exec tsx tools/promo-video/capture/render-stickers.mts   (저장소 루트에서)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { STICKER_DESIGNS, stickerSvg } from "../../../apps/api/src/stickers/art/sticker-designs";
import { stickerAvatarKey, stickerAvatarOf } from "../../../apps/api/src/stickers/sticker-renderer";
import { STICKER_PREVIEW_SIZE } from "../../../apps/api/src/stickers/stickers.const";
import { AVATAR } from "./mocks.mjs";

const avatar = stickerAvatarOf(AVATAR);
const stickers = await Promise.all(
  STICKER_DESIGNS.map(async (design) => {
    const webp = await sharp(Buffer.from(stickerSvg(avatar, design, STICKER_PREVIEW_SIZE)))
      .webp({ quality: 86, alphaQuality: 90, effort: 4 })
      .toBuffer();
    return { id: design.id, text: design.text, image: `data:image/webp;base64,${webp.toString("base64")}` };
  }),
);
const out = join(import.meta.dirname, "..", "frames");
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "sticker-preview.json"), JSON.stringify({ avatarKey: stickerAvatarKey(avatar), stickers }));
console.log(`✓ ${stickers.length} stickers → frames/sticker-preview.json`);
