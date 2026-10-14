"use client";

import type { CSSProperties, ReactNode } from "react";

import styles from "./avatar-aura.module.css";

/**
 * 오라 — 캐릭터 주위의 움직이는 효과 (보석으로 산다, api cosmetics). 모바일 AvatarAura 와 같다.
 *
 * 그림이 아니라 CSS 로 그린다: 입자(span) + keyframes. 아바타 SVG 를 감싸서
 * 뒤 층(빛·뒤로 도는 글자) → 아바타 → 앞 층(떨어지는 눈·꽃잎 등) 순으로 쌓는다.
 * 입자는 전부 상자 크기에 비례(%)라 어느 크기에 그려도 모양이 같다.
 * ⚠️ 입자에 svg 를 쓰지 마라 — `.heroAvatar svg { width:100% }` 같은 규칙에 걸린다.
 *
 * - full: 전신 아바타 (에디터·프로필·친구 프로필·홈)
 * - mini: 동그란 얼굴 아바타 (리그·친구 목록) — 도는 빛 테두리 + 반짝이 세 개
 */
export type AuraId = "aura_none" | "aura_stardust" | "aura_snow" | "aura_blossom" | "aura_flame" | "aura_hangul";
export type AuraRarity = "common" | "rare" | "epic" | "legendary";

export const AURA_ORDER: AuraId[] = ["aura_stardust", "aura_snow", "aura_blossom", "aura_flame", "aura_hangul"];

export const AURA_LOOK: Record<Exclude<AuraId, "aura_none">, { color: string; ring: string; rarity: AuraRarity }> = {
  aura_stardust: { color: "#FFC83D", ring: "#FFC83D, #FFF3B0, #FFB020, #FFC83D", rarity: "common" },
  aura_snow: { color: "#8FD3FF", ring: "#8FD3FF, #FFFFFF, #5DB8F5, #8FD3FF", rarity: "common" },
  aura_blossom: { color: "#FF8FB3", ring: "#FF8FB3, #FFE0EA, #FF6F9F, #FF8FB3", rarity: "rare" },
  aura_flame: { color: "#FF7A00", ring: "#FF4B1F, #FFC83D, #FF7A00, #FF4B1F", rarity: "epic" },
  aura_hangul: { color: "#8B7FF0", ring: "#776EE2, #FFD45C, #B48CF5, #776EE2", rarity: "legendary" },
};

export const RARITY_COLOR: Record<AuraRarity, string> = {
  common: "#8C8CA1",
  rare: "#1899D6",
  epic: "#A946DA",
  legendary: "#E2A83A",
};

export const isAura = (value: unknown): value is Exclude<AuraId, "aura_none"> =>
  typeof value === "string" && value in AURA_LOOK;

type P = CSSProperties & Record<`--${string}`, string | number>;

/* ── 입자 배치 (손으로 고른 자리 — 얼굴을 가리지 않게 가장자리 위주) ── */
const SPARKS: [x: number, y: number, size: number, delay: number][] = [
  [14, 18, 6.5, 0], [84, 13, 5, 0.6], [91, 44, 4.2, 1.2], [7, 52, 4.6, 0.3], [79, 71, 6, 0.9],
  [19, 82, 4.2, 1.5], [61, 5, 3.8, 1.1], [35, 9, 3.4, 1.8], [92, 83, 3.8, 0.45], [5, 30, 3.4, 1.35],
];
const FLAKES: [x: number, size: number, dur: number, delay: number][] = [
  [6, 2.6, 6.2, 0.2], [14, 3.6, 5.1, 2.4], [22, 2.2, 7.0, 4.1], [31, 3.0, 5.6, 1.0], [40, 2.4, 6.6, 3.3],
  [48, 3.4, 5.3, 5.2], [57, 2.2, 7.2, 0.6], [65, 3.2, 5.8, 2.9], [73, 2.6, 6.4, 4.6], [81, 3.8, 5.0, 1.7],
  [89, 2.4, 6.9, 3.8], [95, 3.0, 5.5, 0.9], [27, 1.8, 7.6, 6.0], [69, 1.8, 7.4, 5.5],
];
const PETALS: [x: number, size: number, dur: number, delay: number, spin: number][] = [
  [8, 5.2, 7.2, 0.4, 3.2], [18, 4.2, 8.4, 3.1, 4.4], [30, 5.6, 6.8, 5.6, 3.6], [44, 4.4, 8.0, 1.6, 5.0],
  [57, 5.0, 7.6, 4.4, 3.0], [68, 4.0, 8.8, 0.9, 4.8], [79, 5.4, 7.0, 2.7, 3.4], [91, 4.6, 8.2, 6.2, 4.2],
  [36, 3.6, 9.0, 7.0, 5.4], [86, 3.8, 9.2, 5.0, 3.8],
];
const EMBERS: [x: number, size: number, dur: number, delay: number, color: string][] = [
  [20, 3.6, 2.2, 0.0, "#FFC83D"], [28, 2.8, 1.8, 0.7, "#FF7A00"], [36, 4.2, 2.6, 1.3, "#FF4B1F"],
  [44, 3.0, 2.0, 0.4, "#FFC83D"], [52, 3.8, 2.4, 1.0, "#FF7A00"], [60, 2.6, 1.9, 1.6, "#FFC83D"],
  [68, 4.0, 2.5, 0.2, "#FF4B1F"], [76, 3.0, 2.1, 0.9, "#FF7A00"], [82, 2.6, 2.3, 1.8, "#FFC83D"],
  [24, 2.2, 2.8, 2.1, "#FF7A00"], [48, 2.4, 2.9, 2.4, "#FFE08A"], [72, 2.2, 2.7, 2.6, "#FFE08A"],
];
/** 불꽃 혀 [x%, 너비%, 높이%, 박자, 늦춤] — 몸 가장자리 쪽이 높다 */
const TONGUES: [x: number, w: number, h: number, dur: number, delay: number][] = [
  [22, 15, 40, 0.9, 0.1], [31, 18, 58, 1.1, 0.5], [41, 16, 46, 0.8, 0.3], [50, 20, 34, 1.0, 0.7],
  [59, 16, 48, 0.85, 0.2], [69, 18, 60, 1.05, 0.6], [78, 15, 42, 0.95, 0.4],
];
const LETTERS = ["한", "글", "ㄱ", "ㅏ", "ㅎ", "ㄴ"];
const ORBIT_SECONDS = 7;

export function AvatarAura({
  aura,
  children,
  className,
  hangulWord,
}: {
  aura?: string | null;
  children: ReactNode;
  className?: string;
  hangulWord?: string;
}) {
  if (!isAura(aura)) return <>{children}</>;
  const look = AURA_LOOK[aura];
  const style = { "--aura": look.color, "--ring": look.ring } as P;
  return (
    <span className={`${styles.wrap} ${className ?? ""}`} data-aura={aura} style={style}>
      <span aria-hidden="true" className={styles.back}>
        <i className={styles.glow} />
        {aura === "aura_flame" ? <Tongues /> : null}
        {aura === "aura_flame" ? <Embers back /> : null}
      </span>
      {aura === "aura_hangul" ? <Orbit word={hangulWord} /> : null}
      <span className={styles.body}>{children}</span>
      <span aria-hidden="true" className={styles.front}>
        {aura === "aura_stardust" ? <Sparks /> : null}
        {aura === "aura_hangul" ? <Sparks few /> : null}
        {aura === "aura_snow" ? <Flakes /> : null}
        {aura === "aura_blossom" ? <Petals /> : null}
        {aura === "aura_flame" ? <Embers /> : null}
      </span>
    </span>
  );
}

/**
 * 동그란 얼굴 아바타(리그·친구 목록)용 — 도는 빛 테두리 + 반짝이 셋.
 * 아바타를 감싸지 않고 **옆에 얹는다**(부모가 position:relative). 감싸면 `.avatar > svg`
 * 같은 기존 규칙이 깨진다.
 */
export function AuraRing({ aura }: { aura?: string | null }) {
  if (!isAura(aura)) return null;
  const look = AURA_LOOK[aura];
  const style = { "--aura": look.color, "--ring": look.ring } as P;
  return (
    <span aria-hidden="true" className={styles.mini} data-aura={aura} style={style}>
      <i className={styles.miniRing} />
      <span className={styles.miniSparks}>
        {[[88, 10, 0], [6, 72, 0.7], [94, 80, 1.4]].map(([x, y, d], i) => (
          <i key={i} style={{ "--x": `${x}%`, "--y": `${y}%`, "--d": `${d}s` } as P} />
        ))}
      </span>
    </span>
  );
}

function Sparks({ few = false }: { few?: boolean }) {
  return (
    <>
      {(few ? SPARKS.filter((_, i) => i % 2 === 0) : SPARKS).map(([x, y, size, delay], i) => (
        <i
          className={styles.spark}
          key={i}
          style={{ "--x": `${x}%`, "--y": `${y}%`, "--size": `${size}%`, "--d": `${delay}s` } as P}
        />
      ))}
    </>
  );
}

function Flakes() {
  return (
    <>
      {FLAKES.map(([x, size, dur, delay], i) => (
        <span
          className={styles.col}
          key={i}
          style={{ "--x": `${x}%`, "--dur": `${dur}s`, "--d": `${-delay}s` } as P}
        >
          <i className={styles.flake} style={{ "--size": `${size}%`, "--sway": `${1.6 + (i % 3) * 0.5}s` } as P} />
        </span>
      ))}
    </>
  );
}

function Petals() {
  return (
    <>
      {PETALS.map(([x, size, dur, delay, spin], i) => (
        <span
          className={`${styles.col} ${styles.colDrift}`}
          key={i}
          style={{ "--x": `${x}%`, "--dur": `${dur}s`, "--d": `${-delay}s` } as P}
        >
          <i className={styles.petal} style={{ "--size": `${size}%`, "--spin": `${spin}s` } as P} />
        </span>
      ))}
    </>
  );
}

function Tongues() {
  return (
    <>
      {TONGUES.map(([x, w, h, dur, delay], i) => (
        <i
          className={styles.tongue}
          key={i}
          style={{ "--x": `${x}%`, "--w": `${w}%`, "--h": `${h}%`, "--dur": `${dur}s`, "--d": `${-delay}s` } as P}
        />
      ))}
    </>
  );
}

function Embers({ back = false }: { back?: boolean }) {
  return (
    <>
      {EMBERS.filter((_, i) => (back ? i % 3 === 0 : i % 3 !== 0)).map(([x, size, dur, delay, color], i) => (
        <span
          className={`${styles.col} ${styles.colRise}`}
          key={i}
          style={{ "--x": `${x}%`, "--dur": `${dur}s`, "--d": `${-delay}s` } as P}
        >
          <i className={styles.ember} style={{ "--size": `${size}%`, "--c": color } as P} />
        </span>
      ))}
    </>
  );
}

/** 한글이 캐릭터 허리를 감고 돈다 — 앞으로 올 땐 커지고 아바타 위로, 뒤로 갈 땐 작아지고 아래로 */
function Orbit({ word }: { word?: string }) {
  const letters = word ? [...Array.from(word), ...LETTERS].slice(0, LETTERS.length) : LETTERS;
  return (
    <>
      {letters.map((letter, i) => {
        const phase = (i / letters.length) * ORBIT_SECONDS;
        return (
          <span
            aria-hidden="true"
            className={styles.orbitY}
            key={`${letter}-${i}`}
            style={{ "--t": `${ORBIT_SECONDS / 2}s`, "--d": `${-phase}s` } as P}
          >
            <span className={styles.orbitX} style={{ "--t": `${ORBIT_SECONDS / 2}s`, "--d": `${-phase - ORBIT_SECONDS / 4}s` } as P}>
              <b data-no-translate>{letter}</b>
            </span>
          </span>
        );
      })}
    </>
  );
}
