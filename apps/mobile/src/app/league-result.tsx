import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  type SharedValue,
} from "react-native-reanimated";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Defs, Path, Polygon, RadialGradient, Stop } from "react-native-svg";
import * as Haptics from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import TierCrystal from "@/components/league/TierCrystal";
import Confetti from "@/components/lesson-complete/Confetti";
import { TIERS, getTier, getTierIndex, type TierMeta } from "@/constants/league-tiers";
import { LeagueService, LeagueResult } from "@/services/league.service";
import { cinemaAt, shakeAt } from "@/components/cinema/cinema";
import { useCinemaAudio, useCinemaClock } from "@/components/cinema/useCinema";
import {
  GEM_DING_GAP,
  RESULT_CRACKS,
  RESULT_SHARDS,
  gemDings,
  resultTimeline,
  shardAt,
  type ResultSound,
  type ResultTimeline,
} from "@/components/league/leagueResultCinematic";

const CRYSTAL = 170;
const RUNG = 30;
const RUNG_GAP = 4;

/** 이미 있는 연출 소리 + 리그 결과용 (tools/cinema-audio league 세트) */
const RESULT_SOURCES: Record<ResultSound, number> = {
  charge: require("../../assets/sounds/energy/charge.mp3"),
  burst: require("../../assets/sounds/chest/burst.mp3"),
  land: require("../../assets/sounds/lesson/stamp-thump.mp3"),
  sparkle: require("../../assets/sounds/lesson/sparkle.mp3"),
  fireworks: require("../../assets/sounds/streak/fireworks.mp3"),
  crack: require("../../assets/sounds/league/crack.mp3"),
  shatter: require("../../assets/sounds/league/shatter.mp3"),
  ding: require("../../assets/sounds/chest/gem-ding.mp3"),
  voPromote: require("../../assets/sounds/league/vo-promote.mp3"),
  voStay: require("../../assets/sounds/league/vo-stay.mp3"),
  voDemote: require("../../assets/sounds/league/vo-demote.mp3"),
};
/** 목소리가 효과음에 묻히지 않게 · 강등은 착지도 조용히 */
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

export default function LeagueResultScreen() {
  const reducedMotion = useReducedMotion();
  const [result, setResult] = useState<LeagueResult | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * 연출 미리보기 (개발 빌드 전용).
   *
   * `?preview=promote` / `?preview=demote` / `?preview=demoteXp` / `?preview=stay` 로 열면
   * 서버를 부르지 않고 가짜 결과로 연출만 보여준다. 나갈 때 ackLeagueResult 도 안 부르므로
   * **실제 리그 상태를 건드리지 않는다** — 보고 나면 그대로 원래대로다.
   *
   * 승급·강등은 주 1회 정산 때만 생기는 화면이라, 이게 없으면 연출을 고칠 때마다
   * 한 주를 기다리거나 DB 를 손으로 건드려야 한다.
   *
   *   router.push({ pathname: "/league-result", params: { preview: "promote" } })
   */
  const params = useLocalSearchParams<{ preview?: string }>();
  const preview = __DEV__ ? params.preview : undefined;

  useEffect(() => {
    if (preview) {
      const demote = preview === "demote" || preview === "demoteXp";
      const stay = preview === "stay";
      setResult({
        weekKey: "preview",
        finalRank: demote ? 27 : stay ? 12 : 2,
        fromTier: demote ? "gold" : stay ? "gold" : "silver",
        toTier: demote ? "silver" : "gold",
        change: demote ? "demote" : stay ? "stay" : "promote",
        gems: demote ? 0 : stay ? 10 : 30,
        reason: preview === "demoteXp" ? "xp" : demote ? "rank" : null,
        weeklyXp: preview === "demoteXp" ? 640 : undefined,
        requiredXp: preview === "demoteXp" ? 1500 : undefined,
      });
      setLoading(false);
      return;
    }
    LeagueService.getLeagueResult()
      .then((r) => {
        setResult(r);
        setLoading(false);
        if (!r) router.back();
      })
      .catch(() => router.back());
  }, [preview]);

  if (loading || !result) return <View style={{ flex: 1, backgroundColor: "#221A5C" }} />;

  return <ResultStage result={result} preview={!!preview} reducedMotion={reducedMotion} />;
}

/**
 * 결과 무대 — 리그 탭과 같은 밤하늘, 결과마다 다른 장면 (leagueResultCinematic).
 * 시계 하나(ms)로 모든 부위를 계산한다. 화면을 누르면 끝 장면으로.
 */
function ResultStage({
  result,
  preview,
  reducedMotion,
}: {
  result: LeagueResult;
  preview: boolean;
  reducedMotion: boolean;
}) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const tl = useMemo<ResultTimeline>(() => resultTimeline(result.change), [result.change]);
  const fromMeta = getTier(result.fromTier);
  const toMeta = getTier(result.toTier);
  const fromIdx = getTierIndex(result.fromTier);
  const toIdx = getTierIndex(result.toTier);
  const isPromote = result.change === "promote";
  const isDemote = result.change === "demote";
  const droppedByXp = isDemote && result.reason === "xp";
  const xpRatio =
    droppedByXp && (result.requiredXp ?? 0) > 0
      ? Math.min(1, (result.weeklyXp ?? 0) / (result.requiredXp ?? 1))
      : 0;

  const { clock, run } = useCinemaClock(tl.end);
  const audio = useCinemaAudio(RESULT_SOURCES, RESULT_GAIN);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [confetti, setConfetti] = useState(false);
  const [canFinish, setCanFinish] = useState(false);

  useEffect(() => {
    const from = reducedMotion ? tl.reveal : 0;
    run(from);
    audio.playFrom(reducedMotion ? tl.reveal : 0, tl.cues);
    const at = (ms: number, fn: () => void) => {
      if (ms >= from) timers.current.push(setTimeout(fn, ms - from));
    };
    for (let i = 0; i < gemDings(result.gems); i++) {
      at(tl.gemsAt + i * GEM_DING_GAP, () => audio.play("ding", { rate: Math.min(1.6, 1 + i * 0.07) }));
    }
    if (isPromote) {
      at(1300, () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
      });
      at(1880, () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      });
    } else if (isDemote) {
      at(1300, () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      });
      at(2380, () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      });
    } else {
      at(400, () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      });
    }
    const list = timers.current;
    return () => list.forEach(clearTimeout);
    // 한 번만 — 들어온 순간의 결과로 돈다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 꽃가루 · 계속 버튼은 시계를 따라 (건너뛰어도 나타난다)
  useAnimatedReaction(
    () => clock.value >= tl.confettiAt && tl.confettiAt >= 0,
    (now, previous) => {
      if (now && !previous) runOnJS(setConfetti)(true);
    },
  );
  const buttonAt = tl.tracks.button[1]?.t ?? 0;
  useAnimatedReaction(
    () => clock.value >= buttonAt,
    (now, previous) => {
      if (now && !previous) runOnJS(setCanFinish)(true);
    },
  );

  /** 화면을 누르면 끝 장면으로 (남은 효과음은 끊는다) */
  const skip = useCallback(() => {
    if (clock.value >= tl.reveal) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    audio.stop();
    run(tl.reveal);
  }, [audio, clock, run, tl.reveal]);

  const finish = async () => {
    // 미리보기는 서버에 아무것도 남기지 않는다 — 실제 결과가 있었다면
    // 그것도 그대로 남아서 다음에 정상적으로 뜬다
    if (!preview) {
      try {
        await LeagueService.ackLeagueResult();
      } catch {}
    }
    router.back();
  };

  const T = tl.tracks;
  /** 아래서 살짝 떠오르며 나타난다 */
  const useFade = (track: typeof T.title) =>
    useAnimatedStyle(() => {
      const v = Math.min(1, cinemaAt(track, clock.value));
      return { opacity: v, transform: [{ translateY: (1 - v) * 14 }] };
    });
  const rankStyle = useFade(T.rank);
  const titleStyle = useFade(T.title);
  const subStyle = useFade(T.sub);
  const xpBarStyle = useFade(T.xpBar);
  const ladderStyle = useFade(T.ladder);
  const buttonStyle = useFade(T.button);
  const gemsStyle = useAnimatedStyle(() => {
    const g = cinemaAt(T.gems, clock.value);
    return { opacity: Math.min(1, g), transform: [{ scale: Math.max(0.001, g) }] };
  });
  const xpFillStyle = useAnimatedStyle(() => ({
    width: `${cinemaAt(T.xpFill, clock.value) * xpRatio * 100}%`,
  }));
  const flashStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(T.flash, clock.value) }));
  const oldSpotStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(T.spot, clock.value) * (1 - Math.min(1, cinemaAt(T.newOpacity, clock.value))),
  }));
  const newSpotStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(T.spot, clock.value) * Math.min(1, cinemaAt(T.newOpacity, clock.value)),
  }));
  const oldStyle = useAnimatedStyle(() => {
    const now = clock.value;
    const amp = cinemaAt(T.shake, now);
    return {
      opacity: cinemaAt(T.oldOpacity, now),
      transform: [
        { translateX: amp * Math.sin(now / 23) },
        { translateY: amp * 0.6 * Math.cos(now / 31) },
        { scale: cinemaAt(T.oldScale, now) },
      ],
    };
  });
  const chargeStyle = useAnimatedStyle(() => {
    const c = cinemaAt(T.charge, clock.value);
    return { opacity: c * 0.9, transform: [{ scale: 0.7 + 0.5 * c }] };
  });
  const newStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(T.newOpacity, clock.value),
    transform: [
      { translateY: cinemaAt(T.newY, clock.value) * CRYSTAL },
      { scale: cinemaAt(T.newScale, clock.value) },
    ],
  }));
  const ringStyle = useAnimatedStyle(() => {
    const r = cinemaAt(T.ring, clock.value);
    return { opacity: r <= 0 || r >= 1 ? 0 : 0.8 * (1 - r), transform: [{ scale: 0.6 + 1.3 * r }] };
  });
  const raysStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(T.rays, clock.value) * 0.55,
    transform: [{ rotate: `${clock.value / 30}deg` }],
  }));
  const sweepStyle = useAnimatedStyle(() => {
    const p = cinemaAt(T.sweep, clock.value);
    return {
      opacity: p <= 0 || p >= 1 ? 0 : 1,
      transform: [{ translateX: -120 + p * 240 }, { rotate: "20deg" }],
    };
  });
  // 강등 크리스털이 깨지기 직전 흔들림이 무대 전체로 번지지 않게 — 승급 터짐만 화면이 쿵
  const stageShakeStyle = useAnimatedStyle(() => {
    const k = isPromote ? shakeAt(clock.value, 1300, 420, 10) : { x: 0, y: 0 };
    return { transform: [{ translateX: k.x }, { translateY: k.y }] };
  });
  const markerStyle = useAnimatedStyle(() => {
    const m = cinemaAt(T.marker, clock.value);
    const idx = fromIdx + (toIdx - fromIdx) * m;
    return { transform: [{ translateX: idx * (RUNG + RUNG_GAP) }] };
  });

  const title = isPromote
    ? t("league.result.promoteTitle")
    : isDemote
      ? t("league.result.demoteTitle")
      : t("league.result.stayTitle");
  const sub = droppedByXp
    ? t("league.result.demoteXpSub", {
        tier: t(`league.tiers.${result.fromTier}`),
        required: result.requiredXp ?? 0,
      })
    : t(
        isPromote
          ? "league.result.promoteSub"
          : isDemote
            ? "league.result.demoteSub"
            : "league.result.staySub",
        { tier: t(`league.tiers.${result.toTier}`) },
      );

  return (
    <View style={s.container}>
      <LinearGradient
        colors={["#221A5C", "#33267F", "#4B37A8"]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      {confetti ? <Confetti /> : null}

      <Pressable onPress={skip} sound={false} style={[s.stage, { paddingTop: insets.top + 16 }]}>
        <Animated.View style={[s.stageInner, stageShakeStyle]}>
          <Animated.View style={[s.rankChip, rankStyle]}>
            <Ionicons name="podium" size={16} color="#fff" />
            <Text style={s.rankText}>{t("league.result.rank", { rank: result.finalRank })}</Text>
          </Animated.View>

          <View style={s.crystalArea}>
            <Spot meta={fromMeta} style={oldSpotStyle} id="oldSpot" />
            <Spot meta={toMeta} style={newSpotStyle} id="newSpot" />
            <Animated.View style={[s.rays, raysStyle]} pointerEvents="none">
              {Array.from({ length: 12 }, (_, i) => (
                <View
                  key={i}
                  style={[s.ray, { backgroundColor: toMeta.colorLight, transform: [{ rotate: `${i * 30}deg` }] }]}
                />
              ))}
            </Animated.View>
            <Animated.View pointerEvents="none" style={[s.ring, { borderColor: toMeta.colorLight }, ringStyle]} />

            {result.change !== "stay" ? (
              <Animated.View style={[s.crystal, oldStyle]} pointerEvents="none">
                <TierCrystal tier={fromMeta} size={CRYSTAL} />
                {isDemote ? <Cracks clock={clock} track={T.crack} /> : null}
                <Animated.View style={[s.charge, chargeStyle]} />
              </Animated.View>
            ) : null}

            {RESULT_SHARDS.map((shard, i) => (
              <Shard key={i} shard={shard} clock={clock} track={T.shards} fall={isDemote} meta={fromMeta} />
            ))}

            <Animated.View style={[s.crystal, newStyle]} pointerEvents="none">
              <TierCrystal tier={toMeta} size={CRYSTAL} />
              <View style={s.sweepClip}>
                <Animated.View style={[s.sweep, sweepStyle]}>
                  <LinearGradient
                    colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0)"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={StyleSheet.absoluteFill}
                  />
                </Animated.View>
              </View>
            </Animated.View>
          </View>

          <Animated.Text style={[s.title, { textShadowColor: toMeta.colorDark }, titleStyle]}>
            {title}
          </Animated.Text>
          <Animated.Text style={[s.sub, subStyle]}>{sub}</Animated.Text>

          {/* XP 미달로 떨어졌으면 얼마가 모자랐는지 — 게이지가 모은 만큼 찬다 */}
          {droppedByXp ? (
            <Animated.View style={[s.xpWrap, xpBarStyle]}>
              <View style={s.xpTrack}>
                <Animated.View style={[s.xpFill, xpFillStyle]} />
              </View>
              <Text style={s.xpText}>
                {t("league.result.xpShort", {
                  earned: result.weeklyXp ?? 0,
                  required: result.requiredXp ?? 0,
                })}
              </Text>
            </Animated.View>
          ) : null}

          {result.gems > 0 ? (
            <Animated.View style={[s.gemChip, gemsStyle]}>
              <Ionicons name="diamond" size={20} color="#15131F" />
              <Text style={s.gemText}>{t("league.result.gems", { gems: result.gems })}</Text>
            </Animated.View>
          ) : null}

          {/* 티어 사다리 — "나" 가 옛 칸에서 새 칸으로 */}
          <Animated.View style={[s.ladderWrap, ladderStyle]}>
            <View style={s.ladder}>
              {TIERS.map((tier, i) => (
                <View key={tier.key} style={s.rung}>
                  <TierCrystal tier={tier} size={RUNG} locked={i > Math.max(fromIdx, toIdx)} />
                </View>
              ))}
              <Animated.View style={[s.marker, markerStyle]}>
                <Text style={s.markerText}>{t("league.meChip")}</Text>
              </Animated.View>
            </View>
          </Animated.View>
        </Animated.View>
      </Pressable>

      {/* 승급 — 옛 크리스털이 터지는 순간 화면이 하얗게 번쩍 */}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, s.flash, flashStyle]} />

      <Animated.View style={[s.footer, { paddingBottom: insets.bottom + 16 }, buttonStyle]}>
        <Pressable
          onPress={finish}
          disabled={!canFinish}
          style={({ pressed }) => [s.btn, pressed && s.btnPressed]}
          accessibilityRole="button"
        >
          <Text style={[s.btnT, { color: toMeta.colorDark }]}>{t("league.result.continue")}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

/** 무대 조명 — 티어 색 동그란 빛 */
function Spot({ meta, style, id }: { meta: TierMeta; style: object; id: string }) {
  return (
    <Animated.View pointerEvents="none" style={[s.spot, style]}>
      <Svg width={300} height={300}>
        <Defs>
          <RadialGradient id={id} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={meta.colorLight} stopOpacity={0.6} />
            <Stop offset="0.55" stopColor={meta.color} stopOpacity={0.2} />
            <Stop offset="1" stopColor={meta.color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={150} cy={150} r={150} fill={`url(#${id})`} />
      </Svg>
    </Animated.View>
  );
}

/** 금 — 하나씩 그어진다 */
function Cracks({ clock, track }: { clock: SharedValue<number>; track: ResultTimeline["tracks"]["crack"] }) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {RESULT_CRACKS.map((d, i) => (
        <CrackLine key={i} d={d} index={i} clock={clock} track={track} />
      ))}
    </View>
  );
}

function CrackLine({
  d,
  index,
  clock,
  track,
}: {
  d: string;
  index: number;
  clock: SharedValue<number>;
  track: ResultTimeline["tracks"]["crack"];
}) {
  const style = useAnimatedStyle(() => {
    const c = cinemaAt(track, clock.value);
    const each = Math.min(1, Math.max(0, c * RESULT_CRACKS.length - index));
    return { opacity: each };
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 115">
        <Path d={d} stroke="#FFFFFF" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={0.95} />
      </Svg>
    </Animated.View>
  );
}

/** 크리스털 조각 하나 */
function Shard({
  shard,
  clock,
  track,
  fall,
  meta,
}: {
  shard: (typeof RESULT_SHARDS)[number];
  clock: SharedValue<number>;
  track: ResultTimeline["tracks"]["shards"];
  fall: boolean;
  meta: TierMeta;
}) {
  const size = shard[3] * CRYSTAL;
  const style = useAnimatedStyle(() => {
    const p = shardAt(shard, cinemaAt(track, clock.value), fall);
    return {
      opacity: p.opacity,
      transform: [
        { translateX: p.x * CRYSTAL },
        { translateY: p.y * CRYSTAL },
        { rotate: `${p.rotate}deg` },
      ],
    };
  });
  return (
    <Animated.View pointerEvents="none" style={[s.shard, { width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Polygon points="50,0 100,70 20,100" fill={meta.color} stroke={meta.colorDark} strokeWidth={6} />
        <Polygon points="50,0 70,40 30,60" fill={meta.colorLight} opacity={0.8} />
      </Svg>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#221A5C" },
  stage: { flex: 1 },
  stageInner: { flex: 1, alignItems: "center", paddingHorizontal: 24 },
  rankChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.28)",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 99,
  },
  rankText: { color: "#fff", fontSize: 14, fontWeight: "800" },
  crystalArea: {
    width: 300,
    height: 270,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  spot: { position: "absolute", width: 300, height: 300 },
  rays: { position: "absolute", width: 300, height: 300, alignItems: "center", justifyContent: "center" },
  ray: { position: "absolute", width: 4, height: 280, borderRadius: 2, opacity: 0.5 },
  ring: { position: "absolute", width: 190, height: 190, borderRadius: 95, borderWidth: 3 },
  crystal: { position: "absolute", alignItems: "center", justifyContent: "center" },
  charge: {
    position: "absolute",
    width: CRYSTAL * 0.9,
    height: CRYSTAL * 0.9,
    borderRadius: CRYSTAL,
    backgroundColor: "#FFFFFF",
  },
  sweepClip: { ...StyleSheet.absoluteFill, overflow: "hidden", borderRadius: CRYSTAL / 2 },
  sweep: { position: "absolute", top: -40, bottom: -40, left: CRYSTAL / 2 - 30, width: 60 },
  shard: { position: "absolute" },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#fff",
    marginTop: 6,
    textAlign: "center",
    letterSpacing: -0.5,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
  },
  sub: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    color: "#D9D3FF",
    marginTop: 8,
    textAlign: "center",
  },
  xpWrap: { alignSelf: "stretch", marginTop: 16, gap: 6, alignItems: "center" },
  xpTrack: {
    alignSelf: "stretch",
    height: 14,
    borderRadius: 7,
    backgroundColor: "rgba(255,255,255,0.16)",
    overflow: "hidden",
  },
  xpFill: { height: 14, borderRadius: 7, backgroundColor: "#FF4B4B", borderBottomWidth: 3, borderBottomColor: "#D33B3B" },
  xpText: { color: "#fff", fontSize: 13, fontWeight: "800" },
  gemChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#FFD45C",
    borderBottomWidth: 3,
    borderBottomColor: "#E2A83A",
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 99,
    marginTop: 16,
  },
  gemText: { color: "#15131F", fontSize: 16, fontWeight: "900" },
  ladderWrap: { marginTop: "auto", marginBottom: 12, alignItems: "center" },
  ladder: { flexDirection: "row", gap: RUNG_GAP, paddingBottom: 24 },
  rung: { width: RUNG, alignItems: "center" },
  marker: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: RUNG,
    alignItems: "center",
  },
  markerText: {
    overflow: "hidden",
    color: "#fff",
    fontSize: 10,
    fontWeight: "900",
    backgroundColor: "#776EE2",
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  flash: { backgroundColor: "#FFFFFF" },
  footer: { paddingHorizontal: 24 },
  btn: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#C4BEF0",
  },
  btnPressed: { transform: [{ translateY: 3 }], borderBottomWidth: 2 },
  btnT: { fontSize: 17, fontWeight: "900" },
});
