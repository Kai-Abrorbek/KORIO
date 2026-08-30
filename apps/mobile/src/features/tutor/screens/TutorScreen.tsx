import { useCallback } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { TutorOrb } from "../components/TutorOrb";
import { useRealtimeTutor } from "../hooks/useRealtimeTutor";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const fmt = (sec: number) =>
  `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

export default function TutorScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);
  const router = useRouter();

  const {
    state,
    quota,
    error,
    caption,
    userSaid,
    elapsedSec,
    maxSec,
    active,
    busy,
    start,
    stop,
  } = useRealtimeTutor();

  // 화면을 벗어나면 반드시 끊는다. 안 끊으면 마이크가 열린 채로 과금이 계속된다.
  useFocusEffect(
    useCallback(() => {
      return () => {
        void stop();
      };
    }, [stop]),
  );

  const exhausted = !!quota && quota.allowedMin <= 0;
  const remain = maxSec > 0 ? Math.max(0, maxSec - elapsedSec) : 0;
  const nearEnd = active && maxSec > 0 && remain <= 30;

  return (
    <View style={s.container}>
      {/* 상태에 따라 은은하게 물드는 배경 */}
      <LinearGradient
        colors={
          state === "speaking"
            ? [theme.primary + "22", theme.bg, theme.bg]
            : state === "listening"
              ? ["#58CC0220", theme.bg, theme.bg]
              : [theme.surface, theme.bg, theme.bg]
        }
        style={StyleSheet.absoluteFill}
      />

      <View style={[s.header, { paddingTop: insets.top + 6 }]}>
        <Pressable
          onPress={async () => {
            await stop();
            router.back();
          }}
          style={s.iconBtn}
          hitSlop={8}
        >
          <Ionicons name="chevron-down" size={26} color={theme.text} />
        </Pressable>

        {active ? (
          <View style={[s.timerPill, nearEnd && s.timerPillWarn]}>
            <Ionicons
              name="time-outline"
              size={13}
              color={nearEnd ? "#fff" : theme.textSecondary}
            />
            <Text style={[s.timerText, nearEnd && s.timerTextWarn]}>
              {fmt(remain)}
            </Text>
          </View>
        ) : (
          <Text style={s.title}>{t("tutor.title")}</Text>
        )}

        <View style={s.iconBtn} />
      </View>

      <View style={s.stage}>
        <TutorOrb state={state} />

        <Animated.Text
          key={state}
          entering={FadeIn.duration(220)}
          style={s.statusText}
        >
          {t(`tutor.state.${state}`)}
        </Animated.Text>
      </View>

      {/* 자막. 우즈벡어 설명은 소리가 아니라 여기로 나온다 */}
      <View style={s.captionArea}>
        {!!userSaid && active && (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={s.userBubble}>
            <Text style={s.userText} numberOfLines={2}>
              {userSaid}
            </Text>
          </Animated.View>
        )}

        {!!caption && (
          <ScrollView
            style={s.captionScroll}
            contentContainerStyle={s.captionInner}
            showsVerticalScrollIndicator={false}
          >
            <Text style={s.captionText}>{caption}</Text>
          </ScrollView>
        )}

        {!active && !caption && !!quota && (
          <View style={s.quotaBox}>
            <View style={s.quotaRow}>
              <Ionicons name="mic-outline" size={15} color={theme.textSecondary} />
              <Text style={s.quotaText}>
                {t("tutor.quotaLeft", {
                  min: Math.max(0, quota.dailyLimitMin - quota.dailyUsedMin),
                  limit: quota.dailyLimitMin,
                })}
              </Text>
            </View>
            {!quota.isSuper && (
              <Pressable onPress={() => router.push("/premium")} hitSlop={6}>
                <Text style={s.quotaUpsell}>{t("tutor.upsell")}</Text>
              </Pressable>
            )}
          </View>
        )}

        {!!error && (
          <Text style={s.error}>
            {t(`tutor.err.${error}`, t("tutor.err.generic"))}
          </Text>
        )}
      </View>

      <View style={[s.footer, { paddingBottom: insets.bottom + 24 }]}>
        {active ? (
          <CallButton
            icon="close"
            label={t("tutor.end")}
            onPress={stop}
            bg="#E5533D"
            shadow="#B8341F"
            s={s}
          />
        ) : (
          <CallButton
            icon="mic"
            label={exhausted ? t("tutor.limitReached") : t("tutor.start")}
            onPress={() => start("freeTalk")}
            disabled={busy || exhausted}
            bg={theme.primary}
            shadow="#5B4DD4"
            s={s}
          />
        )}
      </View>
    </View>
  );
}

/** 통화 버튼. 누르면 바텀보더가 줄어들며 눌리는 느낌이 난다 */
function CallButton({
  icon,
  label,
  onPress,
  disabled,
  bg,
  shadow,
  s,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  bg: string;
  shadow: string;
  s: any;
}) {
  const press = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * 3 }],
    borderBottomWidth: 5 - press.value * 3,
  }));

  return (
    <AnimatedPressable
      onPressIn={() => (press.value = withTiming(1, { duration: 70 }))}
      onPressOut={() => (press.value = withTiming(0, { duration: 130 }))}
      onPress={onPress}
      disabled={disabled}
      style={[
        s.cta,
        { backgroundColor: bg, borderColor: shadow },
        disabled && s.ctaDisabled,
        style,
      ]}
    >
      <Ionicons name={icon} size={22} color="#fff" />
      <Text style={s.ctaText}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      paddingBottom: 4,
    },
    iconBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 16, fontWeight: "900", color: theme.text },
    timerPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: theme.surface,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: theme.border,
    },
    timerPillWarn: { backgroundColor: "#E5533D", borderColor: "#B8341F" },
    timerText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
      fontVariant: ["tabular-nums"],
    },
    timerTextWarn: { color: "#fff" },

    stage: { flex: 1, alignItems: "center", justifyContent: "center" },
    statusText: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
      marginTop: -14,
    },

    captionArea: {
      minHeight: 132,
      paddingHorizontal: 24,
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
    },
    userBubble: {
      alignSelf: "flex-end",
      maxWidth: "82%",
      backgroundColor: "#58CC02",
      borderRadius: 16,
      borderBottomRightRadius: 4,
      paddingHorizontal: 14,
      paddingVertical: 9,
    },
    userText: { color: "#fff", fontSize: 14, fontWeight: "700" },

    captionScroll: { maxHeight: 96, alignSelf: "stretch" },
    captionInner: { paddingVertical: 2 },
    captionText: {
      fontSize: 17,
      lineHeight: 26,
      fontWeight: "700",
      color: theme.text,
      textAlign: "center",
    },

    quotaBox: { alignItems: "center", gap: 8, paddingTop: 12 },
    quotaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    quotaText: { fontSize: 14, fontWeight: "700", color: theme.textSecondary },
    quotaUpsell: {
      fontSize: 14,
      color: theme.primary,
      fontWeight: "900",
      textDecorationLine: "underline",
    },

    error: {
      fontSize: 14,
      color: "#E5533D",
      textAlign: "center",
      lineHeight: 20,
      paddingTop: 8,
    },

    footer: { paddingHorizontal: 28, paddingTop: 8 },
    cta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      borderRadius: 999,
      paddingVertical: 18,
    },
    ctaDisabled: { opacity: 0.5 },
    ctaText: { color: "#fff", fontSize: 17, fontWeight: "900" },
  });
