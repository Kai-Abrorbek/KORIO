import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useAuthStore, User } from "@/store/auth.store";
import BoriMascot from "@/components/home/BoriMascot";
import { useCallback, useEffect, useState } from "react";
import CalendarModal from "@/components/home/CalendarModal";
import FloatingAIButton from "@/components/home/FloatingAIButton";
import AIChatModal from "@/components/home/AIChatModal";
import { useFocusEffect, useRouter } from "expo-router";
import { UserService } from "@/services/user.service";
import { StatsService, DayStats } from "@/services/stats.service";
import CircleProgress from "@/components/home/CircleProgress";

const today = new Date().getDay();
const todayIndex = today === 0 ? 6 : today - 1;
// 차트 카테고리: DayStats 필드와 1:1 매핑 (새 카테고리는 여기만 추가하면 자동 반영)
const CATEGORIES = [
  { key: "vocab", color: "#776ee2" },
  { key: "grammar", color: "#45B7D1" },
  { key: "expression", color: "#FF6B6B" },
  { key: "conversation", color: "#1D9E75" },
  { key: "listening", color: "#FAC775" },
  { key: "topik", color: "#E2A83A" },
  // 아직 분류 안 된 문제 타입 — 차트에 회색으로 뜨면 매핑을 추가하라는 신호
  { key: "other", color: "#9AA0A6" },
] as const;

const CHART_HEIGHT = 78; // 막대 영역 높이
const BAR_MAX = 66; // 최대 막대 길이 (나머지는 segment 간격 몫)
const BAR_GAP = 3; // 색 구간 사이 간격
const BAR_MIN_SEG = 6; // 값이 있으면 최소 이만큼은 보이게

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [weekly, setWeekly] = useState<DayStats[]>([]);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatPrefill, setChatPrefill] = useState("");
  const aiPulse = useSharedValue(0.4);
  const router = useRouter();
  const { user } = useAuthStore();
  const setUserData = useAuthStore((st) => st.setUserData);
  const lessonProgress = (user as User)?.currentUnitProgress ?? 0;

  useEffect(() => {
    aiPulse.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000 }),
        withTiming(0.4, { duration: 1000 }),
      ),
      -1,
      false,
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      UserService.getMe()
        .then((me) => {
          setUserData(me as any);
        })
        .catch((err) => console.error("getMe 실패:", err));
      StatsService.getWeekly()
        .then((data) => setWeekly(data.days))
        .catch((err) => console.error("weekly 실패:", err));
    }, []),
  );

  const maxData = Math.max(
    1,
    ...weekly.map((d) =>
      CATEGORIES.reduce((sum, c) => sum + (d.categories?.[c.key] ?? 0), 0),
    ),
  );

  // 주간 합계 (하단 요약)
  const weekSeconds = weekly.reduce((n, d) => n + (d.studyTimeSeconds ?? 0), 0);
  const weekQuestions = weekly.reduce((n, d) => n + (d.totalQuestions ?? 0), 0);
  const weekTimeText = (() => {
    if (!weekSeconds) return "-";
    const h = Math.floor(weekSeconds / 3600);
    const m = Math.floor((weekSeconds % 3600) / 60);
    if (h > 0) {
      return m
        ? `${h}${t("home.studyTime")} ${m}${t("home.studyMin")}`
        : `${h}${t("home.studyTime")}`;
    }
    return `${Math.max(1, m)}${t("home.studyMin")}`;
  })();

  const studiedDay = (i: number) => {
    const d = weekly[i];
    if (!d) return false;
    // 카테고리 무관 "그날 학습했는가" (백엔드 기준과 동일)
    return (d.totalQuestions ?? 0) > 0 || (d.xpEarned ?? 0) > 0;
  };

  const DAYS = t("home.days", { returnObjects: true }) as string[];

  const quickAccess = [
    { icon: "basket-outline", label: t("home.shop"), color: "#776ee2" },
    { icon: "bookmark-outline", label: t("home.challenge"), color: "#FAC775" },
    { icon: "search-outline", label: t("home.dictionary"), color: "#45B7D1" },
    { icon: "heart-outline", label: t("home.wordbook"), color: "#FF6B6B" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Ionicons name="menu" size={30} color={theme.text} />
          </TouchableOpacity>
          <Text style={styles.username}>{user?.nickname}</Text>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={30}
              color={theme.text}
            />
          </TouchableOpacity>
        </View>

        {/* 스트릭 트래커 */}
        <TouchableOpacity onPress={() => setCalendarVisible(true)}>
          <Animated.View
            entering={FadeInDown.delay(100).duration(500)}
            style={styles.card}
          >
            <View style={styles.streakHeader}>
              <View style={styles.streakTitle}>
                <Ionicons name="flame" size={18} color="#FF7A00" />
                <Text style={styles.streakText}>
                  <Text style={styles.streakCount}>{user?.streak ?? 0}</Text>{" "}
                  {t("home.streak")}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.streakMore}
                onPress={() => setCalendarVisible(true)}
              >
                <Text style={styles.streakMoreText}>{t("home.calendar")}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color={theme.primary}
                />
              </TouchableOpacity>
              <CalendarModal
                visible={calendarVisible}
                onClose={() => setCalendarVisible(false)}
                streak={user?.streak ?? 0}
              />
            </View>
            <View style={styles.daysRow}>
              {DAYS.map((day, i) => {
                const studied = studiedDay(i);
                const isToday = i === todayIndex;
                const isFuture = i > todayIndex;
                return (
                  <View key={day} style={styles.dayItem}>
                    <View
                      style={[
                        styles.dayCircle,
                        studied && styles.dayCircleCompleted, // 실제 공부한 날만 색칠
                        isToday && styles.dayCircleToday,
                      ]}
                    >
                      {studied ? (
                        <Ionicons name="checkmark" size={14} color="#fff" />
                      ) : isToday ? (
                        <Ionicons name="flame" size={14} color="#FF7A00" />
                      ) : null}
                    </View>
                    <Text
                      style={[styles.dayLabel, isToday && styles.dayLabelToday]}
                    >
                      {day}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Animated.View>
        </TouchableOpacity>

        {/* 이어서 학습하기 카드 */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={styles.lessonCard}
        >
          {/* 우측 아이콘 버튼들 */}
          <View style={styles.lessonSideButtons}>
            <TouchableOpacity
              style={styles.lessonSideBtn}
              activeOpacity={0.7}
              onPress={() => router.push("/profile")}
            >
              <Ionicons name="person-outline" size={22} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lessonSideBtn}
              activeOpacity={0.85}
              onPress={() => router.push("/courses")}
            >
              <Ionicons name="book-outline" size={22} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lessonSideBtn}
              activeOpacity={0.7}
              onPress={() => {
                router.push("/settings");
              }}
            >
              <Ionicons
                name="settings-outline"
                size={22}
                color={theme.primary}
              />
            </TouchableOpacity>
          </View>

          {/* 캐릭터 */}
          <View style={styles.mascotWrap}>
            <BoriMascot size={200} />
          </View>

          {/* 하단 정보 */}
          <View style={styles.lessonBottom}>
            <View style={styles.lessonBottomLeft}>
              <TouchableOpacity style={styles.reviewRate}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color={theme.primary}
                />
                <Text style={styles.reviewRateText}>
                  {t("home.reviewRate")} {Math.round(lessonProgress)}%{" "}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={12}
                  color={theme.primary}
                />
              </TouchableOpacity>
              <Text style={styles.lessonTitle}>{t("home.vocabStudy")}</Text>
              <Text style={styles.lessonSubTitle}>{t("home.dailyGoal")}</Text>
            </View>
            <CircleProgress
              percent={lessonProgress}
              color={theme.primary}
              textColor={theme.primary}
            />
          </View>

          <TouchableOpacity
            style={styles.lessonButton}
            onPress={() => router.push("/roadmap")}
          >
            <Ionicons name="book" size={18} color="#fff" />
            <Text style={styles.lessonButtonText}>
              {t("home.continueLessonBtn")}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        {/* 레벨 배너 */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <TouchableOpacity style={styles.levelBanner}>
            <Ionicons name="sparkles" size={20} color="#fff" />
            <View style={styles.levelBannerText}>
              <Text style={styles.levelBannerTitle}>
                {t("home.levelBannerTitle")}
              </Text>
              <Text style={styles.levelBannerSub}>
                {t("home.levelBannerSub")}
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        {/* 이번 주 학습 */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(500)}
          style={styles.card}
        >
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => router.push("/stats")}
            activeOpacity={0.7}
          >
            <Text style={styles.cardTitle}>{t("home.weeklyInfo")}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.textSecondary}
            />
          </TouchableOpacity>

          {/* 범례 */}
          <View style={styles.legendRow}>
            {CATEGORIES.map((item) => (
              <View key={item.key} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>
                  {t(`home.categories.${item.key}`)}
                </Text>
              </View>
            ))}
          </View>

          {/* 요일별 누적 막대 */}
          <View style={styles.chartRow}>
            {DAYS.map((day, i) => {
              const d = weekly[i];
              const segments = CATEGORIES.map((c) => ({
                color: c.color,
                value: d?.categories?.[c.key] ?? 0,
              })).filter((seg) => seg.value > 0);
              const isToday = i === todayIndex;

              return (
                <View key={day} style={styles.chartItem}>
                  <View style={styles.chartBarWrap}>
                    {segments.length > 0 ? (
                      segments.map((seg, si) => (
                        <View
                          key={si}
                          style={{
                            height: Math.max(
                              BAR_MIN_SEG,
                              (seg.value / maxData) * BAR_MAX,
                            ),
                            backgroundColor: seg.color,
                            borderRadius: 5,
                            marginTop: si === 0 ? 0 : BAR_GAP,
                          }}
                        />
                      ))
                    ) : (
                      <View style={styles.chartBarEmpty} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.chartLabel,
                      isToday && styles.chartLabelToday,
                    ]}
                  >
                    {isToday ? t("home.today") : day}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.chartDivider} />

          {/* 주간 합계 */}
          <View style={styles.chartStats}>
            <View style={styles.chartStatItem}>
              <Text style={styles.chartStatLabel}>{t("home.studyTime")}</Text>
              <Text style={styles.chartStatValue}>{weekTimeText}</Text>
            </View>
            <View style={styles.chartStatDivider} />
            <View style={styles.chartStatItem}>
              <Text style={styles.chartStatLabel}>
                {t("home.studyProblems")}
              </Text>
              <Text style={styles.chartStatValue}>
                {weekQuestions > 0 ? weekQuestions : "-"}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* 복습하기 */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(500)}
          style={styles.card}
        >
          <TouchableOpacity
            style={styles.reviewRow}
            onPress={() => router.push("/practice")}
          >
            <View style={[styles.reviewIcon, { backgroundColor: "#EEEDFE" }]}>
              <Ionicons name="refresh" size={20} color={theme.primary} />
            </View>
            <View style={styles.reviewInfo}>
              <Text style={styles.reviewTitle}>{t("home.review")}</Text>
              <Text style={styles.reviewSub}>{t("home.reviewSub")}</Text>
            </View>
            {/* <View style={styles.reviewBadge}>
              <Text style={styles.reviewBadgeText}>6</Text>
            </View> */}
            <Ionicons
              name="chevron-forward"
              size={16}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* 바로가기 */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(500)}
          style={styles.card}
        >
          <View style={styles.quickGrid}>
            {quickAccess.map((item) => (
              <TouchableOpacity key={item.label} style={styles.quickItem}>
                <View
                  style={[
                    styles.quickIcon,
                    { backgroundColor: item.color + "20" },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={item.color}
                  />
                </View>
                <Text style={styles.quickLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* AI 플로팅 버튼 */}
      <FloatingAIButton onPress={() => setChatVisible(true)} bottom={130} />
      <AIChatModal
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        prefill={chatPrefill}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 56,
      paddingBottom: 12,
    },
    username: {
      fontSize: 17,
      fontWeight: "700",
      color: theme.text,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: "#1A1A2E",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    streakHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    streakTitle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    streakText: {
      fontSize: 14,
      color: theme.text,
      fontWeight: "500",
    },
    streakCount: {
      color: theme.primary,
      fontWeight: "700",
    },
    streakMore: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
    },
    streakMoreText: {
      fontSize: 13,
      color: theme.primary,
      fontWeight: "600",
    },
    daysRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    dayItem: {
      alignItems: "center",
      gap: 4,
    },
    dayCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    dayCircleCompleted: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    dayCircleToday: {
      backgroundColor: "#FFF4DC",
      borderColor: "#FF7A00",
    },
    dayLabel: {
      fontSize: 11,
      color: theme.textSecondary,
      fontWeight: "500",
    },
    dayLabelToday: {
      color: theme.primary,
      fontWeight: "700",
    },
    lessonCard: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: "#1A1A2E",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
      position: "relative",
    },
    lessonSideButtons: {
      position: "absolute",
      right: 12,
      top: 12,
      gap: 8,
      zIndex: 10,
    },
    lessonSideBtn: {
      width: 52,
      height: 52,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary + "12", // 보라 7% 틴트
      borderWidth: 1.5,
      borderColor: theme.primary + "30", // 보라 19% 테두리
      borderBottomWidth: 4,
      borderBottomColor: theme.primary + "55", // 진한 보라 = 3D 입체감
      shadowColor: theme.primary,
      shadowOpacity: 0.12,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 3,
    },
    lessonSideBtnPrimary: {
      backgroundColor: theme.primary, // + 버튼은 강조 (꽉 채운 색)
      borderColor: theme.primary,
      borderBottomColor: "#5C56B8", // 진한 보라
      shadowOpacity: 0.25,
    },
    mascotWrap: {
      alignItems: "center",
      marginBottom: 8,
    },
    lessonBottom: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    lessonBottomLeft: {
      gap: 4,
    },
    reviewRate: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    reviewRateText: {
      fontSize: 12,
      color: theme.primary,
      fontWeight: "600",
    },
    lessonTitle: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
    },
    lessonSubTitle: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    circleProgress: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 4,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    circleProgressText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
    },
    lessonButton: {
      backgroundColor: theme.primary,
      borderRadius: 14,
      padding: 16,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      gap: 8,
    },
    lessonButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },

    lessonCardInner: {
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 12,
    },
    lessonInfo: {
      width: "100%",
      gap: 6,
    },
    lessonSub: {
      fontSize: 12,
      color: theme.primary,
      fontWeight: "600",
    },
    lessonProgress: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    lessonProgressTrack: {
      flex: 1,
      height: 6,
      backgroundColor: theme.bg,
      borderRadius: 999,
      overflow: "hidden",
    },
    lessonProgressFill: {
      height: "100%",
      backgroundColor: theme.primary,
      borderRadius: 999,
    },
    lessonProgressText: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "600",
    },
    levelBanner: {
      backgroundColor: theme.primary,
      borderRadius: 20,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    levelBannerText: {
      flex: 1,
    },
    levelBannerTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: "#fff",
    },
    levelBannerSub: {
      fontSize: 12,
      color: "rgba(255,255,255,0.7)",
      marginTop: 2,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.text,
    },
    cardSub: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    chartRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: 2,
    },
    chartItem: {
      flex: 1,
      alignItems: "center",
      gap: 8,
    },
    chartBarWrap: {
      height: CHART_HEIGHT,
      width: "56%",
      justifyContent: "flex-end",
      overflow: "hidden",
    },
    chartBarEmpty: {
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.border,
    },
    chartLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    chartLabelToday: {
      color: theme.primary,
      fontWeight: "800",
    },
    chartDivider: {
      height: 1,
      borderWidth: 1,
      borderRadius: 1,
      borderStyle: "dashed",
      borderColor: theme.border,
      marginTop: 14,
      marginBottom: 14,
    },
    chartStats: {
      flexDirection: "row",
      alignItems: "center",
    },
    chartStatItem: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    chartStatDivider: {
      width: 1,
      height: 18,
      backgroundColor: theme.border,
      marginHorizontal: 16,
    },
    chartStatLabel: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.text,
    },
    chartStatValue: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    legendRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      rowGap: 8,
      columnGap: 12,
      marginBottom: 16,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    legendText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    reviewRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    reviewIcon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    reviewInfo: {
      flex: 1,
    },
    reviewTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
    },
    reviewSub: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },
    reviewBadge: {
      backgroundColor: "#FF6B6B",
      borderRadius: 999,
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    reviewBadgeText: {
      fontSize: 12,
      fontWeight: "700",
      color: "#fff",
    },
    quickGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    quickItem: {
      alignItems: "center",
      gap: 8,
      flex: 1,
    },
    quickIcon: {
      width: 48,
      height: 48,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    quickLabel: {
      fontSize: 12,
      color: theme.text,
      fontWeight: "500",
    },
  });
function setUserData(arg0: any): any {
  throw new Error("Function not implemented.");
}
