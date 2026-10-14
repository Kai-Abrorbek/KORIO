import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LearnedWord {
  userId: string;
  word: string;
  meaning: string;
  language: string;
  learnedAt: number;
}

interface AvatarStudyState {
  recentWord: LearnedWord | null;
  rememberWord: (word: Omit<LearnedWord, "learnedAt">) => void;
}

/** A local cosmetic reflection of learning; it does not change lesson progress. */
export const useAvatarStudyStore = create<AvatarStudyState>()(
  persist(
    (set) => ({
      recentWord: null,
      rememberWord: ({ userId, word, meaning, language }) => {
        const cleanWord = word.trim();
        const cleanMeaning = meaning.trim();
        if (!userId || !/^[가-힣]{1,12}$/.test(cleanWord) || !cleanMeaning) return;
        set({ recentWord: { userId, word: cleanWord, meaning: cleanMeaning, language, learnedAt: Date.now() } });
      },
    }),
    {
      name: "avatar-study-word",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ recentWord: state.recentWord }),
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
