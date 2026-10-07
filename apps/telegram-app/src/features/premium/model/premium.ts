export type SubscriptionTier = "super" | "max";

export interface MySubscription {
  autoRenew: boolean;
  canUpgradeTo: SubscriptionTier[];
  expiresAt: string | null;
  isPremium: boolean;
  isSuper: boolean;
  isTrial: boolean;
  plan: string | null;
  platform: string | null;
  productId: string | null;
  provider: string | null;
  status: string | null;
  tier: SubscriptionTier;
  trialDaysLeft: number | null;
}

export const TIERS: SubscriptionTier[] = ["super", "max"];

/** 서버 payments/telegram/products — 텔레그램 Stars 기간권 (자동 갱신 없음) */
export interface StarsProduct {
  id: string;
  tier: SubscriptionTier;
  plan: string;
  months: number;
  days: number;
  stars: number;
  perMonthStars: number;
  savePercent: number;
  /** 등급마다 1년권 */
  best: boolean;
}

export interface StarsCatalog {
  /** 서버에 봇 토큰이 없으면 false */
  enabled: boolean;
  currency: "XTR";
  products: StarsProduct[];
}

/** WebApp.openInvoice 콜백 */
export type InvoiceStatus = "paid" | "cancelled" | "failed" | "pending";

/** 개월 → premium.plans.* 키 */
export const PLAN_KEY: Record<number, string> = {
  1: "monthly",
  3: "threeMonths",
  6: "sixMonths",
  12: "yearly",
};

export const formatStars = (stars: number) => stars.toLocaleString("en-US");

export const SUPER_FEATURES = [
  {
    description: "Energiya cheklovisiz o'rganing",
    icon: "infinite",
    label: "Cheksiz energiya",
  },
  {
    description: "Xalaqitsiz o'rganish",
    icon: "close-circle",
    label: "Reklamasiz",
  },
  {
    description: "Xatolarni cheksiz takrorlang",
    icon: "refresh",
    label: "Cheksiz takrorlash",
  },
  {
    description: "Har oy 500 gem bepul",
    icon: "diamond",
    label: "Oylik gemlar",
  },
  {
    description: "Batafsil tahlil",
    icon: "stats-chart",
    label: "Kengaytirilgan statistika",
  },
] as const;

export const MAX_FEATURES = [
  {
    description: "Kuniga 1 soatgacha · oyiga 200 daqiqa",
    icon: "mic",
    label: "AI o'qituvchi bilan suhbat",
  },
  {
    description: "Kafe, shifoxona, suhbat — darhol kerak bo'ladi",
    icon: "chatbubbles",
    label: "16 ta amaliy mavzu",
  },
  {
    description: "To'g'ri talaffuzni bosib tekshiring",
    icon: "volume-high",
    label: "Ona tilida so'zlashuvchi talaffuzi",
  },
] as const;
