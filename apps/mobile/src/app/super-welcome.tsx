import { useCallback, useEffect, useMemo, useRef, useState, type ComponentProps } from "react";
import { BackHandler, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { Pressable } from "@/components/ui/Pressables";
import AvatarPreview, { WearShapes } from "@/components/avatar/AvatarPreview";
import { cinemaAt, cinemaVoices } from "@/components/cinema/cinema";
import { useCinemaAudio, useCinemaClock, useCinemaLanguage } from "@/components/cinema/useCinema";
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
} from "@/components/super-welcome/thanksCinematic";
import { useAuthStore } from "@/store/auth.store";
import { mergeAvatarConfig } from "@/types/avatar";
import * as Haptics from "@/utils/haptics";

type IconName = ComponentProps<typeof Ionicons>["name"];
type Tier = "super" | "max";

/** 등급마다 보여 줄 혜택 넷 (premium.features.* 문구) */
const PERKS: Record<Tier, { icon: IconName; key: string }[]> = {
  super: [
    { icon: "infinite", key: "unlimitedEnergy" },
    { icon: "close-circle", key: "noAds" },
    { icon: "refresh", key: "unlimitedReview" },
    { icon: "diamond", key: "monthlyGems" },
  ],
  max: [
    { icon: "mic", key: "aiTutor" },
    { icon: "chatbubbles", key: "tutorTopics" },
    { icon: "infinite", key: "unlimitedEnergy" },
    { icon: "diamond", key: "monthlyGems" },
  ],
};

/** 등급 색 — SUPER 는 보랏빛 분홍, MAX 는 금 */
const TIER_LOOK: Record<Tier, { tag: [string, string]; tagInk: string }> = {
  super: { tag: ["#FF8AD8", "#9D6BFF"], tagInk: "#FFFFFF" },
  max: { tag: ["#FFE27A", "#FFB800"], tagInk: "#4A2E00" },
};

const SOURCES: Record<ThanksSound, number> = {
  keyFly: require("../../assets/sounds/thanks/key-fly.mp3"),
  unlock: require("../../assets/sounds/thanks/unlock.mp3"),
  gate: require("../../assets/sounds/thanks/gate.mp3"),
  light: require("../../assets/sounds/thanks/light.mp3"),
  fireworks: require("../../assets/sounds/streak/fireworks.mp3"),
  voThanks: require("../../assets/sounds/thanks/vo-thanks.mp3"),
  lantern: require("../../assets/sounds/thanks/lantern.mp3"),
};
const SOURCES_EN: Partial<Record<ThanksSound, number>> = {
  voThanks: require("../../assets/sounds/thanks/vo-thanks-en.mp3"),
};

const DAY_MS = 86_400_000;

/**
 * 구독 결제 직후 감사 연출 — "한글 열쇠" (텔레그램 premium/ui/super-welcome 과 같다).
 * 결제가 한글 열쇠가 되어 궁궐 대문의 자물쇠를 연다 → 빛 속으로 → 새벽 궁궐에서 "감사합니다!"
 * 그림·시간표는 components/super-welcome/thanksCinematic. 시계 하나(clock, ms)로 부위마다 자리를 계산한다.
 * premium 화면이 결제 한 번에 한 번 띄운다. 연출 중 탭(또는 건너뛰기)은 결과로, 동작 줄이기면 결과만.
 */
export default function SuperWelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const params = useLocalSearchParams<{ tier?: string }>();
  const tier: Tier = params.tier === "max" ? "max" : "super";
  const tierName = tier === "max" ? "MAX" : "SUPER";
  const spoken = useCinemaLanguage();
  const user = useAuthStore((s) => s.user) as {
    nickname?: string;
    createdAt?: string;
    streak?: number;
    avatar?: unknown;
  } | null;

  const name = user?.nickname?.trim() || "KORIO";
  const days = user?.createdAt
    ? Math.max(1, Math.floor((Date.now() - new Date(user.createdAt).getTime()) / DAY_MS) + 1)
    : Math.max(0, user?.streak ?? 0);
  const letter = days > 1 ? t("superWelcome.letter", { name, days }) : t("superWelcome.letterFirst", { name });
  const avatar = user?.avatar ? mergeAvatarConfig(user.avatar as never) : null;

  const [size, setSize] = useState({ w: 390, h: 844 });
  const [revealed, setRevealed] = useState(false);
  const [ctaReady, setCtaReady] = useState(false);
  const { clock, run } = useCinemaClock(THANKS.end);
  const audio = useCinemaAudio(cinemaVoices(SOURCES, SOURCES_EN, spoken), THANKS_GAINS);
  const hapticTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const W = size.w;
  const H = size.h;
  const aspect = H / W;

  // ── 자리 (px) ── 대문은 화면 너비에 맞추고 아래 끝을 GATE_BOTTOM 에
  const gs = W / GATE_BOX.width;
  const gateTop = GATE_BOTTOM * H - GATE_BOX.height * gs;
  const holeX = KEYHOLE.x * gs;
  const holeY = gateTop + KEYHOLE.y * gs;
  const keyU = (0.36 * W) / KEY_BOX.width;
  const lockU = gs * 0.95;
  const sparks = useMemo(() => lockSparks(holeX / W, holeY / H), [holeX, holeY, W, H]);
  const fireworks = useMemo(() => fireworkSparks(), []);

  const vibrateFrom = useCallback((from: number) => {
    hapticTimers.current.forEach(clearTimeout);
    hapticTimers.current = THANKS_HAPTICS.filter((h) => h.t >= from).map((h) =>
      setTimeout(() => {
        const job =
          h.kind === "success"
            ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            : Haptics.impactAsync(h.kind === "medium" ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light);
        job.catch(() => {});
      }, h.t - from),
    );
  }, []);

  const finish = useCallback(() => {
    audio.stop();
    hapticTimers.current.forEach(clearTimeout);
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)");
  }, [audio, router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      finish();
      return true;
    });
    return () => sub.remove();
  }, [finish]);

  // 시계 — 처음부터 끝까지 한 번. 동작 줄이기면 끝 장면 + 인사 목소리만
  useEffect(() => {
    if (reducedMotion) {
      run(THANKS.end);
      audio.play("voThanks");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    } else {
      run(0);
      audio.playFrom(0, THANKS_SOUND_CUES);
      vibrateFrom(0);
    }
    const timers = hapticTimers.current;
    return () => timers.forEach(clearTimeout);
    // 한 번만 — 화면이 열릴 때의 연출
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimatedReaction(
    () => [clock.value >= THANKS.reveal, clock.value >= THANKS.cta] as const,
    (now, previous) => {
      if (now[0] && !previous?.[0]) runOnJS(setRevealed)(true);
      if (now[1] && !previous?.[1]) runOnJS(setCtaReady)(true);
    },
  );

  /** 연출 중 탭 — 결과 장면으로 */
  const skip = useCallback(() => {
    if (clock.value >= THANKS.reveal) return;
    run(THANKS.reveal);
    audio.playFrom(THANKS.reveal, THANKS_SOUND_CUES);
    vibrateFrom(THANKS.reveal);
  }, [audio, clock, run, vibrateFrom]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (Math.abs(width - W) > 1 || Math.abs(height - H) > 1) setSize({ w: width, h: height });
  };

  // ── 움직이는 부위 ──
  const worldStyle = useAnimatedStyle(() => {
    const d = cinemaAt(TRACK.dive, clock.value);
    return {
      opacity: clock.value < THANKS.reveal + 40 ? 1 : 0,
      transform: [{ translateX: holeX - W / 2 }, { translateY: holeY - H / 2 }, { scale: d }, { translateX: W / 2 - holeX }, { translateY: H / 2 - holeY }],
    };
  });
  const lightStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(TRACK.light, clock.value) }));
  const raysStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(TRACK.light, clock.value) * 0.9,
    transform: [{ rotate: `${cinemaAt(TRACK.rays, clock.value)}deg` }],
  }));
  const leftDoorStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 900 }, { rotateY: `${-cinemaAt(TRACK.door, clock.value)}deg` }],
  }));
  const rightDoorStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 900 }, { rotateY: `${cinemaAt(TRACK.door, clock.value)}deg` }],
  }));
  const nightGlowStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(TRACK.nightLanterns, clock.value) }));
  const lockStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(TRACK.lockAlpha, clock.value),
    transform: [
      { translateY: cinemaAt(TRACK.lockFall, clock.value) * gs },
      { rotate: `${cinemaAt(TRACK.lockTilt, clock.value)}deg` },
    ],
  }));
  const shackleStyle = useAnimatedStyle(() => ({ transform: [{ translateY: cinemaAt(TRACK.shackle, clock.value) * lockU }] }));
  const chipStyle = useAnimatedStyle(() => {
    const c = cinemaAt(TRACK.chip, clock.value);
    return { opacity: c, transform: [{ translateY: (1 - c) * -16 }] };
  });
  const flashStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(TRACK.flash, clock.value) }));
  const dawnStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(TRACK.dawn, clock.value),
    transform: [{ scale: cinemaAt(TRACK.settle, clock.value) }],
  }));
  const dawnRaysStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${cinemaAt(TRACK.rays, clock.value) * 1.6}deg` }] }));
  const skipStyle = useAnimatedStyle(() => ({ opacity: clock.value < THANKS.reveal ? 1 : 0 }));

  const look = TIER_LOOK[tier];
  const raysPx = 2.6 * W;
  const doorW = DOOR_BOX.width * gs;
  const doorH = DOOR_BOX.height * gs;
  const lanternW = LANTERN_BOX.width * gs * 0.9;
  const lanternH = LANTERN_BOX.height * gs * 0.9;

  return (
    <Pressable style={s.root} onPress={skip} sound={false} onLayout={onLayout}>
      {/* ───── 밤 · 대문 (카메라가 밀고 들어간다) ───── */}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, worldStyle]}>
        <LinearGradient colors={["#07051A", "#160F3E", "#2E2168"]} locations={[0, 0.55, 1]} style={StyleSheet.absoluteFill} />
        <Svg width={W} height={H} style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="moon" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor="#FFF4D6" stopOpacity={0.45} />
              <Stop offset="1" stopColor="#FFF4D6" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          {STARS.map((star, i) => (
            <Circle key={i} cx={star.x * W} cy={star.y * H} r={star.r} fill="#FFFFFF" opacity={star.o} />
          ))}
          <Circle cx={W * 0.8} cy={H * 0.11} r={W * 0.2} fill="url(#moon)" />
          <Circle cx={W * 0.8} cy={H * 0.11} r={W * 0.075} fill="#FFF4D6" />
          <Circle cx={W * 0.78} cy={H * 0.105} r={W * 0.014} fill="#EDE0B8" />
        </Svg>
        {/* 마당 — 대문 아래 */}
        <LinearGradient
          colors={["#2F2A5C", "#191536", "#0C0A1E"]}
          style={[s.abs, { left: 0, right: 0, top: GATE_BOTTOM * H - 2, bottom: 0 }]}
        />

        {/* 문 너머 빛 */}
        <Animated.View style={[s.abs, { left: DOORWAY.x * gs, top: gateTop + DOORWAY.y * gs, width: DOORWAY.width * gs, height: DOORWAY.height * gs }, lightStyle]}>
          <Svg width="100%" height="100%">
            <Defs>
              <RadialGradient id="door-light" cx="50%" cy="55%" r="70%">
                <Stop offset="0" stopColor="#FFFBEA" />
                <Stop offset="0.45" stopColor="#FFE08A" />
                <Stop offset="1" stopColor="#FFB04D" />
              </RadialGradient>
            </Defs>
            <Rect x={0} y={0} width="100%" height="100%" fill="url(#door-light)" />
          </Svg>
        </Animated.View>

        {/* 대문 */}
        <View style={[s.abs, { left: 0, top: gateTop, width: W, height: GATE_BOX.height * gs }]}>
          <Svg width="100%" height="100%" viewBox={`0 0 ${GATE_BOX.width} ${GATE_BOX.height}`}>
            <WearShapes shapes={GATE_SHAPES} />
          </Svg>
        </View>

        {/* 문 두 짝 — 경첩을 축으로 열린다 */}
        <Animated.View
          style={[s.abs, { left: DOORWAY.x * gs, top: gateTop + DOORWAY.y * gs, width: doorW, height: doorH, transformOrigin: "left" }, leftDoorStyle]}
        >
          <Svg width="100%" height="100%" viewBox={`0 0 ${DOOR_BOX.width} ${DOOR_BOX.height}`}>
            <WearShapes shapes={DOOR_SHAPES} />
          </Svg>
        </Animated.View>
        <Animated.View
          style={[s.abs, { left: DOORWAY.x * gs + doorW, top: gateTop + DOORWAY.y * gs, width: doorW, height: doorH, transformOrigin: "right" }, rightDoorStyle]}
        >
          <View style={{ flex: 1, transform: [{ scaleX: -1 }] }}>
            <Svg width="100%" height="100%" viewBox={`0 0 ${DOOR_BOX.width} ${DOOR_BOX.height}`}>
              <WearShapes shapes={DOOR_SHAPES} />
            </Svg>
          </View>
        </Animated.View>

        {/* 빛줄기 — 문이 열리면 쏟아진다 */}
        <Animated.View
          style={[s.abs, { left: holeX - raysPx / 2, top: holeY - raysPx / 2, width: raysPx, height: raysPx }, raysStyle]}
        >
          <Svg width="100%" height="100%" viewBox={`0 0 ${RAYS_BOX.size} ${RAYS_BOX.size}`}>
            <WearShapes shapes={RAY_SHAPES} />
          </Svg>
        </Animated.View>

        {/* 청사초롱 (밤) — 문이 열리면 불이 들어온다 */}
        {NIGHT_LANTERNS.map((spot, i) => (
          <View key={i} style={[s.abs, { left: spot.x * gs - lanternW / 2, top: gateTop + spot.y * gs, width: lanternW, height: lanternH }]}>
            <Animated.View style={[s.abs, s.lanternGlow, { left: -lanternW * 0.6, top: lanternH * 0.05, width: lanternW * 2.2, height: lanternW * 2.2, borderRadius: lanternW * 1.1 }, nightGlowStyle]} />
            <Svg width="100%" height="100%" viewBox={`0 0 ${LANTERN_BOX.width} ${LANTERN_BOX.height}`}>
              <WearShapes shapes={LANTERN_SHAPES} />
            </Svg>
          </View>
        ))}

        {/* 한글 열쇠 (자물쇠 밑에 깔린다 — 그래야 구멍으로 들어가 보인다) */}
        {KEY_TRAIL.map((ago, i) => (
          <KeySpark key={ago} clock={clock} ago={ago} index={i} holeX={holeX} holeY={holeY} W={W} />
        ))}
        <KeyPiece clock={clock} holeX={holeX} holeY={holeY} W={W} keyU={keyU} />

        {/* 자물쇠 — 고리 + ㅁ 몸통 */}
        <Animated.View
          style={[s.abs, { left: holeX - LOCK_BOX.holeX * lockU, top: holeY - LOCK_BOX.holeY * lockU, width: LOCK_BOX.width * lockU, height: LOCK_BOX.height * lockU }, lockStyle]}
        >
          <Animated.View style={[StyleSheet.absoluteFill, shackleStyle]}>
            <Svg width="100%" height="100%" viewBox={`0 0 ${LOCK_BOX.width} ${LOCK_BOX.height}`}>
              <WearShapes shapes={LOCK_SHACKLE} />
            </Svg>
          </Animated.View>
          <Svg width="100%" height="100%" viewBox={`0 0 ${LOCK_BOX.width} ${LOCK_BOX.height}`} style={StyleSheet.absoluteFill}>
            <WearShapes shapes={LOCK_BODY} />
          </Svg>
        </Animated.View>
        {sparks.map((spark, i) => (
          <SparkBit key={i} spark={spark} clock={clock} W={W} H={H} aspect={aspect} />
        ))}
      </Animated.View>

      {/* ───── 새벽 궁궐 (결과) ───── */}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, dawnStyle]}>
        <LinearGradient colors={["#24186A", "#5B36B4", "#C26AB8", "#FFB868"]} locations={[0, 0.34, 0.62, 1]} style={StyleSheet.absoluteFill} />
        <Svg width={W} height={H} style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="halo" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor="#FFF3C4" stopOpacity={0.9} />
              <Stop offset="0.5" stopColor="#FFD27A" stopOpacity={0.35} />
              <Stop offset="1" stopColor="#FFD27A" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={W / 2} cy={H * 0.27} r={W * 0.62} fill="url(#halo)" />
        </Svg>
        <Animated.View style={[s.abs, { left: W / 2 - raysPx / 2, top: H * 0.27 - raysPx / 2, width: raysPx, height: raysPx, opacity: 0.28 }, dawnRaysStyle]}>
          <Svg width="100%" height="100%" viewBox={`0 0 ${RAYS_BOX.size} ${RAYS_BOX.size}`}>
            <WearShapes shapes={RAY_SHAPES} />
          </Svg>
        </Animated.View>
        {fireworks.map((spark, i) => (
          <SparkBit key={i} spark={spark} clock={clock} W={W} H={H} aspect={aspect} />
        ))}
      </Animated.View>

      {/* ───── 결과 글 · 혜택 · 버튼 ───── */}
      <View pointerEvents={revealed ? "box-none" : "none"} style={[s.reveal, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 16 }]}>
        <Hero clock={clock} avatar={avatar} tierName={tierName} W={W} />
        <Reveal clock={clock} track={TRACK.words}>
          <Text style={s.thanks}>{THANKS_WORD[spoken]}</Text>
        </Reveal>
        <Reveal clock={clock} track={TRACK.letter}>
          <Text style={s.letter} numberOfLines={2}>
            {letter}
          </Text>
        </Reveal>
        <Reveal clock={clock} track={TRACK.title} style={s.titleRow}>
          <LinearGradient colors={look.tag} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.tag}>
            <Ionicons name="key" size={12} color={look.tagInk} />
            <Text style={[s.tagText, { color: look.tagInk }]}>{tierName}</Text>
          </LinearGradient>
          <Text style={s.title}>{t("superWelcome.title", { tier: tierName })}</Text>
        </Reveal>
        <View style={s.perks}>
          {PERKS[tier].map((perk, i) => (
            <PerkLantern key={perk.key} clock={clock} index={i} icon={perk.icon} label={t(`premium.features.${perk.key}`)} />
          ))}
        </View>
        <Reveal clock={clock} track={TRACK.cta} style={s.footer}>
          <ThanksButton label={t("superWelcome.cta", { tier: tierName })} onPress={finish} disabled={!ctaReady} />
        </Reveal>
      </View>

      {/* 안내 칩 — 결제가 됐다 */}
      <Animated.View pointerEvents="none" style={[s.chipWrap, { top: insets.top + 14 }, chipStyle]}>
        <View style={s.chip}>
          <Ionicons name="checkmark-circle" size={16} color="#7CE38B" />
          <Text style={s.chipText}>{t("superWelcome.chip")}</Text>
        </View>
      </Animated.View>

      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, s.flash, flashStyle]} />

      <Animated.View style={[s.skipWrap, { top: insets.top + 10 }, skipStyle]} pointerEvents={revealed ? "none" : "auto"}>
        <Pressable onPress={skip} hitSlop={10} style={s.skip}>
          <Text style={s.skipText}>{t("levelUp.skip")}</Text>
          <Ionicons name="play-skip-forward" size={13} color="rgba(255,255,255,0.85)" />
        </Pressable>
      </Animated.View>
    </Pressable>
  );
}

/* ───────── 부위 ───────── */

/** 한글 열쇠 — 회전 중심(이빨 시작)을 열쇠 구멍 기준 자리에 맞춘다 */
function KeyPiece({ clock, holeX, holeY, W, keyU }: { clock: SharedValue<number>; holeX: number; holeY: number; W: number; keyU: number }) {
  const w = KEY_BOX.width * keyU;
  const h = KEY_BOX.height * keyU;
  const px = KEY_BOX.pivotX * keyU;
  const py = KEY_BOX.pivotY * keyU;
  const style = useAnimatedStyle(() => {
    const k = keyAt(clock.value);
    return {
      opacity: cinemaAt(TRACK.lockAlpha, clock.value),
      transform: [{ translateX: holeX + k.dx * W - px }, { translateY: holeY + k.dy * W - py }, { rotate: `${k.rot}deg` }, { scale: k.scale }],
    };
  });
  const glowStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(TRACK.keyGlow, clock.value) }));
  return (
    <Animated.View style={[s.abs, { left: 0, top: 0, width: w, height: h, transformOrigin: [px, py, 0] }, style]}>
      <Animated.View style={[s.abs, s.keyGlow, { left: -w * 0.08, top: -h * 0.6, width: w * 1.16, height: h * 2.2, borderRadius: h }, glowStyle]} />
      <Svg width="100%" height="100%" viewBox={`0 0 ${KEY_BOX.width} ${KEY_BOX.height}`}>
        <WearShapes shapes={KEY_SHAPES} />
      </Svg>
    </Animated.View>
  );
}

/** 열쇠 꼬리 반짝 — 열쇠가 조금 전에 있던 자리 */
function KeySpark({ clock, ago, index, holeX, holeY, W }: { clock: SharedValue<number>; ago: number; index: number; holeX: number; holeY: number; W: number }) {
  const size = 10 - index;
  const style = useAnimatedStyle(() => {
    const t = clock.value;
    const flying = t > 480 && t < 1500;
    const k = keyAt(t - ago);
    return {
      opacity: flying ? 0.85 - index * 0.12 : 0,
      transform: [{ translateX: holeX + k.dx * W - size / 2 }, { translateY: holeY + k.dy * W - size / 2 }],
    };
  });
  return <Animated.View style={[s.abs, s.spark, { left: 0, top: 0, width: size, height: size, borderRadius: size / 2 }, style]} />;
}

/** 입자 하나 — 자모 글자 또는 빛 방울 */
function SparkBit({ spark, clock, W, H, aspect }: { spark: Spark; clock: SharedValue<number>; W: number; H: number; aspect: number }) {
  const px = spark.size * W;
  const style = useAnimatedStyle(() => {
    const p = sparkAt(spark, clock.value, aspect);
    return {
      opacity: p.opacity,
      transform: [{ translateX: p.x * W - px / 2 }, { translateY: p.y * H - px / 2 }, { rotate: `${p.rotate}deg` }, { scale: p.scale }],
    };
  });
  return (
    <Animated.View style={[s.abs, { left: 0, top: 0, width: px, height: px, alignItems: "center", justifyContent: "center" }, style]}>
      {spark.glyph ? (
        <Text style={{ fontSize: px * 0.9, lineHeight: px, fontWeight: "900", color: spark.color, textShadowColor: spark.color, textShadowRadius: 8 }}>
          {spark.glyph}
        </Text>
      ) : (
        <View style={{ width: px, height: px, borderRadius: px / 2, backgroundColor: spark.color, shadowColor: spark.color, shadowOpacity: 1, shadowRadius: 6 }} />
      )}
    </Animated.View>
  );
}

/** 결과 무대 — 먼 지붕 · 단 · 아바타(손 흔든다). 아바타가 없으면 등급 메달 */
function Hero({ clock, avatar, tierName, W }: { clock: SharedValue<number>; avatar: ReturnType<typeof mergeAvatarConfig> | null; tierName: string; W: number }) {
  const [box, setBox] = useState({ w: W, h: 260 });
  const style = useAnimatedStyle(() => {
    const p = cinemaAt(TRACK.hero, clock.value);
    return { opacity: Math.min(1, p * 1.4), transform: [{ translateY: (1 - p) * 40 }, { scale: 0.85 + 0.15 * p }] };
  });
  const figureH = Math.min(box.h * 0.92, W * 0.56);
  const figureW = figureH * (320 / 360);
  const roofW = Math.min(box.w, W);
  const medalW = figureH * (MEDAL_BOX.width / MEDAL_BOX.height);
  return (
    <View style={s.hero} onLayout={(e) => setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}>
      <View style={[s.abs, { left: (box.w - roofW) / 2, bottom: box.h * 0.02, width: roofW, height: (roofW * FAR_ROOF_BOX.height) / FAR_ROOF_BOX.width }]}>
        <Svg width="100%" height="100%" viewBox={`0 0 ${FAR_ROOF_BOX.width} ${FAR_ROOF_BOX.height}`}>
          <WearShapes shapes={FAR_ROOF_SHAPES} />
        </Svg>
      </View>
      <Animated.View style={[s.heroFigure, style]}>
        <View style={[s.plinth, { width: figureW * 0.9, height: figureW * 0.2, borderRadius: figureW * 0.45, bottom: -figureW * 0.06 }]} />
        {avatar ? (
          <View style={{ width: figureW, height: figureH }}>
            <AvatarPreview avatar={avatar} size={figureH} showBackground={false} alive greet />
          </View>
        ) : (
          <View style={{ width: medalW, height: figureH }}>
            <Svg width="100%" height="100%" viewBox={`0 0 ${MEDAL_BOX.width} ${MEDAL_BOX.height}`}>
              <WearShapes shapes={MEDAL_SHAPES} />
            </Svg>
            <Text style={[s.medalText, { top: (figureH * (MEDAL_BOX.textY - 16)) / MEDAL_BOX.height, fontSize: figureH * 0.1 }]}>{tierName}</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

/** 결과 글 한 덩이 — 시간표(track)대로 아래에서 떠오른다 */
function Reveal({ clock, track, style, children }: { clock: SharedValue<number>; track: readonly { t: number; v: number; e?: string }[]; style?: object; children: React.ReactNode }) {
  const animated = useAnimatedStyle(() => {
    const p = cinemaAt(track as never, clock.value);
    return { opacity: Math.min(1, Math.max(0, p)), transform: [{ translateY: (1 - p) * 18 }] };
  });
  return <Animated.View style={[style, animated]}>{children}</Animated.View>;
}

/** 혜택 하나 — 꺼진 청사초롱이 켜지면서 글이 밝아진다 */
function PerkLantern({ clock, index, icon, label }: { clock: SharedValue<number>; index: number; icon: IconName; label: string }) {
  const tile = useAnimatedStyle(() => {
    const p = perkAt(index, clock.value);
    return {
      opacity: 0.25 + 0.75 * Math.min(1, p),
      transform: [{ scale: 0.94 + 0.06 * p }],
      borderColor: p > 0.5 ? "rgba(255,212,92,0.55)" : "rgba(255,255,255,0.14)",
    };
  });
  const glow = useAnimatedStyle(() => {
    const p = perkAt(index, clock.value);
    return { opacity: Math.min(1, p), transform: [{ scale: 0.6 + 0.4 * p }] };
  });
  return (
    <Animated.View style={[s.perk, tile]}>
      <View style={s.perkLamp}>
        <Animated.View style={[s.perkGlow, glow]} />
        <Svg width={26} height={46} viewBox={`0 0 ${LANTERN_BOX.width} ${LANTERN_BOX.height}`}>
          <WearShapes shapes={LANTERN_SHAPES} />
        </Svg>
      </View>
      <View style={{ flex: 1 }}>
        <Ionicons name={icon} size={14} color="#FFD45C" />
        <Text style={s.perkText} numberOfLines={2}>
          {label}
        </Text>
      </View>
    </Animated.View>
  );
}

/** 시작 버튼 — 금빛 판 + 아래 두께, 빛이 한 번씩 훑고 지나간다 */
function ThanksButton({ label, onPress, disabled }: { label: string; onPress: () => void; disabled: boolean }) {
  const shine = useSharedValue(0);
  const [width, setWidth] = useState(320);
  useEffect(() => {
    shine.value = withRepeat(withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.quad) }), -1, false);
  }, [shine]);
  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -120 + shine.value * (width + 240) }, { rotate: "18deg" }],
    opacity: shine.value < 0.55 ? 1 : 0,
  }));
  return (
    <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button" accessibilityLabel={label} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      {({ pressed }: { pressed: boolean }) => (
        <View style={s.ctaSlab}>
          <View style={[s.ctaFace, { transform: [{ translateY: pressed ? 5 : 0 }] }]}>
            <LinearGradient colors={["#FFE88A", "#FFC83A", "#FFB21E"]} style={StyleSheet.absoluteFill} />
            <Animated.View pointerEvents="none" style={[s.ctaShine, shineStyle]} />
            <Text style={s.ctaText} numberOfLines={1}>
              {label}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#4A2E00" />
          </View>
        </View>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#07051A", overflow: "hidden" },
  abs: { position: "absolute" },
  lanternGlow: { backgroundColor: "rgba(255,190,90,0.55)", shadowColor: "#FFB04D", shadowOpacity: 1, shadowRadius: 24 },
  keyGlow: { backgroundColor: "rgba(255,226,140,0.35)", shadowColor: "#FFD45C", shadowOpacity: 1, shadowRadius: 18 },
  spark: { backgroundColor: "#FFE9A8", shadowColor: "#FFD45C", shadowOpacity: 1, shadowRadius: 6 },
  flash: { backgroundColor: "#FFF8E1" },
  reveal: { ...StyleSheet.absoluteFill, paddingHorizontal: 20, alignItems: "center" },
  hero: { flex: 1, alignSelf: "stretch", minHeight: 180, alignItems: "center", justifyContent: "flex-end" },
  heroFigure: { alignItems: "center", justifyContent: "flex-end" },
  plinth: {
    position: "absolute",
    backgroundColor: "rgba(36,24,106,0.55)",
    borderWidth: 2,
    borderColor: "rgba(255,212,92,0.7)",
  },
  medalText: { position: "absolute", left: 0, right: 0, textAlign: "center", color: "#5B3A00", fontWeight: "900", letterSpacing: 1 },
  thanks: {
    marginTop: 14,
    fontSize: 42,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    textShadowColor: "rgba(36,24,106,0.6)",
    textShadowRadius: 18,
  },
  letter: {
    marginTop: 4,
    maxWidth: 320,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "800",
    color: "rgba(255,255,255,0.9)",
  },
  titleRow: { marginTop: 14, alignItems: "center", gap: 8 },
  tag: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999 },
  tagText: { fontSize: 13, fontWeight: "900", letterSpacing: 1.4 },
  title: { color: "#FFFFFF", fontSize: 19, fontWeight: "900", textAlign: "center", lineHeight: 25, maxWidth: 330 },
  perks: { marginTop: 16, alignSelf: "stretch", flexDirection: "row", flexWrap: "wrap", gap: 10 },
  perk: {
    flexBasis: "47%",
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 6,
    borderRadius: 18,
    borderWidth: 1.5,
    backgroundColor: "rgba(20,12,60,0.38)",
  },
  perkLamp: { width: 34, height: 48, alignItems: "center", justifyContent: "center" },
  perkGlow: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 10,
    backgroundColor: "rgba(255,190,90,0.5)",
    shadowColor: "#FFB04D",
    shadowOpacity: 1,
    shadowRadius: 14,
  },
  perkText: { marginTop: 2, color: "#FFFFFF", fontSize: 13.5, lineHeight: 17, fontWeight: "800" },
  footer: { alignSelf: "stretch", marginTop: 18 },
  ctaSlab: { borderRadius: 20, backgroundColor: "#C98A00", paddingBottom: 5 },
  ctaFace: {
    height: 58,
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  ctaShine: { position: "absolute", top: -20, bottom: -20, left: 0, width: 44, backgroundColor: "rgba(255,255,255,0.55)" },
  ctaText: { flexShrink: 1, color: "#4A2E00", fontSize: 17, fontWeight: "900", letterSpacing: 0.2 },
  chipWrap: { position: "absolute", left: 0, right: 0, alignItems: "center" },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(10,8,30,0.6)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },
  chipText: { color: "#FFFFFF", fontSize: 13.5, fontWeight: "800" },
  skipWrap: { position: "absolute", right: 14 },
  skip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  skipText: { color: "rgba(255,255,255,0.85)", fontSize: 12.5, fontWeight: "800" },
});
