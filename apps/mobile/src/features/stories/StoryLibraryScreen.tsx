import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
} from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "@/components/ui/Pressables";
import SwipePager from "@/components/common/SwipePager";
import { useTheme } from "@/hooks/useTheme";
import * as Haptics from "@/utils/haptics";
import {
  LEARN_COURSES,
  isLearnCourse,
  type LearnCourse,
} from "@/constants/learnCourses";
import { StoriesService } from "@/services/stories.service";
import { StoryScene } from "./StoryScene";
import { sceneOf, withAlpha } from "./scenes";
import { storyAudioState, type StoryAudioState } from "./storyAudio";
import { formatClock, useStoriesCopy, type StoriesCopy } from "./stories.copy";
import type {
  StoryLevelGroup,
  StoryLibraryResponse,
  StorySummary,
} from "./stories.types";

/**
 * 듣기 이야기 서가 (코스마다 같은 화면 — `?course=en`).
 *
 * 레벨 탭(서버가 내려 준 대로 — 이야기가 아직 없는 레벨도 탭은 있다) → 옆으로 밀어서
 * 레벨을 넘긴다. 레벨마다 다음에 들을 이야기 하나를 크게(움직이는 그림), 나머지는
 * 작은 그림이 붙은 줄로. 앱의 밝은/어두운 테마를 따른다 — 그림에 잠기는 건 플레이어부터.
 */

const VIOLET = "#776EE2";
const VIOLET_DEEP = "#5B4DD4";
/** 마지막으로 본 레벨 (코스별, 앱을 켜 둔 동안) */
const lastLevel = new Map<LearnCourse, string>();

export default function StoryLibraryScreen() {
  const theme = useTheme();
  const isDark = theme.bg !== "#ffffff";
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const copy = useStoriesCopy();
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ course?: string }>();
  const course: LearnCourse = isLearnCourse(params.course) ? params.course : "en";

  const [library, setLibrary] = useState<StoryLibraryResponse | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [index, setIndex] = useState(0);
  const progress = useSharedValue(0);

  const placedRef = useRef(false);
  const load = useCallback(async () => {
    try {
      const response = await StoriesService.list(course);
      // 처음 들어오면: 지난번 레벨 → 아직 안 들은 이야기가 있는 첫 레벨 → 첫 탭
      if (!placedRef.current) {
        placedRef.current = true;
        const remembered = response.levels.findIndex(
          (group) => group.level === lastLevel.get(course),
        );
        const open = response.levels.findIndex((group) =>
          group.stories.some(
            (story) =>
              !story.progress.completed && storyAudioState(story) === "ready",
          ),
        );
        const start = remembered >= 0 ? remembered : Math.max(0, open);
        setIndex(start);
        progress.value = start;
      }
      setLibrary(response);
      setState("ready");
    } catch {
      setState((prev) => (prev === "ready" ? prev : "error"));
    }
  }, [course, progress]);

  // 플레이어에서 돌아오면 체크 표시가 바로 보이게 다시 읽는다
  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const levels = useMemo(() => library?.levels ?? [], [library]);
  const current = levels[index];

  const selectLevel = useCallback(
    (next: number) => {
      setIndex(next);
      const level = levels[next]?.level;
      if (level) lastLevel.set(course, level);
    },
    [course, levels],
  );

  const open = useCallback(
    (story: StorySummary) => {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.push({
        pathname: "/story-player",
        params: {
          code: story.code,
          scene: story.scene,
          title: story.title,
          course,
        },
      });
    },
    [course],
  );

  // 미는 동안 다시 그려지지 않게 장(page)들을 고정한다 (SwipePager 규칙)
  const pages = useMemo(
    () =>
      levels.map((group) => (
        <LevelPage
          key={group.level}
          group={group}
          copy={copy}
          width={width}
          isDark={isDark}
          textColor={theme.text}
          mutedColor={theme.textSecondary}
          surface={theme.surface}
          border={theme.border}
          onOpen={open}
        />
      )),
    [copy, isDark, levels, open, theme, width],
  );

  const languageName = t(`courses.languages.${LEARN_COURSES[course].key}`);
  const done = current?.stories.filter((story) => story.progress.completed).length ?? 0;

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg, paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/courses"))}
          accessibilityRole="button"
          accessibilityLabel={copy.close}
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </Pressable>
      </View>
      <View style={styles.intro}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: theme.text }]}>{copy.libraryTitle}</Text>
          <View style={[styles.languagePill, { backgroundColor: withAlpha(VIOLET, 0.14) }]}>
            <Text style={[styles.languageText, { color: isDark ? "#C4BEF0" : VIOLET_DEEP }]}>
              {languageName}
            </Text>
          </View>
        </View>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {copy.librarySubtitle}
        </Text>
      </View>

      {state === "loading" && !library && (
        <View style={styles.center}>
          <ActivityIndicator color={VIOLET} />
        </View>
      )}

      {state === "error" && !library && (
        <View style={styles.center}>
          <Text style={[styles.stateText, { color: theme.text }]}>{copy.loadFailed}</Text>
          <Pressable
            onPress={() => {
              setState("loading");
              void load();
            }}
            accessibilityRole="button"
            style={styles.retry}
          >
            <Text style={styles.retryText}>{copy.retry}</Text>
          </Pressable>
        </View>
      )}

      {library && levels.length === 0 && (
        <View style={styles.center}>
          <Text style={[styles.stateText, { color: theme.textSecondary }]}>{copy.empty}</Text>
        </View>
      )}

      {library && levels.length > 0 && (
        <>
          <LevelTabs
            levels={levels}
            index={index}
            isDark={isDark}
            textColor={theme.text}
            border={theme.border}
            onSelect={(next) => {
              void Haptics.selectionAsync();
              selectLevel(next);
            }}
          />
          {current && (
            <Text style={[styles.levelLine, { color: theme.textSecondary }]}>
              {current.stories.length
                ? `${current.label}  ·  ${copy.heard(done, current.stories.length)}`
                : current.label}
            </Text>
          )}
          <SwipePager
            index={index}
            onIndexChange={selectLevel}
            pages={pages}
            progress={progress}
            contentContainerStyle={{ paddingTop: 4, paddingBottom: insets.bottom + 40 }}
          />
        </>
      )}
    </View>
  );
}

/* ───────────────────────── 레벨 탭 ───────────────────────── */

/**
 * 레벨이 여섯 개라 한 줄에 다 안 들어가면 옆으로 스크롤된다. 고른 탭은 보이는 자리로
 * 저절로 온다. 움직임 없이 색만 바뀐다 — 밀어서 넘길 때 화면이 이미 움직이니까.
 */
function LevelTabs({
  levels,
  index,
  isDark,
  textColor,
  border,
  onSelect,
}: {
  levels: StoryLevelGroup[];
  index: number;
  isDark: boolean;
  textColor: string;
  border: string;
  onSelect: (index: number) => void;
}) {
  const scrollRef = useRef<ScrollView>(null);
  const positions = useRef<number[]>([]);

  useEffect(() => {
    const x = positions.current[index];
    if (x === undefined) return;
    scrollRef.current?.scrollTo({ x: Math.max(0, x - 24), animated: true });
  }, [index]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabs}
      style={styles.tabsScroll}
    >
      {levels.map((group, i) => {
        const selected = i === index;
        const empty = group.stories.length === 0;
        return (
          <Pressable
            key={group.level}
            onPress={() => onSelect(i)}
            onLayout={(event: LayoutChangeEvent) => {
              positions.current[i] = event.nativeEvent.layout.x;
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={`${group.level} ${group.label}`}
            style={[
              styles.tab,
              selected
                ? { backgroundColor: VIOLET, borderColor: VIOLET, borderBottomColor: VIOLET_DEEP }
                : {
                    backgroundColor: isDark ? "#25252E" : "#FFFFFF",
                    borderColor: border,
                    borderBottomColor: isDark ? "#101016" : "#DAD6EE",
                  },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: selected ? "#FFFFFF" : textColor },
                empty && !selected && { opacity: 0.45 },
              ]}
            >
              {group.level}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

/* ───────────────────────── 레벨 한 장 ───────────────────────── */

function LevelPage({
  group,
  copy,
  width,
  isDark,
  textColor,
  mutedColor,
  surface,
  border,
  onOpen,
}: {
  group: StoryLevelGroup;
  copy: StoriesCopy;
  width: number;
  isDark: boolean;
  textColor: string;
  mutedColor: string;
  surface: string;
  border: string;
  onOpen: (story: StorySummary) => void;
}) {
  if (group.stories.length === 0) {
    return (
      <View style={styles.soon}>
        <View style={styles.soonScene}>
          <StoryScene scene="night" width={width - 32} height={150} animated={false} />
        </View>
        <Text style={[styles.soonText, { color: mutedColor }]}>{copy.levelSoon}</Text>
      </View>
    );
  }

  // 낭독 파일이 없는 이야기는 잠가서 맨 아래에 둔다 — 크게 보여 주는 건 들을 수 있는 것만
  const ready = group.stories.filter((story) => storyAudioState(story) === "ready");
  const locked = group.stories.filter((story) => storyAudioState(story) !== "ready");
  const hero = ready.find((story) => !story.progress.completed) ?? ready[0];
  const rest = [...ready.filter((story) => story.code !== hero?.code), ...locked];

  return (
    <View>
      {hero && (
        <HeroCard story={hero} copy={copy} width={width - 32} onPress={() => onOpen(hero)} />
      )}
      <View style={styles.list}>
        {rest.map((story) => (
          <StoryRow
            key={story.code}
            story={story}
            audioState={storyAudioState(story)}
            copy={copy}
            isDark={isDark}
            textColor={textColor}
            mutedColor={mutedColor}
            surface={surface}
            border={border}
            onPress={() => onOpen(story)}
          />
        ))}
      </View>
    </View>
  );
}

/* ───────────────────────── 다음 이야기 (크게) ───────────────────────── */

/** 누르면 받침 깊이만큼 가라앉는다 (DESIGN: Press-Sinks) */
function useSink(depth: number) {
  const sink = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: sink.value * depth }],
  }));
  return {
    style,
    onPressIn: () => {
      sink.value = withTiming(1, { duration: 60 });
    },
    onPressOut: () => {
      sink.value = withTiming(0, { duration: 90 });
    },
  };
}

function HeroCard({
  story,
  copy,
  width,
  onPress,
}: {
  story: StorySummary;
  copy: StoriesCopy;
  width: number;
  onPress: () => void;
}) {
  const palette = sceneOf(story.scene);
  const sink = useSink(5);
  const sceneHeight = Math.round(Math.min(200, width * 0.52));
  const label = story.progress.completed ? copy.listenAgain : copy.upNext;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={sink.onPressIn}
      onPressOut={sink.onPressOut}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${story.title}`}
      style={styles.heroWrap}
    >
      <View style={[styles.heroSlab, { backgroundColor: palette.groundDeep }]} />
      <Animated.View style={[styles.hero, { backgroundColor: palette.ground }, sink.style]}>
        <StoryScene
          scene={story.scene}
          width={width}
          height={sceneHeight}
          fadeTo={palette.ground}
        />
        <View style={styles.heroBody}>
          <View style={styles.flex}>
            <Text numberOfLines={2} style={[styles.heroTitle, { color: palette.ink }]}>
              {story.title}
            </Text>
            <Text numberOfLines={1} style={[styles.heroTopic, { color: withAlpha(palette.ink, 0.75) }]}>
              {story.topic}
            </Text>
            <Text style={[styles.heroMeta, { color: withAlpha(palette.ink, 0.6) }]}>
              {`${story.narrator.name}  ·  ${formatClock(story.audio.durationMs)}  ·  ${copy.sentences(story.sentenceCount)}`}
            </Text>
          </View>
          <View style={styles.heroPlay}>
            <View style={[styles.heroPlaySlab, { backgroundColor: VIOLET_DEEP }]} />
            <View style={[styles.heroPlayFace, { backgroundColor: VIOLET }]}>
              <Ionicons
                name={story.progress.completed ? "refresh" : "play"}
                size={24}
                color="#FFFFFF"
                style={story.progress.completed ? undefined : { marginLeft: 3 }}
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

/* ───────────────────────── 줄 ───────────────────────── */

function StoryRow({
  story,
  audioState,
  copy,
  isDark,
  textColor,
  mutedColor,
  surface,
  border,
  onPress,
}: {
  story: StorySummary;
  audioState: StoryAudioState;
  copy: StoriesCopy;
  isDark: boolean;
  textColor: string;
  mutedColor: string;
  surface: string;
  border: string;
  onPress: () => void;
}) {
  const sink = useSink(4);
  const slab = isDark ? "#0F0F15" : "#DAD6EE";
  const locked = audioState !== "ready";
  const lockedLabel = audioState === "update" ? copy.lockedUpdateShort : copy.lockedSoon;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={sink.onPressIn}
      onPressOut={sink.onPressOut}
      disabled={locked}
      accessibilityRole="button"
      accessibilityState={{ disabled: locked }}
      accessibilityLabel={
        locked
          ? `${story.title}, ${story.topic}, ${lockedLabel}`
          : `${story.title}, ${story.topic}`
      }
      style={styles.rowWrap}
    >
      <View style={[styles.rowSlab, { backgroundColor: slab }]} />
      <Animated.View
        style={[
          styles.row,
          { backgroundColor: surface, borderColor: border },
          locked && styles.rowLocked,
          sink.style,
        ]}
      >
        <View style={styles.thumb}>
          <StoryScene scene={story.scene} width={64} height={64} animated={false} />
        </View>
        <View style={styles.flex}>
          <Text numberOfLines={1} style={[styles.rowTitle, { color: textColor }]}>
            {story.title}
          </Text>
          <Text numberOfLines={1} style={[styles.rowTopic, { color: mutedColor }]}>
            {story.topic}
          </Text>
          <Text numberOfLines={1} style={[styles.rowMeta, { color: mutedColor }]}>
            {locked
              ? `${story.narrator.name}  ·  ${lockedLabel}`
              : `${story.narrator.name}  ·  ${formatClock(story.audio.durationMs)}`}
          </Text>
        </View>
        {locked ? (
          <Ionicons name="lock-closed" size={20} color={mutedColor} />
        ) : story.progress.completed ? (
          <View style={styles.done} accessibilityLabel={copy.done}>
            <Ionicons name="checkmark" size={15} color="#FFFFFF" />
          </View>
        ) : (
          <Ionicons name="play-circle" size={28} color={VIOLET} />
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  flex: { flex: 1 },
  header: { paddingHorizontal: 14, height: 40, justifyContent: "center" },
  intro: { paddingHorizontal: 20, marginBottom: 14 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 10, flexWrap: "wrap" },
  title: { fontSize: 26, lineHeight: 31, fontWeight: "900", letterSpacing: -0.4 },
  languagePill: { height: 26, borderRadius: 13, paddingHorizontal: 10, justifyContent: "center" },
  languageText: { fontSize: 12, fontWeight: "900" },
  subtitle: { marginTop: 6, fontSize: 13, lineHeight: 19, fontWeight: "700" },
  center: { alignItems: "center", justifyContent: "center", gap: 14, paddingVertical: 60 },
  stateText: { fontSize: 15, fontWeight: "800", textAlign: "center" },
  retry: {
    height: 50,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderBottomWidth: 4,
    borderBottomColor: VIOLET_DEEP,
    backgroundColor: VIOLET,
    alignItems: "center",
    justifyContent: "center",
  },
  retryText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  tabsScroll: { flexGrow: 0 },
  tabs: { paddingHorizontal: 16, gap: 8, paddingBottom: 3 },
  tab: {
    minWidth: 54,
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: { fontSize: 15, fontWeight: "900", letterSpacing: 0.3 },
  levelLine: {
    marginTop: 8,
    marginBottom: 10,
    paddingHorizontal: 20,
    fontSize: 12.5,
    fontWeight: "800",
  },
  soon: { marginHorizontal: 16, alignItems: "center", gap: 16 },
  soonScene: { borderRadius: 24, overflow: "hidden", opacity: 0.85 },
  soonText: { fontSize: 14, lineHeight: 20, fontWeight: "800", textAlign: "center" },
  heroWrap: { marginHorizontal: 16, marginBottom: 16, paddingBottom: 5 },
  heroSlab: { position: "absolute", left: 0, right: 0, top: 5, bottom: 0, borderRadius: 24 },
  hero: { borderRadius: 24, overflow: "hidden" },
  heroBody: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 14,
    paddingHorizontal: 18,
    paddingBottom: 16,
    marginTop: -42,
  },
  heroTitle: { fontSize: 21, lineHeight: 26, fontWeight: "900", letterSpacing: -0.4 },
  heroTopic: { marginTop: 3, fontSize: 13, fontWeight: "800" },
  heroMeta: { marginTop: 7, fontSize: 11.5, fontWeight: "800", fontVariant: ["tabular-nums"] },
  heroPlay: { width: 54, height: 59 },
  heroPlaySlab: { position: "absolute", top: 5, width: 54, height: 54, borderRadius: 27 },
  heroPlayFace: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { paddingHorizontal: 16, gap: 10 },
  rowWrap: { paddingBottom: 4 },
  rowSlab: { position: "absolute", left: 0, right: 0, top: 4, bottom: 0, borderRadius: 18 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 9,
    paddingRight: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  rowLocked: { opacity: 0.55 },
  thumb: { width: 64, height: 64, borderRadius: 14, overflow: "hidden" },
  rowTitle: { fontSize: 15, lineHeight: 20, fontWeight: "900" },
  rowTopic: { marginTop: 1, fontSize: 12.5, fontWeight: "700" },
  rowMeta: { marginTop: 3, fontSize: 11.5, fontWeight: "800", fontVariant: ["tabular-nums"] },
  done: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: VIOLET,
    alignItems: "center",
    justifyContent: "center",
  },
});
