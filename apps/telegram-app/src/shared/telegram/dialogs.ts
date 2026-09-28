"use client";

import { translateText } from "../i18n/language-context";

/**
 * 앱의 Alert.alert 자리. 텔레그램 네이티브 팝업(showConfirm/showAlert)을 쓰고,
 * 지원하지 않는 클라이언트(6.2 미만·브라우저)에서만 window.confirm 으로 내려간다.
 * 일부 텔레그램 클라이언트는 JS 기본 대화상자를 막아 버려서 버튼이 먹통이 됐다.
 * 문구는 DOM 밖이라 번역기가 못 보므로 여기서 직접 옮긴다.
 */
function nativePopups() {
  const webApp = window.Telegram?.WebApp;
  if (!webApp?.showConfirm || !webApp.showAlert) return null;
  if (webApp.isVersionAtLeast && !webApp.isVersionAtLeast("6.2")) return null;
  return webApp;
}

export function confirmDialog(message: string): Promise<boolean> {
  const text = message.split("\n").map((line) => translateText(line)).join("\n");
  const webApp = nativePopups();
  if (webApp?.showConfirm) {
    return new Promise((resolve) => {
      try {
        webApp.showConfirm?.(text, (confirmed) => resolve(Boolean(confirmed)));
      } catch {
        resolve(window.confirm(text));
      }
    });
  }
  return Promise.resolve(window.confirm(text));
}

export function alertDialog(message: string): Promise<void> {
  const text = message.split("\n").map((line) => translateText(line)).join("\n");
  const webApp = nativePopups();
  if (webApp?.showAlert) {
    return new Promise((resolve) => {
      try {
        webApp.showAlert?.(text, () => resolve());
      } catch {
        window.alert(text);
        resolve();
      }
    });
  }
  window.alert(text);
  return Promise.resolve();
}
