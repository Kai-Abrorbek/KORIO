import { hangul, lg, rg } from '../scene-art/kit';

/**
 * 캐릭터 옆 펫 4종 × 자라는 3단계 (정지 그림, 투명 배경).
 * 캔버스 400×400, 바닥(발)은 y≈384. 정면을 본다.
 *
 * 단계: 0 아기(머리 크고 동글, 장식 없음) · 1 꼬마(조금 크고 작은 장식) · 2 다 큰(완성 장식)
 * 화면에선 단계마다 크기도 다르게 보여준다(앱 PET_SCALE) — 그림은 단계마다 캔버스를 비슷하게 채운다.
 */
export const PET_W = 400;
export const PET_H = 400;

export type PetId = 'pet_jindo' | 'pet_hangulmon' | 'pet_tiger' | 'pet_dokkaebi';
export type PetStage = 0 | 1 | 2;

const r1 = (n: number) => Math.round(n * 10) / 10;
const pick = <T,>(stage: PetStage, values: [T, T, T]) => values[stage];
const mirror = (d: string) =>
  // 좌우 대칭 (x → 400 - x). 숫자쌍 "x y" 만 쓰는 경로용
  d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x: string, y: string) => `${r1(PET_W - Number(x))} ${y}`);

const shadow = (rx: number) => `<ellipse cx="200" cy="384" rx="${rx}" ry="12" fill="#151521" opacity=".14"/>`;

/* ───────── 진돗개 ───────── */
function jindo(s: PetStage) {
  const FUR = '#FBF3E8';
  const EDGE = '#D9C3A6';
  const DARK = '#2B2433';
  const hy = pick(s, [196, 178, 164]);
  const hrx = pick(s, [108, 98, 92]);
  const hry = pick(s, [92, 84, 78]);
  const by = pick(s, [326, 312, 300]);
  const brx = pick(s, [78, 82, 86]);
  const bry = pick(s, [58, 72, 84]);
  const eyeR = pick(s, [14, 13, 12]);
  const st = `stroke="${EDGE}" stroke-width="6" stroke-linejoin="round"`;

  // 꼬리 — 진돗개 말린 꼬리 (등 뒤 오른쪽)
  const tail =
    s === 0
      ? `M262 ${by + 4} C300 ${by + 2} 310 ${by - 40} 284 ${by - 46} C266 ${by - 50} 260 ${by - 26} 278 ${by - 22}`
      : `M262 ${by + 10} C330 ${by + 10} 352 ${by - 58} 318 ${by - 92} C292 ${by - 116} 252 ${by - 98} 262 ${by - 62} C268 ${by - 40} 300 ${by - 44} 300 ${by - 62}`;
  const tailW = pick(s, [22, 28, 32]);

  // 귀 — 아기는 끝이 접힌 둥근 귀, 크면 쫑긋
  const earL =
    s === 0
      ? `M${200 - hrx + 14} ${hy - 22} L${200 - 78} ${hy - 92} Q${200 - 68} ${hy - 112} ${200 - 52} ${hy - 96} L${200 - 22} ${hy - 62} Z`
      : `M${200 - hrx + 10} ${hy - 16} L${200 - 70} ${hy - 112} Q${200 - 62} ${hy - 128} ${200 - 48} ${hy - 114} L${200 - 18} ${hy - 62} Z`;
  const earInL =
    s === 0
      ? `M${200 - hrx + 32} ${hy - 34} L${200 - 72} ${hy - 82} Q${200 - 66} ${hy - 92} ${200 - 58} ${hy - 84} L${200 - 36} ${hy - 62} Z`
      : `M${200 - hrx + 30} ${hy - 30} L${200 - 64} ${hy - 96} Q${200 - 60} ${hy - 104} ${200 - 54} ${hy - 96} L${200 - 32} ${hy - 62} Z`;

  const legs =
    s === 0
      ? ''
      : [176, 224]
          .map(
            (x) =>
              `<rect x="${x - 17}" y="${by}" width="34" height="${380 - by}" rx="16" fill="${FUR}" ${st}/>`,
          )
          .join('');
  const paws = [176, 224]
    .map(
      (x) =>
        `<ellipse cx="${x}" cy="376" rx="${pick(s, [22, 23, 24])}" ry="13" fill="#FFFDF8" ${st}/>` +
        `<path d="M${x - 7} 370 L${x - 7} 380 M${x + 7} 370 L${x + 7} 380" stroke="${EDGE}" stroke-width="3.5" stroke-linecap="round"/>`,
    )
    .join('');
  const haunch = (cx: number) =>
    `<ellipse cx="${cx}" cy="${pick(s, [354, 348, 344])}" rx="${pick(s, [38, 42, 46])}" ry="${pick(s, [28, 34, 38])}" fill="${FUR}" ${st}/>`;

  // 목 장식 — 꼬마: 빨간 목줄 + 금 이름표 / 다 큰: 태극색 반다나
  const neckY = hy + hry - 14;
  const collar =
    s === 1
      ? `<path d="M${200 - 58} ${neckY} Q200 ${neckY + 24} ${200 + 58} ${neckY}" fill="none" stroke="#E8414C" stroke-width="13" stroke-linecap="round"/>` +
        `<circle cx="200" cy="${neckY + 24}" r="11" fill="#FFC83D" stroke="#D99A1E" stroke-width="4"/>`
      : s === 2
        ? `<path d="M${200 - 64} ${neckY - 2} Q200 ${neckY + 22} ${200 + 64} ${neckY - 2} L208 ${neckY + 62} Q200 ${neckY + 70} 192 ${neckY + 62} Z" fill="#E8414C" stroke="#C62F3B" stroke-width="4" stroke-linejoin="round"/>` +
          `<path d="M${200 - 64} ${neckY - 2} Q200 ${neckY + 22} ${200 + 64} ${neckY - 2}" fill="none" stroke="#2F5BD3" stroke-width="10" stroke-linecap="round"/>` +
          `<circle cx="188" cy="${neckY + 30}" r="4" fill="#fff" opacity=".85"/><circle cx="208" cy="${neckY + 40}" r="4" fill="#fff" opacity=".85"/><circle cx="198" cy="${neckY + 52}" r="3.5" fill="#fff" opacity=".85"/>`
        : '';

  const ny = hy + pick(s, [26, 24, 22]);
  const tongue = s >= 1 ? `<path d="M192 ${ny + 24} Q200 ${ny + 42} 208 ${ny + 24} Z" fill="#FF7A8A"/>` : '';
  const face =
    // 주둥이
    `<ellipse cx="200" cy="${ny + 14}" rx="${pick(s, [46, 47, 48])}" ry="${pick(s, [32, 33, 34])}" fill="#FFFFFF"/>` +
    // 눈썹 점 (진돗개 귀여운 포인트)
    `<ellipse cx="${200 - 40}" cy="${hy - 34}" rx="9" ry="5.5" fill="#EAD3B4"/><ellipse cx="${200 + 40}" cy="${hy - 34}" rx="9" ry="5.5" fill="#EAD3B4"/>` +
    // 눈
    [200 - 40, 200 + 40]
      .map(
        (x) =>
          `<circle cx="${x}" cy="${hy - 6}" r="${eyeR}" fill="${DARK}"/><circle cx="${x - eyeR * 0.32}" cy="${hy - 6 - eyeR * 0.36}" r="${r1(eyeR * 0.36)}" fill="#fff"/><circle cx="${x + eyeR * 0.34}" cy="${hy - 6 + eyeR * 0.3}" r="${r1(eyeR * 0.16)}" fill="#fff"/>`,
      )
      .join('') +
    // 볼
    `<ellipse cx="${200 - 64}" cy="${ny + 10}" rx="15" ry="9" fill="#FF9AA8" opacity=".45"/><ellipse cx="${200 + 64}" cy="${ny + 10}" rx="15" ry="9" fill="#FF9AA8" opacity=".45"/>` +
    tongue +
    // 코 · 입
    `<path d="M186 ${ny - 4} Q200 ${ny - 10} 214 ${ny - 4} Q214 ${ny + 8} 200 ${ny + 12} Q186 ${ny + 8} 186 ${ny - 4} Z" fill="${DARK}"/>` +
    `<ellipse cx="195" cy="${ny - 3}" rx="4.5" ry="2.6" fill="#fff" opacity=".55"/>` +
    `<path d="M200 ${ny + 12} L200 ${ny + 20} M186 ${ny + 22} Q193 ${ny + 30} 200 ${ny + 20} Q207 ${ny + 30} 214 ${ny + 22}" fill="none" stroke="${DARK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;

  return (
    shadow(pick(s, [96, 104, 112])) +
    `<path d="${tail}" fill="none" stroke="${EDGE}" stroke-width="${tailW + 10}" stroke-linecap="round"/>` +
    `<path d="${tail}" fill="none" stroke="${FUR}" stroke-width="${tailW}" stroke-linecap="round"/>` +
    haunch(200 - pick(s, [62, 66, 70])) +
    haunch(200 + pick(s, [62, 66, 70])) +
    `<ellipse cx="200" cy="${by}" rx="${brx}" ry="${bry}" fill="${FUR}" ${st}/>` +
    `<ellipse cx="200" cy="${by - 6}" rx="${brx * 0.55}" ry="${bry * 0.66}" fill="#FFFFFF" opacity=".85"/>` +
    legs +
    paws +
    collar +
    `<path d="${earL}" fill="${FUR}" ${st}/><path d="${mirror(earL)}" fill="${FUR}" ${st}/>` +
    `<path d="${earInL}" fill="#F7B9B0"/><path d="${mirror(earInL)}" fill="#F7B9B0"/>` +
    `<ellipse cx="200" cy="${hy}" rx="${hrx}" ry="${hry}" fill="${FUR}" ${st}/>` +
    `<ellipse cx="${200 - 30}" cy="${hy - hry * 0.55}" rx="${hrx * 0.42}" ry="${hry * 0.22}" fill="#fff" opacity=".5"/>` +
    face
  );
}

/* ───────── 아기 호랑이 ───────── */
function tiger(s: PetStage) {
  const FUR = '#FFA640';
  const EDGE = '#E07A12';
  const WHITE = '#FFF7EC';
  const STRIPE = '#3B2A2A';
  const hy = pick(s, [196, 178, 164]);
  const hrx = pick(s, [108, 100, 94]);
  const hry = pick(s, [90, 82, 78]);
  const by = pick(s, [326, 312, 300]);
  const brx = pick(s, [80, 84, 88]);
  const bry = pick(s, [58, 72, 84]);
  const eyeR = pick(s, [14, 13, 12]);
  const st = `stroke="${EDGE}" stroke-width="6" stroke-linejoin="round"`;
  const sw = (w: number) => `fill="none" stroke="${STRIPE}" stroke-width="${w}" stroke-linecap="round"`;

  const tail =
    s === 0
      ? `M262 ${by + 10} C300 ${by + 14} 318 ${by - 10} 306 ${by - 34}`
      : `M262 ${by + 30} C326 ${by + 34} 350 ${by - 14} 330 ${by - 62} C322 ${by - 80} 336 ${by - 96} 350 ${by - 100}`;
  const tailW = pick(s, [20, 24, 26]);

  const legs =
    s === 0
      ? ''
      : [176, 224]
          .map((x) => `<rect x="${x - 17}" y="${by}" width="34" height="${380 - by}" rx="16" fill="${FUR}" ${st}/>`)
          .join('');
  const paws = [176, 224]
    .map(
      (x) =>
        `<ellipse cx="${x}" cy="376" rx="${pick(s, [22, 23, 24])}" ry="13" fill="${WHITE}" ${st}/>` +
        `<path d="M${x - 7} 370 L${x - 7} 380 M${x + 7} 370 L${x + 7} 380" stroke="${EDGE}" stroke-width="3.5" stroke-linecap="round"/>`,
    )
    .join('');
  const haunch = (cx: number, side: 1 | -1) =>
    `<ellipse cx="${cx}" cy="${pick(s, [354, 348, 344])}" rx="${pick(s, [38, 42, 46])}" ry="${pick(s, [28, 34, 38])}" fill="${FUR}" ${st}/>` +
    `<path d="M${cx - side * 22} ${pick(s, [340, 332, 326])} Q${cx - side * 6} ${pick(s, [346, 340, 334])} ${cx + side * 2} ${pick(s, [334, 326, 318])}" ${sw(6)}/>`;

  // 몸 줄무늬 (옆구리)
  const bodyStripes = [-1, 1]
    .map((side) => {
      const x = 200 + side * brx;
      return (
        `<path d="M${x - side * 2} ${by - bry * 0.35} Q${x - side * 18} ${by - bry * 0.28} ${x - side * 24} ${by - bry * 0.42}" ${sw(7)}/>` +
        (s >= 1 ? `<path d="M${x - side * 2} ${by - bry * 0.02} Q${x - side * 20} ${by + bry * 0.04} ${x - side * 28} ${by - bry * 0.1}" ${sw(7)}/>` : '')
      );
    })
    .join('');

  // 목 장식 — 꼬마: 빨간 목줄 / 다 큰: 색동 목도리
  const neckY = hy + hry - 14;
  const SAEK = ['#E8414C', '#FFC83D', '#3FB872', '#2F5BD3', '#FF8FB3'];
  const scarf =
    s === 1
      ? `<path d="M${200 - 60} ${neckY} Q200 ${neckY + 24} ${200 + 60} ${neckY}" fill="none" stroke="#E8414C" stroke-width="13" stroke-linecap="round"/>`
      : s === 2
        ? `<clipPath id="tgScarf"><path d="M${200 - 30} ${neckY + 4} L${200 - 6} ${neckY + 12} L${200 - 14} ${neckY + 76} Q${200 - 26} ${neckY + 82} ${200 - 40} ${neckY + 74} Z"/></clipPath>` +
          `<g clip-path="url(#tgScarf)">${SAEK.map((c, i) => `<rect x="${200 - 50}" y="${neckY + i * 15}" width="60" height="15" fill="${c}"/>`).join('')}</g>` +
          `<path d="M${200 - 30} ${neckY + 4} L${200 - 6} ${neckY + 12} L${200 - 14} ${neckY + 76} Q${200 - 26} ${neckY + 82} ${200 - 40} ${neckY + 74} Z" fill="none" stroke="#B5323C" stroke-width="3" stroke-linejoin="round"/>` +
          `<path d="M${200 - 66} ${neckY - 2} Q200 ${neckY + 24} ${200 + 66} ${neckY - 2}" fill="none" stroke="#E8414C" stroke-width="16" stroke-linecap="round"/>` +
          `<path d="M${200 - 66} ${neckY - 2} Q200 ${neckY + 24} ${200 + 66} ${neckY - 2}" fill="none" stroke="#FFC83D" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 14"/>`
        : '';

  const ny = hy + pick(s, [26, 24, 22]);
  const ear = (side: 1 | -1) => {
    const cx = 200 + side * (hrx - 26);
    const cy = hy - hry + 14;
    const r = pick(s, [28, 28, 28]);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${FUR}" ${st}/><circle cx="${cx}" cy="${cy + 3}" r="${r * 0.52}" fill="#FFE1C6"/>`;
  };
  const headStripes =
    // 이마 — 王 느낌 세 줄
    `<path d="M${200 - 24} ${hy - hry + 22} Q200 ${hy - hry + 30} ${200 + 24} ${hy - hry + 22}" ${sw(8)}/>` +
    `<path d="M${200 - 15} ${hy - hry + 38} Q200 ${hy - hry + 44} ${200 + 15} ${hy - hry + 38}" ${sw(7)}/>` +
    `<path d="M${200 - 7} ${hy - hry + 52} L${200 + 7} ${hy - hry + 52}" ${sw(6)}/>` +
    // 볼 옆 줄
    [-1, 1]
      .map(
        (side) =>
          `<path d="M${200 + side * (hrx - 2)} ${hy - 4} L${200 + side * (hrx - 26)} ${hy + 2}" ${sw(7)}/>` +
          `<path d="M${200 + side * (hrx - 6)} ${hy + 18} L${200 + side * (hrx - 28)} ${hy + 20}" ${sw(7)}/>`,
      )
      .join('');
  const face =
    // 눈 위 흰 점 · 흰 주둥이
    `<ellipse cx="${200 - 40}" cy="${hy - 32}" rx="14" ry="7" fill="${WHITE}"/><ellipse cx="${200 + 40}" cy="${hy - 32}" rx="14" ry="7" fill="${WHITE}"/>` +
    `<circle cx="${200 - 24}" cy="${ny + 14}" r="${pick(s, [30, 29, 28])}" fill="${WHITE}"/><circle cx="${200 + 24}" cy="${ny + 14}" r="${pick(s, [30, 29, 28])}" fill="${WHITE}"/>` +
    `<ellipse cx="200" cy="${ny + 34}" rx="22" ry="14" fill="${WHITE}"/>` +
    [200 - 40, 200 + 40]
      .map(
        (x) =>
          `<circle cx="${x}" cy="${hy - 6}" r="${eyeR}" fill="${STRIPE}"/><circle cx="${x - eyeR * 0.32}" cy="${hy - 6 - eyeR * 0.36}" r="${r1(eyeR * 0.36)}" fill="#fff"/><circle cx="${x + eyeR * 0.34}" cy="${hy - 6 + eyeR * 0.3}" r="${r1(eyeR * 0.16)}" fill="#fff"/>`,
      )
      .join('') +
    `<ellipse cx="${200 - 66}" cy="${ny + 12}" rx="14" ry="8" fill="#FF7A6A" opacity=".35"/><ellipse cx="${200 + 66}" cy="${ny + 12}" rx="14" ry="8" fill="#FF7A6A" opacity=".35"/>` +
    // 수염 점
    [-1, 1].map((side) => `<circle cx="${200 + side * 30}" cy="${ny + 14}" r="2.6" fill="${EDGE}"/><circle cx="${200 + side * 40}" cy="${ny + 8}" r="2.6" fill="${EDGE}"/><circle cx="${200 + side * 40}" cy="${ny + 20}" r="2.6" fill="${EDGE}"/>`).join('') +
    `<path d="M188 ${ny - 2} Q200 ${ny - 8} 212 ${ny - 2} Q212 ${ny + 8} 200 ${ny + 11} Q188 ${ny + 8} 188 ${ny - 2} Z" fill="#F0697A"/>` +
    `<ellipse cx="196" cy="${ny - 1}" rx="4" ry="2.4" fill="#fff" opacity=".55"/>` +
    `<path d="M200 ${ny + 11} L200 ${ny + 18} M187 ${ny + 20} Q193 ${ny + 28} 200 ${ny + 18} Q207 ${ny + 28} 213 ${ny + 20}" fill="none" stroke="${STRIPE}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;

  return (
    shadow(pick(s, [98, 106, 114])) +
    `<path d="${tail}" fill="none" stroke="${EDGE}" stroke-width="${tailW + 10}" stroke-linecap="round"/>` +
    `<path d="${tail}" fill="none" stroke="${FUR}" stroke-width="${tailW}" stroke-linecap="round"/>` +
    `<path d="${tail}" fill="none" stroke="${STRIPE}" stroke-width="${tailW}" stroke-dasharray="7 15" stroke-dashoffset="-14"/>` +
    haunch(200 - pick(s, [62, 66, 70]), -1) +
    haunch(200 + pick(s, [62, 66, 70]), 1) +
    `<ellipse cx="200" cy="${by}" rx="${brx}" ry="${bry}" fill="${FUR}" ${st}/>` +
    `<ellipse cx="200" cy="${by + 4}" rx="${brx * 0.52}" ry="${bry * 0.66}" fill="${WHITE}"/>` +
    bodyStripes +
    legs +
    paws +
    scarf +
    ear(-1) +
    ear(1) +
    `<ellipse cx="200" cy="${hy}" rx="${hrx}" ry="${hry}" fill="${FUR}" ${st}/>` +
    `<ellipse cx="${200 - 34}" cy="${hy - hry * 0.6}" rx="${hrx * 0.36}" ry="${hry * 0.18}" fill="#fff" opacity=".28"/>` +
    headStripes +
    face
  );
}

/* ───────── 미니 한글몬 ───────── */
function hangulmon(s: PetStage) {
  const BODY_EDGE = '#5B43C6';
  const r = pick(s, [112, 110, 108]);
  const cy = pick(s, [244, 230, 222]);
  const st = `stroke="${BODY_EDGE}" stroke-width="6"`;
  // 더듬이 길이 — 자랄수록 길어진다
  const ant = pick(s, [22, 44, 60]);
  const ballR = pick(s, [15, 18, 21]);
  const antenna = (side: 1 | -1) => {
    const x0 = 200 + side * 50;
    const y0 = cy - r + 22;
    const x1 = x0 + side * ant * 0.42;
    const y1 = y0 - ant;
    const stripes =
      s >= 1
        ? [0.35, 0.62]
            .map((t) => {
              const x = x0 + (x1 - x0) * t;
              const y = y0 + (y1 - y0) * t;
              return `<path d="M${r1(x - 9)} ${r1(y + side * 3)} L${r1(x + 9)} ${r1(y - side * 3)}" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>`;
            })
            .join('')
        : '';
    return (
      `<path d="M${x0} ${y0} L${r1(x1)} ${r1(y1)}" stroke="${BODY_EDGE}" stroke-width="${pick(s, [24, 22, 22])}" stroke-linecap="round"/>` +
      `<path d="M${x0} ${y0} L${r1(x1)} ${r1(y1)}" stroke="#8A6FF0" stroke-width="${pick(s, [14, 12, 12])}" stroke-linecap="round"/>` +
      stripes +
      `<circle cx="${r1(x1)}" cy="${r1(y1)}" r="${ballR}" fill="url(#hmBall)" ${st}/>` +
      `<circle cx="${r1(x1 - ballR * 0.35)}" cy="${r1(y1 - ballR * 0.35)}" r="${r1(ballR * 0.3)}" fill="#fff" opacity=".45"/>`
    );
  };
  const eyeR = pick(s, [54, 50, 46]);
  const ey = cy - pick(s, [14, 18, 20]);
  const feet = [200 - 46, 200 + 46]
    .map((x) => `<ellipse cx="${x}" cy="372" rx="${pick(s, [30, 32, 34])}" ry="16" fill="#6E54DD" ${st}/>`)
    .join('');
  const arms = [-1, 1]
    .map((side) => `<ellipse cx="${200 + side * (r - 4)}" cy="${cy + 34}" rx="20" ry="28" transform="rotate(${side * -24} ${200 + side * (r - 4)} ${cy + 34})" fill="#7C61E8" ${st}/>`)
    .join('');
  const my = ey + eyeR + pick(s, [16, 18, 18]);
  const mouth =
    s === 0
      ? `<path d="M${200 - 16} ${my} Q200 ${my + 14} ${200 + 16} ${my}" fill="none" stroke="#3B1F5E" stroke-width="6" stroke-linecap="round"/>`
      : `<path d="M${200 - 26} ${my - 2} Q200 ${my + 34} ${200 + 26} ${my - 2} Z" fill="#3B1F5E" stroke="#3B1F5E" stroke-width="4" stroke-linejoin="round"/>` +
        `<path d="M${200 - 14} ${my + 14} Q200 ${my + 6} ${200 + 14} ${my + 14} Q200 ${my + 26} ${200 - 14} ${my + 14} Z" fill="#FF7A8A"/>`;

  // 꼬마: 노란 연필 / 다 큰: "한글" 노란 책
  const prop =
    s === 1
      ? `<g transform="rotate(-28 ${200 + r + 4} ${cy + 20})">` +
        `<rect x="${200 + r - 6}" y="${cy - 40}" width="20" height="78" rx="4" fill="#FFC83D" stroke="#C98A12" stroke-width="4"/>` +
        `<path d="M${200 + r - 6} ${cy - 40} L${200 + r + 4} ${cy - 62} L${200 + r + 14} ${cy - 40} Z" fill="#F6D7A8" stroke="#C98A12" stroke-width="4" stroke-linejoin="round"/>` +
        `<path d="M${200 + r + 1} ${cy - 53} L${200 + r + 4} ${cy - 62} L${200 + r + 7} ${cy - 53} Z" fill="#3B2A2A"/>` +
        `<rect x="${200 + r - 6}" y="${cy + 26}" width="20" height="12" rx="3" fill="#FF8FB3" stroke="#C98A12" stroke-width="4"/>` +
        `</g>`
      : s === 2
        ? `<g transform="rotate(10 ${200 + r + 6} ${cy + 30})">` +
          `<rect x="${200 + r - 40}" y="${cy - 30}" width="84" height="100" rx="10" fill="#E2A21C"/>` +
          `<rect x="${200 + r - 44}" y="${cy - 34}" width="84" height="100" rx="10" fill="#FFC83D" stroke="#C98A12" stroke-width="4"/>` +
          `<rect x="${200 + r - 38}" y="${cy - 34}" width="8" height="100" fill="#E2A21C"/>` +
          hangul('한글', 200 + r + 4, cy + 30, 34, 'fill="#FFFFFF" stroke="#C98A12" stroke-width="10" paint-order="stroke" stroke-linejoin="round"') +
          `</g>`
        : '';

  return (
    shadow(pick(s, [100, 108, 112])) +
    antenna(-1) +
    antenna(1) +
    feet +
    `<circle cx="200" cy="${cy}" r="${r}" fill="url(#hmBody)" ${st}/>` +
    `<ellipse cx="${200 - 40}" cy="${cy - r * 0.62}" rx="${r * 0.38}" ry="${r * 0.18}" fill="#fff" opacity=".22"/>` +
    arms +
    // 눈 — 하나
    `<circle cx="200" cy="${ey}" r="${eyeR}" fill="#FFFFFF" stroke="#4A35B0" stroke-width="5"/>` +
    `<circle cx="200" cy="${ey + 3}" r="${r1(eyeR * 0.56)}" fill="#4A2FA0"/>` +
    `<circle cx="200" cy="${ey + 3}" r="${r1(eyeR * 0.3)}" fill="#1A1040"/>` +
    `<circle cx="${r1(200 - eyeR * 0.22)}" cy="${r1(ey - eyeR * 0.2)}" r="${r1(eyeR * 0.17)}" fill="#fff"/>` +
    `<circle cx="${r1(200 + eyeR * 0.2)}" cy="${r1(ey + eyeR * 0.22)}" r="${r1(eyeR * 0.08)}" fill="#fff"/>` +
    `<ellipse cx="${200 - r * 0.62}" cy="${my - 8}" rx="16" ry="10" fill="#FF8FB3" opacity=".6"/><ellipse cx="${200 + r * 0.62}" cy="${my - 8}" rx="16" ry="10" fill="#FF8FB3" opacity=".6"/>` +
    mouth +
    prop
  );
}

/* ───────── 도깨비 ───────── */
function dokkaebi(s: PetStage) {
  const EDGE = '#2C78C2';
  const NAVY = '#262B5E';
  const rx = pick(s, [104, 104, 106]);
  const ry = pick(s, [104, 112, 118]);
  const cy = pick(s, [250, 240, 236]);
  const st = `stroke="${EDGE}" stroke-width="6" stroke-linejoin="round"`;
  const top = cy - ry;

  // 뿔 — 아기: 작은 혹 하나 / 꼬마: 뿔 하나 / 다 큰: 뿔 둘
  const horn = (x: number, h: number, lean: number) =>
    `<path d="M${x - 15} ${top + 12} Q${x + lean * 0.4} ${top - h * 0.5} ${x + lean} ${top - h} Q${x + 10 + lean * 0.2} ${top - h * 0.4} ${x + 15} ${top + 12} Z" fill="#FFD45C" stroke="#D9A21E" stroke-width="5" stroke-linejoin="round"/>` +
    `<path d="M${x - 8} ${top + 2} Q${x + lean * 0.3} ${top - h * 0.3} ${x + lean * 0.7} ${top - h * 0.72}" fill="none" stroke="#FFF1B8" stroke-width="4" stroke-linecap="round" opacity=".8"/>`;
  const horns =
    s === 0
      ? horn(200, 22, 0)
      : s === 1
        ? horn(200, 46, 4)
        : horn(200 - 40, 50, -12) + horn(200 + 40, 50, 12);
  // 곱슬머리
  // 정수리 곱슬 한 줌 (뿔은 그 위로)
  const hair = [-14, 0, 14]
    .map((dx, i) => `<circle cx="${200 + dx}" cy="${top + 10 - (i === 1 ? 5 : 0)}" r="${pick(s, [11, 12, 13])}" fill="${NAVY}"/>`)
    .join('') + `<circle cx="194" cy="${top + 2}" r="3.5" fill="#fff" opacity=".2"/>`;

  // 호랑이 가죽 반바지 (몸 아래쪽을 잘라 씀)
  const shortsTop = cy + ry * 0.36;
  const hem = cy + ry * 0.86;
  const zig = Array.from({ length: 11 }, (_, i) => {
    const x = 200 + rx + 10 - (i * (rx * 2 + 20)) / 10;
    return `${r1(x)} ${r1(hem + (i % 2 ? 12 : 0))}`;
  }).join(' L');
  const shorts =
    `<clipPath id="dkBody"><ellipse cx="200" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath>` +
    `<g clip-path="url(#dkBody)">` +
    `<path d="M${200 - rx - 10} ${shortsTop} Q200 ${shortsTop + 16} ${200 + rx + 10} ${shortsTop} L${zig} Z" fill="#FFB52E" stroke="#D98A12" stroke-width="4" stroke-linejoin="round"/>` +
    [[-62, 14], [-22, 22], [18, 16], [56, 24], [-44, 44], [0, 50], [40, 46], [80, 36], [-82, 34]]
      .map(([dx, dy]) => `<path d="M${200 + dx - 8} ${r1(shortsTop + dy)} q8 4 6 14" fill="none" stroke="#3B2A2A" stroke-width="6.5" stroke-linecap="round"/>`)
      .join('') +
    `<path d="M${200 - rx - 10} ${shortsTop} Q200 ${shortsTop + 16} ${200 + rx + 10} ${shortsTop}" fill="none" stroke="#8C5A2B" stroke-width="9"/>` +
    `</g>`;

  const ey = cy - pick(s, [10, 14, 16]);
  const eyeR = pick(s, [26, 24, 22]);
  const eyes = [200 - 34, 200 + 34]
    .map(
      (x) =>
        `<circle cx="${x}" cy="${ey}" r="${eyeR}" fill="#fff" stroke="${EDGE}" stroke-width="4"/>` +
        `<circle cx="${x + (x < 200 ? 3 : -3)}" cy="${ey + 3}" r="${r1(eyeR * 0.5)}" fill="#1E1A3A"/>` +
        `<circle cx="${x + (x < 200 ? 0 : -6)}" cy="${ey - 3}" r="${r1(eyeR * 0.18)}" fill="#fff"/>`,
    )
    .join('');
  // 굵은 눈썹 (장난꾸러기)
  const brows = [-1, 1]
    .map((side) => `<path d="M${200 + side * 14} ${ey - eyeR - 6} Q${200 + side * 34} ${ey - eyeR - 18} ${200 + side * 56} ${ey - eyeR - 8}" fill="none" stroke="${NAVY}" stroke-width="9" stroke-linecap="round"/>`)
    .join('');
  const my = ey + eyeR + 18;
  const mw = pick(s, [30, 38, 44]);
  // 씩 웃는 입 + 아래에서 올라온 송곳니 둘
  const mouth =
    `<path d="M${200 - mw} ${my} Q200 ${my + mw * 0.95} ${200 + mw} ${my} Q200 ${my + 10} ${200 - mw} ${my} Z" fill="#3B1F3F" stroke="#3B1F3F" stroke-width="4" stroke-linejoin="round"/>` +
    `<path d="M${200 - mw * 0.5} ${my + mw * 0.5} Q200 ${my + mw * 0.3} ${200 + mw * 0.5} ${my + mw * 0.5} Q200 ${my + mw * 0.78} ${200 - mw * 0.5} ${my + mw * 0.5} Z" fill="#FF7A8A"/>` +
    (s >= 1
      ? [-1, 1]
          .map((side) => {
            const x = 200 + side * mw * 0.55;
            const y = my + mw * 0.36;
            return `<path d="M${r1(x - 6)} ${r1(y + 4)} L${r1(x)} ${r1(y - 12)} L${r1(x + 6)} ${r1(y + 4)} Z" fill="#fff"/>`;
          })
          .join('')
      : '');
  const feet = [200 - 44, 200 + 44]
    .map((x) => `<ellipse cx="${x}" cy="372" rx="${pick(s, [28, 30, 32])}" ry="16" fill="#4AA6EC" ${st}/>`)
    .join('');
  const arm = (side: 1 | -1) =>
    `<ellipse cx="${200 + side * (rx - 2)}" cy="${cy + 24}" rx="20" ry="30" transform="rotate(${side * -20} ${200 + side * (rx - 2)} ${cy + 24})" fill="#5DB4F2" ${st}/>`;

  // 방망이 — 꼬마: 나무 / 다 큰: 금
  // 오른손에 쥔다 — 손잡이 아래쪽을 팔이 덮는다
  const clubX = 200 + rx + 8;
  const clubY = cy + 2;
  const club = (gold: boolean) => {
    const fill = gold ? '#FFC83D' : '#B97A4A';
    const edge = gold ? '#C98A12' : '#7A4A28';
    const stud = gold ? '#FFF1B8' : '#E2B486';
    return (
      `<g transform="rotate(${gold ? 24 : 20} ${clubX} ${clubY + 30})">` +
      `<path d="M${clubX - 8} ${clubY + 30} L${clubX - 18} ${clubY - 70} Q${clubX} ${clubY - 98} ${clubX + 18} ${clubY - 70} L${clubX + 8} ${clubY + 30} Z" fill="${fill}" stroke="${edge}" stroke-width="5" stroke-linejoin="round"/>` +
      [[-8, -62], [6, -48], [-6, -32], [8, -18], [-4, -76]]
        .map(([dx, dy]) => `<circle cx="${clubX + dx}" cy="${clubY + dy}" r="${gold ? 5 : 4}" fill="${stud}" stroke="${edge}" stroke-width="2.5"/>`)
        .join('') +
      `</g>`
    );
  };

  return (
    shadow(pick(s, [100, 108, 112])) +
    feet +
    `<ellipse cx="200" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#dkBody2)" ${st}/>` +
    `<ellipse cx="200" cy="${cy + ry * 0.12}" rx="${rx * 0.56}" ry="${ry * 0.5}" fill="#A6DDFF" opacity=".6"/>` +
    shorts +
    `<ellipse cx="200" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" ${st}/>` +
    `<ellipse cx="${200 - 40}" cy="${cy - ry * 0.66}" rx="${rx * 0.34}" ry="${ry * 0.14}" fill="#fff" opacity=".28"/>` +
    horns +
    hair +
    arm(-1) +
    (s >= 1 ? club(s === 2) : '') +
    arm(1) +
    brows +
    eyes +
    `<ellipse cx="${200 - 64}" cy="${my - 6}" rx="15" ry="9" fill="#FF8FB3" opacity=".55"/><ellipse cx="${200 + 64}" cy="${my - 6}" rx="15" ry="9" fill="#FF8FB3" opacity=".55"/>` +
    mouth
  );
}

const DEFS =
  rg('hmBody', [[0, '#A58CF8'], [0.7, '#7F63E6'], [1, '#6A4FD6']], 0.38, 0.32, 0.75) +
  rg('hmBall', [[0, '#B6A0FA'], [1, '#7656E2']], 0.35, 0.3, 0.8) +
  rg('dkBody2', [[0, '#8ED2FF'], [0.7, '#5DB4F2'], [1, '#3F9BE4']], 0.38, 0.3, 0.8) +
''

export const PETS: Record<PetId, (s: PetStage) => string> = {
  pet_jindo: jindo,
  pet_hangulmon: hangulmon,
  pet_tiger: tiger,
  pet_dokkaebi: dokkaebi,
};

export function petSvg(id: PetId, stage: PetStage, size = PET_W) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${PET_W} ${PET_H}"><defs>${DEFS}</defs>${PETS[id](stage)}</svg>`;
}
