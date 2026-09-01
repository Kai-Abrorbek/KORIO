import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
 * ── 안드로이드 Modal 세 가지 함정 (전부 밟아봤다) ──
 * 1. `statusBarTranslucent` 를 켜면 모달 창이 상태바 뒤까지 늘어난다. 창이
 *    화면보다 상태바 높이만큼 길어져서, flex-end 로 붙인 시트가 그만큼 아래로
 *    밀려 내비바에 잘리고 **터치 좌표까지 같은 만큼 어긋난다** (눌러도 반응이
 *    없던 이유). 쓰지 않는다.
 * 2. Modal 안은 별도의 뷰 트리라 `GestureHandlerRootView` 로 다시 감싸야
 *    제스처/터치가 산다. 이 앱의 CourseDropdown 도 그렇게 하고 있다.
 * 3. Modal 자체 `animationType` 과 reanimated entering 을 겹치면 뷰는 보이는데
 *    터치가 안 먹는 상태가 된다. 애니메이션은 reanimated 쪽 하나만 쓴다.
 *
 * 배경은 absolute 로 덮지 않고 시트 위쪽 남은 공간을 `flex: 1` 로 차지한다 —
 * 안드로이드는 elevation 없이는 형제 간 z 순서를 보장하지 않아서, 겹쳐 두면
 * 배경이 시트를 가려 탭을 먹어버릴 수 있다.
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
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <GestureHandlerRootView style={s.root}>
        {/* 시트 위 남은 공간 = 배경. 탭하면 닫힌다 */}
        <Pressable style={s.backdrop} onPress={onClose} />

        <Animated.View
          entering={SlideInDown.duration(240)}
          style={[
            s.sheet,
            // 내비게이션 바에 마지막 줄이 잘리지 않게. 인셋이 0 으로 와도
            // 최소 여백은 남긴다
            { paddingBottom: Math.max(insets.bottom, 12) + 14 },
          ]}
        >
          <View style={s.handle} />

          <View style={s.headerRow}>
            <Text style={s.heading}>{t("roadmap.allSections")}</Text>
            <Pressable
              onPress={onClose}
              hitSlop={12}
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
            bounces={false}
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
      </GestureHandlerRootView>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1 },
    backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },
    sheet: {
      // 배경(flex:1)이 위를 다 먹으므로 시트는 내용만큼만 차지한다.
      // 섹션이 많아질 때만 최대치에서 멈추고 안에서 스크롤된다
      maxHeight: "72%",
      backgroundColor: theme.bg,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      paddingHorizontal: 16,
      paddingTop: 10,
      borderTopWidth: 1,
      borderColor: theme.border,
      elevation: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -6 },
      shadowOpacity: 0.18,
      shadowRadius: 18,
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
    scroll: { flexShrink: 1 },
    scrollContent: { paddingBottom: 6 },
    empty: {
      paddingVertical: 24,
      textAlign: "center",
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
    },
  });
