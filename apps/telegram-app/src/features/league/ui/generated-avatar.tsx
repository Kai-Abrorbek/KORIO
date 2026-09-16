import type { ReactNode } from "react";

import type { AvatarConfig } from "../model/league";

const DEFAULTS = {
  skinTone: "skin_08",
  bodyShape: "body_balanced",
  expression: "expression_smile",
  eyeColor: "eyes_charcoal",
  hairstyle: "hair_wave",
  hairColor: "haircolor_charcoal",
  eyewear: "eyewear_none",
  facialHair: "facial_none",
  headwear: "headwear_none",
  outfit: "outfit_hoodie",
};

const SKIN: Record<string, string> = {
  skin_01: "#5B3226", skin_02: "#71402E", skin_03: "#875039",
  skin_04: "#9D6245", skin_05: "#B87956", skin_06: "#CC906B",
  skin_07: "#DDA17D", skin_08: "#EAB692", skin_09: "#F3C8A9",
  skin_10: "#F8DCC7",
};
const HAIR: Record<string, string> = {
  haircolor_charcoal: "#24242B", haircolor_espresso: "#3D2825",
  haircolor_chestnut: "#683C2C", haircolor_copper: "#A2512E",
  haircolor_burgundy: "#712F3E", haircolor_silver: "#95949C",
  haircolor_blonde: "#D49B39",
};
const EYES: Record<string, string> = {
  eyes_charcoal: "#25252B", eyes_brown: "#6D3F2A", eyes_hazel: "#987426",
  eyes_green: "#3D853D", eyes_teal: "#168A90", eyes_blue: "#2C73BE",
};
const OUTFITS: Record<string, { primary: string; secondary: string; accent: string }> = {
  outfit_hoodie: { primary: "#776EE2", secondary: "#5E55C7", accent: "#FFFFFF" },
  outfit_varsity: { primary: "#30354D", secondary: "#202438", accent: "#F4C95D" },
  outfit_sweater: { primary: "#E06F8B", secondary: "#C45270", accent: "#FFF3F5" },
  outfit_sport: { primary: "#21A6A1", secondary: "#147D7A", accent: "#F5D64E" },
  outfit_hanbok: { primary: "#6F85D8", secondary: "#4F65B5", accent: "#F4C95D" },
  outfit_denim: { primary: "#4F78A8", secondary: "#365B88", accent: "#F5EFE5" },
};
const BODY_WIDTH: Record<string, number> = {
  body_slim: 126, body_balanced: 148, body_soft: 172, body_broad: 188,
};

function darken(hex: string, amount: number) {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  const channels = [value >> 16, (value >> 8) & 0xff, value & 0xff];
  return `#${channels.map((channel) => Math.max(0, channel - amount).toString(16).padStart(2, "0")).join("")}`;
}

function BackHair({ hair, style }: { hair: string; style: string }) {
  if (style === "hair_none" || style === "hair_crop") return null;
  if (style === "hair_bob") return <path d="M75 105 Q79 40 160 30 Q241 40 245 105 L238 211 Q206 236 160 230 Q114 236 82 211 Z" fill={hair} />;
  if (style === "hair_pony") return <><path d="M77 107 Q82 40 160 31 Q237 40 243 107 L228 194 Q196 218 160 214 Q124 218 92 194 Z" fill={hair} /><path d="M224 86 Q276 99 260 169 Q252 206 226 217 Q241 155 216 119 Z" fill={hair} /></>;
  if (style === "hair_topknot") return <><circle cx="160" cy="34" fill={hair} r="34" /><path d="M78 108 Q83 40 160 31 Q237 40 242 108 L226 196 Q194 216 160 212 Q126 216 94 196 Z" fill={hair} /></>;
  return <path d="M78 108 Q82 39 160 30 Q238 39 242 108 L228 198 Q197 219 160 215 Q123 219 92 198 Z" fill={hair} />;
}

function Outfit({ bodyX, bodyWidth, id, skin }: { bodyX: number; bodyWidth: number; id: string; skin: string }) {
  const outfit = OUTFITS[id] ?? OUTFITS.outfit_hoodie!;
  const right = bodyX + bodyWidth;
  if (id === "outfit_hanbok") return <g><path d={`M${bodyX + 10} 191 Q160 164 ${right - 10} 191 L${right + 9} 292 Q160 314 ${bodyX - 9} 292 Z`} fill={outfit.primary} /><path d={`M160 178 L160 294 L${right + 9} 292 L${right - 8} 207 Z`} fill={outfit.secondary} opacity=".38" /><path d="M132 184 L160 214 L188 184" fill="none" stroke={outfit.accent} strokeLinejoin="round" strokeWidth="12" /><rect fill={outfit.accent} height="13" rx="6" width="104" x="108" y="236" /></g>;
  let details: ReactNode = null;
  if (id === "outfit_hoodie") details = <><path d="M124 190 Q160 219 196 190" fill="none" stroke={outfit.secondary} strokeLinecap="round" strokeWidth="14" /><line stroke={outfit.accent} strokeLinecap="round" strokeWidth="4" x1="145" x2="143" y1="207" y2="244" /><line stroke={outfit.accent} strokeLinecap="round" strokeWidth="4" x1="175" x2="177" y1="207" y2="244" /></>;
  if (id === "outfit_varsity") details = <><rect fill={outfit.accent} height="105" opacity=".9" width="16" x="152" y="186" /><path d="M119 190 Q160 216 201 190" fill="none" stroke={outfit.accent} strokeWidth="12" /></>;
  if (id === "outfit_sweater") details = <><path d="M119 193 Q160 215 201 193" fill="none" stroke={outfit.accent} strokeWidth="12" /><path d="M127 234 H193" opacity=".75" stroke={outfit.accent} strokeDasharray="8 7" strokeWidth="7" /></>;
  if (id === "outfit_sport") details = <><path d="M126 188 L160 219 L194 188" fill={outfit.accent} opacity=".95" /><circle cx="160" cy="246" fill={outfit.secondary} opacity=".85" r="23" /></>;
  if (id === "outfit_denim") details = <><path d="M127 189 L160 216 L193 189" fill={outfit.accent} /><line opacity=".8" stroke={outfit.accent} strokeWidth="4" x1="160" x2="160" y1="212" y2="290" /></>;
  return <g><path d={`M${bodyX + 16} 188 Q160 166 ${right - 16} 188 Q${right + 3} 222 ${right + 2} 290 Q160 307 ${bodyX - 2} 290 Q${bodyX - 3} 222 ${bodyX + 16} 188 Z`} fill={outfit.primary} /><path d={`M160 180 Q${right - 12} 183 ${right + 2} 226 L${right + 2} 290 Q192 301 160 301 Z`} fill={outfit.secondary} opacity=".5" /><path d={`M${bodyX + 18} 201 Q${bodyX - 17} 220 ${bodyX - 19} 263`} fill="none" stroke={outfit.primary} strokeLinecap="round" strokeWidth="33" /><path d={`M${right - 18} 201 Q${right + 17} 220 ${right + 19} 263`} fill="none" stroke={outfit.secondary} strokeLinecap="round" strokeWidth="33" /><circle cx={bodyX - 20} cy="271" fill={skin} r="18" /><circle cx={right + 20} cy="271" fill={skin} r="18" />{details}</g>;
}

function Face({ expression, eye, skin }: { expression: string; eye: string; skin: string }) {
  const leftY = expression === "expression_curious" ? 124 : 128;
  const rightY = expression === "expression_curious" ? 132 : 128;
  const brow = darken(skin, 58);
  let eyes: ReactNode;
  if (expression === "expression_playful") {
    eyes = <><path d="M110 129 Q126 139 142 129" fill="none" stroke={eye} strokeLinecap="round" strokeWidth="7" /><ellipse cx="194" cy="128" fill="#fff" rx="12" ry="15" /><circle cx="194" cy="130" fill={eye} r="7" /><circle cx="197" cy="126" fill="#fff" r="2.4" /></>;
  } else if (expression === "expression_proud") {
    eyes = <><path d="M110 130 Q126 139 142 130" fill="none" stroke={eye} strokeLinecap="round" strokeWidth="7" /><path d="M178 130 Q194 139 210 130" fill="none" stroke={eye} strokeLinecap="round" strokeWidth="7" /></>;
  } else {
    eyes = <><ellipse cx="126" cy={leftY} fill="#fff" rx="12" ry="15" /><ellipse cx="194" cy={rightY} fill="#fff" rx="12" ry="15" /><circle cx="126" cy={leftY + 2} fill={eye} r="7" /><circle cx="194" cy={rightY + 2} fill={eye} r="7" /><circle cx="129" cy={leftY - 2} fill="#fff" r="2.5" /><circle cx="197" cy={rightY - 2} fill="#fff" r="2.5" /></>;
  }
  let mouth: ReactNode;
  if (expression === "expression_smile") mouth = <><path d="M137 172 Q160 202 183 172 Q160 187 137 172 Z" fill="#7E3F45" /><path d="M146 174 Q160 181 174 174" stroke="#fff" strokeLinecap="round" strokeWidth="6" /></>;
  else if (expression === "expression_proud") mouth = <path d="M139 174 Q159 186 181 171" fill="none" stroke="#7E3F45" strokeLinecap="round" strokeWidth="7" />;
  else if (expression === "expression_curious") mouth = <ellipse cx="161" cy="180" fill="#7E3F45" rx="10" ry="13" />;
  else if (expression === "expression_playful") mouth = <><path d="M137 172 Q160 198 184 171" fill="#7E3F45" /><path d="M157 185 Q169 194 177 181" fill="#E77883" /></>;
  else if (expression === "expression_focused") mouth = <path d="M143 181 Q160 173 177 181" fill="none" stroke="#7E3F45" strokeLinecap="round" strokeWidth="6" />;
  else mouth = <path d="M143 177 Q160 184 177 177" fill="none" stroke="#7E3F45" strokeLinecap="round" strokeWidth="6" />;
  return <g>{expression === "expression_focused" ? <><path d="M111 111 L139 119" stroke={brow} strokeLinecap="round" strokeWidth="7" /><path d="M181 119 L209 111" stroke={brow} strokeLinecap="round" strokeWidth="7" /></> : <><path d="M111 112 Q126 103 141 111" fill="none" stroke={brow} strokeLinecap="round" strokeWidth="6" /><path d="M179 111 Q194 103 209 112" fill="none" stroke={brow} strokeLinecap="round" strokeWidth="6" /></>}{eyes}<path d="M157 137 Q151 151 160 155 Q168 153 166 147" fill="none" stroke={darken(skin, 34)} strokeLinecap="round" strokeWidth="4" /><ellipse cx="115" cy="158" fill="#D76E76" opacity=".24" rx="17" ry="8" /><ellipse cx="205" cy="158" fill="#D76E76" opacity=".24" rx="17" ry="8" />{mouth}</g>;
}

function FrontHair({ hair, style }: { hair: string; style: string }) {
  if (style === "hair_none") return null;
  if (style === "hair_crop") return <path d="M91 95 Q105 41 160 38 Q216 41 229 95 Q202 73 178 76 Q151 80 126 65 Q114 84 91 95 Z" fill={hair} />;
  if (style === "hair_curls") return <g>{[92, 118, 144, 170, 196, 222].map((x, index) => <circle cx={x} cy={index % 2 === 0 ? 72 : 58} fill={hair} key={x} r="27" />)}<circle cx="88" cy="104" fill={hair} r="25" /><circle cx="232" cy="104" fill={hair} r="25" /></g>;
  return <path d="M84 101 Q87 47 144 35 Q196 23 232 67 Q243 85 230 106 Q209 78 183 80 Q157 84 136 64 Q123 87 99 84 Q98 99 84 101 Z" fill={hair} />;
}

function FacialHair({ hair, style }: { hair: string; style: string }) {
  if (style === "facial_none") return null;
  if (style === "facial_stubble") return <path d="M119 168 Q160 207 201 168 Q193 218 160 224 Q127 218 119 168 Z" fill={hair} opacity=".33" />;
  if (style === "facial_mustache") return <path d="M158 163 Q144 152 129 165 Q142 184 160 171 Q178 184 191 165 Q176 152 162 163 Z" fill={hair} />;
  return <g><path d="M111 164 Q120 227 160 238 Q200 227 209 164 Q194 188 180 190 Q160 200 140 190 Q126 188 111 164 Z" fill={hair} /><path d="M158 162 Q143 152 128 166 Q142 184 160 171 Q178 184 192 166 Q177 152 162 162 Z" fill={hair} /></g>;
}

function Eyewear({ style }: { style: string }) {
  if (style === "eyewear_none") return null;
  if (style === "eyewear_round") return <g fill="none" stroke="#30313A" strokeWidth="6"><circle cx="126" cy="130" r="24" /><circle cx="194" cy="130" r="24" /><path d="M150 129 Q160 123 170 129" /><path d="M101 127 L85 121 M219 127 L235 121" strokeLinecap="round" /></g>;
  if (style === "eyewear_square") return <g fill="none" stroke="#30313A" strokeLinejoin="round" strokeWidth="6"><rect height="43" rx="10" width="50" x="101" y="108" /><rect height="43" rx="10" width="50" x="169" y="108" /><path d="M151 128 H169" /><path d="M101 119 L85 114 M219 119 L235 114" strokeLinecap="round" /></g>;
  if (style === "eyewear_sun") return <g><path d="M96 112 Q126 101 154 113 L150 145 Q124 159 103 141 Z" fill="#31313A" /><path d="M166 113 Q194 101 224 112 L217 141 Q196 159 170 145 Z" fill="#31313A" /><rect fill="#31313A" height="7" rx="3" width="20" x="150" y="119" /><path d="M106 119 Q124 110 141 116" opacity=".45" stroke="#fff" strokeLinecap="round" strokeWidth="4" /><path d="M179 116 Q196 110 214 119" opacity=".45" stroke="#fff" strokeLinecap="round" strokeWidth="4" /></g>;
  return <g fill="none" stroke="#30313A" strokeWidth="5"><path d="M102 119 Q126 109 150 119 L148 145 Q126 153 105 142 Z" /><path d="M170 119 Q194 109 218 119 L215 142 Q194 153 172 145 Z" /><path d="M150 127 H170" /></g>;
}

function Headwear({ id, outfit }: { id: string; outfit: { primary: string; secondary: string; accent: string } }) {
  if (id === "headwear_none") return null;
  if (id === "headwear_cap") return <g><path d="M91 67 Q106 20 160 20 Q214 20 229 67 Z" fill={outfit.primary} /><path d="M117 66 Q173 56 242 73 Q204 91 155 77 Q137 72 117 66 Z" fill={outfit.secondary} /><circle cx="160" cy="28" fill={outfit.accent} r="7" /></g>;
  if (id === "headwear_beanie") return <g><path d="M94 70 Q99 16 160 14 Q221 16 226 70 Z" fill={outfit.primary} /><rect fill={outfit.secondary} height="30" rx="14" width="138" x="91" y="60" /><circle cx="160" cy="15" fill={outfit.accent} r="12" /></g>;
  if (id === "headwear_headband") return <path d="M91 72 Q160 48 229 72" fill="none" stroke={outfit.accent} strokeLinecap="round" strokeWidth="15" />;
  return <g><path d="M101 49 Q160 13 219 49 L229 79 H91 Z" fill={outfit.primary} /><ellipse cx="160" cy="79" fill={outfit.secondary} rx="83" ry="18" /><path d="M119 49 Q160 34 201 49" fill="none" stroke={outfit.accent} strokeLinecap="round" strokeWidth="7" /></g>;
}

export function GeneratedAvatar({ avatar }: { avatar: AvatarConfig }) {
  const config = { ...DEFAULTS, ...avatar };
  const skin = SKIN[config.skinTone] ?? SKIN.skin_08!;
  const hair = HAIR[config.hairColor] ?? HAIR.haircolor_charcoal!;
  const eye = EYES[config.eyeColor] ?? EYES.eyes_charcoal!;
  const outfit = OUTFITS[config.outfit] ?? OUTFITS.outfit_hoodie!;
  const bodyWidth = BODY_WIDTH[config.bodyShape] ?? BODY_WIDTH.body_balanced!;
  const bodyX = 160 - bodyWidth / 2;
  return (
    <svg aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="52 16 216 216">
      <BackHair hair={hair} style={config.hairstyle} />
      <Outfit bodyWidth={bodyWidth} bodyX={bodyX} id={config.outfit} skin={skin} />
      <rect fill={skin} height="34" rx="15" width="42" x="139" y="180" />
      <ellipse cx="84" cy="139" fill={skin} rx="24" ry="29" />
      <ellipse cx="236" cy="139" fill={skin} rx="24" ry="29" />
      <ellipse cx="160" cy="130" fill={skin} rx="76" ry="91" />
      <ellipse cx="137" cy="92" fill="#fff" opacity=".08" rx="43" ry="28" />
      <path d="M99 160 Q112 210 160 219 Q208 210 221 160 Q212 228 160 238 Q108 228 99 160 Z" fill={darken(skin, 12)} opacity=".16" />
      <Face expression={config.expression} eye={eye} skin={skin} />
      <FacialHair hair={hair} style={config.facialHair} />
      <FrontHair hair={hair} style={config.hairstyle} />
      <Eyewear style={config.eyewear} />
      <Headwear id={config.headwear} outfit={outfit} />
    </svg>
  );
}
