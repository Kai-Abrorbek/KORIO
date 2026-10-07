"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError, api } from "./client";

interface QueryState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
}

interface QueryOptions {
  /** 0 disables polling. Live API pages refresh every 30 seconds by default. */
  refreshMs?: number;
}

const DEFAULT_REFRESH_MS = 30_000;

/**
 * GET 하나를 화면에 붙이는 최소한의 훅.
 *
 * react-query 를 넣을 만한 일이 아니다 — 캐시를 공유할 화면도, 낙관적 갱신도
 * 없다. 대신 로딩(뼈대), 실패(코드 노출), 성공을 구분하고, 화면이 보이는 동안
 * 최신 값을 다시 읽는다. 실패를 빈 화면이나 오래된 숫자로 처리하지 않는다.
 */
export function useQuery<T>(path: string | null, options: QueryOptions = {}): QueryState<T> {
  const [state, setState] = useState<{ path: string | null; data: T | null; error: string | null; loading: boolean }>({ path: null, data: null, error: null, loading: false });
  const [tick, setTick] = useState(0);
  const refreshMs = options.refreshMs ?? DEFAULT_REFRESH_MS;

  const reload = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (!path) {
      setState({ path: null, data: null, error: null, loading: false });
      return;
    }
    let alive = true;
    let inFlight = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let controller: AbortController | null = null;
    let lastFinishedAt = 0;

    const clearTimer = () => {
      if (timer !== null) clearTimeout(timer);
      timer = null;
    };

    const schedule = () => {
      clearTimer();
      if (!alive || refreshMs <= 0 || document.visibilityState === "hidden") return;
      timer = setTimeout(() => void load(), refreshMs);
    };

    const load = async () => {
      if (!alive || inFlight || document.visibilityState === "hidden") return;
      clearTimer();
      inFlight = true;
      controller = new AbortController();
      // Background refresh keeps the previous value visible; only a new path
      // starts with a skeleton. Failed refreshes surface an error, not stale data.
      setState((current) => current.path === path && current.data !== null
        ? { ...current, error: null }
        : { path, data: null, error: null, loading: true });
      try {
        const data = await api.get<T>(path, { signal: controller.signal });
        if (alive) setState({ path, data, error: null, loading: false });
      } catch (err: unknown) {
        if (!alive || (err instanceof DOMException && err.name === "AbortError")) return;
        // 401 is handled by the session and redirects to login.
        if (err instanceof ApiError && err.status === 401) return;
        setState({ path, data: null, error: err instanceof ApiError ? err.code : "NETWORK_ERROR", loading: false });
      } finally {
        inFlight = false;
        controller = null;
        lastFinishedAt = Date.now();
        schedule();
      }
    };

    const resume = () => {
      if (document.visibilityState === "hidden") {
        clearTimer();
      } else if (refreshMs <= 0) {
        return;
      } else if (Date.now() - lastFinishedAt >= refreshMs) {
        void load();
      } else {
        schedule();
      }
    };

    void load();
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("focus", resume);
    window.addEventListener("online", resume);
    return () => {
      alive = false;
      clearTimer();
      controller?.abort();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("focus", resume);
      window.removeEventListener("online", resume);
    };
  }, [path, tick, refreshMs]);

  // URL 변경 직후 effect가 실행되기 전에도 이전 기간의 수치를 보여주지 않는다.
  if (state.path !== path) return { data: null, error: null, loading: !!path, reload };
  return { data: state.data, error: state.error, loading: state.loading, reload };
}
