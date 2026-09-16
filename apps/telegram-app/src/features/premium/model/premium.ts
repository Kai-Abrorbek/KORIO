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
    description: "AI bilan erkin suhbat",
    icon: "mic",
    label: "Cheksiz AI o'qituvchi",
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
