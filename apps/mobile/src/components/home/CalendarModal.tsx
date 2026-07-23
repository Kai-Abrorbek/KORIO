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
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

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
  const translateY = useSharedValue(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [streakDays, setStreakDays] = useState<number[]>([]);
  const [serverStreak, setServerStreak] = useState<number | null>(null);
  const [longestStreak, setLongestStreak] = useState(0);
  const WEEKS = t("home.days", { returnObjects: true }) as string[];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  useEffect(() => {
    if (!visible) return;
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth() + 1; // 1-12
    StatsService.getCalendar(y, m)
      .then((data) => {
        setCompletedDays(data.completedDays ?? []);
        setStreakDays(data.streakDays ?? []);
        setServerStreak(data.streak ?? 0);
        setLongestStreak(data.longestStreak ?? 0);
      })
      .catch((err) => {
        console.error("달력 로드 실패:", err);
        setCompletedDays([]);
        setStreakDays([]);
      });
  }, [visible, currentDate]);

  useEffect(() => {
    if (visible) translateY.value = 0;
  }, [visible]);

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();
  const isCompleted = (day: number) => completedDays.includes(day);

  const isStreak = (day: number) => streakDays.includes(day);
  const shownStreak = serverStreak ?? streak;

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  // 아래로 밀어서 닫기
  const panGesture = Gesture.Pan()
    .activeOffsetY(12) // 아래로 12px 이상 끌 때만 발동 (버튼 탭 방해 X)
    .failOffsetY(-12) // 위로 끌면 제스처 취소
    .onUpdate((e) => {
      translateY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      const shouldClose = e.translationY > 120 || e.velocityY > 900;
      if (shouldClose) {
        translateY.value = withTiming(
          SCREEN_HEIGHT,
          { duration: 220 },
          (fin) => {
            if (fin) runOnJS(onClose)();
          },
        );
      } else {
        translateY.value = withSpring(0, { damping: 22, stiffness: 220 });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // 끌어내릴수록 배경 살짝 밝아짐
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - Math.min(translateY.value / 500, 0.7),
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={styles.ghRoot}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={onClose}
          activeOpacity={1}
        >
          <Animated.View
            style={[styles.backdropFill, backdropStyle]}
            pointerEvents="none"
          />
          <GestureDetector gesture={panGesture}>
            <Animated.View style={sheetStyle}>
              <TouchableOpacity activeOpacity={1} style={styles.sheet}>
                {/* 핸들 + X 버튼 */}
                <View style={styles.sheetTop}>
                  <View style={styles.handle} />
                  <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Ionicons
                      name="close"
                      size={20}
                      color={theme.textSecondary}
                    />
                  </TouchableOpacity>
                </View>

                {/* 상단 날짜 크게 */}
                <View style={styles.bigDateContainer}>
                  <Text style={styles.bigYear}>{year}</Text>
                  <View style={styles.bigMonthRow}>
                    <TouchableOpacity
                      onPress={() =>
                        setCurrentDate(new Date(year, month - 1, 1))
                      }
                    >
                      <Ionicons
                        name="chevron-back"
                        size={22}
                        color={theme.primary}
                      />
                    </TouchableOpacity>
                    <Text style={styles.bigMonth}>{month + 1}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setCurrentDate(new Date(year, month + 1, 1))
                      }
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
                    <Text style={styles.statLabel}>{t("home.streakDays")}</Text>
                    <View style={styles.statValueRow}>
                      <Ionicons name="flame" size={20} color="#FF7A00" />
                      <Text style={styles.statValue}>{shownStreak}</Text>
                    </View>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>
                      {t("home.longestStreak")}
                    </Text>
                    <View style={styles.statValueRow}>
                      <Ionicons name="trophy" size={20} color="#FAC775" />
                      <Text style={styles.statValue}>{longestStreak}</Text>
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
                    {week.map((day, di) => {
                      const streakOn = !!day && isStreak(day);
                      const extLeft =
                        streakOn && di !== 0 && isStreak(day! - 1);
                      const extRight =
                        streakOn && di !== 6 && isStreak(day! + 1);
                      return (
                        <View key={di} style={styles.dayCell}>
                          {/* 연속 구간 연결 밴드 */}
                          {streakOn && (
                            <View
                              pointerEvents="none"
                              style={[
                                styles.streakBand,
                                extLeft && styles.streakBandLeft,
                                extRight && styles.streakBandRight,
                              ]}
                            />
                          )}
                          {day ? (
                            <View
                              style={[
                                styles.dayCircle,
                                isCompleted(day) && styles.dayCircleCompleted,
                                streakOn && styles.dayCircleStreak,
                                isToday(day) && styles.dayCircleToday,
                              ]}
                            >
                              <Text
                                style={[
                                  styles.dayText,
                                  isCompleted(day) && styles.dayTextCompleted,
                                  streakOn && styles.dayTextStreak,
                                  isToday(day) && styles.dayTextToday,
                                ]}
                              >
                                {day}
                              </Text>
                            </View>
                          ) : null}
                        </View>
                      );
                    })}
                  </View>
                ))}

                {/* 이달의 학습 메달 */}
                <View style={styles.medalSection}>
                  <Text style={styles.medalTitle}>{t("home.medalTitle")}</Text>
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
            </Animated.View>
          </GestureDetector>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    ghRoot: { flex: 1 },
    backdrop: {
      flex: 1,
      justifyContent: "flex-end",
    },
    backdropFill: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
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
      justifyContent: "center",
    },
    streakBand: {
      position: "absolute",
      top: 4,
      bottom: 4,
      left: "50%",
      right: "50%",
      marginLeft: -18,
      marginRight: -18,
      borderRadius: 18,
      backgroundColor: "#FF7A0022",
    },
    streakBandLeft: { left: 0, marginLeft: 0 },
    streakBandRight: { right: 0, marginRight: 0 },
    dayCircleStreak: {
      backgroundColor: "#FF7A00",
    },
    dayTextStreak: {
      color: "#fff",
      fontWeight: "800",
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
