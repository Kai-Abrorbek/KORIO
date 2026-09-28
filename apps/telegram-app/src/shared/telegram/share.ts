"use client";

import { translateText } from "../i18n/language-context";

/**
 * 앱의 Share.share 자리.
 *
 * 텔레그램 안에서는 t.me/share/url 로 **채팅 선택창**을 연다 — 친구에게 보내는 가장 자연스러운 길이다.
 * 텔레그램 밖(브라우저)에선 Web Share, 그것도 없으면 클립보드에 복사하고 토스트를 띄운다.
 * 예전엔 Web Share 가 없는 안드로이드/데스크톱 텔레그램에서 조용히 복사만 해서 버튼이 죽은 것처럼 보였다.
 * 글은 DOM 밖이라 번역기가 못 보므로 줄마다 직접 옮긴다.
 */
export async function shareMessage(message: string, title = "KORIO"): Promise<void> {
  // 여러 줄 템플릿(초대 문구 등)은 통째로, 안 맞으면 줄마다 옮긴다
  const whole = translateText(message);
  const text =
    whole !== message
      ? whole
      : message
          .split("\n")
          .map((line) => translateText(line))
          .join("\n");
  window.Telegram?.WebApp.HapticFeedback?.impactOccurred("medium");

  const webApp = window.Telegram?.WebApp;
  if (webApp?.initData && webApp.openTelegramLink) {
    const url = text.match(/https?:\/\/\S+/u)?.[0];
    const body = url ? text.replace(url, "").replace(/\n{2,}/g, "\n").trim() : "";
    const shareUrl = url
      ? `https://t.me/share/url?url=${encodeURIComponent(url)}${body ? `&text=${encodeURIComponent(body)}` : ""}`
      : `https://t.me/share/url?url=${encodeURIComponent(text)}`;
    try {
      webApp.openTelegramLink(shareUrl);
      return;
    } catch {
      // 오래된 클라이언트 — 아래로
    }
  }

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ text, title });
    } catch {
      // 공유 시트를 그냥 닫아도 여기로 온다
    }
    return;
  }

  try {
    await navigator.clipboard?.writeText(text);
    showToast("Nusxalandi");
  } catch {
    // 복사도 안 되면 할 수 있는 게 없다
  }
}

/** 화면 아래 잠깐 뜨는 알림 (앱의 Toast). 레이아웃과 상관없이 body 에 붙였다 뗀다 */
export function showToast(message: string) {
  if (typeof document === "undefined") return;
  const toast = document.createElement("div");
  toast.setAttribute("role", "status");
  toast.textContent = translateText(message);
  Object.assign(toast.style, {
    background: "rgba(26,26,46,.92)",
    borderRadius: "14px",
    bottom: "calc(24px + max(env(safe-area-inset-bottom), var(--tg-content-safe-area-inset-bottom, 0px)))",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "700",
    left: "50%",
    maxWidth: "80vw",
    opacity: "0",
    padding: "11px 18px",
    pointerEvents: "none",
    position: "fixed",
    textAlign: "center",
    transform: "translate(-50%, 8px)",
    transition: "opacity .18s ease, transform .18s ease",
    zIndex: "200",
  } satisfies Partial<CSSStyleDeclaration>);
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translate(-50%, 0)";
  });
  window.setTimeout(() => {
    toast.style.opacity = "0";
    window.setTimeout(() => toast.remove(), 220);
  }, 1600);
}
