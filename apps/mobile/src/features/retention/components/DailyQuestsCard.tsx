import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import * as Haptics from "@/utils/haptics";
import {
  RetentionService,
  type QuestChestResult,
  type QuestSlot,
  type QuestSlotId,
  type RetentionSummary,
} from "@/services/retention.service";
import { useRetentionStore } from "@/store/retention.store";
import { useAuthStore } from "@/store/auth.store";
import Button3D from "./Button3D";
import {
  TIER_META,
  questAction,
  questIcon,
  questTitle,
  type QuestAction,
} from "../questMeta";
import { shareInviteQuest, shareProgressQuest } from "../questActions";

const GEM = "#3BB6E5";

/** 옛 서버(slots 없음)면 옛 3종을 칸 모양으로 바꿔 그린다 */
function slotsOf(quests: RetentionSummary["quests"]): QuestSlot[] {
  if (quests.slots?.length) return quests.slots;
  return quests.items.map((item) => ({
    ...item,
    id: item.id as unknown as QuestSlotId,
    slot: item.id as unknown as QuestSlotId,
    kind: item.id,
    category: null,
    promo: false,
  }));
}

/** 다음 자정까지 남은 시간 (기기 시계 기준 — 대부분 계정 시간대와 같다) */
function untilMidnight(): { h: number; m: number } {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const min = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 60000));
  return { h: Math.floor(min / 60), m: min % 60 };
}

/**
 * 홈 — 오늘의 퀘스트 (쉬움·보통·어려움 + SUPER 보너스) + 다 끝내면 여는 미스터리 상자.
 * 칸마다 그 난이도의 퀘스트 목록에서 랜덤으로 뽑힌다 (서버). 진행도도 서버가 준다.
 * 하루 정해진 횟수만큼 칸을 바꿀 수 있다 (↻).
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

  const slots = slotsOf(quests);
  const base = slots.filter((q) => q.slot !== "bonus");
  const doneCount = base.filter((q) => q.done).length;
  const rerollsLeft = quests.rerolls?.left ?? 0;

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
              {doneCount}/{base.length}
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

      {quests.rerolls ? (
        <View style={s.rerollInfo}>
          <Ionicons name="shuffle" size={13} color={theme.textSecondary} />
          <Text style={s.rerollInfoText}>
            {rerollsLeft > 0
              ? t("retention.quests.rerollsLeft", { n: rerollsLeft })
              : t("retention.quests.rerollNone")}
          </Text>
        </View>
      ) : null}

      {slots.map((q) => (
        <QuestRow
          key={q.slot}
          quest={q}
          theme={theme}
          canReroll={rerollsLeft > 0}
        />
      ))}

      <ChestRow chest={quests.chest} theme={theme} />
    </View>
  );
}

function useClaim() {
  const patch = useRetentionStore((st) => st.patch);
  const updateUser = useAuthStore((st) => st.updateUser);
  return async (id: QuestSlotId | "chest") => {
    const res = await RetentionService.claimQuest(id);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    updateUser({
      gems: res.gems,
      ...(res.chest?.type === "freeze"
        ? { streakFreeze: res.chest.owned }
        : {}),
    } as any);
    patch((sum) => ({
      ...sum,
      gems: res.gems,
      ...(res.monthly ? { monthly: res.monthly } : {}),
      ...(res.xpBoost ? { xpBoost: res.xpBoost } : {}),
      ...(res.chest?.type === "freeze"
        ? { freeze: { ...sum.freeze, owned: res.chest.owned } }
        : {}),
      quests: {
        ...sum.quests,
        slots: sum.quests.slots?.map((q) =>
          q.slot === id ? { ...q, claimed: true } : q,
        ),
        items: sum.quests.items.map((q) =>
          (q.id as string) === id ? { ...q, claimed: true } : q,
        ),
        chest:
          id === "chest"
            ? { ...sum.quests.chest, claimed: true }
            : sum.quests.chest,
      },
    }));
    return res;
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

function QuestRow({
  quest,
  theme,
  canReroll,
}: {
  quest: QuestSlot;
  theme: ThemeColors;
  canReroll: boolean;
}) {
  const { t } = useTranslation();
  const s = getStyles(theme);
  const router = useRouter();
  const meta = questIcon(quest);
  const tier = TIER_META[quest.slot];
  const action = questAction(quest.kind);
  const claim = useClaim();
  const patch = useRetentionStore((st) => st.patch);
  const streak = useRetentionStore((st) => st.summary?.streak ?? 0);
  const [busy, setBusy] = useState(false);
  const [burst, setBurst] = useState(0);
  const ratio =
    quest.target > 0 ? Math.min(1, quest.progress / quest.target) : 0;
  const fill = useSharedValue(0);
  // 공유·초대·팔로우처럼 한 번 하면 끝나는 건 막대 대신 버튼만
  const oneShot = quest.promo && quest.target === 1;

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
      await claim(quest.slot);
      setBurst((n) => n + 1);
    } catch {
      // 이미 받았거나 아직 안 됨 — 다음 새로고침이 맞춘다
    } finally {
      setBusy(false);
    }
  };

  const onAction = async (kind: QuestAction) => {
    if (busy) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (kind === "find") {
      router.push("/add-friends");
      return;
    }
    if (kind === "review") {
      router.push("/lesson?mode=review");
      return;
    }
    setBusy(true);
    try {
      if (kind === "invite") await shareInviteQuest(t);
      else await shareProgressQuest(t, streak);
    } finally {
      setBusy(false);
    }
  };

  const onReroll = async () => {
    if (busy) return;
    setBusy(true);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      const { quests } = await RetentionService.rerollQuest(quest.slot);
      patch((sum) => ({ ...sum, quests }));
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } finally {
      setBusy(false);
    }
  };

  const showReroll = canReroll && !quest.done && !quest.claimed;
  const showAction = !!action && !quest.done && !quest.claimed;

  return (
    <View style={s.row}>
      <View style={[s.qIcon, { backgroundColor: meta.color + "1F" }]}>
        <Ionicons name={meta.icon} size={19} color={meta.color} />
      </View>
      <View style={s.qMid}>
        <View style={s.qHead}>
          {tier ? (
            <View style={[s.tierChip, { backgroundColor: tier.color + "1F" }]}>
              <Text style={[s.tierText, { color: tier.dark }]}>
                {t(`retention.quests.tier.${quest.slot}`)}
              </Text>
            </View>
          ) : null}
          {quest.promo ? (
            <Ionicons name="megaphone" size={12} color={meta.color} />
          ) : null}
        </View>
        <Text
          style={[s.qTitle, quest.claimed && s.qTitleDone]}
          numberOfLines={2}
        >
          {questTitle(t, quest)}
        </Text>
        {oneShot ? null : (
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
        )}
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
        ) : showAction && action ? (
          <Button3D
            compact
            label={t(`retention.quests.action.${action}`)}
            color={meta.color}
            depthColor={tier?.dark ?? "#5a52c4"}
            loading={busy}
            onPress={() => void onAction(action)}
          />
        ) : (
          <View style={s.rewardChip}>
            <Ionicons name="diamond" size={12} color={GEM} />
            <Text style={s.rewardText}>{quest.gems}</Text>
          </View>
        )}
        {showReroll ? (
          <Pressable
            onPress={() => void onReroll()}
            disabled={busy}
            hitSlop={8}
            style={({ pressed }) => [s.rerollBtn, pressed && s.rerollPressed]}
            accessibilityRole="button"
            accessibilityLabel={t("retention.quests.rerollsLeft", { n: 1 })}
          >
            <Ionicons name="shuffle" size={14} color={theme.textSecondary} />
          </Pressable>
        ) : null}
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
  // 방금 연 상자에서 뭐가 나왔나 (이 화면에서만 보여준다)
  const [got, setGot] = useState<QuestChestResult | null>(null);
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
      const res = await claim("chest");
      setGot(res.chest ?? { type: "gems", gems: res.reward });
      if (res.reward > 0) setBurst((n) => n + 1);
    } catch {
    } finally {
      setBusy(false);
    }
  };

  const gotText = !got
    ? null
    : got.type === "gems"
      ? t("retention.quests.chestGems", { n: got.gems })
      : got.type === "xpBoost"
        ? t("retention.quests.chestBoost", {
            m: got.minutes,
            x: got.multiplier,
          })
        : t("retention.quests.chestFreeze");

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
        {gotText ? (
          <Text style={s.chestGot}>{gotText}</Text>
        ) : (
          <Text style={s.chestSub}>
            {ready
              ? t("retention.quests.chestReady")
              : chest.claimed
                ? t("retention.quests.chestTomorrow")
                : t("retention.quests.chestMystery")}
          </Text>
        )}
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
        ) : chest.claimed ? null : (
          // 뭐가 나올지 모른다 — 숫자 대신 물음표
          <View style={[s.rewardChip, s.mysteryChip]}>
            <Ionicons name="help" size={14} color="#D48A00" />
          </View>
        )}
        <GainFloat
          amount={got?.type === "gems" ? got.gems : 0}
          trigger={burst}
        />
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
    qMid: { flex: 1, gap: 5 },
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
    chestGot: { fontSize: 13, fontWeight: "900", color: "#D48A00" },
    mysteryChip: { backgroundColor: "#FFB0201F", paddingHorizontal: 9 },
    rerollInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: -4,
      marginBottom: 4,
    },
    rerollInfoText: {
      fontSize: 11.5,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    qHead: { flexDirection: "row", alignItems: "center", gap: 6 },
    tierChip: {
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: 7,
    },
    tierText: { fontSize: 10.5, fontWeight: "900", letterSpacing: 0.2 },
    rerollBtn: {
      marginTop: 6,
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.bg,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    rerollPressed: { transform: [{ translateY: 1 }], opacity: 0.8 },
  });
