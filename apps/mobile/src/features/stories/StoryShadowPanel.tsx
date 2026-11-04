import { memo, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "@/components/ui/Pressables";
import { withAlpha, type ScenePalette } from "./scenes";
import type { StoriesCopy } from "./stories.copy";
import type { StoryShadowing } from "./useStoryShadowing";

/**
 * 따라 읽기 상태 줄 — 독 바로 위에 붙는다.
 * 듣는 중 → 마이크 숨쉬기(입력 세기만큼 커진다) → 확인 중 → 결과(다시/다음).
 */

const GOOD = "#58CC02";
const WARN = "#F5A623";

interface Props {
  palette: ScenePalette;
  copy: StoriesCopy;
  shadowing: StoryShadowing;
  bottom: number;
}

function StoryShadowPanelBase({ palette, copy, shadowing, bottom }: Props) {
  const { phase, results, sentenceIndex, errorKind, level } = shadowing;
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (phase === "recording") {
      pulse.value = withRepeat(
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.quad) }),
        -1,
        true,
      );
    } else {
      cancelAnimation(pulse);
      pulse.value = withTiming(0, { duration: 160 });
    }
  }, [phase, pulse]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.25 + pulse.value * 0.35,
    transform: [{ scale: 1 + pulse.value * 0.18 + level * 0.35 }],
  }));

  if (phase === "off") return null;

  // 문장 id 는 s1, s2 … 순서대로다 (시드 검증기가 강제한다)
  const result = results[`s${sentenceIndex + 1}`];

  let title = copy.yourTurn;
  let tone: string = palette.ink;
  if (phase === "listening") title = copy.shadowStart;
  if (phase === "recording") title = copy.listening;
  if (phase === "scoring") title = copy.checking;
  if (phase === "error") {
    title = errorKind === "denied" ? copy.micDenied : copy.micFailed;
    tone = WARN;
  }
  if (phase === "result" && result) {
    if (result.status !== "success") {
      title = copy.noSpeech;
      tone = WARN;
    } else if (result.passed) {
      title = `${copy.great}  ${Math.round(result.scores.pron)}`;
      tone = GOOD;
    } else {
      title = `${copy.almost}  ${Math.round(result.scores.pron)}`;
      tone = WARN;
    }
  }
  const showChoices =
    phase === "error" || (phase === "result" && !result?.passed);

  return (
    <Animated.View
      entering={FadeInDown.duration(220)}
      exiting={FadeOutDown.duration(160)}
      style={[
        styles.panel,
        {
          bottom,
          backgroundColor: palette.groundDeep,
          borderColor: withAlpha(palette.ink, 0.1),
        },
      ]}
    >
      <Pressable
        onPress={phase === "recording" ? shadowing.finishRecording : shadowing.retry}
        disabled={phase === "scoring" || phase === "listening"}
        accessibilityRole="button"
        accessibilityLabel={phase === "recording" ? copy.listening : copy.tryAgain}
        style={styles.micWrap}
      >
        <Animated.View
          style={[styles.micRing, { backgroundColor: palette.glow }, ringStyle]}
        />
        <View
          style={[
            styles.mic,
            {
              backgroundColor:
                phase === "recording" ? palette.glow : withAlpha(palette.ink, 0.12),
            },
          ]}
        >
          {phase === "scoring" ? (
            <ActivityIndicator color={palette.ink} size="small" />
          ) : (
            <Ionicons
              name={phase === "listening" ? "ear" : "mic"}
              size={22}
              color={phase === "recording" ? palette.groundDeep : palette.ink}
            />
          )}
        </View>
      </Pressable>

      <Text numberOfLines={2} style={[styles.title, { color: tone }]}>
        {title}
      </Text>

      {showChoices && (
        <View style={styles.choices}>
          <Pressable
            onPress={shadowing.retry}
            accessibilityRole="button"
            style={[styles.choice, { backgroundColor: withAlpha(palette.ink, 0.12) }]}
          >
            <Text style={[styles.choiceText, { color: palette.ink }]}>
              {copy.tryAgain}
            </Text>
          </Pressable>
          <Pressable
            onPress={shadowing.skip}
            accessibilityRole="button"
            style={[styles.choice, { backgroundColor: withAlpha(palette.ink, 0.12) }]}
          >
            <Text style={[styles.choiceText, { color: palette.ink }]}>
              {copy.skip}
            </Text>
          </Pressable>
        </View>
      )}
    </Animated.View>
  );
}

export const StoryShadowPanel = memo(StoryShadowPanelBase);

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    left: 20,
    right: 20,
    minHeight: 64,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
  },
  micWrap: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  micRing: { position: "absolute", width: 44, height: 44, borderRadius: 22 },
  mic: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { flex: 1, fontSize: 14, lineHeight: 19, fontWeight: "800" },
  choices: { flexDirection: "row", gap: 8 },
  choice: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  choiceText: { fontSize: 13, fontWeight: "900" },
});
