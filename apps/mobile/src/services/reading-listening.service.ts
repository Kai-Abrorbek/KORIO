import i18n from "@/locales/i18n";
import api from "@/services/api";
import type {
  CompleteReadingLessonResult,
  ReadingWordGloss,
  ReadingLessonLevelsResponse,
  ReadingLessonListResponse,
  ReadingListeningLesson,
} from "@/types/reading-listening";

const getLang = () => {
  const language = i18n.resolvedLanguage ?? i18n.language ?? "uz";
  const normalized = language.split("-")[0];
  return ["ko", "uz", "en", "ru"].includes(normalized) ? normalized : "uz";
};

const listLevel = (level = 1): Promise<ReadingLessonListResponse> =>
  api.get(
    `/reading-lessons?level=${level}&lang=${encodeURIComponent(getLang())}`,
  );

export const ReadingListeningService = {
  listLevels: async (): Promise<ReadingLessonLevelsResponse> => {
    const catalogs = await Promise.all(
      [1, 2, 3, 4, 5, 6].map((level) => listLevel(level)),
    );
    return {
      levels: catalogs
        .filter((catalog) => catalog.total > 0)
        .map((catalog) => ({ level: catalog.level, total: catalog.total })),
    };
  },

  list: listLevel,

  get: (code: string): Promise<ReadingListeningLesson> =>
    api.get(
      `/reading-lessons/${encodeURIComponent(code)}?lang=${encodeURIComponent(getLang())}`,
    ),

  /**
   * 완료 보고.
   *
   * 점수도 XP 도 보내지 않는다 — 고른 답과 쓴 글만 보내고 채점은 서버가 한다.
   * 낭독 완료는 아예 안 보낸다. 발음 평가 중에 서버가 직접 기록한다.
   */
  complete: (
    code: string,
    body: {
      answers: { questionId: string; choiceIndex: number }[];
      writingText?: string;
    },
  ): Promise<CompleteReadingLessonResult> =>
    api.post(`/reading-lessons/${encodeURIComponent(code)}/complete`, body),

  /**
   * 단어 하나 뜻보기.
   *
   * 정상 경로가 아니다 — 뜻은 레슨을 받을 때 glossary 로 통째로 온다.
   * 시드에 빠진 단어를 눌렀을 때만 여기로 오고, 서버가 한 번 만들어 저장하므로
   * 그 다음부터는 다시 안 온다.
   */
  gloss: (
    code: string,
    word: string,
  ): Promise<{ gloss: ReadingWordGloss | null }> =>
    api.post(`/reading-lessons/${encodeURIComponent(code)}/gloss`, { word }),
};

