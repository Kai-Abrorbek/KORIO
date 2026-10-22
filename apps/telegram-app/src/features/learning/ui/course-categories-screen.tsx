"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { HomeIcon } from "../../home/ui/home-icon";
import { saveLearnMode, saveStudyMode } from "../api/learning-preferences";
import {
  LEARNING_CATEGORIES,
  ENGLISH_CATEGORY_CARDS,
  canUseLearningFeature,
  guidedDestination,
  hasLearningTaster,
  learningDestination,
  learnCourseOf,
  type LearnMode,
  type LearningCategory,
  type StudyMode,
} from "../model/learning-options";
import { PremiumGateSheet } from "../../../shared/ui/premium-gate-sheet";
import { SwipeSlides } from "../../../shared/ui/swipe-slides";
import { useSwipeTabs, writeSwipeProgress } from "../../../shared/ui/use-swipe-tabs";
import { LearningIcon } from "./learning-icon";
import { TopikLevelSheet } from "./topik-level-sheet";
import styles from "./learning.module.css";
import { uzt } from "../../../shared/i18n/uz-text";

const LEARN_MODES: LearnMode[] = [
  "vocabulary",
  "grammarPractice",
  "grammar",
  "expression",
  "speaking",
  "conversation",
  "listening",
  "topik",
];

/** 세그먼트 순서 = 옆으로 넘기는 순서 */
const STUDY_MODES: StudyMode[] = ["guided", "free"];

function isLearnMode(value: string): value is LearnMode {
  return LEARN_MODES.includes(value as LearnMode);
}

export function CourseCategoriesScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { request, updateUser, user } = useTelegramAuth();
  const course = learnCourseOf(searchParams.get("lang") ?? user?.learnCourse);
  const isEnglish = course === "en";
  const [studyMode, setStudyMode] = useState<StudyMode>(
    user?.studyMode ?? "free",
  );
  const [saving, setSaving] = useState(false);
  const [topikOpen, setTopikOpen] = useState(false);
  const [lockedCategory, setLockedCategory] =
    useState<LearningCategory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/courses");
  };

  // 학습 로드에서는 로드가 안 덮는 것만 남긴다. 두 방식 다 미리 그려 두고 옆으로 넘긴다
  // 영어는 한글 카드 자리가 영어 알파벳 카드다 (앱 course-categories 와 같다)
  const categoriesByMode = useMemo(
    () => ({
      free: LEARNING_CATEGORIES.filter(
        (category) =>
          !isEnglish ||
          ENGLISH_CATEGORY_CARDS.includes(
            category.category as (typeof ENGLISH_CATEGORY_CARDS)[number],
          ),
      ),
      // 영어도 같은 규칙 — 로드 모드에서는 로드가 덮는 어휘를 빼고 나머지만
      guided: LEARNING_CATEGORIES.filter(
        (category) =>
          (!isEnglish ||
            ENGLISH_CATEGORY_CARDS.includes(
              category.category as (typeof ENGLISH_CATEGORY_CARDS)[number],
            )) &&
          category.guided,
      ),
    }),
    [isEnglish],
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const heading = searchParams.get("label") || "Nimani o'rganasiz?";

  const changeStudyMode = async (nextMode: StudyMode) => {
    if (nextMode === studyMode || saving) return;
    const previous = studyMode;
    setStudyMode(nextMode);
    updateUser({ studyMode: nextMode });
    setSaving(true);
    setError(null);
    try {
      await saveStudyMode(request, nextMode);
    } catch {
      setStudyMode(previous);
      updateUser({ studyMode: previous });
      setError("O'quv usulini saqlab bo'lmadi. Qayta urinib ko'ring.");
    } finally {
      setSaving(false);
    }
  };

  const enterGuidedPath = async () => {
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      // 학습 로드는 코스마다 같은 구조 — 그 코스의 어휘 트랙 위에 하루치가 깔린다
      const result = await saveLearnMode(request, "vocabulary", undefined, course);
      updateUser({ ...result, learnMode: "vocabulary", learnCourse: course });
      router.push(guidedDestination(user?.hasPickedLevel, course));
    } catch {
      setError("Tanlovni saqlab bo'lmadi. Qayta urinib ko'ring.");
      setSaving(false);
    }
  };

  const openCategory = async (category: LearningCategory) => {
    if (saving) return;
    if (!canUseLearningFeature(user ?? {}, category.feature)) {
      setLockedCategory(category);
      return;
    }
    if (category.category === "topik") {
      setTopikOpen(true);
      return;
    }

    // 영어 알파벳 — 학습 모드를 alphabet 으로 맞춰야 홈 "이어서 학습하기" 도 여기로 온다
    if (isEnglish && category.category === "hangul") {
      setSaving(true);
      setError(null);
      try {
        const result = await saveLearnMode(request, "alphabet", undefined, "en");
        updateUser({ ...result, learnMode: "alphabet", learnCourse: "en" });
        router.push(learningDestination("alphabet") ?? "/alphabet");
      } catch {
        setError("Tanlovni saqlab bo'lmadi. Qayta urinib ko'ring.");
        setSaving(false);
      }
      return;
    }

    const destination = learningDestination(category.category, "1", course);
    if (!destination) return;
    const shortcut = [
      "hangul",
      "games",
      "wordCard",
      "pronunciation",
      "conversation",
    ].includes(category.category);
    if (shortcut) {
      if (category.category === "wordCard") {
        setSaving(true);
        try {
          const result = await saveLearnMode(request, "vocabulary", undefined, course);
          updateUser({ ...result, learnMode: "vocabulary", learnCourse: course });
        } catch {
          setError("Tanlovni saqlab bo'lmadi. Qayta urinib ko'ring.");
          setSaving(false);
          return;
        }
      }
      router.push(["pronunciation", "games"].includes(category.category) ? `${destination}?targetLanguage=${course}` : destination);
      return;
    }
    if (!isLearnMode(category.category)) return;

    setSaving(true);
    setError(null);
    try {
      const result = await saveLearnMode(request, category.category, undefined, course);
      updateUser({ ...result, learnMode: category.category, learnCourse: course });
      router.push(destination);
    } catch {
      setError("Tanlovni saqlab bo'lmadi. Qayta urinib ko'ring.");
      setSaving(false);
    }
  };

  // 아래 내용을 옆으로 밀어도 학습 방식이 바뀐다 (세그먼트를 누른 것과 같다)
  useSwipeTabs(contentRef, {
    count: STUDY_MODES.length,
    disabled: saving,
    index: STUDY_MODES.indexOf(studyMode),
    onIndexChange: (next) => void changeStudyMode(STUDY_MODES[next] ?? studyMode),
    onProgress: (progress, immediate) =>
      writeSwipeProgress(contentRef.current, progress, immediate),
  });

  const renderMode = (mode: StudyMode) => (
    <>
      <p className={styles.modeNote}>
        {mode === "guided"
          ? "Yo'l-xarita tuzib beradiganidan tashqari, alohida kiriladigan joylar."
          : "Xohlagan joyingizni tanlab kiring."}
      </p>
      <small className={styles.modeHint}>
        Bosqichingiz saqlanadi. Istagan payt qaytarib o&apos;zgartirasiz.
      </small>

      {mode === "guided" ? (
        <button
          className={styles.guidedCard}
          disabled={saving}
          onClick={() => void enterGuidedPath()}
          type="button"
        >
          <span>
            <LearningIcon name="footsteps" size={25} />
          </span>
          <span>
            <strong>Bugungi yo&apos;l-xarita</strong>
            <small>
              Siz uchun tartib bilan tuzilgan bugungi ishdan boshlang
            </small>
          </span>
          <HomeIcon name="chevron" size={20} />
        </button>
      ) : null}

      <p className={styles.categoryLead}>Nimani o&apos;rganasiz?</p>
      <section className={styles.categoryGrid}>
        {categoriesByMode[mode].map((category, index) => {
          const locked = !canUseLearningFeature(
            user ?? {},
            category.feature,
          );
          return (
            <button
              className={`${styles.categoryCard} ${
                locked ? styles.categoryLocked : ""
              }`}
              disabled={saving}
              key={category.key}
              onClick={() => void openCategory(category)}
              style={
                { "--delay": `${index * 45}ms` } as CSSProperties
              }
              type="button"
            >
              {locked ? (
                <span className={styles.lockPill}>
                  <LearningIcon name="lock" size={11} />
                </span>
              ) : null}
              <span
                className={`${styles.categoryIcon} ${category.category === "topik" ? styles.topikIcon : ""}`}
                style={category.category === "topik" ? undefined : { backgroundColor: category.color }}
              >
                {category.category === "topik" ? (
                  <span className={styles.topikLogo} role="img" aria-label="TOPIK" />
                ) : (
                  <LearningIcon name={category.icon} size={23} />
                )}
              </span>
              {isEnglish && category.category === "hangul" ? (
                <>
                  <strong data-i18n="courses.categories.alphabet">
                    {uzt("courses.categories.alphabet")}
                  </strong>
                  <small data-i18n="courses.categoryDesc.alphabet">
                    {uzt("courses.categoryDesc.alphabet")}
                  </small>
                </>
              ) : (
                <>
                  <strong>{category.label}</strong>
                  <small>{category.description}</small>
                </>
              )}
            </button>
          );
        })}
      </section>
    </>
  );

  const selectTopik = async (level: "1" | "2") => {
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      const result = await saveLearnMode(request, "topik", level, "ko");
      updateUser({ ...result, learnMode: "topik", topikLevel: level });
      setTopikOpen(false);
      router.push(learningDestination("topik", level) ?? "/home");
    } catch {
      setError("Tanlovni saqlab bo'lmadi. Qayta urinib ko'ring.");
      setSaving(false);
    }
  };

  return (
    <main className={styles.learningPage}>
      <header className={styles.learningHeader}>
        <button aria-label="Orqaga" onClick={goBack} type="button">
          <HomeIcon name="back" size={28} />
        </button>
        <h1>{heading}</h1>
      </header>

      <div className={styles.categoryContent} ref={contentRef}>
        <section className={styles.modeSelector}>
          <h2>Qanday o&apos;rganamiz?</h2>
          <div className={styles.modeSegment}>
            {/* 선택 배경 — 밀고 있는 만큼 옆 칸으로 미끄러진다 */}
            <i aria-hidden="true" className={styles.modeThumb} />
            <button
              className={studyMode === "guided" ? styles.modeSelected : ""}
              disabled={saving}
              onClick={() => void changeStudyMode("guided")}
              type="button"
            >
              <LearningIcon name="footsteps" size={17} />
              O&apos;quv yo&apos;li
            </button>
            <button
              className={studyMode === "free" ? styles.modeSelected : ""}
              disabled={saving}
              onClick={() => void changeStudyMode("free")}
              type="button"
            >
              <LearningIcon name="compass" size={17} />
              Erkin o&apos;rganish
            </button>
          </div>
        </section>

        {/* 방식마다 설명·로드 입구·분야 목록이 달라서 그 부분만 옆으로 넘긴다 */}
        <SwipeSlides
          bleed={20}
          index={STUDY_MODES.indexOf(studyMode)}
          slides={[renderMode("guided"), renderMode("free")]}
        />
        {error ? <p className={styles.formError}>{error}</p> : null}
      </div>

      {topikOpen ? (
        <TopikLevelSheet busy={saving} onClose={() => setTopikOpen(false)} onSelect={(level) => void selectTopik(level)} />
      ) : null}

      {/* 잠긴 학습 — 앱 PremiumGateModal 과 같은 시트 */}
      {lockedCategory ? (
        <PremiumGateSheet
          feature={lockedCategory.feature}
          onClose={() => setLockedCategory(null)}
          onTaster={
            hasLearningTaster(lockedCategory.feature)
              ? () => {
                  const destination = learningDestination(lockedCategory.category, "1", course);
                  if (destination) router.push(destination);
                }
              : undefined
          }
        />
      ) : null}
    </main>
  );
}
