import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
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

const CLOSED = 800;
const DURATION = 250;

/**
 * 로드맵 상단 배너를 누르면 올라오는 섹션 목록.
 *
 * 껍데기는 CharacterDetailSheet 와 똑같이 짠다. 안드로이드에서 RN Modal 안
 * 바텀시트는 아래 세 가지를 전부 지켜야 제대로 뜨고 눌린다 —
 *
 *  1. `statusBarTranslucent` 를 켠다. 이 앱은 edge-to-edge 라, 이게 없으면
 *     모달 창만 인셋이 달라져서 시트가 엉뚱한 데 붙고 인셋 값도 틀어진다.
 *  2. 애니메이션은 **reanimated 레이아웃 애니메이션(entering/exiting)을 쓰지
 *     않는다.** Modal 안에서는 뷰가 보이는데 터치 대상이 따라오지 않는다.
 *     sharedValue + translateY 로 직접 움직인다.
 *  3. `animationType="none"` 을 명시한다. Modal 자체 애니와 겹치면 열림/닫힘
 *     속도가 어긋난다.
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

  const backdrop = useSharedValue(0);
  const sheetY = useSharedValue(CLOSED);

  useEffect(() => {
    if (visible) {
      backdrop.value = withTiming(1, { duration: DURATION });
      sheetY.value = withTiming(0, {
        duration: DURATION,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      backdrop.value = 0;
      sheetY.value = CLOSED;
    }
  }, [visible]);

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

  // 아래로 끌어서 닫기
  const dragClose = Gesture.Pan()
    .onUpdate((e) => {
      sheetY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > 90 || e.velocityY > 800) {
        sheetY.value = withTiming(CLOSED, { duration: DURATION });
        backdrop.value = withTiming(0, { duration: DURATION });
        runOnJS(onClose)();
      } else {
        sheetY.value = withTiming(0, { duration: 160 });
      }
    });

  const backdropStyle = useAnimatedStyle(() => ({ opacity: backdrop.value }));
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={s.root}>
        <Animated.View style={[s.backdrop, backdropStyle]}>
          <Pressable style={s.fill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            s.sheet,
            sheetStyle,
            // 안드로이드 네비바에 마지막 줄이 안 깔리게
            { paddingBottom: insets.bottom + 20 },
          ]}
        >
          <GestureDetector gesture={dragClose}>
            <View style={s.handleZone}>
              <View style={s.handle} />
            </View>
          </GestureDetector>

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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={s.scrollContent}
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
    root: { flex: 1, justifyContent: "flex-end" },
    fill: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    backdrop: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    sheet: {
      backgroundColor: theme.bg,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 18,
      paddingTop: 6,
      maxHeight: "85%",
    },
    handleZone: {
      alignSelf: "stretch",
      alignItems: "center",
      paddingTop: 6,
      paddingBottom: 14,
    },
    handle: {
      width: 44,
      height: 5,
      borderRadius: 3,
      backgroundColor: theme.border,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    heading: { fontSize: 20, fontWeight: "900", color: theme.text },
    closeBtn: {
      width: 32,
      height: 32,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.surface,
    },
    scrollContent: { paddingBottom: 8 },
    empty: {
      paddingVertical: 24,
      textAlign: "center",
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
    },
  });
