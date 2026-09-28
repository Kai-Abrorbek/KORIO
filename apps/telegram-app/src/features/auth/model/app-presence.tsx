"use client";

import { useEffect } from "react";

import type { KorioTelegramUser } from "../api/telegram-auth";
import { useTelegramAuth } from "./telegram-auth-context";

/**
 * 앱 루트에서 조용히 도는 두 가지 — 모바일 _layout 과 같다.
 *
 * 1) 시간대 맞추기 (앱 utils/timezone syncTimezone)
 *    서버는 "오늘 XP"·연속 학습·리그 주간 경계를 계정의 시간대로 자른다. 텔레그램으로만
 *    쓰는 사람은 이 값이 한 번도 안 맞춰져서, 타슈켄트 저녁 공부가 다음 날로 넘어갔다.
 *
 * 2) 접속 중 하트비트 (앱 usePresenceHeartbeat)
 *    서버 온라인 창(5분)보다 짧게 3분마다. 화면을 안 보고 있으면 멈춘다.
 */
const PING_INTERVAL_MS = 3 * 60 * 1000;

function deviceTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    return "";
  }
}

/** 로그인 응답엔 없고 getMe 에만 있는 값들 — 모바일은 메인 진입 때 getMe 로 store 를 채운다 */
type MeSync = Pick<
  KorioTelegramUser,
  "energy" | "gems" | "hasUsedTrial" | "isSuper" | "league" | "superExpiresAt" | "superPlan"
> & { timezone?: string };

export function AppPresence() {
  const { request, status, updateUser } = useTelegramAuth();

  useEffect(() => {
    if (status !== "authenticated") return;
    const timezone = deviceTimezone();
    void request<MeSync>("/users/me")
      .then((me) => {
        // 체험을 이미 쓴 사람에게 "무료 체험" 을 다시 약속하지 않으려면 hasUsedTrial 이 필요하다
        const synced: Partial<KorioTelegramUser> = {
          energy: me.energy,
          gems: me.gems,
          hasUsedTrial: me.hasUsedTrial,
          isSuper: me.isSuper,
          league: me.league,
          superExpiresAt: me.superExpiresAt,
          superPlan: me.superPlan,
        };
        // 응답에 없는 값으로 이미 알던 값을 지우지 않는다
        updateUser(Object.fromEntries(Object.entries(synced).filter(([, value]) => value !== undefined)));
        if (!timezone || me.timezone === timezone) return;
        return request("/users/me/timezone", {
          body: JSON.stringify({ timezone }),
          method: "PATCH",
        });
      })
      .catch(() => undefined);
  }, [request, status, updateUser]);

  useEffect(() => {
    if (status !== "authenticated") return;
    let timer: number | null = null;
    const ping = () => {
      void request("/users/me/active", { body: "{}", method: "POST" }).catch(() => undefined);
    };
    const start = () => {
      if (timer !== null) return;
      ping();
      timer = window.setInterval(ping, PING_INTERVAL_MS);
    };
    const stop = () => {
      if (timer === null) return;
      window.clearInterval(timer);
      timer = null;
    };
    const onVisibility = () => (document.visibilityState === "visible" ? start() : stop());
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, [request, status]);

  return null;
}
