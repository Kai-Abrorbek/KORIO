"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import type { AnswerState, LessonQuestion } from "../../model/lesson";
import { LessonCharacter } from "../lesson-character";
import { AnswerChip, BankSlot, type AnswerChipItem } from "./answer-chip";
import { useLessonSpeech } from "./shared";
import styles from "./builder.module.css";

/* ───────── 답 영역 줄 수 (모바일 useAnswerLines) ───────── */

/** 답 영역 한 줄 높이 (AnswerChip 높이 + 여백) */
export const ANSWER_LINE_H = 65;
/** AnswerChip: 좌우 패딩 14×2 + lineSlot 오른쪽 여백 8 */
const CHIP_CHROME = 14 * 2 + 8;
const CJK = /[ㄱ-힝一-鿿぀-ヿ]/;

function chipWidth(word: string) {
  let width = 0;
  for (const char of word) width += CJK.test(char) ? 15.5 : char === " " ? 4.5 : 8.8;
  return width + CHIP_CHROME;
}

function estimateLines(words: readonly string[], available: number) {
  if (!words.length || available <= 0) return 1;
  let lines = 1;
  let x = 0;
  for (const word of words) {
    const width = Math.min(chipWidth(word), available);
    if (x + width > available) {
      lines += 1;
      x = width;
    } else x += width;
  }
  return lines;
}

/** 세로가 짧은 기기 — 캐릭터와 답 줄 수를 줄여 확인 버튼을 지킨다 (앱: 창 높이 < 700) */
export function useCompact() {
  const [compact, setCompact] = useState(() => typeof window !== "undefined" && window.innerHeight < 700);
  useEffect(() => {
    const update = () => setCompact(window.innerHeight < 700);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return compact;
}

/**
 * 룰드 라인 답 영역. 전체 단어로 필요한 줄 수를 **처음부터** 잡아 두고(칩 올릴 때 아래가
 * 흔들리지 않게), 실제 배치가 그보다 길어지면 그때만 줄을 늘린다.
 */
export function AnswerArea({
  answerState,
  compact,
  large = false,
  onDragToZone,
  onSwap,
  onTap,
  placed,
  words,
  className,
}: {
  answerState: AnswerState;
  compact: boolean;
  large?: boolean;
  onDragToZone: (id: string, zone: "bank" | "placed") => void;
  onSwap: (draggedId: string, targetId: string) => void;
  onTap: (id: string) => void;
  placed: AnswerChipItem[];
  /** 뱅크+답 전체 단어 */
  words: readonly string[];
  className?: string;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [needed, setNeeded] = useState(0);
  const key = words.join(" ");
  const max = compact ? 2 : 3;
  const estimated = useMemo(() => Math.min(max, Math.max(2, estimateLines(words, width))), [key, max, width]); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    const area = areaRef.current;
    const wrap = wrapRef.current;
    if (!area || !wrap) return;
    setWidth(area.clientWidth);
    const observer = new ResizeObserver(() => {
      setWidth(area.clientWidth);
      setNeeded(Math.ceil(wrap.offsetHeight / ANSWER_LINE_H));
    });
    observer.observe(area);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  const lines = Math.max(estimated, needed);
  return (
    <div className={`${styles.answerArea} ${className ?? ""}`} ref={areaRef} style={{ minHeight: lines * ANSWER_LINE_H }}>
      {Array.from({ length: lines }, (_, index) => (
        <span aria-hidden="true" className={styles.answerLine} key={index} style={{ top: (index + 1) * ANSWER_LINE_H - 2 }} />
      ))}
      <div className={styles.placedWrap} ref={wrapRef}>
        {placed.map((item, index) => (
          <span className={styles.lineSlot} key={item.id}>
            <AnswerChip answerState={answerState} item={item} large={large} onDragToZone={onDragToZone} onSwap={onSwap} onTap={onTap} orderIndex={index} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────── 단어 뱅크 (모바일 WordBankSheet) ───────── */

/** 인라인 뱅크로 감당 가능한 한계. 넘으면 바텀시트로 내린다 */
const INLINE_BANK_LIMIT = 9;
const LONG_ANSWER_WORDS = 6;

export function isLongBank(question: LessonQuestion, compact = false) {
  const chipLimit = compact ? 6 : INLINE_BANK_LIMIT;
  const wordLimit = compact ? 4 : LONG_ANSWER_WORDS;
  return (question.options?.length ?? 0) > chipLimit || (question.answer?.split(" ").length ?? 0) > wordLimit;
}

export function WordBank({
  answerState,
  centered = false,
  large = false,
  long,
  onDragToZone,
  onTap,
  words,
}: {
  answerState: AnswerState;
  centered?: boolean;
  large?: boolean;
  /** 칩이 많아 시트로 내리는지 */
  long: boolean;
  onDragToZone: (id: string, zone: "bank" | "placed") => void;
  onTap: (id: string) => void;
  words: AnswerChipItem[];
}) {
  const [open, setOpen] = useState(false);
  const chips = words.map((item) => (
    <BankSlot empty={item.zone === "placed"} key={item.id} large={large}>
      <AnswerChip answerState={answerState} item={{ ...item, zone: "bank" }} large={large} onDragToZone={onDragToZone} onTap={onTap} />
    </BankSlot>
  ));

  if (!long) return <div className={`${styles.bank} ${centered ? styles.bankCentered : ""}`}>{chips}</div>;
  return (
    <>
      {!open ? (
        <button className={styles.bankHint} onClick={() => setOpen(true)} type="button">
          <MobileIcon name="chevron-up" size={18} />
          <span>Lug&apos;atni ko&apos;rish uchun bosing</span>
        </button>
      ) : null}
      {open && typeof document !== "undefined"
        ? createPortal(
            <div className={styles.sheetWrap}>
              <button aria-label="Yopish" className={styles.sheetBackdrop} onClick={() => setOpen(false)} type="button" />
              <div className={styles.sheet}>
                <span className={styles.grabber} />
                <div className={styles.sheetChips}>{chips}</div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

/* ───────── 캐릭터 + 스피커 말풍선 (SentenceBuilder·WordArrange) ───────── */

export function NpcSpeakers({
  answerState,
  combo,
  compact,
  question,
  text,
  tailTop = "30%",
}: {
  answerState: AnswerState;
  combo: number;
  compact: boolean;
  question: LessonQuestion;
  text: string;
  tailTop?: string;
}) {
  const { speak, speaking } = useLessonSpeech();
  return (
    <div className={styles.npcRow} style={{ height: compact ? 148 : 180 }}>
      <LessonCharacter combo={combo} height={compact ? 138 : 170} seed={question.id} state={answerState} />
      <div className={styles.speakerBubble} style={{ ["--tail-top" as string]: tailTop }}>
        <span className={styles.tailBorder} />
        <span className={styles.tailInner} />
        <button aria-label="Tinglash" className={`${styles.speakerBtn} ${speaking ? styles.speakerBtnActive : ""}`} onClick={() => speak(text)} type="button">
          <MobileIcon name="volume-high" size={28} />
        </button>
        <button aria-label="Sekin tinglash" className={styles.speakerBtn} onClick={() => speak(text, { slow: true })} type="button">
          <MobileIcon family="material-community" name="turtle" size={26} />
        </button>
      </div>
    </div>
  );
}

