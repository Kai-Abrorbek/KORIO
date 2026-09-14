"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../../src/features/auth/model/telegram-auth-context";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useTelegramAuth();

  useEffect(() => {
    if (user?.isOnboardingCompleted) router.replace("/home");
  }, [router, user]);

  if (!user || user.isOnboardingCompleted) return null;

  return (
    <main className="app-viewport centered-page">
      <div className="brand-mark" aria-hidden="true">
        K
      </div>
      <p className="eyebrow">KORIO</p>
      <h1>O&apos;rganish yo&apos;lingizni tayyorlaymiz</h1>
      <p className="muted-copy">
        Telegram hisobingiz xavfsiz ulandi. Keyingi bosqichda mobil ilovadagi
        so&apos;rov va daraja testi shu yo&apos;nalishga ulanadi.
      </p>
    </main>
  );
}
