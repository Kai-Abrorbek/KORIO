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
import { continueLearningDestination } from "../../learning/model/learning-options";
import styles from "./home-screen.module.css";

interface QuickAccessItem {
  color: string;
  icon: HomeIconName;
  label: string;
}

const QUICK_ACCESS: QuickAccessItem[] = [
  { color: "#776ee2", icon: "shop", label: "Do'kon" },
  { color: "#d9a72e", icon: "target", label: "Vazifalar" },
  { color: "#45b7d1", icon: "search", label: "Lug'at" },
  { color: "#ff6b6b", icon: "heart", label: "So'z daftarim" },
];

const SIDE_ACTIONS: Array<{
  icon: HomeIconName;
  label: string;
  route?: string;
}> = [
  { icon: "person", label: "Profil" },
  { icon: "book", label: "Kurslar", route: "/courses" },
  { icon: "swap", label: "Yo'nalish", route: "/course-categories" },
  { icon: "settings", label: "Sozlamalar" },
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

function UserArtwork({ user }: { user: HomeUser }) {
  if (user.profileImage) {
    return (
      // Telegram이 서명한 사용자 프로필 URL이라 호스트가 고정되지 않는다.
      // eslint-disable-next-line @next/next/no-img-element
      <img alt="" className={styles.userArtwork} src={user.profileImage} />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      className={styles.mascotArtwork}
      src="/characters/hangulmon_default.png"
    />
  );
}

export function HomeScreen() {
  const router = useRouter();
  const { request, user: authenticatedUser } = useTelegramAuth();
  const [profile, setProfile] = useState<HomeUser | null>(authenticatedUser);
  const [week, setWeek] = useState<HomeDayStats[]>(fallbackWeek);
  const [unreadCount, setUnreadCount] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);

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
          <button aria-label="Menyu" className={styles.headerButton} type="button">
            <HomeIcon name="menu" size={29} />
          </button>
          <strong className={styles.username}>{profile.nickname}</strong>
          <button
            aria-label="Bildirishnomalar"
            className={styles.headerButton}
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
            <UserArtwork user={profile} />
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
            onClick={() => router.push(continueLearningDestination(profile))}
            type="button"
          >
            <HomeIcon name="book" size={18} />
            Davom etish
          </button>
        </section>

        <button className={styles.levelBanner} type="button">
          <HomeIcon name="sparkles" size={21} />
          <span>
            <strong>Mening koreys darajam?</strong>
            <small>Daraja testi · 3 daqiqa yetarli</small>
          </span>
          <HomeIcon name="arrow" size={21} />
        </button>

        <section className={`${styles.card} ${styles.chartCard}`}>
          <button className={styles.cardHeader} type="button">
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

        <button className={`${styles.card} ${styles.reviewCard}`} type="button">
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
            <button key={item.label} type="button">
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

      <button aria-label="KORIO AI" className={styles.aiButton} type="button">
        <HomeIcon name="sparkles" size={24} />
        <span>AI</span>
      </button>

      <nav aria-label="Asosiy navigatsiya" className={styles.bottomNav}>
        <button className={styles.navActive} type="button">
          <HomeIcon name="home" size={23} />
          <span>Asosiy</span>
        </button>
        <button type="button">
          <HomeIcon name="chart" size={23} />
          <span>Statistika</span>
        </button>
        <button type="button">
          <HomeIcon name="trophy" size={23} />
          <span>Liga</span>
        </button>
        <button type="button">
          <HomeIcon name="ribbon" size={23} />
          <span>Premium</span>
        </button>
      </nav>

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
