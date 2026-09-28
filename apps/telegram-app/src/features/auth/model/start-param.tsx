"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { claimInvite } from "../../social/api/social";
import { useTelegramAuth } from "./telegram-auth-context";

/**
 * 딥링크(`t.me/<봇>/<앱>?startapp=...`)로 들어온 파라미터 처리 — 앱의 +native-intent / useReferralClaim.
 *
 *   i_<CODE> · ref_<CODE> · invite_<CODE>  → 초대 코드를 자동으로 쓰고 받은 보석을 보여 준다
 *   u_<userId>                            → 그 사람 프로필로
 *
 * 링크를 누른 것 자체가 의사표시니 "코드를 입력하세요" 를 다시 시키지 않는다. 기한 지남·이미 받음은
 * 정상 결과라 조용히 넘긴다. 같은 파라미터로 새로고침해도 다시 돌지 않게 세션에 표시해 둔다.
 */
const HANDLED_KEY = "korio-start-param-handled";

export function StartParamHandler() {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();

  useEffect(() => {
    const raw = window.Telegram?.WebApp.initDataUnsafe.start_param?.trim();
    if (!raw || !user) return;
    try {
      if (window.sessionStorage.getItem(HANDLED_KEY) === raw) return;
      window.sessionStorage.setItem(HANDLED_KEY, raw);
    } catch {
      // 저장소가 막혀 있어도 한 번은 처리한다
    }

    const invite = raw.match(/^(?:i|ref|invite)[_-]([A-Za-z0-9]{4,16})$/u)?.[1];
    if (invite) {
      void claimInvite(request, invite.toUpperCase(), "link")
        .then((result) => {
          if (!result.success) return;
          updateUser({ gems: (user.gems ?? 0) + result.gems });
          const query = new URLSearchParams({ claimedGems: String(result.gems), from: result.inviter.nickname });
          router.push(`/invite?${query.toString()}`);
        })
        .catch(() => undefined);
      return;
    }

    const profile = raw.match(/^u[_-]([A-Za-z0-9]{6,40})$/u)?.[1];
    if (profile && profile !== user.id) router.push(`/friend-profile?id=${encodeURIComponent(profile)}`);
    // user 가 처음 채워질 때 한 번만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Boolean(user)]);

  return null;
}
