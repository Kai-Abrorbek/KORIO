import { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
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
import { useSpeech } from "@/hooks/useSpeech";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { TutorOrb } from "../components/TutorOrb";
import { TopicPicker } from "../components/TopicPicker";
import { TutorSummary } from "../components/TutorSummary";
import type { TutorTopicCard } from "../services/tutor.api";
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
  const { speak } = useSpeech();
  /** 고른 주제. null 이면 아직 안 골랐다 = 주제 화면을 보여준다 */
  const [topic, setTopic] = useState<TutorTopicCard | null>(null);
  const [picking, setPicking] = useState(true);

  const {
    state,
    quota,
    error,
    caption,
    userSaid,
    examples,
    targets,
    summary,
    analyzing,
    clearSummary,
    withMicMuted,
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

  // 아직 주제를 안 골랐고 대화도 안 하는 중이면 주제부터 고르게 한다.
  // "무슨 말을 하지?" 로 얼어붙는 걸 막는 첫 번째 장치다.
  if (picking && !active && !summary && !analyzing) {
    return (
      <View style={[s.container, { paddingTop: insets.top + 6 }]}>
        <View style={s.header}>
          <Pressable onPress={() => router.back()} style={s.iconBtn} hitSlop={8}>
            <Ionicons name="chevron-down" size={26} color={theme.text} />
          </Pressable>
          <Text style={s.title}>{t("tutor.pickTopic")}</Text>
          <View style={s.iconBtn} />
        </View>
        <TopicPicker
          onPick={(picked) => {
            setTopic(picked);
            setPicking(false);
            void start("freeTalk", { topicId: picked.id });
          }}
          onFreeTalk={() => {
            setTopic(null);
            setPicking(false);
            void start("freeTalk");
          }}
        />
      </View>
    );
  }

  // 대화가 끝나면 정리 카드로 덮는다. 그냥 끊기고 끝나면 뭘 했는지 남지 않는다.
  if (summary) {
    return (
      <TutorSummary
        data={summary}
        topicTitle={topic?.title}
        onSpeak={(text) => void speak(text, "ko-KR")}
        onClose={() => {
          clearSummary();
          router.back();
        }}
        onAgain={() => {
          clearSummary();
          setPicking(true);
        }}
      />
    );
  }

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
          <Text style={s.title} numberOfLines={1}>
            {topic?.title ?? t("tutor.title")}
          </Text>
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

        {/* 아직 대화 내용이 없을 때 오늘 연습할 표현을 미리 보여준다.
            무슨 말을 해야 할지 몰라 얼어붙는 걸 막는 두 번째 장치다. */}
        {active && !caption && targets.length > 0 && (
          <View style={s.targetBox}>
            <Text style={s.targetLabel}>{t("tutor.todayExpressions")}</Text>
            {targets.slice(0, 4).map((ex) => (
              <Pressable
                key={ex}
                style={s.targetRow}
                onPress={() =>
                  void withMicMuted(async () => {
                    await speak(ex, "ko-KR");
                  })
                }
              >
                <Ionicons name="volume-medium" size={14} color={theme.primary} />
                <Text style={s.targetText} numberOfLines={1}>
                  {ex}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {examples.length > 0 && active && (
          <View style={s.exampleRow}>
            {examples.map((ex) => (
              <Pressable
                key={ex}
                style={s.exampleChip}
                onPress={() =>
                  // 대화 모델 목소리는 영어 우선이라 한국어 발음이 정확하지
                  // 않다. 따라 할 문장은 Azure ko-KR 목소리로 들려준다.
                  // 재생 동안 마이크를 꺼야 AI 가 자기 예문에 반응하지 않는다.
                  void withMicMuted(async () => {
                    await speak(ex, "ko-KR");
                  })
                }
              >
                <Ionicons name="volume-high" size={14} color={theme.primary} />
                <Text style={s.exampleText} numberOfLines={1}>
                  {ex}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {analyzing && (
          <View style={s.analyzingBox}>
            <ActivityIndicator color={theme.primary} />
            <Text style={s.analyzingText}>{t("tutor.summary.analyzing")}</Text>
          </View>
        )}

        {!active && !analyzing && !caption && !!quota && (
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
            {!quota.isMax && (
              <Pressable onPress={() => router.push("/premium")} hitSlop={6}>
                <Text style={s.quotaUpsell}>{t("tutor.upsellMax")}</Text>
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
            icon="refresh"
            label={t("tutor.pickAnother")}
            onPress={() => setPicking(true)}
            disabled={busy || exhausted || analyzing}
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

    exampleRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "center",
    },
    exampleChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      maxWidth: "92%",
      backgroundColor: theme.primary + "14",
      borderWidth: 1,
      borderColor: theme.primary + "44",
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 7,
    },
    exampleText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.primary,
      flexShrink: 1,
    },

    targetBox: { alignSelf: "stretch", gap: 6 },
    targetLabel: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.textSecondary,
      textAlign: "center",
      marginBottom: 2,
    },
    targetRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    targetText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      flexShrink: 1,
    },

    analyzingBox: {
      alignItems: "center",
      gap: 10,
      paddingTop: 16,
    },
    analyzingText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.textSecondary,
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
