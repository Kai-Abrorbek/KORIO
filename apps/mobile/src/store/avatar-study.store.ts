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
  petStars: Record<string, number>;
  rememberWord: (word: Omit<LearnedWord, "learnedAt">) => void;
  awardReviewStar: (userId: string) => void;
}

/** A local cosmetic reflection of learning; it does not change lesson progress. */
export const useAvatarStudyStore = create<AvatarStudyState>()(
  persist(
    (set) => ({
      recentWord: null,
      petStars: {},
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
    }),
    {
      name: "avatar-study-word",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ recentWord: state.recentWord, petStars: state.petStars }),
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
