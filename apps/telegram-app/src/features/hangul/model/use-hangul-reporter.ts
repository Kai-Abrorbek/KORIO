"use client";

import { useCallback, useEffect, useRef } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  submitHangulResults,
  type HangulProgressResponse,
  type HangulResult,
} from "../api/hangul";

export function useHangulReporter(source: string) {
  const { request, updateUser } = useTelegramAuth();
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
      const result = await submitHangulResults(request, batch, source);
      if (result.justCompleted) {
        updateUser({
          hangulCompletedAt: result.hangulCompletedAt ?? undefined,
        });
      }
      return result;
    } catch {
      buffer.current = [...batch, ...buffer.current];
      return null;
    } finally {
      sending.current = false;
    }
  }, [request, source, updateUser]);

  const flushRef = useRef(flush);
  flushRef.current = flush;
  useEffect(
    () => () => {
      void flushRef.current();
    },
    [],
  );

  return { flush, record };
}
