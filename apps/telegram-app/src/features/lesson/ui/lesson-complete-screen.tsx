"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { backToLearning } from "../model/lesson";
import { viaStreakChest } from "../../misc/model/streak-chest-route";
import styles from "./lesson.module.css";
import { StampCinema, type StampCinemaHandle } from "./stamp-cinema";
import { playSfx, preloadSfx } from "../../../shared/browser/sfx";
import { createCinemaAudio, type CinemaAudio } from "../../../shared/browser/cinema-audio";
import { cinemaHaptic, prefersReducedMotion, runCinemaClock, type CinemaClock } from "../../../shared/browser/cinema-clock";
import { cinemaAt, shakeAt } from "../../../shared/model/cinema";
import {
  STAMP_CINEMA,
  STAMP_SHAKE,
  STAMP_TRACK,
  stampSoundCues,
  stampTier,
  type StampSound,
  type StampTier,
} from "../../../shared/model/lesson-stamp-cinematic";
import { uzt } from "../../../shared/i18n/uz-text";
import { useAppTheme } from "../../../shared/theme/theme-context";
import { shareMessage } from "../../../shared/telegram/share";
import { reportQuestEvent } from "../../retention/api/retention";

/** "참 잘했어요 도장" 소리 — 앱 lesson-complete 와 같은 파일·크기 */
const STAMP_SOURCES: Record<StampSound, string> = {
  whoosh: "/sounds/lesson/stamp-whoosh.mp3",
  thump: "/sounds/lesson/stamp-thump.mp3",
  fanfare: "/sounds/lesson-complete.wav",
  sparkle: "/sounds/lesson/sparkle.mp3",
  statPop: "/sounds/lesson/stat-pop.mp3",
  voPerfect: "/sounds/lesson/vo-perfect.mp3",
  voGreat: "/sounds/lesson/vo-great.mp3",
  voGood: "/sounds/lesson/vo-good.mp3",
};

/** 목소리가 효과음에 묻히지 않게 */
const STAMP_GAIN: Partial<Record<StampSound, number>> = {
  whoosh: 0.6,
  thump: 1,
  fanfare: 0.55,
  sparkle: 0.7,
  statPop: 0.6,
};

function displayTime(raw: string | null): string {
  if (raw?.includes(":")) return raw;
  const seconds = Math.max(0, Number(raw) || 0);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function Confetti() {
  return (
    <div className={styles.confetti} aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <i key={index} style={{ "--confetti-index": index } as CSSProperties} />
      ))}
    </div>
  );
}

function Celebration() {
  return (
    <>
      <Confetti />
      <Image
        alt="KORIO"
        className={styles.celebrationMascot}
        height={200}
        src="/characters/hangulmon_celebrating.png"
        unoptimized
        width={200}
      />
    </>
  );
}

/**
 * 기록 카드 하나 — 차례가 오면 도장 찍듯 크게 왔다가 탁 박히고, 숫자는 0 부터 오른다
 * (앱 lesson-complete/StatCard). 다 오르면 onDone 으로 다음 카드에 넘긴다.
 */
function StampStat({
  active,
  icon,
  label,
  onDone,
  value,
}: {
  active: boolean;
  icon: "flash" | "locate" | "timer";
  label: string;
  onDone: () => void;
  value: string;
}) {
  const [display, setDisplay] = useState("0");
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!active) return;
    const haptic = window.setTimeout(() => cinemaHaptic("light"), 130);
    // 시간은 바로 보여 주고 끝
    if (value.includes(":")) {
      setDisplay(value);
      const timer = window.setTimeout(() => doneRef.current(), 350);
      return () => {
        window.clearTimeout(haptic);
        window.clearTimeout(timer);
      };
    }
    const target = Number.parseInt(value, 10) || 0;
    const suffix = value.replace(/^\d+/, "");
    const start = performance.now();
    const counter = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / 600);
      setDisplay(`${Math.round(target * p)}${suffix}`);
      if (p >= 1) {
        window.clearInterval(counter);
        doneRef.current();
      }
    }, 30);
    return () => {
      window.clearTimeout(haptic);
      window.clearInterval(counter);
    };
  }, [active, value]);

  return (
    <article className={active ? styles.statStamped : styles.statWaiting}>
      <strong>{label}</strong>
      <div><MobileIcon name={icon} size={22} /><b data-no-translate>{display}</b></div>
    </article>
  );
}

/** 무대 크기 — 작은 화면(360×640)에서도 기록 카드·버튼까지 한 화면에 (앱과 같은 비율) */
function stampStageSize() {
  if (typeof window === "undefined") return 240;
  const width = Math.min(window.innerWidth, 560);
  return Math.round(Math.min(width * 0.66, window.innerHeight * 0.36, 270));
}

/**
 * 레슨 결과 — "참 잘했어요 도장" (앱 app/lesson-complete 와 같은 시간표).
 * 그림·시간표는 shared/model/lesson-stamp-cinematic, 시계는 requestAnimationFrame.
 * 도장을 누르면 끝 장면으로 건너뛴다. 동작 줄이기면 도장이 찍힌 뒤부터.
 */
function StampContent({ accuracy, time, xp }: { accuracy: number; time: string; xp: number }) {
  const tier: StampTier = stampTier(accuracy);
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === "dark";
  const [stageSize, setStageSize] = useState(240);
  // 순차 애니: 지금 몇 번째 카드까지 (-1 = 도장이 아직 안 끝남)
  const [activeIdx, setActiveIdx] = useState(-1);
  const [burst, setBurst] = useState(false);

  const content = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const stamp = useRef<StampCinemaHandle>(null);
  const clock = useRef<CinemaClock | null>(null);
  const audio = useRef<CinemaAudio<StampSound> | null>(null);
  const haptics = useRef<number[]>([]);

  useLayoutEffect(() => {
    const measure = () => setStageSize(stampStageSize());
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 한 번만 — 들어온 순간의 결과로 돈다 (그리기 전에 첫 장면을 맞춘다)
  useLayoutEffect(() => {
    const sound = createCinemaAudio({ sources: STAMP_SOURCES, gains: STAMP_GAIN, cues: stampSoundCues(tier) });
    sound.preload();
    audio.current = sound;
    const reduce = prefersReducedMotion();
    let burstShown = false;
    let statsShown = false;

    const apply = (t: number) => {
      stamp.current?.apply(t);
      if (title.current) {
        title.current.style.opacity = String(cinemaAt(STAMP_TRACK.titleOpacity, t));
        title.current.style.transform = `scale(${cinemaAt(STAMP_TRACK.titleScale, t)})`;
      }
      if (caption.current) {
        const c = cinemaAt(STAMP_TRACK.caption, t);
        caption.current.style.opacity = String(c);
        caption.current.style.transform = `translateY(${(1 - c) * 10}px)`;
      }
      if (content.current) {
        const s = shakeAt(t, STAMP_CINEMA.impact, 380, STAMP_SHAKE[tier]);
        content.current.style.transform = s.x || s.y ? `translate(${s.x}px, ${s.y}px)` : "";
      }
      // 쾅 다음에 꽃가루 (80% 이상), 기록 카드는 도장이 날아간 뒤부터
      if (!burstShown && t >= STAMP_CINEMA.impact + 120) {
        burstShown = true;
        if (tier !== "good") setBurst(true);
      }
      if (!statsShown && t >= STAMP_CINEMA.stats) {
        statsShown = true;
        setActiveIdx(0);
      }
    };

    // 동작 줄이기면 도장이 찍힌 뒤부터 (소리는 쾅부터)
    clock.current = runCinemaClock(STAMP_CINEMA.end, apply, reduce ? STAMP_CINEMA.end : 0);
    void sound.playFrom(reduce ? STAMP_CINEMA.impact : 0);
    if (!reduce) {
      haptics.current = [
        window.setTimeout(() => cinemaHaptic("heavy"), STAMP_CINEMA.impact),
        window.setTimeout(() => cinemaHaptic("success"), 1450),
      ];
    }
    return () => {
      clock.current?.stop();
      clock.current = null;
      haptics.current.forEach((timer) => window.clearTimeout(timer));
      sound.dispose();
      audio.current = null;
    };
  }, [tier]);

  // 기록 카드가 하나 찍힐 때마다 톡
  useEffect(() => {
    if (activeIdx >= 0 && activeIdx <= 2) audio.current?.play("statPop", { rate: 1 + activeIdx * 0.08 });
  }, [activeIdx]);

  /** 도장을 누르면 끝 장면으로 (남은 효과음은 끊는다) */
  const skip = () => {
    const current = clock.current;
    if (!current || current.now() >= STAMP_CINEMA.stats) return;
    haptics.current.forEach((timer) => window.clearTimeout(timer));
    audio.current?.stop();
    current.seek(STAMP_CINEMA.end);
  };

  const captionKey = `lessonComplete.stamp.${tier}`;

  return (
    <section className={`${styles.completeContent} ${styles.stampContent}`} ref={content}>
      {burst ? <Confetti /> : null}
      <h1 ref={title} style={{ opacity: 0 }}>Dars yakunlandi!</h1>
      {/* 도장 무대 — 누르면 건너뛴다 */}
      <div className={styles.stampStage} onClick={skip}>
        <StampCinema
          grid={isDark ? "#33333D" : "#F0EEFA"}
          ink={isDark ? "#9D8DFF" : "#5B4DD4"}
          ref={stamp}
          size={stageSize}
          tier={tier}
        />
      </div>
      <p className={styles.stampCaption} data-i18n={captionKey} ref={caption} style={{ opacity: 0 }}>
        {uzt(captionKey)}
      </p>
      <div className={styles.completeStats}>
        <StampStat active={activeIdx >= 0} icon="flash" label="Jami XP" onDone={() => setActiveIdx((i) => Math.max(i, 1))} value={String(xp)} />
        <StampStat active={activeIdx >= 1} icon="locate" label="Aniqlik" onDone={() => setActiveIdx((i) => Math.max(i, 2))} value={`${accuracy}%`} />
        <StampStat active={activeIdx >= 2} icon="timer" label="Tezlik" onDone={() => undefined} value={time} />
      </div>
    </section>
  );
}

export function LessonCompleteScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request } = useTelegramAuth();
  const sharing = useRef(false);
  // 레슨 결과는 도장 연출이 소리를 낸다 — 여기선 시험 합격만
  const celebrate = params.get("exam") === "1" && params.get("passed") !== "0";
  useEffect(() => {
    preloadSfx("click", "lesson-complete");
    if (!celebrate) return;
    const timer = window.setTimeout(() => playSfx("lesson-complete"), 0);
    return () => window.clearTimeout(timer);
  }, [celebrate]);
  const xp = Math.max(0, Number(params.get("xp")) || 0);
  const accuracy = Math.max(0, Number(params.get("accuracy")) || 0);
  const category = params.get("category");
  const from = params.get("from");

  if (params.get("exam") === "1") {
    const passed = params.get("passed") !== "0";
    const level = Math.max(1, Number(params.get("level")) || 1);
    const nextLevel = Number(params.get("nextLevel")) || null;
    const correct = Math.max(0, Number(params.get("correct")) || 0);
    const total = Math.max(0, Number(params.get("total")) || 0);
    const weak = (params.get("weak") ?? "").split(",").filter(Boolean);
    return (
      <main className={`${styles.completePage} ${styles.examPage}`}>
        {passed ? <Celebration /> : (
          <Image
            alt="KORIO"
            className={styles.examMascot}
            height={150}
            src="/characters/hangulmon_default.png"
            unoptimized
            width={150}
          />
        )}
        <section className={styles.examContent}>
          <h1 className={passed ? styles.examPassed : styles.examMissed}>
            {passed ? `${level}-daraja o'tildi!` : `${level}-daraja, ozgina qoldi`}
          </h1>
          <p>
            {passed
              ? "Bu yergacha kelganingiz zo'r. Keyingi darajaga o'tamiz."
              : "Keyingi daraja ochiq. Quyidagilarni yana bir ko'rsangiz ancha oson bo'ladi."}
          </p>
          <div className={styles.examScore}>
            <b className={passed ? styles.examPassed : styles.examMissed}>{accuracy}%</b>
            {total > 0 ? <span>{`${total} savoldan ${correct} tasi to'g'ri`}</span> : null}
          </div>
          {xp > 0 || Number(params.get("gems")) > 0 ? (
            <div className={styles.examRewards}>
              {Number(params.get("gems")) > 0 ? <span><MobileIcon name="diamond" size={19} />+{params.get("gems")}</span> : null}
              {xp > 0 ? <span><MobileIcon name="flash" size={19} />{`+${xp} XP`}</span> : null}
            </div>
          ) : null}
          {weak.length > 0 ? (
            <div className={styles.examWeak}>
              <strong>Shu qismlar qiyin bo&apos;ldi</strong>
              <div>{weak.map((area) => <span key={area}>{area}</span>)}</div>
            </div>
          ) : null}
          {nextLevel ? <small>{`${nextLevel}-daraja ochildi`}</small> : null}
        </section>
        <footer className={styles.examActions}>
          <button
            className={passed ? styles.examPassAction : styles.primaryAction}
            onClick={() => router.replace("/study-path")}
            type="button"
          >
            Davom etish
          </button>
          {!passed ? (
            <button
              className={styles.blueTextAction}
              onClick={() => router.replace("/lesson?mode=levelExam&from=studyPath")}
              type="button"
            >
              Qayta urinish
            </button>
          ) : null}
        </footer>
      </main>
    );
  }

  /**
   * 결과 공유 — 앱처럼 초대 코드를 같이 실어 보낸다 (자랑만 남기면 본 사람이 갈 곳이 없다).
   * 코드를 못 받아와도 공유는 그대로 한다.
   */
  const share = async () => {
    if (sharing.current) return;
    sharing.current = true;
    let code = "";
    let link = "";
    try {
      const invite = await request<{ code?: string; link?: string }>("/referrals/me");
      code = invite.code ?? "";
      link = invite.link ?? "";
    } catch {
      // 초대 코드는 있으면 좋은 것이지 없으면 안 되는 것이 아니다
    }
    const lines = [
      "Hozirgina koreys tili darsini tugatdim! 🔥",
      `⚡ ${xp} XP · 🎯 Aniqlik ${accuracy}% · ⏱ ${displayTime(params.get("time"))}`,
    ];
    const dailyStreak = params.get("dailyStreak");
    if (dailyStreak) lines.push(`🗓 ${dailyStreak} kun ketma-ket shug'ullanyapman!`);
    lines.push("");
    lines.push(
      code
        ? `Sen ham KORIO'ga qo'shil — taklif kodim ${code}, kiritsang gem olasan.\n${link}`
        : "KORIO'da koreys tilini o'rganyapman 🇰🇷",
    );
    const text = lines.join("\n");
    try {
      await shareMessage(text, "Dars tugadi!");
      // 일일 퀘스트 "내 공부 기록 공유하기"
      void reportQuestEvent(request, "shareProgress");
    } finally {
      sharing.current = false;
    }
  };

  /**
   * "XP olish" — 앱 lesson-complete 의 onContinue 와 같은 순서:
   *   연속 학습(하루 한 번) → 스코어 상승(유닛 완료) → 상자 → 원래 가던 곳
   */
  const onContinue = () => {
    const dailyStreak = params.get("dailyStreak");
    const scoreUp = params.get("scoreUp");
    const chestGrade = params.get("chestGrade");
    // 노드를 끝내서 받은 상자 — 앞의 축하들이 순서대로 넘겨받는다.
    // 예전엔 연속 학습·스코어 화면으로 가면 이 값이 빠져서, 오늘 첫 레슨으로
    // 노드를 끝내면 보석은 들어갔는데 상자 화면은 영영 안 떴다.
    const chest = {
      chestGems: params.get("chestGems") ?? "",
      chestGrade: chestGrade ?? "",
      gemTotal: params.get("gemTotal") ?? "",
    };
    if (dailyStreak) {
      const query = new URLSearchParams({
        ...chest,
        category: category ?? "",
        from: from ?? "",
        scoreUp: scoreUp ?? "",
        scoreUpUnit: params.get("scoreUpUnit") ?? "",
        streak: dailyStreak,
        // 도장 찍고 바로 연속 보상 상자 — streak-day 가 끼운다
        streakChestDays: params.get("streakChestDays") ?? "",
        streakChestGems: params.get("streakChestGems") ?? "",
        week: params.get("streakWeek") ?? "",
      });
      router.replace(`/streak-day?${query.toString()}`);
      return;
    }
    // 도장 화면이 안 뜨는 날(오늘 첫 학습이 표현 등)에도 연속 보상 상자는 끼운다
    const go = (next: string) => router.replace(viaStreakChest(next, params));
    if (scoreUp) {
      const query = new URLSearchParams({
        ...chest,
        category: category ?? "",
        from: from ?? "",
        score: scoreUp,
        unit: params.get("scoreUpUnit") ?? "",
      });
      go(`/score-up?${query.toString()}`);
      return;
    }
    if (chestGrade) {
      const query = new URLSearchParams({
        category: category ?? "",
        from: from ?? "",
        gemTotal: params.get("gemTotal") ?? "0",
        gems: params.get("chestGems") ?? "0",
        grade: chestGrade,
      });
      go(`/chest-reward?${query.toString()}`);
      return;
    }
    go(backToLearning(category, from));
  };

  return (
    <main className={styles.completePage}>
      <StampContent accuracy={accuracy} time={displayTime(params.get("time"))} xp={xp} />
      <footer className={styles.completeActions}>
        <button aria-label="Ulashish" className={styles.shareAction} onClick={() => void share()} type="button">
          <MobileIcon name="share-outline" size={26} />
        </button>
        <button
          className={styles.completeClaim}
          onClick={() => {
            playSfx("click");
            onContinue();
          }}
          type="button"
        >
          XP olish
        </button>
      </footer>
    </main>
  );
}
