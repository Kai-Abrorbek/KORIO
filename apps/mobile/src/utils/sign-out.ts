import { useAuthStore } from "@/store/auth.store";
import { unregisterPushToken } from "@/hooks/usePushNotifications";

/**
 * 로그아웃.
 *
 * 토큰을 지우기 **전에** 이 기기의 푸시 등록을 해제해야 한다. 순서가 바뀌면
 * 해제 요청이 인증 없이 나가서 실패하고, 서버에는 등록이 남는다. 그러면
 * 로그아웃한 폰으로 계속 알림이 온다.
 *
 * 해제가 실패해도 로그아웃 자체는 반드시 진행한다 — 네트워크 때문에 못
 * 나가는 로그아웃이 더 나쁘다. (그 경우 다음에 그 폰에 다른 계정이 로그인하면
 * 서버가 토큰 주인을 덮어쓰면서 정리된다.)
 */
export async function signOut() {
  await unregisterPushToken().catch(() => {});
  useAuthStore.getState().logout();
}
