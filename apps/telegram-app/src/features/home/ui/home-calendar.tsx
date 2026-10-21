"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { WEEKDAY_LABELS, type HomeCalendarData } from "../model/home-data";
import { HomeIcon } from "./home-icon";
import styles from "./home-screen.module.css";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useSwipeToClose } from "../../../shared/ui/use-swipe-to-close";
import { uzt } from "../../../shared/i18n/uz-text";
import {
  LEARN_COURSES,
  type LearnCourse,
} from "../../learning/model/learning-options";

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
  // 앱 바텀시트처럼 아래로 끌어내리면 닫힌다
  const sheetRef = useRef<HTMLElement>(null);
  useSwipeToClose(sheetRef, onClose);

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

  // A new month must not briefly show the previous response's activity.
  const currentCalendar =
    calendar?.year === visibleMonth.year &&
    calendar.month === visibleMonth.month + 1
      ? calendar
      : null;
  const completedDays = currentCalendar?.completedDays ?? [];
  const streakDays = currentCalendar?.streakDays ?? [];
  const frozenDays = currentCalendar?.frozenDays ?? [];
  const languageActivity = currentCalendar?.languageActivity;

  const moveMonth = (offset: number) => {
    setVisibleMonth((current) => {
      const next = new Date(current.year, current.month + offset, 1);
      return { month: next.getMonth(), year: next.getFullYear() };
    });
  };

  return (
    <div className={styles.sheetBackdrop} onClick={onClose} role="presentation">
      <section
        aria-label={uzt("learningStreak.title")}
        aria-modal="true"
        className={styles.calendarSheet}
        ref={sheetRef}
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
          <HomeIcon name="close" size={25} />
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className={styles.calendarMascot}
          src="/characters/hangulmon_streak.png"
        />

        <p className={styles.calendarYear}>{visibleMonth.year}</p>
        <div className={styles.monthSwitcher}>
          <button
            aria-label="Oldingi oy"
            onClick={() => moveMonth(-1)}
            type="button"
          >
            <HomeIcon name="chevron" size={22} className={styles.chevronBack} />
          </button>
          <strong>{visibleMonth.month + 1}</strong>
          <button
            aria-label="Keyingi oy"
            onClick={() => moveMonth(1)}
            type="button"
          >
            <HomeIcon name="chevron" size={22} />
          </button>
        </div>

        <div className={styles.calendarStats}>
          <div>
            <span data-i18n="learningStreak.title">
              {uzt("learningStreak.title")}
            </span>
            <strong>
              <HomeIcon name="flame" size={20} />
              {currentCalendar?.streak ?? fallbackStreak}
            </strong>
          </div>
          <div>
            <span>Eng uzun seriya</span>
            <strong>
              <HomeIcon name="trophy" size={20} />
              {currentCalendar?.longestStreak ?? fallbackLongestStreak}
            </strong>
          </div>
        </div>

        {/* <p className={styles.streakDescription} data-i18n="learningStreak.description">
          {uzt("learningStreak.description")}
        </p> */}
        <p
          className={styles.streakDescription}
          data-i18n="learningStreak.sharedAcrossApps"
        >
          {uzt("learningStreak.sharedAcrossApps")}
        </p>

        {languageActivity ? (
          <section className={styles.languageActivity}>
            <h3 data-i18n="learningStreak.activityTitle">
              {uzt("learningStreak.activityTitle")}
            </h3>
            <p data-i18n="learningStreak.activityDescription">
              {uzt("learningStreak.activityDescription")}
            </p>
            <p data-i18n="learningStreak.activityTrackingNotice">
              {uzt("learningStreak.activityTrackingNotice")}
            </p>
            {languageActivity.languages.length > 0 ? (
              <ul>
                {languageActivity.languages.map(({ targetLanguage, days }) => {
                  const course = Object.hasOwn(LEARN_COURSES, targetLanguage)
                    ? LEARN_COURSES[targetLanguage as LearnCourse]
                    : undefined;
                  const nameKey = course
                    ? `userCourses.list.${course.key}`
                    : undefined;
                  return (
                    <li key={targetLanguage}>
                      <span>
                        {course ? (
                          <span aria-hidden="true">{course.flag} </span>
                        ) : null}
                        <span
                          data-i18n={nameKey}
                          data-no-translate={!course || undefined}
                        >
                          {nameKey ? uzt(nameKey) : targetLanguage}
                        </span>
                      </span>
                      <b data-i18n="learningStreak.activityDays">
                        {uzt("learningStreak.activityDays", { count: days })}
                      </b>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p data-i18n="learningStreak.activityEmpty">
                {uzt("learningStreak.activityEmpty")}
              </p>
            )}
            {languageActivity.unclassifiedDays > 0 ? (
              <p data-i18n="learningStreak.activityUnknown">
                {uzt("learningStreak.activityUnknown", {
                  count: languageActivity.unclassifiedDays,
                })}
              </p>
            ) : null}
          </section>
        ) : null}

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
                style={{ position: "relative" }}
              >
                {day}
                {/* 복구펜으로 메운 날 */}
                {day !== null && frozenDays.includes(day) ? (
                  <i
                    style={{
                      alignItems: "center",
                      background: "#3BA7F0",
                      borderRadius: 8,
                      color: "#fff",
                      display: "flex",
                      height: 15,
                      justifyContent: "center",
                      position: "absolute",
                      right: -3,
                      top: -3,
                      width: 15,
                    }}
                  >
                    <MobileIcon name="snow" size={10} />
                  </i>
                ) : null}
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
