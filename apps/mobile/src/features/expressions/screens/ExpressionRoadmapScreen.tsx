import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { useSoundAlert } from "@/hooks/useSoundAlert";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import JumpToCurrentButton from "@/components/roadmap/JumpToCurrentButton";
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
import { LEARN_COURSES } from "@/constants/learnCourses";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { ExpressionService } from "@/services/expression.service";
import { useAuthStore } from "@/store/auth.store";
import * as Haptics from "@/utils/haptics";
import { useEnergySync } from "@/store/energy.store";
import { useSettingsStore } from "@/store/settings.store";
import type { ExpressionProficiency } from "@/types/expression";
import type { RoadmapUnit } from "@/types/roadmap";
import ExpressionNodePopover from "../components/ExpressionNodePopover";
import ExpressionTopicSheet from "../components/ExpressionTopicSheet";
import { useExpressionRoadmap } from "../hooks/useExpressionRoadmap";
import { buildExpressionRoadmapViewModel } from "../utils/expression-roadmap.adapter";

const PROFICIENCY_LEVELS: ExpressionProficiency[] = [
  "beginner",
  "intermediate",
  "advanced",
];

export default function ExpressionRoadmapScreen() {
  const Alert = useSoundAlert();
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);
  const user = useAuthStore((state) => state.user);
  const learnCourse = useSettingsStore((state) => state.learnCourse);
  const energy = user?.energy ?? 0;
  // 헤더 에너지는 서버 값 — 다른 모드에서 쓴 만큼이 여기서도 보여야 한다
  useEnergySync();
  const { roadmap, loading, loadFailed, reload, setRoadmap } =
    useExpressionRoadmap();
  const listRef = useRef<FlatList<RoadmapUnit>>(null);
  const [visibleUnitIndex, setVisibleUnitIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<ExpressionProficiency>("beginner");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [topicSheetVisible, setTopicSheetVisible] = useState(false);
  /** 넘어가는 중인 주제 code — 두 번 눌리지 않게 */
  const [jumpingTopic, setJumpingTopic] = useState<string | null>(null);
  const viewModel = useMemo(
    () =>
      roadmap
        ? buildExpressionRoadmapViewModel(roadmap, (level) =>
            t(`voiceTutor.level.${level}`),
          )
        : null,
    [roadmap, t],
  );
  const fullUnits = useMemo(() => viewModel?.units ?? [], [viewModel]);
  const hasLevelTabs = Boolean(
    roadmap?.topics.some(
      (topic) =>
        topic.targetLanguage === "en" &&
        topic.nodes.some((node) => node.proficiency),
    ),
  );
  const units = useMemo(
    () =>
      hasLevelTabs && viewModel
        ? viewModel.units.map((unit) => ({
            ...unit,
            nodes: unit.nodes.filter(
              (node) =>
                viewModel.nodeDetailsById.get(node.id)?.proficiency ===
                selectedLevel,
            ),
          }))
        : fullUnits,
    [fullUnits, hasLevelTabs, selectedLevel, viewModel],
  );
  const currentLevel = useMemo(
    () =>
      roadmap?.topics
        .flatMap((topic) => topic.nodes)
        .find((node) => node.code === roadmap.continueNodeCode)?.proficiency ??
      "beginner",
    [roadmap],
  );
  const currentUnitIndex = viewModel?.currentUnitIndex ?? 0;
  const bannerUnit =
    units[visibleUnitIndex] ?? units[viewModel?.currentUnitIndex ?? 0];
  const userStats = {
    language: LEARN_COURSES[learnCourse]?.flag ?? KOR_FLAG,
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
    if (hasLevelTabs) setSelectedLevel(currentLevel);
  }, [currentLevel, hasLevelTabs]);

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

  /**
   * 고른 주제로 바로 넘어간다 — 서버가 그 주제부터 길을 다시 열고 바뀐 로드맵을 준다.
   * 로드맵이 바뀌면 위 effect 가 새 current(= 고른 주제)로 스크롤한다
   */
  const focusTopic = useCallback(
    async (index: number) => {
      const topic = roadmap?.topics[index];
      if (!topic || jumpingTopic) return;
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setJumpingTopic(topic.code);
      setTopicSheetVisible(false);
      setSelectedNodeId(null);
      try {
        setRoadmap(await ExpressionService.focusTopic(topic.code));
      } catch {
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert(t("expressionRoadmap.jumpFailed"));
      } finally {
        setJumpingTopic(null);
      }
    },
    [Alert, jumpingTopic, roadmap, setRoadmap, t],
  );

  // 목록에서 고른 주제 — 아직 못 간 곳이면 바로 넘어가고, 이미 열린 곳이면 그 자리로 스크롤만
  const handleTopicSelect = useCallback(
    (index: number) => {
      if (!fullUnits[index]) return;
      if (fullUnits[index]?.status === "locked") {
        void focusTopic(index);
        return;
      }

      setTopicSheetVisible(false);
      setSelectedNodeId(null);
      setVisibleUnitIndex(index);
      requestAnimationFrame(() => {
        listRef.current?.scrollToIndex({ index, animated: true });
      });
    },
    [focusTopic, fullUnits],
  );

  const scrollToCurrent = useCallback(() => {
    setSelectedNodeId(null);
    if (hasLevelTabs) setSelectedLevel(currentLevel);
    setVisibleUnitIndex(currentUnitIndex);
    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({ index: currentUnitIndex, animated: true });
    });
  }, [currentLevel, currentUnitIndex, hasLevelTabs]);

  const selectLevel = useCallback(
    (level: ExpressionProficiency) => {
      setSelectedNodeId(null);
      setSelectedLevel(level);
      requestAnimationFrame(() => {
        listRef.current?.scrollToIndex({ index: visibleUnitIndex, animated: false });
      });
    },
    [visibleUnitIndex],
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
        hideNodeRing
        selectedNodeId={selectedNodeId}
        onNodeTap={handleNodeTap}
        renderNodePopover={renderNodePopover}
      />
    ),
    [handleNodeTap, renderNodePopover, selectedNodeId, user?.avatar],
  );
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40 });
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: { index: number | null }[] }) => {
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
          onPress={() => setTopicSheetVisible(true)}
          accessibilityLabel={t("expressionRoadmap.openTopicList")}
        />
      ) : null}

      {hasLevelTabs && bannerUnit ? (
        <View style={styles.levelTabs} accessibilityRole="tablist">
          {PROFICIENCY_LEVELS.map((level) => (
            <Pressable
              key={level}
              accessibilityRole="tab"
              accessibilityState={{ selected: selectedLevel === level }}
              onPress={() => selectLevel(level)}
              style={[
                styles.levelTab,
                selectedLevel === level && styles.levelTabSelected,
              ]}
            >
              <Text
                style={[
                  styles.levelTabText,
                  selectedLevel === level && styles.levelTabTextSelected,
                ]}
              >
                {t(`voiceTutor.level.${level}`)}
              </Text>
            </Pressable>
          ))}
        </View>
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

      {/* 지금 할 곳으로 (어휘 로드맵과 같은 버튼) */}
      {!loading && units.length > 0 ? (
        <JumpToCurrentButton
          direction={visibleUnitIndex > currentUnitIndex ? "up" : "down"}
          color={units[currentUnitIndex]?.color ?? theme.primary}
          onPress={scrollToCurrent}
        />
      ) : null}

      <ExpressionTopicSheet
        visible={topicSheetVisible}
        topics={roadmap?.topics ?? []}
        activeTopicIndex={visibleUnitIndex}
        onClose={() => setTopicSheetVisible(false)}
        onSelect={handleTopicSelect}
      />
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
    levelTabs: {
      flexDirection: "row",
      gap: 6,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.surface,
    },
    levelTab: {
      flex: 1,
      minHeight: 40,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.bg,
      borderWidth: 1,
      borderColor: theme.border,
    },
    levelTabSelected: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    levelTabText: { color: theme.textSecondary, fontSize: 14, fontWeight: "800" },
    levelTabTextSelected: { color: "#FFFFFF" },
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
