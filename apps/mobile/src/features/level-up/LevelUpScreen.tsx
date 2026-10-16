import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
} from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useAudioPlayer, type AudioPlayer } from "expo-audio";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";
import AvatarPreview, { WearShapes } from "@/components/avatar/AvatarPreview";
import {
  CINEMA,
  CINEMA_SOUND_CUES,
  CLOUD_BOX,
  CLOUD_SHAPES,
  CLOUDS,
  COUNT_WORDS,
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
  type CinemaSound,
  type ExhaustParticle,
} from "@/components/level-up/levelUpCinematic";
import { useAuthStore } from "@/store/auth.store";
import { useSettingsStore } from "@/store/settings.store";
import { mergeAvatarConfig } from "@/types/avatar";
import { activatePlaybackAudio } from "@/utils/audio-session";
import { clearLevelUp, currentLevelUp, type LevelUpPayload } from "./levelUp";

/**
 * 레벨업 연출 — "한글 로켓" (텔레그램 features/level-up/ui/level-up-screen 과 같다).
 * 그림·시간표는 components/level-up/levelUpCinematic. 시계 하나(clock, ms)를 reanimated 로
 * 돌리고, 부위마다 그 시계로 자기 자리를 계산한다 (UI 스레드).
 */

/** 로켓 다리 끝 (로켓 캔버스) — 발사대 윗면이 여기 닿는다 */
const ROCKET_FOOT_Y = 314;

const SOURCES: Record<CinemaSound, number> = {
  vo3: require("../../../assets/sounds/levelup/vo-3.mp3"),
  vo2: require("../../../assets/sounds/levelup/vo-2.mp3"),
  vo1: require("../../../assets/sounds/levelup/vo-1.mp3"),
  voGo: require("../../../assets/sounds/levelup/vo-go.mp3"),
  voArrive: require("../../../assets/sounds/levelup/vo-arrive.mp3"),
  rumble: require("../../../assets/sounds/levelup/rumble.mp3"),
  launch: require("../../../assets/sounds/levelup/launch.mp3"),
  arrive: require("../../../assets/sounds/level-up.wav"),
};

/** 소리마다 크기 — 목소리가 효과음에 묻히지 않게 (텔레그램 cinema-audio 와 같다) */
const GAIN: Record<CinemaSound, number> = {
  vo3: 1,
  vo2: 1,
  vo1: 1,
  voGo: 1,
  voArrive: 1,
  rumble: 0.55,
  launch: 0.8,
  arrive: 0.85,
};

/** 효과음 설정을 따른다 (끔·음소거면 0) */
function sfxVolumeNow() {
  const { sound, muted } = useSettingsStore.getState();
  if (sound.uiSoundsEnabled === false || muted) return 0;
  return Math.min(1, Math.max(0, sound.sfxVolume));
}

/** 시간표(CINEMA_SOUND_CUES)대로 겹쳐 튼다. 건너뛰면 남은 걸 끊고 결과부터 */
function useCinemaAudio() {
  const players: Record<CinemaSound, AudioPlayer> = {
    vo3: useAudioPlayer(SOURCES.vo3),
    vo2: useAudioPlayer(SOURCES.vo2),
    vo1: useAudioPlayer(SOURCES.vo1),
    voGo: useAudioPlayer(SOURCES.voGo),
    voArrive: useAudioPlayer(SOURCES.voArrive),
    rumble: useAudioPlayer(SOURCES.rumble),
    launch: useAudioPlayer(SOURCES.launch),
    arrive: useAudioPlayer(SOURCES.arrive),
  };
  const playersRef = useRef(players);
  playersRef.current = players;
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    Object.values(playersRef.current).forEach((player) => {
      try {
        player.pause();
      } catch {
        // 이미 풀린 플레이어
      }
    });
  }, []);

  const playFrom = useCallback(
    (fromMs: number) => {
      stop();
      if (sfxVolumeNow() <= 0) return;
      void activatePlaybackAudio("mixWithOthers").catch(() => undefined);
      for (const cue of CINEMA_SOUND_CUES) {
        if (cue.t < fromMs) continue;
        timers.current.push(
          setTimeout(() => {
            const volume = sfxVolumeNow();
            if (volume <= 0) return;
            const player = playersRef.current[cue.sound];
            try {
              player.volume = volume * GAIN[cue.sound];
              if (player.isLoaded) void player.seekTo(0);
              player.play();
            } catch {
              // 소리 못 내도 연출은 계속
            }
          }, cue.t - fromMs),
        );
      }
    },
    [stop],
  );

  useEffect(() => stop, [stop]);
  return { playFrom, stop };
}

export default function LevelUpScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const language = useSettingsStore((s) => s.language);
  const user = useAuthStore((s) => s.user);
  const [payload] = useState<LevelUpPayload | null>(() => currentLevelUp());
  const screen = useWindowDimensions();
  const [size, setSize] = useState({ w: screen.width, h: screen.height });
  const [revealed, setRevealed] = useState(false);
  const reducedMotion = useReducedMotion();
  const clock = useSharedValue(0);
  const audio = useCinemaAudio();

  const W = size.w;
  const H = size.h;
  const aspect = H / W;
  const exhaust = useMemo(() => exhaustParticles(aspect), [aspect]);

  const finish = useCallback(() => {
    audio.stop();
    clearLevelUp();
    if (payload?.next) router.replace(payload.next);
    else if (router.canGoBack()) router.back();
    else router.replace("/(tabs)");
  }, [audio, payload, router]);

  // 직접 이 화면으로 오면(앱 재시작 등) 보여 줄 게 없다
  useEffect(() => {
    if (!payload) router.replace("/(tabs)");
  }, [payload, router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      finish();
      return true;
    });
    return () => sub.remove();
  }, [finish]);

  // 시계 — 처음부터 끝까지 한 번. 동작 줄이기면 결과부터
  useEffect(() => {
    if (!payload) return;
    const from = reducedMotion ? CINEMA.reveal : 0;
    clock.value = from;
    clock.value = withTiming(CINEMA.end, {
      duration: CINEMA.end - from,
      easing: Easing.linear,
    });
    audio.playFrom(from);
    return () => cancelAnimation(clock);
    // 한 번만 — 시작 시점의 설정으로 돈다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  useAnimatedReaction(
    () => clock.value >= CINEMA.reveal,
    (now, previous) => {
      if (now && !previous) runOnJS(setRevealed)(true);
    },
  );

  const skip = useCallback(() => {
    if (clock.value >= CINEMA.reveal) return;
    cancelAnimation(clock);
    clock.value = CINEMA.reveal;
    clock.value = withTiming(CINEMA.end, {
      duration: CINEMA.end - CINEMA.reveal,
      easing: Easing.linear,
    });
    audio.playFrom(CINEMA.reveal);
  }, [audio, clock]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (Math.abs(width - W) > 1 || Math.abs(height - H) > 1) setSize({ w: width, h: height });
  };

  // ── 자리 (px) ──
  const rocketW = ROCKET_WIDTH * W;
  const rocketScale = rocketW / ROCKET_BOX.width;
  const rocketH = ROCKET_BOX.height * rocketScale;
  const groundScale = W / GROUND_BOX.width;
  const rocketStartTop = cinemaAt(TRACK.rocketY, 0) * H - rocketH / 2;
  const groundTop = rocketStartTop + ROCKET_FOOT_Y * rocketScale - PAD_TOP_Y * groundScale;
  const planetPx = 0.68 * W;
  const planetUnit = planetPx / PLANET_BOX.size;
  const planetR = PLANET_BOX.r * planetUnit;
  const flagAngle = (32 * Math.PI) / 180;
  const flagW = 0.17 * W;
  const flagScale = flagW / FLAG_BOX.width;
  const avatarW = 0.4 * W;

  // ── 움직이는 부위 ──
  const spaceStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(TRACK.space, clock.value) }));
  const starsAStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (cinemaAt(TRACK.stars, clock.value) % 1) * H }],
  }));
  const starsBStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ((cinemaAt(TRACK.stars, clock.value) % 1) - 1) * H }],
  }));
  const groundStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cinemaAt(TRACK.ground, clock.value) * H }],
  }));
  const rocketStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cinemaAt(TRACK.rocketY, clock.value) * H - rocketH / 2 }],
  }));
  const flameStyle = useAnimatedStyle(() => {
    const t = clock.value;
    const f = cinemaAt(TRACK.flame, t);
    // 불꽃은 살짝 일렁인다 (불이라서)
    const flicker = 1 + 0.07 * Math.sin(t / 37) + 0.04 * Math.sin(t / 19);
    return { transform: [{ scaleX: 0.55 + 0.45 * f }, { scaleY: Math.max(0.001, f * flicker) }] };
  });
  const trailStyle = useAnimatedStyle(() => {
    const tr = cinemaAt(TRACK.trail, clock.value);
    return { opacity: tr, transform: [{ scaleY: 0.3 + 0.7 * tr }] };
  });
  const chipStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(TRACK.chip, clock.value) }));
  const goStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(GO_WORD.opacity, clock.value),
    transform: [{ scale: cinemaAt(GO_WORD.scale, clock.value) }],
  }));
  const planetStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: cinemaAt(TRACK.planetY, clock.value) * H - planetPx / 2 },
      { scale: cinemaAt(TRACK.planetScale, clock.value) },
    ],
  }));
  const flashStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(TRACK.flash, clock.value) }));
  const revealStyle = useAnimatedStyle(() => {
    const r = cinemaAt(TRACK.reveal, clock.value);
    return { opacity: r, transform: [{ translateY: (1 - r) * 24 }] };
  });
  const skipStyle = useAnimatedStyle(() => ({ opacity: clock.value < CINEMA.reveal ? 1 : 0 }));

  if (!payload) return <View style={styles.stage} />;

  const avatar = user?.avatar ? mergeAvatarConfig(user.avatar) : null;
  const pick = (field?: Record<string, string> | null) =>
    field ? field[language] || field.en || field.uz || "" : "";
  const n = payload.to;
  const chipText =
    payload.via === "jump"
      ? t("levelUp.introJump")
      : payload.kind === "level"
        ? t("levelUp.introLevel", { n: payload.from ?? Math.max(1, n - 1) })
        : t("levelUp.introSection", { n: payload.from ?? Math.max(1, n - 1) });
  const kind = payload.kind === "level" ? "Level" : payload.kind === "course" ? "Course" : "Section";
  const serverTitle = payload.kind === "course" ? "" : pick(payload.title);
  const serverBody = payload.kind === "course" ? "" : pick(payload.description);
  const revealTop = cinemaAt(TRACK.planetY, CINEMA.end) * H + planetPx / 2 + 28;

  return (
    <View style={styles.stage} onLayout={onLayout}>
      {/* 하늘 — 저녁 → 우주 */}
      <LinearGradient
        colors={["#2A1E6B", "#4B37A8", "#8A5FD0", "#F2A6C8"]}
        locations={[0, 0.46, 0.74, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, spaceStyle]}>
        <LinearGradient
          colors={["#2A2172", "#120D36", "#07061A"]}
          locations={[0, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      {[starsAStyle, starsBStyle].map((style, index) => (
        <Animated.View key={index} pointerEvents="none" style={[StyleSheet.absoluteFill, style]}>
          <Svg width={W} height={H}>
            {STARS.map((star, i) => (
              <Circle key={i} cx={star.x * W} cy={star.y * H} r={star.r} fill="#FFFFFF" opacity={star.o} />
            ))}
          </Svg>
        </Animated.View>
      ))}
      {WARP_LINES.map((line, i) => (
        <WarpLine key={i} line={line} clock={clock} W={W} H={H} />
      ))}

      {/* 구름 */}
      {CLOUDS.map((cloud, i) => (
        <CloudPuff key={i} cloud={cloud} clock={clock} W={W} H={H} />
      ))}

      {/* 땅 — 발사대가 로켓 다리 밑에 오게 */}
      <Animated.View pointerEvents="none" style={[styles.abs, { left: 0, top: groundTop, width: W }, groundStyle]}>
        <Svg
          width={W}
          height={GROUND_BOX.height * groundScale}
          viewBox={`0 0 ${GROUND_BOX.width} ${GROUND_BOX.height}`}
        >
          <WearShapes shapes={GROUND_SHAPES} />
          {PAD_PUFFS.map((puff, i) => (
            <PadPuff key={i} puff={puff} clock={clock} />
          ))}
        </Svg>
        <View style={[styles.groundFill, { height: H }]} />
      </Animated.View>

      {/* 배기 — 자모 불꽃과 연기 */}
      {exhaust.map((particle, i) => (
        <ExhaustBit key={i} particle={particle} clock={clock} W={W} H={H} />
      ))}

      {/* 한글 로켓 — 창(ㅇ) 안에 내 얼굴 */}
      <Animated.View
        pointerEvents="none"
        style={[styles.abs, { left: W / 2 - rocketW / 2, top: 0, width: rocketW, height: rocketH }, rocketStyle]}
      >
        <Animated.View
          style={[
            styles.abs,
            {
              left: (ROCKET_BOX.nozzleX - 14) * rocketScale,
              top: (ROCKET_BOX.nozzleY + 40) * rocketScale,
              width: 28 * rocketScale,
              height: 0.42 * H,
              transformOrigin: "top",
              borderRadius: 999,
              overflow: "hidden",
            },
            trailStyle,
          ]}
        >
          <LinearGradient
            colors={["rgba(255,212,92,0.95)", "rgba(255,122,69,0.55)", "rgba(255,179,218,0.25)", "rgba(255,179,218,0)"]}
            locations={[0, 0.3, 0.62, 1]}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.abs,
            {
              left: (ROCKET_BOX.nozzleX - FLAME_BOX.originX) * rocketScale,
              top: (ROCKET_BOX.nozzleY - 2) * rocketScale,
              width: FLAME_BOX.width * rocketScale,
              height: FLAME_BOX.height * rocketScale,
              transformOrigin: "top",
            },
            flameStyle,
          ]}
        >
          <Svg width="100%" height="100%" viewBox={`0 0 ${FLAME_BOX.width} ${FLAME_BOX.height}`}>
            <WearShapes shapes={FLAME_SHAPES} />
          </Svg>
        </Animated.View>
        <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 ${ROCKET_BOX.width} ${ROCKET_BOX.height}`}>
          <WearShapes shapes={ROCKET_SHAPES} />
        </Svg>
        <View
          style={[
            styles.window,
            {
              left: (ROCKET_WINDOW.cx - ROCKET_WINDOW.r) * rocketScale,
              top: (ROCKET_WINDOW.cy - ROCKET_WINDOW.r) * rocketScale,
              width: ROCKET_WINDOW.r * 2 * rocketScale,
              height: ROCKET_WINDOW.r * 2 * rocketScale,
              borderRadius: ROCKET_WINDOW.r * rocketScale,
            },
          ]}
        >
          {avatar ? (
            <View style={{ marginLeft: -0.06 * ROCKET_WINDOW.r * 2 * rocketScale, marginTop: -0.02 * ROCKET_WINDOW.r * 2 * rocketScale }}>
              <AvatarPreview avatar={avatar} variant="head" showBackground={false} size={ROCKET_WINDOW.r * 2 * rocketScale * 1.12} />
            </View>
          ) : null}
        </View>
        <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 ${ROCKET_BOX.width} ${ROCKET_BOX.height}`}>
          <WearShapes shapes={ROCKET_GLASS} />
        </Svg>
      </Animated.View>

      {/* 도착할 행성 — 위에서 내려온다. 착륙하면 내 아바타가 깃발 옆에서 손을 흔든다 */}
      <Animated.View
        pointerEvents="none"
        style={[styles.abs, { left: W / 2 - planetPx / 2, top: 0, width: planetPx, height: planetPx }, planetStyle]}
      >
        <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 ${PLANET_BOX.size} ${PLANET_BOX.size}`}>
          <WearShapes shapes={PLANET_BACK} />
          <WearShapes shapes={PLANET_SHAPES} />
        </Svg>
        <View style={[StyleSheet.absoluteFill, styles.center]}>
          <Text style={[styles.planetNumber, { fontSize: planetPx * 0.3 }]}>{n}</Text>
        </View>
        <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 ${PLANET_BOX.size} ${PLANET_BOX.size}`}>
          <WearShapes shapes={PLANET_FRONT} />
        </Svg>
        {revealed ? (
          <>
            <View
              style={[
                styles.abs,
                {
                  left: planetPx / 2 + planetR * Math.sin(flagAngle) - 12 * flagScale,
                  top: planetPx / 2 - planetR * Math.cos(flagAngle) - 118 * flagScale,
                  width: flagW,
                  height: FLAG_BOX.height * flagScale,
                },
              ]}
            >
              <Svg width="100%" height="100%" viewBox={`0 0 ${FLAG_BOX.width} ${FLAG_BOX.height}`}>
                <WearShapes shapes={FLAG_SHAPES} />
              </Svg>
              <Text
                style={[
                  styles.flagNumber,
                  {
                    left: FLAG_BOX.textX * flagScale - 20,
                    top: FLAG_BOX.textY * flagScale - 14 * flagScale,
                    fontSize: 22 * flagScale,
                  },
                ]}
              >
                {n}
              </Text>
            </View>
            {avatar ? (
              <View
                style={[
                  styles.abs,
                  {
                    left: planetPx / 2 - avatarW * 0.62,
                    top: planetPx / 2 - planetR - avatarW * (340 / 320) + 8,
                    width: avatarW,
                    height: avatarW * (360 / 320),
                  },
                ]}
              >
                <AvatarPreview avatar={avatar} size={avatarW * (360 / 320)} showBackground={false} alive greet />
              </View>
            ) : null}
          </>
        ) : null}
      </Animated.View>

      {/* 카운트다운 — 셋 · 둘 · 하나 · 출발! */}
      <View pointerEvents="none" style={[styles.countBox, { top: H * 0.15 }]}>
        {COUNT_WORDS.map((word) => (
          <CountWord key={word.ko} word={word} clock={clock} sub={word.sub} />
        ))}
        <Animated.View style={[styles.count, goStyle]}>
          <Text style={styles.countWord}>출발!</Text>
          {language === "ko" ? null : <Text style={styles.countSub}>{t("levelUp.go")}</Text>}
        </Animated.View>
      </View>

      <Animated.View pointerEvents="none" style={[styles.chip, { top: insets.top + H * 0.06 }, chipStyle]}>
        <Text style={styles.chipText} numberOfLines={1}>
          {chipText}
        </Text>
      </Animated.View>

      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, flashStyle]}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="levelUpFlash" cx="50%" cy="40%" r="75%">
              <Stop offset="0" stopColor="#FFFFFF" />
              <Stop offset="0.45" stopColor="#E9E4FF" />
              <Stop offset="1" stopColor="#B7AEFF" />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#levelUpFlash)" />
        </Svg>
      </Animated.View>

      {/* 결과 — 새 섹션 제목·설명 */}
      <Animated.View pointerEvents="none" style={[styles.reveal, { top: revealTop }, revealStyle]}>
        <Text style={styles.kicker}>{t(`levelUp.kicker${kind}`)}</Text>
        <Text style={styles.title}>{serverTitle || t(`levelUp.title${kind}`, { n })}</Text>
        <Text style={styles.body} numberOfLines={3}>
          {serverBody || t(`levelUp.body${kind}`)}
        </Text>
      </Animated.View>

      <Animated.View style={[styles.skipWrap, { top: insets.top + 12 }, skipStyle]} pointerEvents={revealed ? "none" : "auto"}>
        <Pressable onPress={skip} hitSlop={10} style={styles.skip}>
          <Text style={styles.skipText}>{t("levelUp.skip")}</Text>
        </Pressable>
      </Animated.View>

      {/* 확인 버튼 — 화면 아래 고정 + 안전 영역 */}
      {revealed ? (
        <Animated.View style={[styles.footer, { paddingBottom: insets.bottom + 18 }, revealStyle]}>
          <Pressable onPress={finish} style={({ pressed }) => [styles.continue, pressed && styles.continuePressed]}>
            <Text style={styles.continueText}>{t("levelUp.continue")}</Text>
          </Pressable>
        </Animated.View>
      ) : null}
    </View>
  );
}

/* ───────── 작은 부위들 (각자 자기 animated style) ───────── */

function CountWord({
  word,
  clock,
  sub,
}: {
  word: (typeof COUNT_WORDS)[number];
  clock: SharedValue<number>;
  sub: string;
}) {
  const style = useAnimatedStyle(() => ({
    opacity: cinemaAt(word.opacity, clock.value),
    transform: [{ scale: cinemaAt(word.scale, clock.value) }],
  }));
  return (
    <Animated.View style={[styles.count, style]}>
      <Text style={styles.countWord}>{word.ko}</Text>
      <Text style={styles.countSub}>{sub}</Text>
    </Animated.View>
  );
}

function WarpLine({
  line,
  clock,
  W,
  H,
}: {
  line: (typeof WARP_LINES)[number];
  clock: SharedValue<number>;
  W: number;
  H: number;
}) {
  const style = useAnimatedStyle(() => ({
    opacity: cinemaAt(TRACK.warp, clock.value) * line.o,
    transform: [{ translateY: warpY(line, clock.value) * H }],
  }));
  return (
    <Animated.View pointerEvents="none" style={[styles.warp, { left: line.x * W, height: line.len * H }, style]}>
      <LinearGradient colors={["rgba(255,255,255,0)", "rgba(233,228,255,0.95)"]} style={StyleSheet.absoluteFill} />
    </Animated.View>
  );
}

function CloudPuff({
  cloud,
  clock,
  W,
  H,
}: {
  cloud: (typeof CLOUDS)[number];
  clock: SharedValue<number>;
  W: number;
  H: number;
}) {
  const cw = cloud.size * W;
  const ch = (cw * CLOUD_BOX.height) / CLOUD_BOX.width;
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: cloudY(cloud, clock.value) * H }],
  }));
  return (
    <Animated.View pointerEvents="none" style={[styles.abs, { left: cloud.x * W - cw / 2, top: -ch / 2, width: cw, height: ch }, style]}>
      <Svg width={cw} height={ch} viewBox={`0 0 ${CLOUD_BOX.width} ${CLOUD_BOX.height}`}>
        <WearShapes shapes={CLOUD_SHAPES} />
      </Svg>
    </Animated.View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function PadPuff({
  puff,
  clock,
}: {
  puff: (typeof PAD_PUFFS)[number];
  clock: SharedValue<number>;
}) {
  const props = useAnimatedProps(() => {
    const p = puffAt(puff, cinemaAt(TRACK.smoke, clock.value));
    return { cx: p.x, cy: p.y, r: p.r, opacity: p.opacity };
  });
  return <AnimatedCircle animatedProps={props} fill="#E9E5FF" />;
}

function ExhaustBit({
  particle,
  clock,
  W,
  H,
}: {
  particle: ExhaustParticle;
  clock: SharedValue<number>;
  W: number;
  H: number;
}) {
  const box = particle.size * W;
  const style = useAnimatedStyle(() => {
    const p = particleAt(particle, clock.value);
    return {
      opacity: p.opacity,
      transform: [
        { translateX: p.x * W - box / 2 },
        { translateY: p.y * H - box / 2 },
        { rotate: `${p.rotate}deg` },
        { scale: p.scale },
      ],
    };
  });
  return (
    <Animated.View pointerEvents="none" style={[styles.bit, { width: box, height: box }, style]}>
      {particle.glyph ? (
        <Text style={[styles.jamo, { color: particle.color, fontSize: box * 0.92, lineHeight: box }]}>
          {particle.glyph}
        </Text>
      ) : (
        <View style={[styles.smoke, { borderRadius: box / 2 }]} />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  stage: { flex: 1, backgroundColor: "#140F3A", overflow: "hidden" },
  abs: { position: "absolute" },
  center: { alignItems: "center", justifyContent: "center" },
  groundFill: { backgroundColor: "#1C1648", marginTop: -2 },
  window: { position: "absolute", overflow: "hidden", backgroundColor: "#BFE5FF" },
  warp: { position: "absolute", top: 0, width: 2, borderRadius: 2, overflow: "hidden" },
  bit: { position: "absolute", left: 0, top: 0, alignItems: "center", justifyContent: "center" },
  jamo: {
    fontWeight: "900",
    textAlign: "center",
    textShadowColor: "rgba(255,212,92,0.55)",
    textShadowRadius: 10,
  },
  smoke: { width: "100%", height: "100%", backgroundColor: "rgba(255,255,255,0.72)" },
  planetNumber: {
    color: "#FFFFFF",
    fontWeight: "900",
    textShadowColor: "#554CB5",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
    marginTop: -6,
  },
  flagNumber: { position: "absolute", width: 40, textAlign: "center", color: "#7A4C00", fontWeight: "900" },
  countBox: { position: "absolute", left: 0, right: 0 },
  count: { position: "absolute", left: 0, right: 0, top: 0, alignItems: "center" },
  countWord: {
    color: "#FFFFFF",
    fontSize: 112,
    fontWeight: "900",
    letterSpacing: -3,
    textShadowColor: "#554CB5",
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 0,
  },
  countSub: { color: "#E9E4FF", fontSize: 18, fontWeight: "800", marginTop: 6, opacity: 0.9 },
  chip: {
    position: "absolute",
    alignSelf: "center",
    maxWidth: "86%",
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.28)",
    backgroundColor: "rgba(255,255,255,0.14)",
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  chipText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  reveal: { position: "absolute", left: 24, right: 24, alignItems: "center", gap: 8 },
  kicker: {
    color: "#FFD45C",
    fontSize: 13,
    fontWeight: "900",
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "rgba(255,212,92,0.5)",
    backgroundColor: "rgba(255,212,92,0.16)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: "hidden",
  },
  title: { color: "#FFFFFF", fontSize: 30, fontWeight: "900", textAlign: "center", letterSpacing: -0.5 },
  body: { color: "#D9D3FF", fontSize: 15, fontWeight: "600", lineHeight: 22, textAlign: "center" },
  skipWrap: { position: "absolute", right: 16 },
  skip: {
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  skipText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  footer: { position: "absolute", left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 12 },
  continue: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: "#FFD45C",
    borderBottomWidth: 5,
    borderBottomColor: "#E2A83A",
    alignItems: "center",
    justifyContent: "center",
  },
  continuePressed: { borderBottomWidth: 2, transform: [{ translateY: 3 }] },
  continueText: { color: "#3A2700", fontSize: 17, fontWeight: "900" },
});
