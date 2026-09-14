"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../../src/features/auth/model/telegram-auth-context";

export default function HomePage() {
  const router = useRouter();
  const { user } = useTelegramAuth();

  useEffect(() => {
    if (user && !user.isOnboardingCompleted) router.replace("/onboarding");
  }, [router, user]);

  if (!user || !user.isOnboardingCompleted) return null;

  return (
    <main className="app-viewport">
      <header className="home-header">
        <div>
          <p className="eyebrow">KORIO TELEGRAM</p>
          <h1>Salom, {user.nickname || "do'stim"}!</h1>
        </div>
        {user.profileImage ? (
          // Telegram이 서명한 프로필 URL이다. 외부 호스트가 유동적이라 img를 쓴다.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="avatar"
            src={user.profileImage}
            alt=""
            width={48}
            height={48}
          />
        ) : (
          <div className="avatar avatar-fallback" aria-hidden="true">
            {(user.nickname || "K").slice(0, 1).toUpperCase()}
          </div>
        )}
      </header>

      <section className="account-strip" aria-label="O'quv holati">
        <div>
          <span>XP</span>
          <strong>{user.totalXP ?? 0}</strong>
        </div>
        <div>
          <span>Seriya</span>
          <strong>{user.streak ?? 0}</strong>
        </div>
        <div>
          <span>Daraja</span>
          <strong>{user.languageLevel ?? 1}</strong>
        </div>
      </section>

      <section className="foundation-card">
        <span className="foundation-icon" aria-hidden="true">
          ✓
        </span>
        <div>
          <p className="eyebrow">ASOS TAYYOR</p>
          <h2>Hisob va o&apos;quv ma&apos;lumotlari ulandi</h2>
          <p>
            Keyingi bosqichda mobil ilovadagi bosh sahifa va o&apos;quv
            yo&apos;li shu asosga ko&apos;chiriladi.
          </p>
        </div>
      </section>
    </main>
  );
}
