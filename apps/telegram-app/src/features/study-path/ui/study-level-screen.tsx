"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { HomeIcon } from "../../home/ui/home-icon";
import { LearningIcon } from "../../learning/ui/learning-icon";
import { getStudyLevels, setStudyLevel } from "../api/study-path";
import type { StudyLevel } from "../model/study-path";
import styles from "./study-path.module.css";

const LEVEL_COLORS = [
  "#776ee2",
  "#1d9e75",
  "#e2a83a",
  "#e25c5c",
  "#45b7d1",
  "#6e1cf2",
];

export function StudyLevelScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { request, updateUser } = useTelegramAuth();
  const [levels, setLevels] = useState<StudyLevel[]>([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [savingLevel, setSavingLevel] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getStudyLevels(request);
      setLevels(result.levels);
      setCurrent(result.current);
    } catch {
      setError("Darajalarni yuklab bo'lmadi.");
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    void load();
  }, [load]);

  const choose = async (level: StudyLevel) => {
    if (!level.available || savingLevel !== null) return;
    setSavingLevel(level.level);
    setError(null);
    try {
      const result = await setStudyLevel(request, level.level);
      setCurrent(result.placementLevel);
      updateUser({
        hasPickedLevel: true,
        languageLevel: result.placementLevel,
      });
      router.replace("/study-path");
    } catch {
      setError("Darajani saqlab bo'lmadi. Qayta urinib ko'ring.");
      setSavingLevel(null);
    }
  };

  const goBack = () => {
    router.replace(
      searchParams.get("from") === "studyPath" ? "/study-path" : "/courses",
    );
  };

  return (
    <main className={styles.levelPage}>
      <button
        aria-label="Yopish"
        className={styles.levelClose}
        onClick={goBack}
        type="button"
      >
        ×
      </button>

      {loading ? (
        <div className={styles.centerState}>
          <span className={styles.spinner} />
        </div>
      ) : error && levels.length === 0 ? (
        <div className={styles.centerState}>
          <span className={styles.stateIcon}>
            <LearningIcon name="lock" size={28} />
          </span>
          <strong>{error}</strong>
          <button onClick={() => void load()} type="button">
            Qayta urinish
          </button>
        </div>
      ) : (
        <div className={styles.levelScroll}>
          <section className={styles.levelHero}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/characters/hangulmon_default.png" />
            <h1>Qayerdan boshlaymiz?</h1>
            <p>
              Hozirgi koreys tili darajangizga mos keladiganini tanlang.
              <br />
              Keyin istalgan payt o&apos;zgartirasiz.
            </p>
          </section>

          <section className={styles.levelList}>
            {levels.map((level, index) => {
              const color = LEVEL_COLORS[index % LEVEL_COLORS.length];
              const selected = level.level === current;
              if (!level.available) {
                return (
                  <div className={styles.levelLockedCard} key={level.level}>
                    <span className={styles.levelLockedIcon}>
                      <LearningIcon name="lock" size={19} />
                    </span>
                    <span>
                      <strong>{level.title}</strong>
                      <small>Tayyorlanmoqda</small>
                    </span>
                  </div>
                );
              }
              return (
                <button
                  className={styles.levelCard}
                  disabled={savingLevel !== null}
                  key={level.level}
                  onClick={() => void choose(level)}
                  style={
                    {
                      "--level-color": color,
                      "--level-delay": `${index * 60}ms`,
                    } as CSSProperties
                  }
                  type="button"
                >
                  <span className={styles.levelBadge}>{level.level}</span>
                  <span className={styles.levelTexts}>
                    <strong>{level.title}</strong>
                    <small>{level.description}</small>
                  </span>
                  <span className={styles.levelAction}>
                    {savingLevel === level.level ? (
                      <span className={styles.buttonSpinner} />
                    ) : selected ? (
                      <HomeIcon name="check" size={18} />
                    ) : (
                      <HomeIcon name="chevron" size={20} />
                    )}
                  </span>
                </button>
              );
            })}
          </section>

          {error ? <p className={styles.inlineError}>{error}</p> : null}
          <p className={styles.levelHint}>
            Ikkilanayotgan bo&apos;lsangiz, 1-darajadan boshlang.
          </p>
        </div>
      )}
    </main>
  );
}
