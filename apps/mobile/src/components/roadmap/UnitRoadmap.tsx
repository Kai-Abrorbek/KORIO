import { View, StyleSheet, Dimensions, Text } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { RoadmapUnit, RoadmapNode } from "@/types/roadmap";
import SectionTitleDivider from "./SectionTitleDivider";
import LessonNode from "./LessonNode";
import CharacterMarker from "./CharacterMarker";
import NodePopover from "./NodePopover";
import JumpButton from "./JumpButton";
import { t } from "i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

interface Props {
  unit: RoadmapUnit;
  selectedNodeId: string | null;
  onNodeTap: (nodeId: string) => void;
  onNodeStart?: (node: RoadmapNode) => void;
  onGuidePress?: (unit: RoadmapUnit) => void;
  onJumpToUnit?: () => void;
  onNodeReview?: (node: RoadmapNode) => void;
  onNodeLegend?: (node: RoadmapNode) => void;
}

const ZIGZAG_OFFSETS = [55, -20, -50, -10];
const NODE_GAP = 50;
const NODE_SIZE = 72;
const NODE_WRAP_HEIGHT = NODE_SIZE + 8; // LessonNode wrap height
const ROW_HEIGHT = NODE_WRAP_HEIGHT + NODE_GAP;

const SCREEN_WIDTH = Dimensions.get("window").width;
const CENTER_X = SCREEN_WIDTH / 2;

function getZigzagOffset(index: number): number {
  return ZIGZAG_OFFSETS[index % ZIGZAG_OFFSETS.length];
}

export default function UnitRoadmap({
  unit,
  selectedNodeId,
  onNodeTap,
  onNodeStart,
  onNodeReview,
  onNodeLegend,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 520, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 520, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, []);

  // 점선 connector 좌표 계산
  const connectorPoints = unit.nodes
    .map((_, i) => {
      const offset = getZigzagOffset(i);
      const y = i * ROW_HEIGHT + NODE_SIZE; // 노드 face 의 시각적 중심
      const x = CENTER_X + offset;
      return `${x},${y}`;
    })
    .join(" ");

  const svgHeight = Math.max(unit.nodes.length * ROW_HEIGHT, 100);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <SectionTitleDivider title={unit.title} />

      <View style={styles.nodesContainer}>
        {/* 점선 라인 (노드 뒤) */}
        <Svg
          width={SCREEN_WIDTH}
          height={svgHeight}
          style={styles.connectorSvg}
          pointerEvents="none"
        >
          <Polyline
            points={connectorPoints}
            fill="none"
            stroke={theme.border}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2,16"
          />
        </Svg>

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
                {i === 0 && node.status === "locked" ? (
                  <>
                    <Animated.View style={[animatedStyle, { marginTop: 10 }]}>
                      <View style={styles.bubble}>
                        <Text
                          style={[styles.bubbleText, { color: unit.color }]}
                        >
                          {t("roadmap.jumpHere")}
                        </Text>
                      </View>
                      {/* 꼬리 */}
                      <View
                        style={[
                          styles.bubbleTail,
                          { borderTopColor: theme.surface },
                        ]}
                      />
                    </Animated.View>

                    <LessonNode
                      index={i}
                      type={isCurrent && !isSelected ? "boss" : node.type}
                      status={node.status}
                      unitColor={unit.color}
                      completedSteps={node.completedLessons ?? 0}
                      totalSteps={node.totalLessons ?? 4}
                      onPress={() => onNodeTap(node.id)}
                    />
                  </>
                ) : (
                  <LessonNode
                    index={i}
                    type={isCurrent && !isSelected ? "speech" : node.type}
                    status={node.status}
                    unitColor={unit.color}
                    completedSteps={node.completedLessons ?? 0}
                    totalSteps={node.totalLessons ?? 4}
                    onPress={() => onNodeTap(node.id)}
                  />
                )}
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
                    onReview={() => onNodeReview?.(node)}
                    onLegend={() => onNodeLegend?.(node)}
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
    nodesContainer: {
      alignItems: "center",
      position: "relative",
    },
    connectorSvg: {
      position: "absolute",
      top: 0,
      left: 0,
    },
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

    bubble: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderWidth: 2,
      borderColor: theme.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    bubbleText: {
      fontSize: 18,
      fontWeight: "900",
      letterSpacing: 0.2,
    },
    bubbleTail: {
      left: 110,
      width: 0,
      height: 0,
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderTopWidth: 11,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      marginTop: -1,
    },
  });
