import glyphData from './glyphs.json';

/** 장면 그림 공용 도구 — 캔버스 1200×1000, 캐릭터는 가운데(x 420~780), 발은 y≈900 */
export const W = 1200;
export const H = 1000;

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export function lg(id: string, stops: [number, string, number?][], x1 = 0, y1 = 0, x2 = 0, y2 = 1) {
  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops
    .map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? '' : ` stop-opacity="${a}"`}/>`)
    .join('')}</linearGradient>`;
}

export function rg(id: string, stops: [number, string, number?][], cx = 0.5, cy = 0.5, r = 0.5) {
  return `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops
    .map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? '' : ` stop-opacity="${a}"`}/>`)
    .join('')}</radialGradient>`;
}

/** 별 — 작은 점 + 몇 개는 네 갈래 반짝이 (정지) */
export function stars(seed: number, n: number, yMax: number, avoid?: (x: number, y: number) => boolean) {
  const rand = rng(seed);
  const out: string[] = [];
  let made = 0;
  let guard = 0;
  while (made < n && guard < n * 20) {
    guard += 1;
    const x = rand() * W;
    const y = rand() * yMax;
    if (avoid?.(x, y)) continue;
    const s = rand();
    made += 1;
    if (s > 0.92) {
      const k = 7 + rand() * 6;
      out.push(
        `<path d="M${r1(x)} ${r1(y - k)} Q${r1(x + k * 0.15)} ${r1(y - k * 0.15)} ${r1(x + k)} ${r1(y)} Q${r1(x + k * 0.15)} ${r1(y + k * 0.15)} ${r1(x)} ${r1(y + k)} Q${r1(x - k * 0.15)} ${r1(y + k * 0.15)} ${r1(x - k)} ${r1(y)} Q${r1(x - k * 0.15)} ${r1(y - k * 0.15)} ${r1(x)} ${r1(y - k)} Z" fill="#fff" opacity="${r1(0.7 + rand() * 0.3)}"/>`,
      );
    } else {
      out.push(`<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(1 + s * 2.2)}" fill="#fff" opacity="${r1(0.35 + rand() * 0.6)}"/>`);
    }
  }
  return out.join('');
}

/** 불 켜진 창 — 사각 안에 격자로, 일부만 켜짐 */
export function windows(
  seed: number,
  x: number,
  y: number,
  w: number,
  h: number,
  opts: { cw?: number; ch?: number; gap?: number; on?: number; color?: string; off?: string } = {},
) {
  const { cw = 10, ch = 12, gap = 8, on = 0.55, color = '#FFD27A', off = '#000' } = opts;
  const rand = rng(seed);
  const out: string[] = [];
  for (let yy = y + gap; yy + ch <= y + h - gap / 2; yy += ch + gap) {
    for (let xx = x + gap; xx + cw <= x + w - gap / 2; xx += cw + gap) {
      const lit = rand() < on;
      out.push(
        `<rect x="${r1(xx)}" y="${r1(yy)}" width="${cw}" height="${ch}" rx="1.5" fill="${lit ? color : off}" opacity="${lit ? r1(0.65 + rand() * 0.35) : 0.18}"/>`,
      );
    }
  }
  return out.join('');
}

const G = glyphData as { upm: number; glyphs: Record<string, { d: string; w: number }> };

/** 한글 글자(Jua 윤곽) — 가운데 정렬, y 는 기준선 */
export function hangul(text: string, cx: number, y: number, size: number, attrs: string) {
  const k = size / G.upm;
  const total = [...text].reduce((s, ch) => s + (G.glyphs[ch]?.w ?? 300) * k, 0);
  let cursor = cx - total / 2;
  const out: string[] = [];
  for (const ch of text) {
    const g = G.glyphs[ch];
    if (g) out.push(`<path transform="translate(${r1(cursor)} ${r1(y)}) scale(${k.toFixed(4)})" d="${g.d}" ${attrs}/>`);
    cursor += (g?.w ?? 300) * k;
  }
  return out.join('');
}

export function svg(defs: string, body: string, size = { w: W, h: H }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.w}" height="${size.h}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs>${defs}</defs>${body}</svg>`;
}
