"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { createCinemaAudio } from "../../shared/browser/cinema-audio";
import { cinemaHaptic, prefersReducedMotion, runCinemaClock } from "../../shared/browser/cinema-clock";
import { useCinemaLanguage } from "../../shared/browser/use-cinema-language";
import {
  BOLT_PATH,
  cinemaAt,
  cinemaVoices,
  fountainAt,
  starPath,
  type CinemaLanguage,
} from "../../shared/model/cinema";
import {
  JACKPOT,
  JACKPOT_WORD,
  SLOT_LETTERS,
  JACKPOT_TRACK,
  SLOT_SYMBOLS,
  bulbOn,
  coinArrival,
  jackpotCoinCount,
  jackpotCoins,
  jackpotCues,
  jackpotEnd,
  reelAt,
  reelDistance,
  type EnergySound,
  type SlotSymbol,
} from "../../shared/model/energy-cinematic";
import { rt } from "../retention/model/retention";
import { energyBadgePoint } from "./energy-target";
import styles from "./energy-jackpot.module.css";

type JackpotSound = Extract<EnergySound, "slotLever" | "slotSpin" | "slotStop" | "jackpot" | "voJackpot" | "collect">;
const SOURCES: Record<JackpotSound, string> = {
  slotLever: "/sounds/energy/slot-lever.mp3",
  slotSpin: "/sounds/energy/slot-spin.mp3",
  slotStop: "/sounds/energy/slot-stop.mp3",
  jackpot: "/sounds/energy/jackpot.mp3",
  voJackpot: "/sounds/energy/vo-jackpot.mp3",
  collect: "/sounds/energy/collect.mp3",
};
/** 영어 코스 — "Jackpot!" */
const VOICES_EN: Partial<Record<JackpotSound, string>> = {
  voJackpot: "/sounds/energy/vo-jackpot-en.mp3",
};
const GAIN: Partial<Record<JackpotSound, number>> = { slotSpin: 0.55, slotStop: 0.9, jackpot: 0.75, collect: 0.7 };
const CUES = jackpotCues() as { t: number; sound: JackpotSound }[];

const CAB_W = 288;
const CAB_H = 252;
const SYM = 74; // 기호 한 칸 높이
const WIN_H = 96;
const N = SLOT_SYMBOLS.length;
const BULBS = 14;
const STAR = starPath(50, 50, 44, 19);

/** 테두리 전구 자리 — 둘레를 한 바퀴 (위 → 오른쪽 → 아래 → 왼쪽) */
const BULB_SPOTS = Array.from({ length: BULBS }, (_, index) => {
  const per = 2 * (CAB_W + CAB_H);
  const d = (index / BULBS) * per;
  if (d < CAB_W) return { x: d, y: 0 };
  if (d < CAB_W + CAB_H) return { x: CAB_W, y: d - CAB_W };
  if (d < 2 * CAB_W + CAB_H) return { x: CAB_W - (d - CAB_W - CAB_H), y: CAB_H };
  return { x: 0, y: CAB_H - (d - 2 * CAB_W - CAB_H) };
});

function SymbolFace({ symbol, language }: { symbol: SlotSymbol; language: CinemaLanguage }) {
  if (symbol === "bolt") {
    return (
      <svg height={50} viewBox="0 0 100 100" width={50}>
        <path d={BOLT_PATH} fill="#FFD23F" stroke="#E0A200" strokeLinejoin="round" strokeWidth={5} />
      </svg>
    );
  }
  if (symbol === "star") {
    return (
      <svg height={46} viewBox="0 0 100 100" width={46}>
        <path d={STAR} fill="#FFD45C" stroke="#E2A83A" strokeLinejoin="round" strokeWidth={4} />
      </svg>
    );
  }
  if (symbol === "gem") {
    return (
      <svg height={44} viewBox="0 0 100 100" width={44}>
        <polygon fill="#3BB6E5" points="50,6 92,32 50,94 8,32" />
        <polygon fill="#A8E5F7" points="50,6 92,32 50,40 8,32" />
        <polygon fill="#5CD0F0" points="50,40 92,32 50,94" />
      </svg>
    );
  }
  return <b className={styles.symbolText}>{SLOT_LETTERS[language][symbol]}</b>;
}

/**
 * 콤보 에너지 보상 연출 — "잭팟 슬롯" (앱 EnergyJackpot. 번개·코어와 랜덤으로 번갈아 나온다).
 *   1) 보라 슬롯머신이 위에서 쿵 떨어지고, 손잡이가 저절로 당겨진다
 *   2) 세 칸이 돌다 하나씩 ⚡ 로 멈춘다 — 마지막 칸은 뜸을 들인다
 *   3) 잭팟! 전구가 다 같이 번쩍이고 에너지 동전이 쏟아져 헤더 에너지 배지로 날아간다
 * 시간표는 shared/model/energy-cinematic JACKPOT. 클릭을 막지 않는다.
 */
export function EnergyJackpot({ amount, onDone, subtitle }: { amount: number; onDone: () => void; subtitle?: string }) {
  const [{ W, H }] = useState(() => ({ W: window.innerWidth, H: window.innerHeight }));
  const coinCount = jackpotCoinCount(amount);
  const coins = useMemo(() => jackpotCoins(coinCount, 110), [coinCount]);
  // 간판 글씨 · 릴의 글자 · 외침은 배우는 말로 (영어 코스는 JACKPOT · A · E)
  const language = useCinemaLanguage();
  const distances = useMemo(() => JACKPOT.stops.map(reelDistance), []);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const dim = useRef<HTMLElement>(null);
  const flash = useRef<HTMLElement>(null);
  const cabinet = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLElement>(null);
  const lever = useRef<HTMLDivElement>(null);
  const amountEl = useRef<HTMLDivElement>(null);
  const strips = useRef<(HTMLDivElement | null)[]>([]);
  const blurs = useRef<(HTMLElement | null)[]>([]);
  const bulbs = useRef<(HTMLElement | null)[]>([]);
  const coinEls = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    // 동전이 나오는 곳 (기계 아래 받침) → 헤더 에너지 배지
    const trayX = W / 2;
    const trayY = H / 2 + CAB_H / 2 - 22;
    const target = energyBadgePoint();
    const end = jackpotEnd(coinCount);
    const audio = createCinemaAudio({ sources: cinemaVoices(SOURCES, VOICES_EN, language), gains: GAIN, cues: CUES });
    audio.preload();
    // 동작 줄이기면 잭팟 순간부터
    const reduce = prefersReducedMotion();
    const from = reduce ? JACKPOT.win : 0;

    const apply = (t: number) => {
      if (dim.current) dim.current.style.opacity = String(cinemaAt(JACKPOT_TRACK.dim, t));
      const win = cinemaAt(JACKPOT_TRACK.win, t);
      if (flash.current) flash.current.style.opacity = String(win * 0.35);
      if (glow.current) glow.current.style.opacity = String(win * 0.6);
      if (cabinet.current) {
        const leave = cinemaAt(JACKPOT_TRACK.leave, t);
        cabinet.current.style.opacity = String(1 - leave);
        cabinet.current.style.transform = `translateY(${cinemaAt(JACKPOT_TRACK.drop, t) * (H / 2 + CAB_H)}px) scale(${1 - 0.35 * leave})`;
      }
      if (lever.current) lever.current.style.transform = `rotate(${cinemaAt(JACKPOT_TRACK.lever, t) * 118}deg)`;
      if (amountEl.current) {
        const a = cinemaAt(JACKPOT_TRACK.amount, t);
        amountEl.current.style.opacity = String(Math.min(1, a));
        amountEl.current.style.transform = `scale(${Math.max(0.001, a)})`;
      }
      // 칸 — 기호 띠가 아래로 흐르다 ⚡ 에 멈춘다. 빨리 돌 땐 흐릿하게
      JACKPOT.stops.forEach((stopAt, i) => {
        const strip = strips.current[i];
        if (strip) {
          const p = reelAt(t, stopAt, distances[i] as number);
          const m = ((p % N) + N) % N;
          strip.style.transform = `translateY(${m * SYM}px)`;
        }
        const blur = blurs.current[i];
        if (blur) blur.style.opacity = t > JACKPOT.spin + 60 && t < stopAt - 260 ? "0.55" : "0";
      });
      bulbs.current.forEach((el, i) => {
        if (el) el.style.opacity = String(bulbOn(i, t));
      });
      coins.forEach((coin, i) => {
        const el = coinEls.current[i];
        if (!el) return;
        const p = fountainAt(coin, t, trayX, trayY, target.x, target.y, JACKPOT.fly);
        el.style.opacity = String(p.opacity);
        el.style.transform = `translate(${p.x - coin.size / 2}px, ${p.y - coin.size / 2}px) rotate(${p.rotate}deg) scale(${p.scale})`;
      });
    };

    const clock = runCinemaClock(end, apply, from);
    void audio.playFrom(from);
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, Math.max(0, ms - from)));
    JACKPOT.stops.forEach((stop, i) => {
      if (stop >= from) at(stop, () => cinemaHaptic(i === 2 ? "heavy" : "medium"));
    });
    at(JACKPOT.win, () => cinemaHaptic("success"));
    // 첫 동전 · 마지막 동전이 헤더에 닿을 때
    at(coinArrival(0), () => audio.play("collect"));
    at(coinArrival(coinCount - 1), () => {
      audio.play("collect", { rate: 1.2 });
      cinemaHaptic("medium");
    });
    // 애니메이션이 끊겨도 반드시 닫힌다
    at(end, () => doneRef.current());
    return () => {
      clock.stop();
      timers.forEach((timer) => window.clearTimeout(timer));
      // 마지막 동전 소리는 닫히는 순간에도 울리고 있다 — 끊지 않는다
      audio.release();
    };
  }, [W, H, coinCount, coins, distances, language]);

  return (
    <div aria-live="polite" className={styles.overlay}>
      <i className={styles.dim} ref={dim} />
      <i className={styles.flash} ref={flash} />

      <div className={styles.center}>
        <div className={styles.cabinetWrap} ref={cabinet} style={{ opacity: 0 }}>
          {/* 잭팟 후광 */}
          <i className={styles.glow} ref={glow} style={{ opacity: 0 }} />

          {/* +N */}
          <div className={styles.amount} ref={amountEl} style={{ opacity: 0 }}>
            <b data-no-translate>+{amount}</b>
          </div>

          {/* 손잡이 — 오른쪽, 아래로 당겨진다 */}
          <i aria-hidden className={styles.leverBase} />
          <div aria-hidden className={styles.lever} ref={lever}>
            <i className={styles.leverStick} />
            <i className={styles.leverKnob} />
          </div>

          <div aria-hidden className={styles.cabinet}>
            <i className={styles.cabinetFill} />

            {/* 위 간판 */}
            <div className={styles.marquee}>
              <b data-no-translate>{JACKPOT_WORD[language]}</b>
            </div>

            {/* 세 칸 */}
            <div className={styles.reelPanel}>
              {JACKPOT.stops.map((stop, i) => (
                <div className={styles.reel} key={stop}>
                  <div
                    className={styles.strip}
                    ref={(el) => {
                      strips.current[i] = el;
                    }}
                    style={{ top: WIN_H / 2 - (N + 0.5) * SYM }}
                  >
                    {Array.from({ length: N * 3 }, (_, j) => (
                      <div className={styles.symbol} data-no-translate key={j}>
                        <SymbolFace language={language} symbol={SLOT_SYMBOLS[j % N] as SlotSymbol} />
                      </div>
                    ))}
                  </div>
                  <i
                    className={styles.reelBlur}
                    ref={(el) => {
                      blurs.current[i] = el;
                    }}
                    style={{ opacity: 0 }}
                  />
                  {/* 위아래 그늘 — 둥근 통처럼 */}
                  <i className={styles.reelShade} />
                </div>
              ))}
              {/* 가운데 줄 */}
              <i className={styles.payline} />
            </div>

            {/* 받침 */}
            <i className={styles.tray} />

            {/* 테두리 전구 */}
            {BULB_SPOTS.map((spot, i) => (
              <i
                className={styles.bulb}
                key={i}
                ref={(el) => {
                  bulbs.current[i] = el;
                }}
                style={{ left: spot.x - 6, top: spot.y - 6 }}
              />
            ))}
          </div>

          <p className={styles.sub}>{subtitle ?? rt("surge.sub")}</p>
        </div>
      </div>

      {/* 에너지 동전 — 받침에서 쏟아져 헤더로 */}
      {coins.map((coin, i) => (
        <div
          aria-hidden
          className={styles.coin}
          key={i}
          ref={(el) => {
            coinEls.current[i] = el;
          }}
          style={{ width: coin.size, height: coin.size, opacity: 0 }}
        >
          <svg height={coin.size} viewBox="0 0 100 100" width={coin.size}>
            <circle cx={50} cy={50} fill="#E0A200" r={46} />
            <circle cx={50} cy={46} fill="#FFD23F" r={42} />
            <path d={BOLT_PATH} fill="#FFFFFF" transform="translate(22 18) scale(0.56)" />
          </svg>
        </div>
      ))}
    </div>
  );
}
