import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useRealtimeTutor, type TutorState } from "../hooks/useRealtimeTutor";

const fmt = (sec: number) =>
  `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

export default function TutorScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);
  const router = useRouter();

  const { state, quota, error, elapsedSec, maxSec, active, busy, start, stop } =
    useRealtimeTutor();

  // 화면을 벗어나면 반드시 끊는다. 안 끊으면 마이크가 열린 채로 과금이 계속된다.
  useFocusEffect(
    useCallback(() => {
      return () => {
        void stop();
      };
    }, [stop]),
  );

  const exhausted = !!quota && quota.allowedMin <= 0;

  return (
    <View style={[s.container, { paddingTop: insets.top + 8 }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={async () => {
            await stop();
            router.back();
          }}
          style={s.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.title}>{t("tutor.title")}</Text>
        <View style={s.backBtn} />
      </View>

      <View style={s.center}>
        <Orb state={state} theme={theme} />

        <Text style={s.statusText}>{t(`tutor.state.${state}`)}</Text>

        {active && (
          <Text style={s.timer}>
            {fmt(elapsedSec)}
            {maxSec ? ` / ${fmt(maxSec)}` : ""}
          </Text>
        )}

        {!!error && <Text style={s.error}>{t(`tutor.err.${error}`, t("tutor.err.generic"))}</Text>}

        {!active && !!quota && (
          <View style={s.quotaBox}>
            <Text style={s.quotaText}>
              {t("tutor.quotaLeft", {
                min: Math.max(
                  0,
                  quota.dailyLimitMin - quota.dailyUsedMin,
                ),
                limit: quota.dailyLimitMin,
              })}
            </Text>
            {!quota.isSuper && (
              <Text style={s.quotaUpsell}>{t("tutor.upsell")}</Text>
            )}
          </View>
        )}
      </View>

      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        {active ? (
          <TouchableOpacity
            style={[s.cta, s.ctaEnd]}
            onPress={stop}
            activeOpacity={0.9}
          >
            <Ionicons name="stop" size={20} color="#fff" />
            <Text style={s.ctaText}>{t("tutor.end")}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[s.cta, (busy || exhausted) && s.ctaDisabled]}
            onPress={() => start("freeTalk")}
            disabled={busy || exhausted}
            activeOpacity={0.9}
          >
            <Ionicons name="mic" size={20} color="#fff" />
            <Text style={s.ctaText}>
              {exhausted ? t("tutor.limitReached") : t("tutor.start")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/**
 * 상태를 한눈에 보여주는 구.
 * 듣는 중엔 천천히 숨쉬고, 말하는 중엔 빠르게 뛴다 —
 * 자막 없이도 지금 누구 차례인지 알 수 있어야 한다.
 */
function Orb({ state, theme }: { state: TutorState; theme: ThemeColors }) {
  const scale = useSharedValue(1);
  const s = styles(theme);

  useEffect(() => {
    cancelAnimation(scale);
    if (state === "listening") {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.06, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );
    } else if (state === "speaking") {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.12, { duration: 420, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 420, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );
    } else if (state === "thinking") {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.03, { duration: 700 }),
          withTiming(1, { duration: 700 }),
        ),
        -1,
        true,
      );
    } else {
      scale.value = withTiming(1, { duration: 200 });
    }
  }, [state, scale]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const colors: [string, string, string] =
    state === "speaking"
      ? ["#9D8DFF", "#776ee2", "#5B4DD4"]
      : state === "listening"
        ? ["#7FD8A0", "#58CC02", "#3FA000"]
        : ["#C9C4E8", "#A8A2CF", "#8B85B8"];

  return (
    <Animated.View style={[s.orbWrap, animStyle]}>
      <LinearGradient colors={colors} style={s.orb}>
        <Ionicons
          name={
            state === "speaking"
              ? "volume-high"
              : state === "listening"
                ? "mic"
                : state === "connecting" || state === "thinking"
                  ? "ellipsis-horizontal"
                  : "chatbubble-ellipses"
          }
          size={46}
          color="#fff"
        />
      </LinearGradient>
    </Animated.View>
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
      paddingBottom: 8,
    },
    backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 17, fontWeight: "900", color: theme.text },

    center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16, paddingHorizontal: 32 },
    orbWrap: { marginBottom: 8 },
    orb: {
      width: 148,
      height: 148,
      borderRadius: 74,
      alignItems: "center",
      justifyContent: "center",
    },
    statusText: { fontSize: 17, fontWeight: "800", color: theme.text, textAlign: "center" },
    timer: { fontSize: 14, fontWeight: "700", color: theme.textSecondary, fontVariant: ["tabular-nums"] },
    error: { fontSize: 14, color: "#E5533D", textAlign: "center", lineHeight: 20 },

    quotaBox: { alignItems: "center", gap: 4, marginTop: 8 },
    quotaText: { fontSize: 14, fontWeight: "700", color: theme.textSecondary },
    quotaUpsell: { fontSize: 13, color: theme.primary, fontWeight: "800" },

    footer: { paddingHorizontal: 24, paddingTop: 12 },
    cta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 18,
      borderBottomWidth: 4,
      borderColor: "#5B4DD4",
    },
    ctaEnd: { backgroundColor: "#E5533D", borderColor: "#B23A28" },
    ctaDisabled: { opacity: 0.5 },
    ctaText: { color: "#fff", fontSize: 17, fontWeight: "900" },
  });
