type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export interface ReadingLessonSummary {
  code: string;
  estimatedMinutes: number;
  id: string;
  level: number;
  title: string;
}

export interface ReadingLessonListResponse {
  items: ReadingLessonSummary[];
  level: number;
  total: number;
}

export async function listReadingLevels(request: AuthenticatedRequest) {
  const catalogs = await Promise.all(
    [1, 2, 3, 4, 5, 6].map((level) => request<ReadingLessonListResponse>(`/reading-lessons?level=${level}&lang=uz`)),
  );
  return catalogs.filter((catalog) => catalog.total > 0).map((catalog) => ({ level: catalog.level, total: catalog.total }));
}
