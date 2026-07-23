import api from "./api";
import i18n from "@/locales/i18n";

export interface ChatCorrection {
  wrong: string;
  right: string;
  note?: string;
}

export interface ChatMessageDto {
  id: string;
  who: "ai" | "user";
  text: string;
  translation?: string;
  correction?: ChatCorrection;
  createdAt: string;
}

const getLang = () => i18n.language?.split("-")[0] || "uz";

export const AiService = {
  getHistory: (): Promise<{ messages: ChatMessageDto[] }> =>
    api.get(`/ai/chat`),

  sendMessage: (text: string): Promise<{ reply: ChatMessageDto | null }> =>
    api.post(`/ai/chat`, { text, lang: getLang() }),

  reset: (): Promise<{ success: boolean }> => api.delete(`/ai/chat`),
};
