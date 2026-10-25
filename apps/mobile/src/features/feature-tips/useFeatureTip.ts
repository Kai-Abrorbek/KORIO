import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import { PayoutService } from "@/services/payout.service";
import { ReferralApi, type InviteMilestone } from "@/services/referral.service";
import { StickersService } from "@/services/stickers.service";
import {
  FEATURE_TIPS,
  MAX_SHOWS,
  PAYOUT_TIP_GEMS,
  localDay,
  useFeatureTipsStore,
  type FeatureTipId,
} from "./featureTips.store";

export type FeatureTip =
  | { id: "payout"; gems: number; minGems: number; somPerGem: number }
  | { id: "invite"; rewardGems: number; milestones: InviteMilestone[] }
  | { id: "stickers" };

/** 홈이 자리를 잡고 다른 안내가 먼저 지나가도록 조금 기다렸다 띄운다 */
const SHOW_DELAY_MS = 1800;

/**
 * 지금 알릴 게 있으면 하나 고른다. 서버에 한 번 물어서 "이미 쓰고 있으면"
 * (출금 신청함 · 3명 넘게 초대함 · 스티커팩 있음) 그 기능은 영영 안 알린다.
 * 없으면 null.
 */
async function pickTip(gems: number): Promise<FeatureTip | null> {
  const st = useFeatureTipsStore.getState();
  const open = (id: FeatureTipId) =>
    !st.done[id] && (st.shown[id] ?? 0) < MAX_SHOWS;

  for (const id of FEATURE_TIPS) {
    if (!open(id)) continue;
    try {
      if (id === "payout") {
        if (gems < PAYOUT_TIP_GEMS) continue;
        const o = await PayoutService.overview();
        if (o.open || o.recent.length) {
          st.finish(id);
          continue;
        }
        return { id, gems: o.gems, minGems: o.minGems, somPerGem: o.somPerGem };
      }
      if (id === "invite") {
        if (!st.pending.invite) continue;
        const me = await ReferralApi.me();
        if (me.invitedCount >= 3) {
          st.finish(id);
          continue;
        }
        return { id, rewardGems: me.rewardGems, milestones: me.milestones };
      }
      if (id === "stickers") {
        if (!st.pending.stickers) continue;
        const s = await StickersService.state();
        if (s.pack) {
          st.finish(id);
          continue;
        }
        if (!s.enabled) continue;
        return { id };
      }
    } catch {
      // 못 물어봤으면 이번엔 넘어간다 — 다음 홈에서 다시
    }
  }
  return null;
}

/**
 * 홈에서 쓴다. blocked 면(다른 대화상자·평가 모달이 떠 있거나 이번 실행에 이미 떴으면) 기다린다.
 */
export function useFeatureTip({
  enabled,
  blocked,
  gems,
}: {
  enabled: boolean;
  blocked: boolean;
  gems: number;
}) {
  const [tip, setTip] = useState<FeatureTip | null>(null);
  const [focused, setFocused] = useState(false);
  const busy = useRef(false);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );

  useEffect(() => {
    if (!enabled || !focused || blocked || tip || busy.current) return;
    const st = useFeatureTipsStore.getState();
    const today = localDay();
    st.touchFirstSeen();
    if (!st.firstSeenDay || st.firstSeenDay === today) return;
    if (st.lastShownDay === today) return;

    let alive = true;
    const timer = setTimeout(() => {
      busy.current = true;
      pickTip(gems)
        .then((picked) => {
          if (!alive || !picked) return;
          useFeatureTipsStore.getState().recordShown(picked.id);
          setTip(picked);
        })
        .finally(() => {
          busy.current = false;
        });
    }, SHOW_DELAY_MS);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [enabled, focused, blocked, tip, gems]);

  const close = useCallback(() => setTip(null), []);
  /** "다시 보지 않기" */
  const neverAgain = useCallback(() => {
    if (tip) useFeatureTipsStore.getState().finish(tip.id);
    setTip(null);
  }, [tip]);

  return { tip, close, neverAgain };
}
