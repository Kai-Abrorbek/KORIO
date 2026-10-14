import { useEffect, useState } from "react";
import { AppState, StyleSheet, View, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, useReducedMotion } from "react-native-reanimated";

/**
 * 배경 장면 — 캐릭터 뒤에 까는 서울 여행 그림 (api cosmetics, slot scene). 텔레그램 shared/ui/avatar-scene 과 같다.
 *
 * 그림은 assets/images/scenes/<id>.webp (1200×1000, 캐릭터가 설 가운데는 비워 둠).
 * 움직이지 않는다 — 반짝임·흔들림 없이 그림만.
 *
 * - SceneBackdrop: 히어로(에디터·프로필·친구 프로필·홈) 뒤에 꽉 채워 깐다 (부모에 overflow hidden)
 * - 동그라미(리그·친구 목록)도 SceneBackdrop 를 얼굴 뒤에 깐다
 */
export type SceneId =
  | "scene_none"
  | "scene_hangang"
  | "scene_cvs"
  | "scene_namsan"
  | "scene_jeju"
  | "scene_snow"
  | "scene_gyeongbokgung";
export type PaidScene = Exclude<SceneId, "scene_none">;
export type SceneRarity = "common" | "rare" | "epic" | "legendary";

/** 에디터 그리드 순서 — 희귀도 낮은 것부터 */
export const SCENE_ORDER: PaidScene[] = [
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
  PaidScene,
  { from: string; to: string; text: "light" | "dark"; accent: string; rarity: SceneRarity }
> = {
  scene_hangang: { from: "#0A1430", to: "#34427A", text: "light", accent: "#F2A93B", rarity: "rare" },
  scene_cvs: { from: "#0D1230", to: "#3B3F5C", text: "light", accent: "#3FB872", rarity: "rare" },
  scene_namsan: { from: "#231A52", to: "#D9728E", text: "light", accent: "#FF8FB3", rarity: "rare" },
  scene_jeju: { from: "#5DB7F2", to: "#A9DDFB", text: "dark", accent: "#FFC83D", rarity: "epic" },
  scene_snow: { from: "#26386B", to: "#A3B2DC", text: "light", accent: "#8FD3FF", rarity: "epic" },
  scene_gyeongbokgung: { from: "#23204F", to: "#4B3468", text: "light", accent: "#FFD45C", rarity: "legendary" },
};

const SCENE_IMAGES: Record<PaidScene, ImageSourcePropType> = {
  scene_hangang: require("../../../assets/images/scenes/scene_hangang.webp"),
  scene_cvs: require("../../../assets/images/scenes/scene_cvs.webp"),
  scene_namsan: require("../../../assets/images/scenes/scene_namsan.webp"),
  scene_jeju: require("../../../assets/images/scenes/scene_jeju.webp"),
  scene_snow: require("../../../assets/images/scenes/scene_snow.webp"),
  scene_gyeongbokgung: require("../../../assets/images/scenes/scene_gyeongbokgung.webp"),
};

export const isScene = (value: unknown): value is PaidScene =>
  typeof value === "string" && value in SCENE_LOOK;

type SceneTime = "morning" | "day" | "sunset" | "night";

export function sceneTimeAt(hour: number): SceneTime {
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "sunset";
  return "night";
}

const TIME_TINT: Record<SceneTime, readonly [string, string, string]> = {
  morning: ["rgba(255,229,170,0.30)", "rgba(255,249,224,0.14)", "rgba(255,241,205,0.10)"],
  day: ["rgba(193,227,255,0.25)", "rgba(232,247,255,0.12)", "rgba(255,255,255,0.08)"],
  sunset: ["rgba(250,139,143,0.36)", "rgba(255,194,127,0.19)", "rgba(230,121,149,0.10)"],
  night: ["rgba(17,24,72,0.31)", "rgba(26,34,90,0.12)", "rgba(19,18,68,0.20)"],
};

/** 히어로 색 — 장면이 있으면 장면 색, 없으면 null (색 배경 그대로) */
export function sceneHeroColors(scene: unknown) {
  if (!isScene(scene)) return null;
  const look = SCENE_LOOK[scene];
  return {
    colors: [look.from, look.to] as const,
    text: look.text === "light" ? "#FFFFFF" : "#25252F",
  };
}

/**
 * 부모를 꽉 채우는 장면 그림. 부모는 overflow hidden + 이걸 맨 처음 자식으로.
 * - focusY: 세로 어디를 남길지 (기본 72% — 땅(캐릭터 발)이 그림 아래쪽)
 * - shade: 밤 장면 위쪽을 살짝 어둡게 해서 흰 제목이 읽히게
 */
export function SceneBackdrop({
  scene,
  shade = false,
  focusY = "72%",
  living = false,
}: {
  scene?: string | null;
  shade?: boolean;
  focusY?: `${number}%`;
  /** Tint the existing art by the viewer's local time; leave collected postcards unchanged. */
  living?: boolean;
}) {
  const [time, setTime] = useState<SceneTime>(() => sceneTimeAt(new Date().getHours()));
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!living) return;
    const refresh = () => setTime(sceneTimeAt(new Date().getHours()));
    refresh();
    const timer = setInterval(refresh, 60_000);
    const appState = AppState.addEventListener("change", (state) => {
      if (state === "active") refresh();
    });
    return () => {
      clearInterval(timer);
      appState.remove();
    };
  }, [living]);
  if (!isScene(scene)) return null;
  const look = SCENE_LOOK[scene];
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: look.from }]}>
      <Image
        source={SCENE_IMAGES[scene]}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition={{ top: focusY, left: "50%" }}
        transition={0}
        cachePolicy="memory-disk"
      />
      {living ? (
        <Animated.View
          key={time}
          entering={reducedMotion ? undefined : FadeIn.duration(1100)}
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
        >
          <LinearGradient colors={TIME_TINT[time]} style={StyleSheet.absoluteFill} />
        </Animated.View>
      ) : null}
      {shade && look.text === "light" ? (
        <LinearGradient
          colors={["rgba(8,6,28,0.52)", "rgba(8,6,28,0)"]}
          style={styles.shade}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  shade: { position: "absolute", top: 0, left: 0, right: 0, height: 130 },
});
