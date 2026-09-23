"use client";

import { useMemo, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import type { StreakDay } from "../model/misc";
import styles from "./streak-day-screen.module.css";

function Flame() {
  return (
    <svg aria-hidden="true" className={styles.flame} viewBox="0 0 220 240">
      <defs>
        <linearGradient id="streakOuter" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f44236"/><stop offset="1" stopColor="#ff8d1a"/></linearGradient>
        <linearGradient id="streakInner" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#fffac5"/><stop offset=".62" stopColor="#ffee9b"/><stop offset="1" stopColor="#ff9b1a"/></linearGradient>
      </defs>
      <path d="M114 4c-9 44-60 63-72 118-15 69 28 114 77 114 52 0 91-39 88-93-2-37-22-68-49-91 2 27-10 45-28 49-23 5-39-17-30-43 7-21 18-37 14-54Z" fill="url(#streakOuter)"/>
      <path d="M112 92c-4 29-34 44-38 77-5 35 17 62 46 62 31 0 53-24 51-56-1-21-12-37-27-52 1 17-7 29-19 31-15 3-24-11-19-27 4-14 9-24 6-35Z" fill="url(#streakInner)"/>
    </svg>
  );
}

export function StreakDayScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const streak = Math.max(1, Number(params.get("streak")) || 1);
  const days = useMemo(() => {
    const format = new Intl.DateTimeFormat(undefined, { weekday: "short" });
    try {
      const parsed = JSON.parse(params.get("week") || "[]") as StreakDay[];
      if (parsed.length) return parsed.map((day) => ({ done: day.studied, isToday: day.isToday, label: format.format(new Date(day.date)) }));
    } catch { /* buzilgan parametr uchun quyidagi zaxira ishlaydi */ }
    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      return { done: index === 0, isToday: index === 0, label: format.format(date) };
    });
  }, [params]);

  const proceed = () => {
    const scoreUp = params.get("scoreUp");
    const category = params.get("category");
    if (scoreUp) {
      const next = new URLSearchParams({ score: scoreUp, unit: params.get("scoreUpUnit") ?? "", category: category ?? "" });
      router.replace(`/score-up?${next.toString()}`);
      return;
    }
    router.replace(category ? `/roadmap?category=${encodeURIComponent(category)}` : "/home");
  };

  return (
    <main className={styles.page}>
      <div className={styles.embers} aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} style={{ "--i": index } as CSSProperties} />)}</div>
      <section className={styles.content}>
        <div className={styles.flameArea}>
          <i className={styles.glow}/><Flame/><b>{streak}</b>
        </div>
        <h1>Juda zo‘r!</h1>
        <p>Ketma-ketlikni saqlash uchun<br/>har kuni mashq qiling</p>
        <div className={styles.week}>
          {days.map((day, index) => <div className={styles.day} key={`${day.label}-${index}`} style={{ "--i": index } as CSSProperties}>
            <span className={`${day.done ? styles.done : ""} ${day.isToday ? styles.today : ""}`}>{day.done ? <MobileIcon name="checkmark" size={20}/> : null}</span>
            <small>{day.label}</small>
          </div>)}
        </div>
      </section>
      <footer><button onClick={proceed} type="button">Davom etish</button></footer>
    </main>
  );
}
