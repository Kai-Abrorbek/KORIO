"use client";

import { useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { saveLearnMode, saveStudyMode } from "../api/learning-preferences";
import {
  guidedDestination,
  type StudyMode,
} from "../model/learning-options";
import { HomeIcon } from "../../home/ui/home-icon";
import { StudyModeSheet } from "./study-mode-sheet";
import styles from "./learning.module.css";

interface LanguageCourse {
  accent: string;
  code: string;
  endonym: string;
  flag: string;
  label: string;
}

const LANGUAGES: LanguageCourse[] = [
  {
    code: "ko",
    label: "Koreys tili",
    flag: "🇰🇷",
    endonym: "한국어",
    accent: "#4a90d9",
  },
  {
    code: "en",
    label: "Ingliz tili",
    flag: "🇺🇸",
    endonym: "English",
    accent: "#5b8def",
  },
];

export function CoursesScreen() {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();
  const [pending, setPending] = useState<LanguageCourse | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/home");
  };

  const chooseMode = async (studyMode: StudyMode) => {
    if (!pending || saving) return;
    const selectedCourse = pending;
    setSaving(true);
    setError(null);

    try {
      await saveStudyMode(request, studyMode);
      updateUser({ studyMode });

      if (studyMode === "guided") {
        const learned = await saveLearnMode(request, "vocabulary");
        updateUser({ ...learned, learnMode: "vocabulary" });
        setPending(null);
        router.push(guidedDestination(user?.hasPickedLevel));
        return;
      }

      setPending(null);
      const query = new URLSearchParams({
        lang: selectedCourse.code,
        label: selectedCourse.label,
      });
      router.push(`/course-categories?${query.toString()}`);
    } catch {
      setError("Tanlovni saqlab bo'lmadi. Qayta urinib ko'ring.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className={styles.learningPage}>
      <button
        aria-label="Yopish"
        className={styles.closeButton}
        onClick={close}
        type="button"
      >
        ×
      </button>

      <div className={styles.courseContent}>
        <section className={styles.courseHero}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/characters/hangulmon_default.png" />
          <h1>Qaysi tilni o&apos;rganasiz?</h1>
          <p>Tilni tanlab boshlang</p>
        </section>

        <section className={styles.languageList}>
          {LANGUAGES.map((language, index) => (
            <button
              className={styles.languageCard}
              key={language.code}
              onClick={() => setPending(language)}
              style={{ "--delay": `${index * 70}ms` } as CSSProperties}
              type="button"
            >
              <span
                className={styles.languageFlag}
                style={{ backgroundColor: `${language.accent}1a` }}
              >
                {language.flag}
              </span>
              <span className={styles.languageInfo}>
                <strong>{language.label}</strong>
                <small>{language.endonym} · 6 ta yo&apos;nalish</small>
              </span>
              <span
                className={styles.languageArrow}
                style={{ backgroundColor: language.accent }}
              >
                <HomeIcon name="chevron" size={18} />
              </span>
            </button>
          ))}
        </section>

        {error ? <p className={styles.formError}>{error}</p> : null}
      </div>

      {pending ? (
        <StudyModeSheet
          courseLabel={pending.label}
          disabled={saving}
          onClose={() => {
            if (!saving) setPending(null);
          }}
          onSelect={(mode) => void chooseMode(mode)}
        />
      ) : null}
    </main>
  );
}
