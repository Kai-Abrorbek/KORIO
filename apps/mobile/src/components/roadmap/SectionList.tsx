import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { ScoreMilestone } from "@/services/lesson.service";

/** 섹션 순서대로 돌려쓰는 아이콘 — 섹션이 늘어나도 자동으로 이어진다 */
const SECTION_ICONS: (keyof typeof Ionicons.glyphMap)[] = [
  "chatbubble-ellipses",
  "hand-left",
  "restaurant",
  "location",
  "book",
  "tv",
  "briefcase",
  "trophy",
];

const SECTION_COLORS = [
  "#776ee2",
  "#1D9E75",
  "#E2A83A",
  "#E25C5C",
  "#45B7D1",
  "#6e1cf2",
  "#FF7A00",
  "#2ECC71",
];

/**
 * 전체 섹션 목록.
 *
 * 예전에는 스코어 숫자와 막대 하나가 전부라, 내가 지금 어디쯤인지도 앞으로
 * 뭐가 남았는지도 알 수 없었다. 섹션을 다 펼쳐 보여주고 지금 섹션은 진행률을,
 * 잠긴 섹션은 자물쇠를 준다.
 *
 * 잠긴 섹션을 누르면 점프 테스트로 간다 — 로드맵 맨 아래까지 내려가야만
 * 보이던 길을 여기서도 연다.
 */
export default function SectionList({
  milestones,
  score,
  onJumpSection,
}: {
  milestones: ScoreMilestone[];
  /** 지금 스코어 = 완주한 유닛 수 */
  score: number;
  onJumpSection: (section: number, firstUnit: number) => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  return (
    <View style={s.wrap}>
      {milestones.map((milestone, index) => {
        const color = SECTION_COLORS[index % SECTION_COLORS.length];
        const icon = SECTION_ICONS[index % SECTION_ICONS.length];
        const done = milestone.status === "completed";
        const current = milestone.status === "current";
        const locked = !done && !current;

        // 이 섹션 안에서 몇 유닛을 끝냈나
        const start = milestone.startScore ?? 0;
        const inSection = Math.max(0, Math.min(milestone.units, score - start));
        const percent = milestone.units
          ? Math.round((inSection / milestone.units) * 100)
          : 0;

        return (
          <Pressable
            key={milestone.section}
            disabled={!locked}
            onPress={() =>
              onJumpSection(milestone.section, milestone.firstUnit ?? 1)
            }
            style={({ pressed }) => [
              s.row,
              { borderColor: current ? color : theme.border },
              pressed && locked && { opacity: 0.8 },
            ]}
          >
            <View
              style={[
                s.icon,
                { backgroundColor: locked ? theme.border : color },
              ]}
            >
              <Ionicons
                name={locked ? "lock-closed" : icon}
                size={19}
                color={locked ? theme.textSecondary : "#fff"}
              />
            </View>

            <View style={s.copy}>
              <Text style={s.title} numberOfLines={1}>
                {milestone.title || t("roadmap.sectionN", { section: milestone.section })}
              </Text>

              {current ? (
                <>
                  <View style={s.track}>
                    <View
                      style={[
                        s.fill,
                        { width: `${percent}%`, backgroundColor: color },
                      ]}
                    />
                  </View>
                  <Text style={s.meta}>
                    {t("roadmap.sectionProgress", {
                      done: inSection,
                      total: milestone.units,
                    })}
                  </Text>
                </>
              ) : (
                <Text style={s.meta}>
                  {done
                    ? t("roadmap.sectionDone", { total: milestone.units })
                    : t("roadmap.sectionLockedHint")}
                </Text>
              )}
            </View>

            {done ? (
              <Ionicons name="checkmark-circle" size={22} color={color} />
            ) : locked ? (
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.textSecondary}
              />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: { gap: 8 },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderRadius: 16,
      paddingHorizontal: 13,
      paddingVertical: 12,
    },
    icon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    copy: { flex: 1, gap: 4 },
    title: { fontSize: 15, fontWeight: "900", color: theme.text },
    meta: { fontSize: 12, fontWeight: "700", color: theme.textSecondary },
    track: {
      height: 7,
      borderRadius: 4,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
    fill: { height: "100%", borderRadius: 4 },
  });
