import i18n from "@/locales/i18n";
import api from "./api";
import { Grammar, GrammarListResponse } from "@/types/grammar";

const getLang = () => i18n.language?.split("-")[0] || "uz";

export const GrammarService = {
  getGrammar: (id: string): Promise<Grammar> =>
    api.get(`/grammar/${id}?lang=${getLang()}`),
  /** scope 를 주면 그 하루치 문법만 (학습 로드 모드). 없으면 전체 목록. */
  listGrammar: (scope?: {
    section: number;
    unit: number;
  }): Promise<GrammarListResponse> =>
    api.get(
      scope
        ? `/grammar?lang=${getLang()}&section=${scope.section}&unit=${scope.unit}`
        : `/grammar?lang=${getLang()}`,
    ),

  completeGrammar: (code: string): Promise<{ success: boolean }> =>
    api.post(`/grammar/${code}/complete`, {}),
};
