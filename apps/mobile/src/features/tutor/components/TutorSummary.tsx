import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import type { SessionSummary } from "../services/tutor.api";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GREEN = "#58CC02";
const GREEN_DARK = "#46A302";
const AMBER = "#FFC800";

/**
 * 대화가 끝나고 뜨는 정리 카드.
 *
 * 이게 없으면 통화가 그냥 끊기고 끝나서, 유저가 "내가 늘고 있나" 를 알 방법이
 * 없다. 구독을 유지시키는 건 대화 자체보다 이 화면이다.
 *
 * 톤이 중요하다 — 지적을 먼저 늘어놓으면 다시 안 켠다. 그래서 순서가
 * 성과(시간·말한 횟수) → 잘한 것 → 고칠 것 → 새 표현 이다. 고칠 것도
 * "틀렸다" 가 아니라 "이렇게 말하면 더 좋아요" 로 쓴다.
 */
export function TutorSummary({
  data,
  topicTitle,
  onSpeak,
  onClose,
  onAgain,
}: {
  data: SessionSummary;
  topicTitle?: string;
  /** 고친 문장을 정확한 한국어 목소리로 들려준다 */
  onSpeak: (text: string) => void;
  onClose: () => void;
  onAgain: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  const insets = useSafeAreaInsets();

  const min = Math.floor(data.durationSec / 60);
  const sec = data.durationSec % 60;

  return (
    <Animated.View entering={FadeIn.duration(200)} style={s.overlay}>
      <ScrollView
        contentContainerStyle={[
          s.scroll,
          { paddingTop: insets.top + 16, paddingBottom: 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 성과부터. 잘못한 것보다 해낸 것이 먼저 보여야 한다 */}
        <Animated.View entering={FadeInDown.duration(320)}>
          <LinearGradient
            colors={[GREEN, GREEN_DARK]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.hero}
          >
            <View style={s.heroIcon}>
              <Ionicons name="chatbubbles" size={26} color="#fff" />
            </View>
            <Text style={s.heroTitle}>{t("tutor.summary.title")}</Text>
            {!!topicTitle && <Text style={s.heroSub}>{topicTitle}</Text>}

            <View style={s.statRow}>
              <Stat
                value={min > 0 ? `${min}:${String(sec).padStart(2, "0")}` : `${sec}s`}
                label={t("tutor.summary.statTime")}
                s={s}
              />
              <View style={s.statDivider} />
              <Stat
                value={String(data.spokenTurns)}
                label={t("tutor.summary.statSpoke")}
                s={s}
              />
              <View style={s.statDivider} />
              <Stat
                value={String(data.newVocabulary.length)}
                label={t("tutor.summary.statWords")}
                s={s}
              />
            </View>
          </LinearGradient>
        </Animated.View>

        {!!data.summary && (
          <Animated.Text
            entering={FadeInDown.delay(80).duration(320)}
            style={s.summaryLine}
          >
            {data.summary}
          </Animated.Text>
        )}

        {data.goodExpressions.length > 0 && (
          <Section
            icon="checkmark-circle"
            tint={GREEN}
            title={t("tutor.summary.didWell")}
            delay={140}
            s={s}
          >
            {data.goodExpressions.map((g) => (
              <Pressable key={g} style={s.goodRow} onPress={() => onSpeak(g)}>
                <Ionicons name="volume-medium" size={15} color={GREEN_DARK} />
                <Text style={s.goodText}>{g}</Text>
              </Pressable>
            ))}
          </Section>
        )}

        {data.mistakes.length > 0 && (
          <Section
            icon="sparkles"
            tint={AMBER}
            title={t("tutor.summary.betterWay")}
            delay={200}
            s={s}
          >
            {data.mistakes.map((m, i) => (
              <View key={`${m.corrected}-${i}`} style={s.fixCard}>
                <Text style={s.fixOriginal}>{m.original}</Text>
                <View style={s.fixArrow}>
                  <Ionicons name="arrow-down" size={13} color={theme.textSecondary} />
                </View>
                <Pressable
                  style={s.fixCorrectedRow}
                  onPress={() => onSpeak(m.corrected)}
                >
                  <Text style={s.fixCorrected}>{m.corrected}</Text>
                  <Ionicons name="volume-high" size={16} color={GREEN_DARK} />
                </Pressable>
                {!!m.note && <Text style={s.fixNote}>{m.note}</Text>}
              </View>
            ))}
          </Section>
        )}

        {data.newVocabulary.length > 0 && (
          <Section
            icon="bookmark"
            tint={theme.primary}
            title={t("tutor.summary.newWords")}
            delay={260}
            s={s}
          >
            <View style={s.chipWrap}>
              {data.newVocabulary.map((w) => (
                <Pressable key={w} style={s.chip} onPress={() => onSpeak(w)}>
                  <Ionicons name="volume-low" size={13} color={theme.primary} />
                  <Text style={s.chipText}>{w}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={s.reviewHint}>{t("tutor.summary.reviewHint")}</Text>
          </Section>
        )}

        {data.grammarPoints.length > 0 && (
          <Animated.View
            entering={FadeInDown.delay(320).duration(320)}
            style={s.grammarRow}
          >
            {data.grammarPoints.map((g) => (
              <View key={g} style={s.grammarChip}>
                <Text style={s.grammarText}>{g}</Text>
              </View>
            ))}
          </Animated.View>
        )}
      </ScrollView>

      {/* 확인 버튼은 스크롤 밖에 고정한다 */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 18 }]}>
        <Pressable onPress={onAgain} style={s.ghostBtn} hitSlop={6}>
          <Ionicons name="refresh" size={17} color={theme.textSecondary} />
          <Text style={s.ghostText}>{t("tutor.summary.again")}</Text>
        </Pressable>
        <DoneButton label={t("tutor.summary.done")} onPress={onClose} s={s} />
      </View>
    </Animated.View>
  );
}

function Stat({ value, label, s }: { value: string; label: string; s: any }) {
  return (
    <View style={s.stat}>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

function Section({
  icon,
  tint,
  title,
  delay,
  s,
  children,
}: {
  icon: any;
  tint: string;
  title: string;
  delay: number;
  s: any;
  children: React.ReactNode;
}) {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(320)}
      style={s.section}
    >
      <View style={s.sectionHead}>
        <Ionicons name={icon} size={17} color={tint} />
        <Text style={s.sectionTitle}>{title}</Text>
      </View>
      {children}
    </Animated.View>
  );
}

function DoneButton({
  label,
  onPress,
  s,
}: {
  label: string;
  onPress: () => void;
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
      style={[s.doneBtn, style]}
    >
      <Text style={s.doneText}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    // 오버레이가 아니라 화면 전체를 대체한다. 대화가 끝난 뒤엔 뒤에 보여줄 게 없다
    overlay: { flex: 1, backgroundColor: theme.bg },
    scroll: { paddingHorizontal: 18, gap: 14 },

    hero: {
      borderRadius: 24,
      padding: 20,
      alignItems: "center",
      gap: 6,
    },
    heroIcon: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: "rgba(255,255,255,0.22)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 2,
    },
    heroTitle: { fontSize: 21, fontWeight: "900", color: "#fff" },
    heroSub: {
      fontSize: 13,
      fontWeight: "700",
      color: "rgba(255,255,255,0.86)",
      textAlign: "center",
    },

    statRow: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "stretch",
      marginTop: 12,
      backgroundColor: "rgba(255,255,255,0.18)",
      borderRadius: 16,
      paddingVertical: 12,
    },
    stat: { flex: 1, alignItems: "center", gap: 2 },
    statDivider: {
      width: 1,
      height: 26,
      backgroundColor: "rgba(255,255,255,0.3)",
    },
    statValue: {
      fontSize: 19,
      fontWeight: "900",
      color: "#fff",
      fontVariant: ["tabular-nums"],
    },
    statLabel: {
      fontSize: 11,
      fontWeight: "800",
      color: "rgba(255,255,255,0.85)",
    },

    summaryLine: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
      paddingHorizontal: 6,
    },

    section: { gap: 8 },
    sectionHead: { flexDirection: "row", alignItems: "center", gap: 7 },
    sectionTitle: { fontSize: 15, fontWeight: "900", color: theme.text },

    goodRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: GREEN + "14",
      borderWidth: 1,
      borderColor: GREEN + "44",
      borderRadius: 14,
      paddingHorizontal: 13,
      paddingVertical: 11,
    },
    goodText: {
      flex: 1,
      fontSize: 15,
      fontWeight: "800",
      color: theme.text,
    },

    fixCard: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 16,
      padding: 14,
      gap: 2,
    },
    fixOriginal: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textSecondary,
      textDecorationLine: "line-through",
    },
    fixArrow: { alignItems: "flex-start", paddingVertical: 1 },
    fixCorrectedRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    fixCorrected: {
      flex: 1,
      fontSize: 16,
      fontWeight: "900",
      color: GREEN_DARK,
    },
    fixNote: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
      color: theme.textSecondary,
      marginTop: 6,
    },

    chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: theme.primary + "14",
      borderWidth: 1,
      borderColor: theme.primary + "3D",
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    chipText: { fontSize: 14, fontWeight: "800", color: theme.primary },
    reviewHint: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.textSecondary,
      marginTop: 2,
    },

    grammarRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
    grammarChip: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: 9,
      paddingVertical: 5,
    },
    grammarText: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.textSecondary,
    },

    footer: {
      paddingHorizontal: 18,
      paddingTop: 10,
      gap: 10,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      backgroundColor: theme.bg,
    },
    ghostBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 4,
    },
    ghostText: { fontSize: 14, fontWeight: "800", color: theme.textSecondary },
    doneBtn: {
      backgroundColor: GREEN,
      borderColor: GREEN_DARK,
      borderBottomWidth: 5,
      borderRadius: 999,
      paddingVertical: 16,
      alignItems: "center",
    },
    doneText: { color: "#fff", fontSize: 17, fontWeight: "900" },
  });
