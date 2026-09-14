import i18n from "@/locales/i18n";
import api, { ApiError } from "@/services/api";
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

const getSectionSummary = (section: number): Promise<WordSectionSummary> =>
  api.get(`/words/sections/${section}/summary`);

/**
 * 이전 API 서버에는 섹션 목록 엔드포인트가 없다. 앱과 API가 순차 배포돼도
 * 단어 화면이 통째로 막히지 않도록 기존 summary API로 연속 섹션을 찾는다.
 */
const discoverLegacySectionSummaries = async () => {
  const summaries: WordSectionSummary[] = [];
  let emptySections = 0;

  for (let section = 1; section <= 100 && emptySections < 2; section += 1) {
    const summary = await getSectionSummary(section);
    if (summary.words > 0) {
      summaries.push(summary);
      emptySections = 0;
    } else {
      emptySections += 1;
    }
  }

  return summaries;
};

export const WordService = {
  getSectionSummaries: async (): Promise<WordSectionSummary[]> => {
    try {
      return await api.get("/words/sections/summary");
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 404) throw error;
      return discoverLegacySectionSummaries();
    }
  },

  getSectionSummary,

  /** 카드로 넘겨 본 단어들. 여러 장을 모아서 한 번에 보낸다 */
  markSeen: (ids: string[]): Promise<{ seen: number }> =>
    api.post(`/words/seen`, { ids }),

  getUnitWords: async (section: number, unit: number): Promise<StudyWord[]> => {
    const items: StudyWord[] = [];
    let cursor: string | null = null;

    do {
      // cursorQuery → page → cursor 가 서로를 참조해서, 주석이 없으면 TS 가
      // 순환 추론으로 보고 implicit any 를 낸다(TS7022). 둘 다 명시한다.
      const cursorQuery: string = cursor
        ? `&cursor=${encodeURIComponent(cursor)}`
        : "";
      const page: WordListResponse = await api.get<WordListResponse>(
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
