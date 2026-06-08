import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_ROADMAP } from "@/mocks/roadmap.mock";
import { RoadmapNode, RoadmapUnit } from "@/types/roadmap";
import RoadmapHeader from "@/components/roadmap/RoadmapHeader";
import UnitRoadmap from "@/components/roadmap/UnitRoadmap";
import NextSectionLocked from "@/components/roadmap/NextSectionLocked";
import { useState } from "react";

export default function RoadmapScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const roadmap = MOCK_ROADMAP;

  const handleNodeTap = (nodeId: string) => {
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  };

  const closePopover = () => setSelectedNodeId(null);

  const handleNodeStart = (node: RoadmapNode) => {
    setSelectedNodeId(null);
    console.log("start lesson:", node.id, node.type);
    // TODO: 레슨 화면으로 이동
  };

  const handleGuidePress = (unit: RoadmapUnit) => {
    console.log("guide pressed:", unit.id);
    // TODO: 가이드북 모달
  };

  const handleJumpToNextSection = () => {
    console.log("jump to next section");
    // TODO: 점프 테스트
  };

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
