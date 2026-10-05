import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import * as Haptics from "@/utils/haptics";

interface Props {
  owned: number;
  max: number;
  price: number;
  gems: number;
  isSuper: boolean;
  superWeekly: number;
  busy: boolean;
  onBuy: () => void;
}

/**
 * 상점 — 스트릭 복구펜.
 * 연속이 끊길 날에 자동으로 한 장씩 쓰인다. 보유 상한까지만 살 수 있다.
 */
export default function StreakFreezeSection({
  owned,
  max,
  price,
  gems,
  isSuper,
  superWeekly,
  busy,
  onBuy,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  const full = owned >= max;
  const off = full || gems < price || busy;

  return (
    <>
      <Text style={s.sectionLabel}>{t("retention.freeze.shopTitle")}</Text>
      <Pressable
        disabled={off}
        onPress={() => {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onBuy();
        }}
        style={({ pressed }) => [
          s.row,
          off && s.rowOff,
          pressed && !off && s.rowPressed,
        ]}
      >
        <View style={s.icon}>
          <Ionicons name="snow" size={26} color="#FFFFFF" />
        </View>
        <View style={s.mid}>
          <Text style={s.label}>{t("retention.freeze.name")}</Text>
          <Text style={s.sub}>
            {isSuper
              ? t("retention.freeze.superSub", { n: superWeekly })
              : t("retention.freeze.sub")}
          </Text>
          <View style={s.slots}>
            {Array.from({ length: max }).map((_, i) => (
              <View key={i} style={[s.slot, i < owned && s.slotOn]}>
                <Ionicons
                  name="snow"
                  size={11}
                  color={i < owned ? "#FFFFFF" : theme.textSecondary}
                />
              </View>
            ))}
            <Text style={s.slotText}>
              {owned}/{max}
            </Text>
          </View>
        </View>
        {full ? (
          <Text style={s.full}>{t("retention.freeze.full")}</Text>
        ) : (
          <View style={s.price}>
            <Ionicons name="diamond" size={15} color="#3BB6E5" />
            <Text style={s.priceText}>{price.toLocaleString("en-US")}</Text>
          </View>
        )}
      </Pressable>
    </>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    sectionLabel: {
      fontSize: 13,
      fontWeight: "900",
      letterSpacing: 0.6,
      color: theme.textSecondary,
      textTransform: "uppercase",
      paddingHorizontal: 20,
      marginTop: 22,
      marginBottom: 10,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      marginHorizontal: 20,
      marginBottom: 12,
      padding: 14,
      borderRadius: 18,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 5,
    },
    rowPressed: { transform: [{ translateY: 3 }], borderBottomWidth: 2 },
    rowOff: { opacity: 0.55 },
    icon: {
      width: 48,
      height: 48,
      borderRadius: 15,
      backgroundColor: "#3BA7F0",
      borderBottomWidth: 3,
      borderBottomColor: "#2180C4",
      alignItems: "center",
      justifyContent: "center",
    },
    mid: { flex: 1, gap: 3 },
    label: { fontSize: 16, fontWeight: "900", color: theme.text },
    sub: { fontSize: 12, fontWeight: "700", color: theme.textSecondary },
    slots: {
      marginTop: 3,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    slot: {
      width: 20,
      height: 20,
      borderRadius: 6,
      backgroundColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    slotOn: { backgroundColor: "#3BA7F0" },
    slotText: {
      marginLeft: 4,
      fontSize: 12,
      fontWeight: "900",
      color: theme.textSecondary,
    },
    price: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 12,
      backgroundColor: theme.bg === "#ffffff" ? "#F2FAFE" : "#2E2E39",
    },
    priceText: { fontSize: 15, fontWeight: "900", color: "#3BB6E5" },
    full: { fontSize: 13, fontWeight: "900", color: "#2180C4" },
  });
