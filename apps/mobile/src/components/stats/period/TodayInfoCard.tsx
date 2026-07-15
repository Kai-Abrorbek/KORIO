import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { TodaySummary } from "@/types/stats";
import StatsCard from "../shared/StatsCard";

interface Props {
  hasData: boolean;
  today: TodaySummary | null;
}

const NEW_COLOR = "#F5B301";
const REVIEW_COLOR = "#4A97E0";

function IconBadge({ name, color, bg, size = 44 }: any) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 13,
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name={name} size={size * 0.52} color={color} />
    </View>
  );
}

export default function TodayInfoCard({ hasData, today }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);

  return (
    <View>
      <Text style={s.sectionTitle}>{t("stats.todayInfo")}</Text>

      {!hasData || !today ? (
        <StatsCard style={s.card}>
          <View style={s.empty}>
            <View style={s.iconWrap}>
              <Ionicons
                name="document-text-outline"
                size={32}
                color={theme.textSecondary}
              />
            </View>
            <Text style={s.emptyTitle}>{t("stats.emptyTodayTitle")}</Text>
            <Text style={s.emptyDesc}>{t("stats.emptyTodayDesc")}</Text>
          </View>
        </StatsCard>
      ) : (
        <>
          {/* 상단 2카드 */}
          <View style={s.topRow}>
            <StatsCard style={s.topCard}>
              <IconBadge
                name="time-outline"
                color="#4A97E0"
                bg="#E9F2FB"
                size={40}
              />
              <Text style={s.topLabel}>{t("stats.totalStudyTime")}</Text>
              <Text style={s.topValue}>{today.studyTimeLabel}</Text>
            </StatsCard>
            <StatsCard style={s.topCard}>
              <IconBadge name="pencil" color="#F5A623" bg="#FEF2DE" size={40} />
              <Text style={s.topLabel}>{t("stats.totalProblems")}</Text>
              <Text style={s.topValue}>{today.totalQuestions}</Text>
            </StatsCard>
          </View>

          {/* 카테고리별 */}
          {today.categories.map((c) => (
            <StatsCard key={c.category}>
              <View style={s.catHeader}>
                <IconBadge
                  name="book"
                  color={theme.primary}
                  bg={theme.primary + "1A"}
                />
                <Text style={s.catName}>
                  {t(`stats.category.${c.category}`)}
                </Text>
                <View style={s.catRight}>
                  <Ionicons
                    name="checkmark-circle"
                    size={15}
                    color={theme.textSecondary}
                  />
                  <Text style={s.catAccuracy}>
                    {t("stats.reviewAccuracy")}{" "}
                    {c.reviewAccuracy == null ? "-" : c.reviewAccuracy}%
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={theme.textSecondary}
                  />
                </View>
              </View>

              <View style={s.bar}>
                <View
                  style={{ flex: c.newCount, backgroundColor: NEW_COLOR }}
                />
                <View
                  style={{ flex: c.reviewCount, backgroundColor: REVIEW_COLOR }}
                />
              </View>

              <View style={s.catFooter}>
                <Text style={s.footerLabel}>
                  {t("stats.newProblems")}{" "}
                  <Text style={[s.footerNum, { color: NEW_COLOR }]}>
                    {c.newCount}
                  </Text>
                </Text>
                <Text style={s.footerLabel}>
                  {t("stats.reviewProblems")}{" "}
                  <Text style={[s.footerNum, { color: REVIEW_COLOR }]}>
                    {c.reviewCount}
                  </Text>
                </Text>
              </View>
            </StatsCard>
          ))}

          {/* 요일 패턴 */}
          <StatsCard>
            <View style={s.weekRow}>
              <IconBadge
                name="calendar-clear"
                color={theme.primary}
                bg={theme.primary + "1A"}
              />
              <View style={{ flex: 1 }}>
                <Text style={s.weekTitle}>
                  {t("stats.weekdayPattern", {
                    day: t(`stats.weekdays.${today.weekdayIndex}`),
                  })}
                </Text>
                <Text style={s.weekDesc}>
                  {t("stats.weekdayDesc", {
                    time: today.avgTimeLabel,
                    count: today.avgProblems,
                  })}
                </Text>
              </View>
            </View>
          </StatsCard>
        </>
      )}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    sectionTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      marginHorizontal: 20,
      marginBottom: 12,
      marginTop: 8,
    },
    topRow: {
      flexDirection: "row",
      paddingHorizontal: 16,
      gap: 12,
      marginBottom: 14,
    },
    topCard: {
      flex: 1,
      marginHorizontal: 0,
      marginBottom: 0,
      alignItems: "flex-start",
    },
    topLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.textSecondary,
      marginTop: 12,
    },
    topValue: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
      marginTop: 2,
    },
    catHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
    catName: { flex: 1, fontSize: 17, fontWeight: "800", color: theme.text },
    catRight: { flexDirection: "row", alignItems: "center", gap: 3 },
    catAccuracy: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    bar: {
      flexDirection: "row",
      height: 9,
      borderRadius: 6,
      overflow: "hidden",
      marginTop: 16,
      backgroundColor: theme.border,
    },
    catFooter: { flexDirection: "row", gap: 18, marginTop: 10 },
    footerLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    footerNum: { fontWeight: "800" },
    weekRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    weekTitle: { fontSize: 16, fontWeight: "800", color: theme.text },
    weekDesc: {
      fontSize: 13,
      fontWeight: "500",
      color: theme.textSecondary,
      marginTop: 3,
      lineHeight: 18,
    },
    card: { paddingVertical: 28 },
    empty: { alignItems: "center", gap: 8 },
    iconWrap: { opacity: 0.5, marginBottom: 4 },
    emptyTitle: { fontSize: 15, fontWeight: "700", color: theme.text },
    emptyDesc: { fontSize: 13, color: theme.textSecondary },
  });
