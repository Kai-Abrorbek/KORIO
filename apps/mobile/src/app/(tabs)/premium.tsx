import { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { PREMIUM_FEATURES } from "@/features/subscription/services/products";
import {
  perMonthPrice,
  savingPercent,
  type StorePlan,
} from "@/features/subscription/services/billing.service";
import { useBilling } from "@/features/subscription/hooks/useBilling";
import { useSubscription } from "@/features/subscription/hooks/useSubscription";

const { width } = Dimensions.get("window");

export default function PremiumScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);

  const { subscription, isPremium, loading: subLoading, refresh } =
    useSubscription();
  const {
    supported,
    connected,
    plans,
    phase,
    busy,
    error,
    subscribe,
    restore,
    reloadPlans,
  } = useBilling(refresh);

  const [selected, setSelected] = useState<string | null>(null);

  // 기본 선택: 무료 체험이 붙은 것 > 가장 할인율 높은 것
  useEffect(() => {
    if (selected || !plans.length) return;
    const trial = plans.find((p) => p.hasFreeTrial);
    if (trial) return setSelected(trial.productId);
    const best = plans.reduce((a, b) =>
      savingPercent(b, plans) > savingPercent(a, plans) ? b : a,
    );
    setSelected(best.productId);
  }, [plans, selected]);

  // 로고 반짝임
  const shimmer = useSharedValue(0.5);
  useEffect(() => {
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);
  const shimmerStyle = useAnimatedStyle(() => ({ opacity: shimmer.value }));

  const selectedPlan = useMemo(
    () => plans.find((p) => p.productId === selected) ?? null,
    [plans, selected],
  );

  if (subLoading && !subscription) {
    return (
      <View style={[s.container, s.center]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // ── 이미 구독중 ──
  if (isPremium) {
    return (
      <ScrollView
        style={s.container}
        contentContainerStyle={[
          s.activeWrap,
          { paddingBottom: insets.bottom + 40 },
        ]}
      >
        <LinearGradient
          colors={["#9D8DFF", "#776ee2", "#5B4DD4"]}
          style={s.activeBadge}
        >
          <Ionicons name="star" size={40} color="#fff" />
        </LinearGradient>
        <Text style={s.activeTitle}>{t("premium.activeTitle")}</Text>
        <Text style={s.activeSub}>
          {subscription?.isTrial
            ? t("premium.trialLeft", {
                days: subscription.trialDaysLeft ?? 0,
              })
            : t("premium.activeSub")}
        </Text>

        <View style={s.activeCard}>
          {PREMIUM_FEATURES.map((f) => (
            <View key={f.key} style={s.activeFeatureRow}>
              <Ionicons name={f.icon as any} size={20} color="#58CC02" />
              <Text style={s.activeFeatureText}>
                {t(`premium.features.${f.key}`)}
              </Text>
            </View>
          ))}
        </View>

        {!!subscription?.expiresAt && (
          <Text style={s.expiresNote}>
            {subscription.autoRenew
              ? t("premium.renewsOn", {
                  date: formatDate(subscription.expiresAt),
                })
              : t("premium.endsOn", {
                  date: formatDate(subscription.expiresAt),
                })}
          </Text>
        )}
        <Text style={s.manageNote}>{t("premium.manageInStore")}</Text>
      </ScrollView>
    );
  }

  // ── 구독 안내 ──
  const showPlans = supported && connected && plans.length > 0;

  return (
    <View style={s.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 히어로 */}
        <LinearGradient
          colors={["#9D8DFF", "#776ee2", "#5B4DD4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.hero}
        >
          <Animated.View style={[s.shine, shimmerStyle]} />
          <View style={s.crownWrap}>
            <Ionicons name="star" size={36} color="#FFD93D" />
          </View>
          <View style={s.logoRow}>
            <Text style={s.logoKorio}>KORIO</Text>
            <View style={s.superTag}>
              <Text style={s.superTagText}>SUPER</Text>
            </View>
          </View>
          <Text style={s.heroSub}>{t("premium.heroSub")}</Text>
        </LinearGradient>

        {/* 혜택 */}
        <View style={s.section}>
          {PREMIUM_FEATURES.map((f) => (
            <View key={f.key} style={s.featureRow}>
              <View style={s.featureIcon}>
                <Ionicons
                  name={f.icon as any}
                  size={22}
                  color={theme.primary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.featureTitle}>
                  {t(`premium.features.${f.key}`)}
                </Text>
                <Text style={s.featureDesc}>
                  {t(`premium.featuresDesc.${f.key}`)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* 요금제 — 가격은 전부 스토어가 준 값이다 */}
        {showPlans ? (
          <View style={s.plans}>
            {plans.map((plan) => (
              <PlanCard
                key={plan.productId}
                plan={plan}
                plans={plans}
                selected={selected === plan.productId}
                onPress={() => setSelected(plan.productId)}
                theme={theme}
                s={s}
                t={t}
              />
            ))}
          </View>
        ) : (
          <StoreUnavailable
            supported={supported}
            connected={connected}
            loading={phase === "loading"}
            onRetry={reloadPlans}
            s={s}
            t={t}
            theme={theme}
          />
        )}

        {!!error && <Text style={s.errorText}>{t(`premium.err.generic`)}</Text>}

        {/* 복원 */}
        {supported && (
          <TouchableOpacity
            style={s.restoreBtn}
            onPress={restore}
            disabled={busy}
            activeOpacity={0.7}
          >
            <Text style={s.restoreText}>
              {phase === "restoring"
                ? t("premium.restoring")
                : t("premium.restore")}
            </Text>
          </TouchableOpacity>
        )}

        <Text style={s.terms}>{t("premium.terms")}</Text>
      </ScrollView>

      {/* 하단 고정 CTA — ScrollView 밖. 홈버튼/네비바에 안 가리게 SafeArea */}
      {showPlans && (
        <View style={[s.ctaBar, { paddingBottom: insets.bottom + 12 }]}>
          {!!selectedPlan && (
            <Text style={s.ctaNote}>
              {t("premium.billedAs", {
                price: selectedPlan.displayPrice,
                period: t(
                  `premium.plans.${planKey(selectedPlan.productId)}`,
                ),
              })}
            </Text>
          )}
          <TouchableOpacity
            style={[s.cta, busy && s.ctaDisabled]}
            onPress={() => selectedPlan && subscribe(selectedPlan)}
            disabled={busy || !selectedPlan}
            activeOpacity={0.9}
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={s.ctaText}>
                {selectedPlan?.hasFreeTrial
                  ? t("premium.startTrialFree")
                  : t("premium.subscribe")}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

/** 상품 id → i18n 키 */
function planKey(productId: string): string {
  if (productId.includes("3months")) return "threeMonths";
  if (productId.includes("6months")) return "sixMonths";
  if (productId.includes("yearly")) return "yearly";
  return "monthly";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString();
}

function PlanCard({
  plan,
  plans,
  selected,
  onPress,
  theme,
  s,
  t,
}: {
  plan: StorePlan;
  plans: StorePlan[];
  selected: boolean;
  onPress: () => void;
  theme: ThemeColors;
  s: any;
  t: any;
}) {
  const save = savingPercent(plan, plans);
  const press = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * 2 }],
  }));

  return (
    <Animated.View style={animStyle}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={() => (press.value = withTiming(1, { duration: 80 }))}
        onPressOut={() => (press.value = withTiming(0, { duration: 120 }))}
        onPress={onPress}
        style={[s.planCard, selected && s.planCardSel]}
      >
        {save > 0 && (
          <View style={s.saveTag}>
            <Text style={s.saveTagText}>
              {t("premium.save", { percent: save })}
            </Text>
          </View>
        )}
        <View style={s.planLeft}>
          <View style={[s.radio, selected && s.radioSel]}>
            {selected && <View style={s.radioDot} />}
          </View>
          <View>
            <Text style={s.planName}>
              {t(`premium.plans.${planKey(plan.productId)}`)}
            </Text>
            {plan.hasFreeTrial ? (
              <Text style={s.planTrial}>{t("premium.hasFreeTrial")}</Text>
            ) : plan.months > 1 ? (
              <Text style={s.planTrial}>
                {t("premium.totalPrice", { price: plan.displayPrice })}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={s.planRight}>
          <Text style={s.planPrice}>{perMonthPrice(plan)}</Text>
          <Text style={s.planPer}>{t("premium.perMonth")}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

/** 스토어에서 상품을 못 가져온 경우. 빈 화면 대신 이유를 말해준다 */
function StoreUnavailable({
  supported,
  connected,
  loading,
  onRetry,
  s,
  t,
  theme,
}: {
  supported: boolean;
  connected: boolean;
  loading: boolean;
  onRetry: () => void;
  s: any;
  t: any;
  theme: ThemeColors;
}) {
  if (loading) {
    return (
      <View style={s.storeBox}>
        <ActivityIndicator color={theme.primary} />
        <Text style={s.storeText}>{t("premium.loadingPlans")}</Text>
      </View>
    );
  }

  return (
    <View style={s.storeBox}>
      <Ionicons
        name="cloud-offline-outline"
        size={30}
        color={theme.textSecondary}
      />
      <Text style={s.storeText}>
        {!supported
          ? t("premium.err.platformUnsupported")
          : !connected
            ? t("premium.err.storeDisconnected")
            : t("premium.err.noProducts")}
      </Text>
      {supported && (
        <TouchableOpacity
          style={s.retryBtn}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Text style={s.retryText}>{t("premium.retry")}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    center: { alignItems: "center", justifyContent: "center" },

    hero: {
      paddingTop: 70,
      paddingBottom: 36,
      paddingHorizontal: 24,
      alignItems: "center",
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
      overflow: "hidden",
    },
    shine: {
      position: "absolute",
      top: -60,
      left: -80,
      width: width * 0.6,
      height: "240%",
      backgroundColor: "rgba(255,255,255,0.12)",
      transform: [{ rotate: "22deg" }],
    },
    crownWrap: {
      width: 72,
      height: 72,
      borderRadius: 24,
      backgroundColor: "rgba(255,255,255,0.18)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    logoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    logoKorio: {
      fontSize: 34,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: 1,
    },
    superTag: {
      backgroundColor: "#FFD93D",
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
      transform: [{ rotate: "-3deg" }],
    },
    superTagText: {
      fontSize: 18,
      fontWeight: "900",
      color: "#5B4DD4",
      letterSpacing: 1,
    },
    heroSub: {
      fontSize: 15,
      color: "rgba(255,255,255,0.9)",
      marginTop: 12,
      textAlign: "center",
      fontWeight: "600",
    },

    section: { paddingHorizontal: 20, paddingTop: 28, gap: 18 },
    featureRow: { flexDirection: "row", alignItems: "center", gap: 14 },
    featureIcon: {
      width: 46,
      height: 46,
      borderRadius: 14,
      backgroundColor: theme.primary + "18",
      alignItems: "center",
      justifyContent: "center",
    },
    featureTitle: { fontSize: 16, fontWeight: "800", color: theme.text },
    featureDesc: { fontSize: 13, color: theme.textSecondary, marginTop: 2 },

    plans: { paddingHorizontal: 20, paddingTop: 28, gap: 12 },
    planCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 18,
      padding: 16,
      backgroundColor: theme.surface,
    },
    planCardSel: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "0D",
    },
    saveTag: {
      position: "absolute",
      top: -10,
      right: 16,
      backgroundColor: "#58CC02",
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 3,
    },
    saveTagText: {
      fontSize: 11,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: 0.5,
    },
    planLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
    radio: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    radioSel: { borderColor: theme.primary },
    radioDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.primary,
    },
    planName: { fontSize: 17, fontWeight: "800", color: theme.text },
    planTrial: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      marginTop: 2,
    },
    planRight: { alignItems: "flex-end" },
    planPrice: { fontSize: 19, fontWeight: "900", color: theme.text },
    planPer: { fontSize: 12, color: theme.textSecondary },

    storeBox: {
      marginHorizontal: 20,
      marginTop: 28,
      padding: 24,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: "center",
      gap: 12,
    },
    storeText: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 20,
    },
    retryBtn: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: theme.primary + "18",
    },
    retryText: { fontSize: 14, fontWeight: "800", color: theme.primary },

    errorText: {
      marginTop: 16,
      marginHorizontal: 20,
      fontSize: 13,
      color: "#E5533D",
      textAlign: "center",
    },

    restoreBtn: { marginTop: 20, alignItems: "center", paddingVertical: 8 },
    restoreText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.primary,
      textDecorationLine: "underline",
    },

    terms: {
      fontSize: 11,
      color: theme.textSecondary,
      marginTop: 12,
      marginHorizontal: 24,
      textAlign: "center",
      opacity: 0.7,
      lineHeight: 16,
    },

    // 하단 고정 CTA
    ctaBar: {
      paddingHorizontal: 20,
      paddingTop: 12,
      backgroundColor: theme.bg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    ctaNote: {
      fontSize: 13,
      color: theme.textSecondary,
      textAlign: "center",
      marginBottom: 10,
    },
    cta: {
      width: "100%",
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: "center",
      borderBottomWidth: 4,
      borderColor: "#5B4DD4",
    },
    ctaDisabled: { opacity: 0.6 },
    ctaText: { color: "#fff", fontSize: 18, fontWeight: "900" },

    // 구독중 화면
    activeWrap: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 30,
      paddingTop: 60,
      flexGrow: 1,
    },
    activeBadge: {
      width: 88,
      height: 88,
      borderRadius: 28,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    activeTitle: {
      fontSize: 26,
      fontWeight: "900",
      color: theme.text,
      marginBottom: 6,
    },
    activeSub: {
      fontSize: 15,
      color: theme.textSecondary,
      textAlign: "center",
      marginBottom: 28,
    },
    activeCard: {
      width: "100%",
      backgroundColor: theme.surface,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: theme.border,
      padding: 20,
      gap: 16,
    },
    activeFeatureRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    activeFeatureText: { fontSize: 15, fontWeight: "700", color: theme.text },
    expiresNote: {
      marginTop: 20,
      fontSize: 13,
      color: theme.textSecondary,
      textAlign: "center",
    },
    manageNote: {
      marginTop: 8,
      fontSize: 12,
      color: theme.textSecondary,
      textAlign: "center",
      opacity: 0.7,
      lineHeight: 18,
    },
  });
