"use client";

import { SceneBackdrop, isScene } from "../../../shared/ui/avatar-scene";
import { mergeAvatarConfig } from "../../../shared/model/avatar";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  HOME_CATEGORIES,
  HOME_MODE_LABELS,
  dayTotal,
  fallbackWeek,
  formatStudyTime,
  weekdayLabel,
  type HomeDayStats,
  type HomeUser,
} from "../model/home-data";
import { HomeCalendar } from "./home-calendar";
import { HomeIcon, type HomeIconName } from "./home-icon";
import {
  LEARN_COURSES,
  canUseLearningFeature,
  continueLearningDestination,
  learnCourseOf,
  type LearnMode,
  type LearningFeature,
} from "../../learning/model/learning-options";
import { getLearnProgress, type LearnProgress } from "../api/learn-progress";
import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { AiChatSheet } from "./ai-chat-sheet";
import { NotificationSheet } from "./notification-sheet";
import { RankBanner } from "./rank-banner";
import { AVATAR_BACKGROUNDS } from "../../league/ui/generated-avatar";
import { AvatarComboStage } from "../../profile/ui/avatar-combo-stage";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import styles from "./home-screen.module.css";
import { HomeTour } from "../../tour/home-tour";
import { getRetentionSummary } from "../../retention/api/retention";
import type { RetentionSummary } from "../../retention/model/retention";
import { questsGlance } from "../../retention/model/quest-meta";
import {
  CheckinCard,
  RetentionOverlays,
  StreakChips,
  XpBoostBanner,
} from "../../retention/ui/home-retention";
import { energySpendsSettled } from "../../energy/energy-sync";
import { setLevelUp, takeQueuedLevelUp } from "../../level-up/model/level-up";

interface QuickAccessItem {
  color: string;
  icon: HomeIconName;
  label: string;
  /** 없으면 아직 준비 중인 칸 — 앱처럼 눌리지 않는다 */
  route?: string;
}

// 앱 홈의 바로가기와 같다: 상점·퀘스트·단어장이 열려 있고 사전은 준비 중
const QUICK_ACCESS: QuickAccessItem[] = [
  { color: "#776ee2", icon: "basket", label: "Do'kon", route: "/shop" },
  { color: "#FAC775", icon: "bookmark", label: "Vazifalar", route: "/quests" },
  { color: "#45b7d1", icon: "searchOutline", label: "Lug'at" },
  {
    color: "#ff6b6b",
    icon: "heartOutline",
    label: "So'z daftarim",
    route: "/word-study",
  },
];

/** 앱 features/subscription/access.ts featureOfLearnMode 와 같다 */
function featureOfLearnMode(mode: string | undefined): LearningFeature {
  switch (mode) {
    case "grammar":
      return "grammar";
    case "expression":
    case "speaking":
      return "expression";
    case "listening":
      return "listening";
    case "topik":
      return "topik";
    case "conversation":
      return "tutor";
    case "alphabet":
      return "hangul";
    default:
      return "lesson";
  }
}

/** 셀 진도가 없는 모드(대화·글자)는 링 대신 이 아이콘과 한 줄 소개 (앱 홈과 같다) */
const MODE_ICON: Partial<Record<LearnMode, IoniconName>> = {
  conversation: "chatbubbles",
  alphabet: "text",
};
const MODE_HINT: Partial<Record<LearnMode, string>> = {
  conversation: "home.modeHint.conversation",
  alphabet: "home.modeHint.alphabet",
};

/**
 * "2-bo'lim · 12/40 dars". 번역기가 틀 단위로 갈아 끼우게 조각마다 data-i18n 을 단다 —
 * 번역된 글자를 다른 틀에 끼워 넣으면 그 틀이 안 맞아 번역이 안 붙는다.
 * 주제 이름은 서버가 이미 그 말로 줘서 번역하지 않는다.
 */
function ProgressLine({ progress }: { progress: LearnProgress }) {
  const scopeKey = `home.progress.scope.${progress.scope}`;
  const countKey = `home.progress.count.${progress.unit}`;
  const n =
    progress.scope === "topik"
      ? progress.scopeNumber === 2
        ? "II"
        : "I"
      : progress.scopeNumber;
  return (
    <p className={styles.progressLine}>
      {progress.title ? (
        <span className={styles.progressScope} data-no-translate>
          {progress.title}
        </span>
      ) : (
        <span className={styles.progressScope} data-i18n={scopeKey}>
          {uzt(scopeKey, { n })}
        </span>
      )}
      <span aria-hidden className={styles.progressDot}>
        ·
      </span>
      <span className={styles.progressCount} data-i18n={countKey}>
        {uzt(countKey, { done: progress.done, total: progress.total })}
      </span>
    </p>
  );
}

const SIDE_ACTIONS: Array<{
  icon: HomeIconName;
  label: string;
  route?: string;
}> = [
  { icon: "person", label: "Profil", route: "/profile" },
  { icon: "book", label: "Kurslar", route: "/courses" },
  { icon: "swap", label: "Yo'nalish", route: "/course-categories" },
  { icon: "settings", label: "Sozlamalar", route: "/settings" },
];

function ProgressRing({ value }: { value: number }) {
  const progress = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      aria-label={`O'quv jarayoni ${progress}%`}
      className={styles.progressRing}
      style={{ "--progress": `${progress * 3.6}deg` } as CSSProperties}
    >
      <span>{progress}%</span>
    </div>
  );
}

function UserArtwork({
  user,
  onPress,
  onWordPress,
}: {
  user: HomeUser;
  onPress: () => void;
  onWordPress: (word: string) => void;
}) {
  const avatar = user.avatar ? mergeAvatarConfig(user.avatar) : null;
  const background = avatar
    ? (AVATAR_BACKGROUNDS[avatar.background] ??
      AVATAR_BACKGROUNDS.background_cloud)
    : AVATAR_BACKGROUNDS.background_cloud;
  return (
    <div
      aria-label="Avatarni tahrirlash"
      className={styles.avatarArtworkButton}
      onClick={onPress}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onPress();
        }
      }}
      role="button"
      style={
        {
          "--avatar-from": background[0],
          "--avatar-to": background[1],
        } as CSSProperties
      }
      tabIndex={0}
    >
      {avatar && isScene(avatar.scene) ? (
        <SceneBackdrop scene={avatar.scene} living />
      ) : null}
      {avatar ? (
        <span className={styles.generatedArtwork}>
          <AvatarComboStage
            alive
            avatar={avatar}
            onWordPress={onWordPress}
            streak={user.streak}
            userId={user.id}
          />
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          className={styles.mascotArtwork}
          src="/characters/hangulmon_default.png"
        />
      )}
    </div>
  );
}

export function HomeScreen() {
  const router = useRouter();
  const { request, user: authenticatedUser } = useTelegramAuth();
  const { speak: speakAvatarWord } = useKoreanSpeech(request);
  const [profile, setProfile] = useState<HomeUser | null>(authenticatedUser);
  // 지금 코스·모드의 진행도. undefined = 아직 모름, null = 셀 게 없는 모드
  const [learnProgress, setLearnProgress] = useState<{
    key: string;
    value: LearnProgress | null;
  } | null>(null);
  const [week, setWeek] = useState<HomeDayStats[]>(fallbackWeek);
  const [unreadCount, setUnreadCount] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  // 리텐션 — 복구펜·퀘스트·출석·복귀·XP 부스트·연속 목표 (서버 요약 하나, 앱 홈과 같다)
  const [retention, setRetention] = useState<RetentionSummary | null>(null);
  const [checkinReward, setCheckinReward] = useState<{
    day: number;
    gems: number;
    superDays: number;
    swapped?: boolean;
  } | null>(null);
  const patchRetention = useCallback(
    (fn: (summary: RetentionSummary) => RetentionSummary) =>
      setRetention((current) => (current ? fn(current) : current)),
    [],
  );
  const questGlance = questsGlance(retention);

  // 섹션을 끝낸 축하 화면들을 지나 홈으로 왔으면 여기서 레벨업 연출 (로드맵과 같다)
  useEffect(() => {
    const queued = takeQueuedLevelUp();
    if (!queued) return;
    setLevelUp(queued);
    router.push("/level-up");
  }, [router]);

  useEffect(() => {
    if (!authenticatedUser) return;
    if (!authenticatedUser.isOnboardingCompleted) {
      router.replace("/onboarding");
      return;
    }

    let active = true;
    // 요약이 먼저 연속을 맞춘다(복구펜 자동 사용·목표 판정) — 그 뒤에 계정 값을 받는다
    void getRetentionSummary(request)
      .then((summary) => {
        if (!active) return;
        setRetention(summary);
        setProfile((current) =>
          current
            ? { ...current, gems: summary.gems, streak: summary.streak }
            : current,
        );
      })
      .catch(() => undefined);
    // 레슨에서 막 나왔으면 마지막 에너지 차감이 서버에 닿은 뒤에 묻는다
    void energySpendsSettled()
      .then(() =>
        Promise.allSettled([
          request<HomeUser>("/users/me"),
          request<{ days: HomeDayStats[] }>("/users/me/stats/weekly"),
          request<{ count: number }>("/notifications/unread-count"),
        ]),
      )
      .then(([userResult, weekResult, notificationsResult]) => {
        if (!active) return;
        if (userResult.status === "fulfilled") setProfile(userResult.value);
        if (
          weekResult.status === "fulfilled" &&
          weekResult.value.days.length > 0
        ) {
          setWeek(weekResult.value.days);
        }
        if (notificationsResult.status === "fulfilled") {
          setUnreadCount(notificationsResult.value.count);
        }
      });

    return () => {
      active = false;
    };
  }, [authenticatedUser, request, router]);

  // 진행도는 코스·모드가 정해진 뒤에 묻는다 — 계정 값이 바뀌면(모드 변경) 다시
  const learnCourse = learnCourseOf(profile?.learnCourse);
  const learnMode = (profile?.learnMode ?? "vocabulary") as LearnMode;
  const studyMode = profile?.studyMode ?? "guided";
  const topikLevel = profile?.topikLevel ?? "1";
  const progressKey = `${learnCourse}:${learnMode}:${studyMode}:${topikLevel}`;
  useEffect(() => {
    if (!profile?.isOnboardingCompleted) return;
    let active = true;
    void getLearnProgress(request, {
      course: learnCourse,
      mode: learnMode,
      studyMode,
      topikLevel,
    })
      .then(({ progress }) => {
        if (active) setLearnProgress({ key: progressKey, value: progress });
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [
    profile?.isOnboardingCompleted,
    request,
    learnCourse,
    learnMode,
    studyMode,
    topikLevel,
    progressKey,
  ]);

  const summary = useMemo(() => {
    const studySeconds = week.reduce(
      (sum, day) => sum + (day.studyTimeSeconds ?? 0),
      0,
    );
    const questions = week.reduce(
      (sum, day) => sum + (day.totalQuestions ?? 0),
      0,
    );
    const maximum = Math.max(1, ...week.map(dayTotal));
    return { maximum, questions, studySeconds };
  }, [week]);

  if (!profile || !profile.isOnboardingCompleted) return null;

  const course = LEARN_COURSES[learnCourse];
  const courseKey = `userCourses.list.${course.key}`;
  const modeKey = HOME_MODE_LABELS[learnMode]
    ? `home.mode.${learnMode}`
    : "home.mode.vocabulary";
  const progress =
    learnProgress?.key === progressKey ? learnProgress.value : undefined;
  const hintKey = MODE_HINT[learnMode];

  return (
    <main className={styles.homePage}>
      <div className={styles.homeScroll}>
        <header className={styles.header}>
          <button
            aria-label="Menyu"
            className={styles.headerButton}
            onClick={() => router.push("/settings")}
            type="button"
          >
            <HomeIcon name="menu" size={29} />
          </button>
          <strong className={styles.username}>{profile.nickname}</strong>
          <button
            aria-label="Bildirishnomalar"
            className={styles.headerButton}
            onClick={() => setNotificationsOpen(true)}
            type="button"
          >
            <HomeIcon name="bell" size={28} />
            {unreadCount > 0 ? (
              <span className={styles.notificationBadge}>
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            ) : null}
          </button>
        </header>

        {/* 카드 전체를 누르면 달력 — 안에 목표 칩(버튼)이 들어가서 button 대신 div (button 안 button 은 안 된다) */}
        <div
          className={`${styles.card} ${styles.streakCard}`}
          onClick={() => setCalendarOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setCalendarOpen(true);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <span className={styles.streakHeading}>
            <span>
              <HomeIcon name="flame" size={18} />
              <span className={styles.streakSummary}>
                <span data-i18n="learningStreak.title">
                  {uzt("learningStreak.title")}
                </span>
                <b data-i18n="learningStreak.days">
                  {uzt("learningStreak.days", { count: profile.streak ?? 0 })}
                </b>
              </span>
            </span>
            <span className={styles.cardLink}>
              Taqvim <HomeIcon name="chevron" size={14} />
            </span>
          </span>
          {/* <p className={styles.streakDescription} data-i18n="learningStreak.description">
            {uzt("learningStreak.description")}
          </p> */}
          <span className={styles.daysRow}>
            {week.map((day, index) => {
              const studied =
                (day.totalQuestions ?? 0) > 0 || (day.xpEarned ?? 0) > 0;
              const today = index === week.length - 1;
              return (
                <span className={styles.dayItem} key={day.date}>
                  <span
                    className={[
                      styles.dayCircle,
                      studied ? styles.dayCompleted : "",
                      today ? styles.dayToday : "",
                    ].join(" ")}
                  >
                    {studied ? (
                      <HomeIcon name="check" size={14} />
                    ) : today ? (
                      <HomeIcon name="flame" size={14} />
                    ) : null}
                  </span>
                  <small className={today ? styles.todayLabel : ""}>
                    {weekdayLabel(day.date)}
                  </small>
                </span>
              );
            })}
          </span>

          {/* 복구펜 · 연속 목표 (앱처럼 스트릭 카드 안) */}
          <StreakChips summary={retention} />
        </div>

        {/* 복귀 보상 XP 부스트 */}
        {retention?.xpBoost ? (
          <XpBoostBanner
            multiplier={retention.xpBoost.multiplier}
            onEnd={() =>
              patchRetention((summary) => ({ ...summary, xpBoost: null }))
            }
            until={retention.xpBoost.until}
          />
        ) : null}

        <section className={`${styles.card} ${styles.lessonCard}`}>
          <div className={styles.sideActions}>
            {SIDE_ACTIONS.map((action) => (
              <button
                aria-label={action.label}
                data-tour={
                  action.route === "/course-categories"
                    ? "home.categories"
                    : undefined
                }
                key={action.label}
                onClick={() => {
                  if (action.route) router.push(action.route);
                }}
                type="button"
              >
                <HomeIcon name={action.icon} size={22} />
              </button>
            ))}
          </div>

          <div className={styles.artworkWrap}>
            <UserArtwork
              onPress={() => router.push("/avatar-editor")}
              onWordPress={speakAvatarWord}
              user={profile}
            />
          </div>

          <div className={styles.lessonSummary}>
            <div>
              {/* 지금 배우는 코스(언어). 누르면 코스를 바꾸러 간다 */}
              <button
                aria-label={uzt("home.changeCourse")}
                className={styles.reviewRate}
                onClick={() => router.push("/courses")}
                type="button"
              >
                <span
                  aria-hidden
                  className={styles.courseFlag}
                  data-no-translate
                >
                  {course.flag}
                </span>
                <span data-i18n={courseKey}>{uzt(courseKey)}</span>
                <HomeIcon name="chevron" size={12} />
              </button>
              <h1 data-i18n={modeKey}>{uzt(modeKey)}</h1>
              {progress ? (
                <ProgressLine progress={progress} />
              ) : progress === null && hintKey ? (
                <p className={styles.progressLine} data-i18n={hintKey}>
                  {uzt(hintKey)}
                </p>
              ) : progress === undefined ? (
                <span aria-hidden className={styles.progressLineSkeleton} />
              ) : null}
            </div>
            {progress ? (
              <ProgressRing value={progress.percent} />
            ) : progress === undefined ? (
              <span aria-hidden className={styles.ringSkeleton} />
            ) : (
              <span aria-hidden className={styles.modeDisc}>
                <MobileIcon name={MODE_ICON[learnMode] ?? "book"} size={24} />
              </span>
            )}
          </div>

          <button
            className={styles.continueButton}
            data-tour="home.continue"
            onClick={() => {
              // 저장된 학습 모드가 구독 전용일 수 있다 (체험이 끝난 계정) —
              // 화면에 들어가서 튕기는 것보다 여기서 요금제로 보내는 게 깔끔하다
              const feature = featureOfLearnMode(profile.learnMode);
              router.push(
                canUseLearningFeature(profile, feature)
                  ? continueLearningDestination(profile)
                  : "/premium",
              );
            }}
            type="button"
          >
            <HomeIcon name="book" size={18} />
            Davom etish
          </button>
        </section>

        {/* 첫 7일 출석 선물 (다 받으면 사라진다) */}
        {retention?.checkin ? (
          <CheckinCard
            checkin={retention.checkin}
            onClaimed={setCheckinReward}
            patch={patchRetention}
          />
        ) : null}

        {/* 오늘의 퀘스트·월간 챌린지는 바로가기 "Vazifalar" → /quests 로 옮겼다 (홈이 너무 붐볐다) */}

        {/* 순위 배너 — 누르면 전체 학습자 중 내 등수를 1분간 보여 준다 (앱과 같다) */}
        <div className={styles.rankSlot} data-tour="home.rank">
          <RankBanner />
        </div>

        <section
          className={`${styles.card} ${styles.chartCard}`}
          data-tour="home.chart"
        >
          <button
            className={styles.cardHeader}
            onClick={() => router.push("/stats")}
            type="button"
          >
            <strong>O&apos;quv ma&apos;lumoti</strong>
            <HomeIcon name="chevron" size={20} />
          </button>

          <div className={styles.legend}>
            {HOME_CATEGORIES.map((category) => (
              <span key={category.key}>
                <i style={{ backgroundColor: category.color }} />
                {category.label}
              </span>
            ))}
          </div>

          <div className={styles.chart}>
            {week.map((day, index) => {
              const segments = HOME_CATEGORIES.map((category) => ({
                ...category,
                value: day.categories?.[category.key] ?? 0,
              })).filter((segment) => segment.value > 0);
              const today = index === week.length - 1;
              return (
                <div className={styles.chartColumn} key={day.date}>
                  <div className={styles.chartBar}>
                    {segments.length > 0 ? (
                      segments.map((segment) => (
                        <i
                          key={segment.key}
                          style={{
                            backgroundColor: segment.color,
                            height: Math.max(
                              6,
                              (segment.value / summary.maximum) * 66,
                            ),
                          }}
                        />
                      ))
                    ) : (
                      <i className={styles.emptyBar} />
                    )}
                  </div>
                  <small className={today ? styles.todayLabel : ""}>
                    {today ? "Bugun" : weekdayLabel(day.date)}
                  </small>
                </div>
              );
            })}
          </div>

          <div className={styles.weekSummary}>
            <span>
              <b>O&apos;qish vaqti</b>
              <strong>{formatStudyTime(summary.studySeconds)}</strong>
            </span>
            <span>
              <b>Savol</b>
              <strong>{summary.questions > 0 ? summary.questions : "-"}</strong>
            </span>
          </div>
        </section>

        <button
          className={`${styles.card} ${styles.reviewCard}`}
          data-tour="home.review"
          onClick={() => router.push("/practice")}
          type="button"
        >
          <span className={styles.reviewIcon}>
            <HomeIcon name="refresh" size={21} />
          </span>
          <span>
            <strong>Takrorlash</strong>
            <small>Xato savollar · Takrorlash</small>
          </span>
          <HomeIcon name="chevron" size={17} />
        </button>

        <section className={`${styles.card} ${styles.quickGrid}`}>
          {QUICK_ACCESS.map((item) => (
            <button
              data-tour={item.route === "/shop" ? "home.shop" : undefined}
              disabled={!item.route}
              key={item.label}
              onClick={() => {
                if (item.route) router.push(item.route);
              }}
              type="button"
            >
              <span
                style={{
                  backgroundColor: `${item.color}20`,
                  color: item.color,
                }}
              >
                <HomeIcon name={item.icon} size={22} />
                {/* 퀘스트 — 오늘 몇 개 끝냈나, 받을 보상이 있으면 점 */}
                {item.route === "/quests" && questGlance ? (
                  <>
                    <b className={styles.quickCount} data-no-translate>
                      {questGlance.done}/{questGlance.total}
                    </b>
                    {questGlance.claimable ? <i className={styles.quickDot} /> : null}
                  </>
                ) : null}
              </span>
              <small>{item.label}</small>
            </button>
          ))}
        </section>
      </div>

      <button
        aria-label="KORIO AI"
        className={styles.aiButton}
        data-tour="home.ai"
        onClick={() => setChatOpen(true)}
        type="button"
      >
        <HomeIcon name="sparkles" size={24} />
        <span>AI</span>
      </button>

      <nav aria-label="Asosiy navigatsiya" className={styles.bottomNav}>
        <button className={styles.navActive} type="button">
          <HomeIcon name="home" size={23} />
          <span>Asosiy</span>
        </button>
        <button onClick={() => router.push("/stats")} type="button">
          <HomeIcon name="chart" size={23} />
          <span>Statistika</span>
        </button>
        <button onClick={() => router.push("/league")} type="button">
          <HomeIcon name="trophy" size={23} />
          <span>Liga</span>
        </button>
        <button onClick={() => router.push("/premium")} type="button">
          <HomeIcon name="ribbon" size={23} />
          <span>Premium</span>
        </button>
      </nav>

      <NotificationSheet
        onClose={() => setNotificationsOpen(false)}
        onUnreadChange={setUnreadCount}
        visible={notificationsOpen}
      />
      <AiChatSheet onClose={() => setChatOpen(false)} visible={chatOpen} />
      {/* 처음 온 사람에게 한 번 도는 기능 안내 (설정에서 다시 보기 가능) — 앱 HOME_TOUR */}
      <HomeTour />

      {calendarOpen ? (
        <HomeCalendar
          fallbackLongestStreak={profile.longestStreak ?? 0}
          fallbackStreak={profile.streak ?? 0}
          onClose={() => setCalendarOpen(false)}
        />
      ) : null}

      {/* 복귀 보상 · 복구펜 사용 알림 · 연속 목표 결과 · 출석 선물 (한 번에 하나) */}
      <RetentionOverlays
        checkinReward={checkinReward}
        onCheckinRewardClose={() => setCheckinReward(null)}
        patch={patchRetention}
        summary={retention}
      />
    </main>
  );
}
