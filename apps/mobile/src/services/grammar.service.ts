import i18n from "@/locales/i18n";
import api from "./api";
import { Grammar, GrammarListResponse } from "@/types/grammar";

const getLang = () => i18n.language?.split("-")[0] || "uz";

export const GrammarService = {
  /** scoped 면 "다음 문법" 을 그 유닛 안에서만 찾는다 (학습 로드 모드) */
  getGrammar: (id: string, scoped = false): Promise<Grammar> =>
    api.get(`/grammar/${id}?lang=${getLang()}${scoped ? "&scoped=1" : ""}`),
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

  /**
   * 문법 하나를 끝냈다고 알린다.
   *
   * 섹션의 마지막 문법이면 서버가 **섹션 완주 보석**을 준다. 그래서 응답을
   * 버리면 안 된다 — 화면 위 보석 숫자가 다음 getMe 까지 옛 값으로 남는다.
   */
  completeGrammar: (
    code: string,
  ): Promise<{
    success: boolean;
    xpEarned?: number;
    totalXP?: number;
    gemsEarned?: number;
    /** 지급 후 잔액 (옛 서버는 안 보낸다) */
    gems?: number;
    sectionCompleted?: boolean;
  }> => api.post(`/grammar/${code}/complete`, {}),
};
