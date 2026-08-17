import { useCallback, useEffect, useRef } from "react";
import {
  HangulProgressResponse,
  HangulResult,
  HangulService,
} from "@/services/hangul.service";
import { useAuthStore } from "@/store/auth.store";

/**
 * 한글 게임의 글자별 정/오답을 모았다가 한 번에 서버로 보낸다.
 * - 매 판정마다 요청을 날리면 게임 중 네트워크가 시끄러워지므로 버퍼링한다.
 * - 화면을 벗어날 때(언마운트) 남은 버퍼를 자동으로 비운다 → 중간에 나가도 진행도가 남음.
 * - 전송 실패 시 버퍼를 되돌려 다음 flush 때 다시 시도한다.
 */
export function useHangulReporter(source: string) {
  const buffer = useRef<HangulResult[]>([]);
  const sending = useRef(false);

  const record = useCallback((characterId: string, correct: boolean) => {
    if (!characterId) return;
    buffer.current.push({ characterId, correct });
  }, []);

  const flush = useCallback(async (): Promise<HangulProgressResponse | null> => {
    if (sending.current || buffer.current.length === 0) return null;

    const batch = buffer.current;
    buffer.current = [];
    sending.current = true;
    try {
      const res = await HangulService.submitResults(batch, source);
      if (res.justCompleted) {
        // 40자 다 익혀서 한글 노드가 자동으로 닫혔다 → 수동 완료 버튼도 같이 사라지게
        useAuthStore.getState().updateUser({
          hangulCompletedAt: res.hangulCompletedAt ?? undefined,
        });
      }
      return res;
    } catch {
      buffer.current = [...batch, ...buffer.current];
      return null;
    } finally {
      sending.current = false;
    }
  }, [source]);

  // 언마운트 시점의 최신 flush 를 쓰기 위해 ref 에 담아둔다
  const flushRef = useRef(flush);
  flushRef.current = flush;
  useEffect(() => {
    return () => {
      void flushRef.current();
    };
  }, []);

  return { record, flush };
}
