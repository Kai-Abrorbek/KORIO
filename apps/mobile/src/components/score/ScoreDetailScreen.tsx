import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

const BLUE = "#1CB0F6";

export interface ScoreMilestone {
  score: number;
  label: string;
  icon: keyof typeof Ionicons.glyphMap; // 예: "hand-left", "restaurant", "location", "book", "tv", "briefcase", "trophy"
}

interface Props {
  score: number; // 현재 스코어
  flag?: string;
  hint?: string; // 캐릭터 말풍선
  milestones: ScoreMilestone[];
  onClose?: () => void;
  onShare?: () => void;
}

export default function ScoreDetailScreen({
  score,
  flag = "🇺🇸",
  hint,
  milestones,
  onClose,
  onShare,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);

  // 현재 도달한 가장 높은 마일스톤 인덱스
  const currentIdx = milestones.reduce(
    (acc, m, i) => (score >= m.score ? i : acc),
    -1,
  );

  return (
    <View style={s.container}>
      {/* 헤더 */}
      <View style={s.header}>
        <TouchableOpacity onPress={onClose} hitSlop={12}>
          <Ionicons name="close" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t("score.title")}</Text>
        <TouchableOpacity onPress={onShare} hitSlop={12}>
          <Ionicons name="share-outline" size={26} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 현재 스코어 */}
        <View style={s.scoreRow}>
          <Text style={s.flag}>{flag}</Text>
          <Text style={s.score}>{score}</Text>
        </View>

        {/* 캐릭터 + 말풍선 */}
        <View style={s.hintRow}>
          <Text style={{ fontSize: 56 }}>🧕</Text>
          <View style={s.hintBubble}>
            <Text style={s.hintText}>{hint ?? t("score.hint")}</Text>
          </View>
        </View>

        {/* 스코어 현황 */}
        <Text style={s.sectionTitle}>{t("score.progress")}</Text>

        <View style={s.timeline}>
          {milestones.map((m, i) => {
            const reached = i <= currentIdx;
            const isCurrent = i === currentIdx;
            const isLast = i === milestones.length - 1;
            return (
              <View key={m.score} style={s.row}>
                {/* 왼쪽: 라인 + 노드 */}
                <View style={s.railCol}>
                  {/* 위 라인 */}
                  <View
                    style={[
                      s.rail,
                      {
                        backgroundColor: i === 0 ? "transparent" : theme.border,
                      },
                    ]}
                  />
                  {/* 노드 */}
                  {isCurrent ? (
                    <View style={s.pin}>
                      <Ionicons name="star" size={26} color="#fff" />
                      <View style={s.pinTail} />
                    </View>
                  ) : (
                    <View
                      style={[
                        s.node,
                        reached && { backgroundColor: BLUE + "22" },
                      ]}
                    >
                      <Ionicons
                        name={m.icon}
                        size={24}
                        color={reached ? BLUE : theme.textSecondary}
                      />
                    </View>
                  )}
                  {/* 아래 라인 */}
                  <View
                    style={[
                      s.rail,
                      {
                        backgroundColor: isLast ? "transparent" : theme.border,
                        flex: 1,
                      },
                    ]}
                  />
                </View>

                {/* 오른쪽: 점수 + 라벨 */}
                <View style={s.content}>
                  <View style={s.scoreTag}>
                    <Text style={s.tagFlag}>{flag}</Text>
                    <Text
                      style={[
                        s.tagScore,
                        { color: reached ? theme.text : theme.textSecondary },
                      ]}
                    >
                      {m.score}
                    </Text>
                  </View>
                  <Text
                    style={[
                      s.label,
                      { color: reached ? theme.text : theme.textSecondary },
                    ]}
                  >
                    {m.label}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingTop: 56 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingBottom: 12,
    },
    headerTitle: { fontSize: 20, fontWeight: "800", color: theme.text },

    scoreRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      marginTop: 20,
      marginBottom: 28,
    },
    flag: { fontSize: 56 },
    score: { fontSize: 72, fontWeight: "900", color: theme.text },

    hintRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 20,
      marginBottom: 36,
    },
    hintBubble: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 18,
    },
    hintText: {
      fontSize: 18,
      color: theme.text,
      fontWeight: "600",
      lineHeight: 26,
    },

    sectionTitle: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.textSecondary,
      paddingHorizontal: 20,
      marginBottom: 12,
    },

    timeline: { paddingHorizontal: 20 },
    row: { flexDirection: "row", gap: 16, minHeight: 120 },
    railCol: { width: 56, alignItems: "center" },
    rail: { width: 6, height: 24, borderRadius: 3 },
    node: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.border + "55",
      alignItems: "center",
      justifyContent: "center",
    },
    pin: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: BLUE,
      alignItems: "center",
      justifyContent: "center",
    },
    pinTail: {
      position: "absolute",
      bottom: -6,
      width: 14,
      height: 14,
      backgroundColor: BLUE,
      transform: [{ rotate: "45deg" }],
    },
    content: { flex: 1, paddingTop: 6 },
    scoreTag: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 6,
    },
    tagFlag: { fontSize: 26 },
    tagScore: { fontSize: 22, fontWeight: "800" },
    label: { fontSize: 20, fontWeight: "700" },
  });
