"use client";

import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import { SETTINGS_SECTIONS, type SettingsItem } from "../model/settings";
import styles from "./settings-screen.module.css";

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/home");
}

export function SettingsScreen() {
  const router = useRouter();
  const { user } = useTelegramAuth();

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

          {!user?.isSuper ? (
            <div className={styles.tooltip}>
              <b><em>FREE</em> Hozir oling!</b>
              <span>7 kun bepul sinab ko‘ring!</span>
            </div>
          ) : null}

          <button className={styles.subscribe} onClick={() => router.push("/premium")} type="button">
            <i>P</i>
            {user?.isSuper ? "Obunani boshqarish" : "Premium obunani sotib olish"}
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
