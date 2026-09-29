import { View, Text, StyleSheet, ViewStyle } from "react-native";
import {
  TIER_LABEL,
  maxBadge,
  type PremiumTier,
} from "@/features/subscription/usePremiumTier";

interface Props {
  style?: ViewStyle;
  /** 없으면 SUPER. 남의 프로필은 서버가 준 등급을 넘긴다 */
  tier?: PremiumTier | null;
}

export default function SuperBadge({ style, tier }: Props) {
  const isMax = tier === "max";
  return (
    <View style={[styles.badge, isMax && maxBadge.badge, style]}>
      <Text style={[styles.text, isMax && maxBadge.text]}>
        {TIER_LABEL[isMax ? "max" : "super"]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#A56EFF",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
    transform: [{ skewX: "-10deg" }],
    shadowColor: "#A56EFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 1,
    transform: [{ skewX: "10deg" }],
  },
});
