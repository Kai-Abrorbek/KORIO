import {
  Circle,
  Defs,
  Ellipse,
  G,
  Line,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
  Svg,
} from "react-native-svg";
import {
  DEFAULT_AVATAR_CONFIG,
  mergeAvatarConfig,
  type AvatarConfig,
} from "@/types/avatar";
import type { ComponentProps, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import AvatarAura, { isAura } from "./AvatarAura";
import { costumeShapes, handShapes, hatShapes, setHaloShapes, splitArms, type WShape } from "./avatarWearables";
import { FEET, LOOK_SHIFT, NECK, armGeometry, type MotionBody } from "./avatarMotion";
import { useAvatarMotion } from "./useAvatarMotion";

/** 입는 꾸미기 도형 → react-native-svg (텔레그램은 같은 도형을 DOM SVG 로 그린다) */
function WearShapes({ shapes }: { shapes: WShape[] }) {
  return (
    <>
      {shapes.map((shape, index) => {
        if (shape.k === "g") {
          return (
            <G key={index} transform={shape.transform}>
              <WearShapes shapes={shape.children} />
            </G>
          );
        }
        const paint = {
          fill: shape.f ?? "none",
          opacity: shape.o,
          stroke: shape.s,
          strokeWidth: shape.w,
          ...(shape.k === "path" && shape.round ? { strokeLinecap: "round" as const, strokeLinejoin: "round" as const } : null),
        };
        if (shape.k === "path") return <Path key={index} d={shape.d} {...paint} />;
        if (shape.k === "rect") {
          return <Rect key={index} x={shape.x} y={shape.y} width={shape.width} height={shape.height} rx={shape.rx} {...paint} />;
        }
        if (shape.k === "circle") return <Circle key={index} cx={shape.cx} cy={shape.cy} r={shape.r} {...paint} />;
        return <Ellipse key={index} cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} {...paint} />;
      })}
    </>
  );
}

interface Props {
  avatar?: Partial<AvatarConfig> | null;
  size?: number;
  showBackground?: boolean;
  variant?: "full" | "head";
  /** 장착한 오라를 같이 그린다 (전신에만) */
  aura?: boolean;
  /** 카드처럼 여러 개가 한 화면에 있을 때 입자를 반만 */
  auraLite?: boolean;
  /** Learned word shown by the Hangul aura in prominent personal previews. */
  hangulWord?: string;
  /**
   * 홈 아바타 — 눈을 깜빡이고, 들어올 때 손을 흔들고, 가끔 두리번거린다 (전신만).
   * 동작은 avatarMotion 표대로 (텔레그램 GeneratedAvatar alive 와 같다)
   */
  alive?: boolean;
}

const SKIN = {
  skin_01: "#5B3226",
  skin_02: "#71402E",
  skin_03: "#875039",
  skin_04: "#9D6245",
  skin_05: "#B87956",
  skin_06: "#CC906B",
  skin_07: "#DDA17D",
  skin_08: "#EAB692",
  skin_09: "#F3C8A9",
  skin_10: "#F8DCC7",
} as const;

const HAIR = {
  haircolor_charcoal: "#24242B",
  haircolor_espresso: "#3D2825",
  haircolor_chestnut: "#683C2C",
  haircolor_copper: "#A2512E",
  haircolor_burgundy: "#712F3E",
  haircolor_silver: "#95949C",
  haircolor_blonde: "#D49B39",
} as const;

const EYES = {
  eyes_charcoal: "#25252B",
  eyes_brown: "#6D3F2A",
  eyes_hazel: "#987426",
  eyes_green: "#3D853D",
  eyes_teal: "#168A90",
  eyes_blue: "#2C73BE",
} as const;

export const AVATAR_BACKGROUNDS = {
  background_cloud: ["#F7F8FB", "#DDE3EC"],
  background_lilac: ["#E4DEFF", "#B8ACF4"],
  background_sky: ["#DFF3FF", "#9ED7F8"],
  background_mint: ["#DDF8EF", "#9BDDC7"],
  background_lime: ["#EEFACF", "#C6E887"],
  background_sand: ["#FFF5DB", "#E8CC94"],
  background_peach: ["#FFE9DC", "#F2B897"],
  background_coral: ["#FFE4E4", "#EF9B9E"],
  background_navy: ["#496A9A", "#233A61"],
  background_plum: ["#87659A", "#4C315D"],
  background_sunset: ["#FFD6A7", "#E88654"],
  background_aurora: ["#C9F4E9", "#69BFC2"],
} as const;

const OUTFITS = {
  outfit_hoodie: {
    primary: "#776EE2",
    secondary: "#5E55C7",
    accent: "#FFFFFF",
  },
  outfit_varsity: {
    primary: "#30354D",
    secondary: "#202438",
    accent: "#F4C95D",
  },
  outfit_sweater: {
    primary: "#E06F8B",
    secondary: "#C45270",
    accent: "#FFF3F5",
  },
  outfit_sport: {
    primary: "#21A6A1",
    secondary: "#147D7A",
    accent: "#F5D64E",
  },
  outfit_hanbok: {
    primary: "#6F85D8",
    secondary: "#4F65B5",
    accent: "#F4C95D",
  },
  outfit_denim: {
    primary: "#4F78A8",
    secondary: "#365B88",
    accent: "#F5EFE5",
  },
} as const;

const BODY_WIDTH = {
  body_slim: 126,
  body_balanced: 148,
  body_soft: 172,
  body_broad: 188,
} as const;

function darken(hex: string, amount: number) {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);

  const r = Math.max(0, (value >> 16) - amount);
  const g = Math.max(0, ((value >> 8) & 0xff) - amount);
  const b = Math.max(0, (value & 0xff) - amount);

  return `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function AvatarBackground({
  colors,
  visible,
}: {
  colors: readonly [string, string];
  visible: boolean;
}) {
  if (!visible) return null;

  return (
    <G>
      <Rect width="320" height="360" rx="34" fill="url(#avatarBackground)" />

      <Circle cx="42" cy="72" r="24" fill="#FFFFFF" opacity="0.16" />

      <Circle cx="283" cy="96" r="44" fill="#FFFFFF" opacity="0.11" />

      <Path
        d="
          M18 274
          C72 238 112 244 160 278
          C214 318 262 305 310 270
          L320 360
          L0 360
          Z
        "
        fill={colors[1]}
        opacity="0.24"
      />

      <Path
        d="
          M0 304
          C52 276 101 286 143 312
          C199 347 253 327 320 294
          L320 360
          L0 360
          Z
        "
        fill="#FFFFFF"
        opacity="0.16"
      />
    </G>
  );
}

function AvatarLegs({ skin }: { skin: string }) {
  return (
    <G>
      <Rect x="106" y="274" width="42" height="55" rx="18" fill="#2E3150" />

      <Rect x="172" y="274" width="42" height="55" rx="18" fill="#2E3150" />

      <Rect x="111" y="316" width="32" height="18" rx="8" fill={skin} />

      <Rect x="177" y="316" width="32" height="18" rx="8" fill={skin} />

      <Path
        d="
          M97 326
          C111 315 143 316 151 330
          C154 337 148 344 139 344
          H101
          C92 344 89 334 97 326
          Z
        "
        fill="#F6F7FB"
      />

      <Path
        d="
          M169 330
          C177 316 209 315 223 326
          C231 334 228 344 219 344
          H181
          C172 344 166 337 169 330
          Z
        "
        fill="#F6F7FB"
      />

      <Path
        d="M99 337 H148"
        stroke="#D8DCE6"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <Path
        d="M172 337 H221"
        stroke="#D8DCE6"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </G>
  );
}

/**
 * 기본 옷. part 로 몸통(body)과 팔(L/R — 소매+손)을 따로 그린다 — 홈 아바타가 손을
 * 흔들 때 팔만 돌린다 (텔레그램 generated-avatar Outfit 과 같다). 몸통 → 팔 순서로
 * 그리면 예전과 같은 그림이다 (옷 장식은 가운데라 팔과 안 겹친다).
 */
function AvatarOutfit({
  bodyX,
  bodyWidth,
  outfit,
  outfitId,
  skin,
  part,
}: {
  bodyX: number;
  bodyWidth: number;
  outfit: (typeof OUTFITS)[keyof typeof OUTFITS];
  outfitId: AvatarConfig["outfit"];
  skin: string;
  part: "body" | "L" | "R";
}) {
  const right = bodyX + bodyWidth;

  if (outfitId === "outfit_hanbok") {
    // 한복 소매는 몸매와 상관없이 고정 좌표
    if (part === "L") {
      return (
        <G>
          <Path
            d="M110 199 Q84 222 82 260"
            fill="none"
            stroke={outfit.primary}
            strokeWidth="31"
            strokeLinecap="round"
          />
          <Circle cx="80" cy="269" r="18" fill={skin} />
        </G>
      );
    }
    if (part === "R") {
      return (
        <G>
          <Path
            d="M210 199 Q236 222 238 260"
            fill="none"
            stroke={outfit.secondary}
            strokeWidth="31"
            strokeLinecap="round"
          />
          <Circle cx="240" cy="269" r="18" fill={skin} />
        </G>
      );
    }
    return (
      <G>
        <Path
          d={`
            M${bodyX + 10} 191
            Q160 164 ${right - 10} 191
            L${right + 9} 292
            Q160 314 ${bodyX - 9} 292
            Z
          `}
          fill={outfit.primary}
        />

        <Path
          d={`
            M160 178
            L160 294
            L${right + 9} 292
            L${right - 8} 207
            Z
          `}
          fill={outfit.secondary}
          opacity="0.38"
        />

        <Path
          d="M132 184 L160 214 L188 184"
          fill="none"
          stroke={outfit.accent}
          strokeWidth="12"
          strokeLinejoin="round"
        />

        <Rect
          x="108"
          y="236"
          width="104"
          height="13"
          rx="6"
          fill={outfit.accent}
        />
      </G>
    );
  }

  if (part === "L") {
    return (
      <G>
        <Path
          d={`
            M${bodyX + 18} 201
            Q${bodyX - 17} 220 ${bodyX - 19} 263
          `}
          fill="none"
          stroke={outfit.primary}
          strokeWidth="33"
          strokeLinecap="round"
        />
        <Circle cx={bodyX - 20} cy="271" r="18" fill={skin} />
      </G>
    );
  }
  if (part === "R") {
    return (
      <G>
        <Path
          d={`
            M${right - 18} 201
            Q${right + 17} 220 ${right + 19} 263
          `}
          fill="none"
          stroke={outfit.secondary}
          strokeWidth="33"
          strokeLinecap="round"
        />
        <Circle cx={right + 20} cy="271" r="18" fill={skin} />
      </G>
    );
  }

  return (
    <G>
      <Path
        d={`
          M${bodyX + 16} 188
          Q160 166 ${right - 16} 188
          Q${right + 3} 222 ${right + 2} 290
          Q160 307 ${bodyX - 2} 290
          Q${bodyX - 3} 222 ${bodyX + 16} 188
          Z
        `}
        fill={outfit.primary}
      />

      <Path
        d={`
          M160 180
          Q${right - 12} 183 ${right + 2} 226
          L${right + 2} 290
          Q192 301 160 301
          Z
        `}
        fill={outfit.secondary}
        opacity="0.5"
      />

      {outfitId === "outfit_hoodie" && (
        <G>
          <Path
            d="M124 190 Q160 219 196 190"
            fill="none"
            stroke={outfit.secondary}
            strokeWidth="14"
            strokeLinecap="round"
          />

          <Line
            x1="145"
            y1="207"
            x2="143"
            y2="244"
            stroke={outfit.accent}
            strokeWidth="4"
            strokeLinecap="round"
          />

          <Line
            x1="175"
            y1="207"
            x2="177"
            y2="244"
            stroke={outfit.accent}
            strokeWidth="4"
            strokeLinecap="round"
          />

          <Circle cx="143" cy="247" r="5" fill={outfit.accent} />

          <Circle cx="177" cy="247" r="5" fill={outfit.accent} />

          <Path
            d="M128 258 Q160 242 192 258 L188 284 H132 Z"
            fill={outfit.secondary}
            opacity="0.45"
          />
        </G>
      )}

      {outfitId === "outfit_varsity" && (
        <G>
          <Rect
            x="152"
            y="186"
            width="16"
            height="105"
            fill={outfit.accent}
            opacity="0.9"
          />

          <Path
            d="M119 190 Q160 216 201 190"
            fill="none"
            stroke={outfit.accent}
            strokeWidth="12"
          />

          <Circle cx="160" cy="221" r="5" fill={outfit.secondary} />

          <Circle cx="160" cy="244" r="5" fill={outfit.secondary} />

          <Circle cx="160" cy="267" r="5" fill={outfit.secondary} />
        </G>
      )}

      {outfitId === "outfit_sweater" && (
        <G>
          <Path
            d="M119 193 Q160 215 201 193"
            fill="none"
            stroke={outfit.accent}
            strokeWidth="12"
          />

          <Path
            d="M127 234 H193"
            stroke={outfit.accent}
            strokeWidth="7"
            strokeDasharray="8 7"
            opacity="0.75"
          />

          <Path
            d="M127 258 H193"
            stroke={outfit.accent}
            strokeWidth="7"
            strokeDasharray="8 7"
            opacity="0.75"
          />
        </G>
      )}

      {outfitId === "outfit_sport" && (
        <G>
          <Path
            d="M126 188 L160 219 L194 188"
            fill={outfit.accent}
            opacity="0.95"
          />

          <Circle
            cx="160"
            cy="246"
            r="23"
            fill={outfit.secondary}
            opacity="0.85"
          />

          <Path
            d="M148 246 H172 M160 234 V258"
            stroke={outfit.accent}
            strokeWidth="6"
            strokeLinecap="round"
          />
        </G>
      )}

      {outfitId === "outfit_denim" && (
        <G>
          <Path d="M127 189 L160 216 L193 189" fill={outfit.accent} />

          <Line
            x1="160"
            y1="212"
            x2="160"
            y2="290"
            stroke={outfit.accent}
            strokeWidth="4"
            opacity="0.8"
          />

          <Rect
            x="123"
            y="235"
            width="29"
            height="24"
            rx="4"
            fill={outfit.secondary}
            opacity="0.65"
          />

          <Rect
            x="168"
            y="235"
            width="29"
            height="24"
            rx="4"
            fill={outfit.secondary}
            opacity="0.65"
          />
        </G>
      )}
    </G>
  );
}

function AvatarBackHair({
  hairstyle,
  hair,
}: {
  hairstyle: AvatarConfig["hairstyle"];
  hair: string;
}) {
  if (hairstyle === "hair_none" || hairstyle === "hair_crop") {
    return null;
  }

  if (hairstyle === "hair_bob") {
    return (
      <Path
        d="
          M75 105
          Q79 40 160 30
          Q241 40 245 105
          L238 211
          Q206 236 160 230
          Q114 236 82 211
          Z
        "
        fill={hair}
      />
    );
  }

  if (hairstyle === "hair_pony") {
    return (
      <G>
        <Path
          d="
            M77 107
            Q82 40 160 31
            Q237 40 243 107
            L228 194
            Q196 218 160 214
            Q124 218 92 194
            Z
          "
          fill={hair}
        />

        <Path
          d="
            M224 86
            Q276 99 260 169
            Q252 206 226 217
            Q241 155 216 119
            Z
          "
          fill={hair}
        />
      </G>
    );
  }

  if (hairstyle === "hair_topknot") {
    return (
      <G>
        <Circle cx="160" cy="34" r="34" fill={hair} />

        <Path
          d="
            M78 108
            Q83 40 160 31
            Q237 40 242 108
            L226 196
            Q194 216 160 212
            Q126 216 94 196
            Z
          "
          fill={hair}
        />
      </G>
    );
  }

  return (
    <Path
      d="
        M78 108
        Q82 39 160 30
        Q238 39 242 108
        L228 198
        Q197 219 160 215
        Q123 219 92 198
        Z
      "
      fill={hair}
    />
  );
}

/** 머리. 귀(ears)와 머리통(head)을 따로 — 고개를 돌릴 때 서로 반대로 움직인다 */
function AvatarHead({ skin, part }: { skin: string; part: "ears" | "head" }) {
  if (part === "ears") {
    return (
      <G>
        <Ellipse cx="84" cy="139" rx="24" ry="29" fill={skin} />

        <Ellipse cx="236" cy="139" rx="24" ry="29" fill={skin} />
      </G>
    );
  }
  return (
    <G>
      <Ellipse cx="160" cy="130" rx="76" ry="91" fill={skin} />

      <Ellipse cx="137" cy="92" rx="43" ry="28" fill="#FFFFFF" opacity="0.08" />

      <Path
        d="
          M99 160
          Q112 210 160 219
          Q208 210 221 160
          Q212 228 160 238
          Q108 228 99 160
          Z
        "
        fill={darken(skin, 12)}
        opacity="0.16"
      />
    </G>
  );
}

/** 감은 눈 — 깜빡일 때 (뜬 눈 자리에 살짝 처진 선) */
function ClosedEye({ cx, cy, eye }: { cx: number; cy: number; eye: string }) {
  return (
    <Path
      d={`M${cx - 14} ${cy + 1} Q${cx} ${cy + 8} ${cx + 14} ${cy + 1}`}
      fill="none"
      stroke={eye}
      strokeWidth="6"
      strokeLinecap="round"
    />
  );
}

function AvatarFace({
  expression,
  eye,
  skin,
  blink = false,
}: {
  expression: AvatarConfig["expression"];
  eye: string;
  skin: string;
  blink?: boolean;
}) {
  const leftEyeY = expression === "expression_curious" ? 124 : 128;

  const rightEyeY = expression === "expression_curious" ? 132 : 128;

  const brow = darken(skin, 58);

  return (
    <G>
      {expression === "expression_focused" ? (
        <G>
          <Path
            d="M111 111 L139 119"
            stroke={brow}
            strokeWidth="7"
            strokeLinecap="round"
          />

          <Path
            d="M181 119 L209 111"
            stroke={brow}
            strokeWidth="7"
            strokeLinecap="round"
          />
        </G>
      ) : (
        <G>
          <Path
            d="M111 112 Q126 103 141 111"
            fill="none"
            stroke={brow}
            strokeWidth="6"
            strokeLinecap="round"
          />

          <Path
            d="M179 111 Q194 103 209 112"
            fill="none"
            stroke={brow}
            strokeWidth="6"
            strokeLinecap="round"
          />
        </G>
      )}

      {expression === "expression_playful" ? (
        <G>
          <Path
            d="M110 129 Q126 139 142 129"
            fill="none"
            stroke={eye}
            strokeWidth="7"
            strokeLinecap="round"
          />

          {blink ? (
            <ClosedEye cx={194} cy={128} eye={eye} />
          ) : (
            <G>
              <Ellipse cx="194" cy="128" rx="12" ry="15" fill="#FFFFFF" />

              <Circle cx="194" cy="130" r="7" fill={eye} />

              <Circle cx="197" cy="126" r="2.4" fill="#FFFFFF" />
            </G>
          )}
        </G>
      ) : expression === "expression_proud" ? (
        <G>
          <Path
            d="M110 130 Q126 139 142 130"
            fill="none"
            stroke={eye}
            strokeWidth="7"
            strokeLinecap="round"
          />

          <Path
            d="M178 130 Q194 139 210 130"
            fill="none"
            stroke={eye}
            strokeWidth="7"
            strokeLinecap="round"
          />
        </G>
      ) : blink ? (
        <G>
          <ClosedEye cx={126} cy={leftEyeY} eye={eye} />

          <ClosedEye cx={194} cy={rightEyeY} eye={eye} />
        </G>
      ) : (
        <G>
          <Ellipse cx="126" cy={leftEyeY} rx="12" ry="15" fill="#FFFFFF" />

          <Ellipse cx="194" cy={rightEyeY} rx="12" ry="15" fill="#FFFFFF" />

          <Circle cx="126" cy={leftEyeY + 2} r="7" fill={eye} />

          <Circle cx="194" cy={rightEyeY + 2} r="7" fill={eye} />

          <Circle cx="129" cy={leftEyeY - 2} r="2.5" fill="#FFFFFF" />

          <Circle cx="197" cy={rightEyeY - 2} r="2.5" fill="#FFFFFF" />
        </G>
      )}

      <Path
        d="
          M157 137
          Q151 151 160 155
          Q168 153 166 147
        "
        fill="none"
        stroke={darken(skin, 34)}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Ellipse cx="115" cy="158" rx="17" ry="8" fill="#D76E76" opacity="0.24" />

      <Ellipse cx="205" cy="158" rx="17" ry="8" fill="#D76E76" opacity="0.24" />

      {expression === "expression_calm" && (
        <Path
          d="M143 177 Q160 184 177 177"
          fill="none"
          stroke="#7E3F45"
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}

      {expression === "expression_smile" && (
        <G>
          <Path
            d="
              M137 172
              Q160 202 183 172
              Q160 187 137 172
              Z
            "
            fill="#7E3F45"
          />

          <Path
            d="M146 174 Q160 181 174 174"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </G>
      )}

      {expression === "expression_proud" && (
        <Path
          d="M139 174 Q159 186 181 171"
          fill="none"
          stroke="#7E3F45"
          strokeWidth="7"
          strokeLinecap="round"
        />
      )}

      {expression === "expression_curious" && (
        <Ellipse cx="161" cy="180" rx="10" ry="13" fill="#7E3F45" />
      )}

      {expression === "expression_playful" && (
        <G>
          <Path d="M137 172 Q160 198 184 171" fill="#7E3F45" />

          <Path d="M157 185 Q169 194 177 181" fill="#E77883" />
        </G>
      )}

      {expression === "expression_focused" && (
        <Path
          d="M143 181 Q160 173 177 181"
          fill="none"
          stroke="#7E3F45"
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}
    </G>
  );
}

function AvatarFrontHair({
  hairstyle,
  hair,
}: {
  hairstyle: AvatarConfig["hairstyle"];
  hair: string;
}) {
  if (hairstyle === "hair_none") return null;

  if (hairstyle === "hair_crop") {
    return (
      <Path
        d="
          M91 95
          Q105 41 160 38
          Q216 41 229 95
          Q202 73 178 76
          Q151 80 126 65
          Q114 84 91 95
          Z
        "
        fill={hair}
      />
    );
  }

  if (hairstyle === "hair_curls") {
    return (
      <G>
        {[92, 118, 144, 170, 196, 222].map((cx, index) => (
          <Circle
            key={cx}
            cx={cx}
            cy={index % 2 === 0 ? 72 : 58}
            r="27"
            fill={hair}
          />
        ))}

        <Circle cx="88" cy="104" r="25" fill={hair} />

        <Circle cx="232" cy="104" r="25" fill={hair} />
      </G>
    );
  }

  return (
    <Path
      d="
        M84 101
        Q87 47 144 35
        Q196 23 232 67
        Q243 85 230 106
        Q209 78 183 80
        Q157 84 136 64
        Q123 87 99 84
        Q98 99 84 101
        Z
      "
      fill={hair}
    />
  );
}

function AvatarFacialHair({
  facialHair,
  hair,
}: {
  facialHair: AvatarConfig["facialHair"];
  hair: string;
}) {
  if (facialHair === "facial_none") return null;

  if (facialHair === "facial_stubble") {
    return (
      <Path
        d="
          M119 168
          Q160 207 201 168
          Q193 218 160 224
          Q127 218 119 168
          Z
        "
        fill={hair}
        opacity="0.33"
      />
    );
  }

  if (facialHair === "facial_mustache") {
    return (
      <Path
        d="
          M158 163
          Q144 152 129 165
          Q142 184 160 171
          Q178 184 191 165
          Q176 152 162 163
          Z
        "
        fill={hair}
      />
    );
  }

  return (
    <G>
      <Path
        d="
          M111 164
          Q120 227 160 238
          Q200 227 209 164
          Q194 188 180 190
          Q160 200 140 190
          Q126 188 111 164
          Z
        "
        fill={hair}
      />

      <Path
        d="
          M158 162
          Q143 152 128 166
          Q142 184 160 171
          Q178 184 192 166
          Q177 152 162 162
          Z
        "
        fill={hair}
      />
    </G>
  );
}

function AvatarEyewear({ eyewear }: { eyewear: AvatarConfig["eyewear"] }) {
  if (eyewear === "eyewear_none") return null;

  if (eyewear === "eyewear_round") {
    return (
      <G fill="none" stroke="#30313A" strokeWidth="6">
        <Circle cx="126" cy="130" r="24" />
        <Circle cx="194" cy="130" r="24" />

        <Path d="M150 129 Q160 123 170 129" />

        <Path d="M101 127 L85 121 M219 127 L235 121" strokeLinecap="round" />
      </G>
    );
  }

  if (eyewear === "eyewear_square") {
    return (
      <G fill="none" stroke="#30313A" strokeWidth="6" strokeLinejoin="round">
        <Rect x="101" y="108" width="50" height="43" rx="10" />

        <Rect x="169" y="108" width="50" height="43" rx="10" />

        <Path d="M151 128 H169" />

        <Path d="M101 119 L85 114 M219 119 L235 114" strokeLinecap="round" />
      </G>
    );
  }

  if (eyewear === "eyewear_sun") {
    return (
      <G>
        <Path
          d="
            M96 112
            Q126 101 154 113
            L150 145
            Q124 159 103 141
            Z
          "
          fill="#31313A"
        />

        <Path
          d="
            M166 113
            Q194 101 224 112
            L217 141
            Q196 159 170 145
            Z
          "
          fill="#31313A"
        />

        <Rect x="150" y="119" width="20" height="7" rx="3" fill="#31313A" />

        <Path
          d="M106 119 Q124 110 141 116"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.45"
        />

        <Path
          d="M179 116 Q196 110 214 119"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.45"
        />
      </G>
    );
  }

  return (
    <G fill="none" stroke="#30313A" strokeWidth="5">
      <Path d="M102 119 Q126 109 150 119 L148 145 Q126 153 105 142 Z" />
      <Path d="M170 119 Q194 109 218 119 L215 142 Q194 153 172 145 Z" />
      <Path d="M150 127 H170" />
    </G>
  );
}

function AvatarHeadwear({
  headwear,
  outfit,
}: {
  headwear: AvatarConfig["headwear"];
  outfit: (typeof OUTFITS)[keyof typeof OUTFITS];
}) {
  if (headwear === "headwear_none") return null;

  if (headwear === "headwear_cap") {
    return (
      <G>
        <Path
          d="
            M91 67
            Q106 20 160 20
            Q214 20 229 67
            Z
          "
          fill={outfit.primary}
        />

        <Path
          d="
            M117 66
            Q173 56 242 73
            Q204 91 155 77
            Q137 72 117 66
            Z
          "
          fill={outfit.secondary}
        />

        <Circle cx="160" cy="28" r="7" fill={outfit.accent} />
      </G>
    );
  }

  if (headwear === "headwear_beanie") {
    return (
      <G>
        <Path
          d="
            M94 70
            Q99 16 160 14
            Q221 16 226 70
            Z
          "
          fill={outfit.primary}
        />

        <Rect
          x="91"
          y="60"
          width="138"
          height="30"
          rx="14"
          fill={outfit.secondary}
        />

        <Circle cx="160" cy="15" r="12" fill={outfit.accent} />
      </G>
    );
  }

  if (headwear === "headwear_headband") {
    return (
      <Path
        d="M91 72 Q160 48 229 72"
        fill="none"
        stroke={outfit.accent}
        strokeWidth="15"
        strokeLinecap="round"
      />
    );
  }

  return (
    <G>
      <Path
        d="
          M101 49
          Q160 13 219 49
          L229 79
          H91
          Z
        "
        fill={outfit.primary}
      />

      <Ellipse cx="160" cy="79" rx="83" ry="18" fill={outfit.secondary} />

      <Path
        d="M119 49 Q160 34 201 49"
        fill="none"
        stroke={outfit.accent}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </G>
  );
}

export function getAvatarHeaderContentColor(
  avatar?: Partial<AvatarConfig> | null,
) {
  const { background } = mergeAvatarConfig(avatar);

  return background === "background_navy" || background === "background_plum"
    ? "#FFFFFF"
    : "#25252F";
}

export default function AvatarPreview({
  avatar = DEFAULT_AVATAR_CONFIG,
  size = 220,
  showBackground = true,
  variant = "full",
  aura = false,
  auraLite = false,
  hangulWord,
  alive = false,
}: Props) {
  const config = mergeAvatarConfig(avatar);

  const skin = SKIN[config.skinTone];
  const hair = HAIR[config.hairColor];
  const eye = EYES[config.eyeColor];
  const background = AVATAR_BACKGROUNDS[config.background];
  const outfit = OUTFITS[config.outfit];

  const bodyWidth = BODY_WIDTH[config.bodyShape];
  const bodyX = 160 - bodyWidth / 2;

  const viewBox = variant === "head" ? "52 16 216 216" : "0 0 320 360";
  // 상점 의상 (기본 옷 대신) · 손에 든 것 (전신만)
  const wearBody = { bodyX, bodyWidth, skin };
  const costume = costumeShapes(config.costume, wearBody);
  // 의상의 팔(소매·손)은 따로 — 손을 흔들 때 팔만 돈다. 순서는 그대로라 그림은 같다
  const costumeParts = costume ? splitArms(costume) : null;
  const handItem = variant === "full" ? handShapes(config.hand, wearBody) : null;
  const hat = hatShapes(config.hat);
  // 세트 효과 — 다 갖추면 뒤에 은은한 빛 (전신만)
  const halo = variant === "full" ? setHaloShapes(config) : null;

  // ── 부위 (정지 그림은 한 장에 차례대로, 홈 아바타는 부위마다 따로 움직인다) ──
  const base = (
    <>
      <Defs>
        <LinearGradient id="avatarBackground" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={background[0]} />

          <Stop offset="1" stopColor={background[1]} />
        </LinearGradient>

        <RadialGradient id="avatarGlow" cx="50%" cy="43%" r="58%">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.56" />

          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      <AvatarBackground colors={background} visible={showBackground} />

      {showBackground && (
        <Circle cx="160" cy="149" r="126" fill="url(#avatarGlow)" />
      )}

      {halo && <WearShapes shapes={halo} />}

      <Ellipse
        cx="160"
        cy="337"
        rx="91"
        ry="15"
        fill="#151521"
        opacity="0.14"
      />
    </>
  );
  const outfitPart = (part: "body" | "L" | "R") => (
    <AvatarOutfit
      bodyX={bodyX}
      bodyWidth={bodyWidth}
      outfit={outfit}
      outfitId={config.outfit}
      skin={skin}
      part={part}
    />
  );
  const parts: AvatarParts = {
    base,
    backHair: <AvatarBackHair hairstyle={config.hairstyle} hair={hair} />,
    legs: <AvatarLegs skin={skin} />,
    armBackL: costumeParts?.backL.length ? <WearShapes shapes={costumeParts.backL} /> : null,
    armBackR: costumeParts?.backR.length ? <WearShapes shapes={costumeParts.backR} /> : null,
    body: (
      <>
        {costumeParts ? <WearShapes shapes={costumeParts.body} /> : outfitPart("body")}
      </>
    ),
    armFrontL: costumeParts ? <WearShapes shapes={costumeParts.frontL} /> : outfitPart("L"),
    armFrontR: costumeParts ? <WearShapes shapes={costumeParts.frontR} /> : outfitPart("R"),
    neck: <Rect x="139" y="180" width="42" height="34" rx="15" fill={skin} />,
    ears: <AvatarHead skin={skin} part="ears" />,
    head: <AvatarHead skin={skin} part="head" />,
    face: (blink: boolean) => (
      <>
        <AvatarFace expression={config.expression} eye={eye} skin={skin} blink={blink} />

        <AvatarFacialHair facialHair={config.facialHair} hair={hair} />
      </>
    ),
    frontHair: <AvatarFrontHair hairstyle={config.hairstyle} hair={hair} />,
    eyewear: config.eyewear !== "eyewear_none" ? <AvatarEyewear eyewear={config.eyewear} /> : null,
    hat: hat ? <WearShapes shapes={hat} /> : <AvatarHeadwear headwear={config.headwear} outfit={outfit} />,
    handItem: handItem ? <WearShapes shapes={handItem} /> : null,
  };

  const svg =
    alive && variant === "full" ? (
      <AliveAvatar
        parts={parts}
        size={size}
        expression={config.expression}
        body={{ bodyX, bodyWidth, outfit: config.outfit, costume: config.costume, hand: config.hand }}
      />
    ) : (
      <Svg
        width={size}
        height={size}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        {parts.base}
        {parts.backHair}
        {parts.legs}
        {parts.armBackL}
        {parts.armBackR}
        {parts.body}
        {parts.armFrontL}
        {parts.armFrontR}
        {parts.neck}
        {parts.ears}
        {parts.head}
        {parts.face(false)}
        {parts.frontHair}
        {parts.eyewear}
        {parts.hat}
        {parts.handItem}
      </Svg>
    );

  if (!aura || variant !== "full" || !isAura(config.aura)) return svg;
  return (
    <AvatarAura aura={config.aura} size={size} lite={auraLite} hangulWord={hangulWord}>
      {svg}
    </AvatarAura>
  );
}

interface AvatarParts {
  base: ReactNode;
  backHair: ReactNode;
  legs: ReactNode;
  armBackL: ReactNode;
  armBackR: ReactNode;
  body: ReactNode;
  armFrontL: ReactNode;
  armFrontR: ReactNode;
  neck: ReactNode;
  ears: ReactNode;
  head: ReactNode;
  face: (blink: boolean) => ReactNode;
  frontHair: ReactNode;
  eyewear: ReactNode;
  hat: ReactNode;
  handItem: ReactNode;
}

/** 한 부위 = 같은 캔버스(320×360)를 통째로 덮는 SVG 한 장. 겹쳐 쌓고 View 째로 움직인다 */
function MotionLayer({
  size,
  style,
  children,
}: {
  size: number;
  style?: ComponentProps<typeof Animated.View>["style"];
  children: ReactNode;
}) {
  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, style]}>
      <Svg width={size} height={size} viewBox="0 0 320 360" preserveAspectRatio="xMidYMid meet">
        {children}
      </Svg>
    </Animated.View>
  );
}

/**
 * 홈 아바타 — 눈을 깜빡이고, 들어올 때 손을 흔들고, 가끔 두리번거린다.
 * 동작표는 avatarMotion (텔레그램 generated-avatar alive 와 같다).
 * react-native-svg 안의 그룹을 UI 스레드에서 움직이기보다, 부위마다 SVG 한 장씩
 * 겹쳐 놓고 Animated.View 를 돌리는 쪽이 플랫폼 상관없이 확실하다.
 */
function AliveAvatar({
  parts,
  size,
  expression,
  body,
}: {
  parts: AvatarParts;
  size: number;
  expression: string;
  body: MotionBody;
}) {
  const { blink, look, tilt, lean, armL, armR } = useAvatarMotion({
    body,
    enabled: true,
    expression,
  });
  // 캔버스 → 화면 px (xMidYMid meet: 세로가 꽉 차고 가로는 가운데)
  const k = size / 360;
  const offX = (size - 320 * k) / 2;
  const at = (point: { x: number; y: number }) => ({
    transformOrigin: [offX + point.x * k, point.y * k, 0] as [number, number, number],
  });
  const pivotL = armGeometry("L", body).pivot;
  const pivotR = armGeometry("R", body).pivot;

  // 같은 animated style 을 여러 View 에 나눠 쓰지 않는다 — 부위마다 하나씩
  const leanStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${lean.value}deg` }],
  }));
  const armBackLStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${armL.value}deg` }],
  }));
  const armBackRStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${armR.value}deg` }],
  }));
  const armFrontLStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${armL.value}deg` }],
  }));
  const armFrontRStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${armR.value}deg` }],
  }));
  // 고개 돌리기 — 얼굴이 제일 많이, 머리는 조금, 귀·뒷머리는 반대로 (LOOK_SHIFT)
  const backHairStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${tilt.value}deg` }, { translateX: LOOK_SHIFT.back * look.value * k }],
  }));
  const earsStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${tilt.value}deg` }, { translateX: LOOK_SHIFT.ears * look.value * k }],
  }));
  const headStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${tilt.value}deg` }, { translateX: LOOK_SHIFT.head * look.value * k }],
  }));
  const faceStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${tilt.value}deg` }, { translateX: LOOK_SHIFT.face * look.value * k }],
  }));
  const eyewearStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${tilt.value}deg` }, { translateX: LOOK_SHIFT.face * look.value * k }],
  }));
  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${tilt.value}deg` }, { translateX: LOOK_SHIFT.front * look.value * k }],
  }));

  const neck = at(NECK);
  return (
    <View pointerEvents="none" style={{ width: size, height: size }}>
      <MotionLayer size={size}>{parts.base}</MotionLayer>
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, at(FEET), leanStyle]}>
        <MotionLayer size={size} style={[neck, backHairStyle]}>
          {parts.backHair}
        </MotionLayer>
        <MotionLayer size={size}>{parts.legs}</MotionLayer>
        {parts.armBackL ? (
          <MotionLayer size={size} style={[at(pivotL), armBackLStyle]}>
            {parts.armBackL}
          </MotionLayer>
        ) : null}
        {parts.armBackR ? (
          <MotionLayer size={size} style={[at(pivotR), armBackRStyle]}>
            {parts.armBackR}
          </MotionLayer>
        ) : null}
        <MotionLayer size={size}>
          {parts.body}
          {parts.neck}
        </MotionLayer>
        <MotionLayer size={size} style={[at(pivotL), armFrontLStyle]}>
          {parts.armFrontL}
        </MotionLayer>
        <MotionLayer size={size} style={[at(pivotR), armFrontRStyle]}>
          {parts.armFrontR}
        </MotionLayer>
        <MotionLayer size={size} style={[neck, earsStyle]}>
          {parts.ears}
        </MotionLayer>
        <MotionLayer size={size} style={[neck, headStyle]}>
          {parts.head}
        </MotionLayer>
        <MotionLayer size={size} style={[neck, faceStyle]}>
          {parts.face(blink)}
        </MotionLayer>
        <MotionLayer size={size} style={[neck, frontStyle]}>
          {parts.frontHair}
          {parts.hat}
        </MotionLayer>
        {parts.eyewear ? (
          <MotionLayer size={size} style={[neck, eyewearStyle]}>
            {parts.eyewear}
          </MotionLayer>
        ) : null}
        {parts.handItem ? <MotionLayer size={size}>{parts.handItem}</MotionLayer> : null}
      </Animated.View>
    </View>
  );
}
