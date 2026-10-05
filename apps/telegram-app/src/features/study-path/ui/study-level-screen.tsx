"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { HomeIcon } from "../../home/ui/home-icon";
import { LearningIcon } from "../../learning/ui/learning-icon";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
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
  // 시험으로만 열리는 급을 눌렀을 때 띄우는 안내 시트 (앱 StudyLevelScreen 과 동일)
  const [examTarget, setExamTarget] = useState<{ color: string; level: StudyLevel } | null>(null);

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

  /** 잠긴 급을 열 시험 시작 — 바로 아래 급의 졸업 시험을 본다 */
  const startExam = () => {
    const examLevel = examTarget?.level.examLevel;
    setExamTarget(null);
    if (!examLevel) return;
    router.push(`/lesson?mode=levelExam&from=studyPath&examLevel=${examLevel}`);
  };

  const choose = async (level: StudyLevel) => {
    if (!level.available || savingLevel !== null) return;
    // 위 급은 시험 통과로만 간다 (서버도 LEVEL_EXAM_REQUIRED 로 막는다)
    if (level.unlocked === false) return;
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
        <HomeIcon name="close" size={28} />
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
              Yuqori darajalar imtihondan o&apos;tsangiz ochiladi.
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
              // 콘텐츠는 있지만 아직 시험을 통과 못 한 급 — 누르면 시험 안내 시트
              if (level.unlocked === false) {
                const examLevel = level.examLevel ?? level.level - 1;
                return (
                  <button
                    className={`${styles.levelCard} ${styles.levelExamLocked}`}
                    key={level.level}
                    onClick={() => setExamTarget({ color: color ?? "#776ee2", level })}
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
                      <span className={styles.levelExamPill}>
                        <MobileIcon name="ribbon" size={12} />
                        <span>{`${examLevel}-daraja imtihonidan o'tsangiz ochiladi`}</span>
                      </span>
                    </span>
                    <span className={styles.levelAction}>
                      <MobileIcon name="lock-closed" size={15} />
                    </span>
                  </button>
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

      {examTarget ? (
        <div className={styles.examSheetRoot} role="dialog" aria-modal="true">
          <button
            aria-label="Yopish"
            className={styles.examSheetBackdrop}
            onClick={() => setExamTarget(null)}
            type="button"
          />
          <section
            className={styles.examSheet}
            style={{ "--level-color": examTarget.color } as CSSProperties}
          >
            <span className={styles.examSheetGrabber} />
            <span className={styles.examSheetIcon}>
              <MobileIcon name="ribbon" size={34} />
            </span>
            <h2>{`${examTarget.level.level}-darajaga o'tish uchun imtihon kerak`}</h2>
            <p>
              {`${examTarget.level.examLevel ?? examTarget.level.level - 1}-daraja bitiruv imtihonidan (25 savol) o'tsangiz, darhol ${examTarget.level.level}-darajaga o'tasiz.`}
            </p>
            <button className={styles.examSheetCta} onClick={startExam} type="button">
              Imtihonni boshlash
            </button>
            <button
              className={styles.examSheetCancel}
              onClick={() => setExamTarget(null)}
              type="button"
            >
              Keyinroq
            </button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
