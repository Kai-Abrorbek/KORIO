"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { getCompletedTopikExams, getTopikExams } from "../api/topik";
import topikUz from "../../../shared/i18n/locales/topik/uz";
import {
  topikUzText,
  type TopikAttemptMode,
  type TopikExam,
  type TopikLevel,
  type TopikSection,
} from "../model/topik";
import styles from "./topik-home-screen.module.css";

const MODES: Array<{
  key: TopikAttemptMode;
  icon: IoniconName;
}> = [
  {
    key: "guided",
    icon: "bulb-outline",
  },
  {
    key: "mock_exam",
    icon: "timer-outline",
  },
];

const WRITING_PRACTICE: Array<{
  number: 51 | 52 | 53 | 54;
  icon: IoniconName;
}> = [
  { number: 51, icon: "mail-outline" },
  { number: 52, icon: "git-compare-outline" },
  { number: 53, icon: "bar-chart-outline" },
  { number: 54, icon: "reader-outline" },
];

const sortExams = (left: TopikExam, right: TopikExam) =>
  (right.round ?? 0) - (left.round ?? 0) ||
  (right.year ?? 0) - (left.year ?? 0) ||
  right.code.localeCompare(left.code);

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
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [completedOnly, setCompletedOnly] = useState(false);

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
      const matching = allExams
        .filter(
          (exam) => exam.examType === examType && exam.section === section,
        )
        .sort(sortExams);
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

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", refresh);
    return () => document.removeEventListener("visibilitychange", refresh);
  }, [load]);

  useEffect(() => {
    if (!pickerOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPickerOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [pickerOpen]);

  const selectedExam = useMemo(
    () => exams.find((exam) => exam.code === selectedCode) ?? null,
    [exams, selectedCode],
  );
  const completedByExamId = useMemo(
    () => new Map(completed.map((item) => [item.examId, item])),
    [completed],
  );
  const selectedCompleted = selectedExam
    ? completedByExamId.get(selectedExam.id)
    : undefined;
  const visibleExams = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return exams.filter(
      (exam) =>
        (!completedOnly || completedByExamId.has(exam.id)) &&
        (!query ||
          String(exam.round ?? "").includes(query) ||
          exam.code.toLocaleLowerCase().includes(query) ||
          topikUzText(exam.title).toLocaleLowerCase().includes(query)),
    );
  }, [completedByExamId, completedOnly, exams, search]);

  const openPicker = () => {
    setSearch("");
    setCompletedOnly(false);
    setPickerOpen(true);
  };

  const openResult = (exam: TopikExam, attemptId: string) => {
    router.push(
      section === "writing"
        ? `/topik-writing?examCode=${encodeURIComponent(exam.code)}&reviewAttemptId=${encodeURIComponent(attemptId)}`
        : `/topik-result?attemptId=${encodeURIComponent(attemptId)}`,
    );
  };

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
        <SectionHeader
          caption={`${exams.length} ta variant`}
          title={topikUz.home.roundSelection}
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
            <strong>{`TOPIK ${roman} ${topikUz.home[section]} materiallari tayyorlanmoqda.`}</strong>
            <p>Sifatli savollar tez orada qo‘shiladi.</p>
          </section>
        ) : (
          <section className={styles.selectedExamCard}>
            <button
              aria-label={topikUz.home.changeRound}
              className={styles.selectedExamMain}
              onClick={openPicker}
              type="button"
            >
              <span className={styles.selectedExamCopy}>
                <small>{topikUz.home.selectedRound}</small>
                <strong>
                  {selectedExam ? topikUzText(selectedExam.title) : "—"}
                </strong>
                <span>
                  {selectedExam
                    ? `${selectedExam.totalQuestions} savol · ${mode === "mock_exam" ? `${selectedExam.durationMinutes} daqiqa` : topikUz.common.untimed} · ${selectedExam.totalPoints} ball`
                    : ""}
                </span>
              </span>
              <span className={styles.changeRound}>
                {topikUz.home.changeRound}
                <MobileIcon name="chevron-down" size={16} />
              </span>
            </button>
            {selectedCompleted && selectedExam ? (
              <button
                className={styles.completedRow}
                onClick={() =>
                  openResult(selectedExam, selectedCompleted.latestAttemptId)
                }
                type="button"
              >
                <MobileIcon name="checkmark-circle" size={16} />
                <span>{topikUz.home.completed}</span>
                <strong>{topikUz.home.viewResult}</strong>
                <MobileIcon name="arrow-forward" size={16} />
              </button>
            ) : null}
          </section>
        )}

        <SectionHeader title={topikUz.home.studyMode} />
        <section
          aria-label={topikUz.home.studyMode}
          className={styles.modeList}
          role="radiogroup"
        >
          {MODES.map((item) => {
            const selected = item.key === mode;
            return (
              <button
                aria-checked={selected}
                className={`${styles.modeCard} ${selected ? styles.modeSelected : ""}`}
                key={item.key}
                onClick={() => setMode(item.key)}
                role="radio"
                type="button"
              >
                <span className={styles.modeTop}>
                  <MobileIcon name={item.icon} size={22} />
                  <MobileIcon
                    name={selected ? "radio-button-on" : "ellipse-outline"}
                    size={21}
                  />
                </span>
                <strong>
                  {item.key === "guided"
                    ? topikUz.modes.practice
                    : topikUz.home.mockShort}
                </strong>
                <small>
                  {item.key === "guided"
                    ? topikUz.modes.guidedDescription
                    : topikUz.modes.mockExamDescription}
                </small>
              </button>
            );
          })}
        </section>

        {section === "writing" && selectedExam ? (
          <section className={styles.writingPractice}>
            <header>
              <div>
                <h2>{topikUz.home.writingPracticeTitle}</h2>
                <p>{topikUz.home.writingPracticeDescription}</p>
              </div>
              <span>{topikUz.home.writingPracticeBadge}</span>
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
                  <strong>
                    {topikUz.home[`writingPractice${item.number}Title`]}
                  </strong>
                  <p>
                    {topikUz.home[`writingPractice${item.number}Description`]}
                  </p>
                  <small>
                    {topikUz.home.practiceNow}
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
              <strong>{topikUz.recipe.golden}</strong>
              <small>
                {topikUz.recipe.pastQuestions} · {topikUz.recipe.grammar}
              </small>
            </span>
            <MobileIcon name="chevron-forward" size={20} />
          </button>
        ) : null}
      </div>
      <footer className={styles.footer}>
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
            ? topikUz.home.startGuided
            : topikUz.home.startMock}
          <MobileIcon name="arrow-forward" size={21} />
        </button>
      </footer>
      {pickerOpen ? (
        <div
          aria-label={topikUz.home.chooseRound}
          aria-modal="true"
          className={styles.pickerOverlay}
          role="dialog"
        >
          <div className={styles.pickerScreen}>
            <header className={styles.pickerHeader}>
              <div>
                <small>
                  TOPIK {roman} · {topikUz.home[section]}
                </small>
                <h2>{topikUz.home.chooseRound}</h2>
              </div>
              <button
                aria-label={topikUz.common.close}
                onClick={() => setPickerOpen(false)}
                type="button"
              >
                <MobileIcon name="close" size={23} />
              </button>
            </header>
            <div className={styles.searchBox}>
              <MobileIcon name="search" size={20} />
              <input
                aria-label={topikUz.home.searchRounds}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={topikUz.home.searchRounds}
                type="search"
                value={search}
              />
            </div>
            <div className={styles.pickerFilters}>
              <button
                aria-pressed={!completedOnly}
                className={!completedOnly ? styles.filterSelected : ""}
                onClick={() => setCompletedOnly(false)}
                type="button"
              >
                {topikUz.home.allRounds}
              </button>
              <button
                aria-pressed={completedOnly}
                className={completedOnly ? styles.filterSelected : ""}
                onClick={() => setCompletedOnly(true)}
                type="button"
              >
                {topikUz.home.completed}
              </button>
              <span>{visibleExams.length} ta variant</span>
            </div>
            <div className={styles.pickerList} role="radiogroup">
              {visibleExams.length === 0 ? (
                <p className={styles.noRounds}>
                  {topikUz.home.noMatchingRounds}
                </p>
              ) : (
                visibleExams.map((exam) => {
                  const selected = exam.code === selectedCode;
                  return (
                    <button
                      aria-checked={selected}
                      className={`${styles.pickerRow} ${selected ? styles.pickerRowSelected : ""}`}
                      key={exam.id}
                      onClick={() => {
                        setSelectedCode(exam.code);
                        setPickerOpen(false);
                      }}
                      role="radio"
                      type="button"
                    >
                      <span>
                        <strong>{topikUzText(exam.title)}</strong>
                        <small>
                          {exam.totalQuestions} savol · taxminan{" "}
                          {exam.durationMinutes} daqiqa
                        </small>
                        {completedByExamId.has(exam.id) ? (
                          <em>{topikUz.home.completed}</em>
                        ) : null}
                      </span>
                      <MobileIcon
                        name={selected ? "radio-button-on" : "ellipse-outline"}
                        size={23}
                      />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ) : null}
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
      <span className={styles.headerCopy}>
        <strong>{topikUz.home[section]}</strong>
        <small>TOPIK {roman}</small>
      </span>
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

function SectionHeader({
  title,
  caption,
}: {
  title: string;
  caption?: string;
}) {
  return (
    <div className={styles.sectionHeader}>
      <h2>{title}</h2>
      {caption ? <span>{caption}</span> : null}
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
