import { View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { RoadmapUnit, RoadmapNode } from "@/types/roadmap";
import SectionTitleDivider from "./SectionTitleDivider";
import LessonNode from "./LessonNode";
import CharacterMarker from "./CharacterMarker";
import NodePopover from "./NodePopover";
import JumpButton from "./JumpButton";

interface Props {
  unit: RoadmapUnit;
  selectedNodeId: string | null;
  onNodeTap: (nodeId: string) => void;
  onNodeStart?: (node: RoadmapNode) => void;
  onGuidePress?: (unit: RoadmapUnit) => void;
  onJumpToUnit?: () => void; // 해당 유닛 첫 레슨 바로 시작
}

const ZIGZAG_OFFSETS = [65, 0, -65, 0];
const NODE_GAP = 20;
const NODE_SIZE = 72;

function getZigzagOffset(index: number): number {
  return ZIGZAG_OFFSETS[index % ZIGZAG_OFFSETS.length];
}

export default function UnitRoadmap({
  unit,
  selectedNodeId,
  onNodeTap,
  onNodeStart,
  onGuidePress,
  onJumpToUnit,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <SectionTitleDivider title={unit.title} />

      {/* 유닛 첫 번째 별 위 건너뛰기 버튼 */}
      {onJumpToUnit && (
        <View style={styles.jumpWrapper}>
          <JumpButton onPress={onJumpToUnit} color={unit.color} />
        </View>
      )}

      <View style={styles.nodesContainer}>
        {unit.nodes.map((node, i) => {
          const offset = getZigzagOffset(i);
          const isCurrent = node.status === "current";
          const isSelected = selectedNodeId === node.id;
          const characterOffset = offset > 0 ? offset - 115 : offset + 115;

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
                  completedSteps={node.completedLessons ?? 0}
                  totalSteps={node.totalLessons ?? 4}
                  onPress={() => onNodeTap(node.id)}
                />
              </View>

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

              {isSelected && (
                <View style={styles.popoverContainer}>
                  <NodePopover
                    node={node}
                    unit={unit}
                    triangleOffsetX={offset}
                    onStart={() => onNodeStart?.(node)}
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
    container: { paddingBottom: 8 },
    jumpWrapper: {
      alignItems: "center",
      marginBottom: 8,
    },
    nodesContainer: { alignItems: "center" },
    nodeRow: {
      width: "100%",
      alignItems: "center",
      marginBottom: NODE_GAP,
      position: "relative",
    },
    nodeRowSelected: { zIndex: 999, elevation: 20 },
    nodePosition: { alignItems: "center" },
    character: { position: "absolute", top: 10 },
    popoverContainer: {
      position: "absolute",
      top: NODE_SIZE + 16,
      left: 0,
      right: 0,
    },
  });
