"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import type { AnswerState } from "../../model/lesson";
import { shuffle } from "./shared";
import styles from "./builder.module.css";

/**
 * 모바일 components/lesson/AnswerChip 의 웹판.
 *
 * - 탭: 뱅크 ↔ 답 영역 이동
 * - 끌기: 답 영역 칩을 다른 답 칩 위에 놓으면 자리 바꾸기, 아래로 50px 넘게 끌면 뱅크로,
 *   뱅크 칩을 위로 50px 넘게 끌면 답 영역으로 (앱과 같은 판정)
 * - 채점: 답 칩이 왼쪽부터 차례로 초록 팝(80ms 간격) / 빨강 흔들림(40ms 간격)
 *
 * 드래그 중엔 touch-action:none 이라 칩 위에서 시작한 스와이프는 스크롤이 아니라 끌기다 (앱과 같음).
 */
export interface AnswerChipItem {
  id: string;
  word: string;
  zone: "bank" | "placed";
  placedIndex: number;
}

interface ChipProps {
  item: AnswerChipItem;
  /** 답 영역에서의 순서 — 채점 연출 간격용 */
  orderIndex?: number;
  answerState: AnswerState;
  onTap: (id: string) => void;
  onDragToZone: (id: string, zone: "bank" | "placed") => void;
  onSwap?: (draggedId: string, targetId: string) => void;
  /** 사진형 번역 문제에서 쓰는 조금 더 큰 칩 */
  large?: boolean;
}

const DRAG_START = 6;
const ZONE_DISTANCE = 50;

export function AnswerChip({ answerState, item, large = false, onDragToZone, onSwap, onTap, orderIndex = 0 }: ChipProps) {
  const drag = useRef<{ pointer: number; x: number; y: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const locked = answerState !== "idle";
  const placed = item.zone === "placed";

  const drop = (dx: number, dy: number, clientX: number, clientY: number) => {
    // 1) 답 → 답 자리 바꾸기: 손가락 아래 다른 답 칩이 있으면
    if (placed && onSwap) {
      const target = document
        .elementsFromPoint(clientX, clientY)
        .map((element) => (element as HTMLElement).closest?.<HTMLElement>("[data-chip-zone='placed']"))
        .find((element) => element && element.dataset.chipId !== item.id);
      if (target?.dataset.chipId) {
        onSwap(item.id, target.dataset.chipId);
        return;
      }
    }
    // 2) 뱅크 ↔ 답
    if (placed && dy > ZONE_DISTANCE) onDragToZone(item.id, "bank");
    else if (!placed && dy < -ZONE_DISTANCE) onDragToZone(item.id, "placed");
    void dx;
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (locked || (event.pointerType === "mouse" && event.button !== 0)) return;
    drag.current = { moved: false, pointer: event.pointerId, x: event.clientX, y: event.clientY };
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = drag.current;
    if (!current || current.pointer !== event.pointerId) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (!current.moved) {
      if (Math.hypot(dx, dy) < DRAG_START) return;
      current.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setOffset({ x: dx, y: dy });
  };
  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = drag.current;
    drag.current = null;
    if (!current || current.pointer !== event.pointerId) return;
    if (current.moved) {
      suppressClick.current = true;
      window.setTimeout(() => (suppressClick.current = false), 0);
      setOffset(null);
      drop(event.clientX - current.x, event.clientY - current.y, event.clientX, event.clientY);
    }
  };
  const onPointerCancel = () => {
    drag.current = null;
    setOffset(null);
  };

  const graded = placed && answerState !== "idle" ? answerState : null;
  const className = [
    styles.chip,
    large ? styles.chipLarge : "",
    offset ? styles.chipDragging : "",
    graded === "correct" ? styles.chipCorrect : graded === "wrong" ? styles.chipWrong : "",
  ].join(" ");

  return (
    <button
      className={className}
      data-chip-id={item.id}
      data-chip-zone={item.zone}
      data-no-translate
      disabled={locked}
      onClick={() => {
        if (suppressClick.current || locked) return;
        onTap(item.id);
      }}
      onPointerCancel={onPointerCancel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        ["--i" as string]: orderIndex,
        transform: offset ? `translate(${offset.x}px, ${offset.y}px) scale(1.12)` : undefined,
      }}
      type="button"
    >
      {item.word}
    </button>
  );
}

/** 뱅크 자리: 답으로 올라간 칩은 자리만 남기고(투명) 그 위에 빈 칩 모양을 덮는다 */
export function BankSlot({ children, empty, large = false }: { children: React.ReactNode; empty: boolean; large?: boolean }) {
  return (
    <span className={styles.bankSlot}>
      <span className={empty ? styles.bankHidden : undefined}>{children}</span>
      {empty ? <span aria-hidden="true" className={`${styles.bankGhost} ${large ? styles.bankGhostLarge : ""}`} /> : null}
    </span>
  );
}

/**
 * 칩 상태 — SentenceBuilder·TranslateBuilder·WordArrange 공용.
 * shuffleOnStart: SentenceBuilder 만 클라이언트에서 한 번 섞는다(앱과 같음).
 */
export function useChipWords(options: readonly string[] | undefined, instanceKey: string, shuffleOnStart = false) {
  const initial = useMemo(
    () => (shuffleOnStart ? shuffle(options ?? []) : [...(options ?? [])]).map<AnswerChipItem>((word, index) => ({ id: `w-${index}`, placedIndex: index, word, zone: "bank" })),
    // 같은 문제를 다시 풀 때(instanceKey) 새로 섞는다
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [instanceKey],
  );
  const [words, setWords] = useState(initial);
  useLayoutEffect(() => setWords(initial), [initial]);

  const nextIndex = (list: AnswerChipItem[]) => Math.max(0, ...list.filter((word) => word.zone === "placed").map((word) => word.placedIndex)) + 1;

  const tap = useCallback((id: string) => {
    setWords((list) => {
      const target = list.find((word) => word.id === id);
      if (!target) return list;
      const toPlaced = target.zone === "bank";
      const index = nextIndex(list);
      return list.map((word) => (word.id === id ? { ...word, placedIndex: toPlaced ? index : word.placedIndex, zone: toPlaced ? "placed" : "bank" } : word));
    });
  }, []);

  const moveToZone = useCallback((id: string, zone: "bank" | "placed") => {
    setWords((list) => {
      const index = nextIndex(list);
      return list.map((word) => (word.id === id ? { ...word, placedIndex: zone === "placed" ? index : word.placedIndex, zone } : word));
    });
  }, []);

  const swap = useCallback((draggedId: string, targetId: string) => {
    setWords((list) => {
      const dragged = list.find((word) => word.id === draggedId);
      const target = list.find((word) => word.id === targetId);
      if (!dragged || !target || dragged.zone !== "placed" || target.zone !== "placed") return list;
      return list.map((word) =>
        word.id === draggedId ? { ...word, placedIndex: target.placedIndex } : word.id === targetId ? { ...word, placedIndex: dragged.placedIndex } : word,
      );
    });
  }, []);

  const placed = useMemo(() => words.filter((word) => word.zone === "placed").sort((a, b) => a.placedIndex - b.placedIndex), [words]);
  return { moveToZone, placed, swap, tap, words };
}
