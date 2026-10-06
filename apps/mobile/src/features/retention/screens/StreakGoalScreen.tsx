import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import * as Haptics from "@/utils/haptics";
import {
  RetentionService,
  type StreakGoalOption,
  type StreakGoalPage,
} from "@/services/retention.service";
import { useAuthStore } from "@/store/auth.store";
import { useRetentionStore } from "@/store/retention.store";
import { useSettingsStore, learnModePath } from "@/store/settings.store";
import Button3D from "../components/Button3D";
import RewardDialog from "../components/RewardDialog";

const GEM = "#3BB6E5";
const FLAME = "#FF7A00";
/** "이어가면 받는 보석" 표를 몇 일 앞까지 보여줄지 */
const LOOKAHEAD_DAYS = 30;

/**
 * 연속 학습 목표.
 *
 *  1) 이렇게 이어가면 이만큼 받는다 — 연속 N일째마다 나오는 상자 보석을 앞으로
 *     30일 표로 보여준다 (서버의 STREAK_CHEST_EVERY_DAYS / GEMS)
 *  2) 목표(3·7·14·21·30일)를 고르면 **바로** 보석을 준다. 연속이 끊기면 돌려받는다
 *     (모자라면 마이너스). 숫자는 전부 서버 retention.config.ts.
 */
export default function StreakGoalScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const updateUser = useAuthStore((st) => st.updateUser);
  const refreshSummary = useRetentionStore((st) => st.refresh);
  const learnMode = useSettingsStore((st) => st.learnMode);
  const topikLevel = useSettingsStore((st) => st.topikLevel);
  const studyMode = useSettingsStore((st) => st.studyMode);

  const [page, setPage] = useState<StreakGoalPage | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [starting, setStarting] = useState(false);
  const [started, setStarted] = useState<StreakGoalOption | null>(null);

  const load = useCallback(async () => {
    try {
      const p = await RetentionService.getGoal();
      setPage(p);
      setLoadFailed(false);
      updateUser({ gems: p.gems, streak: p.streak } as any);
    } catch {
      setLoadFailed(true);
    }
  }, [updateUser]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const options = page?.options ?? [];
  const active = page?.active ?? null;
  const chosen = options.find((o) => o.days === selected) ?? null;

  // 기본 선택 — 7일 (없으면 첫 번째)
  useEffect(() => {
    if (selected === null && options.length && !active) {
      setSelected((options.find((o) => o.days === 7) ?? options[0]).days);
    }
  }, [options.length, active]);

  const start = async () => {
    if (!chosen || starting) return;
    setStarting(true);
    try {
      const p = await RetentionService.startGoal(chosen.days);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setPage(p);
      updateUser({ gems: p.gems } as any);
      setConfirming(false);
      setStarted(chosen);
      void refreshSummary();
    } catch {
      setConfirming(false);
      void load();
    } finally {
      setStarting(false);
    }
  };

  const goStudy = () => {
    router.push(learnModePath(learnMode, topikLevel, studyMode));
  };

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      {/* 상단 바 */}
      <View style={s.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={s.back}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </Pressable>
        <Text style={s.topTitle}>{t("retention.goal.pageTitle")}</Text>
        <View style={s.gemPill}>
          <Ionicons name="diamond" size={14} color={GEM} />
          <Text style={[s.gemText, (page?.gems ?? 0) < 0 && s.gemNegative]}>
            {(page?.gems ?? 0).toLocaleString("en-US")}
          </Text>
        </View>
      </View>

      {!page ? (
        <View style={s.state}>
          {loadFailed ? (
            <Pressable onPress={() => void load()} style={s.retry}>
              <Ionicons name="refresh" size={18} color={theme.primary} />
              <Text style={s.retryText}>{t("retention.retry")}</Text>
            </Pressable>
          ) : (
            <ActivityIndicator size="large" color={theme.primary} />
          )}
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={[
              s.scroll,
              { paddingBottom: insets.bottom + 120 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <Hero
              streak={page.streak}
              freezeOwned={page.freeze.owned}
              freezeMax={page.freeze.max}
              theme={theme}
            />

            <MilestoneTrack
              streak={page.streak}
              everyDays={page.streakChest.everyDays}
              gems={page.streakChest.gems}
              goalGems={active?.gems ?? chosen?.gems ?? 0}
              theme={theme}
            />

            <Text style={s.sectionTitle}>
              {active
                ? t("retention.goal.activeTitle")
                : t("retention.goal.pickTitle")}
            </Text>

            {active ? (
              <ActiveGoalCard
                days={active.days}
                gems={active.gems}
                progress={active.progress}
                theme={theme}
              />
            ) : (
              <View style={s.options}>
                {options.map((o, i) => (
                  <GoalOption
                    key={o.days}
                    option={o}
                    index={i}
                    selected={o.days === selected}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setSelected(o.days);
                    }}
                    theme={theme}
                  />
                ))}
              </View>
            )}

            {/* 규칙 */}
            <View style={s.rules}>
              {[
                { icon: "flash", text: t("retention.goal.rule1") },
                { icon: "calendar", text: t("retention.goal.rule2") },
                { icon: "snow", text: t("retention.goal.rule3") },
                { icon: "alert-circle", text: t("retention.goal.rule4") },
              ].map((r, i) => (
                <View key={i} style={s.ruleRow}>
                  <Ionicons
                    name={r.icon as any}
                    size={15}
                    color={i === 3 ? "#E25C5C" : theme.textSecondary}
                  />
                  <Text style={[s.ruleText, i === 3 && s.ruleWarn]}>
                    {r.text}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* 하단 고정 버튼 */}
          <View style={[s.bottom, { paddingBottom: insets.bottom + 12 }]}>
            {active ? (
              <Button3D
                label={t("retention.goal.goStudy")}
                icon={<Ionicons name="book" size={18} color="#FFFFFF" />}
                onPress={goStudy}
              />
            ) : (
              <Button3D
                label={
                  chosen
                    ? t("retention.goal.startCta", { gems: chosen.gems })
                    : t("retention.goal.pickFirst")
                }
                icon={<Ionicons name="diamond" size={17} color="#FFFFFF" />}
                color={FLAME}
                depthColor="#D45F00"
                disabled={!chosen}
                onPress={() => setConfirming(true)}
              />
            )}
          </View>
        </>
      )}

      {/* 시작 전 확인 — 끊기면 돌려받는다는 걸 분명히 */}
      <RewardDialog
        visible={confirming && !!chosen}
        mood="determined"
        title={t("retention.goal.confirmTitle", {
          len: goalLength(t, chosen?.days ?? 0),
        })}
        body={t("retention.goal.confirmBody", { gems: chosen?.gems ?? 0 })}
        rewards={
          chosen
            ? [
                {
                  icon: "diamond",
                  color: GEM,
                  label: t("retention.goal.confirmGet", { gems: chosen.gems }),
                },
                {
                  icon: "flame",
                  color: FLAME,
                  label: t("retention.goal.confirmKeep", { n: chosen.days }),
                },
              ]
            : []
        }
        primaryLabel={t("retention.goal.confirmYes")}
        primaryColor={FLAME}
        primaryDepth="#D45F00"
        onPrimary={start}
        loading={starting}
        secondaryLabel={t("retention.goal.confirmNo")}
        onSecondary={() => setConfirming(false)}
      />

      {/* 시작 축하 */}
      <RewardDialog
        visible={!!started}
        mood="celebrating"
        title={t("retention.goal.startedTitle")}
        body={t("retention.goal.startedBody", { n: started?.days ?? 0 })}
        rewards={
          started
            ? [
                {
                  icon: "diamond",
                  color: GEM,
                  label: t("retention.goal.confirmGet", { gems: started.gems }),
                },
              ]
            : []
        }
        primaryLabel={t("retention.goal.goStudy")}
        onPrimary={() => {
          setStarted(null);
          goStudy();
        }}
        secondaryLabel={t("retention.close")}
        onSecondary={() => setStarted(null)}
      />
    </View>
  );
}

/** 3 → "3일", 7 → "1주", 30 → "1달" */
function goalLength(t: (k: string, o?: any) => string, days: number): string {
  const key = `retention.goal.len${days}`;
  const v = t(key);
  return v === key ? t("retention.goal.lenDays", { n: days }) : v;
}

// ─────────────────────────── 히어로 ───────────────────────────

function Hero({
  streak,
  freezeOwned,
  freezeMax,
  theme,
}: {
  streak: number;
  freezeOwned: number;
  freezeMax: number;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const s = getStyles(theme);
  const flicker = useSharedValue(0);

  useEffect(() => {
    flicker.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 700, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 900, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
    );
  }, []);

  const flameStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 1 + 0.07 * flicker.value },
      { rotate: `${-3 + 6 * flicker.value}deg` },
    ],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.25 + 0.3 * flicker.value,
    transform: [{ scale: 1 + 0.15 * flicker.value }],
  }));

  return (
    <LinearGradient
      colors={["#FF9A3C", "#FF5E62"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.hero}
    >
      <View style={s.heroFlameWrap}>
        <Animated.View style={[s.heroGlow, glowStyle]} />
        <Animated.View style={flameStyle}>
          <Ionicons name="flame" size={64} color="#FFF3B0" />
        </Animated.View>
      </View>
      <View style={s.heroMid}>
        <Text style={s.heroCount}>{streak}</Text>
        <Text style={s.heroLabel}>{t("retention.goal.heroStreak")}</Text>
        <View style={s.heroFreeze}>
          <Ionicons name="snow" size={13} color="#FFFFFF" />
          <Text style={s.heroFreezeText}>
            {t("retention.freeze.chip", { n: freezeOwned, max: freezeMax })}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

// ─────────────────────────── 이어가면 받는 보석 ───────────────────────────

function MilestoneTrack({
  streak,
  everyDays,
  gems,
  goalGems,
  theme,
}: {
  streak: number;
  everyDays: number;
  gems: number;
  goalGems: number;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const s = getStyles(theme);

  // 지금 연속 다음부터 30일 안에 오는 상자 날들
  const milestones = useMemo(() => {
    if (everyDays <= 0) return [] as number[];
    const out: number[] = [];
    let d = (Math.floor(streak / everyDays) + 1) * everyDays;
    while (d <= streak + LOOKAHEAD_DAYS) {
      out.push(d);
      d += everyDays;
    }
    return out;
  }, [streak, everyDays]);

  const total = milestones.length * gems;

  return (
    <View style={s.card}>
      <View style={s.cardHeader}>
        <Ionicons name="gift" size={18} color="#FFB020" />
        <Text style={s.cardTitle}>{t("retention.goal.trackTitle")}</Text>
      </View>
      <Text style={s.cardSub}>
        {t("retention.goal.trackSub", { every: everyDays, gems })}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.track}
      >
        {milestones.map((d, i) => (
          <Milestone
            key={d}
            day={d}
            inDays={d - streak}
            gems={gems}
            index={i}
            theme={theme}
          />
        ))}
      </ScrollView>

      <View style={s.totalRow}>
        <Text style={s.totalLabel}>
          {t("retention.goal.trackTotal", { n: LOOKAHEAD_DAYS })}
        </Text>
        <View style={s.totalValue}>
          <Ionicons name="diamond" size={16} color={GEM} />
          <Text style={s.totalNum}>
            {(total + goalGems).toLocaleString("en-US")}
          </Text>
        </View>
      </View>
      {goalGems > 0 ? (
        <Text style={s.totalHint}>
          {t("retention.goal.trackWithGoal", { chest: total, goal: goalGems })}
        </Text>
      ) : null}
    </View>
  );
}

function Milestone({
  day,
  inDays,
  gems,
  index,
  theme,
}: {
  day: number;
  inDays: number;
  gems: number;
  index: number;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const s = getStyles(theme);
  const pop = useSharedValue(0);
  useEffect(() => {
    pop.value = withDelay(
      index * 70,
      withSpring(1, { damping: 11, stiffness: 160 }),
    );
  }, []);
  const style = useAnimatedStyle(() => ({
    opacity: Math.min(1, pop.value),
    transform: [{ translateY: (1 - pop.value) * 14 }],
  }));
  const next = index === 0;
  return (
    <Animated.View style={[s.milestone, next && s.milestoneNext, style]}>
      <Text style={[s.mDay, next && s.mLight]} maxFontSizeMultiplier={1.2}>
        {t("retention.goal.dayN", { n: day })}
      </Text>
      <Ionicons name="gift" size={22} color={next ? "#FFFFFF" : "#FFB020"} />
      <View style={s.mGems}>
        <Ionicons name="diamond" size={11} color={next ? "#FFFFFF" : GEM} />
        <Text style={[s.mGemsText, next && s.mLight]}>{gems}</Text>
      </View>
      <Text style={[s.mIn, next && s.mLight]} maxFontSizeMultiplier={1.2}>
        {inDays === 1
          ? t("retention.goal.tomorrow")
          : t("retention.goal.inDays", { n: inDays })}
      </Text>
    </Animated.View>
  );
}

// ─────────────────────────── 목표 ───────────────────────────

function GoalOption({
  option,
  index,
  selected,
  onPress,
  theme,
}: {
  option: StreakGoalOption;
  index: number;
  selected: boolean;
  onPress: () => void;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const s = getStyles(theme);
  const pop = useSharedValue(0);
  const press = useSharedValue(0);

  useEffect(() => {
    pop.value = withDelay(
      100 + index * 80,
      withSpring(1, { damping: 12, stiffness: 170 }),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: Math.min(1, pop.value),
    transform: [
      { translateX: (1 - pop.value) * 24 },
      { translateY: press.value * 3 },
    ],
  }));

  // 기간이 길수록 불꽃이 커진다
  const flames = Math.min(5, index + 1);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        press.value = withTiming(1, { duration: 60 });
      }}
      onPressOut={() => {
        press.value = withSpring(0);
      }}
    >
      <Animated.View style={[s.option, selected && s.optionSelected, style]}>
        <View style={[s.optionLen, selected && s.optionLenSelected]}>
          <Text
            style={[s.optionLenText, selected && s.mLight]}
            maxFontSizeMultiplier={1.2}
          >
            {goalLength(t, option.days)}
          </Text>
        </View>
        <View style={s.optionMid}>
          <View style={s.flames}>
            {Array.from({ length: flames }).map((_, i) => (
              <Ionicons
                key={i}
                name="flame"
                size={14}
                color={selected ? FLAME : theme.textSecondary}
              />
            ))}
          </View>
          <Text style={s.optionSub}>
            {t("retention.goal.optionSub", { n: option.days })}
          </Text>
        </View>
        <View style={[s.optionGems, selected && s.optionGemsSelected]}>
          <Ionicons
            name="diamond"
            size={14}
            color={selected ? "#FFFFFF" : GEM}
          />
          <Text style={[s.optionGemsText, selected && s.mLight]}>
            +{option.gems}
          </Text>
        </View>
        {selected ? (
          <View style={s.check}>
            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
          </View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

function ActiveGoalCard({
  days,
  gems,
  progress,
  theme,
}: {
  days: number;
  gems: number;
  progress: number;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const s = getStyles(theme);
  const fill = useSharedValue(0);
  const ratio = days > 0 ? Math.min(1, progress / days) : 0;

  useEffect(() => {
    fill.value = withTiming(ratio, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    });
  }, [ratio]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${fill.value * 100}%` }));

  return (
    <View style={s.activeCard}>
      <View style={s.activeTop}>
        <Text style={s.activeLen}>{goalLength(t, days)}</Text>
        <View style={s.optionGems}>
          <Ionicons name="diamond" size={14} color={GEM} />
          <Text style={s.optionGemsText}>{gems}</Text>
        </View>
      </View>

      {/* 날짜 칸 — 지난 칸은 불꽃 */}
      <View style={s.dots}>
        {Array.from({ length: days }).map((_, i) => (
          <View
            key={i}
            style={[s.dot, days > 14 && s.dotSmall, i < progress && s.dotDone]}
          >
            {i < progress && days <= 14 ? (
              <Ionicons name="flame" size={12} color="#FFFFFF" />
            ) : null}
          </View>
        ))}
      </View>

      <View style={s.activeTrack}>
        <Animated.View style={[s.activeFill, fillStyle]} />
      </View>
      <Text style={s.activeText}>
        {t("retention.goal.activeProgress", { p: progress, n: days })}
      </Text>
      <View style={s.warn}>
        <Ionicons name="alert-circle" size={14} color="#E25C5C" />
        <Text style={s.warnText}>
          {t("retention.goal.activeWarn", { gems })}
        </Text>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    topBar: {
      height: 52,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
    },
    back: { width: 36, alignItems: "flex-start" },
    topTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: 17,
      fontWeight: "900",
      color: theme.text,
    },
    gemPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
      backgroundColor: GEM + "1A",
    },
    gemText: { fontSize: 13.5, fontWeight: "900", color: GEM },
    gemNegative: { color: "#E25C5C" },
    state: { flex: 1, alignItems: "center", justifyContent: "center" },
    retry: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      padding: 12,
    },
    retryText: { fontSize: 15, fontWeight: "800", color: theme.primary },
    scroll: { paddingHorizontal: 16, paddingTop: 4, gap: 14 },

    hero: {
      borderRadius: 24,
      padding: 18,
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      overflow: "hidden",
    },
    heroFlameWrap: {
      width: 86,
      height: 86,
      alignItems: "center",
      justifyContent: "center",
    },
    heroGlow: {
      position: "absolute",
      width: 86,
      height: 86,
      borderRadius: 43,
      backgroundColor: "#FFE066",
    },
    heroMid: { flex: 1 },
    heroCount: {
      fontSize: 44,
      fontWeight: "900",
      color: "#FFFFFF",
      lineHeight: 48,
    },
    heroLabel: { fontSize: 15, fontWeight: "900", color: "#FFF3E0" },
    heroFreeze: {
      marginTop: 8,
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      backgroundColor: "rgba(255,255,255,0.22)",
    },
    heroFreezeText: { fontSize: 12, fontWeight: "900", color: "#FFFFFF" },

    card: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    cardHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
    cardTitle: { fontSize: 15.5, fontWeight: "900", color: theme.text },
    cardSub: {
      marginTop: 4,
      fontSize: 12.5,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    track: { gap: 10, paddingVertical: 14, paddingRight: 4 },
    milestone: {
      width: 82,
      paddingVertical: 10,
      paddingHorizontal: 6,
      borderRadius: 16,
      alignItems: "center",
      gap: 4,
      backgroundColor: theme.bg,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    milestoneNext: {
      backgroundColor: "#FFB020",
      borderColor: "#D48A00",
    },
    mDay: {
      fontSize: 12,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
    },
    mLight: { color: "#FFFFFF" },
    mGems: { flexDirection: "row", alignItems: "center", gap: 3 },
    mGemsText: { fontSize: 12.5, fontWeight: "900", color: theme.text },
    // "5 kundan keyin" 처럼 두 줄로 접혀도 가운데에 오게
    mIn: {
      fontSize: 10.5,
      fontWeight: "800",
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 13,
    },
    totalRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    totalLabel: { fontSize: 13.5, fontWeight: "800", color: theme.text },
    totalValue: { flexDirection: "row", alignItems: "center", gap: 5 },
    totalNum: { fontSize: 20, fontWeight: "900", color: GEM },
    totalHint: {
      marginTop: 4,
      fontSize: 11.5,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "right",
    },

    sectionTitle: {
      marginTop: 4,
      fontSize: 16,
      fontWeight: "900",
      color: theme.text,
    },
    options: { gap: 10 },
    option: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 12,
      borderRadius: 18,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 5,
    },
    optionSelected: {
      borderColor: FLAME,
      backgroundColor: "#FF7A0010",
    },
    optionLen: {
      width: 76,
      minHeight: 52,
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderRadius: 14,
      backgroundColor: theme.bg,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    optionLenSelected: { backgroundColor: FLAME, borderColor: "#D45F00" },
    // "1 haftalik" 이 두 줄로 접혀도 가운데 정렬
    optionLenText: {
      fontSize: 14,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      lineHeight: 17,
    },
    optionMid: { flex: 1, gap: 4 },
    flames: { flexDirection: "row", gap: 1 },
    optionSub: {
      fontSize: 12.5,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    optionGems: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor: GEM + "1A",
    },
    optionGemsSelected: { backgroundColor: GEM },
    optionGemsText: { fontSize: 14.5, fontWeight: "900", color: GEM },
    check: {
      position: "absolute",
      top: -8,
      right: -6,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: FLAME,
      borderWidth: 2,
      borderColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
    },

    activeCard: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 16,
      borderWidth: 2,
      borderColor: FLAME,
    },
    activeTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    activeLen: { fontSize: 22, fontWeight: "900", color: theme.text },
    dots: {
      marginTop: 14,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
    dot: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    dotSmall: { width: 16, height: 16, borderRadius: 8 },
    dotDone: { backgroundColor: FLAME },
    activeTrack: {
      marginTop: 14,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
    activeFill: { height: "100%", borderRadius: 6, backgroundColor: FLAME },
    activeText: {
      marginTop: 8,
      fontSize: 14,
      fontWeight: "900",
      color: theme.text,
    },
    warn: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      padding: 10,
      borderRadius: 12,
      backgroundColor: "#E25C5C14",
    },
    warnText: {
      flex: 1,
      fontSize: 12.5,
      fontWeight: "800",
      color: "#C94545",
    },

    rules: {
      gap: 10,
      padding: 14,
      borderRadius: 16,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    ruleRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
    ruleText: {
      flex: 1,
      fontSize: 12.5,
      lineHeight: 18,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    ruleWarn: { color: "#C94545" },

    bottom: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 16,
      paddingTop: 12,
      backgroundColor: theme.bg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
  });
