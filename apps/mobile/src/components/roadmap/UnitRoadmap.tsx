import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { RoadmapUnit, RoadmapNode } from "@/types/roadmap";
import SectionBanner from "./SectionBanner";
import SectionTitleDivider from "./SectionTitleDivider";
import LessonNode from "./LessonNode";
import CharacterMarker from "./CharacterMarker";
import NodePopover from "./NodePopover";

interface Props {
  unit: RoadmapUnit;
  selectedNodeId: string | null;
  onNodeTap: (nodeId: string) => void;
  onNodeStart?: (node: RoadmapNode) => void;
  onGuidePress?: (unit: RoadmapUnit) => void;
}

const AMPLITUDE = 75;
const FREQUENCY = 0.7;
const NODE_GAP = 24;
const NODE_SIZE = 72;

function getNodeOffset(index: number): number {
  return Math.sin(index * FREQUENCY) * AMPLITUDE;
}

export default function UnitRoadmap({
  unit,
  selectedNodeId,
  onNodeTap,
  onNodeStart,
  onGuidePress,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  // const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // const handleNodePress = (nodeId: string) => {
  //   setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  // };

  const handleStart = (node: RoadmapNode) => {
    onNodeStart?.(node);
  };

  return (
    <View style={styles.container}>
      <SectionBanner
        sectionNumber={unit.sectionNumber}
        unitNumber={unit.unitNumber}
        title={unit.title}
        color={unit.color}
        onGuidePress={() => onGuidePress?.(unit)}
      />

      <SectionTitleDivider title={unit.title} />

      <View style={styles.nodesContainer}>
        {unit.nodes.map((node, i) => {
          const offset = getNodeOffset(i);
          const isCurrent = node.status === "current";
          const isSelected = selectedNodeId === node.id;
          const characterOffset = offset > 0 ? offset - 110 : offset + 110;

          return (
            <View
              key={node.id}
              style={[styles.nodeRow, isSelected && styles.nodeRowSelected]}
            >
              <View
                style={[
                  styles.nodePosition,
                  { transform: [{ translateX: offset }] },
                ]}
              >
                <LessonNode
                  type={node.type}
                  status={node.status}
                  unitColor={unit.color}
                  onPress={() => onNodeTap(node.id)}
                />
              </View>

              {/* 현재 노드 옆 캐릭터 */}
              {isCurrent && !isSelected && (
                <View
                  style={[
                    styles.character,
                    { transform: [{ translateX: characterOffset }] },
                  ]}
                  pointerEvents="none"
                >
                  <CharacterMarker hearts={3} />
                </View>
              )}

              {/* 노드 팝오버 */}
              {isSelected && (
                <View style={styles.popoverContainer}>
                  <NodePopover
                    node={node}
                    unit={unit}
                    triangleOffsetX={offset}
                    onStart={() => handleStart(node)}
                  />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingBottom: 16,
    },
    nodesContainer: {
      alignItems: "center",
    },
    nodeRow: {
      width: "100%",
      alignItems: "center",
      marginBottom: NODE_GAP,
      position: "relative",
    },
    nodeRowSelected: {
      zIndex: 999,
      elevation: 20,
    },
    nodePosition: {
      alignItems: "center",
    },
    character: {
      position: "absolute",
      top: 10,
    },
    popoverContainer: {
      position: "absolute",
      top: NODE_SIZE + 16,
      left: 0,
      right: 0,
    },
  });
