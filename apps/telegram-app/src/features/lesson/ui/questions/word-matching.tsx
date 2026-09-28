"use client";

import { useEffect, useState } from "react";

import { CheckButton } from "../lesson-chrome";
import { MatchPairCard, type PairStatus } from "./match-pair-card";
import { shuffle, useLessonSpeech, type QuestionProps } from "./shared";
import styles from "./questions.module.css";

/**
 * 단어 짝맞추기 (word_matching) — 모바일 questions/WordMatching.
 * 한국어 ↔ 뜻 두 줄을 섞어 두고, 둘을 골라 맞으면 초록(→ 흐려짐), 틀리면 빨강 흔들림.
 * 다 맞추면 확인 → "all_correct".
 */
interface Item {
  id: string;
  pairId: number;
  text: string;
  status: PairStatus;
}

const CARD_H = 85;

export function WordMatching({ answerState, onAnswer, question }: QuestionProps) {
  const { prewarm, speak, stop } = useLessonSpeech();
  const pairs = question.pairs ?? [];
  const [left, setLeft] = useState<Item[]>(() =>
    shuffle(pairs.map((pair, index) => ({ id: `k-${index}`, pairId: index, status: "idle" as PairStatus, text: pair.korean }))),
  );
  const [right, setRight] = useState<Item[]>(() =>
    shuffle(pairs.map((pair, index) => ({ id: `n-${index}`, pairId: index, status: "idle" as PairStatus, text: pair.native }))),
  );
  const [selL, setSelL] = useState<number | null>(null);
  const [selR, setSelR] = useState<number | null>(null);
  const [matched, setMatched] = useState(0);

  // 짝을 맞춘 순간 읽어 줄 단어는 미리 받아 둔다 (한 박자 늦게 나지 않게)
  useEffect(() => {
    prewarm(pairs.map((pair) => pair.korean));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const locked = answerState !== "idle";
  const allDone = pairs.length > 0 && matched === pairs.length;
  const setLS = (index: number, status: PairStatus) =>
    setLeft((current) => current.map((item, i) => (i === index ? { ...item, status } : item)));
  const setRS = (index: number, status: PairStatus) =>
    setRight((current) => current.map((item, i) => (i === index ? { ...item, status } : item)));

  const evaluate = (i: number, j: number) => {
    const correct = left[i]!.pairId === right[j]!.pairId;
    setSelL(null);
    setSelR(null);
    if (correct) {
      setLS(i, "correct");
      setRS(j, "correct");
      setMatched((value) => value + 1);
      speak(left[i]!.text);
      window.setTimeout(() => {
        setLS(i, "ghost");
        setRS(j, "ghost");
      }, 700);
    } else {
      setLS(i, "wrong");
      setRS(j, "wrong");
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      window.setTimeout(() => {
        setLS(i, "idle");
        setRS(j, "idle");
      }, 520);
    }
  };

  const busy = (status: PairStatus) => status === "correct" || status === "ghost" || status === "wrong";

  const tapL = (i: number) => {
    if (locked) return;
    stop();
    if (busy(left[i]!.status)) return;
    if (selL === i) {
      setLS(i, "idle");
      setSelL(null);
      return;
    }
    if (selL !== null) setLS(selL, "idle");
    setLS(i, "selected");
    setSelL(i);
    if (selR !== null) evaluate(i, selR);
  };

  const tapR = (j: number) => {
    if (locked) return;
    stop();
    if (busy(right[j]!.status)) return;
    if (selR === j) {
      setRS(j, "idle");
      setSelR(null);
      return;
    }
    if (selR !== null) setRS(selR, "idle");
    setRS(j, "selected");
    setSelR(j);
    if (selL !== null) evaluate(selL, j);
  };

  return (
    <div className={styles.q}>
      <h1 className={styles.title}>{question.question}</h1>
      <p className={styles.sub}>Mos keladigan so&apos;zlarni juftlang</p>

      <div className={styles.pairGrid}>
        <div className={styles.pairCol}>
          {left.map((item, i) => (
            <MatchPairCard height={CARD_H} key={item.id} onPress={() => tapL(i)} status={item.status} text={item.text} />
          ))}
        </div>
        <div className={styles.pairCol}>
          {right.map((item, j) => (
            <MatchPairCard height={CARD_H} key={item.id} onPress={() => tapR(j)} status={item.status} text={item.text} />
          ))}
        </div>
      </div>

      <div className={styles.spacer} />
      <CheckButton disabled={!allDone || locked} onClick={() => !locked && allDone && onAnswer("all_correct")} />
    </div>
  );
}
