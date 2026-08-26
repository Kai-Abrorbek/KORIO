import i18n from "@/locales/i18n";
import api from "@/services/api";
import type {
  StudyCompletableKind,
  StudyLevelsResponse,
  StudyPathResponse,
} from "@/types/study-path";

const getLang = () => {
  const language = i18n.resolvedLanguage ?? i18n.language ?? "uz";
  const normalized = language.split("-")[0];
  return ["ko", "uz", "en", "ru"].includes(normalized) ? normalized : "uz";
};

export const StudyPathService = {
  getStudyPath: (): Promise<StudyPathResponse> =>
    api.get(`/study-path?lang=${encodeURIComponent(getLang())}`),

  /** 고를 수 있는 급수 목록. 콘텐츠 없는 급은 available:false */
  getLevels: (): Promise<StudyLevelsResponse> =>
    api.get(`/study-path/levels?lang=${encodeURIComponent(getLang())}`),

  /** 급수 선택 */
  setLevel: (level: number): Promise<{ placementLevel: number }> =>
    api.post("/study-path/levels", { level }),

  /** 노드의 레슨 하나를 끝냈을 때. 보상은 각 화면이 이미 처리한다 */
  completeNode: (
    section: number,
    unit: number,
    kind: StudyCompletableKind,
    group = 1,
    lesson = 1,
  ): Promise<{ success: boolean; key: string }> =>
    api.post("/study-path/complete", { section, unit, kind, group, lesson }),
};
