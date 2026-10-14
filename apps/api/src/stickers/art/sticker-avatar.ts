/**
 * 서버에서 그리는 캐릭터 — 미니앱 GeneratedAvatar · 모바일 AvatarPreview 와 같은 그림을
 * SVG 문자열로 만든다 (좌표 320×360 그대로). 스티커용으로 **표정·팔 자세만** 바꿀 수 있다.
 *
 * ⚠️ 클라이언트 그림(색·모양)을 바꾸면 여기도 같이 바꿔라. 다르면 "내 캐릭터가 아니네" 가 된다.
 */

export type AvatarLike = Partial<Record<string, string>>;

/** 스티커 표정 — 캐릭터 기본 표정 대신 그린다 */
export type StickerFace =
  | 'laugh'
  | 'wow'
  | 'fight'
  | 'shock'
  | 'thanks'
  | 'love'
  | 'hungry'
  | 'sleep';

/** 팔 자세 */
export type ArmPose =
  | 'down'
  | 'belly'
  | 'bothUp'
  | 'fistUp'
  | 'cheeks'
  | 'clasp'
  | 'fingerHeart'
  | 'spoon'
  | 'pillow';

const DEFAULTS: Record<string, string> = {
  skinTone: 'skin_08',
  bodyShape: 'body_balanced',
  expression: 'expression_smile',
  eyeColor: 'eyes_charcoal',
  hairstyle: 'hair_wave',
  hairColor: 'haircolor_charcoal',
  eyewear: 'eyewear_none',
  facialHair: 'facial_none',
  headwear: 'headwear_none',
  outfit: 'outfit_hoodie',
};

const SKIN: Record<string, string> = {
  skin_01: '#5B3226',
  skin_02: '#71402E',
  skin_03: '#875039',
  skin_04: '#9D6245',
  skin_05: '#B87956',
  skin_06: '#CC906B',
  skin_07: '#DDA17D',
  skin_08: '#EAB692',
  skin_09: '#F3C8A9',
  skin_10: '#F8DCC7',
};
const HAIR: Record<string, string> = {
  haircolor_charcoal: '#24242B',
  haircolor_espresso: '#3D2825',
  haircolor_chestnut: '#683C2C',
  haircolor_copper: '#A2512E',
  haircolor_burgundy: '#712F3E',
  haircolor_silver: '#95949C',
  haircolor_blonde: '#D49B39',
};
const EYES: Record<string, string> = {
  eyes_charcoal: '#25252B',
  eyes_brown: '#6D3F2A',
  eyes_hazel: '#987426',
  eyes_green: '#3D853D',
  eyes_teal: '#168A90',
  eyes_blue: '#2C73BE',
};
type OutfitColors = { primary: string; secondary: string; accent: string };
const OUTFITS: Record<string, OutfitColors> = {
  outfit_hoodie: {
    primary: '#776EE2',
    secondary: '#5E55C7',
    accent: '#FFFFFF',
  },
  outfit_varsity: {
    primary: '#30354D',
    secondary: '#202438',
    accent: '#F4C95D',
  },
  outfit_sweater: {
    primary: '#E06F8B',
    secondary: '#C45270',
    accent: '#FFF3F5',
  },
  outfit_sport: { primary: '#21A6A1', secondary: '#147D7A', accent: '#F5D64E' },
  outfit_hanbok: {
    primary: '#6F85D8',
    secondary: '#4F65B5',
    accent: '#F4C95D',
  },
  outfit_denim: { primary: '#4F78A8', secondary: '#365B88', accent: '#F5EFE5' },
};
const BODY_WIDTH: Record<string, number> = {
  body_slim: 126,
  body_balanced: 148,
  body_soft: 172,
  body_broad: 188,
};

const MOUTH = '#7E3F45';
const TONGUE = '#E77883';

export function darken(hex: string, amount: number) {
  const value = Number.parseInt(hex.replace('#', ''), 16);
  const channels = [value >> 16, (value >> 8) & 0xff, value & 0xff];
  return `#${channels
    .map((c) =>
      Math.max(0, Math.min(255, c - amount))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

/** 아는 값만 받는다 — 모르는 값이 SVG 에 그대로 들어가지 않게 (색은 전부 표에서 온다) */
function pick<T>(
  table: Record<string, T>,
  key: string | undefined,
  fallback: string,
): T {
  return (key && table[key]) || table[fallback];
}

export interface AvatarColors {
  skin: string;
  hair: string;
  eye: string;
  outfit: OutfitColors;
}

export function avatarColors(avatar: AvatarLike): AvatarColors {
  return {
    skin: pick(SKIN, avatar.skinTone, DEFAULTS.skinTone),
    hair: pick(HAIR, avatar.hairColor, DEFAULTS.hairColor),
    eye: pick(EYES, avatar.eyeColor, DEFAULTS.eyeColor),
    outfit: pick(OUTFITS, avatar.outfit, DEFAULTS.outfit),
  };
}

function legs(skin: string) {
  return `<g><rect fill="#2E3150" height="55" rx="18" width="42" x="106" y="274"/><rect fill="#2E3150" height="55" rx="18" width="42" x="172" y="274"/><rect fill="${skin}" height="18" rx="8" width="32" x="111" y="316"/><rect fill="${skin}" height="18" rx="8" width="32" x="177" y="316"/><path d="M97 326 C111 315 143 316 151 330 C154 337 148 344 139 344 H101 C92 344 89 334 97 326 Z" fill="#F6F7FB"/><path d="M169 330 C177 316 209 315 223 326 C231 334 228 344 219 344 H181 C172 344 166 337 169 330 Z" fill="#F6F7FB"/><path d="M99 337 H148" stroke="#D8DCE6" stroke-linecap="round" stroke-width="5"/><path d="M172 337 H221" stroke="#D8DCE6" stroke-linecap="round" stroke-width="5"/></g>`;
}

function backHair(hair: string, style: string) {
  if (style === 'hair_none' || style === 'hair_crop') return '';
  if (style === 'hair_bob')
    return `<path d="M75 105 Q79 40 160 30 Q241 40 245 105 L238 211 Q206 236 160 230 Q114 236 82 211 Z" fill="${hair}"/>`;
  if (style === 'hair_pony')
    return `<path d="M77 107 Q82 40 160 31 Q237 40 243 107 L228 194 Q196 218 160 214 Q124 218 92 194 Z" fill="${hair}"/><path d="M224 86 Q276 99 260 169 Q252 206 226 217 Q241 155 216 119 Z" fill="${hair}"/>`;
  if (style === 'hair_topknot')
    return `<circle cx="160" cy="34" fill="${hair}" r="34"/><path d="M78 108 Q83 40 160 31 Q237 40 242 108 L226 196 Q194 216 160 212 Q126 216 94 196 Z" fill="${hair}"/>`;
  return `<path d="M78 108 Q82 39 160 30 Q238 39 242 108 L228 198 Q197 219 160 215 Q123 219 92 198 Z" fill="${hair}"/>`;
}

/** 소매 한 줄 + 손 */
function arm(
  path: string,
  color: string,
  hand: [number, number],
  skin: string,
) {
  return `<path d="${path}" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="33"/><circle cx="${hand[0]}" cy="${hand[1]}" fill="${skin}" r="18"/>`;
}

/** 주먹 — 손 위에 손가락 마디 줄 */
function fist(x: number, y: number, skin: string) {
  const line = darken(skin, 40);
  return `<circle cx="${x}" cy="${y}" fill="${skin}" r="20"/><path d="M${x - 11} ${y - 6} Q${x} ${y - 11} ${x + 11} ${y - 6}" fill="none" stroke="${line}" stroke-linecap="round" stroke-width="3.5"/><path d="M${x - 12} ${y + 2} Q${x} ${y - 2} ${x + 12} ${y + 2}" fill="none" stroke="${line}" stroke-linecap="round" stroke-width="3.5"/>`;
}

interface Body {
  left: number;
  right: number;
  skin: string;
  outfit: OutfitColors;
}

/**
 * 팔 — 몸통 뒤(back) 와 머리 앞(front) 두 층. 위로 든 팔·볼을 감싼 손은 머리 위에 그려야 보인다.
 */
function arms(pose: ArmPose, b: Body): { back: string; front: string } {
  const { left: l, right: r, skin, outfit: o } = b;
  const leftDown = arm(
    `M${l + 18} 201 Q${l - 17} 220 ${l - 19} 263`,
    o.primary,
    [l - 20, 271],
    skin,
  );
  const rightDown = arm(
    `M${r - 18} 201 Q${r + 17} 220 ${r + 19} 263`,
    o.secondary,
    [r + 20, 271],
    skin,
  );
  switch (pose) {
    case 'belly':
      // 배를 잡고 웃는다 — 두 손이 배 앞에서 만난다
      return {
        back: '',
        front:
          arm(
            `M${l + 16} 203 Q${l + 4} 246 ${136} 262`,
            o.primary,
            [138, 262],
            skin,
          ) +
          arm(
            `M${r - 16} 203 Q${r - 4} 246 ${184} 262`,
            o.secondary,
            [182, 262],
            skin,
          ),
      };
    case 'bothUp':
      // 만세 — 두 팔을 머리 옆으로 번쩍
      return {
        back: '',
        front:
          arm(
            `M${l + 18} 200 Q${l - 34} 182 ${l - 40} 128`,
            o.primary,
            [l - 40, 114],
            skin,
          ) +
          arm(
            `M${r - 18} 200 Q${r + 34} 182 ${r + 40} 128`,
            o.secondary,
            [r + 40, 114],
            skin,
          ),
      };
    case 'fistUp':
      return {
        back: leftDown,
        front:
          `<path d="M${r - 18} 200 Q${r + 36} 186 ${r + 40} 128" fill="none" stroke="${o.secondary}" stroke-linecap="round" stroke-width="33"/>` +
          fist(r + 40, 110, skin),
      };
    case 'cheeks':
      // 헐 — 두 손으로 볼을 감싼다
      return {
        back: '',
        front:
          arm(
            `M${l + 14} 206 Q${l - 8} 196 ${96} 178`,
            o.primary,
            [98, 170],
            skin,
          ) +
          arm(
            `M${r - 14} 206 Q${r + 8} 196 ${224} 178`,
            o.secondary,
            [222, 170],
            skin,
          ),
      };
    case 'clasp':
      // 고마워 — 가슴 앞에서 두 손을 모은다
      return {
        back: '',
        front:
          arm(
            `M${l + 16} 203 Q${l + 2} 238 ${146} 240`,
            o.primary,
            [149, 238],
            skin,
          ) +
          arm(
            `M${r - 16} 203 Q${r - 2} 238 ${174} 240`,
            o.secondary,
            [171, 238],
            skin,
          ),
      };
    case 'fingerHeart':
      // 손가락 하트 — 오른손을 볼 옆으로
      return {
        back: leftDown,
        front:
          arm(
            `M${r - 18} 202 Q${r + 30} 214 ${r + 28} 176`,
            o.secondary,
            [r + 26, 162],
            skin,
          ) +
          `<path d="${heartPath(r + 30, 132, 13)}" fill="#FF3355" stroke="#fff" stroke-width="3"/>`,
      };
    case 'spoon': {
      // 배고파 — 숟가락을 든 오른손
      const hx = r + 22;
      const hy = 214;
      return {
        back: leftDown,
        front:
          `<g transform="rotate(-14 ${hx} ${hy})"><rect fill="#C9CDD8" height="78" rx="5" width="10" x="${hx - 5}" y="${hy - 84}"/><ellipse cx="${hx}" cy="${hy - 92}" fill="#E4E7EF" rx="16" ry="22"/><ellipse cx="${hx - 5}" cy="${hy - 98}" fill="#fff" opacity=".8" rx="5" ry="9"/></g>` +
          arm(
            `M${r - 18} 202 Q${r + 22} 226 ${hx} ${hy + 6}`,
            o.secondary,
            [hx, hy],
            skin,
          ),
      };
    }
    case 'pillow':
      // 잘 자 — 베개를 안는다
      return {
        back: '',
        front:
          `<g><rect fill="#F3F0FF" height="74" rx="30" stroke="#D9D2FB" stroke-width="5" width="168" x="76" y="214"/><path d="M96 232 Q160 220 224 232" fill="none" opacity=".7" stroke="#fff" stroke-linecap="round" stroke-width="7"/><circle cx="104" cy="270" fill="#E3DCFF" r="4"/><circle cx="216" cy="270" fill="#E3DCFF" r="4"/></g>` +
          arm(
            `M${l + 16} 204 Q${l - 4} 240 ${l + 8} 252`,
            o.primary,
            [l + 12, 252],
            skin,
          ) +
          arm(
            `M${r - 16} 204 Q${r + 4} 240 ${r - 8} 252`,
            o.secondary,
            [r - 12, 252],
            skin,
          ),
      };
    default:
      return { back: leftDown + rightDown, front: '' };
  }
}

function outfitBody(id: string, b: Body) {
  const { left: bodyX, right, outfit } = b;
  if (id === 'outfit_hanbok')
    return `<g><path d="M${bodyX + 10} 191 Q160 164 ${right - 10} 191 L${right + 9} 292 Q160 314 ${bodyX - 9} 292 Z" fill="${outfit.primary}"/><path d="M160 178 L160 294 L${right + 9} 292 L${right - 8} 207 Z" fill="${outfit.secondary}" opacity=".38"/><path d="M132 184 L160 214 L188 184" fill="none" stroke="${outfit.accent}" stroke-linejoin="round" stroke-width="12"/><rect fill="${outfit.accent}" height="13" rx="6" width="104" x="108" y="236"/></g>`;
  let details = '';
  if (id === 'outfit_hoodie')
    details = `<path d="M124 190 Q160 219 196 190" fill="none" stroke="${outfit.secondary}" stroke-linecap="round" stroke-width="14"/><line stroke="${outfit.accent}" stroke-linecap="round" stroke-width="4" x1="145" x2="143" y1="207" y2="244"/><line stroke="${outfit.accent}" stroke-linecap="round" stroke-width="4" x1="175" x2="177" y1="207" y2="244"/>`;
  if (id === 'outfit_varsity')
    details = `<rect fill="${outfit.accent}" height="105" opacity=".9" width="16" x="152" y="186"/><path d="M119 190 Q160 216 201 190" fill="none" stroke="${outfit.accent}" stroke-width="12"/>`;
  if (id === 'outfit_sweater')
    details = `<path d="M119 193 Q160 215 201 193" fill="none" stroke="${outfit.accent}" stroke-width="12"/><path d="M127 234 H193" opacity=".75" stroke="${outfit.accent}" stroke-dasharray="8 7" stroke-width="7"/>`;
  if (id === 'outfit_sport')
    details = `<path d="M126 188 L160 219 L194 188" fill="${outfit.accent}" opacity=".95"/><circle cx="160" cy="246" fill="${outfit.secondary}" opacity=".85" r="23"/>`;
  if (id === 'outfit_denim')
    details = `<path d="M127 189 L160 216 L193 189" fill="${outfit.accent}"/><line opacity=".8" stroke="${outfit.accent}" stroke-width="4" x1="160" x2="160" y1="212" y2="290"/>`;
  return `<g><path d="M${bodyX + 16} 188 Q160 166 ${right - 16} 188 Q${right + 3} 222 ${right + 2} 290 Q160 307 ${bodyX - 2} 290 Q${bodyX - 3} 222 ${bodyX + 16} 188 Z" fill="${outfit.primary}"/><path d="M160 180 Q${right - 12} 183 ${right + 2} 226 L${right + 2} 290 Q192 301 160 301 Z" fill="${outfit.secondary}" opacity=".5"/>${details}</g>`;
}

const sparkle = (x: number, y: number, s: number, fill = '#fff') =>
  `<path d="M${x} ${y - s} Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y} Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s} Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y} Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s} Z" fill="${fill}"/>`;

export const heartPath = (x: number, y: number, s: number) =>
  `M${x} ${y + s * 0.9} C${x - s * 1.25} ${y + s * 0.05} ${x - s * 1.1} ${y - s * 0.95} ${x} ${y - s * 0.35} C${x + s * 1.1} ${y - s * 0.95} ${x + s * 1.25} ${y + s * 0.05} ${x} ${y + s * 0.9} Z`;

function brows(
  kind: 'calm' | 'up' | 'angry' | 'worried' | 'soft',
  color: string,
) {
  if (kind === 'angry')
    return `<path d="M108 106 L141 119" stroke="${color}" stroke-linecap="round" stroke-width="9"/><path d="M179 119 L212 106" stroke="${color}" stroke-linecap="round" stroke-width="9"/>`;
  if (kind === 'worried')
    return `<path d="M110 106 Q124 104 140 96" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="6"/><path d="M180 96 Q196 104 210 106" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="6"/>`;
  if (kind === 'up')
    return `<path d="M110 100 Q126 88 142 98" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="6"/><path d="M178 98 Q194 88 210 100" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="6"/>`;
  if (kind === 'soft')
    return `<path d="M112 110 Q126 104 140 109" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/><path d="M180 109 Q194 104 208 110" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="5"/>`;
  return `<path d="M111 112 Q126 103 141 111" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="6"/><path d="M179 111 Q194 103 209 112" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="6"/>`;
}

const blush = (opacity: number, rx = 17) =>
  `<ellipse cx="115" cy="160" fill="#F0717C" opacity="${opacity}" rx="${rx}" ry="9"/><ellipse cx="205" cy="160" fill="#F0717C" opacity="${opacity}" rx="${rx}" ry="9"/>`;

function face(
  kind: StickerFace,
  c: AvatarColors,
): { upper: string; mouth: string } {
  const { eye, skin } = c;
  const brow = darken(skin, 58);
  const nose = `<path d="M157 137 Q151 151 160 155 Q168 153 166 147" fill="none" stroke="${darken(skin, 34)}" stroke-linecap="round" stroke-width="4"/>`;
  const openEye = (cx: number, cy: number, rx = 12, ry = 15, pr = 7) =>
    `<ellipse cx="${cx}" cy="${cy}" fill="#fff" rx="${rx}" ry="${ry}"/><circle cx="${cx}" cy="${cy + 2}" fill="${eye}" r="${pr}"/><circle cx="${cx + pr * 0.42}" cy="${cy - pr * 0.3}" fill="#fff" r="${Math.max(2.4, pr * 0.36)}"/>`;
  switch (kind) {
    case 'laugh':
      return {
        upper:
          brows('up', brow) +
          // ^ ^ 눈 + 웃다 흘린 눈물
          `<path d="M108 134 Q126 112 144 134" fill="none" stroke="${eye}" stroke-linecap="round" stroke-width="8"/><path d="M176 134 Q194 112 212 134" fill="none" stroke="${eye}" stroke-linecap="round" stroke-width="8"/>` +
          `<path d="M100 138 Q92 152 98 160 Q106 164 108 154 Q108 146 100 138 Z" fill="#7FD3FF"/><path d="M220 138 Q228 152 222 160 Q214 164 212 154 Q212 146 220 138 Z" fill="#7FD3FF"/>` +
          nose +
          blush(0.42),
        mouth: `<path d="M130 166 Q160 162 190 166 Q190 210 160 212 Q130 210 130 166 Z" fill="${MOUTH}"/><path d="M138 168 Q160 165 182 168 L180 176 Q160 179 140 176 Z" fill="#fff"/><path d="M142 200 Q160 188 178 200 Q172 210 160 210 Q148 210 142 200 Z" fill="${TONGUE}"/>`,
      };
    case 'wow':
      return {
        upper:
          brows('up', brow) +
          `<ellipse cx="126" cy="128" fill="#fff" rx="16" ry="20"/><ellipse cx="194" cy="128" fill="#fff" rx="16" ry="20"/><circle cx="126" cy="131" fill="${eye}" r="11"/><circle cx="194" cy="131" fill="${eye}" r="11"/>` +
          sparkle(130, 125, 7) +
          sparkle(198, 125, 7) +
          `<circle cx="121" cy="137" fill="#fff" r="2.6"/><circle cx="189" cy="137" fill="#fff" r="2.6"/>` +
          nose +
          blush(0.36),
        mouth: `<ellipse cx="160" cy="184" fill="${MOUTH}" rx="17" ry="20"/><path d="M148 194 Q160 186 172 194 Q168 203 160 203 Q152 203 148 194 Z" fill="${TONGUE}"/>`,
      };
    case 'fight':
      return {
        upper:
          brows('angry', brow) +
          // 결의에 찬 눈 — 위 눈꺼풀이 일자
          `<path d="M112 126 H140 Q141 146 126 146 Q111 146 112 126 Z" fill="#fff"/><path d="M180 126 H208 Q209 146 194 146 Q179 146 180 126 Z" fill="#fff"/><circle cx="127" cy="133" fill="${eye}" r="7"/><circle cx="193" cy="133" fill="${eye}" r="7"/><circle cx="130" cy="130" fill="#fff" r="2.3"/><circle cx="196" cy="130" fill="#fff" r="2.3"/><path d="M110 126 H142" stroke="${eye}" stroke-linecap="round" stroke-width="5"/><path d="M178 126 H210" stroke="${eye}" stroke-linecap="round" stroke-width="5"/>` +
          nose +
          blush(0.3),
        mouth: `<path d="M134 168 H186 Q184 204 160 206 Q136 204 134 168 Z" fill="${MOUTH}"/><path d="M136 168 H184 L182 177 H138 Z" fill="#fff"/><path d="M146 196 Q160 188 174 196 Q168 205 160 205 Q152 205 146 196 Z" fill="${TONGUE}"/>`,
      };
    case 'shock':
      return {
        upper:
          // 이마의 파란 그늘 + 세로줄
          `<path d="M98 96 Q160 30 222 96 Q220 120 160 116 Q100 120 98 96 Z" fill="#6E7BE8" opacity=".28"/>` +
          `<path d="M134 64 V92 M150 58 V94 M166 58 V94 M182 64 V92" stroke="#4C55B8" stroke-linecap="round" stroke-width="4" opacity=".55"/>` +
          brows('worried', brow) +
          `<circle cx="126" cy="130" fill="#fff" r="17"/><circle cx="194" cy="130" fill="#fff" r="17"/><circle cx="126" cy="131" fill="${eye}" r="4.5"/><circle cx="194" cy="131" fill="${eye}" r="4.5"/>` +
          nose +
          // 땀
          `<path d="M232 92 Q244 112 240 122 Q234 130 226 124 Q220 116 232 92 Z" fill="#8FD3FF" stroke="#fff" stroke-width="3"/>`,
        mouth: `<path d="M148 186 Q146 168 160 168 Q174 168 172 186 Q170 202 160 202 Q150 202 148 186 Z" fill="${MOUTH}"/>`,
      };
    case 'thanks':
      return {
        upper:
          brows('soft', brow) +
          `<path d="M110 130 Q126 141 142 130" fill="none" stroke="${eye}" stroke-linecap="round" stroke-width="7"/><path d="M178 130 Q194 141 210 130" fill="none" stroke="${eye}" stroke-linecap="round" stroke-width="7"/>` +
          nose +
          blush(0.5, 19) +
          `<path d="M104 156 l6 -8 M114 158 l6 -8 M124 160 l6 -8 M194 160 l6 -8 M204 158 l6 -8 M214 156 l6 -8" stroke="#E4566A" stroke-linecap="round" stroke-width="2.6" opacity=".7"/>`,
        mouth: `<path d="M139 172 Q160 196 181 172 Q160 184 139 172 Z" fill="${MOUTH}"/><path d="M150 180 Q160 186 170 180 Q166 188 160 188 Q154 188 150 180 Z" fill="${TONGUE}"/>`,
      };
    case 'love':
      return {
        upper:
          brows('soft', brow) +
          `<path d="${heartPath(126, 130, 18)}" fill="#FF4D6D"/><path d="${heartPath(194, 130, 18)}" fill="#FF4D6D"/><ellipse cx="118" cy="123" fill="#fff" opacity=".75" rx="4" ry="6" transform="rotate(-30 118 123)"/><ellipse cx="186" cy="123" fill="#fff" opacity=".75" rx="4" ry="6" transform="rotate(-30 186 123)"/>` +
          nose +
          blush(0.5, 19),
        mouth: `<path d="M137 170 Q160 200 183 170 Q160 184 137 170 Z" fill="${MOUTH}"/><path d="M148 180 Q160 190 172 180 Q167 191 160 191 Q153 191 148 180 Z" fill="${TONGUE}"/>`,
      };
    case 'hungry':
      return {
        upper:
          brows('worried', brow) +
          // 반쯤 감긴 눈 — 눈꺼풀이 위를 덮는다
          openEye(126, 130, 12, 14, 7) +
          openEye(194, 130, 12, 14, 7) +
          `<path d="M112 130 Q112 113 126 113 Q140 113 140 130 Z" fill="${skin}"/><path d="M180 130 Q180 113 194 113 Q208 113 208 130 Z" fill="${skin}"/><path d="M111 130 H141 M179 130 H209" stroke="${eye}" stroke-linecap="round" stroke-width="5"/>` +
          nose +
          blush(0.28),
        mouth:
          `<path d="M140 176 Q160 168 180 176 Q178 194 160 196 Q142 194 140 176 Z" fill="${MOUTH}"/><path d="M148 188 Q160 180 172 188 Q168 196 160 196 Q152 196 148 188 Z" fill="${TONGUE}"/>` +
          // 침
          `<path d="M174 188 Q178 204 176 214 Q172 224 166 216 Q164 206 174 188 Z" fill="#9EDCFF" stroke="#fff" stroke-width="2.5"/>`,
      };
    case 'sleep':
      return {
        upper:
          brows('soft', brow) +
          `<path d="M110 132 Q126 142 142 132" fill="none" stroke="${eye}" stroke-linecap="round" stroke-width="6"/><path d="M178 132 Q194 142 210 132" fill="none" stroke="${eye}" stroke-linecap="round" stroke-width="6"/><path d="M112 136 l-5 5 M118 139 l-3 6 M208 136 l5 5 M202 139 l3 6" stroke="${eye}" stroke-linecap="round" stroke-width="3"/>` +
          nose +
          blush(0.32) +
          // 콧방울
          `<circle cx="178" cy="156" fill="#BFE6FF" opacity=".85" r="14" stroke="#fff" stroke-width="2.5"/><ellipse cx="173" cy="151" fill="#fff" opacity=".9" rx="4" ry="3"/>`,
        mouth: `<ellipse cx="160" cy="180" fill="${MOUTH}" rx="9" ry="7"/>`,
      };
    default:
      return { upper: '', mouth: '' };
  }
}

function frontHair(hair: string, style: string) {
  if (style === 'hair_none') return '';
  if (style === 'hair_crop')
    return `<path d="M91 95 Q105 41 160 38 Q216 41 229 95 Q202 73 178 76 Q151 80 126 65 Q114 84 91 95 Z" fill="${hair}"/>`;
  if (style === 'hair_curls')
    return `<g>${[92, 118, 144, 170, 196, 222]
      .map(
        (x, i) =>
          `<circle cx="${x}" cy="${i % 2 === 0 ? 72 : 58}" fill="${hair}" r="27"/>`,
      )
      .join(
        '',
      )}<circle cx="88" cy="104" fill="${hair}" r="25"/><circle cx="232" cy="104" fill="${hair}" r="25"/></g>`;
  return `<path d="M84 101 Q87 47 144 35 Q196 23 232 67 Q243 85 230 106 Q209 78 183 80 Q157 84 136 64 Q123 87 99 84 Q98 99 84 101 Z" fill="${hair}"/>`;
}

/** 수염 — 턱(입 뒤)과 콧수염(입 위) 두 층. 크게 벌린 입이 턱수염에 가리지 않게 */
function facialHair(
  hair: string,
  style: string,
): { chin: string; lip: string } {
  if (style === 'facial_none' || !style) return { chin: '', lip: '' };
  if (style === 'facial_stubble')
    return {
      chin: `<path d="M119 168 Q160 207 201 168 Q193 218 160 224 Q127 218 119 168 Z" fill="${hair}" opacity=".33"/>`,
      lip: '',
    };
  const mustache = `<path d="M158 163 Q144 152 129 165 Q142 184 160 171 Q178 184 191 165 Q176 152 162 163 Z" fill="${hair}"/>`;
  if (style === 'facial_mustache') return { chin: '', lip: mustache };
  return {
    chin: `<path d="M111 164 Q120 227 160 238 Q200 227 209 164 Q194 188 180 190 Q160 200 140 190 Q126 188 111 164 Z" fill="${hair}"/>`,
    lip: `<path d="M158 162 Q143 152 128 166 Q142 184 160 171 Q178 184 192 166 Q177 152 162 162 Z" fill="${hair}"/>`,
  };
}

function eyewear(style: string) {
  if (style === 'eyewear_none' || !style) return '';
  if (style === 'eyewear_round')
    return `<g fill="none" stroke="#30313A" stroke-width="6"><circle cx="126" cy="130" r="24"/><circle cx="194" cy="130" r="24"/><path d="M150 129 Q160 123 170 129"/><path d="M101 127 L85 121 M219 127 L235 121" stroke-linecap="round"/></g>`;
  if (style === 'eyewear_square')
    return `<g fill="none" stroke="#30313A" stroke-linejoin="round" stroke-width="6"><rect height="43" rx="10" width="50" x="101" y="108"/><rect height="43" rx="10" width="50" x="169" y="108"/><path d="M151 128 H169"/><path d="M101 119 L85 114 M219 119 L235 114" stroke-linecap="round"/></g>`;
  if (style === 'eyewear_sun')
    return `<g><path d="M96 112 Q126 101 154 113 L150 145 Q124 159 103 141 Z" fill="#31313A"/><path d="M166 113 Q194 101 224 112 L217 141 Q196 159 170 145 Z" fill="#31313A"/><rect fill="#31313A" height="7" rx="3" width="20" x="150" y="119"/><path d="M106 119 Q124 110 141 116" opacity=".45" stroke="#fff" stroke-linecap="round" stroke-width="4"/><path d="M179 116 Q196 110 214 119" opacity=".45" stroke="#fff" stroke-linecap="round" stroke-width="4"/></g>`;
  return `<g fill="none" stroke="#30313A" stroke-width="5"><path d="M102 119 Q126 109 150 119 L148 145 Q126 153 105 142 Z"/><path d="M170 119 Q194 109 218 119 L215 142 Q194 153 172 145 Z"/><path d="M150 127 H170"/></g>`;
}

function headwear(id: string, outfit: OutfitColors) {
  if (id === 'headwear_none' || !id) return '';
  if (id === 'headwear_cap')
    return `<g><path d="M91 67 Q106 20 160 20 Q214 20 229 67 Z" fill="${outfit.primary}"/><path d="M117 66 Q173 56 242 73 Q204 91 155 77 Q137 72 117 66 Z" fill="${outfit.secondary}"/><circle cx="160" cy="28" fill="${outfit.accent}" r="7"/></g>`;
  if (id === 'headwear_beanie')
    return `<g><path d="M94 70 Q99 16 160 14 Q221 16 226 70 Z" fill="${outfit.primary}"/><rect fill="${outfit.secondary}" height="30" rx="14" width="138" x="91" y="60"/><circle cx="160" cy="15" fill="${outfit.accent}" r="12"/></g>`;
  if (id === 'headwear_headband')
    return `<path d="M91 72 Q160 48 229 72" fill="none" stroke="${outfit.accent}" stroke-linecap="round" stroke-width="15"/>`;
  return `<g><path d="M101 49 Q160 13 219 49 L229 79 H91 Z" fill="${outfit.primary}"/><ellipse cx="160" cy="79" fill="${outfit.secondary}" rx="83" ry="18"/><path d="M119 49 Q160 34 201 49" fill="none" stroke="${outfit.accent}" stroke-linecap="round" stroke-width="7"/></g>`;
}

/** 수면 모자 — 잘 자 스티커에서 원래 모자 대신 */
const NIGHTCAP = `<g><path d="M88 74 Q110 6 196 14 Q262 26 286 92 Q270 84 256 90 Q236 40 192 36 Q140 34 232 70 Z" fill="#6C63D9"/><path d="M84 78 Q160 34 236 72 L238 92 Q160 58 82 98 Z" fill="#F3F0FF"/><circle cx="286" cy="98" fill="#FFE27A" r="15"/><circle cx="150" cy="30" fill="#FFE27A" r="4"/><circle cx="214" cy="40" fill="#FFE27A" r="3"/></g>`;

export interface StickerPose {
  face: StickerFace;
  arms: ArmPose;
  nightcap?: boolean;
}

/**
 * 캐릭터 한 명 — `<g>` 안에 넣을 SVG 조각 (좌표 320×360, 그림자·배경 없음).
 */
export function avatarSvg(avatar: AvatarLike, pose: StickerPose): string {
  const a: Record<string, string> = { ...DEFAULTS };
  for (const [key, value] of Object.entries(avatar)) if (value) a[key] = value;
  const c = avatarColors(a);
  const bodyWidth = pick(BODY_WIDTH, a.bodyShape, DEFAULTS.bodyShape);
  const left = 160 - bodyWidth / 2;
  const body: Body = {
    left,
    right: left + bodyWidth,
    skin: c.skin,
    outfit: c.outfit,
  };
  const armLayers = arms(pose.arms, body);
  const faceParts = face(pose.face, c);
  const sunUp = a.eyewear === 'eyewear_sun';
  const hasHat = Boolean(a.headwear) && a.headwear !== 'headwear_none' && a.headwear !== 'headwear_headband';
  const beard = facialHair(c.hair, a.facialHair);
  return [
    pose.nightcap ? '' : backHair(c.hair, a.hairstyle),
    legs(c.skin),
    armLayers.back,
    outfitBody(a.outfit, body),
    `<rect fill="${c.skin}" height="34" rx="15" width="42" x="139" y="180"/>`,
    `<ellipse cx="84" cy="139" fill="${c.skin}" rx="24" ry="29"/><ellipse cx="236" cy="139" fill="${c.skin}" rx="24" ry="29"/>`,
    `<ellipse cx="160" cy="130" fill="${c.skin}" rx="76" ry="91"/>`,
    `<ellipse cx="137" cy="92" fill="#fff" opacity=".08" rx="43" ry="28"/>`,
    `<path d="M99 160 Q112 210 160 219 Q208 210 221 160 Q212 228 160 238 Q108 228 99 160 Z" fill="${darken(c.skin, 12)}" opacity=".16"/>`,
    faceParts.upper,
    beard.chin,
    faceParts.mouth,
    beard.lip,
    frontHair(c.hair, a.hairstyle),
    // 선글라스는 표정을 가린다 → 스티커에선 머리 위로 올려 쓴다 (모자 위에 얹히게 모자 다음)
    sunUp ? '' : eyewear(a.eyewear),
    pose.nightcap ? NIGHTCAP : headwear(a.headwear, c.outfit),
    sunUp && !pose.nightcap
      ? `<g transform="translate(160 ${hasHat ? 78 : 72}) rotate(-6) scale(.86) translate(-160 -128)">${eyewear(a.eyewear)}</g>`
      : '',
    armLayers.front,
  ].join('');
}
