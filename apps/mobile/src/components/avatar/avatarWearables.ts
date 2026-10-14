/**
 * 입는 꾸미기 — 의상(costume) · 손에 든 것(hand). api cosmetics 의 slot 과 id 가 같다.
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
 * 의상은 기본 옷(outfit) 대신 그린다. 예전 앱은 이 칸을 몰라서 기본 옷으로 보인다(안 깨짐).
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

export const COSTUME_IDS = ["costume_none", "costume_stage"] as const;
export const HAND_IDS = ["hand_none", "hand_lightstick", "hand_mic"] as const;
export type CostumeId = (typeof COSTUME_IDS)[number];
export type HandId = (typeof HAND_IDS)[number];
export type WearRarity = "common" | "rare" | "epic" | "legendary";

/** 세트 — 같은 세트를 다 입으면 세트 효과 (#6) */
export type WearSet = "kpop";

export const WEAR_LOOK: Record<Exclude<CostumeId | HandId, "costume_none" | "hand_none">, { rarity: WearRarity; accent: string; set: WearSet }> = {
  costume_stage: { rarity: "epic", accent: "#7B6CF6", set: "kpop" },
  hand_lightstick: { rarity: "rare", accent: "#B7AEFF", set: "kpop" },
  hand_mic: { rarity: "rare", accent: "#C9CCD6", set: "kpop" },
};

export type WearSlot = "costume" | "hand";
export type WearItemId = keyof typeof WEAR_LOOK;

/**
 * 세트 — 칸마다 그 세트 아이템 중 하나를 입으면 그 칸은 채운 것.
 * K팝: 무대 의상 + (응원봉 또는 마이크)
 */
export const WEAR_SETS: { id: WearSet; parts: { slot: WearSlot; ids: WearItemId[] }[] }[] = [
  {
    id: "kpop",
    parts: [
      { slot: "costume", ids: ["costume_stage"] },
      { slot: "hand", ids: ["hand_lightstick", "hand_mic"] },
    ],
  },
];

/** 세트를 몇 칸 채웠나 */
export function setProgress(set: (typeof WEAR_SETS)[number], worn: Partial<Record<WearSlot, string>>) {
  const done = set.parts.filter((part) => part.ids.some((id) => worn[part.slot] === id)).length;
  return { done, total: set.parts.length, complete: done === set.parts.length };
}

export const isCostume = (v: unknown): v is Exclude<CostumeId, "costume_none"> =>
  typeof v === "string" && v.startsWith("costume_") && v in WEAR_LOOK;
export const isHand = (v: unknown): v is Exclude<HandId, "hand_none"> =>
  typeof v === "string" && v.startsWith("hand_") && v in WEAR_LOOK;

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

export function costumeShapes(id: unknown, body: WearBody): WShape[] | null {
  if (id === "costume_stage") return stage(body);
  return null;
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
