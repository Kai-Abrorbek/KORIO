"use client";

import type { ReactNode } from "react";

import { useTelegramAuth } from "../model/telegram-auth-context";
import { BootScreen } from "../../../shared/ui/boot-screen";
import { FatalScreen } from "../../../shared/ui/fatal-screen";

export function AuthBoundary({ children }: { children: ReactNode }) {
  const auth = useTelegramAuth();

  if (auth.status === "loading") {
    return <BootScreen message="Hisobingiz ulanmoqda…" />;
  }
  if (auth.status === "error") {
    return <FatalScreen code={auth.errorCode} />;
  }
  return children;
}
