import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
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
import UnitRoadmap from "@/components/roadmap/UnitRoadmap";
import NextSectionLocked from "@/components/roadmap/NextSectionLocked";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { LessonService } from "@/services/lesson.service";

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
            chestLessonsRemaining:
              chestStatus === "locked" ? 4 - (lessonCount % 4 || 4) : 0,
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
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<RoadmapData>(MOCK_ROADMAP);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      setLoading(true);
      const data = await LessonService.getRoadmap();
      setRoadmap({
        ...MOCK_ROADMAP,
        units: data.units,
      });
    } catch (err) {
      console.error("로드맵 로드 실패:", err);
      setRoadmap(MOCK_ROADMAP);
    } finally {
      setLoading(false);
    }
  };

  const handleNodeTap = (nodeId: string) => {
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  };

  const closePopover = () => setSelectedNodeId(null);

  const handleNodeStart = (node: RoadmapNode) => {
    setSelectedNodeId(null);
    router.push({
      pathname: "/lesson",
      params: { lessonId: node.lessonId },
    });
  };

  const handleGuidePress = (unit: RoadmapUnit) => {
    console.log("guide pressed:", unit.id);
  };

  const handleJumpToNextSection = () => {
    console.log("jump to next section");
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

  // 유닛마다 chest 자동 삽입
  const processedUnits = roadmap.units.map(injectChests);

  return (
    <View style={styles.container}>
      <RoadmapHeader stats={roadmap.stats} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={closePopover}>
          {processedUnits.map((unit, index) => (
            <View key={unit.id}>
              <UnitRoadmap
                unit={unit}
                selectedNodeId={selectedNodeId}
                onNodeTap={handleNodeTap}
                onNodeStart={handleNodeStart}
                onGuidePress={handleGuidePress}
              />

              {/* 유닛 사이마다 "여기로 건너뛸까요?" 경계 표시 */}
              {index < processedUnits.length - 1 && (
                <NextSectionLocked
                  key={`jump-${unit.id}`}
                  sectionNumber={processedUnits[index + 1].sectionNumber}
                  description={processedUnits[index + 1].title}
                  onJump={handleJumpToNextSection}
                />
              )}
            </View>
          ))}

          {/* 마지막 잠금 섹션 */}
          {roadmap.nextLockedSection && (
            <NextSectionLocked
              sectionNumber={roadmap.nextLockedSection.sectionNumber}
              description={roadmap.nextLockedSection.description}
              onJump={handleJumpToNextSection}
            />
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 120,
    },
  });
