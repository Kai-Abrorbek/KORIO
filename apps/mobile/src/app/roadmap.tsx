import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_ROADMAP } from "@/mocks/roadmap.mock";
import {
  RoadmapData,
  RoadmapNode,
  RoadmapUnit,
  NodeType,
} from "@/types/roadmap";
import RoadmapHeader from "@/components/roadmap/RoadmapHeader";
import SectionBanner from "@/components/roadmap/SectionBanner";
import UnitRoadmap from "@/components/roadmap/UnitRoadmap";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { LessonService } from "@/services/lesson.service";
import { useEnergyStore } from "@/store/energy.store";
import { useAuthStore } from "@/store/auth.store";
import { KOR_FLAG } from "@/constants/course";

const UNIT_COLORS = [
  "#776ee2",
  "#1D9E75",
  "#E2A83A",
  "#E25C5C",
  "#45B7D1",
  "#6e1cf2",
  "#FF7A00",
  "#2ECC71",
];

// ⚠️ UnitRoadmap.tsx 의 값과 반드시 동일하게 유지 (높이 추정용)
const ROW_HEIGHT = 130; // NODE_WRAP_HEIGHT(80) + NODE_GAP(50)
const DIVIDER_HEIGHT = 54; // SectionTitleDivider 대략 높이
const UNIT_PADDING = 16;

function getUnitColor(index: number): string {
  return UNIT_COLORS[index % UNIT_COLORS.length];
}

function injectChests(unit: RoadmapUnit): RoadmapUnit {
  const nodes = [...unit.nodes];
  const result: typeof nodes = [];
  let lessonCount = 0;
  let chestIndex = 0;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    result.push(node);
    if (node.type !== "chest" && node.type !== "boss") {
      lessonCount++;
      if (lessonCount % 4 === 0 && i < nodes.length - 1) {
        const nextIsChest = nodes[i + 1]?.type === "chest";
        if (!nextIsChest) {
          chestIndex++;
          const chestStatus: "locked" | "completed" =
            node.status === "completed" ? "completed" : "locked";
          result.push({
            id: `${unit.id}-auto-chest-${chestIndex}`,
            type: "chest" as NodeType,
            status: chestStatus,
            chestLessonsRemaining: 0,
          });
        }
      }
    }
  }
  return { ...unit, nodes: result };
}

export default function RoadmapScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<RoadmapData>(MOCK_ROADMAP);
  const [loading, setLoading] = useState(true);
  const listRef = useRef<FlatList<RoadmapUnit>>(null);
  const guardLessonStart = useEnergyStore((s) => s.guardLessonStart);
  const energy = useAuthStore((s) => s.user?.energy ?? 0);
  const user = useAuthStore((s) => s.user);

  const userStats = {
    language: KOR_FLAG,
    score: roadmap.score,
    streak: user?.streak,
    gems: user?.gems,
    energy: user?.energy,
    isSuper: user?.isSuper,
  };

  const processedUnits = useMemo(
    () =>
      roadmap.units.map((unit, i) =>
        injectChests({ ...unit, color: getUnitColor(i) }),
      ),
    [roadmap.units],
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

  const loadRoadmap = useCallback(async () => {
    try {
      setLoading(true);
      const data = await LessonService.getRoadmap();
      setRoadmap({ ...MOCK_ROADMAP, units: data.units });
      const idx = Math.max(
        0,
        data.units.findIndex((u: RoadmapUnit) => u.status === "current"),
      );
      requestAnimationFrame(() => scrollToUnit(idx, false));
    } catch (err) {
      console.error("로드맵 로드 실패:", err);
      setRoadmap(MOCK_ROADMAP);
    } finally {
      setLoading(false);
    }
  }, [scrollToUnit]);

  useFocusEffect(
    useCallback(() => {
      loadRoadmap();
    }, [loadRoadmap]),
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
      guardLessonStart(energy, () => {
        router.push({
          pathname: "/lesson",
          params: { lessonId: node.lessonId },
        });
      });
    },
    [energy, guardLessonStart, router],
  );

  const handleNodeReview = useCallback(
    (node: RoadmapNode) => {
      setSelectedNodeId(null);
      guardLessonStart(energy, () => {
        router.push({
          pathname: "/lesson",
          params: { mode: "nodeReview", nodeId: node.id },
        });
      });
    },
    [energy, guardLessonStart, router],
  );

  const handleNodeLegend = useCallback(
    (node: RoadmapNode) => {
      setSelectedNodeId(null);
      guardLessonStart(energy, () => {
        router.push({
          pathname: "/legend-intro",
          params: { nodeId: node.id, energy: energy },
        });
      });
    },
    [energy, guardLessonStart, router],
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
            selectedNodeId={selectedNodeId}
            onNodeTap={handleNodeTap}
            onNodeStart={handleNodeStart}
            onNodeReview={handleNodeReview}
            onNodeLegend={handleNodeLegend}
            onGuidePress={handleGuidePress}
            onJumpTest={handleJumpTest}
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

  return (
    <View style={styles.container}>
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
      />

      {/* current 유닛으로 점프 버튼 */}
      <TouchableOpacity
        style={styles.scrollBtn}
        onPress={handleScrollToggle}
        activeOpacity={0.85}
      >
        <View style={styles.scrollBtnDepth} />
        <View style={styles.scrollBtnFace}>
          <Ionicons
            name={isPastCurrent ? "arrow-up" : "arrow-down"}
            size={24}
            color="#45B7D1"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const SCROLL_BTN_SIZE = 52;

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 140 },
    scrollBtn: {
      position: "absolute",
      bottom: 110,
      right: 20,
      width: SCROLL_BTN_SIZE,
      height: SCROLL_BTN_SIZE + 5,
      alignItems: "center",
      justifyContent: "center",
    },
    scrollBtnDepth: {
      position: "absolute",
      width: SCROLL_BTN_SIZE,
      height: SCROLL_BTN_SIZE,
      borderRadius: 14,
      backgroundColor: theme.border,
      top: 5,
    },
    unitElevated: {
      zIndex: 9999,
      elevation: 30,
    },
    scrollBtnFace: {
      position: "absolute",
      top: 0,
      width: SCROLL_BTN_SIZE,
      height: SCROLL_BTN_SIZE,
      borderRadius: 14,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
  });
