import i18n from "@/locales/i18n";
import api from "@/services/api";
import type {
  ReadingLessonListResponse,
  ReadingListeningLesson,
} from "@/types/reading-listening";

const getLang = () => {
  const language = i18n.resolvedLanguage ?? i18n.language ?? "uz";
  const normalized = language.split("-")[0];
  return ["ko", "uz", "en", "ru"].includes(normalized) ? normalized : "uz";
};

export const ReadingListeningService = {
  list: (level = 1): Promise<ReadingLessonListResponse> =>
    api.get(
      `/reading-lessons?level=${level}&lang=${encodeURIComponent(getLang())}`,
    ),

  get: (code: string): Promise<ReadingListeningLesson> =>
    api.get(
      `/reading-lessons/${encodeURIComponent(code)}?lang=${encodeURIComponent(getLang())}`,
    ),
};

