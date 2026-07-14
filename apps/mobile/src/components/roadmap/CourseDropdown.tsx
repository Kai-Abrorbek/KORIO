import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { SlideInUp, FadeIn } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_HANJO_COURSES } from "@/mocks/user-courses.mock";
import { MOCK_COURSES } from "@/mocks/courses.mock";
import { LessonService, ScoreData } from "@/services/lesson.service";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const EMPTY: ScoreData = {
  score: 0,
  completedUnits: 0,
  nextScore: 0,
  progress: 0,
  milestones: [],
};

export default function CourseDropdown({ visible, onClose }: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();
  const s = getStyles(theme);

  const [sc, setSc] = useState<ScoreData>(EMPTY);

  useEffect(() => {
    if (!visible) return;
    let alive = true;
    LessonService.getScore()
      .then((r) => {
        if (alive) setSc(r);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [visible]);

  const go = (path: string) => {
    onClose();
    router.push(path as any);
  };

  const fillPct = sc.progress * 100;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        <Animated.View
          entering={SlideInUp.springify().damping(18)}
          style={[s.panel, { paddingTop: insets.top + 12 }]}
        >
          {/* 수강 중 과정 + 과정 추가 */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.row}
          >
            {MOCK_HANJO_COURSES.map((c, i) => (
              <Pressable key={c.id} style={s.courseItem} onPress={onClose}>
                <View
                  style={[
                    s.iconBox,
                    i === 0 && s.iconBoxActive,
                    c.iconBgColor && {
                      backgroundColor: c.iconBgColor,
                      borderColor: c.iconBgColor,
                    },
                  ]}
                >
                  {c.flag ? (
                    <Text style={s.flag}>{c.flag}</Text>
                  ) : (
                    <MaterialCommunityIcons
                      name={(c.iconName as any) ?? "school"}
                      size={34}
                      color="#fff"
                    />
                  )}
                </View>
                <Text style={s.courseLabel} numberOfLines={1}>
                  {t(c.nameKey)}
                </Text>
              </Pressable>
            ))}

            {/* + 과정 */}
            <Pressable style={s.courseItem} onPress={() => go("/courses")}>
              <View style={[s.iconBox, s.iconBoxAdd]}>
                <Ionicons name="add" size={40} color={theme.textSecondary} />
              </View>
              <Text style={[s.courseLabel, { color: theme.textSecondary }]}>
                {t("roadmap.courseTab")}
              </Text>
            </Pressable>
          </ScrollView>

          {/* 스코어 카드 */}
          <View style={s.scoreCard}>
            <View style={s.scoreBarRow}>
              <Text style={s.scoreNum}>{sc.score}</Text>
              <View style={s.scoreTrack}>
                <View style={[s.scoreFill, { width: `${fillPct}%` }]} />
              </View>
              <Text style={s.scoreNum}>{sc.nextScore}</Text>
            </View>
            <Text style={s.scoreText}>
              {t("roadmap.scoreText", { score: sc.score })}
            </Text>
            <Pressable onPress={() => go("/score")} hitSlop={8}>
              <Text style={s.scoreLink}>{t("roadmap.scoreExplain")}</Text>
            </Pressable>
          </View>

          {/* 신규 과정 */}
          <Text style={s.sectionTitle}>{t("roadmap.newCourses")}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.row}
          >
            {MOCK_COURSES.map((c) => (
              <Pressable
                key={c.id}
                style={s.courseItem}
                onPress={() => go("/courses")}
              >
                <View
                  style={[
                    s.iconBox,
                    { backgroundColor: c.color, borderColor: c.color },
                  ]}
                >
                  <Ionicons name={c.icon as any} size={32} color="#fff" />
                </View>
                <Text style={s.courseLabel} numberOfLines={1}>
                  {t(c.nameKey)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {/* 배경 (탭하면 닫힘) */}
        <Animated.View entering={FadeIn} style={{ flex: 1 }}>
          <Pressable style={s.backdrop} onPress={onClose} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    panel: {
      backgroundColor: theme.bg,
      paddingBottom: 24,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    row: { gap: 18, paddingVertical: 12, paddingHorizontal: 4 },
    courseItem: { alignItems: "center", width: 84 },
    iconBox: {
      width: 84,
      height: 78,
      borderRadius: 18,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    iconBoxActive: { borderColor: "#1CB0F6", borderWidth: 3 },
    iconBoxAdd: { backgroundColor: "transparent", borderStyle: "dashed" },
    flag: { fontSize: 40 },
    courseLabel: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.text,
      marginTop: 8,
    },
    scoreCard: {
      borderWidth: 1.5,
      borderColor: theme.border,
      borderRadius: 16,
      padding: 18,
      marginTop: 12,
      marginHorizontal: 4,
    },
    scoreBarRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    scoreNum: { fontSize: 20, fontWeight: "900", color: theme.text },
    scoreTrack: {
      flex: 1,
      height: 18,
      backgroundColor: theme.border,
      borderRadius: 9,
      overflow: "hidden",
    },
    scoreFill: { height: "100%", backgroundColor: "#58CC02", borderRadius: 9 },
    scoreText: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 16,
    },
    scoreLink: {
      fontSize: 17,
      fontWeight: "800",
      color: "#1CB0F6",
      textAlign: "center",
      marginTop: 14,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "900",
      color: theme.text,
      marginTop: 24,
      marginBottom: 4,
      marginHorizontal: 4,
    },
    backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  });
