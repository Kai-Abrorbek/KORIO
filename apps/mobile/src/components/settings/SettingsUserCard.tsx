import { useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import { useAuthStore } from "@/store/auth.store";
import { TRIAL_DAYS } from "@/constants/trial";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { AvatarConfig } from "@/types/avatar";

interface Props {
  name: string;
  avatar?: Partial<AvatarConfig> | null;
  onProfilePress?: () => void;
  onSubscribePress?: () => void;
}

export default function SettingsUserCard({
  name,
  avatar,
  onProfilePress,
  onSubscribePress,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const user = useAuthStore((st) => st.user);
  // 하드코딩 false 였다. 구독자한테도 "무료 체험하세요" 가 떠 있었다
  const isPremium = !!user?.isSuper;
  const isTrial = user?.superPlan === "trial";

  const trialLeft = useMemo(() => {
    if (!isPremium || !isTrial || !user?.superExpiresAt) return 0;
    const ms = new Date(user.superExpiresAt).getTime() - Date.now();
    return ms <= 0 ? 0 : Math.ceil(ms / 86_400_000);
  }, [isPremium, isTrial, user?.superExpiresAt]);

  /**
   * 툴팁이 뜨는 경우는 둘뿐이다.
   *  체험 중        → 남은 일수를 알려준다
   *  체험을 안 써봤음 → 무료 체험을 권한다
   * 결제 구독자거나 체험을 이미 써버린 유저에게는 아무것도 약속하지 않는다
   * (superPlan 이 'trial' 로 남아 있으면 만료돼도 체험을 쓴 계정이다)
   */
  const tip = isPremium
    ? isTrial
      ? {
          badge: "SUPER",
          title: t("settings.user.trialActive"),
          desc: t("settings.user.trialLeftDays", { count: trialLeft }),
        }
      : null
    : isTrial
      ? null
      : {
          badge: "FREE",
          title: t("settings.user.freeTooltip"),
          desc: t("settings.user.freeTooltipDesc", { days: TRIAL_DAYS }),
        };
  // 툴팁 둥둥 애니메이션
  const bob = useSharedValue(0);
  useEffect(() => {
    bob.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(3, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [bob]);

  const tooltipStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bob.value }],
  }));

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.userRow}
        onPress={onProfilePress}
        activeOpacity={0.7}
      >
        <View style={styles.avatarBg}>
          {avatar ? (
            <AvatarPreview avatar={avatar} size={64} showBackground={false} />
          ) : (
            <HaneulmonMascot size={56} mood="default" />
          )}
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={22}
          color={theme.textSecondary}
        />
      </TouchableOpacity>
      {!!tip && (
        <Animated.View style={[styles.tooltipWrap, tooltipStyle]}>
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>
              <Text style={styles.tooltipFree}>{tip.badge}</Text> {tip.title}
            </Text>
            <Text style={styles.tooltipDesc}>{tip.desc}</Text>
          </View>
          <View style={styles.tooltipArrow} />
        </Animated.View>
      )}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onSubscribePress}
        style={[styles.subscribeWrap, !tip && styles.subscribeWrapAlone]}
      >
        <LinearGradient
          colors={["#9990EE", "#776ee2", "#6557D9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.subscribeBtn}
        >
          <View style={styles.pBadge}>
            <Text style={styles.pBadgeText}>P</Text>
          </View>
          <Text style={styles.subscribeText}>
            {t(
              isPremium && !isTrial
                ? "settings.user.manage"
                : "settings.user.subscribe",
            )}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 22,
    },
    userRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    avatarBg: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    name: {
      flex: 1,
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
    },
    tooltipWrap: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 12,
      marginBottom: 0,
    },
    tooltip: {
      backgroundColor: "#2C2C36",
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 12,
      alignItems: "center",
    },
    tooltipText: {
      fontSize: 14,
      fontWeight: "700",
      color: "#fff",
    },
    tooltipFree: {
      color: "#FFCC00",
      fontWeight: "900",
    },
    tooltipDesc: {
      fontSize: 13,
      fontWeight: "600",
      color: "#fff",
      marginTop: 2,
    },
    tooltipArrow: {
      width: 0,
      height: 0,
      borderLeftWidth: 8,
      borderRightWidth: 8,
      borderTopWidth: 9,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: "#2C2C36",
      marginTop: -1,
    },
    subscribeWrapAlone: {
      marginTop: 18,
    },
    subscribeWrap: {
      marginTop: 4,
      borderRadius: 14,
      overflow: "hidden",
      shadowColor: "#776ee2",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 6,
    },
    subscribeBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      gap: 12,
    },
    pBadge: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: "rgba(255,255,255,0.25)",
      alignItems: "center",
      justifyContent: "center",
    },
    pBadgeText: {
      fontSize: 15,
      fontWeight: "900",
      color: "#fff",
    },
    subscribeText: {
      fontSize: 16,
      fontWeight: "800",
      color: "#fff",
      letterSpacing: 0.3,
    },
  });
