import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import RoadmapBackdrop from "@/components/roadmap/RoadmapBackdrop";
import RoadmapHeader from "@/components/roadmap/RoadmapHeader";
import SectionBanner from "@/components/roadmap/SectionBanner";
import UnitRoadmap, {
  type RoadmapNodePopoverContext,
} from "@/components/roadmap/UnitRoadmap";
import {
  DIVIDER_HEIGHT,
  ROW_HEIGHT,
  UNIT_PADDING,
} from "@/components/roadmap/roadmap.utils";
import { KOR_FLAG } from "@/constants/course";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/store/auth.store";
import type { RoadmapUnit } from "@/types/roadmap";
import ExpressionNodePopover from "../components/ExpressionNodePopover";
import { useExpressionRoadmap } from "../hooks/useExpressionRoadmap";
import { buildExpressionRoadmapViewModel } from "../utils/expression-roadmap.adapter";

export default function ExpressionRoadmapScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);
  const user = useAuthStore((state) => state.user);
  const energy = user?.energy ?? 0;
  const { roadmap, loading, loadFailed, reload } = useExpressionRoadmap();
  const listRef = useRef<FlatList<RoadmapUnit>>(null);
  const [visibleUnitIndex, setVisibleUnitIndex] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const viewModel = useMemo(
    () => (roadmap ? buildExpressionRoadmapViewModel(roadmap) : null),
    [roadmap],
  );
  const units = viewModel?.units ?? [];
  const bannerUnit =
    units[visibleUnitIndex] ?? units[viewModel?.currentUnitIndex ?? 0];
  const userStats = {
    language: KOR_FLAG,
    courseCount: (user?.courseExtraCount ?? 0) + 1,
    score: undefined,
    streak: user?.streak,
    gems: user?.gems,
    energy: user?.energy,
    isSuper: user?.isSuper,
  };

  const layout = useMemo(() => {
    const heights = units.map(
      (unit) => DIVIDER_HEIGHT + unit.nodes.length * ROW_HEIGHT + UNIT_PADDING,
    );
    const offsets: number[] = [];
    let accumulated = 0;
    for (const height of heights) {
      offsets.push(accumulated);
      accumulated += height;
    }
    return { heights, offsets };
  }, [units]);

  const getItemLayout = useCallback(
    (_: ArrayLike<RoadmapUnit> | null | undefined, index: number) => ({
      length: layout.heights[index] ?? 0,
      offset: layout.offsets[index] ?? 0,
      index,
    }),
    [layout],
  );

  useEffect(() => {
    if (!viewModel || !units.length) return;
    setSelectedNodeId(null);
    setVisibleUnitIndex(viewModel.currentUnitIndex);
    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({
        index: viewModel.currentUnitIndex,
        animated: false,
      });
    });
  }, [units.length, viewModel]);

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

  const openNode = useCallback(
    (nodeId: string) => {
      const nodeCode = viewModel?.nodeCodeById.get(nodeId);
      if (!nodeCode) return;
      setSelectedNodeId(null);
      router.push({ pathname: "/expression-node", params: { node: nodeCode } });
    },
    [router, viewModel],
  );

  const handleNodeTap = useCallback(
    (nodeId: string) => {
      const node = viewModel?.nodeDetailsById.get(nodeId);
      if (!node || node.status === "locked") return;
      setSelectedNodeId((current) => (current === nodeId ? null : nodeId));
    },
    [viewModel],
  );
  const renderNodePopover = useCallback(
    ({ node, unit, triangleOffsetX }: RoadmapNodePopoverContext) => {
      const expressionNode = viewModel?.nodeDetailsById.get(node.id);
      if (!expressionNode) return null;
      return (
        <ExpressionNodePopover
          node={expressionNode}
          color={unit.color}
          triangleOffsetX={triangleOffsetX}
          onStart={() => openNode(node.id)}
        />
      );
    },
    [openNode, viewModel],
  );
  const renderUnit = useCallback(
    ({ item }: { item: RoadmapUnit }) => (
      <UnitRoadmap
        unit={item}
        avatar={user?.avatar}
        selectedNodeId={selectedNodeId}
        onNodeTap={handleNodeTap}
        renderNodePopover={renderNodePopover}
      />
    ),
    [handleNodeTap, renderNodePopover, selectedNodeId, user?.avatar],
  );
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40 });
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const index = viewableItems[0]?.index;
      if (index !== null && index !== undefined) {
        setVisibleUnitIndex(index);
        setSelectedNodeId(null);
      }
    },
  );
  const onScrollToIndexFailed = useCallback(
    ({ index }: { index: number }) => {
      listRef.current?.scrollToOffset({
        offset: layout.offsets[index] ?? 0,
        animated: false,
      });
    },
    [layout.offsets],
  );

  return (
    <View style={styles.container}>
      <RoadmapBackdrop theme={theme} />
      <RoadmapHeader stats={userStats} energy={energy} />

      {bannerUnit ? (
        <SectionBanner
          sectionNumber={bannerUnit.sectionNumber}
          unitNumber={bannerUnit.unitNumber}
          title={bannerUnit.title}
          color={bannerUnit.color}
        />
      ) : null}

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : loadFailed ? (
        <View style={styles.state}>
          <View style={styles.errorIcon}>
            <Ionicons
              name="cloud-offline-outline"
              size={34}
              color={theme.primary}
            />
          </View>
          <Text style={styles.stateTitle}>
            {t("expressionRoadmap.loadFailed")}
          </Text>
          <Pressable style={styles.retryButton} onPress={() => void reload()}>
            <Text style={styles.retryText}>{t("expressionRoadmap.retry")}</Text>
          </Pressable>
        </View>
      ) : units.length === 0 ? (
        <View style={styles.state}>
          <Text style={styles.stateTitle}>{t("expressionRoadmap.empty")}</Text>
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={units}
          keyExtractor={(unit) => unit.id}
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
        />
      )}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      overflow: "hidden",
    },
    scroll: { flex: 1 },
    scrollContent: { paddingTop: 10, paddingBottom: 140 },
    state: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 28,
      gap: 14,
    },
    errorIcon: {
      width: 66,
      height: 66,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: `${theme.primary}14`,
    },
    stateTitle: {
      color: theme.text,
      fontSize: 18,
      fontWeight: "900",
      textAlign: "center",
    },
    retryButton: {
      minHeight: 46,
      borderRadius: 15,
      paddingHorizontal: 24,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary,
    },
    retryText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  });
