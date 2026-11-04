/**
 * 듣기 이야기의 장면. 서버 stories.const.ts 의 STORY_SCENES 와 같은 목록이다.
 *
 * 장면 하나 = 하늘 → 먼 산 → 마을 실루엣 → 가까운 언덕 → 페이지 바닥까지 한 색 계열.
 * 이야기 화면 전체가 이 색에 잠긴다(바닥·독·글자색). 해/달의 빛(glow)은 말하는
 * 단어에 켜지는 색과 같다 — "그림 속 빛이 글을 읽어 준다".
 *
 * 그림은 전부 코드(SVG)라 이미지 파일이 없다. 저사양 폰을 위해 입자는 장면당 16개 이하.
 */
export type SceneKey =
  | "autumn"
  | "sunset"
  | "morning"
  | "bazaar"
  | "rain"
  | "spring"
  | "night"
  | "snow"
  | "summer";

export type SkylineKind =
  | "trees"
  | "mahalla"
  | "domes"
  | "city"
  | "orchard"
  | "pines";

export type ParticleKind =
  | "leaves"
  | "petals"
  | "snow"
  | "rain"
  | "dust"
  | "steam"
  | "stars"
  | "birds";

export interface ScenePalette {
  /** 하늘 위 → 가운데 → 지평선 */
  sky: [string, string, string];
  /** 해·달 빛. 지금 읽는 단어 색 */
  glow: string;
  body: "sun" | "moon" | "none";
  bodyColor: string;
  far: string;
  /** 먼 산 꼭대기 눈 (없으면 안 그린다) */
  farCap?: string;
  mid: string;
  /** 마을 실루엣의 두 번째 색 (나무 수관·돔 타일·꽃) */
  midAccent: string;
  /** 창문 불빛 (없으면 꺼진 창) */
  window?: string;
  near: string;
  /** 장면 아래 페이지 바닥. 글자가 놓이는 곳 */
  ground: string;
  /** 독(플레이어 컨트롤) 면 */
  groundDeep: string;
  /** 바닥 위 글자색 */
  ink: string;
  skyline: SkylineKind;
  particles: ParticleKind;
  particleColors: string[];
  /** 비 오는 날의 구름 */
  clouds?: string;
}

export const SCENES: Record<SceneKey, ScenePalette> = {
  // 타슈켄트의 가을 오후. 플라타너스(chinar) 숲, 떨어지는 잎
  autumn: {
    sky: ["#E9825A", "#F3AE6C", "#FBD8A0"],
    glow: "#FFD27A",
    body: "sun",
    bodyColor: "#FFE7B0",
    far: "#C77B70",
    mid: "#8E3A25",
    midAccent: "#C8642C",
    near: "#5E2416",
    ground: "#2A120D",
    groundDeep: "#1D0B08",
    ink: "#FFF2E4",
    skyline: "trees",
    particles: "leaves",
    particleColors: ["#F28C28", "#E2502C", "#F6C344", "#B8452B"],
  },
  // 마할라 지붕 위 저녁놀. 부엌 굴뚝 김, 켜지는 창
  sunset: {
    sky: ["#4B3383", "#C24F7B", "#F79A5E"],
    glow: "#FFC27A",
    body: "sun",
    bodyColor: "#FFD9A0",
    far: "#7A3E70",
    mid: "#3B1D47",
    midAccent: "#5A2C5E",
    window: "#FFC46B",
    near: "#2A1434",
    ground: "#1A0E25",
    groundDeep: "#11091A",
    ink: "#FFF0F4",
    skyline: "mahalla",
    particles: "steam",
    particleColors: ["#FFE9DA"],
  },
  // 맑은 도시 아침. 아파트, 텔레비전 탑, 새
  morning: {
    sky: ["#6FB8E3", "#ADDAF0", "#FCE4BA"],
    glow: "#FFE08A",
    body: "sun",
    bodyColor: "#FFF4C8",
    far: "#9BB5CB",
    mid: "#55728E",
    midAccent: "#6E8CA6",
    window: "#FFE6A6",
    near: "#36506A",
    ground: "#122637",
    groundDeep: "#0C1B28",
    ink: "#F1F8FF",
    skyline: "city",
    particles: "birds",
    particleColors: ["#2C4258"],
  },
  // 바자르의 푸른 돔과 미나렛, 따뜻한 먼지
  bazaar: {
    sky: ["#2C9E9B", "#7CCDB8", "#F6E2A5"],
    glow: "#FFD36E",
    body: "sun",
    bodyColor: "#FFF0C2",
    far: "#4E8F8B",
    mid: "#1C5662",
    midAccent: "#2FA9A4",
    near: "#6E2630",
    ground: "#360E19",
    groundDeep: "#260911",
    ink: "#FFF3EA",
    skyline: "domes",
    particles: "dust",
    particleColors: ["#FFE2A0"],
  },
  // 비 오는 마할라. 구름, 사선 빗줄기
  rain: {
    sky: ["#43536A", "#6B7D93", "#97A6B6"],
    glow: "#BFE3FF",
    body: "none",
    bodyColor: "#DCE6F0",
    far: "#55657A",
    mid: "#34424F",
    midAccent: "#435365",
    window: "#FFD58A",
    near: "#26303C",
    ground: "#121922",
    groundDeep: "#0C1118",
    ink: "#EEF5FF",
    skyline: "mahalla",
    particles: "rain",
    particleColors: ["#DCEBFF"],
    clouds: "#5E6E83",
  },
  // 나브루즈 무렵의 살구꽃 과수원, 날리는 꽃잎
  spring: {
    sky: ["#86CFBC", "#C6EAD6", "#FFF2D2"],
    glow: "#FFE9A8",
    body: "sun",
    bodyColor: "#FFF8DA",
    far: "#7DB59D",
    mid: "#3B5A49",
    midAccent: "#F9DCE6",
    near: "#2D684D",
    ground: "#0E2C22",
    groundDeep: "#091F18",
    ink: "#F2FFF8",
    skyline: "orchard",
    particles: "petals",
    particleColors: ["#FFFFFF", "#FAD4E1", "#F5B5CA"],
  },
  // 밤의 도시. 달, 별, 켜진 창
  night: {
    sky: ["#0A0F2E", "#1A2256", "#3A3E84"],
    glow: "#FFE6A3",
    body: "moon",
    bodyColor: "#FFF3D6",
    far: "#222A5C",
    mid: "#13183B",
    midAccent: "#1C2350",
    window: "#FFD27A",
    near: "#0C112D",
    ground: "#090C22",
    groundDeep: "#060817",
    ink: "#EEF0FF",
    skyline: "city",
    particles: "stars",
    particleColors: ["#FFFFFF"],
  },
  // 침간의 눈 덮인 산, 소나무, 함박눈
  snow: {
    sky: ["#7787B4", "#B5C0DB", "#E6EBF6"],
    glow: "#A9DEFF",
    body: "sun",
    bodyColor: "#FFF7E6",
    far: "#8F9DC2",
    farCap: "#F4F7FD",
    mid: "#3A4B78",
    midAccent: "#4E6292",
    near: "#DCE4F3",
    ground: "#141B37",
    groundDeep: "#0D1328",
    ink: "#EAF0FF",
    skyline: "pines",
    particles: "snow",
    particleColors: ["#FFFFFF"],
  },
  // 한여름 산 아래 정원, 떠다니는 꽃가루
  summer: {
    sky: ["#2A86D4", "#64B3EA", "#CBEAFA"],
    glow: "#FFE45C",
    body: "sun",
    bodyColor: "#FFF7CC",
    far: "#5A8DB6",
    farCap: "#E8F2FA",
    mid: "#2C7449",
    midAccent: "#3F9460",
    near: "#1E5636",
    ground: "#0B281C",
    groundDeep: "#071D14",
    ink: "#F0FFF6",
    skyline: "trees",
    particles: "dust",
    particleColors: ["#FFF3A6"],
  },
};

export const sceneOf = (key: string | undefined): ScenePalette =>
  SCENES[(key as SceneKey) ?? "autumn"] ?? SCENES.autumn;

/** "#RRGGBB" + 투명도 → rgba(). 그라디언트를 "transparent" 로 두면 iOS 가 검게 번진다 */
export function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
