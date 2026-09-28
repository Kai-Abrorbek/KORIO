"use client";

import type { ReactNode } from "react";

import { useTelegramAuth } from "../model/telegram-auth-context";
import { BootScreen } from "../../../shared/ui/boot-screen";
import { FatalScreen } from "../../../shared/ui/fatal-screen";
import { TelegramBackButtonBridge } from "../../../shared/telegram/back-button";
import { EnergyModalHost } from "../../energy/energy-gate";
import { AppPresence } from "../model/app-presence";
import { StartParamHandler } from "../model/start-param";

export function AuthBoundary({ children }: { children: ReactNode }) {
  const auth = useTelegramAuth();

  if (auth.status === "loading") {
    return <BootScreen message="Hisobingiz ulanmoqda…" />;
  }
  if (auth.status === "error") {
    return <FatalScreen code={auth.errorCode} />;
  }
  return (
    <>
      <TelegramBackButtonBridge />
      <AppPresence />
      <StartParamHandler />
      {children}
      {/* 전역 에너지 부족 모달 — 어느 화면에서든 뜬다 (앱 _layout 의 EnergyModal) */}
      <EnergyModalHost />
    </>
  );
}
