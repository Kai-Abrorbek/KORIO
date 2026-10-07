import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import QuestBadge from "./QuestBadge";
import { monthName } from "../questMeta";

/**
 * 프로필 — 월간 챌린지 배지 모음. 없으면 아무것도 안 그린다.
 * 친구 프로필에도 보인다 (자랑거리).
 */
export default function QuestBadgesRow({ badges }: { badges?: string[] }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  if (!badges?.length) return null;

  return (
    <View style={s.wrap}>
      <Text style={s.title}>{t("retention.monthly.profileTitle")}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.scroll}
      >
        {badges.map((b) => (
          <View key={b} style={s.item}>
            <QuestBadge month={b} size={50} />
            <Text style={s.label} numberOfLines={1}>
              {monthName(t, b)}
            </Text>
            <Text style={s.year}>{b.slice(0, 4)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: { marginBottom: 24, gap: 12, paddingHorizontal: 20 },
    title: { fontSize: 18, fontWeight: "800", color: theme.text },
    scroll: { gap: 14, paddingRight: 8 },
    item: { width: 64, alignItems: "center" },
    label: {
      marginTop: 6,
      fontSize: 11.5,
      fontWeight: "800",
      color: theme.text,
    },
    year: { fontSize: 10, fontWeight: "700", color: theme.textSecondary },
  });
