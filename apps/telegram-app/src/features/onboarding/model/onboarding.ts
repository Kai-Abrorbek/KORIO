import { uzt } from "../../../shared/i18n/uz-text";
import type { IoniconName } from "../../../shared/ui/mobile-icon";

export type SurveyCourse = "ko" | "en";

export type SurveyStepId =
  | "course"
  | "selfLevel"
  | "hangul"
  | "interests"
  | "style"
  | "daily"
  | "reminder";

export interface SurveyOption {
  color: string;
  icon: IoniconName;
  label: string;
  value: string;
}

export interface SurveyStep {
  helper: string;
  id: SurveyStepId;
  multi: boolean;
  options: SurveyOption[];
  subtitle: string;
  title: string;
  variant: "grid" | "row";
}

export const REMINDER_HOURS: Record<string, number> = {
  afternoon: 14,
  evening: 20,
  morning: 9,
};

/** 맨 처음 — 배울 언어 (앱 onboarding/survey.tsx 와 같다) */
const COURSE_STEP: SurveyStep = {
  helper: "Bittasini tanlang",
  id: "course",
  multi: false,
  subtitle: uzt("onboarding.survey.course.subtitle"),
  title: uzt("onboarding.survey.course.title"),
  variant: "row",
  options: [
    { color: "#776EE2", icon: "language", label: uzt("onboarding.survey.course.ko"), value: "ko" },
    { color: "#45B7D1", icon: "globe", label: uzt("onboarding.survey.course.en"), value: "en" },
  ],
};

const KOREAN_STEPS: SurveyStep[] = [
  {
    helper: "Bittasini tanlang",
    id: "selfLevel",
    multi: false,
    subtitle: "Rostini tanlang!",
    title: "Koreys tilini qanchalik bilasiz?",
    variant: "row",
    options: [
      { color: "#96CEB4", icon: "leaf", label: "Umuman birinchi marta", value: "complete_beginner" },
      { color: "#4ECDC4", icon: "hand-left", label: "Salomlashishni bilaman", value: "basic_greetings" },
      { color: "#45B7D1", icon: "chatbubbles", label: "Oddiy suhbat qila olaman", value: "basic_conversation" },
      { color: "#A78BFA", icon: "rocket", label: "Undan ham ko'proq", value: "above" },
    ],
  },
  {
    helper: "Bittasini tanlang",
    id: "hangul",
    multi: false,
    subtitle: "Avval hangulni tekshiramiz",
    title: "Hangul o'qiy olasizmi?",
    variant: "row",
    options: [
      { color: "#FF6B6B", icon: "help-circle", label: "Hali o'qiy olmayman", value: "none" },
      { color: "#F5A623", icon: "reader", label: "Bir oz o'qiyman", value: "partial" },
      { color: "#1D9E75", icon: "checkmark-done-circle", label: "Yaxshi o'qiyman", value: "fluent" },
    ],
  },
  {
    helper: "Bir nechtasini tanlashingiz mumkin",
    id: "interests",
    multi: true,
    subtitle: "Yoqqan narsangiz bilan o'rganamiz",
    title: "Nima orqali o'rgansangiz qiziq?",
    variant: "grid",
    options: [
      { color: "#FF6B6B", icon: "musical-notes", label: "K-pop", value: "kpop" },
      { color: "#A78BFA", icon: "tv", label: "K-drama", value: "drama" },
      { color: "#4ECDC4", icon: "airplane", label: "Sayohat", value: "travel" },
      { color: "#45B7D1", icon: "briefcase", label: "Biznes", value: "business" },
      { color: "#96CEB4", icon: "school", label: "TOPIK imtihoni", value: "topik" },
      { color: "#F5A623", icon: "game-controller", label: "O'yinlar", value: "game" },
      { color: "#FF8FA3", icon: "restaurant", label: "K-food", value: "food" },
    ],
  },
  {
    helper: "Bittasini tanlang",
    id: "style",
    multi: false,
    subtitle: "Sizga mos usulda",
    title: "Qanday usulda o'rganmoqchisiz?",
    variant: "row",
    options: [
      { color: "#45B7D1", icon: "book", label: "Tizimli grammatika", value: "grammar" },
      { color: "#1D9E75", icon: "chatbubbles", label: "Suhbat asosida", value: "conversation" },
      { color: "#FF6B6B", icon: "game-controller", label: "O'yin shaklida", value: "game" },
      { color: "#A78BFA", icon: "list", label: "So'z boyligiga e'tibor", value: "vocabulary" },
    ],
  },
  {
    helper: "Bittasini tanlang",
    id: "daily",
    multi: false,
    subtitle: "Har kuni ozdan — eng zo'ri",
    title: "Kuniga qancha vaqt ajrata olasiz?",
    variant: "row",
    options: [
      { color: "#4ECDC4", icon: "flash", label: "5 daqiqa", value: "5" },
      { color: "#45B7D1", icon: "time", label: "10 daqiqa", value: "10" },
      { color: "#F5A623", icon: "hourglass", label: "15 daqiqa", value: "15" },
      { color: "#FF6B6B", icon: "flame", label: "20 daqiqadan ko'p", value: "20" },
    ],
  },
  {
    helper: "Bittasini tanlang",
    id: "reminder",
    multi: false,
    subtitle: "Unutmasligingiz uchun eslataman",
    title: "Qachon eslatma yuboraylik?",
    variant: "row",
    options: [
      { color: "#F5A623", icon: "sunny", label: "Ertalab", value: "morning" },
      { color: "#4ECDC4", icon: "partly-sunny", label: "Tushda", value: "afternoon" },
      { color: "#A78BFA", icon: "moon", label: "Kechqurun", value: "evening" },
      { color: "#94A3B8", icon: "notifications-off", label: "Eslatma kerak emas", value: "skip" },
    ],
  },
];

/** 영어 코스면 관심사 값은 그대로, 글만 바뀐다 (K-pop → 음악, TOPIK → IELTS …) */
const ENGLISH_INTEREST_KEYS = ["kpop", "drama", "travel", "business", "topik", "game", "food"];

/**
 * 고른 언어에 맞는 설문. 레벨 테스트는 없다 (2026-10-26) — 시작 자리는 서버가
 * "얼마나 알아?" 답으로 정한다. 영어 코스는 한글을 묻지 않는다.
 */
export function surveyStepsFor(course: SurveyCourse | null): SurveyStep[] {
  if (course !== "en") return [COURSE_STEP, ...KOREAN_STEPS];
  return [
    COURSE_STEP,
    ...KOREAN_STEPS.filter((step) => step.id !== "hangul").map((step) => {
      if (step.id === "selfLevel") {
        return { ...step, title: uzt("onboarding.survey.en.selfLevelTitle") };
      }
      if (step.id === "interests") {
        return {
          ...step,
          options: step.options.map((option) =>
            ENGLISH_INTEREST_KEYS.includes(option.value)
              ? { ...option, label: uzt(`onboarding.survey.en.interests.${option.value}`) }
              : option,
          ),
        };
      }
      return step;
    }),
  ];
}

export interface OnboardingPlacement {
  placementLevel: number;
  recommendedSection: number;
}

const PLACEMENT_BANDS: Record<string, { max: number; min: number }> = {
  above: { min: 4, max: 6 },
  basic_conversation: { min: 2, max: 4 },
  basic_greetings: { min: 1, max: 2 },
  complete_beginner: { min: 1, max: 1 },
};

export function fallbackPlacement(self: string, score: number): OnboardingPlacement {
  const band = PLACEMENT_BANDS[self] ?? PLACEMENT_BANDS.basic_greetings!;
  const safeScore = Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : 0;
  const placementLevel = Math.min(
    6,
    Math.max(1, Math.round(band.min + (safeScore / 100) * (band.max - band.min))),
  );
  return { placementLevel, recommendedSection: placementLevel * 2 - 1 };
}

export function safePlacement(
  value: Partial<OnboardingPlacement>,
  fallback: OnboardingPlacement,
): OnboardingPlacement {
  const receivedLevel = Number(value.placementLevel);
  const placementLevel = Number.isFinite(receivedLevel)
    ? Math.min(6, Math.max(1, Math.round(receivedLevel)))
    : fallback.placementLevel;
  const receivedSection = Number(value.recommendedSection);
  const recommendedSection = Number.isFinite(receivedSection)
    ? Math.min(12, Math.max(1, Math.round(receivedSection)))
    : placementLevel * 2 - 1;
  return { placementLevel, recommendedSection };
}
