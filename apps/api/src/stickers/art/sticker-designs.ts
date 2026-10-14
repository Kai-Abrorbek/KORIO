import {
  avatarSvg,
  heartPath,
  type AvatarLike,
  type StickerPose,
} from './sticker-avatar';
import { caption, type CaptionStyle } from './sticker-text';

/**
 * 스티커팩 8장 — 표정·자세·한국어 한마디·장식.
 *
 * 순서가 곧 텔레그램 세트 안의 순서다. 다시 만들 때(replaceStickerInSet) 같은 칸끼리 바꾸므로
 * **순서를 바꾸거나 중간에 끼우지 마라** — 새 스티커는 맨 뒤에 붙인다.
 */
export interface StickerDesign {
  id: string;
  /** 스티커에 박히는 한국어 */
  text: string;
  /** 텔레그램이 이 스티커를 추천할 이모지 (1~20개) */
  emoji: string[];
  /** 검색어 (합쳐서 64자 이내) */
  keywords: string[];
  pose: StickerPose;
  /** 캐릭터 놓는 자리: 512 캔버스 기준 왼쪽 위, 배율, 기울기 */
  place: { x: number; y: number; scale: number; tilt?: number };
  /** 캐릭터 뒤 장식 */
  back?: string;
  /** 캐릭터 앞 장식 */
  front?: string;
  captions: {
    text: string;
    x: number;
    y: number;
    rotate?: number;
    style: CaptionStyle;
  }[];
}

const sparkle = (x: number, y: number, s: number, fill: string) =>
  `<path d="M${x} ${y - s} Q${x + s * 0.16} ${y - s * 0.16} ${x + s} ${y} Q${x + s * 0.16} ${y + s * 0.16} ${x} ${y + s} Q${x - s * 0.16} ${y + s * 0.16} ${x - s} ${y} Q${x - s * 0.16} ${y - s * 0.16} ${x} ${y - s} Z" fill="${fill}"/>`;

const heart = (x: number, y: number, s: number, fill: string, rotate = 0) =>
  `<path d="${heartPath(x, y, s)}" fill="${fill}" transform="rotate(${rotate} ${x} ${y})"/><ellipse cx="${x - s * 0.45}" cy="${y - s * 0.15}" fill="#fff" opacity=".7" rx="${s * 0.16}" ry="${s * 0.26}" transform="rotate(${rotate - 30} ${x - s * 0.45} ${y - s * 0.15})"/>`;

/** 별 터짐 (대박 뒤) */
function burst(
  cx: number,
  cy: number,
  r1: number,
  r2: number,
  n: number,
  fill: string,
) {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i += 1) {
    const a = (Math.PI * i) / n - Math.PI / 2;
    const rr = i % 2 === 0 ? r1 : r2;
    pts.push(
      `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`,
    );
  }
  return `<polygon fill="${fill}" points="${pts.join(' ')}" stroke-linejoin="round"/>`;
}

const flower = (
  x: number,
  y: number,
  s: number,
  petal: string,
  center: string,
) =>
  `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288]
    .map(
      (a) =>
        `<ellipse cx="0" cy="${-s * 0.62}" fill="${petal}" rx="${s * 0.42}" ry="${s * 0.6}" transform="rotate(${a})"/>`,
    )
    .join('')}<circle fill="${center}" r="${s * 0.36}"/></g>`;

const KK: CaptionStyle = {
  size: 128,
  fill: ['#FFF07A', '#FFB020'],
  stroke: '#5B3600',
  tilt: [-12, 6, -4],
  bounce: [6, -10, 4],
  tracking: -8,
};

export const STICKER_DESIGNS: StickerDesign[] = [
  {
    id: 'kkk',
    text: 'ㅋㅋㅋ',
    emoji: ['😂', '🤣'],
    keywords: ['ㅋㅋㅋ', 'kkk', 'lol', 'haha', 'kulgi'],
    pose: { face: 'laugh', arms: 'belly' },
    place: { x: 92, y: 118, scale: 1.08, tilt: -9 },
    back:
      `<g opacity=".9"><path d="M40 268 l26 -6 M34 300 l30 2 M44 332 l24 10" stroke="#FFC83D" stroke-linecap="round" stroke-width="9"/>` +
      `<path d="M470 252 l-26 -8 M478 288 l-30 0 M468 322 l-24 10" stroke="#FFC83D" stroke-linecap="round" stroke-width="9"/></g>`,
    captions: [
      { text: 'ㅋㅋㅋ', x: 256, y: 122, style: KK },
      {
        text: 'ㅋ',
        x: 70,
        y: 430,
        rotate: -18,
        style: { ...KK, size: 70, tilt: [], bounce: [] },
      },
      {
        text: 'ㅋ',
        x: 448,
        y: 404,
        rotate: 16,
        style: { ...KK, size: 58, tilt: [], bounce: [] },
      },
    ],
  },
  {
    id: 'daebak',
    text: '대박',
    emoji: ['🤩', '😲'],
    keywords: ['대박', 'daebak', 'wow', 'zo‘r', 'amazing'],
    pose: { face: 'wow', arms: 'bothUp' },
    place: { x: 72, y: 4, scale: 1.15 },
    back:
      burst(256, 236, 214, 168, 14, '#FFE38A') +
      burst(256, 236, 176, 140, 14, '#FFF3C4'),
    front:
      sparkle(60, 70, 22, '#FFD43B') +
      sparkle(462, 96, 26, '#FFD43B') +
      sparkle(36, 196, 13, '#FFE58F') +
      sparkle(480, 220, 15, '#FFE58F') +
      sparkle(440, 30, 11, '#FFE58F'),
    captions: [
      {
        text: '대박!',
        x: 256,
        y: 468,
        rotate: -4,
        style: {
          size: 132,
          fill: ['#FFF59E', '#FF9F1C'],
          stroke: '#6A2C00',
          tilt: [-6, 4, 12],
          bounce: [4, -6, -2],
          tracking: -2,
          scale: [1, 1, 0.92],
        },
      },
    ],
  },
  {
    id: 'fighting',
    text: '화이팅',
    emoji: ['💪', '🔥'],
    keywords: ['화이팅', 'hwaiting', 'fighting', 'omad', 'go'],
    pose: { face: 'fight', arms: 'fistUp' },
    place: { x: 56, y: 6, scale: 1.12, tilt: 4 },
    back:
      `<g opacity=".95" transform="translate(-30 0)"><path d="M470 118 q-30 -26 -8 -66 q4 28 26 30 q-2 -26 16 -40 q-6 34 10 50 q12 26 -14 40 Z" fill="#FF7A00"/><path d="M474 120 q-16 -14 -4 -36 q6 16 18 16 q4 14 -14 20 Z" fill="#FFD43B"/></g>` +
      `<g stroke="#FF8A3D" stroke-linecap="round" stroke-width="8" opacity=".75"><path d="M28 120 h52"/><path d="M18 156 h70"/><path d="M34 192 h46"/></g>`,
    captions: [
      {
        text: '화이팅!',
        x: 250,
        y: 472,
        rotate: -8,
        style: {
          size: 112,
          fill: ['#FFB36B', '#FF3B30'],
          stroke: '#5E0A0A',
          tilt: [-4, 2, -2, 10],
          bounce: [6, 0, -6, -10],
          tracking: -4,
          scale: [1, 1, 1, 1.05],
        },
      },
    ],
  },
  {
    id: 'heol',
    text: '헐',
    emoji: ['😱', '😨'],
    keywords: ['헐', 'heol', 'omg', 'voy', 'shock'],
    pose: { face: 'shock', arms: 'cheeks' },
    place: { x: 104, y: 100, scale: 1.1 },
    back: `<g stroke="#8F9BFF" stroke-linecap="round" stroke-width="7" opacity=".85"><path d="M78 232 q-14 20 0 40 q14 20 0 40"/><path d="M448 232 q14 20 0 40 q-14 20 0 40"/></g>`,
    captions: [
      {
        text: '헐',
        x: 128,
        y: 150,
        rotate: -10,
        style: { size: 150, fill: ['#C9CFFF', '#5B6CFF'], stroke: '#1C2366' },
      },
      {
        text: '!?',
        x: 250,
        y: 116,
        rotate: 12,
        style: {
          size: 84,
          fill: ['#C9CFFF', '#5B6CFF'],
          stroke: '#1C2366',
          tilt: [-6, 10],
          bounce: [0, -8],
        },
      },
    ],
  },
  {
    id: 'thanks',
    text: '고마워',
    emoji: ['🥰', '🙏'],
    keywords: ['고마워', 'gomawo', 'thanks', 'rahmat', 'spasibo'],
    pose: { face: 'thanks', arms: 'clasp' },
    place: { x: 74, y: 6, scale: 1.14 },
    back:
      flower(64, 92, 26, '#FFC2D4', '#FFD43B') +
      flower(452, 70, 22, '#FFD6E2', '#FFB020') +
      flower(470, 250, 16, '#FFC2D4', '#FFD43B'),
    front:
      heart(84, 236, 20, '#FF6F9F', -14) + heart(440, 168, 16, '#FF8FB3', 12),
    captions: [
      {
        text: '고마워',
        x: 256,
        y: 474,
        rotate: -3,
        style: {
          size: 114,
          fill: ['#FFD6E2', '#FF5C8A'],
          stroke: '#6E1238',
          tilt: [-6, 4, -2],
          bounce: [0, -8, 2],
          tracking: -2,
        },
      },
    ],
  },
  {
    id: 'love',
    text: '사랑해',
    emoji: ['❤️', '😍', '🥰'],
    keywords: ['사랑해', 'saranghae', 'love', 'sevaman', 'lyublyu'],
    pose: { face: 'love', arms: 'fingerHeart' },
    place: { x: 70, y: 110, scale: 1.08, tilt: -4 },
    front:
      heart(410, 196, 34, '#FF3355', 14) +
      heart(456, 128, 18, '#FF6F8A', 22) +
      heart(52, 290, 18, '#FF6F8A', -18) +
      heart(80, 230, 11, '#FF8FA3', -10),
    captions: [
      {
        text: '사랑해',
        x: 248,
        y: 124,
        rotate: -6,
        style: {
          size: 120,
          fill: ['#FFC2CD', '#FF2E55'],
          stroke: '#5C0A24',
          tilt: [-8, 0, 8],
          bounce: [6, -4, 0],
          tracking: -4,
        },
      },
    ],
  },
  {
    id: 'hungry',
    text: '배고파',
    emoji: ['🤤', '🍚'],
    keywords: ['배고파', 'baegopa', 'hungry', 'och', 'golodny'],
    pose: { face: 'hungry', arms: 'spoon' },
    place: { x: 60, y: 8, scale: 1.12 },
    back:
      // 밥그릇 + 김
      `<g transform="translate(64 92)"><path d="M-14 -30 q-10 -14 0 -26 q10 -12 0 -24" fill="none" stroke="#C9CDD8" stroke-linecap="round" stroke-width="6"/><path d="M8 -30 q-10 -14 0 -26 q10 -12 0 -24" fill="none" stroke="#C9CDD8" stroke-linecap="round" stroke-width="6"/>` +
      `<ellipse cx="0" cy="-2" fill="#fff" rx="46" ry="26"/><circle cx="-24" cy="-10" fill="#fff" r="16"/><circle cx="0" cy="-18" fill="#fff" r="18"/><circle cx="24" cy="-10" fill="#fff" r="16"/>` +
      `<path d="M-50 0 H50 Q46 46 0 48 Q-46 46 -50 0 Z" fill="#E4564A"/><path d="M-44 12 H44" stroke="#fff" stroke-dasharray="6 8" stroke-linecap="round" stroke-width="4" opacity=".7"/></g>`,
    captions: [
      {
        text: '꼬르륵',
        x: 418,
        y: 352,
        rotate: 10,
        style: {
          size: 46,
          fill: ['#FFE7B8', '#FFB347'],
          stroke: '#6B3A00',
          tilt: [-8, 6, -4],
          bounce: [0, 6, -2],
        },
      },
      {
        text: '배고파',
        x: 256,
        y: 476,
        rotate: 3,
        style: {
          size: 114,
          fill: ['#FFE0A3', '#FF8C1A'],
          stroke: '#5E3000',
          tilt: [4, -4, 6],
          bounce: [-4, 4, 0],
          tracking: -2,
        },
      },
    ],
  },
  {
    id: 'goodnight',
    text: '잘 자',
    emoji: ['😴', '🌙'],
    keywords: ['잘자', 'jal ja', 'good night', 'xayrli tun', 'sleep'],
    pose: { face: 'sleep', arms: 'pillow', nightcap: true },
    place: { x: 70, y: 18, scale: 1.1, tilt: -6 },
    back:
      `<path d="M470 64 a42 42 0 1 1 -50 -30 a34 34 0 1 0 50 30 Z" fill="#FFE27A"/>` +
      sparkle(392, 34, 10, '#FFE27A') +
      sparkle(36, 150, 12, '#C9C2FF') +
      sparkle(488, 196, 9, '#C9C2FF'),
    captions: [
      {
        text: 'Zz',
        x: 82,
        y: 96,
        rotate: -12,
        style: {
          size: 78,
          fill: ['#E4E0FF', '#9A8CFF'],
          stroke: '#2A2266',
          scale: [1, 0.7],
          bounce: [0, 10],
        },
      },
      {
        text: '잘 자~',
        x: 256,
        y: 478,
        rotate: -2,
        style: {
          size: 112,
          fill: ['#E4E0FF', '#7D6CF2'],
          stroke: '#231B5E',
          tilt: [-4, 0, 6, 10],
          bounce: [0, 0, -6, -10],
          tracking: -6,
        },
      },
    ],
  },
];

/** 스티커 둘레 흰 테두리(둥글게) + 아래 살짝 그림자 */
const OUTLINE_FILTER = `<filter id="o" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB"><feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d1"/><feGaussianBlur in="d1" stdDeviation="2.4" result="d2"/><feComponentTransfer in="d2" result="d3"><feFuncA type="linear" slope="7" intercept="-1.6"/></feComponentTransfer><feFlood flood-color="#ffffff" result="w"/><feComposite in="w" in2="d3" operator="in" result="border"/><feGaussianBlur in="d3" stdDeviation="3.5" result="sb"/><feOffset in="sb" dy="4" result="so"/><feFlood flood-color="#1B1640" flood-opacity=".22"/><feComposite in2="so" operator="in" result="shadow"/><feMerge><feMergeNode in="shadow"/><feMergeNode in="border"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;

/** 스티커 한 장 SVG (512×512, 투명 배경). size 는 내보낼 픽셀 크기 */
export function stickerSvg(
  avatar: AvatarLike,
  design: StickerDesign,
  size = 512,
): string {
  const { x, y, scale, tilt = 0 } = design.place;
  const character = `<g transform="translate(${x} ${y}) scale(${scale}) rotate(${tilt} 160 200)">${avatarSvg(avatar, design.pose)}</g>`;
  const captions = design.captions
    .map((c, i) =>
      caption(`${design.id}${i}`, c.text, c.x, c.y, c.style, c.rotate ?? 0),
    )
    .join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">` +
    `<defs>${OUTLINE_FILTER}</defs>` +
    `<g filter="url(#o)">${design.back ?? ''}${character}${design.front ?? ''}${captions}</g>` +
    `</svg>`
  );
}
