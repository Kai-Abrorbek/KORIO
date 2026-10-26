"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type MutableRefObject } from "react";

import { createCinemaAudio, type CinemaAudioConfig } from "../../../shared/browser/cinema-audio";
import { useCinemaLanguage } from "../../../shared/browser/use-cinema-language";
import { uzt } from "../../../shared/i18n/uz-text";
import { cinemaAt } from "../../../shared/model/cinema";
import { mergeAvatarConfig } from "../../../shared/model/avatar";
import {
  DOOR_BOX,
  DOOR_SHAPES,
  DOORWAY,
  FAR_ROOF_BOX,
  FAR_ROOF_SHAPES,
  GATE_BOTTOM,
  GATE_BOX,
  GATE_SHAPES,
  KEY_BOX,
  KEY_SHAPES,
  KEY_TRAIL,
  KEYHOLE,
  LANTERN_BOX,
  LANTERN_SHAPES,
  LOCK_BODY,
  LOCK_BOX,
  LOCK_SHACKLE,
  MEDAL_BOX,
  MEDAL_SHAPES,
  NIGHT_LANTERNS,
  RAY_SHAPES,
  RAYS_BOX,
  STARS,
  THANKS,
  THANKS_GAINS,
  THANKS_HAPTICS,
  THANKS_SOUND_CUES,
  THANKS_WORD,
  TRACK,
  fireworkSparks,
  keyAt,
  lockSparks,
  perkAt,
  sparkAt,
  type Spark,
  type ThanksSound,
} from "../../../shared/model/thanks-cinematic";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { GeneratedAvatar, WearShapes } from "../../league/ui/generated-avatar";
import { haptic } from "../../retention/model/retention";
import styles from "./super-welcome.module.css";

type Tier = "super" | "max";

/** 등급마다 보여 줄 혜택 넷 (premium.features.* 문구) — 앱 super-welcome 과 같다 */
const PERKS: Record<Tier, { icon: IoniconName; key: string }[]> = {
  max: [
    { icon: "mic", key: "aiTutor" },
    { icon: "chatbubbles", key: "tutorTopics" },
    { icon: "infinite", key: "unlimitedEnergy" },
    { icon: "diamond", key: "monthlyGems" },
  ],
  super: [
    { icon: "infinite", key: "unlimitedEnergy" },
    { icon: "close-circle", key: "noAds" },
    { icon: "refresh", key: "unlimitedReview" },
    { icon: "diamond", key: "monthlyGems" },
  ],
};

const THANKS_AUDIO: CinemaAudioConfig<ThanksSound> = {
  sources: {
    keyFly: "/sounds/thanks/key-fly.mp3",
    unlock: "/sounds/thanks/unlock.mp3",
    gate: "/sounds/thanks/gate.mp3",
    light: "/sounds/thanks/light.mp3",
    fireworks: "/sounds/streak/fireworks.mp3",
    voThanks: "/sounds/thanks/vo-thanks.mp3",
    lantern: "/sounds/thanks/lantern.mp3",
  },
  gains: THANKS_GAINS,
  cues: THANKS_SOUND_CUES,
};
const THANKS_AUDIO_EN: CinemaAudioConfig<ThanksSound> = {
  ...THANKS_AUDIO,
  sources: { ...THANKS_AUDIO.sources, voThanks: "/sounds/thanks/vo-thanks-en.mp3" },
};

const DAY_MS = 86_400_000;

/**
 * 구독 결제 직후 감사 연출 — "한글 열쇠" (앱 app/super-welcome 과 같다).
 * 결제가 한글 열쇠가 되어 궁궐 대문의 자물쇠를 연다 → 빛 속으로 → 새벽 궁궐에서 "감사합니다!"
 * 그림·시간표는 shared/model/thanks-cinematic. requestAnimationFrame 이 부위별 style 을 직접 바꾼다.
 * 연출 중 탭(또는 건너뛰기)은 결과로, 동작 줄이기면 결과만.
 */
export function SuperWelcome({ tier, onDone }: { tier: Tier; onDone: () => void }) {
  const { user } = useTelegramAuth();
  const spoken = useCinemaLanguage();
  const tierName = tier === "max" ? "MAX" : "SUPER";
  const name = user?.nickname?.trim() || "KORIO";
  const days = user?.createdAt
    ? Math.max(1, Math.floor((Date.now() - new Date(user.createdAt).getTime()) / DAY_MS) + 1)
    : Math.max(0, user?.streak ?? 0);
  const letterKey = days > 1 ? "superWelcome.letter" : "superWelcome.letterFirst";
  const avatar = user?.avatar ? mergeAvatarConfig(user.avatar) : null;

  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 390, h: 844 });
  const [revealed, setRevealed] = useState(false);
  const [ctaReady, setCtaReady] = useState(false);
  const skipRef = useRef<(() => void) | null>(null);

  // 부위들 (rAF 가 직접 만진다)
  const world = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const rays = useRef<HTMLDivElement>(null);
  const leftDoor = useRef<HTMLDivElement>(null);
  const rightDoor = useRef<HTMLDivElement>(null);
  const nightGlows = useRef<(HTMLElement | null)[]>([]);
  const key = useRef<HTMLDivElement>(null);
  const keyGlow = useRef<HTMLElement>(null);
  const trail = useRef<(HTMLElement | null)[]>([]);
  const lock = useRef<HTMLDivElement>(null);
  const shackle = useRef<HTMLDivElement>(null);
  const lockBits = useRef<(HTMLDivElement | null)[]>([]);
  const fireBits = useRef<(HTMLDivElement | null)[]>([]);
  const chip = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const dawn = useRef<HTMLDivElement>(null);
  const dawnRays = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const reveals = useRef<(HTMLElement | null)[]>([]);
  const perkTiles = useRef<(HTMLElement | null)[]>([]);
  const perkGlows = useRef<(HTMLElement | null)[]>([]);
  const skipButton = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = stageRef.current;
      if (!el) return;
      setSize({ w: el.clientWidth || 390, h: el.clientHeight || 844 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { w: W, h: H } = size;
  const aspect = H / W;

  // 자리 (px) — 대문은 화면 너비에 맞추고 아래 끝을 GATE_BOTTOM 에
  const gs = W / GATE_BOX.width;
  const gateTop = GATE_BOTTOM * H - GATE_BOX.height * gs;
  const holeX = KEYHOLE.x * gs;
  const holeY = gateTop + KEYHOLE.y * gs;
  const keyU = (0.36 * W) / KEY_BOX.width;
  const lockU = gs * 0.95;
  const sparks = useMemo(() => lockSparks(holeX / W, holeY / H), [holeX, holeY, W, H]);
  const fireworks = useMemo(() => fireworkSparks(), []);

  const finish = useCallback(() => onDone(), [onDone]);

  // 그리기 전에 첫 장면을 맞춘다
  useLayoutEffect(() => {
    const audio = createCinemaAudio(spoken === "en" ? THANKS_AUDIO_EN : THANKS_AUDIO);
    audio.preload();
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let start = performance.now() - (reduce ? THANKS.end : 0);
    let frame = 0;
    let shownReveal = false;
    let shownCta = false;
    let buzz: number[] = [];

    const vibrateFrom = (from: number) => {
      buzz.forEach((id) => window.clearTimeout(id));
      buzz = THANKS_HAPTICS.filter((h) => h.t >= from).map((h) =>
        window.setTimeout(() => {
          if (h.kind === "medium") window.Telegram?.WebApp.HapticFeedback?.impactOccurred("medium");
          else haptic(h.kind === "success" ? "success" : "light");
        }, h.t - from),
      );
    };

    const placeSpark = (el: HTMLDivElement | null | undefined, spark: Spark, t: number) => {
      if (!el) return;
      const p = sparkAt(spark, t, aspect);
      el.style.opacity = String(p.opacity);
      el.style.transform = `translate(${p.x * W}px, ${p.y * H}px) translate(-50%, -50%) rotate(${p.rotate}deg) scale(${p.scale})`;
    };

    const apply = (t: number) => {
      const d = cinemaAt(TRACK.dive, t);
      if (world.current) {
        world.current.style.opacity = t < THANKS.reveal + 40 ? "1" : "0";
        world.current.style.transformOrigin = `${holeX}px ${holeY}px`;
        world.current.style.transform = `scale(${d})`;
      }
      const lit = cinemaAt(TRACK.light, t);
      if (light.current) light.current.style.opacity = String(lit);
      if (rays.current) {
        rays.current.style.opacity = String(lit * 0.9);
        rays.current.style.transform = `rotate(${cinemaAt(TRACK.rays, t)}deg)`;
      }
      const door = cinemaAt(TRACK.door, t);
      if (leftDoor.current) leftDoor.current.style.transform = `perspective(900px) rotateY(${-door}deg)`;
      if (rightDoor.current) rightDoor.current.style.transform = `perspective(900px) rotateY(${door}deg)`;
      const night = cinemaAt(TRACK.nightLanterns, t);
      nightGlows.current.forEach((el) => {
        if (el) el.style.opacity = String(night);
      });

      const k = keyAt(t);
      const alpha = cinemaAt(TRACK.lockAlpha, t);
      if (key.current) {
        key.current.style.opacity = String(alpha);
        key.current.style.transform = `translate(${holeX + k.dx * W - KEY_BOX.pivotX * keyU}px, ${holeY + k.dy * W - KEY_BOX.pivotY * keyU}px) rotate(${k.rot}deg) scale(${k.scale})`;
      }
      if (keyGlow.current) keyGlow.current.style.opacity = String(cinemaAt(TRACK.keyGlow, t));
      KEY_TRAIL.forEach((ago, i) => {
        const el = trail.current[i];
        if (!el) return;
        const flying = t > 480 && t < 1500;
        const past = keyAt(t - ago);
        el.style.opacity = String(flying ? 0.85 - i * 0.12 : 0);
        el.style.transform = `translate(${holeX + past.dx * W}px, ${holeY + past.dy * W}px) translate(-50%, -50%)`;
      });
      if (lock.current) {
        lock.current.style.opacity = String(alpha);
        lock.current.style.transform = `translateY(${cinemaAt(TRACK.lockFall, t) * gs}px) rotate(${cinemaAt(TRACK.lockTilt, t)}deg)`;
      }
      if (shackle.current) shackle.current.style.transform = `translateY(${cinemaAt(TRACK.shackle, t) * lockU}px)`;
      sparks.forEach((spark, i) => placeSpark(lockBits.current[i], spark, t));

      if (chip.current) {
        const c = cinemaAt(TRACK.chip, t);
        chip.current.style.opacity = String(c);
        chip.current.style.transform = `translateY(${(1 - c) * -16}px)`;
      }
      if (flash.current) flash.current.style.opacity = String(cinemaAt(TRACK.flash, t));
      if (dawn.current) {
        dawn.current.style.opacity = String(cinemaAt(TRACK.dawn, t));
        dawn.current.style.transform = `scale(${cinemaAt(TRACK.settle, t)})`;
      }
      if (dawnRays.current) dawnRays.current.style.transform = `rotate(${cinemaAt(TRACK.rays, t) * 1.6}deg)`;
      fireworks.forEach((spark, i) => placeSpark(fireBits.current[i], spark, t));
      if (hero.current) {
        const p = cinemaAt(TRACK.hero, t);
        hero.current.style.opacity = String(Math.min(1, p * 1.4));
        hero.current.style.transform = `translateY(${(1 - p) * 40}px) scale(${0.85 + 0.15 * p})`;
      }
      [TRACK.words, TRACK.letter, TRACK.title, TRACK.cta].forEach((track, i) => {
        const el = reveals.current[i];
        if (!el) return;
        const p = cinemaAt(track, t);
        el.style.opacity = String(Math.min(1, Math.max(0, p)));
        el.style.transform = `translateY(${(1 - p) * 18}px)`;
      });
      THANKS.perks.forEach((_, i) => {
        const p = perkAt(i, t);
        const tile = perkTiles.current[i];
        if (tile) {
          tile.style.opacity = String(0.25 + 0.75 * Math.min(1, p));
          tile.style.transform = `scale(${0.94 + 0.06 * p})`;
          tile.style.borderColor = p > 0.5 ? "rgba(255,212,92,0.55)" : "rgba(255,255,255,0.14)";
        }
        const glow = perkGlows.current[i];
        if (glow) {
          glow.style.opacity = String(Math.min(1, p));
          glow.style.transform = `translate(-50%, -50%) scale(${0.6 + 0.4 * p})`;
        }
      });
      if (skipButton.current) skipButton.current.style.opacity = t < THANKS.reveal ? "1" : "0";
    };

    const tick = (now: number) => {
      const t = Math.min(THANKS.end, Math.max(0, now - start));
      apply(t);
      if (t >= THANKS.reveal && !shownReveal) {
        shownReveal = true;
        setRevealed(true);
      }
      if (t >= THANKS.cta && !shownCta) {
        shownCta = true;
        setCtaReady(true);
      }
      if (t < THANKS.end) frame = requestAnimationFrame(tick);
    };

    skipRef.current = () => {
      const now = performance.now();
      if (now - start >= THANKS.reveal) return;
      start = now - THANKS.reveal;
      void audio.playFrom(THANKS.reveal);
      vibrateFrom(THANKS.reveal);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };

    if (reduce) {
      apply(THANKS.end);
      setRevealed(true);
      setCtaReady(true);
      audio.play("voThanks");
      haptic("success");
    } else {
      apply(0);
      void audio.playFrom(0);
      vibrateFrom(0);
      frame = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(frame);
      buzz.forEach((id) => window.clearTimeout(id));
      skipRef.current = null;
      audio.dispose();
    };
  }, [H, W, aspect, holeX, holeY, gs, keyU, lockU, sparks, fireworks, spoken]);

  const raysPx = 2.6 * W;
  const doorW = DOOR_BOX.width * gs;
  const doorH = DOOR_BOX.height * gs;
  const lanternW = LANTERN_BOX.width * gs * 0.9;
  const lanternH = LANTERN_BOX.height * gs * 0.9;

  const sparkNode = (spark: Spark, i: number, list: MutableRefObject<(HTMLDivElement | null)[]>) => {
    const px = spark.size * W;
    return (
      <div
        aria-hidden
        className={spark.glyph ? styles.sparkGlyph : styles.sparkDot}
        key={i}
        ref={(el) => {
          list.current[i] = el;
        }}
        style={{ width: px, height: px, fontSize: px * 0.9, color: spark.color, background: spark.glyph ? undefined : spark.color, opacity: 0 } as CSSProperties}
      >
        {spark.glyph}
      </div>
    );
  };

  return (
    <div aria-modal="true" className={styles.root} onClick={() => skipRef.current?.()} ref={stageRef} role="dialog">
      {/* ───── 밤 · 대문 (카메라가 밀고 들어간다) ───── */}
      <div aria-hidden className={styles.world} ref={world}>
        <div className={styles.night} />
        <svg className={styles.fill} height={H} viewBox={`0 0 ${W} ${H}`} width={W}>
          <defs>
            <radialGradient id="sw-moon">
              <stop offset="0" stopColor="#FFF4D6" stopOpacity="0.45" />
              <stop offset="1" stopColor="#FFF4D6" stopOpacity="0" />
            </radialGradient>
          </defs>
          {STARS.map((star, i) => (
            <circle cx={star.x * W} cy={star.y * H} fill="#FFFFFF" key={i} opacity={star.o} r={star.r} />
          ))}
          <circle cx={W * 0.8} cy={H * 0.11} fill="url(#sw-moon)" r={W * 0.2} />
          <circle cx={W * 0.8} cy={H * 0.11} fill="#FFF4D6" r={W * 0.075} />
          <circle cx={W * 0.78} cy={H * 0.105} fill="#EDE0B8" r={W * 0.014} />
        </svg>
        <div className={styles.yard} style={{ top: GATE_BOTTOM * H - 2 }} />

        <div className={styles.doorLight} ref={light} style={{ left: DOORWAY.x * gs, top: gateTop + DOORWAY.y * gs, width: DOORWAY.width * gs, height: DOORWAY.height * gs }} />

        <svg className={styles.abs} height={GATE_BOX.height * gs} style={{ left: 0, top: gateTop }} viewBox={`0 0 ${GATE_BOX.width} ${GATE_BOX.height}`} width={W}>
          <WearShapes shapes={GATE_SHAPES} />
        </svg>

        {/* 문 두 짝 — 경첩을 축으로 열린다 */}
        <div className={styles.abs} ref={leftDoor} style={{ left: DOORWAY.x * gs, top: gateTop + DOORWAY.y * gs, width: doorW, height: doorH, transformOrigin: "left center" }}>
          <svg className={styles.fill} viewBox={`0 0 ${DOOR_BOX.width} ${DOOR_BOX.height}`}>
            <WearShapes shapes={DOOR_SHAPES} />
          </svg>
        </div>
        <div className={styles.abs} ref={rightDoor} style={{ left: DOORWAY.x * gs + doorW, top: gateTop + DOORWAY.y * gs, width: doorW, height: doorH, transformOrigin: "right center" }}>
          <svg className={styles.fill} style={{ transform: "scaleX(-1)" }} viewBox={`0 0 ${DOOR_BOX.width} ${DOOR_BOX.height}`}>
            <WearShapes shapes={DOOR_SHAPES} />
          </svg>
        </div>

        <div className={styles.abs} ref={rays} style={{ left: holeX - raysPx / 2, top: holeY - raysPx / 2, width: raysPx, height: raysPx, opacity: 0 }}>
          <svg className={styles.fill} viewBox={`0 0 ${RAYS_BOX.size} ${RAYS_BOX.size}`}>
            <WearShapes shapes={RAY_SHAPES} />
          </svg>
        </div>

        {NIGHT_LANTERNS.map((spot, i) => (
          <div className={styles.abs} key={i} style={{ left: spot.x * gs - lanternW / 2, top: gateTop + spot.y * gs, width: lanternW, height: lanternH }}>
            <i
              className={styles.lanternGlow}
              ref={(el) => {
                nightGlows.current[i] = el;
              }}
              style={{ width: lanternW * 2.2, height: lanternW * 2.2, left: -lanternW * 0.6, top: lanternH * 0.05, opacity: 0 }}
            />
            <svg className={styles.fill} viewBox={`0 0 ${LANTERN_BOX.width} ${LANTERN_BOX.height}`}>
              <WearShapes shapes={LANTERN_SHAPES} />
            </svg>
          </div>
        ))}

        {/* 한글 열쇠 (자물쇠 밑 — 그래야 구멍으로 들어가 보인다) */}
        {KEY_TRAIL.map((ago, i) => (
          <i
            className={styles.trail}
            key={ago}
            ref={(el) => {
              trail.current[i] = el;
            }}
            style={{ width: 10 - i, height: 10 - i, opacity: 0 }}
          />
        ))}
        <div
          className={styles.key}
          ref={key}
          style={{ width: KEY_BOX.width * keyU, height: KEY_BOX.height * keyU, transformOrigin: `${KEY_BOX.pivotX * keyU}px ${KEY_BOX.pivotY * keyU}px`, opacity: 0 }}
        >
          <i className={styles.keyGlow} ref={keyGlow} />
          <svg className={styles.fill} viewBox={`0 0 ${KEY_BOX.width} ${KEY_BOX.height}`}>
            <WearShapes shapes={KEY_SHAPES} />
          </svg>
        </div>

        {/* 자물쇠 — 고리 + ㅁ 몸통 */}
        <div
          className={styles.abs}
          ref={lock}
          style={{ left: holeX - LOCK_BOX.holeX * lockU, top: holeY - LOCK_BOX.holeY * lockU, width: LOCK_BOX.width * lockU, height: LOCK_BOX.height * lockU }}
        >
          <div className={styles.fill} ref={shackle}>
            <svg className={styles.fill} viewBox={`0 0 ${LOCK_BOX.width} ${LOCK_BOX.height}`}>
              <WearShapes shapes={LOCK_SHACKLE} />
            </svg>
          </div>
          <svg className={styles.fill} viewBox={`0 0 ${LOCK_BOX.width} ${LOCK_BOX.height}`}>
            <WearShapes shapes={LOCK_BODY} />
          </svg>
        </div>
        {sparks.map((spark, i) => sparkNode(spark, i, lockBits))}
      </div>

      {/* ───── 새벽 궁궐 (결과) ───── */}
      <div aria-hidden className={styles.dawn} ref={dawn} style={{ opacity: 0 }}>
        <div className={styles.halo} style={{ left: W / 2 - W * 0.62, top: H * 0.27 - W * 0.62, width: W * 1.24, height: W * 1.24 }} />
        <div className={styles.abs} ref={dawnRays} style={{ left: W / 2 - raysPx / 2, top: H * 0.27 - raysPx / 2, width: raysPx, height: raysPx, opacity: 0.28 }}>
          <svg className={styles.fill} viewBox={`0 0 ${RAYS_BOX.size} ${RAYS_BOX.size}`}>
            <WearShapes shapes={RAY_SHAPES} />
          </svg>
        </div>
        {fireworks.map((spark, i) => sparkNode(spark, i, fireBits))}
      </div>

      {/* ───── 결과 글 · 혜택 · 버튼 ───── */}
      <div className={styles.reveal} style={{ pointerEvents: revealed ? "auto" : "none" }}>
        <div className={styles.hero}>
          <svg className={styles.farRoof} viewBox={`0 0 ${FAR_ROOF_BOX.width} ${FAR_ROOF_BOX.height}`}>
            <WearShapes shapes={FAR_ROOF_SHAPES} />
          </svg>
          <div className={styles.heroFigure} ref={hero} style={{ opacity: 0 }}>
            <i className={styles.plinth} />
            {avatar ? (
              <div className={styles.avatar}>
                <GeneratedAvatar alive avatar={avatar} greet variant="full" />
              </div>
            ) : (
              <div className={styles.medal}>
                <svg className={styles.fill} viewBox={`0 0 ${MEDAL_BOX.width} ${MEDAL_BOX.height}`}>
                  <WearShapes shapes={MEDAL_SHAPES} />
                </svg>
                <b data-no-translate>{tierName}</b>
              </div>
            )}
          </div>
        </div>

        <strong
          className={styles.thanks}
          lang={spoken}
          ref={(el) => {
            reveals.current[0] = el;
          }}
          style={{ opacity: 0 }}
          data-no-translate
        >
          {THANKS_WORD[spoken]}
        </strong>
        <p
          className={styles.letter}
          data-i18n={letterKey}
          ref={(el) => {
            reveals.current[1] = el;
          }}
          style={{ opacity: 0 }}
        >
          {uzt(letterKey, { days, name })}
        </p>
        <div
          className={styles.titleRow}
          ref={(el) => {
            reveals.current[2] = el;
          }}
          style={{ opacity: 0 }}
        >
          <span className={`${styles.tag} ${tier === "max" ? styles.tagMax : ""}`} data-no-translate>
            <MobileIcon name="key" size={12} />
            {tierName}
          </span>
          <h2 data-i18n="superWelcome.title">{uzt("superWelcome.title", { tier: tierName })}</h2>
        </div>

        <ul className={styles.perks}>
          {PERKS[tier].map((perk, index) => (
            <li
              key={perk.key}
              ref={(el) => {
                perkTiles.current[index] = el;
              }}
              style={{ opacity: 0.25 }}
            >
              <span className={styles.lamp}>
                <i
                  ref={(el) => {
                    perkGlows.current[index] = el;
                  }}
                  style={{ opacity: 0 }}
                />
                <svg viewBox={`0 0 ${LANTERN_BOX.width} ${LANTERN_BOX.height}`}>
                  <WearShapes shapes={LANTERN_SHAPES} />
                </svg>
              </span>
              <span className={styles.perkText}>
                <MobileIcon name={perk.icon} size={14} />
                <span data-i18n={`premium.features.${perk.key}`}>{uzt(`premium.features.${perk.key}`)}</span>
              </span>
            </li>
          ))}
        </ul>

        <div
          className={styles.footer}
          onClick={(event) => event.stopPropagation()}
          ref={(el) => {
            reveals.current[3] = el;
          }}
          style={{ opacity: 0 }}
        >
          <button className={styles.cta} disabled={!ctaReady} onClick={finish} type="button">
            <span className={styles.ctaFace}>
              <i aria-hidden className={styles.ctaShine} />
              <span data-i18n="superWelcome.cta">{uzt("superWelcome.cta", { tier: tierName })}</span>
              <MobileIcon name="arrow-forward" size={20} />
            </span>
          </button>
        </div>
      </div>

      {/* 안내 칩 — 결제가 됐다 */}
      <div className={styles.chipWrap} ref={chip} style={{ opacity: 0 }}>
        <span className={styles.chip}>
          <MobileIcon name="checkmark-circle" size={16} />
          <span data-i18n="superWelcome.chip">{uzt("superWelcome.chip")}</span>
        </span>
      </div>

      <div aria-hidden className={styles.flash} ref={flash} style={{ opacity: 0 }} />

      <button
        className={styles.skip}
        onClick={(event) => {
          event.stopPropagation();
          skipRef.current?.();
        }}
        ref={skipButton}
        style={{ pointerEvents: revealed ? "none" : "auto" }}
        type="button"
      >
        <span data-i18n="levelUp.skip">{uzt("levelUp.skip")}</span>
        <MobileIcon name="play-forward" size={13} />
      </button>
    </div>
  );
}
