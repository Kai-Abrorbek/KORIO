import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
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
  type RetentionSummary,
} from "@/services/retention.service";
import { UserService } from "@/services/user.service";
import { useRetentionStore } from "@/store/retention.store";
import { useAuthStore } from "@/store/auth.store";
import Button3D from "./Button3D";

const GEM = "#3BB6E5";
type Checkin = NonNullable<RetentionSummary["checkin"]>;

/**
 * 홈 — 첫 7일 출석 선물. 하루 한 번, 빠진 날은 다음 날 이어서. 7일째는 SUPER.
 * 7번 다 받으면 서버가 null 을 줘서 카드가 사라진다.
 */
export default function CheckinCard({
  checkin,
  onClaimed,
}: {
  checkin: Checkin;
  /** 받은 직후 (축하 연출을 홈이 띄운다) */
  onClaimed?: (r: { day: number; gems: number; superDays: number }) => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const patch = useRetentionStore((st) => st.patch);
  const updateUser = useAuthStore((st) => st.updateUser);
  const [busy, setBusy] = useState(false);

  const todayIndex = checkin.canClaim ? checkin.count : -1;

  const claim = async () => {
    if (busy || !checkin.canClaim) return;
    setBusy(true);
    try {
      const res = await RetentionService.claimCheckin();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      updateUser({ gems: res.gems } as any);
      patch((sum) => ({
        ...sum,
        gems: res.gems,
        checkin:
          sum.checkin && res.day < sum.checkin.rewards.length
            ? { ...sum.checkin, count: res.day, canClaim: false }
            : null,
      }));
      // SUPER 를 받았으면 isSuper 가 바뀐다 — 계정 정보를 다시 받는다
      if (res.reward.superDays > 0) {
        UserService.getMe()
          .then((me) => updateUser(me as any))
          .catch(() => {});
      }
      onClaimed?.({
        day: res.day,
        gems: res.reward.gems,
        superDays: res.reward.superDays,
      });
    } catch {
      // 이미 받았으면 다음 새로고침이 맞춘다
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={s.card}>
      <View style={s.header}>
        <Ionicons name="calendar" size={18} color="#FF6B9A" />
        <Text style={s.title}>{t("retention.checkin.title")}</Text>
      </View>
      <Text style={s.sub}>{t("retention.checkin.sub")}</Text>

      <View style={s.grid}>
        {checkin.rewards.map((r, i) => (
          <DayTile
            key={r.day}
            day={r.day}
            gems={r.gems}
            superDays={r.superDays}
            claimed={i < checkin.count}
            today={i === todayIndex}
            theme={theme}
          />
        ))}
      </View>

      {checkin.canClaim ? (
        <Button3D
          label={t("retention.checkin.claim")}
          color="#FF6B9A"
          depthColor="#D94877"
          loading={busy}
          onPress={claim}
          icon={<Ionicons name="gift" size={18} color="#FFFFFF" />}
          style={s.cta}
        />
      ) : (
        <View style={s.comeBack}>
          <Ionicons name="moon" size={14} color={theme.textSecondary} />
          <Text style={s.comeBackText}>{t("retention.checkin.tomorrow")}</Text>
        </View>
      )}
    </View>
  );
}

function DayTile({
  day,
  gems,
  superDays,
  claimed,
  today,
  theme,
}: {
  day: number;
  gems: number;
  superDays: number;
  claimed: boolean;
  today: boolean;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const s = getStyles(theme);
  const pulse = useSharedValue(0);
  const isSuper = superDays > 0;

  useEffect(() => {
    if (!today) {
      pulse.value = 0;
      return;
    }
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 800, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
    );
  }, [today]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + 0.06 * pulse.value }],
    shadowOpacity: 0.15 + 0.35 * pulse.value,
  }));

  return (
    <Animated.View
      style={[
        s.tile,
        isSuper && s.tileSuper,
        claimed && s.tileClaimed,
        today && s.tileToday,
        style,
      ]}
    >
      <Text style={[s.tileDay, (isSuper || today) && s.tileDayLight]}>
        {t("retention.checkin.day", { n: day })}
      </Text>
      {claimed ? (
        <View style={s.check}>
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        </View>
      ) : isSuper ? (
        <>
          <Ionicons name="infinite" size={20} color="#FFFFFF" />
          <Text style={s.superText}>SUPER</Text>
        </>
      ) : (
        <>
          <Ionicons name="diamond" size={16} color={today ? "#FFFFFF" : GEM} />
          <Text style={[s.tileGems, today && s.tileDayLight]}>{gems}</Text>
        </>
      )}
    </Animated.View>
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
    header: { flexDirection: "row", alignItems: "center", gap: 8 },
    title: { fontSize: 15.5, fontWeight: "900", color: theme.text },
    sub: {
      marginTop: 4,
      fontSize: 12.5,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    grid: {
      marginTop: 12,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    tile: {
      // 4칸 + (2칸 + SUPER 두 칸 너비) — 7일째가 한눈에 크게 보이게
      width: "22.7%",
      height: 76,
      borderRadius: 14,
      backgroundColor: theme.bg,
      borderWidth: 1.5,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
      shadowColor: "#FF6B9A",
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 10,
      shadowOpacity: 0,
    },
    tileSuper: {
      width: "48.2%",
      backgroundColor: "#776ee2",
      borderColor: "#5a52c4",
    },
    tileClaimed: { opacity: 0.55 },
    tileToday: {
      backgroundColor: "#FF6B9A",
      borderColor: "#D94877",
      elevation: 6,
    },
    tileDay: { fontSize: 11, fontWeight: "900", color: theme.textSecondary },
    tileDayLight: { color: "#FFFFFF" },
    tileGems: { fontSize: 14, fontWeight: "900", color: theme.text },
    superText: { fontSize: 10.5, fontWeight: "900", color: "#FFFFFF" },
    check: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: "#2BB673",
      alignItems: "center",
      justifyContent: "center",
    },
    cta: { marginTop: 14 },
    comeBack: {
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    comeBackText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
    },
  });
