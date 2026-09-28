import type { TelegramWebApp } from "./types";

export class TelegramRuntimeError extends Error {
  constructor(public readonly code: string) {
    super(code);
    this.name = "TelegramRuntimeError";
  }
}

/**
 * 설정의 "Bosganda tebranish"(탭 진동) / "To‘g‘ri javob · mukofot tebranishi"(보상 진동) 를
 * 한 곳에서 지킨다 — 앱 utils/haptics 와 같은 구분:
 *   impact / selection = 탭 반응 → keyHaptics,  notification = 정답·보상 → rewardHaptics
 * 진동 호출이 100곳이 넘어서, 부르는 쪽을 고치지 않고 텔레그램 객체 자체를 감싼다.
 */
function gateHaptics(webApp: TelegramWebApp) {
  const haptics = webApp.HapticFeedback as (TelegramWebApp["HapticFeedback"] & { __korioGated?: boolean }) | undefined;
  if (!haptics || haptics.__korioGated) return;
  const prefs = (): { keyHaptics?: boolean; rewardHaptics?: boolean } => {
    try {
      return JSON.parse(window.localStorage.getItem("korio-sound-settings") ?? "{}") as { keyHaptics?: boolean; rewardHaptics?: boolean };
    } catch {
      return {};
    }
  };
  try {
    const impact = haptics.impactOccurred.bind(haptics);
    const selection = haptics.selectionChanged.bind(haptics);
    const notification = haptics.notificationOccurred.bind(haptics);
    haptics.impactOccurred = (style) => {
      if (prefs().keyHaptics !== false) impact(style);
    };
    haptics.selectionChanged = () => {
      if (prefs().keyHaptics !== false) selection();
    };
    haptics.notificationOccurred = (type) => {
      if (prefs().rewardHaptics !== false) notification(type);
    };
    haptics.__korioGated = true;
  } catch {
    // 감쌀 수 없는 클라이언트면 원래대로 둔다
  }
}

export function prepareTelegramWebApp(): TelegramWebApp {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) throw new TelegramRuntimeError("TELEGRAM_RUNTIME_UNAVAILABLE");
  if (!webApp.initData) {
    throw new TelegramRuntimeError("TELEGRAM_INIT_DATA_MISSING");
  }

  webApp.expand();
  gateHaptics(webApp);
  // 세로 스와이프 = "미니앱 접기" 가 켜져 있으면, 안쪽 스크롤 영역(문제 지문·
  // 단어 목록 등)을 위아래로 밀 때 텔레그램이 제스처를 가로채서 스크롤이
  // 안 되거나 앱이 접혀 버린다. 앱처럼 화면 안 스크롤이 항상 먼저다.
  webApp.disableVerticalSwipes?.();
  webApp.setHeaderColor?.("secondary_bg_color");
  webApp.setBackgroundColor?.("secondary_bg_color");
  webApp.ready();
  return webApp;
}
