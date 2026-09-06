import {
  parseSocialAuthCallbackUrl,
  stageSocialAuthCallback,
} from "@/services/social-auth.service";
import { useReferralStore } from "@/store/referral.store";

/**
 * 초대 링크에서 코드를 뽑는다.
 *
 * 두 가지 모양이 들어온다.
 *   https://korio.online/i/ABC1234   (앱링크 — assetlinks 검증이 끝난 기기)
 *   mobile://invite?code=ABC1234     (커스텀 스킴 — 항상 동작)
 */
function parseInviteCode(path: string): string | null {
  const byPath = path.match(/(?:^|\/)i\/([A-Za-z0-9]{4,12})/);
  if (byPath) return byPath[1].toUpperCase();
  const byQuery = path.match(/[?&]code=([A-Za-z0-9]{4,12})/);
  if (byQuery && /invite/i.test(path)) return byQuery[1].toUpperCase();
  return null;
}

export function redirectSystemPath({
  path,
}: {
  path: string;
  initial: boolean;
}): string {
  const callback = parseSocialAuthCallbackUrl(path);
  if (callback) {
    // Keep OAuth credentials out of Expo Router's unmatched-route UI and history.
    stageSocialAuthCallback(callback);
    return "/auth/social-callback";
  }

  const code = parseInviteCode(path);
  if (code) {
    /**
     * 코드만 저장하고 루트로 보낸다.
     *
     * 여기서는 로그인 여부를 알 수 없다 (auth 복원 전이다). 초대 링크를 누른
     * 사람은 대개 앱이 처음이라, /invite 로 바로 보내면 가드가 로그인 화면으로
     * 튕겨서 아무것도 못 본 채로 계정부터 만들라는 화면을 마주한다.
     * 루트(스플래시)가 로그인 상태를 보고 알아서 나눠 보낸다.
     */
    useReferralStore.getState().setPendingCode(code);
    return "/";
  }

  return path;
}
