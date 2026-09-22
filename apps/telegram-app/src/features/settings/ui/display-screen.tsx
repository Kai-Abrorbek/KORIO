"use client";

import { useRouter } from "next/navigation";

import { useAppTheme, type ResolvedTheme } from "../../../shared/theme/theme-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./display-screen.module.css";

const PREVIEW = {
  light: { card: "#ECEAF6", screen: "#FFFFFF", bar: "#D9D6EA" },
  dark: { card: "#3A3942", screen: "#2B2A33", bar: "#4C4B56" },
} as const;

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/settings");
}

export function DisplayScreen() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useAppTheme();

  const choose = (theme: ResolvedTheme) => {
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
    setTheme(theme);
  };

  return (
    <main className={styles.screen}>
      <header>
        <button aria-label="Orqaga" onClick={() => goBack(router)} type="button">
          <MobileIcon name="chevron-back" size={28} />
        </button>
        <h1>Ko‘rinish</h1>
      </header>

      <section>
        <h2>Qorong‘i rejim</h2>
        <div className={styles.modeRow}>
          {(["light", "dark"] as const).map((theme) => {
            const colors = PREVIEW[theme];
            const selected = resolvedTheme === theme;
            return (
              <button aria-pressed={selected} key={theme} onClick={() => choose(theme)} type="button">
                <span className={styles.preview} style={{ backgroundColor: colors.card }}>
                  <i style={{ backgroundColor: colors.screen }}>
                    <em><b /><small style={{ backgroundColor: colors.bar }} /></em>
                    <em><b /><small style={{ backgroundColor: colors.bar }} /></em>
                  </i>
                </span>
                <strong>{theme === "light" ? "Yorug‘ rejim" : "Qorong‘i rejim"}</strong>
                <i className={selected ? styles.radioSelected : styles.radio} />
              </button>
            );
          })}
        </div>
      </section>

      <div className={styles.band} />

      <section>
        <h2>O‘quv ekrani sozlamalari</h2>
        <button className={styles.learningRow} type="button">
          <span>O‘quv mavzusi</span>
          <i>Moviy osmon <MobileIcon name="chevron-forward" size={20} /></i>
        </button>
      </section>
    </main>
  );
}
