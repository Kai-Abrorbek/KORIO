import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
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
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import {
  LearningStyle,
  HangulLevel,
  SelfReportedLevel,
  Interest,
} from "../../types/enums";
import { useOnboardingStore } from "../../store/onboarding.store";
import { onboardingService } from "@/services/onboarding.service";
import { UserService } from "@/services/user.service";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import BoriMascot from "@/components/home/BoriMascot";
import AnimatedProgressBar from "@/components/home/AnimatedProgressBar";

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
  icon: string;
  color: string;
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
  icon: string;
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
        onPressIn={() => (pressed.value = withTiming(1, { duration: 80 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 120 }))}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }}
        style={[
          s.card,
          variant === "grid" ? s.cardGrid : s.cardRow,
          selected && s.cardSelected,
          aStyle,
        ]}
      >
        <View
          style={[s.iconWrap, selected && { backgroundColor: color + "22" }]}
        >
          <Ionicons
            name={icon as any}
            size={variant === "grid" ? 28 : 22}
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
        {selected && (
          <Animated.View
            entering={ZoomIn.springify().damping(0)}
            style={s.check}
          >
            <Ionicons name="checkmark" size={13} color="#fff" />
          </Animated.View>
        )}
      </AnimatedPressable>
    </Animated.View>
  );
}

export default function SurveyScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const { setSurvey, sessionId } = useOnboardingStore();

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
  }, []);
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

  const back = () => (stepIdx > 0 ? setStepIdx(stepIdx - 1) : router.back());

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
    } finally {
      setSubmitting(false);
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

    if (isBeginner) {
      // 한글 화면으로 튕기지 않고 홈으로. 로드맵 첫 노드가 "한글 배우기" 로 열려 있다.
      router.replace("/(tabs)");
    } else {
      router.push({ pathname: "/lesson", params: { mode: "levelTest" } });
    }
  };

  const m = meta[step];
  const isLast = stepIdx === STEPS.length - 1;

  return (
    <View style={[s.container, { paddingTop: insets.top + 8 }]}>
      <View style={s.header}>
        <TouchableOpacity onPress={back} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <AnimatedProgressBar current={stepIdx + 1} total={STEPS.length} />
        <View style={{ width: 26 }} />
      </View>

      <View style={s.mascotRow}>
        <Animated.View style={bobStyle}>
          <BoriMascot size={68} />
        </Animated.View>
        <View style={s.bubble}>
          <View style={s.bubbleTail} />
          <Text style={s.bubbleText}>
            {t(`onboarding.survey.subtitle.${step}`)}
          </Text>
        </View>
      </View>

      <Animated.View
        key={step}
        entering={FadeInDown.duration(320)}
        style={{ flex: 1 }}
      >
        <Text style={s.title}>{t(`onboarding.survey.${step}.title`)}</Text>
        <ScrollView
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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
          onPress={next}
          disabled={!valid || submitting}
          style={({ pressed }) => [
            s.cta,
            (!valid || submitting) && s.ctaDisabled,
            pressed && valid && s.ctaPressed,
          ]}
        >
          <Text style={s.ctaText}>
            {t(isLast ? "onboarding.survey.start" : "common.next")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const cardStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 18,
      flexDirection: "row",
      alignItems: "center",
    },
    cardGrid: {
      flexDirection: "column",
      justifyContent: "center",
      gap: 10,
      paddingVertical: 20,
      paddingHorizontal: 12,
      minHeight: 116,
    },
    cardRow: { gap: 14, paddingVertical: 16, paddingHorizontal: 16 },
    cardSelected: {
      borderColor: theme.primary,
      backgroundColor: "#EEEDFE",
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.text,
      textAlign: "center",
    },
    check: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },
  });

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      paddingHorizontal: 20,
      paddingBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    mascotRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 20,
      paddingTop: 4,
      paddingBottom: 12,
    },
    bubble: {
      flex: 1,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 14,
    },
    bubbleTail: {
      position: "absolute",
      left: -8,
      top: 22,
      width: 0,
      height: 0,
      borderTopWidth: 7,
      borderBottomWidth: 7,
      borderRightWidth: 9,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: theme.border,
    },
    bubbleText: { fontSize: 14, fontWeight: "600", color: theme.text },
    title: {
      fontSize: 23,
      fontWeight: "800",
      color: theme.text,
      paddingHorizontal: 20,
      marginTop: 6,
      marginBottom: 16,
    },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 24 },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      justifyContent: "space-between",
    },
    list: { gap: 12 },
    footer: {
      paddingHorizontal: 20,
      paddingTop: 8,
      backgroundColor: theme.bg,
    },
    cta: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 17,
      alignItems: "center",
      borderBottomWidth: 4,
      borderBottomColor: "rgba(0,0,0,0.2)",
    },
    ctaPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
    ctaDisabled: {
      backgroundColor: theme.border,
      borderBottomColor: "transparent",
    },
    ctaText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
