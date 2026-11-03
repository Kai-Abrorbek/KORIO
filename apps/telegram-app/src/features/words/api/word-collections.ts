import type {
  WordCollectionDetail,
  WordCollectionPosition,
  WordCollectionSummary,
} from "../../../../../../shared/word-library";
import {
  DEFAULT_LEARNING_COURSES,
  type LearnCourse,
} from "../../learning/model/learning-options";
import type { StudyWord } from "../model/word";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

function collectionPath(
  course: LearnCourse,
  language: string,
  suffix = "",
  values: Record<string, string> = {},
) {
  const scope = DEFAULT_LEARNING_COURSES[course];
  const query = new URLSearchParams({
    courseId: scope.courseId,
    targetLanguage: scope.targetLanguage,
    lang: language,
    ...values,
  });
  return `/word-collections${suffix}?${query.toString()}`;
}

export function getWordCollections(
  request: AuthenticatedRequest,
  course: LearnCourse,
  language: string,
) {
  return request<WordCollectionSummary[]>(collectionPath(course, language));
}

export function getWordCollection(
  request: AuthenticatedRequest,
  course: LearnCourse,
  language: string,
  id: string,
) {
  return request<WordCollectionDetail>(
    collectionPath(course, language, `/${encodeURIComponent(id)}`),
  );
}

export function setWordCollectionSaved(
  request: AuthenticatedRequest,
  course: LearnCourse,
  language: string,
  id: string,
  saved: boolean,
) {
  return request<unknown>(
    collectionPath(course, language, `/${encodeURIComponent(id)}/save`),
    {
      ...(saved ? { body: JSON.stringify({}) } : {}),
      method: saved ? "POST" : "DELETE",
    },
  );
}

export function saveWordCollectionPosition(
  request: AuthenticatedRequest,
  course: LearnCourse,
  language: string,
  id: string,
  position: WordCollectionPosition,
) {
  return request<unknown>(
    collectionPath(course, language, `/${encodeURIComponent(id)}/position`),
    {
      body: JSON.stringify(position),
      method: "PATCH",
    },
  );
}

export async function getWordCollectionWords(
  request: AuthenticatedRequest,
  course: LearnCourse,
  language: string,
  id: string,
  groupId: string,
  options: { signal?: AbortSignal; limit?: number; preview?: boolean } = {},
) {
  const items: StudyWord[] = [];
  let cursor: string | null = null;
  do {
    const page: {
      items: StudyWord[];
      nextCursor: string | null;
      total: number;
    } = await request(
      collectionPath(course, language, `/${encodeURIComponent(id)}/words`, {
        groupId,
        limit: String(options.limit ?? 100),
        ...(cursor ? { cursor } : {}),
      }),
      { signal: options.signal },
    );
    items.push(...page.items);
    cursor = options.preview ? null : page.nextCursor;
  } while (cursor);
  return items;
}
