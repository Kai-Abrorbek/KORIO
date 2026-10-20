import {
  getContentLang,
  resolveContentLanguage,
  useSettingsStore,
} from "@/store/settings.store";
import {
  DEFAULT_LEARNING_COURSES,
  type LearnCourse,
} from "@/constants/learnCourses";
import api from "@/services/api";
import type { ScoreData } from "@/services/lesson.service";
import type {
  LevelExamResult,
  StudyCompletableKind,
  StudyLevelsResponse,
  StudyPathResponse,
} from "@/types/study-path";

// 서버에 보내는 lang 은 UI 언어가 아니라 **설명 언어**다 (한국어 UI 면 따로 고른 말)
const getLang = getContentLang;

export const StudyPathService = {
  /**
   * course 를 주면 지금 코스가 아니라 그 코스의 학습 로드 (통계 화면의 언어 전환).
   * 명시한 코스는 api 가 덮어쓰지 않는다 (learningScopePath).
   */
  getStudyPath: (course?: LearnCourse): Promise<StudyPathResponse> => {
    if (!course) {
      return api.get(`/study-path?lang=${encodeURIComponent(getLang())}`);
    }
    const st = useSettingsStore.getState();
    const scope = DEFAULT_LEARNING_COURSES[course];
    const params = new URLSearchParams({
      lang: resolveContentLanguage(st.language, st.contentLanguage, course),
      courseId: scope.courseId,
      targetLanguage: scope.targetLanguage,
    });
    return api.get(`/study-path?${params}`);
  },

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

  /** 급수 졸업 시험 문제. level 이 있으면 그 급 시험 (잠긴 급을 열 때) */
  /** hearts = 기회 수. 이만큼 틀리면 시험이 끝난다 (서버 LEVEL_EXAM.hearts) */
  getLevelExam: (
    level?: number,
  ): Promise<{ level: number; hearts?: number; questions: any[] }> =>
    api.get(
      `/study-path/level-exam?lang=${encodeURIComponent(getLang())}` +
        (level ? `&level=${level}` : ""),
    ),

  /** 졸업 시험 결과. **합격해야만** 다음 급으로 간다 */
  completeLevelExam: (body: {
    questionIds: string[];
    wrongQuestionIds?: string[];
    speedSeconds?: number;
    /** 어느 급의 시험인가. 없으면 지금 급 */
    level?: number;
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
