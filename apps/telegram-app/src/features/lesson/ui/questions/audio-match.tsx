"use client";

import { useRef, useState } from "react";

import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { CheckButton } from "../lesson-chrome";
import { MatchPairCard, type PairStatus } from "./match-pair-card";
import { shuffle, useLessonSpeech, type QuestionProps } from "./shared";
import q from "./questions.module.css";

interface Item {
  id: string;
  pairId: number;
  value: string;
  status: PairStatus;
}

const BAR_BASE = [10, 16, 24, 14, 28, 13, 22, 16, 10];

/** 재생 중엔 막대가 하나씩 늦게 출렁인다 (앱 Waveform) */
function Waveform({ active }: { active: boolean }) {
  return (
    <span className={q.wave}>
      {BAR_BASE.map((height, index) => (
        <i className={active ? q.waveOn : undefined} key={index} style={{ animationDelay: `${index * 55}ms`, height }} />
      ))}
    </span>
  );
}

/**
 * 듣고 짝맞추기 (audio_match) — 모바일 questions/AudioMatch.
 * 왼쪽은 소리 카드(누르면 읽고 파형이 춤춘다), 오른쪽은 뜻. 규칙은 WordMatching 과 같다.
 */
export function AudioMatch({ answerState, onAnswer, onSkip, question }: QuestionProps) {
  const { speak } = useLessonSpeech();
  const pairs = question.pairs ?? [];
  const [left, setLeft] = useState<Item[]>(() => shuffle(pairs.map((pair, index) => ({ id: `a-${index}`, pairId: index, status: "idle" as PairStatus, value: pair.korean }))));
  const [right, setRight] = useState<Item[]>(() => shuffle(pairs.map((pair, index) => ({ id: `t-${index}`, pairId: index, status: "idle" as PairStatus, value: pair.native }))));
  const [selA, setSelA] = useState<number | null>(null);
  const [selT, setSelT] = useState<number | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [matched, setMatched] = useState(0);
  const playTimer = useRef<number | undefined>(undefined);
  const locked = answerState !== "idle";
  const allMatched = pairs.length > 0 && matched === pairs.length;

  const setL = (index: number, status: PairStatus) => setLeft((list) => list.map((item, i) => (i === index ? { ...item, status } : item)));
  const setR = (index: number, status: PairStatus) => setRight((list) => list.map((item, i) => (i === index ? { ...item, status } : item)));

  const evaluate = (i: number, j: number) => {
    const correct = left[i]?.pairId === right[j]?.pairId;
    setSelA(null);
    setSelT(null);
    if (correct) {
      setL(i, "correct");
      setR(j, "correct");
      setMatched((count) => count + 1);
      window.setTimeout(() => {
        setL(i, "ghost");
        setR(j, "ghost");
      }, 700);
    } else {
      setL(i, "wrong");
      setR(j, "wrong");
      window.setTimeout(() => {
        setL(i, "idle");
        setR(j, "idle");
      }, 520);
    }
  };

  const tapAudio = (i: number) => {
    const item = left[i];
    if (locked || !item || item.status === "correct" || item.status === "ghost" || item.status === "wrong") return;
    speak(item.value);
    setPlaying(item.id);
    window.clearTimeout(playTimer.current);
    playTimer.current = window.setTimeout(() => setPlaying((current) => (current === item.id ? null : current)), 1300);
    if (selA === i) {
      setL(i, "idle");
      setSelA(null);
      return;
    }
    if (selA !== null) setL(selA, "idle");
    setL(i, "selected");
    setSelA(i);
    if (selT !== null) evaluate(i, selT);
  };

  const tapText = (j: number) => {
    const item = right[j];
    if (locked || !item || item.status === "correct" || item.status === "ghost" || item.status === "wrong") return;
    if (selT === j) {
      setR(j, "idle");
      setSelT(null);
      return;
    }
    if (selT !== null) setR(selT, "idle");
    setR(j, "selected");
    setSelT(j);
    if (selA !== null) evaluate(selA, j);
  };

  return (
    <div className={q.q}>
      <h1 className={q.title} style={{ lineHeight: "30px", marginBottom: 28 }}>
        {question.question || "Mos keladigan so'zlarni juftlang"}
      </h1>
      <div className={q.pairGrid}>
        <div className={q.pairCol}>
          {left.map((item, index) => (
            <MatchPairCard key={item.id} onPress={() => tapAudio(index)} status={item.status}>
              <span className={q.audioInner}>
                <MobileIcon name="volume-high" size={26} />
                <Waveform active={playing === item.id} />
              </span>
            </MatchPairCard>
          ))}
        </div>
        <div className={q.pairCol}>
          {right.map((item, index) => (
            <MatchPairCard key={item.id} onPress={() => tapText(index)} status={item.status} text={item.value} />
          ))}
        </div>
      </div>
      <CheckButton
        disabled={!allMatched || locked}
        onClick={() => allMatched && !locked && onAnswer("all_correct")}
        onSkip={onSkip}
        skipLabel={!locked ? "Tinglash mashqini o'tkazib yuborish" : undefined}
      />
    </div>
  );
}
