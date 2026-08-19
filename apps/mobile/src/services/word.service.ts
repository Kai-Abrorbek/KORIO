import i18n from "@/locales/i18n";
import api from "@/services/api";
import type {
  StudyWord,
  WordListResponse,
  WordReviewResult,
  WordSectionSummary,
} from "@/types/word-study";

const getLang = () => {
  const language = i18n.resolvedLanguage ?? i18n.language ?? "uz";
  const normalized = language.split("-")[0];
  return ["ko", "uz", "en", "ru"].includes(normalized) ? normalized : "uz";
};

export const WordService = {
  getSectionSummary: (section: number): Promise<WordSectionSummary> =>
    api.get(`/words/sections/${section}/summary`),

  getUnitWords: async (section: number, unit: number): Promise<StudyWord[]> => {
    const items: StudyWord[] = [];
    let cursor: string | null = null;

    do {
      const cursorQuery = cursor
        ? `&cursor=${encodeURIComponent(cursor)}`
        : "";
      const page = await api.get<WordListResponse>(
        `/words?section=${section}&unit=${unit}&lang=${getLang()}&limit=100${cursorQuery}`,
      );
      items.push(...page.items);
      cursor = page.nextCursor;
    } while (cursor);

    return items;
  },

  reviewWord: (
    wordId: string,
    result: WordReviewResult,
  ): Promise<{ wordId: string; progress: StudyWord["progress"] }> =>
    api.post(`/words/${encodeURIComponent(wordId)}/reviews`, { result }),

  masterWord: (
    wordId: string,
  ): Promise<{ wordId: string; progress: StudyWord["progress"] }> =>
    api.post(`/words/${encodeURIComponent(wordId)}/master`, {}),
};
