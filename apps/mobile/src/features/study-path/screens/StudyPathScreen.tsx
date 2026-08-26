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
import NextSectionLocked from "@/components/roadmap/NextSectionLocked";
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
import { useEnergyStore } from "@/store/energy.store";
import type { RoadmapUnit } from "@/types/roadmap";
import type { StudyDay, StudyNode } from "@/types/study-path";
import DayBanner from "../components/DayBanner";
import SectionDivider from "../components/SectionDivider";
import StudyNodePopover from "../components/StudyNodePopover";
import { useStudyPath } from "../hooks/useStudyPath";
import {
  buildStudyPathViewModel,
  countDone,
} from "../utils/study-path.adapter";

/** SectionDivider 의 대략 높이 (getItemLayout 추정용) */
const SECTION_DIVIDER_HEIGHT = 42;

export default function StudyPathScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);
  const user = useAuthStore((state) => state.user);
  const energy = user?.energy ?? 0;
  const guardLessonStart = useEnergyStore((s) => s.guardLessonStart);
  const { data, loading, loadFailed, reload } = useStudyPath();
  const listRef = useRef<FlatList<RoadmapUnit>>(null);
  const [visibleDayIndex, setVisibleDayIndex] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const viewModel = useMemo(() => {
    if (!data) return null;
    return buildStudyPathViewModel(
      data.days,
      (node) => {
        const base = t(`studyPath.node.${node.kind}`);
        return node.groupCount > 1
          ? t("studyPath.nodeGroup", {
              name: base,
              n: node.group,
              total: node.groupCount,
            })
          : base;
      },
      (day) =>
        t(day.phase === 1 ? "studyPath.dayLearn" : "studyPath.dayPractice", {
          n: day.dayNumber,
          title: day.title,
        }),
    );
  }, [data, t]);

  const units = viewModel?.units ?? [];
  const days = data?.days ?? [];
  const bannerDay: StudyDay | undefined =
    days[visibleDayIndex] ?? days[data?.currentDayIndex ?? 0];
  const bannerUnit =
    units[visibleDayIndex] ?? units[data?.currentDayIndex ?? 0];

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
      (unit, index) =>
        DIVIDER_HEIGHT +
        unit.nodes.length * ROW_HEIGHT +
        UNIT_PADDING +
        (days[index]?.sectionStart ? SECTION_DIVIDER_HEIGHT : 0),
    );
    const offsets: number[] = [];
    let accumulated = 0;
    for (const height of heights) {
      offsets.push(accumulated);
      accumulated += height;
    }
    return { heights, offsets };
  }, [days, units]);

  const getItemLayout = useCallback(
    (_: ArrayLike<RoadmapUnit> | null | undefined, index: number) => ({
      length: layout.heights[index] ?? 0,
      offset: layout.offsets[index] ?? 0,
      index,
    }),
    [layout],
  );

  useEffect(() => {
    if (!data || !units.length) return;
    setSelectedNodeId(null);
    setVisibleDayIndex(data.currentDayIndex);
    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({
        index: data.currentDayIndex,
        animated: false,
      });
    });
  }, [data, units.length]);

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

  /** 노드 종류마다 이미 있는 화면으로 보낸다. 다만 범위를 그 하루로 좁힌다 */
  const openNode = useCallback(
    (node: StudyNode, day: StudyDay) => {
      if (node.status === "locked") return; // 미리보기만 되는 노드
      setSelectedNodeId(null);
      const section = String(day.section);
      const unit = String(day.unit);

      if (node.kind === "words") {
        router.push({
          pathname: "/word-study",
          params: {
            section,
            unit,
            from: "studyPath",
            lesson: String(node.nextLesson),
            lessonCount: String(node.lessonCount),
          },
        });
        return;
      }
      if (node.kind === "grammar") {
        router.push({
          pathname: "/grammar-list",
          params: { section, unit, from: "studyPath" },
        });
        return;
      }

      // 나머지는 전부 레슨 화면에서 그 하루 범위의 문제를 푼다
      guardLessonStart(energy, () => {
        router.push({
          pathname: "/lesson",
          params: {
            mode: "unitPractice",
            kind: node.kind,
            from: "studyPath",
            section,
            unit,
            group: String(node.group),
            lesson: String(node.nextLesson),
          },
        });
      });
    },
    [energy, guardLessonStart, router],
  );

  const closePopover = useCallback(() => setSelectedNodeId(null), []);

  // 잠긴 노드도 열린다. 앞으로 뭘 배우는지 미리 볼 수 있어야 오늘 하는 일이
  // 어디로 이어지는지 보인다. 시작만 못 할 뿐이다.
  const handleNodeTap = useCallback(
    (nodeId: string) => {
      if (!viewModel?.nodeById.has(nodeId)) return;
      setSelectedNodeId((current) => (current === nodeId ? null : nodeId));
    },
    [viewModel],
  );

  const renderNodePopover = useCallback(
    ({ node, unit, triangleOffsetX }: RoadmapNodePopoverContext) => {
      const entry = viewModel?.nodeById.get(node.id);
      if (!entry) return null;
      return (
        <StudyNodePopover
          node={entry.node}
          step={entry.step}
          stepCount={entry.day.nodes.length}
          color={unit.color}
          triangleOffsetX={triangleOffsetX}
          onStart={() => openNode(entry.node, entry.day)}
        />
      );
    },
    [openNode, viewModel],
  );

  const renderUnit = useCallback(
    ({ item, index }: { item: RoadmapUnit; index: number }) => {
      const hasSelectedNode = item.nodes.some((n) => n.id === selectedNodeId);
      const day = days[index];
      return (
        <Pressable
          onPress={closePopover}
          style={hasSelectedNode ? styles.unitElevated : undefined}
        >
          {day?.sectionStart ? (
            <SectionDivider section={day.section} color={item.color} />
          ) : null}
          <UnitRoadmap
            unit={item}
            avatar={user?.avatar}
            selectedNodeId={selectedNodeId}
            onNodeTap={handleNodeTap}
            renderNodePopover={renderNodePopover}
          />
        </Pressable>
      );
    },
    [
      closePopover,
      days,
      handleNodeTap,
      renderNodePopover,
      selectedNodeId,
      styles.unitElevated,
      user?.avatar,
    ],
  );

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40 });
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const index = viewableItems[0]?.index;
      if (index !== null && index !== undefined) {
        setVisibleDayIndex(index);
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

  const listFooter = useMemo(() => {
    if (!data?.nextLevel) return null;
    return (
      <NextSectionLocked
        sectionNumber={data.nextLevel.level}
        title={data.nextLevel.title}
        description={data.nextLevel.description}
      />
    );
  }, [data?.nextLevel]);

  return (
    <View style={styles.container}>
      <RoadmapBackdrop theme={theme} />
      <RoadmapHeader stats={userStats} energy={energy} />

      {bannerDay && bannerUnit ? (
        <DayBanner
          dayNumber={bannerDay.dayNumber}
          title={bannerDay.title}
          phase={bannerDay.phase}
          color={bannerUnit.color}
          done={countDone(bannerDay)}
          total={bannerDay.nodes.length}
          level={data?.currentLevel ?? 1}
          onLevelPress={() =>
            router.push({
              pathname: "/study-level",
              params: { from: "studyPath" },
            })
          }
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
          <Text style={styles.stateTitle}>{t("studyPath.loadFailed")}</Text>
          <Pressable style={styles.retryButton} onPress={() => void reload()}>
            <Text style={styles.retryText}>{t("studyPath.retry")}</Text>
          </Pressable>
        </View>
      ) : units.length === 0 ? (
        <View style={styles.state}>
          <Text style={styles.stateTitle}>{t("studyPath.empty")}</Text>
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
          ListFooterComponent={listFooter}
          onScrollBeginDrag={closePopover}
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
    container: { flex: 1, backgroundColor: theme.bg, overflow: "hidden" },
    // 팝오버가 열린 유닛은 위로 올려서 아래 유닛에 가리지 않게 한다
    unitElevated: { zIndex: 9999, elevation: 30 },
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
