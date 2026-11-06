"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { cinemaHaptic, prefersReducedMotion } from "../../../shared/browser/cinema-clock";
import { playSfx } from "../../../shared/browser/sfx";
import styles from "./topik-result-reveal.module.css";

/**
 * TOPIK 결과 공개 — "답안지 채점" (앱 TopikResultReveal 과 같은 장면).
 *
 * 시험지 답안 칸(OMR)처럼 문항 수만큼 동그라미가 깔리고, 줄마다 채점 막대가 지나가며
 * 맞은 칸은 초록·틀린 칸은 빨강으로 칠해진다. 맞은 칸이 칠해질 때마다 점수가 오르고,
 * 다 칠하면 점수가 "쾅" 자리 잡고 금색 동그라미가 점수를 감싼다. 하늘몬이 튀어나온다.
 * 답안지를 누르면 다시 채점한다. 동작 줄이기면 끝 상태를 바로 보여 준다.
 */

const COLUMNS = 10;
const START_DELAY_MS = 380;
const SHARDS = 10;

export interface TopikRevealQuestion {
  number: number;
  isCorrect: boolean | null;
}

export function topikRevealSweepMs(count: number) {
  return count > 0 ? Math.min(1300, Math.max(650, count * 26)) : 0;
}

/** 다 공개될 때까지 — 아래 카드들의 등장 시각 */
export function topikRevealTotalMs(count: number) {
  return START_DELAY_MS + topikRevealSweepMs(count) + 120;
}

function mascotFor(score: number) {
  if (score >= 85) return "celebrating";
  if (score >= 65) return "great";
  if (score >= 40) return "proud";
  return "determined";
}

/** 손으로 친 듯한 타원 (0~200 × 0~100 상자, 화면에서 늘려 쓴다) */
const SCRIBBLE = (() => {
  const start = (-200 * Math.PI) / 180;
  const sweep = (372 * Math.PI) / 180;
  let d = "";
  for (let i = 0; i <= 48; i++) {
    const a = start + (sweep * i) / 48;
    const wobble = 1 + 0.035 * Math.sin(a * 3 + 0.7) + (i / 48) * 0.05;
    d += `${i ? "L" : "M"}${(100 + Math.cos(a) * 95 * wobble).toFixed(1)} ${(50 + Math.sin(a) * 45 * (wobble - 0.02)).toFixed(1)} `;
  }
  return d;
})();

export function TopikResultReveal({ questions, score }: { questions: TopikRevealQuestion[]; score: number }) {
  const ordered = useMemo(() => [...questions].sort((a, b) => a.number - b.number), [questions]);
  const count = ordered.length;
  const sweep = topikRevealSweepMs(count);
  const prefix = useMemo(() => {
    const out = [0];
    ordered.forEach((q, i) => out.push((out[i] ?? 0) + (q.isCorrect ? 1 : 0)));
    return out;
  }, [ordered]);
  const totalCorrect = prefix[count] ?? 0;

  const [run, setRun] = useState(0);
  const [shown, setShown] = useState(0);
  const [landed, setLanded] = useState(false);
  const frameRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    if (prefersReducedMotion()) {
      setShown(score);
      setLanded(true);
      return;
    }
    setLanded(false);
    setShown(0);
    const begin = performance.now() + START_DELAY_MS;
    const tick = (now: number) => {
      const elapsed = now - begin;
      if (elapsed >= sweep + 60) {
        setShown(score);
        setLanded(true);
        playSfx("lesson-complete");
        cinemaHaptic("success");
        frameRef.current = null;
        return;
      }
      const revealed = elapsed <= 0 || !count ? 0 : Math.min(count, Math.floor((elapsed / sweep) * count));
      setShown(totalCorrect ? Math.round((score * (prefix[revealed] ?? 0)) / totalCorrect) : 0);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [count, prefix, score, sweep, totalCorrect]);

  useEffect(() => {
    start();
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [run, start]);

  const rows = Math.ceil(count / COLUMNS);
  const vars = {
    "--start": `${START_DELAY_MS}ms`,
    "--step": `${count ? sweep / count : 0}ms`,
    "--row": `${rows ? sweep / rows : 0}ms`,
  } as CSSProperties;

  return (
    <div className={`${styles.reveal} ${landed ? styles.landed : ""}`}>
      {count > 0 ? (
        <button aria-label="Javoblar varaqasini bosing — qaytadan tekshiriladi" className={styles.sheet} key={run} onClick={() => setRun((n) => n + 1)} style={vars} type="button">
          {Array.from({ length: rows }, (_, r) => (
            <span className={styles.row} key={r} style={{ "--r": r } as CSSProperties}>
              <small>{ordered[r * COLUMNS]?.number}</small>
              {ordered.slice(r * COLUMNS, r * COLUMNS + COLUMNS).map((q, c) => (
                <i className={styles.bubble} key={q.number} style={{ "--i": r * COLUMNS + c } as CSSProperties}>
                  <b className={q.isCorrect === null ? styles.neutral : q.isCorrect ? styles.correct : styles.wrong} />
                </i>
              ))}
            </span>
          ))}
        </button>
      ) : null}

      <div className={styles.scoreRow}>
        <div aria-label={`${score} / 100 ball`} className={styles.score} role="img">
          <span className={styles.scoreInner}><strong>{shown}</strong><span>/ 100 ball</span></span>
          <svg aria-hidden className={styles.circle} preserveAspectRatio="none" viewBox="0 0 200 100">
            <path d={SCRIBBLE} pathLength={100} vectorEffect="non-scaling-stroke" />
          </svg>
          <span aria-hidden className={styles.shards}>
            {Array.from({ length: SHARDS }, (_, i) => (
              <i key={i} style={{ "--a": `${(i / SHARDS) * 360 + 17}deg`, "--d": `${62 + (i % 3) * 18}px` } as CSSProperties} />
            ))}
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- 작은 캐릭터 그림, 이미 public 에 있는 PNG */}
        <img alt="" className={styles.mascot} height={92} src={`/characters/hangulmon_${mascotFor(score)}.png`} width={92} />
      </div>
    </div>
  );
}
