import { Injectable, Logger } from '@nestjs/common';
import { createHash } from 'crypto';
import type { AvatarLike } from './art/sticker-avatar';
import { STICKER_DESIGNS, stickerSvg } from './art/sticker-designs';
import { STICKER_ART_VERSION, STICKER_PREVIEW_SIZE } from './stickers.const';

type Sharp = typeof import('sharp');

/** 스티커 그림에 영향을 주는 캐릭터 값 (오라·배경·기본 표정은 안 그린다) */
const ART_FIELDS = [
  'skinTone',
  'bodyShape',
  'eyeColor',
  'hairstyle',
  'hairColor',
  'eyewear',
  'facialHair',
  'headwear',
  'outfit',
] as const;

/** 캐릭터 지문 — 같으면 같은 스티커가 나온다. 바뀌면 "다시 만들기" 를 연다 */
export function stickerAvatarKey(
  avatar: AvatarLike | null | undefined,
): string {
  const a = avatar ?? {};
  const raw = ART_FIELDS.map((field) => `${field}=${a[field] ?? ''}`).join('&');
  return createHash('sha1')
    .update(`v${STICKER_ART_VERSION}|${raw}`)
    .digest('hex')
    .slice(0, 16);
}

/** avatar 문서에서 그림에 쓰는 문자열 값만 */
export function stickerAvatarOf(avatar: unknown): AvatarLike {
  const source = (avatar ?? {}) as Record<string, unknown>;
  const out: AvatarLike = {};
  for (const field of ART_FIELDS) {
    const value = source[field];
    if (typeof value === 'string') out[field] = value;
  }
  return out;
}

/**
 * SVG → PNG/WebP. sharp(libvips + librsvg)로 그린다. 글자는 path 라 글꼴이 필요 없다.
 *
 * sharp 는 **처음 쓸 때** 불러온다 — 설치가 덜 된 개발 PC 에서도 서버는 뜨고
 * 스티커 기능만 꺼진다 (available=false → 503).
 */
@Injectable()
export class StickerRenderer {
  private readonly logger = new Logger(StickerRenderer.name);
  private sharp?: Promise<Sharp | null>;
  /** 미리보기 캐시 — 같은 캐릭터를 다시 열면 바로 */
  private readonly previews = new Map<string, string[]>();

  private load(): Promise<Sharp | null> {
    this.sharp ??= import('sharp')
      .then((mod) => ((mod as { default?: Sharp }).default ?? mod) as Sharp)
      .catch((error: unknown) => {
        this.logger.error(
          `sharp 를 못 불러왔다 — 스티커 기능이 꺼진다: ${String(error)}`,
        );
        return null;
      });
    return this.sharp;
  }

  async available(): Promise<boolean> {
    return (await this.load()) !== null;
  }

  private async engine(): Promise<Sharp> {
    const sharp = await this.load();
    if (!sharp) throw new Error('STICKER_RENDERER_UNAVAILABLE');
    return sharp;
  }

  /** 텔레그램에 올릴 8장 (512×512 PNG, 세트 순서 그대로) */
  async renderPack(avatar: AvatarLike): Promise<Buffer[]> {
    const sharp = await this.engine();
    return Promise.all(
      STICKER_DESIGNS.map((design) =>
        sharp(Buffer.from(stickerSvg(avatar, design, 512)))
          .png({ compressionLevel: 9 })
          .toBuffer(),
      ),
    );
  }

  /** 앱 미리보기 — data URL(WebP) 8장 */
  async preview(avatar: AvatarLike): Promise<string[]> {
    const key = stickerAvatarKey(avatar);
    const cached = this.previews.get(key);
    if (cached) {
      // 최근에 본 걸 뒤로 (가장 오래된 것부터 버린다)
      this.previews.delete(key);
      this.previews.set(key, cached);
      return cached;
    }
    const sharp = await this.engine();
    const images = await Promise.all(
      STICKER_DESIGNS.map(async (design) => {
        const webp = await sharp(
          Buffer.from(stickerSvg(avatar, design, STICKER_PREVIEW_SIZE)),
        )
          .webp({ quality: 86, alphaQuality: 90, effort: 4 })
          .toBuffer();
        return `data:image/webp;base64,${webp.toString('base64')}`;
      }),
    );
    this.previews.set(key, images);
    while (this.previews.size > 64) {
      const [oldest] = this.previews.keys();
      if (oldest === undefined) break;
      this.previews.delete(oldest);
    }
    return images;
  }
}
