import api from "./api";

export type HangulMastery = 0 | 1 | 2 | 3;

export interface HangulCharacterProgress {
  characterId: string;
  mastery: HangulMastery;
  /** 정답 +1 / 오답 -1 누적 (0~6). mastery 1/2/3 컷은 1/3/6 */
  score: number;
  correctCount: number;
  wrongCount: number;
}

export interface HangulProgressResponse {
  progress: HangulCharacterProgress[];
  /** mastery 2 이상인 글자 수 */
  learnedCount: number;
  total: number;
  hangulCompletedAt: string | null;
  /** 이번 요청으로 40자를 다 채워서 한글 노드가 방금 자동 완료됐는지 */
  justCompleted: boolean;
}

export interface HangulResult {
  characterId: string;
  correct: boolean;
}

export const HangulService = {
  getProgress: (): Promise<HangulProgressResponse> =>
    api.get("/hangul/progress"),

  submitResults: (
    results: HangulResult[],
    source?: string,
  ): Promise<HangulProgressResponse> =>
    api.post("/hangul/results", { results, source }),
};
