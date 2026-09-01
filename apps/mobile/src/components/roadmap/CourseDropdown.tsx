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
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  SlideInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { KOR_FLAG } from "@/constants/course";
import { useAuthStore } from "@/store/auth.store";
import { EnrolledCourse } from "@/types/user-courses";
import { Course } from "@/types/courses";
import { LessonService, ScoreData } from "@/services/lesson.service";
import { StudyPathService } from "@/services/study-path.service";
import SectionList from "./SectionList";
import { useSettingsStore } from "@/store/settings.store";

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
  const isDark = theme.bg === "#15151D";
  const s = getStyles(theme, isDark);
  const user = useAuthStore((st) => st.user);

  const studyMode = useSettingsStore((st) => st.studyMode);
  const [sc, setSc] = useState<ScoreData>(EMPTY);

  // 실제 수강 중 코스 — 지금은 한국어 하나. 멀티 코스 생기면 API 목록으로 교체.
  const enrolled: EnrolledCourse[] = [
    {
      id: "korean",
      nameKey: "courses.languages.korean",
      flag: KOR_FLAG,
      xp: user?.totalXP ?? 0,
    },
  ];

  // 신규/추천 코스 — 실데이터 소스 생기면 여기 연결. 비어있으면 섹션 자체를 숨김.
  const newCourses: Course[] = [];

  // 스코어는 **학습 모드마다 다르다.** 두 모드가 진도를 각각 다른 곳에 쌓기
  // 때문이다 — 자유는 레슨 완료, 로드는 하루 노드 완료. 예전에는 둘 다
  // /lessons/score 를 불러서 어느 화면에서 열든 같은 숫자가 나왔다.
  useEffect(() => {
    if (!visible) return;
    let alive = true;
    const load =
      studyMode === "guided"
        ? StudyPathService.getScore()
        : LessonService.getScore();
    load
      .then((r) => {
        if (alive) setSc(r);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [visible, studyMode]);

  const go = (path: string) => {
    onClose();
    router.push(path as any);
  };

  const fillPct = sc.progress * 100;

  // 그래버 위로 드래그 → 닫기
  const translateY = useSharedValue(0);
  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const closeGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = Math.min(0, e.translationY); // 위로만 따라감
    })
    .onEnd((e) => {
      if (e.translationY < -50) {
        runOnJS(onClose)();
        translateY.value = 0;
      } else {
        translateY.value = withTiming(0, { duration: 160 });
      }
    });

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.View
          entering={SlideInUp.duration(220)}
          style={[s.panel, panelStyle, { paddingTop: insets.top + 12 }]}
        >
          {/* 수강 중 과정 + 과정 추가 */}
          <Text style={s.sectionLabel}>{t("roadmap.enrolledTitle")}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.row}
          >
            {enrolled.map((c, i) => (
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

          {/* 전체 섹션.
              스코어 숫자와 막대 하나만으로는 내가 어디쯤인지도, 앞으로 뭐가
              남았는지도 알 수 없었다. 다 펼쳐 보여주고 잠긴 섹션은 눌러서
              점프 테스트로 갈 수 있게 한다. */}
          {sc.milestones.length > 0 && (
            <>
              <Text style={s.sectionTitle}>{t("roadmap.allSections")}</Text>
              <SectionList
                milestones={sc.milestones}
                score={sc.score}
                onJumpSection={(section, firstUnit) => {
                  onClose();
                  router.push({
                    pathname: "/jump-start",
                    params: {
                      section: String(section),
                      unit: String(firstUnit),
                      target: "section",
                    },
                  });
                }}
              />
            </>
          )}

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

          {/* 신규 과정 — 있을 때만 노출 */}
          {newCourses.length > 0 && (
            <>
              <Text style={s.sectionTitle}>{t("roadmap.newCourses")}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={s.row}
              >
                {newCourses.map((c) => (
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
            </>
          )}

          {/* 하단 그래버 — 위로 드래그하면 닫힘 */}
          <GestureDetector gesture={closeGesture}>
            <View style={s.grabberZone}>
              <View style={s.grabber} />
            </View>
          </GestureDetector>
        </Animated.View>

        {/* 배경 (탭하면 닫힘) — 로드맵이 그대로 보이게 투명 */}
        <Pressable style={s.backdrop} onPress={onClose} />
      </GestureHandlerRootView>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    panel: {
      // 라이트일 때 bg/surface 가 둘 다 흰색이라 카드 구분이 안 됨 → 패널을 살짝 톤다운
      backgroundColor: isDark ? theme.bg : "#F7F5FF",
      paddingBottom: 4,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: isDark ? 0.45 : 0.14,
      shadowRadius: 20,
      elevation: 12,
    },
    sectionLabel: {
      fontSize: 12,
      fontWeight: "700",
      letterSpacing: 1.2,
      color: theme.textSecondary,
      marginTop: 4,
      marginHorizontal: 4,
    },
    row: { gap: 16, paddingVertical: 12, paddingHorizontal: 4 },
    courseItem: { alignItems: "center", width: 84 },
    iconBox: {
      width: 70,
      height: 68,
      borderRadius: 16,
      backgroundColor: isDark ? theme.surface : "#FFFFFF",
      borderWidth: 2,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    iconBoxActive: {
      borderColor: theme.primary,
      borderWidth: 2.5,
      backgroundColor: isDark
        ? "rgba(119,110,226,0.16)"
        : "rgba(119,110,226,0.10)",
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 6,
    },
    iconBoxAdd: { backgroundColor: "transparent", borderStyle: "dashed" },
    flag: { fontSize: 40 },
    courseLabel: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.text,
      marginTop: 8,
    },
    scoreCard: {
      backgroundColor: isDark ? theme.surface : "#FFFFFF",
      borderRadius: 16,
      padding: 18,
      marginTop: 16,
      marginHorizontal: 4,
      borderWidth: isDark ? 0 : 1,
      borderColor: theme.border,
    },
    scoreBarRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    scoreNum: { fontSize: 20, fontWeight: "900", color: theme.text },
    scoreTrack: {
      flex: 1,
      height: 16,
      backgroundColor: isDark ? theme.bg : "#E8E4F8",
      borderRadius: 8,
      overflow: "hidden",
    },
    scoreFill: {
      height: "100%",
      backgroundColor: theme.primary,
      borderRadius: 8,
    },
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
      color: theme.primary,
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
    grabberZone: {
      alignSelf: "stretch",
      alignItems: "center",
      paddingTop: 16,
      paddingBottom: 16, // 드래그 잡기 쉽게 터치 영역 확보
    },
    grabber: {
      width: 48,
      height: 5,
      borderRadius: 3,
      backgroundColor: isDark ? theme.border : "#C9C2E8",
    },
    backdrop: { flex: 1, backgroundColor: "transparent" },
  });
