"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError, api } from "./client";

interface QueryState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
}

/**
 * GET 하나를 화면에 붙이는 최소한의 훅.
 *
 * react-query 를 넣을 만한 일이 아니다 — 캐시를 공유할 화면도, 낙관적 갱신도
 * 없다. 대신 **세 가지 상태를 모두 갖는다**: 로딩(뼈대), 실패(코드 노출),
 * 성공. 실패를 빈 화면으로 처리하면 원인을 알 수 없다.
 */
export function useQuery<T>(path: string | null): QueryState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (!path) return;
    let alive = true;
    setLoading(true);
    setError(null);
    api
      .get<T>(path)
      .then((res) => {
        if (!alive) return;
        setData(res);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!alive) return;
        // 401 은 세션이 처리한다(로그인 화면으로 간다). 여기서 또 띄우면 겹친다
        if (err instanceof ApiError && err.status === 401) return;
        setError(err instanceof ApiError ? err.code : "NETWORK_ERROR");
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [path, tick]);

  return { data, error, loading, reload };
}
