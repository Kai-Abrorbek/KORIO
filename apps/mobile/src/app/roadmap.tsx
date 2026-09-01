import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_ROADMAP } from "@/mocks/roadmap.mock";
import {
  RoadmapData,
  RoadmapNode,
  RoadmapUnit,
} from "@/types/roadmap";
import RoadmapHeader from "@/components/roadmap/RoadmapHeader";
import SectionBanner from "@/components/roadmap/SectionBanner";
import UnitRoadmap from "@/components/roadmap/UnitRoadmap";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFocusEffect, useRouter, useLocalSearchParams } from "expo-router";
import { LessonService } from "@/services/lesson.service";
import { useEnergyStore } from "@/store/energy.store";
import { useAuthStore } from "@/store/auth.store";
import { KOR_FLAG } from "@/constants/course";
import { UserService } from "@/services/user.service";
import NextSectionLocked from "@/components/roadmap/NextSectionLocked";
import RoadmapBackdrop from "@/components/roadmap/RoadmapBackdrop";
import {
  DIVIDER_HEIGHT,
  ROW_HEIGHT,
  UNIT_PADDING,
  appendScoreNode,
  markClaimableChest,
  getUnitColor,
  injectChests,
} from "@/components/roadmap/roadmap.utils";

export default function RoadmapScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<RoadmapData>(MOCK_ROADMAP);
  const [loading, setLoading] = useState(true);
  const listRef = useRef<FlatList<RoadmapUnit>>(null);
  /** 연타 방어. state 는 다음 렌더에야 반영돼서 못 막는다 */
  const claimingRef = useRef(false);
  const guardLessonStart = useEnergyStore((s) => s.guardLessonStart);
  const energy = useAuthStore((s) => s.user?.energy ?? 0);
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);

  const userStats = {
    language: KOR_FLAG,
    courseCount: (user?.courseExtraCount ?? 0) + 1, // 주 코스 포함 총 코스 수
    score: roadmap.score,
    streak: user?.streak,
    gems: user?.gems,
    energy: user?.energy,
    isSuper: user?.isSuper,
  };

  const processedUnits = useMemo(
    () =>
      markClaimableChest(
        roadmap.units.map((unit, i) =>
          appendScoreNode(injectChests({ ...unit, color: getUnitColor(i) })),
        ),
        (roadmap.pendingChests ?? 0) > 0,
      ),
    [roadmap.units, roadmap.pendingChests],
  );

  const currentUnitIdx = useMemo(
    () =>
      Math.max(
        0,
        processedUnits.findIndex((u) => u.status === "current"),
      ),
    [processedUnits],
  );

  const currentUnit = processedUnits[currentUnitIndex] ?? processedUnits[0];
  const isPastCurrent = currentUnitIndex > currentUnitIdx;

  // 유닛별 높이/오프셋 미리 계산 (getItemLayout / 실패 복구용)
  const layout = useMemo(() => {
    const heights = processedUnits.map(
      (u) => DIVIDER_HEIGHT + u.nodes.length * ROW_HEIGHT + UNIT_PADDING,
    );
    const offsets: number[] = [];
    let acc = 0;
    for (const h of heights) {
      offsets.push(acc);
      acc += h;
    }
    return { heights, offsets };
  }, [processedUnits]);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: layout.heights[index] ?? 0,
      offset: layout.offsets[index] ?? 0,
      index,
    }),
    [layout],
  );

  const scrollToUnit = useCallback((index: number, animated: boolean) => {
    if (index < 0) return;
    listRef.current?.scrollToIndex({ index, animated });
  }, []);

  const { category } = useLocalSearchParams<{ category?: string }>();

  const loadRoadmap = useCallback(async () => {
    try {
      setLoading(true);
      UserService.getMe()
        .then((me) => updateUser(me as any))
        .catch(() => {});

      const data = await LessonService.getRoadmap(category);
      setRoadmap({
        score: data.score,
        pendingChests: data.pendingChests ?? 0,
        stats: {
          energy: user?.energy,
          gems: user?.gems,
          isSuper: user?.isSuper,
          language: KOR_FLAG,
          courseCount: (user?.courseExtraCount ?? 0) + 1,
          score: data.score,
          streak: user?.streak,
        },
        units: data.units,
        currentSection: data.currentSection,
        nextSection: data.nextSection,
      });
      const idx = Math.max(
        0,
        data.units.findIndex((u: RoadmapUnit) => u.status === "current"),
      );
      requestAnimationFrame(() => scrollToUnit(idx, false));
    } catch (err) {
      console.error("로드맵 로드 실패:", err);
      // category 로드맵(문법 등)은 목업으로 덮지 않고 빈 상태로 둔다
      if (!category) setRoadmap(MOCK_ROADMAP);
    } finally {
      setLoading(false);
    }
  }, [scrollToUnit, category]);

  useFocusEffect(
    useCallback(() => {
      loadRoadmap();
    }, [loadRoadmap]),
  );

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          router.replace("/(tabs)");
          return true;
        },
      );

      return () => subscription.remove();
    }, [router]),
  );

  // FlatList viewability → 현재 보이는 유닛 추적
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40 });
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems?.length) {
      const idx = viewableItems[0].index ?? 0;
      setCurrentUnitIndex((prev) => (prev === idx ? prev : idx));
    }
  });

  const onScrollToIndexFailed = useCallback(
    (info: { index: number }) => {
      const offset = layout.offsets[info.index] ?? 0;
      listRef.current?.scrollToOffset({ offset, animated: false });
      setTimeout(() => {
        listRef.current?.scrollToIndex({ index: info.index, animated: false });
      }, 60);
    },
    [layout],
  );

  const closePopover = useCallback(() => setSelectedNodeId(null), []);

  const handleNodeTap = useCallback((nodeId: string) => {
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  }, []);

  const handleNodeStart = useCallback(
    (node: RoadmapNode) => {
      setSelectedNodeId(null);

      // 한글 노드는 레슨이 아니라 한글 학습 화면으로. 에너지도 안 깎음.
      if (node.type === "hangul") {
        router.push("/hangul");
        return;
      }

      guardLessonStart(energy, () => {
        router.push({
          // 어느 트랙의 로드맵인지 끝까지 들고 가야 완료 후 제자리로 돌아온다
          pathname: "/lesson",
          params: { lessonId: node.lessonId, category: category ?? "" },
        });
      });
    },
    [category, energy, guardLessonStart, router],
  );

  const handleNodeReview = useCallback(
    (node: RoadmapNode) => {
      setSelectedNodeId(null);
      guardLessonStart(energy, () => {
        router.push({
          pathname: "/lesson",
          params: {
            mode: "nodeReview",
            nodeId: node.id,
            category: category ?? "",
          },
        });
      });
    },
    [category, energy, guardLessonStart, router],
  );

  const handleNodeLegend = useCallback(
    (node: RoadmapNode) => {
      setSelectedNodeId(null);
      guardLessonStart(energy, () => {
        router.push({
          pathname: "/legend-intro",
          params: { nodeId: node.id, energy: energy, category: category ?? "" },
        });
      });
    },
    [category, energy, guardLessonStart, router],
  );

  const handleGoLegend = useCallback(
    (unitId: string, firstNode: RoadmapNode) => {
      const idx = processedUnits.findIndex((u) => u.id === unitId);
      if (idx >= 0) scrollToUnit(idx, true);
      // 스크롤 살짝 기다렸다가 첫 노드 팝오버 오픈
      setTimeout(() => setSelectedNodeId(firstNode.id), 400);
    },
    [processedUnits, scrollToUnit],
  );

  const handleGuidePress = useCallback((unit: RoadmapUnit) => {
    console.log("guide pressed:", unit.id);
  }, []);

  const handleJumpTest = useCallback(
    (unit: RoadmapUnit) => {
      setSelectedNodeId(null);
      router.push({
        pathname: "/jump-start",
        params: {
          section: String(unit.sectionNumber),
          unit: String(unit.unitNumber),
        },
      });
    },
    [router],
  );

  /**
   * 상자를 눌렀을 때. 어느 상자를 누르든 그동안 쌓인 걸 다 가져간다 —
   * 화면의 상자는 이정표라 벌어들인 상자와 1:1 이 아니다.
   */
  const handleClaimChest = useCallback(async () => {
    if (claimingRef.current) return;
    claimingRef.current = true;
    try {
      const res = await LessonService.claimChests();
      if (res.claimed > 0) {
        // 보석은 서버가 준 총량으로 맞춘다. 화면에서 더하면 어긋난다
        updateUser({ gems: res.totalGems } as any);
        setRoadmap((current) => ({ ...current, pendingChests: 0 }));
        // 상자 여는 연출은 이미 있는 화면을 쓴다 (탭해서 열기·보석 쏟아짐).
        // gemTotal 은 받기 **전** 값이라야 카운터가 올라가는 게 보인다.
        router.push({
          pathname: "/chest-reward",
          params: {
            grade: res.grade ?? "wood",
            gems: String(res.gems),
            gemTotal: String(res.totalGems - res.gems),
          },
        });
      }
    } catch {
      // 못 받아도 화면을 막지 않는다. 다시 누르면 된다
    } finally {
      claimingRef.current = false;
    }
  }, [router, updateUser]);

  const handleNextSectionJump = useCallback(() => {
    const next = roadmap.nextSection;
    if (!next) return;
    setSelectedNodeId(null);
    router.push({
      pathname: "/jump-start",
      params: {
        section: String(next.sectionNumber),
        unit: String(next.firstUnitNumber || 1),
        target: "section",
      },
    });
  }, [roadmap.nextSection, router]);

  const handleScrollToggle = useCallback(() => {
    scrollToUnit(currentUnitIdx, true);
  }, [currentUnitIdx, scrollToUnit]);

  const renderUnit = useCallback(
    ({ item: unit }: { item: RoadmapUnit }) => {
      const hasSelectedNode = unit.nodes.some((n) => n.id === selectedNodeId);
      return (
        <Pressable
          onPress={closePopover}
          style={hasSelectedNode ? styles.unitElevated : undefined}
        >
          <UnitRoadmap
            unit={unit}
            avatar={user?.avatar}
            selectedNodeId={selectedNodeId}
            onNodeTap={handleNodeTap}
            onNodeStart={handleNodeStart}
            onNodeReview={handleNodeReview}
            onNodeLegend={handleNodeLegend}
            onGuidePress={handleGuidePress}
            onJumpTest={handleJumpTest}
            onGoLegend={handleGoLegend}
            onClaimChest={handleClaimChest}
          />
        </Pressable>
      );
    },
    [
      selectedNodeId,
      closePopover,
      handleNodeTap,
      handleNodeStart,
      handleNodeReview,
      handleNodeLegend,
      handleGoLegend,
      handleClaimChest,
      handleGuidePress,
      handleJumpTest,
      styles.unitElevated,
    ],
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // 아직 콘텐츠 없는 카테고리(문법 등) → 준비 중 화면
  if (category && processedUnits.length === 0) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center", padding: 32 },
        ]}
      >
        <RoadmapBackdrop theme={theme} />
        <TouchableOpacity
          style={{ position: "absolute", top: 54, left: 16 }}
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/courses")
          }
          hitSlop={12}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 52, marginBottom: 16 }}>🚧</Text>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            color: theme.text,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          {t("roadmap.comingSoonTitle")}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: theme.textSecondary,
            textAlign: "center",
            lineHeight: 22,
          }}
        >
          {t("roadmap.comingSoonDesc")}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RoadmapBackdrop theme={theme} />
      <RoadmapHeader stats={userStats} energy={energy} />

      {/* 고정 배너 */}
      {currentUnit && (
        <SectionBanner
          sectionNumber={currentUnit.sectionNumber}
          unitNumber={currentUnit.unitNumber}
          title={currentUnit.title}
          color={currentUnit.color}
          onGuidePress={() => handleGuidePress(currentUnit)}
        />
      )}

      <FlatList
        ref={listRef}
        data={processedUnits}
        keyExtractor={(u) => u.id}
        renderItem={renderUnit}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
        removeClippedSubviews
        windowSize={3}
        maxToRenderPerBatch={2}
        initialNumToRender={2}
        updateCellsBatchingPeriod={60}
        ListFooterComponent={
          roadmap.nextSection ? (
            <NextSectionLocked
              sectionNumber={roadmap.nextSection.sectionNumber}
              title={roadmap.nextSection.title}
              description={roadmap.nextSection.description}
              onJump={handleNextSectionJump}
            />
          ) : null
        }
      />

      {/* current 유닛으로 점프 버튼 */}
      <TouchableOpacity
        style={styles.scrollBtn}
        onPress={handleScrollToggle}
        activeOpacity={0.85}
      >
        <View
          style={[
            styles.scrollBtnGlow,
            { backgroundColor: currentUnit?.color ?? theme.primary },
          ]}
        />

        <View style={styles.scrollBtnDepth} />

        <View
          style={[
            styles.scrollBtnFace,
            { borderColor: currentUnit?.color ?? theme.primary },
          ]}
        >
          <Ionicons
            name={isPastCurrent ? "arrow-up" : "arrow-down"}
            size={24}
            color={currentUnit?.color ?? theme.primary}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const SCROLL_BTN_SIZE = 52;

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      overflow: "hidden",
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: 10,
      paddingBottom: 140,
    },
    scrollBtn: {
      position: "absolute",
      bottom: 110,
      right: 18,
      width: SCROLL_BTN_SIZE + 8,
      height: SCROLL_BTN_SIZE + 11,
      alignItems: "center",
      justifyContent: "center",
    },
    scrollBtnGlow: {
      position: "absolute",
      top: -3,
      width: SCROLL_BTN_SIZE + 14,
      height: SCROLL_BTN_SIZE + 14,
      borderRadius: 999,
      opacity: 0.16,
    },
    scrollBtnDepth: {
      position: "absolute",
      top: 7,
      width: SCROLL_BTN_SIZE,
      height: SCROLL_BTN_SIZE,
      borderRadius: 999,
      backgroundColor: theme.border,
    },
    scrollBtnFace: {
      position: "absolute",
      top: 0,
      width: SCROLL_BTN_SIZE,
      height: SCROLL_BTN_SIZE,
      borderRadius: 999,
      backgroundColor: theme.surface,
      borderWidth: 2.5,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.14,
      shadowRadius: 12,
      elevation: 8,
    },
    unitElevated: {
      zIndex: 9999,
      elevation: 30,
    },
  });
