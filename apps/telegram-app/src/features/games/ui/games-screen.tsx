"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import styles from "./games-screen.module.css";

interface GameItem {
  id: string;
  route: string;
  icon: IoniconName;
  colors: [string, string];
  name: string;
  description: string;
}

const GAMES: GameItem[] = [
  { id: "matchGame", route: "/match-game", icon: "grid", colors: ["#7C6BF0", "#5F4FD8"], name: "So'z juftlash", description: "Ma'nosi mos so'zlarni tez bog'lang" },
  { id: "wordMemory", route: "/memory-game", icon: "albums", colors: ["#3FBF8F", "#2A9E72"], name: "So'zlarni eslab qolish", description: "Kartalarni ochib juftini toping" },
  { id: "wordChain", route: "/word-chain", icon: "link", colors: ["#FF8A5B", "#F06A3A"], name: "So'z zanjiri", description: "Haneulmon bilan navbatma-navbat so'z ulang" },
  { id: "wordRain", route: "/word-rain", icon: "rainy", colors: ["#1CB0F6", "#0E8FD0"], name: "So'z yomg'iri", description: "Tushayotgan so'z ma'nosini yerga tegmasdan tuting" },
  { id: "swipeJudge", route: "/swipe-judge", icon: "swap-horizontal", colors: ["#FF5B8A", "#E23A6C"], name: "OX surish", description: "So'z va ma'no mosligini surish bilan aniqlang" },
  { id: "particleRush", route: "/particle-rush", icon: "flash", colors: ["#FFC800", "#EBA400"], name: "Qo'shimcha poygasi", description: "Vaqt tugashidan oldin to'g'ri qo'shimchani qo'ying" },
  { id: "echoChain", route: "/echo-chain", icon: "volume-high", colors: ["#22C9C9", "#0FA8A8"], name: "Aks-sado zanjiri", description: "Eshitgan so'zlarni tartib bilan eslab bosing" },
];

export function GamesScreen() {
  const router = useRouter();
  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/home");
  };
  const open = (route: string) => {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("medium");
    router.push(route);
  };

  return (
    <main className={styles.page}>
      <header>
        <button aria-label="Orqaga" onClick={goBack} type="button"><MobileIcon name="chevron-back" size={28} /></button>
        <h1>O&apos;yinlar</h1>
      </header>
      <div className={styles.scroll}>
        <section className={styles.intro}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Hangulmon" height={72} src="/characters/hangulmon_great.png" width={72} />
          <p>O&apos;rgangan so&apos;zlaringizni o&apos;ynab takrorlang. O&apos;yinlarda ham XP bor!</p>
        </section>

        {GAMES.map((game, index) => (
          <button
            className={styles.card}
            key={game.id}
            onClick={() => open(game.route)}
            style={{ "--delay": `${index * 80}ms`, "--from": game.colors[0], "--to": game.colors[1] } as CSSProperties}
            type="button"
          >
            <span className={styles.cardIcon}><MobileIcon name={game.icon} size={26} /></span>
            <span className={styles.cardCopy}><strong>{game.name}</strong><small>{game.description}</small></span>
            <span className={styles.play}><MobileIcon name="play" size={18} /></span>
          </button>
        ))}

        <button className={styles.hangulCard} onClick={() => open("/hangul")} type="button">
          <span className={styles.hangulIcon}>가</span>
          <span><strong>Hangul o&apos;yinlari</strong><small>Harf o&apos;yinlari hangul bo&apos;limining ichida</small></span>
          <MobileIcon name="chevron-forward" size={20} />
        </button>
      </div>
    </main>
  );
}
