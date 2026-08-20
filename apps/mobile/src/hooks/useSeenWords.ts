import { useCallback, useEffect, useRef } from "react";
import { WordService } from "@/services/word.service";

/** 이만큼 쌓이면 보낸다. 카드를 빠르게 넘겨도 요청이 폭주하지 않게 */
const BATCH_SIZE = 6;

/**
 * 단어 카드를 "봤다"고 서버에 알린다.
 *
 * 카드 한 장마다 요청을 보내면 빠르게 넘길 때 요청이 쏟아지므로 모아서 보낸다.
 * 화면을 벗어날 때 남은 것도 함께 보낸다 — 안 그러면 마지막 몇 장이 늘 유실된다.
 */
export function useSeenWords() {
  const pending = useRef<string[]>([]);
  const sent = useRef<Set<string>>(new Set());

  const flush = useCallback(() => {
    const ids = pending.current;
    if (!ids.length) return;
    pending.current = [];
    WordService.markSeen(ids).catch(() => {
      // 진행도는 학습을 막을 만큼 중요하지 않다. 다음에 다시 보면 또 올라간다.
    });
  }, []);

  const markSeen = useCallback(
    (wordId?: string) => {
      if (!wordId || sent.current.has(wordId)) return;
      sent.current.add(wordId);
      pending.current.push(wordId);
      if (pending.current.length >= BATCH_SIZE) flush();
    },
    [flush],
  );

  useEffect(() => flush, [flush]);

  return { markSeen, flush };
}
