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
import { useAuthStore } from "@/store/auth.store";
import BoriMascot from "@/components/home/BoriMascot";
import { useCallback, useEffect, useState } from "react";
import CalendarModal from "@/components/home/CalendarModal";
import FloatingAIButton from "@/components/home/FloatingAIButton";
import AIChatModal from "@/components/home/AIChatModal";
import { useFocusEffect, useRouter } from "expo-router";
import { UserService } from "@/services/user.service";
import { StatsService, DayStats } from "@/services/stats.service";

const today = new Date().getDay();
const todayIndex = today === 0 ? 6 : today - 1;

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
        .then((me) => setUserData(me as any))
        .catch((err) => console.error("getMe 실패:", err));
      StatsService.getWeekly()
        .then((data) => setWeekly(data.days))
        .catch((err) => console.error("weekly 실패:", err));
    }, []),
  );

  const maxData = Math.max(
    1,
    ...weekly.map((d) => d.vocabularyCount + d.grammarCount),
  );

  const DAYS = t("home.days", { returnObjects: true }) as string[];
  const categories = [
    { key: "vocab", color: "#776ee2" },
    { key: "grammar", color: "#45B7D1" },
    { key: "expression", color: "#FF6B6B" },
    { key: "conversation", color: "#1D9E75" },
    { key: "listening", color: "#FAC775" },
  ];

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
                  <Text style={styles.streakCount}>{user?.streak ?? 12}</Text>{" "}
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
                streak={user?.streak ?? 12}
              />
            </View>
            <View style={styles.daysRow}>
              {DAYS.map((day, i) => (
                <View key={day} style={styles.dayItem}>
                  <View
                    style={[
                      styles.dayCircle,
                      i < todayIndex && styles.dayCircleCompleted,
                      i === todayIndex && styles.dayCircleToday,
                    ]}
                  >
                    {i < todayIndex ? (
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    ) : i === todayIndex ? (
                      <Ionicons name="flame" size={14} color="#FF7A00" />
                    ) : null}
                  </View>
                  <Text
                    style={[
                      styles.dayLabel,
                      i === todayIndex && styles.dayLabelToday,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              ))}
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
                  {t("home.reviewRate")} -%{" "}
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
            <View style={styles.circleProgress}>
              <Text style={styles.circleProgressText}>5%</Text>
            </View>
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
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{t("home.weeklyInfo")}</Text>
            <Text style={styles.cardSub}>
              5{t("home.month")} 4{t("home.weekUnit")}
            </Text>
          </View>
          <View style={styles.chartRow}>
            {DAYS.map((day, i) => {
              const d = weekly[i];
              const vocab = d?.vocabularyCount || 0;
              const grammar = d?.grammarCount || 0;
              const total = vocab + grammar;
              const vocabH = maxData > 0 ? (vocab / maxData) * 70 : 0;
              const grammarH = maxData > 0 ? (grammar / maxData) * 70 : 0;
              return (
                <View key={day} style={styles.chartItem}>
                  <View style={styles.chartBarWrap}>
                    {total > 0 ? (
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "flex-end",
                          height: 70,
                        }}
                      >
                        <View
                          style={{
                            width: 20,
                            borderRadius: 4,
                            overflow: "hidden",
                          }}
                        >
                          <View
                            style={{
                              height: grammarH,
                              backgroundColor: "#45B7D1",
                            }}
                          />
                          <View
                            style={{
                              height: vocabH,
                              backgroundColor: theme.primary,
                            }}
                          />
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          height: 70,
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            height: 6,
                            width: 20,
                            backgroundColor: theme.border,
                            borderRadius: 4,
                          }}
                        />
                      </View>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.chartLabel,
                      i === todayIndex && {
                        color: theme.primary,
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.chartStats}>
            <Text style={styles.chartStatText}>
              2{t("home.studyTime")} 15{t("home.studyMin")}
            </Text>
            <Text style={styles.chartStatText}>
              142{t("home.studyProblems")}
            </Text>
            <Text style={[styles.chartStatText, { color: theme.primary }]}>
              {t("home.thisWeek")}
            </Text>
          </View>
          <View style={styles.legendRow}>
            {categories.map((item) => (
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
        </Animated.View>

        {/* 복습하기 */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(500)}
          style={styles.card}
        >
          <TouchableOpacity style={styles.reviewRow}>
            <View style={[styles.reviewIcon, { backgroundColor: "#EEEDFE" }]}>
              <Ionicons name="refresh" size={20} color={theme.primary} />
            </View>
            <View style={styles.reviewInfo}>
              <Text style={styles.reviewTitle}>{t("home.review")}</Text>
              <Text style={styles.reviewSub}>{t("home.reviewSub")}</Text>
            </View>
            <View style={styles.reviewBadge}>
              <Text style={styles.reviewBadgeText}>6</Text>
            </View>
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
      justifyContent: "space-between",
      alignItems: "flex-end",
      height: 80,
      marginBottom: 8,
    },
    chartItem: {
      flex: 1,
      alignItems: "center",
      gap: 4,
    },
    chartBarWrap: {
      flex: 1,
      justifyContent: "flex-end",
      width: "60%",
    },
    chartBar: {
      borderRadius: 4,
      minHeight: 4,
    },
    chartLabel: {
      fontSize: 11,
      color: theme.textSecondary,
    },
    chartStats: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 8,
    },
    chartStatText: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.text,
    },
    legendRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    legendDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    legendText: {
      fontSize: 11,
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
