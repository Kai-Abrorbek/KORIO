import api from "@/services/api";
import {
  DEFAULT_LEARNING_COURSES,
  type LearnCourse,
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

/**
 * 듣기 이야기 API. 언어를 가리지 않는다 — 코스(배우는 언어)를 받아서 그 코스의
 * 이야기와 레벨 탭을 받아 온다. 레벨 이름·순서는 서버(story-courses.ts)가 정한다.
 */

/**
 * 번역에 쓸 설명 언어. 지금 고른 코스가 아니라 **이야기의 언어** 기준이다
 * (한국어 코스에 있다가 영어 이야기를 열어도 영어 학습자 기준으로 고른다).
 */
export function storyContentLang(targetLanguage: string): string {
  const st = useSettingsStore.getState();
  return resolveContentLanguage(
    st.language,
    st.contentLanguage,
    targetLanguage,
  );
}

/** 이야기 언어 → 기기 TTS 로케일 (번들 오디오가 없을 때만 쓴다) */
export function storySpeechLocale(targetLanguage: string | undefined): string {
  const course = Object.values(DEFAULT_LEARNING_COURSES).find(
    (entry) => entry.targetLanguage === targetLanguage,
  );
  return course?.speechLocale ?? "en-US";
}

export const StoriesService = {
  list: (course: LearnCourse): Promise<StoryLibraryResponse> => {
    const scope = DEFAULT_LEARNING_COURSES[course];
    const lang = encodeURIComponent(storyContentLang(scope.targetLanguage));
    return api.get(
      `/stories?courseId=${scope.courseId}&targetLanguage=${scope.targetLanguage}&lang=${lang}`,
    );
  },

  get: (code: string, targetLanguage: string): Promise<StoryDetail> =>
    api.get(
      `/stories/${encodeURIComponent(code)}?lang=${encodeURIComponent(
        storyContentLang(targetLanguage),
      )}`,
    ),

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
