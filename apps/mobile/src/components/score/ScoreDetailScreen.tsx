import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

export interface ScoreMilestone {
  score: number; // 그 섹션까지의 누적 유닛 수 = 스코어
  label: string; // 섹션 제목
  icon: keyof typeof Ionicons.glyphMap;
  status?: "completed" | "current" | "locked";
  startScore?: number; // 섹션 시작 시점 누적 유닛 수
  units?: number; // 그 섹션의 유닛 수
}

interface Props {
  score: number; // 현재 스코어 (완주 유닛 수)
  flag?: string;
  title?: string; // 상단 파란 영역 문구
  milestones: ScoreMilestone[];
  onClose?: () => void;
  onShare?: () => void;
  onContinue?: () => void;
}

export default function ScoreDetailScreen({
  score,
  flag = "🇰🇷",
  title,
  milestones,
  onClose,
  onShare,
  onContinue,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const ACCENT = theme.primary;
  const s = getStyles(theme, ACCENT);

  // 백엔드가 status 를 주면 그대로 쓰고, 없으면 점수로 판정 (구버전 호환)
  const resolved = milestones.map((m, i) => {
    if (m.status) return m;
    const reached = score >= m.score;
    const prevReached = i === 0 ? true : score >= milestones[i - 1].score;
    return {
      ...m,
      status: reached
        ? ("completed" as const)
        : prevReached
          ? ("current" as const)
          : ("locked" as const),
    };
  });

  return (
    <View style={s.container}>
      {/* 상단 컬러 영역 */}
      <View style={[s.hero, { paddingTop: insets.top + 8 }]}>
        <View style={s.header}>
          <TouchableOpacity onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} hitSlop={12}>
            <Ionicons name="share-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={s.heroTitle}>{title ?? t("score.detailTitle")}</Text>

        <View style={s.heroScoreRow}>
          <Text style={s.heroFlag}>{flag}</Text>
          <Text style={s.heroScore}>{score}</Text>
        </View>
      </View>

      {/* 구름 경계 */}
      <View style={s.cloudWrap}>
        <Svg width="100%" height={70} viewBox="0 0 390 70" fill="none">
          <Path
            d="M0 70 L0 44 Q10 22 30 26 Q44 4 68 12 Q86 -4 108 12 Q128 2 144 20 Q164 6 182 22 Q200 6 220 20 Q240 2 258 20 Q276 4 296 20 Q316 4 336 22 Q358 12 372 32 Q384 30 390 46 L390 70 Z"
            fill={theme.bg}
          />
        </Svg>
      </View>

      {/* 타임라인 */}
      <ScrollView
        style={s.body}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {resolved.map((m, i) => {
          const isLast = i === resolved.length - 1;
          const done = m.status === "completed";
          const current = m.status === "current";
          const active = done || current;

          // 아래로 이어지는 라인 — 현재 섹션은 진행률만큼만 채움
          const total = m.units ?? 1;
          const startAt = m.startScore ?? 0;
          const ratio = current
            ? Math.max(0, Math.min(1, (score - startAt) / total))
            : done
              ? 1
              : 0;

          return (
            <View key={`${m.score}-${i}`} style={s.row}>
              {/* 왼쪽 레일 */}
              <View style={s.railCol}>
                <View
                  style={[
                    s.node,
                    active && { backgroundColor: ACCENT },
                    current && s.nodeCurrent,
                  ]}
                >
                  <Ionicons
                    name={m.icon}
                    size={26}
                    color={active ? "#fff" : theme.textSecondary}
                  />
                </View>

                {!isLast && (
                  <View style={s.rail}>
                    <View
                      style={[
                        s.railFill,
                        {
                          height: `${ratio * 100}%`,
                          backgroundColor: ACCENT,
                        },
                      ]}
                    />
                  </View>
                )}
              </View>

              {/* 오른쪽 내용 */}
              <View style={s.content}>
                <View style={s.tagRow}>
                  <Text style={s.tagFlag}>{flag}</Text>
                  <Text
                    style={[
                      s.tagScore,
                      { color: active ? theme.text : theme.textSecondary },
                    ]}
                  >
                    {m.score}
                  </Text>
                  {current && (
                    <View style={[s.badge, { backgroundColor: ACCENT }]}>
                      <Text style={s.badgeText}>{t("score.inProgress")}</Text>
                    </View>
                  )}
                </View>

                <Text
                  style={[
                    s.label,
                    { color: active ? theme.text : theme.textSecondary },
                    current && { color: ACCENT, fontWeight: "900" },
                  ]}
                >
                  {m.label}
                </Text>

                {current && (
                  <Text style={s.subLabel}>
                    {t("score.unitsProgress", {
                      done: Math.max(0, score - startAt),
                      total,
                    })}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={[s.continueBtn, { backgroundColor: ACCENT }]}
          onPress={onContinue ?? onClose}
          activeOpacity={0.9}
        >
          <Text style={s.continueText}>{t("score.continue")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors, accent: string) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },

    hero: {
      backgroundColor: accent,
      paddingHorizontal: 20,
      paddingBottom: 28,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    heroTitle: {
      fontSize: 26,
      fontWeight: "900",
      color: "#fff",
      textAlign: "center",
      marginTop: 18,
      lineHeight: 34,
    },
    heroScoreRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      marginTop: 16,
    },
    heroFlag: { fontSize: 40 },
    heroScore: { fontSize: 56, fontWeight: "900", color: "#fff" },

    cloudWrap: {
      backgroundColor: accent,
      marginTop: -1,
    },

    body: { flex: 1, paddingHorizontal: 20 },

    row: { flexDirection: "row", gap: 16 },
    railCol: { width: 56, alignItems: "center" },
    node: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    nodeCurrent: {
      borderWidth: 4,
      borderColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 8,
      transform: [{ scale: 1.08 }],
    },
    rail: {
      width: 10,
      flex: 1,
      minHeight: 64,
      borderRadius: 5,
      backgroundColor: theme.border,
      marginVertical: 4,
      overflow: "hidden",
      justifyContent: "flex-start",
    },
    railFill: { width: "100%", borderRadius: 5 },

    content: { flex: 1, paddingTop: 4, paddingBottom: 24 },
    tagRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    tagFlag: { fontSize: 24 },
    tagScore: { fontSize: 24, fontWeight: "900" },
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 999,
      marginLeft: 2,
    },
    badgeText: { fontSize: 11, fontWeight: "900", color: "#fff" },
    label: { fontSize: 20, fontWeight: "700", marginTop: 4 },
    subLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
      marginTop: 4,
    },

    footer: {
      paddingHorizontal: 20,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      backgroundColor: theme.bg,
    },
    continueBtn: {
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 18,
    },
    continueText: { color: "#fff", fontSize: 17, fontWeight: "900" },
  });
