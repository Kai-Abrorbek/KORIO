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
import { RoadmapData, RoadmapNode, RoadmapUnit } from "@/types/roadmap";
import RoadmapHeader from "@/components/roadmap/RoadmapHeader";
import UnitRoadmap from "@/components/roadmap/UnitRoadmap";
import NextSectionLocked from "@/components/roadmap/NextSectionLocked";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { LessonService } from "@/services/lesson.service";

export default function RoadmapScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const router = useRouter();
  // const roadmap = MOCK_ROADMAP;
  const [roadmap, setRoadmap] = useState<RoadmapData>(MOCK_ROADMAP);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      setLoading(true);
      const data = await LessonService.getRoadmap();
      // 백엔드 데이터 + mock stats 합치기 (stats는 나중에 백엔드 연결)
      setRoadmap({
        ...MOCK_ROADMAP,
        units: data.units,
      });
    } catch (err) {
      console.error("로드맵 로드 실패:", err);
      // 실패 시 mock fallback
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

  return (
    <View style={styles.container}>
      <RoadmapHeader stats={roadmap.stats} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={closePopover}>
          {roadmap.units.map((unit) => (
            <UnitRoadmap
              key={unit.id}
              unit={unit}
              selectedNodeId={selectedNodeId}
              onNodeTap={handleNodeTap}
              onNodeStart={handleNodeStart}
              onGuidePress={handleGuidePress}
            />
          ))}

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
