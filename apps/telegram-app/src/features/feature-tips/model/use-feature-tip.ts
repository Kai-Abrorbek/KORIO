"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getGemPayouts } from "../../misc/api/misc";
import { getStickers } from "../../profile/api/stickers";
import { getMyInvite } from "../../social/api/social";
import type { InviteMilestone } from "../../social/model/social";
import {
  FEATURE_TIPS,
  MAX_SHOWS,
  PAYOUT_TIP_GEMS,
  finishTip,
  localDay,
  readTips,
  recordTipShown,
  touchFirstSeen,
} from "./feature-tips";

export type FeatureTip =
  | { id: "payout"; gems: number; minGems: number; somPerGem: number }
  | { id: "invite"; rewardGems: number; milestones: InviteMilestone[] }
  | { id: "stickers" };

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

/** 홈이 자리를 잡고 다른 안내가 먼저 지나가도록 조금 기다렸다 띄운다 */
const SHOW_DELAY_MS = 1800;

/**
 * 지금 알릴 게 있으면 하나 고른다 (앱 useFeatureTip 과 같다). 이미 쓰고 있으면
 * (출금 신청함 · 3명 넘게 초대함 · 스티커팩 있음) 그 기능은 영영 안 알린다.
 */
async function pickTip(request: AuthenticatedRequest, gems: number): Promise<FeatureTip | null> {
  const st = readTips();
  if (!st) return null;
  for (const id of FEATURE_TIPS) {
    if (st.done[id] || (st.shown[id] ?? 0) >= MAX_SHOWS) continue;
    try {
      if (id === "payout") {
        if (gems < PAYOUT_TIP_GEMS) continue;
        const o = await getGemPayouts(request);
        if (o.open || o.recent.length) {
          finishTip(id);
          continue;
        }
        return { gems: o.gems, id, minGems: o.minGems, somPerGem: o.somPerGem };
      }
      if (id === "invite") {
        if (!st.pending.invite) continue;
        const me = await getMyInvite(request);
        if (me.invitedCount >= 3) {
          finishTip(id);
          continue;
        }
        return { id, milestones: me.milestones, rewardGems: me.rewardGems };
      }
      if (id === "stickers") {
        if (!st.pending.stickers) continue;
        const state = await getStickers(request);
        if (state.pack) {
          finishTip(id);
          continue;
        }
        if (!state.enabled) continue;
        return { id };
      }
    } catch {
      // 못 물어봤으면 이번엔 넘어간다 — 다음 홈에서 다시
    }
  }
  return null;
}

/** 홈에서 쓴다. blocked 면(다른 대화상자·평가 대화상자가 떠 있거나 이번 실행에 이미 떴으면) 기다린다 */
export function useFeatureTip({
  enabled,
  blocked,
  gems,
}: {
  enabled: boolean;
  blocked: boolean;
  gems: number;
}) {
  const { request } = useTelegramAuth();
  const [tip, setTip] = useState<FeatureTip | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    if (!enabled || blocked || tip || busy.current) return;
    const st = readTips();
    const today = localDay();
    touchFirstSeen();
    if (!st || !st.firstSeenDay || st.firstSeenDay === today) return;
    if (st.lastShownDay === today) return;

    let alive = true;
    const timer = window.setTimeout(() => {
      busy.current = true;
      void pickTip(request, gems)
        .then((picked) => {
          if (!alive || !picked) return;
          recordTipShown(picked.id);
          setTip(picked);
        })
        .finally(() => {
          busy.current = false;
        });
    }, SHOW_DELAY_MS);
    return () => {
      alive = false;
      window.clearTimeout(timer);
    };
  }, [enabled, blocked, tip, gems, request]);

  const close = useCallback(() => setTip(null), []);
  /** "다시 보지 않기" */
  const neverAgain = useCallback(() => {
    if (tip) finishTip(tip.id);
    setTip(null);
  }, [tip]);

  return { tip, close, neverAgain };
}
