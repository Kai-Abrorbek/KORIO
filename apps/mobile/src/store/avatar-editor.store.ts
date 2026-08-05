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

  randomize: () =>
    set({
      draft: createRandomAvatar(),
    }),
}));
