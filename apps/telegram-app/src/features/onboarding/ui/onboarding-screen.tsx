"use client";

import { useEffect, useState, type CSSProperties } from "react";
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
    if (user?.isOnboardingCompleted) router.replace("/home");
  }, [router, user?.isOnboardingCompleted]);

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
        // 완전 초보는 진단을 건너뛴다 — 온보딩 끝. 앱처럼 홈으로.
        // (예전엔 /welcome?new=1 로 보내서 웰컴 화면이 다시 떴다)
        window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
        router.replace("/home");
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

  const isLast = stepIndex === SURVEY_STEPS.length - 1;

  // 앱(onboarding/survey.tsx)과 같은 구조: 뒤로 + 칸 나뉜 진행바 → 코치 카드
  // (생각하는 한글몬) → 제목 → "하나/여러 개" 안내 → 선택 카드 → 하단 고정 버튼
  return (
    <main className={styles.svPage}>
      <i aria-hidden="true" className={styles.svOrbTop} />
      <i aria-hidden="true" className={styles.svOrbBottom} />

      <header className={styles.svHeader}>
        <button aria-label="Orqaga" className={styles.svBack} onClick={goBack} type="button">
          <MobileIcon name="chevron-back" size={23} />
        </button>
        <div
          aria-valuemax={SURVEY_STEPS.length}
          aria-valuemin={1}
          aria-valuenow={stepIndex + 1}
          className={styles.svProgress}
          role="progressbar"
        >
          <div className={styles.svProgressMeta}>
            <small data-no-translate>KORIO</small>
            <b>{stepIndex + 1} / {SURVEY_STEPS.length}</b>
          </div>
          <div className={styles.svSegments}>
            {SURVEY_STEPS.map((item, index) => (
              <i className={index <= stepIndex ? styles.svSegmentOn : undefined} key={item.id} />
            ))}
          </div>
        </div>
      </header>

      <section className={styles.svScroll} key={step.id}>
        <div className={styles.svCoach}>
          <span className={styles.svMascot}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/characters/hangulmon_thinking.png" />
          </span>
          <p>{step.subtitle}</p>
        </div>

        <h1 className={styles.svTitle}>{step.title}</h1>
        <div className={styles.svHelper}>
          <MobileIcon name={step.multi ? "layers-outline" : "checkmark-circle-outline"} size={16} />
          <span>{step.helper}</span>
        </div>

        <div className={step.variant === "grid" ? styles.svGrid : styles.svList}>
          {step.options.map((option, index) => {
            const active = selected.includes(option.value);
            return (
              <button
                aria-pressed={active}
                className={`${styles.svCard} ${active ? styles.svCardOn : ""}`}
                key={option.value}
                onClick={() => {
                  window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
                  select(option.value);
                }}
                style={{
                  "--accent": option.color,
                  "--delay": `${index * 45}ms`,
                } as CSSProperties}
                type="button"
              >
                <span className={styles.svCardIcon}>
                  <MobileIcon name={option.icon} size={step.variant === "grid" ? 27 : 23} />
                </span>
                <strong>{option.label}</strong>
                <span className={styles.svCheck}>
                  {active ? <MobileIcon name="checkmark" size={14} /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <footer className={styles.svFooter}>
        {error ? <p className={styles.formError}>{error}</p> : null}
        <button
          className={styles.svCta}
          disabled={!canContinue || submitting}
          onClick={() => void next()}
          type="button"
        >
          {submitting ? (
            <i aria-label="Saqlanmoqda..." className={styles.svSpinner} />
          ) : (
            <>
              <span>{isLast ? "Boshlash" : "Keyingi"}</span>
              <MobileIcon name="arrow-forward" size={20} />
            </>
          )}
        </button>
      </footer>
    </main>
  );
}
