import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import { LessonService, type ScoreData } from "@/services/lesson.service";
import { StudyPathService } from "@/services/study-path.service";
import { useSettingsStore } from "@/store/settings.store";
import SectionList from "./SectionList";

const EMPTY: ScoreData = {
  score: 0,
  completedUnits: 0,
  nextScore: 0,
  progress: 0,
  milestones: [],
};

/**
 * 로드맵 상단 배너를 누르면 올라오는 섹션 목록.
 *
 * 예전에는 이걸 코스(국기) 드롭다운 안에 넣었는데, 거긴 "무슨 과목을 배울까" 를
 * 고르는 자리라 "이 과목 안에서 어디쯤인가" 와 섞이면 둘 다 안 보인다.
 * 지금 유닛을 알려주는 배너 바로 밑에서 열리는 게 맞다.
 *
 * 스코어는 학습 모드마다 다른 값을 쓴다 — 자유학습과 로드학습은 진도가 별개다.
 */
export default function SectionListSheet({
  visible,
  viewingSection,
  onClose,
  onOpenSection,
  onJumpSection,
}: {
  visible: boolean;
  viewingSection?: number;
  onClose: () => void;
  onOpenSection: (section: number, firstUnit: number) => void;
  onJumpSection: (section: number, firstUnit: number) => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const studyMode = useSettingsStore((st) => st.studyMode);
  const [sc, setSc] = useState<ScoreData>(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    let alive = true;
    setLoading(true);
    const req =
      studyMode === "guided"
        ? StudyPathService.getScore()
        : LessonService.getScore();
    req
      .then((d) => alive && setSc(d))
      .catch(() => alive && setSc(EMPTY))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [visible, studyMode]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={s.overlay}>
        <Pressable style={s.backdrop} onPress={onClose} />

        <Animated.View
          entering={SlideInDown.duration(240)}
          style={[s.sheet, { paddingBottom: insets.bottom + 16 }]}
        >
          <View style={s.handle} />

          <View style={s.headerRow}>
            <Text style={s.heading}>{t("roadmap.allSections")}</Text>
            <Pressable
              onPress={onClose}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={t("common.close")}
              style={s.closeBtn}
            >
              <Ionicons name="close" size={20} color={theme.textSecondary} />
            </Pressable>
          </View>

          <ScrollView
            style={s.scroll}
            contentContainerStyle={s.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {sc.milestones.length > 0 ? (
              <SectionList
                milestones={sc.milestones}
                score={sc.score}
                viewingSection={viewingSection}
                onOpenSection={(section, firstUnit) => {
                  onClose();
                  onOpenSection(section, firstUnit);
                }}
                onJumpSection={(section, firstUnit) => {
                  onClose();
                  onJumpSection(section, firstUnit);
                }}
              />
            ) : (
              <Text style={s.empty}>
                {loading ? t("common.loading") : t("roadmap.noSections")}
              </Text>
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    overlay: { flex: 1, justifyContent: "flex-end" },
    backdrop: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.42)",
    },
    sheet: {
      maxHeight: "78%",
      backgroundColor: theme.bg,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      paddingHorizontal: 16,
      paddingTop: 10,
      borderTopWidth: 1,
      borderColor: theme.border,
    },
    handle: {
      alignSelf: "center",
      width: 42,
      height: 5,
      borderRadius: 999,
      backgroundColor: theme.border,
      marginBottom: 12,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    heading: { fontSize: 19, fontWeight: "900", color: theme.text },
    closeBtn: {
      width: 32,
      height: 32,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.surface,
    },
    scroll: { flexGrow: 0 },
    scrollContent: { paddingBottom: 6 },
    empty: {
      paddingVertical: 24,
      textAlign: "center",
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
    },
  });
