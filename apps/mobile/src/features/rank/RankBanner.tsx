import { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  RankService,
  type MyRank,
  type RankTier,
} from "@/services/rank.service";
import AnimatedCount from "./AnimatedCount";

/** 결과를 띄워 두는 시간. 순위는 계속 바뀌므로 붙잡아 두면 곧 거짓말이 된다 */
const HOLD_MS = 60_000;

/**
 * 칭호별 **강조색**.
 *
 * 카드 바탕은 언제나 같은 딥퍼플이고 칭호는 색으로만 갈린다.
 * 바탕까지 칭호마다 바꾸면 금색·노란색 위에 흰 글씨가 얹혀 안 읽힌다 —
 * 등급이 올라갈수록 읽기 힘들어지는 화면이 된다. 강조만 바꾸면 대비는
 * 항상 안전하고, 등급은 배지·숫자·막대에서 충분히 드러난다.
 */
const TIER: Record<RankTier, { accent: string; icon: keyof typeof Ionicons.glyphMap }> = {
  legend: { accent: "#FFD24A", icon: "flame" },
  master: { accent: "#FF9EC0", icon: "diamond" },
  elite: { accent: "#6FE3FF", icon: "star" },
  rising: { accent: "#7BE495", icon: "trending-up" },
  steady: { accent: "#FFB865", icon: "footsteps" },
  starter: { accent: "#CFC9FF", icon: "leaf" },
};

const CARD_FROM = "#6A5DE0";
const CARD_TO = "#8B7BF5";

export default function RankBanner() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MyRank | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 남은 시간 줄 (60초). 숫자로 세면 초조해지고, 줄이면 그냥 "곧 닫힌다" 로 읽힌다
  const hold = useSharedValue(1);
  // idle 상태의 반짝임 — 누를 게 있다는 신호
  const shine = useSharedValue(0);

  useEffect(() => {
    shine.value = withRepeat(
      withSequence(
        withDelay(1800, withTiming(1, { duration: 900, easing: Easing.out(Easing.quad) })),
        withTiming(0, { duration: 0 }),
      ),
      -1,
      false,
    );
  }, []);

  const close = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setOpen(false);
    setError(null);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const reveal = useCallback(async () => {
    if (loading) return;
    if (open) {
      close();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await RankService.getMyRank();
      setData(res);
      setOpen(true);
      hold.value = 1;
      hold.value = withTiming(0, { duration: HOLD_MS, easing: Easing.linear });
      timer.current = setTimeout(close, HOLD_MS);
    } catch (e) {
      // 코드를 숨기면 왜 안 되는지 알 수가 없다
      setError(e instanceof Error ? e.message : "UNKNOWN");
      setOpen(true);
      timer.current = setTimeout(close, 6_000);
    } finally {
      setLoading(false);
    }
  }, [loading, open, close]);

  const holdStyle = useAnimatedStyle(() => ({
    width: `${Math.max(0, hold.value) * 100}%`,
  }));

  const shineStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shine.value, [0, 0.5, 1], [0, 0.35, 0]),
    transform: [{ translateX: interpolate(shine.value, [0, 1], [-160, 420]) }],
  }));

  const tier = data?.tier ? TIER[data.tier] : TIER.starter;

  return (
    <Animated.View layout={LinearTransition.duration(320)} style={s.wrap}>
      <Pressable onPress={reveal} disabled={loading}>
        <LinearGradient
          colors={[CARD_FROM, CARD_TO]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.card}
        >
          {/* 지나가는 광택 — 카드가 살아 있다는 신호 */}
          {!open && (
            <Animated.View style={[s.shine, shineStyle]} pointerEvents="none" />
          )}

          {/* ── 접힌 상태 ── */}
          <View style={s.head}>
            <View style={[s.headIcon, open && { backgroundColor: tier.accent + "33" }]}>
              <Ionicons
                name={open && data?.ranked ? tier.icon : "sparkles"}
                size={18}
                color={open && data?.ranked ? tier.accent : "#fff"}
              />
            </View>
            <View style={s.headText}>
              <Text style={s.title}>
                {open && data?.ranked
                  ? t(`rank.tier.${data.tier}`)
                  : t("rank.bannerTitle")}
              </Text>
              <Text style={s.sub}>
                {open && data?.ranked
                  ? t("rank.topPercent", { p: data.percentile })
                  : t("rank.bannerSub")}
              </Text>
            </View>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Ionicons
                name={open ? "close" : "arrow-forward"}
                size={20}
                color="#fff"
              />
            )}
          </View>

          {/* ── 펼친 상태 ── */}
          {open && (
            <Animated.View
              entering={FadeIn.duration(260)}
              exiting={FadeOut.duration(140)}
              style={s.body}
            >
              {error ? (
                <Text style={s.error}>{t("rank.error", { code: error })}</Text>
              ) : !data?.ranked ? (
                <View style={s.unranked}>
                  <Text style={s.unrankedTitle}>{t("rank.unranked.title")}</Text>
                  <Text style={s.unrankedDesc}>
                    {t("rank.unranked.desc", { total: data?.total ?? 0 })}
                  </Text>
                </View>
              ) : (
                <RankResult data={data} accent={tier.accent} />
              )}

              {/* 남은 시간 */}
              <View style={s.holdTrack}>
                <Animated.View
                  style={[s.holdFill, { backgroundColor: tier.accent }, holdStyle]}
                />
              </View>
            </Animated.View>
          )}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

/** 결과 본문 */
function RankResult({ data, accent }: { data: MyRank; accent: string }) {
  const { t } = useTranslation();
  const pop = useSharedValue(0);
  useEffect(() => {
    pop.value = withDelay(80, withSpring(1, { damping: 12, stiffness: 150 }));
  }, []);
  const popStyle = useAnimatedStyle(() => ({
    opacity: pop.value,
    transform: [{ scale: 0.7 + pop.value * 0.3 }],
  }));

  // 내가 앞선 비율. 상위 3.2% 면 96.8% 를 앞선 것이다
  const ahead = Math.max(0, Math.min(100, 100 - (data.percentile ?? 100)));

  return (
    <>
      <Animated.View style={[s.rankRow, popStyle]}>
        <AnimatedCount
          to={data.rank ?? 0}
          prefix={t("rank.prefix")}
          suffix={t("rank.suffix")}
          style={[s.rankNum, { color: accent }]}
        />
      </Animated.View>
      <Text style={s.ofTotal}>
        {t("rank.ofTotal", { total: data.total.toLocaleString() })}
      </Text>

      {/* 백분위 — 내가 어디쯤 서 있나. 막대 하나가 등수 한 줄보다 빨리 읽힌다 */}
      <View style={s.percentTrack}>
        <View style={[s.percentFill, { width: `${ahead}%`, backgroundColor: accent }]} />
        <View style={[s.percentPin, { left: `${ahead}%`, borderColor: accent }]} />
      </View>

      {/* 무엇이 이 등수를 만들었나. 색만으로는 뜻이 안 통하니 이름과 값을 항상 붙인다 */}
      <View style={s.bars}>
        {data.breakdown.map((b) => (
          <View key={b.key} style={s.barRow}>
            <Text style={s.barLabel}>{t(`rank.breakdown.${b.key}`)}</Text>
            <View style={s.barTrack}>
              <View
                style={[
                  s.barFill,
                  {
                    width: `${Math.round(Math.max(0.02, b.value) * 100)}%`,
                    backgroundColor: accent,
                  },
                ]}
              />
            </View>
            <Text style={s.barValue}>
              {b.key === "proficiency"
                ? t("rank.levelValue", { level: b.raw })
                : b.key === "volume"
                  ? t("rank.xpValue", { xp: b.raw.toLocaleString() })
                  : t("rank.dayValue", { days: b.raw })}
            </Text>
          </View>
        ))}
      </View>

      {/* 등수만 보여주면 "그래서 뭘 하라고" 가 없다. 한 칸 올라가는 값을 붙인다 */}
      <Text style={s.next}>
        {data.rank === 1
          ? t("rank.first")
          : data.xpToNextRank == null
            ? t("rank.nextRankMaxed")
            : t("rank.nextRank", { xp: data.xpToNextRank.toLocaleString() })}
      </Text>
    </>
  );
}

/**
 * 테마를 안 받는다. 카드가 자기 그라데이션 위에 흰 글씨로 서 있어서
 * 라이트/다크가 달라질 이유가 없다 — 받아 두면 쓰지도 않는 인자가 남는다.
 */
const s = StyleSheet.create({
    wrap: { marginHorizontal: 16, marginBottom: 12 },
    card: { borderRadius: 20, padding: 16, overflow: "hidden" },
    shine: {
      position: "absolute",
      top: -40,
      bottom: -40,
      width: 90,
      backgroundColor: "#fff",
      transform: [{ rotate: "18deg" }],
    },
    head: { flexDirection: "row", alignItems: "center", gap: 12 },
    headIcon: {
      width: 32,
      height: 32,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.18)",
    },
    headText: { flex: 1 },
    title: { color: "#fff", fontSize: 16, fontWeight: "800" },
    sub: { color: "rgba(255,255,255,0.78)", fontSize: 12.5, marginTop: 1 },

    body: { marginTop: 14 },
    rankRow: { alignItems: "center" },
    rankNum: {
      fontSize: 52,
      fontWeight: "900",
      letterSpacing: -1,
      // 안드로이드 TextInput 기본 패딩을 걷어낸다 (Text 와 높이를 맞추려고)
      padding: 0,
      textAlign: "center",
    },
    ofTotal: {
      color: "rgba(255,255,255,0.75)",
      fontSize: 12.5,
      textAlign: "center",
      marginTop: -2,
    },

    percentTrack: {
      height: 8,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.18)",
      marginTop: 16,
      marginBottom: 6,
      justifyContent: "center",
    },
    percentFill: { height: 8, borderRadius: 999 },
    percentPin: {
      position: "absolute",
      width: 16,
      height: 16,
      borderRadius: 999,
      marginLeft: -8,
      backgroundColor: "#fff",
      borderWidth: 3,
    },

    bars: { marginTop: 14, gap: 8 },
    barRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    barLabel: {
      width: 58,
      color: "rgba(255,255,255,0.82)",
      fontSize: 11.5,
      fontWeight: "600",
    },
    barTrack: {
      flex: 1,
      height: 6,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.18)",
    },
    barFill: { height: 6, borderRadius: 999 },
    barValue: {
      width: 74,
      textAlign: "right",
      color: "#fff",
      fontSize: 11.5,
      fontWeight: "700",
    },

    next: {
      marginTop: 14,
      color: "rgba(255,255,255,0.9)",
      fontSize: 12.5,
      fontWeight: "600",
      textAlign: "center",
    },

    holdTrack: {
      height: 3,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.16)",
      marginTop: 14,
      overflow: "hidden",
    },
    holdFill: { height: 3, borderRadius: 999 },

    unranked: { alignItems: "center", paddingVertical: 6 },
    unrankedTitle: { color: "#fff", fontSize: 15, fontWeight: "800" },
    unrankedDesc: {
      color: "rgba(255,255,255,0.8)",
      fontSize: 12.5,
      textAlign: "center",
      marginTop: 4,
      lineHeight: 18,
    },
    error: {
      color: "#fff",
      fontSize: 12.5,
      textAlign: "center",
      paddingVertical: 8,
    },
  });
