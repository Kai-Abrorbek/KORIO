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
  FadeInDown,
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
  type RankBreakdown,
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

/**
 * 결과 본문.
 *
 * 예전엔 큰 숫자 하나 + 얇은 막대 세 줄이었다. 정보는 다 있는데 **설정 화면처럼**
 * 생겨서, 눌러서 연 보람이 없었다. 순위는 이 앱에서 제일 감정적인 숫자다.
 *
 * 그래서 셋으로 나눴다:
 *   1) 내가 누구인가 — 칭호 배지 + 등수 + 상위 몇 %
 *   2) 내가 어디 서 있나 — 1위부터 꼴찌까지의 줄 위에 내 점 하나
 *   3) 무엇이 그 등수를 만들었나 — 실력·학습량·꾸준함 카드 세 장
 * 마지막에 "그래서 뭘 하면 되나" 를 한 줄.
 *
 * 색은 항목마다 다르게 준다. 같은 색 막대 세 개는 눈이 구분을 못 해서 읽는 걸
 * 포기한다. 대신 이름과 값을 항상 같이 적어서 색만으로 뜻을 전하지 않는다.
 */
const STAT_STYLE: Record<
  RankBreakdown["key"],
  { color: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  proficiency: { color: "#FFD24A", icon: "school" },
  volume: { color: "#6FE3FF", icon: "flash" },
  consistency: { color: "#7BE495", icon: "flame" },
};

function RankResult({ data, accent }: { data: MyRank; accent: string }) {
  const { t } = useTranslation();

  const pop = useSharedValue(0);
  const line = useSharedValue(0);
  useEffect(() => {
    pop.value = withDelay(60, withSpring(1, { damping: 12, stiffness: 160 }));
    line.value = withDelay(260, withTiming(1, { duration: 760, easing: Easing.out(Easing.cubic) }));
  }, []);

  const popStyle = useAnimatedStyle(() => ({
    opacity: pop.value,
    transform: [{ scale: 0.72 + pop.value * 0.28 }],
  }));

  // 내가 앞선 비율. 상위 3.2% 면 96.8% 를 앞선 것이다.
  // 2% 아래로는 안 내린다 — 0 이면 점이 줄 왼쪽 끝에 박혀서 "꼴찌" 처럼 보인다
  const ahead = Math.max(2, Math.min(100, 100 - (data.percentile ?? 100)));
  const fillStyle = useAnimatedStyle(() => ({ width: `${ahead * line.value}%` }));
  const dotStyle = useAnimatedStyle(() => ({ left: `${ahead * line.value}%` }));

  return (
    <>
      {/* ── 1) 내가 누구인가 ── */}
      <Animated.View style={[s.hero, popStyle]}>
        <View style={[s.tierChip, { borderColor: accent + "66", backgroundColor: accent + "1F" }]}>
          <Ionicons name={TIER[data.tier ?? "starter"].icon} size={13} color={accent} />
          <Text style={[s.tierChipText, { color: accent }]}>
            {t(`rank.tier.${data.tier ?? "starter"}`)}
          </Text>
        </View>

        <AnimatedCount
          to={data.rank ?? 0}
          prefix={t("rank.prefix")}
          suffix={t("rank.suffix")}
          style={[s.rankNum, { color: accent }]}
        />
        <Text style={s.ofTotal}>
          {t("rank.ofTotal", { total: data.total.toLocaleString() })}
        </Text>
      </Animated.View>

      {/* ── 2) 내가 어디 서 있나 ── */}
      <View style={s.posBlock}>
        <View style={s.posTrack}>
          <Animated.View style={[s.posFill, { backgroundColor: accent }, fillStyle]} />
          <Animated.View style={[s.posDot, { borderColor: accent }, dotStyle]} />
        </View>
        <View style={s.posEnds}>
          <Text style={s.posEndText}>
            {t("rank.prefix")}1{t("rank.suffix")}
          </Text>
          <Text style={[s.posEndText, { color: accent }]}>
            {t("rank.topPercent", { p: data.percentile })}
          </Text>
          <Text style={s.posEndText}>
            {t("rank.prefix")}
            {data.total.toLocaleString()}
            {t("rank.suffix")}
          </Text>
        </View>
      </View>

      {/* ── 3) 무엇이 그 등수를 만들었나 ── */}
      <View style={s.stats}>
        {data.breakdown.map((b, i) => (
          <StatCard
            key={b.key}
            label={t(`rank.breakdown.${b.key}`)}
            value={
              b.key === "proficiency"
                ? t("rank.levelValue", { level: b.raw })
                : b.key === "volume"
                  ? t("rank.xpValue", { xp: b.raw.toLocaleString() })
                  : t("rank.dayValue", { days: b.raw })
            }
            ratio={b.value}
            color={STAT_STYLE[b.key].color}
            icon={STAT_STYLE[b.key].icon}
            delay={320 + i * 90}
          />
        ))}
      </View>

      {/* ── 그래서 뭘 하면 되나 ── */}
      <Animated.View entering={FadeIn.delay(620).duration(300)} style={s.cta}>
        <Ionicons
          name={data.rank === 1 ? "trophy" : data.xpToNextRank == null ? "sparkles" : "arrow-up"}
          size={13}
          color="#fff"
        />
        <Text style={s.ctaText}>
          {data.rank === 1
            ? t("rank.first")
            : data.xpToNextRank == null
              ? t("rank.nextRankMaxed")
              : t("rank.nextRank", { xp: data.xpToNextRank.toLocaleString() })}
        </Text>
      </Animated.View>
    </>
  );
}

/** 지표 한 장. 막대는 카드 안에서 자라난다 — 세 장이 차례로 들어오며 채워진다 */
function StatCard({
  label,
  value,
  ratio,
  color,
  icon,
  delay,
}: {
  label: string;
  value: string;
  ratio: number;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  delay: number;
}) {
  const grow = useSharedValue(0);
  useEffect(() => {
    grow.value = withDelay(
      delay + 120,
      withTiming(1, { duration: 620, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay]);

  // 0 이어도 흔적은 남긴다 — 빈 막대는 "고장" 처럼 보인다
  const width = Math.round(Math.max(0.04, Math.min(1, ratio)) * 100);
  const fill = useAnimatedStyle(() => ({ width: `${width * grow.value}%` }));

  return (
    <Animated.View entering={FadeInDown.delay(delay).springify().damping(14)} style={s.stat}>
      <View style={s.statHead}>
        <Ionicons name={icon} size={12} color={color} />
        <Text style={s.statLabel} numberOfLines={1}>
          {label}
        </Text>
      </View>
      <Text style={[s.statValue, { color }]} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <View style={s.statTrack}>
        <Animated.View style={[s.statFill, { backgroundColor: color }, fill]} />
      </View>
    </Animated.View>
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

  // ── 1) 칭호 + 등수 ──
  hero: { alignItems: "center" },
  tierChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tierChipText: { fontSize: 12, fontWeight: "800", letterSpacing: 0.2 },
  rankNum: {
    fontSize: 54,
    fontWeight: "900",
    letterSpacing: -1.5,
    marginTop: 6,
    textAlign: "center",
    padding: 0,
  },
  ofTotal: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12.5,
    textAlign: "center",
    marginTop: -4,
  },

  // ── 2) 줄 위의 내 자리 ──
  posBlock: { marginTop: 18 },
  posTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    justifyContent: "center",
  },
  posFill: { height: 8, borderRadius: 999 },
  posDot: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 999,
    marginLeft: -8,
    backgroundColor: "#fff",
    borderWidth: 3,
  },
  posEnds: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 7,
  },
  posEndText: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
    fontWeight: "700",
  },

  // ── 3) 지표 카드 세 장 ──
  stats: { flexDirection: "row", gap: 8, marginTop: 16 },
  stat: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingTop: 9,
    paddingBottom: 10,
    gap: 5,
  },
  statHead: { flexDirection: "row", alignItems: "center", gap: 4 },
  statLabel: {
    flex: 1,
    color: "rgba(255,255,255,0.78)",
    fontSize: 11,
    fontWeight: "700",
  },
  statValue: { fontSize: 15, fontWeight: "900", letterSpacing: -0.3 },
  statTrack: {
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    overflow: "hidden",
  },
  statFill: { height: 5, borderRadius: 999 },

  // ── 다음 한 걸음 ──
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    alignSelf: "center",
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  ctaText: { color: "#fff", fontSize: 12.5, fontWeight: "700" },

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
