import type { TelegramWebApp } from "./types";

export class TelegramRuntimeError extends Error {
  constructor(public readonly code: string) {
    super(code);
    this.name = "TelegramRuntimeError";
  }
}

export function prepareTelegramWebApp(): TelegramWebApp {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) throw new TelegramRuntimeError("TELEGRAM_RUNTIME_UNAVAILABLE");
  if (!webApp.initData) {
    throw new TelegramRuntimeError("TELEGRAM_INIT_DATA_MISSING");
  }

  webApp.expand();
  webApp.setHeaderColor?.("secondary_bg_color");
  webApp.setBackgroundColor?.("secondary_bg_color");
  webApp.ready();
  return webApp;
}
