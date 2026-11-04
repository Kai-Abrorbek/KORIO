import { memo, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient as SvgGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";
import {
  sceneOf,
  withAlpha,
  type ParticleKind,
  type SceneKey,
  type ScenePalette,
} from "./scenes";

/**
 * 이야기의 살아 있는 그림.
 *
 * 하늘(SVG) → 해·달(움직이는 View) → 땅(SVG) → 입자(움직이는 View) → 바닥으로 녹는 그라디언트.
 * 해·달은 `progress`(0~1, 이야기 진행)를 따라 하늘을 가로지른다 — 이 그림의 진행 막대다.
 *
 * 성능: SVG 는 한 번 그리고 다시 안 그린다(memo). 움직이는 건 transform·opacity 뿐이고
 * 시계 하나(clock)를 모든 입자가 나눠 쓴다. 동작 줄이기 설정이면 입자를 멈춘다.
 */

const VB_W = 400;
const VB_H = 300;
const BASE = 238;

interface Props {
  scene: SceneKey | string;
  width: number;
  height: number;
  /** 이야기 진행 0~1. 없으면 해를 오후 자리에 고정 (목록 썸네일) */
  progress?: SharedValue<number>;
  /** 입자·해 움직임. 썸네일은 끈다 */
  animated?: boolean;
  /** 아래쪽을 이 색으로 녹인다 (페이지 바닥과 이어지게) */
  fadeTo?: string;
}

function StorySceneBase({
  scene,
  width,
  height,
  progress,
  animated = true,
  fadeTo,
}: Props) {
  const palette = sceneOf(scene);
  const reducedMotion = useReducedMotion();
  const moving = animated && !reducedMotion && width > 0;

  // viewBox 를 slice 로 채울 때의 배율과 여백 — 해·입자를 같은 좌표에 놓으려고
  const scale = Math.max(width / VB_W, height / VB_H);
  const offsetX = (width - VB_W * scale) / 2;
  const offsetY = (height - VB_H * scale) / 2;

  return (
    <View style={{ width, height, overflow: "hidden" }}>
      <SkyLayer palette={palette} width={width} height={height} />
      {palette.body !== "none" && (
        <Celestial
          palette={palette}
          progress={progress}
          scale={scale}
          offsetX={offsetX}
          offsetY={offsetY}
        />
      )}
      <LandLayer palette={palette} width={width} height={height} />
      {moving && (
        <Particles
          kind={palette.particles}
          colors={palette.particleColors}
          width={width}
          height={height}
          seedKey={String(scene)}
        />
      )}
      {!!fadeTo && (
        <LinearGradient
          pointerEvents="none"
          colors={[withAlpha(fadeTo, 0), withAlpha(fadeTo, 0.55), fadeTo]}
          locations={[0, 0.55, 1]}
          style={[styles.fade, { height: height * 0.46 }]}
        />
      )}
    </View>
  );
}

export const StoryScene = memo(StorySceneBase);

/* ───────────────────────── 하늘 ───────────────────────── */

const SkyLayer = memo(function SkyLayer({
  palette,
  width,
  height,
}: {
  palette: ScenePalette;
  width: number;
  height: number;
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        <SvgGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={palette.sky[0]} />
          <Stop offset="0.55" stopColor={palette.sky[1]} />
          <Stop offset="1" stopColor={palette.sky[2]} />
        </SvgGradient>
      </Defs>
      <Rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#sky)" />
      {palette.clouds && (
        <G fill={palette.clouds} opacity={0.92}>
          <Ellipse cx="70" cy="74" rx="66" ry="22" />
          <Ellipse cx="118" cy="60" rx="44" ry="20" />
          <Ellipse cx="250" cy="96" rx="78" ry="24" />
          <Ellipse cx="300" cy="80" rx="44" ry="18" />
          <Ellipse cx="370" cy="54" rx="56" ry="18" />
          <Ellipse cx="190" cy="40" rx="50" ry="14" />
        </G>
      )}
    </Svg>
  );
});

/* ───────────────────────── 해·달 ───────────────────────── */

const ARC_LEFT = 70;
const ARC_RIGHT = 330;
const ARC_BASE = 196;
const ARC_HEIGHT = 128;
const BODY_R = 20;
const GLOW_R = 74;

function Celestial({
  palette,
  progress,
  scale,
  offsetX,
  offsetY,
}: {
  palette: ScenePalette;
  progress?: SharedValue<number>;
  scale: number;
  offsetX: number;
  offsetY: number;
}) {
  const size = GLOW_R * 2 * scale;
  const style = useAnimatedStyle(() => {
    const p = Math.min(1, Math.max(0, progress ? progress.value : 0.32));
    const vx = ARC_LEFT + (ARC_RIGHT - ARC_LEFT) * p;
    const vy = ARC_BASE - Math.sin(Math.PI * (0.12 + 0.76 * p)) * ARC_HEIGHT;
    return {
      transform: [
        { translateX: offsetX + vx * scale - size / 2 },
        { translateY: offsetY + vy * scale - size / 2 },
      ],
    };
  }, [progress, scale, offsetX, offsetY, size]);

  const isMoon = palette.body === "moon";
  return (
    <Animated.View
      pointerEvents="none"
      style={[{ position: "absolute", width: size, height: size }, style]}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${GLOW_R * 2} ${GLOW_R * 2}`}>
        <Defs>
          <RadialGradient id="halo" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={palette.glow} stopOpacity={0.75} />
            <Stop offset="0.32" stopColor={palette.glow} stopOpacity={0.3} />
            <Stop offset="1" stopColor={palette.glow} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={GLOW_R} cy={GLOW_R} r={GLOW_R} fill="url(#halo)" />
        <Circle cx={GLOW_R} cy={GLOW_R} r={BODY_R} fill={palette.bodyColor} />
        {isMoon && (
          <G fill={palette.glow} opacity={0.35}>
            <Circle cx={GLOW_R - 6} cy={GLOW_R - 5} r={4} />
            <Circle cx={GLOW_R + 7} cy={GLOW_R + 4} r={3} />
            <Circle cx={GLOW_R - 2} cy={GLOW_R + 9} r={2} />
          </G>
        )}
      </Svg>
    </Animated.View>
  );
}

/* ───────────────────────── 땅 ───────────────────────── */

const RIDGE =
  "M0 200 L30 178 L58 190 L100 142 L132 170 L166 156 L212 112 L250 156 L282 144 L326 120 L360 154 L400 136 L400 300 L0 300 Z";
const RIDGE_CAPS = [
  "M100 142 L88 156 L96 153 L101 159 L108 152 L114 157 Z",
  "M212 112 L196 130 L205 126 L212 134 L220 125 L229 131 Z",
  "M326 120 L312 136 L320 133 L327 140 L334 132 L341 138 Z",
];
const NEAR_HILL =
  "M0 248 C70 232 130 244 200 240 C270 236 330 226 400 242 L400 300 L0 300 Z";

const LandLayer = memo(function LandLayer({
  palette,
  width,
  height,
}: {
  palette: ScenePalette;
  width: number;
  height: number;
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      style={StyleSheet.absoluteFill}
    >
      <Path d={RIDGE} fill={palette.far} />
      {palette.farCap &&
        RIDGE_CAPS.map((d) => <Path key={d} d={d} fill={palette.farCap} />)}
      <Skyline palette={palette} />
      <Path d={NEAR_HILL} fill={palette.near} />
    </Svg>
  );
});

function Skyline({ palette }: { palette: ScenePalette }) {
  switch (palette.skyline) {
    case "trees":
      return <Trees palette={palette} />;
    case "mahalla":
      return <Mahalla palette={palette} />;
    case "domes":
      return <Domes palette={palette} />;
    case "city":
      return <City palette={palette} />;
    case "orchard":
      return <Orchard palette={palette} />;
    case "pines":
      return <Pines palette={palette} />;
  }
}

/** 플라타너스 — 둥근 수관이 세 겹으로 겹친다 */
const TREES = [
  { x: 18, h: 22, r: 20 },
  { x: 68, h: 30, r: 26 },
  { x: 126, h: 24, r: 22 },
  { x: 186, h: 34, r: 30 },
  { x: 246, h: 26, r: 22 },
  { x: 300, h: 32, r: 28 },
  { x: 356, h: 24, r: 24 },
  { x: 398, h: 28, r: 22 },
];

function Trees({ palette }: { palette: ScenePalette }) {
  return (
    <G>
      {TREES.map(({ x, h, r }) => {
        const top = BASE - h;
        return (
          <G key={x}>
            <Rect x={x - 2.5} y={top} width={5} height={h + 6} fill={palette.mid} />
            <Circle cx={x} cy={top - r * 0.55} r={r} fill={palette.mid} />
            <Circle
              cx={x - r * 0.5}
              cy={top - r * 0.2}
              r={r * 0.68}
              fill={palette.midAccent}
            />
            <Circle
              cx={x + r * 0.42}
              cy={top - r * 0.9}
              r={r * 0.55}
              fill={palette.midAccent}
              opacity={0.85}
            />
          </G>
        );
      })}
    </G>
  );
}

/** 마할라 — 평지붕 집, 난간, 미나렛 하나, 몇 개 켜진 창 */
const HOUSES: [number, number, number][] = [
  [-4, 48, 34],
  [42, 58, 44],
  [98, 40, 30],
  [136, 66, 50],
  [200, 46, 36],
  [244, 62, 46],
  [304, 42, 32],
  [344, 60, 42],
];

function Mahalla({ palette }: { palette: ScenePalette }) {
  const lit = palette.window ?? palette.midAccent;
  return (
    <G>
      {/* 미나렛은 집들 뒤에 */}
      <Path d="M170 238 L172 112 L182 112 L184 238 Z" fill={palette.midAccent} />
      <Rect x="166" y="118" width="22" height="5" fill={palette.mid} />
      <Rect x="171" y="98" width="12" height="14" fill={palette.midAccent} />
      <Path d="M170 98 Q177 82 184 98 Z" fill={palette.mid} />
      <Circle cx="122" cy="206" r="15" fill={palette.midAccent} />
      <Circle cx="296" cy="200" r="17" fill={palette.midAccent} />
      {HOUSES.map(([x, w, h], index) => {
        const top = BASE - h;
        return (
          <G key={x}>
            <Rect x={x} y={top} width={w} height={h + 8} fill={palette.mid} />
            <Rect x={x - 2} y={top - 4} width={w + 4} height={4} fill={palette.midAccent} />
            {index % 2 === 1 && (
              <>
                <Rect x={x + w * 0.22} y={top + 12} width={7} height={9} rx={1} fill={lit} />
                <Rect x={x + w * 0.62} y={top + 12} width={7} height={9} rx={1} fill={lit} />
              </>
            )}
          </G>
        );
      })}
    </G>
  );
}

/** 바자르 — 커다란 푸른 돔, 아케이드, 작은 돔 둘, 미나렛 */
function Domes({ palette }: { palette: ScenePalette }) {
  return (
    <G>
      <Path d="M354 238 L356 100 L366 100 L368 238 Z" fill={palette.mid} />
      <Rect x="350" y="110" width="22" height="5" fill={palette.midAccent} />
      <Rect x="355" y="88" width="12" height="12" fill={palette.mid} />
      <Path d="M354 88 Q361 72 368 88 Z" fill={palette.midAccent} />

      <Rect x="36" y="204" width="104" height="40" fill={palette.mid} />
      {[48, 72, 96, 120].map((x) => (
        <Path
          key={x}
          d={`M${x} 244 L${x} 224 Q${x + 8} 212 ${x + 16} 224 L${x + 16} 244 Z`}
          fill={palette.near}
          opacity={0.75}
        />
      ))}

      <Rect x="140" y="186" width="120" height="58" fill={palette.mid} />
      <Path d="M134 190 Q200 104 266 190 Z" fill={palette.midAccent} />
      <G stroke={palette.mid} strokeWidth={2} opacity={0.35} fill="none">
        <Path d="M200 132 L200 190" />
        <Path d="M176 142 Q182 166 172 190" />
        <Path d="M224 142 Q218 166 228 190" />
      </G>
      <Rect x="198" y="114" width="4" height="18" fill={palette.midAccent} />
      <Circle cx="200" cy="112" r="4" fill={palette.midAccent} />

      <Rect x="266" y="208" width="84" height="36" fill={palette.mid} />
      <Path d="M272 210 Q290 182 308 210 Z" fill={palette.midAccent} />
      <Path d="M308 210 Q326 182 344 210 Z" fill={palette.midAccent} />
    </G>
  );
}

/** 도시 — 아파트 블록, 텔레비전 탑, 켜진 창 몇 개 */
const BLOCKS: [number, number, number][] = [
  [0, 40, 70],
  [38, 30, 96],
  [66, 52, 62],
  [116, 36, 112],
  [150, 58, 78],
  [206, 40, 58],
  [244, 22, 40],
  [290, 30, 64],
  [318, 46, 104],
  [362, 40, 74],
];

function City({ palette }: { palette: ScenePalette }) {
  const windows = useMemo(() => {
    if (!palette.window) return [];
    const out: { x: number; y: number }[] = [];
    BLOCKS.forEach(([x, w, h], i) => {
      for (let row = 0; row * 12 + 10 < h - 6; row += 1) {
        for (let col = 0; col * 10 + 8 < w - 4; col += 1) {
          if ((i * 7 + row * 3 + col * 5) % 6 === 0) {
            out.push({ x: x + 5 + col * 10, y: BASE - h + 8 + row * 12 });
          }
        }
      }
    });
    return out;
  }, [palette.window]);

  return (
    <G>
      {/* 텔레비전 탑은 블록 뒤에 */}
      <G fill={palette.midAccent}>
        <Path d="M266 238 L268.5 64 L271.5 64 L274 238 Z" />
        <Path d="M254 238 L267 196 L273 196 L286 238 Z" />
        <Ellipse cx="270" cy="150" rx="10" ry="5" />
        <Ellipse cx="270" cy="118" rx="6" ry="4" />
        <Rect x="269.4" y="40" width="1.2" height="26" />
      </G>
      {BLOCKS.map(([x, w, h]) => (
        <Rect key={x} x={x} y={BASE - h} width={w} height={h + 8} fill={palette.mid} />
      ))}
      {windows.map(({ x, y }) => (
        <Rect key={`${x}-${y}`} x={x} y={y} width={4} height={5} fill={palette.window} />
      ))}
    </G>
  );
}

/** 살구꽃 과수원 — 굽은 줄기, 흰·분홍 꽃 수관 */
const ORCHARD = [
  { x: 20, h: 28, r: 24 },
  { x: 80, h: 34, r: 30 },
  { x: 142, h: 26, r: 24 },
  { x: 204, h: 36, r: 32 },
  { x: 266, h: 28, r: 26 },
  { x: 326, h: 34, r: 30 },
  { x: 386, h: 26, r: 24 },
];

function Orchard({ palette }: { palette: ScenePalette }) {
  return (
    <G>
      {ORCHARD.map(({ x, h, r }) => {
        const top = BASE - h;
        return (
          <G key={x}>
            <Path
              d={`M${x - 3} ${BASE + 6} Q${x - 6} ${top + h * 0.5} ${x} ${top} L${x + 3} ${top} Q${x - 1} ${top + h * 0.5} ${x + 3} ${BASE + 6} Z`}
              fill={palette.mid}
            />
            <Circle cx={x} cy={top - r * 0.45} r={r} fill={palette.midAccent} />
            <Circle cx={x - r * 0.62} cy={top - r * 0.1} r={r * 0.55} fill={palette.midAccent} opacity={0.9} />
            <Circle cx={x + r * 0.6} cy={top - r * 0.2} r={r * 0.5} fill={palette.sky[2]} opacity={0.9} />
            <Circle cx={x + r * 0.1} cy={top - r * 0.95} r={r * 0.45} fill={palette.sky[2]} opacity={0.75} />
          </G>
        );
      })}
    </G>
  );
}

/** 침간의 소나무 — 끝에 눈이 얹힌 삼각형 */
function Pines({ palette }: { palette: ScenePalette }) {
  const pines = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        x: i * 30 + (i % 2) * 9,
        h: 34 + ((i * 13) % 28),
        accent: i % 3 === 1,
      })),
    [],
  );
  return (
    <G>
      {pines.map(({ x, h, accent }) => (
        <G key={x}>
          <Path
            d={`M${x - h * 0.32} ${BASE + 4} L${x} ${BASE - h} L${x + h * 0.32} ${BASE + 4} Z`}
            fill={accent ? palette.midAccent : palette.mid}
          />
          {palette.farCap && (
            <Path
              d={`M${x - 5} ${BASE - h + 12} L${x} ${BASE - h} L${x + 5} ${BASE - h + 12} Z`}
              fill={palette.farCap}
            />
          )}
        </G>
      ))}
    </G>
  );
}

/* ───────────────────────── 입자 ───────────────────────── */

interface ParticleSpec {
  x: number;
  y: number;
  phase: number;
  speed: number;
  wobble: number;
  amp: number;
  size: number;
  color: string;
  spin: number;
}

/** 장면마다 같은 배치가 나오도록 씨앗 있는 난수 */
function seeded(seedKey: string) {
  let seed = 0;
  for (const char of seedKey) seed = (seed * 31 + char.charCodeAt(0)) >>> 0;
  return () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PARTICLE_COUNT: Record<ParticleKind, number> = {
  leaves: 12,
  petals: 14,
  snow: 16,
  rain: 16,
  dust: 12,
  steam: 6,
  stars: 16,
  birds: 3,
};

/** 한 바퀴(시계 0→1) 길이. 입자 속도는 이 시계의 정수배라 이음매 없이 돈다 */
const CLOCK_MS: Record<ParticleKind, number> = {
  leaves: 26000,
  petals: 24000,
  snow: 30000,
  rain: 3200,
  dust: 30000,
  steam: 16000,
  stars: 9000,
  birds: 40000,
};

function Particles({
  kind,
  colors,
  width,
  height,
  seedKey,
}: {
  kind: ParticleKind;
  colors: string[];
  width: number;
  height: number;
  seedKey: string;
}) {
  const clock = useSharedValue(0);
  useEffect(() => {
    clock.value = 0;
    clock.value = withRepeat(
      withTiming(1, { duration: CLOCK_MS[kind], easing: Easing.linear }),
      -1,
      false,
    );
    return () => cancelAnimation(clock);
  }, [clock, kind]);

  const specs = useMemo<ParticleSpec[]>(() => {
    const random = seeded(`${seedKey}:${kind}`);
    return Array.from({ length: PARTICLE_COUNT[kind] }, (_, index) => ({
      x: random(),
      y: random(),
      phase: index / PARTICLE_COUNT[kind] + random() * 0.05,
      speed: 1 + Math.floor(random() * 2),
      wobble: 1 + Math.floor(random() * 3),
      amp: 10 + random() * 22,
      size: 0.75 + random() * 0.6,
      color: colors[index % colors.length],
      spin: random() > 0.5 ? 1 : -1,
    }));
  }, [colors, kind, seedKey]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {specs.map((spec, index) => (
        <Particle
          key={index}
          kind={kind}
          spec={spec}
          clock={clock}
          width={width}
          height={height}
        />
      ))}
    </View>
  );
}

function Particle({
  kind,
  spec,
  clock,
  width,
  height,
}: {
  kind: ParticleKind;
  spec: ParticleSpec;
  clock: SharedValue<number>;
  width: number;
  height: number;
}) {
  const style = useAnimatedStyle(() => {
    const p = (clock.value * spec.speed + spec.phase) % 1;
    const wave = Math.sin(p * Math.PI * 2 * spec.wobble);
    switch (kind) {
      case "leaves":
      case "petals":
      case "snow": {
        const fall = kind === "snow" ? 0.85 : 1;
        return {
          opacity: 1,
          transform: [
            { translateX: spec.x * width + wave * spec.amp },
            { translateY: -16 + p * (height + 32) * fall },
            { rotate: `${kind === "snow" ? 0 : p * 540 * spec.spin}deg` },
            { scale: spec.size },
          ],
        };
      }
      case "rain":
        return {
          opacity: 0.6,
          transform: [
            { translateX: spec.x * (width + 40) - p * 40 },
            { translateY: -30 + p * (height + 60) },
            { rotate: "14deg" },
          ],
        };
      case "dust":
      case "steam": {
        const rise = kind === "steam" ? 0.55 : 0.4;
        const fade = Math.sin(p * Math.PI);
        return {
          opacity: fade * (kind === "steam" ? 0.35 : 0.8),
          transform: [
            { translateX: spec.x * width + wave * (kind === "steam" ? 8 : spec.amp * 0.6) },
            { translateY: height * (0.55 + spec.y * 0.35) - p * height * rise },
            { scale: kind === "steam" ? 0.6 + p * 1.4 : spec.size },
          ],
        };
      }
      case "stars":
        return {
          opacity: 0.25 + 0.75 * Math.abs(Math.sin((clock.value * spec.speed + spec.phase) * Math.PI)),
          transform: [
            { translateX: spec.x * width },
            { translateY: spec.y * height * 0.5 },
            { scale: spec.size },
          ],
        };
      case "birds":
        return {
          opacity: 1,
          transform: [
            { translateX: -30 + p * (width + 60) },
            { translateY: height * (0.18 + spec.y * 0.2) + wave * 6 },
            { scale: spec.size },
          ],
        };
    }
  }, [kind, spec, width, height]);

  return (
    <Animated.View style={[styles.particle, particleShape(kind, spec.color), style]}>
      {kind === "birds" && (
        <Svg width={14} height={7} viewBox="0 0 14 7">
          <Path
            d="M1 5 Q4 0 7 4 Q10 0 13 5"
            stroke={spec.color}
            strokeWidth={1.6}
            fill="none"
            strokeLinecap="round"
          />
        </Svg>
      )}
    </Animated.View>
  );
}

function particleShape(kind: ParticleKind, color: string) {
  switch (kind) {
    case "leaves":
      return {
        width: 10,
        height: 6,
        backgroundColor: color,
        borderTopLeftRadius: 6,
        borderBottomRightRadius: 6,
      };
    case "petals":
      return { width: 7, height: 5, borderRadius: 4, backgroundColor: color };
    case "snow":
      return { width: 5, height: 5, borderRadius: 3, backgroundColor: color };
    case "rain":
      return { width: 1.5, height: 15, borderRadius: 1, backgroundColor: color };
    case "dust":
      return { width: 3, height: 3, borderRadius: 2, backgroundColor: color };
    case "steam":
      return { width: 18, height: 18, borderRadius: 9, backgroundColor: color };
    case "stars":
      return { width: 2.5, height: 2.5, borderRadius: 2, backgroundColor: color };
    case "birds":
      return { width: 14, height: 7 };
  }
}

const styles = StyleSheet.create({
  fade: { position: "absolute", left: 0, right: 0, bottom: 0 },
  particle: { position: "absolute", left: 0, top: 0 },
});
