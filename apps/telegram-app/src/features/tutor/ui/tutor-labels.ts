import type { TutorState } from "../model/tutor";

/** 모바일 tutor.err.* (uz 원문 — DOM 번역기가 앱 언어로 바꾼다) */
export const TUTOR_ERROR_LABELS: Record<string, string> = {
  generic: "Xatolik yuz berdi. Birozdan so'ng qayta urinib ko'ring.",
  MIC_PERMISSION_DENIED: "Mikrofonga ruxsat kerak. Sozlamalardan ruxsat bering.",
  MIC_UNSUPPORTED: "Bu muhitda mikrofon ishlamaydi. Ilovadan foydalaning.",
  CONNECTION_LOST: "Aloqa uzildi. Qaytadan boshlang.",
  CONNECTION_ERROR: "Ulanishda muammo bor.",
  TUTOR_DAILY_LIMIT_REACHED: "Bugungi limit tugadi. Ertaga ko'rishamiz!",
  TUTOR_MONTHLY_LIMIT_REACHED: "Bu oygi limit tugadi.",
  TUTOR_NOT_CONFIGURED: "Hozircha mavjud emas.",
  TUTOR_AGENT_UNAVAILABLE: "Ustoz javob bermayapti. Birozdan so'ng qayta urinib ko'ring.",
  TUTOR_SESSION_FAILED: "Suhbatni boshlab bo'lmadi. Qayta urinib ko'ring.",
};

/** 모바일 tutor.state.* */
export const TUTOR_STATE_LABELS: Record<TutorState, string> = {
  idle: "Tayyor. Boshlaymizmi?",
  connecting: "Ulanmoqda...",
  listening: "Tinglayapman",
  thinking: "O'ylayapman...",
  speaking: "Gapiryapman",
  error: "Xatolik yuz berdi",
};

/** 모바일 tutor.personality.* */
export const TUTOR_PERSONALITY_LABELS: Record<string, string> = {
  calm: "Xotirjam",
  friendly: "Mehribon",
  energetic: "Quvnoq",
  strict: "Talabchan",
  pronunciation: "Talaffuz ustasi",
  teasing: "Hazilkash",
};

/** 상태별 강조색. 들을 땐 초록(네 차례), 말할 땐 보라 */
export const TUTOR_ACCENT: Record<TutorState, string> = {
  idle: "#9C93FF",
  connecting: "#9C93FF",
  listening: "#5CE08A",
  thinking: "#FFC24B",
  speaking: "#B3A6FF",
  error: "#FF8A73",
};

/** #RRGGBB + 투명도 */
export function hexA(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  if (value.length !== 6) return hex;
  const n = Number.parseInt(value, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
