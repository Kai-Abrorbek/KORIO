import api, { ApiError } from "@/services/api";
import { useAuthStore } from "@/store/auth.store";
import { getContentLang, useSettingsStore } from "@/store/settings.store";
import {
  DEFAULT_LEARNING_COURSES,
  type LearnCourse,
} from "@/constants/learnCourses";
import type { WordListResponse, StudyWord } from "@/types/word-study";
import type {
  WordCollectionDetail,
  WordCollectionPosition,
  WordCollectionSummary,
} from "../../../../shared/word-library";

function captureScope(course = useSettingsStore.getState().learnCourse) {
  return { course, userId: useAuthStore.getState().user?.id };
}

function assertScope(scope: ReturnType<typeof captureScope>) {
  if (
    useSettingsStore.getState().learnCourse !== scope.course ||
    useAuthStore.getState().user?.id !== scope.userId
  )
    throw new ApiError("LEARNING_COURSE_CHANGED", 409);
}

function collectionPath(path: string, course: LearnCourse, lang?: string) {
  const [pathname, search = ""] = path.split("?");
  const query = new URLSearchParams(search);
  const scope = DEFAULT_LEARNING_COURSES[course];
  query.set("courseId", scope.courseId);
  query.set("targetLanguage", scope.targetLanguage);
  if (lang) query.set("lang", lang);
  return `${pathname}?${query.toString()}`;
}

const collectionIdPath = (id: string) =>
  `/word-collections/${encodeURIComponent(id)}`;

export const WordCollectionsService = {
  async list(): Promise<WordCollectionSummary[]> {
    const scope = captureScope();
    const result = await api.get<WordCollectionSummary[]>(
      collectionPath(
        "/word-collections",
        scope.course,
        useSettingsStore.getState().language,
      ),
    );
    assertScope(scope);
    return result;
  },

  async get(id: string): Promise<WordCollectionDetail> {
    const scope = captureScope();
    const result = await api.get<WordCollectionDetail>(
      collectionPath(
        collectionIdPath(id),
        scope.course,
        useSettingsStore.getState().language,
      ),
    );
    assertScope(scope);
    return result;
  },

  async setSaved(id: string, saved: boolean): Promise<void> {
    const scope = captureScope();
    const path = collectionPath(`${collectionIdPath(id)}/save`, scope.course);
    if (saved) await api.post(path, {});
    else await api.delete(path);
    assertScope(scope);
  },

  async getWords(id: string, groupId: string): Promise<StudyWord[]> {
    const scope = captureScope();
    const lang = getContentLang();
    const words: StudyWord[] = [];
    let cursor: string | null = null;
    do {
      assertScope(scope);
      const query = new URLSearchParams({ groupId, limit: "100" });
      if (cursor) query.set("cursor", cursor);
      const page: WordListResponse = await api.get(
        collectionPath(
          `${collectionIdPath(id)}/words?${query.toString()}`,
          scope.course,
          lang,
        ),
      );
      assertScope(scope);
      words.push(...page.items);
      cursor = page.nextCursor;
    } while (cursor);
    return words;
  },

  async getPreview(id: string, groupId: string): Promise<StudyWord[]> {
    const scope = captureScope();
    const query = new URLSearchParams({ groupId, limit: "3" });
    const page = await api.get<WordListResponse>(
      collectionPath(
        `${collectionIdPath(id)}/words?${query.toString()}`,
        scope.course,
        getContentLang(),
      ),
    );
    assertScope(scope);
    return page.items;
  },

  async savePosition(
    id: string,
    position: WordCollectionPosition,
    course: LearnCourse,
    userId: string | undefined,
  ): Promise<void> {
    const scope = { course, userId };
    assertScope(scope);
    await api.patch(
      collectionPath(`${collectionIdPath(id)}/position`, course),
      position,
    );
    assertScope(scope);
  },
};
