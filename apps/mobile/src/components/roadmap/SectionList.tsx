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
 * 세 상태가 각각 다른 곳으로 간다.
 *  - 끝낸 섹션  → 그 섹션 로드맵을 다시 펼친다 (복습)
 *  - 지금 섹션  → 현재 위치로 돌아간다
 *  - 잠긴 섹션  → 점프 테스트로 간다
 *
 * 전부 누를 수 있어야 한다. 끝낸 섹션을 못 누르게 두면 "이미 한 건 다시 못 본다"
 * 는 뜻이 되는데, 복습이야말로 제일 자주 하려는 일이다.
 */
export default function SectionList({
  milestones,
  score,
  viewingSection,
  onOpenSection,
  onJumpSection,
}: {
  milestones: ScoreMilestone[];
  /** 지금 스코어 = 완주한 유닛 수 */
  score: number;
  /** 지금 로드맵이 펼쳐 놓은 섹션 — 그 줄을 표시해 준다 */
  viewingSection?: number;
  /** 이미 연 섹션으로 이동 */
  onOpenSection: (section: number, firstUnit: number) => void;
  /** 아직 잠긴 섹션 → 점프 테스트 */
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
        const viewing = viewingSection === milestone.section;

        // 이 섹션 안에서 몇 유닛을 끝냈나
        const start = milestone.startScore ?? 0;
        const inSection = Math.max(0, Math.min(milestone.units, score - start));
        const percent = milestone.units
          ? Math.round((inSection / milestone.units) * 100)
          : 0;

        const firstUnit = milestone.firstUnit ?? 1;

        return (
          <Pressable
            key={milestone.section}
            accessibilityRole="button"
            onPress={() =>
              locked
                ? onJumpSection(milestone.section, firstUnit)
                : onOpenSection(milestone.section, firstUnit)
            }
            style={({ pressed }) => [
              s.row,
              {
                borderColor: viewing ? color : theme.border,
                borderWidth: viewing ? 2 : 1.5,
              },
              pressed && { opacity: 0.82, transform: [{ scale: 0.995 }] },
            ]}
          >
            <View
              style={[s.icon, { backgroundColor: locked ? theme.border : color }]}
            >
              <Ionicons
                name={locked ? "lock-closed" : icon}
                size={19}
                color={locked ? theme.textSecondary : "#fff"}
              />
            </View>

            <View style={s.copy}>
              <View style={s.titleRow}>
                <Text style={s.title} numberOfLines={1}>
                  {milestone.title ||
                    t("roadmap.sectionN", { section: milestone.section })}
                </Text>

                {viewing && (
                  <View style={[s.badge, { backgroundColor: color }]}>
                    <Text style={s.badgeText}>
                      {t("roadmap.sectionViewing")}
                    </Text>
                  </View>
                )}
              </View>

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
                    ? t("roadmap.sectionReview", { total: milestone.units })
                    : t("roadmap.sectionLockedHint")}
                </Text>
              )}
            </View>

            {done ? (
              <Ionicons name="checkmark-circle" size={22} color={color} />
            ) : (
              <Ionicons
                name="chevron-forward"
                size={20}
                color={locked ? theme.textSecondary : color}
              />
            )}
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
    titleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    title: { flexShrink: 1, fontSize: 15, fontWeight: "900", color: theme.text },
    badge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 999 },
    badgeText: {
      fontSize: 10,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: 0.2,
    },
    meta: { fontSize: 12, fontWeight: "700", color: theme.textSecondary },
    track: {
      height: 7,
      borderRadius: 4,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
    fill: { height: "100%", borderRadius: 4 },
  });
