import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { StudyPathService } from "@/services/study-path.service";
import type { StudyLevel } from "@/types/study-path";
import { darken } from "@/utils/color";
import { markLevelPicked } from "@/utils/placement-level";

const LEVEL_COLORS = [
  "#776ee2",
  "#1D9E75",
  "#E2A83A",
  "#E25C5C",
  "#45B7D1",
  "#6e1cf2",
];

/**
 * 어디서부터 배울지 고르는 화면.
 *
 * 예전엔 온보딩 레벨 테스트만이 급수를 정했고, 그마저 건너뛰면 무조건 1급에
 * 묶였다. 한 번 정해지면 바꿀 길도 없었다. 여기서 직접 고르고, 나중에 언제든
 * 다시 온다.
 */
export default function StudyLevelScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(theme);
  const params = useLocalSearchParams<{ from?: string }>();

  const [levels, setLevels] = useState<StudyLevel[]>([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    StudyPathService.getLevels()
      .then((res) => {
        setLevels(res.levels);
        setCurrent(res.current);
      })
      .catch(() => setLevels([]))
      .finally(() => setLoading(false));
  }, []);

  const choose = useCallback(
    async (level: StudyLevel) => {
      if (!level.available || saving) return;
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setSaving(true);
      try {
        await StudyPathService.setLevel(level.level);
        // 서버가 placementLevelSetAt 을 남긴다. 다음 getMe 전까지 로컬도 맞춰둬야
        // 이 화면을 빠져나온 직후에 또 급수를 묻지 않는다.
        markLevelPicked(level.level);
        setCurrent(level.level);
        router.replace("/study-path");
      } catch {
        setSaving(false);
      }
    },
    [router, saving],
  );

  const goBack = () => {
    // 로드맵에서 급수를 바꾸러 왔으면 그리로, 처음 진입이면 코스 선택으로
    if (params.from === "studyPath") {
      router.replace("/study-path");
      return;
    }
    if (router.canGoBack()) router.back();
    else router.replace("/courses");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Pressable style={styles.closeBtn} onPress={goBack} hitSlop={12}>
        <Ionicons name="close" size={28} color={theme.text} />
      </Pressable>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingBottom: insets.bottom + 28 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <HaneulmonMascot size={78} mood="default" />
            <Text style={styles.title}>{t("studyLevel.title")}</Text>
            <Text style={styles.subtitle}>{t("studyLevel.subtitle")}</Text>
          </View>

          <View style={styles.list}>
            {levels.map((level, index) => {
              const color = LEVEL_COLORS[index % LEVEL_COLORS.length];
              const selected = level.level === current;

              if (!level.available) {
                return (
                  <Animated.View
                    key={level.level}
                    entering={FadeInDown.delay(index * 60).duration(320)}
                  >
                    <View style={styles.lockedCard}>
                      <View style={styles.lockedIcon}>
                        <Ionicons
                          name="lock-closed"
                          size={19}
                          color={theme.textSecondary}
                        />
                      </View>
                      <View style={styles.texts}>
                        <Text style={styles.lockedTitle} numberOfLines={1}>
                          {level.title}
                        </Text>
                        <Text style={styles.lockedDesc}>
                          {t("studyLevel.comingSoon")}
                        </Text>
                      </View>
                    </View>
                  </Animated.View>
                );
              }

              return (
                <Animated.View
                  key={level.level}
                  entering={FadeInDown.delay(index * 60).duration(320)}
                >
                  <Pressable
                    onPress={() => void choose(level)}
                    style={({ pressed }) => [
                      styles.cardWrap,
                      pressed && styles.cardPressed,
                    ]}
                  >
                    <View
                      style={[
                        styles.cardDepth,
                        { backgroundColor: darken(color, 38) },
                      ]}
                    />
                    <LinearGradient
                      colors={[color, darken(color, 16)]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.card}
                    >
                      <View style={styles.shine} pointerEvents="none" />
                      <View style={styles.orb} pointerEvents="none" />

                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{level.level}</Text>
                      </View>

                      <View style={styles.texts}>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                          {level.title}
                        </Text>
                        <Text style={styles.cardDesc}>{level.description}</Text>
                      </View>

                      {selected ? (
                        <View style={styles.check}>
                          <Ionicons name="checkmark" size={18} color={color} />
                        </View>
                      ) : (
                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color="rgba(255,255,255,0.85)"
                        />
                      )}
                    </LinearGradient>
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>

          <Text style={styles.hint}>{t("studyLevel.hint")}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    closeBtn: {
      alignSelf: "flex-start",
      paddingHorizontal: 16,
      paddingVertical: 6,
    },
    state: { flex: 1, alignItems: "center", justifyContent: "center" },
    scroll: { paddingHorizontal: 18, paddingTop: 6 },
    hero: { alignItems: "center", gap: 8, marginBottom: 22 },
    title: {
      fontSize: 23,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      letterSpacing: -0.3,
    },
    subtitle: {
      fontSize: 13.5,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 19,
    },
    list: { gap: 12 },
    cardWrap: { position: "relative" },
    cardPressed: { transform: [{ translateY: 2 }] },
    cardDepth: {
      position: "absolute",
      top: 5,
      left: 0,
      right: 0,
      bottom: -3,
      borderRadius: 20,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 15,
      overflow: "hidden",
      borderWidth: 1.5,
      borderColor: "rgba(255,255,255,0.26)",
    },
    shine: {
      position: "absolute",
      top: 0,
      left: 16,
      right: 16,
      height: 2,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.5)",
    },
    orb: {
      position: "absolute",
      width: 92,
      height: 92,
      borderRadius: 999,
      right: -28,
      top: -42,
      backgroundColor: "rgba(255,255,255,0.12)",
    },
    badge: {
      width: 44,
      height: 44,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.2)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.26)",
    },
    badgeText: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "900",
      letterSpacing: -0.5,
    },
    texts: { flex: 1, gap: 3 },
    cardTitle: { fontSize: 16.5, fontWeight: "900", color: "#fff" },
    cardDesc: {
      fontSize: 12.5,
      fontWeight: "600",
      color: "rgba(255,255,255,0.88)",
      lineHeight: 17,
    },
    check: {
      width: 30,
      height: 30,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    lockedCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      opacity: 0.75,
    },
    lockedIcon: {
      width: 44,
      height: 44,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.border,
    },
    lockedTitle: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    lockedDesc: {
      fontSize: 12.5,
      fontWeight: "600",
      color: theme.textSecondary,
      opacity: 0.85,
    },
    hint: {
      marginTop: 18,
      fontSize: 12,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 17,
    },
  });
