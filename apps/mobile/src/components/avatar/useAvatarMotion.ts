import { useEffect, useState } from "react";
import { AppState } from "react-native";
import {
  Easing,
  cancelAnimation,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import {
  BLINK_MS,
  GREET_COOLDOWN_MS,
  GREET_DELAY_MS,
  canBlink,
  lookAroundTimeline,
  lookTimeline,
  nextBlink,
  nextIdle,
  waveTimeline,
  type MotionBody,
  type MotionEase,
  type MotionKey,
  type MotionTimeline,
} from "./avatarMotion";

/**
 * 홈 아바타 동작 (텔레그램 use-avatar-motion 과 같다 — 동작표는 avatarMotion).
 * 채널마다 shared value 를 두고 reanimated 로 키프레임을 잇는다.
 * React 는 깜빡임(눈 모양)만 다시 그린다.
 */
const EASE: Record<MotionEase, (t: number) => number> = {
  out: Easing.out(Easing.cubic),
  inOut: Easing.inOut(Easing.cubic),
  linear: Easing.linear,
};

function run(value: SharedValue<number>, keys?: MotionKey[]) {
  const first = keys?.[0];
  if (!keys || !first || keys.length < 2) return;
  cancelAnimation(value);
  value.value = first.v;
  const steps = keys.slice(1).map((key, index) =>
    withTiming(key.v, {
      duration: Math.max(1, key.t - (keys[index]?.t ?? 0)),
      easing: EASE[key.ease ?? "linear"],
    }),
  );
  const [firstStep, ...rest] = steps;
  if (firstStep === undefined) return;
  value.value = withSequence(firstStep, ...rest);
}

/** 화면을 오가도 홈에 들어올 때마다 흔들지 않게 (모듈에 기억) */
let lastGreetAt = 0;

export function useAvatarMotion({
  body,
  enabled,
  expression,
}: {
  body: MotionBody;
  enabled: boolean;
  expression?: string;
}) {
  const look = useSharedValue(0);
  const tilt = useSharedValue(0);
  const lean = useSharedValue(0);
  const armL = useSharedValue(0);
  const armR = useSharedValue(0);
  const [blink, setBlink] = useState(false);
  const reducedMotion = useReducedMotion();
  const blinkable = canBlink(expression);
  const { bodyX, bodyWidth, outfit, costume, hand } = body;

  useEffect(() => {
    if (!enabled || reducedMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let busyUntil = 0;
    const later = (ms: number, fn: () => void) => {
      timers.push(setTimeout(fn, ms));
    };
    const active = () => AppState.currentState === "active";

    const blinkOnce = () => {
      if (!blinkable) return;
      setBlink(true);
      later(BLINK_MS, () => setBlink(false));
    };

    const play = (tl: MotionTimeline) => {
      busyUntil = Date.now() + tl.duration + 60;
      run(armL, tl.keys.armL);
      run(armR, tl.keys.armR);
      run(look, tl.keys.look);
      run(tilt, tl.keys.tilt);
      run(lean, tl.keys.lean);
      for (const at of tl.blinkAt ?? []) later(at, blinkOnce);
    };

    const loopBlink = () => {
      const next = nextBlink();
      later(next.delay, () => {
        if (active()) {
          blinkOnce();
          if (next.double) later(BLINK_MS + 150, blinkOnce);
        }
        loopBlink();
      });
    };

    const loopIdle = () => {
      later(nextIdle(), () => {
        if (active() && Date.now() > busyUntil) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          play(Math.random() < 0.55 ? lookTimeline(dir) : lookAroundTimeline(dir));
        }
        loopIdle();
      });
    };

    // 홈에 들어오면 한 번 손 인사 (30초 안에 또 오면 생략)
    if (Date.now() - lastGreetAt > GREET_COOLDOWN_MS) {
      later(GREET_DELAY_MS, () => {
        if (!active()) return;
        lastGreetAt = Date.now();
        play(waveTimeline({ bodyX, bodyWidth, outfit, costume, hand }));
      });
    }
    loopBlink();
    loopIdle();

    return () => {
      timers.forEach(clearTimeout);
      for (const value of [look, tilt, lean, armL, armR]) {
        cancelAnimation(value);
        value.value = 0;
      }
      setBlink(false);
    };
  }, [enabled, reducedMotion, blinkable, bodyX, bodyWidth, outfit, costume, hand, look, tilt, lean, armL, armR]);

  return { blink: enabled && blink, look, tilt, lean, armL, armR };
}
