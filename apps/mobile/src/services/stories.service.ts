import api from "@/services/api";
import {
  DEFAULT_LEARNING_COURSES,
} from "@/constants/learnCourses";
import {
  resolveContentLanguage,
  useSettingsStore,
} from "@/store/settings.store";
import type {
  CompleteStoryResult,
  StoryDetail,
  StoryLibraryResponse,
} from "@/features/stories/stories.types";

const COURSE = DEFAULT_LEARNING_COURSES.en;

/**
 * 번역에 쓸 설명 언어. 이야기는 늘 영어 코스라서, 지금 고른 코스와 상관없이
 * "영어를 배우는 사람" 기준으로 고른다 (한국어 코스에 있다가 들어와도 같다).
 */
export function storyContentLang(): string {
  const st = useSettingsStore.getState();
  return resolveContentLanguage(st.language, st.contentLanguage, "en");
}

const langQuery = () => `lang=${encodeURIComponent(storyContentLang())}`;

export const StoriesService = {
  list: (): Promise<StoryLibraryResponse> =>
    api.get(
      `/stories?courseId=${COURSE.courseId}&targetLanguage=${COURSE.targetLanguage}&${langQuery()}`,
    ),

  get: (code: string): Promise<StoryDetail> =>
    api.get(`/stories/${encodeURIComponent(code)}?${langQuery()}`),

  /**
   * 끝까지 들었다는 보고. 고른 답만 보낸다 — 채점·XP 는 서버가 한다.
   * 따라 읽기 XP 는 발음 평가 중에 서버가 직접 준다.
   */
  complete: (
    code: string,
    answers: { questionId: string; choiceIndex: number }[],
  ): Promise<CompleteStoryResult> =>
    api.post(`/stories/${encodeURIComponent(code)}/complete`, { answers }),
};
