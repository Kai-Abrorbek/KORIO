import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import type { GemPass } from "@/services/shop.service";

/**
 * 보석 기간권 한 장.
 *
 * 하루 단가를 같이 보여주는 게 핵심이다. "30일 33,000" 만 보면 비싸 보이지만
 * "하루 1,100" 과 "3일권보다 34% 싸다" 가 붙으면 긴 쪽을 고른다.
 */
export default function PremiumPassCard({
  pass,
  basePerDay,
  busy,
  onPress,
}: {
  pass: GemPass;
  /** 제일 짧은 권의 하루 단가 — 절약률 기준 */
  basePerDay: number;
  busy: boolean;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  const savePct =
    basePerDay > 0 ? Math.round((1 - pass.perDay / basePerDay) * 100) : 0;
  const blocked = !pass.affordable || pass.overStack;

  return (
    <Pressable
      disabled={blocked || busy}
      onPress={onPress}
      style={({ pressed }) => [
        s.card,
        blocked && s.cardBlocked,
        pressed && !blocked && s.cardPressed,
      ]}
    >
      <View style={s.left}>
        <View style={s.daysRow}>
          <Text style={s.days}>{t("shop.days", { n: pass.days })}</Text>
          {savePct > 0 && (
            <View style={s.saveBadge}>
              <Text style={s.saveText}>{t("shop.save", { n: savePct })}</Text>
            </View>
          )}
        </View>
        <Text style={s.perDay}>
          {t("shop.perDay", { n: pass.perDay.toLocaleString("en-US") })}
        </Text>
      </View>

      <View style={s.priceWrap}>
        <Ionicons name="diamond" size={17} color="#1CB0F6" />
        <Text style={s.price}>{pass.gems.toLocaleString("en-US")}</Text>
      </View>
    </Pressable>
  );
}

const styles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      // 눌리는 물건처럼 보이게
      borderBottomWidth: 4,
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 18,
      marginBottom: 12,
    },
    cardPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
    cardBlocked: { opacity: 0.45 },
    left: { flex: 1, gap: 4 },
    daysRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    days: { fontSize: 19, fontWeight: "800", color: theme.text },
    saveBadge: {
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: 8,
      backgroundColor: "#58CC0222",
    },
    saveText: { fontSize: 11, fontWeight: "800", color: "#58CC02" },
    perDay: { fontSize: 12, color: theme.textSecondary },
    priceWrap: { flexDirection: "row", alignItems: "center", gap: 5 },
    price: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
      fontVariant: ["tabular-nums"],
    },
  });
