"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { HomeIcon } from "../../home/ui/home-icon";
import { saveLearnMode, saveStudyMode } from "../api/learning-preferences";
import {
  LEARNING_CATEGORIES,
  canUseLearningFeature,
  guidedDestination,
  learningDestination,
  type LearnMode,
  type LearningCategory,
  type StudyMode,
} from "../model/learning-options";
import { LearningIcon } from "./learning-icon";
import styles from "./learning.module.css";

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

function isLearnMode(value: string): value is LearnMode {
  return LEARN_MODES.includes(value as LearnMode);
}

interface ChoiceSheetProps {
  children: ReactNode;
  label: string;
  onClose: () => void;
}

function ChoiceSheet({ children, label, onClose }: ChoiceSheetProps) {
  return (
    <div className={styles.sheetBackdrop} onClick={onClose} role="presentation">
      <section
        aria-label={label}
        aria-modal="true"
        className={`${styles.modeSheet} ${styles.choiceSheet}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className={styles.sheetGrip} aria-hidden="true" />
        {children}
      </section>
    </div>
  );
}

export function CourseCategoriesScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { request, updateUser, user } = useTelegramAuth();
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

  const visibleCategories = useMemo(
    () =>
      LEARNING_CATEGORIES.filter(
        (category) => studyMode === "free" || category.guided,
      ),
    [studyMode],
  );
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
      const result = await saveLearnMode(request, "vocabulary");
      updateUser({ ...result, learnMode: "vocabulary" });
      router.push(guidedDestination(user?.hasPickedLevel));
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

    const destination = learningDestination(category.category);
    if (!destination) return;
    const shortcut = [
      "hangul",
      "games",
      "wordCard",
      "pronunciation",
      "conversation",
    ].includes(category.category);
    if (shortcut) {
      router.push(destination);
      return;
    }
    if (!isLearnMode(category.category)) return;

    setSaving(true);
    setError(null);
    try {
      const result = await saveLearnMode(request, category.category);
      updateUser({ ...result, learnMode: category.category });
      router.push(destination);
    } catch {
      setError("Tanlovni saqlab bo'lmadi. Qayta urinib ko'ring.");
      setSaving(false);
    }
  };

  const selectTopik = async (level: "1" | "2") => {
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      const result = await saveLearnMode(request, "topik", level);
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

      <div className={styles.categoryContent}>
        <section className={styles.modeSelector}>
          <h2>Qanday o&apos;rganamiz?</h2>
          <div className={styles.modeSegment}>
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
          <p>
            {studyMode === "guided"
              ? "Yo'l-xarita tuzib beradiganidan tashqari, alohida kiriladigan joylar."
              : "Xohlagan joyingizni tanlab kiring."}
          </p>
          <small>
            Bosqichingiz saqlanadi. Istagan payt qaytarib o&apos;zgartirasiz.
          </small>
        </section>

        {studyMode === "guided" ? (
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
          {visibleCategories.map((category, index) => {
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
                  className={styles.categoryIcon}
                  style={{ backgroundColor: category.color }}
                >
                  <LearningIcon name={category.icon} size={23} />
                </span>
                <strong>{category.label}</strong>
                <small>{category.description}</small>
              </button>
            );
          })}
        </section>
        {error ? <p className={styles.formError}>{error}</p> : null}
      </div>

      {topikOpen ? (
        <ChoiceSheet label="TOPIK darajasini tanlang" onClose={() => setTopikOpen(false)}>
          <h2>TOPIK darajasini tanlang</h2>
          <p>O&apos;rganmoqchi bo&apos;lgan imtihon darajasini tanlang.</p>
          <div className={styles.topikOptions}>
            <button disabled={saving} onClick={() => void selectTopik("1")} type="button">
              <strong>TOPIK I</strong>
              <small>1–2 daraja</small>
            </button>
            <button disabled={saving} onClick={() => void selectTopik("2")} type="button">
              <strong>TOPIK II</strong>
              <small>3–6 daraja</small>
            </button>
          </div>
        </ChoiceSheet>
      ) : null}

      {lockedCategory ? (
        <ChoiceSheet label="KORIO Premium" onClose={() => setLockedCategory(null)}>
          <div className={styles.premiumMark}>★</div>
          <h2>{lockedCategory.label} — Premium</h2>
          <p>
            Bu yo&apos;nalish KORIO Premium bilan ochiladi. Barcha premium
            darslarga cheklovsiz kiring.
          </p>
          <button
            className={styles.premiumButton}
            onClick={() => router.push("/premium")}
            type="button"
          >
            Premiumni ko&apos;rish
          </button>
        </ChoiceSheet>
      ) : null}
    </main>
  );
}
