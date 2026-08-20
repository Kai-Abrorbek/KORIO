import { View, StyleSheet, Dimensions, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { RoadmapUnit, RoadmapNode } from "@/types/roadmap";
import SectionTitleDivider from "./SectionTitleDivider";
import LessonNode from "./LessonNode";
import CharacterMarker from "./CharacterMarker";
import NodePopover from "./NodePopover";
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
import ScoreNode from "./ScoreNode";
import Svg, { Path } from "react-native-svg";
import { darken } from "@/utils/color";
import type { AvatarConfig } from "@/types/avatar";
import type { ReactNode } from "react";

export interface RoadmapNodePopoverContext {
  node: RoadmapNode;
  unit: RoadmapUnit;
  triangleOffsetX: number;
  onClose: () => void;
}

interface Props {
  unit: RoadmapUnit;
  selectedNodeId: string | null;
  avatar?: Partial<AvatarConfig> | null;
  onNodeTap: (nodeId: string) => void;
  onNodeStart?: (node: RoadmapNode) => void;
  onGuidePress?: (unit: RoadmapUnit) => void;
  onJumpToUnit?: () => void;
  onNodeReview?: (node: RoadmapNode) => void;
  onNodeLegend?: (node: RoadmapNode) => void;
  onJumpTest?: (unit: RoadmapUnit) => void;
  onGoLegend?: (unitId: string, firstNode: RoadmapNode) => void;
  /** 기본 레슨 팝오버 대신 트랙 전용 팝오버를 표시할 때만 전달한다. */
  renderNodePopover?: (context: RoadmapNodePopoverContext) => ReactNode;
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

type RoutePoint = {
  x: number;
  y: number;
};

function buildRouteSegment(from: RoutePoint, to: RoutePoint): string {
  const middleY = (from.y + to.y) / 2;

  return `M ${from.x} ${from.y} C ${from.x} ${middleY}, ${to.x} ${middleY}, ${to.x} ${to.y}`;
}

function buildRoutePath(points: RoutePoint[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  return points
    .slice(1)
    .map((point, index) => buildRouteSegment(points[index], point))
    .join(" ");
}

export default function UnitRoadmap({
  unit,
  avatar,
  selectedNodeId,
  onNodeTap,
  onNodeStart,
  onNodeReview,
  onNodeLegend,
  onJumpTest,
  onGoLegend,
  renderNodePopover,
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
  const routePoints = unit.nodes.map((_, index) => ({
    x: CENTER_X + getZigzagOffset(index),
    y: index * ROW_HEIGHT + NODE_WRAP_HEIGHT / 2,
  }));

  const routePath = buildRoutePath(routePoints);

  const routeSegments = routePoints.slice(1).map((point, index) => ({
    path: buildRouteSegment(routePoints[index], point),
    isActive: unit.nodes[index]?.status !== "locked",
  }));

  const svgHeight = Math.max(
    (unit.nodes.length - 1) * ROW_HEIGHT + NODE_WRAP_HEIGHT,
    100,
  );

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
          {/* 길 아래쪽 깊은 그림자 */}
          <Path
            d={routePath}
            fill="none"
            stroke={darken(unit.color, 50)}
            strokeWidth={24}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.13}
            transform="translate(0 7)"
          />

          {/* 하얀 지도길 바닥 */}
          <Path
            d={routePath}
            fill="none"
            stroke={theme.surface}
            strokeWidth={18}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.98}
          />

          {/* 유닛 컬러 테두리 */}
          <Path
            d={routePath}
            fill="none"
            stroke={unit.color}
            strokeWidth={12}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.16}
          />

          {/* 완료된 길과 잠긴 길을 상태에 따라 표현 */}
          {routeSegments.map((segment, index) => (
            <Path
              key={index}
              d={segment.path}
              fill="none"
              stroke={segment.isActive ? unit.color : theme.border}
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={segment.isActive ? 0.88 : 0.7}
            />
          ))}

          {/* 지도길 위 작은 반짝임 */}
          <Path
            d={routePath}
            fill="none"
            stroke={theme.surface}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="1 15"
            opacity={0.92}
          />
        </Svg>

        {unit.nodes.map((node, i) => {
          const offset = getZigzagOffset(i);
          const isCurrent = node.status === "current";
          const usesCustomPopover = Boolean(renderNodePopover);
          const isSelected = selectedNodeId === node.id;
          const characterOffset = offset > 0 ? offset - 115 : offset + 115;
          const nodeVisualIndex =
            usesCustomPopover && node.status === "locked" ? Math.max(1, i) : i;
          const handleNodePress = () => onNodeTap(node.id);

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
                {node.type === "score" ? (
                  <ScoreNode
                    score={node.scoreValue ?? unit.unitNumber}
                    locked={node.status !== "completed"}
                    unitColor={unit.color}
                    onPress={handleNodePress}
                  />
                ) : !usesCustomPopover &&
                  i === 0 &&
                  node.status === "locked" ? (
                  <>
                    <Animated.View
                      style={[styles.jumpBubbleWrap, animatedStyle]}
                    >
                      <View style={styles.bubble}>
                        <Text
                          style={[styles.bubbleText, { color: unit.color }]}
                        >
                          {t("roadmap.jumpHere")}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.bubbleTail,
                          { borderTopColor: theme.surface },
                        ]}
                      />
                    </Animated.View>

                    <LessonNode
                      index={nodeVisualIndex}
                      type={isCurrent && !isSelected ? "boss" : node.type}
                      status={node.status}
                      unitColor={unit.color}
                      isLegendDone={!!node.legendCompleted}
                      completedSteps={node.completedLessons ?? 0}
                      totalSteps={node.totalLessons ?? 4}
                      iconName={node.iconName}
                      onPress={handleNodePress}
                    />
                  </>
                ) : (
                  <LessonNode
                    index={nodeVisualIndex}
                    type={isCurrent && !isSelected ? "speech" : node.type}
                    status={node.status}
                    unitColor={unit.color}
                    isLegendDone={!!node.legendCompleted}
                    completedSteps={node.completedLessons ?? 0}
                    totalSteps={node.totalLessons ?? 4}
                    iconName={node.iconName}
                    onPress={handleNodePress}
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
                  <CharacterMarker hearts={3} avatar={avatar} />
                </View>
              )}

              {isSelected && (
                <View style={styles.popoverContainer}>
                  {renderNodePopover ? (
                    renderNodePopover({
                      node,
                      unit,
                      triangleOffsetX: offset,
                      onClose: () => onNodeTap(node.id),
                    })
                  ) : (
                    <NodePopover
                      node={node}
                      unit={unit}
                      triangleOffsetX={offset}
                      onStart={() => onNodeStart?.(node)}
                      onReview={() => onNodeReview?.(node)}
                      onLegend={() => onNodeLegend?.(node)}
                      onGoLegend={(firstNode) =>
                        onGoLegend?.(unit.id, firstNode)
                      }
                      canJump={i === 0 && node.status === "locked"}
                      onJumpTest={() => onJumpTest?.(unit)}
                      onClose={() => onNodeTap(node.id)}
                    />
                  )}
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
      paddingBottom: 8,
      position: "relative",
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
      minHeight: NODE_WRAP_HEIGHT,
      alignItems: "center",
      marginBottom: NODE_GAP,
      position: "relative",
    },
    nodeRowSelected: {
      zIndex: 999,
      elevation: 20,
    },
    nodePosition: {
      height: NODE_WRAP_HEIGHT,
      alignItems: "center",
      justifyContent: "center",
    },
    character: {
      position: "absolute",
      top: -2,
    },
    popoverContainer: {
      position: "absolute",
      top: NODE_SIZE + 16,
      left: 0,
      right: 0,
    },
    jumpBubbleWrap: {
      position: "absolute",
      bottom: NODE_WRAP_HEIGHT + 12,
      alignItems: "center",
      zIndex: 5,
    },
    bubble: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      paddingVertical: 12,
      paddingHorizontal: 22,
      borderWidth: 2,
      borderColor: theme.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 7,
    },
    bubbleText: {
      fontSize: 16,
      fontWeight: "900",
      letterSpacing: 0.15,
    },
    bubbleTail: {
      width: 0,
      height: 0,
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderTopWidth: 11,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      marginTop: -1,
    },
    jumpWrapper: {
      alignItems: "center",
      marginBottom: 8,
    },
  });
