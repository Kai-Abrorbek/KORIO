import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "@/utils/haptics";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useAuthStore } from "@/store/auth.store";
import { useReferralStore } from "@/store/referral.store";
import {
  ReferralApi,
  type ClaimError,
  type MyInvite,
} from "@/services/referral.service";
import FriendAvatar from "@/components/friends/FriendAvatar";

/**
 * 친구 초대 화면.
 *
 * 한 화면에 두 방향이 다 있다.
 *   내보내기 — 내 코드/링크를 공유한다
 *   받기     — 친구 코드를 입력한다 (아직 안 쓴 사람에게만 보인다)
 *
 * 두 개를 따로 만들면 "코드 어디서 넣어요?" 가 문의가 된다. 초대는 한 쌍의
 * 행동이라 한 화면에 있어야 서로를 설명해 준다.
 */
export default function InviteScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isDark = theme.bg.toLowerCase() === "#15151d";
  const s = styles(theme, isDark);

  const params = useLocalSearchParams<{
    code?: string | string[];
    claimedGems?: string | string[];
    from?: string | string[];
  }>();
  const one = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);
  const incoming = one(params.code);
  // 링크로 들어와 자동으로 처리된 경우 — 결과를 이 화면이 대신 보여준다
  const autoGems = Number(one(params.claimedGems) ?? 0);

  const nickname = useAuthStore((st) => st.user?.nickname ?? "");
  const updateUser = useAuthStore((st) => st.updateUser);
  const clearPending = useReferralStore((st) => st.clear);

  const [data, setData] = useState<MyInvite | null>(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState(incoming ?? "");
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState<ClaimError | null>(null);
  const [claimed, setClaimed] = useState<{ gems: number; who: string } | null>(
    autoGems > 0 ? { gems: autoGems, who: one(params.from) ?? "" } : null,
  );

  const load = useCallback(() => {
    ReferralApi.me()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(useCallback(() => void load(), [load]));

  // 보석 아이콘 반짝임
  const shine = useSharedValue(0.5);
  useEffect(() => {
    shine.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [shine]);
  const shineStyle = useAnimatedStyle(() => ({ opacity: shine.value }));

  const reward = data?.rewardGems ?? 1000;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!data?.code) return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await Clipboard.setStringAsync(data.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const share = () => {
    if (!data) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // 링크와 코드를 **둘 다** 넣는다. 앱링크가 아직 검증 안 된 기기에서는
    // 링크가 브라우저로 열리는데, 그때 코드라도 손으로 옮겨 적을 수 있어야 한다.
    void Share.share({
      message: t("invite.shareMessage", {
        nickname,
        gems: reward,
        code: data.code,
        link: data.link,
      }),
    });
  };

  const submit = async () => {
    if (!input.trim() || claiming) return;
    setClaiming(true);
    setClaimError(null);
    try {
      const res = await ReferralApi.claim(input.trim(), "code");
      if (res.success) {
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setClaimed({ gems: res.gems, who: res.inviter.nickname });
        clearPending();
        // 서버가 이미 올렸다. 헤더 보석이 바로 바뀌게 로컬도 맞춘다
        updateUser({
          gems: (useAuthStore.getState().user?.gems ?? 0) + res.gems,
        });
        load();
      } else {
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setClaimError(res.error);
      }
    } catch {
      setClaimError("INVALID_CODE");
    } finally {
      setClaiming(false);
    }
  };

  const nextMilestone = useMemo(
    () => data?.milestones.find((m) => !m.reached) ?? null,
    [data],
  );

  if (loading) {
    return (
      <View style={[s.container, s.center]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={s.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 히어로 */}
        <LinearGradient
          colors={["#9D8DFF", "#776ee2", "#5B4DD4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[s.hero, { paddingTop: insets.top + 12 }]}
        >
          <Pressable
            onPress={() => (router.canGoBack() ? router.back() : router.replace("/(tabs)"))}
            hitSlop={10}
            style={s.back}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </Pressable>

          <Animated.View style={[s.gemBadge, shineStyle]}>
            <Ionicons name="diamond" size={34} color="#7EE8FA" />
          </Animated.View>

          <Text style={s.heroTitle}>{t("invite.heroTitle", { gems: reward })}</Text>
          <Text style={s.heroSub}>{t("invite.heroSub", { gems: reward })}</Text>
        </LinearGradient>

        {/* 내 코드 */}
        <Animated.View entering={FadeInDown.delay(60).duration(480)} style={s.card}>
          <Text style={s.cardLabel}>{t("invite.myCode")}</Text>
          <View style={s.codeRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.code} selectable>
                {data?.code ?? "······"}
              </Text>
              <Pressable
                onPress={copy}
                disabled={!data}
                hitSlop={8}
                style={({ pressed }) => [s.copyBtn, pressed && { opacity: 0.8 }]}
              >
                <Ionicons
                  name={copied ? "checkmark" : "copy-outline"}
                  size={15}
                  color={copied ? "#2BA47F" : theme.primary}
                />
                <Text
                  style={[s.copyText, copied && { color: "#2BA47F" }]}
                >
                  {t(copied ? "invite.copied" : "invite.copy")}
                </Text>
              </Pressable>
            </View>
            {!!data?.link && (
              <Pressable onPress={share} hitSlop={6} style={s.qr}>
                <QRCode value={data.link} size={72} />
              </Pressable>
            )}
          </View>
        </Animated.View>

        {/* 현황 */}
        <Animated.View entering={FadeInDown.delay(120).duration(480)} style={s.statRow}>
          <View style={s.statCard}>
            <Ionicons name="people" size={18} color={theme.primary} />
            <Text style={s.statValue}>{data?.invitedCount ?? 0}</Text>
            <Text style={s.statLabel}>{t("invite.invitedCount")}</Text>
          </View>
          <View style={s.statCard}>
            <Ionicons name="diamond" size={18} color="#2FC4E8" />
            <Text style={s.statValue}>{data?.gemsEarned ?? 0}</Text>
            <Text style={s.statLabel}>{t("invite.gemsEarned")}</Text>
          </View>
        </Animated.View>

        {/* 마일스톤 */}
        <Animated.View entering={FadeInDown.delay(180).duration(480)} style={s.card}>
          <View style={s.cardTopRow}>
            <Text style={s.cardLabel}>{t("invite.milestonesTitle")}</Text>
            {!!nextMilestone && (
              <Text style={s.nextHint}>
                {t("invite.nextMilestone", {
                  n: nextMilestone.count - (data?.invitedCount ?? 0),
                  gems: nextMilestone.gems,
                })}
              </Text>
            )}
          </View>
          <MilestoneRail
            milestones={data?.milestones ?? []}
            invited={data?.invitedCount ?? 0}
            s={s}
            theme={theme}
          />
        </Animated.View>

        {/* 코드 입력 — 아직 아무 코드도 안 쓴 사람에게만 */}
        {data?.canRedeem && !claimed && (
          <Animated.View entering={FadeInDown.delay(240).duration(480)} style={s.card}>
            <Text style={s.cardLabel}>{t("invite.haveCode")}</Text>
            <Text style={s.cardDesc}>{t("invite.haveCodeDesc", { gems: reward })}</Text>
            <View style={s.inputRow}>
              <TextInput
                style={s.input}
                value={input}
                onChangeText={(v) => {
                  setInput(v.toUpperCase());
                  setClaimError(null);
                }}
                placeholder={t("invite.codePlaceholder")}
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={40}
              />
              <Pressable
                onPress={submit}
                disabled={!input.trim() || claiming}
                style={({ pressed }) => [
                  s.submit,
                  (!input.trim() || claiming) && s.submitOff,
                  pressed && { opacity: 0.85 },
                ]}
              >
                {claiming ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={s.submitText}>{t("invite.apply")}</Text>
                )}
              </Pressable>
            </View>
            {!!claimError && (
              <View style={s.errorRow}>
                <Ionicons name="alert-circle" size={15} color="#E24B4A" />
                <Text style={s.errorText}>{t(`invite.err.${claimError}`)}</Text>
              </View>
            )}
          </Animated.View>
        )}

        {/* 코드를 방금 쓴 결과 */}
        {!!claimed && (
          <Animated.View entering={FadeInDown.duration(420)} style={[s.card, s.successCard]}>
            <Ionicons name="checkmark-circle" size={30} color="#2BA47F" />
            <Text style={s.successTitle}>
              {t("invite.claimedTitle", { gems: claimed.gems })}
            </Text>
            <Text style={s.successBody}>
              {t("invite.claimedBody", { nickname: claimed.who })}
            </Text>
          </Animated.View>
        )}

        {/* 초대한 친구 */}
        {!!data?.invited.length && (
          <Animated.View entering={FadeInDown.delay(300).duration(480)} style={s.card}>
            <Text style={s.cardLabel}>{t("invite.joinedFriends")}</Text>
            {data.invited.map((f) => (
              <View key={f.id} style={s.friendRow}>
                <FriendAvatar
                  name={f.nickname}
                  avatar={f.avatar}
                  avatarUri={f.profileImage}
                  size={40}
                />
                <View style={{ flex: 1 }}>
                  <Text style={s.friendName} numberOfLines={1}>
                    {f.nickname}
                  </Text>
                  {!!f.username && (
                    <Text style={s.friendHandle} numberOfLines={1}>
                      {f.username}
                    </Text>
                  )}
                </View>
                <View style={s.gemPill}>
                  <Ionicons name="diamond" size={12} color="#2FC4E8" />
                  <Text style={s.gemPillText}>+{f.gems}</Text>
                </View>
              </View>
            ))}
          </Animated.View>
        )}

        <Text style={s.terms}>{t("invite.terms", { days: 14 })}</Text>
      </ScrollView>

      {/* 하단 고정 CTA */}
      <View style={[s.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <Pressable onPress={share} style={({ pressed }) => [s.cta, pressed && { opacity: 0.9 }]}>
          <LinearGradient
            colors={["#8B82EE", "#6559D2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={s.ctaInner}
          >
            <Ionicons name="share-social" size={20} color="#fff" />
            <Text style={s.ctaText}>{t("invite.shareCta")}</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

/** 초대 인원 계단. 숫자만 나열하면 다음 목표가 안 보인다 */
function MilestoneRail({
  milestones,
  invited,
  s,
  theme,
}: {
  milestones: { count: number; gems: number; reached: boolean; claimed: boolean }[];
  invited: number;
  s: any;
  theme: ThemeColors;
}) {
  const max = milestones.length ? milestones[milestones.length - 1].count : 1;
  const pct = Math.min(100, (invited / max) * 100);

  return (
    <View style={s.rail}>
      <View style={s.railTrack}>
        <View style={[s.railFill, { width: `${pct}%` }]} />
      </View>
      <View style={s.railNodes}>
        {milestones.map((m) => (
          <View key={m.count} style={s.railNode}>
            <View style={[s.nodeDot, m.reached && s.nodeDotOn]}>
              {m.reached ? (
                <Ionicons name="checkmark" size={13} color="#fff" />
              ) : (
                <Text style={s.nodeCount}>{m.count}</Text>
              )}
            </View>
            <Text style={[s.nodeGems, m.reached && { color: theme.primary }]}>
              +{m.gems}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = (theme: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    center: { alignItems: "center", justifyContent: "center" },

    hero: {
      paddingBottom: 26,
      paddingHorizontal: 20,
      alignItems: "center",
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
    },
    back: { position: "absolute", left: 12, top: 0, padding: 10, zIndex: 2 },
    gemBadge: {
      width: 66,
      height: 66,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.18)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.3)",
      marginTop: 18,
    },
    heroTitle: {
      color: "#fff",
      fontSize: 22,
      lineHeight: 29,
      fontWeight: "900",
      textAlign: "center",
      marginTop: 14,
      letterSpacing: -0.4,
    },
    heroSub: {
      color: "rgba(255,255,255,0.86)",
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
      textAlign: "center",
      marginTop: 6,
      paddingHorizontal: 10,
    },

    card: {
      marginTop: 14,
      marginHorizontal: 16,
      padding: 16,
      borderRadius: 22,
      backgroundColor: isDark ? "#22212C" : "#FFFFFF",
      borderWidth: 1,
      borderColor: isDark ? "#35333F" : "#EDEBF7",
      shadowColor: "#514994",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: isDark ? 0.18 : 0.08,
      shadowRadius: 18,
      elevation: 4,
    },
    cardTopRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    cardLabel: { flex: 1, color: theme.text, fontSize: 14.5, fontWeight: "900" },
    cardDesc: {
      color: theme.textSecondary,
      fontSize: 12.5,
      lineHeight: 18,
      fontWeight: "600",
      marginTop: 4,
    },
    nextHint: { color: theme.primary, fontSize: 11.5, fontWeight: "800" },

    codeRow: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 12 },
    code: {
      color: theme.text,
      fontSize: 32,
      fontWeight: "900",
      letterSpacing: 4,
      fontVariant: ["tabular-nums"],
    },
    copyBtn: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      gap: 5,
      marginTop: 8,
      paddingHorizontal: 11,
      paddingVertical: 7,
      borderRadius: 999,
      backgroundColor: isDark ? "#2A2740" : "#F3F0FF",
    },
    copyText: { color: theme.primary, fontSize: 12.5, fontWeight: "800" },
    qr: { padding: 7, borderRadius: 12, backgroundColor: "#fff" },

    statRow: { flexDirection: "row", gap: 12, marginTop: 14, marginHorizontal: 16 },
    statCard: {
      flex: 1,
      alignItems: "center",
      gap: 3,
      paddingVertical: 14,
      borderRadius: 18,
      backgroundColor: isDark ? "#22212C" : "#FFFFFF",
      borderWidth: 1,
      borderColor: isDark ? "#35333F" : "#EDEBF7",
    },
    statValue: {
      color: theme.text,
      fontSize: 21,
      fontWeight: "900",
      fontVariant: ["tabular-nums"],
    },
    statLabel: { color: theme.textSecondary, fontSize: 11, fontWeight: "700" },

    rail: { marginTop: 18 },
    railTrack: {
      height: 6,
      borderRadius: 3,
      backgroundColor: isDark ? "#35334A" : "#EEEBFB",
      marginHorizontal: 16,
    },
    railFill: { height: "100%", borderRadius: 3, backgroundColor: theme.primary },
    railNodes: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: -13,
    },
    railNode: { alignItems: "center", gap: 4, width: 56 },
    nodeDot: {
      width: 26,
      height: 26,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "#35334A" : "#EEEBFB",
      borderWidth: 2,
      borderColor: isDark ? "#22212C" : "#FFFFFF",
    },
    nodeDotOn: { backgroundColor: theme.primary },
    nodeCount: { color: theme.textSecondary, fontSize: 11, fontWeight: "900" },
    nodeGems: { color: theme.textSecondary, fontSize: 10.5, fontWeight: "800" },

    inputRow: { flexDirection: "row", gap: 10, marginTop: 12 },
    input: {
      flex: 1,
      height: 50,
      borderRadius: 14,
      paddingHorizontal: 14,
      fontSize: 17,
      fontWeight: "800",
      letterSpacing: 2,
      color: theme.text,
      backgroundColor: isDark ? "#2A2836" : "#F6F5FB",
      borderWidth: 1.5,
      borderColor: isDark ? "#3D3B4C" : "#E7E4F3",
    },
    submit: {
      minWidth: 76,
      height: 50,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary,
      paddingHorizontal: 14,
    },
    submitOff: { backgroundColor: theme.border },
    submitText: { color: "#fff", fontSize: 14.5, fontWeight: "900" },
    errorRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 9 },
    errorText: { flex: 1, color: "#E24B4A", fontSize: 12, fontWeight: "700" },

    successCard: { alignItems: "center", gap: 6, paddingVertical: 22 },
    successTitle: { color: theme.text, fontSize: 17, fontWeight: "900" },
    successBody: {
      color: theme.textSecondary,
      fontSize: 12.5,
      fontWeight: "600",
      textAlign: "center",
    },

    friendRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 9,
    },
    friendName: { color: theme.text, fontSize: 14.5, fontWeight: "800" },
    friendHandle: { color: theme.textSecondary, fontSize: 11.5, fontWeight: "600" },
    gemPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 999,
      backgroundColor: isDark ? "#20323A" : "#E6F7FB",
    },
    gemPillText: { color: "#1B93AE", fontSize: 11.5, fontWeight: "900" },

    terms: {
      color: theme.textSecondary,
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "500",
      textAlign: "center",
      marginTop: 16,
      marginHorizontal: 28,
    },

    footer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingTop: 12,
      paddingHorizontal: 20,
      backgroundColor: theme.bg,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: isDark ? "#2C2B35" : "#EDEBF7",
    },
    cta: {
      borderRadius: 18,
      shadowColor: "#5549BB",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.26,
      shadowRadius: 16,
      elevation: 7,
    },
    ctaInner: {
      minHeight: 56,
      borderRadius: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
    },
    ctaText: { color: "#fff", fontSize: 16.5, fontWeight: "900" },
  });
