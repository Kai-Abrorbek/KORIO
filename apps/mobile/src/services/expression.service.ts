import i18n from "@/locales/i18n";
import api from "@/services/api";
import type {
  ExpressionListResponse,
  ExpressionOverview,
  ExpressionPracticeSession,
  ExpressionProgress,
  ExpressionReviewResult,
  StudyExpression,
} from "@/types/expression";

const getLang = () => {
  const language = i18n.resolvedLanguage ?? i18n.language ?? "uz";
  const normalized = language.split("-")[0];
  return ["ko", "uz", "en", "ru"].includes(normalized) ? normalized : "uz";
};

const scopeQuery = (section?: number, unit?: number) => {
  const params = [`lang=${encodeURIComponent(getLang())}`];
  if (section) params.push(`section=${section}`);
  if (unit) params.push(`unit=${unit}`);
  return params.join("&");
};

export const ExpressionService = {
  getOverview: (section?: number, unit?: number): Promise<ExpressionOverview> =>
    api.get(`/expressions/overview?${scopeQuery(section, unit)}`),

  getPackExpressions: async (
    packCode: string,
    section?: number,
    unit?: number,
  ): Promise<ExpressionListResponse> => {
    const items: StudyExpression[] = [];
    let cursor: string | null = null;
    let pack: ExpressionListResponse["pack"] = null;
    let total = 0;

    do {
      const params = [
        scopeQuery(section, unit),
        `pack=${encodeURIComponent(packCode)}`,
        "limit=100",
      ];
      if (cursor) params.push(`cursor=${encodeURIComponent(cursor)}`);
      const page = await api.get<ExpressionListResponse>(
        `/expressions?${params.join("&")}`,
      );
      pack = page.pack;
      total = page.total;
      items.push(...page.items);
      cursor = page.nextCursor;
    } while (cursor);

    return { pack, items, total, nextCursor: null };
  },

  getSaved: (section?: number, unit?: number) =>
    api.get<{ items: StudyExpression[] }>(
      `/expressions/saved?${scopeQuery(section, unit)}`,
    ),

  getReviewQueue: (section?: number, unit?: number) =>
    api.get<{ items: StudyExpression[] }>(
      `/expressions/review?${scopeQuery(section, unit)}`,
    ),

  recordView: (
    expressionId: string,
  ): Promise<{ expressionId: string; progress: ExpressionProgress }> =>
    api.post(`/expressions/${encodeURIComponent(expressionId)}/views`, {}),

  setSaved: (
    expressionId: string,
    isSaved: boolean,
  ): Promise<{ expressionId: string; progress: ExpressionProgress }> =>
    api.patch(`/expressions/${encodeURIComponent(expressionId)}/saved`, {
      isSaved,
    }),

  reviewExpression: (
    expressionId: string,
    result: ExpressionReviewResult,
  ): Promise<{ expressionId: string; progress: ExpressionProgress }> =>
    api.post(`/expressions/${encodeURIComponent(expressionId)}/reviews`, {
      result,
    }),

  getPractice: (
    packCode: string,
    section?: number,
    unit?: number,
  ): Promise<ExpressionPracticeSession> =>
    api.get(
      `/expressions/packs/${encodeURIComponent(packCode)}/practice?${scopeQuery(section, unit)}`,
    ),

  completePractice: (
    packCode: string,
    body: {
      questionIds: string[];
      wrongQuestionIds?: string[];
      speedSeconds?: number;
      combo?: number;
    },
  ): Promise<{
    success: boolean;
    xpEarned: number;
    totalXP: number;
    progress: Array<{ expressionId: string; progress: ExpressionProgress }>;
  }> =>
    api.post(
      `/expressions/packs/${encodeURIComponent(packCode)}/practice-complete`,
      body,
    ),
};
