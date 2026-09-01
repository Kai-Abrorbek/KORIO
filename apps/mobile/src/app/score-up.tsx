import { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  cancelAnimation,
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import TopikSuccessConfetti from "@/components/topik/TopikSuccessConfetti";

/**
 * 스코어가 오른 순간.
 *
 * 스코어는 유닛을 통째로 끝내야 1 오른다. 드물게 오르는 값인데 아무도
 * 알려주지 않아서, 유저는 숫자가 언제 왜 올랐는지 몰랐다. 여기서 한 번
 * 멈춰 세워 "이만큼 왔다" 를 보여주고 바로 다음으로 보낸다.
 *
 * 이전 숫자에서 새 숫자로 넘어가는 걸 눈으로 보여주는 게 핵심이다.
 * 결과만 띄우면 그냥 또 하나의 축하 화면이고, 무엇이 올랐는지는 안 남는다.
 */
export default function ScoreUpScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);

  const params = useLocalSearchParams<{
    score?: string;
    unit?: string;
    category?: string;
  }>();
  const score = Number(params.score ?? 0);
  const prev = Math.max(0, score - 1);

  const flip = useSharedValue(0);
  const glow = useSharedValue(0);

  useEffect(() => {
    // 옛 숫자가 올라가며 사라지고 새 숫자가 아래에서 올라온다
    flip.value = withDelay(
      520,
      withTiming(1, { duration: 620, easing: Easing.out(Easing.cubic) }),
    );
    glow.value = withDelay(
      1000,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1100 }),
          withTiming(0.3, { duration: 1100 }),
        ),
        -1,
        false,
      ),
    );
    return () => {
      cancelAnimation(flip);
      cancelAnimation(glow);
    };
  }, [flip, glow]);

  const oldStyle = useAnimatedStyle(() => ({
    opacity: 1 - flip.value,
    transform: [{ translateY: -flip.value * 46 }, { scale: 1 - flip.value * 0.2 }],
  }));
  const newStyle = useAnimatedStyle(() => ({
    opacity: flip.value,
    transform: [
      { translateY: (1 - flip.value) * 46 },
      { scale: 0.8 + flip.value * 0.2 },
    ],
  }));
  const glowStyle = useAnimatedStyle(() => ({ opacity: glow.value * 0.5 }));

  const goOn = () =>
    router.replace(
      params.category
        ? { pathname: "/roadmap", params: { category: params.category } }
        : "/roadmap",
    );

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View pointerEvents="none" style={s.confetti}>
        <TopikSuccessConfetti
          playOnce
          dom={{
            scrollEnabled: false,
            showsHorizontalScrollIndicator: false,
            showsVerticalScrollIndicator: false,
            style: s.confettiFill,
          }}
        />
      </View>

      <View style={s.center}>
        <Animated.Text entering={FadeIn.duration(300)} style={s.eyebrow}>
          {t("scoreUp.eyebrow")}
        </Animated.Text>

        <View style={s.medalWrap}>
          <Animated.View style={[s.glow, glowStyle]} />
          <LinearGradient
            colors={["#FFD900", "#E5AE00"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.medal}
          >
            {/* 숫자 두 개를 겹쳐두고 하나는 올라가며 사라지고 하나는 올라온다 */}
            <Animated.Text style={[s.medalNum, oldStyle]}>{prev}</Animated.Text>
            <Animated.Text style={[s.medalNum, s.medalNumOverlay, newStyle]}>
              {score}
            </Animated.Text>
          </LinearGradient>
        </View>

        <Animated.Text entering={FadeInDown.delay(760)} style={s.title}>
          {t("scoreUp.title", { score })}
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(880)} style={s.sub}>
          {t("scoreUp.sub", { unit: params.unit ?? "" })}
        </Animated.Text>
      </View>

      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable style={s.cta} onPress={goOn}>
          <Text style={s.ctaText}>{t("scoreUp.continue")}</Text>
          <Ionicons name="arrow-forward" size={19} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
    confetti: {
      position: "absolute",
      top: 40,
      left: 0,
      right: 0,
      height: 360,
      overflow: "hidden",
    },
    confettiFill: { width: "100%", height: "100%" },

    center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 14 },
    eyebrow: {
      fontSize: 13,
      fontWeight: "900",
      letterSpacing: 1.6,
      color: "#E5AE00",
    },

    medalWrap: { alignItems: "center", justifyContent: "center" },
    glow: {
      position: "absolute",
      width: 190,
      height: 190,
      borderRadius: 95,
      backgroundColor: "#FFD900",
    },
    medal: {
      width: 138,
      height: 138,
      borderRadius: 69,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    medalNum: {
      position: "absolute",
      fontSize: 62,
      fontWeight: "900",
      color: "#7A5C00",
      fontVariant: ["tabular-nums"],
    },
    medalNumOverlay: {},

    title: {
      fontSize: 25,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      marginTop: 4,
    },
    sub: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      paddingHorizontal: 16,
    },

    footer: { paddingTop: 10 },
    cta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: "#58CC02",
      borderBottomWidth: 5,
      borderColor: "#46A302",
      borderRadius: 999,
      paddingVertical: 17,
    },
    ctaText: { color: "#fff", fontSize: 17, fontWeight: "900" },
  });
