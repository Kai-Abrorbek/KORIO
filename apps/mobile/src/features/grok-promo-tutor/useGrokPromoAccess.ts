import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
import { ApiError } from "@/services/api";
import { GrokPromoApi, type GrokPromoOptions } from "./grok-promo.api";

/** Capability is checked by the server, including on every focused deep link. */
export function useGrokPromoAccess() {
  const userId = useAuthStore((state) => state.isLoggedIn ? state.user?.id : undefined);
  const [result, setResult] = useState<{
    userId: string | undefined;
    revision: number;
    options: GrokPromoOptions | null;
    error: "forbidden" | "network" | null;
  } | null>(null);
  const [revision, setRevision] = useState(0);
  useFocusEffect(useCallback(() => {
    let active = true;
    if (!userId) {
      setResult({ userId, revision, options: null, error: "forbidden" });
      return () => { active = false; };
    }
    setResult(null);
    void GrokPromoApi.options().then(
      (options) => { if (active) setResult({ userId, revision, options, error: null }); },
      (error: unknown) => {
        if (active) setResult({
          userId,
          revision,
          options: null,
          error: error instanceof ApiError && [401, 403, 404].includes(error.status) ? "forbidden" : "network",
        });
      },
    );
    return () => { active = false; };
  }, [userId, revision]));
  const current = result && result.userId === userId && result.revision === revision ? result : null;
  return {
    userId,
    options: current?.options ?? null,
    loading: current === null,
    error: current?.error ?? null,
    retry: () => setRevision((value) => value + 1),
  };
}
