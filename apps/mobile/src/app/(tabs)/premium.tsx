import { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
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
import { TAB_BAR_HEIGHT } from "@/constants/layout";
import {
  MAX_FEATURES,
  SUPER_FEATURES,
  TIERS,
  type SubscriptionTier,
} from "@/features/subscription/services/products";
import {
  perMonthPrice,
  savingPercent,
  type StorePlan,
} from "@/features/subscription/services/billing.service";
import { useBilling } from "@/features/subscription/hooks/useBilling";
import { useSubscription } from "@/features/subscription/hooks/useSubscription";

const { width } = Dimensions.get("window");

/** 카드가 눌릴 때 바텀보더까지 같이 줄어들게 하려면 애니메이션 가능한 Pressable 이 필요하다 */
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
    plansByTier,
    phase,
    busy,
    error,
    subscribe,
    restore,
    reloadPlans,
  } = useBilling(refresh);

  const [selected, setSelected] = useState<string | null>(null);
  /** 보고 있는 등급. MAX 를 먼저 보여준다 — AI 튜터가 우리 킬러 기능이다 */
  const [tier, setTier] = useState<SubscriptionTier>("max");
  /** SUPER 구독자가 MAX 요금제를 보러 들어온 경우 */
  const [showPlansAnyway, setShowPlansAnyway] = useState(false);

  const tierPlans = useMemo(() => plansByTier(tier), [plansByTier, tier]);

  // 기본 선택은 "가장 알뜰" 배지를 붙인 상품과 같아야 한다.
  // 배지는 연간에 달아놓고 기본 선택은 월간이면 화면이 서로 다른 말을 한다.
  useEffect(() => {
    if (!tierPlans.length) return;
    // 등급을 바꾸면 그 등급 안에서 다시 고른다
    if (selected && tierPlans.some((p) => p.productId === selected)) return;
    const best = tierPlans.reduce((a, b) =>
      savingPercent(b, tierPlans) > savingPercent(a, tierPlans) ? b : a,
    );
    if (savingPercent(best, tierPlans) > 0) return setSelected(best.productId);
    const trial = tierPlans.find((p) => p.hasFreeTrial);
    setSelected((trial ?? tierPlans[0]).productId);
  }, [tierPlans, selected]);

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
    () => tierPlans.find((p) => p.productId === selected) ?? null,
    [tierPlans, selected],
  );

  /** 할인율이 가장 큰 상품 하나만 강조한다. 넷 다 강조하면 강조가 아니다 */
  const bestPlanId = useMemo(() => {
    if (tierPlans.length < 2) return null;
    const top = tierPlans.reduce((a, b) =>
      savingPercent(b, tierPlans) > savingPercent(a, tierPlans) ? b : a,
    );
    return savingPercent(top, tierPlans) > 0 ? top.productId : null;
  }, [tierPlans]);

  if (subLoading && !subscription) {
    return (
      <View style={[s.container, s.center]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // ── 이미 구독중 ──
  if (isPremium && !showPlansAnyway) {
    return (
      <ScrollView
        style={s.container}
        contentContainerStyle={[
          s.activeWrap,
          { paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 40 },
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
          {/* 내가 산 등급의 혜택만 보여준다. MAX 면 튜터가 맨 위에 온다 */}
          {(subscription?.tier === "max"
            ? [...MAX_FEATURES, ...SUPER_FEATURES]
            : [...SUPER_FEATURES]
          ).map((f) => (
            <View key={f.key} style={s.activeFeatureRow}>
              <Ionicons name={f.icon as any} size={20} color="#58CC02" />
              <Text style={s.activeFeatureText}>
                {t(`premium.features.${f.key}`)}
              </Text>
            </View>
          ))}
        </View>

        {/* SUPER 유저에게 MAX 를 권한다 — 튜터를 못 쓰는 상태다 */}
        {subscription?.tier !== "max" && !subscription?.isTrial && (
          <Pressable
            style={s.upgradeBox}
            onPress={() => {
              setTier("max");
              // 구독중 화면을 벗어나 요금제를 보여준다
              setShowPlansAnyway(true);
            }}
          >
            <Ionicons name="sparkles" size={18} color="#FFD93D" />
            <Text style={s.upgradeText}>{t("premium.tierBlurb.max")}</Text>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </Pressable>
        )}

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
  const showPlans = supported && connected && tierPlans.length > 0;

  return (
    <View style={s.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + TAB_BAR_HEIGHT + (showPlans ? 190 : 40),
        }}
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

        {/* 등급 선택 — MAX 가 기본. AI 튜터가 킬러 기능이다 */}
        <View style={s.tierBar}>
          {TIERS.map((tk) => {
            const on = tier === tk;
            return (
              <Pressable
                key={tk}
                style={[s.tierBtn, on && s.tierBtnOn]}
                onPress={() => setTier(tk)}
              >
                <Text style={[s.tierBtnText, on && s.tierBtnTextOn]}>
                  {t(`premium.tier.${tk}`)}
                </Text>
                {tk === "max" && (
                  <View style={s.tierStar}>
                    <Ionicons name="sparkles" size={11} color="#FFD93D" />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
        <Text style={s.tierBlurb}>{t(`premium.tierBlurb.${tier}`)}</Text>

        {/* 혜택 */}
        <View style={s.section}>
          {tier === "max" && (
            <>
              {MAX_FEATURES.map((f) => (
                <View key={f.key} style={s.featureRow}>
                  <View style={[s.featureIcon, s.featureIconMax]}>
                    <Ionicons name={f.icon as any} size={22} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={s.featureTitleRow}>
                      <Text style={s.featureTitle}>
                        {t(`premium.features.${f.key}`)}
                      </Text>
                      <View style={s.maxBadge}>
                        <Text style={s.maxBadgeText}>
                          {t("premium.maxOnly")}
                        </Text>
                      </View>
                    </View>
                    <Text style={s.featureDesc}>
                      {t(`premium.featuresDesc.${f.key}`)}
                    </Text>
                  </View>
                </View>
              ))}
              <View style={s.includesRow}>
                <Ionicons name="checkmark-circle" size={18} color="#58CC02" />
                <Text style={s.includesText}>
                  {t("premium.includesSuper")}
                </Text>
              </View>
            </>
          )}

          {tier === "super" &&
            SUPER_FEATURES.map((f) => (
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
            {tierPlans.map((plan) => (
              <PlanCard
                key={plan.productId}
                plan={plan}
                plans={tierPlans}
                selected={selected === plan.productId}
                best={plan.productId === bestPlanId}
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
        <View
          style={[
            s.ctaBar,
            // 탭바가 position:"absolute" 라 콘텐츠가 그 밑으로 흐른다.
            // 탭바 높이 + SafeArea 만큼 띄워야 버튼이 안 가린다.
            { paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 12 },
          ]}
        >
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
  best,
  onPress,
  theme,
  s,
  t,
}: {
  plan: StorePlan;
  plans: StorePlan[];
  selected: boolean;
  best: boolean;
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
  const cardStyle = useAnimatedStyle(() => ({
    borderBottomWidth: 4 - press.value * 2,
  }));

  return (
    <Animated.View style={[animStyle, best && s.bestWrap]}>
      {best && (
        <View style={s.bestTag}>
          <Ionicons name="flash" size={11} color="#fff" />
          <Text style={s.bestTagText}>{t("premium.bestValue")}</Text>
        </View>
      )}
      <AnimatedPressable
        onPressIn={() => (press.value = withTiming(1, { duration: 70 }))}
        onPressOut={() => (press.value = withTiming(0, { duration: 130 }))}
        onPress={onPress}
        style={[
          s.planCard,
          selected && s.planCardSel,
          best && !selected && s.planCardBest,
          cardStyle,
        ]}
      >
        <View style={s.planLeft}>
          <View style={[s.radio, selected && s.radioSel]}>
            {selected && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={s.planName} numberOfLines={1}>
              {t(`premium.plans.${planKey(plan.productId)}`)}
            </Text>
            {plan.hasFreeTrial ? (
              <Text style={s.planTrial} numberOfLines={1}>
                {t("premium.hasFreeTrial")}
              </Text>
            ) : plan.months > 1 ? (
              <Text style={s.planSubline} numberOfLines={1}>
                {t("premium.totalPrice", { price: plan.displayPrice })}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={s.planRight}>
          {save > 0 && (
            <View style={s.saveTag}>
              <Text style={s.saveTagText}>−{save}%</Text>
            </View>
          )}
          <Text style={[s.planPrice, selected && s.planPriceSel]}>
            {perMonthPrice(plan)}
          </Text>
          <Text style={s.planPer}>/{t("premium.perMonthLabel")}</Text>
        </View>
      </AnimatedPressable>
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

    tierBar: {
      flexDirection: "row",
      marginHorizontal: 20,
      marginTop: 24,
      backgroundColor: theme.surface,
      borderRadius: 999,
      borderWidth: 2,
      borderColor: theme.border,
      padding: 4,
      gap: 4,
    },
    tierBtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      paddingVertical: 11,
      borderRadius: 999,
    },
    tierBtnOn: { backgroundColor: theme.primary },
    tierBtnText: {
      fontSize: 15,
      fontWeight: "900",
      color: theme.textSecondary,
      letterSpacing: 0.5,
    },
    tierBtnTextOn: { color: "#fff" },
    tierStar: { marginLeft: -1 },
    tierBlurb: {
      fontSize: 13.5,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 10,
      marginHorizontal: 28,
      lineHeight: 19,
    },

    section: { paddingHorizontal: 20, paddingTop: 24, gap: 18 },
    featureTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    featureIconMax: { backgroundColor: theme.primary },
    maxBadge: {
      backgroundColor: "#FFD93D",
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    maxBadgeText: { fontSize: 9.5, fontWeight: "900", color: "#5B4DD4" },
    includesRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "#58CC0214",
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginTop: 2,
    },
    includesText: { fontSize: 13.5, fontWeight: "800", color: theme.text },
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

    plans: { paddingHorizontal: 20, paddingTop: 26, gap: 14 },
    bestWrap: { marginTop: 8 },
    bestTag: {
      position: "absolute",
      top: -9,
      left: 16,
      zIndex: 2,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: "#FF9600",
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    bestTagText: {
      fontSize: 10,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: 0.6,
      textTransform: "uppercase",
    },
    planCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 16,
      backgroundColor: theme.surface,
    },
    planCardSel: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "12",
    },
    planCardBest: { borderColor: "#FFC46B" },

    planLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
    radio: {
      width: 26,
      height: 26,
      borderRadius: 13,
      borderWidth: 2,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    radioSel: { borderColor: theme.primary, backgroundColor: theme.primary },
    planName: { fontSize: 17, fontWeight: "800", color: theme.text },
    planSubline: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.textSecondary,
      marginTop: 3,
    },
    planTrial: {
      fontSize: 13,
      fontWeight: "800",
      color: "#58CC02",
      marginTop: 3,
    },

    planRight: { alignItems: "flex-end", minWidth: 96 },
    saveTag: {
      backgroundColor: "#58CC02",
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginBottom: 3,
    },
    saveTagText: { fontSize: 11, fontWeight: "900", color: "#fff" },
    planPrice: { fontSize: 20, fontWeight: "900", color: theme.text },
    planPriceSel: { color: theme.primary },
    planPer: { fontSize: 11, fontWeight: "700", color: theme.textSecondary },

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
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 20,
      paddingTop: 14,
      backgroundColor: theme.surface,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      // 스크롤 콘텐츠가 바 밑으로 지나갈 때 경계가 분명하게
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: -4 },
      elevation: 12,
    },
    ctaNote: {
      fontSize: 13,
      fontWeight: "600",
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
    upgradeBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginTop: 20,
      borderBottomWidth: 4,
      borderColor: "#5B4DD4",
    },
    upgradeText: {
      flex: 1,
      fontSize: 14,
      fontWeight: "800",
      color: "#fff",
      lineHeight: 19,
    },
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
