import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import * as Haptics from "@/utils/haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  TRIAL_DAYS,
  TRIAL_REMINDER_DAYS,
  TRIAL_REMINDER_BEFORE_DAYS,
} from "@/constants/trial";
import { useAuthStore } from "@/store/auth.store";
import { useOnboardingStore } from "@/store/onboarding.store";
import { SUPER_FEATURES } from "@/features/subscription/services/products";
import {
  perMonthPrice,
  savingPercent,
  type StorePlan,
} from "@/features/subscription/services/billing.service";
import { useBilling } from "@/features/subscription/hooks/useBilling";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * 가입 전 요금제 화면.
 *
 * 이 앱의 가입 유도는 여기서 일어난다. 설문 → 진단 → 결과까지 다 보여준
 * 다음에야 이 화면이 나오고, "무료체험 시작하기" 를 눌러야 로그인으로 간다.
 * 로그인 화면을 먼저 들이밀면 아무것도 안 본 사람에게 계정부터 만들라는
 * 뜻이 되고, 그 지점에서 대부분 빠진다.
 *
 * 여기 있는 요금제 카드는 **결제하지 않는다**. 비로그인 상태라 결제할 수도
 * 없고, 고른 상품은 "체험이 끝나면 얼마" 를 보여주는 용도다. 실제 결제는
 * 로그인 후 (tabs)/premium 에서 한다.
 */
export default function PlanScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isDark = theme.bg.toLowerCase() === "#15151d";
  const s = styles(theme, isDark);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const recommendedSection = useOnboardingStore(
    (state) => state.recommendedSection,
  );
  /** 진단을 실제로 봤는지. 완전초보는 건너뛰어서 결과 화면이 빈 채로 뜬다 */
  const hasTestResult = useOnboardingStore(
    (state) => state.totalQuestions > 0,
  );
  const { supported, connected, plans: storePlans, phase } = useBilling();

  // useBilling 의 plansByTier 는 렌더마다 새 함수라 useMemo 가 안 걸린다.
  // 상태 배열(plans)을 직접 거르면 목록이 안 바뀔 때 참조도 안 바뀐다.
  const plans = useMemo(
    () => storePlans.filter((p) => p.tier === "super"),
    [storePlans],
  );
  const [selected, setSelected] = useState<string | null>(null);

  // 기본 선택은 "가장 알뜰" 배지가 붙는 상품과 같아야 한다.
  // 배지는 연간에 달고 선택은 월간이면 화면이 서로 다른 말을 한다.
  useEffect(() => {
    if (!plans.length) return;
    if (selected && plans.some((p) => p.productId === selected)) return;
    const best = plans.reduce((a, b) =>
      savingPercent(b, plans) > savingPercent(a, plans) ? b : a,
    );
    setSelected(best.productId);
  }, [plans, selected]);

  const selectedPlan = useMemo(
    () => plans.find((p) => p.productId === selected) ?? null,
    [plans, selected],
  );

  const bestPlanId = useMemo(() => {
    if (plans.length < 2) return null;
    const top = plans.reduce((a, b) =>
      savingPercent(b, plans) > savingPercent(a, plans) ? b : a,
    );
    return savingPercent(top, plans) > 0 ? top.productId : null;
  }, [plans]);

  const shimmer = useSharedValue(0.45);
  useEffect(() => {
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.45, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [shimmer]);
  const shimmerStyle = useAnimatedStyle(() => ({ opacity: shimmer.value }));

  const startTrial = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // 이미 로그인한 사람이 딥링크 등으로 들어온 경우엔 체험이 이미 붙어 있다
    if (isLoggedIn) return router.replace("/(tabs)");
    // trial=1 은 로그인 화면이 "체험을 시작하러 왔다" 는 걸 알기 위한 것.
    // 이게 없으면 30일 무료체험을 누른 사람이 맨 로그인 폼을 마주한다.
    router.replace({ pathname: "/auth/login", params: { trial: "1" } });
  };

  const close = () => {
    void Haptics.selectionAsync();
    // 앱을 껐다 켜고 곧장 이 화면으로 온 경우엔 뒤가 없다.
    // 아무 데도 못 가는 버튼을 만들지 않는다 — 진단을 본 사람은 결과로,
    // 건너뛴 완전초보는 결과가 0점짜리 빈 화면이라 웰컴으로 돌린다.
    if (router.canGoBack()) router.back();
    else if (hasTestResult) router.replace("/onboarding/result");
    else router.replace("/welcome");
  };

  const showPlans = supported && connected && plans.length > 0;

  return (
    <View style={s.container}>
      <ScrollView
        contentContainerStyle={[
          s.scroll,
          { paddingBottom: 240 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 히어로 */}
        <LinearGradient
          colors={["#9D8DFF", "#776ee2", "#5B4DD4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[s.hero, { paddingTop: insets.top + 34 }]}
        >
          <Animated.View style={[s.shine, shimmerStyle]} />

          <Animated.View entering={FadeIn.duration(500)} style={s.crownWrap}>
            <Ionicons name="star" size={32} color="#FFD93D" />
          </Animated.View>

          <View style={s.logoRow}>
            <Text style={s.logoKorio}>KORIO</Text>
            <View style={s.superTag}>
              <Text style={s.superTagText}>SUPER</Text>
            </View>
          </View>

          <Animated.View
            entering={FadeInDown.delay(90).duration(520)}
            style={s.trialPill}
          >
            <Ionicons name="gift" size={14} color="#5B4DD4" />
            <Text style={s.trialPillText}>
              {t("plan.freeDays", { days: TRIAL_DAYS })}
            </Text>
          </Animated.View>

          <Text style={s.heroTitle}>{t("plan.heroTitle")}</Text>
          <Text style={s.heroSub}>
            {t("plan.heroSub", { section: recommendedSection })}
          </Text>
        </LinearGradient>

        {/* 체험 타임라인 — 언제 무슨 일이 생기는지 미리 다 말해준다.
            "모르는 사이에 결제될까봐" 가 여기서 제일 큰 이탈 사유다 */}
        <Animated.View
          entering={FadeInDown.delay(140).duration(520)}
          style={s.card}
        >
          <Text style={s.cardTitle}>{t("plan.timeline.title")}</Text>
          <View style={s.timeline}>
            <TimelineStep
              s={s}
              icon="lock-open"
              tone="now"
              day={t("plan.timeline.dayToday")}
              title={t("plan.timeline.todayTitle")}
              body={t("plan.timeline.todayBody")}
            />
            <TimelineStep
              s={s}
              icon="notifications"
              tone="soon"
              day={t("plan.timeline.dayN", {
                day: TRIAL_DAYS - TRIAL_REMINDER_BEFORE_DAYS,
              })}
              title={t("plan.timeline.remindTitle")}
              body={t("plan.timeline.remindBody", {
                first: TRIAL_REMINDER_DAYS[0],
                second: TRIAL_REMINDER_DAYS[1],
              })}
            />
            <TimelineStep
              s={s}
              icon="flag"
              tone="end"
              last
              day={t("plan.timeline.dayN", { day: TRIAL_DAYS })}
              title={t("plan.timeline.endTitle")}
              body={t("plan.timeline.endBody")}
            />
          </View>
        </Animated.View>

        {/* 혜택 */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(520)}
          style={s.card}
        >
          <Text style={s.cardTitle}>{t("plan.featuresTitle")}</Text>
          {SUPER_FEATURES.map((f) => (
            <View key={f.key} style={s.featureRow}>
              <View style={s.featureIcon}>
                <Ionicons name={f.icon as any} size={19} color={theme.primary} />
              </View>
              <View style={s.featureCopy}>
                <Text style={s.featureTitle}>
                  {t(`premium.features.${f.key}`)}
                </Text>
                <Text style={s.featureDesc}>
                  {t(`premium.featuresDesc.${f.key}`)}
                </Text>
              </View>
              <Ionicons name="checkmark-circle" size={20} color="#58CC02" />
            </View>
          ))}
        </Animated.View>

        {/* 요금제 — 가격은 전부 스토어가 준 값이다 */}
        <Animated.View entering={FadeInDown.delay(260).duration(520)}>
          <Text style={s.plansLabel}>{t("plan.afterTrialLabel")}</Text>

          {showPlans ? (
            <View style={s.plans}>
              {plans.map((plan) => (
                <PlanRow
                  key={plan.productId}
                  plan={plan}
                  plans={plans}
                  selected={selected === plan.productId}
                  best={plan.productId === bestPlanId}
                  onPress={() => {
                    void Haptics.selectionAsync();
                    setSelected(plan.productId);
                  }}
                  s={s}
                  t={t}
                />
              ))}
            </View>
          ) : (
            <View style={s.storeBox}>
              {phase === "loading" ? (
                <ActivityIndicator color={theme.primary} />
              ) : (
                <Ionicons
                  name="pricetags-outline"
                  size={26}
                  color={theme.textSecondary}
                />
              )}
              <Text style={s.storeText}>{t("plan.priceLater")}</Text>
            </View>
          )}
        </Animated.View>

        <Text style={s.terms}>{t("plan.terms", { days: TRIAL_DAYS })}</Text>
      </ScrollView>

      {/* 하단 고정 CTA — ScrollView 밖. 홈버튼/네비바에 안 가리게 SafeArea */}
      <View style={[s.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <Text style={s.footerNote}>
          {selectedPlan
            ? t("plan.footerNoteWithPrice", {
                days: TRIAL_DAYS,
                price: perMonthPrice(selectedPlan),
              })
            : t("plan.footerNote", { days: TRIAL_DAYS })}
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={startTrial}
          style={({ pressed }) => [s.cta, pressed && s.ctaPressed]}
        >
          <LinearGradient
            colors={["#8B82EE", "#6559D2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={s.ctaInner}
          >
            <Text style={s.ctaText}>
              {t("plan.startTrial", { days: TRIAL_DAYS })}
            </Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={close}
          style={({ pressed }) => [s.close, pressed && { opacity: 0.6 }]}
          hitSlop={8}
        >
          <Text style={s.closeText}>{t("plan.close")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function TimelineStep({
  s,
  icon,
  tone,
  day,
  title,
  body,
  last,
}: {
  s: any;
  icon: keyof typeof Ionicons.glyphMap;
  tone: "now" | "soon" | "end";
  day: string;
  title: string;
  body: string;
  last?: boolean;
}) {
  return (
    <View style={s.stepRow}>
      <View style={s.stepRail}>
        <View style={[s.stepDot, s[`stepDot_${tone}`]]}>
          <Ionicons
            name={icon}
            size={15}
            color={tone === "now" ? "#FFFFFF" : "#8079B8"}
          />
        </View>
        {!last && <View style={s.stepLine} />}
      </View>
      <View style={s.stepCopy}>
        <Text style={s.stepDay}>{day}</Text>
        <Text style={s.stepTitle}>{title}</Text>
        <Text style={s.stepBody}>{body}</Text>
      </View>
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

function PlanRow({
  plan,
  plans,
  selected,
  best,
  onPress,
  s,
  t,
}: {
  plan: StorePlan;
  plans: StorePlan[];
  selected: boolean;
  best: boolean;
  onPress: () => void;
  s: any;
  t: any;
}) {
  const save = savingPercent(plan, plans);
  const press = useSharedValue(0);
  const lift = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * 2 }],
  }));
  const border = useAnimatedStyle(() => ({
    borderBottomWidth: 4 - press.value * 2,
  }));

  return (
    <Animated.View style={[lift, best && s.bestWrap]}>
      {best && (
        <View style={s.bestTag}>
          <Ionicons name="flash" size={10} color="#fff" />
          <Text style={s.bestTagText}>{t("premium.bestValue")}</Text>
        </View>
      )}
      <AnimatedPressable
        onPressIn={() => (press.value = withTiming(1, { duration: 70 }))}
        onPressOut={() => (press.value = withTiming(0, { duration: 130 }))}
        onPress={onPress}
        style={[s.planCard, selected && s.planCardSel, border]}
      >
        <View style={[s.radio, selected && s.radioSel]}>
          {selected && <Ionicons name="checkmark" size={13} color="#fff" />}
        </View>

        <View style={s.planCopy}>
          <Text style={s.planName} numberOfLines={1}>
            {t(`premium.plans.${planKey(plan.productId)}`)}
          </Text>
          {plan.months > 1 && (
            <Text style={s.planSubline} numberOfLines={1}>
              {t("premium.totalPrice", { price: plan.displayPrice })}
            </Text>
          )}
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

const styles = (theme: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    scroll: { paddingBottom: 240 },

    hero: {
      paddingBottom: 30,
      paddingHorizontal: 24,
      alignItems: "center",
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      overflow: "hidden",
    },
    shine: {
      position: "absolute",
      top: -70,
      left: -50,
      width: 260,
      height: 260,
      borderRadius: 130,
      backgroundColor: "rgba(255,255,255,0.16)",
    },
    crownWrap: {
      width: 62,
      height: 62,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.18)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.3)",
    },
    logoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 14,
    },
    logoKorio: {
      color: "#fff",
      fontSize: 26,
      fontWeight: "900",
      letterSpacing: 1.6,
    },
    superTag: {
      backgroundColor: "#FFD93D",
      borderRadius: 7,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    superTagText: {
      color: "#4A3F00",
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 0.8,
    },
    trialPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 16,
      backgroundColor: "#fff",
      borderRadius: 999,
      paddingHorizontal: 13,
      paddingVertical: 7,
    },
    trialPillText: { color: "#5B4DD4", fontSize: 13, fontWeight: "900" },
    heroTitle: {
      color: "#fff",
      fontSize: 23,
      lineHeight: 30,
      fontWeight: "900",
      textAlign: "center",
      letterSpacing: -0.4,
      marginTop: 16,
    },
    heroSub: {
      color: "rgba(255,255,255,0.86)",
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
      textAlign: "center",
      marginTop: 7,
    },

    card: {
      marginTop: 16,
      marginHorizontal: 16,
      padding: 16,
      borderRadius: 22,
      backgroundColor: isDark ? "#22212C" : "#FFFFFF",
      borderWidth: 1,
      borderColor: isDark ? "#35333F" : "#EDEBF7",
      shadowColor: "#514994",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: isDark ? 0.18 : 0.08,
      shadowRadius: 20,
      elevation: 4,
    },
    cardTitle: {
      color: theme.text,
      fontSize: 15,
      fontWeight: "900",
      marginBottom: 14,
    },

    timeline: { gap: 0 },
    stepRow: { flexDirection: "row", gap: 12 },
    stepRail: { alignItems: "center", width: 32 },
    stepDot: {
      width: 32,
      height: 32,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "#35334A" : "#F1EFFC",
    },
    stepDot_now: { backgroundColor: "#776ee2" },
    stepDot_soon: {},
    stepDot_end: {},
    stepLine: {
      flex: 1,
      width: 2,
      marginVertical: 3,
      borderRadius: 1,
      backgroundColor: isDark ? "#3A3850" : "#E7E3FA",
    },
    stepCopy: { flex: 1, paddingBottom: 16 },
    stepDay: {
      color: theme.primary,
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 0.4,
    },
    stepTitle: {
      color: theme.text,
      fontSize: 14,
      fontWeight: "800",
      marginTop: 2,
    },
    stepBody: {
      color: theme.textSecondary,
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "500",
      marginTop: 2,
    },

    featureRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 8,
    },
    featureIcon: {
      width: 36,
      height: 36,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "#35334A" : "#F1EFFC",
    },
    featureCopy: { flex: 1 },
    featureTitle: { color: theme.text, fontSize: 14, fontWeight: "800" },
    featureDesc: {
      color: theme.textSecondary,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "500",
      marginTop: 1,
    },

    plansLabel: {
      color: theme.textSecondary,
      fontSize: 12,
      fontWeight: "800",
      marginTop: 22,
      marginBottom: 10,
      marginHorizontal: 20,
    },
    plans: { paddingHorizontal: 16, gap: 12 },
    bestWrap: { marginTop: 8 },
    bestTag: {
      position: "absolute",
      top: -9,
      left: 14,
      zIndex: 2,
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      backgroundColor: "#FF8A00",
      borderRadius: 999,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    bestTagText: { color: "#fff", fontSize: 10, fontWeight: "900" },
    planCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 14,
      paddingVertical: 13,
      borderRadius: 18,
      backgroundColor: isDark ? "#22212C" : "#FFFFFF",
      borderWidth: 2,
      borderColor: isDark ? "#35333F" : "#EAE7F5",
      borderBottomWidth: 4,
    },
    planCardSel: {
      borderColor: theme.primary,
      backgroundColor: isDark ? "#2A2740" : "#F7F5FF",
    },
    radio: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: isDark ? "#4A4759" : "#D8D4E8",
      alignItems: "center",
      justifyContent: "center",
    },
    radioSel: { backgroundColor: theme.primary, borderColor: theme.primary },
    planCopy: { flex: 1, minWidth: 0 },
    planName: { color: theme.text, fontSize: 15, fontWeight: "900" },
    planSubline: {
      color: theme.textSecondary,
      fontSize: 11,
      fontWeight: "600",
      marginTop: 2,
    },
    planRight: { alignItems: "flex-end" },
    saveTag: {
      backgroundColor: "#E8F7EE",
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginBottom: 3,
    },
    saveTagText: { color: "#1E9E5A", fontSize: 10, fontWeight: "900" },
    planPrice: { color: theme.text, fontSize: 15, fontWeight: "900" },
    planPriceSel: { color: theme.primary },
    planPer: { color: theme.textSecondary, fontSize: 10, fontWeight: "700" },

    storeBox: {
      marginHorizontal: 16,
      paddingVertical: 26,
      paddingHorizontal: 18,
      borderRadius: 18,
      alignItems: "center",
      gap: 10,
      backgroundColor: isDark ? "#22212C" : "#F7F6FC",
      borderWidth: 1,
      borderColor: isDark ? "#35333F" : "#EDEBF7",
    },
    storeText: {
      color: theme.textSecondary,
      fontSize: 12.5,
      lineHeight: 18,
      fontWeight: "600",
      textAlign: "center",
    },

    terms: {
      color: theme.textSecondary,
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "500",
      textAlign: "center",
      marginTop: 18,
      marginHorizontal: 28,
    },

    footer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingTop: 12,
      paddingHorizontal: 20,
      gap: 8,
      backgroundColor: theme.bg,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: isDark ? "#2C2B35" : "#EDEBF7",
    },
    footerNote: {
      color: theme.textSecondary,
      fontSize: 11.5,
      fontWeight: "600",
      textAlign: "center",
    },
    cta: {
      borderRadius: 18,
      shadowColor: "#5549BB",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.26,
      shadowRadius: 16,
      elevation: 7,
    },
    ctaPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
    ctaInner: {
      minHeight: 56,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 18,
    },
    ctaText: {
      color: "#fff",
      fontSize: 16.5,
      fontWeight: "900",
      textAlign: "center",
    },
    close: { alignItems: "center", paddingVertical: 10 },
    closeText: {
      color: theme.textSecondary,
      fontSize: 14.5,
      fontWeight: "700",
    },
  });
