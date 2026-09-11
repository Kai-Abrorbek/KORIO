import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "expo-router";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  FadeInDown,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StudyPathService } from "@/services/study-path.service";
import type { StudyNodeKind, StudyPathResponse } from "@/types/study-path";
import StatsCard from "../shared/StatsCard";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RING_SIZE = 122;
const RING_STROKE = 11;
const RING_R = RING_SIZE / 2 - RING_STROKE / 2 - 1;
const RING_C = 2 * Math.PI * RING_R;

/**
 * 노드 종류를 유저가 아는 말로 묶는다.
 *
 * 서버 노드는 7종인데 그대로 나열하면 "recap 과 review 가 뭐가 다른데?" 가
 * 된다. 유저가 화면에서 실제로 구분하는 건 네댓 가지다.
 */
const KIND_GROUPS: {
  id: string;
  kinds: StudyNodeKind[];
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: "words", kinds: ["words"], color: "#A78BFA", icon: "book" },
  { id: "grammar", kinds: ["grammar"], color: "#7DC3F8", icon: "construct" },
  {
    id: "review",
    kinds: ["review", "recap"],
    color: "#7BD9A8",
    icon: "refresh",
  },
  {
    id: "quiz",
    kinds: ["vocabQuiz", "grammarQuiz"],
    color: "#F4B860",
    icon: "help-circle",
  },
  { id: "final", kinds: ["final"], color: "#F7A8C0", icon: "flag" },
];

interface Progress {
  done: number;
  total: number;
}

const pct = (p: Progress) =>
  p.total > 0 ? Math.round((p.done / p.total) * 100) : 0;

/**
 * 학습 로드 진도.
 *
 * 기존 통계 카드는 전부 "며칠 동안 몇 문제" 를 말한다. 그건 노력의 양이지
 * 위치가 아니다. 유저가 실제로 궁금해하는 건 "내가 이 코스의 어디쯤 왔나"
 * 다 — 그걸 말해주는 화면이 통계 탭에 하나도 없었다.
 *
 * 데이터는 /study-path 응답 하나로 전부 만든다. 서버에 통계 전용
 * 엔드포인트를 새로 파지 않은 이유는 이 응답에 이미 하루·섹션·노드가
 * 다 들어 있어서다. 대신 그 응답이 가벼운 편은 아니라(getRoadmap 을
 * 안에서 다시 돈다) 화면에 들어올 때 한 번만 부른다.
 */
export default function StudyPathProgressCard() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);

  const [data, setData] = useState<StudyPathResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let alive = true;
      StudyPathService.getStudyPath()
        .then((res) => {
          if (alive) setData(res);
        })
        .catch((err) => console.error("study-path 통계 로드 실패:", err))
        .finally(() => {
          if (alive) setLoading(false);
        });
      return () => {
        alive = false;
      };
    }, []),
  );

  const days = data?.days ?? [];
  const dayProgress: Progress = {
    done: days.filter((d) => d.status === "completed").length,
    total: days.length,
  };
  const ratio = dayProgress.total > 0 ? dayProgress.done / dayProgress.total : 0;

  // 훅은 early return 위에 모아 둔다 — 로딩 중(데이터 0개)과 로딩 후로
  // 훅 개수가 달라지면 순서가 깨진다
  const grow = useSharedValue(0);
  useEffect(() => {
    grow.value = 0;
    grow.value = withDelay(
      150,
      withTiming(1, { duration: 950, easing: Easing.out(Easing.cubic) }),
    );
  }, [ratio, grow]);

  const ringProps = useAnimatedProps(() => ({
    strokeDashoffset: RING_C * (1 - ratio * grow.value),
  }));

  if (loading && !data) {
    return (
      <StatsCard>
        <View style={s.loading}>
          <ActivityIndicator color={theme.primary} />
        </View>
      </StatsCard>
    );
  }
  if (!data || days.length === 0) return null;

  // ── 섹션별 진행 ──
  const sectionOrder: number[] = [];
  const bySection = new Map<number, Progress>();
  for (const day of days) {
    if (!bySection.has(day.section)) {
      bySection.set(day.section, { done: 0, total: 0 });
      sectionOrder.push(day.section);
    }
    const bucket = bySection.get(day.section)!;
    bucket.total += 1;
    if (day.status === "completed") bucket.done += 1;
  }

  // ── 노드 종류별 진행 ──
  const byKind = new Map<StudyNodeKind, Progress>();
  for (const day of days) {
    for (const node of day.nodes) {
      const bucket = byKind.get(node.kind) ?? { done: 0, total: 0 };
      // 링 하나가 곧 한 판이다. lessonCount 가 0 인 노드는 한 판으로 센다
      const size = node.lessonCount > 0 ? node.lessonCount : 1;
      bucket.total += size;
      bucket.done += node.done ? size : Math.min(node.lessonsDone, size);
      byKind.set(node.kind, bucket);
    }
  }

  const groups = KIND_GROUPS.map((g) => {
    const merged = g.kinds.reduce<Progress>(
      (acc, kind) => {
        const p = byKind.get(kind);
        if (p) {
          acc.done += p.done;
          acc.total += p.total;
        }
        return acc;
      },
      { done: 0, total: 0 },
    );
    return { ...g, ...merged };
  }).filter((g) => g.total > 0);

  // ── 다음 목표 한 줄 ──
  let goalIcon: keyof typeof Ionicons.glyphMap = "flag";
  let goalColor = theme.primary;
  let goalText = t("stats.studyPath.keepGoing");
  if (data.levelExam.passed) {
    goalIcon = "school";
    goalColor = "#1D9E75";
    goalText = data.nextLevel
      ? t("stats.studyPath.nextLevel", { title: data.nextLevel.title })
      : t("stats.studyPath.examPassed");
  } else if (data.levelExam.available) {
    goalIcon = "school";
    goalColor = "#E2A83A";
    goalText = t("stats.studyPath.examOpen");
  }

  return (
    <StatsCard>
      <View style={s.header}>
        <Text style={s.title}>{t("stats.studyPath.title")}</Text>
        <View style={s.levelBadge}>
          <Ionicons name="ribbon" size={12} color="#fff" />
          <Text style={s.levelText}>
            {t("stats.studyPath.level", { level: data.currentLevel })}
          </Text>
        </View>
      </View>

      {/* 링 + 요약 */}
      <View style={s.ringRow}>
        <View style={s.ringWrap}>
          <Svg width={RING_SIZE} height={RING_SIZE}>
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_R}
              stroke={theme.border}
              strokeWidth={RING_STROKE}
              fill="none"
            />
            <AnimatedCircle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_R}
              stroke={theme.primary}
              strokeWidth={RING_STROKE}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={RING_C}
              animatedProps={ringProps}
              rotation={-90}
              originX={RING_SIZE / 2}
              originY={RING_SIZE / 2}
            />
          </Svg>
          <View style={s.ringCenter} pointerEvents="none">
            <Text style={s.ringPct}>{pct(dayProgress)}%</Text>
            <Text style={s.ringSub}>
              {t("stats.studyPath.ofTotal", {
                done: dayProgress.done,
                total: dayProgress.total,
              })}
            </Text>
          </View>
        </View>

        <View style={s.summaryCol}>
          <Text style={s.summaryLabel}>{t("stats.studyPath.daysDone")}</Text>
          <Text style={s.summaryValue}>{dayProgress.done}</Text>
          <Text style={s.summaryHint}>
            {t("stats.studyPath.currentSection", {
              n: data.currentSection,
            })}
          </Text>

          <View style={[s.goal, { borderLeftColor: goalColor }]}>
            <Ionicons name={goalIcon} size={15} color={goalColor} />
            <Text style={s.goalText} numberOfLines={2}>
              {goalText}
            </Text>
          </View>
        </View>
      </View>

      {/* 섹션 진행 — 코스 전체에서 어디쯤인지 */}
      <Text style={s.blockTitle}>{t("stats.studyPath.sections")}</Text>
      <View style={s.sectionRow}>
        {sectionOrder.map((num, i) => {
          const p = bySection.get(num)!;
          const isCurrent = num === data.currentSection;
          return (
            <Animated.View
              key={num}
              entering={FadeInDown.delay(i * 60).duration(320)}
              style={s.sectionItem}
            >
              <View style={s.sectionTrack}>
                <View
                  style={[
                    s.sectionFill,
                    {
                      width: `${pct(p)}%`,
                      backgroundColor: isCurrent ? theme.primary : "#9C93EE",
                    },
                  ]}
                />
              </View>
              <Text
                style={[s.sectionLabel, isCurrent && s.sectionLabelActive]}
                numberOfLines={1}
              >
                {t("stats.studyPath.section", { n: num })}
              </Text>
            </Animated.View>
          );
        })}
      </View>

      {/* 종류별 — 무엇을 안 하고 있는지가 여기서 보인다 */}
      <Text style={s.blockTitle}>{t("stats.studyPath.breakdown")}</Text>
      <View style={s.kindList}>
        {groups.map((g, i) => (
          <Animated.View
            key={g.id}
            entering={FadeInDown.delay(i * 45).duration(320)}
            style={s.kindRow}
          >
            <View style={[s.kindIcon, { backgroundColor: g.color + "22" }]}>
              <Ionicons name={g.icon} size={13} color={g.color} />
            </View>
            <Text style={s.kindName} numberOfLines={1}>
              {t(`stats.studyPath.kinds.${g.id}`)}
            </Text>
            <View style={s.kindTrack}>
              <View
                style={[
                  s.kindFill,
                  {
                    width: `${Math.max(3, pct(g))}%`,
                    backgroundColor: g.color,
                  },
                ]}
              />
            </View>
            <Text style={s.kindValue}>
              {g.done}/{g.total}
            </Text>
          </Animated.View>
        ))}
      </View>
    </StatsCard>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    loading: { paddingVertical: 60, alignItems: "center" },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
    },
    title: { fontSize: 16, fontWeight: "800", color: theme.text },
    levelBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: theme.primary,
      paddingHorizontal: 9,
      paddingVertical: 4,
      borderRadius: 99,
    },
    levelText: { fontSize: 11, fontWeight: "900", color: "#fff" },

    ringRow: { flexDirection: "row", alignItems: "center", gap: 16 },
    ringWrap: {
      width: RING_SIZE,
      height: RING_SIZE,
      alignItems: "center",
      justifyContent: "center",
    },
    ringCenter: { position: "absolute", alignItems: "center" },
    ringPct: {
      fontSize: 27,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -0.5,
    },
    ringSub: {
      fontSize: 11,
      fontWeight: "700",
      color: theme.textSecondary,
      marginTop: 1,
    },

    summaryCol: { flex: 1 },
    summaryLabel: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    summaryValue: {
      fontSize: 30,
      fontWeight: "900",
      color: theme.text,
      marginTop: 1,
      letterSpacing: -1,
    },
    summaryHint: {
      fontSize: 11.5,
      fontWeight: "600",
      color: theme.textSecondary,
      marginTop: 1,
    },
    goal: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      marginTop: 12,
      paddingVertical: 9,
      paddingHorizontal: 10,
      borderRadius: 11,
      borderLeftWidth: 3,
      backgroundColor: theme.bg,
    },
    goalText: {
      flex: 1,
      fontSize: 11.5,
      lineHeight: 16,
      fontWeight: "700",
      color: theme.text,
    },

    blockTitle: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.6,
      marginTop: 20,
      marginBottom: 9,
    },
    sectionRow: { flexDirection: "row", gap: 7 },
    sectionItem: { flex: 1 },
    sectionTrack: {
      height: 9,
      borderRadius: 5,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
    sectionFill: { height: "100%", borderRadius: 5 },
    sectionLabel: {
      fontSize: 10,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 5,
    },
    sectionLabelActive: { color: theme.text, fontWeight: "900" },

    kindList: { gap: 9 },
    kindRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    kindIcon: {
      width: 24,
      height: 24,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    kindName: {
      width: 54,
      fontSize: 11.5,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    kindTrack: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
    kindFill: { height: "100%", borderRadius: 4 },
    kindValue: {
      width: 52,
      textAlign: "right",
      fontSize: 11.5,
      fontWeight: "800",
      color: theme.text,
    },
  });
