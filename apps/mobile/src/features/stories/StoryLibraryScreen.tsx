import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "@/components/ui/Pressables";
import { useTheme } from "@/hooks/useTheme";
import * as Haptics from "@/utils/haptics";
import { StoriesService } from "@/services/stories.service";
import { StoryScene } from "./StoryScene";
import { sceneOf, withAlpha } from "./scenes";
import { formatClock, useStoriesCopy, type StoriesCopy } from "./stories.copy";
import type { StoryLevel, StorySummary, StoryLibraryResponse } from "./stories.types";

/**
 * 듣기 이야기 서가. 레벨 탭(A1·A2·B1) → 다음에 들을 이야기 하나를 크게(움직이는 그림),
 * 나머지는 작은 그림이 붙은 줄로. 앱의 밝은/어두운 테마를 그대로 따른다 —
 * 그림에 잠기는 건 플레이어에 들어간 뒤부터다.
 */

const VIOLET = "#776EE2";
const VIOLET_DEEP = "#5B4DD4";
/** 마지막으로 본 레벨 (앱을 켜 둔 동안) */
let lastLevel: StoryLevel | null = null;

export default function StoryLibraryScreen() {
  const theme = useTheme();
  const isDark = theme.bg !== "#ffffff";
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const copy = useStoriesCopy();
  const [library, setLibrary] = useState<StoryLibraryResponse | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [level, setLevel] = useState<StoryLevel | null>(lastLevel);

  const load = useCallback(async () => {
    try {
      const response = await StoriesService.list();
      setLibrary(response);
      setState("ready");
      // 처음 들어오면 아직 안 들은 이야기가 있는 첫 레벨로
      setLevel((current) => {
        if (current && response.levels.some((group) => group.level === current)) {
          return current;
        }
        const open = response.levels.find((group) =>
          group.stories.some((story) => !story.progress.completed),
        );
        return (open ?? response.levels[0])?.level ?? null;
      });
    } catch {
      setState((prev) => (prev === "ready" ? prev : "error"));
    }
  }, []);

  // 플레이어에서 돌아오면 체크 표시가 바로 보이게 다시 읽는다
  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const group = library?.levels.find((item) => item.level === level);
  const hero = useMemo(
    () => group?.stories.find((story) => !story.progress.completed) ?? group?.stories[0],
    [group],
  );
  const rest = useMemo(
    () => group?.stories.filter((story) => story.code !== hero?.code) ?? [],
    [group, hero],
  );

  const open = (story: StorySummary) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/story-player",
      params: { code: story.code, scene: story.scene, title: story.title },
    });
  };

  const selectLevel = (next: StoryLevel) => {
    lastLevel = next;
    setLevel(next);
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom + 40,
        }}
        showsVerticalScrollIndicator={false}
      >
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
          <Text style={[styles.title, { color: theme.text }]}>{copy.libraryTitle}</Text>
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

        {library && library.levels.length === 0 && (
          <View style={styles.center}>
            <Text style={[styles.stateText, { color: theme.textSecondary }]}>{copy.empty}</Text>
          </View>
        )}

        {library && library.levels.length > 0 && level && (
          <>
            <LevelTabs
              levels={library.levels}
              level={level}
              copy={copy}
              isDark={isDark}
              textColor={theme.text}
              mutedColor={theme.textSecondary}
              trackColor={theme.border}
              onSelect={selectLevel}
            />

            {hero && (
              <Animated.View key={hero.code} entering={FadeInDown.duration(320)}>
                <HeroCard
                  story={hero}
                  copy={copy}
                  width={width - 32}
                  onPress={() => open(hero)}
                />
              </Animated.View>
            )}

            <View style={styles.list}>
              {rest.map((story, index) => (
                <Animated.View
                  key={story.code}
                  entering={FadeInDown.delay(60 + index * 50).duration(300)}
                >
                  <StoryRow
                    story={story}
                    copy={copy}
                    isDark={isDark}
                    textColor={theme.text}
                    mutedColor={theme.textSecondary}
                    surface={theme.surface}
                    border={theme.border}
                    onPress={() => open(story)}
                  />
                </Animated.View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

/* ───────────────────────── 레벨 탭 ───────────────────────── */

function LevelTabs({
  levels,
  level,
  copy,
  isDark,
  textColor,
  mutedColor,
  trackColor,
  onSelect,
}: {
  levels: StoryLibraryResponse["levels"];
  level: StoryLevel;
  copy: StoriesCopy;
  isDark: boolean;
  textColor: string;
  mutedColor: string;
  trackColor: string;
  onSelect: (level: StoryLevel) => void;
}) {
  const [segmentWidth, setSegmentWidth] = useState(0);
  const index = Math.max(0, levels.findIndex((item) => item.level === level));
  const thumbX = useSharedValue(0);
  useEffect(() => {
    thumbX.value = withSpring(index * segmentWidth, { damping: 18, stiffness: 220 });
  }, [index, segmentWidth, thumbX]);
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value }],
  }));

  return (
    <View
      style={[styles.tabs, { backgroundColor: isDark ? "#25252E" : trackColor }]}
      onLayout={(event: LayoutChangeEvent) =>
        setSegmentWidth((event.nativeEvent.layout.width - 8) / levels.length)
      }
    >
      {segmentWidth > 0 && (
        <Animated.View
          style={[styles.tabThumb, { width: segmentWidth }, thumbStyle]}
        />
      )}
      {levels.map((item) => {
        const selected = item.level === level;
        const done = item.stories.filter((story) => story.progress.completed).length;
        return (
          <Pressable
            key={item.level}
            onPress={() => {
              void Haptics.selectionAsync();
              onSelect(item.level);
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={styles.tab}
          >
            <Text style={[styles.tabLevel, { color: selected ? "#FFFFFF" : textColor }]}>
              {item.level}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                styles.tabHint,
                { color: selected ? "rgba(255,255,255,0.82)" : mutedColor },
              ]}
            >
              {`${copy.levelHint[item.level]} · ${done}/${item.stories.length}`}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ───────────────────────── 다음 이야기 (크게) ───────────────────────── */

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
  const sink = useSharedValue(0);
  const sinkStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sink.value * 5 }],
  }));
  const sceneHeight = Math.round(Math.min(220, width * 0.56));
  const label = story.progress.completed ? copy.listenAgain : copy.upNext;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => (sink.value = withTiming(1, { duration: 60 }))}
      onPressOut={() => (sink.value = withTiming(0, { duration: 90 }))}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${story.title}`}
      style={styles.heroWrap}
    >
      <View style={[styles.heroSlab, { backgroundColor: palette.groundDeep }]} />
      <Animated.View style={[styles.hero, { backgroundColor: palette.ground }, sinkStyle]}>
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
                size={26}
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
  copy,
  isDark,
  textColor,
  mutedColor,
  surface,
  border,
  onPress,
}: {
  story: StorySummary;
  copy: StoriesCopy;
  isDark: boolean;
  textColor: string;
  mutedColor: string;
  surface: string;
  border: string;
  onPress: () => void;
}) {
  const sink = useSharedValue(0);
  const sinkStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sink.value * 4 }],
  }));
  const slab = isDark ? "#0F0F15" : "#DAD6EE";

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => (sink.value = withTiming(1, { duration: 60 }))}
      onPressOut={() => (sink.value = withTiming(0, { duration: 90 }))}
      accessibilityRole="button"
      accessibilityLabel={`${story.title}, ${story.topic}`}
      style={styles.rowWrap}
    >
      <View style={[styles.rowSlab, { backgroundColor: slab }]} />
      <Animated.View
        style={[styles.row, { backgroundColor: surface, borderColor: border }, sinkStyle]}
      >
        <View style={styles.thumb}>
          <StoryScene scene={story.scene} width={68} height={68} animated={false} />
        </View>
        <View style={styles.flex}>
          <Text numberOfLines={1} style={[styles.rowTitle, { color: textColor }]}>
            {story.title}
          </Text>
          <Text numberOfLines={1} style={[styles.rowTopic, { color: mutedColor }]}>
            {story.topic}
          </Text>
          <Text style={[styles.rowMeta, { color: mutedColor }]}>
            {`${story.narrator.name}  ·  ${formatClock(story.audio.durationMs)}`}
          </Text>
        </View>
        {story.progress.completed ? (
          <View style={styles.done} accessibilityLabel={copy.done}>
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
        ) : (
          <Ionicons name="play-circle" size={30} color={VIOLET} />
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  flex: { flex: 1 },
  header: { paddingHorizontal: 14, height: 44, justifyContent: "center" },
  intro: { paddingHorizontal: 20, marginBottom: 18 },
  title: { fontSize: 30, lineHeight: 35, fontWeight: "900", letterSpacing: -0.5 },
  subtitle: { marginTop: 6, fontSize: 14, lineHeight: 20, fontWeight: "700" },
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
  tabs: {
    marginHorizontal: 16,
    marginBottom: 16,
    height: 58,
    borderRadius: 29,
    padding: 4,
    flexDirection: "row",
  },
  tabThumb: {
    position: "absolute",
    top: 4,
    left: 4,
    bottom: 4,
    borderRadius: 25,
    backgroundColor: VIOLET,
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 },
  tabLevel: { fontSize: 16, fontWeight: "900", letterSpacing: 0.4 },
  tabHint: { marginTop: 1, fontSize: 11, fontWeight: "800" },
  heroWrap: { marginHorizontal: 16, marginBottom: 18, paddingBottom: 5 },
  heroSlab: { position: "absolute", left: 0, right: 0, top: 5, bottom: 0, borderRadius: 26 },
  hero: { borderRadius: 26, overflow: "hidden" },
  heroBody: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 14,
    paddingHorizontal: 18,
    paddingBottom: 18,
    marginTop: -46,
  },
  heroTitle: { fontSize: 25, lineHeight: 30, fontWeight: "900", letterSpacing: -0.5 },
  heroTopic: { marginTop: 3, fontSize: 14, fontWeight: "800" },
  heroMeta: { marginTop: 8, fontSize: 12, fontWeight: "800", fontVariant: ["tabular-nums"] },
  heroPlay: { width: 58, height: 63 },
  heroPlaySlab: { position: "absolute", top: 5, width: 58, height: 58, borderRadius: 29 },
  heroPlayFace: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { paddingHorizontal: 16, gap: 12 },
  rowWrap: { paddingBottom: 4 },
  rowSlab: { position: "absolute", left: 0, right: 0, top: 4, bottom: 0, borderRadius: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 10,
    paddingRight: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  thumb: { width: 68, height: 68, borderRadius: 16, overflow: "hidden" },
  rowTitle: { fontSize: 16, lineHeight: 21, fontWeight: "900" },
  rowTopic: { marginTop: 1, fontSize: 13, fontWeight: "700" },
  rowMeta: { marginTop: 4, fontSize: 12, fontWeight: "800", fontVariant: ["tabular-nums"] },
  done: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: VIOLET,
    alignItems: "center",
    justifyContent: "center",
  },
});
