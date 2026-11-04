import { memo, useState, type ReactNode } from "react";
import { StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { Pressable } from "@/components/ui/Pressables";
import * as Haptics from "@/utils/haptics";
import { withAlpha, type ScenePalette } from "./scenes";
import { formatClock, type StoriesCopy } from "./stories.copy";

/**
 * 아래에 떠 있는 플레이어. 장면의 가장 깊은 색 위에 놓인다.
 *
 *   0:12 ━━━━━●───────── 0:46  1×
 *   [UZ]   ⏮   ( ▶ )   ⏭   [🎙]
 *
 * 가운데 재생 버튼만 KORIO 보라 + 두꺼운 받침(누르면 가라앉는다).
 * 켜진 토글은 장면의 빛 색이다 — 번역·따라 읽기에 "불이 들어온" 상태.
 */

const VIOLET = "#776EE2";
const VIOLET_DEEP = "#5B4DD4";
const VIOLET_GLOW = "#9D8DFF";
export const DOCK_HEIGHT = 136;
const SPEEDS = [1, 0.75] as const;

interface Props {
  palette: ScenePalette;
  copy: StoriesCopy;
  playing: boolean;
  progress: SharedValue<number>;
  elapsedMs: number;
  durationMs: number;
  /** 문장이 시작하는 지점들 (0~1) — 막대 위 눈금 */
  ticks: number[];
  rate: number;
  translationOn: boolean;
  translationBadge: string;
  shadowOn: boolean;
  bottomInset: number;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (fraction: number) => void;
  onRate: (rate: number) => void;
  onToggleTranslation: () => void;
  onToggleShadow: () => void;
}

function StoryDockBase(props: Props) {
  const { palette, copy } = props;
  const nextRate = props.rate === SPEEDS[0] ? SPEEDS[1] : SPEEDS[0];

  return (
    <View
      style={[
        styles.dock,
        {
          backgroundColor: palette.groundDeep,
          borderColor: withAlpha(palette.ink, 0.08),
          bottom: props.bottomInset + 10,
        },
      ]}
    >
      <View style={styles.timelineRow}>
        <Text style={[styles.clock, { color: withAlpha(palette.ink, 0.7) }]}>
          {formatClock(props.elapsedMs)}
        </Text>
        <Timeline
          palette={palette}
          progress={props.progress}
          ticks={props.ticks}
          onSeek={props.onSeek}
        />
        <Text style={[styles.clock, { color: withAlpha(palette.ink, 0.7) }]}>
          {formatClock(props.durationMs)}
        </Text>
        <Pressable
          onPress={() => props.onRate(nextRate)}
          accessibilityRole="button"
          accessibilityLabel={`${copy.speed} ${nextRate}×`}
          hitSlop={8}
          style={[
            styles.speed,
            {
              backgroundColor:
                props.rate === 1 ? withAlpha(palette.ink, 0.1) : palette.glow,
            },
          ]}
        >
          <Text
            style={[
              styles.speedText,
              { color: props.rate === 1 ? palette.ink : palette.groundDeep },
            ]}
          >
            {props.rate === 1 ? "1×" : "¾×"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.controls}>
        <ToggleChip
          palette={palette}
          on={props.translationOn}
          label={props.translationOn ? copy.translationOn : copy.translationOff}
          onPress={props.onToggleTranslation}
        >
          <Text
            style={[
              styles.badge,
              { color: props.translationOn ? palette.groundDeep : palette.ink },
            ]}
          >
            {props.translationBadge}
          </Text>
        </ToggleChip>

        <RoundButton palette={palette} label={copy.prev} onPress={props.onPrev}>
          <Ionicons name="play-skip-back" size={20} color={palette.ink} />
        </RoundButton>

        <PlayButton
          playing={props.playing}
          label={props.playing ? copy.pause : copy.play}
          onPress={props.onToggle}
        />

        <RoundButton palette={palette} label={copy.next} onPress={props.onNext}>
          <Ionicons name="play-skip-forward" size={20} color={palette.ink} />
        </RoundButton>

        <ToggleChip
          palette={palette}
          on={props.shadowOn}
          label={props.shadowOn ? copy.shadowOn : copy.shadowOff}
          onPress={props.onToggleShadow}
        >
          <Ionicons
            name={props.shadowOn ? "mic" : "mic-outline"}
            size={21}
            color={props.shadowOn ? palette.groundDeep : palette.ink}
          />
        </ToggleChip>
      </View>
    </View>
  );
}

export const StoryDock = memo(StoryDockBase);

/* ───────────────────────── 진행 막대 ───────────────────────── */

function Timeline({
  palette,
  progress,
  ticks,
  onSeek,
}: {
  palette: ScenePalette;
  progress: SharedValue<number>;
  ticks: number[];
  onSeek: (fraction: number) => void;
}) {
  const [width, setWidth] = useState(0);
  const trackWidth = useSharedValue(0);
  const scrub = useSharedValue(-1);
  const pressed = useSharedValue(0);

  const seekAt = (fraction: number) => {
    void Haptics.selectionAsync();
    onSeek(fraction);
  };

  // 누르면 바로 그 자리로, 끌면 놓을 때 옮긴다 (끄는 동안 오디오를 계속 자르지 않게)
  const gesture = Gesture.Pan()
    .minDistance(0)
    .hitSlop({ vertical: 14 })
    .onBegin((event) => {
      pressed.value = withTiming(1, { duration: 90 });
      if (trackWidth.value > 0) {
        scrub.value = Math.min(1, Math.max(0, event.x / trackWidth.value));
      }
    })
    .onUpdate((event) => {
      if (trackWidth.value > 0) {
        scrub.value = Math.min(1, Math.max(0, event.x / trackWidth.value));
      }
    })
    .onFinalize(() => {
      pressed.value = withTiming(0, { duration: 140 });
      if (scrub.value >= 0) runOnJS(seekAt)(scrub.value);
      scrub.value = -1;
    });

  const fillStyle = useAnimatedStyle(() => {
    const value = scrub.value >= 0 ? scrub.value : progress.value;
    return { width: `${value * 100}%` };
  });
  const headStyle = useAnimatedStyle(() => {
    const value = scrub.value >= 0 ? scrub.value : progress.value;
    return {
      transform: [
        { translateX: value * trackWidth.value - 7 },
        { scale: 1 + pressed.value * 0.35 },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={styles.track}
        onLayout={(event: LayoutChangeEvent) => {
          setWidth(event.nativeEvent.layout.width);
          trackWidth.value = event.nativeEvent.layout.width;
        }}
        accessible
        accessibilityRole="adjustable"
      >
        <View style={[styles.rail, { backgroundColor: withAlpha(palette.ink, 0.14) }]}>
          <Animated.View style={[styles.fill, { backgroundColor: VIOLET_GLOW }, fillStyle]} />
        </View>
        {width > 0 &&
          ticks.slice(1).map((tick) => (
            <View
              key={tick}
              style={[
                styles.tick,
                { left: tick * width - 1, backgroundColor: palette.groundDeep },
              ]}
            />
          ))}
        <Animated.View style={[styles.head, headStyle]} />
      </View>
    </GestureDetector>
  );
}

/* ───────────────────────── 버튼 ───────────────────────── */

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

function PlayButton({
  playing,
  label,
  onPress,
}: {
  playing: boolean;
  label: string;
  onPress: () => void;
}) {
  const sink = useSink(5);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={sink.onPressIn}
      onPressOut={sink.onPressOut}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={styles.playWrap}
    >
      <View style={[styles.playSlab, { backgroundColor: VIOLET_DEEP }]} />
      <Animated.View style={[styles.playFace, { backgroundColor: VIOLET }, sink.style]}>
        <Ionicons
          name={playing ? "pause" : "play"}
          size={30}
          color="#FFFFFF"
          style={playing ? undefined : { marginLeft: 4 }}
        />
      </Animated.View>
    </Pressable>
  );
}

function RoundButton({
  palette,
  label,
  onPress,
  children,
}: {
  palette: ScenePalette;
  label: string;
  onPress: () => void;
  children: ReactNode;
}) {
  const sink = useSink(3);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={sink.onPressIn}
      onPressOut={sink.onPressOut}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      style={styles.roundWrap}
    >
      <View style={[styles.roundSlab, { backgroundColor: withAlpha("#000000", 0.32) }]} />
      <Animated.View
        style={[
          styles.roundFace,
          { backgroundColor: withAlpha(palette.ink, 0.12) },
          sink.style,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

function ToggleChip({
  palette,
  on,
  label,
  onPress,
  children,
}: {
  palette: ScenePalette;
  on: boolean;
  label: string;
  onPress: () => void;
  children: ReactNode;
}) {
  const sink = useSink(3);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={sink.onPressIn}
      onPressOut={sink.onPressOut}
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      accessibilityLabel={label}
      hitSlop={6}
      style={styles.chipWrap}
    >
      <View
        style={[
          styles.chipSlab,
          { backgroundColor: on ? withAlpha("#000000", 0.45) : withAlpha("#000000", 0.32) },
        ]}
      />
      <Animated.View
        style={[
          styles.chipFace,
          { backgroundColor: on ? palette.glow : withAlpha(palette.ink, 0.12) },
          sink.style,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dock: {
    position: "absolute",
    left: 12,
    right: 12,
    height: DOCK_HEIGHT,
    borderRadius: 26,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 12,
  },
  timelineRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  clock: {
    fontSize: 12,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
    minWidth: 30,
    textAlign: "center",
  },
  track: { flex: 1, height: 24, justifyContent: "center" },
  rail: { height: 4, borderRadius: 2, overflow: "hidden" },
  fill: { height: 4, borderRadius: 2 },
  tick: { position: "absolute", width: 2, height: 4, top: 10 },
  head: {
    position: "absolute",
    left: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: VIOLET,
  },
  speed: {
    minWidth: 38,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  speedText: { fontSize: 12, fontWeight: "900" },
  controls: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 6,
  },
  playWrap: { width: 66, height: 71 },
  playSlab: {
    position: "absolute",
    top: 5,
    left: 0,
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  playFace: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  roundWrap: { width: 46, height: 49 },
  roundSlab: {
    position: "absolute",
    top: 3,
    left: 0,
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  roundFace: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  chipWrap: { width: 52, height: 49 },
  chipSlab: {
    position: "absolute",
    top: 3,
    left: 0,
    width: 52,
    height: 46,
    borderRadius: 16,
  },
  chipFace: {
    width: 52,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: { fontSize: 14, fontWeight: "900", letterSpacing: 0.4 },
});
