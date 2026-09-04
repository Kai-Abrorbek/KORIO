import { type ComponentProps, useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeInDown,
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import {
  LearningStyle,
  HangulLevel,
  SelfReportedLevel,
  Interest,
} from "../../types/enums";
import { useOnboardingStore } from "../../store/onboarding.store";
import { useAuthStore } from "@/store/auth.store";
import { onboardingService } from "@/services/onboarding.service";
import { UserService } from "@/services/user.service";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const STEPS = [
  "selfLevel",
  "hangul",
  "interests",
  "style",
  "daily",
  "reminder",
] as const;
type StepId = (typeof STEPS)[number];

const REMINDER_HOURS: Record<string, number> = {
  morning: 9,
  afternoon: 14,
  evening: 20,
};

interface Option {
  value: string;
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  color: string;
}

function SurveyProgress({
  current,
  total,
  theme,
}: {
  current: number;
  total: number;
  theme: ThemeColors;
}) {
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: total, now: current }}
      style={progressStyles.wrap}
    >
      <View style={progressStyles.meta}>
        <Text style={[progressStyles.label, { color: theme.textSecondary }]}>
          KORIO
        </Text>
        <Text style={[progressStyles.count, { color: theme.text }]}>
          {current} / {total}
        </Text>
      </View>
      <View style={progressStyles.track}>
        {Array.from({ length: total }, (_, index) => (
          <View
            key={index}
            style={[
              progressStyles.segment,
              {
                backgroundColor: index < current ? theme.primary : theme.border,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function SelectCard({
  selected,
  onPress,
  icon,
  color,
  label,
  index,
  variant,
  theme,
}: {
  selected: boolean;
  onPress: () => void;
  icon: ComponentProps<typeof Ionicons>["name"];
  color: string;
  label: string;
  index: number;
  variant: "grid" | "row";
  theme: ThemeColors;
}) {
  const s = cardStyles(theme);
  const pressed = useSharedValue(0);
  const aStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: pressed.value * 2 },
      { scale: 1 - pressed.value * 0.02 },
    ],
  }));
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 45).duration(350)}
      style={variant === "grid" ? { width: "48%" } : { width: "100%" }}
    >
      <AnimatedPressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={label}
        onPressIn={() => (pressed.value = withTiming(1, { duration: 80 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 120 }))}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }}
        style={[
          s.card,
          variant === "grid" ? s.cardGrid : s.cardRow,
          selected && [
            s.cardSelected,
            {
              backgroundColor: `${theme.primary}12`,
              borderColor: theme.primary,
              shadowColor: theme.primary,
            },
          ],
          aStyle,
        ]}
      >
        <View style={[s.iconWrap, { backgroundColor: `${color}1F` }]}>
          <Ionicons
            name={icon}
            size={variant === "grid" ? 27 : 23}
            color={color}
          />
        </View>
        <Text
          style={[
            s.label,
            variant === "row" && { flex: 1, textAlign: "left" },
            selected && { color: theme.primary },
          ]}
        >
          {label}
        </Text>
        <View
          style={[
            s.selection,
            variant === "grid" && s.gridSelection,
            { borderColor: selected ? theme.primary : theme.border },
            selected && { backgroundColor: theme.primary },
          ]}
        >
          {selected ? (
            <Animated.View entering={ZoomIn.springify().damping(80)}>
              <Ionicons name="checkmark" size={14} color="#fff" />
            </Animated.View>
          ) : null}
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

export default function SurveyScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const { setSurvey, sessionId, markGuestOnboardingDone } =
    useOnboardingStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [stepIdx, setStepIdx] = useState(0);
  const [selfLevel, setSelfLevel] = useState<SelfReportedLevel | null>(null);
  const [hangul, setHangul] = useState<HangulLevel | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [style, setStyle] = useState<LearningStyle | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [reminder, setReminder] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const step = STEPS[stepIdx];
  // 마스코트 둥실
  const bob = useSharedValue(0);
  useEffect(() => {
    bob.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 1200 }),
        withTiming(0, { duration: 1200 }),
      ),
      -1,
    );
  }, [bob]);
  const bobStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bob.value }],
  }));

  const toggle = <T,>(v: T, arr: T[], set: (x: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const selfOpts: Option[] = [
    {
      value: SelfReportedLevel.COMPLETE_BEGINNER,
      label: t("onboarding.survey.selfLevel.completeBeginner"),
      icon: "leaf",
      color: "#96CEB4",
    },
    {
      value: SelfReportedLevel.BASIC_GREETINGS,
      label: t("onboarding.survey.selfLevel.basicGreetings"),
      icon: "hand-left",
      color: "#4ECDC4",
    },
    {
      value: SelfReportedLevel.BASIC_CONVERSATION,
      label: t("onboarding.survey.selfLevel.basicConversation"),
      icon: "chatbubbles",
      color: "#45B7D1",
    },
    {
      value: SelfReportedLevel.ABOVE,
      label: t("onboarding.survey.selfLevel.above"),
      icon: "rocket",
      color: "#A78BFA",
    },
  ];
  const hangulOpts: Option[] = [
    {
      value: HangulLevel.NONE,
      label: t("onboarding.survey.hangul.none"),
      icon: "help-circle",
      color: "#FF6B6B",
    },
    {
      value: HangulLevel.PARTIAL,
      label: t("onboarding.survey.hangul.partial"),
      icon: "reader",
      color: "#F5A623",
    },
    {
      value: HangulLevel.FLUENT,
      label: t("onboarding.survey.hangul.fluent"),
      icon: "checkmark-done-circle",
      color: "#1D9E75",
    },
  ];
  const interestOpts: Option[] = [
    {
      value: Interest.KPOP,
      label: t("onboarding.survey.interests.kpop"),
      icon: "musical-notes",
      color: "#FF6B6B",
    },
    {
      value: Interest.DRAMA,
      label: t("onboarding.survey.interests.drama"),
      icon: "tv",
      color: "#A78BFA",
    },
    {
      value: Interest.TRAVEL,
      label: t("onboarding.survey.interests.travel"),
      icon: "airplane",
      color: "#4ECDC4",
    },
    {
      value: Interest.BUSINESS,
      label: t("onboarding.survey.interests.business"),
      icon: "briefcase",
      color: "#45B7D1",
    },
    {
      value: Interest.TOPIK,
      label: t("onboarding.survey.interests.topik"),
      icon: "school",
      color: "#96CEB4",
    },
    {
      value: Interest.GAME,
      label: t("onboarding.survey.interests.game"),
      icon: "game-controller",
      color: "#F5A623",
    },
    {
      value: Interest.FOOD,
      label: t("onboarding.survey.interests.food"),
      icon: "restaurant",
      color: "#FF8FA3",
    },
  ];
  const styleOpts: Option[] = [
    {
      value: LearningStyle.GRAMMAR,
      label: t("onboarding.survey.style.grammar"),
      icon: "book",
      color: "#45B7D1",
    },
    {
      value: LearningStyle.CONVERSATION,
      label: t("onboarding.survey.style.conversation"),
      icon: "chatbubbles",
      color: "#1D9E75",
    },
    {
      value: LearningStyle.GAME,
      label: t("onboarding.survey.style.game"),
      icon: "game-controller",
      color: "#FF6B6B",
    },
    {
      value: LearningStyle.VOCABULARY,
      label: t("onboarding.survey.style.vocabulary"),
      icon: "list",
      color: "#A78BFA",
    },
  ];
  const dailyOpts: Option[] = [
    {
      value: "5",
      label: t("onboarding.survey.daily.five"),
      icon: "flash",
      color: "#4ECDC4",
    },
    {
      value: "10",
      label: t("onboarding.survey.daily.ten"),
      icon: "time",
      color: "#45B7D1",
    },
    {
      value: "15",
      label: t("onboarding.survey.daily.fifteen"),
      icon: "hourglass",
      color: "#F5A623",
    },
    {
      value: "20",
      label: t("onboarding.survey.daily.twenty"),
      icon: "flame",
      color: "#FF6B6B",
    },
  ];
  const reminderOpts: Option[] = [
    {
      value: "morning",
      label: t("onboarding.survey.reminder.morning"),
      icon: "sunny",
      color: "#F5A623",
    },
    {
      value: "afternoon",
      label: t("onboarding.survey.reminder.afternoon"),
      icon: "partly-sunny",
      color: "#4ECDC4",
    },
    {
      value: "evening",
      label: t("onboarding.survey.reminder.evening"),
      icon: "moon",
      color: "#A78BFA",
    },
    {
      value: "skip",
      label: t("onboarding.survey.reminder.skip"),
      icon: "notifications-off",
      color: "#94A3B8",
    },
  ];

  const meta: Record<
    StepId,
    { opts: Option[]; multi: boolean; variant: "grid" | "row" }
  > = {
    selfLevel: { opts: selfOpts, multi: false, variant: "row" },
    hangul: { opts: hangulOpts, multi: false, variant: "row" },
    interests: { opts: interestOpts, multi: true, variant: "grid" },
    style: { opts: styleOpts, multi: false, variant: "row" },
    daily: { opts: dailyOpts, multi: false, variant: "row" },
    reminder: { opts: reminderOpts, multi: false, variant: "row" },
  };

  const selectedFor = (id: StepId): string | string[] => {
    switch (id) {
      case "selfLevel":
        return selfLevel ?? "";
      case "hangul":
        return hangul ?? "";
      case "interests":
        return interests;
      case "style":
        return style ?? "";
      case "daily":
        return minutes ? String(minutes) : "";
      case "reminder":
        return reminder ?? "";
    }
  };

  const onSelect = (id: StepId, v: string) => {
    switch (id) {
      case "selfLevel":
        return setSelfLevel(v as SelfReportedLevel);
      case "hangul":
        return setHangul(v as HangulLevel);
      case "interests":
        return toggle(v as Interest, interests, setInterests);
      case "style":
        return setStyle(v as LearningStyle);
      case "daily":
        return setMinutes(Number(v));
      case "reminder":
        return setReminder(v);
    }
  };

  const valid = (() => {
    const sel = selectedFor(step);
    return Array.isArray(sel) ? sel.length > 0 : sel !== "";
  })();

  const back = () => {
    void Haptics.selectionAsync();
    if (stepIdx > 0) {
      setStepIdx((current) => current - 1);
      return;
    }

    router.replace("/welcome");
  };

  const next = async () => {
    if (!valid || submitting) return;
    if (stepIdx < STEPS.length - 1) {
      setStepIdx(stepIdx + 1);
      return;
    }
    const reminderEnabled = reminder !== null && reminder !== "skip";
    const data = {
      targetLanguage: "korean",
      learningGoals: [],
      learningStyle: style!,
      dailyGoalMinutes: minutes!,
      hangulLevel: hangul!,
      interests,
      selfReportedLevel: selfLevel!,
      reminderHour: reminderEnabled ? REMINDER_HOURS[reminder!] : undefined,
      reminderEnabled,
    };
    setSurvey(data);
    setSubmitting(true);
    try {
      await onboardingService.saveSurvey({ sessionId, ...data });
    } catch {
      // 저장 실패해도 진행 — store에 있고 가입 시 재동기화
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const isBeginner = selfLevel === SelfReportedLevel.COMPLETE_BEGINNER;

    // 설문은 onboarding 컬렉션에만 저장돼서 유저 문서엔 안 남는다.
    // 로드맵이 hangulLevel 을 보고 한글 노드를 띄우므로 여기서 직접 반영.
    try {
      await UserService.syncOnboardingSurvey({
        hangulLevel: hangul!,
        selfReportedLevel: selfLevel!,
        dailyGoalMinutes: minutes!,
        targetLanguage: "korean",
        interests,
        reminderHour: reminderEnabled ? REMINDER_HOURS[reminder!] : undefined,
        // 완전초보는 레벨 테스트를 건너뛰므로 온보딩을 여기서 마감
        completeNow: isBeginner,
      });
    } catch {
      // 실패해도 진행 — 다음 getMe 때 재동기화
    }
    setSubmitting(false);

    if (isBeginner) {
      // 완전초보는 진단을 건너뛴다 — 여기가 온보딩의 끝이다.
      markGuestOnboardingDone();
      // 비로그인이면 홈으로 못 간다(가드가 로그인으로 밀어낸다). 요금제로.
      // 로그인 상태면 로드맵 첫 노드가 "한글 배우기" 로 열려 있으니 홈으로.
      router.replace(isLoggedIn ? "/(tabs)" : "/onboarding/plan");
    } else {
      router.push({ pathname: "/lesson", params: { mode: "levelTest" } });
    }
  };

  const m = meta[step];
  const isLast = stepIdx === STEPS.length - 1;

  return (
    <View style={[s.container, { paddingTop: insets.top + 8 }]}>
      <View
        pointerEvents="none"
        style={[
          s.ambientOrb,
          s.ambientOrbTop,
          { backgroundColor: `${theme.primary}12` },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          s.ambientOrb,
          s.ambientOrbBottom,
          { backgroundColor: "rgba(78, 205, 196, 0.08)" },
        ]}
      />

      <View style={s.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("common.back")}
          hitSlop={8}
          onPress={back}
          style={({ pressed }) => [
            s.backButton,
            pressed && s.backButtonPressed,
          ]}
        >
          <Ionicons name="chevron-back" size={23} color={theme.text} />
        </Pressable>
        <SurveyProgress
          current={stepIdx + 1}
          total={STEPS.length}
          theme={theme}
        />
      </View>

      <Animated.View
        key={step}
        entering={FadeInDown.duration(320)}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              s.coachCard,
              {
                backgroundColor: `${theme.primary}0D`,
                borderColor: `${theme.primary}20`,
              },
            ]}
          >
            <View
              style={[s.mascotStage, { backgroundColor: `${theme.primary}16` }]}
            >
              <Animated.View style={bobStyle}>
                <HaneulmonMascot size={50} mood="thinking" />
              </Animated.View>
            </View>
            <Text style={[s.coachText, { color: theme.textSecondary }]}>
              {t(`onboarding.survey.subtitle.${step}`)}
            </Text>
          </View>

          <Text style={s.title}>{t(`onboarding.survey.${step}.title`)}</Text>
          <View style={s.helperRow}>
            <Ionicons
              name={m.multi ? "layers-outline" : "checkmark-circle-outline"}
              size={16}
              color={theme.primary}
            />
            <Text style={[s.helperText, { color: theme.textSecondary }]}>
              {t(
                m.multi
                  ? "onboarding.survey.helper.multiple"
                  : "onboarding.survey.helper.single",
              )}
            </Text>
          </View>

          <View style={m.variant === "grid" ? s.grid : s.list}>
            {m.opts.map((o, i) => (
              <SelectCard
                key={o.value}
                index={i}
                variant={m.variant}
                theme={theme}
                selected={
                  m.multi
                    ? (selectedFor(step) as string[]).includes(o.value)
                    : selectedFor(step) === o.value
                }
                onPress={() => onSelect(step, o.value)}
                icon={o.icon}
                color={o.color}
                label={o.label}
              />
            ))}
          </View>
        </ScrollView>
      </Animated.View>

      <View style={[s.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t(
            isLast ? "onboarding.survey.start" : "common.next",
          )}
          accessibilityState={{ disabled: !valid || submitting }}
          onPress={next}
          disabled={!valid || submitting}
          style={({ pressed }) => [
            s.cta,
            (!valid || submitting) && s.ctaDisabled,
            pressed && valid && s.ctaPressed,
          ]}
        >
          {submitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={s.ctaText}>
                {t(isLast ? "onboarding.survey.start" : "common.next")}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const progressStyles = StyleSheet.create({
  wrap: { flex: 1, gap: 8 },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "900",
    letterSpacing: 1.6,
  },
  count: { fontSize: 12, lineHeight: 15, fontWeight: "800" },
  track: { flexDirection: "row", gap: 5 },
  segment: { flex: 1, height: 6, borderRadius: 999 },
});

const cardStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 3,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    cardGrid: {
      flexDirection: "column",
      justifyContent: "center",
      gap: 12,
      paddingVertical: 17,
      paddingHorizontal: 14,
      minHeight: 108,
    },
    cardRow: {
      minHeight: 76,
      gap: 14,
      paddingVertical: 12,
      paddingHorizontal: 14,
    },
    cardSelected: {
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 5 },
      elevation: 2,
    },
    iconWrap: {
      width: 46,
      height: 46,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontSize: 15.5,
      lineHeight: 20,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
    },
    selection: {
      width: 24,
      height: 24,
      marginLeft: "auto",
      borderRadius: 12,
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    gridSelection: {
      position: "absolute",
      top: 11,
      right: 11,
      marginLeft: 0,
    },
  });

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
      backgroundColor: theme.bg,
    },
    ambientOrb: {
      position: "absolute",
      width: 260,
      height: 260,
      borderRadius: 130,
    },
    ambientOrbTop: { top: -150, right: -110 },
    ambientOrbBottom: { bottom: 40, left: -190 },
    header: {
      paddingHorizontal: 20,
      paddingTop: 2,
      paddingBottom: 18,
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000000",
      shadowOpacity: 0.04,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 1,
    },
    backButtonPressed: { transform: [{ scale: 0.95 }], opacity: 0.78 },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 2,
      paddingBottom: 28,
    },
    coachCard: {
      minHeight: 68,
      borderRadius: 20,
      borderWidth: 1,
      paddingHorizontal: 12,
      paddingVertical: 9,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    mascotStage: {
      width: 50,
      height: 50,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    coachText: { flex: 1, fontSize: 13.5, lineHeight: 19, fontWeight: "700" },
    title: {
      marginTop: 24,
      fontSize: 28,
      lineHeight: 36,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -0.65,
    },
    helperRow: {
      marginTop: 9,
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    helperText: { fontSize: 12.5, lineHeight: 17, fontWeight: "700" },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      justifyContent: "space-between",
    },
    list: { gap: 12 },
    footer: {
      paddingHorizontal: 20,
      paddingTop: 12,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.border,
      backgroundColor: theme.bg,
    },
    cta: {
      minHeight: 58,
      backgroundColor: theme.primary,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
      borderBottomWidth: 4,
      borderBottomColor: "rgba(0,0,0,0.2)",
      shadowColor: theme.primary,
      shadowOpacity: 0.22,
      shadowRadius: 15,
      shadowOffset: { width: 0, height: 7 },
      elevation: 5,
    },
    ctaPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
    ctaDisabled: { opacity: 0.38, shadowOpacity: 0 },
    ctaText: { color: "#FFFFFF", fontSize: 16.5, fontWeight: "900" },
  });
