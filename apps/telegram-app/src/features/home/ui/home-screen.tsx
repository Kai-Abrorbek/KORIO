"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
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
  canUseLearningFeature,
  continueLearningDestination,
  type LearningFeature,
} from "../../learning/model/learning-options";
import { AiChatSheet } from "./ai-chat-sheet";
import { NotificationSheet } from "./notification-sheet";
import { RankBanner } from "./rank-banner";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import styles from "./home-screen.module.css";
import { HomeTour } from "../../tour/home-tour";

interface QuickAccessItem {
  color: string;
  icon: HomeIconName;
  label: string;
  /** 없으면 아직 준비 중인 칸 — 앱처럼 눌리지 않는다 */
  route?: string;
}

// 앱 홈의 바로가기와 같다: 상점·단어장만 열려 있고 과제·사전은 준비 중
const QUICK_ACCESS: QuickAccessItem[] = [
  { color: "#776ee2", icon: "basket", label: "Do'kon", route: "/shop" },
  { color: "#FAC775", icon: "bookmark", label: "Vazifalar" },
  { color: "#45b7d1", icon: "searchOutline", label: "Lug'at" },
  { color: "#ff6b6b", icon: "heartOutline", label: "So'z daftarim", route: "/word-study" },
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
    default:
      return "lesson";
  }
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

function UserArtwork({ user, onPress }: { user: HomeUser; onPress: () => void }) {
  return (
    <button aria-label="Avatarni tahrirlash" className={styles.avatarArtworkButton} onClick={onPress} type="button">
      {user.avatar ? (
        <span className={styles.generatedArtwork}><GeneratedAvatar avatar={user.avatar} variant="full" /></span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="" className={styles.mascotArtwork} src="/characters/hangulmon_default.png" />
      )}
    </button>
  );
}

export function HomeScreen() {
  const router = useRouter();
  const { request, user: authenticatedUser } = useTelegramAuth();
  const [profile, setProfile] = useState<HomeUser | null>(authenticatedUser);
  const [week, setWeek] = useState<HomeDayStats[]>(fallbackWeek);
  const [unreadCount, setUnreadCount] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (!authenticatedUser) return;
    if (!authenticatedUser.isOnboardingCompleted) {
      router.replace("/onboarding");
      return;
    }

    let active = true;
    void Promise.allSettled([
      request<HomeUser>("/users/me"),
      request<{ days: HomeDayStats[] }>("/users/me/stats/weekly"),
      request<{ count: number }>("/notifications/unread-count"),
    ]).then(([userResult, weekResult, notificationsResult]) => {
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

  const progress = profile.currentUnitProgress ?? 0;
  const modeLabel =
    HOME_MODE_LABELS[profile.learnMode ?? "vocabulary"] ??
    HOME_MODE_LABELS.vocabulary;

  return (
    <main className={styles.homePage}>
      <div className={styles.homeScroll}>
        <header className={styles.header}>
          <button aria-label="Menyu" className={styles.headerButton} onClick={() => router.push("/settings")} type="button">
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

        <button
          className={`${styles.card} ${styles.streakCard}`}
          onClick={() => setCalendarOpen(true)}
          type="button"
        >
          <span className={styles.streakHeading}>
            <span>
              <HomeIcon name="flame" size={18} />
              <b>{profile.streak ?? 0}</b> kun ketma-ket
            </span>
            <span className={styles.cardLink}>
              Taqvim <HomeIcon name="chevron" size={14} />
            </span>
          </span>
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
        </button>

        <section className={`${styles.card} ${styles.lessonCard}`}>
          <div className={styles.sideActions}>
            {SIDE_ACTIONS.map((action) => (
              <button
                aria-label={action.label}
                data-tour={action.route === "/course-categories" ? "home.categories" : undefined}
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
            <UserArtwork onPress={() => router.push("/avatar-editor")} user={profile} />
          </div>

          <div className={styles.lessonSummary}>
            <div>
              <button className={styles.reviewRate} type="button">
                <span className={styles.checkDisc}>
                  <HomeIcon name="check" size={10} />
                </span>
                Takrorlash natijasi {Math.round(progress)}%
                <HomeIcon name="chevron" size={12} />
              </button>
              <h1>{modeLabel}</h1>
              <p>Kunlik maqsad</p>
            </div>
            <ProgressRing value={progress} />
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

        {/* 순위 배너 — 누르면 전체 학습자 중 내 등수를 1분간 보여 준다 (앱과 같다) */}
        <div className={styles.rankSlot} data-tour="home.rank">
          <RankBanner />
        </div>

        <section className={`${styles.card} ${styles.chartCard}`} data-tour="home.chart">
          <button className={styles.cardHeader} onClick={() => router.push("/stats")} type="button">
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

        <button className={`${styles.card} ${styles.reviewCard}`} data-tour="home.review" onClick={() => router.push("/practice")} type="button">
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
              </span>
              <small>{item.label}</small>
            </button>
          ))}
        </section>
      </div>

      <button aria-label="KORIO AI" className={styles.aiButton} data-tour="home.ai" onClick={() => setChatOpen(true)} type="button">
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
    </main>
  );
}
