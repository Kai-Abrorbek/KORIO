import {
  View,
  ScrollView,
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
import { use, useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { LessonService } from "@/services/lesson.service";
import { useEnergyStore } from "@/store/energy.store";
import { useAuthStore } from "@/store/auth.store";

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
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isPastCurrent, setIsPastCurrent] = useState(false);
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<RoadmapData>(MOCK_ROADMAP);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<ScrollView>(null);
  const unitOffsets = useRef<number[]>([]);
  const scrollHeight = useRef({ content: 0, container: 0 });
  const didAutoScroll = useRef(false);
  const guardLessonStart = useEnergyStore((s) => s.guardLessonStart);
  const energy = useAuthStore((s) => s.user?.energy ?? 0);
  const user = useAuthStore((s) => s.user);

  const userStats = {
    language: "🇺🇸",
    languageLevel: 2,
    streak: user?.streak,
    gems: user?.gems,
    energy: user?.energy,
    isSuper: user?.isSuper,
  };

  useFocusEffect(
    useCallback(() => {
      loadRoadmap();
    }, []),
  );

  const processedUnits = roadmap.units.map((unit, i) =>
    injectChests({ ...unit, color: getUnitColor(i) }),
  );
  const currentUnit = processedUnits[currentUnitIndex] ?? processedUnits[0];

  const currentUnitIdx = Math.max(
    0,
    processedUnits.findIndex((u) => u.status === "current"),
  );

  useFocusEffect(
    useCallback(() => {
      didAutoScroll.current = false;
      const y = unitOffsets.current[currentUnitIdx];
      if (y != null) {
        didAutoScroll.current = true;
        requestAnimationFrame(() =>
          scrollRef.current?.scrollTo({
            y: Math.max(0, y - 12),
            animated: false,
          }),
        );
      }
    }, [currentUnitIdx]),
  );

  const loadRoadmap = async () => {
    try {
      setLoading(true);
      const data = await LessonService.getRoadmap();
      setRoadmap({ ...MOCK_ROADMAP, units: data.units });
    } catch (err) {
      console.error("로드맵 로드 실패:", err);
      setRoadmap(MOCK_ROADMAP);
    } finally {
      setLoading(false);
    }
  };

  const handleNodeTap = (nodeId: string) => {
    setSelectedNodeId((prev: string | null) =>
      prev === nodeId ? null : nodeId,
    );
  };

  const closePopover = () => setSelectedNodeId(null);

  const handleNodeStart = (node: RoadmapNode) => {
    setSelectedNodeId(null);
    guardLessonStart(energy, () => {
      router.push({ pathname: "/lesson", params: { lessonId: node.lessonId } });
    });
  };

  const handleNodeReview = (node: RoadmapNode) => {
    setSelectedNodeId(null);
    guardLessonStart(energy, () => {
      router.push({
        pathname: "/lesson",
        params: { mode: "nodeReview", nodeId: node.id },
      });
    });
  };

  const handleNodeLegend = (node: RoadmapNode) => {
    setSelectedNodeId(null);
    // 레전드 모달 — 나중에
    console.log("legend:", node.id);
  };

  const handleGuidePress = (unit: RoadmapUnit) => {
    console.log("guide pressed:", unit.id);
  };

  // JumpButton: 해당 유닛의 첫 번째 활성(current/locked) 노드 레슨 바로 시작
  const handleJumpToUnit = (unit: RoadmapUnit) => {
    const targetNode =
      unit.nodes.find((n) => n.status === "current") ??
      unit.nodes.find((n) => n.type === "star") ??
      unit.nodes[0];

    if (targetNode?.lessonId) {
      guardLessonStart(energy, () => {
        router.push({
          pathname: "/lesson",
          params: { lessonId: targetNode.lessonId },
        });
      });
    }
  };

  const handleScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    const offsets = unitOffsets.current;
    let current = 0;
    for (let i = 0; i < offsets.length; i++) {
      if (y + 10 >= offsets[i]) current = i;
    }
    setCurrentUnitIndex(current);

    const currentIdx = processedUnits.findIndex((u) => u.status === "current");
    const targetOffset = unitOffsets.current[currentIdx] ?? 0;
    setIsPastCurrent(y > targetOffset + 100);

    const { content, container } = scrollHeight.current;
    setIsAtBottom(y + container >= content - 30);
  };

  // 스크롤 버튼: 맨 아래면 맨 위로, 아니면 맨 아래로
  const handleScrollToggle = () => {
    if (isPastCurrent) {
      const y = unitOffsets.current[currentUnitIdx] ?? 0;
      scrollRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true });
    } else {
      const currentIdx = processedUnits.findIndex(
        (u) => u.status === "current",
      );
      const targetIdx = currentIdx >= 0 ? currentIdx : 0;
      const offset = unitOffsets.current[targetIdx] ?? 0;
      scrollRef.current?.scrollTo({ y: offset, animated: true });
    }
  };

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

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={(_, h) => {
          scrollHeight.current.content = h;
        }}
        onLayout={(e) => {
          scrollHeight.current.container = e.nativeEvent.layout.height;
        }}
      >
        <Pressable onPress={closePopover}>
          {processedUnits.map((unit, index) => {
            const hasSelectedNode = unit.nodes.some(
              (n) => n.id === selectedNodeId,
            );
            return (
              <View
                key={unit.id}
                onLayout={(e) => {
                  const y = e.nativeEvent.layout.y;
                  unitOffsets.current[index] = y;

                  if (index === currentUnitIdx && !didAutoScroll.current) {
                    didAutoScroll.current = true;
                    requestAnimationFrame(() => {
                      scrollRef.current?.scrollTo({
                        y: Math.max(0, y - 12),
                        animated: false,
                      });
                    });
                  }
                }}
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
                  onJumpToUnit={
                    index > 0 && unit.status === "locked"
                      ? () => handleJumpToUnit(unit)
                      : undefined
                  }
                />
              </View>
            );
          })}
        </Pressable>
      </ScrollView>

      {/* 맨 아래/위 스크롤 버튼 */}
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
