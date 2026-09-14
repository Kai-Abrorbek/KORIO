"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "@/features/auth/model/telegram-auth-context";
import { BootScreen } from "@/shared/ui/boot-screen";
import { FatalScreen } from "@/shared/ui/fatal-screen";

export function AppEntry() {
  const router = useRouter();
  const auth = useTelegramAuth();

  useEffect(() => {
    if (auth.status !== "authenticated" || !auth.user) return;
    router.replace(auth.user.isOnboardingCompleted ? "/home" : "/onboarding");
  }, [auth.status, auth.user, router]);

  if (auth.status === "error") {
    return <FatalScreen code={auth.errorCode} />;
  }

  return <BootScreen message="KORIO tayyorlanmoqda…" />;
}
