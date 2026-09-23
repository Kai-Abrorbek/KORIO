"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import styles from "./misc-screen.module.css";

const LOOK: Record<string, { color: string; icon: IoniconName; label: string; soft: string }> = {
  conversation: { color: "#EC407A", icon: "chatbubbles", label: "Suhbat", soft: "#FCE0E9" },
  expression: { color: "#26A69A", icon: "chatbubble-ellipses", label: "Iboralar", soft: "#D6F2EF" },
  listening: { color: "#42A5F5", icon: "headset", label: "Tinglash", soft: "#DCEDFD" },
};

export function ComingSoonScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const look = LOOK[params.get("mode") ?? ""] ?? {
    color: "#776ee2",
    icon: "construct" as const,
    label: "",
    soft: "#E7E4FA",
  };

  return (
    <main className={styles.comingPage}>
      <header className={styles.simpleHeader}>
        <button aria-label="Orqaga" onClick={() => window.history.length > 1 ? router.back() : router.replace("/home")} type="button">
          <MobileIcon name="chevron-back" size={28} />
        </button>
        <strong>{look.label}</strong>
      </header>
      <section className={styles.comingBody}>
        <Image alt="Haneulmon" className={styles.comingMascot} height={132} src="/characters/hangulmon_confused.png" unoptimized width={132} />
        <span className={styles.comingChip} style={{ backgroundColor: look.soft, color: look.color }}>
          <MobileIcon name="construct" size={14} /> Tayyorlanmoqda
        </span>
        <h1>Tez orada!</h1>
        <p>Bu bo&apos;lim uchun maxsus mashq sahifasi tayyorlanmoqda. Biroz kutib turing!</p>
      </section>
      <footer className={styles.simpleFooter}>
        <button onClick={() => router.replace("/course-categories")} type="button">Boshqa bo&apos;limni tanlash</button>
      </footer>
    </main>
  );
}
