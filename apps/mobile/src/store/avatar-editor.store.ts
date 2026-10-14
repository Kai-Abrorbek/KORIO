import { create } from "zustand";
import {
  AVATAR_IDS,
  DEFAULT_AVATAR_CONFIG,
  mergeAvatarConfig,
  type AvatarConfig,
  type AvatarField,
} from "@/types/avatar";

interface AvatarEditorState {
  draft: AvatarConfig;
  initial: AvatarConfig;
  selectedCategory: AvatarField;

  startEditing: (avatar?: Partial<AvatarConfig> | null) => void;

  selectCategory: (category: AvatarField) => void;

  setPart: (field: AvatarField, value: string) => void;

  reset: () => void;
  randomize: () => void;
  /** 저장된 쪽(initial)만 고친다 — 오라를 사서 바로 장착됐을 때 */
  patchInitial: (patch: Partial<AvatarConfig>) => void;
}

function pick<T extends readonly string[]>(values: T): T[number] {
  return values[Math.floor(Math.random() * values.length)];
}

function createRandomAvatar(): AvatarConfig {
  return {
    version: 1,
    skinTone: pick(AVATAR_IDS.skinTone),
    bodyShape: pick(AVATAR_IDS.bodyShape),
    expression: pick(AVATAR_IDS.expression),
    eyeColor: pick(AVATAR_IDS.eyeColor),
    hairstyle: pick(AVATAR_IDS.hairstyle),
    hairColor: pick(AVATAR_IDS.hairColor),
    eyewear: pick(AVATAR_IDS.eyewear),
    facialHair: pick(AVATAR_IDS.facialHair),
    headwear: pick(AVATAR_IDS.headwear),
    outfit: pick(AVATAR_IDS.outfit),
    background: pick(AVATAR_IDS.background),
    aura: "aura_none",
    scene: "scene_none",
  };
}

export const useAvatarEditorStore = create<AvatarEditorState>((set) => ({
  draft: DEFAULT_AVATAR_CONFIG,
  initial: DEFAULT_AVATAR_CONFIG,
  selectedCategory: "skinTone",

  startEditing: (avatar) => {
    const config = mergeAvatarConfig(avatar);

    set({
      draft: config,
      initial: config,
      selectedCategory: "skinTone",
    });
  },

  selectCategory: (selectedCategory) => set({ selectedCategory }),

  setPart: (field, value) =>
    set((state) => ({
      draft: {
        ...state.draft,
        [field]: value,
      } as AvatarConfig,
    })),

  reset: () =>
    set((state) => ({
      draft: state.initial,
    })),

  // 오라는 산 것이라 무작위로 바꾸지 않는다
  // 오라·배경 장면은 상점 아이템이라 무작위로 바꾸지 않는다
  randomize: () =>
    set((state) => ({
      draft: { ...createRandomAvatar(), aura: state.draft.aura, scene: state.draft.scene },
    })),

  patchInitial: (patch) =>
    set((state) => ({
      initial: { ...state.initial, ...patch },
    })),
}));
