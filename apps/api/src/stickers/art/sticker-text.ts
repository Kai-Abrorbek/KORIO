import { GLYPHS, GLYPH_UPM } from './sticker-glyphs';

/**
 * 스티커 글씨 — 글자를 path 로 하나씩 놓는다. 글자마다 기울기·높낮이를 줘서 통통 튀게.
 * 진한 테두리 → 위아래 그라데이션 채우기 → 윗부분 광택 순으로 쌓는다.
 */
export interface CaptionStyle {
  /** 글자 크기(px, 512 캔버스 기준) */
  size: number;
  /** 위 → 아래 */
  fill: [string, string];
  /** 글자 테두리 색 */
  stroke: string;
  /** 테두리 두께(px) */
  strokeWidth?: number;
  /** 글자 사이 (px) */
  tracking?: number;
  /** 글자별 기울기(도) — 모자라면 0 */
  tilt?: number[];
  /** 글자별 위아래(px) — 모자라면 0 */
  bounce?: number[];
  /** 글자별 크기 배율 */
  scale?: number[];
}

export function hasGlyphs(text: string) {
  return [...text].every((ch) => ch in GLYPHS);
}

export function captionWidth(text: string, style: CaptionStyle) {
  const k = style.size / GLYPH_UPM;
  const chars = [...text];
  return (
    chars.reduce(
      (sum, ch, i) => sum + (GLYPHS[ch]?.w ?? 0) * k * (style.scale?.[i] ?? 1),
      0,
    ) +
    (style.tracking ?? 0) * Math.max(0, chars.length - 1)
  );
}

/**
 * 가운데 (x, 기준선 y) 에 글씨. id 는 그라데이션 이름이 겹치지 않게.
 */
export function caption(
  id: string,
  text: string,
  x: number,
  y: number,
  style: CaptionStyle,
  rotate = 0,
): string {
  const k = style.size / GLYPH_UPM;
  const chars = [...text];
  const total = captionWidth(text, style);
  const strokeWidth = style.strokeWidth ?? style.size * 0.16;
  let cursor = x - total / 2;
  const glyphs: string[] = [];
  chars.forEach((ch, i) => {
    const glyph = GLYPHS[ch];
    if (!glyph) return;
    const s = style.scale?.[i] ?? 1;
    const w = glyph.w * k * s;
    if (glyph.d) {
      // 글자 가운데를 축으로 기울인다 (기준선 위 0.36em 쯤이 글자 가운데)
      const cx = cursor + w / 2;
      const cy = y - style.size * s * 0.36 + (style.bounce?.[i] ?? 0);
      const ks = k * s;
      const t = `translate(${r(cx)} ${r(cy)}) rotate(${style.tilt?.[i] ?? 0}) scale(${ks.toFixed(4)}) translate(${r(-glyph.w / 2)} ${r(GLYPH_UPM * 0.36)})`;
      const sw = r(strokeWidth / ks);
      glyphs.push(
        `<g transform="${t}">` +
          `<path d="${glyph.d}" fill="${style.stroke}" stroke="${style.stroke}" stroke-linejoin="round" stroke-width="${sw}"/>` +
          `<path d="${glyph.d}" fill="url(#${id}f)"/>` +
          `<path d="${glyph.d}" fill="url(#${id}g)"/>` +
          `</g>`,
      );
    }
    cursor += w + (style.tracking ?? 0);
  });
  const defs =
    `<defs>` +
    `<linearGradient id="${id}f" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${style.fill[0]}"/><stop offset="1" stop-color="${style.fill[1]}"/></linearGradient>` +
    `<linearGradient id="${id}g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".42" stop-color="#fff" stop-opacity=".12"/><stop offset=".43" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
    `</defs>`;
  const body = glyphs.join('');
  return rotate
    ? `${defs}<g transform="rotate(${rotate} ${r(x)} ${r(y)})">${body}</g>`
    : `${defs}<g>${body}</g>`;
}

const r = (n: number) => Math.round(n * 10) / 10;
