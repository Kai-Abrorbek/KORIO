import i18n from "@/locales/i18n";
import api from "./api";
import { Grammar, GrammarListItem } from "@/types/grammar";

const getLang = () => i18n.language?.split("-")[0] || "uz";

export const GrammarService = {
  getGrammar: (id: string): Promise<Grammar> =>
    api.get(`/grammar/${id}?lang=${getLang()}`),
  listGrammar: (): Promise<GrammarListItem[]> =>
    api.get(`/grammar?lang=${getLang()}`),
};
