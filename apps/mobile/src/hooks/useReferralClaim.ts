import { useEffect, useRef } from "react";
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
import { useReferralStore } from "@/store/referral.store";
import { claimPendingReferral } from "@/utils/claim-referral";

/**
 * 초대 링크로 들어온 사람의 코드를 로그인 직후 자동으로 쓴다.
 *
 * 왜 루트 레이아웃 한 곳인가: 로그인 경로가 이메일·구글·카카오·네이버·
 * 텔레그램에 회원가입까지 여섯 갈래다. 각 화면에 붙이면 하나를 빠뜨리고,
 * 빠뜨린 경로로 들어온 사람은 보상을 영영 못 받는다. isLoggedIn 이 켜지는
 * 순간을 한 곳에서 보는 게 유일하게 안 새는 방법이다.
 */
export function useReferralClaim() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const pending = useReferralStore((s) => s.pendingCode);
  const running = useRef(false);

  useEffect(() => {
    if (!isLoggedIn || !pending || running.current) return;
    running.current = true;

    void claimPendingReferral()
      .then((res) => {
        if (!res) return;
        // 받은 순간을 그냥 넘기지 않는다 — 보상은 보여줘야 보상이다
        router.push({
          pathname: "/invite",
          params: { claimedGems: String(res.gems), from: res.nickname },
        });
      })
      .finally(() => {
        running.current = false;
      });
  }, [isLoggedIn, pending]);
}
