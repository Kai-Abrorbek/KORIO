import { useEffect, useState, type ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
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
  type QuestId,
  type QuestItem,
  type RetentionSummary,
} from "@/services/retention.service";
import { useRetentionStore } from "@/store/retention.store";
import { useAuthStore } from "@/store/auth.store";
import Button3D from "./Button3D";

const GEM = "#3BB6E5";

const QUEST_META: Record<
  QuestId,
  { icon: ComponentProps<typeof Ionicons>["name"]; color: string }
> = {
  xp: { icon: "flash", color: "#FFB020" },
  correct: { icon: "checkmark-done", color: "#2BB673" },
  minutes: { icon: "time", color: "#776ee2" },
};

/** 다음 자정까지 남은 시간 (기기 시계 기준 — 대부분 계정 시간대와 같다) */
function untilMidnight(): { h: number; m: number } {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const min = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 60000));
  return { h: Math.floor(min / 60), m: min % 60 };
}

/**
 * 홈 — 오늘의 퀘스트 3개 + 다 끝내면 여는 상자.
 * 진행도는 서버가 그날 학습 통계에서 읽어 준다. 보상은 직접 눌러서 받는다.
 */
export default function DailyQuestsCard({
  quests,
}: {
  quests: RetentionSummary["quests"];
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const [left, setLeft] = useState(untilMidnight());

  useEffect(() => {
    const id = setInterval(() => setLeft(untilMidnight()), 60_000);
    return () => clearInterval(id);
  }, []);

  const doneCount = quests.items.filter((q) => q.done).length;

  return (
    <View style={s.card}>
      <View style={s.header}>
        <View style={s.titleRow}>
          <View style={s.titleIcon}>
            <Ionicons name="flag" size={15} color="#FFFFFF" />
          </View>
          <Text style={s.title}>{t("retention.quests.title")}</Text>
          <View style={s.countPill}>
            <Text style={s.countText}>
              {doneCount}/{quests.items.length}
            </Text>
          </View>
        </View>
        <View style={s.timer}>
          <Ionicons
            name="hourglass-outline"
            size={12}
            color={theme.textSecondary}
          />
          <Text style={s.timerText}>
            {t("retention.quests.resetIn", { h: left.h, m: left.m })}
          </Text>
        </View>
      </View>

      {quests.items.map((q) => (
        <QuestRow key={q.id} quest={q} theme={theme} />
      ))}

      <ChestRow chest={quests.chest} theme={theme} />
    </View>
  );
}

function useClaim() {
  const patch = useRetentionStore((st) => st.patch);
  const updateUser = useAuthStore((st) => st.updateUser);
  return async (id: QuestId | "chest") => {
    const res = await RetentionService.claimQuest(id);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    updateUser({ gems: res.gems } as any);
    patch((sum) => ({
      ...sum,
      gems: res.gems,
      quests: {
        ...sum.quests,
        items: sum.quests.items.map((q) =>
          q.id === id ? { ...q, claimed: true } : q,
        ),
        chest:
          id === "chest"
            ? { ...sum.quests.chest, claimed: true }
            : sum.quests.chest,
      },
    }));
    return res.reward;
  };
}

function GainFloat({ amount, trigger }: { amount: number; trigger: number }) {
  const y = useSharedValue(0);
  const o = useSharedValue(0);
  useEffect(() => {
    if (!trigger) return;
    y.value = 0;
    o.value = 1;
    y.value = withTiming(-34, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    });
    o.value = withSequence(
      withTiming(1, { duration: 450 }),
      withTiming(0, { duration: 450 }),
    );
  }, [trigger]);
  const style = useAnimatedStyle(() => ({
    opacity: o.value,
    transform: [{ translateY: y.value }],
  }));
  return (
    <Animated.View pointerEvents="none" style={[gainStyles.float, style]}>
      <Ionicons name="diamond" size={13} color={GEM} />
      <Text style={gainStyles.text}>+{amount}</Text>
    </Animated.View>
  );
}

function QuestRow({ quest, theme }: { quest: QuestItem; theme: ThemeColors }) {
  const { t } = useTranslation();
  const s = getStyles(theme);
  const meta = QUEST_META[quest.id];
  const claim = useClaim();
  const [busy, setBusy] = useState(false);
  const [burst, setBurst] = useState(0);
  const ratio =
    quest.target > 0 ? Math.min(1, quest.progress / quest.target) : 0;
  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(ratio, {
      duration: 700,
      easing: Easing.out(Easing.cubic),
    });
  }, [ratio]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${fill.value * 100}%` }));

  const onClaim = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await claim(quest.id);
      setBurst((n) => n + 1);
    } catch {
      // 이미 받았거나 아직 안 됨 — 다음 새로고침이 맞춘다
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={s.row}>
      <View style={[s.qIcon, { backgroundColor: meta.color + "1F" }]}>
        <Ionicons name={meta.icon} size={18} color={meta.color} />
      </View>
      <View style={s.qMid}>
        <Text
          style={[s.qTitle, quest.claimed && s.qTitleDone]}
          numberOfLines={1}
        >
          {t(`retention.quests.${quest.id}`, { n: quest.target })}
        </Text>
        <View style={s.track}>
          <Animated.View
            style={[
              s.fill,
              { backgroundColor: quest.done ? "#2BB673" : meta.color },
              fillStyle,
            ]}
          >
            <View style={s.fillShine} />
          </Animated.View>
          <Text style={s.trackText}>
            {quest.progress}/{quest.target}
          </Text>
        </View>
      </View>

      <View style={s.qRight}>
        {quest.claimed ? (
          <View style={s.doneBadge}>
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          </View>
        ) : quest.done ? (
          <Button3D
            compact
            label={`+${quest.gems}`}
            icon={<Ionicons name="diamond" size={13} color="#FFFFFF" />}
            color="#2BB673"
            depthColor="#1E8F59"
            loading={busy}
            onPress={onClaim}
          />
        ) : (
          <View style={s.rewardChip}>
            <Ionicons name="diamond" size={12} color={GEM} />
            <Text style={s.rewardText}>{quest.gems}</Text>
          </View>
        )}
        <GainFloat amount={quest.gems} trigger={burst} />
      </View>
    </View>
  );
}

function ChestRow({
  chest,
  theme,
}: {
  chest: RetentionSummary["quests"]["chest"];
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const s = getStyles(theme);
  const claim = useClaim();
  const [busy, setBusy] = useState(false);
  const [burst, setBurst] = useState(0);
  const wobble = useSharedValue(0);
  const glow = useSharedValue(0);

  const ready = chest.ready && !chest.claimed;

  useEffect(() => {
    if (!ready) {
      wobble.value = 0;
      glow.value = 0;
      return;
    }
    // 열 수 있으면 상자가 들썩이고 빛난다
    wobble.value = withRepeat(
      withSequence(
        withTiming(-7, { duration: 90 }),
        withTiming(7, { duration: 90 }),
        withTiming(-4, { duration: 90 }),
        withTiming(0, { duration: 90 }),
        withTiming(0, { duration: 1100 }),
      ),
      -1,
    );
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900 }),
        withTiming(0.2, { duration: 900 }),
      ),
      -1,
    );
  }, [ready]);

  const boxStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${wobble.value}deg` }],
  }));
  const glowStyle = useAnimatedStyle(() => ({ opacity: glow.value }));

  const onOpen = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await claim("chest");
      setBurst((n) => n + 1);
    } catch {
    } finally {
      setBusy(false);
    }
  };

  return (
    <Pressable
      disabled={!ready || busy}
      onPress={onOpen}
      style={[s.chestRow, ready && s.chestRowReady]}
    >
      <View style={s.chestIconWrap}>
        <Animated.View style={[s.chestGlow, glowStyle]} />
        <Animated.View style={boxStyle}>
          <Ionicons
            name={chest.claimed ? "gift-outline" : "gift"}
            size={30}
            color={chest.claimed ? theme.textSecondary : "#FFB020"}
          />
        </Animated.View>
      </View>
      <View style={s.qMid}>
        <Text style={s.chestTitle}>
          {chest.claimed
            ? t("retention.quests.chestOpened")
            : t("retention.quests.chest")}
        </Text>
        <Text style={s.chestSub}>
          {ready
            ? t("retention.quests.chestReady")
            : chest.claimed
              ? t("retention.quests.chestTomorrow")
              : t("retention.quests.chestHint")}
        </Text>
      </View>
      <View style={s.qRight}>
        {ready ? (
          <Button3D
            compact
            label={t("retention.quests.open")}
            color="#FFB020"
            depthColor="#D48A00"
            loading={busy}
            onPress={onOpen}
          />
        ) : (
          <View style={s.rewardChip}>
            <Ionicons name="diamond" size={12} color={GEM} />
            <Text style={s.rewardText}>{chest.gems}</Text>
          </View>
        )}
        <GainFloat amount={chest.gems} trigger={burst} />
      </View>
    </Pressable>
  );
}

const gainStyles = StyleSheet.create({
  float: {
    position: "absolute",
    right: 6,
    top: -6,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  text: { fontSize: 15, fontWeight: "900", color: GEM },
});

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: "#1A1A2E",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    titleIcon: {
      width: 24,
      height: 24,
      borderRadius: 8,
      backgroundColor: "#776ee2",
      alignItems: "center",
      justifyContent: "center",
    },
    title: { fontSize: 15.5, fontWeight: "900", color: theme.text },
    countPill: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
      backgroundColor: theme.primary + "1A",
    },
    countText: { fontSize: 12, fontWeight: "900", color: theme.primary },
    timer: { flexDirection: "row", alignItems: "center", gap: 4 },
    timerText: {
      fontSize: 11.5,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 9,
    },
    qIcon: {
      width: 40,
      height: 40,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    qMid: { flex: 1, gap: 6 },
    qTitle: { fontSize: 14, fontWeight: "800", color: theme.text },
    qTitleDone: { color: theme.textSecondary },
    track: {
      height: 16,
      borderRadius: 8,
      backgroundColor: theme.border,
      overflow: "hidden",
      justifyContent: "center",
    },
    fill: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      borderRadius: 8,
      overflow: "hidden",
    },
    fillShine: {
      position: "absolute",
      top: 2,
      left: 4,
      right: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: "rgba(255,255,255,0.35)",
    },
    trackText: {
      alignSelf: "center",
      fontSize: 10.5,
      fontWeight: "900",
      color: theme.text,
    },
    qRight: { minWidth: 64, alignItems: "flex-end", position: "relative" },
    doneBadge: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "#2BB673",
      alignItems: "center",
      justifyContent: "center",
    },
    rewardChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor: GEM + "1A",
    },
    rewardText: { fontSize: 13, fontWeight: "900", color: GEM },
    chestRow: {
      marginTop: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 12,
      borderRadius: 16,
      backgroundColor: theme.bg,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderStyle: "dashed",
    },
    chestRowReady: {
      borderStyle: "solid",
      borderColor: "#FFB020",
      backgroundColor: "#FFB0201A",
    },
    chestIconWrap: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    chestGlow: {
      position: "absolute",
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: "#FFE066",
    },
    chestTitle: { fontSize: 14, fontWeight: "900", color: theme.text },
    chestSub: { fontSize: 12, fontWeight: "700", color: theme.textSecondary },
  });
