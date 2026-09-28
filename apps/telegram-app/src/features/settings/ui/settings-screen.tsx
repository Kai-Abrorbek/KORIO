"use client";

import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import { SETTINGS_SECTIONS, type SettingsItem } from "../model/settings";

/** apps/api/src/users/super.util.ts 의 TRIAL_DAYS 와 같아야 한다 (모바일 constants/trial.ts) */
const TRIAL_DAYS = 30;
import styles from "./settings-screen.module.css";

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/home");
}

export function SettingsScreen() {
  const router = useRouter();
  const { user } = useTelegramAuth();

  // 모바일 SettingsUserCard 와 같은 규칙.
  // isSuper 만 보면 안 된다 — 체험이 끝나도 저장된 isSuper 가 true 로 남을 수 있어 만료일까지 본다
  const superAt = user?.superExpiresAt ? new Date(user.superExpiresAt).getTime() : Number.NaN;
  const isPremium = Boolean(user?.isSuper && (!user.superExpiresAt || Number.isNaN(superAt) || superAt > Date.now()));
  const isTrial = isPremium && user?.superPlan === "trial";
  const usedTrial = Boolean(user?.hasUsedTrial) || user?.superPlan === "trial";
  const trialLeft = isTrial && !Number.isNaN(superAt) ? Math.max(0, Math.ceil((superAt - Date.now()) / 86_400_000)) : 0;
  /**
   * 툴팁은 둘뿐이다: 체험 중이면 남은 일수, 체험을 안 써봤으면 무료 체험 권유.
   * 결제 구독자나 체험을 이미 쓴 유저에게는 아무것도 약속하지 않는다.
   */
  const tip = isPremium
    ? isTrial
      ? { badge: "SUPER", desc: `${trialLeft} kun qoldi`, title: "Bepul sinov davom etmoqda!" }
      : null
    : usedTrial
      ? null
      : { badge: "FREE", desc: `${TRIAL_DAYS} kun bepul sinab ko'ring!`, title: "Hozir oling!" };

  const openItem = (item: SettingsItem) => {
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
    if (item.id === "tourReplay") {
      window.localStorage.setItem("korio-home-tour-requested", "true");
      router.push("/home");
      return;
    }
    if (item.route) router.push(item.route);
  };

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <button aria-label="Orqaga" onClick={() => goBack(router)} type="button">
          <MobileIcon name="chevron-back" size={28} />
        </button>
        <h1>Sozlamalar</h1>
        <i />
      </header>

      <div className={styles.scroll}>
        <section className={styles.userCard}>
          <button className={styles.userRow} onClick={() => router.push("/profile")} type="button">
            <span className={styles.avatar}>
              <GeneratedAvatar avatar={user?.avatar} />
            </span>
            <strong>{user?.nickname ?? ""}</strong>
            <MobileIcon name="chevron-forward" size={22} />
          </button>

          {tip ? (
            <div className={styles.tooltip}>
              <b><em data-no-translate="">{tip.badge}</em>{` ${tip.title}`}</b>
              <span>{tip.desc}</span>
            </div>
          ) : null}

          <button className={styles.subscribe} onClick={() => router.push("/premium")} type="button">
            <i>P</i>
            {isPremium && !isTrial ? "Obunani boshqarish" : "Premium obunani sotib olish"}
          </button>

          <div className={styles.quickActions}>
            <button onClick={() => router.push("/invite")} type="button">
              <MobileIcon name="key" size={22} /> Kod
            </button>
            <i />
            <button onClick={() => router.push("/friends")} type="button">
              <MobileIcon name="people" size={22} /> Do‘stlar
            </button>
          </div>
        </section>

        <h2>Sozlamalar</h2>
        {SETTINGS_SECTIONS.map((section, index) => (
          <section className={styles.settingsCard} key={index}>
            {section.map((item, itemIndex) => (
              <button key={item.id} onClick={() => openItem(item)} type="button">
                <i style={{ backgroundColor: item.iconBackground, color: item.iconColor }}>
                  <MobileIcon name={item.icon} size={22} />
                </i>
                <span>
                  <b>{item.title}</b>
                  <small>{item.description}</small>
                </span>
                <MobileIcon name="chevron-forward" size={20} />
                {itemIndex < section.length - 1 ? <em /> : null}
              </button>
            ))}
          </section>
        ))}
        <p className={styles.version}>Ilova versiyasi: 1.2.400</p>
      </div>
    </main>
  );
}
