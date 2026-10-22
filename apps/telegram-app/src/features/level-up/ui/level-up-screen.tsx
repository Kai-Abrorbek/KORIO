"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { courseCopyKey } from "../../learning/model/course-copy";
import { learnCourseOf } from "../../learning/model/learning-options";
import { GeneratedAvatar, WearShapes } from "../../league/ui/generated-avatar";
import { mergeAvatarConfig } from "../../../shared/model/avatar";
import {
  CINEMA,
  CLOUD_BOX,
  CLOUD_SHAPES,
  CLOUDS,
  COUNT_WORDS,
  GO_TEXT,
  FLAG_BOX,
  FLAG_SHAPES,
  FLAME_BOX,
  FLAME_SHAPES,
  GO_WORD,
  GROUND_BOX,
  GROUND_SHAPES,
  PAD_PUFFS,
  PAD_TOP_Y,
  PLANET_BACK,
  PLANET_BOX,
  PLANET_FRONT,
  PLANET_SHAPES,
  ROCKET_BOX,
  ROCKET_GLASS,
  ROCKET_SHAPES,
  ROCKET_WIDTH,
  ROCKET_WINDOW,
  STARS,
  TRACK,
  WARP_LINES,
  cinemaAt,
  cloudY,
  exhaustParticles,
  particleAt,
  puffAt,
  warpY,
} from "../../../shared/model/level-up-cinematic";
import { LEVEL_UP_AUDIO, LEVEL_UP_AUDIO_EN, createCinemaAudio } from "../../../shared/browser/cinema-audio";
import { useCinemaLanguage } from "../../../shared/browser/use-cinema-language";
import { useAppLanguage } from "../../../shared/i18n/language-context";
import { uzt } from "../../../shared/i18n/uz-text";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { clearLevelUp, currentLevelUp, type LevelUpPayload } from "../model/level-up";
import styles from "./level-up-screen.module.css";

/** 로켓 다리 끝 (로켓 캔버스) — 발사대 윗면이 여기 닿는다 */
const ROCKET_FOOT_Y = 314;

/**
 * 레벨업 연출 — "한글 로켓" (앱 app/level-up 과 같다).
 * 그림·시간표는 shared/model/level-up-cinematic. React 는 뼈대만 한 번 그리고,
 * 움직임은 requestAnimationFrame 이 부위별 style 을 직접 바꾼다.
 */
export function LevelUpScreen() {
  const router = useRouter();
  const { user } = useTelegramAuth();
  const { language } = useAppLanguage();
  // 카운트다운 글씨와 목소리는 배우는 말로 (영어 코스는 Three · Two · One · Liftoff!)
  const spoken = useCinemaLanguage();
  const [payload] = useState<LevelUpPayload | null>(() => currentLevelUp());
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 390, h: 844 });
  const [revealed, setRevealed] = useState(false);
  const skipRef = useRef<(() => void) | null>(null);

  // 부위들 (rAF 가 직접 만진다)
  const space = useRef<HTMLDivElement>(null);
  const starsA = useRef<HTMLDivElement>(null);
  const starsB = useRef<HTMLDivElement>(null);
  const warps = useRef<(HTMLDivElement | null)[]>([]);
  const ground = useRef<HTMLDivElement>(null);
  const puffs = useRef<(SVGCircleElement | null)[]>([]);
  const clouds = useRef<(HTMLDivElement | null)[]>([]);
  const rocket = useRef<HTMLDivElement>(null);
  const flame = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const particles = useRef<(HTMLDivElement | null)[]>([]);
  const words = useRef<(HTMLDivElement | null)[]>([]);
  const go = useRef<HTMLDivElement>(null);
  const chip = useRef<HTMLDivElement>(null);
  const planet = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const skipButton = useRef<HTMLButtonElement>(null);

  // 직접 이 주소로 들어오면(새로고침) 보여 줄 게 없다
  useEffect(() => {
    if (!payload) router.replace("/home");
  }, [payload, router]);

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
  const exhaust = useMemo(() => exhaustParticles(aspect), [aspect]);

  // 로켓·발사대 자리 (px)
  const rocketW = ROCKET_WIDTH * W;
  const rocketScale = rocketW / ROCKET_BOX.width;
  const rocketH = ROCKET_BOX.height * rocketScale;
  const groundScale = W / GROUND_BOX.width;
  const rocketStartTop = cinemaAt(TRACK.rocketY, 0) * H - rocketH / 2;
  const groundTop = rocketStartTop + ROCKET_FOOT_Y * rocketScale - PAD_TOP_Y * groundScale;
  const planetPx = 0.68 * W;
  const planetScaleUnit = planetPx / PLANET_BOX.size;

  const finish = useCallback(() => {
    clearLevelUp();
    if (payload?.next) router.replace(payload.next);
    else if (window.history.length > 1) router.back();
    else router.replace("/home");
  }, [payload, router]);

  useTelegramBackOverride(finish);

  // 그리기 전에 첫 장면을 맞춘다 (안 그러면 한 프레임 동안 로켓이 맨 위·불꽃이 다 켜진 채 보인다)
  useLayoutEffect(() => {
    if (!payload) return;
    const audio = createCinemaAudio(spoken === "en" ? LEVEL_UP_AUDIO_EN : LEVEL_UP_AUDIO);
    audio.preload();
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let start = performance.now() - (reduce ? CINEMA.reveal : 0);
    let frame = 0;
    let shownReveal = false;

    const apply = (t: number) => {
      if (space.current) space.current.style.opacity = String(cinemaAt(TRACK.space, t));
      const shift = cinemaAt(TRACK.stars, t) % 1;
      if (starsA.current) starsA.current.style.transform = `translateY(${shift * H}px)`;
      if (starsB.current) starsB.current.style.transform = `translateY(${(shift - 1) * H}px)`;
      const warp = cinemaAt(TRACK.warp, t);
      WARP_LINES.forEach((line, i) => {
        const el = warps.current[i];
        if (!el) return;
        el.style.opacity = String(warp * line.o);
        el.style.transform = `translateY(${warpY(line, t) * H}px)`;
      });
      if (ground.current) ground.current.style.transform = `translateY(${cinemaAt(TRACK.ground, t) * H}px)`;
      const smoke = cinemaAt(TRACK.smoke, t);
      PAD_PUFFS.forEach((puff, i) => {
        const el = puffs.current[i];
        if (!el) return;
        const p = puffAt(puff, smoke);
        el.setAttribute("cx", String(p.x));
        el.setAttribute("cy", String(p.y));
        el.setAttribute("r", String(p.r));
        el.setAttribute("opacity", String(p.opacity));
      });
      CLOUDS.forEach((cloud, i) => {
        const el = clouds.current[i];
        if (!el) return;
        el.style.transform = `translateY(${cloudY(cloud, t) * H}px)`;
      });
      const rocketTop = cinemaAt(TRACK.rocketY, t) * H - rocketH / 2;
      if (rocket.current) rocket.current.style.transform = `translateY(${rocketTop}px)`;
      const f = cinemaAt(TRACK.flame, t);
      // 불꽃은 살짝 일렁인다 (불이라서)
      const flicker = 1 + 0.07 * Math.sin(t / 37) + 0.04 * Math.sin(t / 19);
      if (flame.current) flame.current.style.transform = `scale(${0.55 + 0.45 * f}, ${f * flicker})`;
      const tr = cinemaAt(TRACK.trail, t);
      if (trail.current) {
        trail.current.style.opacity = String(tr);
        trail.current.style.transform = `scaleY(${0.3 + 0.7 * tr})`;
      }
      exhaust.forEach((particle, i) => {
        const el = particles.current[i];
        if (!el) return;
        const p = particleAt(particle, t);
        el.style.opacity = String(p.opacity);
        el.style.transform = `translate(${p.x * W}px, ${p.y * H}px) translate(-50%, -50%) rotate(${p.rotate}deg) scale(${p.scale})`;
      });
      COUNT_WORDS.forEach((word, i) => {
        const el = words.current[i];
        if (!el) return;
        el.style.opacity = String(cinemaAt(word.opacity, t));
        el.style.transform = `scale(${cinemaAt(word.scale, t)})`;
      });
      if (go.current) {
        go.current.style.opacity = String(cinemaAt(GO_WORD.opacity, t));
        go.current.style.transform = `scale(${cinemaAt(GO_WORD.scale, t)})`;
      }
      if (chip.current) chip.current.style.opacity = String(cinemaAt(TRACK.chip, t));
      if (planet.current) {
        const y = cinemaAt(TRACK.planetY, t) * H - planetPx / 2;
        planet.current.style.transform = `translateY(${y}px) scale(${cinemaAt(TRACK.planetScale, t)})`;
      }
      if (flash.current) flash.current.style.opacity = String(cinemaAt(TRACK.flash, t));
      const r = cinemaAt(TRACK.reveal, t);
      if (reveal.current) {
        reveal.current.style.opacity = String(r);
        reveal.current.style.transform = `translateY(${(1 - r) * 24}px)`;
      }
      if (skipButton.current) skipButton.current.style.opacity = t < CINEMA.reveal ? "1" : "0";
    };

    const tick = (now: number) => {
      const t = Math.min(CINEMA.end, Math.max(0, now - start));
      apply(t);
      if (t >= CINEMA.reveal && !shownReveal) {
        shownReveal = true;
        setRevealed(true);
      }
      if (t < CINEMA.end) frame = requestAnimationFrame(tick);
    };

    skipRef.current = () => {
      const now = performance.now();
      if (now - start >= CINEMA.reveal) return;
      start = now - CINEMA.reveal;
      void audio.playFrom(CINEMA.reveal);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };

    apply(reduce ? CINEMA.reveal : 0);
    void audio.playFrom(reduce ? CINEMA.reveal : 0);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      skipRef.current = null;
      audio.dispose();
    };
  }, [payload, H, W, rocketH, planetPx, exhaust, spoken]);

  if (!payload) return null;

  const avatar = user?.avatar ? mergeAvatarConfig(user.avatar) : null;
  const pick = (field?: Record<string, string> | null) =>
    field ? (field[language] || field.en || field.uz || "") : "";
  const n = payload.to;
  // 급수(level) 문구는 코스마다 다르다 — 영어는 "1급" 이 아니라 "1단계" (learning/model/course-copy)
  const course = learnCourseOf(user?.learnCourse);
  const levelKey = (key: string) => courseCopyKey(key, course);
  const chipKey =
    payload.via === "jump"
      ? "levelUp.introJump"
      : payload.kind === "level"
        ? levelKey("levelUp.introLevel")
        : "levelUp.introSection";
  const kickerKey =
    payload.kind === "level" ? levelKey("levelUp.kickerLevel") : payload.kind === "course" ? "levelUp.kickerCourse" : "levelUp.kickerSection";
  const titleKey =
    payload.kind === "level" ? levelKey("levelUp.titleLevel") : payload.kind === "course" ? "levelUp.titleCourse" : "levelUp.titleSection";
  const bodyKey =
    payload.kind === "level" ? levelKey("levelUp.bodyLevel") : payload.kind === "course" ? "levelUp.bodyCourse" : "levelUp.bodySection";
  const serverTitle = payload.kind === "course" ? "" : pick(payload.title);
  const serverBody = payload.kind === "course" ? "" : pick(payload.description);

  // 깃발 자리 — 행성 꼭대기에서 오른쪽으로 조금
  const planetR = PLANET_BOX.r * planetScaleUnit;
  const flagAngle = (32 * Math.PI) / 180;
  const flagW = 0.17 * W;
  const flagScale = flagW / FLAG_BOX.width;
  const avatarW = 0.4 * W;

  return (
    <main className={styles.stage} ref={stageRef}>
      {/* 하늘 — 저녁 → 우주 */}
      <div className={styles.dusk} />
      <div className={styles.space} ref={space} />
      {[starsA, starsB].map((ref, index) => (
        <div aria-hidden className={styles.stars} key={index} ref={ref}>
          <svg height={H} viewBox={`0 0 ${W} ${H}`} width={W}>
            {STARS.map((star, i) => (
              <circle cx={star.x * W} cy={star.y * H} fill="#FFFFFF" key={i} opacity={star.o} r={star.r} />
            ))}
          </svg>
        </div>
      ))}
      {WARP_LINES.map((line, i) => (
        <div
          aria-hidden
          className={styles.warp}
          key={i}
          ref={(el) => {
            warps.current[i] = el;
          }}
          style={{ left: line.x * W, height: line.len * H, opacity: 0 }}
        />
      ))}

      {/* 구름 */}
      {CLOUDS.map((cloud, i) => {
        const cw = cloud.size * W;
        return (
          <div
            aria-hidden
            className={styles.layer}
            key={i}
            ref={(el) => {
              clouds.current[i] = el;
            }}
            style={{ left: cloud.x * W - cw / 2, top: -(cw * CLOUD_BOX.height) / CLOUD_BOX.width / 2, width: cw, transform: `translateY(${-0.5 * H}px)` }}
          >
            <svg viewBox={`0 0 ${CLOUD_BOX.width} ${CLOUD_BOX.height}`} width="100%">
              <WearShapes shapes={CLOUD_SHAPES} />
            </svg>
          </div>
        );
      })}

      {/* 땅 — 발사대가 로켓 다리 밑에 오게 */}
      <div aria-hidden className={styles.layer} ref={ground} style={{ left: 0, top: groundTop, width: W }}>
        <svg viewBox={`0 0 ${GROUND_BOX.width} ${GROUND_BOX.height}`} width="100%">
          <WearShapes shapes={GROUND_SHAPES} />
          {PAD_PUFFS.map((puff, i) => (
            <circle
              cx={puff.x}
              cy={puff.y}
              fill="#E9E5FF"
              key={i}
              opacity={0}
              r={puff.r}
              ref={(el) => {
                puffs.current[i] = el;
              }}
            />
          ))}
        </svg>
        <div className={styles.groundFill} />
      </div>

      {/* 배기 — 자모 불꽃과 연기 */}
      {exhaust.map((particle, i) => (
        <div
          aria-hidden
          className={particle.glyph ? styles.jamo : styles.puff}
          data-no-translate
          key={i}
          ref={(el) => {
            particles.current[i] = el;
          }}
          style={{
            color: particle.color,
            fontSize: particle.size * W,
            height: particle.glyph ? undefined : particle.size * W,
            opacity: 0,
            width: particle.glyph ? undefined : particle.size * W,
          }}
        >
          {particle.glyph}
        </div>
      ))}

      {/* 한글 로켓 — 창(ㅇ) 안에 내 얼굴 */}
      <div aria-hidden className={styles.layer} ref={rocket} style={{ left: W / 2 - rocketW / 2, top: 0, width: rocketW, height: rocketH }}>
        <div
          className={styles.trail}
          ref={trail}
          style={{
            left: (ROCKET_BOX.nozzleX - 14) * rocketScale,
            top: (ROCKET_BOX.nozzleY + 40) * rocketScale,
            width: 28 * rocketScale,
            height: 0.42 * H,
            opacity: 0,
          }}
        />
        <div
          className={styles.flame}
          ref={flame}
          style={{
            left: (ROCKET_BOX.nozzleX - FLAME_BOX.originX) * rocketScale,
            top: (ROCKET_BOX.nozzleY - 2) * rocketScale,
            width: FLAME_BOX.width * rocketScale,
            height: FLAME_BOX.height * rocketScale,
          }}
        >
          <svg height="100%" viewBox={`0 0 ${FLAME_BOX.width} ${FLAME_BOX.height}`} width="100%">
            <WearShapes shapes={FLAME_SHAPES} />
          </svg>
        </div>
        <svg className={styles.fill} viewBox={`0 0 ${ROCKET_BOX.width} ${ROCKET_BOX.height}`}>
          <WearShapes shapes={ROCKET_SHAPES} />
        </svg>
        <div
          className={styles.window}
          style={{
            left: (ROCKET_WINDOW.cx - ROCKET_WINDOW.r) * rocketScale,
            top: (ROCKET_WINDOW.cy - ROCKET_WINDOW.r) * rocketScale,
            width: ROCKET_WINDOW.r * 2 * rocketScale,
            height: ROCKET_WINDOW.r * 2 * rocketScale,
          }}
        >
          {avatar ? <GeneratedAvatar avatar={avatar} variant="head" /> : null}
        </div>
        <svg className={styles.fill} viewBox={`0 0 ${ROCKET_BOX.width} ${ROCKET_BOX.height}`}>
          <WearShapes shapes={ROCKET_GLASS} />
        </svg>
      </div>

      {/* 도착할 행성 — 위에서 내려온다. 착륙하면 내 아바타가 깃발 옆에서 손을 흔든다 */}
      <div className={styles.planet} ref={planet} style={{ left: W / 2 - planetPx / 2, width: planetPx, height: planetPx }}>
        <svg className={styles.fill} viewBox={`0 0 ${PLANET_BOX.size} ${PLANET_BOX.size}`}>
          <WearShapes shapes={PLANET_BACK} />
          <WearShapes shapes={PLANET_SHAPES} />
        </svg>
        <b className={styles.planetNumber} data-no-translate style={{ fontSize: planetPx * 0.3 }}>
          {n}
        </b>
        <svg className={styles.fill} viewBox={`0 0 ${PLANET_BOX.size} ${PLANET_BOX.size}`}>
          <WearShapes shapes={PLANET_FRONT} />
        </svg>
        {revealed ? (
          <>
            <div
              aria-hidden
              className={styles.flag}
              style={{
                left: planetPx / 2 + planetR * Math.sin(flagAngle) - 12 * flagScale,
                top: planetPx / 2 - planetR * Math.cos(flagAngle) - 118 * flagScale,
                width: flagW,
                height: FLAG_BOX.height * flagScale,
              }}
            >
              <svg height="100%" viewBox={`0 0 ${FLAG_BOX.width} ${FLAG_BOX.height}`} width="100%">
                <WearShapes shapes={FLAG_SHAPES} />
              </svg>
              <b data-no-translate style={{ left: FLAG_BOX.textX * flagScale, top: FLAG_BOX.textY * flagScale, fontSize: 22 * flagScale }}>
                {n}
              </b>
            </div>
            {avatar ? (
              <div
                className={styles.lander}
                style={{
                  left: planetPx / 2 - avatarW * 0.62,
                  top: planetPx / 2 - planetR - avatarW * (340 / 320) + 8,
                  width: avatarW,
                  height: avatarW * (360 / 320),
                }}
              >
                <GeneratedAvatar alive avatar={avatar} greet variant="full" />
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      {/* 카운트다운 — 셋 · 둘 · 하나 · 출발! */}
      <div className={`${styles.countBox} ${spoken === "en" ? styles.countEn : ""}`}>
        {COUNT_WORDS.map((word, i) => (
          <div
            className={styles.count}
            data-no-translate
            key={word.ko}
            ref={(el) => {
              words.current[i] = el;
            }}
          >
            <strong>{word[spoken]}</strong>
            <span>{word.sub}</span>
          </div>
        ))}
        <div className={styles.count} ref={go}>
          <strong data-no-translate>{GO_TEXT[spoken]}</strong>
          {language === spoken ? null : <span data-i18n="levelUp.go">{uzt("levelUp.go")}</span>}
        </div>
      </div>

      <div className={styles.chip} ref={chip}>
        {payload.via === "jump" ? (
          <span data-i18n={chipKey}>{uzt(chipKey)}</span>
        ) : (
          <span data-i18n={chipKey}>{uzt(chipKey, { n: payload.from ?? Math.max(1, n - 1) })}</span>
        )}
      </div>

      <div aria-hidden className={styles.flash} ref={flash} />

      {/* 결과 — 새 섹션 제목·설명 */}
      <section className={styles.reveal} ref={reveal} style={{ top: cinemaAt(TRACK.planetY, CINEMA.end) * H + planetPx / 2 + 28 }}>
        <small data-i18n={kickerKey}>{uzt(kickerKey)}</small>
        {serverTitle ? (
          <h1 data-no-translate>{serverTitle}</h1>
        ) : (
          <h1 data-i18n={titleKey}>{uzt(titleKey, { n })}</h1>
        )}
        {serverBody ? <p data-no-translate>{serverBody}</p> : <p data-i18n={bodyKey}>{uzt(bodyKey)}</p>}
      </section>

      <button
        className={styles.skip}
        onClick={() => skipRef.current?.()}
        ref={skipButton}
        style={{ pointerEvents: revealed ? "none" : "auto" } as CSSProperties}
        type="button"
      >
        <span data-i18n="levelUp.skip">{uzt("levelUp.skip")}</span>
      </button>

      <div className={styles.footer} style={{ opacity: revealed ? 1 : 0, pointerEvents: revealed ? "auto" : "none" }}>
        <button className={styles.continue} onClick={finish} type="button">
          <span data-i18n="levelUp.continue">{uzt("levelUp.continue")}</span>
        </button>
      </div>
    </main>
  );
}
