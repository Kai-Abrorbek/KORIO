"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import topikUz from "../../../shared/i18n/locales/topik/uz";
import { getTopikHistory } from "../api/topik";
import type { TopikHistoryItem } from "../model/topik";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import styles from "./topik-sections-screen.module.css";

type TopikSection = "reading" | "listening" | "writing";

interface SectionOption {
  key: TopikSection;
  icon: IoniconName;
}

const SECTIONS: SectionOption[] = [
  {
    key: "reading",
    icon: "book-outline",
  },
  {
    key: "listening",
    icon: "headset-outline",
  },
  {
    key: "writing",
    icon: "create-outline",
  },
];

export function TopikSectionsScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request, user } = useTelegramAuth();
  const level = params.get("level") === "1" ? "1" : "2";
  const roman = level === "1" ? "I" : "II";
  const sections = SECTIONS.filter(
    (section) => level === "2" || section.key !== "writing",
  );
  const premium = Boolean(
    user?.isSuper &&
    (!user.superExpiresAt ||
      new Date(user.superExpiresAt).getTime() > Date.now()),
  );
  const [recent, setRecent] = useState<TopikHistoryItem | null>(null);

  const loadRecent = useCallback(async () => {
    if (!premium) return;
    try {
      const items = await getTopikHistory(
        request,
        level === "1" ? "topik_i" : "topik_ii",
        undefined,
        1,
      );
      setRecent(items[0] ?? null);
    } catch {
      setRecent(null);
    }
  }, [level, premium, request]);

  useEffect(() => {
    void loadRecent();
  }, [loadRecent]);
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === "visible") void loadRecent();
    };
    document.addEventListener("visibilitychange", refresh);
    return () => document.removeEventListener("visibilitychange", refresh);
  }, [loadRecent]);

  const openSection = (section: TopikSection) => {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
    router.push(`/topik?level=${level}&section=${section}`);
  };

  const openRecent = () => {
    if (!recent) return;
    router.push(
      recent.section === "writing"
        ? `/topik-writing?examCode=${encodeURIComponent(recent.examCode)}&reviewAttemptId=${encodeURIComponent(recent.attemptId)}`
        : `/topik-result?attemptId=${encodeURIComponent(recent.attemptId)}`,
    );
  };

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/course-categories");
  };

  if (!premium) {
    return (
      <main className={`${styles.screen} ${styles.lockedScreen}`}>
        <header className={styles.header}>
          <button aria-label="Orqaga" onClick={goBack} type="button">
            <MobileIcon name="chevron-back" size={24} />
          </button>
          <div>
            <small>IMTIHONGA TAYYORGARLIK</small>
            <strong>TOPIK {roman}</strong>
          </div>
          <span>
            <MobileIcon name="ribbon-outline" size={20} />
          </span>
        </header>
        <section className={styles.lockedCard}>
          <span>
            <MobileIcon name="lock-closed" size={34} />
          </span>
          <h1>TOPIK tayyorgarligi — Premium</h1>
          <p>
            TOPIK savollari, bosqichli izohlar va natija tahlili KORIO Premium
            bilan ochiladi.
          </p>
          <button onClick={() => router.push("/premium")} type="button">
            Premiumni ko&apos;rish
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <button aria-label={topikUz.common.back} onClick={goBack} type="button">
          <MobileIcon name="chevron-back" size={24} />
        </button>
        <strong>TOPIK {roman}</strong>
        <button
          aria-label={topikUz.home.openStats}
          onClick={() => router.push(`/topik-stats?level=${level}`)}
          type="button"
        >
          <MobileIcon name="stats-chart-outline" size={22} />
        </button>
      </header>

      <div className={styles.content}>
        <section className={styles.intro}>
          <small>{topikUz.sections.todayStudy}</small>
          <h1>{topikUz.sections.chooseSection}</h1>
        </section>

        {recent ? (
          <button
            className={styles.recentCard}
            onClick={openRecent}
            type="button"
          >
            <span className={styles.recentIcon}>
              <MobileIcon
                name={
                  SECTIONS.find((item) => item.key === recent.section)?.icon ??
                  "book-outline"
                }
                size={27}
              />
            </span>
            <span className={styles.recentCopy}>
              <small>{topikUz.sections.recentStudy}</small>
              <strong>
                {topikUz.home[recent.section]} ·{" "}
                {recent.examRound
                  ? `${recent.examRound}-variant`
                  : `TOPIK ${roman}`}
              </strong>
              <small>{topikUz.sections.completedStudy}</small>
            </span>
            <b>{topikUz.home.viewResult}</b>
          </button>
        ) : (
          <button
            className={styles.recentCard}
            onClick={() => openSection("reading")}
            type="button"
          >
            <span className={styles.recentIcon}>
              <MobileIcon name="book-outline" size={27} />
            </span>
            <span className={styles.recentCopy}>
              <small>{topikUz.sections.firstStep}</small>
              <strong>{topikUz.sections.startReading}</strong>
            </span>
            <MobileIcon name="arrow-forward" size={18} />
          </button>
        )}

        <div className={styles.sectionHeading}>
          <h2>{topikUz.sections.sectionSelection}</h2>
          <span>{`${sections.length} ta bo‘lim`}</span>
        </div>

        <section className={styles.sectionList}>
          {sections.map((section) => (
            <button
              className={styles.sectionCard}
              key={section.key}
              onClick={() => openSection(section.key)}
              type="button"
            >
              <span className={`${styles.sectionIcon} ${styles[section.key]}`}>
                <MobileIcon name={section.icon} size={27} />
              </span>
              <span className={styles.sectionCopy}>
                <strong>{topikUz.sections[section.key].title}</strong>
                <small>{topikUz.sections[section.key].shortDescription}</small>
              </span>
              <MobileIcon name="chevron-forward" size={20} />
            </button>
          ))}
        </section>
      </div>
      <footer className={styles.footer}>
        <button
          onClick={() => router.push(`/topik-stats?level=${level}`)}
          type="button"
        >
          <MobileIcon name="stats-chart-outline" size={19} />
          {topikUz.sections.viewStats}
        </button>
      </footer>
    </main>
  );
}
