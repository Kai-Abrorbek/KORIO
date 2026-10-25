"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { saveOnboardingSurvey } from "../api/onboarding";
import {
  REMINDER_HOURS,
  fallbackPlacement,
  surveyStepsFor,
  type SurveyCourse,
  type SurveyStepId,
} from "../model/onboarding";
import { OnboardingNotebook, type NotebookEntry } from "./onboarding-notebook";
import styles from "./onboarding.module.css";

type Answers = Record<SurveyStepId, string[]>;

const EMPTY_ANSWERS: Answers = {
  course: [],
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
  const course = (answers.course[0] as SurveyCourse | undefined) ?? null;
  const steps = surveyStepsFor(course);
  const step = steps[stepIndex]!;
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
    if (stepIndex < steps.length - 1) {
      setError(null);
      setStepIndex((value) => value + 1);
      return;
    }

    const learnCourse: SurveyCourse = course ?? "ko";
    const selfReportedLevel = answers.selfLevel[0]!;
    const reminder = answers.reminder[0]!;
    setSubmitting(true);
    setError(null);
    try {
      // 레벨 테스트가 없어져 설문이 온보딩의 끝이다 — 시작 자리는 서버가 자기 수준으로 정한다
      await saveOnboardingSurvey(request, {
        completeNow: true,
        dailyGoalMinutes: Number(answers.daily[0]),
        // 영어 코스는 한글을 묻지 않는다 — 나중에 한국어로 바꾸면 한글부터 열리게 "모름"
        hangulLevel: learnCourse === "en" ? "none" : answers.hangul[0]!,
        interests: answers.interests,
        reminderHour:
          reminder === "skip" ? undefined : REMINDER_HOURS[reminder],
        selfReportedLevel,
        targetLanguage: learnCourse === "en" ? "english" : "korean",
      });

      // 서버와 같은 자리 (밴드의 가장 낮은 급) — 한국어 코스만
      const placementLevel = fallbackPlacement(selfReportedLevel, 0).placementLevel;
      updateUser({
        isOnboardingCompleted: true,
        learnCourse,
        ...(learnCourse === "ko"
          ? {
              hasPickedLevel: true,
              languageLevel: placementLevel,
              level: placementLevel >= 2 ? "intermediate" : "beginner",
            }
          : {}),
      });
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
      router.replace("/home");
    } catch {
      setError("Javoblaringizni saqlab bo'lmadi. Internetni tekshirib, yana urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  };

  const isLast = stepIndex === steps.length - 1;

  // 지금까지 고른 답 — 하늘몬이 공책에 한 줄씩 적는다 (지금 질문의 답은 고르는 순간 써진다)
  const notebookEntries: NotebookEntry[] = steps.slice(0, stepIndex + 1).flatMap((item) => {
    const picked = item.options.filter((option) => answers[item.id].includes(option.value));
    if (!picked.length) return [];
    return [
      {
        color: picked[0]!.color,
        icon: picked[0]!.icon,
        key: item.id,
        labels: picked.map((option) => option.label),
      },
    ];
  });

  // 앱(onboarding/survey.tsx)과 같은 구조: 뒤로 + 칸 나뉜 진행바 → 하늘몬 공책
  // → 제목 → "하나/여러 개" 안내 → 선택 카드 → 하단 고정 버튼
  return (
    <main className={styles.svPage}>
      <i aria-hidden="true" className={styles.svOrbTop} />
      <i aria-hidden="true" className={styles.svOrbBottom} />

      <header className={styles.svHeader}>
        <button aria-label="Orqaga" className={styles.svBack} onClick={goBack} type="button">
          <MobileIcon name="chevron-back" size={23} />
        </button>
        <div
          aria-valuemax={steps.length}
          aria-valuemin={1}
          aria-valuenow={stepIndex + 1}
          className={styles.svProgress}
          role="progressbar"
        >
          <div className={styles.svProgressMeta}>
            <small data-no-translate>KORIO</small>
            <b>{stepIndex + 1} / {steps.length}</b>
          </div>
          <div className={styles.svSegments}>
            {steps.map((item, index) => (
              <i className={index <= stepIndex ? styles.svSegmentOn : undefined} key={item.id} />
            ))}
          </div>
        </div>
      </header>

      <section className={styles.svScroll} key={step.id}>
        <OnboardingNotebook entries={notebookEntries} />

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
