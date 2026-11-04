import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "@/components/ui/Pressables";
import * as Haptics from "@/utils/haptics";
import { StoriesService, storyContentLang } from "@/services/stories.service";
import { StoryScene } from "./StoryScene";
import { StoryDock, DOCK_HEIGHT } from "./StoryDock";
import { StorySentenceView } from "./StorySentenceView";
import { normalizeToken } from "./storyTiming";
import { StoryShadowPanel } from "./StoryShadowPanel";
import { StoryWordSheet } from "./StoryWordSheet";
import { StoryFinishSheet } from "./StoryFinishSheet";
import { sceneOf, withAlpha } from "./scenes";
import {
  formatClock,
  translationBadge,
  useStoriesCopy,
} from "./stories.copy";
import { useStoryPlayer } from "./useStoryPlayer";
import { useStoryShadowing } from "./useStoryShadowing";
import type { StoryDetail } from "./stories.types";

/**
 * 듣기 이야기 플레이어 — "틀어 놓고 보는" 화면.
 *
 * 위: 살아 있는 그림 (해가 이야기 진행만큼 하늘을 건넌다)
 * 가운데: 문장들. 지금 단어가 그림의 빛 색으로 켜진다. 문장을 누르면 거기서부터.
 * 아래: 떠 있는 플레이어 (번역 · 이전 · 재생 · 다음 · 따라 읽기)
 * 끝: 세 문제 → XP → 다음 이야기가 저절로 시작된다.
 */

/** 이야기를 넘겨도 번역 켜기/끄기는 유지한다 (앱을 다시 켜면 켜진 채로) */
let translationPreference = true;

interface WordSheetState {
  word: string;
  meaning: string;
  sentenceIndex: number;
  wordIndex: number;
  resumeMs: number;
  wasPlaying: boolean;
}

export default function StoryPlayerScreen() {
  const params = useLocalSearchParams<{
    code: string;
    scene?: string;
    title?: string;
    autoplay?: string;
  }>();
  const code = String(params.code ?? "");
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const copy = useStoriesCopy();
  const isFocused = useIsFocused();

  const [story, setStory] = useState<StoryDetail | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [showTranslation, setShowTranslation] = useState(translationPreference);
  const [finished, setFinished] = useState(false);
  const [wordSheet, setWordSheet] = useState<WordSheetState | null>(null);

  const load = useCallback(async () => {
    setLoadState("loading");
    try {
      const detail = await StoriesService.get(code);
      setStory(detail);
      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  }, [code]);

  useEffect(() => {
    void load();
  }, [load]);

  const player = useStoryPlayer(story, { onEnded: () => setFinished(true) });
  const shadowing = useStoryShadowing(story, player, {
    onFinished: () => setFinished(true),
  });

  const palette = sceneOf(story?.scene ?? params.scene);
  const sceneHeight = Math.round(Math.min(300, Math.max(210, height * 0.36)));
  const listBottom = DOCK_HEIGHT + insets.bottom + 40 + (shadowing.active ? 84 : 0);

  // "다음 이야기" 로 넘어왔으면 장면이 그려질 틈을 주고 바로 튼다
  const autoplayedRef = useRef(false);
  useEffect(() => {
    if (!story || params.autoplay !== "1" || autoplayedRef.current) return;
    autoplayedRef.current = true;
    const timer = setTimeout(() => player.play(), 700);
    return () => clearTimeout(timer);
  }, [params.autoplay, player, story]);

  // 다른 화면(축하·도장)으로 가면 멈춘다
  const { pause, status } = player;
  useEffect(() => {
    if (!isFocused && status === "playing") pause();
  }, [isFocused, pause, status]);

  const vocabulary = useMemo(
    () =>
      new Map(
        (story?.vocabulary ?? []).map((item) => [
          normalizeToken(item.word),
          item.meaning,
        ]),
      ),
    [story],
  );

  const ticks = useMemo(() => {
    if (!story) return [];
    const total = player.durationMs || 1;
    return story.sentences.map((sentence, index) =>
      player.mode === "audio"
        ? sentence.startMs / total
        : index / story.sentences.length,
    );
  }, [player.durationMs, player.mode, story]);

  /* ── 지금 문장을 따라 스크롤 ── */
  const scrollRef = useRef<ScrollView>(null);
  const layoutsRef = useRef<number[]>([]);
  const manualUntilRef = useRef(0);
  const activeSentence = shadowing.active
    ? shadowing.sentenceIndex
    : player.position.sentence;

  useEffect(() => {
    if (activeSentence < 0 || Date.now() < manualUntilRef.current) return;
    const y = layoutsRef.current[activeSentence];
    if (y === undefined) return;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 16), animated: true });
  }, [activeSentence]);

  const onSentenceLayout = useCallback((index: number, y: number) => {
    layoutsRef.current[index] = y;
  }, []);

  /* ── 조작 ── */
  const { seekToSentence, playWord, restoreMs, play, getMs } = player;
  const { startShadowing, stopShadowing } = shadowing;
  const shadowActive = shadowing.active;

  const onSentencePress = useCallback(
    (index: number) => {
      manualUntilRef.current = 0;
      void Haptics.selectionAsync();
      if (shadowActive) startShadowing(index);
      else seekToSentence(index);
    },
    [seekToSentence, shadowActive, startShadowing],
  );

  const onWordPress = useCallback(
    (sentenceIndex: number, wordIndex: number, word: string, meaning: string) => {
      if (shadowActive) return;
      void Haptics.selectionAsync();
      const wasPlaying = status === "playing";
      const resumeMs = getMs();
      pause();
      setWordSheet({ word, meaning, sentenceIndex, wordIndex, resumeMs, wasPlaying });
    },
    [getMs, pause, shadowActive, status],
  );

  const closeWordSheet = useCallback(() => {
    if (!wordSheet) return;
    restoreMs(wordSheet.resumeMs);
    if (wordSheet.wasPlaying) play();
    setWordSheet(null);
  }, [play, restoreMs, wordSheet]);

  const toggleTranslation = useCallback(() => {
    setShowTranslation((on) => {
      translationPreference = !on;
      return !on;
    });
  }, []);

  const toggleShadow = useCallback(() => {
    if (shadowActive) {
      stopShadowing();
      return;
    }
    setFinished(false);
    startShadowing(Math.max(0, player.position.sentence));
  }, [player.position.sentence, shadowActive, startShadowing, stopShadowing]);

  const listenAgain = useCallback(() => {
    setFinished(false);
    manualUntilRef.current = 0;
    scrollRef.current?.scrollTo({ y: 0, animated: true });
    seekToSentence(0);
  }, [seekToSentence]);

  const playNext = useCallback((nextCode: string) => {
    router.replace({
      pathname: "/story-player",
      params: { code: nextCode, autoplay: "1" },
    });
  }, []);

  // 안드로이드 뒤로: 시트부터 닫는다
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (wordSheet) {
        closeWordSheet();
        return true;
      }
      if (finished) {
        setFinished(false);
        return true;
      }
      if (shadowActive) {
        stopShadowing();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [closeWordSheet, finished, shadowActive, stopShadowing, wordSheet]);

  const title = story?.title ?? params.title ?? "";
  const meta = story
    ? [story.topic, story.narrator.name, formatClock(player.durationMs)]
        .filter(Boolean)
        .join("  ·  ")
    : "";

  return (
    <View style={[styles.screen, { backgroundColor: palette.ground }]}>
      <StatusBar style="light" />

      <View style={{ height: sceneHeight }}>
        <StoryScene
          scene={story?.scene ?? params.scene ?? "autumn"}
          width={width}
          height={sceneHeight}
          progress={player.progress}
          fadeTo={palette.ground}
        />
        <View style={[styles.topBar, { top: insets.top + 6 }]}>
          <Pressable
            onPress={() => (router.canGoBack() ? router.back() : router.replace("/english-stories"))}
            accessibilityRole="button"
            accessibilityLabel={copy.close}
            hitSlop={8}
            style={styles.backWrap}
          >
            <View style={styles.backSlab} />
            <View style={styles.backFace}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </View>
          </Pressable>
          {story && (
            <View style={styles.levelPill}>
              <Text style={styles.levelText}>{story.level}</Text>
            </View>
          )}
        </View>
        <View style={styles.titleBlock} pointerEvents="none">
          <Text numberOfLines={2} style={[styles.title, { color: palette.ink }]}>
            {title}
          </Text>
          {!!meta && (
            <Text numberOfLines={1} style={[styles.meta, { color: withAlpha(palette.ink, 0.72) }]}>
              {meta}
            </Text>
          )}
        </View>
      </View>

      {loadState === "loading" && (
        <View style={styles.center}>
          <ActivityIndicator color={palette.glow} />
        </View>
      )}

      {loadState === "error" && (
        <View style={styles.center}>
          <Text style={[styles.stateText, { color: palette.ink }]}>{copy.loadFailed}</Text>
          <Pressable
            onPress={() => void load()}
            accessibilityRole="button"
            style={styles.retry}
          >
            <Text style={styles.retryText}>{copy.retry}</Text>
          </Pressable>
        </View>
      )}

      {loadState === "ready" && story && (
        <Animated.View entering={FadeIn.duration(260)} style={styles.flex}>
          <ScrollView
            ref={scrollRef}
            style={styles.flex}
            contentContainerStyle={{ paddingTop: 6, paddingBottom: listBottom }}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => {
              // 손으로 넘기는 동안은 자동으로 따라가지 않는다
              manualUntilRef.current = Date.now() + 4000;
            }}
          >
            {player.mode === "tts" && (
              <Text style={[styles.ttsNote, { color: withAlpha(palette.ink, 0.55) }]}>
                {copy.ttsNote}
              </Text>
            )}
            {story.sentences.map((sentence, index) => {
              const state =
                activeSentence < 0
                  ? "future"
                  : index < activeSentence
                    ? "past"
                    : index === activeSentence
                      ? "active"
                      : "future";
              return (
                <StorySentenceView
                  key={sentence.id}
                  sentence={sentence}
                  index={index}
                  state={state}
                  activeWord={
                    state !== "active"
                      ? -1
                      : !shadowing.active || shadowing.phase === "listening"
                        ? player.position.word
                        : Number.MAX_SAFE_INTEGER
                  }
                  showTranslation={showTranslation}
                  palette={palette}
                  vocabulary={vocabulary}
                  shadowResult={shadowing.results[sentence.id]}
                  onPress={onSentencePress}
                  onWordPress={onWordPress}
                  onLayout={onSentenceLayout}
                />
              );
            })}
          </ScrollView>
          <LinearGradient
            pointerEvents="none"
            colors={[withAlpha(palette.ground, 0), palette.ground]}
            style={[styles.bottomFade, { height: DOCK_HEIGHT + insets.bottom + 36 }]}
          />
        </Animated.View>
      )}

      {story && (
        <>
          <StoryShadowPanel
            palette={palette}
            copy={copy}
            shadowing={shadowing}
            bottom={insets.bottom + 10 + DOCK_HEIGHT + 10}
          />
          <StoryDock
            palette={palette}
            copy={copy}
            playing={player.status === "playing" && !shadowing.active}
            progress={player.progress}
            elapsedMs={
              player.mode === "audio"
                ? player.elapsedMs
                : (Math.max(0, activeSentence) / Math.max(1, story.sentences.length)) *
                  player.durationMs
            }
            durationMs={player.durationMs}
            ticks={ticks}
            rate={player.rate}
            translationOn={showTranslation}
            translationBadge={translationBadge(storyContentLang())}
            shadowOn={shadowing.active}
            bottomInset={insets.bottom}
            onToggle={() => {
              if (shadowing.active) stopShadowing();
              player.toggle();
            }}
            onPrev={() => {
              if (shadowing.active) startShadowing(Math.max(0, shadowing.sentenceIndex - 1));
              else player.prev();
            }}
            onNext={() => {
              if (shadowing.active) shadowing.skip();
              else player.next();
            }}
            onSeek={(fraction) => {
              if (shadowing.active) stopShadowing();
              player.seekToFraction(fraction);
            }}
            onRate={player.setRate}
            onToggleTranslation={toggleTranslation}
            onToggleShadow={toggleShadow}
          />
        </>
      )}

      {wordSheet && (
        <StoryWordSheet
          palette={palette}
          copy={copy}
          word={wordSheet.word}
          meaning={wordSheet.meaning}
          bottomInset={insets.bottom}
          onHear={() => playWord(wordSheet.sentenceIndex, wordSheet.wordIndex, wordSheet.word)}
          onClose={closeWordSheet}
        />
      )}

      {finished && story && (
        <StoryFinishSheet
          story={story}
          palette={palette}
          copy={copy}
          bottomInset={insets.bottom}
          focused={isFocused}
          onListenAgain={listenAgain}
          onPlayNext={playNext}
          onClose={() => setFinished(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  flex: { flex: 1 },
  topBar: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backWrap: { width: 42, height: 45 },
  backSlab: {
    position: "absolute",
    top: 3,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.32)",
  },
  backFace: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  levelPill: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: "#776EE2",
    alignItems: "center",
    justifyContent: "center",
  },
  levelText: { color: "#FFFFFF", fontSize: 13, fontWeight: "900", letterSpacing: 0.6 },
  titleBlock: { position: "absolute", left: 24, right: 24, bottom: 10 },
  title: { fontSize: 29, lineHeight: 34, fontWeight: "900", letterSpacing: -0.6 },
  meta: { marginTop: 4, fontSize: 13, fontWeight: "800" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 14, padding: 24 },
  stateText: { fontSize: 16, fontWeight: "800", textAlign: "center" },
  retry: {
    height: 50,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderBottomWidth: 4,
    borderBottomColor: "#5B4DD4",
    backgroundColor: "#776EE2",
    alignItems: "center",
    justifyContent: "center",
  },
  retryText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  ttsNote: {
    marginHorizontal: 24,
    marginBottom: 6,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
  },
  bottomFade: { position: "absolute", left: 0, right: 0, bottom: 0 },
});
