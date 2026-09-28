"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { shuffle, useLessonSpeech, type QuestionProps } from "./shared";
import styles from "./grammar-build.module.css";

const LADDER = [
  { gap: 6, line: 34, padH: 9, size: 26 },
  { gap: 6, line: 31, padH: 8, size: 23 },
  { gap: 5, line: 29, padH: 8, size: 21 },
  { gap: 5, line: 26, padH: 7, size: 19 },
  { gap: 4, line: 24, padH: 7, size: 17 },
  { gap: 4, line: 22, padH: 6, size: 15 },
];

/**
 * 문법 문장 조립 (grammar_build) — 모바일 questions/GrammarBuild.
 *
 * 아래 카드 더미에서 어절을 한 줄씩 고른다(뒤 카드는 작고 흐리게 겹쳐 보인다).
 * 마지막 조각을 고르면 버튼 없이 바로 채점한다. 엔진에는 **첫 시도만** 넘기고,
 * 틀리면 어디가 틀렸는지 노란 힌트를 띄운 뒤 틀린 자리부터 다시 고르게 한다.
 * 결과는 카드 안에서 보여 주고 "Davom etish" 로 직접 넘긴다.
 */
export function GrammarBuild({ answerState, onAnswer, onNext, question }: QuestionProps) {
  const { speak } = useLessonSpeech();
  // 시드는 정답을 항상 첫 칸에 둔다 — 문제마다 한 번만 섞는다
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rows = useMemo(() => (question.buildRows ?? []).map((row) => ({ ...row, options: shuffle(row.options) })), [question.id]);
  const hints = useMemo(() => (question.buildRows ?? []).reduce<Record<string, string>>((all, row) => ({ ...all, ...(row.hints ?? {}) }), {}), [question.buildRows]);
  const full = question.answer;
  const prompt = question.answerTranslation ?? "";
  const pattern = question.tags?.[0] ?? "";

  const [width, setWidth] = useState(360);
  const [picks, setPicks] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [attemptWrong, setAttemptWrong] = useState(false);
  const [lastPicks, setLastPicks] = useState<string[]>([]);
  const [reported, setReported] = useState(false);
  const [solvedLate, setSolvedLate] = useState(false);
  const [shake, setShake] = useState(0);
  const allPicked = currentRow >= rows.length;
  const isOk = answerState === "correct" || solvedLate;

  useEffect(() => setWidth(Math.min(window.innerWidth, 560)), []);

  // 문장이 길면 글자를 줄인다 — 두 줄 안에 드는 가장 큰 단계
  const fit = useMemo(() => {
    const inner = width - 72;
    const chars = rows.reduce((count, row) => count + row.correct.length, 0);
    const count = rows.length || 1;
    const budget = inner * 2 * 0.92;
    return LADDER.find((step) => chars * step.size + count * (step.padH * 2 + step.gap) <= budget) ?? LADDER[LADDER.length - 1]!;
  }, [rows, width]);

  const joinPicks = (words: string[]) => words.reduce((result, word, index) => (index === 0 || rows[index]?.glue ? result + word : `${result} ${word}`), "");

  const pick = (rowIndex: number, word: string) => {
    if (rowIndex !== currentRow || isOk) return;
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
    setPicks((current) => [...current, word]);
    setCurrentRow((row) => row + 1);
  };

  const undo = () => {
    if (picks.length === 0 || isOk) return;
    setPicks((current) => current.slice(0, -1));
    setCurrentRow((row) => row - 1);
  };

  const runCheck = (chosen: string[]) => {
    if (chosen.length < rows.length || isOk) return;
    const right = rows.every((row, index) => chosen[index] === row.correct);
    if (!reported) {
      setReported(true);
      onAnswer(joinPicks(chosen)); // 첫 시도 — 맞든 틀리든 엔진이 기록한다
      if (right) return;
    } else if (right) {
      setSolvedLate(true);
      return;
    }
    const wrongAt = chosen.findIndex((word, index) => word !== rows[index]?.correct);
    setLastPicks(chosen);
    setAttemptWrong(true);
    setShake((count) => count + 1);
    window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
    if (wrongAt >= 0) {
      setPicks(chosen.slice(0, wrongAt));
      setCurrentRow(wrongAt);
    }
  };
  const runCheckRef = useRef(runCheck);
  runCheckRef.current = runCheck;

  // 마지막 조각을 고르면 카드에 채워진 걸 잠깐 보여 준 뒤 판정한다
  useEffect(() => {
    if (isOk || rows.length === 0 || picks.length < rows.length) return;
    const timer = window.setTimeout(() => runCheckRef.current(picks), 260);
    return () => window.clearTimeout(timer);
  }, [isOk, picks, rows.length]);

  const cardColor = (index: number, word: string) => {
    if (!attemptWrong || lastPicks[index] !== word) return "";
    return lastPicks[index] === rows[index]?.correct ? styles.pickOk : styles.pickNo;
  };

  const wrongIdx = attemptWrong ? lastPicks.findIndex((word, index) => word !== rows[index]?.correct) : -1;
  const showExplain = attemptWrong && !isOk && wrongIdx >= 0;
  const wrongWord = wrongIdx >= 0 ? (lastPicks[wrongIdx] ?? "") : "";

  return (
    <div className={styles.screen}>
      <div className={styles.scroll}>
        <div className={styles.levelTab}>
          <b data-no-translate={pattern ? true : undefined}>{pattern || "Gap tuzish"}</b>
        </div>

        <section className={`${styles.card} ${isOk ? styles.cardOk : ""} ${shake ? styles.cardShake : ""}`} key={`card-${shake}`}>
          {isOk ? (
            <span className={styles.checkMark}>
              <MobileIcon name="checkmark-sharp" size={64} />
            </span>
          ) : null}

          <div className={styles.sentence} data-no-translate>
            {allPicked || isOk ? (
              picks.map((word, index) => (
                <span
                  className={`${styles.filled} ${isOk ? styles.filledOk : ""}`}
                  key={index}
                  style={{ fontSize: fit.size, lineHeight: `${fit.line}px`, marginLeft: index === 0 || rows[index]?.glue ? 0 : fit.gap, padding: `3px ${fit.padH}px` }}
                >
                  {word}
                </span>
              ))
            ) : (
              <span className={styles.blank} style={{ fontSize: fit.size, lineHeight: `${fit.line}px`, padding: `3px ${fit.padH}px` }}>
                {joinPicks(picks)}
              </span>
            )}
          </div>

          {prompt ? (
            <p className={styles.trans} data-no-translate>
              {prompt}
            </p>
          ) : null}
          {isOk ? (
            <p className={styles.answerLine} data-no-translate>
              {full}
            </p>
          ) : null}

          {showExplain ? (
            <div className={styles.hint}>
              <div className={styles.hintHead}>
                <MobileIcon name="bulb" size={20} />
                <p data-no-translate>
                  {lastPicks.map((word, index) => (
                    <span className={word === wrongWord ? styles.hintWrong : undefined} key={index}>
                      {word}{" "}
                    </span>
                  ))}
                </p>
              </div>
              {hints[wrongWord] ? <p className={styles.hintText} data-no-translate>{hints[wrongWord]}</p> : <p className={styles.hintText}>{`'${wrongWord}' bu joyga to‘g‘ri kelmaydi. Qayta tanlang.`}</p>}
            </div>
          ) : null}

          {!isOk ? (
            <div className={styles.miniRow}>
              <button aria-label="Orqaga" className={`${styles.miniBtn} ${picks.length ? "" : styles.miniOff}`} onClick={undo} type="button">
                <MobileIcon name="arrow-undo" size={20} />
              </button>
            </div>
          ) : null}
        </section>
      </div>

      <div className={styles.bottom}>
        {isOk ? (
          <>
            <div className={styles.bigRow}>
              <button className={`${styles.bigBtn} ${styles.bigSlow}`} onClick={() => speak(full, { slow: true })} type="button">
                <MobileIcon family="material-community" name="turtle" size={28} />
                <b>Sekin</b>
              </button>
              <button className={`${styles.bigBtn} ${styles.bigListen}`} onClick={() => speak(full)} type="button">
                <MobileIcon name="volume-high" size={28} />
                <b>Qayta tinglash</b>
              </button>
            </div>
            <button className={styles.nextBtn} onClick={onNext} type="button">
              Davom etish
            </button>
          </>
        ) : (
          <div className={styles.stack}>
            {rows.map((row, index) => {
              if (index < currentRow) return null;
              const depth = index - currentRow;
              const active = depth === 0;
              return (
                <div
                  className={styles.row}
                  key={`${question.id}-${index}`}
                  style={{ marginBottom: active ? 0 : -15, opacity: active ? 1 : 1 - Math.min(depth, 3) * 0.2, transform: `scale(${1 - Math.min(depth, 3) * 0.05})`, zIndex: 50 - depth }}
                >
                  {row.options.map((word) => (
                    <button
                      className={`${styles.pick} ${active ? styles.pickActive : ""} ${cardColor(index, word)}`}
                      data-no-translate
                      disabled={!active}
                      key={word}
                      onClick={() => pick(index, word)}
                      type="button"
                    >
                      <span>{word}</span>
                      {active ? <MobileIcon name="chevron-up" size={16} /> : null}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
