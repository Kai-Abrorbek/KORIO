"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * 텔레그램 헤더의 네이티브 "뒤로" 버튼 ↔ 앱 내비게이션.
 *
 * 이게 없으면 안드로이드 하드웨어 뒤로가기가 **미니앱을 통째로 닫는다**
 * (텔레그램은 BackButton 이 보일 때만 그 이벤트를 앱에 넘긴다). 모바일 앱에서
 * 뒤로가기가 한 화면 뒤로 가는 것과 같게 맞춘다.
 *
 * 홈과 첫 화면에서만 숨긴다 — 거기서의 뒤로가기는 앱을 닫는 게 맞다.
 * 다른 탭(통계·리그·프리미엄)에서는 홈 탭으로 돌아간다.
 *
 * 레슨·시험처럼 나가기 전에 확인이 필요한 화면은 useTelegramBackOverride 로
 * 자기 핸들러(보통 "나가기 확인" 시트 열기)를 건다. 가장 나중에 건 것이 이긴다.
 */
/** 여기서 뒤로 = 앱 닫기 (홈·첫 화면) */
const ROOT_PATHS = new Set(["/", "/home", "/welcome"]);
/** 하단 탭. 쌓인 기록과 상관없이 뒤로 = 홈 탭 (모바일 앱 탭바와 같게) */
const TAB_PATHS = new Set(["/stats", "/league", "/premium"]);

type BackHandler = () => void;
const overrides: BackHandler[] = [];

export function useTelegramBackOverride(handler: BackHandler | null) {
  const latest = useRef(handler);
  latest.current = handler;
  const enabled = Boolean(handler);

  useEffect(() => {
    if (!enabled) return;
    const entry: BackHandler = () => latest.current?.();
    overrides.push(entry);
    syncClosingConfirmation();
    return () => {
      const index = overrides.lastIndexOf(entry);
      if (index >= 0) overrides.splice(index, 1);
      syncClosingConfirmation();
    };
  }, [enabled]);
}

/**
 * 뒤로가기를 막는 화면(레슨·시험 등 진행 중인 화면)에서는 닫기 버튼·제스처로
 * 나갈 때도 텔레그램이 한 번 물어본다. 그 외 화면에서는 바로 닫힌다.
 */
function syncClosingConfirmation() {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) return;
  if (overrides.length > 0) webApp.enableClosingConfirmation?.();
  else webApp.disableClosingConfirmation?.();
}

/**
 * 앱 안 "뒤로" 버튼용. 딥링크·알림으로 바로 들어와서 돌아갈 기록이 없으면
 * router.back() 이 아무것도 안 하거나 미니앱 밖으로 나가 버린다 → 그땐 fallback 으로.
 */
export function safeBack(router: { back(): void; replace(href: string): void }, fallback = "/home") {
  if (typeof window !== "undefined" && window.history.length > 1) router.back();
  else router.replace(fallback);
}

function normalize(pathname: string | null) {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

export function TelegramBackButtonBridge() {
  const router = useRouter();
  const pathname = normalize(usePathname());
  const isRoot = ROOT_PATHS.has(pathname);
  const isTab = TAB_PATHS.has(pathname);

  useEffect(() => {
    const button = window.Telegram?.WebApp?.BackButton;
    if (!button) return;
    if (isRoot) {
      button.hide();
      return;
    }

    const onClick = () => {
      const override = overrides.at(-1);
      if (override) {
        override();
        return;
      }
      if (isTab) {
        router.replace("/home");
        return;
      }
      // 딥링크로 바로 들어와 쌓인 기록이 없으면 홈으로
      safeBack(router);
    };
    button.onClick(onClick);
    button.show();
    return () => {
      button.offClick(onClick);
    };
  }, [isRoot, isTab, router]);

  return null;
}
