import { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { HeatmapDay } from "@/types/stats";
import StatsCard from "../shared/StatsCard";

interface Props {
  days: HeatmapDay[];
}

const CELL_SIZE = 7;
const CELL_GAP = 2;
const MONTH_GAP = 6;
const DAY_LABEL_WIDTH = 16;

const INTENSITY_COLORS = [
  "#F0EFFA",
  "#D9D2F5",
  "#B7ABEC",
  "#9587E0",
  "#776ee2",
];

function fmtDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// 학년도 시작 = 6월 (0-indexed 5). 오늘이 6월 이상이면 올해부터, 미만이면 작년부터.
function getAcademicYearStart(today: Date, offset: number = 0) {
  const month = today.getMonth();
  let startYear = month >= 5 ? today.getFullYear() : today.getFullYear() - 1;
  startYear += offset;
  return { year: startYear, month: 5 }; // 6월 시작
}

function getAcademicYearMonths(start: { year: number; month: number }) {
  // 12개월: Jun-Nov + Dec-May
  const months: Array<{ year: number; month: number }> = [];
  let y = start.year;
  let m = start.month;
  for (let i = 0; i < 12; i++) {
    months.push({ year: y, month: m });
    m++;
    if (m > 11) {
      m = 0;
      y++;
    }
  }
  return months;
}

function MonthBlock({
  year,
  month,
  dateMap,
  today,
  monthShort,
}: {
  year: number;
  month: number;
  dateMap: Map<string, number>;
  today: Date;
  monthShort: (m: number) => string;
}) {
  const theme = useTheme();
  const themed = getStyles(theme);

  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // 0=Mon
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <View style={themed.monthBlock}>
      <Text style={themed.monthLabel}>{monthShort(month)}</Text>
      <View style={themed.weekRow}>
        {Array.from({ length: 5 }).map((_, col) => (
          <View key={col} style={themed.weekCol}>
            {Array.from({ length: 7 }).map((_, row) => {
              const dayNum = col * 7 + row - firstDow + 1;
              if (dayNum < 1 || dayNum > daysInMonth) {
                return (
                  <View
                    key={row}
                    style={[styles.cell, { backgroundColor: "transparent" }]}
                  />
                );
              }
              const date = new Date(year, month, dayNum);
              const isFuture = date > today;
              const key = fmtDate(date);
              const intensity = dateMap.get(key) ?? 0;

              return (
                <View
                  key={row}
                  style={[
                    styles.cell,
                    {
                      backgroundColor: isFuture
                        ? "transparent"
                        : INTENSITY_COLORS[intensity],
                    },
                  ]}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function YearlyHeatmap({ days }: Props) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const themed = getStyles(theme);
  const lang = i18n.language?.split("-")[0] || "en";

  const [yearOffset, setYearOffset] = useState(0); // 0=현재 학년도, -1=이전

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const start = getAcademicYearStart(today, yearOffset);
  const allMonths = getAcademicYearMonths(start);
  const topMonths = allMonths.slice(0, 6);
  const bottomMonths = allMonths.slice(6, 12);

  const dateMap = useMemo(() => {
    const m = new Map<string, number>();
    for (const d of days) m.set(d.date, d.intensity);
    return m;
  }, [days]);

  const monthShort = (m: number) => {
    const UZ = [
      "Yan",
      "Fev",
      "Mar",
      "Apr",
      "May",
      "Iyn",
      "Iyl",
      "Avg",
      "Sen",
      "Okt",
      "No'y",
      "Dek",
    ];
    const EN = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const RU = [
      "ЯНВ",
      "ФЕВ",
      "МАР",
      "АПР",
      "МАЙ",
      "ИЮН",
      "ИЮЛ",
      "АВГ",
      "СЕН",
      "ОКТ",
      "НОЯ",
      "ДЕК",
    ];
    if (lang === "ko") return `${m + 1}월`;
    if (lang === "uz") return UZ[m];
    return lang === "ru" ? RU[m] : EN[m];
  };

  const dayLabels =
    lang === "ko"
      ? ["월", "화", "수", "목", "금", "토", "일"]
      : lang === "uz"
        ? ["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Yak"]
        : lang === "ru"
          ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
          : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const yearLabel =
    yearOffset === 0 ? t("stats.recent") : `${start.year}-${start.year + 1}`;

  return (
    <View>
      <Text style={themed.sectionTitle}>{t("stats.periodInfo")}</Text>
      <StatsCard>
        <View style={themed.header}>
          <Text style={themed.title}>{t("stats.yearlyStudy")}</Text>
          <View style={themed.paginationRow}>
            <TouchableOpacity
              onPress={() => setYearOffset((o) => o - 1)}
              hitSlop={10}
            >
              <Ionicons name="chevron-back" size={18} color={theme.text} />
            </TouchableOpacity>
            <Text style={themed.yearLabel}>{yearLabel}</Text>
            <TouchableOpacity
              onPress={() => setYearOffset((o) => Math.min(0, o + 1))}
              hitSlop={10}
              disabled={yearOffset >= 0}
            >
              <Ionicons
                name="chevron-forward"
                size={18}
                color={yearOffset >= 0 ? theme.border : theme.text}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={themed.legendRow}>
          <Text style={themed.legendText}>Less</Text>
          <View style={themed.legendDots}>
            {INTENSITY_COLORS.map((c, i) => (
              <View
                key={i}
                style={[
                  styles.cell,
                  { backgroundColor: c, marginHorizontal: 1 },
                ]}
              />
            ))}
          </View>
          <Text style={themed.legendText}>More</Text>
        </View>

        {/* 상단 6개월 */}
        <View style={themed.row}>
          <View style={themed.dayLabelCol}>
            {/* 빈 공간 (month label 자리) */}
            <View style={{ height: 14 }} />
            {dayLabels.map((d) => (
              <Text key={d} style={themed.dayText}>
                {d}
              </Text>
            ))}
          </View>
          {topMonths.map((m) => (
            <MonthBlock
              key={`${m.year}-${m.month}`}
              year={m.year}
              month={m.month}
              dateMap={dateMap}
              today={today}
              monthShort={monthShort}
            />
          ))}
        </View>

        <View style={{ height: 12 }} />

        {/* 하단 6개월 */}
        <View style={themed.row}>
          <View style={themed.dayLabelCol}>
            <View style={{ height: 14 }} />
            {dayLabels.map((d) => (
              <Text key={d} style={themed.dayText}>
                {d}
              </Text>
            ))}
          </View>
          {bottomMonths.map((m) => (
            <MonthBlock
              key={`${m.year}-${m.month}`}
              year={m.year}
              month={m.month}
              dateMap={dateMap}
              today={today}
              monthShort={monthShort}
            />
          ))}
        </View>
      </StatsCard>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 1.5,
    marginBottom: CELL_GAP,
  },
});

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
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    title: { fontSize: 17, fontWeight: "800", color: theme.text },
    paginationRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    yearLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.text,
      minWidth: 80,
      textAlign: "center",
    },
    legendRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 18,
    },
    legendDots: { flexDirection: "row", alignItems: "center" },
    legendText: { fontSize: 12, color: theme.textSecondary, fontWeight: "600" },
    row: { flexDirection: "row", alignItems: "flex-start" },
    dayLabelCol: {
      width: DAY_LABEL_WIDTH,
      marginRight: 2,
    },
    dayText: {
      fontSize: 8,
      color: theme.textSecondary,
      height: CELL_SIZE + CELL_GAP,
      lineHeight: CELL_SIZE + CELL_GAP,
    },
    monthBlock: {
      marginRight: MONTH_GAP,
    },
    monthLabel: {
      fontSize: 10,
      fontWeight: "700",
      color: theme.textSecondary,
      letterSpacing: 0.3,
      height: 14,
      marginBottom: 0,
    },
    weekRow: {
      flexDirection: "row",
      gap: CELL_GAP,
    },
    weekCol: { flexDirection: "column" },
  });
