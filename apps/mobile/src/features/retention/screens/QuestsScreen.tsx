import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Svg, { Circle, G } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedProps,
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
  type MonthlyView,
  type QuestChestResult,
  type QuestSlot,
  type QuestSlotId,
  type RetentionSummary,
} from "@/services/retention.service";
import { useRetentionStore } from "@/store/retention.store";
import { useAuthStore } from "@/store/auth.store";
import { LEARN_COURSES } from "@/constants/learnCourses";
import Button3D from "../components/Button3D";
import QuestBadge from "../components/QuestBadge";
import {
  MONTH_BADGES,
  monthName,
  monthOf,
  questAction,
  questIcon,
  questTitle,
  slotsOf,
  type QuestAction,
} from "../questMeta";
import { shareInviteQuest, shareProgressQuest } from "../questActions";

const VIOLET = "#776EE2";
const DONE = "#58CC02";
const DONE_INK = "#4A8F00";
const CHEST = "#FFB020";
const CHEST_DEPTH = "#D48A00";
const GEM_INK = "#1899D6";

/** 공유·초대·친구 찾기는 소셜(하늘색), 오답 다시 풀기는 학습(보라) */
const ACTION_TONE: Record<QuestAction, { color: string; depth: string }> = {
  share: { color: "#1CB0F6", depth: "#1899D6" },
  invite: { color: "#1CB0F6", depth: "#1899D6" },
  find: { color: "#1CB0F6", depth: "#1899D6" },
  review: { color: VIOLET, depth: "#5A52C4" },
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/** 다음 자정까지 남은 시간 (기기 시계 기준 — 대부분 계정 시간대와 같다) */
function untilMidnight(): { h: number; m: number } {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const min = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 60000));
  return { h: Math.floor(min / 60), m: min % 60 };
}

/** 처음 그릴 때 0 에서 차오르게 */
function useFill(ratio: number) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withTiming(ratio, {
      duration: 700,
      easing: Easing.out(Easing.cubic),
    });
  }, [ratio, p]);
  return p;
}

/**
 * 퀘스트 — 홈 바로가기 "퀘스트" 로 들어온다 (텔레그램 미니앱 quests-screen 과 같다).
 * 오늘의 퀘스트는 상자를 둘러싼 링의 세 칸, 끝내면 그 칸이 초록이 되고 셋 다면 상자가 열린다.
 * 아래에 이번 달 챌린지 (퀘스트 수 → 보상 칸 → 그 달 배지).
 */
export default function QuestsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const summary = useRetentionStore((st) => st.summary);
  const refresh = useRetentionStore((st) => st.refresh);
  const gems = useAuthStore((st) => st.user?.gems ?? 0);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setFailed(false);
    const next = await refresh();
    if (!next) setFailed(true);
  }, [refresh]);

  // 들어올 때마다 서버 값으로 (다른 화면에서 퀘스트가 진행됐을 수 있다)
  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.topBar}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={s.back}
          accessibilityRole="button"
          accessibilityLabel={t("common.back", { defaultValue: "Back" })}
        >
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </Pressable>
        <Text style={s.topTitle}>{t("retention.quests.pageTitle")}</Text>
        <View style={s.gemPill}>
          <Ionicons name="diamond" size={14} color={GEM_INK} />
          <Text style={s.gemText}>
            {(summary?.gems ?? gems).toLocaleString("en-US")}
          </Text>
        </View>
      </View>

      {!summary ? (
        <View style={s.state}>
          {failed ? (
            <Button3D
              compact
              label={t("retention.retry")}
              icon={<Ionicons name="refresh" size={16} color="#FFFFFF" />}
              onPress={() => void load()}
            />
          ) : (
            <ActivityIndicator color={theme.primary} />
          )}
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            s.scroll,
            { paddingBottom: insets.bottom + 48 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Today quests={summary.quests} streak={summary.streak} />
          {summary.monthly ? <Month monthly={summary.monthly} /> : null}
        </ScrollView>
      )}
    </View>
  );
}

// ─────────────────────────── 오늘 ───────────────────────────

function Today({
  quests,
  streak,
}: {
  quests: RetentionSummary["quests"];
  streak: number;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const router = useRouter();
  const patch = useRetentionStore((st) => st.patch);
  const updateUser = useAuthStore((st) => st.updateUser);
  const [left, setLeft] = useState(untilMidnight());
  const [busy, setBusy] = useState<string | null>(null);
  const [gain, setGain] = useState<{ id: string; n: number; key: number } | null>(
    null,
  );
  // 방금 연 상자에서 뭐가 나왔나
  const [got, setGot] = useState<QuestChestResult | null>(null);

  useEffect(() => {
    const id = setInterval(() => setLeft(untilMidnight()), 60_000);
    return () => clearInterval(id);
  }, []);

  const slots = slotsOf(quests);
  const base = slots.filter((q) => q.slot !== "bonus");
  const rerollsLeft = quests.rerolls?.left ?? 0;
  const chest = quests.chest;
  const chestReady = chest.ready && !chest.claimed;

  const claim = async (id: QuestSlotId | "chest") => {
    if (busy) return;
    setBusy(id);
    try {
      const res = await RetentionService.claimQuest(id);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      updateUser({
        gems: res.gems,
        ...(res.chest?.type === "freeze"
          ? { streakFreeze: res.chest.owned }
          : {}),
      } as any);
      if (res.reward > 0) setGain({ id, n: res.reward, key: Date.now() });
      if (id === "chest") setGot(res.chest ?? { type: "gems", gems: res.reward });
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
    } catch {
      // 이미 받았거나 아직 안 됨 — 다음 새로고침이 맞춘다
    } finally {
      setBusy(null);
    }
  };

  const reroll = async (slot: QuestSlotId) => {
    if (busy) return;
    setBusy(`reroll:${slot}`);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      const { quests: next } = await RetentionService.rerollQuest(slot);
      patch((sum) => ({ ...sum, quests: next }));
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } finally {
      setBusy(null);
    }
  };

  const act = async (quest: QuestSlot, kind: QuestAction) => {
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
    setBusy(quest.slot);
    try {
      if (kind === "invite") await shareInviteQuest(t);
      else await shareProgressQuest(t, streak);
    } finally {
      setBusy(null);
    }
  };

  const status = got
    ? got.type === "gems"
      ? t("retention.quests.chestGems", { n: got.gems })
      : got.type === "xpBoost"
        ? t("retention.quests.chestBoost", {
            m: got.minutes,
            x: got.multiplier,
          })
        : t("retention.quests.chestFreeze")
    : chestReady
      ? t("retention.quests.chestReady")
      : chest.claimed
        ? t("retention.quests.chestTomorrow")
        : t("retention.quests.chestMystery");

  return (
    <>
      <View style={s.dial}>
        <DayRing
          base={base}
          chestReady={chestReady}
          chestClaimed={chest.claimed}
          busy={busy === "chest"}
          gain={gain?.id === "chest" ? gain : null}
          onOpen={() => void claim("chest")}
        />
        <Text style={[s.status, (chestReady || got) && s.statusGold]}>
          {status}
        </Text>
        <View style={s.reset}>
          <Ionicons
            name="hourglass-outline"
            size={13}
            color={theme.textSecondary}
          />
          <Text style={s.resetText}>
            {t("retention.quests.resetIn", { h: left.h, m: left.m })}
          </Text>
        </View>
      </View>

      <View style={s.listHead}>
        <Text style={s.listTitle}>{t("retention.quests.title")}</Text>
        {quests.rerolls ? (
          <View style={s.swaps}>
            <Ionicons name="shuffle" size={13} color={theme.textSecondary} />
            <Text style={s.swapsText}>
              {rerollsLeft > 0
                ? t("retention.quests.rerollsLeft", { n: rerollsLeft })
                : t("retention.quests.rerollNone")}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={s.list}>
        {slots.map((quest, index) => (
          <QuestLine
            key={quest.slot}
            first={index === 0}
            quest={quest}
            busy={busy === quest.slot}
            rerolling={busy === `reroll:${quest.slot}`}
            canReroll={rerollsLeft > 0 && !busy}
            gain={gain?.id === quest.slot ? gain : null}
            onClaim={() => void claim(quest.slot)}
            onAction={(kind) => void act(quest, kind)}
            onReroll={() => void reroll(quest.slot)}
          />
        ))}
      </View>
    </>
  );
}

const RING = 216;
const STROKE = 16;
const RADIUS = (RING - STROKE) / 2;
const CIRCLE = 2 * Math.PI * RADIUS;
/** 칸 사이 틈 (둥근 끝이 차지하는 만큼 포함) */
const GAP_DEG = 16;
const CHEST_SIZE = 96;
const CHEST_DEPTH_PX = 5;

/** 상자를 둘러싼 링 — 오늘의 퀘스트 한 개가 한 칸 */
function DayRing({
  base,
  chestReady,
  chestClaimed,
  busy,
  gain,
  onOpen,
}: {
  base: QuestSlot[];
  chestReady: boolean;
  chestClaimed: boolean;
  busy: boolean;
  gain: { n: number; key: number } | null;
  onOpen: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const count = Math.max(1, base.length);
  const slice = 360 / count;
  const arc = (CIRCLE * (slice - GAP_DEG)) / 360;
  const done = base.filter((q) => q.done).length;

  // 열 수 있으면 상자가 들썩인다
  const wobble = useSharedValue(0);
  useEffect(() => {
    if (!chestReady) {
      wobble.value = 0;
      return;
    }
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
  }, [chestReady, wobble]);
  const wobbleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${wobble.value}deg` }],
  }));

  return (
    <View style={s.ring}>
      <Svg width={RING} height={RING}>
        {base.map((quest, index) => (
          <RingArc
            key={quest.slot}
            start={-90 + index * slice + GAP_DEG / 2}
            arc={arc}
            ratio={
              quest.target > 0 ? Math.min(1, quest.progress / quest.target) : 0
            }
            done={quest.done}
            track={theme.border}
          />
        ))}
      </Svg>
      <View style={s.core} pointerEvents="box-none">
        <Animated.View style={[s.chestWrap, wobbleStyle]}>
          {chestReady ? <View style={s.chestSlab} /> : null}
          <Pressable
            disabled={!chestReady || busy}
            onPress={onOpen}
            accessibilityRole="button"
            accessibilityLabel={t("retention.quests.open")}
            style={({ pressed }) => [
              s.chest,
              chestReady && s.chestReady,
              pressed && chestReady && s.chestPressed,
            ]}
          >
            {busy ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Ionicons
                name={chestClaimed ? "gift-outline" : "gift"}
                size={38}
                color={
                  chestReady
                    ? "#FFFFFF"
                    : chestClaimed
                      ? theme.textSecondary
                      : "#A49CEC"
                }
              />
            )}
          </Pressable>
          {chestClaimed ? (
            <View style={s.chestCheck}>
              <Ionicons name="checkmark" size={13} color="#FFFFFF" />
            </View>
          ) : null}
        </Animated.View>
        <Text style={s.count}>
          {done}/{base.length}
        </Text>
        <GainFloat gain={gain} style={s.coreGain} />
      </View>
    </View>
  );
}

function RingArc({
  start,
  arc,
  ratio,
  done,
  track,
}: {
  start: number;
  arc: number;
  ratio: number;
  done: boolean;
  track: string;
}) {
  const p = useFill(ratio);
  const center = RING / 2;
  const fillProps = useAnimatedProps(() => ({
    strokeDashoffset: arc * (1 - p.value),
  }));
  return (
    <G rotation={start} origin={`${center}, ${center}`}>
      <Circle
        cx={center}
        cy={center}
        r={RADIUS}
        fill="none"
        stroke={track}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={`${arc} ${CIRCLE}`}
      />
      {ratio > 0 ? (
        <AnimatedCircle
          cx={center}
          cy={center}
          r={RADIUS}
          fill="none"
          stroke={done ? DONE : VIOLET}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${CIRCLE}`}
          animatedProps={fillProps}
        />
      ) : null}
    </G>
  );
}

const MINI = 40;
const MINI_STROKE = 4;
const MINI_R = (MINI - MINI_STROKE) / 2;
const MINI_C = 2 * Math.PI * MINI_R;

function MiniRing({
  ratio,
  color,
  track,
}: {
  ratio: number;
  color: string;
  track: string;
}) {
  const p = useFill(ratio);
  const c = MINI / 2;
  const fillProps = useAnimatedProps(() => ({
    strokeDashoffset: MINI_C * (1 - p.value),
  }));
  return (
    <Svg width={MINI} height={MINI} style={StyleSheet.absoluteFill}>
      <Circle
        cx={c}
        cy={c}
        r={MINI_R}
        fill="none"
        stroke={track}
        strokeWidth={MINI_STROKE}
      />
      {ratio >= 1 ? (
        // 다 차면 둥근 끝끼리 겹친 이음매가 보여서 그냥 한 바퀴로
        <Circle
          cx={c}
          cy={c}
          r={MINI_R}
          fill="none"
          stroke={color}
          strokeWidth={MINI_STROKE}
        />
      ) : ratio > 0 ? (
        <G rotation={-90} origin={`${c}, ${c}`}>
          <AnimatedCircle
            cx={c}
            cy={c}
            r={MINI_R}
            fill="none"
            stroke={color}
            strokeWidth={MINI_STROKE}
            strokeLinecap="round"
            strokeDasharray={`${MINI_C} ${MINI_C}`}
            animatedProps={fillProps}
          />
        </G>
      ) : null}
    </Svg>
  );
}

function QuestLine({
  quest,
  first,
  busy,
  rerolling,
  canReroll,
  gain,
  onClaim,
  onAction,
  onReroll,
}: {
  quest: QuestSlot;
  first: boolean;
  busy: boolean;
  rerolling: boolean;
  canReroll: boolean;
  gain: { n: number; key: number } | null;
  onClaim: () => void;
  onAction: (kind: QuestAction) => void;
  onReroll: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const meta = questIcon(quest);
  const action = questAction(quest.kind);
  const ratio =
    quest.target > 0 ? Math.min(1, quest.progress / quest.target) : 0;
  // 공유·초대·팔로우처럼 한 번 하면 끝나는 건 숫자 없이
  const oneShot = quest.promo && quest.target === 1;
  const showAction = !!action && !quest.done && !quest.claimed;
  const showReroll = canReroll && !quest.done && !quest.claimed;
  const bonus = quest.slot === "bonus";
  const course = quest.course ? LEARN_COURSES[quest.course] : null;
  const ringColor = quest.done ? DONE : bonus ? CHEST : VIOLET;
  const iconColor = quest.done ? DONE_INK : bonus ? CHEST_DEPTH : VIOLET;

  const spin = useSharedValue(0);
  useEffect(() => {
    spin.value = rerolling
      ? withRepeat(withTiming(360, { duration: 600, easing: Easing.linear }), -1)
      : 0;
  }, [rerolling, spin]);
  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));

  return (
    <View style={[s.quest, !first && s.questDivider, bonus && s.bonus]}>
      <View style={s.mini}>
        <MiniRing ratio={ratio} color={ringColor} track={theme.border} />
        <Ionicons
          name={quest.done ? "checkmark" : meta.icon}
          size={17}
          color={iconColor}
        />
      </View>

      <View style={s.qText}>
        <Text
          style={[s.qTitle, quest.claimed && s.qTitleDone]}
          numberOfLines={3}
        >
          {questTitle(t, quest)}
        </Text>
        <Text style={s.qMeta}>
          {t(`retention.quests.tier.${quest.slot}`)}
          {oneShot ? "" : ` · ${quest.progress}/${quest.target}`}
          {course ? `  ${course.flag}` : ""}
        </Text>
      </View>

      <View style={s.qEnd}>
        {quest.claimed ? (
          <Text style={s.stamp}>{t("retention.quests.doneStamp")}</Text>
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
            color={ACTION_TONE[action].color}
            depthColor={ACTION_TONE[action].depth}
            loading={busy}
            onPress={() => onAction(action)}
          />
        ) : (
          <View style={s.reward}>
            <Ionicons name="diamond" size={13} color={GEM_INK} />
            <Text style={s.rewardText}>{quest.gems}</Text>
          </View>
        )}
        {showReroll ? (
          <Pressable
            onPress={onReroll}
            hitSlop={8}
            style={({ pressed }) => [s.swap, pressed && s.swapPressed]}
            accessibilityRole="button"
            accessibilityLabel={t("retention.quests.rerollsLeft", { n: 1 })}
          >
            <Animated.View style={spinStyle}>
              <Ionicons name="shuffle" size={15} color={theme.textSecondary} />
            </Animated.View>
          </Pressable>
        ) : null}
        <GainFloat gain={gain} style={s.rowGain} />
      </View>
    </View>
  );
}

function GainFloat({
  gain,
  style,
}: {
  gain: { n: number; key: number } | null;
  style: object;
}) {
  const y = useSharedValue(0);
  const o = useSharedValue(0);
  useEffect(() => {
    if (!gain) return;
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
  }, [gain, o, y]);
  const anim = useAnimatedStyle(() => ({
    opacity: o.value,
    transform: [{ translateY: y.value }],
  }));
  if (!gain) return null;
  return (
    <Animated.View pointerEvents="none" style={[gainStyles.float, style, anim]}>
      <Ionicons name="diamond" size={13} color={GEM_INK} />
      <Text style={gainStyles.text}>+{gain.n}</Text>
    </Animated.View>
  );
}

// ─────────────────────────── 이번 달 ───────────────────────────

const STOP = 38;

function Month({ monthly }: { monthly: MonthlyView }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const patch = useRetentionStore((st) => st.patch);
  const updateUser = useAuthStore((st) => st.updateUser);
  const [busy, setBusy] = useState<number | null>(null);

  const meta = MONTH_BADGES[monthOf(monthly.month)] ?? MONTH_BADGES[1];
  const earned = monthly.badges.includes(monthly.month);
  const badgeAt =
    monthly.milestones.find((m) => m.badge)?.at ?? monthly.target;
  const claimable = monthly.milestones.find((m) => m.reached && !m.claimed);
  const past = monthly.badges.filter((b) => b !== monthly.month);

  const p = useFill(
    monthly.target > 0 ? Math.min(1, monthly.count / monthly.target) : 0,
  );
  const barStyle = useAnimatedStyle(() => ({ width: `${p.value * 100}%` }));

  const onClaim = async (at: number) => {
    if (busy !== null) return;
    setBusy(at);
    try {
      const res = await RetentionService.claimMonthly(at);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      updateUser({ gems: res.gems } as any);
      patch((sum) => ({ ...sum, gems: res.gems, monthly: res.monthly }));
    } catch {
      // 이미 받았거나 아직 — 다음 새로고침이 맞춘다
    } finally {
      setBusy(null);
    }
  };

  return (
    <View style={s.month}>
      <View style={s.monthHead}>
        <QuestBadge month={monthly.month} size={48} locked={!earned} />
        <View style={s.monthHeadText}>
          <Text style={s.monthTitle}>
            {t("retention.monthly.title", {
              month: monthName(t, monthly.month),
            })}
          </Text>
          <Text style={s.qMeta}>
            {t("retention.monthly.sub", {
              n: monthly.count,
              target: monthly.target,
              d: monthly.daysLeft,
            })}
          </Text>
        </View>
      </View>

      <View style={s.road}>
        <View style={s.roadBar}>
          <Animated.View
            style={[s.roadFill, { backgroundColor: meta.color }, barStyle]}
          />
        </View>
        {monthly.milestones.map((ms) => {
          const pos =
            monthly.target > 0 ? Math.min(1, ms.at / monthly.target) : 1;
          const ready = ms.reached && !ms.claimed;
          return (
            <View
              key={ms.at}
              style={[s.stop, { left: `${pos * 100}%` }]}
              pointerEvents="box-none"
            >
              <Pressable
                disabled={!ready || busy !== null}
                onPress={() => void onClaim(ms.at)}
                hitSlop={6}
                accessibilityRole="button"
                accessibilityLabel={
                  ready ? t("retention.monthly.claim") : String(ms.at)
                }
                style={({ pressed }) => [
                  s.stopDot,
                  ms.claimed && {
                    backgroundColor: meta.color,
                    borderColor: meta.dark,
                  },
                  ready && s.stopReady,
                  pressed && ready && s.stopPressed,
                ]}
              >
                <Ionicons
                  name={ms.claimed ? "checkmark" : ms.badge ? "ribbon" : "gift"}
                  size={14}
                  color={ms.claimed || ready ? "#FFFFFF" : theme.textSecondary}
                />
              </Pressable>
              <Text style={s.stopText}>{ms.at}</Text>
            </View>
          );
        })}
      </View>

      <Text style={[s.badgeLine, earned && { color: meta.dark }]}>
        {earned
          ? t("retention.monthly.badgeEarned")
          : t("retention.monthly.badgeLocked", { n: badgeAt })}
      </Text>

      {claimable ? (
        <Button3D
          label={`${t("retention.monthly.claim")} +${claimable.gems}`}
          icon={<Ionicons name="diamond" size={14} color="#FFFFFF" />}
          color={CHEST}
          depthColor={CHEST_DEPTH}
          loading={busy === claimable.at}
          onPress={() => void onClaim(claimable.at)}
          style={s.claimBtn}
        />
      ) : null}

      {past.length > 0 ? (
        <View style={s.pastBadges}>
          <Text style={s.pastLabel}>{t("retention.monthly.myBadges")}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.pastScroll}
          >
            {past.map((b) => (
              <QuestBadge key={b} month={b} size={34} />
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

const gainStyles = StyleSheet.create({
  float: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  text: { fontSize: 15, fontWeight: "900", color: GEM_INK },
});

const getStyles = (theme: ThemeColors) => {
  const dark = theme.bg !== "#ffffff";
  const card = {
    backgroundColor: theme.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.border,
    shadowColor: "#1A1A2E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  } as const;
  return StyleSheet.create({
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
      backgroundColor: "#1CB0F61A",
    },
    gemText: { fontSize: 13.5, fontWeight: "900", color: GEM_INK },
    state: { flex: 1, alignItems: "center", justifyContent: "center" },
    scroll: { paddingHorizontal: 16, gap: 12 },

    // 오늘의 링
    dial: { alignItems: "center", paddingTop: 8, paddingBottom: 6 },
    ring: { width: RING, height: RING },
    core: {
      ...StyleSheet.absoluteFill,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    chestWrap: {
      width: CHEST_SIZE,
      height: CHEST_SIZE + CHEST_DEPTH_PX,
    },
    chestSlab: {
      position: "absolute",
      top: CHEST_DEPTH_PX,
      width: CHEST_SIZE,
      height: CHEST_SIZE,
      borderRadius: CHEST_SIZE / 2,
      backgroundColor: CHEST_DEPTH,
    },
    chest: {
      width: CHEST_SIZE,
      height: CHEST_SIZE,
      borderRadius: CHEST_SIZE / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: dark ? "#2E2B48" : "#F1EFFC",
    },
    chestReady: { backgroundColor: CHEST },
    chestPressed: { transform: [{ translateY: CHEST_DEPTH_PX }] },
    chestCheck: {
      position: "absolute",
      right: 2,
      bottom: CHEST_DEPTH_PX + 2,
      width: 26,
      height: 26,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: DONE,
      borderWidth: 2,
      borderColor: theme.bg,
    },
    count: {
      fontSize: 24,
      fontWeight: "900",
      color: theme.text,
      fontVariant: ["tabular-nums"],
    },
    coreGain: { bottom: 22 },
    status: {
      maxWidth: 300,
      marginTop: 16,
      textAlign: "center",
      fontSize: 13.5,
      lineHeight: 18,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    statusGold: { color: dark ? "#FFC14D" : "#B46F00" },
    reset: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginTop: 6,
    },
    resetText: {
      fontSize: 12.5,
      fontWeight: "700",
      color: theme.textSecondary,
    },

    // 오늘 목록
    listHead: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 12,
      marginTop: 12,
      marginHorizontal: 4,
    },
    listTitle: { fontSize: 16, fontWeight: "900", color: theme.text },
    swaps: { flexDirection: "row", alignItems: "center", gap: 4 },
    swapsText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    list: { ...card, overflow: "hidden" },
    quest: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 14,
    },
    questDivider: { borderTopWidth: 1, borderTopColor: theme.border },
    bonus: { backgroundColor: dark ? "#2F2A22" : "#FFF8EC" },
    mini: {
      width: MINI,
      height: MINI,
      alignItems: "center",
      justifyContent: "center",
    },
    qText: { flex: 1, gap: 3 },
    qTitle: {
      fontSize: 15,
      lineHeight: 19.5,
      fontWeight: "800",
      color: theme.text,
    },
    qTitleDone: { color: theme.textSecondary },
    qMeta: {
      fontSize: 12.5,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    qEnd: { flexDirection: "row", alignItems: "center", gap: 8 },
    reward: { flexDirection: "row", alignItems: "center", gap: 3 },
    rewardText: {
      fontSize: 14,
      fontWeight: "900",
      color: GEM_INK,
      fontVariant: ["tabular-nums"],
    },
    swap: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.bg,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    swapPressed: { transform: [{ translateY: 1 }] },
    // 끝낸 퀘스트는 사라지지 않고 도장이 찍힌 채 남는다
    stamp: {
      paddingHorizontal: 9,
      paddingVertical: 3,
      borderWidth: 2,
      borderColor: DONE,
      borderRadius: 9,
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 0.3,
      textTransform: "uppercase",
      color: dark ? "#7EE03A" : DONE_INK,
      transform: [{ rotate: "-6deg" }],
    },
    rowGain: { top: -8, right: 4 },

    // 이번 달
    month: { ...card, marginTop: 8, padding: 16 },
    monthHead: { flexDirection: "row", alignItems: "center", gap: 12 },
    monthHeadText: { flex: 1, gap: 2 },
    monthTitle: { fontSize: 16, fontWeight: "900", color: theme.text },
    road: {
      height: 62,
      marginTop: 16,
      marginHorizontal: STOP / 2,
    },
    roadBar: {
      position: "absolute",
      top: (STOP - 10) / 2,
      left: 0,
      right: 0,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
    roadFill: { height: "100%", borderRadius: 5 },
    stop: {
      position: "absolute",
      top: 0,
      width: STOP,
      marginLeft: -STOP / 2,
      alignItems: "center",
      gap: 4,
    },
    stopDot: {
      width: STOP,
      height: STOP,
      borderRadius: STOP / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.surface,
      borderWidth: 3,
      borderColor: theme.border,
    },
    stopReady: {
      backgroundColor: CHEST,
      borderColor: CHEST,
      borderBottomColor: CHEST_DEPTH,
      borderBottomWidth: 4,
    },
    stopPressed: { transform: [{ translateY: 2 }] },
    stopText: {
      fontSize: 11.5,
      fontWeight: "900",
      color: theme.textSecondary,
      fontVariant: ["tabular-nums"],
    },
    badgeLine: {
      marginTop: 4,
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    claimBtn: { marginTop: 12 },
    pastBadges: {
      marginTop: 14,
      paddingTop: 12,
      gap: 8,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    pastLabel: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    pastScroll: { gap: 8, paddingRight: 4 },
  });
};
