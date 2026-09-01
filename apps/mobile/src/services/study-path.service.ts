import i18n from "@/locales/i18n";
import api from "@/services/api";
import type { ScoreData } from "@/services/lesson.service";
import type {
  LevelExamResult,
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

  /**
   * 학습 로드 모드 스코어.
   * 자유 학습의 LessonService.getScore 와 **다른 값이다** — 두 모드는 진도를
   * 각각 다른 곳에 쌓는다. 화면에서 모드에 맞는 쪽을 골라 불러야 한다.
   */
  getScore: (): Promise<ScoreData> =>
    api.get(`/study-path/score?lang=${encodeURIComponent(getLang())}`),

  /** 고를 수 있는 급수 목록. 콘텐츠 없는 급은 available:false */
  getLevels: (): Promise<StudyLevelsResponse> =>
    api.get(`/study-path/levels?lang=${encodeURIComponent(getLang())}`),

  /** 급수 선택 */
  setLevel: (level: number): Promise<{ placementLevel: number }> =>
    api.post("/study-path/levels", { level }),

  /** 급수 졸업 시험 문제 */
  getLevelExam: (): Promise<{ level: number; questions: any[] }> =>
    api.get(`/study-path/level-exam?lang=${encodeURIComponent(getLang())}`),

  /** 졸업 시험 결과. 떨어져도 다음 급은 열린다 */
  completeLevelExam: (body: {
    questionIds: string[];
    wrongQuestionIds?: string[];
    speedSeconds?: number;
  }): Promise<LevelExamResult> =>
    api.post("/study-path/level-exam/complete", { ...body, lang: getLang() }),

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
