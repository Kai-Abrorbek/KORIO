"use client";

import { useEffect, useState, type CSSProperties } from "react";

import styles from "./avatar-scene.module.css";

/**
 * 배경 장면 — 캐릭터 뒤에 까는 서울 여행 그림 (api cosmetics, slot scene). 모바일 AvatarScene 과 같다.
 *
 * 그림은 public/scenes/<id>.webp (1200×1000, 캐릭터가 설 가운데는 비워 둠).
 * 원화는 움직이지 않는다. living일 때만 현지 시간의 색감이 은은하게 바뀐다.
 *
 * - SceneBackdrop: 히어로(에디터·프로필·친구 프로필) 뒤에 꽉 채워 깐다. 부모는 position + isolation 필요
 * - sceneCircleStyle: 리그·친구 목록 동그라미 — 얼굴 뒤 배경으로
 */
export type SceneId =
  | "scene_none"
  | "scene_hangang"
  | "scene_cvs"
  | "scene_namsan"
  | "scene_jeju"
  | "scene_snow"
  | "scene_gyeongbokgung";
export type SceneRarity = "common" | "rare" | "epic" | "legendary";

/** 에디터 그리드 순서 — 희귀도 낮은 것부터 */
export const SCENE_ORDER: Exclude<SceneId, "scene_none">[] = [
  "scene_hangang",
  "scene_cvs",
  "scene_namsan",
  "scene_jeju",
  "scene_snow",
  "scene_gyeongbokgung",
];

/**
 * from/to: 그림이 뜨기 전·그림 대신 보일 색 (그림의 하늘·땅 색)
 * text: 그 위 글자색 (밤 장면은 흰 글자)
 * accent: 카드·시트 강조색
 */
export const SCENE_LOOK: Record<
  Exclude<SceneId, "scene_none">,
  { from: string; to: string; text: "light" | "dark"; accent: string; rarity: SceneRarity }
> = {
  scene_hangang: { from: "#0A1430", to: "#34427A", text: "light", accent: "#F2A93B", rarity: "rare" },
  scene_cvs: { from: "#0D1230", to: "#3B3F5C", text: "light", accent: "#3FB872", rarity: "rare" },
  scene_namsan: { from: "#231A52", to: "#D9728E", text: "light", accent: "#FF8FB3", rarity: "rare" },
  scene_jeju: { from: "#5DB7F2", to: "#A9DDFB", text: "dark", accent: "#FFC83D", rarity: "epic" },
  scene_snow: { from: "#26386B", to: "#A3B2DC", text: "light", accent: "#8FD3FF", rarity: "epic" },
  scene_gyeongbokgung: { from: "#23204F", to: "#4B3468", text: "light", accent: "#FFD45C", rarity: "legendary" },
};

export const isScene = (value: unknown): value is Exclude<SceneId, "scene_none"> =>
  typeof value === "string" && value in SCENE_LOOK;

export const sceneSrc = (id: Exclude<SceneId, "scene_none">) => `/scenes/${id}.webp`;

type SceneTime = "morning" | "day" | "sunset" | "night";

export function sceneTimeAt(hour: number): SceneTime {
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "sunset";
  return "night";
}

/** 히어로 색 — 장면이 있으면 장면 색, 없으면 null (색 배경 그대로) */
export function sceneHeroColors(scene: unknown) {
  if (!isScene(scene)) return null;
  const look = SCENE_LOOK[scene];
  return { from: look.from, to: look.to, text: look.text === "light" ? "#FFFFFF" : "#25252F" };
}

/** 히어로 뒤에 꽉 채우는 그림. 밤 장면은 위쪽을 살짝 어둡게 해서 흰 제목이 읽히게 */
export function SceneBackdrop({
  scene,
  shade = false,
  living = false,
}: {
  scene?: string | null;
  shade?: boolean;
  /** Tint the existing art by the viewer's local time; leave static cards unchanged. */
  living?: boolean;
}) {
  // The initial server render must not depend on the viewer's clock or timezone.
  const [time, setTime] = useState<SceneTime | null>(null);
  useEffect(() => {
    if (!living) return;
    const refresh = () => setTime(sceneTimeAt(new Date().getHours()));
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("pageshow", refresh);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("pageshow", refresh);
    };
  }, [living]);
  if (!isScene(scene)) return null;
  const look = SCENE_LOOK[scene];
  return (
    <span
      aria-hidden="true"
      className={styles.backdrop}
      data-shade={shade && look.text === "light" ? "" : undefined}
      style={{ "--scene-from": look.from, "--scene-to": look.to } as CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" decoding="async" draggable={false} src={sceneSrc(scene)} />
      {living && time ? <span className={styles.timeTint} data-time={time} key={time} /> : null}
    </span>
  );
}

/** 동그라미 아바타 배경 값 — 얼굴 뒤로 장면이 보이게 (없으면 undefined → 원래 색) */
export function sceneCircleBackground(scene: unknown): string | undefined {
  if (!isScene(scene)) return undefined;
  const look = SCENE_LOOK[scene];
  return `url(${sceneSrc(scene)}) center 38% / cover no-repeat, linear-gradient(${look.from}, ${look.to})`;
}

export function sceneCircleStyle(scene: unknown): CSSProperties | undefined {
  const background = sceneCircleBackground(scene);
  return background ? { background } : undefined;
}
