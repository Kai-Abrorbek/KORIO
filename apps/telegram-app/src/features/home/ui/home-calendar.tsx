"use client";

import { useEffect, useMemo, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  WEEKDAY_LABELS,
  type HomeCalendarData,
} from "../model/home-data";
import { HomeIcon } from "./home-icon";
import styles from "./home-screen.module.css";

interface HomeCalendarProps {
  fallbackLongestStreak: number;
  fallbackStreak: number;
  onClose: () => void;
}

export function HomeCalendar({
  fallbackLongestStreak,
  fallbackStreak,
  onClose,
}: HomeCalendarProps) {
  const { request } = useTelegramAuth();
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(() => ({
    month: today.getMonth(),
    year: today.getFullYear(),
  }));
  const [calendar, setCalendar] = useState<HomeCalendarData | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  useEffect(() => {
    let active = true;
    void request<HomeCalendarData>(
      `/users/me/calendar?year=${visibleMonth.year}&month=${visibleMonth.month + 1}`,
    )
      .then((result) => {
        if (active) setCalendar(result);
      })
      .catch(() => {
        if (active) setCalendar(null);
      });
    return () => {
      active = false;
    };
  }, [request, visibleMonth]);

  const cells = useMemo(() => {
    const firstWeekday =
      (new Date(visibleMonth.year, visibleMonth.month, 1).getDay() + 6) % 7;
    const count = new Date(
      visibleMonth.year,
      visibleMonth.month + 1,
      0,
    ).getDate();
    const result: Array<number | null> = Array(firstWeekday).fill(null);
    for (let day = 1; day <= count; day += 1) result.push(day);
    while (result.length % 7 !== 0) result.push(null);
    return result;
  }, [visibleMonth]);

  const completedDays = calendar?.completedDays ?? [];
  const streakDays = calendar?.streakDays ?? [];

  const moveMonth = (offset: number) => {
    setVisibleMonth((current) => {
      const next = new Date(current.year, current.month + offset, 1);
      return { month: next.getMonth(), year: next.getFullYear() };
    });
  };

  return (
    <div className={styles.sheetBackdrop} onClick={onClose} role="presentation">
      <section
        aria-label="O'quv taqvimi"
        aria-modal="true"
        className={styles.calendarSheet}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className={styles.sheetHandle} aria-hidden="true" />
        <button
          aria-label="Yopish"
          className={styles.sheetClose}
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className={styles.calendarMascot}
          src="/characters/hangulmon_streak.png"
        />

        <p className={styles.calendarYear}>{visibleMonth.year}</p>
        <div className={styles.monthSwitcher}>
          <button aria-label="Oldingi oy" onClick={() => moveMonth(-1)} type="button">
            <HomeIcon name="chevron" size={22} className={styles.chevronBack} />
          </button>
          <strong>{visibleMonth.month + 1}</strong>
          <button aria-label="Keyingi oy" onClick={() => moveMonth(1)} type="button">
            <HomeIcon name="chevron" size={22} />
          </button>
        </div>

        <div className={styles.calendarStats}>
          <div>
            <span>Ketma-ket kunlar</span>
            <strong>
              <HomeIcon name="flame" size={20} />
              {calendar?.streak ?? fallbackStreak}
            </strong>
          </div>
          <div>
            <span>Eng uzun seriya</span>
            <strong>
              <HomeIcon name="trophy" size={20} />
              {calendar?.longestStreak ?? fallbackLongestStreak}
            </strong>
          </div>
        </div>

        <div className={styles.calendarGrid}>
          {WEEKDAY_LABELS.map((label) => (
            <span className={styles.calendarWeekday} key={label}>
              {label}
            </span>
          ))}
          {cells.map((day, index) => {
            const isToday =
              day === today.getDate() &&
              visibleMonth.month === today.getMonth() &&
              visibleMonth.year === today.getFullYear();
            const completed = day !== null && completedDays.includes(day);
            const streak = day !== null && streakDays.includes(day);
            return (
              <span
                className={[
                  styles.calendarDay,
                  completed ? styles.calendarDayCompleted : "",
                  streak ? styles.calendarDayStreak : "",
                  isToday ? styles.calendarDayToday : "",
                ].join(" ")}
                key={`${index}-${day ?? "empty"}`}
              >
                {day}
              </span>
            );
          })}
        </div>

        <div className={styles.medalRow}>
          <strong>Bu oylik medal</strong>
          <div>
            {[0, 1, 2, 3, 4].map((medal) => (
              <span className={medal < 2 ? styles.medalEarned : ""} key={medal}>
                ★
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
