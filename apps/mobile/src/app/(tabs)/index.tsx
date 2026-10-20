import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "@/components/ui/Pressables";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { useSpeech } from "@/hooks/useSpeech";
import { ThemeColors } from "@/constants/theme";
import { useAuthStore } from "@/store/auth.store";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import { AVATAR_BACKGROUNDS } from "@/components/avatar/AvatarPreview";
import AvatarComboStage from "@/components/avatar/AvatarComboStage";
import { SceneBackdrop, isScene } from "@/components/avatar/AvatarScene";
import { mergeAvatarConfig } from "@/types/avatar";
import { useCallback, useEffect, useState } from "react";
import CalendarModal from "@/components/home/CalendarModal";
import NotificationModal from "@/components/notifications/NotificationModal";
import { NotificationService } from "@/services/notification.service";
import FloatingAIButton from "@/components/home/FloatingAIButton";
import { useContentLanguagePending } from "@/components/settings/ContentLanguagePrompt";
import AIChatModal from "@/components/home/AIChatModal";
import { useFocusEffect, useRouter } from "expo-router";
import { UserService } from "@/services/user.service";
import { StatsService, DayStats } from "@/services/stats.service";
import CircleProgress from "@/components/home/CircleProgress";
import {
  useSettingsStore,
  learnModePath,
  type LearnMode,
} from "@/store/settings.store";
import { LEARN_COURSES } from "@/constants/learnCourses";
import {
  LEVEL_UP_ROUTE,
  setLevelUp,
  takeQueuedLevelUp,
} from "@/features/level-up/levelUp";
import {
  LearnProgressService,
  type LearnProgress,
} from "@/services/learn-progress.service";
import { hydrateLearnMode } from "@/utils/learn-mode";
import { useFeatureAccess } from "@/features/subscription/useFeatureAccess";
import { featureOfLearnMode } from "@/features/subscription/access";
import TourTarget from "@/features/tour/TourTarget";
import RankBanner from "@/features/rank/RankBanner";
import { HOME_TOUR } from "@/features/tour/tours";
import { useTourStore } from "@/features/tour/tour.store";
import { useTourScroll } from "@/features/tour/useTourScroll";
import { syncTimezone } from "@/utils/timezone";
import { useRetentionStore } from "@/store/retention.store";
import DailyQuestsCard from "@/features/retention/components/DailyQuestsCard";
import MonthlyChallengeCard from "@/features/retention/components/MonthlyChallengeCard";
import CheckinCard from "@/features/retention/components/CheckinCard";
import XpBoostBanner from "@/features/retention/components/XpBoostBanner";
import RetentionOverlays from "@/features/retention/components/RetentionOverlays";

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

/**
 * 홈 카드 진행도 캐시 (코스·모드별). 홈으로 돌아올 때마다 서버에 다시 묻지만,
 * 그 사이 직전 값을 바로 보여 줘서 링이 빈 채로 깜빡이지 않게 한다.
 */
const progressCache = new Map<string, LearnProgress | null>();

/** 셀 진도가 없는 모드(대화·글자)는 링 대신 이 아이콘과 한 줄 소개 */
const MODE_ICON: Partial<Record<LearnMode, keyof typeof Ionicons.glyphMap>> = {
  conversation: "chatbubbles",
  alphabet: "text",
};
const MODE_HINT: Partial<Record<LearnMode, string>> = {
  conversation: "home.modeHint.conversation",
  alphabet: "home.modeHint.alphabet",
};

const CHART_HEIGHT = 78; // 막대 영역 높이
const BAR_MAX = 66; // 최대 막대 길이 (나머지는 segment 간격 몫)
const BAR_GAP = 3; // 색 구간 사이 간격
const BAR_MIN_SEG = 6; // 값이 있으면 최소 이만큼은 보이게

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { speak: speakAvatarWord } = useSpeech();
  const styles = getStyles(theme);
  const sideButtonIconColor = theme.bg === "#15151D" ? "#D8D3FF" : "#4F43AE";
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(0);
  const [weekly, setWeekly] = useState<DayStats[]>([]);
  const [chatVisible, setChatVisible] = useState(false);
  const learnMode = useSettingsStore((s) => s.learnMode);
  const learnCourse = useSettingsStore((s) => s.learnCourse);
  const course = LEARN_COURSES[learnCourse] ?? LEARN_COURSES.ko;
  const topikLevel = useSettingsStore((s) => s.topikLevel);

  // 현재 학습 모드에 맞는 "이어서 학습하기" 경로.
  // 로드맵을 쓰는 모드와 전용 페이지가 있는 모드가 섞여 있어서 스토어에 모아뒀다.
  const studyMode = useSettingsStore((s) => s.studyMode);
  const continuePath = learnModePath(
    learnMode,
    topikLevel,
    studyMode,
    learnCourse,
  );
  const [chatPrefill, setChatPrefill] = useState("");
  const aiPulse = useSharedValue(0.4);
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const startTour = useTourStore((st) => st.startIfUnseen);
  const consumePendingTour = useTourStore((st) => st.consumePending);
  // 한국어 폰이면 뜻 언어를 묻는 시트가 먼저 뜬다 — 고를 때까지 투어는 기다린다
  const languagePending = useContentLanguagePending();
  // 투어 단계가 바뀌면 대상이 보이도록 스크롤한다 (오버레이는 루트에 있어서
  // 이 ScrollView 를 모른다). AI 버튼은 늘 보이므로 제외.
  const { onScroll: onTourScroll } = useTourScroll(HOME_TOUR, scrollRef, [
    "home.ai",
  ]);
  const { requirePremium } = useFeatureAccess();
  const { user, isLoggedIn } = useAuthStore();
  // 섹션을 끝낸 축하 화면들을 지나 홈으로 왔으면 여기서 레벨업 연출 (로드맵과 같다)
  useFocusEffect(
    useCallback(() => {
      const queued = takeQueuedLevelUp();
      if (!queued) return;
      setLevelUp(queued);
      router.push(LEVEL_UP_ROUTE);
    }, [router]),
  );
  // 홈 아바타는 이 화면이 보일 때만 움직인다 (다른 탭에 가 있으면 멈춤)
  const [homeFocused, setHomeFocused] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setHomeFocused(true);
      return () => setHomeFocused(false);
    }, []),
  );
  const setUserData = useAuthStore((st) => st.setUserData);

  // ── 지금 코스·모드의 진행도 (서버가 모드 화면이 보여 주는 범위로 센다) ──
  const progressKey = `${learnCourse}:${learnMode}:${studyMode}:${topikLevel}`;
  const [progressByKey, setProgressByKey] = useState<
    Record<string, LearnProgress | null>
  >(() => Object.fromEntries(progressCache));
  // undefined = 아직 모름(로딩), null = 셀 게 없는 모드
  const learnProgress = isLoggedIn ? progressByKey[progressKey] : null;
  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn) return;
      let alive = true;
      LearnProgressService.get({
        course: learnCourse,
        mode: learnMode,
        studyMode,
        topikLevel,
      })
        .then(({ progress }) => {
          progressCache.set(progressKey, progress);
          if (alive) {
            setProgressByKey((prev) => ({ ...prev, [progressKey]: progress }));
          }
        })
        .catch(() => {});
      return () => {
        alive = false;
      };
    }, [isLoggedIn, learnCourse, learnMode, studyMode, topikLevel, progressKey]),
  );
  const progressScope = learnProgress
    ? learnProgress.title ||
      t(`home.progress.scope.${learnProgress.scope}`, {
        n:
          learnProgress.scope === "topik"
            ? learnProgress.scopeNumber === 2
              ? "II"
              : "I"
            : learnProgress.scopeNumber,
      })
    : "";
  const progressCount = learnProgress
    ? t(`home.progress.count.${learnProgress.unit}`, {
        done: learnProgress.done,
        total: learnProgress.total,
      })
    : "";
  const modeHint =
    learnProgress === null && MODE_HINT[learnMode]
      ? t(MODE_HINT[learnMode] as string)
      : "";
  // 리텐션 — 복구펜·퀘스트·출석·복귀·XP 부스트·연속 목표 (서버 요약 하나)
  const retention = useRetentionStore((st) => st.summary);
  const refreshRetention = useRetentionStore((st) => st.refresh);
  const patchRetention = useRetentionStore((st) => st.patch);
  // 문제 퀘스트는 코스마다 따로 센다 — 홈에서 코스를 바꾸면 그 코스 것으로 다시 받는다
  // (첫 렌더는 아래 포커스 효과가 받는다)
  const retentionCourse = useRef(learnCourse);
  useEffect(() => {
    if (retentionCourse.current === learnCourse) return;
    retentionCourse.current = learnCourse;
    void refreshRetention();
  }, [learnCourse, refreshRetention]);
  const [checkinReward, setCheckinReward] = useState<{
    day: number;
    gems: number;
    superDays: number;
    swapped?: boolean;
  } | null>(null);

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

  // 처음 온 사람에게 기능 안내를 한 번 돌린다.
  // 화면이 다 그려지고 대상 버튼 위치가 잡힌 뒤에 시작해야 스포트라이트가
  // 엉뚱한 자리를 뚫는다. 애니메이션(FadeInDown 600ms)까지 기다린다.
  // 뜻 언어 시트가 떠 있으면 그게 끝난 뒤에 (같이 뜨면 투어 막이 시트를 덮는다).
  useEffect(() => {
    if (languagePending) return;
    const id = setTimeout(() => startTour(HOME_TOUR), 1300);
    return () => clearTimeout(id);
  }, [languagePending, startTour]);

  // 설정에서 "다시 보기" 로 예약한 투어는 여기서 꺼낸다.
  // 화면이 자리를 잡은 뒤에 켜야 스포트라이트가 제자리에 뚫린다.
  useFocusEffect(
    useCallback(() => {
      if (languagePending) return;
      const id = setTimeout(() => consumePendingTour(HOME_TOUR), 450);
      return () => clearTimeout(id);
    }, [consumePendingTour, languagePending]),
  );

  useFocusEffect(
    useCallback(() => {
      UserService.getMe()
        .then((me) => {
          setUserData(me as any);
          // 학습 모드는 계정 데이터다. 서버 값으로 로컬 거울을 맞춘다
          hydrateLearnMode(me as any);
          // 기기 시간대가 계정과 다르면 맞춘다 (하루·한 주 경계의 기준)
          syncTimezone((me as any)?.timezone);
        })
        .catch((err) => console.error("getMe 실패:", err));
      StatsService.getWeekly()
        .then((data) => setWeekly(data.days))
        .catch((err) => console.error("weekly 실패:", err));
      // 퀘스트 진행도·복구펜·출석·복귀 보상 — 돌아올 때마다 서버 값으로
      void refreshRetention();
      // 배지는 목록 없이 개수만 받아온다
      NotificationService.unreadCount()
        .then((r) => setUnreadNotifs(r.count))
        .catch(() => {});
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

  const DAYS = t("home.days", { returnObjects: true }) as string[]; // 월~일
  const dayLabel = (dateStr: string) => {
    const js = new Date(dateStr).getDay(); // 0=일 .. 6=토
    return DAYS[(js + 6) % 7]; // 월=0 시작 배열로 매핑
  };

  const quickAccess: Array<{
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    color: string;
    onPress?: () => void;
    /** 투어가 가리키는 칸 (없으면 안 가리킨다) */
    tourId?: string;
  }> = [
    {
      icon: "basket-outline",
      label: t("home.shop"),
      color: "#776ee2",
      onPress: () => router.push("/shop"),
      tourId: "home.shop",
    },
    { icon: "bookmark-outline", label: t("home.challenge"), color: "#FAC775" },
    { icon: "search-outline", label: t("home.dictionary"), color: "#45B7D1" },
    {
      icon: "heart-outline",
      label: t("home.wordbook"),
      color: "#FF6B6B",
      onPress: () => router.push("/word-study"),
    },
  ];

  const avatarBackground = user?.avatar
    ? AVATAR_BACKGROUNDS[mergeAvatarConfig(user.avatar).background]
    : AVATAR_BACKGROUNDS.background_cloud;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={32}
        onScroll={onTourScroll}
      >
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Ionicons name="menu" size={30} color={theme.text} />
          </TouchableOpacity>
          <Text style={styles.username}>{user?.nickname}</Text>
          <TouchableOpacity onPress={() => setNotifOpen(true)}>
            <Ionicons
              name="notifications-outline"
              size={30}
              color={theme.text}
            />
            {unreadNotifs > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>
                  {unreadNotifs > 99 ? "99+" : unreadNotifs}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 스트릭 트래커 */}
        <TouchableOpacity
          onPress={() => setCalendarVisible(true)}
          accessibilityLabel={t("learningStreak.title")}
          accessibilityHint={t("learningStreak.description")}
        >
          <Animated.View
            entering={FadeInDown.delay(100).duration(500)}
            style={styles.card}
          >
            <Text style={styles.streakScope}>{t("learningStreak.title")}</Text>
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
            <Text style={styles.streakDescription}>
              {t("learningStreak.description")}
            </Text>
            <View style={styles.daysRow}>
              {weekly.map((d, i) => {
                const studied = studiedDay(i);
                const isToday = i === weekly.length - 1; // 오른쪽 끝 = 오늘
                return (
                  <View key={d.date} style={styles.dayItem}>
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
                      {dayLabel(d.date)}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* 복구펜 · 연속 목표 */}
            <View style={styles.streakChips}>
              <View style={styles.freezeChip}>
                <Ionicons name="snow" size={14} color="#3BA7F0" />
                <Text style={styles.freezeChipText}>
                  {t("retention.freeze.chip", {
                    n: retention?.freeze.owned ?? user?.streakFreeze ?? 0,
                    max: retention?.freeze.max ?? 2,
                  })}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.goalChip}
                activeOpacity={0.85}
                onPress={() => router.push("/streak-goal")}
              >
                <Ionicons name="trophy" size={14} color="#FFFFFF" />
                <Text style={styles.goalChipText} numberOfLines={1}>
                  {retention?.streakGoal.active
                    ? t("retention.goal.chipActive", {
                        p: retention.streakGoal.active.progress,
                        n: retention.streakGoal.active.days,
                      })
                    : t("retention.goal.chip")}
                </Text>
                <Ionicons name="chevron-forward" size={13} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>

        {/* 복귀 보상 XP 부스트 */}
        {retention?.xpBoost ? (
          <XpBoostBanner
            until={retention.xpBoost.until}
            multiplier={retention.xpBoost.multiplier}
            onEnd={() => patchRetention((r) => ({ ...r, xpBoost: null }))}
          />
        ) : null}

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
              <Ionicons name="person-outline" size={24} color={sideButtonIconColor} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lessonSideBtn}
              activeOpacity={0.85}
              onPress={() => router.push("/courses")}
            >
              <Ionicons name="book-outline" size={24} color={sideButtonIconColor} />
            </TouchableOpacity>
            <TourTarget tourId="home.categories">
              <TouchableOpacity
                style={styles.lessonSideBtn}
                activeOpacity={0.85}
                onPress={() => router.push("/course-categories")}
              >
                <Ionicons
                  name="swap-horizontal"
                  size={24}
                  color={sideButtonIconColor}
                />
              </TouchableOpacity>
            </TourTarget>
            <TouchableOpacity
              style={styles.lessonSideBtn}
              activeOpacity={0.7}
              onPress={() => {
                router.push("/settings");
              }}
            >
              <Ionicons
                name="settings-outline"
                size={24}
                color={sideButtonIconColor}
              />
            </TouchableOpacity>
          </View>

          {/* 캐릭터 — 유저 아바타 (미설정이면 보리쌤). 탭하면 아바타 꾸미기로 */}
          <TouchableOpacity
            style={styles.mascotWrap}
            activeOpacity={0.85}
            onPress={() => router.push("/avatar-editor")}
          >
            <LinearGradient
              colors={[avatarBackground[0], avatarBackground[1]]}
              style={StyleSheet.absoluteFill}
            />
            {user?.avatar && isScene(user.avatar.scene) && (
              <SceneBackdrop scene={user.avatar.scene} living />
            )}
            {user?.avatar ? (
              <AvatarComboStage
                alive={homeFocused}
                avatar={user.avatar}
                size={200}
                streak={user.streak}
                onWordPress={(word) => speakAvatarWord(word, "ko-KR")}
              />
            ) : (
              <HaneulmonMascot size={200} mood="default" />
            )}
          </TouchableOpacity>

          {/* 하단 정보 */}
          <View style={styles.lessonBottom}>
            <View style={styles.lessonBottomLeft}>
              {/* 지금 배우는 코스(언어). 누르면 코스를 바꾸러 간다 */}
              <TouchableOpacity
                style={styles.reviewRate}
                onPress={() => router.push("/courses")}
                accessibilityRole="button"
                accessibilityLabel={t("home.changeCourse")}
              >
                <Text style={styles.courseFlag}>{course.flag}</Text>
                <Text style={styles.reviewRateText}>
                  {t(`courses.languages.${course.key}`)}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={12}
                  color={theme.primary}
                />
              </TouchableOpacity>
              <Text style={styles.lessonTitle} numberOfLines={1}>
                {t(`home.mode.${learnMode}`)}
              </Text>
              {learnProgress ? (
                // 주제 이름이 길면 이름만 줄이고 개수는 늘 보인다
                <View style={styles.progressRow}>
                  <Text
                    style={[styles.lessonSubTitle, styles.progressScope]}
                    numberOfLines={1}
                  >
                    {progressScope}
                  </Text>
                  <Text style={styles.lessonSubTitle}>
                    {` · ${progressCount}`}
                  </Text>
                </View>
              ) : modeHint ? (
                <Text style={styles.lessonSubTitle} numberOfLines={1}>
                  {modeHint}
                </Text>
              ) : learnProgress === undefined ? (
                <View style={styles.progressLineSkeleton} />
              ) : null}
            </View>
            {learnProgress ? (
              <CircleProgress
                percent={learnProgress.percent}
                color={theme.primary}
                textColor={theme.primary}
              />
            ) : learnProgress === undefined ? (
              <View style={styles.ringSkeleton} />
            ) : (
              <View style={styles.modeDisc}>
                <Ionicons
                  name={MODE_ICON[learnMode] ?? "book"}
                  size={24}
                  color={theme.primary}
                />
              </View>
            )}
          </View>

          <TourTarget tourId="home.continue" style={styles.tourBlock}>
            <TouchableOpacity
              style={styles.lessonButton}
              onPress={() =>
                // 저장된 학습 모드가 구독 전용일 수 있다 (체험이 끝난 계정).
                // 화면에서 튕겨내는 것보다 여기서 막는 게 깔끔하다.
                requirePremium(featureOfLearnMode(learnMode), () =>
                  router.push(continuePath),
                )
              }
            >
              <Ionicons name="book" size={18} color="#fff" />
              <Text style={styles.lessonButtonText}>
                {t("home.continueLessonBtn")}
              </Text>
            </TouchableOpacity>
          </TourTarget>
        </Animated.View>

        {/* 첫 7일 출석 선물 (다 받으면 사라진다) */}
        {retention?.checkin ? (
          <CheckinCard
            checkin={retention.checkin}
            onClaimed={setCheckinReward}
          />
        ) : null}

        {/* 오늘의 퀘스트 */}
        {retention ? <DailyQuestsCard quests={retention.quests} /> : null}
        {retention?.monthly ? (
          <MonthlyChallengeCard monthly={retention.monthly} />
        ) : null}

        {/* 순위 배너 — 누르면 전체 학습자 중 내 등수를 1분간 보여준다 */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <TourTarget
            tourId="home.rank"
            style={styles.tourBlock}
            // RankBanner 의 marginHorizontal: 16 / marginBottom: 12 를 걷어낸다
            inset={{ left: 16, right: 16, bottom: 12 }}
          >
            <RankBanner />
          </TourTarget>
        </Animated.View>

        {/* 이번 주 학습 */}
        <TourTarget
          tourId="home.chart"
          style={styles.tourBlock}
          // styles.card 의 marginHorizontal: 16 / marginBottom: 12 를 걷어낸다
          inset={{ left: 16, right: 16, bottom: 12 }}
        >
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
            {weekly.map((d, i) => {
              const segments = CATEGORIES.map((c) => ({
                color: c.color,
                value: d?.categories?.[c.key] ?? 0,
              })).filter((seg) => seg.value > 0);
              const isToday = i === weekly.length - 1;

              return (
                <View key={d.date} style={styles.chartItem}>
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
                    {isToday ? t("home.today") : dayLabel(d.date)}
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
        </TourTarget>

        {/* 복습하기 */}
        <TourTarget
          tourId="home.review"
          style={styles.tourBlock}
          // styles.card 의 marginHorizontal: 16 / marginBottom: 12 를 걷어낸다
          inset={{ left: 16, right: 16, bottom: 12 }}
        >
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
        </TourTarget>

        {/* 바로가기 */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(500)}
          style={styles.card}
        >
          <View style={styles.quickGrid}>
            {quickAccess.map((item) => (
              // 칸 하나만 투어 대상이라 래퍼를 조건부로 씌운다
              <TourItem key={item.label} tourId={item.tourId}>
              <TouchableOpacity
                style={styles.quickItem}
                onPress={item.onPress}
                disabled={!item.onPress}
              >
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
              </TourItem>
            ))}
          </View>
        </Animated.View>

        <View style={styles.quickAccessBottomSpace} />
      </ScrollView>

      {/* 복귀 보상 · 복구펜 사용 알림 · 연속 목표 결과 · 출석 선물 (한 번에 하나) */}
      <RetentionOverlays
        checkinReward={checkinReward}
        onCheckinRewardClose={() => setCheckinReward(null)}
      />

      {/* AI 플로팅 버튼 */}
      <TourTarget tourId="home.ai" style={styles.tourFloating}>
        <FloatingAIButton onPress={() => setChatVisible(true)} positioned={false} />
      </TourTarget>
      <AIChatModal
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        prefill={chatPrefill}
      />

      <NotificationModal
        visible={notifOpen}
        onClose={() => setNotifOpen(false)}
        onUnreadChange={setUnreadNotifs}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    // 벨 아이콘 위에 얹는 안 읽음 개수
    notifBadge: {
      position: "absolute",
      top: -3,
      right: -5,
      minWidth: 19,
      height: 19,
      borderRadius: 999,
      paddingHorizontal: 5,
      backgroundColor: "#FF4B5C",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: theme.bg,
    },
    notifBadgeText: { color: "#fff", fontSize: 10, fontWeight: "900" },
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
    streakChips: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 12,
    },
    freezeChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 12,
      backgroundColor: "#3BA7F01A",
    },
    freezeChipText: { fontSize: 12.5, fontWeight: "900", color: "#2180C4" },
    goalChip: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 12,
      backgroundColor: "#FF7A00",
      borderBottomWidth: 3,
      borderBottomColor: "#D45F00",
    },
    goalChipText: {
      flexShrink: 1,
      fontSize: 12.5,
      fontWeight: "900",
      color: "#FFFFFF",
    },
    streakScope: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.textSecondary,
      marginBottom: 6,
    },
    streakDescription: {
      fontSize: 12,
      lineHeight: 18,
      color: theme.textSecondary,
      marginBottom: 12,
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
      backgroundColor: theme.bg === "#15151D" ? "#292837" : "#FFFFFF",
      borderWidth: 2,
      borderColor: theme.bg === "#15151D" ? "#B7AFFA" : "#6659CB",
      borderBottomWidth: 4,
      borderBottomColor: theme.bg === "#15151D" ? "#8176DF" : "#5145AE",
      shadowColor: "#171341",
      shadowOpacity: 0.28,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 8,
    },
    lessonSideBtnPrimary: {
      backgroundColor: theme.primary, // + 버튼은 강조 (꽉 채운 색)
      borderColor: theme.primary,
      borderBottomColor: "#5C56B8", // 진한 보라
      shadowOpacity: 0.25,
    },
    mascotWrap: {
      width: "100%",
      height: 240,
      alignItems: "center",
      justifyContent: "flex-end",
      borderRadius: 24,
      overflow: "hidden",
      marginBottom: 8,
    },
    lessonBottom: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
      marginRight: 20,
      marginTop: 20,
    },
    lessonBottomLeft: {
      flex: 1,
      minWidth: 0,
      gap: 4,
      marginRight: 12,
    },
    courseFlag: {
      fontSize: 13,
    },
    progressRow: {
      flexDirection: "row",
      alignItems: "baseline",
      minWidth: 0,
    },
    progressScope: {
      flexShrink: 1,
    },
    progressLineSkeleton: {
      width: 120,
      height: 12,
      marginTop: 3,
      borderRadius: 6,
      backgroundColor: theme.border,
    },
    ringSkeleton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      borderWidth: 6,
      borderColor: theme.border,
    },
    modeDisc: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary + "1A",
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
      paddingVertical: 10,
    },
    chartItem: {
      flex: 1,
      alignItems: "center",
      gap: 8,
    },
    chartBarWrap: {
      height: CHART_HEIGHT,
      width: "50%",
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
      fontSize: 10,
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
    quickAccessBottomSpace: { height: 180 },
    // 투어 대상을 감싸는 래퍼. 원래 자식이 가지고 있던 바깥 여백을
    // 여기로 옮기지 않으면 스포트라이트가 여백까지 뚫어서 커 보인다.
    tourBlock: { alignSelf: "stretch" },
    // 플로팅 버튼은 원래 자기가 absolute 였다. 래퍼가 그 자리를 대신 잡고
    // 버튼은 bottom={0} 으로 안에 눕힌다 (안 그러면 두 번 띄워진다).
    tourFloating: { position: "absolute", right: 16, bottom: 130, zIndex: 40 },
  });
/**
 * 투어 대상일 때만 래퍼를 씌운다.
 *
 * 바로가기는 네 칸이 `flex: 1` 로 균등하게 나뉜다. 한 칸만 View 로 한 겹 더
 * 감싸면 그 칸의 flex 가 래퍼로 옮겨 가서 **폭이 어긋난다.** 래퍼에도 flex: 1
 * 을 줘야 원래대로 보인다.
 */
const TOUR_ITEM = { flex: 1 } as const;
function TourItem({
  tourId,
  children,
}: {
  tourId?: string;
  children: React.ReactNode;
}) {
  if (!tourId) return <>{children}</>;
  return (
    <TourTarget tourId={tourId} style={TOUR_ITEM}>
      {children}
    </TourTarget>
  );
}

function setUserData(arg0: any): any {
  throw new Error("Function not implemented.");
}
