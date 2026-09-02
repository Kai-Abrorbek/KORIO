import { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter, useLocalSearchParams } from "expo-router";
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
import { ThemeColors } from "@/constants/theme";
import TopikSuccessConfetti from "@/components/topik/TopikSuccessConfetti";
import { backToRoadmap } from "@/store/settings.store";

const GREEN = "#58CC02";
const GREEN_DARK = "#46A302";
const BLUE = "#1CB0F6";
const BLUE_DARK = "#1899D6";
const RED = "#E5533D";

/**
 * 점프 테스트 결과.
 *
 * 두 가지를 고쳤다.
 *
 * ① 무엇이 열렸는지 틀리게 말하고 있었다. 화면이 unit 만 받아서, 섹션을
 *    통째로 건너뛰어도 "유닛 1 잠금 해제" 라고 떴다. 이제 서버가 준 범위
 *    (section / target)로 섹션이 열린 건지 유닛이 열린 건지 구분한다.
 *
 * ② 아이콘 하나에 문구 두 줄이 전부였다. 통과는 이 앱에서 가장 크게 축하할
 *    순간 중 하나인데(구간을 통째로 건너뛴 것이다) 그만한 무게가 없었다.
 *    자물쇠가 열리는 도장, 건너뛴 레슨 수, 어디로 가는지를 보여준다.
 */
export default function JumpResultScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);

  const { passed, unit, wrong, section, target, lessons, category } =
    useLocalSearchParams<{
      passed?: string;
      unit?: string;
      wrong?: string;
      section?: string;
      target?: string;
      lessons?: string;
      category?: string;
    }>();

  const isPass = passed === "1";
  const isSectionJump = target === "section";
  const skipped = Number(lessons ?? 0);

  const stamp = useSharedValue(0);
  const ring = useSharedValue(0);

  useEffect(() => {
    if (!isPass) return;
    // 도장이 쿵 찍히고, 그 뒤로 잠금 해제된 고리가 은은하게 돈다
    stamp.value = withDelay(
      160,
      withTiming(1, { duration: 460, easing: Easing.out(Easing.back(2.4)) }),
    );
    ring.value = withDelay(
      700,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1200 }),
          withTiming(0.3, { duration: 1200 }),
        ),
        -1,
        false,
      ),
    );
    return () => {
      cancelAnimation(stamp);
      cancelAnimation(ring);
    };
  }, [isPass, stamp, ring]);

  const stampStyle = useAnimatedStyle(() => ({
    opacity: stamp.value,
    transform: [{ scale: 0.6 + stamp.value * 0.4 }],
  }));
  const ringStyle = useAnimatedStyle(() => ({
    opacity: ring.value * 0.4,
    transform: [{ scale: 1 + ring.value * 0.16 }],
  }));

  const title = isPass
    ? isSectionJump
      ? t("jump.passSectionTitle", { section })
      : t("jump.passUnitTitle", { unit })
    : t("jump.failTitle");

  const sub = isPass
    ? isSectionJump
      ? t("jump.passSectionSub", { section })
      : t("jump.passUnitSub", { unit })
    : t("jump.failSub");

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      {isPass && (
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
      )}

      <View style={s.center}>
        {isPass ? (
          <>
            <View style={s.stampWrap}>
              <Animated.View style={[s.ring, ringStyle]} />
              <Animated.View style={stampStyle}>
                <LinearGradient
                  colors={[GREEN, GREEN_DARK]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={s.stamp}
                >
                  <Ionicons name="lock-open" size={54} color="#fff" />
                </LinearGradient>
              </Animated.View>
            </View>

            <Animated.Text entering={FadeIn.delay(420)} style={s.eyebrow}>
              {isSectionJump
                ? t("jump.unlockedSectionLabel")
                : t("jump.unlockedUnitLabel")}
            </Animated.Text>
          </>
        ) : (
          <Animated.View
            entering={FadeIn.duration(320)}
            style={[s.stamp, { backgroundColor: RED }]}
          >
            <Ionicons name="refresh" size={54} color="#fff" />
          </Animated.View>
        )}

        <Animated.Text entering={FadeInDown.delay(520)} style={s.title}>
          {title}
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(620)} style={s.sub}>
          {sub}
        </Animated.Text>

        {/* 통과했을 때만: 실제로 무엇을 아꼈는지 숫자로 */}
        {isPass && skipped > 0 && (
          <Animated.View entering={FadeInDown.delay(720)} style={s.statCard}>
            <Ionicons name="flash" size={18} color={GREEN_DARK} />
            <Text style={s.statText}>
              {t("jump.skippedLessons", { count: skipped })}
            </Text>
          </Animated.View>
        )}

        {!isPass && (
          <Animated.View entering={FadeInDown.delay(700)} style={s.statCard}>
            <Ionicons name="close-circle" size={18} color={RED} />
            <Text style={s.statText}>
              {t("jump.wrongCount", { count: Number(wrong ?? 0) })}
            </Text>
          </Animated.View>
        )}
      </View>

      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable
          style={[
            s.cta,
            {
              backgroundColor: isPass ? GREEN : BLUE,
              borderColor: isPass ? GREEN_DARK : BLUE_DARK,
            },
          ]}
          onPress={() => router.replace(backToRoadmap(category))}
        >
          <Text style={s.ctaText}>
            {isPass ? t("jump.goStudy") : t("jump.continue")}
          </Text>
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
      top: 30,
      left: 0,
      right: 0,
      height: 340,
      overflow: "hidden",
    },
    confettiFill: { width: "100%", height: "100%" },

    center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },

    stampWrap: { alignItems: "center", justifyContent: "center" },
    ring: {
      position: "absolute",
      width: 132,
      height: 132,
      borderRadius: 66,
      backgroundColor: GREEN,
    },
    stamp: {
      width: 118,
      height: 118,
      borderRadius: 59,
      alignItems: "center",
      justifyContent: "center",
    },

    eyebrow: {
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 1.6,
      color: GREEN_DARK,
      marginTop: 6,
    },
    title: {
      fontSize: 26,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      paddingHorizontal: 8,
    },
    sub: {
      fontSize: 15,
      lineHeight: 23,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      paddingHorizontal: 12,
    },

    statCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 999,
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginTop: 6,
    },
    statText: { fontSize: 14, fontWeight: "800", color: theme.text },

    footer: { paddingTop: 10 },
    cta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderBottomWidth: 5,
      borderRadius: 999,
      paddingVertical: 17,
    },
    ctaText: { color: "#fff", fontSize: 17, fontWeight: "900" },
  });
