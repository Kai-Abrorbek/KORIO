"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  MobileIcon,
  type IoniconName,
} from "../../../shared/ui/mobile-icon";
import {
  getCompletedTopikExams,
  getTopikExams,
} from "../api/topik";
import {
  topikUzText,
  type TopikAttemptMode,
  type TopikExam,
  type TopikLevel,
  type TopikSection,
} from "../model/topik";
import styles from "./topik-home-screen.module.css";

const SECTION_LABEL: Record<TopikSection, string> = {
  reading: "O‘qish",
  listening: "Tinglash",
  writing: "Yozish",
};

const MODES: Array<{
  key: TopikAttemptMode;
  icon: IoniconName;
  title: string;
  description: string;
}> = [
  {
    key: "guided",
    icon: "bulb-outline",
    title: "Izohli o‘rganish",
    description:
      "Savollarni bosqichma-bosqich maslahatlar va muhim ishoralar bilan yeching.",
  },
  {
    key: "mock_exam",
    icon: "timer-outline",
    title: "Sinov imtihoni",
    description:
      "Haqiqiy imtihon kabi belgilangan vaqt ichida diqqat bilan yeching.",
  },
];

const WRITING_PRACTICE: Array<{
  number: 51 | 52 | 53 | 54;
  icon: IoniconName;
  title: string;
  description: string;
}> = [
  {
    number: 51,
    icon: "mail-outline",
    title: "51 · Taklif va va’da",
    description:
      "Mazmun va hurmat uslubini saqlab, ikki bo‘shliqni to‘ldiring.",
  },
  {
    number: 52,
    icon: "git-compare-outline",
    title: "52 · Ma’lumot yetkazish",
    description: "Sabab va usulni tabiiy bog‘lab gaplarni tugating.",
  },
  {
    number: 53,
    icon: "bar-chart-outline",
    title: "53 · Ma’lumot tavsifi",
    description:
      "Asosiy raqamlar va sabablarni 200–300 belgida yozing.",
  },
  {
    number: 54,
    icon: "reader-outline",
    title: "54 · Mavzuli insho",
    description:
      "Fikr, dalil va yechimlardan 600–700 belgili insho tuzing.",
  },
];

export function TopikHomeScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request, user } = useTelegramAuth();
  const level: TopikLevel = params.get("level") === "1" ? "1" : "2";
  const sectionParam = params.get("section");
  const section: TopikSection =
    sectionParam === "listening"
      ? "listening"
      : sectionParam === "writing"
        ? "writing"
        : "reading";
  const examType = level === "1" ? "topik_i" : "topik_ii";
  const roman = level === "1" ? "I" : "II";
  const premium = Boolean(
    user?.isSuper &&
      (!user.superExpiresAt ||
        new Date(user.superExpiresAt).getTime() > Date.now()),
  );

  const [exams, setExams] = useState<TopikExam[]>([]);
  const [completed, setCompleted] = useState<
    Awaited<ReturnType<typeof getCompletedTopikExams>>
  >([]);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [mode, setMode] = useState<TopikAttemptMode>("guided");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    if (!premium) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setFailed(false);
    try {
      const [allExams, completedExams] = await Promise.all([
        getTopikExams(request),
        getCompletedTopikExams(request).catch(() => []),
      ]);
      const matching = allExams.filter(
        (exam) => exam.examType === examType && exam.section === section,
      );
      setExams(matching);
      setCompleted(completedExams);
      setSelectedCode((current) =>
        matching.some((exam) => exam.code === current)
          ? current
          : (matching[0]?.code ?? null),
      );
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [examType, premium, request, section]);

  useEffect(() => {
    void load();
  }, [load]);

  const selectedExam = useMemo(
    () => exams.find((exam) => exam.code === selectedCode) ?? null,
    [exams, selectedCode],
  );

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.replace(`/topik-sections?level=${level}`);
  };

  if (!premium) {
    return (
      <main className={`${styles.screen} ${styles.lockedScreen}`}>
        <TopikHeader
          onBack={goBack}
          onStats={() => undefined}
          roman={roman}
          section={section}
          statsHidden
        />
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

  const heroTitle =
    section === "listening"
      ? "Eshitish bilan asosiy fikrni toping.\nImtihon sezgisini rivojlantiring."
      : section === "writing"
        ? "Fikrni tuzing va\nyuqori ballik javob yozing."
        : "Javobni yodlamang.\nYechish usulini o‘rganing.";
  const heroDescription =
    section === "listening"
      ? "Savollarni asl guruhlarida tinglang, izohli rejimda matn va asosiy belgilarni oching."
      : section === "writing"
        ? "Gapni tugatishdan 700 belgilik inshogacha, hajm va baholash mezonlari bilan mashq qiling."
        : "Haqiqiy imtihon tuzilishida mashq qiling va faqat kerak bo‘lganda bosqichli maslahatlarni oching.";

  return (
    <main className={styles.screen}>
      <TopikHeader
        onBack={goBack}
        onStats={() =>
          router.push(
            `/topik-stats?level=${level}&section=${encodeURIComponent(section)}`,
          )
        }
        roman={roman}
        section={section}
      />

      <div className={styles.content}>
        <section className={styles.hero}>
          <span>TOPIK {roman} · {SECTION_LABEL[section].toUpperCase()}</span>
          <h1>{heroTitle}</h1>
          <p>{heroDescription}</p>
          <div className={styles.heroMetrics}>
            <Metric
              label="Savollar"
              value={selectedExam ? String(selectedExam.totalQuestions) : "—"}
            />
            <i />
            <Metric
              label={mode === "mock_exam" ? "Daqiqa" : "Vaqt cheklanmagan"}
              value={
                mode === "mock_exam"
                  ? selectedExam
                    ? String(selectedExam.durationMinutes)
                    : "—"
                  : "∞"
              }
            />
            <i />
            <Metric
              label="Ball"
              value={selectedExam ? String(selectedExam.totalPoints) : "—"}
            />
          </div>
        </section>

        <SectionHeader
          caption={
            section === "listening"
              ? "TINGLASH TESTI"
              : section === "writing"
                ? "YOZISH TESTI"
                : "O‘QISH TESTI"
          }
          title="Imtihonni tanlang"
        />

        {loading ? (
          <StateCard text="Imtihon variantlari yuklanmoqda…" />
        ) : failed ? (
          <section className={styles.stateCard}>
            <MobileIcon name="cloud-offline-outline" size={28} />
            <strong>Imtihon variantlarini yuklab bo‘lmadi.</strong>
            <button onClick={() => void load()} type="button">
              Qayta urinish
            </button>
          </section>
        ) : exams.length === 0 ? (
          <section className={styles.stateCard}>
            <MobileIcon name="document-text-outline" size={29} />
            <strong>
              TOPIK {roman} {SECTION_LABEL[section]} materiallari tayyorlanmoqda.
            </strong>
            <p>Sifatli savollar tez orada qo‘shiladi.</p>
          </section>
        ) : (
          <section className={styles.examList}>
            {exams.map((exam) => {
              const isSelected = exam.code === selectedCode;
              const completedExam = completed.find(
                (item) => item.examId === exam.id,
              );
              return (
                <article
                  className={`${styles.examCard} ${
                    isSelected ? styles.examSelected : ""
                  }`}
                  key={exam.id}
                >
                  <button
                    className={styles.examMain}
                    onClick={() => setSelectedCode(exam.code)}
                    type="button"
                  >
                    <span className={styles.examNumber}>
                      {String(exam.round ?? 1).padStart(2, "0")}
                    </span>
                    <span className={styles.examInfo}>
                      <strong>{topikUzText(exam.title)}</strong>
                      <small>
                        {exam.totalQuestions} savol · {mode === "mock_exam" ? `${exam.durationMinutes} daqiqa` : "Vaqt cheklanmagan"} · {exam.totalPoints} ball
                      </small>
                    </span>
                    <MobileIcon
                      name={isSelected ? "checkmark-circle" : "ellipse-outline"}
                      size={23}
                    />
                  </button>
                  {completedExam ? (
                    <footer className={styles.completedRow}>
                      <span>
                        <MobileIcon name="checkmark-circle" size={14} />
                        Yakunlangan
                      </span>
                      <button
                        onClick={() =>
                          router.push(
                            section === "writing"
                              ? `/topik-writing?examCode=${encodeURIComponent(exam.code)}&reviewAttemptId=${encodeURIComponent(completedExam.latestAttemptId)}`
                              : `/topik-result?attemptId=${encodeURIComponent(completedExam.latestAttemptId)}`,
                          )
                        }
                        type="button"
                      >
                        Natijani ko‘rish
                        <MobileIcon name="arrow-forward" size={15} />
                      </button>
                    </footer>
                  ) : null}
                </article>
              );
            })}
          </section>
        )}

        {section === "writing" && selectedExam ? (
          <section className={styles.writingPractice}>
            <header>
              <div>
                <h2>Savol turi bo‘yicha mashq</h2>
                <p>
                  51–54-savollardan istalganini tanlab yozing va namunaviy javob
                  bilan solishtiring.
                </p>
              </div>
              <span>ERKIN MASHQ</span>
            </header>
            <div className={styles.practiceGrid}>
              {WRITING_PRACTICE.map((item) => (
                <button
                  key={item.number}
                  onClick={() =>
                    router.push(
                      `/topik-writing?examCode=${encodeURIComponent(selectedExam.code)}&mode=guided&questionNumber=${item.number}`,
                    )
                  }
                  type="button"
                >
                  <span>
                    <i>
                      <MobileIcon name={item.icon} size={20} />
                    </i>
                    <b>{item.number}</b>
                  </span>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <small>
                    Mashq qilish
                    <MobileIcon name="arrow-forward" size={14} />
                  </small>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {level === "2" ? (
          <button
            className={styles.recipeEntry}
            onClick={() => router.push("/topik-recipes")}
            type="button"
          >
            <span>
              <MobileIcon name="restaurant-outline" size={22} />
            </span>
            <span>
              <strong>Oltin retsept</strong>
              <small>Yechilgan namunalar · Asosiy reyting</small>
            </span>
            <MobileIcon name="chevron-forward" size={20} />
          </button>
        ) : null}

        <SectionHeader caption="REJIM" title="O‘rganish rejimi" />
        <section className={styles.modeList}>
          {MODES.map((item) => {
            const selected = item.key === mode;
            return (
              <button
                className={`${styles.modeCard} ${
                  selected ? styles.modeSelected : ""
                }`}
                key={item.key}
                onClick={() => setMode(item.key)}
                type="button"
              >
                <span className={item.key === "guided" ? styles.guideIcon : ""}>
                  <MobileIcon name={item.icon} size={25} />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
                <i>{selected ? <b /> : null}</i>
              </button>
            );
          })}
        </section>

        <button
          className={styles.startButton}
          disabled={!selectedExam}
          onClick={() =>
            selectedExam &&
            router.push(
              `${section === "writing" ? "/topik-writing" : "/topik-exam"}?examCode=${encodeURIComponent(selectedExam.code)}&mode=${mode}`,
            )
          }
          type="button"
        >
          {mode === "guided"
            ? "Izoh bilan boshlash"
            : "Sinov imtihonini boshlash"}
          <MobileIcon name="arrow-forward" size={21} />
        </button>
      </div>
    </main>
  );
}

function TopikHeader({
  onBack,
  onStats,
  roman,
  section,
  statsHidden = false,
}: {
  onBack: () => void;
  onStats: () => void;
  roman: string;
  section: TopikSection;
  statsHidden?: boolean;
}) {
  return (
    <header className={styles.header}>
      <button aria-label="Orqaga" onClick={onBack} type="button">
        <MobileIcon name="chevron-back" size={25} />
      </button>
      <strong>TOPIK {roman} · {SECTION_LABEL[section]}</strong>
      <button
        aria-label="O‘quv statistikasini ochish"
        disabled={statsHidden}
        onClick={onStats}
        type="button"
      >
        {statsHidden ? null : <MobileIcon name="stats-chart" size={21} />}
      </button>
    </header>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <span>
      <strong>{value}</strong>
      <small>{label}</small>
    </span>
  );
}

function SectionHeader({ title, caption }: { title: string; caption: string }) {
  return (
    <div className={styles.sectionHeader}>
      <h2>{title}</h2>
      <span>{caption}</span>
    </div>
  );
}

function StateCard({ text }: { text: string }) {
  return (
    <section className={styles.stateCard}>
      <i className={styles.spinner} />
      <p>{text}</p>
    </section>
  );
}
