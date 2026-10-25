"use client";

import { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { uzt } from "../../../shared/i18n/uz-text";
import { triggerFeatureTip } from "../../feature-tips/model/feature-tips";

import { Confetti } from "../../../shared/ui/confetti";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { playSfx, preloadSfx, suppressDefaultButtonSound } from "../../../shared/browser/sfx";
import { createCinemaAudio, type CinemaAudio } from "../../../shared/browser/cinema-audio";
import { cinemaHaptic, prefersReducedMotion, runCinemaClock, type CinemaClock } from "../../../shared/browser/cinema-clock";
import { useCinemaLanguage } from "../../../shared/browser/use-cinema-language";
import { cinemaVoices, shakeAt, starPath } from "../../../shared/model/cinema";
import {
  CHEST_CINEMA,
  RATTLE_RATE,
  chestEnd,
  chestSoundCues,
  flyingGemCount,
  flyingGems,
  gemArrival,
  type ChestGrade,
  type ChestSound,
} from "../../../shared/model/chest-cinematic";
import { goNext } from "../model/streak-chest-route";
import { ChestBurstLayer, type ChestBurstHandle } from "./chest-burst-layer";
import styles from "./chest-reward-screen.module.css";

type Phase = "idle" | "opening" | "revealed";

const TITLES = {
  gold: "Afsonaviy buyum",
  silver: "Noyob buyum",
  wood: "Oddiy buyum",
} as const;

/** 상자 연출 소리 — 앱 chest-reward 와 같은 파일·크기 */
const CHEST_SOURCES: Record<ChestSound, string> = {
  rattle: "/sounds/chest/rattle.mp3",
  burst: "/sounds/chest/burst.mp3",
  gemDing: "/sounds/chest/gem-ding.mp3",
  voWow: "/sounds/chest/vo-wow.mp3",
  voDaebak: "/sounds/chest/vo-daebak.mp3",
};

/** 영어 코스 — "Wow!" · "Awesome!" */
const CHEST_VOICES_EN: Partial<Record<ChestSound, string>> = {
  voWow: "/sounds/chest/vo-wow-en.mp3",
  voDaebak: "/sounds/chest/vo-daebak-en.mp3",
};

/** 원래 열림 소리(chest-open*) 위에 겹치므로 터지는 소리는 조금 작게 */
const CHEST_GAIN: Partial<Record<ChestSound, number>> = {
  rattle: 0.8,
  burst: 0.65,
  gemDing: 0.5,
};

/** 등급별 상자 색 — 앱 chest-reward/Chest 의 GRADE 와 같다 */
const GRADE_COLORS: Record<ChestGrade, Record<string, string>> = {
  wood: {
    "--frame": "#F4B26A",
    "--frame-dark": "#E89E54",
    "--wood": "#C97A2E",
    "--stripe": "#A8631F",
    "--lock": "#F4D9B0",
    "--lock-in": "#E8C58E",
    "--glow": "#FFD98A",
    "--glow-strong": "#FFB74D",
  },
  silver: {
    "--frame": "#E4EAF1",
    "--frame-dark": "#C2CCD8",
    "--wood": "#9AA6B2",
    "--stripe": "#7E8A98",
    "--lock": "#F2F6FB",
    "--lock-in": "#D4DEEA",
    "--glow": "#EAF2FF",
    "--glow-strong": "#B9D3F0",
  },
  gold: {
    "--frame": "#FFD95A",
    "--frame-dark": "#F0B400",
    "--wood": "#E0A400",
    "--stripe": "#B98600",
    "--lock": "#FFF0B0",
    "--lock-in": "#FFE07A",
    "--glow": "#FFEC8A",
    "--glow-strong": "#FFC93C",
  },
};

/** 틈새 빛줄기 각도 */
const LEAKS = [-62, -34, -12, 12, 34, 62];
/** 반짝이 파티클 — 그린 별 (금 · 흰 · 등급 빛 · 보석 파랑) */
const SPARK_STAR = starPath(50, 50, 48, 18, 4);

interface BurstGeometry {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

/** 숫자가 target 으로 따라 오른다 (앱 GemCounter) */
function GemCounter({ target }: { target: number }) {
  const [display, setDisplay] = useState(target);
  const shown = useRef(target);
  useEffect(() => {
    const from = shown.current;
    const diff = target - from;
    if (!diff) return;
    const steps = Math.min(Math.abs(diff), 30);
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      const value = count >= steps ? target : Math.round(from + (diff * count) / steps);
      shown.current = value;
      setDisplay(value);
      if (count >= steps) window.clearInterval(timer);
    }, 35);
    return () => window.clearInterval(timer);
  }, [target]);
  return <span className={styles.gemCounter}><MobileIcon name="diamond" size={22} />{display}</span>;
}

function Sparkles() {
  return <div className={styles.sparkles} aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <i key={index} style={{ "--i": index } as CSSProperties} />)}</div>;
}

/**
 * 상자 — 등급 색으로 그린다. 탭할수록 뚜껑 틈으로 빛이 새어 나오고(seam, leaks),
 * 열리면 뚜껑이 날아가며 그린 별이 터진다. 틈새 빛은 화면이 Web Animations 로 움직인다.
 */
const Chest = forwardRef<HTMLDivElement, { grade: ChestGrade; opening: boolean; ready: boolean; shaking: boolean }>(function Chest(
  { grade, opening, ready, shaking },
  ref,
) {
  const sparkColors = ["#FFD45C", "#FFFFFF", GRADE_COLORS[grade]["--glow-strong"], "#5CD0F0"];
  return (
    <div
      className={`${styles.chestScene} ${ready ? styles.chestReady : ""} ${shaking ? styles.chestShaking : ""} ${opening ? styles.chestOpening : ""}`}
      ref={ref}
      style={GRADE_COLORS[grade] as CSSProperties}
    >
      <i className={styles.chestGlow} />
      {opening ? <><i className={styles.chestFlash} /><div className={styles.burst}>{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ "--i": index } as CSSProperties} />)}</div></> : null}
      <div className={styles.chestBox}>
        <i className={styles.chestShadow} />
        <div className={styles.chestBase}><span><i /><i /></span></div>
        {/* 틈새로 새어 나오는 빛 — 뚜껑 뒤에서 위로 부채꼴 */}
        <div className={styles.leaks} data-chest-leaks>
          {LEAKS.map((deg) => <i key={deg} style={{ transform: `rotate(${deg}deg)` }} />)}
        </div>
        <i className={styles.seam} data-chest-seam />
        <div className={styles.chestLid}><span><i /></span></div>
        <div className={styles.chestLock}><i /></div>
      </div>
      {opening ? (
        <div className={styles.gemParticles}>
          {Array.from({ length: 8 }, (_, index) => {
            const size = 16 + (index % 3) * 7;
            return (
              <i key={index} style={{ "--i": index, "--s": `${size}px` } as CSSProperties}>
                <svg height={size} viewBox="0 0 100 100" width={size}><path d={SPARK_STAR} fill={sparkColors[index % 4]} /></svg>
              </i>
            );
          })}
        </div>
      ) : null}
    </div>
  );
});

function GemsPile() {
  return <div className={styles.gemsPile}><i className={styles.gemShadow}/>{Array.from({ length: 5 },(_,index)=><span key={index} style={{ "--i": index } as CSSProperties}><i /></span>)}</div>;
}

/** 틈새 빛 (0~1) — seam 은 가로로, 빛줄기는 위로 자란다 (앱 Chest seamStyle·leakStyle) */
function animateSeam(scene: HTMLElement | null, keys: { at: number; v: number }[], duration: number) {
  const seam = scene?.querySelector<HTMLElement>("[data-chest-seam]");
  const leaks = scene?.querySelector<HTMLElement>("[data-chest-leaks]");
  const frames = (paint: (v: number) => Keyframe) => keys.map(({ at, v }) => ({ ...paint(v), offset: at / duration }));
  const options: KeyframeAnimationOptions = { duration, fill: "forwards", easing: "ease-out" };
  seam?.animate?.(frames((v) => ({ opacity: v, transform: `scaleX(${0.7 + 0.3 * v})` })), options);
  leaks?.animate?.(frames((v) => ({ opacity: v * 0.85, transform: `scaleY(${0.4 + 0.6 * v})` })), options);
}

export function ChestRewardScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const gradeRaw = params.get("grade") ?? "wood";
  const grade: ChestGrade = gradeRaw === "gold" || gradeRaw === "silver" ? gradeRaw : "wood";
  const gems = Math.max(0, Number(params.get("gems")) || 0);
  const gemTotal = Math.max(0, Number(params.get("gemTotal")) || 0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [tapCount, setTapCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [shaking, setShaking] = useState(false);

  // ── 상자 연출 (shared/model/chest-cinematic) ──
  const gemCount = flyingGemCount(gems);
  const flying = useMemo(() => flyingGems(gemCount, 120), [gemCount]);
  /** 상자가 열린 뒤 겹치는 층 (자리를 재고 나서 그린다) */
  const [burst, setBurst] = useState<BurstGeometry | null>(null);
  /** 보석이 닿을 때마다 오르는 카운터 숫자 */
  const [counted, setCounted] = useState(gemTotal);
  const [confetti, setConfetti] = useState(false);
  const page = useRef<HTMLElement>(null);
  const section = useRef<HTMLElement>(null);
  const chest = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const burstLayer = useRef<ChestBurstHandle>(null);
  const audio = useRef<CinemaAudio<ChestSound> | null>(null);
  const clock = useRef<CinemaClock | null>(null);
  const timers = useRef<number[]>([]);
  const seamLevel = useRef(0);

  useEffect(() => preloadSfx("click", "chest-open", "chest-open-rare"), []);

  const language = useCinemaLanguage();
  useEffect(() => {
    const sound = createCinemaAudio({
      sources: cinemaVoices(CHEST_SOURCES, CHEST_VOICES_EN, language),
      gains: CHEST_GAIN,
      cues: chestSoundCues(grade),
    });
    sound.preload();
    audio.current = sound;
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
      clock.current?.stop();
      sound.dispose();
      audio.current = null;
    };
  }, [grade, language]);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  /** 결과 화면 ("Tosh +N") 으로 */
  const showResult = () => {
    // 보석을 막 받았다 — 홈에 돌아가면 "친구 초대하면 더 받아요" 를 알릴 순간
    triggerFeatureTip("invite");
    setCounted(gemTotal + gems);
    setPhase("revealed");
  };

  /**
   * 여는 순간 — 상자 가운데와 카운터 자리를 재서 빛기둥·보석 분수를 띄우고,
   * 보석이 카운터에 닿을 때마다 딩 + 숫자를 올린다 (앱 chest-reward startBurst).
   */
  const startBurst = () => {
    void audio.current?.playFrom(0);
    if (grade === "gold") later(380, () => setConfetti(true));
    if (prefersReducedMotion()) {
      // 동작 줄이기면 분수 없이 상자가 열리자마자 결과로
      later(1450, showResult);
      return;
    }
    const pageBox = page.current?.getBoundingClientRect();
    const chestBox = chest.current?.getBoundingClientRect();
    const counterBox = counter.current?.getBoundingClientRect();
    if (!pageBox || !chestBox || !counterBox) {
      later(1450, showResult);
      return;
    }
    setBurst({
      fromX: chestBox.left - pageBox.left + chestBox.width / 2,
      fromY: chestBox.top - pageBox.top + chestBox.height / 2,
      // 카운터의 보석 아이콘 (왼쪽 끝)
      toX: counterBox.left - pageBox.left + 11,
      toY: counterBox.top - pageBox.top + counterBox.height / 2,
    });
    const amp = grade === "gold" ? 12 : grade === "silver" ? 9 : 6;
    clock.current = runCinemaClock(chestEnd(gemCount), (t) => {
      burstLayer.current?.apply(t);
      // 뚜껑이 날아갈 때 화면이 쿵
      if (section.current) {
        const s = shakeAt(t, CHEST_CINEMA.lid, 420, amp);
        section.current.style.transform = s.x || s.y ? `translate(${s.x}px, ${s.y}px)` : "";
      }
    });
    for (let i = 0; i < gemCount; i++) {
      later(gemArrival(i), () => {
        audio.current?.play("gemDing", { rate: Math.min(1.6, 1 + i * 0.05) });
        setCounted(gemTotal + Math.round((gems * (i + 1)) / gemCount));
        counter.current?.animate?.(
          [{ transform: "scale(1)" }, { transform: "scale(1.25)", offset: 0.25 }, { transform: "scale(1)" }],
          { duration: 280, easing: "ease-out" },
        );
        if (i === gemCount - 1) cinemaHaptic("success");
        else if (i % 3 === 0) cinemaHaptic("light");
      });
    }
    later(chestEnd(gemCount) + 180, showResult);
  };

  // 층이 그려진 뒤 첫 장면을 맞춘다 (한 프레임 동안 보석이 0,0 에 보이지 않게)
  useLayoutEffect(() => {
    if (burst) burstLayer.current?.apply(clock.current?.now() ?? 0);
  }, [burst]);

  const tap = () => {
    if (phase !== "idle") return;
    cinemaHaptic("medium");
    const next = tapCount + 1;
    setTapCount(next);
    if (next < 3) {
      // 덜컹 — 탭할수록 높아진다 (기본 클릭 소리 대신)
      suppressDefaultButtonSound();
      audio.current?.play("rattle", { rate: RATTLE_RATE[next - 1] ?? 1 });
      setShaking(false);
      window.requestAnimationFrame(() => setShaking(true));
      later(430, () => setShaking(false));
      // 틈새 빛 — 번쩍했다가 한 단계 더 밝은 채로 남는다
      const before = seamLevel.current;
      const level = Math.min(1, next * 0.45);
      seamLevel.current = level;
      animateSeam(chest.current, [{ at: 0, v: before }, { at: 80, v: Math.min(1, level + 0.35) }, { at: 400, v: level }], 400);
      return;
    }
    setPhase("opening");
    playSfx(grade === "wood" ? "chest-open" : "chest-open-rare");
    cinemaHaptic("success");
    // 틈새 빛이 가득 찼다가 뚜껑이 날아가면 사라진다
    animateSeam(chest.current, [{ at: 0, v: seamLevel.current }, { at: 120, v: 1 }, { at: 280, v: 1 }, { at: 540, v: 0 }], 540);
    startBurst();
  };

  const instruction = tapCount === 0 ? "Yangilash uchun bosing!" : tapCount === 2 ? "1 imkoniyat qoldi!" : "Bosing!";
  const back = () => {
    // 축하 흐름 중간(연속 보상 상자)이면 원래 가려던 곳으로 이어 간다
    const next = params.get("next");
    if (next) { goNext(router, next, () => router.replace("/home")); return; }
    if (window.history.length > 1) { router.back(); return; }
    if (params.get("from") === "studyPath") { router.replace("/study-path"); return; }
    const category = params.get("category");
    router.replace(category ? `/roadmap?category=${encodeURIComponent(category)}` : "/roadmap");
  };

  return (
    <main className={styles.page} ref={page}>
      {/* 보석 카운터 — 보석이 닿을 때마다 오른다 */}
      <header><span/><span className={styles.counterWrap} ref={counter}><GemCounter target={counted}/></span></header>
      <section className={`${styles.rewardSection} ${phase === "revealed" ? styles.sectionHidden : ""}`} ref={section}>
        <h1>{params.get("kind") === "streak" ? `${Number(params.get("days")) || 3} kun ketma-ket o‘qiganingiz uchun sovg‘a!` : params.get("kind") === "review" ? <span data-i18n="chestReward.reviewTitle">{uzt("chestReward.reviewTitle")}</span> : TITLES[grade]}</h1>
        <button aria-label="Sandiqni ochish" className={styles.chestButton} onClick={tap} type="button"><Sparkles/><Chest grade={grade} opening={phase === "opening"} ready={ready} ref={chest} shaking={shaking}/></button>
        <div className={styles.tapBottom}>
          <div className={styles.tapDots}>{Array.from({ length: 3 },(_,index)=>{
            const used=index<tapCount; const active=index===tapCount;
            return <span className={`${used?styles.dotUsed:""} ${active?styles.dotActive:""}`} key={index}>{used?null:<MobileIcon name="arrow-up" size={18}/>}</span>;
          })}</div>
          <strong>{instruction}</strong>
        </div>
      </section>
      {/* 빛기둥 · 등급 색 번쩍 · 카운터로 날아가는 보석 */}
      {burst ? <ChestBurstLayer gems={flying} grade={grade} ref={burstLayer} {...burst} /> : null}
      {confetti ? <Confetti /> : null}
      {phase === "revealed" ? <section className={`${styles.rewardSection} ${styles.revealedSection}`}>
        <h2>{`Tosh +${gems}`}</h2>
        <div className={styles.pileArea}><Sparkles/><GemsPile/></div>
        <button className={styles.continueButton} onClick={() => { playSfx("click"); back(); }} type="button">Davom etish</button>
      </section> : null}
    </main>
  );
}
