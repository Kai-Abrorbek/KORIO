/**
 * 입는 꾸미기 — 의상(costume) · 모자(hat) · 손에 든 것(hand). api cosmetics 의 slot 과 id 가 같다.
 *
 * ⚠️ 이 파일은 두 앱에 **똑같이** 있다 — 고치면 같이 고친다.
 *   텔레그램 shared/model/avatar-wearables.ts · 모바일 components/avatar/avatarWearables.ts
 * 모양을 플랫폼 상관없는 도형 목록(WShape)으로 내고, 각 앱이 자기 SVG 부품으로 그린다
 * (텔레그램 <path>, 모바일 react-native-svg <Path>). 그래서 두 앱 그림이 픽셀까지 같다.
 *
 * 좌표는 아바타 캔버스 320×360. 몸통 왼쪽 bodyX, 너비 bodyWidth (몸매마다 다름),
 * 손은 (bodyX-20, 271) · (bodyX+bodyWidth+20, 271) 반지름 18.
 * 움직이지 않는다 — 응원봉 "빛"도 겹친 동그라미로 그린 정지 그림.
 *
 * 의상은 기본 옷(outfit) 대신, 모자는 기본 모자(headwear) 대신 그린다.
 * 예전 앱은 이 칸을 몰라서 기본 옷·모자로 보인다(안 깨짐).
 *
 * 세트를 다 갖추면 세트 효과: 캐릭터 뒤 은은한 빛(setHaloShapes, 정지).
 */
export type WShape =
  | { k: "path"; d: string; f?: string; s?: string; w?: number; o?: number; round?: boolean }
  | { k: "rect"; x: number; y: number; width: number; height: number; rx?: number; f?: string; s?: string; w?: number; o?: number }
  | { k: "circle"; cx: number; cy: number; r: number; f?: string; s?: string; w?: number; o?: number }
  | { k: "ellipse"; cx: number; cy: number; rx: number; ry: number; f?: string; s?: string; w?: number; o?: number }
  | { k: "g"; transform: string; children: WShape[] };

export interface WearBody {
  bodyX: number;
  bodyWidth: number;
  skin: string;
}

export const COSTUME_IDS = [
  "costume_none",
  "costume_stage",
  "costume_gonryongpo",
  "costume_seonbi",
  "costume_guard",
  "costume_taekwondo",
] as const;
export const HAT_IDS = ["hat_none", "hat_ikseongwan", "hat_gat", "hat_jeollip"] as const;
export const HAND_IDS = ["hand_none", "hand_lightstick", "hand_mic"] as const;
export type CostumeId = (typeof COSTUME_IDS)[number];
export type HatId = (typeof HAT_IDS)[number];
export type HandId = (typeof HAND_IDS)[number];
export type WearRarity = "common" | "rare" | "epic" | "legendary";

/** 세트 — 같은 세트를 다 입으면 세트 효과 */
export type WearSet = "kpop" | "king" | "seonbi" | "guard" | "taekwondo";
/** 세트 묶음 (에디터에서 머리글) */
export type WearGroup = "kpop" | "tradition";

export const WEAR_LOOK: Record<
  Exclude<CostumeId | HatId | HandId, "costume_none" | "hat_none" | "hand_none">,
  { rarity: WearRarity; accent: string; set: WearSet }
> = {
  costume_stage: { rarity: "epic", accent: "#7B6CF6", set: "kpop" },
  hand_lightstick: { rarity: "rare", accent: "#B7AEFF", set: "kpop" },
  hand_mic: { rarity: "rare", accent: "#C9CCD6", set: "kpop" },
  costume_gonryongpo: { rarity: "legendary", accent: "#E2A83A", set: "king" },
  hat_ikseongwan: { rarity: "epic", accent: "#E2A83A", set: "king" },
  costume_seonbi: { rarity: "epic", accent: "#5FBF9A", set: "seonbi" },
  hat_gat: { rarity: "rare", accent: "#5FBF9A", set: "seonbi" },
  costume_guard: { rarity: "epic", accent: "#E8514C", set: "guard" },
  hat_jeollip: { rarity: "rare", accent: "#E8514C", set: "guard" },
  costume_taekwondo: { rarity: "rare", accent: "#3D7BE0", set: "taekwondo" },
};

export type WearSlot = "costume" | "hat" | "hand";
export type WearItemId = keyof typeof WEAR_LOOK;

/**
 * 세트 — 칸마다 그 세트 아이템 중 하나를 입으면 그 칸은 채운 것.
 * K팝: 무대 의상 + (응원봉 또는 마이크) · 왕: 곤룡포 + 익선관 · 선비: 도포 + 갓
 * 수문장: 철릭 + 전립 · 태권도: 도복(검은 띠 포함) 하나
 * halo: 세트 효과 빛 색
 */
export const WEAR_SETS: { id: WearSet; group: WearGroup; halo: string; parts: { slot: WearSlot; ids: WearItemId[] }[] }[] = [
  {
    id: "kpop",
    group: "kpop",
    halo: "#A99BFF",
    parts: [
      { slot: "costume", ids: ["costume_stage"] },
      { slot: "hand", ids: ["hand_lightstick", "hand_mic"] },
    ],
  },
  {
    id: "king",
    group: "tradition",
    halo: "#FFD45C",
    parts: [
      { slot: "costume", ids: ["costume_gonryongpo"] },
      { slot: "hat", ids: ["hat_ikseongwan"] },
    ],
  },
  {
    id: "seonbi",
    group: "tradition",
    halo: "#9BE3C4",
    parts: [
      { slot: "costume", ids: ["costume_seonbi"] },
      { slot: "hat", ids: ["hat_gat"] },
    ],
  },
  {
    id: "guard",
    group: "tradition",
    halo: "#FF8A7A",
    parts: [
      { slot: "costume", ids: ["costume_guard"] },
      { slot: "hat", ids: ["hat_jeollip"] },
    ],
  },
  {
    id: "taekwondo",
    group: "tradition",
    halo: "#8EC2FF",
    parts: [{ slot: "costume", ids: ["costume_taekwondo"] }],
  },
];

export const wearSlotOf = (id: WearItemId): WearSlot =>
  id.startsWith("costume_") ? "costume" : id.startsWith("hat_") ? "hat" : "hand";

/** 세트를 몇 칸 채웠나 */
export function setProgress(set: (typeof WEAR_SETS)[number], worn: Partial<Record<WearSlot, string>>) {
  const done = set.parts.filter((part) => part.ids.some((id) => worn[part.slot] === id)).length;
  return { done, total: set.parts.length, complete: done === set.parts.length };
}

/** 다 갖춘 세트 (없으면 null) */
export function completeSet(worn: Partial<Record<WearSlot, string>>) {
  return WEAR_SETS.find((set) => setProgress(set, worn).complete) ?? null;
}

export const isCostume = (v: unknown): v is Exclude<CostumeId, "costume_none"> =>
  typeof v === "string" && v.startsWith("costume_") && v in WEAR_LOOK;
export const isHand = (v: unknown): v is Exclude<HandId, "hand_none"> =>
  typeof v === "string" && v.startsWith("hand_") && v in WEAR_LOOK;
export const isHat = (v: unknown): v is Exclude<HatId, "hat_none"> =>
  typeof v === "string" && v.startsWith("hat_") && v in WEAR_LOOK;
/** 입는 꾸미기 아이템인가 (의상·모자·손) */
export const isWearItem = (v: unknown): v is WearItemId => typeof v === "string" && v in WEAR_LOOK;

const GOLD = "#FFD45C";
const GOLD_EDGE = "#D9A21E";

/** 네 갈래 반짝이 (정지) */
const twinkle = (x: number, y: number, s: number, f = "#FFFFFF", o = 0.9): WShape => ({
  k: "path",
  d: `M${x} ${y - s} Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y} Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s} Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y} Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s} Z`,
  f,
  o,
});

/* ───────── 의상 ───────── */

/** K팝 무대 의상 — 금 견장·금 단추 재킷, 안에 흰 셔츠, 반짝이 장식 */
function stage({ bodyX, bodyWidth, skin }: WearBody): WShape[] {
  const right = bodyX + bodyWidth;
  const JACKET = "#2B2560";
  const SHADE = "#1D1846";
  const LAPEL = "#3B3486";
  return [
    // 소매 (뒤) — 재킷 색 + 금 소맷단
    { k: "path", d: `M${bodyX + 18} 201 Q${bodyX - 17} 220 ${bodyX - 19} 263`, s: JACKET, w: 33, round: true },
    { k: "path", d: `M${right - 18} 201 Q${right + 17} 220 ${right + 19} 263`, s: SHADE, w: 33, round: true },
    { k: "path", d: `M${bodyX - 33} 250 L${bodyX - 3} 254`, s: GOLD, w: 7, round: true },
    { k: "path", d: `M${right + 3} 254 L${right + 33} 250`, s: GOLD, w: 7, round: true },
    // 몸통
    {
      k: "path",
      d: `M${bodyX + 16} 188 Q160 166 ${right - 16} 188 Q${right + 3} 222 ${right + 2} 290 Q160 307 ${bodyX - 2} 290 Q${bodyX - 3} 222 ${bodyX + 16} 188 Z`,
      f: JACKET,
    },
    { k: "path", d: `M160 180 Q${right - 12} 183 ${right + 2} 226 L${right + 2} 290 Q192 301 160 301 Z`, f: SHADE, o: 0.55 },
    // 안 셔츠 (흰 V)
    { k: "path", d: `M140 184 Q160 178 180 184 L171 300 Q160 303 149 300 Z`, f: "#F7F6FF" },
    { k: "path", d: `M152 186 L160 202 L168 186`, s: "#D9D6F2", w: 4, round: true },
    // 깃 (금 테두리)
    { k: "path", d: `M${bodyX + 20} 190 Q140 182 147 186 L156 252 Q${bodyX + 40} 226 ${bodyX + 20} 190 Z`, f: LAPEL, s: GOLD, w: 3.5, round: true },
    { k: "path", d: `M${right - 20} 190 Q180 182 173 186 L164 252 Q${right - 40} 226 ${right - 20} 190 Z`, f: LAPEL, s: GOLD, w: 3.5, round: true },
    // 금 견장 + 술
    { k: "rect", x: bodyX + 2, y: 182, width: 38, height: 13, rx: 6, f: GOLD, s: GOLD_EDGE, w: 2.5 },
    { k: "rect", x: right - 40, y: 182, width: 38, height: 13, rx: 6, f: GOLD, s: GOLD_EDGE, w: 2.5 },
    ...[8, 17, 26, 35].flatMap((dx): WShape[] => [
      { k: "path", d: `M${bodyX + 2 + dx} 195 L${bodyX + 2 + dx} 205`, s: GOLD, w: 3, round: true },
      { k: "path", d: `M${right - 40 + dx} 195 L${right - 40 + dx} 205`, s: GOLD, w: 3, round: true },
    ]),
    // 금 단추
    ...[226, 250, 274].flatMap((y): WShape[] => [
      { k: "circle", cx: 142, cy: y, r: 5, f: GOLD, s: GOLD_EDGE, w: 2 },
      { k: "circle", cx: 178, cy: y, r: 5, f: GOLD, s: GOLD_EDGE, w: 2 },
    ]),
    // 반짝이 장식 (정지)
    twinkle(bodyX + 22, 236, 7),
    twinkle(right - 20, 262, 6),
    twinkle(bodyX + 26, 274, 4.5, GOLD, 1),
    twinkle(right - 26, 222, 4.5, GOLD, 1),
    { k: "circle", cx: bodyX + 14, cy: 256, r: 2.2, f: "#FFFFFF", o: 0.8 },
    { k: "circle", cx: right - 12, cy: 240, r: 2.2, f: "#FFFFFF", o: 0.8 },
    // 손
    { k: "circle", cx: bodyX - 20, cy: 271, r: 18, f: skin },
    { k: "circle", cx: right + 20, cy: 271, r: 18, f: skin },
  ];
}

/** 긴 소매 + 손 (도포·곤룡포처럼 소매가 넓은 옷) */
function robeSleeves({ bodyX, bodyWidth }: WearBody, fill: string, shade: string, width = 40): WShape[] {
  const right = bodyX + bodyWidth;
  return [
    { k: "path", d: `M${bodyX + 18} 199 Q${bodyX - 20} 220 ${bodyX - 21} 258`, s: fill, w: width, round: true },
    { k: "path", d: `M${right - 18} 199 Q${right + 20} 220 ${right + 21} 258`, s: shade, w: width, round: true },
  ];
}
const robeBody = ({ bodyX, bodyWidth }: WearBody, fill: string): WShape => {
  const right = bodyX + bodyWidth;
  // 무릎까지 내려오는 두루마기 — 아래가 조금 넓다
  return {
    k: "path",
    d: `M${bodyX + 16} 188 Q160 168 ${right - 16} 188 Q${right + 6} 236 ${right + 10} 312 Q160 326 ${bodyX - 10} 312 Q${bodyX - 6} 236 ${bodyX + 16} 188 Z`,
    f: fill,
  };
};
const hands = ({ bodyX, bodyWidth, skin }: WearBody): WShape[] => [
  { k: "circle", cx: bodyX - 20, cy: 271, r: 18, f: skin },
  { k: "circle", cx: bodyX + bodyWidth + 20, cy: 271, r: 18, f: skin },
];

/** 곤룡포 — 붉은 왕의 옷, 가슴·어깨에 금 용 무늬(보), 옥대 */
function gonryongpo(body: WearBody): WShape[] {
  const { bodyX, bodyWidth } = body;
  const right = bodyX + bodyWidth;
  const RED = "#C8283C";
  const SHADE = "#A01D30";
  const dragon = (cx: number, cy: number, r: number): WShape[] => [
    { k: "circle", cx, cy, r, f: GOLD, s: GOLD_EDGE, w: 2.5 },
    { k: "circle", cx, cy, r: r * 0.72, f: "none", s: "#B7322F", w: 2 },
    // 용 — 휘감긴 몸통 (단순한 S 곡선 + 머리 점)
    {
      k: "path",
      d: `M${cx - r * 0.45} ${cy + r * 0.3} Q${cx - r * 0.5} ${cy - r * 0.35} ${cx} ${cy - r * 0.2} Q${cx + r * 0.45} ${cy - r * 0.08} ${cx + r * 0.2} ${cy + r * 0.38}`,
      s: "#B7322F",
      w: Math.max(2.5, r * 0.16),
      round: true,
    },
    { k: "circle", cx: cx - r * 0.45, cy: cy + r * 0.3, r: r * 0.13, f: "#B7322F" },
  ];
  return [
    ...robeSleeves(body, RED, SHADE),
    robeBody(body, RED),
    { k: "path", d: `M160 182 Q${right - 10} 186 ${right + 6} 236 L${right + 10} 312 Q194 322 160 322 Z`, f: SHADE, o: 0.5 },
    // 둥근 깃(단령) + 흰 안깃
    { k: "path", d: `M128 186 Q160 214 192 186`, s: SHADE, w: 14, round: true },
    { k: "path", d: `M134 188 Q160 206 186 188`, s: "#FFF4E6", w: 4, round: true },
    // 어깨 보
    ...dragon(bodyX + 26, 204, 12),
    ...dragon(right - 26, 204, 12),
    // 가슴 보 (오조룡)
    ...dragon(160, 240, 24),
    // 옥대 — 검은 띠에 금·옥 장식
    { k: "path", d: `M${bodyX - 4} 280 Q160 296 ${right + 4} 280`, s: "#2A1E1E", w: 12, round: true },
    ...[-46, -16, 16, 46].map((dx): WShape => ({ k: "rect", x: 160 + dx - 7, y: 281 + Math.abs(dx) * -0.06, width: 14, height: 10, rx: 2, f: dx % 2 ? "#BFE3C8" : GOLD })),
    ...hands(body),
  ];
}

/** 선비 도포 — 옥빛 흰 두루마기, 검은 깃 + 흰 동정, 붉은 세조대 */
function seonbi(body: WearBody): WShape[] {
  const { bodyX, bodyWidth } = body;
  const right = bodyX + bodyWidth;
  const ROBE = "#EEF3F1";
  const SHADE = "#D3DED9";
  return [
    ...robeSleeves(body, ROBE, SHADE, 42),
    // 소매 끝 검은 단
    { k: "path", d: `M${bodyX - 38} 248 L${bodyX - 4} 252`, s: "#2B2F3A", w: 6, round: true },
    { k: "path", d: `M${right + 4} 252 L${right + 38} 248`, s: "#2B2F3A", w: 6, round: true },
    robeBody(body, ROBE),
    { k: "path", d: `M160 182 Q${right - 10} 186 ${right + 6} 236 L${right + 10} 312 Q194 322 160 322 Z`, f: SHADE, o: 0.55 },
    // 겹친 깃 (왼쪽이 위) — 검은 깃 + 흰 동정
    { k: "path", d: `M134 186 L178 262`, s: "#2B2F3A", w: 13, round: true },
    { k: "path", d: `M186 186 L160 226`, s: "#2B2F3A", w: 13, round: true },
    { k: "path", d: `M138 184 L156 214`, s: "#FFFFFF", w: 5, round: true },
    { k: "path", d: `M182 184 L172 200`, s: "#FFFFFF", w: 5, round: true },
    // 세조대 — 가슴 아래 붉은 끈 + 늘어진 술
    { k: "path", d: `M${bodyX - 2} 262 Q160 276 ${right + 2} 262`, s: "#C8283C", w: 5, round: true },
    { k: "path", d: `M150 270 Q146 290 142 310 M156 271 Q156 292 154 312`, s: "#C8283C", w: 4, round: true },
    { k: "path", d: `M136 306 L148 306 L150 318 L134 318 Z`, f: "#C8283C" },
    { k: "path", d: `M148 308 L160 308 L162 320 L146 320 Z`, f: "#C8283C" },
    ...hands(body),
  ];
}

/** 궁궐 수문장 — 남색 철릭, 붉은 깃·안감, 노란 단, 붉은 전대(허리띠) 매듭 */
function guard(body: WearBody): WShape[] {
  const { bodyX, bodyWidth } = body;
  const right = bodyX + bodyWidth;
  const NAVY = "#2F4AA0";
  const SHADE = "#22387E";
  return [
    ...robeSleeves(body, NAVY, SHADE, 38),
    { k: "path", d: `M${bodyX - 36} 249 L${bodyX - 4} 253`, s: "#F2C14E", w: 6, round: true },
    { k: "path", d: `M${right + 4} 253 L${right + 36} 249`, s: "#F2C14E", w: 6, round: true },
    robeBody(body, NAVY),
    { k: "path", d: `M160 182 Q${right - 10} 186 ${right + 6} 236 L${right + 10} 312 Q194 322 160 322 Z`, f: SHADE, o: 0.5 },
    // 붉은 깃 (V) + 노란 테
    { k: "path", d: `M136 186 L160 232 L184 186`, s: "#D93B3B", w: 14, round: true },
    { k: "path", d: `M142 184 L160 220 L178 184`, s: "#F2C14E", w: 3.5, round: true },
    // 가운데 트임 아래로 붉은 안감
    { k: "path", d: `M156 280 L164 280 L170 318 L150 318 Z`, f: "#D93B3B" },
    // 전대 — 붉은 띠 + 매듭 + 늘어진 끝
    { k: "path", d: `M${bodyX - 6} 272 Q160 288 ${right + 6} 272`, s: "#D93B3B", w: 13, round: true },
    { k: "circle", cx: 190, cy: 280, r: 8, f: "#B82E2E" },
    { k: "path", d: `M188 286 Q186 302 180 314 M194 286 Q198 302 200 314`, s: "#D93B3B", w: 6, round: true },
    // 가슴 금 장식 두 줄
    { k: "path", d: `M${bodyX + 30} 236 L${bodyX + 50} 236 M${right - 50} 236 L${right - 30} 236`, s: "#F2C14E", w: 4, round: true },
    ...hands(body),
  ];
}

/** 태권도 도복 — 흰 도복, 검은 깃(유단자), 검은 띠 매듭, 왼가슴 태극 */
function taekwondo(body: WearBody): WShape[] {
  const { bodyX, bodyWidth } = body;
  const right = bodyX + bodyWidth;
  const WHITE = "#FFFFFF";
  const SHADE = "#E3E6EE";
  return [
    { k: "path", d: `M${bodyX + 18} 201 Q${bodyX - 17} 220 ${bodyX - 19} 263`, s: WHITE, w: 33, round: true },
    { k: "path", d: `M${right - 18} 201 Q${right + 17} 220 ${right + 19} 263`, s: SHADE, w: 33, round: true },
    {
      k: "path",
      d: `M${bodyX + 16} 188 Q160 166 ${right - 16} 188 Q${right + 3} 222 ${right + 2} 290 Q160 307 ${bodyX - 2} 290 Q${bodyX - 3} 222 ${bodyX + 16} 188 Z`,
      f: WHITE,
      s: "#D9DCE6",
      w: 2,
    },
    { k: "path", d: `M160 180 Q${right - 12} 183 ${right + 2} 226 L${right + 2} 290 Q192 301 160 301 Z`, f: SHADE, o: 0.6 },
    // 검은 V 깃
    { k: "path", d: `M134 186 L160 236 L186 186`, s: "#1E1E26", w: 12, round: true },
    // 태극 (왼가슴 = 보는 쪽 오른쪽)
    { k: "circle", cx: right - 34, cy: 222, r: 10, f: "#D93B3B" },
    { k: "path", d: `M${right - 44} 222 A10 10 0 0 0 ${right - 24} 222 A5 5 0 0 0 ${right - 34} 222 A5 5 0 0 1 ${right - 44} 222 Z`, f: "#2F5BD3" },
    // 검은 띠 + 매듭 + 늘어진 끝
    { k: "path", d: `M${bodyX - 2} 268 Q160 282 ${right + 2} 268`, s: "#1E1E26", w: 13, round: true },
    { k: "rect", x: 150, y: 266, width: 20, height: 16, rx: 5, f: "#1E1E26" },
    { k: "path", d: `M153 280 L140 306 M167 280 L178 306`, s: "#1E1E26", w: 9, round: true },
    { k: "path", d: `M143 300 L139 307 M175 300 L179 307`, s: "#F2C14E", w: 3, round: true },
    ...hands(body),
  ];
}

export function costumeShapes(id: unknown, body: WearBody): WShape[] | null {
  if (id === "costume_stage") return stage(body);
  if (id === "costume_gonryongpo") return gonryongpo(body);
  if (id === "costume_seonbi") return seonbi(body);
  if (id === "costume_guard") return guard(body);
  if (id === "costume_taekwondo") return taekwondo(body);
  return null;
}

/* ───────── 모자 (머리 위, 기본 모자 대신) ─────────
 * 머리: 가운데 (160,130) 가로 반지름 76, 정수리 y≈39. 귀 x 84 / 236
 */

/** 익선관 — 검은 관, 뒤쪽이 높고 매미 날개 두 개가 위로 */
function ikseongwan(): WShape[] {
  const BLACK = "#1F1F2A";
  return [
    // 매미 날개 (뒤에서 위로 비스듬히 선다)
    // (캔버스 위 끝이 y 0 — 그 위는 잘린다)
    { k: "g", transform: "rotate(-30 122 30)", children: [{ k: "ellipse", cx: 122, cy: 30, rx: 11, ry: 22, f: BLACK }, { k: "ellipse", cx: 122, cy: 24, rx: 4.5, ry: 12, f: "#4A4A5E", o: 0.6 }] },
    { k: "g", transform: "rotate(30 198 30)", children: [{ k: "ellipse", cx: 198, cy: 30, rx: 11, ry: 22, f: BLACK }, { k: "ellipse", cx: 198, cy: 24, rx: 4.5, ry: 12, f: "#4A4A5E", o: 0.6 }] },
    // 뒤쪽 높은 부분
    { k: "path", d: `M116 58 Q120 14 160 12 Q200 14 204 58 Z`, f: BLACK },
    // 앞 관 (낮다)
    { k: "path", d: `M94 82 Q98 36 160 32 Q222 36 226 82 Q160 68 94 82 Z`, f: "#2A2A38" },
    { k: "path", d: `M94 82 Q160 68 226 82`, s: "#14141C", w: 6, round: true },
    { k: "path", d: `M122 22 Q140 16 156 16`, s: "#FFFFFF", w: 3.5, round: true, o: 0.18 },
    { k: "path", d: `M114 48 Q136 40 156 40`, s: "#FFFFFF", w: 4, round: true, o: 0.16 },
  ];
}

/** 갓 — 검은 넓은 챙(살짝 비침), 높은 대우, 호박 구슬 갓끈 */
function gat(): WShape[] {
  const BLACK = "#1B1B24";
  const beads = (x0: number, y0: number, x1: number, y1: number): WShape[] =>
    Array.from({ length: 8 }, (_, i): WShape => {
      const t = i / 7;
      return { k: "circle", cx: x0 + (x1 - x0) * t, cy: y0 + (y1 - y0) * t, r: 3.6, f: "#E7A33E", s: "#B9781F", w: 1.2 };
    });
  return [
    // 챙 (비치는 검정)
    { k: "ellipse", cx: 160, cy: 62, rx: 116, ry: 17, f: BLACK, o: 0.82 },
    { k: "ellipse", cx: 160, cy: 59, rx: 104, ry: 11, f: "none", s: "#3A3A48", w: 2, o: 0.8 },
    // 대우 (원통)
    { k: "path", d: `M126 60 L130 12 Q160 4 190 12 L194 60 Q160 66 126 60 Z`, f: BLACK, o: 0.92 },
    { k: "path", d: `M126 52 Q160 58 194 52`, s: "#4A4A5E", w: 4, round: true },
    { k: "path", d: `M138 18 L136 48`, s: "#FFFFFF", w: 3, round: true, o: 0.16 },
    // 갓끈 — 얼굴 옆으로 내려오는 구슬
    ...beads(86, 72, 104, 196),
    ...beads(234, 72, 216, 196),
  ];
}

/** 전립 — 수문장 모자, 검은 챙·둥근 정수리, 금 꼭지 + 붉은 상모 */
function jeollip(): WShape[] {
  const BLACK = "#1E1E28";
  return [
    { k: "ellipse", cx: 160, cy: 66, rx: 96, ry: 15, f: BLACK },
    { k: "path", d: `M112 66 Q114 22 160 20 Q206 22 208 66 Q160 74 112 66 Z`, f: "#272734" },
    { k: "path", d: `M112 60 Q160 68 208 60`, s: "#F2C14E", w: 4, round: true },
    // 붉은 상모 — 꼭지 위 복슬복슬한 술
    ...([[-12, 12, 8], [12, 12, 8], [-6, 7, 8], [6, 7, 8], [0, 13, 9], [-19, 19, 6], [19, 19, 6]] as const).map(
      ([dx, dy, r]): WShape => ({ k: "circle", cx: 160 + dx, cy: dy, r, f: "#E23A3A" }),
    ),
    { k: "path", d: `M150 5 Q155 1 162 2`, s: "#FF8A80", w: 3, round: true, o: 0.8 },
    { k: "circle", cx: 160, cy: 20, r: 5.5, f: GOLD, s: GOLD_EDGE, w: 2 },
    { k: "path", d: `M130 38 Q144 28 160 28`, s: "#FFFFFF", w: 3.5, round: true, o: 0.18 },
    // 갓끈 (호박 구슬, 짧게)
    ...Array.from({ length: 5 }, (_, i): WShape[] => [
      { k: "circle", cx: 96 + i * 2.4, cy: 78 + i * 16, r: 3.4, f: "#E7A33E", s: "#B9781F", w: 1.2 },
      { k: "circle", cx: 224 - i * 2.4, cy: 78 + i * 16, r: 3.4, f: "#E7A33E", s: "#B9781F", w: 1.2 },
    ]).flat(),
  ];
}

export function hatShapes(id: unknown): WShape[] | null {
  if (id === "hat_ikseongwan") return ikseongwan();
  if (id === "hat_gat") return gat();
  if (id === "hat_jeollip") return jeollip();
  return null;
}

/** 세트 효과 — 다 갖춘 세트가 있으면 캐릭터 뒤 은은한 빛 (겹친 원, 정지). 전신 맨 뒤에 그린다 */
export function setHaloShapes(worn: Partial<Record<WearSlot, string>>): WShape[] | null {
  const set = completeSet(worn);
  if (!set) return null;
  return [156, 136, 116, 96].map((r): WShape => ({ k: "circle", cx: 160, cy: 168, r, f: set.halo, o: 0.11 }));
}

/* ───────── 손에 든 것 (오른손) ───────── */

/** KORIO 응원봉 — 보라 하트가 든 둥근 머리 + 은은한 빛 (겹친 원, 정지) */
function lightstick(hx: number, skin: string): WShape[] {
  const gy = 192;
  const heart = (cx: number, cy: number, s: number) =>
    `M${cx} ${cy + s * 0.9} C${cx - s * 1.4} ${cy - s * 0.1} ${cx - s * 0.9} ${cy - s * 1.2} ${cx} ${cy - s * 0.45} C${cx + s * 0.9} ${cy - s * 1.2} ${cx + s * 1.4} ${cy - s * 0.1} ${cx} ${cy + s * 0.9} Z`;
  return [
    // 빛
    { k: "circle", cx: hx, cy: gy, r: 50, f: "#B7AEFF", o: 0.12 },
    { k: "circle", cx: hx, cy: gy, r: 40, f: "#B7AEFF", o: 0.16 },
    { k: "circle", cx: hx, cy: gy, r: 32, f: "#D9D4FF", o: 0.3 },
    // 손잡이
    { k: "rect", x: hx - 7, y: 210, width: 14, height: 72, rx: 6, f: "#F4F2FF", s: "#C9C2F2", w: 3 },
    { k: "rect", x: hx - 7, y: 222, width: 14, height: 9, f: "#776EE2" },
    // 머리
    { k: "circle", cx: hx, cy: gy, r: 25, f: "#FBFAFF", s: "#B9B2F5", w: 3.5 },
    { k: "path", d: heart(hx, gy + 1, 13), f: "#776EE2" },
    { k: "path", d: `M${hx - 15} ${gy - 10} Q${hx - 10} ${gy - 19} ${hx - 1} ${gy - 21}`, s: "#FFFFFF", w: 4, round: true, o: 0.9 },
    // 쥔 손 (손잡이 아래를 덮는다)
    { k: "circle", cx: hx, cy: 271, r: 18, f: skin },
    { k: "path", d: `M${hx - 9} 266 Q${hx} 262 ${hx + 9} 266`, s: "#000000", w: 2.5, round: true, o: 0.12 },
  ];
}

/** 무대 마이크 — 은색 그물 머리, 검은 손잡이, 얼굴 쪽으로 살짝 기울임 */
function mic(hx: number, skin: string): WShape[] {
  const my = 206;
  return [
    {
      k: "g",
      transform: `rotate(-16 ${hx} 271)`,
      children: [
        { k: "path", d: `M${hx - 6} 282 L${hx - 8} 222 L${hx + 8} 222 L${hx + 6} 282 Z`, f: "#2A2A35" },
        { k: "rect", x: hx - 9, y: 218, width: 18, height: 9, rx: 3, f: "#C9CCD6", s: "#9EA3B1", w: 2 },
        { k: "circle", cx: hx, cy: my, r: 17, f: "#C9CCD6", s: "#8E93A3", w: 3 },
        { k: "path", d: `M${hx - 14} ${my - 6} L${hx + 14} ${my - 6} M${hx - 16} ${my + 1} L${hx + 16} ${my + 1} M${hx - 13} ${my + 8} L${hx + 13} ${my + 8}`, s: "#9EA3B1", w: 2 },
        { k: "path", d: `M${hx - 6} ${my - 16} L${hx - 6} ${my + 15} M${hx + 6} ${my - 16} L${hx + 6} ${my + 15}`, s: "#9EA3B1", w: 2 },
        { k: "path", d: `M${hx - 10} ${my - 9} Q${hx - 6} ${my - 14} ${hx} ${my - 15}`, s: "#FFFFFF", w: 3.5, round: true, o: 0.85 },
        { k: "rect", x: hx - 3, y: 240, width: 6, height: 12, rx: 2, f: "#FF4B6E" },
      ],
    },
    { k: "circle", cx: hx, cy: 271, r: 18, f: skin },
    { k: "path", d: `M${hx - 9} 266 Q${hx} 262 ${hx + 9} 266`, s: "#000000", w: 2.5, round: true, o: 0.12 },
  ];
}

export function handShapes(id: unknown, body: WearBody): WShape[] | null {
  const hx = body.bodyX + body.bodyWidth + 20;
  if (id === "hand_lightstick") return lightstick(hx, body.skin);
  if (id === "hand_mic") return mic(hx, body.skin);
  return null;
}
