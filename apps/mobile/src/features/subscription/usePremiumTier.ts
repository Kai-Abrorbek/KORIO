import { StyleSheet } from "react-native";
import { useAuthStore } from "@/store/auth.store";
import { isPremiumNow } from "./access";

export type PremiumTier = "super" | "max";

/** 배지에 찍는 등급 이름. 브랜드명이라 번역하지 않는다 */
export const TIER_LABEL: Record<PremiumTier, string> = {
  super: "SUPER",
  max: "MAX",
};

/**
 * 지금 등급. 프리미엄이 아니면 null, 체험은 SUPER.
 *
 * isSuper 는 "유료인가"만 말해준다. MAX 를 산 유저도 헤더·프로필에 SUPER 가
 * 떠서 자기가 뭘 샀는지 알 길이 없었다 → 서버가 내려주는 superTier 로 구분한다.
 */
export function premiumTierOf(
  user:
    | { isSuper?: boolean; superExpiresAt?: string | null; superTier?: string | null }
    | null
    | undefined,
): PremiumTier | null {
  if (!isPremiumNow(user)) return null;
  return user?.superTier === "max" ? "max" : "super";
}

/** 내 등급 (auth store 기준) */
export function usePremiumTier(): PremiumTier | null {
  const user = useAuthStore((s) => s.user);
  return premiumTierOf(user);
}

/**
 * 기존 SUPER 배지 위에 덧씌우는 MAX 스타일.
 * 크기·기울기·위치는 각 화면의 SUPER 배지 것을 그대로 쓰고 색만 바꾼다.
 */
export const maxBadge = StyleSheet.create({
  badge: {
    backgroundColor: "#241A4D",
    borderWidth: 1.5,
    borderColor: "#FFD93D",
    shadowColor: "#FFD93D",
  },
  text: { color: "#FFD93D" },
});
