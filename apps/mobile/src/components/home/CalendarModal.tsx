import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { StatsService } from "@/services/stats.service";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  streak: number;
}

export default function CalendarModal({
  visible,
  onClose,
  streak,
}: CalendarModalProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const WEEKS = t("home.days", { returnObjects: true }) as string[];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  useEffect(() => {
    if (!visible) return;
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth() + 1; // 1-12
    StatsService.getCalendar(y, m)
      .then((data) => setCompletedDays(data.completedDays))
      .catch((err) => {
        console.error("달력 로드 실패:", err);
        setCompletedDays([]);
      });
  }, [visible, currentDate]);

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();
  const isCompleted = (day: number) => completedDays.includes(day);

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableOpacity activeOpacity={1} style={styles.sheet}>
          {/* 핸들 + X 버튼 */}
          <View style={styles.sheetTop}>
            <View style={styles.handle} />
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* 상단 날짜 크게 */}
          <View style={styles.bigDateContainer}>
            <Text style={styles.bigYear}>{year}</Text>
            <View style={styles.bigMonthRow}>
              <TouchableOpacity
                onPress={() => setCurrentDate(new Date(year, month - 1, 1))}
              >
                <Ionicons name="chevron-back" size={22} color={theme.primary} />
              </TouchableOpacity>
              <Text style={styles.bigMonth}>{month + 1}</Text>
              <TouchableOpacity
                onPress={() => setCurrentDate(new Date(year, month + 1, 1))}
              >
                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* 연속학습일 + 복구펜 */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>연속 학습일</Text>
              <View style={styles.statValueRow}>
                <Ionicons name="flame" size={20} color="#FF7A00" />
                <Text style={styles.statValue}>{streak}</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>복구펜 보유</Text>
              <View style={styles.statValueRow}>
                <Ionicons name="create" size={20} color="#FAC775" />
                <Text style={styles.statValue}>1</Text>
              </View>
            </View>
          </View>

          {/* 요일 헤더 */}
          <View style={styles.weekHeader}>
            {WEEKS.map((w) => (
              <Text key={w} style={styles.weekLabel}>
                {w}
              </Text>
            ))}
          </View>

          {/* 날짜 */}
          {weeks.map((week, wi) => (
            <View key={wi} style={styles.weekRow}>
              {week.map((day, di) => (
                <View key={di} style={styles.dayCell}>
                  {day ? (
                    <View
                      style={[
                        styles.dayCircle,
                        isCompleted(day) && styles.dayCircleCompleted,
                        isToday(day) && styles.dayCircleToday,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isCompleted(day) && styles.dayTextCompleted,
                          isToday(day) && styles.dayTextToday,
                        ]}
                      >
                        {day}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          ))}

          {/* 이달의 학습 메달 */}
          <View style={styles.medalSection}>
            <Text style={styles.medalTitle}>이달의 학습 메달</Text>
            <View style={styles.medalRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View
                  key={i}
                  style={[styles.medal, i <= 2 && styles.medalEarned]}
                >
                  <Ionicons
                    name="star"
                    size={16}
                    color={i <= 2 ? "#FAC775" : theme.border}
                  />
                </View>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 20,
      paddingBottom: 40,
      maxHeight: SCREEN_HEIGHT * 0.85,
    },
    sheetTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
      position: "relative",
    },
    handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.border,
    },
    closeBtn: {
      position: "absolute",
      right: 0,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    bigDateContainer: {
      alignItems: "center",
      marginBottom: 16,
    },
    bigYear: {
      fontSize: 14,
      color: theme.textSecondary,
      fontWeight: "500",
    },
    bigMonthRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
    },
    bigMonth: {
      fontSize: 64,
      fontWeight: "800",
      color: theme.text,
      lineHeight: 72,
    },
    statsRow: {
      flexDirection: "row",
      backgroundColor: theme.bg,
      borderRadius: 16,
      padding: 16,
      marginBottom: 20,
    },
    statItem: {
      flex: 1,
      alignItems: "center",
      gap: 8,
    },
    statDivider: {
      width: 1,
      backgroundColor: theme.border,
    },
    statLabel: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    statValueRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    statValue: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
    },
    monthNav: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    monthTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
    },
    weekHeader: {
      flexDirection: "row",
      marginBottom: 8,
    },
    weekLabel: {
      flex: 1,
      textAlign: "center",
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: "600",
    },
    weekRow: {
      flexDirection: "row",
      marginBottom: 4,
    },
    dayCell: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 4,
    },
    dayCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    dayCircleCompleted: {
      backgroundColor: theme.primary + "20",
    },
    dayCircleToday: {
      backgroundColor: theme.primary,
    },
    dayText: {
      fontSize: 14,
      color: theme.text,
      fontWeight: "500",
    },
    dayTextCompleted: {
      color: theme.primary,
      fontWeight: "700",
    },
    dayTextToday: {
      color: "#fff",
      fontWeight: "700",
    },
    medalSection: {
      marginTop: 20,
      gap: 12,
    },
    medalTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
    },
    medalRow: {
      flexDirection: "row",
      gap: 8,
    },
    medal: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    medalEarned: {
      backgroundColor: "#FFF4DC",
      borderColor: "#FAC775",
    },
  });
