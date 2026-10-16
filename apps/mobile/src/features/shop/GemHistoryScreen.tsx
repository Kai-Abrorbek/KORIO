import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import SwipePager from "@/components/common/SwipePager";
import { useSegmentTextColor, useSegmentThumb } from "@/components/common/SwipeSlides";
import * as Haptics from "@/utils/haptics";
import { useAuthStore } from "@/store/auth.store";
import {
  GemService,
  type GemHistoryType,
  type GemSummary,
  type GemTx,
} from "@/services/gem.service";
import {
  GEM_LOOK,
  GEM_LOOK_FALLBACK,
  dayKeyOf,
  describeGemTx,
  groupByDay,
  timeOf,
} from "./gemHistory";

/**
 * 보석 내역 — 상점 보석 카드의 "내역" · 상단 보석 칩에서 들어온다.
 * 텔레그램 미니앱 gem-history-screen 과 같은 화면.
 *
 * - 위: 지금 잔액 + 이번 달 받은/쓴 보석
 * - 전체 / 받은 보석 / 쓴 보석 — 버튼이나 옆으로 밀어서 넘긴다 (탭마다 목록·스크롤이 따로)
 * - 날짜별로 묶고, 줄마다 어디서(아이콘·제목·설명)·언제·얼마
 * - 기록은 서버 장부(gem_transactions)가 생긴 뒤부터만 있다 — 끝에 그렇다고 말한다
 */
const TYPES: GemHistoryType[] = ["all", "in", "out"];
const WAITING = require("../../../assets/images/characters/hangulmon_waiting_float.png");
const fmt = (n: number) => Math.abs(n).toLocaleString("en-US");

export default function GemHistoryScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const s = styles(theme);
  const [tab, setTab] = useState<GemHistoryType>("all");
  const [summary, setSummary] = useState<GemSummary | null>(null);
  const progress = useSharedValue(0);

  useEffect(() => {
    let alive = true;
    GemService.summary()
      .then((next) => {
        if (!alive) return;
        setSummary(next);
        // 상점·홈 숫자도 같이 맞춘다
        const cur = useAuthStore.getState().user;
        if (cur) useAuthStore.getState().setUserData({ ...cur, gems: next.balance } as never);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  // 미는 동안 탭이 바뀌어도 목록은 다시 그리지 않는다
  const pages = useMemo(() => TYPES.map((type) => <HistoryList key={type} type={type} />), []);

  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/shop");
  };

  return (
    <View style={[s.container, { paddingTop: insets.top + 6 }]}>
      <View style={s.header}>
        <Pressable onPress={close} hitSlop={12} style={s.headerBtn}>
          <Ionicons name="chevron-back" size={26} color={theme.textSecondary} />
        </Pressable>
        <Text style={s.headerTitle}>{t("gemHistory.title")}</Text>
        <View style={s.headerBtn} />
      </View>

      <SummaryCard summary={summary} />

      <HistoryTabs
        onChange={(next) => {
          void Haptics.selectionAsync();
          setTab(next);
        }}
        progress={progress}
      />

      <SwipePager
        index={TYPES.indexOf(tab)}
        onIndexChange={(next) => setTab(TYPES[next] ?? "all")}
        pages={pages}
        progress={progress}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: insets.bottom + 28 }}
      />
    </View>
  );
}

function SummaryCard({ summary }: { summary: GemSummary | null }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  // 카드 위로 광택이 천천히 지나간다
  const gloss = useSharedValue(0);
  useEffect(() => {
    gloss.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1800 }),
        withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
    );
  }, [gloss]);
  const glossStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -120 + gloss.value * 560 }, { skewX: "-20deg" }],
  }));

  return (
    <LinearGradient
      colors={["#5B4BD8", "#8B6BF2", "#3BB6E5"]}
      locations={[0, 0.55, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.summary}
    >
      <Animated.View pointerEvents="none" style={[s.summaryGloss, glossStyle]} />
      <View style={s.summaryMain}>
        <Text style={s.summaryLabel}>{t("gemHistory.balance")}</Text>
        <View style={s.summaryAmountRow}>
          <Ionicons name="diamond" size={22} color="#9CE8FF" />
          <Text style={s.summaryAmount}>{summary ? fmt(summary.balance) : "—"}</Text>
        </View>
      </View>
      <View style={s.summaryStats}>
        <Stat color="#1DBB7F" icon="arrow-down" label={t("gemHistory.monthIn")} value={summary ? `+${fmt(summary.monthIn)}` : "—"} />
        <Stat color="#E5379B" icon="arrow-up" label={t("gemHistory.monthOut")} value={summary ? `−${fmt(summary.monthOut)}` : "—"} />
      </View>
    </LinearGradient>
  );
}

function Stat({
  color,
  icon,
  label,
  value,
}: {
  color: string;
  icon: "arrow-down" | "arrow-up";
  label: string;
  value: string;
}) {
  const theme = useTheme();
  const s = styles(theme);
  return (
    <View style={s.stat}>
      <View style={[s.statIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={13} color="#fff" />
      </View>
      <View style={{ flexShrink: 1 }}>
        <Text style={s.statValue}>{value}</Text>
        <Text style={s.statLabel} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </View>
  );
}

/** 전체 / 받은 / 쓴 — 선택 배경과 글자색이 미는 만큼 따라온다 */
function HistoryTabs({
  onChange,
  progress,
}: {
  onChange: (type: GemHistoryType) => void;
  progress: SharedValue<number>;
}) {
  const theme = useTheme();
  const s = styles(theme);
  const { onLayout, thumbStyle } = useSegmentThumb(progress, {
    border: 2,
    count: TYPES.length,
    gap: 4,
    inset: 4,
  });
  return (
    <View style={s.tabs} onLayout={onLayout}>
      <Animated.View style={[s.tabThumb, thumbStyle]} />
      {TYPES.map((type, slot) => (
        <TabButton key={type} onPress={() => onChange(type)} progress={progress} slot={slot} type={type} />
      ))}
    </View>
  );
}

function TabButton({
  onPress,
  progress,
  slot,
  type,
}: {
  onPress: () => void;
  progress: SharedValue<number>;
  slot: number;
  type: GemHistoryType;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  const color = useSegmentTextColor(progress, slot, theme.textSecondary, "#fff");
  return (
    <Pressable style={s.tab} onPress={onPress}>
      <Animated.Text style={[s.tabText, color]} numberOfLines={1}>
        {t(`gemHistory.tabs.${type}`)}
      </Animated.Text>
    </Pressable>
  );
}

function HistoryList({ type }: { type: GemHistoryType }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  const [items, setItems] = useState<GemTx[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const [more, setMore] = useState(false);

  const load = useCallback(
    async (before: string | null) => {
      if (before) setMore(true);
      else setState("loading");
      try {
        const page = await GemService.history(type, before);
        setItems((current) => (before ? [...current, ...page.items] : page.items));
        setCursor(page.nextCursor);
        setState("ready");
      } catch {
        if (!before) setState("failed");
      } finally {
        setMore(false);
      }
    },
    [type],
  );

  useEffect(() => {
    void load(null);
  }, [load]);

  if (state === "loading") {
    return (
      <View style={s.skeletons}>
        {[0, 1, 2, 3, 4].map((i) => (
          <SkeletonRow key={i} index={i} />
        ))}
      </View>
    );
  }

  if (state === "failed") {
    return (
      <View style={s.center}>
        <Ionicons name="cloud-offline-outline" size={30} color={theme.textSecondary} />
        <Text style={s.centerText}>{t("gemHistory.loadFailed")}</Text>
        <Pressable
          onPress={() => void load(null)}
          style={({ pressed }) => [s.retryBtn, pressed && { transform: [{ translateY: 2 }], borderBottomWidth: 1 }]}
        >
          <Ionicons name="refresh" size={15} color="#fff" />
          <Text style={s.retryText}>{t("common.retry")}</Text>
        </Pressable>
      </View>
    );
  }

  if (!items.length) {
    return (
      <View style={s.center}>
        <FloatingMascot />
        <Text style={s.emptyTitle}>{t(`gemHistory.empty.${type}`)}</Text>
        <Text style={s.centerText}>{t("gemHistory.emptyDesc")}</Text>
        <Text style={s.emptyNote}>{t("gemHistory.sinceNote")}</Text>
      </View>
    );
  }

  const today = dayKeyOf(new Date());
  const yesterday = dayKeyOf(new Date(Date.now() - 86_400_000));
  let row = 0;

  return (
    <View>
      {groupByDay(items).map((group) => (
        <View key={group.day} style={s.day}>
          <Text style={s.dayTitle}>
            {group.day === today
              ? t("gemHistory.today")
              : group.day === yesterday
                ? t("gemHistory.yesterday")
                : group.day}
          </Text>
          <View style={s.dayCard}>
            {group.items.map((item) => {
              const index = row++;
              return <HistoryRow first={group.items[0] === item} index={index} item={item} key={item.id} />;
            })}
          </View>
        </View>
      ))}

      {cursor ? (
        <Pressable
          disabled={more}
          onPress={() => void load(cursor)}
          style={({ pressed }) => [s.moreBtn, pressed && { transform: [{ translateY: 2 }], borderBottomWidth: 2 }]}
        >
          {more ? (
            <ActivityIndicator color={theme.primary} />
          ) : (
            <Text style={s.moreText}>{t("gemHistory.loadMore")}</Text>
          )}
        </Pressable>
      ) : (
        <Text style={s.since}>{t("gemHistory.sinceNote")}</Text>
      )}
    </View>
  );
}

function HistoryRow({ first, index, item }: { first: boolean; index: number; item: GemTx }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  const look = GEM_LOOK[item.source] ?? GEM_LOOK_FALLBACK;
  const { title, details } = describeGemTx(item, t);
  const plus = item.amount > 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index, 10) * 35).duration(320)}
      style={[s.row, !first && s.rowBorder]}
    >
      <View style={[s.rowIcon, { backgroundColor: look.color + "26" }]}>
        <Ionicons name={look.icon} size={18} color={look.color} />
      </View>
      <View style={s.rowText}>
        <Text style={s.rowTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={s.rowMeta} numberOfLines={1}>
          {[...details, timeOf(item.createdAt)].join(" · ")}
        </Text>
      </View>
      <View style={s.amount}>
        <Text style={[s.amountText, { color: plus ? "#1DBB7F" : "#E5379B" }]}>
          {plus ? "+" : "−"}
          {fmt(item.amount)}
        </Text>
        <Ionicons name="diamond" size={13} color="#3BB6E5" />
      </View>
    </Animated.View>
  );
}

function SkeletonRow({ index }: { index: number }) {
  const theme = useTheme();
  const s = styles(theme);
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withRepeat(withTiming(1, { duration: 600 + index * 90 }), -1, true);
  }, [v, index]);
  const style = useAnimatedStyle(() => ({ opacity: 0.55 + v.value * 0.45 }));
  return <Animated.View style={[s.skeleton, style]} />;
}

/** 빈 화면의 한글몬 — 둥실 */
function FloatingMascot() {
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
  }, [v]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: -6 * v.value }] }));
  return (
    <Animated.View style={style}>
      <Image source={WAITING} style={{ width: 120, height: 120 }} resizeMode="contain" />
    </Animated.View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 14,
      paddingBottom: 6,
    },
    headerBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
    headerTitle: { fontSize: 19, fontWeight: "900", color: theme.text },

    summary: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginHorizontal: 20,
      marginTop: 4,
      marginBottom: 16,
      padding: 16,
      borderRadius: 22,
      overflow: "hidden",
    },
    summaryGloss: {
      position: "absolute",
      top: -20,
      bottom: -20,
      width: 70,
      backgroundColor: "rgba(255,255,255,0.18)",
    },
    summaryMain: { flex: 1, minWidth: 0 },
    summaryLabel: {
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 0.4,
      color: "rgba(255,255,255,0.78)",
    },
    summaryAmountRow: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 2 },
    summaryAmount: { fontSize: 32, fontWeight: "900", color: "#fff", letterSpacing: -0.5 },
    summaryStats: { gap: 8 },
    stat: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      minWidth: 132,
      maxWidth: 170,
      paddingVertical: 7,
      paddingLeft: 7,
      paddingRight: 10,
      borderRadius: 14,
      backgroundColor: "rgba(255,255,255,0.16)",
    },
    statIcon: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    statValue: { fontSize: 15, lineHeight: 17, fontWeight: "900", color: "#fff" },
    statLabel: { fontSize: 10, lineHeight: 13, fontWeight: "700", color: "rgba(255,255,255,0.8)" },

    tabs: {
      flexDirection: "row",
      gap: 4,
      marginHorizontal: 20,
      marginBottom: 6,
      padding: 4,
      borderRadius: 999,
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    tabThumb: { backgroundColor: "#776ee2", borderRadius: 999 },
    tab: { flex: 1, alignItems: "center", paddingVertical: 10 },
    tabText: { fontSize: 13.5, fontWeight: "900" },

    day: { marginHorizontal: 20, marginBottom: 14 },
    dayTitle: {
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 0.3,
      color: theme.textSecondary,
      marginTop: 6,
      marginBottom: 8,
      marginLeft: 4,
    },
    dayCard: {
      borderRadius: 18,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      paddingVertical: 12,
      paddingHorizontal: 14,
    },
    rowBorder: { borderTopWidth: StyleSheet.hairlineWidth * 2, borderTopColor: theme.border },
    rowIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    rowText: { flex: 1, minWidth: 0, gap: 2 },
    rowTitle: { fontSize: 14.5, fontWeight: "800", color: theme.text },
    rowMeta: { fontSize: 11.5, fontWeight: "700", color: theme.textSecondary },
    amount: { flexDirection: "row", alignItems: "center", gap: 3 },
    amountText: { fontSize: 16, fontWeight: "900" },

    moreBtn: {
      alignSelf: "center",
      minWidth: 200,
      minHeight: 44,
      paddingHorizontal: 18,
      marginTop: 4,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 14,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    moreText: { fontSize: 13, fontWeight: "900", color: theme.text },
    since: {
      fontSize: 11.5,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 2,
      marginHorizontal: 24,
      marginBottom: 12,
    },

    center: { alignItems: "center", gap: 6, paddingVertical: 26, paddingHorizontal: 32 },
    centerText: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
    },
    emptyTitle: { fontSize: 17, fontWeight: "900", color: theme.text, marginTop: 4 },
    emptyNote: {
      fontSize: 11,
      fontWeight: "700",
      color: theme.textSecondary,
      opacity: 0.8,
      marginTop: 10,
      textAlign: "center",
    },
    retryBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 8,
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 14,
      backgroundColor: "#776ee2",
      borderBottomWidth: 3,
      borderBottomColor: "#5448E0",
    },
    retryText: { fontSize: 13, fontWeight: "900", color: "#fff" },
    skeletons: { gap: 10, marginHorizontal: 20, marginTop: 10 },
    skeleton: {
      height: 62,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
  });
