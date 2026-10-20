"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { Confetti } from "../../../shared/ui/confetti";
import { createCinemaAudio, type CinemaAudio } from "../../../shared/browser/cinema-audio";
import { cinemaHaptic, prefersReducedMotion, runCinemaClock, type CinemaClock } from "../../../shared/browser/cinema-clock";
import { cinemaAt, shakeAt } from "../../../shared/model/cinema";
import {
  GEM_DING_GAP,
  RESULT_CRACKS,
  RESULT_SHARDS,
  gemDings,
  resultTimeline,
  shardAt,
  type ResultSound,
} from "../../../shared/model/league-result-cinematic";
import { uzt } from "../../../shared/i18n/uz-text";
import { TIERS, getTier, getTierIndex, tierLabel, type LeagueResult } from "../model/league";
import { TierCrystal } from "./tier-crystal";
import styles from "./league-result-screen.module.css";
import { safeBack } from "../../../shared/telegram/back-button";

const CRYSTAL = 170;
const RUNG = 30;
const RUNG_GAP = 4;

/** 이미 있는 연출 소리 + 리그 결과용 (tools/cinema-audio league 세트 · 앱과 같다) */
const RESULT_SOURCES: Record<ResultSound, string> = {
  charge: "/sounds/energy/charge.mp3",
  burst: "/sounds/chest/burst.mp3",
  land: "/sounds/lesson/stamp-thump.mp3",
  sparkle: "/sounds/lesson/sparkle.mp3",
  fireworks: "/sounds/streak/fireworks.mp3",
  crack: "/sounds/league/crack.mp3",
  shatter: "/sounds/league/shatter.mp3",
  ding: "/sounds/chest/gem-ding.mp3",
  voPromote: "/sounds/league/vo-promote.mp3",
  voStay: "/sounds/league/vo-stay.mp3",
  voDemote: "/sounds/league/vo-demote.mp3",
};
const RESULT_GAIN: Partial<Record<ResultSound, number>> = {
  charge: 0.6,
  burst: 0.7,
  land: 0.8,
  sparkle: 0.6,
  fireworks: 0.55,
  crack: 0.75,
  shatter: 0.7,
  ding: 0.5,
};

/**
 * 리그 주간 결과 (앱 app/league-result.tsx 와 같다) — 리그 탭과 같은 밤하늘 무대,
 * 승급 · 강등 · 유지마다 다른 장면 (shared/model/league-result-cinematic).
 * React 는 뼈대만 그리고, 시계(runCinemaClock)가 매 프레임 style 을 바꾼다.
 * 화면을 누르면 끝 장면으로, 동작 줄이기면 끝 장면부터.
 */
export function LeagueResultScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [result, setResult] = useState<LeagueResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void request<LeagueResult | null>("/league/result")
      .then((value) => {
        if (value) setResult(value);
        else safeBack(router);
      })
      .catch(() => safeBack(router))
      .finally(() => setLoading(false));
  }, [request, router]);

  if (loading || !result) return <main className={styles.loading} />;

  const finish = async () => {
    try {
      await request("/league/result/ack", { body: "{}", method: "POST" });
    } catch {
      // 네이티브와 동일하게 확인 API 실패여도 사용자를 화면에 가두지 않는다.
    }
    safeBack(router);
  };

  return <ResultStage onFinish={finish} result={result} />;
}

function ResultStage({ result, onFinish }: { result: LeagueResult; onFinish: () => void }) {
  const tl = useMemo(() => resultTimeline(result.change), [result.change]);
  const fromTier = getTier(result.fromTier);
  const toTier = getTier(result.toTier);
  const fromIdx = getTierIndex(result.fromTier);
  const toIdx = getTierIndex(result.toTier);
  const promote = result.change === "promote";
  const demote = result.change === "demote";
  const droppedByXp = demote && result.reason === "xp";
  const xpRatio =
    droppedByXp && (result.requiredXp ?? 0) > 0 ? Math.min(1, (result.weeklyXp ?? 0) / (result.requiredXp ?? 1)) : 0;

  const [confetti, setConfetti] = useState(false);
  const [canFinish, setCanFinish] = useState(false);
  const clock = useRef<CinemaClock | null>(null);
  const audio = useRef<CinemaAudio<ResultSound> | null>(null);
  const timers = useRef<number[]>([]);

  const stage = useRef<HTMLDivElement>(null);
  const rank = useRef<HTMLSpanElement>(null);
  const spotOld = useRef<HTMLElement>(null);
  const spotNew = useRef<HTMLElement>(null);
  const rays = useRef<HTMLElement>(null);
  const ring = useRef<HTMLElement>(null);
  const oldWrap = useRef<HTMLSpanElement>(null);
  const charge = useRef<HTMLElement>(null);
  const cracks = useRef<(SVGPathElement | null)[]>([]);
  const shards = useRef<(HTMLSpanElement | null)[]>([]);
  const newWrap = useRef<HTMLSpanElement>(null);
  const sweep = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const xpWrap = useRef<HTMLDivElement>(null);
  const xpFill = useRef<HTMLElement>(null);
  const gems = useRef<HTMLSpanElement>(null);
  const ladder = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const flash = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const T = tl.tracks;
    const reduce = prefersReducedMotion();
    const sound = createCinemaAudio({ sources: RESULT_SOURCES, gains: RESULT_GAIN, cues: tl.cues });
    sound.preload();
    audio.current = sound;
    const buttonAt = T.button[1]?.t ?? 0;
    let confettiShown = false;
    let finishShown = false;

    const rise = (el: HTMLElement | null, track: typeof T.title, t: number) => {
      if (!el) return;
      const v = Math.min(1, cinemaAt(track, t));
      el.style.opacity = String(v);
      el.style.transform = v >= 1 ? "" : `translateY(${(1 - v) * 14}px)`;
    };

    const apply = (t: number) => {
      rise(rank.current, T.rank, t);
      const spot = cinemaAt(T.spot, t);
      const newOn = Math.min(1, cinemaAt(T.newOpacity, t));
      if (spotOld.current) spotOld.current.style.opacity = String(spot * (1 - newOn));
      if (spotNew.current) spotNew.current.style.opacity = String(spot * newOn);
      if (rays.current) {
        rays.current.style.opacity = String(cinemaAt(T.rays, t) * 0.55);
        rays.current.style.transform = `rotate(${t / 30}deg)`;
      }
      if (ring.current) {
        const r = cinemaAt(T.ring, t);
        ring.current.style.opacity = String(r <= 0 || r >= 1 ? 0 : 0.8 * (1 - r));
        ring.current.style.transform = `scale(${0.6 + 1.3 * r})`;
      }
      if (oldWrap.current) {
        const amp = cinemaAt(T.shake, t);
        oldWrap.current.style.opacity = String(cinemaAt(T.oldOpacity, t));
        oldWrap.current.style.transform = `translate(${amp * Math.sin(t / 23)}px, ${amp * 0.6 * Math.cos(t / 31)}px) scale(${cinemaAt(T.oldScale, t)})`;
      }
      if (charge.current) {
        const c = cinemaAt(T.charge, t);
        charge.current.style.opacity = String(c * 0.9);
        charge.current.style.transform = `scale(${0.7 + 0.5 * c})`;
      }
      const crack = cinemaAt(T.crack, t);
      cracks.current.forEach((path, index) => {
        if (path) path.style.opacity = String(Math.min(1, Math.max(0, crack * RESULT_CRACKS.length - index)));
      });
      const shardP = cinemaAt(T.shards, t);
      shards.current.forEach((el, index) => {
        const shard = RESULT_SHARDS[index];
        if (!el || !shard) return;
        const p = shardAt(shard, shardP, demote);
        el.style.opacity = String(p.opacity);
        el.style.transform = `translate(${p.x * CRYSTAL}px, ${p.y * CRYSTAL}px) rotate(${p.rotate}deg)`;
      });
      if (flash.current) flash.current.style.opacity = String(cinemaAt(T.flash, t));
      if (newWrap.current) {
        newWrap.current.style.opacity = String(newOn);
        newWrap.current.style.transform = `translateY(${cinemaAt(T.newY, t) * CRYSTAL}px) scale(${cinemaAt(T.newScale, t)})`;
      }
      if (sweep.current) {
        const p = cinemaAt(T.sweep, t);
        sweep.current.style.opacity = String(p <= 0 || p >= 1 ? 0 : 1);
        sweep.current.style.transform = `translateX(${-120 + p * 240}px) rotate(20deg)`;
      }
      if (stage.current) {
        const k = promote ? shakeAt(t, 1300, 420, 10) : { x: 0, y: 0 };
        stage.current.style.transform = k.x || k.y ? `translate(${k.x}px, ${k.y}px)` : "";
      }
      rise(title.current, T.title, t);
      rise(sub.current, T.sub, t);
      rise(xpWrap.current, T.xpBar, t);
      if (xpFill.current) xpFill.current.style.width = `${cinemaAt(T.xpFill, t) * xpRatio * 100}%`;
      if (gems.current) {
        const g = cinemaAt(T.gems, t);
        gems.current.style.opacity = String(Math.min(1, g));
        gems.current.style.transform = `scale(${Math.max(0.001, g)})`;
      }
      rise(ladder.current, T.ladder, t);
      if (marker.current) {
        const m = cinemaAt(T.marker, t);
        marker.current.style.transform = `translateX(${(fromIdx + (toIdx - fromIdx) * m) * (RUNG + RUNG_GAP)}px)`;
      }
      rise(button.current, T.button, t);
      if (!confettiShown && tl.confettiAt >= 0 && t >= tl.confettiAt) {
        confettiShown = true;
        setConfetti(true);
      }
      if (!finishShown && t >= buttonAt) {
        finishShown = true;
        setCanFinish(true);
      }
    };

    const from = reduce ? tl.reveal : 0;
    clock.current = runCinemaClock(tl.end, apply, from);
    void sound.playFrom(reduce ? tl.reveal : 0);
    const at = (ms: number, fn: () => void) => {
      if (ms >= from) timers.current.push(window.setTimeout(fn, ms - from));
    };
    for (let i = 0; i < gemDings(result.gems); i++) {
      at(tl.gemsAt + i * GEM_DING_GAP, () => sound.play("ding", { rate: Math.min(1.6, 1 + i * 0.07) }));
    }
    if (promote) {
      at(1300, () => cinemaHaptic("heavy"));
      at(1880, () => cinemaHaptic("success"));
    } else if (demote) {
      at(1300, () => cinemaHaptic("warning"));
      at(2380, () => cinemaHaptic("light"));
    } else {
      at(400, () => cinemaHaptic("success"));
    }

    return () => {
      clock.current?.stop();
      clock.current = null;
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
      sound.dispose();
      audio.current = null;
    };
    // 한 번만 — 들어온 순간의 결과로 돈다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 화면을 누르면 끝 장면으로 (남은 효과음은 끊는다) */
  const skip = () => {
    const current = clock.current;
    if (!current || current.now() >= tl.reveal) return;
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    audio.current?.stop();
    current.seek(tl.reveal);
  };

  const titleKey = promote ? "league.result.promoteTitle" : demote ? "league.result.demoteTitle" : "league.result.stayTitle";
  const subKey = droppedByXp
    ? "league.result.demoteXpSub"
    : promote
      ? "league.result.promoteSub"
      : demote
        ? "league.result.demoteSub"
        : "league.result.staySub";
  const subText = droppedByXp
    ? uzt(subKey, { required: result.requiredXp ?? 0, tier: tierLabel(result.fromTier) })
    : uzt(subKey, { tier: tierLabel(result.toTier) });
  const vars = {
    "--from-color": fromTier.color,
    "--from-dark": fromTier.colorDark,
    "--from-light": fromTier.colorLight,
    "--to-color": toTier.color,
    "--to-dark": toTier.colorDark,
    "--to-light": toTier.colorLight,
  } as CSSProperties;

  return (
    <main className={styles.resultPage} style={vars}>
      {confetti ? <Confetti /> : null}

      <div className={styles.stage} onClick={skip} ref={stage}>
        <span className={styles.rankChip} data-i18n="league.result.rank" ref={rank} style={{ opacity: 0 }}>
          <MobileIcon name="podium" size={16} />
          {uzt("league.result.rank", { rank: result.finalRank })}
        </span>

        <div className={styles.crystalArea}>
          <i aria-hidden className={styles.spotOld} ref={spotOld} />
          <i aria-hidden className={styles.spotNew} ref={spotNew} />
          <i aria-hidden className={styles.rays} ref={rays} style={{ opacity: 0 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <b key={i} style={{ transform: `rotate(${i * 30}deg)` }} />
            ))}
          </i>
          <i aria-hidden className={styles.ring} ref={ring} style={{ opacity: 0 }} />

          {result.change !== "stay" ? (
            <span className={styles.crystal} ref={oldWrap}>
              <TierCrystal size={CRYSTAL} tier={fromTier} />
              {demote ? (
                <svg aria-hidden className={styles.cracks} viewBox="0 0 100 115">
                  {RESULT_CRACKS.map((d, i) => (
                    <path
                      d={d}
                      fill="none"
                      key={d}
                      ref={(node) => { cracks.current[i] = node; }}
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.6}
                      style={{ opacity: 0 }}
                    />
                  ))}
                </svg>
              ) : null}
              <i aria-hidden className={styles.charge} ref={charge} style={{ opacity: 0 }} />
            </span>
          ) : null}

          {RESULT_SHARDS.map((shard, i) => (
            <span
              aria-hidden
              className={styles.shard}
              key={i}
              ref={(node) => { shards.current[i] = node; }}
              style={{ height: shard[3] * CRYSTAL, opacity: 0, width: shard[3] * CRYSTAL }}
            >
              <svg viewBox="0 0 100 100">
                <polygon fill={fromTier.color} points="50,0 100,70 20,100" stroke={fromTier.colorDark} strokeWidth={6} />
                <polygon fill={fromTier.colorLight} opacity={0.8} points="50,0 70,40 30,60" />
              </svg>
            </span>
          ))}

          <span className={styles.crystal} ref={newWrap}>
            <TierCrystal active size={CRYSTAL} tier={toTier} />
            <span aria-hidden className={styles.sweepClip}>
              <i className={styles.sweep} ref={sweep} />
            </span>
          </span>
        </div>

        <h1 className={styles.title} data-i18n={titleKey} ref={title} style={{ opacity: 0 }}>
          {uzt(titleKey)}
        </h1>
        <p className={styles.sub} data-i18n={subKey} ref={sub} style={{ opacity: 0 }}>{subText}</p>

        {/* XP 미달로 떨어졌으면 얼마가 모자랐는지 — 게이지가 모은 만큼 찬다 */}
        {droppedByXp ? (
          <div className={styles.xpWrap} ref={xpWrap} style={{ opacity: 0 }}>
            <span className={styles.xpTrack}><i ref={xpFill} /></span>
            <b data-i18n="league.result.xpShort">
              {uzt("league.result.xpShort", { earned: result.weeklyXp ?? 0, required: result.requiredXp ?? 0 })}
            </b>
          </div>
        ) : null}

        {result.gems > 0 ? (
          <span className={styles.gemChip} data-i18n="league.result.gems" ref={gems} style={{ opacity: 0 }}>
            <MobileIcon name="diamond" size={20} />
            {uzt("league.result.gems", { gems: result.gems })}
          </span>
        ) : null}

        {/* 티어 사다리 — "나" 가 옛 칸에서 새 칸으로 */}
        <div className={styles.ladderWrap} ref={ladder} style={{ opacity: 0 }}>
          <div className={styles.ladder} style={{ gap: RUNG_GAP }}>
            {TIERS.map((tier, i) => (
              <span className={styles.rung} key={tier.key} style={{ width: RUNG }}>
                <TierCrystal locked={i > Math.max(fromIdx, toIdx)} size={RUNG} tier={tier} />
              </span>
            ))}
            <span className={styles.marker} ref={marker} style={{ width: RUNG }}>
              <em data-i18n="league.meChip">{uzt("league.meChip")}</em>
            </span>
          </div>
        </div>
      </div>

      {/* 승급 — 옛 크리스털이 터지는 순간 화면이 하얗게 번쩍 */}
      <i aria-hidden className={styles.flash} ref={flash} />

      <button
        className={styles.continueButton}
        data-i18n="league.result.continue"
        disabled={!canFinish}
        onClick={onFinish}
        ref={button}
        style={{ opacity: 0 }}
        type="button"
      >
        {uzt("league.result.continue")}
      </button>
    </main>
  );
}
