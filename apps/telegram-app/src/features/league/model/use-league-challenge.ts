"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";

interface ChallengeResult {
  tier: string;
  id: string;
  score: number;
  xpEarned: number;
  maxXp: number;
  playsToday: number;
  playsLeftToday: number;
  counted: boolean;
}

export function useLeagueChallenge() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [isChallenge, setIsChallenge] = useState(false);
  const [tier, setTier] = useState("bronze");
  const submitting = useRef(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setIsChallenge(query.get("mode") === "challenge");
    setTier(query.get("tier") ?? "bronze");
  }, []);

  const goBack = useCallback(() => {
    if (window.history.length > 1) router.back();
    else router.replace("/home");
  }, [router]);

  const finish = useCallback(async (score: number) => {
    if (!isChallenge) {
      goBack();
      return;
    }
    if (submitting.current) return;
    submitting.current = true;
    const safeScore = Math.max(0, Math.round(score || 0));
    const result = await request<ChallengeResult>("/league/challenge/complete", {
      body: JSON.stringify({ score: safeScore }),
      method: "POST",
    }).catch(() => null);
    router.replace(
      `/challenge-result?tier=${encodeURIComponent(tier)}&xp=${result?.xpEarned ?? 0}&score=${result?.score ?? safeScore}&counted=${result && !result.counted ? "0" : "1"}`,
    );
  }, [goBack, isChallenge, request, router, tier]);

  return { finish, goBack, isChallenge };
}
