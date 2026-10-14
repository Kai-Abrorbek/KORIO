import { H, W, hangul, lg, rg, rng, stars, svg, windows } from './kit';

/**
 * 캐릭터 뒤에 까는 "서울 여행" 장면 6장 (정지 그림).
 * 캔버스 1200×1000. 캐릭터는 가운데(x 420~780)에 서고 발은 y≈900 — 랜드마크는 양옆·머리 위에 둔다.
 */

/* ───────── 1. 경복궁 야경 ───────── */
function gyeongbokgung() {
  const defs =
    lg('gbSky', [[0, '#0B0D2E'], [0.45, '#23204F'], [0.72, '#4B3468'], [1, '#6A4270']]) +
    rg('gbMoon', [[0, '#FFF6DA', 1], [0.35, '#FFE9B0', 0.35], [1, '#FFE9B0', 0]]) +
    rg('gbGlow', [[0, '#FFB65C', 0.55], [0.6, '#FF8A3D', 0.12], [1, '#FF8A3D', 0]]) +
    lg('gbDoor', [[0, '#FFD98A'], [1, '#FF9E45']]) +
    lg('gbRoof', [[0, '#3A3B57'], [1, '#22233A']]) +
    lg('gbUnder', [[0, '#C8743A'], [1, '#7A3B24']]) +
    lg('gbYard', [[0, '#3A3458'], [1, '#191732']]) +
    lg('gbStone', [[0, '#9A93B8'], [1, '#5E587D']]) +
    lg('gbMtn', [[0, '#2A2655'], [1, '#1A1838']]);

  // 지붕 하나 — 끝이 들린 처마 (팔작지붕 실루엣)
  const roof = (l: number, r: number, eaveY: number, sag: number, topY: number, inset: number, lift: number) => {
    const mid = (l + r) / 2;
    return `M${l} ${eaveY - lift} C${l + 90} ${eaveY + sag * 0.6} ${mid - 220} ${eaveY + sag} ${mid} ${eaveY + sag} C${mid + 220} ${eaveY + sag} ${r - 90} ${eaveY + sag * 0.6} ${r} ${eaveY - lift} Q${r - inset * 0.55} ${topY + (eaveY - topY) * 0.45} ${r - inset} ${topY} L${l + inset} ${topY} Q${l + inset * 0.55} ${topY + (eaveY - topY) * 0.45} ${l} ${eaveY - lift} Z`;
  };

  // 기둥·문 (y 424~590)
  const cols = [150, 250, 350, 450, 550, 650, 750, 850, 950, 1050];
  const doors = cols
    .slice(0, -1)
    .map((x, i) => {
      const nx = cols[i + 1];
      const lines = [1, 2, 3].map((k) => `<path d="M${x + 8 + ((nx - x - 16) * k) / 4} 440 V582" stroke="#C8662E" stroke-width="2.5" opacity=".55"/>`).join('');
      return `<rect x="${x + 8}" y="440" width="${nx - x - 16}" height="142" fill="url(#gbDoor)"/>${lines}<path d="M${x + 8} 488 H${nx - 8} M${x + 8} 536 H${nx - 8}" stroke="#C8662E" stroke-width="2.5" opacity=".45"/>`;
    })
    .join('');
  const pillars = cols.map((x) => `<rect x="${x - 9}" y="424" width="18" height="166" fill="#A3302B"/><rect x="${x - 9}" y="424" width="5" height="166" fill="#C9483C"/>`).join('');

  // 박석 마당 — 가운데로 모이는 줄
  const yardLines =
    Array.from({ length: 13 }, (_, i) => {
      const x = -300 + i * 150;
      return `<path d="M600 660 L${x} 1000" stroke="#4E4772" stroke-width="2" opacity=".5"/>`;
    }).join('') +
    [700, 752, 816, 896].map((y) => `<path d="M0 ${y} H${W}" stroke="#4E4772" stroke-width="2" opacity=".42"/>`).join('');

  // 청사초롱 — 위 파랑, 아래 빨강
  const lantern = (x: number, y: number, flip: boolean) => {
    const post = flip ? x + 70 : x - 70;
    const arm = `M${post} ${y - 100} H${x} V${y - 80}`;
    return (
      `<circle cx="${x}" cy="${y}" r="150" fill="url(#gbGlow)"/>` +
      `<rect x="${post - 9}" y="${y - 106}" width="18" height="${1000 - y + 106}" fill="#3A2A30"/>` +
      `<path d="${arm}" fill="none" stroke="#3A2A30" stroke-width="8" stroke-linecap="round"/>` +
      `<rect x="${x - 32}" y="${y - 82}" width="64" height="12" rx="5" fill="#2A1F2A"/>` +
      `<path d="M${x - 36} ${y - 70} H${x + 36} V${y - 6} H${x - 36} Z" fill="#2F6FD1"/>` +
      `<path d="M${x - 36} ${y - 6} H${x + 36} V${y + 50} Q${x} ${y + 64} ${x - 36} ${y + 50} Z" fill="#E0413B"/>` +
      `<rect x="${x - 36}" y="${y - 70}" width="72" height="120" fill="#FFE3A3" opacity=".22"/>` +
      `<path d="M${x - 19} ${y - 62} V${y + 46}" stroke="#fff" stroke-width="6" opacity=".25" stroke-linecap="round"/>` +
      `<rect x="${x - 26}" y="${y + 52}" width="52" height="10" rx="4" fill="#2A1F2A"/>` +
      `<path d="M${x} ${y + 62} V${y + 96}" stroke="#E0413B" stroke-width="5" stroke-linecap="round"/>`
    );
  };

  const body =
    `<rect width="${W}" height="${H}" fill="url(#gbSky)"/>` +
    stars(11, 70, 300, (x, y) => Math.hypot(x - 170, y - 120) < 110 || (x > 140 && x < 1060 && y > 120)) +
    `<circle cx="170" cy="120" r="140" fill="url(#gbMoon)"/><circle cx="170" cy="120" r="52" fill="#FFF3D2"/><circle cx="154" cy="108" r="11" fill="#F1DFB2" opacity=".6"/><circle cx="186" cy="136" r="7" fill="#F1DFB2" opacity=".5"/>` +
    // 북악산
    `<path d="M0 380 C160 330 260 300 380 312 C480 220 620 160 720 186 C800 206 880 260 960 280 C1050 300 1130 318 1200 336 V700 H0 Z" fill="url(#gbMtn)"/>` +
    `<path d="M0 430 C200 384 400 384 600 392 C820 384 1000 384 1200 414 V700 H0 Z" fill="#17162F" opacity=".8"/>` +
    // 궁 뒤 불빛
    `<ellipse cx="600" cy="460" rx="640" ry="280" fill="url(#gbGlow)"/>` +
    // 위층 벽 + 창
    `<rect x="300" y="262" width="600" height="70" fill="#5A2A24"/>` +
    [330, 410, 490, 640, 720, 800].map((x) => `<rect x="${x}" y="276" width="62" height="44" fill="url(#gbDoor)"/><path d="M${x + 31} 276 V320" stroke="#C8662E" stroke-width="2" opacity=".5"/>`).join('') +
    // 위 지붕
    `<path d="${roof(130, 1070, 262, 26, 156, 270, 18)}" fill="url(#gbRoof)" stroke="#625D92" stroke-width="3"/>` +
    `<path d="M144 252 C300 280 450 288 600 288 C750 288 900 280 1056 252" fill="none" stroke="#F0A75A" stroke-width="5" opacity=".75"/>` +
    `<path d="M392 158 H808" stroke="#16172A" stroke-width="20" stroke-linecap="round"/><path d="M382 164 Q372 138 392 130 M818 164 Q828 138 808 130" stroke="#16172A" stroke-width="14" fill="none" stroke-linecap="round"/>` +
    // 처마 밑 단청 + 아래 지붕
    `<rect x="110" y="404" width="980" height="22" fill="#2C8C7E"/>` +
    Array.from({ length: 33 }, (_, i) => `<circle cx="${124 + i * 29.6}" cy="415" r="5.5" fill="${i % 3 === 0 ? '#E0413B' : i % 3 === 1 ? '#F4C95D' : '#9FE3C8'}"/>`).join('') +
    `<path d="${roof(20, 1180, 388, 30, 318, 330, 24)}" fill="url(#gbRoof)" stroke="#625D92" stroke-width="3"/>` +
    `<path d="M34 378 C220 408 420 420 600 420 C780 420 980 408 1166 378" fill="none" stroke="#F0A75A" stroke-width="6" opacity=".78"/>` +
    // 기둥·문
    `<rect x="130" y="424" width="940" height="166" fill="#5A2A24"/>` +
    doors +
    pillars +
    // 월대
    `<rect x="110" y="590" width="980" height="36" fill="url(#gbStone)"/><rect x="50" y="626" width="1100" height="38" fill="#6E6890"/>` +
    `<path d="M110 590 H1090 M50 626 H1150" stroke="#D9D0F0" stroke-width="3" opacity=".6"/>` +
    Array.from({ length: 21 }, (_, i) => `<rect x="${116 + i * 47.6}" y="572" width="9" height="20" fill="#B9B0D6"/>`).join('') +
    `<path d="M116 576 H1088" stroke="#B9B0D6" stroke-width="5"/>` +
    // 마당
    `<rect x="0" y="662" width="${W}" height="338" fill="url(#gbYard)"/>` +
    yardLines +
    `<ellipse cx="600" cy="700" rx="460" ry="80" fill="#FFB65C" opacity=".14"/>` +
    lantern(100, 560, false) +
    lantern(1100, 560, true);

  return { defs, body };
}

/* ───────── 2. 남산타워 ───────── */
function namsan() {
  const defs =
    lg('nsSky', [[0, '#231A52'], [0.4, '#5B3A8C'], [0.66, '#D9728E'], [0.82, '#FFB07A'], [1, '#FFD39A']]) +
    rg('nsSun', [[0, '#FFE6A8', 0.9], [1, '#FFB07A', 0]]) +
    lg('nsHill', [[0, '#3C2B66'], [1, '#22183F']]) +
    lg('nsTower', [[0, '#FFFFFF'], [1, '#D8D2EE']], 0, 0, 1, 0) +
    rg('nsGlow', [[0, '#FFF2C4', 0.8], [1, '#FFF2C4', 0]]) +
    lg('nsCity', [[0, '#3A2A63'], [1, '#22183F']]) +
    lg('nsDeck', [[0, '#3B2D57'], [1, '#1B1430']]);

  const rand = rng(23);
  // 도시 — 높이 제각각 건물 + 창
  const city: string[] = [];
  for (let x = -10; x < W; ) {
    const w = 46 + rand() * 70;
    const h = 90 + rand() * 170;
    const top = 760 - h;
    city.push(`<rect x="${x.toFixed(0)}" y="${top.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="url(#nsCity)"/>`);
    city.push(windows(Math.floor(x + 7), x, top, w, h, { cw: 7, ch: 9, gap: 7, on: 0.45, color: '#FFD98A' }));
    x += w + 2 + rand() * 6;
  }

  // 사랑의 자물쇠
  const locks = (x0: number, x1: number, seed: number) => {
    const rr = rng(seed);
    const colors = ['#FF5C8A', '#FFD43B', '#4FC3F7', '#7ED957', '#B48CF5', '#FF8A3D', '#FF4D6D'];
    const out: string[] = [];
    for (let i = 0; i < 46; i += 1) {
      const x = x0 + rr() * (x1 - x0);
      const y = 792 + rr() * 40;
      const c = colors[Math.floor(rr() * colors.length)];
      const s = 0.8 + rr() * 0.5;
      out.push(
        `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${(rr() * 30 - 15).toFixed(0)}) scale(${s.toFixed(2)})"><path d="M-7 0 V-8 A7 7 0 0 1 7 -8 V0" fill="none" stroke="#C9C3DA" stroke-width="3.5"/><rect x="-11" y="-2" width="22" height="18" rx="5" fill="${c}"/><rect x="-11" y="-2" width="22" height="6" rx="3" fill="#fff" opacity=".25"/><circle cx="0" cy="8" r="2.5" fill="#2A1F3A" opacity=".5"/></g>`,
      );
    }
    return out.join('');
  };

  const body =
    `<rect width="${W}" height="${H}" fill="url(#nsSky)"/>` +
    stars(5, 26, 260) +
    `<circle cx="420" cy="640" r="260" fill="url(#nsSun)"/>` +
    // 남산
    `<path d="M560 600 C640 520 720 470 820 452 C900 440 980 446 1060 470 C1120 488 1170 520 1200 540 V760 H560 Z" fill="url(#nsHill)"/>` +
    Array.from({ length: 22 }, (_, i) => `<circle cx="${600 + i * 28}" cy="${470 + Math.abs(i - 11) * 6 + (i % 2) * 6}" r="${16 + (i % 3) * 4}" fill="#2F2252"/>`).join('') +
    // 남산타워
    `<circle cx="940" cy="250" r="190" fill="url(#nsGlow)"/>` +
    `<path d="M904 470 L922 300 H958 L976 470 Z" fill="url(#nsTower)"/>` +
    `<rect x="900" y="455" width="80" height="22" rx="4" fill="#EDE8FA"/>` +
    `<path d="M918 300 H962 L956 292 H924 Z" fill="#CFC7EA"/>` +
    `<rect x="896" y="236" width="88" height="56" rx="16" fill="url(#nsTower)"/>` +
    `<rect x="902" y="252" width="76" height="12" rx="6" fill="#FFCE6B"/>` +
    `<rect x="902" y="268" width="76" height="8" rx="4" fill="#FF8FB3" opacity=".9"/>` +
    `<path d="M908 236 Q940 214 972 236 Z" fill="#E4DEF7"/>` +
    `<rect x="934" y="120" width="12" height="100" fill="#EDE8FA"/><rect x="938" y="64" width="4" height="60" fill="#D8D2EE"/><circle cx="940" cy="62" r="7" fill="#FF4D6D"/><circle cx="940" cy="62" r="18" fill="#FF4D6D" opacity=".25"/>` +
    city.join('') +
    // 난간 + 자물쇠
    `<rect x="0" y="830" width="${W}" height="170" fill="url(#nsDeck)"/>` +
    `<path d="M0 786 H${W}" stroke="#8C84B0" stroke-width="7"/><path d="M0 840 H${W}" stroke="#8C84B0" stroke-width="6"/>` +
    Array.from({ length: 13 }, (_, i) => `<rect x="${i * 100 - 4}" y="780" width="9" height="70" fill="#A39CC6"/>`).join('') +
    locks(0, 400, 7) +
    locks(800, 1200, 9);

  return { defs, body };
}

/* ───────── 3. 한강 라면 ───────── */
function hangang() {
  const defs =
    lg('hgSky', [[0, '#0A1430'], [0.55, '#1C2A57'], [1, '#34427A']]) +
    lg('hgRiver', [[0, '#1E2C5E'], [1, '#0E1634']]) +
    lg('hg63', [[0, '#FFE08A'], [1, '#C98A2B']], 0, 0, 1, 0) +
    lg('hgCity', [[0, '#26315E'], [1, '#141B3A']]) +
    lg('hgGrass', [[0, '#1F3B3A'], [1, '#0F2025']]) +
    rg('hgSteam', [[0, '#FFFFFF', 0.5], [1, '#FFFFFF', 0]]) +
    lg('hgCup', [[0, '#FFFFFF'], [1, '#E7E3EE']]);

  const rand = rng(31);
  const city: string[] = [];
  for (let x = 300; x < W; ) {
    const w = 40 + rand() * 60;
    const h = 60 + rand() * 120;
    city.push(`<rect x="${x.toFixed(0)}" y="${(560 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="url(#hgCity)"/>`);
    city.push(windows(Math.floor(x), x, 560 - h, w, h, { cw: 6, ch: 7, gap: 7, on: 0.5, color: '#FFE0A0' }));
    x += w + 3;
  }
  // 무지개 분수 — 다리에서 강으로 떨어지는 빛 줄기
  const fountain = Array.from({ length: 13 }, (_, i) => {
    const x = 70 + i * 88;
    const c = ['#5CE1E6', '#FF7AC6', '#9B7CFF', '#7CFFB2', '#FFD95C'][i % 5];
    return `<path d="M${x} 598 Q${x + 34} 612 ${x + 44} 668" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round" opacity=".75"/><path d="M${x} 598 Q${x + 34} 612 ${x + 44} 668" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>`;
  }).join('');
  const reflections = Array.from({ length: 40 }, () => {
    const x = rand() * W;
    const y = 680 + rand() * 110;
    const c = ['#FFE0A0', '#5CE1E6', '#FF7AC6'][Math.floor(rand() * 3)];
    return `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${(18 + rand() * 40).toFixed(0)}" height="3" rx="1.5" fill="${c}" opacity="${(0.25 + rand() * 0.4).toFixed(2)}"/>`;
  }).join('');

  // 돗자리 + 라면 + 김밥 + 캔 (왼쪽 앞)
  const picnic =
    `<path d="M20 900 L320 880 L380 990 L-20 1000 Z" fill="#E94B57"/>` +
    Array.from({ length: 5 }, (_, i) => `<path d="M${20 + i * 70} ${900 - i * 4} L${-20 + i * 85} 1000" stroke="#fff" stroke-width="10" opacity=".6"/>`).join('') +
    `<path d="M18 925 L340 905 M14 960 L360 945" stroke="#fff" stroke-width="10" opacity=".6"/>` +
    // 라면 그릇
    `<ellipse cx="170" cy="905" rx="70" ry="18" fill="#000" opacity=".25"/>` +
    `<path d="M104 850 H236 L222 902 Q170 914 118 902 Z" fill="url(#hgCup)"/>` +
    `<path d="M108 866 H232" stroke="#E94B57" stroke-width="10"/>` +
    `<ellipse cx="170" cy="850" rx="66" ry="16" fill="#F2A24A"/>` +
    `<path d="M120 850 q12 -10 24 0 t24 0 t24 0 t24 0" fill="none" stroke="#FFE08A" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M128 856 q12 -8 24 0 t24 0 t24 0 t24 0" fill="none" stroke="#FFD06A" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="196" cy="846" r="9" fill="#FFF4D6"/><circle cx="196" cy="846" r="4" fill="#FFC83D"/>` +
    `<path d="M210 790 L246 850 M222 786 L254 846" stroke="#C99A5B" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M150 830 q-14 -26 0 -46 q14 -20 0 -40" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".35"/>` +
    `<path d="M180 826 q-14 -24 0 -42 q14 -20 0 -38" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".28"/>` +
    // 김밥
    `<ellipse cx="300" cy="930" rx="58" ry="14" fill="#000" opacity=".2"/>` +
    [0, 1, 2].map((i) => `<g transform="translate(${262 + i * 30} 914)"><circle r="15" fill="#1F2B22"/><circle r="11" fill="#FFFFFF"/><circle cx="-3" cy="-2" r="3" fill="#FFB020"/><circle cx="3" cy="2" r="3" fill="#FF6A5C"/><circle cx="3" cy="-4" r="2.5" fill="#5BBF5B"/></g>`).join('') +
    // 캔
    `<rect x="44" y="860" width="34" height="56" rx="6" fill="#5CC2F2"/><rect x="44" y="868" width="34" height="10" fill="#fff" opacity=".7"/><ellipse cx="61" cy="860" rx="17" ry="5" fill="#C9E9F7"/>`;

  // 오른쪽 앞 가로등
  const lamp =
    `<circle cx="1110" cy="640" r="120" fill="url(#hgSteam)" opacity=".5"/>` +
    `<rect x="1104" y="640" width="12" height="360" fill="#2A3156"/>` +
    `<path d="M1080 640 H1140 L1128 612 H1092 Z" fill="#3A4370"/><rect x="1088" y="640" width="44" height="16" rx="6" fill="#FFE7A8"/>`;

  const body =
    `<rect width="${W}" height="${H}" fill="url(#hgSky)"/>` +
    stars(17, 40, 360) +
    `<circle cx="980" cy="150" r="40" fill="#FFF1C9"/><circle cx="996" cy="140" r="38" fill="url(#hgSky)"/>` +
    // 63빌딩
    `<path d="M150 560 L176 250 Q184 236 192 250 L230 560 Z" fill="url(#hg63)"/>` +
    `<path d="M178 270 L190 560" stroke="#fff" stroke-width="3" opacity=".35"/>` +
    windows(63, 160, 300, 60, 250, { cw: 5, ch: 6, gap: 9, on: 0.4, color: '#FFFFFF' }) +
    city.join('') +
    `<rect x="0" y="560" width="${W}" height="240" fill="url(#hgRiver)"/>` +
    reflections +
    // 다리
    `<rect x="0" y="584" width="${W}" height="16" fill="#3A4775"/><rect x="0" y="584" width="${W}" height="4" fill="#9FB2FF" opacity=".6"/>` +
    Array.from({ length: 9 }, (_, i) => `<rect x="${i * 150}" y="600" width="18" height="70" fill="#2B3561"/>`).join('') +
    Array.from({ length: 24 }, (_, i) => `<circle cx="${i * 52 + 20}" cy="586" r="3" fill="#FFE7A8"/>`).join('') +
    fountain +
    // 강변 잔디
    `<path d="M0 800 C300 784 900 784 1200 800 V1000 H0 Z" fill="url(#hgGrass)"/>` +
    `<path d="M0 800 C300 784 900 784 1200 800" stroke="#3E6B5E" stroke-width="5" fill="none"/>` +
    lamp +
    picnic;

  return { defs, body };
}

/* ───────── 4. 편의점 밤 ───────── */
function cvs() {
  const defs =
    lg('cvSky', [[0, '#0D1230'], [1, '#232A57']]) +
    lg('cvIn', [[0, '#FFFBEA'], [1, '#FFE6A6']]) +
    lg('cvWall', [[0, '#3B3F5C'], [1, '#2A2D45']]) +
    lg('cvSign', [[0, '#FFFFFF'], [1, '#E9EEF7']]) +
    lg('cvFloor', [[0, '#3C3550'], [1, '#1D1A2C']]) +
    rg('cvSpill', [[0, '#FFE7A6', 0.55], [1, '#FFE7A6', 0]]) +
    lg('cvMilk', [[0, '#FFF0A0'], [1, '#FFD23F']]);

  const rand = rng(41);
  const shelf = (x: number, w: number) => {
    const out: string[] = [];
    for (let row = 0; row < 4; row += 1) {
      const y = 420 + row * 78;
      out.push(`<rect x="${x}" y="${y + 50}" width="${w}" height="6" fill="#C9B88A"/>`);
      for (let xx = x + 6; xx < x + w - 18; ) {
        const pw = 14 + rand() * 18;
        const ph = 26 + rand() * 22;
        const c = ['#FF5C5C', '#4FC3F7', '#7ED957', '#FFB020', '#B48CF5', '#FF8FB3', '#FFFFFF', '#3BB27A'][Math.floor(rand() * 8)];
        out.push(`<rect x="${xx.toFixed(0)}" y="${(y + 50 - ph).toFixed(0)}" width="${pw.toFixed(0)}" height="${ph.toFixed(0)}" rx="3" fill="${c}"/>`);
        xx += pw + 4;
      }
    }
    return out.join('');
  };

  // 초록 플라스틱 의자
  const chair = (x: number, y: number, flip = false) =>
    `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M0 0 H70 V-10 H0 Z" fill="#2FAE66"/><path d="M4 -10 V-104 Q4 -112 12 -112 H58 Q66 -112 66 -104 V-10" fill="#36C274"/><path d="M14 -96 H56 M14 -78 H56 M14 -60 H56" stroke="#2A9A5B" stroke-width="6"/><path d="M6 0 L-2 76 M64 0 L72 76" stroke="#2A9A5B" stroke-width="8" stroke-linecap="round"/></g>`;

  const table =
    `<ellipse cx="180" cy="984" rx="150" ry="16" fill="#000" opacity=".25"/>` +
    `<rect x="50" y="852" width="260" height="20" rx="6" fill="#2FAE66"/><rect x="50" y="852" width="260" height="6" rx="3" fill="#6FE3A0"/>` +
    `<path d="M70 872 L58 980 M290 872 L302 980" stroke="#2A9A5B" stroke-width="10" stroke-linecap="round"/>` +
    // 컵라면
    `<path d="M88 800 H160 L152 852 H96 Z" fill="#E94B57"/><rect x="86" y="796" width="76" height="12" rx="4" fill="#fff"/><path d="M100 822 H148" stroke="#FFD23F" stroke-width="8"/>` +
    `<path d="M118 790 q-10 -20 0 -36 q10 -16 0 -32" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".3"/>` +
    // 바나나맛 우유
    `<path d="M200 852 V800 Q200 776 222 772 Q214 760 226 754 H246 Q258 760 250 772 Q272 776 272 800 V852 Z" fill="url(#cvMilk)"/><rect x="224" y="748" width="24" height="10" rx="3" fill="#2FAE66"/><rect x="208" y="808" width="56" height="18" rx="4" fill="#fff" opacity=".7"/>` +
    // 삼각김밥
    `<path d="M178 852 L196 818 L214 852 Z" fill="#fff"/><path d="M182 852 L196 828 L210 852 Z" fill="#1F2B22"/>`;

  const crates = [0, 1, 2]
    .map((i) => `<g transform="translate(${1000 - (i % 2) * 8} ${930 - i * 62})"><rect width="150" height="58" rx="6" fill="${['#4FC3F7', '#FFB020', '#4FC3F7'][i]}"/><path d="M14 14 H136 M14 30 H136 M14 46 H136" stroke="#fff" stroke-width="5" opacity=".45"/></g>`)
    .join('');

  const body =
    `<rect width="${W}" height="${H}" fill="url(#cvSky)"/>` +
    stars(29, 30, 200) +
    // 건물
    `<rect x="60" y="150" width="1080" height="640" fill="url(#cvWall)"/>` +
    // 간판
    `<rect x="90" y="190" width="1020" height="140" rx="10" fill="url(#cvSign)"/>` +
    `<rect x="90" y="300" width="1020" height="16" fill="#2FAE66"/><rect x="90" y="316" width="1020" height="14" fill="#4F7BFF"/>` +
    hangul('편의점', 600, 282, 92, 'fill="#2A2D45"') +
    `<g transform="translate(980 222)"><rect width="96" height="64" rx="12" fill="#FF8A3D"/></g>` +
    hangul('24', 1028, 272, 50, 'fill="#fff"') +
    // 유리창
    `<rect x="110" y="352" width="980" height="412" fill="url(#cvIn)"/>` +
    shelf(130, 300) +
    shelf(770, 300) +
    `<rect x="470" y="352" width="260" height="412" fill="#FFF6D6"/>` +
    `<path d="M600 352 V764" stroke="#B7B3C8" stroke-width="6"/><rect x="566" y="540" width="10" height="60" rx="5" fill="#B7B3C8"/><rect x="624" y="540" width="10" height="60" rx="5" fill="#B7B3C8"/>` +
    `<path d="M110 352 H1090 M450 352 V764 M750 352 V764" stroke="#5A5F80" stroke-width="12"/>` +
    // 1+1 포스터
    `<g transform="translate(150 372) rotate(-4)"><rect width="104" height="70" rx="8" fill="#FF4D6D"/></g>` +
    hangul('1+1', 203, 428, 44, 'fill="#fff"') +
    `<path d="M120 380 L330 560" stroke="#fff" stroke-width="18" opacity=".18"/><path d="M780 380 L990 560" stroke="#fff" stroke-width="18" opacity=".18"/>` +
    // 바닥 + 불빛
    `<rect x="0" y="770" width="${W}" height="230" fill="url(#cvFloor)"/>` +
    `<ellipse cx="600" cy="790" rx="620" ry="110" fill="url(#cvSpill)"/>` +
    `<path d="M0 772 H${W}" stroke="#5A5F80" stroke-width="6"/>` +
    chair(330, 908, true) +
    table +
    crates;

  return { defs, body };
}

/* ───────── 5. 제주 유채꽃 ───────── */
function jeju() {
  const defs =
    lg('jjSky', [[0, '#5DB7F2'], [0.6, '#A9DDFB'], [1, '#E2F5FF']]) +
    lg('jjMtn', [[0, '#5D8FA6'], [1, '#86B4A6']]) +
    lg('jjSea', [[0, '#2E9BD9'], [1, '#5CC3EC']]) +
    lg('jjField', [[0, '#7FC25A'], [1, '#4E9A3C']]) +
    lg('jjStone', [[0, '#6F6B78'], [1, '#4A4652']]) +
    lg('jjFlower', [[0, '#FFE45C'], [1, '#FFC21A']]);

  const rand = rng(53);
  const cloud = (x: number, y: number, s: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff"><ellipse cx="0" cy="0" rx="70" ry="30"/><ellipse cx="-50" cy="8" rx="44" ry="24"/><ellipse cx="54" cy="10" rx="48" ry="24"/><ellipse cx="10" cy="-20" rx="44" ry="28"/></g>`;

  // 돌담 — 현무암 돌 줄
  const wall: string[] = [];
  for (let x = -20; x < W; ) {
    const w = 40 + rand() * 36;
    const h = 28 + rand() * 16;
    wall.push(`<rect x="${x.toFixed(0)}" y="${(640 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" rx="${(h / 2.4).toFixed(0)}" fill="url(#jjStone)"/>`);
    wall.push(`<circle cx="${(x + w * 0.3).toFixed(0)}" cy="${(640 - h * 0.6).toFixed(0)}" r="2.5" fill="#2E2B34" opacity=".5"/>`);
    x += w - 4;
  }
  // 유채꽃 밭 — 노란 바탕 위에 작은 꽃송이 무더기 (뒤는 잘게, 앞은 크게)
  const field: string[] = [
    `<path d="M0 652 C200 640 420 648 600 642 C800 636 1000 648 1200 640 V1000 H0 Z" fill="#E9C21C"/>`,
    `<path d="M0 700 C260 690 520 704 760 694 C940 688 1080 700 1200 694 V1000 H0 Z" fill="#F2CF2A"/>`,
  ];
  for (let i = 0; i < 1500; i += 1) {
    const t = Math.pow(rand(), 0.75);
    const y = 646 + t * 370;
    const x = rand() * W;
    const s = 0.45 + t * 1.5;
    const g = rand();
    if (g < 0.16) {
      // 잎·줄기 틈
      field.push(`<path d="M${x.toFixed(0)} ${(y + 6 * s).toFixed(0)} q${(4 * s).toFixed(1)} ${(-10 * s).toFixed(1)} ${(1 * s).toFixed(1)} ${(-20 * s).toFixed(1)}" stroke="${g < 0.08 ? '#5FA83C' : '#78BC4A'}" stroke-width="${(3 * s).toFixed(1)}" fill="none" stroke-linecap="round"/>`);
      continue;
    }
    const c = g < 0.55 ? '#FFD82E' : g < 0.85 ? '#FFE766' : '#FFC414';
    const r = (2.6 + rand() * 2.4) * s;
    // 꽃송이 하나 = 작은 꽃 3~4개
    field.push(
      `<g fill="${c}"><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}"/><circle cx="${(x + r * 1.3).toFixed(0)}" cy="${(y + r * 0.5).toFixed(0)}" r="${(r * 0.85).toFixed(1)}"/><circle cx="${(x - r * 1.1).toFixed(0)}" cy="${(y + r * 0.7).toFixed(0)}" r="${(r * 0.8).toFixed(1)}"/><circle cx="${(x + r * 0.2).toFixed(0)}" cy="${(y - r * 1.1).toFixed(0)}" r="${(r * 0.75).toFixed(1)}"/></g><circle cx="${(x - r * 0.3).toFixed(0)}" cy="${(y - r * 0.3).toFixed(0)}" r="${(r * 0.35).toFixed(1)}" fill="#FFF6B8"/>`,
    );
  }
  const flowers = field;

  // 돌하르방
  const harubang =
    `<g transform="translate(110 610)">` +
    `<ellipse cx="0" cy="300" rx="90" ry="18" fill="#000" opacity=".18"/>` +
    `<path d="M-58 118 Q-84 210 -66 300 H66 Q84 210 58 118 Z" fill="#6B6774"/>` +
    `<ellipse cx="0" cy="56" rx="62" ry="72" fill="#77737F"/>` +
    `<path d="M-50 -2 Q-52 -70 0 -74 Q52 -70 50 -2 Z" fill="#5C5866"/><ellipse cx="0" cy="-2" rx="80" ry="14" fill="#55515F"/><ellipse cx="-14" cy="-50" rx="16" ry="8" fill="#fff" opacity=".12"/>` +
    `<ellipse cx="-24" cy="40" rx="17" ry="19" fill="#8A8693"/><ellipse cx="24" cy="40" rx="17" ry="19" fill="#8A8693"/><ellipse cx="-24" cy="42" rx="11" ry="13" fill="#3E3A45"/><ellipse cx="24" cy="42" rx="11" ry="13" fill="#3E3A45"/>` +
    `<ellipse cx="0" cy="80" rx="20" ry="26" fill="#837F8C"/><path d="M-24 112 Q0 122 24 112" fill="none" stroke="#3E3A45" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M-56 168 Q-20 150 26 162" fill="none" stroke="#5C5866" stroke-width="20" stroke-linecap="round"/><path d="M-26 206 Q16 190 58 200" fill="none" stroke="#5C5866" stroke-width="20" stroke-linecap="round"/>` +
    Array.from({ length: 14 }, () => `<circle cx="${(rand() * 110 - 55).toFixed(0)}" cy="${(rand() * 260 - 20).toFixed(0)}" r="${(2 + rand() * 2).toFixed(1)}" fill="#4A4652" opacity=".55"/>`).join('') +
    `</g>`;

  // 귤나무
  const gyul =
    `<g transform="translate(1080 700)"><rect x="-10" y="40" width="20" height="160" fill="#7A5232"/><circle cx="0" cy="0" r="92" fill="#3E8E3A"/><circle cx="-50" cy="30" r="60" fill="#4FA548"/><circle cx="54" cy="24" r="62" fill="#468F40"/>` +
    [[-40, -20], [20, -50], [50, 20], [-60, 40], [10, 30], [70, -20], [-20, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="#FF9F1C"/><circle cx="${x - 4}" cy="${y - 5}" r="4" fill="#FFD28A"/>`).join('') +
    `</g>`;

  const body =
    `<rect width="${W}" height="${H}" fill="url(#jjSky)"/>` +
    cloud(230, 140, 1.1) +
    cloud(930, 110, 0.9) +
    cloud(620, 60, 0.6) +
    // 한라산
    `<path d="M-100 560 C150 520 320 400 460 346 C510 328 550 322 600 322 C650 322 690 328 740 346 C880 400 1050 520 1300 560 Z" fill="url(#jjMtn)"/>` +
    // 오른쪽 그늘 + 아래 숲 띠
    `<path d="M600 322 C650 322 690 328 740 346 C880 400 1050 520 1300 560 H760 C720 470 660 390 600 322 Z" fill="#3E6F84" opacity=".28"/>` +
    `<path d="M-100 560 C120 520 260 470 380 450 C460 470 520 470 600 462 C700 470 780 474 860 452 C980 480 1120 520 1300 560 Z" fill="#4E8A6E" opacity=".75"/>` +
    // 백록담 + 잔설
    `<path d="M548 326 C570 318 630 318 652 326 C636 334 564 334 548 326 Z" fill="#3E6F84"/>` +
    `<path d="M520 336 C540 326 560 330 572 338 C560 346 548 340 536 350 C530 344 526 342 520 336 Z M630 336 C646 328 670 330 690 340 C676 346 664 344 652 352 C646 344 640 340 630 336 Z" fill="#fff" opacity=".85"/>` +
    // 바다
    `<rect x="0" y="540" width="${W}" height="60" fill="url(#jjSea)"/>` +
    Array.from({ length: 18 }, () => `<rect x="${(rand() * W).toFixed(0)}" y="${(548 + rand() * 44).toFixed(0)}" width="${(20 + rand() * 40).toFixed(0)}" height="3" rx="1.5" fill="#fff" opacity=".6"/>`).join('') +
    // 초록 들 + 돌담
    `<path d="M0 590 C300 576 900 576 1200 590 V1000 H0 Z" fill="url(#jjField)"/>` +
    wall.join('') +
    flowers.join('') +
    gyul +
    harubang;

  return { defs, body };
}

/* ───────── 6. 눈 내리는 서울 ───────── */
function snow() {
  const defs =
    lg('snSky', [[0, '#26386B'], [0.55, '#5367A2'], [1, '#A3B2DC']]) +
    lg('snCity', [[0, '#34477D'], [1, '#26345E']]) +
    lg('snLotte', [[0, '#DCE3FF'], [1, '#8E9FD6']], 0, 0, 1, 0) +
    lg('snGround', [[0, '#F4F7FF'], [1, '#D3DCF5']]) +
    rg('snLamp', [[0, '#FFE6A6', 0.75], [1, '#FFE6A6', 0]]) +
    lg('snHanok', [[0, '#3B3550'], [1, '#2A2540']]);

  const rand = rng(67);
  const city: string[] = [];
  for (let x = -10; x < W; ) {
    const w = 50 + rand() * 70;
    const h = 120 + rand() * 180;
    const top = 720 - h;
    city.push(`<rect x="${x.toFixed(0)}" y="${top.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="url(#snCity)"/>`);
    city.push(`<rect x="${(x - 3).toFixed(0)}" y="${(top - 8).toFixed(0)}" width="${(w + 6).toFixed(0)}" height="12" rx="6" fill="#F4F7FF"/>`);
    city.push(windows(Math.floor(x + 3), x, top + 8, w, h - 8, { cw: 8, ch: 10, gap: 8, on: 0.5, color: '#FFD98A' }));
    x += w + 4 + rand() * 8;
  }
  const flakes = Array.from({ length: 160 }, () => {
    const x = rand() * W;
    const y = rand() * H;
    const r = 1.5 + Math.pow(rand(), 3) * 7;
    return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity="${(0.45 + rand() * 0.5).toFixed(2)}"/>`;
  }).join('');

  const snowman =
    `<g transform="translate(140 840)"><ellipse cx="0" cy="120" rx="90" ry="16" fill="#9FB0DE" opacity=".5"/>` +
    `<circle cx="0" cy="62" r="70" fill="#FFFFFF"/><circle cx="0" cy="-36" r="48" fill="#FFFFFF"/>` +
    `<circle cx="-16" cy="-44" r="6" fill="#2A2D45"/><circle cx="16" cy="-44" r="6" fill="#2A2D45"/><path d="M0 -32 L30 -26 L0 -22 Z" fill="#FF8A3D"/>` +
    `<path d="M-46 4 Q0 22 46 4 L48 22 Q0 40 -48 22 Z" fill="#E94B57"/><rect x="18" y="16" width="18" height="46" rx="6" fill="#E94B57"/>` +
    `<path d="M-34 -78 H34 L28 -96 H-28 Z" fill="#2A2D45"/><rect x="-44" y="-80" width="88" height="10" rx="4" fill="#2A2D45"/>` +
    `<circle cx="0" cy="44" r="5" fill="#2A2D45"/><circle cx="0" cy="72" r="5" fill="#2A2D45"/></g>`;

  const lamp =
    `<circle cx="1070" cy="600" r="150" fill="url(#snLamp)"/>` +
    `<rect x="1064" y="600" width="12" height="400" fill="#2E2A45"/>` +
    `<path d="M1040 600 H1100 L1088 568 H1052 Z" fill="#3B3658"/><rect x="1046" y="600" width="48" height="18" rx="6" fill="#FFE6A6"/><path d="M1048 566 Q1070 552 1092 566" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`;

  const hanok =
    `<path d="M-20 650 Q40 640 120 642 L360 642 Q440 640 500 650 L470 600 H10 Z" fill="url(#snHanok)"/>` +
    `<path d="M-14 646 Q40 634 120 636 L360 636 Q440 634 494 646" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/>` +
    `<path d="M14 602 H468" stroke="#fff" stroke-width="10" stroke-linecap="round"/>` +
    `<rect x="40" y="650" width="420" height="80" fill="#C9B79A"/>` +
    [70, 150, 230, 310, 390].map((x) => `<rect x="${x}" y="664" width="44" height="50" fill="#FFE2A6" opacity=".9"/><path d="M${x + 22} 664 V714 M${x} 689 H${x + 44}" stroke="#A88A5C" stroke-width="3"/>`).join('');

  const body =
    `<rect width="${W}" height="${H}" fill="url(#snSky)"/>` +
    // 롯데타워
    `<path d="M880 720 L912 170 Q920 120 928 170 L960 720 Z" fill="url(#snLotte)"/><path d="M916 180 L928 720" stroke="#fff" stroke-width="3" opacity=".5"/>` +
    windows(80, 890, 260, 60, 440, { cw: 4, ch: 5, gap: 10, on: 0.45, color: '#FFFFFF' }) +
    city.join('') +
    hanok +
    `<path d="M0 760 C300 730 900 730 1200 760 V1000 H0 Z" fill="url(#snGround)"/>` +
    [[520, 880], [560, 920], [600, 960], [640, 1000]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="5" fill="#B9C6EA"/><ellipse cx="${x + 26}" cy="${y - 16}" rx="10" ry="5" fill="#B9C6EA"/>`).join('') +
    lamp +
    snowman +
    flakes;

  return { defs, body };
}

export const SCENES = {
  scene_gyeongbokgung: gyeongbokgung,
  scene_namsan: namsan,
  scene_hangang: hangang,
  scene_cvs: cvs,
  scene_jeju: jeju,
  scene_snow: snow,
} as const;

export type SceneId = keyof typeof SCENES;

export function sceneSvg(id: SceneId, size?: { w: number; h: number }) {
  const { defs, body } = SCENES[id]();
  return svg(defs, body, size);
}
