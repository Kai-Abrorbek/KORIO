import type {
  StudyWord,
  WordReviewResult,
  WordSectionSummary,
} from "../model/word";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

interface WordPage {
  items: StudyWord[];
  nextCursor: string | null;
  total: number;
}

export function getWordSections(
  request: AuthenticatedRequest,
): Promise<WordSectionSummary[]> {
  return request("/words/sections/summary");
}

export async function getUnitWords(
  request: AuthenticatedRequest,
  section: number,
  unit: number,
): Promise<StudyWord[]> {
  const items: StudyWord[] = [];
  let cursor: string | null = null;
  do {
    const query = new URLSearchParams({
      lang: "uz",
      limit: "100",
      section: String(section),
      unit: String(unit),
    });
    if (cursor) query.set("cursor", cursor);
    const page = await request<WordPage>(`/words?${query.toString()}`);
    items.push(...page.items);
    cursor = page.nextCursor;
  } while (cursor);
  return items;
}

export function markSeenWords(
  request: AuthenticatedRequest,
  ids: string[],
): Promise<{ seen: number }> {
  return request("/words/seen", {
    body: JSON.stringify({ ids }),
    method: "POST",
  });
}

export function reviewWord(
  request: AuthenticatedRequest,
  id: string,
  result: WordReviewResult,
): Promise<unknown> {
  return request(`/words/${encodeURIComponent(id)}/reviews`, {
    body: JSON.stringify({ result }),
    method: "POST",
  });
}
