"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../features/auth/model/telegram-auth-context";
import { BootScreen } from "../shared/ui/boot-screen";
import { FatalScreen } from "../shared/ui/fatal-screen";

export function AppEntry() {
  const router = useRouter();
  const auth = useTelegramAuth();
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setSplashFinished(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!splashFinished || auth.status !== "authenticated" || !auth.user) {
      return;
    }
    router.replace(
      auth.user.isOnboardingCompleted ? "/welcome" : "/onboarding",
    );
  }, [auth.status, auth.user, router, splashFinished]);

  if (auth.status === "error") {
    return <FatalScreen code={auth.errorCode} />;
  }

  return <BootScreen message="KORIO tayyorlanmoqda…" />;
}
