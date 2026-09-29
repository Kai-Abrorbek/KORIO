import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import { TutorMascot } from "../components/TutorMascot";
import type {
  VoiceTutorMessage,
  VoiceTutorPlan,
  VoiceTutorProgress,
} from "../services/voice-tutor.api";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GOOD = "#2FA96A";
const BAD = "#E5533D";
const WARM = "#FFA726";

export interface VoiceTutorResultScreenProps {
  /** 다음 수업 계획 (수업 종료 때 Planning Agent 가 만든 것) */
  plan: VoiceTutorPlan | null;
  progress: VoiceTutorProgress | null;
  messages: VoiceTutorMessage[];
  elapsedSec: number;
  topicTitle?: string;
  onAgain: () => void;
  onClose: () => void;
}

/**
 * 수업 결과.
 *
 * 예전엔 글자 목록뿐이라 "뭐가 뭔지 모르겠다" (Kai). 숫자는 타일·링으로,
 * 교정은 틀린 것 → 맞는 것 한 줄씩, 배운 표현은 칩으로, 다음 수업은 카드로
 * 보여 준다. 한눈에 "오늘 얼마나 했고, 뭘 고쳤고, 다음엔 뭘 하는지" 가 보이게.
 */
export function VoiceTutorResultScreen(p: VoiceTutorResultScreenProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = useMemo(() => styles(theme), [theme]);

  const userTurns = p.messages.filter(
    (m) => m.role === "user" && !m.text.startsWith("[[button"),
  ).length;
  const corrections = useMemo(() => {
    const seen = new Set<string>();
    const rows: { wrong?: string; correct: string }[] = [];
    for (const m of p.messages) {
      const correct = m.role === "teacher" ? m.correction?.correct?.trim() : "";
      if (!correct || seen.has(correct)) continue;
      seen.add(correct);
      rows.push({ wrong: m.correction?.wrong?.trim(), correct });
    }
    return rows;
  }, [p.messages]);
  const learned = useMemo(() => {
    const list = p.progress?.learnedVocabulary?.length
      ? p.progress.learnedVocabulary
      : corrections.map((c) => c.correct);
    return [...new Set(list)].slice(0, 16);
  }, [p.progress, corrections]);
  const minutes = Math.max(1, Math.round(p.elapsedSec / 60));
  // 교정 없이 넘어간 발화 비율 — "오늘 얼마나 자연스러웠나" 의 대략적인 그림
  const smooth = userTurns > 0
    ? Math.max(0, Math.min(1, 1 - corrections.length / userTurns))
    : 0;
  const strong = p.progress?.strongPoints ?? [];
  const weak = [
    ...(p.progress?.weakPoints ?? []),
    ...(p.progress?.repeatedMistakes ?? []),
  ].slice(0, 5);
  const next = p.plan;

  return (
    <View style={s.root}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 히어로 ── */}
        <LinearGradient
          colors={["#6A60DB", "#8C82F0", "#B3A6FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[s.hero, { paddingTop: insets.top + 18 }]}
        >
          <Sparkles />
          <TutorMascot state="speaking" emotion="happy" size={82} tint="#FFE36E" />
          <Text style={s.heroTitle}>{t("voiceTutor.result.title")}</Text>
          <Text style={s.heroSub} numberOfLines={1}>
            {p.topicTitle
              ? t("voiceTutor.result.subtitleTopic", { topic: p.topicTitle, min: minutes })
              : t("voiceTutor.result.subtitleFree", { min: minutes })}
          </Text>
        </LinearGradient>

        {/* ── 숫자 타일 ── */}
        <View style={s.tiles}>
          <StatTile icon="mic" color="#776ee2" value={userTurns} label={t("voiceTutor.result.turns")} delay={80} s={s} />
          <StatTile icon="time" color="#3FA7D6" value={minutes} suffix={t("voiceTutor.result.minUnit")} label={t("voiceTutor.result.minutes")} delay={160} s={s} />
          <StatTile icon="sparkles" color={WARM} value={learned.length} label={t("voiceTutor.result.newWords")} delay={240} s={s} />
        </View>

        {/* ── 자연스러움 링 + 레벨 ── */}
        <Animated.View entering={FadeInDown.delay(300).duration(420)} style={[s.card, s.ringCard]}>
          <Ring value={smooth} color={smooth >= 0.7 ? GOOD : smooth >= 0.4 ? WARM : BAD} track={theme.border} />
          <View style={s.ringText}>
            <Text style={s.cardTitle}>{t("voiceTutor.result.smoothTitle")}</Text>
            <Text style={s.cardHint}>{t("voiceTutor.result.smoothHint", { count: corrections.length })}</Text>
            {!!p.progress?.estimatedLevel && (
              <View style={s.levelChip}>
                <Ionicons name="trending-up" size={13} color={theme.primary} />
                <Text style={s.levelText} numberOfLines={1}>
                  {t("voiceTutor.result.level", { level: p.progress.estimatedLevel })}
                </Text>
              </View>
            )}
          </View>
        </Animated.View>

        {/* ── 교정 노트 ── */}
        <Section icon="create" color={BAD} title={t("voiceTutor.result.corrections")} delay={380} s={s}>
          {corrections.length === 0 ? (
            <Text style={s.empty}>{t("voiceTutor.result.correctionsEmpty")}</Text>
          ) : (
            corrections.slice(0, 8).map((c, i) => (
              <View key={`${c.correct}-${i}`} style={[s.fixRow, i > 0 && s.fixDivider]}>
                {!!c.wrong && (
                  <Text style={s.fixWrong} numberOfLines={2}>{c.wrong}</Text>
                )}
                <View style={s.fixRight}>
                  <Ionicons name="arrow-forward" size={14} color={theme.textSecondary} />
                  <Text style={s.fixRight2} numberOfLines={2}>{c.correct}</Text>
                </View>
              </View>
            ))
          )}
        </Section>

        {/* ── 오늘 배운 표현 ── */}
        {learned.length > 0 && (
          <Section icon="book" color={WARM} title={t("voiceTutor.result.learned")} delay={440} s={s}>
            <View style={s.chips}>
              {learned.map((word) => (
                <View key={word} style={s.chip}>
                  <Text style={s.chipText}>{word}</Text>
                </View>
              ))}
            </View>
          </Section>
        )}

        {/* ── 잘한 점 / 연습할 점 ── */}
        {(strong.length > 0 || weak.length > 0) && (
          <Animated.View entering={FadeInDown.delay(500).duration(420)} style={s.twoCol}>
            <PointsCard icon="thumbs-up" color={GOOD} title={t("voiceTutor.result.strong")} items={strong} s={s} />
            <PointsCard icon="flag" color={WARM} title={t("voiceTutor.result.weak")} items={weak} s={s} />
          </Animated.View>
        )}

        {/* ── 선생님 메모 ── */}
        {!!p.progress?.notes && (
          <Animated.View entering={FadeInDown.delay(560).duration(420)} style={[s.card, s.note]}>
            <Ionicons name="chatbubble-ellipses" size={18} color={theme.primary} />
            <View style={{ flex: 1 }}>
              <Text style={s.noteTitle}>{t("voiceTutor.result.tutorNote")}</Text>
              <Text style={s.noteText}>{p.progress.notes}</Text>
            </View>
          </Animated.View>
        )}

        {/* ── 다음 수업 ── */}
        {!!next?.lessonGoal && (
          <Animated.View entering={FadeInDown.delay(620).duration(420)} style={s.nextWrap}>
            <LinearGradient
              colors={["#241E4A", "#3A2F7A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={s.next}
            >
              <View style={s.nextHead}>
                <View style={s.nextBadge}>
                  <Ionicons name="calendar" size={13} color="#FFE36E" />
                  <Text style={s.nextBadgeText}>{t("voiceTutor.result.next")}</Text>
                </View>
              </View>
              <Text style={s.nextGoal}>{next.lessonGoal}</Text>
              {!!(next.reviewTopics?.length || next.newTopics?.length) && (
                <View style={s.chips}>
                  {[...(next.reviewTopics ?? []), ...(next.newTopics ?? [])].slice(0, 6).map((topic) => (
                    <View key={topic} style={s.nextChip}>
                      <Text style={s.nextChipText}>{topic}</Text>
                    </View>
                  ))}
                </View>
              )}
            </LinearGradient>
          </Animated.View>
        )}
      </ScrollView>

      {/* ── 하단 고정 ── */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 12 }]}>
        <PressButton label={t("voiceTutor.again")} icon="refresh" onPress={p.onAgain} s={s} primary />
        <PressButton label={t("voiceTutor.close")} onPress={p.onClose} s={s} />
      </View>
    </View>
  );
}

/** 0 → 값까지 세어 올라가는 숫자 */
function useCountUp(target: number, delay: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const startAt = Date.now() + delay;
    const tick = () => {
      const k = Math.min(1, Math.max(0, (Date.now() - startAt) / 700));
      setValue(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, delay]);
  return value;
}

function StatTile({ icon, color, value, suffix, label, delay, s }: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  value: number;
  suffix?: string;
  label: string;
  delay: number;
  s: ReturnType<typeof styles>;
}) {
  const shown = useCountUp(value, delay);
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(420)} style={s.tile}>
      <View style={[s.tileIcon, { backgroundColor: color + "22" }]}>
        <Ionicons name={icon} size={17} color={color} />
      </View>
      <Text style={s.tileValue}>
        {shown}
        {!!suffix && <Text style={s.tileSuffix}>{` ${suffix}`}</Text>}
      </Text>
      <Text style={s.tileLabel} numberOfLines={1}>{label}</Text>
    </Animated.View>
  );
}

/** 도넛 링 — 값만큼 부드럽게 차오른다 */
function Ring({ value, color, track }: { value: number; color: string; track: string }) {
  const size = 92;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const fill = useSharedValue(0);
  useEffect(() => {
    fill.value = withDelay(350, withTiming(value, { duration: 900, easing: Easing.out(Easing.cubic) }));
  }, [fill, value]);
  const props = useAnimatedProps(() => ({ strokeDashoffset: c * (1 - fill.value) }));
  const pct = useCountUp(Math.round(value * 100), 350);
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${c} ${c}`}
          animatedProps={props}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text style={{ fontSize: 22, fontWeight: "900", color }}>{pct}%</Text>
    </View>
  );
}

function Section({ icon, color, title, delay, children, s }: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  delay: number;
  children: React.ReactNode;
  s: ReturnType<typeof styles>;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(420)} style={s.card}>
      <View style={s.sectionHead}>
        <View style={[s.sectionIcon, { backgroundColor: color + "22" }]}>
          <Ionicons name={icon} size={15} color={color} />
        </View>
        <Text style={s.cardTitle}>{title}</Text>
      </View>
      {children}
    </Animated.View>
  );
}

function PointsCard({ icon, color, title, items, s }: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  items: string[];
  s: ReturnType<typeof styles>;
}) {
  return (
    <View style={[s.card, s.pointsCard, { borderTopColor: color }]}>
      <View style={s.sectionHead}>
        <Ionicons name={icon} size={15} color={color} />
        <Text style={s.pointsTitle}>{title}</Text>
      </View>
      {items.length === 0 ? (
        <Text style={s.empty}>—</Text>
      ) : (
        items.map((item, i) => (
          <View key={`${item}-${i}`} style={s.pointRow}>
            <View style={[s.dot, { backgroundColor: color }]} />
            <Text style={s.pointText}>{item}</Text>
          </View>
        ))
      )}
    </View>
  );
}

/** 히어로 위에서 반짝이는 점 몇 개 */
function Sparkles() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {[
        { top: "22%", left: "12%", size: 7, delay: 0 },
        { top: "14%", right: "18%", size: 9, delay: 300 },
        { top: "58%", left: "20%", size: 6, delay: 600 },
        { top: "50%", right: "12%", size: 8, delay: 900 },
      ].map((d, i) => (
        <Sparkle key={i} {...d} />
      ))}
    </View>
  );
}

function Sparkle({ size, delay, ...pos }: { size: number; delay: number; top: string; left?: string; right?: string }) {
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withDelay(
      delay,
      withRepeat(withSequence(withTiming(1, { duration: 700 }), withTiming(0.2, { duration: 900 })), -1),
    );
  }, [v, delay]);
  const style = useAnimatedStyle(() => ({ opacity: v.value, transform: [{ scale: 0.6 + v.value * 0.6 }] }));
  return (
    <Animated.View
      style={[
        { position: "absolute", width: size, height: size, borderRadius: size / 2, backgroundColor: "#FFE36E" },
        pos as object,
        style,
      ]}
    />
  );
}

function PressButton({ label, icon, onPress, s, primary }: {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  s: ReturnType<typeof styles>;
  primary?: boolean;
}) {
  const press = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * 3 }],
    borderBottomWidth: primary ? 5 - press.value * 3 : 2,
  }));
  return (
    <AnimatedPressable
      onPressIn={() => (press.value = withTiming(1, { duration: 70 }))}
      onPressOut={() => (press.value = withTiming(0, { duration: 130 }))}
      onPress={onPress}
      style={[primary ? s.btnPrimary : s.btnSecondary, style]}
    >
      {!!icon && <Ionicons name={icon} size={18} color="#fff" />}
      <Text style={primary ? s.btnPrimaryText : s.btnSecondaryText}>{label}</Text>
    </AnimatedPressable>
  );
}

function styles(theme: ThemeColors) {
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: theme.bg },
    hero: {
      alignItems: "center",
      paddingBottom: 26,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      overflow: "hidden",
    },
    heroTitle: { fontSize: 26, fontWeight: "900", color: "#fff", letterSpacing: -0.5, marginTop: 2 },
    heroSub: { fontSize: 14, fontWeight: "700", color: "rgba(255,255,255,0.85)", marginTop: 4, paddingHorizontal: 24 },

    tiles: { flexDirection: "row", gap: 10, paddingHorizontal: 16, marginTop: -22 },
    tile: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.border,
      borderBottomWidth: 4,
      paddingVertical: 12,
      alignItems: "center",
      gap: 4,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    tileIcon: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
    tileValue: { fontSize: 22, fontWeight: "900", color: theme.text, fontVariant: ["tabular-nums"] },
    tileSuffix: { fontSize: 12, fontWeight: "800", color: theme.textSecondary },
    tileLabel: { fontSize: 11.5, fontWeight: "700", color: theme.textSecondary },

    card: {
      marginHorizontal: 16,
      marginTop: 14,
      backgroundColor: theme.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 16,
    },
    ringCard: { flexDirection: "row", alignItems: "center", gap: 16 },
    ringText: { flex: 1, gap: 5 },
    cardTitle: { fontSize: 15.5, fontWeight: "900", color: theme.text, letterSpacing: -0.2 },
    cardHint: { fontSize: 12.5, lineHeight: 18, fontWeight: "600", color: theme.textSecondary },
    levelChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      alignSelf: "flex-start",
      backgroundColor: theme.primary + "18",
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 2,
    },
    levelText: { fontSize: 12, fontWeight: "800", color: theme.primary },

    sectionHead: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
    sectionIcon: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
    empty: { fontSize: 13, fontWeight: "600", color: theme.textSecondary },

    fixRow: { gap: 4, paddingVertical: 8 },
    fixDivider: { borderTopWidth: 1, borderTopColor: theme.border },
    fixWrong: { fontSize: 14, fontWeight: "700", color: BAD, textDecorationLine: "line-through" },
    fixRight: { flexDirection: "row", alignItems: "center", gap: 6 },
    fixRight2: { flex: 1, fontSize: 16, fontWeight: "900", color: GOOD },

    chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
      backgroundColor: WARM + "1F",
      borderRadius: 12,
      paddingHorizontal: 11,
      paddingVertical: 7,
      borderWidth: 1,
      borderColor: WARM + "55",
    },
    chipText: { fontSize: 14, fontWeight: "800", color: theme.text },

    twoCol: { flexDirection: "row", gap: 10, marginHorizontal: 16 },
    pointsCard: { flex: 1, marginHorizontal: 0, borderTopWidth: 4 },
    pointsTitle: { fontSize: 14, fontWeight: "900", color: theme.text },
    pointRow: { flexDirection: "row", gap: 7, marginTop: 5 },
    dot: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
    pointText: { flex: 1, fontSize: 13, lineHeight: 19, fontWeight: "600", color: theme.text },

    note: { flexDirection: "row", gap: 10 },
    noteTitle: { fontSize: 13, fontWeight: "900", color: theme.primary, marginBottom: 4 },
    noteText: { fontSize: 14, lineHeight: 21, fontWeight: "600", color: theme.text, fontStyle: "italic" },

    nextWrap: { marginHorizontal: 16, marginTop: 14 },
    next: { borderRadius: 22, padding: 18, gap: 10 },
    nextHead: { flexDirection: "row" },
    nextBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: "rgba(255,227,110,0.14)",
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    nextBadgeText: { fontSize: 12, fontWeight: "900", color: "#FFE36E" },
    nextGoal: { fontSize: 18, lineHeight: 25, fontWeight: "900", color: "#fff", letterSpacing: -0.3 },
    nextChip: { backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 },
    nextChipText: { fontSize: 13, fontWeight: "700", color: "#fff" },

    footer: {
      paddingHorizontal: 16,
      paddingTop: 10,
      gap: 8,
      backgroundColor: theme.bg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    btnPrimary: {
      height: 54,
      borderRadius: 16,
      backgroundColor: theme.primary,
      borderColor: "#5B4DD4",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    btnPrimaryText: { color: "#fff", fontSize: 16, fontWeight: "900" },
    btnSecondary: {
      height: 48,
      borderRadius: 16,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    btnSecondaryText: { color: theme.text, fontSize: 15, fontWeight: "800" },
  });
}
