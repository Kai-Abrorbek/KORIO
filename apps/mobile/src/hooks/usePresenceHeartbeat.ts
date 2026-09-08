import { useEffect, useRef } from "react";
import { AppState, type AppStateStatus } from "react-native";
import { UserService } from "@/services/user.service";
import { useAuthStore } from "@/store/auth.store";

/**
 * "지금 접속 중" 하트비트.
 *
 * ⚠️ 주기는 서버의 온라인 창(apps/api/src/users/presence.util.ts,
 * ONLINE_WINDOW_MS = 5분)보다 넉넉히 짧아야 한다. 같거나 길면 핑 사이에
 * 잠깐씩 오프라인으로 깜빡인다.
 *
 * 예전엔 (tabs)/_layout 에 있었다. 그러면 레슨·게임·튜터처럼 탭 밖 화면에
 * 들어간 순간 타이머가 죽어서, **가장 열심히 하고 있을 때 오프라인으로
 * 보였다.** 루트 레이아웃으로 올려서 앱이 떠 있는 동안 계속 뛰게 한다.
 *
 * 백그라운드에서는 멈춘다 — 앱을 안 보고 있는데 온라인이라고 하면 거짓이고,
 * 서버 쓰기도 낭비다. 포그라운드로 돌아오면 즉시 한 번 찍는다.
 */
const PING_INTERVAL_MS = 3 * 60 * 1000;

export function usePresenceHeartbeat() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isLoggedIn) return;

    const ping = () => {
      UserService.touchActive().catch(() => {});
    };
    const start = () => {
      if (timer.current) return;
      ping();
      timer.current = setInterval(ping, PING_INTERVAL_MS);
    };
    const stop = () => {
      if (!timer.current) return;
      clearInterval(timer.current);
      timer.current = null;
    };

    // 앱이 이미 떠 있는 상태로 마운트될 수 있다
    if (AppState.currentState === "active") start();

    const sub = AppState.addEventListener("change", (next: AppStateStatus) => {
      if (next === "active") start();
      else stop();
    });

    return () => {
      sub.remove();
      stop();
    };
  }, [isLoggedIn]);
}
