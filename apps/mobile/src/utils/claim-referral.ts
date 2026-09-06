import { ReferralApi } from "@/services/referral.service";
import { useReferralStore } from "@/store/referral.store";
import { useAuthStore } from "@/store/auth.store";

/**
 * 대기 중인 초대 코드를 로그인 직후에 자동으로 쓴다.
 *
 * 링크를 누른 사람에게 "초대 코드를 입력하세요" 를 다시 시키면 대부분 안 한다.
 * 링크를 누른 것 자체가 의사표시니까, 로그인만 하면 알아서 처리돼야 한다.
 *
 * 실패해도 조용히 넘어간다 — 기한이 지났거나 이미 받았거나 하는 건 정상적인
 * 결과지 에러가 아니다. 다만 코드는 지운다. 안 지우면 로그인할 때마다 재시도한다.
 */
export async function claimPendingReferral(): Promise<{
  gems: number;
  nickname: string;
} | null> {
  const code = useReferralStore.getState().pendingCode;
  if (!code) return null;

  try {
    const res = await ReferralApi.claim(code, "link");
    useReferralStore.getState().clear();
    if (!res.success) return null;

    // 보석은 서버가 이미 올렸다. 헤더가 바로 바뀌게 로컬도 맞춰준다
    const cur = useAuthStore.getState().user?.gems ?? 0;
    useAuthStore.getState().updateUser({ gems: cur + res.gems });
    return { gems: res.gems, nickname: res.inviter.nickname };
  } catch {
    // 네트워크 실패는 "아직 못 쓴 것" 이다. 코드를 남겨두고 다음에 다시 시도한다
    return null;
  }
}
