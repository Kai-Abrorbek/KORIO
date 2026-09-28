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
 * 탭 화면(홈·통계·리그·프리미엄)과 첫 화면에서는 숨긴다 — 거기서의 뒤로가기는
 * 앱을 닫는 게 맞다.
 *
 * 레슨·시험처럼 나가기 전에 확인이 필요한 화면은 useTelegramBackOverride 로
 * 자기 핸들러(보통 "나가기 확인" 시트 열기)를 건다. 가장 나중에 건 것이 이긴다.
 */
const ROOT_PATHS = new Set(["/", "/home", "/stats", "/league", "/premium", "/welcome"]);

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
    return () => {
      const index = overrides.lastIndexOf(entry);
      if (index >= 0) overrides.splice(index, 1);
    };
  }, [enabled]);
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
      // 딥링크로 바로 들어와 쌓인 기록이 없으면 홈으로
      if (window.history.length > 1) router.back();
      else router.replace("/home");
    };
    button.onClick(onClick);
    button.show();
    return () => {
      button.offClick(onClick);
    };
  }, [isRoot, router]);

  return null;
}
