import i18n from "@/locales/i18n";
import api from "./api";
import { Grammar, GrammarListResponse } from "@/types/grammar";

const getLang = () => i18n.language?.split("-")[0] || "uz";

export interface PracticeQuestion {
  kind: "write" | "build";
  id: string;
  code: string;
  pattern: string;
  prompt: string;
  full: string;
  // write
  prefix?: string;
  answer?: string;
  suffix?: string;
  // build
  rows?: { options: string[]; correct: string }[];
}

export const GrammarService = {
  /** 문법 연습 문제 세트 (빈칸 + 조립 섞여서 옴) */
  getPractice: (
    limit = 12,
  ): Promise<{ count: number; questions: PracticeQuestion[] }> =>
    api.get(`/grammar/practice?lang=${getLang()}&limit=${limit}`),

  getGrammar: (id: string): Promise<Grammar> =>
    api.get(`/grammar/${id}?lang=${getLang()}`),
  listGrammar: (): Promise<GrammarListResponse> =>
    api.get(`/grammar?lang=${getLang()}`),

  completeGrammar: (code: string): Promise<{ success: boolean }> =>
    api.post(`/grammar/${code}/complete`, {}),
};
