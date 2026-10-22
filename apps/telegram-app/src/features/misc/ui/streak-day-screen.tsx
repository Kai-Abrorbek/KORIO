"use client";

import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { createCinemaAudio, type CinemaAudio } from "../../../shared/browser/cinema-audio";
import { cinemaHaptic, prefersReducedMotion, runCinemaClock, type CinemaClock } from "../../../shared/browser/cinema-clock";
import { uzt } from "../../../shared/i18n/uz-text";
import { useCinemaLanguage } from "../../../shared/browser/use-cinema-language";
import { cinemaAt, cinemaVoices, shakeAt, type CinemaKey } from "../../../shared/model/cinema";
import {
  IGNITE_SPARKS,
  IGNITE_TRACK,
  RELAY,
  dotLit,
  hopAt,
  relayTimeline,
  riseAt,
  type StreakSound,
} from "../../../shared/model/streak-relay-cinematic";
import { Confetti } from "../../../shared/ui/confetti";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import type { StreakDay } from "../model/misc";
import { goNext, viaStreakChest } from "../model/streak-chest-route";
import styles from "./streak-day-screen.module.css";

/** 불씨 릴레이 소리 — 앱 streak-day 와 같은 파일·크기 */
const STREAK_SOURCES: Record<StreakSound, string> = {
  catch: "/sounds/streak/catch.mp3",
  today: "/sounds/streak/today.mp3",
  rise: "/sounds/streak/rise.mp3",
  ignite: "/sounds/streak/ignite.mp3",
  count: "/sounds/streak/count.mp3",
  fireworks: "/sounds/streak/fireworks.mp3",
  voDay: "/sounds/streak/vo-day.mp3",
  vo7: "/sounds/streak/vo-7.mp3",
  vo30: "/sounds/streak/vo-30.mp3",
  vo100: "/sounds/streak/vo-100.mp3",
  vo365: "/sounds/streak/vo-365.mp3",
  voRecord: "/sounds/streak/vo-record.mp3",
};

/** 영어 코스 — "One week in a row!" … */
const STREAK_VOICES_EN: Partial<Record<StreakSound, string>> = {
  voDay: "/sounds/streak/vo-day-en.mp3",
  vo7: "/sounds/streak/vo-7-en.mp3",
  vo30: "/sounds/streak/vo-30-en.mp3",
  vo100: "/sounds/streak/vo-100-en.mp3",
  vo365: "/sounds/streak/vo-365-en.mp3",
  voRecord: "/sounds/streak/vo-record-en.mp3",
};

/** 목소리가 효과음에 묻히지 않게 */
const STREAK_GAIN: Partial<Record<StreakSound, number>> = {
  catch: 0.55,
  today: 0.75,
  rise: 0.6,
  ignite: 0.9,
  count: 0.55,
  fireworks: 0.6,
};

/**
 * 끝없이 왕복하는 값 (0 → 1 → 0) — 앱의 withRepeat(withSequence(...), -1) 과 같다.
 * 불은 한 가지 주기로 움직이면 기계처럼 보여서, 서로 배수가 아닌 주기를 겹친다.
 */
function pulseAt(ms: number, up: number, down: number, delay = 0) {
  if (ms < delay) return 0;
  const phase = (ms - delay) % (up + down);
  const sine = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;
  return phase < up ? sine(phase / up) : 1 - sine((phase - up) / down);
}

function Flame() {
  return (
    <svg aria-hidden="true" className={styles.flameSvg} viewBox="0 0 220 240">
      <defs>
        <linearGradient id="streakOuter" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f44236"/><stop offset="1" stopColor="#ff8d1a"/></linearGradient>
        <linearGradient id="streakInner" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#fffac5"/><stop offset=".62" stopColor="#ffee9b"/><stop offset="1" stopColor="#ff9b1a"/></linearGradient>
      </defs>
      <path d="M114 4c-9 44-60 63-72 118-15 69 28 114 77 114 52 0 91-39 88-93-2-37-22-68-49-91 2 27-10 45-28 49-23 5-39-17-30-43 7-21 18-37 14-54Z" fill="url(#streakOuter)"/>
      <path d="M112 92c-4 29-34 44-38 77-5 35 17 62 46 62 31 0 53-24 51-56-1-21-12-37-27-52 1 17-7 29-19 31-15 3-24-11-19-27 4-14 9-24 6-35Z" fill="url(#streakInner)"/>
    </svg>
  );
}

/**
 * 오늘의 첫 레슨을 끝냈을 때 뜨는 연속 학습 축하 — "불씨 릴레이" (앱 app/streak-day 와 같은 시간표).
 *
 * 요일 줄은 서버가 준 7일 창이다. 공부한 날들이 차례로 불 붙고, 불이 오늘 칸으로 건너가
 * 오늘이 켜지면 그 불덩이가 위로 솟아 큰 불꽃을 붙인다. 숫자가 어제 → 오늘로 넘어가고,
 * 기념일이면 금빛 배지와 꽃가루. 화면을 누르면 끝 장면으로, 동작 줄이기면 끝 장면부터.
 * 그림·시간표는 shared/model/streak-relay-cinematic, 시계는 requestAnimationFrame.
 */
export function StreakDayScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const streak = Math.max(1, Number(params.get("streak")) || 1);
  const week = params.get("week");
  const days = useMemo(() => {
    const format = new Intl.DateTimeFormat(undefined, { weekday: "short" });
    try {
      const parsed = JSON.parse(week || "[]") as StreakDay[];
      if (parsed.length) return parsed.map((day) => ({ done: day.studied, isToday: day.isToday, label: format.format(new Date(day.date)) }));
    } catch { /* buzilgan parametr uchun quyidagi zaxira ishlaydi */ }
    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      return { done: index === 0, isToday: index === 0, label: format.format(date) };
    });
  }, [week]);

  // ── 불씨 릴레이 시계 ──
  const tl = useMemo(() => relayTimeline(days, streak), [days, streak]);
  const [confetti, setConfetti] = useState(false);
  const clock = useRef<CinemaClock | null>(null);
  const audio = useRef<CinemaAudio<StreakSound> | null>(null);
  const timers = useRef<number[]>([]);

  // 부위들 (rAF 가 직접 만진다)
  const page = useRef<HTMLElement>(null);
  const content = useRef<HTMLElement>(null);
  const flameArea = useRef<HTMLDivElement>(null);
  const warm = useRef<HTMLElement>(null);
  const embers = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLElement>(null);
  const ember = useRef<HTMLElement>(null);
  const flame = useRef<HTMLDivElement>(null);
  const sparks = useRef<(HTMLElement | null)[]>([]);
  const prev = useRef<HTMLElement>(null);
  const next = useRef<HTMLElement>(null);
  const badge = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const subtitle = useRef<HTMLParagraphElement>(null);
  const dots = useRef<(HTMLElement | null)[]>([]);
  const lits = useRef<(HTMLElement | null)[]>([]);
  const rings = useRef<(HTMLElement | null)[]>([]);
  const labels = useRef<(HTMLElement | null)[]>([]);
  const hop = useRef<HTMLElement>(null);
  const fireball = useRef<HTMLElement>(null);

  const language = useCinemaLanguage();

  // 그리기 전에 첫 장면을 맞춘다. 한 번만 — 들어온 순간의 창으로 돈다
  useLayoutEffect(() => {
    const ignite = tl.ignite;
    const sound = createCinemaAudio({
      sources: cinemaVoices(STREAK_SOURCES, STREAK_VOICES_EN, language),
      gains: STREAK_GAIN,
      cues: tl.cues,
    });
    sound.preload();
    audio.current = sound;
    const reduce = prefersReducedMotion();
    const born = performance.now();
    let confettiShown = false;

    // 불덩이가 요일 줄에서 불씨까지 날아가려면 두 자리를 재야 한다 (화면 기준 px)
    const pageBox = page.current?.getBoundingClientRect();
    const centerOf = (el: Element | null | undefined) => {
      const box = el?.getBoundingClientRect();
      if (!box || !pageBox) return { x: 0, y: 0 };
      return { x: box.left - pageBox.left + box.width / 2, y: box.top - pageBox.top + box.height / 2 };
    };
    const todayDot = centerOf(dots.current[tl.todayIndex]);
    const fromDot = tl.hopFrom >= 0 ? centerOf(dots.current[tl.hopFrom]) : todayDot;
    const areaBox = flameArea.current?.getBoundingClientRect();
    const base = areaBox && pageBox
      ? { x: areaBox.left - pageBox.left + areaBox.width / 2, y: areaBox.bottom - pageBox.top - 30 }
      : todayDot;

    const pops = days.map((_, i): CinemaKey[] => {
      const popAt = RELAY.dotsIn + i * RELAY.dotGap;
      return [
        { t: popAt, v: 0 },
        { t: popAt + 260, v: 1, e: "back" },
      ];
    });

    const apply = (t: number) => {
      const rel = t - ignite;
      if (warm.current) warm.current.style.opacity = String(cinemaAt(IGNITE_TRACK.warm, rel));
      if (embers.current) embers.current.style.opacity = String(cinemaAt(IGNITE_TRACK.embers, rel));
      if (content.current) {
        const k = shakeAt(t, ignite, 380, tl.milestone ? 12 : 7);
        content.current.style.transform = k.x || k.y ? `translate(${k.x}px, ${k.y}px)` : "";
      }
      // 불 붙기 전 불씨 — 숨 쉬듯
      if (ember.current) {
        const e = cinemaAt(IGNITE_TRACK.ember, rel);
        const breath = Math.sin(t / 260);
        ember.current.style.opacity = String(e * (0.7 + 0.3 * breath));
        ember.current.style.transform = `scale(${(0.85 + 0.15 * breath) * (0.4 + 0.6 * e)})`;
      }
      // 점화 순간 사방으로 튀는 불티 (위로 조금 더 — 불은 솟는다)
      const p = cinemaAt(IGNITE_TRACK.sparks, rel);
      IGNITE_SPARKS.forEach((spark, i) => {
        const el = sparks.current[i];
        if (!el) return;
        el.style.opacity = String(p <= 0 || p >= 1 ? 0 : 1 - p * p);
        el.style.transform = `translate(${Math.cos(spark.angle) * spark.dist * p}px, ${Math.sin(spark.angle) * spark.dist * p - 40 * p}px) scale(${1 - 0.5 * p})`;
      });
      // 숫자: 어제 값이 위로 빠지고 오늘 값이 아래서 튀어 오른다
      if (prev.current) {
        const out = cinemaAt(IGNITE_TRACK.prevOut, rel);
        const lit = Math.min(1, cinemaAt(IGNITE_TRACK.flame, rel) * 3);
        prev.current.style.opacity = String(lit * (1 - out));
        prev.current.style.transform = `translateY(${-40 * out}px) scale(${1 - 0.2 * out})`;
      }
      if (next.current) {
        const n = cinemaAt(IGNITE_TRACK.nextIn, rel);
        next.current.style.opacity = String(Math.min(1, n * 1.5));
        next.current.style.transform = `translateY(${46 * (1 - n)}px) scale(${0.6 + 0.4 * n})`;
      }
      const x = cinemaAt(IGNITE_TRACK.text, rel);
      for (const el of [title.current, subtitle.current]) {
        if (!el) continue;
        el.style.opacity = String(x);
        el.style.transform = `translateY(${12 * (1 - x)}px)`;
      }
      if (badge.current) {
        const b = cinemaAt(IGNITE_TRACK.badge, rel);
        badge.current.style.opacity = String(Math.min(1, b));
        badge.current.style.transform = `scale(${Math.max(0.001, b)})`;
      }
      // 요일 동그라미 — 톡톡 나타났다가, 차례가 오면 불이 붙는다
      days.forEach((day, i) => {
        const dot = dots.current[i];
        if (dot) {
          const pop = cinemaAt(pops[i] as CinemaKey[], t);
          dot.style.opacity = String(Math.min(1, pop));
          dot.style.transform = `scale(${0.4 + pop * 0.6})`;
        }
        const litAt = tl.litAt[i] ?? -1;
        const l = dotLit(t, litAt);
        const lit = lits.current[i];
        if (lit) {
          lit.style.opacity = String(l.on);
          lit.style.transform = `scale(${l.scale})`;
        }
        const label = labels.current[i];
        if (label) label.style.opacity = String(l.on);
        // 오늘 칸이 켜질 때 퍼지는 고리
        const ring = rings.current[i];
        if (ring) {
          const q = day.isToday && litAt >= 0 ? Math.min(1, Math.max(0, (t - litAt) / 520)) : 0;
          ring.style.opacity = String(q <= 0 || q >= 1 ? 0 : 0.8 * (1 - q));
          ring.style.transform = `scale(${1 + 1.1 * q})`;
        }
      });
      // 오늘 칸으로 건너오는 불 · 불씨까지 솟는 불덩이
      if (hop.current) {
        const h = hopAt(t, tl.hopStart, RELAY.hop, fromDot.x, todayDot.x);
        hop.current.style.opacity = String(h.opacity);
        hop.current.style.transform = `translate(${h.x - 9}px, ${todayDot.y + h.y - 9}px)`;
      }
      if (fireball.current) {
        const r = riseAt(t, tl.rise, RELAY.rise, todayDot.x, todayDot.y, base.x, base.y);
        fireball.current.style.opacity = String(r.opacity);
        fireball.current.style.transform = `translate(${r.x - 14}px, ${r.y - 14}px) scale(${r.scale})`;
      }
      // 기념일 폭죽은 건너뛰어도 한 번은 터진다
      if (tl.milestone && !confettiShown && t >= ignite + 650) {
        confettiShown = true;
        setConfetti(true);
      }
    };

    // ── 살아 있는 불 ── 시계가 멈춘 뒤에도 계속 날름거린다 (동작 줄이기면 가만히)
    let living = 0;
    const live = (now: number) => {
      const ms = reduce ? 0 : now - born;
      const lick = pulseAt(ms, 760, 820); // 위로 날름 (세로로 늘고 가로로 좁아진다)
      const sway = pulseAt(ms, 1230, 1180, 280); // 밑동을 축으로 좌우로 휜다
      const flicker = pulseAt(ms, 190, 230); // 밝기 떨림
      const breathe = pulseAt(ms, 1400, 1700);
      const rel = (clock.current?.now() ?? 0) - ignite;
      const enter = cinemaAt(IGNITE_TRACK.flame, rel);
      if (flame.current) {
        flame.current.style.opacity = String(Math.min(1, enter * 3) * (0.92 + flicker * 0.08));
        flame.current.style.transform = `translateX(${-3 + 6 * sway}px) rotate(${-2.4 + 4.8 * sway}deg) scaleX(${Math.max(0.001, enter) * (1.03 - 0.07 * lick)}) scaleY(${Math.max(0.001, enter) * (0.97 + 0.12 * lick)})`;
      }
      // 광채는 불꽃의 떨림을 같이 받는다 — 따로 놀면 두 개의 물체로 보인다. 점화 순간 확 부푼다
      if (glow.current) {
        const boost = cinemaAt(IGNITE_TRACK.glowBoost, rel);
        glow.current.style.opacity = String((0.14 + breathe * 0.24 + flicker * 0.06) * Math.min(1, enter) + boost * 0.5);
        glow.current.style.transform = `scale(${0.88 + breathe * 0.2 + boost * 0.35})`;
      }
      if (!reduce || (clock.current?.now() ?? 0) < tl.end) living = requestAnimationFrame(live);
    };

    // 동작 줄이기면 불이 붙은 끝 장면부터 (목소리는 들려준다)
    const from = reduce ? tl.end : 0;
    clock.current = runCinemaClock(tl.end, apply, from);
    living = requestAnimationFrame(live);
    void sound.playFrom(reduce ? ignite + 520 : 0);
    const at = (ms: number, fn: () => void) => {
      if (ms >= from) timers.current.push(window.setTimeout(fn, ms - from));
    };
    // 지난 날 불 붙는 소리 — 점점 높게
    for (const c of tl.catches) {
      at(c.t, () => {
        sound.play("catch", { rate: c.rate });
        cinemaHaptic("light");
      });
    }
    at(tl.today, () => cinemaHaptic("medium"));
    at(ignite, () => cinemaHaptic("heavy"));
    at(ignite + 420, () => cinemaHaptic("success"));

    return () => {
      clock.current?.stop();
      clock.current = null;
      cancelAnimationFrame(living);
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
      sound.dispose();
      audio.current = null;
    };
  }, [days, tl, language]);

  /** 화면을 누르면 끝 장면으로 (남은 효과음은 끊는다) */
  const skip = () => {
    const current = clock.current;
    if (!current || current.now() >= tl.end) return;
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    audio.current?.stop();
    current.seek(tl.end);
    if (tl.milestone) setConfetti(true);
  };

  // 연속 학습(하루) → 스코어 상승(유닛) → 상자(노드) → 원래 가던 곳
  const proceed = () => {
    // 연속 보상 상자가 있으면 원래 가려던 곳 앞에 끼운다 (misc/model/streak-chest-route)
    const go = (next: string) => router.replace(viaStreakChest(next, params));
    // 표현·말하기·TOPIK·문법·리스닝에서 왔으면 갈 곳이 정해져 있다
    const fixedNext = params.get("next");
    if (fixedNext) {
      if (params.get("streakChestGems")) router.replace(viaStreakChest(fixedNext, params));
      else goNext(router, fixedNext, () => router.replace("/home"));
      return;
    }
    const scoreUp = params.get("scoreUp");
    const category = params.get("category");
    const chestGrade = params.get("chestGrade");
    const chest = {
      chestGems: params.get("chestGems") ?? "",
      chestGrade: chestGrade ?? "",
      gemTotal: params.get("gemTotal") ?? "",
    };
    if (scoreUp) {
      const next = new URLSearchParams({ ...chest, score: scoreUp, unit: params.get("scoreUpUnit") ?? "", category: category ?? "", from: params.get("from") ?? "" });
      go(`/score-up?${next.toString()}`);
      return;
    }
    if (chestGrade) {
      const next = new URLSearchParams({ category: category ?? "", from: params.get("from") ?? "", gemTotal: chest.gemTotal || "0", gems: chest.chestGems || "0", grade: chestGrade });
      go(`/chest-reward?${next.toString()}`);
      return;
    }
    // 학습 로드에서 왔으면 그 하루로 돌아간다 (자율 로드맵으로 새면 안 된다)
    if (params.get("from") === "studyPath") {
      go("/study-path");
      return;
    }
    go(category ? `/roadmap?category=${encodeURIComponent(category)}` : "/home");
  };

  return (
    <main className={styles.page} ref={page}>
      {/* 불티 — 불이 붙은 뒤 위로 흩어져 올라간다 */}
      <div className={styles.embers} aria-hidden="true" ref={embers} style={{ opacity: 0 }}>{Array.from({ length: 14 }, (_, index) => <i key={index} style={{ "--i": index } as CSSProperties} />)}</div>
      {/* 점화 순간 화면이 따뜻하게 번쩍 */}
      <i aria-hidden className={styles.warm} ref={warm} />
      {/* 화면을 누르면 끝 장면으로 */}
      <section className={styles.content} onClick={skip} ref={content}>
        <div className={styles.flameArea} ref={flameArea}>
          <i className={styles.glow} ref={glow} style={{ opacity: 0 }} />
          <i className={styles.ember} ref={ember} />
          <div className={styles.flame} ref={flame} style={{ opacity: 0 }}><Flame /></div>
          {IGNITE_SPARKS.map((spark, index) => (
            <i
              className={styles.spark}
              key={index}
              ref={(el) => {
                sparks.current[index] = el;
              }}
              style={{ width: spark.size, height: spark.size, background: spark.gold ? "#FFC93C" : "#FF7A00", opacity: 0 }}
            />
          ))}
          {/* 숫자는 불꽃 밖에 둔다 — 불은 움직이고 숫자는 가만히 있어야 읽힌다 */}
          <b data-no-translate ref={prev} style={{ opacity: 0 }}>{streak - 1}</b>
          <b data-no-translate ref={next} style={{ opacity: 0 }}>{streak}</b>
        </div>
        {tl.milestone ? (
          <div className={styles.badge} data-i18n="streakDay.milestone" ref={badge} style={{ opacity: 0 }}>
            {uzt("streakDay.milestone", { n: streak })}
          </div>
        ) : null}
        <h1 ref={title} style={{ opacity: 0 }}>
          <small className={styles.streakScope} data-i18n="learningStreak.title">{uzt("learningStreak.title")}</small>
          <span data-i18n="streakDay.title">{uzt("streakDay.title")}</span>
        </h1>
        {/* 줄바꿈까지 locale 문장 그대로여야 번역이 붙는다 (<br/> 로 쪼개면 우즈벡어로 남는다) */}
        <p data-i18n="streakDay.subtitle" ref={subtitle} style={{ opacity: 0 }}>{uzt("streakDay.subtitle")}</p>
        <div className={styles.week}>
          {days.map((day, index) => (
            <div className={styles.day} key={`${day.label}-${index}`}>
              <span
                className={day.isToday ? styles.today : undefined}
                ref={(el) => {
                  dots.current[index] = el;
                }}
                style={{ opacity: 0 }}
              >
                <i
                  className={styles.dayRing}
                  ref={(el) => {
                    rings.current[index] = el;
                  }}
                  style={{ opacity: 0 }}
                />
                <em
                  ref={(el) => {
                    lits.current[index] = el;
                  }}
                  style={{ opacity: 0 }}
                >
                  <MobileIcon name="checkmark" size={20} />
                </em>
              </span>
              <small className={day.isToday ? styles.labelToday : undefined}>
                {day.label}
                {/* 불이 붙으면 주황 글씨가 위에 겹쳐 나타난다 */}
                <b
                  aria-hidden
                  ref={(el) => {
                    labels.current[index] = el;
                  }}
                  style={{ opacity: 0 }}
                >
                  {day.label}
                </b>
              </small>
            </div>
          ))}
        </div>
      </section>
      {/* 오늘 칸으로 건너오는 불 · 불씨까지 솟는 불덩이 */}
      <i aria-hidden className={styles.hop} ref={hop} style={{ opacity: 0 }} />
      <i aria-hidden className={styles.fireball} ref={fireball} style={{ opacity: 0 }} />
      {confetti ? <Confetti /> : null}
      <footer><button onClick={proceed} type="button">Davom etish</button></footer>
    </main>
  );
}
