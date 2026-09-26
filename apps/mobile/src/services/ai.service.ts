import api from "./api";
import { getContentLang } from "@/store/settings.store";

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

// 서버에 보내는 lang 은 UI 언어가 아니라 **설명 언어**다 (한국어 UI 면 따로 고른 말)
const getLang = getContentLang;

export const AiService = {
  getHistory: (): Promise<{ messages: ChatMessageDto[] }> =>
    api.get(`/ai/chat`),

  sendMessage: (text: string): Promise<{ reply: ChatMessageDto | null }> =>
    api.post(`/ai/chat`, { text, lang: getLang() }),

  reset: (): Promise<{ success: boolean }> => api.delete(`/ai/chat`),
};
