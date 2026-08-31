import { useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  cancelAnimation,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import type { CompleteReadingLessonResult } from "@/types/reading-listening";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface ReadingCompleteCopy {
  title: string;
  subtitle: string;
  repeatNote: string;
  quiz: string;
  reading: string;
  writing: string;
  done: string;
  saving: string;
  failed: string;
  retry: string;
  /** 낭독을 안 해서 XP 를 덜 받은 경우 */
  readingHint: string;
}

interface Palette {
  bg: string;
  surface: string;
  ink: string;
  sub: string;
  line: string;
  sage: string;
  sageDark: string;
  peachDark: string;
}

/**
 * 읽기 레슨을 끝냈을 때 뜨는 결과 시트.
 *
 * 이게 없으면 마지막 버튼이 그냥 뒤로가기라, 다 해놓고도 **무엇이 남았는지
 * 알 수 없다.** 남는 게 없으면 다음 글을 열 이유도 없다.
 *
 * XP 는 서버가 계산한 값을 그대로 보여준다. 화면에서 다시 계산하면 서버와
 * 어긋나는 순간 유저는 화면 숫자를 믿는다.
 */
export function ReadingCompleteSheet({
  result,
  saving,
  error,
  copy,
  palette,
  onRetry,
  onDone,
}: {
  result: CompleteReadingLessonResult | null;
  saving: boolean;
  error: boolean;
  copy: ReadingCompleteCopy;
  palette: Palette;
  onRetry: () => void;
  onDone: () => void;
}) {
  const insets = useSafeAreaInsets();
  const s = styles(palette);

  return (
    <Animated.View entering={FadeIn.duration(180)} style={s.overlay}>
      <View style={[s.sheet, { paddingBottom: insets.bottom + 18 }]}>
        {saving ? (
          <View style={s.center}>
            <ActivityIndicator color={palette.sageDark} />
            <Text style={s.savingText}>{copy.saving}</Text>
          </View>
        ) : error || !result ? (
          <View style={s.center}>
            <Ionicons name="cloud-offline-outline" size={34} color={palette.sub} />
            <Text style={s.savingText}>{copy.failed}</Text>
            <View style={s.errorActions}>
              <Pressable onPress={onRetry} style={s.ghostBtn} hitSlop={6}>
                <Ionicons name="refresh" size={16} color={palette.sageDark} />
                <Text style={s.ghostText}>{copy.retry}</Text>
              </Pressable>
              <Pressable onPress={onDone} style={s.ghostBtn} hitSlop={6}>
                <Text style={s.ghostText}>{copy.done}</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <>
            <XpBadge xp={result.xpEarned} palette={palette} />

            <Animated.Text entering={FadeInDown.delay(90)} style={s.title}>
              {copy.title}
            </Animated.Text>
            <Animated.Text entering={FadeInDown.delay(130)} style={s.subtitle}>
              {result.repeat ? copy.repeatNote : copy.subtitle}
            </Animated.Text>

            <Animated.View entering={FadeInDown.delay(180)} style={s.rows}>
              <Row
                icon="help-circle"
                label={copy.quiz}
                value={`${result.quizCorrect} / ${result.quizTotal}`}
                done={
                  result.quizTotal > 0 &&
                  result.quizCorrect === result.quizTotal
                }
                palette={palette}
              />
              <Row
                icon="mic"
                label={copy.reading}
                value=""
                done={result.progress.pronunciationCompleted}
                palette={palette}
              />
              <Row
                icon="create"
                label={copy.writing}
                value=""
                done={result.progress.writingSubmitted}
                palette={palette}
              />
            </Animated.View>

            {/* 낭독을 안 하면 XP 를 꽤 놓친다. 다음에 하게 만드는 한 줄 */}
            {!result.progress.pronunciationCompleted && (
              <Animated.Text entering={FadeInDown.delay(230)} style={s.hint}>
                {copy.readingHint}
              </Animated.Text>
            )}

            <DoneButton label={copy.done} onPress={onDone} palette={palette} />
          </>
        )}
      </View>
    </Animated.View>
  );
}

/** 획득 XP. 숫자가 그냥 떠 있으면 보상 같지 않아서 한 번 튀고 은은하게 빛난다 */
function XpBadge({ xp, palette }: { xp: number; palette: Palette }) {
  const pop = useSharedValue(0);
  const shine = useSharedValue(0);

  // 렌더 중에 shared value 를 건드리면 리렌더마다 애니메이션이 다시 시작된다.
  // 마운트될 때 한 번만 걸고, 사라질 때 반드시 멈춘다 (withRepeat 는 -1 이라
  // 안 멈추면 화면을 떠난 뒤에도 계속 돈다).
  useEffect(() => {
    pop.value = withDelay(60, withTiming(1, { duration: 420 }));
    shine.value = withDelay(
      460,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 900 }),
          withTiming(0, { duration: 900 }),
        ),
        -1,
        false,
      ),
    );
    return () => {
      cancelAnimation(pop);
      cancelAnimation(shine);
    };
  }, [pop, shine]);

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.7 + pop.value * 0.3 }],
    opacity: pop.value,
  }));
  const shineStyle = useAnimatedStyle(() => ({ opacity: shine.value * 0.5 }));

  const s = styles(palette);
  return (
    <Animated.View style={[s.badgeWrap, badgeStyle]}>
      <LinearGradient
        colors={[palette.sage, palette.sageDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.badge}
      >
        <Animated.View style={[s.badgeShine, shineStyle]} />
        <Text style={s.badgeXp}>+{xp}</Text>
        <Text style={s.badgeUnit}>XP</Text>
      </LinearGradient>
    </Animated.View>
  );
}

function Row({
  icon,
  label,
  value,
  done,
  palette,
}: {
  icon: any;
  label: string;
  value: string;
  done: boolean;
  palette: Palette;
}) {
  const s = styles(palette);
  return (
    <View style={s.row}>
      <Ionicons
        name={icon}
        size={17}
        color={done ? palette.sageDark : palette.sub}
      />
      <Text style={[s.rowLabel, !done && { color: palette.sub }]}>{label}</Text>
      {!!value && <Text style={s.rowValue}>{value}</Text>}
      <Ionicons
        name={done ? "checkmark-circle" : "ellipse-outline"}
        size={19}
        color={done ? palette.sageDark : palette.line}
      />
    </View>
  );
}

function DoneButton({
  label,
  onPress,
  palette,
}: {
  label: string;
  onPress: () => void;
  palette: Palette;
}) {
  const press = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * 3 }],
    borderBottomWidth: 5 - press.value * 3,
  }));
  const s = styles(palette);

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

const styles = (palette: Palette) =>
  StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.42)",
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: palette.bg,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 22,
      paddingTop: 26,
      gap: 12,
      alignItems: "center",
    },

    center: { alignItems: "center", gap: 12, paddingVertical: 26 },
    savingText: { fontSize: 14, fontWeight: "700", color: palette.sub },
    errorActions: { flexDirection: "row", gap: 18, paddingTop: 4 },
    ghostBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
    ghostText: { fontSize: 14, fontWeight: "800", color: palette.sageDark },

    badgeWrap: { alignItems: "center" },
    badge: {
      width: 108,
      height: 108,
      borderRadius: 54,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    badgeShine: {
      position: "absolute",
      top: -30,
      left: -30,
      width: 80,
      height: 180,
      backgroundColor: "#fff",
      transform: [{ rotate: "24deg" }],
    },
    badgeXp: {
      fontSize: 34,
      fontWeight: "900",
      color: "#fff",
      fontVariant: ["tabular-nums"],
    },
    badgeUnit: {
      fontSize: 12,
      fontWeight: "900",
      color: "rgba(255,255,255,0.9)",
      letterSpacing: 1,
      marginTop: -3,
    },

    title: { fontSize: 21, fontWeight: "900", color: palette.ink },
    subtitle: {
      fontSize: 14,
      fontWeight: "700",
      color: palette.sub,
      textAlign: "center",
      marginTop: -6,
    },

    rows: { alignSelf: "stretch", gap: 8, marginTop: 6 },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    rowLabel: { flex: 1, fontSize: 15, fontWeight: "800", color: palette.ink },
    rowValue: {
      fontSize: 15,
      fontWeight: "900",
      color: palette.peachDark,
      fontVariant: ["tabular-nums"],
    },

    hint: {
      fontSize: 13,
      fontWeight: "700",
      color: palette.sub,
      textAlign: "center",
      paddingHorizontal: 8,
    },

    doneBtn: {
      alignSelf: "stretch",
      marginTop: 8,
      backgroundColor: palette.sageDark,
      borderColor: palette.ink,
      borderBottomWidth: 5,
      borderRadius: 999,
      paddingVertical: 16,
      alignItems: "center",
    },
    doneText: { color: "#fff", fontSize: 17, fontWeight: "900" },
  });
