import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "expo-router";
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
import { useAuthStore } from "@/store/auth.store";
import { SubscriptionService } from "@/services/subscription.service";

const { width } = Dimensions.get("window");

export default function PremiumScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  const user = useAuthStore((st) => st.user);
  const updateUser = useAuthStore((st) => st.updateUser);

  const [plans, setPlans] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("yearly");
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [mySub, setMySub] = useState<any>(null);

  // 로고 반짝임
  const shimmer = useSharedValue(0);
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

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      Promise.all([
        SubscriptionService.getPlans(),
        SubscriptionService.getMySubscription(),
      ])
        .then(([p, me]) => {
          setPlans(p.plans ?? []);
          setFeatures(p.features ?? []);
          setMySub(me);
          const pop = (p.plans ?? []).find((x: any) => x.popular);
          if (pop) setSelected(pop.id);
        })
        .catch((e) => console.error("플랜 로드 실패:", e))
        .finally(() => setLoading(false));
    }, []),
  );

  const handleSubscribe = async () => {
    setSubscribing(true);
    try {
      const res = await SubscriptionService.subscribe(selected);
      updateUser({ isSuper: true } as any);
      setMySub({ isSuper: true, plan: res.plan, expiresAt: res.expiresAt });
    } catch (e) {
      console.error("구독 실패:", e);
    } finally {
      setSubscribing(false);
    }
  };

  const selectedPlan = plans.find((p) => p.id === selected);

  if (loading) {
    return (
      <View style={[s.container, s.center]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // 이미 구독중
  if (mySub?.isSuper) {
    return (
      <View style={[s.container, s.center, { paddingHorizontal: 30 }]}>
        <LinearGradient
          colors={["#9D8DFF", "#776ee2", "#5B4DD4"]}
          style={s.activeBadge}
        >
          <Ionicons name="star" size={40} color="#fff" />
        </LinearGradient>
        <Text style={s.activeTitle}>{t("premium.activeTitle")}</Text>
        <Text style={s.activeSub}>{t("premium.activeSub")}</Text>
        <View style={s.activeCard}>
          {features.map((f) => (
            <View key={f.key} style={s.activeFeatureRow}>
              <Ionicons name={f.icon} size={20} color="#58CC02" />
              <Text style={s.activeFeatureText}>
                {t(`premium.features.${f.key}`)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={{ paddingBottom: 40 }}
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

      {/* 혜택 리스트 */}
      <View style={s.section}>
        {features.map((f, i) => (
          <View key={f.key} style={s.featureRow}>
            <View style={s.featureIcon}>
              <Ionicons name={f.icon} size={22} color={theme.primary} />
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

      {/* 요금제 */}
      <View style={s.plans}>
        {plans.map((plan) => {
          const isSel = selected === plan.id;
          return (
            <TouchableOpacity
              key={plan.id}
              activeOpacity={0.9}
              onPress={() => setSelected(plan.id)}
              style={[s.planCard, isSel && s.planCardSel]}
            >
              {plan.popular && (
                <View style={s.popularTag}>
                  <Text style={s.popularText}>{t("premium.popular")}</Text>
                </View>
              )}
              <View style={s.planLeft}>
                <View style={[s.radio, isSel && s.radioSel]}>
                  {isSel && <View style={s.radioDot} />}
                </View>
                <View>
                  <Text style={s.planName}>
                    {t(`premium.plans.${plan.name}`)}
                  </Text>
                  {plan.discountPercent ? (
                    <Text style={s.planSave}>
                      {t("premium.save", { percent: plan.discountPercent })}
                    </Text>
                  ) : plan.trialDays ? (
                    <Text style={s.planTrial}>
                      {t("premium.trial", { days: plan.trialDays })}
                    </Text>
                  ) : null}
                </View>
              </View>
              <View style={s.planRight}>
                <Text style={s.planPrice}>
                  ${plan.pricePerMonthUsd.toFixed(2)}
                </Text>
                <Text style={s.planPer}>{t("premium.perMonth")}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* CTA */}
      <View style={s.ctaWrap}>
        <TouchableOpacity
          style={s.cta}
          onPress={handleSubscribe}
          disabled={subscribing}
          activeOpacity={0.9}
        >
          {subscribing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={s.ctaText}>
              {selectedPlan?.trialDays
                ? t("premium.startTrial", { days: selectedPlan.trialDays })
                : t("premium.subscribe")}
            </Text>
          )}
        </TouchableOpacity>
        <Text style={s.ctaNote}>
          {selectedPlan
            ? t("premium.billedAs", {
                price: selectedPlan.priceUsd.toFixed(2),
                period: t(`premium.plans.${selectedPlan.name}`),
              })
            : ""}
        </Text>
        <Text style={s.terms}>{t("premium.terms")}</Text>
      </View>
    </ScrollView>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, marginBottom: 20 },
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
      borderRadius: 18,
      padding: 16,
      backgroundColor: theme.surface,
    },
    planCardSel: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "0D",
    },
    popularTag: {
      position: "absolute",
      top: -10,
      right: 16,
      backgroundColor: theme.primary,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 3,
    },
    popularText: {
      fontSize: 11,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: 0.5,
    },
    planLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
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
    planSave: {
      fontSize: 13,
      fontWeight: "800",
      color: "#58CC02",
      marginTop: 2,
    },
    planTrial: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      marginTop: 2,
    },
    planRight: { alignItems: "flex-end" },
    planPrice: { fontSize: 20, fontWeight: "900", color: theme.text },
    planPer: { fontSize: 12, color: theme.textSecondary },

    ctaWrap: { paddingHorizontal: 20, paddingTop: 24, alignItems: "center" },
    cta: {
      width: "100%",
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: "center",
      borderBottomWidth: 4,
      borderColor: "#5B4DD4",
    },
    ctaText: { color: "#fff", fontSize: 18, fontWeight: "900" },
    ctaNote: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 12,
      textAlign: "center",
    },
    terms: {
      fontSize: 11,
      color: theme.textSecondary,
      marginTop: 8,
      textAlign: "center",
      opacity: 0.7,
      lineHeight: 16,
    },

    // 구독중 화면
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
  });
