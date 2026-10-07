import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import * as Haptics from "@/utils/haptics";
import {
  RetentionService,
  type MonthlyView,
} from "@/services/retention.service";
import { useRetentionStore } from "@/store/retention.store";
import { useAuthStore } from "@/store/auth.store";
import Button3D from "./Button3D";
import QuestBadge from "./QuestBadge";
import { MONTH_BADGES, monthName, monthOf } from "../questMeta";

const MARKER = 28;

/**
 * 홈 — 월간 챌린지. 이번 달에 받은 퀘스트 수가 막대를 채우고,
 * 칸(5·12·20)마다 보상, 끝 칸은 그 달 한정 배지 (프로필에 남는다).
 */
export default function MonthlyChallengeCard({
  monthly,
}: {
  monthly: MonthlyView;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const patch = useRetentionStore((st) => st.patch);
  const updateUser = useAuthStore((st) => st.updateUser);
  const [busy, setBusy] = useState<number | null>(null);

  const meta = MONTH_BADGES[monthOf(monthly.month)] ?? MONTH_BADGES[1];
  const earned = monthly.badges.includes(monthly.month);
  const badgeAt = monthly.milestones.find((m) => m.badge)?.at ?? monthly.target;
  const claimable = monthly.milestones.find((m) => m.reached && !m.claimed);
  const ratio =
    monthly.target > 0 ? Math.min(1, monthly.count / monthly.target) : 0;

  const fill = useSharedValue(0);
  useEffect(() => {
    fill.value = withTiming(ratio, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
  }, [ratio]);
  const fillStyle = useAnimatedStyle(() => ({ width: `${fill.value * 100}%` }));

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

  const past = monthly.badges.filter((b) => b !== monthly.month);

  return (
    <View style={s.card}>
      <View style={s.head}>
        <QuestBadge month={monthly.month} size={56} locked={!earned} />
        <View style={s.headText}>
          <Text style={s.title}>
            {t("retention.monthly.title", {
              month: monthName(t, monthly.month),
            })}
          </Text>
          <Text style={s.sub}>
            {t("retention.monthly.sub", {
              n: monthly.count,
              target: monthly.target,
              d: monthly.daysLeft,
            })}
          </Text>
          <Text style={[s.badgeLine, earned && { color: meta.dark }]}>
            {earned
              ? t("retention.monthly.badgeEarned")
              : t("retention.monthly.badgeLocked", { n: badgeAt })}
          </Text>
        </View>
      </View>

      {/* 막대 + 보상 칸 */}
      <View style={s.trackWrap}>
        <View style={s.track}>
          <Animated.View
            style={[s.fill, { backgroundColor: meta.color }, fillStyle]}
          >
            <View style={s.fillShine} />
          </Animated.View>
        </View>
        {monthly.milestones.map((ms) => {
          const pos =
            monthly.target > 0 ? Math.min(1, ms.at / monthly.target) : 1;
          const ready = ms.reached && !ms.claimed;
          return (
            <View
              key={ms.at}
              style={[s.markerSlot, { left: `${pos * 100}%` }]}
              pointerEvents="box-none"
            >
              <Pressable
                disabled={!ready || busy !== null}
                onPress={() => void onClaim(ms.at)}
                hitSlop={6}
                style={[
                  s.marker,
                  ms.claimed && {
                    backgroundColor: meta.color,
                    borderColor: meta.dark,
                  },
                  ready && s.markerReady,
                ]}
              >
                <Ionicons
                  name={ms.claimed ? "checkmark" : ms.badge ? "ribbon" : "gift"}
                  size={14}
                  color={ms.claimed || ready ? "#FFFFFF" : theme.textSecondary}
                />
              </Pressable>
              <Text style={s.markerText}>{ms.at}</Text>
            </View>
          );
        })}
      </View>

      {claimable ? (
        <Button3D
          label={`${t("retention.monthly.claim")} +${claimable.gems}`}
          icon={<Ionicons name="diamond" size={14} color="#FFFFFF" />}
          color="#FFB020"
          depthColor="#D48A00"
          loading={busy === claimable.at}
          onPress={() => void onClaim(claimable.at)}
          style={s.claimBtn}
        />
      ) : null}

      {past.length > 0 ? (
        <View style={s.badges}>
          <Text style={s.badgesLabel}>{t("retention.monthly.myBadges")}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.badgesScroll}
          >
            {past.map((b) => (
              <QuestBadge key={b} month={b} size={36} />
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

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
    head: { flexDirection: "row", alignItems: "center", gap: 14 },
    headText: { flex: 1, gap: 2 },
    title: { fontSize: 15.5, fontWeight: "900", color: theme.text },
    sub: { fontSize: 12.5, fontWeight: "700", color: theme.textSecondary },
    badgeLine: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.textSecondary,
      marginTop: 2,
    },
    trackWrap: {
      marginTop: 18,
      marginBottom: 22,
      marginRight: MARKER / 2,
      height: MARKER,
      justifyContent: "center",
    },
    track: {
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
    fill: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      borderRadius: 6,
      overflow: "hidden",
    },
    fillShine: {
      position: "absolute",
      top: 2,
      left: 4,
      right: 4,
      height: 3,
      borderRadius: 2,
      backgroundColor: "rgba(255,255,255,0.35)",
    },
    markerSlot: {
      position: "absolute",
      top: 0,
      width: MARKER,
      marginLeft: -MARKER / 2,
      alignItems: "center",
    },
    marker: {
      width: MARKER,
      height: MARKER,
      borderRadius: MARKER / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 3,
    },
    markerReady: { backgroundColor: "#FFB020", borderColor: "#D48A00" },
    markerText: {
      marginTop: 3,
      fontSize: 10.5,
      fontWeight: "900",
      color: theme.textSecondary,
    },
    claimBtn: { marginTop: 2 },
    badges: { marginTop: 14, gap: 8 },
    badgesLabel: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    badgesScroll: { gap: 10, paddingRight: 4 },
  });
