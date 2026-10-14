import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AvatarConfig } from "@/types/avatar";

interface LearnedWord {
  userId: string;
  word: string;
  meaning: string;
  language: string;
  learnedAt: number;
}

export interface AvatarPostcard {
  id: string;
  userId: string;
  scene: AvatarConfig["scene"];
  avatar: AvatarConfig;
  streak: number;
  word: string | null;
  meaning: string | null;
  createdAt: number;
}

interface AvatarStudyState {
  recentWord: LearnedWord | null;
  petStars: Record<string, number>;
  postcards: AvatarPostcard[];
  rememberWord: (word: Omit<LearnedWord, "learnedAt">) => void;
  awardReviewStar: (userId: string) => void;
  collectPostcard: (postcard: Omit<AvatarPostcard, "id" | "createdAt">) => void;
}

/** A local cosmetic reflection of learning; it does not change lesson progress. */
export const useAvatarStudyStore = create<AvatarStudyState>()(
  persist(
    (set) => ({
      recentWord: null,
      petStars: {},
      postcards: [],
      rememberWord: ({ userId, word, meaning, language }) => {
        const cleanWord = word.trim();
        const cleanMeaning = meaning.trim();
        if (!userId || !/^[가-힣]{1,12}$/.test(cleanWord) || !cleanMeaning) return;
        set({ recentWord: { userId, word: cleanWord, meaning: cleanMeaning, language, learnedAt: Date.now() } });
      },
      awardReviewStar: (userId) => {
        if (!userId) return;
        set((state) => ({
          petStars: { ...state.petStars, [userId]: (state.petStars[userId] ?? 0) + 1 },
        }));
      },
      collectPostcard: (postcard) => {
        if (!postcard.userId || postcard.scene === "scene_none") return;
        const now = new Date();
        const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        const id = `${postcard.userId}:${postcard.scene}:${dateKey}`;
        set((state) => state.postcards.some((item) => item.id === id)
          ? state
          : { postcards: [{ ...postcard, id, createdAt: now.getTime() }, ...state.postcards] });
      },
    }),
    {
      name: "avatar-study-word",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ recentWord: state.recentWord, petStars: state.petStars, postcards: state.postcards }),
    },
  ),
);

export function todaysAvatarWord(
  recentWord: LearnedWord | null,
  userId?: string,
  language?: string,
) {
  if (!recentWord || recentWord.userId !== userId || recentWord.language !== language) return null;
  return new Date(recentWord.learnedAt).toDateString() === new Date().toDateString()
    ? recentWord
    : null;
}
