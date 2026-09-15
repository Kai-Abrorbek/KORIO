"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { saveOnboardingSurvey } from "../api/onboarding";
import {
  REMINDER_HOURS,
  SURVEY_STEPS,
  type SurveyStepId,
} from "../model/onboarding";
import styles from "./onboarding.module.css";

type Answers = Record<SurveyStepId, string[]>;

const EMPTY_ANSWERS: Answers = {
  daily: [],
  hangul: [],
  interests: [],
  reminder: [],
  selfLevel: [],
  style: [],
};

export function OnboardingScreen() {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const step = SURVEY_STEPS[stepIndex]!;
  const selected = answers[step.id];
  const canContinue = selected.length > 0;

  useEffect(() => {
    if (user?.isOnboardingCompleted) router.replace("/welcome");
  }, [router, user?.isOnboardingCompleted]);

  const progress = useMemo(
    () => ((stepIndex + 1) / SURVEY_STEPS.length) * 100,
    [stepIndex],
  );

  if (!user || user.isOnboardingCompleted) return null;

  const goBack = () => {
    setError(null);
    if (stepIndex > 0) {
      setStepIndex((value) => value - 1);
      return;
    }
    router.replace("/welcome");
  };

  const select = (value: string) => {
    setError(null);
    setAnswers((current) => {
      const values = current[step.id];
      const next = step.multi
        ? values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value]
        : [value];
      return { ...current, [step.id]: next };
    });
  };

  const next = async () => {
    if (!canContinue || submitting) return;
    if (stepIndex < SURVEY_STEPS.length - 1) {
      setError(null);
      setStepIndex((value) => value + 1);
      return;
    }

    const selfReportedLevel = answers.selfLevel[0]!;
    const completeNow = selfReportedLevel === "complete_beginner";
    const reminder = answers.reminder[0]!;
    setSubmitting(true);
    setError(null);
    try {
      await saveOnboardingSurvey(request, {
        completeNow,
        dailyGoalMinutes: Number(answers.daily[0]),
        hangulLevel: answers.hangul[0]!,
        interests: answers.interests,
        reminderHour:
          reminder === "skip" ? undefined : REMINDER_HOURS[reminder],
        selfReportedLevel,
        targetLanguage: "korean",
      });

      if (completeNow) {
        updateUser({
          hasPickedLevel: true,
          isOnboardingCompleted: true,
          languageLevel: 1,
          level: "beginner",
        });
        router.replace("/welcome?new=1");
        return;
      }

      const query = new URLSearchParams({
        from: "onboarding",
        mode: "levelTest",
        self: selfReportedLevel,
      });
      router.replace(`/lesson?${query.toString()}`);
    } catch {
      setError("Javoblaringizni saqlab bo'lmadi. Internetni tekshirib, yana urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.onboardingPage}>
      <div className={styles.ambientTop} />
      <div className={styles.ambientBottom} />
      <header className={styles.surveyHeader}>
        <button aria-label="Orqaga" className={styles.backButton} onClick={goBack} type="button">
          <MobileIcon name="chevron-back" size={24} />
        </button>
        <div className={styles.progressArea}>
          <div className={styles.progressMeta}>
            <strong>{stepIndex + 1} / {SURVEY_STEPS.length}</strong>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className={styles.progressTrack}><i style={{ width: `${progress}%` }} /></div>
        </div>
      </header>

      <section className={styles.surveyContent}>
        <div className={styles.coachCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/characters/hangulmon_default.png" />
          <div>
            <small>KORIO</small>
            <strong>{step.subtitle}</strong>
          </div>
        </div>

        <div className={styles.questionHeading}>
          <p>{step.helper}</p>
          <h1>{step.title}</h1>
        </div>

        <div className={step.variant === "grid" ? styles.optionGrid : styles.optionList}>
          {step.options.map((option, index) => {
            const active = selected.includes(option.value);
            return (
              <button
                aria-pressed={active}
                className={`${styles.optionCard} ${active ? styles.optionSelected : ""}`}
                key={option.value}
                onClick={() => select(option.value)}
                style={{
                  "--accent": option.color,
                  "--delay": `${index * 35}ms`,
                } as CSSProperties}
                type="button"
              >
                <span className={styles.optionIcon}><MobileIcon name={option.icon} size={27} /></span>
                <strong>{option.label}</strong>
                <span className={styles.optionCheck}>
                  {active ? <MobileIcon name="checkmark" size={16} /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <footer className={styles.surveyFooter}>
        {error ? <p className={styles.formError}>{error}</p> : null}
        <button
          className={styles.continueButton}
          disabled={!canContinue || submitting}
          onClick={() => void next()}
          type="button"
        >
          <span>{submitting ? "Saqlanmoqda..." : stepIndex === SURVEY_STEPS.length - 1 ? "Boshlash" : "Keyingi"}</span>
          {!submitting ? <i><MobileIcon name="arrow-forward" size={18} /></i> : null}
        </button>
      </footer>
    </main>
  );
}
