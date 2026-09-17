"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { getTopikResult } from "../api/topik";
import { topikUzText, type TopikAttemptResult } from "../model/topik";
import styles from "./topik-result-screen.module.css";

const SECTION = {
  listening: "TINGLASH",
  reading: "O‘QISH",
  writing: "YOZISH",
} as const;

export function TopikResultScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request, user } = useTelegramAuth();
  const attemptId = params.get("attemptId") ?? "";
  const premium = Boolean(
    user?.isSuper &&
      (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()),
  );
  const [result, setResult] = useState<TopikAttemptResult | null>(null);
  const [wrongOnly, setWrongOnly] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!premium || !attemptId) return;
    setError(false);
    void getTopikResult(request, attemptId)
      .then(setResult)
      .catch(() => setError(true));
  }, [attemptId, premium, request]);

  const visibleQuestions = useMemo(
    () => result?.questions.filter((question) => !wrongOnly || !question.isCorrect) ?? [],
    [result, wrongOnly],
  );

  if (!premium) {
    return <main className={styles.centered}><MobileIcon name="lock-closed" size={36} /><h1>TOPIK tayyorgarligi — Premium</h1><button onClick={() => router.replace("/premium")} type="button">Premiumni ko‘rish</button></main>;
  }

  if (!attemptId || (!result && error)) {
    return <main className={styles.centered}><MobileIcon name="alert-circle-outline" size={35} /><h1>Natijani yuklab bo‘lmadi.</h1><button onClick={() => router.replace("/topik")} type="button">Imtihon tanloviga qaytish</button></main>;
  }

  if (!result) {
    return <main className={styles.centered}><i className={styles.spinner} /><p>Natija tayyorlanmoqda…</p></main>;
  }

  const accuracy = result.totalQuestions
    ? Math.round(result.correctCount / result.totalQuestions * 100)
    : 0;
  const wrongCount = Math.max(0, result.totalQuestions - result.correctCount);
  const canReview = result.mode === "guided";
  const level = result.examType === "topik_i" ? "I" : "II";
  const numericLevel = result.examType === "topik_i" ? "1" : "2";

  return <main className={styles.screen}>
    <div className={styles.content}>
      <section className={`${styles.hero} ${result.examType === "topik_i" ? styles.levelOne : styles.levelTwo}`}>
        <i className={styles.orbLarge} /><i className={styles.orbSmall} />
        <div className={styles.heroTop}>
          <div><span><MobileIcon name={result.section === "listening" ? "headset-outline" : "book-outline"} size={13} />TOPIK {level} · {SECTION[result.section]}</span><h1>Tekshirish tugadi</h1></div>
          <Image alt="" className={styles.confetti} height={92} priority src="/topik/success-confetti.svg" width={92} />
        </div>
        <div className={styles.score}><strong>{result.score}</strong><span>/ 100 ball</span></div>
        <div className={styles.summaryGrid}>
          <Summary icon="checkmark" label="To‘g‘ri" tone="success" value={String(result.correctCount)} />
          <Summary icon="close" label="Noto‘g‘ri" tone="danger" value={String(wrongCount)} />
          <Summary full={result.mode !== "mock_exam"} icon="analytics-outline" label="Aniqlik" value={`${accuracy}%`} />
          {result.mode === "mock_exam" ? <Summary icon="time-outline" label="Sarflangan vaqt" small value={`${Math.floor(result.elapsedSeconds / 60)} daq ${result.elapsedSeconds % 60} son`} /> : null}
        </div>
      </section>

      <header className={styles.reviewHeader}>
        <div><h2>Savollar natijasi</h2><p>Izohlarni o‘qing va xatolaringiz sababini tushuning.</p></div>
        <button className={wrongOnly ? styles.filterActive : ""} onClick={() => setWrongOnly((current) => !current)} type="button">Faqat xatolar</button>
      </header>

      <section className={styles.resultList}>
        {visibleQuestions.map((question) => (
          <button
            aria-label={canReview ? `${question.number}-savolni qayta ko‘rish` : undefined}
            className={`${styles.resultCard} ${canReview ? styles.reviewable : ""}`}
            disabled={!canReview}
            key={question.questionId}
            onClick={() => router.push(`/topik-exam?examCode=${encodeURIComponent(result.examCode)}&mode=guided&reviewAttemptId=${encodeURIComponent(result.attemptId)}&questionNumber=${question.number}`)}
            type="button"
          >
            <div className={styles.resultTop}>
              <span className={question.isCorrect ? styles.correctBadge : styles.wrongBadge}>{String(question.number).padStart(2, "0")}</span>
              <div><b>Javobim: {question.selectedChoiceKey ? `${question.selectedChoiceKey}-variant` : "Javobsiz"}</b><small>To‘g‘ri javob: {question.correctChoiceKey}-variant</small></div>
              <MobileIcon name={question.isCorrect ? "checkmark-circle" : "close-circle"} size={25} />
            </div>
            <div className={styles.explanation}><b>Izoh</b><p>{topikUzText(question.solution.explanation)}</p></div>
            {canReview ? <span className={styles.reviewLink}><MobileIcon name={result.section === "listening" ? "headset-outline" : "book-outline"} size={16} />{question.number}-savolni qayta ko‘rish<MobileIcon name="chevron-forward" size={16} /></span> : null}
          </button>
        ))}
      </section>

      <section className={styles.actions}>
        <button onClick={() => router.push(`/topik-stats?level=${numericLevel}&section=${result.section}`)} type="button"><MobileIcon name="stats-chart" size={19} />Statistikani ko‘rish</button>
        <button onClick={() => router.replace(`/topik?level=${numericLevel}&section=${result.section === "listening" ? "listening" : "reading"}`)} type="button">Boshqa imtihonni yechish<MobileIcon name="arrow-forward" size={19} /></button>
      </section>
    </div>
  </main>;
}

function Summary({ icon, label, value, tone, full = false, small = false }: {
  icon: "analytics-outline" | "checkmark" | "close" | "time-outline";
  label: string;
  value: string;
  tone?: "danger" | "success";
  full?: boolean;
  small?: boolean;
}) {
  return <div className={`${styles.summary} ${full ? styles.summaryFull : ""}`}><span className={tone ? styles[tone] : ""}><MobileIcon name={icon} size={14} /></span><div><strong className={small ? styles.smallValue : ""}>{value}</strong><small>{label}</small></div></div>;
}
