"use client";

import { useEffect, useState, type CSSProperties, type MutableRefObject } from "react";

import {
  BLINK_MS,
  FEET,
  GREET_COOLDOWN_MS,
  GREET_DELAY_MS,
  LOOK_SHIFT,
  NECK,
  armGeometry,
  canBlink,
  lookAroundTimeline,
  lookTimeline,
  nextBlink,
  nextIdle,
  sampleChannel,
  waveTimeline,
  type MotionBody,
  type MotionTimeline,
} from "../../../shared/model/avatar-motion";

/**
 * 홈 아바타 동작 (앱 AvatarPreview alive 와 같다 — 동작표는 shared/model/avatar-motion).
 * 부위별 <g> 에 Web Animations 로 transform 을 건다. React 는 깜빡임(눈 모양)만 다시 그린다.
 */
export type AvatarPart =
  | "lean"
  | "backHair"
  | "armBackL"
  | "armBackR"
  | "armFrontL"
  | "armFrontR"
  | "ears"
  | "head"
  | "face"
  | "front"
  | "eyewear"
  | "hat";

export type AvatarPartRefs = MutableRefObject<Partial<Record<AvatarPart, SVGGElement | null>>>;

/** 고개 돌릴 때 부위별로 얼마나 옆으로 가나 */
const SHIFT: Partial<Record<AvatarPart, number>> = {
  backHair: LOOK_SHIFT.back,
  ears: LOOK_SHIFT.ears,
  head: LOOK_SHIFT.head,
  face: LOOK_SHIFT.face,
  front: LOOK_SHIFT.front,
  eyewear: LOOK_SHIFT.face,
  hat: LOOK_SHIFT.front,
};

const FRAME_MS = 33;

/** 부위마다 도는 축 — SVG 캔버스 좌표 그대로 (transform-box: view-box) */
export function partStyle(part: AvatarPart, body: MotionBody): CSSProperties {
  let origin = NECK as { x: number; y: number };
  if (part === "lean") origin = FEET;
  else if (part === "armBackL" || part === "armFrontL") origin = armGeometry("L", body).pivot;
  else if (part === "armBackR" || part === "armFrontR") origin = armGeometry("R", body).pivot;
  return { transformBox: "view-box", transformOrigin: `${origin.x}px ${origin.y}px` };
}

export function transformAt(part: AvatarPart, tl: MotionTimeline, t: number) {
  if (part === "lean") return `rotate(${sampleChannel(tl.keys.lean, t)}deg)`;
  if (part === "armBackL" || part === "armFrontL") return `rotate(${sampleChannel(tl.keys.armL, t)}deg)`;
  if (part === "armBackR" || part === "armFrontR") return `rotate(${sampleChannel(tl.keys.armR, t)}deg)`;
  const shift = (SHIFT[part] ?? 0) * sampleChannel(tl.keys.look, t);
  return `rotate(${sampleChannel(tl.keys.tilt, t)}deg) translateX(${shift}px)`;
}

/** 이 동작에서 움직이는 부위만 */
export function partsOf(tl: MotionTimeline): AvatarPart[] {
  const parts: AvatarPart[] = [];
  if (tl.keys.lean) parts.push("lean");
  if (tl.keys.armL) parts.push("armBackL", "armFrontL");
  if (tl.keys.armR) parts.push("armBackR", "armFrontR");
  if (tl.keys.look || tl.keys.tilt) {
    parts.push("backHair", "ears", "head", "face", "front", "eyewear", "hat");
  }
  return parts;
}

/** 페이지를 오가도 홈에 들어올 때마다 흔들지 않게 (모듈에 기억) */
let lastGreetAt = 0;

export function useAvatarMotion({
  body,
  enabled,
  expression,
  parts,
  forceGreet = false,
}: {
  body: MotionBody;
  enabled: boolean;
  expression?: string;
  parts: AvatarPartRefs;
  /** 쿨다운과 상관없이 나타나자마자 손을 흔든다 (레벨업 연출의 착륙) */
  forceGreet?: boolean;
}) {
  const [blink, setBlink] = useState(false);
  const blinkable = canBlink(expression);
  const { bodyX, bodyWidth, outfit, costume, hand } = body;

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    const running: Animation[] = [];
    let busyUntil = 0;
    const later = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const visible = () => document.visibilityState !== "hidden";

    const blinkOnce = () => {
      if (!blinkable) return;
      setBlink(true);
      later(BLINK_MS, () => setBlink(false));
    };

    const play = (tl: MotionTimeline) => {
      busyUntil = Date.now() + tl.duration + 60;
      for (const part of partsOf(tl)) {
        const el = parts.current[part];
        if (!el?.animate) continue;
        const frames: Keyframe[] = [];
        for (let t = 0; t < tl.duration; t += FRAME_MS) {
          frames.push({ offset: t / tl.duration, transform: transformAt(part, tl, t) });
        }
        frames.push({ offset: 1, transform: transformAt(part, tl, tl.duration) });
        running.push(el.animate(frames, { duration: tl.duration, easing: "linear" }));
      }
      for (const at of tl.blinkAt ?? []) later(at, blinkOnce);
    };

    const loopBlink = () => {
      const next = nextBlink();
      later(next.delay, () => {
        if (visible()) {
          blinkOnce();
          if (next.double) later(BLINK_MS + 150, blinkOnce);
        }
        loopBlink();
      });
    };

    const loopIdle = () => {
      later(nextIdle(), () => {
        if (visible() && Date.now() > busyUntil) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          play(Math.random() < 0.55 ? lookTimeline(dir) : lookAroundTimeline(dir));
        }
        loopIdle();
      });
    };

    // 홈에 들어오면 한 번 손 인사 (30초 안에 또 오면 생략)
    if (forceGreet || Date.now() - lastGreetAt > GREET_COOLDOWN_MS) {
      later(GREET_DELAY_MS, () => {
        if (!visible()) return;
        lastGreetAt = Date.now();
        play(waveTimeline({ bodyX, bodyWidth, outfit, costume, hand }));
      });
    }
    loopBlink();
    loopIdle();

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      running.forEach((animation) => animation.cancel());
      setBlink(false);
    };
  }, [enabled, blinkable, bodyX, bodyWidth, outfit, costume, hand, parts, forceGreet]);

  return enabled && blink;
}
