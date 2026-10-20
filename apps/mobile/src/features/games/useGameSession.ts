import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  resolveContentLanguage,
  useSettingsStore,
} from "@/store/settings.store";
import { DEFAULT_LEARNING_COURSES } from "@/constants/learnCourses";
import { resolveGameLanguage } from "../../../../../shared/word-games";

/** A game keeps its language even if settings refresh while it is being played. */
export function useGameSession() {
  const params = useLocalSearchParams<{ targetLanguage?: string }>();
  const [session] = useState(() => {
    const settings = useSettingsStore.getState();
    const language = resolveGameLanguage(
      params.targetLanguage,
      settings.learnCourse,
    );
    return {
      language,
      contentLanguage: resolveContentLanguage(
        settings.language,
        settings.contentLanguage,
        language,
      ),
      ...DEFAULT_LEARNING_COURSES[language],
    };
  });
  return session;
}
