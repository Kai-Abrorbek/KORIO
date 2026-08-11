import { ImageSourcePropType } from "react-native";

export type CharacterId = "nuri" | "hara" | "sori" | "dodo";
export type Mood = "idle" | "thinking" | "correct" | "combo" | "wrong";

export interface CharacterPose {
  key: string;
  src: ImageSourcePropType;
  moods: Mood[];
  /** 가로형 원본(누워있거나 소품 포함) — 세로 슬롯에서 상대적으로 작게 잡힌다 */
  wide?: boolean;
}

/**
 * 캐릭터 포즈 카탈로그.
 * 이미지는 600x780 캔버스로 정규화되어 있고 바닥 정렬이 맞춰져 있다.
 * (assets/images/characters/_raw 에 원본 보관)
 *
 * require 는 Metro 정적 분석 대상이라 반드시 리터럴 경로로 쓸 것.
 */
export const CHARACTERS: Record<CharacterId, CharacterPose[]> = {
  nuri: [
    {
      key: "nuri_cool",
      src: require("../../assets/images/characters/nuri_cool.png"),
      moods: ["idle", "combo"],
    },
    {
      key: "nuri_thinking",
      src: require("../../assets/images/characters/nuri_thinking.png"),
      moods: ["idle", "thinking"],
    },
    {
      key: "nuri_wink_point",
      src: require("../../assets/images/characters/nuri_wink_point.png"),
      moods: ["correct", "combo"],
    },
    {
      key: "nuri_cheer",
      src: require("../../assets/images/characters/nuri_cheer.png"),
      moods: ["correct"],
    },
  ],
  hara: [
    {
      key: "hara_confident",
      src: require("../../assets/images/characters/hara_confident.png"),
      moods: ["idle", "combo", "thinking"],
    },
    {
      key: "hara_studying",
      src: require("../../assets/images/characters/hara_studying.png"),
      moods: ["idle"],
      wide: true,
    },
    {
      key: "hara_thumbs_up",
      src: require("../../assets/images/characters/hara_thumbs_up.png"),
      moods: ["correct", "combo"],
    },
    {
      key: "hara_cheer",
      src: require("../../assets/images/characters/hara_cheer.png"),
      moods: ["correct"],
    },
    {
      key: "hara_love",
      src: require("../../assets/images/characters/hara_love.png"),
      moods: ["correct"],
    },
  ],
  sori: [
    {
      key: "sori_cool",
      src: require("../../assets/images/characters/sori_cool.png"),
      moods: ["idle", "combo"],
    },
    {
      key: "sori_peeking",
      src: require("../../assets/images/characters/sori_peeking.png"),
      moods: ["idle", "thinking"],
    },
    {
      key: "sori_sleeping",
      src: require("../../assets/images/characters/sori_sleeping.png"),
      moods: ["idle"],
      wide: true,
    },
  ],
  dodo: [
    {
      key: "dodo_cool",
      src: require("../../assets/images/characters/dodo_cool.png"),
      moods: ["idle", "combo"],
    },
    {
      key: "dodo_thinking",
      src: require("../../assets/images/characters/dodo_thinking.png"),
      moods: ["idle", "thinking"],
    },
    {
      key: "dodo_cheer",
      src: require("../../assets/images/characters/dodo_cheer.png"),
      moods: ["correct"],
    },
    {
      key: "dodo_dancing",
      src: require("../../assets/images/characters/dodo_dancing.png"),
      moods: ["correct", "combo"],
    },
    {
      key: "dodo_angry",
      src: require("../../assets/images/characters/dodo_angry.png"),
      moods: ["wrong"],
    },
    {
      key: "dodo_oops",
      src: require("../../assets/images/characters/dodo_oops.png"),
      moods: ["wrong"],
    },
    {
      key: "dodo_dizzy",
      src: require("../../assets/images/characters/dodo_dizzy.png"),
      moods: ["wrong"],
      wide: true,
    },
  ],
};

export const CHARACTER_IDS = Object.keys(CHARACTERS) as CharacterId[];

/** 정규화 캔버스 비율 (600 x 780) — 높이만 받아서 폭을 계산할 때 쓴다 */
export const CHARACTER_RATIO = 600 / 780;

/** FNV-1a. 같은 seed = 같은 캐릭터/포즈 (리렌더에도 안 흔들린다) */
export function seedHash(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function pickCharacter(seed: string): CharacterId {
  return CHARACTER_IDS[seedHash(seed) % CHARACTER_IDS.length];
}

/**
 * mood 에 맞는 포즈를 고른다.
 * 해당 mood 가 없는 캐릭터는 thinking → idle 순으로 폴백한다.
 * (지금은 wrong 포즈가 dodo 에만 있어서 나머지는 thinking 으로 떨어진다)
 */
export function pickPose(
  id: CharacterId,
  mood: Mood,
  seed: string,
): CharacterPose {
  const poses = CHARACTERS[id];
  const order: Mood[] =
    mood === "wrong"
      ? ["wrong", "thinking", "idle"]
      : mood === "combo"
        ? ["combo", "correct", "idle"]
        : [mood, "idle"];

  for (const m of order) {
    const cand = poses.filter((p) => p.moods.includes(m));
    if (cand.length) return cand[seedHash(seed + m) % cand.length];
  }
  return poses[0];
}

/**
 * 캐릭터 구분 없이 key 로 포즈를 찾는다.
 * 문제가 넘어가 캐릭터가 바뀌는 순간에도 이전 포즈가 페이드아웃될 때까지
 * 그대로 남아있어야 해서 전역 검색이다.
 */
export function findPose(key: string): CharacterPose {
  for (const id of CHARACTER_IDS) {
    const hit = CHARACTERS[id].find((p) => p.key === key);
    if (hit) return hit;
  }
  return CHARACTERS[CHARACTER_IDS[0]][0];
}
