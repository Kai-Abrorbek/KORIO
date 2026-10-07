import type { TutorState, VoiceTutorPersonality } from "../model/voice-tutor";

/**
 * 모바일 voiceTutor.* 의 우즈벡어 원문.
 * 텔레그램 앱은 우즈벡어를 그대로 쓰고 DOM 번역기가 앱 언어로 바꾼다
 * (카탈로그: shared/i18n/locales/*.ts 의 voiceTutor 블록).
 */
export const TUTOR_ERROR_LABELS: Record<string, string> = {
  generic: "Xatolik yuz berdi. Qayta urinib ko‘ring.",
  VOICE_TUTOR_TRIAL_USED: "Sinov vaqti tugadi. KORIO MAX bilan kuniga 1 soatgacha, oyiga 200 daqiqagacha dars qilishingiz mumkin.",
  VOICE_TUTOR_DAILY_LIMIT_REACHED: "Bugungi dars vaqti tugadi. Ertaga ko'rishamiz!",
  VOICE_TUTOR_MONTHLY_LIMIT_REACHED: "Bu oylik dars vaqti tugadi.",
  MIC_PERMISSION_DENIED: "Gapirish uchun mikrofon ruxsati kerak.",
  MIC_UNSUPPORTED: "Bu muhitda mikrofon ishlamaydi. Ilovadan foydalaning.",
  NETWORK_ERROR: "Aloqa uzildi. Qayta urinib ko‘ring.",
  UNAUTHORIZED: "Qayta kiring.",
  AUDIO_PLAYBACK_FAILED: "Ustoz ovozini ijro etib bo‘lmadi.",
  INVALID_AUDIO_URL: "Ustoz audiosini ochib bo‘lmadi.",
  VOICE_TUTOR_TTS_UNAVAILABLE: "Ustoz javobi ko‘rsatildi, ammo ovoz yaratilmadi. Suhbatni davom ettirishingiz mumkin.",
  VOICE_TUTOR_LESSON_UNAVAILABLE: "Ustoz bilan aloqa vaqtincha beqaror. Yana gapirib ko‘ring.",
  VOICE_TUTOR_AGENT_UNAVAILABLE: "Ustoz hali ulanmagan. Birozdan so‘ng qayta boshlang.",
  CONNECTION_LOST: "Jonli aloqa uzildi. Darsni tugatib qayta boshlang.",
  CONNECTION_ERROR: "Jonli aloqada xatolik yuz berdi. Qayta urinib ko‘ring.",
};

export function tutorErrorText(code: string | null) {
  if (!code) return null;
  return TUTOR_ERROR_LABELS[code] ?? TUTOR_ERROR_LABELS.generic!;
}

/** 모바일 voiceTutor.callState.* */
export const TUTOR_STATE_LABELS: Record<TutorState, string> = {
  idle: "Tayyor",
  connecting: "Ulanmoqda...",
  listening: "Tinglayapman",
  thinking: "O'ylayapman...",
  speaking: "Gapiryapman",
  error: "Xatolik yuz berdi",
};

/** 모바일 voiceTutor.personality.* */
export const PERSONALITY_LABELS: Record<VoiceTutorPersonality, { name: string; description: string }> = {
  friendly: { name: "Samimiy ustoz", description: "Iliq rag‘batlantirib o‘rgatadi." },
  close_friend: { name: "Yaqin do‘st", description: "Erkin hazillashadi va rost gapiradi." },
  savage: { name: "Keskin do‘st", description: "Xatolar ustidan o‘tkir hazil qiladi va to‘g‘rilaydi." },
  chaotic_savage: {
    name: "Keskin va jo‘shqin",
    description: "Juda kuchli reaksiya va qo‘pol so‘zlar bilan ham o‘rgatadi.",
  },
};

/** 모바일 voiceTutor.level.* */
export const LEVEL_LABELS: Record<string, string> = {
  beginner: "Boshlang‘ich",
  intermediate: "O‘rta",
  advanced: "Yuqori",
};

/** 모바일 voiceTutor.style.* */
export const STYLE_LABELS: Record<string, string> = {
  polite: "Hurmat bilan",
  casual: "Do‘stona",
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
